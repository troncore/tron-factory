<template>
  <div class="dashboard">
    <div class="chain-info im-card">
      区块链信息
    </div>

    <node-list />
  </div>
</template>

<script>
  import NodeList from "./NodeList";
  export default {
    name: "dashboard",
    components: { NodeList }
  }
</script>

<style lang="scss" scoped>
.dashboard {
  .chain-info {
    margin-bottom: 20px;
  }

  .im-card {
    margin-bottom: 20px;
    .card-header {
      margin-bottom: 20px;
      font-weight: bold;
    }
  }
}
</style>
