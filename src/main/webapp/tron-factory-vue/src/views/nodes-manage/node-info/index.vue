<!-- node add、edit、detail-->
<template>
  <div class="node-info im-card padding-20">
    node-info
  </div>
</template>

<script>
export default {
  name: "node-edit",
  data () {
    return {
      nodeInfo: {}
    }
  },
  computed: {
    opType () {
      return this.$route.params.type
    },
    opNodeId () {
      return this.$route.params.id
    },
  },
  watch: {
    opNodeId: {
      handler: 'getNodeInfo',
      immediate: true
    },
  },
  methods: {
    getNodeInfo () {
      if (!this.opNodeId) return

      this.$_api.nodesManage.getNodeDetail({id: this.opNodeId}, (err, res) => {
        if (err) return

        this.nodeInfo = res || {}
      })
    }
  }
}
</script>

<style scoped>

</style>
