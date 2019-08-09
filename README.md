# grid

> 正常的表格展示  
> 树形结构的表格展示  
> 表格进行拖拽排序  
> 自定义表格内容   
> 拖拽表格数据   
> 多级表头展示  


### install dependencies 下载依赖包
npm install

### serve with hot reload at localhost:8080 启动项目
npm run dev

## 拖拽树形表格
![图片名称](https://github.com/zhjing1019/ComplexGrid/blob/master/static/img/complexVioFirst.gif)  
## 拖拽正常表格
![图片名称](https://github.com/zhjing1019/ComplexGrid/blob/master/static/img/complexVioThree.gif)  
## 树形表格自定义表格内容
![图片名称](https://github.com/zhjing1019/ComplexGrid/blob/master/static/img/complex1.png)  
## 多表头表格展示
![图片名称](https://github.com/zhjing1019/ComplexGrid/blob/master/static/img/complex2.png)  
## 数据为空表格展示
![图片名称](https://github.com/zhjing1019/ComplexGrid/blob/master/static/img/complex3.png)  
## 正常表格展示
![图片名称](https://github.com/zhjing1019/ComplexGrid/blob/master/static/img/complex4.png) 

# 组件的使用 
##### 下载组件 
`npm install complex-grid` 
##### 引用组件 
`import SumGrid from 'complex-grid'` 
##### 注册组件 
`components: { SumGrid },` 
### 组件的用法 
```
<sum-grid
      ref="treeGrid1"
      :fields="treeGridJson.fields"
      :data.sync="treeGridJson.data"
      :checkable="true"
      :isTree="true"
      :empty="empty"
      style="height: 300px"
      @clickFirst="testClick"
      @dragStart="dragstart"
      @dragEnd="dragendTree"
      @checkboxClick="checkboxClick"
      @checkAllClick="checkAllClick"
      :loadState="loadState"
      :isDrag="true"
    >
</sum-grid>
```
### 表格属性
##### fields代表表头字段
##### data代表数据
##### checkable可选择
##### isTree是否为树形结构表格，默认false
##### empty表格为空时所展示的图片
##### loadState 表格状态（ 0,表示加载数据成功。1，表示加载数据失败。2，表示没有可加载的数据。3，表示不用异步加载数据）
##### isDrag 表示是否可以拖拽
### 表格方法
##### clickFirst表格第一列被点击后的事件
##### dragStart开始拖拽时的事件（返回当前被拖拽的数据）
##### dragEnd拖拽结束后的事件（返回三个参数，开始被拖拽的数据，拖拽结束后的数据，拖拽后的位置）
如果可以拖拽,调用组件里的isQueryDrag方法，即可拿到拖拽后重新排列的数据
```
dragend (startval, endval, whereInsert) {
      let newData = this.$refs.treeGrid1.isQueryDrag(startval, endval, whereInsert)
      this.treeGrid1.data = [...newData]
    },
```
##### checkboxClick 复选框被选中事件
##### checkAllClick 表格被全选事件

### 组件调用事件
##### console.log(this.$refs[ref].selectRow)  表示选中行的数据
##### this.$refs[ref].isQueryDrag(startval, endval, whereInsert) 表示确定拖拽
##### this.$refs[ref].resetSumGridStyle () 重置表格




### fields表头字段 
```
{
      id: 'JGQC',
      title: '测试',
      linkable: true,
      width: 300
    },

    {
      id: 'JGJC',
      title: '测试',
      sortable: true,
      width: 190
    },
    {
      id: 'JGFZR',
      title: '测试',
      width: 150
    },
    
  ],
```
### 第一列特殊
##### 第一列linkable：表头可点击
##### 第一列slot：表头操作按钮部分自定义
##### width： 宽度
### 其他列
##### sortable：是否排序
##### slot：是否自定义
##### width： 宽度

### 树形结构数据
每行数据需要有id， children代表子节点数据
```
  data: [
    {
      id: 11111,
      JGQC: '二级2222222',
      JGJC: 'true',
      JGFZR: 'test',
      ZGJG: '总本部',
      JGLB: 'test',
      JGZT: 'test',
      JGSX: 'test',
      JGCJ: 'test',
      BZRS: '40',
      SYRS: '39',

      children: [
        {
          id: 22222,
          JGQC: '二级2222222',
          JGJC: 'true',
          JGFZR: 'test',
          ZGJG: '总本部',
          JGLB: 'test',
          JGZT: 'test',
          JGSX: 'test',
          JGCJ: 'test',
          BZRS: '40',
          SYRS: '39',

          children: [
            {
              id: 33333,
              JGQC: '二级2222222',
              JGJC: 'true',
              JGFZR: 'test',
              ZGJG: '总本部',
              JGLB: 'test',
              JGZT: 'test',
              JGSX: 'test',
              JGCJ: 'test',
              BZRS: '40',
              SYRS: '39'

            }
          ]
        },
        {
          id: 44444,
          JGQC: '二级2222222',
          JGJC: 'true',
          JGFZR: 'test',
          ZGJG: '总本部',
          JGLB: 'test',
          JGZT: 'test',
          JGSX: 'test',
          JGCJ: 'test',
          BZRS: '40',
          SYRS: '39'
        }
      ]
    },
    {
      id: 55555,
      JGQC: '翻页后的数据',
      JGJC: 'true',
      JGFZR: 'test',
      ZGJG: '总本部',
      JGLB: 'test',
      JGZT: 'test',
      JGSX: 'test',
      JGCJ: 'test',
      BZRS: '40',
      SYRS: '39'
    },
    {
      id: 66666,
      JGQC: '翻页后的数据',
      JGJC: 'true',
      JGFZR: 'test',
      ZGJG: '总本部',
      JGLB: 'test',
      JGZT: 'test',
      JGSX: 'test',
      JGCJ: 'test',
      BZRS: '40',
      SYRS: '39'
    },
  ],

```

