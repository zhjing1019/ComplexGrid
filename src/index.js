// 导入单个组件
import ComplexGrid from "./components/index.js";



const components = [
  ComplexGrid,
];

const install = function(Vue) {
  if (install.installed) return;
  install.installed = true;

  components.map(component => {
    Vue.component(component.name, component);
  });
};



if (typeof window !== "undefined" && window.Vue) {
  install(window.Vue);
}



// 这里可以用es6的解构语法导入组件 大概就是这个意思 毕竟没有用插件
export {
  ComplexGrid,
};
export default {
  install
};
