<template>
  <div style="padding: 15px; height: 200px">
    <h1>树形结构可支持拖拽的表格（自定义表格td里的内容）</h1>
    <sum-grid
      ref="treeGrid1"
      :fields="treeGridJson.fields"
      :data.sync="treeGridJson.data"
      :checkable="true"
      :isTree="true"
      :empty="empty"
      style="height: 300px"
      @clickFirst="testClick"
      @dataPage="dataPage"
      @dragStart="dragstart"
      @dragEnd="dragendTree"
      @checkboxClick="checkboxClick"
      @checkAllClick="checkAllClick"
      :loadState="loadState"
      :isDrag="true"
    >
    </sum-grid>
    <br />
    <el-row>
      <el-button type="primary" @click="getTreeData('treeGrid1')" plain style="margin-right: 10px"
        >获取表格选中值</el-button
      >
      <el-button type="primary" @click="clear('treeGrid1')" plain style="margin-right: 10px">清空选中值</el-button>
    </el-row>
    <br />
    <h1>树形结构表格（可自定义表格内容）</h1>
    <sum-grid
      ref="treeGrid2"
      :fields="treeGridJson2.fields"
      :data.sync="treeGridJson2.data"
      :checkable="true"
      :isTree="true"
      :loadState="3"
      theme="red"
      @clickFirst="testClick"
      @open="open"
      :OperateMenuData="treeGridJson2.OperateMenuData"
    >
      <template slot="JGFZR" slot-scope="field">
        <span>自定义内容</span>
        <span>{{ field.field.rowData[field.field.field.id] }}</span>
        <img src="./duihao.png" alt="" />
      </template>
    </sum-grid>
    <br />
    <el-row>
      <el-button type="primary" @click="getTreeData('treeGrid2')" plain style="margin-right: 10px"
        >获取表格选中值</el-button
      >
      <el-button type="primary" @click="clear('treeGrid2')" plain style="margin-right: 10px">清空选中值</el-button>
    </el-row>
    <br />
    <h1>多表头表格展示</h1>
    <sum-grid
      ref="dataGrid1"
      :fields="dataGrid1.fields"
      :data.sync="dataGrid1.data"
      :checkable="true"
      textAlign="left"
      :isTree="false"
      :loadState="3"
    >
    </sum-grid>
    <br />
    <el-row>
      <el-button type="primary" @click="getTreeData('dataGrid1')" plain style="margin-right: 10px"
        >获取表格选中值</el-button
      >
      <el-button type="primary" @click="clear('dataGrid1')" plain style="margin-right: 10px">清空选中值</el-button>
    </el-row>
    <br />
    <h1>表格为空</h1>
    <sum-grid
      ref="emptyTable"
      :fields="emptyData.fields"
      :data="emptyData.data"
      :checkable="false"
      textAlign="left"
      :isTree="false"
      :empty="empty"
      style="height: 400px"
    >
    </sum-grid>
    <br />
    <h1>可拖拽排序表格</h1>
    <sum-grid
      ref="dataGrid2"
      :fields="dataGrid2.fields"
      :data.sync="dataGrid2.data"
      :checkable="true"
      textAlign="left"
      :isTree="false"
      :isDrag="true"
      theme="red"
      @dragStart="dragstart"
      @dragEnd="dragend"
      :OperateMenuData="dataGrid2.OperateMenuData"
      @clickFirst="testClick"
    >
      <template slot="JGFZR" slot-scope="field">
        <span>自定义内容</span>
        <span>{{ field.field.rowData[field.field.field.id] }}</span>
        <img src="./duihao.png" alt="" />
      </template>
    </sum-grid>
    <br />
    <el-row>
      <el-button type="primary" @click="getTreeData('dataGrid2')" plain style="margin-right: 10px"
        >获取表格选中值</el-button
      >
      <el-button type="primary" @click="clear('dataGrid2')" plain style="margin-right: 10px">清空选中值</el-button>
    </el-row>
    <br />

    <sum-grid
      ref="dataGrid3"
      :fields="dataGrid3.fields"
      :data.sync="testData"
      :checkable="true"
      textAlign="left"
      :isTree="false"
      @checkboxClick="checkboxClick"
      @checkAllClick="checkAllClick"
    >
      <template slot="JGQC" slot-scope="field" class="fl-td">
        <span
          v-if="field.field.rowIndex === field.field.hoverRow"
          class="icon-del-index"
          @click="del(field.field.rowIndex)"
        >
          <svg-icon name="icon-ziyuan13" :width="16" :height="16"></svg-icon>
        </span>

        <span
          v-if="field.field.rowIndex === field.field.hoverRow"
          class="icon-del-index"
          @click="del(field.field.rowIndex)"
        >
          <svg-icon name="icon-fuzhi" :width="16" :height="16"></svg-icon>
        </span>

        <span v-if="field.field.rowIndex === field.field.hoverRow" class="icon-del-index">
          <svg-icon name="icon-edit" :width="16" :height="14"></svg-icon>
        </span>
      </template>
    </sum-grid>
    <br />
    <el-row>
      <el-button type="primary" @click="getTreeData('dataGrid3')" plain style="margin-right: 10px"
        >获取表格选中值</el-button
      >
      <el-button type="primary" @click="clear('dataGrid3')" plain style="margin-right: 10px">清空选中值</el-button>
    </el-row>
    <br />
  </div>
