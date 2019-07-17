<template>
  <div class="operate-menu" v-if="table.OperateMenuData.children">
    <el-menu :collapse="true" @select="handleSelect">
      <el-submenu :index="table.OperateMenuData.index">
        <div v-for="item in table.OperateMenuData.children" :key="item.index">
          <el-submenu v-if="item.children" :index="item.index">
            <span slot="title">{{ item.label }}</span>
            <el-menu-item
              :class="{ 'red-theme-menu': table.operateMenuTheme }"
              v-for="children in item.children"
              :key="children.index"
              :index="children.index"
            >
              <el-submenu v-if="children.children" :index="children.index">
                <span slot="title">{{ children.label }}</span>
                <el-menu-item
                  :class="{ 'red-theme-menu': table.operateMenuTheme }"
                  v-for="childs in children.children"
                  :key="childs.index"
                  :index="childs.index"
                >
                  {{ childs.label }}
                </el-menu-item>
              </el-submenu>
              <el-menu-item v-else :index="children.index" :class="{ 'red-theme-menu': table.operateMenuTheme }">
                {{ children.label }}
              </el-menu-item>
            </el-menu-item>
          </el-submenu>
          <el-menu-item v-else :index="item.index" :class="{ 'red-theme-menu': table.operateMenuTheme }">{{
            item.label
          }}</el-menu-item>
        </div>
      </el-submenu>
    </el-menu>
  </div>
</template>
<script>
export default {
  data () {
    return {}
  },
  inject: ['table'],
  methods: {
    handleSelect (key) {
      this.$emit('select', key)
    }
  }
}
</script>
<style lang="scss">
.el-menu-item,
.el-submenu__title {
  height: 30px;
  line-height: 30px;
}
.el-submenu .el-menu-item {
  height: 30px;
  line-height: 30px;
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
</style>
