<template>
  <div ref="allDataGrid" class="sum-grid" @wheel="wheel">
    <div v-if="isPaging" class="loading-tr">
      {{ pageText }}
    </div>
    <sum-sub
      :key="isUpdata"
      ref="indexGridSub"
      :isAll="true"
      class="all-data-style"
      :style="allStyle"
      :allRow="true"
      :hoverRow.sync="hoverRow"
      @clickFirst="clickFirst"
      @dragStart="dragstart"
      @checkboxClick="checkboxClick"
      @checkAllClick="checkAllClick"
      @dragEnd="dragend"
      @open="open"
    >
      <template v-for="(item, index) in actualFields" :slot="item.id" slot-scope="field">
        <div :key="index">
          <slot :name="field.field.id" :field="field"></slot>
        </div>
      </template>
      <slot v-if="isSlotFooter" slot="slotFooter" slot-scope="field" name="slotFooter" :field="field"></slot>
      <slot v-if="linkSlot" slot="linkSlot" slot-scope="field" name="linkSlot" :field="field"></slot>
    </sum-sub>
    <sum-sub :style="topStyle" @checkAllClick="checkAllClick" :allRow="false" v-if="scrollY > 0"></sum-sub>
    <sum-sub
      :key="isUpdata + 1"
      :style="leftStyle"
      :onlyFix="true"
      :allRow="true"
      @checkboxClick="checkboxClick"
      v-if="scrollX > 0 && data.length > 0"
      :hoverRow.sync="hoverRow"
      @clickFirst="clickFirst"
      @checkAllClick="checkAllClick"
      @dragStart="dragstart"
      @dragEnd="dragend"
      @open="open"
    >
      <template v-for="(item, index) in actualFields" :slot="item.id" slot-scope="field">
        <div :key="index">
          <slot :name="field.field.id" :field="field"></slot>
        </div>
      </template>
      <slot v-if="isSlotFooter" slot="slotFooter" slot-scope="field" name="slotFooter" :field="field"></slot>
      <slot v-if="linkSlot" slot="linkSlot" slot-scope="field" name="linkSlot" :field="field"></slot>
    </sum-sub>
    <sum-sub
      :key="isUpdata + 2"
      :style="cornerStyle"
      @checkAllClick="checkAllClick"
      :onlyFix="true"
      :allRow="false"
      v-if="scrollY > 0 && scrollX > 0"
    ></sum-sub>
    <scroll-bar
      :key="isUpdata + 3"
      v-if="vBarSize > 0 && vBarSize < 100"
      :vertical="true"
      :size="vBarSize"
      :move="vMove"
      @scroll="vScroll"
    />
    <scroll-bar v-if="hBarSize > 0 && hBarSize < 100" :size="hBarSize" :move="hMove" @scroll="hScroll" />
  </div>
