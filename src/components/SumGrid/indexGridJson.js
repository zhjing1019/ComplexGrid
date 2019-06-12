export default {
  fields: [
    {
      id: 'name',
      title: '指标名称',
      width: 250,
      slot: true
    },
    {
      id: 'zbjs',
      title: '指标解释'
    },
    {
      id: 'status',
      title: '指标状态',
      width: 200,
      slot: true
    }
  ],
  data: [
    {
      name: '思想政治建设',
      zbjs:
        '是否认真贯彻落实“两学一做”要求，通过定期组织支部学习、书记讲党课、组织党员政治学习等活动，及时认真学习贯彻党和国家重要会议、文件精神、习总书记系列重要讲话精神，中国特色社会主义理论、党和国家制度法规，公司党委重要精神等，加强思想理论武装，提高党员干部的政治理论素养，强化理想信念、宗旨意识、党性修养、规矩准则意识。',
      status: true
    }
  ],
  OperateMenuData: {
    index: '1',
    children: [
      {
        index: '1-1',
        label: '选项1',
        children: [
          {
            index: '1-1-1',
            label: '选项1-1'
          },
          {
            index: '1-1-2',
            label: '选项1-2'
          },
          {
            index: '1-1-3',
            label: '选项1-3'
          }
        ]
      },
      {
        index: '1-2',
        label: '选项2'
      },
      {
        index: '1-3',
        label: '选项3'
      },
      {
        index: '1-4',
        label: '选项4',
        children: [
          {
            index: '1-4-1',
            label: '选项4-1'
          },
          {
            index: '1-4-2',
            label: '选项4-2'
          },
          {
            index: '1-4-3',
            label: '选项4-3'
          },
          {
            index: '1-4-4',
            label: '选项4-4'
          }
        ]
      }
    ]
  }
}
