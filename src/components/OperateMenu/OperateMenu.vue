<template>
  <div class="operate-menu" v-if="table.OperateMenuData.children.length > 0">
    <el-menu :collapse="true" @select="handleSelect" :popper-append-to-body="true">
      <el-submenu :index="table.OperateMenuData.index" :hide-timeout="0">
        <div v-for="item in table.OperateMenuData.children" :key="item.index">
          <el-submenu v-if="item.children" :index="item.index" :hide-timeout="0">
            <span slot="title">{{ item.label }}</span>
            <el-menu-item
              :class="{ 'red-theme-menu': table.operateMenuTheme }"
              class="padding-left-0"
              v-for="children in item.children"
              :key="children.index"
              :index="children.index"
            >
              <el-submenu v-if="children.children" :index="children.index" :hide-timeout="0">
                <span slot="title" :class="item.lineHead ? 'activeColor' : ''">{{ children.label }}</span>
                <el-menu-item
                  :class="{ 'red-theme-menu': table.operateMenuTheme }"
                  v-for="childs in children.children"
                  :key="childs.index"
                  :index="childs.index"
                  >{{ childs.label }}</el-menu-item
                >
              </el-submenu>
              <el-menu-item v-else :index="children.index" :class="{ 'red-theme-menu': table.operateMenuTheme }">{{
                children.label
              }}</el-menu-item>
            </el-menu-item>
          </el-submenu>
          <el-menu-item
            v-else
            :index="item.index"
            :class="{ 'red-theme-menu': table.operateMenuTheme, activeColor: item.lineHead }"
            >{{ item.label }}</el-menu-item
          >
        </div>
      </el-submenu>
    </el-menu>
  </div>
  <!-- <div v-else>
    <el-menu>
      <el-menu-item index="0">没有操作菜单</el-menu-item>
    </el-menu>
  </div> -->
</template>
<script>
export default {
  data() {
    return {};
  },
  inject: ["table"],
  methods: {
    handleSelect(key) {
      this.$emit("select", key);
    }
  }
};
</script>
<style lang="scss">
.el-menu-item,
.el-submenu__title {
  height: 30px;
  line-height: 30px;
}
.padding-left-0 {
  padding-left: 0 !important;
}
.el-submenu .el-menu-item {
  height: 30px;
  line-height: 30px;
  padding: 0;
}
.el-submenu > .el-menu-item {
  padding-left: 0 !important;
}
.el-menu-item:hover {
  background-color: #f5f7fa;
  color: #4786ff;
}
.red-theme-menu:hover {
  background-color: #f5f7fa;
  color: #e52f32;
}
.red-theme-menu.is-active {
  color: #e52f32;
}
.activeColor {
  border-top: 1px solid #ebeef4;
}
.empty-operate-menu {
  width: 200px;
  height: 30px;
  line-height: 30px;
}
</style>
