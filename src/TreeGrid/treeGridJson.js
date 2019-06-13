export default {
  fields: [
    {
      id: 'JGQC',
      title: '机构全称',
      linkable: true,
      width: 300
    },

    {
      id: 'JGJC',
      title: '机构简称',
      sortable: true,
      width: 190
    },
    {
      id: 'JGFZR',
      title: '机构负责人',
      width: 150
    },
    {
      id: 'ZGJG',
      title: '主管机构',
      width: 150
    },
    {
      id: 'JGLB',
      title: '机构类别',
      width: 150
    },
    {
      id: 'JGZT',
      title: '机构状态',
      width: 120
    },
    {
      id: 'JGSX',
      title: '机构属性',
      width: 150
    },
    {
      id: 'JGCJ',
      title: '机构层级',
      width: 150
    },
    {
      id: 'BZRS',
      title: '编制人数',
      width: 150
    },
    {
      id: 'SYRS',
      title: '实有人数',
      width: 150
    }
  ],
  data: [
    {
      id: 11111,
      JGQC: '城市股份有限公司-first',
      JGJC: 'false',
      JGFZR: '张三',
      ZGJG: '本部',
      JGLB: '直属',
      JGZT: '运营',
      JGSX: '外设单位',
      JGCJ: '一级部门',
      BZRS: '40',
      SYRS: '39',
      children: [
        {
          id: 22222,
          JGQC: '二级11111111111',
          JGJC: 'false',
          JGFZR: '张三',
          ZGJG: '总行本部',
          JGLB: '直属',
          JGZT: '运营',
          JGSX: '外设单位',
          JGCJ: '一级部门',
          BZRS: '40',
          SYRS: '39',
          children: [
            {
              id: 33333,
              JGQC: '三级',
              JGJC: 'false',
              JGFZR: '张三',
              ZGJG: '本部',
              JGLB: '直属',
              JGZT: '运营',
              JGSX: '外设单位',
              JGCJ: '一级部门',
              BZRS: '40',
              SYRS: '39'
            }
          ]
        },
        {
          id: 44444,
          JGQC: '二级2222222',
          JGJC: 'false',
          JGFZR: '张三',
          ZGJG: '总行本部',
          JGLB: '直属',
          JGZT: '运营',
          JGSX: '外设单位',
          JGCJ: '一级部门',
          BZRS: '40',
          SYRS: '39'
        }
      ]
    },
    {
      id: 55555,
      JGQC: '城市股份有限公司-second',
      JGJC: 'false',
      JGFZR: '李四',
      ZGJG: '本部',
      JGLB: '直属',
      JGZT: '运营',
      JGSX: '外设单位',
      JGCJ: '一级部门',
      BZRS: '40',
      SYRS: '39'
    },
    {
      id: 66666,
      JGQC: '城市股份有限公司-three',
      JGJC: 'true',
      JGFZR: '王五',
      ZGJG: '本部',
      JGLB: '直属',
      JGZT: '运营',
      JGSX: '外设单位',
      JGCJ: '一级部门',
      BZRS: '40',
      SYRS: '39'
    },
    {
      id: 77777,
      JGQC: '城市股份有限公司-four',
      JGJC: 'true',
      JGFZR: '小明',
      ZGJG: '本部',
      JGLB: '直属',
      JGZT: '运营',
      JGSX: '外设单位',
      JGCJ: '一级部门',
      BZRS: '40',
      SYRS: '39'
    },
    {
      id: 88888,
      JGQC: '城市股份有限公司-five',
      JGJC: 'true',
      JGFZR: '小红',
      ZGJG: '本部',
      JGLB: '直属',
      JGZT: '运营',
      JGSX: '外设单位',
      JGCJ: '一级部门',
      BZRS: '40',
      SYRS: '39'
    },
    {
      id: 99999,
      JGQC: '城市银股份有限公司-six',
      JGJC: 'true',
      JGFZR: '小花',
      ZGJG: '总本部',
      JGLB: '直属',
      JGZT: '运营',
      JGSX: '外设单位',
      JGCJ: '一级部门',
      BZRS: '40',
      SYRS: '39'
    },
    {
      id: 10101010,
      JGQC: '城市银股份有限公司-first',
      JGJC: 'true',
      JGFZR: '张三',
      ZGJG: '总本部',
      JGLB: '直属',
      JGZT: '运营',
      JGSX: '外设单位',
      JGCJ: '一级部门',
      BZRS: '40',
      SYRS: '39',
      children: [
        {
          id: 11111111,
          JGQC: '二级11111111111',
          JGJC: 'true',
          JGFZR: '张三',
          ZGJG: '总本部',
          JGLB: '直属',
          JGZT: '运营',
          JGSX: '外设单位',
          JGCJ: '一级部门',
          BZRS: '40',
          SYRS: '39',
          children: [
            {
              id: 12121212,
              JGQC: '三级',
              JGJC: 'true',
              JGFZR: '张三',
              ZGJG: '总本部',
              JGLB: '直属',
              JGZT: '运营',
              JGSX: '外设单位',
              JGCJ: '一级部门',
              BZRS: '40',
              SYRS: '39'
            },
            {
              id: 13131313,
              JGQC: '三级',
              JGJC: 'true',
              JGFZR: '张三',
              ZGJG: '总本部',
              JGLB: '直属',
              JGZT: '运营',
              JGSX: '外设单位',
              JGCJ: '一级部门',
              BZRS: '40',
              SYRS: '39'
            }
          ]
        },
        {
          id: 14141414,
          JGQC: '二级2222222',
          JGJC: 'true',
          JGFZR: '张三',
          ZGJG: '总本部',
          JGLB: '直属',
          JGZT: '运营',
          JGSX: '外设单位',
          JGCJ: '一级部门',
          BZRS: '40',
          SYRS: '39'
        }
      ]
    }
  ],
  OperateMenuData: {},
  addData: [
    {
      id: 151515,
      JGQC: '翻页后的数据-first',
      JGJC: 'false',
      JGFZR: '张三',
      ZGJG: '总本部',
      JGLB: '直属',
      JGZT: '运营',
      JGSX: '外设单位',
      JGCJ: '一级部门',
      BZRS: '40',
      SYRS: '39',
      children: [
        {
          id: 161616,
          JGQC: '翻页后的数据',
          JGJC: 'false',
          JGFZR: '张三',
          ZGJG: '总本部',
          JGLB: '直属',
          JGZT: '运营',
          JGSX: '外设单位',
          JGCJ: '一级部门',
          BZRS: '40',
          SYRS: '39',
          children: [
            {
              id: 171717,
              JGQC: '翻页后的数据',
              JGJC: 'false',
              JGFZR: '张三',
              ZGJG: '总本部',
              JGLB: '直属',
              JGZT: '运营',
              JGSX: '外设单位',
              JGCJ: '一级部门',
              BZRS: '40',
              SYRS: '39'
            }
          ]
        },
        {
          id: 181818,
          JGQC: '翻页后的数据',
          JGJC: 'false',
          JGFZR: '张三',
          ZGJG: '总本部',
          JGLB: '直属',
          JGZT: '运营',
          JGSX: '外设单位',
          JGCJ: '一级部门',
          BZRS: '40',
          SYRS: '39'
        }
      ]
    },
    {
      id: 191919,
      JGQC: '翻页后的数据-second',
      JGJC: 'false',
      JGFZR: '李四',
      ZGJG: '总本部',
      JGLB: '直属',
      JGZT: '运营',
      JGSX: '外设单位',
      JGCJ: '一级部门',
      BZRS: '40',
      SYRS: '39'
    },
    {
      id: 202020,
      JGQC: '翻页后的数据-three',
      JGJC: 'true',
      JGFZR: '王五',
      ZGJG: '总本部',
      JGLB: '直属',
      JGZT: '运营',
      JGSX: '外设单位',
      JGCJ: '一级部门',
      BZRS: '40',
      SYRS: '39'
    },
    {
      id: 212121,
      JGQC: '翻页后的数据-four',
      JGJC: 'true',
      JGFZR: '小明',
      ZGJG: '总本部',
      JGLB: '直属',
      JGZT: '运营',
      JGSX: '外设单位',
      JGCJ: '一级部门',
      BZRS: '40',
      SYRS: '39'
    },
    {
      id: 222222,
      JGQC: '翻页后的数据-five',
      JGJC: 'true',
      JGFZR: '小红',
      ZGJG: '总本部',
      JGLB: '直属',
      JGZT: '运营',
      JGSX: '外设单位',
      JGCJ: '一级部门',
      BZRS: '40',
      SYRS: '39'
    },
    {
      id: 232323,
      JGQC: '翻页后的数据-six',
      JGJC: 'true',
      JGFZR: '小花',
      ZGJG: '总本部',
      JGLB: '直属',
      JGZT: '运营',
      JGSX: '外设单位',
      JGCJ: '一级部门',
      BZRS: '40',
      SYRS: '39'
    },
    {
      id: 242424,
      JGQC: '翻页后的数据-first',
      JGJC: 'true',
      JGFZR: '张三',
      ZGJG: '总本部',
      JGLB: '直属',
      JGZT: '运营',
      JGSX: '外设单位',
      JGCJ: '一级部门',
      BZRS: '40',
      SYRS: '39',
      children: [
        {
          id: 252525,
          JGQC: '翻页后的数据',
          JGJC: 'true',
          JGFZR: '张三',
          ZGJG: '总本部',
          JGLB: '直属',
          JGZT: '运营',
          JGSX: '外设单位',
          JGCJ: '一级部门',
          BZRS: '40',
          SYRS: '39',
          children: [
            {
              id: 262626,
              JGQC: '翻页后的数据',
              JGJC: 'true',
              JGFZR: '张三',
              ZGJG: '总本部',
              JGLB: '直属',
              JGZT: '运营',
              JGSX: '外设单位',
              JGCJ: '一级部门',
              BZRS: '40',
              SYRS: '39'
            },
            {
              id: 272727,
              JGQC: '翻页后的数据',
              JGJC: 'true',
              JGFZR: '张三',
              ZGJG: '总本部',
              JGLB: '直属',
              JGZT: '运营',
              JGSX: '外设单位',
              JGCJ: '一级部门',
              BZRS: '40',
              SYRS: '39'
            }
          ]
        },
        {
          id: 282828,
          JGQC: '翻页后的数据',
          JGJC: 'true',
          JGFZR: '张三',
          ZGJG: '总本部',
          JGLB: '直属',
          JGZT: '运营',
          JGSX: '外设单位',
          JGCJ: '一级部门',
          BZRS: '40',
          SYRS: '39'
        }
      ]
    }
  ]
}
