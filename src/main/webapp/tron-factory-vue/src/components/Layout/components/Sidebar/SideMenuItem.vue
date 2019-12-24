<template>
  <el-menu-item :index="routePath">
    <i :class="route.meta.icon" />
    <span slot="title">{{ $t(route.meta.name) }}</span>
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
  computed: {
    routePath() {
      return this.route.path
    },
  },
}
</script>

<style scoped lang="scss"></style>
