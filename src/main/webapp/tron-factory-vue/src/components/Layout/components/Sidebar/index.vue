<template>
  <div>
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        ref="el-menu"
        :default-active="activeMenu"
        :collapse="isCollapse"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :unique-opened="false"
        :active-text-color="variables.menuActiveText"
        :collapse-transition="false"
        mode="vertical"
        @select="handleSelectMenu"
      >
        <side-menu-item v-for="route in permission_routes" :key="route.name" :route="route" />
      </el-menu>
    </el-scrollbar>
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
    routes() {
      return this.$router.options.routes
    },
    activeMenu() {
      return this.$route.path
    },
    variables() {
      return variables
    },
    isCollapse() {
      return !this.sidebar.opened
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
