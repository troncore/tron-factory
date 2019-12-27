<template>
  <div class="hamburger" @click="toggleCollapseAside">
    <span :class="['toggle-aside', {'is-collapse': isCollapseAside}]"></span>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
  name: 'hamburger',
  computed: {
    ...mapGetters('app', [
      'isCollapseAside'
    ]),
  },
  methods: {
    ...mapMutations('app', [
      'toggleCollapseAside'
    ]),
  },
}
</script>

<style lang="scss" scoped>
.hamburger{
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 64px;
  cursor: pointer;

  .toggle-aside {
    display: inline-block;
    vertical-align: middle;
    width: 20px;
    height: 20px;
    background-image: url(~@/assets/images/menu-right.png);
    background-size: 100% auto;
    background-repeat: no-repeat;
    background-position: center center;

    &.is-collapse {
      background-image: url(~@/assets/images/menu-left.png);
    }

  }
}
</style>