</template>

<script>
import '@/assets/icon/hang-cao-zuo.svg'
import '@/assets/icon/icon-tuozhuai.svg'
import SumGrid from '@/components/SumGrid/SumGrid.vue'
import treeGridJson from './treeGridJson.js'
import treeGridJson2 from './treeGridJson2.js'
import dataGrid1 from './dataGrid1.js'
import dataGrid2 from './dataGrid2.js'
import dataGrid3 from './dataGrid3.js'
import emptyData from './emptyData.js'
import emptyPng from './empty.png'
import SvgIcon from '@/components/SvgIcon.vue'
import { setTimeout } from 'timers'

export default {
  name: 'TreeGrid',
  components: { SumGrid, SvgIcon },
  data () {
    return {
      testData: [],
      isDrag: true,
      treeGridJson: treeGridJson,
      treeGridJson2: treeGridJson2,
      dataGrid1: dataGrid1,
      dataGrid2: dataGrid2,
      dataGrid3: dataGrid3,
      emptyData: emptyData,
      empty: {
        imgSrc: emptyPng
      },
      loadState: 0
    }
  },
  mounted () {
    setTimeout(() => {
      this.testData = dataGrid3.data
    }, 1000)
  },
  methods: {
    checkAllClick (value, data) {
      console.log(value)
      console.log(data)
      console.log(this.$refs['dataGrid3'].selectRow)
    },
    checkboxClick (value, rowData, index) {
      console.log(value, rowData, index)
    },
    open (data) {
      console.log(data)
    },
    dragend (startval, endval, whereInsert) {
      let newData = this.$refs.dataGrid2.isQueryDrag(startval, endval, whereInsert)
      this.dataGrid2.data = [...newData]
    },
    dragendTree (startval, endval, whereInsert) {
      let newData = this.$refs.treeGrid1.isQueryDrag(startval, endval, whereInsert)
      this.treeGridJson.data = [...newData]
    },
    dragstart (val) {
      console.log(val)
    },
    dataPage (val) {
      setTimeout(() => {
        console.log('正在翻页正在翻页正在翻页正在翻页正在翻页')
        this.loadState = 0
        this.treeGridJson.data = [...this.treeGridJson.data, ...treeGridJson.addData]
        console.log('第几页', val)
      }, 1000)
    },
    switchChange (val) {
      console.log('switch值改变', val)
    },
    del (value) {
      alert(1)
      console.log(value)
    },
    // 获得选中值
    getTreeData (ref) {
      console.log(this.$refs[ref].selectRow)
    },
    // 清空值
    clear (ref) {
      this.$refs[ref].clearData()
    },
    testClick (rowData, field, rowIndex, colIndex) {
      console.log(rowData)
      console.log(field)
      console.log(rowIndex)
      console.log(colIndex)
    }
  }
}
</script>

<style>
.icon-del-index {
  float: right;
  margin-right: 10px;
  cursor: pointer;
}
</style>
