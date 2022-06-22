<template>
  <el-card>
    <el-row type="flex" justify="space-between" align="middle">
      <el-col>
        <div class="before" v-if="showBefore">
          <i class="el-icon-info"></i>
          <slot name="before"></slot>
        </div>
      </el-col>
      <el-col>
        <el-row type="flex" justify="end">
          <slot name="after"></slot>
        </el-row>
      </el-col>
    </el-row>
  </el-card>
</template>

<script>
export default {
  props: {
    showBefore: {
      type: Boolean,
      default: true,
    },
  },
};
</script>

<style scoped>
.page-tools {
  margin: 10px 0;
}

.before {
  line-height: 35px;
  display: inline-block;
  padding: 0 10px;
  border-radius: 3px;
  border: 1px solid #91d5ff;
  background: #e6f7ff;
}

.before i {
  margin-right: 5px;
  color: #409eff;
}
</style>