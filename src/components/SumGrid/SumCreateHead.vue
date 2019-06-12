<script type="text/jsx">
import SumCreateCheckbox from './SumCreateCheckbox.vue'

// 创建表格头部
export default {
  data () {
    return {}
  },
  components: { SumCreateCheckbox },

  inject: ['table', 'tableSub'],
  render (h) {
    let tr = this.createHead(h)
    return <thead>{tr}</thead>
  },
  methods: {
    createHead (h) {
      let tr = []
      this.table.allHeadRow.forEach((x, index) => {
        if (index == 0) {
          tr.push(<tr style={{height: this.table.rowHeight + 'px'}}>{this.creatFirstHeadTr(h)}</tr>)
        } else {
          let cells = []
          let count = this.tableSub.onlyFix ? this.table.fixCols - 1 : x.length
          for (let i = 0; i < count; i++) {
            cells.push(this.createHeadCell(h, x[i], i + 1 == this.table.fixCols))
          }

          tr.push(<tr style={{height: this.table.rowHeight + 'px'}}>{cells}</tr>)
        }
      })
      // return <thead>{tr}</thead>
      return tr
    },
    creatFirstHeadTr (h) {
      let cells = []
      let rowspanCount = this.table.allHeadRow && this.table.allHeadRow.length ? this.table.allHeadRow.length : 1
      if (this.table.checkable) {
        let checkbox = (<sum-create-checkbox onCheckAll={(val) => { this.$emit('checkAll', val) }} rowData={{}} realIndex={-1} isAll={true}></sum-create-checkbox>)
        let th = <th rowspan={rowspanCount} style={{width: this.table.checkWidth + 'px', textAlign: this.table.textAlign, borderRight: this.table.moreHead ? '' : '1px solid #d9d9d9'}}>{checkbox}</th>
        cells.push(th)
      }
      let thTwo = <th rowspan={rowspanCount} style={{width: this.table.serialWidth + 'px', textAlign: this.table.textAlign, borderRight: this.table.moreHead ? '' : '1px solid #d9d9d9'}}>序号</th>
      if (!this.table.isTree) cells.push(thTwo)
      let count = this.tableSub.onlyFix ? this.table.fixCols : this.table.fields.length
      for (let i = 0; i < count; i++) {
        cells.push(this.createHeadCell(h, this.table.fields[i], i + 1 == this.table.fixCols))
      }
      return cells
    },
    spanCount (field) {
      let [data, colspan, rowspan] = [this.table.headGrage([field]), 1, 1]
      let rowspanCount = this.table.allHeadRow && this.table.allHeadRow.length ? this.table.allHeadRow.length : 1

      if (data.length > 1) {
        colspan = data[data.length - 1].length
        rowspan = rowspanCount - data.length == 0 ? 1 : rowspanCount - data.length
      } else {
        colspan = 1
        rowspan = rowspanCount
      }
      return {colspan: colspan, rowspan: rowspan}
    },
    createHeadCell (h, field, borderRight) {
      let self = this
      let headContent = []
      if (field.sortable) {
        let spanClass = {
          'up-arrow': true,
          'up-arrow-active':
                    self.table.sorted &&
                    self.table.sorted.findIndex(s => s.id == field.id) != -1 &&
                    self.table.sorted[
                      self.table.sorted.findIndex(s => s.id == field.id)
                    ].asc
        }
        let spanDownClass = {
          'down-arrow': true,
          'down-arrow-active':
                    self.table.sorted &&
                    self.table.sorted.findIndex(s => s.id == field.id) != -1 &&
                    !self.table.sorted[
                      self.table.sorted.findIndex(s => s.id == field.id)
                    ].asc
        }
        let arrowSpan = (<span class="arrow-content" onClick={() => this.sortOrder(field.id)}>
          <span class={spanClass}></span>
          <span class={spanDownClass}></span>
        </span>)
        headContent.push(field.title, arrowSpan)
      } else {
        headContent.push(field.title)
      }
      return (<th colspan={this.spanCount(field).colspan} rowspan={this.spanCount(field).rowspan} style={{ width: field.width + 'px', height: this.table.rowHeight + 'px', textAlign: this.table.textAlign, borderRight: this.table.moreHead ? '' : '1px solid #d9d9d9' }} class={borderRight}>{headContent}</th>)
    },
    sortOrder (currentId) {
      let index = this.table.sorted.findIndex(s => currentId == s.id)
      if (index == -1) {
        // sorted中没有，追加
        this.table.sorted.push({
          id: currentId,
          asc: true
        })
        if (this.table.sorted.length > 3) {
          // sorted超过三个，删除第一个
          this.table.sorted.splice(0, 1)
        }
      } else {
        let s = this.table.sorted[index]
        if (s.asc) {
          // sorted存在，且是升序，变成降序
          s.asc = false
        } else {
          // sorted存在，且是降序，删除该元素
          this.table.sorted.splice(index, 1)
        }
      }
    }

  }
}
</script>
