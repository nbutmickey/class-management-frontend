<template>
  <el-menu-item :index="item.path">
    <i :class="item.meta.icon" style="margin-right: 5px"></i> <span>{{ item.meta.title }}</span>
  </el-menu-item>
</template>

<script>
import path from "path";
export default {
  name: "SiderBarItem",
  props: {
    item: {
      type: Object,
      default: ""
    }
  },
  methods: {
    // resolvePath(routePath){
    //   return path.resolve(this.basePath,routePath);
    // }
  }
};
</script>

<style scoped></style>
