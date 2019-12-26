<template>
  <div class="sidebar-view">
    <el-menu
      ref="el-menu"
      :default-active="activeMenu"
      :collapse="isCollapseSidebar"
      mode="vertical"
      @select="handleSelectMenu">

      <side-menu-item v-for="route in permission_routes" :key="route.name" :route="route" />

    </el-menu>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import variables from '@/styles/variables.scss'
import SideMenuItem from './SideMenuItem'

export default {
  components: { SideMenuItem },
  computed: {
    ...mapGetters(['permission_routes', 'sidebar']),
    ...mapGetters('app', [
      'isCollapseSidebar'
    ]),
    routes() {
      return this.$router.options.routes
    },
    activeMenu() {
      return this.$route.path
    },
    variables() {
      return variables
    },
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
.sidebar-view {
  height: 100%;
  background-color: #fff;
  box-shadow: 0 2px 40px 0 rgba(4,4,64,0.04);
  .el-menu:not(.el-menu--collapse) {
    width: 250px;
    height: 100%;
    overflow: auto;
  }
}
</style>
