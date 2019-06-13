<script type="text/jsx">
// 创建表格主体部分
import SvgIcon from '../SvgIcon.vue'
import '@/assets/icon/hang-cao-zuo.svg'
import '@/assets/icon/icon-tuozhuai.svg'
import OperateMenu from '../OperateMenu/OperateMenu.vue'

export default {
  data () {
    return {
      treeDataChecked: this.table.treeDataChecked,
      checked: this.table.checked
    }
  },
  components: { SvgIcon, OperateMenu },
  inject: ['table', 'tableSub'],
  render (h) {
    if (this.isAll) {
      return this.checkAllBox(h)
    } else {
      return (this.checkBox(h))
    }
  },
  props: {
    rowData: Object,
    realIndex: Number,
    isAll: Boolean
  },
  mounted () {
  },
  methods: {
    checkBox () {
      let isTree = this.table.isTree
      let checkbox = (<el-checkbox
        style={{width: this.table.checkWidth + 'px'}}
        ref={isTree ? this.rowData.id : ''}
        value={isTree
          ? (this.table.treeDataChecked.list[this.realIndex])
          : (this.table.checked.list[this.realIndex])}
        onchange={value => {
          this.$emit('checkChang', value, this.rowData, this.realIndex)
        }}></el-checkbox>)
      return checkbox
    },
    checkAllBox () {
      let checkbox = <el-checkbox
        style={{width: this.table.checkWidth + 'px'}}
        onchange={(value) => {
          this.$emit('checkAll', value)
        }}
        value={this.table.isTree ? this.table.treeDataChecked.all : this.table.checked.all}>
      </el-checkbox>
      return checkbox
    }

  }
}
</script>
<style lang="scss"></style>
