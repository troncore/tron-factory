<template>
  <div class="aside-nav">
    <el-menu
      ref="el-menu"
      :default-active="$route.path"
      :collapse="isCollapseAside"
      mode="vertical"
      @select="handleSelectMenu">

      <side-menu-item v-for="route in permission_routes" :key="route.name" :route="route" />

    </el-menu>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import SideMenuItem from './SideMenuItem'

export default {
  name: 'aside-nav',
  components: { SideMenuItem },
  computed: {
    ...mapGetters(['permission_routes']),
    ...mapGetters('app', [
      'isCollapseAside'
    ]),
  },
  methods: {
    handleSelectMenu(index) {
      if (index.startsWith('http')) {
        this.$refs['el-menu'].updateActiveIndex(this.$route.fullPath)
        window.open(index, '_blank')
      } else {
        this.$router.push({
          path: index,
          query: {},
        })
      }
    },
  },
}
</script>
<style lang="scss" scoped>
@import "~@/assets/styles/base";
.aside-nav {
  height: 100%;
  background-color: #fff;
  box-shadow: 0 2px 40px 0 rgba(4,4,64,0.04);

  .el-menu {
    padding-top: 40px;
    height: 100%;
    border: none;
    &:not(.el-menu--collapse) {
      width: 250px;
      overflow: auto;
    }

    /deep/ .el-menu-item{
      font-size: 16px;
      color: #666;
      border-left: 4px solid transparent;
      &:focus,
      &:hover {
        color: theme-color();
        background-color: theme-color(.1);
      }

      &.is-active {
        color: theme-color();
        border-color: theme-color();
        border-left: 4px solid theme-color();
        background-color: theme-color(.1);
      }
      &.disabled {
        color: #475F7B;
      }
    }
  }
}
</style>
