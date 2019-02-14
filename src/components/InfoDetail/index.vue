<template>
  <el-dialog :visible.sync="visible" :show="show" @close="closeDialog">
    <el-table :data="detail" style="width: 100%">
      <el-table-column
        v-for="(item, index) in tableColumn"
        :prop="item.prop"
        :label="item.label"
        :key="index"
      >
      </el-table-column>
    </el-table>
  </el-dialog>
</template>

<script>
export default {
  name: "index",
  props: ["detail", "tableColumn", "show"],
  data() {
    return {
      visible: this.show
    };
  },
  methods: {
    closeDialog: function() {
      this.$emit("update:show", false);
    }
  },
  watch: {
    show() {
      this.visible = this.show;
    }
  }
};
</script>

<style scoped></style>
