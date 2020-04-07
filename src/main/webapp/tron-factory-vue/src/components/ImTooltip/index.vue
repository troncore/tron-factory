<template>
  <el-tooltip effect="dark" placement="top">
    <div slot="content" v-html="content"></div>
    <i class="icon-question fa fa-question-circle-o" :style="myStyle"></i>
  </el-tooltip>
</template>

<script>
  export default {
    name: "im-tooltip",
    props: {
      content: {},
      marginLeft: String,
      marginRight: String,
    },
    computed: {
      myStyle () {
        let _style = {}
        typeof this.marginLeft !== "undefined" && (_style.marginLeft = this.marginLeft)
        typeof this.marginRight !== "undefined" && (_style.marginRight = this.marginRight)
        return _style
      }
    }
  }
</script>

<style lang="scss" scoped>
.icon-question {
  color: font-color();
}
</style>