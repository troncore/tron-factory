<template>
  <el-menu-item
    v-if="!menuItem.children || !menuItem.children.length"
    :index="menuItem.path"
    :disabled="menuItem.disabled">
    <i class="menu-icon" :class="menuItem.icon" />
    <span slot="title"> {{ $t(menuItem.title) }}</span>
  </el-menu-item>


  <el-submenu
    v-else
    class="im-submenu"
    :key="menuItem.name"
    :index="menuItem.name"
    :disabled="menuItem.disabled">
    <template slot="title">
      <i class="menu-icon" :class="menuItem.icon" />
      <span> {{ $t(menuItem.title) }}</span>
    </template>

    <side-menu-item v-for="(subMenuItem, index) in menuItem.children" :key="index" :menu-item="subMenuItem" />

  </el-submenu>
</template>

<script>
export default {
  name: 'side-menu-item',
  props: {
    menuItem: {
      type: Object,
      required: true,
    },
  },
  data () {
    return {

    }
  },
}
</script>

<style scoped lang="scss">
.el-menu-item {
  /*margin-bottom: 15px;*/
}
</style>
