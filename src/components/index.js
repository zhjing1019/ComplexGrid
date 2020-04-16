import ComplexGrid from "./SumGrid/ComplexGrid.vue";

// 为组件添加 install 方法，用于按需引入
ComplexGrid.install = function(Vue) {
  Vue.component(ComplexGrid.name, ComplexGrid);
};

export default ComplexGrid;