</template>
<script>
import ScrollBar from './../ScrollBar.vue'
import SumSub from './SumSub.vue'
import scrollable from './../mixins/scrollable.js'
import Vue from 'vue'
export default {
  name: 'SumGrid',
  mixins: [scrollable],
  components: { ScrollBar, SumSub },
  data () {
    return {
      isUpdata: 0,
      isRealLoading: false,
      startDragId: '',
      whereInsert: '',
      dragTarget: [],
      dragingData: {},
      targetId: '',
      checked: { all: false, list: new Array(this.data.length) },
      sorted: [],
      hoverRow: -1,
      hoverRowData: null,
      checkWidth: 32,
      serialWidth: 50,
      emptyDefault: {},
      borderBottom: true,
      dataGridHeight: 0,
      selectRow: [],
      actualAll: 0,
      expandStatus: {},
      checkedCount: 0,
      treeDataChecked: {
        all: false,
        list: new Array(this.treeAllData(this.data).length)
      },
      moreHead: false,
      pageCount: 1,
      pageText: '正在加载数据...',
      loadingHeight: 46,
      allDataPageX: 0,
      allDataPageY: 0,
      startDragData: {},
      endDragData: {},
      treeDataDetail: [],
      tdHeight: this.isTree ? new Array(this.treeAllData(this.data).length) : new Array(this.data.length),
      dataChangeCount: 0,
      isOperateOpen: false
    }
  },
  provide () {
    return {
      table: this
    }
  },
  computed: {
    allHeadRow () {
      return this.headGrage(this.fields)
    },

    allStyle () {
      return {
        top: -this.scrollY + 'px',
        left: -this.scrollX + 'px',
        width: this.actualWidth + 'px',
        minWidth: '100%',
        maxHeight: this.actualHeight + 'px',
        borderBottom: this.borderBottom ? ' 1px solid #dcdfe6' : '0'
      }
    },
    topStyle () {
      return {
        top: '0px',
        left: -this.scrollX + 'px',
        width: this.actualWidth + 'px',
        minWidth: '100%',
        maxHeight: this.actualHeight + 'px',
        boxSizing: 'border-box',
        'z-index': 2
      }
    },
    cornerStyle () {
      return {
        top: '0px',
        left: '0px',
        width: this.fixColsWidth + 'px',
        height: this.headerHeight + 'px',
        'z-index': 9
      }
    },
    leftStyle () {
      return {
        top: -this.scrollY + 'px',
        left: '0px',
        width: this.fixColsWidth + 'px',
        // minHeight: this.minHeight + "px",
        maxHeight: this.actualHeight + 'px',
        'z-index': 2
      }
    },
    fixColsWidth () {
      let extra = (this.isTree ? 0 : this.serialWidth) + (this.checkable ? this.checkWidth : 0)
      let fixColData = this.fields.slice(0, this.fixCols)
      if (this.headWidthField(fixColData).length > 0) {
        return (
          this.headWidthField(fixColData)
            .map(field => field.width)
            .reduce((total, current) => total + current) + extra
        )
      } else {
        return 0
      }
    },
    minHeight () {
      return (this.rowCount + this.headGrage(this.fields).length) * this.rowHeight
    },
    actualHeight () {
      this.heightAdaption()
      let height = (this.rowCount + this.headGrage(this.fields).length) * this.rowHeight
      if (height < this.actualAll) {
        height = this.actualAll
      }
      return height
    },
    headerHeight () {
      return this.headGrage(this.fields).length * this.rowHeight
    },
    actualWidth () {
      let extra = (this.isTree ? 0 : this.serialWidth) + (this.checkable ? this.checkWidth : 0)
      if (this.headWidthField(this.fields).length > 0) {
        return (
          this.headWidthField(this.fields)
            .map(field => field.width)
            .reduce((total, current) => total + current) + extra
        )
      } else {
        return 0
      }
    },
    actualFields () {
      return this.headWidthField(this.fields)
    },
    rowCount () {
      return this.computeCount(0, this.data)
    },
    isPaging () {
      return (
        this.actualHeight < this.dataGridHeight + this.scrollY + 10 &&
        this.loadState !== 3 &&
        this.scrollY > 0 &&
        !this.isDrag
      )
    }
  },
  watch: {
    expandStatus: {
      deep: true,
      immediate: true,
      handler: function (newVal) {
        this.expandStatus = newVal
      }
    },
    isLoading (val) {
      console.log(val)
      if (!val) this.isRealLoading = false
    },
    isPaging (val) {
      this.heightAdaption()
      if (val) {
        this.dataPage()
      }
    },
    data: {
      deep: true,
      immediate: true,
      handler (val) {
        let dataDetail = []
        this.isTree ? (dataDetail = this.treeAllData(this.data)) : (dataDetail = this.data)
        this.treeDataDetail = dataDetail

        if (this.dataChangeCount === 0 && this.data.length > 0) {
          this.expandStatus = this.unfoldStatus()
          this.dataChangeCount++
        }
        this.checked.list = [...this.checked.list, ...new Array(val.length)]
        if (this.isTree) {
          this.treeDataChecked.list = [...this.treeDataChecked.list, ...new Array(this.treeAllData(val).length)]
        }
        if (this.isExpandAll) {
          Object.keys(this.expandStatus).forEach(x => {
            this.expandStatus[x] = true
          })
        }
        this.data = val
        this.tdHeight = this.isTree ? new Array(this.treeAllData(this.data).length) : new Array(this.data.length)
      }
    }
  },
  props: {
    isExpandAll: {
      type: Boolean,
      default: false
    },
    pageSize: {
      type: Number,
      default () {
        return 20
      }
    },
    isLoading: {
      type: Boolean,
      default () {
        return false
      }
    },
    pageNumber: {
      type: Number,
      default () {
        return 1
      }
    },
    theme: {
      type: String,
      default () {
        return ''
      }
    },
    isDrag: {
      type: Boolean,
      default: false
    },
    headerTier: {
      type: Number,
      require: true
    },
    linkSlot: {
      type: Boolean,
      require: false
    },
    fields: {
      type: Array,
      required: true
    },
    data: {
      type: Array,
      required: true
    },
    fixCols: {
      type: Number,
      default: 1
    },
    rowHeight: {
      type: Number,
      default: 40
    },
    checkable: {
      type: Boolean,
      default: true
    },
    OperateMenuData: {
      type: Object,
      default: () => {
        return {}
      }
    },
    rowMenuClick: Function,
    operateMenuTheme: String,
    empty: {
      type: Object
    },
    isSlotFooter: {
      type: Boolean,
      default: false
    },
    textAlign: {
      type: String,
      default: 'left'
    },
    isTree: {
      type: Boolean,
      default: false
    },
    // loadState:
    // 0,表示加载数据成功
    // 1，表示加载数据失败
    // 2，表示没有可加载的数据
    // 3，表示不用异步加载数据
    loadState: {
      type: Number,
      default: 3
    }
  },

  mounted () {
    setTimeout(() => {
      if (this.isLoading) this.isRealLoading = true
    }, 500)
    this.heightAdaption()
    window.onresize = () => {
      this.heightAdaption()
    }
    this.moreHead = this.isMoreHead()
  },
  methods: {
    makeTreeExpand (id, isExpand) {
      this.$set('this.expandStatus', id, isExpand)
    },
    resetSumGridStyle () {
      this.isUpdata++
      this.scrollX = 0
      this.scrollY = 0
    },
    checkAllClick (value, data) {
      this.$emit('checkAllClick', value, data)
    },
    checkboxClick (value, rowData, index) {
      this.$emit('checkboxClick', value, rowData, index)
    },

    open (data) {
      this.$emit('open', data)
    },
    isQueryDrag (startDragData, endDragData, whereInsert) {
      if (
        startDragData &&
        Object.keys(startDragData).length > 0 &&
        endDragData &&
        Object.keys(endDragData).length > 0 &&
        whereInsert
      ) {
        if (this.isTree) {
          // startDragData.parent.JGQC = "测试测试测试";
          let newData = [...this.data]
          let newStart = Object.keys(startDragData.parent).length > 0 ? startDragData.parent.children : [...newData]
          newStart.forEach((x, index) => {
            if (x.id == startDragData.id) newStart.splice(index, 1)
          })
          if (Object.keys(startDragData.parent).length == 0) newData = [...newStart]

          let newEnd = Object.keys(endDragData.parent).length > 0 ? endDragData.parent.children : [...newData]
          for (let i = 0; i < newEnd.length; i++) {
            if (newEnd[i].id == endDragData.id) {
              let newIndex = whereInsert == 'top' ? i : i + 1
              newEnd.splice(newIndex, 0, startDragData)
              break
            }
          }
          if (Object.keys(endDragData.parent).length == 0) newData = [...newEnd]

          return newData
        } else {
          let [newData, newSplitData] = [[...this.data], [...this.data]]
          newData.forEach((x, index) => {
            if (x == startDragData) {
              newSplitData[index] = undefined
              newData = [...newSplitData]
            }
          })
          newData.forEach((x, index) => {
            let newIndex = 0
            if (x == endDragData) {
              whereInsert == 'top' ? (newIndex = index) : (newIndex = index + 1)
              newSplitData.splice(newIndex, 0, startDragData)
              newData = [...newSplitData]
            }
          })
          newSplitData.forEach((x, index) => {
            if (x == undefined || x == 'undefined') {
              newSplitData.splice(index, 1)
            }
          })
          return newSplitData
        }
      } else {
        return [...this.data]
      }
    },
    dragend (startval, endval, whereInsert) {
      this.startDragData = startval
      this.endDragData = endval
      this.whereInsert = whereInsert
      this.$emit('dragEnd', startval, endval, whereInsert)
    },
    dragstart (val) {
      this.startDragData = val
      this.$emit('dragStart', val)
    },
    unfoldStatus () {
      let data = {}
      this.treeDataDetail.forEach((x, index) => {
        index == 0 && x.children ? (data[x.id] = true) : (data[x.id] = false)
      })
      return data
    },
    heightAdaption () {
      this.$nextTick(() => {
        this.actualAll =
          this.$refs.indexGridSub && this.$refs.indexGridSub.$el ? this.$refs.indexGridSub.$el.offsetHeight : 0
        this.dataGridHeight =
          this.$refs.allDataGrid && this.$refs.allDataGrid.offsetHeight ? this.$refs.allDataGrid.offsetHeight : 0
        let position = this.getPosition(this.$refs.allDataGrid)
        this.allDataPageX = position.x
        this.allDataPageY = position.y
      })
    },
    // //获取相对于屏幕的位置
    getPosition (element) {
      // 如果浏览器兼容此方法
      var abs = { x: 0, y: 0 }
      if (document.documentElement && document.documentElement.getBoundingClientRect) {
        abs.x = element ? element.getBoundingClientRect().left : 0
        abs.y = element ? element.getBoundingClientRect().top : 0
        abs.x += window.screenLeft + document.documentElement.scrollLeft - document.documentElement.clientLeft
        abs.y += window.screenTop + document.documentElement.scrollTop - document.documentElement.clientTop
      }

      // 如果浏览器不兼容此方法
      else {
        while (element != document.body) {
          abs.x += element.offsetLeft
          abs.y += element.offsetTop
          element = element.offsetParent
        }

        // 计算想对位置
        abs.x += window.screenLeft + document.body.clientLeft - document.body.scrollLeft
        abs.y += window.screenTop + document.body.clientTop - document.body.scrollTop
      }

      return abs
    },

    dataPage () {
      this.heightAdaption()
      if (this.loadState == 0) {
        this.pageCount++
        this.pageText = '正在加载数据...'
      } else if (this.loadState == 1) {
        this.pageText = '数据加载失败'
      } else if (this.loadState == 2) {
        this.pageText = '暂无可加载的数据'
      }
      this.$emit('dataPage', this.pageCount)
    },
    isMoreHead () {
      let count = this.isChildren(this.fields)
      if (count > 0) {
        return false
      } else {
        return true
      }
    },
    clickFirst (rowData, field, rowIndex, colIndex) {
      this.$emit('clickFirst', rowData, field, rowIndex, colIndex)
    },
    // 清空选中值
    clearData () {
      if (this.isTree) {
        this.treeDataChecked.all = false
        for (let i = 0; i < this.treeDataChecked.list.length; i++) {
          Vue.set(this.treeDataChecked.list, i, false)
        }
      } else {
        this.checked.all = false
        for (let i = 0; i < this.checked.list.length; i++) {
          Vue.set(this.checked.list, i, false)
        }
      }
    },
    // 展开数据
    unfoldData (dataDet) {
      let [data, dataArr] = [this.headGrage(dataDet), []]
      data.forEach(x => {
        dataArr.push(...x)
      })
      return dataArr
    },
    // 展开总数据
    treeAllData (dataDet) {
      let [data, dataArr] = [this.headGrage(dataDet), []]
      data.forEach(x => {
        dataArr.push(...x)
      })
      dataArr.forEach((y, index) => {
        dataArr[index]['rank'] = index
      })
      return dataArr
    },
    computeCount (current, list) {
      current += list.length
      list.forEach(element => {
        if (this.expandStatus[element.id] && element.children) current = this.computeCount(current, element.children)
      })
      return current
    },
    // 占宽度的头部
    headWidthField (data, arr = []) {
      if (this.isChildren(data) > 0) {
        let two = []
        data.forEach(x => {
          if (x.children && x.children.length > 0) {
            two.push(...this.forHead(x.children))
          } else {
            arr.push(x)
          }
        })
        return this.headWidthField(two, arr)
      } else {
        return [...arr, ...data]
      }
    },
    // 将头部分级
    headGrage (data, arr = []) {
      if (arr.length < 1) arr = [this.forHead(data)]
      if (this.isChildren(data) > 0) {
        let two = []
        data.forEach(x => {
          if (x.children && x.children.length > 0) two.push(...this.forHead(x.children, x))
        })
        arr = [...arr, two]
        return this.headGrage(two, arr)
      } else {
        return arr
      }
    },

    forHead (data, parent = {}) {
      let newData = []
      data.forEach(x => {
        x['parent'] = parent
        newData.push(x)
      })
      return newData
    },
    isChildren (data) {
      let count = 0
      data.forEach(x => {
        if (x.children && x.children.length > 0) count++
      })
      return count
    }
  }
}
</script>
<style lang="scss">
.sum-grid {
  background: #fff;
  position: relative;
  height: 100%;
  overflow: hidden;
  border-radius: 5px;
  border-right: 1px solid #dcdfe6;
  border-left: 1px solid #dcdfe6;
  border-bottom: 1px solid #dcdfe6;
  .is-loading {
    width: 100%;
    height: 100%;
    line-height: 100%;
    text-align: center;
    border-radius: 5px;
    position: absolute;
    left: 0;
    top: 0;
    background: #fff;
    z-index: 1000;
    border-top: 1px solid #dcdfe6;
    img {
      position: absolute;
      top: 50%;
      left: 50%;
      margin-top: -100px;
      margin-left: -100px;
    }
  }
  table {
    table-layout: fixed;
  }
  .loading-tr {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 30px;
    line-height: 30px;
    text-align: center;
    background-color: #fff;
    z-index: 100;
  }
}
</style>
