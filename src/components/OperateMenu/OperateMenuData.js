export default {
  data: {
    index: "1",
    children: [
      {
        index: "1-1",
        label: "选项1",
        children: [
          {
            index: "1-1-1",
            label: "选项1-1"
          },
          {
            index: "1-1-2",
            label: "选项1-2"
          },
          {
            index: "1-1-3",
            label: "选项1-3"
          }
        ]
      },
      {
        index: "1-2",
        label: "选项2"
      },
      {
        index: "1-3",
        label: "选项3"
      },
      {
        index: "1-4",
        label: "选项4",
        children: [
          {
            index: "1-4-1",
            label: "选项4-1"
          },
          {
            index: "1-4-2",
            label: "选项4-2"
          },
          {
            index: "1-4-3",
            label: "选项4-3"
          },
          {
            index: "1-4-4",
            label: "选项4-4"
          }
        ]
      }
    ]
  }
};
