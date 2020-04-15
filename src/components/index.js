import SumGrid from "./SumGrid/SumGrid.vue";

// 为组件添加 install 方法，用于按需引入
SumGrid.install = function(Vue) {
  Vue.component(SumGrid.name, SumGrid);
};

export default SumGrid;
