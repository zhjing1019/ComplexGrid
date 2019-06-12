<script type="text/jsx">
import Vue from 'vue'
// import '@/common/icon/hang-cao-zuo.svg'
// import '@/common/icon/icon-tuozhuai.svg'
import SvgIcon from '../SvgIcon.vue'
import SumCreateHead from './SumCreateHead.vue'
import SumCreateBody from './SumCreateBody.vue'
document.body.ondrop = function (event) {
  event.preventDefault()
  event.stopPropagation()
}
export default {
  data () {
    return {
      checkAllData: [],
      countData: [],
      autWidth: 0,
      currentOverRow: null,
      nodes: {},
      dragX: 0,
      dragY: 0,
      dragStartData: {},
      dragEndData: {},
      keyCount: 1
    }
  },
  components: { SvgIcon, SumCreateHead, SumCreateBody },
  inject: ['table'],
  provide () {
    return {
      tableSub: this
    }
  },
  props: {
    isAll: {
      type: Boolean,
      defaule: false
    },
    allRow: {
      type: Boolean,
      default: false
    },
    onlyFix: {
      type: Boolean,
      default: false
    },
    hoverRow: {
      type: Number
    },
    hoverRowData: {
      type: Object
    }

  },
  render (h) {
    this.nodes.all = []
    let items = []
    this.nodeIndexTotalizer = 0
    items.push(<sum-create-head key={this.keyCount} onCheckAll={(val) => { this.checkAll(val) }}></sum-create-head>)
    if (this.allRow) items.push(<sum-create-body key={this.keyCount - 1} onCheckChang={(val, rowData, index) => { this.checkChang(val, rowData, index) }} onClickFirst = {(rowData, field, rowIndex, colIndex) => { this.$emit('clickFirst', rowData, field, rowIndex, colIndex) }} onOpen = {(operateMenuData) => { this.$emit('open', operateMenuData) }} onDragEnd = {(dragStartData, dragEndData, whereInsert) => { this.$emit('dragEnd', dragStartData, dragEndData, whereInsert) }}></sum-create-body>)
    if (this.table.isSlotFooter && this.allRow) { items.push(this.creatSlotFooter(h)) }
    return <table ref="sumGridClick" class="sum-data-grid" style={{textAlign: this.table.textAlign}} onmouseover={(e) => this.tableHover(e)}>{items}</table>
  },
  methods: {
    creatSlotFooter (h) {
      if (this.$scopedSlots.slotFooter) {
        return h(
          'tbody',
          {
            scopedSlots: this.$scopedSlots.slotFooter,
            slot: 'slotFooter'
          },
          this.$scopedSlots.slotFooter({})
        )
      }
    },
    getRank (id) {
      if (this.table.isTree) {
        for (let i = 0; i < this.table.treeDataDetail.length; i++) {
          if (id === this.table.treeDataDetail[i].id) {
            return i
          }
        }
      }
    },
    checkChang (value, rowData, index) {
      console.log(value)
      let length = this.table.isTree ? this.table.treeAllData(this.table.data).length : this.table.data.length
      if (this.table.isTree) {
        Vue.set(this.table.treeDataChecked.list, this.getRank(rowData.id), value)
        this.getSelectedRows(value)
        let count = 0
        this.table.treeDataChecked.list.forEach(x => {
          if (x) count++
        })
        count == length
          ? (this.table.treeDataChecked.all = true)
          : (this.table.treeDataChecked.all = false)
      } else {
        Vue.set(this.table.checked.list, index, value)
        let count = 0
        this.table.checked.list.forEach(x => {
          if (x) count++
        })
        count == length
          ? (this.table.checked.all = true)
          : (this.table.checked.all = false)
      }
      this.getSelectedRows(value)
      this.$emit('checkboxClick', value, rowData, index)
      this.keyCount++
    },

    checkAll (value) {
      if (this.table.isTree) {
        this.table.treeDataChecked.all = value
        this.table.treeDataChecked.list.fill(value, 0, this.table.treeAllData(this.table.data).length)
        this.getSelectedRows(value)
      } else {
        this.table.checked.all = value
        this.table.checked.list.fill(value, 0, this.table.data.length)
        this.getSelectedRows(value)
      };
      let data = []
      value ? data = this.checkAllData : data = []
      this.$emit('checkAllClick', value, data)
      this.keyCount++
    },
    getSelectedRows () {
      // 获取选中行
      let data = []
      if (this.table.isTree) {
        let allData = this.table.treeAllData(this.table.data)
        this.table.treeDataChecked.list.forEach((val, index) => {
          if (val) {
            allData.forEach(x => {
              if (x.rank === index) {
                data.push(x)
              }
            })
          }
        })
      } else {
        this.table.checked.list.forEach((val, index) => {
          if (val) {
            data.push(this.table.data[index])
          }
        })
      };
      this.checkAllData = data
      this.table.selectRow = data
      this.keyCount++
    },
    tableHover (event) {
      event.stopPropagation()
      // event.preventDefault();
      let rowIndex
      let target = event.target
      let nodeName = target.localName ? target.localName : ''
      if (nodeName == null) return
      let parentTa = ''
      if (nodeName == 'td') {
        rowIndex = target.parentNode.rowIndex - this.table.allHeadRow.length
      } else if (nodeName == 'th' || nodeName == 'table') {
        rowIndex = -1
      } else {
        parentTa = this.getParentTag(target)
        if (parentTa) {
          rowIndex = parentTa.parentNode.rowIndex - this.table.allHeadRow.length
        } else {
          rowIndex = this.table.hoverRow
        }
      }
      this.$emit('update:hoverRow', rowIndex)
    },
    getParentTag (startTag) {
      var self = this
      // 传入标签是否是DOM对象
      if (!(startTag instanceof HTMLElement)) return
      // 父级标签是否是body,是着停止返回集合,反之继续
      let nodeName = ''
      if (startTag.parentElement) {
        nodeName = startTag.parentElement.nodeName ? startTag.parentElement.nodeName : ''
      } else {
        return
      }
      if (nodeName !== 'BODY') {
        if (nodeName == 'TD') {
          return startTag.parentElement
        } else {
          if (startTag.parentElement.parentElement) {
            return self.getParentTag(startTag.parentElement)
          } else {
            return false
          }
        }
      }
    }
  }
}
</script>
<style lang="scss">
.sum-data-grid {
  position: absolute;
  overflow: hidden;
  border: 1px solid #dcdfe6;
  border-top: 0;
  border-collapse: collapse;
  user-select: none;
  background-color: #fff;
  .expandedVisibility {
    visibility: hidden;
  }
  .is-draging .tree-row:hover {
    background: transparent !important;
  }
  .tr-active {
    background-color: rgba(71, 134, 255, 0.1);
  }
  .tr-hover {
    background-color: #f8f8f8;
  }
  .borderRight {
    border-right: 1px solid #d9d9d9;
  }
  th {
    color: #3e444f;
    font-size: 14px;
    // border-left: 1px solid rgba(220, 223, 230, 1);
    border-bottom: 1px solid rgba(220, 223, 230, 1);
    box-sizing: border-box;
    padding: 10px;
    .arrow-content {
      display: inline-block;
      position: relative;
      width: 5px;
      height: 15px;
      top: 5px;
      .up-arrow {
        position: absolute;
        border: 6px solid transparent;
        border-bottom-color: #adafb3;
        width: 0px;
        height: 0px;
        top: -9px;
        cursor: pointer;
      }
      .down-arrow {
        position: absolute;
        border: 6px solid transparent;
        border-top-color: #adafb3;
        width: 0px;
        height: 0px;
        top: 6px;
        cursor: pointer;
      }
      .up-arrow-active {
        border-bottom-color: #4786ff;
      }
      .down-arrow-active {
        border-top-color: #4786ff;
      }
    }
  }
  td {
    box-sizing: border-box;
    padding: 10px;
    color: #303133;
    font-size: 12px;
    position: relative;
    .pos-relative {
      // position: relative;
      margin-left: -15px;
      width: 100%;
      .drag-ing {
        opacity: 0.8;
        background: rgba(196, 216, 255, 1);
      }
      .first-cell-drag {
        width: 100%;
        padding: 0 19px 0 10px;
        display: inline-block;
        box-sizing: border-box;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .operateMenu {
        position: absolute;
        right: 5px;
        width: 14px;
        top: -6px;
        background-color: transparent;
        z-index: 2;
        .el-menu--collapse {
          width: 14px;
        }
        .el-menu {
          border-right: 0;
          background-color: transparent;
        }
        .el-submenu__title {
          padding: 0 !important;
        }
        .el-submenu__title:hover {
          background-color: transparent;
        }
      }
    }
    .tool-svg-icon {
      position: absolute;
      right: 5px;
      cursor: pointer;
    }

    .hide {
      visibility: hidden;
    }
    .link-a {
      text-decoration: none;
      color: #303133;
    }
    .link-a:hover {
      color: #4786ff;
      text-decoration: underline;
      cursor: pointer;
    }
  }
  .act-top-drag {
    border-top: 2px solid #4786ff !important;
  }
  .act-bottom-drag {
    border-bottom: 2px solid #4786ff !important;
  }
  .act-top-drag-red {
    border-top: 2px solid #e32b30 !important;
  }
  .act-bottom-drag-red {
    border-bottom: 2px solid #e32b30 !important;
  }
  th,
  td {
    box-sizing: border-box;
    padding: 10px;
    border-top: 1px solid rgba(220, 223, 230, 1);
    box-sizing: border-box;
    position: relative;
  }
}
</style>
