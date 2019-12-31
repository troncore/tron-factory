<template>
  <el-menu-item :index="routePath" :disabled="route.meta.disabled">
    <i :class="route.meta.icon" />
    <span slot="title">{{ $t(route.meta.title) }}</span>
  </el-menu-item>
</template>

<script>
export default {
  name: 'side-menu-item',
  props: {
    route: {
      type: Object,
      required: true,
    },
  },
  data () {
    return {
      authMenu: [

      ]
    }
  },
  computed: {
    routePath() {
      return this.route.path
    },
  },
}
</script>

<style scoped lang="scss">
.el-menu-item {
  margin-bottom: 15px;
}
</style>
