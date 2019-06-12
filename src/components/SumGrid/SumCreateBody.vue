<script type="text/jsx">
// 创建表格主体部分

import SvgIcon from '../SvgIcon.vue'
// import '@/common/icon/hang-cao-zuo.svg'
// import '@/common/icon/icon-tuozhuai.svg'
import OperateMenu from '../OperateMenu/OperateMenu.vue'
import SumCreateCheckbox from './SumCreateCheckbox.vue'

export default {
  data () {
    return {
    }
  },
  components: { SvgIcon, OperateMenu, SumCreateCheckbox },
  inject: ['table', 'tableSub'],
  render (h) {
    let tr = []
    if (this.table.data.length > 0) {
      let rows = this.table.data.map((r, index) => this.createRow(h, r, index, [], 1))
      tr = rows
    } else if (typeof this.table.empty === 'object') {
      this.table.borderBottom = false
      tr = this.createEmpty(h)
    };
    this.tdHeightGet()

    return (<tbody ref="allDataTbody">{tr}</tbody>)
  },

  methods: {
    tdHeightGet () {
      this.$nextTick(() => {
        if (
          this.$refs.allDataTbody &&
            this.$refs.allDataTbody.childNodes &&
            this.$refs.allDataTbody.childNodes.length > 0
        ) {
          this.$refs.allDataTbody.childNodes.forEach((x, index) => {
            if (this.tableSub.isAll) this.table.tdHeight[index] = x.offsetHeight
            x.childNodes[0].style.height = this.table.tdHeight[index] ? this.table.tdHeight[index] + 'px' : ''
          })
        }
      })
    },
    createEmpty (h) {
      let [cells, img] = [[], []]
      img.push(<img src={this.table.empty.imgSrc} style={{'vertical-align': 'middle'}}></img>)
      let count = this.table.actualFields.length + 1
      if (this.table.checkable) {
        count = this.table.actualFields.length + 2
      }
      cells.push(
        <td style={{
          width: '100%',
          height:
                    this.table.dataGridHeight - this.table.rowHeight - 40 + 'px',
          lineHeight:
                    this.table.dataGridHeight - this.table.rowHeight - 40 + 'px',
          textAlign: 'center'
        }}
        colspan={count}>{img}</td>
      )
      return h(
        'tr',
        {
          style: {}
        },
        cells
      )
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
    createRow (h, rowData, index, rows = [], level = 1) {
      let [cells, targetId, whereInsert, theme, isTree] = [[], this.table.targetId, this.table.whereInsert, this.table.theme, this.table.isTree]
      this.tableSub.nodes.all.push(rowData)
      let isDragActTop = isTree ? (rowData.id == targetId) && whereInsert == 'top' && theme !== 'red' : (index == targetId) && whereInsert == 'top' && theme !== 'red'
      let isDragActBottom = isTree ? (rowData.id == targetId) && whereInsert == 'bottom' && theme !== 'red' : (index == targetId) && whereInsert == 'bottom' && theme !== 'red'
      let isDragActTopRed = isTree ? (rowData.id == targetId) && whereInsert == 'top' && theme == 'red' : (index == targetId) && whereInsert == 'top' && theme == 'red'
      let isDragActBottomRed = isTree ? (rowData.id == targetId) && whereInsert == 'bottom' && theme == 'red' : (index == targetId) && whereInsert == 'bottom' && theme == 'red'
      let realIndex = isTree ? this.tableSub.getRank(rowData.id) : index
      if (this.table.checkable) {
        let checkbox = (<sum-create-checkbox rowData={rowData} realIndex={realIndex} isAll={false} onCheckChang={(val, rowData, index) => { this.$emit('checkChang', val, rowData, index) }}></sum-create-checkbox>)
        cells.push(<td class={{'act-top-drag': isDragActTop, 'act-bottom-drag': isDragActBottom, 'act-top-drag-red': isDragActTopRed, 'act-bottom-drag-red': isDragActBottomRed}} style={{ width: this.table.checkWidth + 'px', textAlign: this.table.textAlign}}>{checkbox}</td>)
      }
      let serial = index + 1 < 10 ? '0' + (index + 1) : index + 1
      if (!isTree) { cells.push(<td class={{'act-top-drag': isDragActTop, 'act-bottom-drag': isDragActBottom, 'act-top-drag-red': isDragActTopRed, 'act-bottom-drag-red': isDragActBottomRed}} style={{ width: this.table.serialWidth + 'px', textAlign: this.table.textAlign }}>{serial}</td>) }
      let expanded = this.table.expandStatus ? this.table.expandStatus[rowData.id] : false

      let isCurrnetHoverRow = false
      if (this.table.hoverRowData) { isCurrnetHoverRow = this.table.hoverRowData.id == rowData.id && isTree }
      let count = this.tableSub.onlyFix ? this.table.fixCols : this.table.actualFields.length
      for (let i = 0; i < count; i++) {
        let field = this.table.actualFields[i]
        if (i == 0) {
          cells.push(this.createFirstCell(h, rowData, field, level, index, i))
        } else {
          cells.push(
            this.createBodyCell(h, rowData, field, i + 1 == this.table.fixCols, index, i)
          )
        }
      }
      rows.push(<tr data-id={index}
        onmouseover={() => {
          this.table.hoverRowData = rowData
        }}
        onmouseout={
          event => {
            if (event.currentTarget != event.target) {
              return false
            }
            // 重置
            this.table.hoverRowData = null
          }}
        style={ { height: this.table.rowHeight + 'px' } }
        class={{ 'tr-active': isTree ? this.table.treeDataChecked.list[this.tableSub.getRank(rowData.id)] : this.table.checked.list[index], 'tr-hover': this.table.isTree ? isCurrnetHoverRow : this.table.hoverRow == index}}>
        {cells}
      </tr>)
      if (expanded && rowData.children && rowData.children.length > 0 && this.table.isTree) {
        rowData.children.forEach((child, y) =>
          this.createRow(h, child, y, rows, level + 1)
        )
      }
      return rows
    },
    // 创建第一列自定义的icon操作菜单
    createFirstSvgIcon (h, rowData, field, level, rowIndex, colIndex) {
      let SvgIcon = (<span
        class={{
          'tool-svg-icon': true,
          hide: !(this.table.hoverRowData == rowData) || !(Object.keys(this.table.OperateMenuData).length > 0)
        }}><svg-icon width={14} height={14} name={'hang-cao-zuo'}></svg-icon></span>)
      if (field.slot && Object.keys(this.tableSub.$scopedSlots).length > 0) {
        SvgIcon = h(
          'span',
          {
            class: 'tool-svg-icon',
            scopedSlots: this.tableSub.$scopedSlots[field.id],
            slot: field.id
          },
          this.tableSub.$scopedSlots[field.id]({
            field: field,
            rowData: rowData,
            hoverRow: this.table.hoverRow,
            rowIndex: rowIndex,
            colIndex: colIndex,
            hoverRowData: this.table.hoverRowData
          })
        )
      }
      return SvgIcon
    },
    // 创建第一列的工具图标和下拉操作菜单
    createFirstOperate (h, rowData, field, level, rowIndex) {
      let operateMenus = ''
      if (Object.keys(this.table.OperateMenuData).length > 0) {
        operateMenus = h(
          'operate-menu',
          {
            class: { operateMenu: true },
            style: { height: this.table.rowHeight + 'px' },
            on: {
              select: key => {
                if (this.table.rowMenuClick) {
                  this.table.rowMenuClick(key, rowData, this.table.isTree ? this.table.checked.list[this.tableSub.getRank(rowData.id)] : rowIndex)
                }
              }
            }
          },
          []
        )
      }
      return operateMenus
    },
    // 创建第一列树表格的展开操作符
    createFirstExpandIcon (rowData) {
      let expanded = this.table.expandStatus ? this.table.expandStatus[rowData.id] : false
      let vShowExpanded = (rowData.children && rowData.children.length > 0)
      let expandIcon = (<span
        class={{
          'el-tree-node__expand-icon el-icon-caret-right': true,
          expanded: expanded,
          expandedVisibility: !vShowExpanded
        }}
        onClick={(event) => {
          event.stopPropagation()
          this.iconClick(rowData)
          this.table.heightAdaption()
        }}>
      </span>)
      return expandIcon
    },
    // 创建第一列linkable
    createFirstLinkable (h, rowData, field, rowIndex, colIndex) {
      let a = (<a onclick={ () => {
        this.$emit('clickFirst', rowData, field, rowIndex, colIndex)
      }} class="link-a"> {rowData[field.id]} </a>)
      let [linkSlot, content] = ['', []]
      if (this.tableSub.$scopedSlots.linkSlot) {
        linkSlot = h(
          'span',
          {
            // 作用域插槽格式
            // { name: props => VNode | Array<VNode> }
            scopedSlots: this.tableSub.$scopedSlots[field.id],
            slot: 'linkSlot'
          },
          this.tableSub.$scopedSlots.linkSlot({
            field: field,
            rowData: rowData,
            hoverRow: this.table.hoverRow,
            rowIndex: rowIndex,
            colIndex: colIndex,
            hoverRowData: this.table.hoverRowData
          })
        )
      }

      if (this.table.linkSlot) {
        this.tableSub.$scopedSlots.linkSlot ? content = [linkSlot] : content = [rowData[field.id]]
      } else {
        field.linkable ? content = [a] : content = [rowData[field.id]]
      }
      return content
    },
    createFirstCell (h, rowData, field, level, rowIndex, colIndex) {
      let expandIcon = this.createFirstExpandIcon(rowData)
      let content = this.createFirstLinkable(h, rowData, field, rowIndex, colIndex)
      let [cell, targetId, isTree, whereInsert, theme, serialContent, isCurrnetHoverRow, isDragHoverRow] = [[], this.table.targetId, this.table.isTree, this.table.whereInsert, this.table.theme, [], false, false]
      let isDragActTop = isTree ? (rowData.id == targetId) && whereInsert == 'top' && theme !== 'red' : (rowIndex == targetId) && whereInsert == 'top' && theme !== 'red'
      let isDragActBottom = isTree ? (rowData.id == targetId) && whereInsert == 'bottom' && theme !== 'red' : (rowIndex == targetId) && whereInsert == 'bottom' && theme !== 'red'
      let isDragActTopRed = isTree ? (rowData.id == targetId) && whereInsert == 'top' && theme == 'red' : (rowIndex == targetId) && whereInsert == 'top' && theme == 'red'
      let isDragActBottomRed = isTree ? (rowData.id == targetId) && whereInsert == 'bottom' && theme == 'red' : (rowIndex == targetId) && whereInsert == 'bottom' && theme == 'red'
      let SvgIcon = this.createFirstSvgIcon(h, rowData, field, level, rowIndex, colIndex)
      let operateMenus = this.createFirstOperate(h, rowData, field, level, rowIndex)
      let dragSvg = (<span style={{position: 'absolute', left: '0', 'verticalAlign': 'middle', cursor: 'move'}} onclick={(event) => { console.log('click,%o', event) }}>
        <svg-icon style="vertical-align: middle; cursor:pointer" name="icon-tuozhuai" width={9} height={16}></svg-icon>
      </span>)
      let operateMenuData = {
        field: field,
        rowData: rowData,
        hoverRow: this.table.hoverRow,
        rowIndex: rowIndex,
        colIndex: colIndex,
        hoverRowData: this.table.hoverRowData
      }
      if (this.table.hoverRowData) {
        isCurrnetHoverRow = this.table.hoverRowData.id == rowData.id && this.table.isTree
        isDragHoverRow = this.table.hoverRow == rowIndex && this.table.isDrag
      }
      let [dragCon, oper, svg] = [[], '', '']
      if (isTree ? isCurrnetHoverRow : isDragHoverRow) dragCon = [dragSvg]
      isTree ? cell = [expandIcon, ...content] : cell = content
      serialContent = [...serialContent, ...cell]
      if ((isTree ? isCurrnetHoverRow : rowIndex != -1) && Object.keys(this.table.OperateMenuData).length > 0) { oper = operateMenus }
      if ((isTree ? isCurrnetHoverRow : rowIndex != -1)) { svg = SvgIcon }
      return (<td class={{'act-top-drag': isDragActTop, 'act-bottom-drag': isDragActBottom, 'act-top-drag-red': isDragActTopRed, 'act-bottom-drag-red': isDragActBottomRed}} style={{ width: field.width + 'px', textAlign: this.table.isTree ? 'left' : this.table.textAlign, paddingLeft: this.table.isTree ? level * 20 + 'px' : '', paddingRight: '20px'}}>
        <div class="pos-relative" style={{ width: field.width - 60 + 'px' }}>
          <span
            style={{ width: field.width - 60 + 'px' }}
            class="first-cell-drag tree-row"
            ref= {isTree ? 'id-' + rowData.id : 'id-' + rowIndex }
            tree-id={isTree ? rowData.id : rowIndex}
            draggable={this.table.isDrag}
            ondragover={(event) => { this.draging(event) }}
            ondragstart={(event) => { this.dragstart(event) }}
            ondragend={(event) => { this.dragend(event, rowData) }}>
            {dragCon}
            <span title={rowData[field.id]}>{serialContent}</span>
          </span>
          <span class="operMenu-span-mouse" onmouseenter= {() => { this.$emit('open', operateMenuData) }}>
            {[oper, svg]}
          </span>
        </div>
      </td>)
    },
    createBodyCell (h, rowData, field, borderRight, rowIndex, colIndex) {
      // 此处需要插入slot；
      let [targetId, isTree, whereInsert, theme] = [this.table.targetId, this.table.isTree, this.table.whereInsert, this.table.theme]
      let isDragActTop = isTree ? (rowData.id == targetId) && whereInsert == 'top' && theme !== 'red' : (rowIndex == targetId) && whereInsert == 'top' && theme !== 'red'
      let isDragActBottom = isTree ? (rowData.id == targetId) && whereInsert == 'bottom' && theme !== 'red' : (rowIndex == targetId) && whereInsert == 'bottom' && theme !== 'red'
      let isDragActTopRed = isTree ? (rowData.id == targetId) && whereInsert == 'top' && theme == 'red' : (rowIndex == targetId) && whereInsert == 'top' && theme == 'red'
      let isDragActBottomRed = isTree ? (rowData.id == targetId) && whereInsert == 'bottom' && theme == 'red' : (rowIndex == targetId) && whereInsert == 'bottom' && theme == 'red'
      if (field.slot && Object.keys(this.tableSub.$scopedSlots).length > 0) {
        return h(
          'td',
          {
            class: {borderRight, 'act-top-drag': isDragActTop, 'act-bottom-drag': isDragActBottom, 'act-top-drag-red': isDragActTopRed, 'act-bottom-drag-red': isDragActBottomRed},
            // 作用域插槽格式
            // { name: props => VNode | Array<VNode> }
            scopedSlots: this.tableSub.$scopedSlots[field.id],
            // 如果组件是其他组件的子组件，需为插槽指定名称
            slot: field.id
          },
          this.tableSub.$scopedSlots[field.id]({
            field: field,
            rowData: rowData,
            hoverRow: this.table.hoverRow,
            rowIndex: rowIndex,
            colIndex: colIndex,
            hoverRowData: this.table.hoverRowData
          })
        )
      } else {
        return (<td class={{borderRight, 'act-top-drag': isDragActTop, 'act-bottom-drag': isDragActBottom, 'act-top-drag-red': isDragActTopRed, 'act-bottom-drag-red': isDragActBottomRed}} style={{ width: field.width + 'px', textAlign: this.table.textAlign }}>
          {rowData[field.id]}
        </td>)
      }
    },
    // 展开子节点
    iconClick (rowData) {
      this.$set(this.table.expandStatus, rowData.id, !this.table.expandStatus[rowData.id])
    },
    getElementLeft (element) {
      var actualLeft = element.offsetLeft
      var current = element.offsetParent
      while (current !== null) {
        actualLeft += current.offsetLeft
        current = current.offsetParent
      }
      return actualLeft
    },
    getElementTop (element) {
      var actualTop = element.offsetTop
      var current = element.offsetParent
      while (current !== null) {
        actualTop += current.offsetTop
        current = current.offsetParent
      }
      return actualTop
    },
    clearHoverStatus () {
      this.table.targetId = ''
      this.table.dragTarget = []
      this.table.startDragId = ''
      this.table.whereInsert = ''
      this.tableSub.dragStartData = {}
      this.tableSub.dragEndData = {}
    },
    // 判断是否是
    // filter函数用来匹配当前鼠标悬浮在哪个行内，并对当前匹配的行进行高亮
    filter (x, y) {
      let rows = document.getElementsByClassName('tree-row')
      let targetId
      this.table.targetId = targetId
      const dragOriginElementTop = this.getElementTop(this.table.dragTarget[0])
      const dragOriginElementLeft = this.getElementLeft(this.table.dragTarget[0])
      const dragW = dragOriginElementLeft + this.table.dragTarget[0].offsetWidth
      const dragH = dragOriginElementTop + this.table.dragTarget[0].offsetHeight
      // 当前正在拖拽原始块不允许插入
      if (x >= dragOriginElementLeft && x < dragW && y >= dragOriginElementTop && y <= dragH) { return }

      for (let i = 0; i < rows.length; i++) {
        const row = rows[i]
        const rx = this.getElementLeft(row)
        const ry = this.getElementTop(row)
        const rw = row.offsetWidth
        const rh = row.offsetHeight
        if (x > rx && x < rx + rw && y > ry && y < ry + rh) {
          const diffY = y - ry
          let targetId = row.getAttribute('tree-id')
          this.table.targetId = targetId

          let whereInsert = ''
          this.table.whereInsert = whereInsert
          var rowHeight = row.offsetHeight
          if (diffY / rowHeight > 1 / 2) {
            whereInsert = 'bottom'
            this.table.whereInsert = whereInsert
          } else {
            whereInsert = 'top'
            this.table.whereInsert = whereInsert
          }
        }
      }
    },
    draging (e) {
      if (e.pageX == this.dragX && e.pageY == this.dragY) return
      this.tableSub.dragX = e.pageX
      this.tableSub.dragY = e.pageY
      // 改变鼠标目标元素的样式
      this.filter(e.pageX, e.pageY)
      if (this.tableSub.dragY - this.table.allDataPageY > (this.table.dataGridHeight - 70)) {
        this.table.scrollY += 10
      } else if (this.tableSub.dragY < (this.table.allDataPageY + 100)) {
        this.table.scrollY > 0 ? this.table.scrollY -= 10 : this.table.scrollY = 0
      }
    },
    dragend (e, dragData) {
      let dragEndData = {}
      this.tableSub.dragEndData = dragEndData
      e.target.classList.remove('drag-ing')
      if (this.table.isTree) {
        this.table.treeDataDetail.forEach(x => {
          if (x.id == this.table.targetId) dragEndData = x
        })
      } else {
        dragEndData = this.table.treeDataDetail[this.table.targetId]
      }
      this.tableSub.dragEndData = dragEndData

      let children = []
      if (dragData.children) { children = this.table.unfoldData(dragData.children) }
      children.forEach(x => {
        if (this.$refs['id-' + x.id]) {
          this.$refs['id-' + x.id].classList.remove('drag-ing')
        }
      })
      this.$emit('dragEnd', this.tableSub.dragStartData, this.tableSub.dragEndData, this.table.whereInsert)
      this.clearHoverStatus()
    },
    dragstart (e) {
      if (navigator.userAgent.indexOf('Firefox') >= 0) {
        // Firefox drag have a bug
        e.dataTransfer.setData('Text', this.id)
      }
      let startDragId = e.target.getAttribute('tree-id')
      this.table.startDragId = startDragId
      let dragTarget = [e.target]
      this.table.dragTarget = dragTarget
      let dragData = {}
      if (this.table.isTree) {
        this.table.treeDataDetail.forEach(x => {
          if (x.id == startDragId) dragData = x
        })
      } else {
        dragData = this.table.treeDataDetail[startDragId]
      }
      this.tableSub.dragStartData = dragData
      let children = []
      if (dragData.children) { children = this.table.unfoldData(dragData.children) }
      children.forEach(x => {
        if (this.$refs['id-' + x.id]) {
          this.$refs['id-' + x.id].classList.add('drag-ing')
        }
      })
      e.target.classList.add('drag-ing')
      this.tableSub.dragStart = dragData
    }
  }
}
</script>
<style lang="scss"></style>
