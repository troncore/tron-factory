<template>
  <div class="dashboard">
    <div class="page-title">{{ $t('Dashboard')}}</div>
    <div class="chain-info im-card">
      <div class="card-header">区块链信息</div>
      <div class="card-body">
        <div class="chain-item">
          <div class="label">{{ $t('名称') }}</div>
          <div class="value">TRON_Test</div>
        </div>
        <div class="chain-item">
          <div class="label">{{ $t('签名算法') }}</div>
          <div class="value">ECkey</div>
        </div>
        <div class="chain-item">
          <div class="label">{{ $t('p2pVersion') }}</div>
          <div class="value">123456</div>
        </div>
        <div class="chain-item">
          <div class="label">
            <span class="label-inner">{{ $t('状态') }} <im-tooltip class="im-tooltip" :content="$t('已发布的区块可正常产块')"/></span>
          </div>
          <div class="value">{{ $t(['未发布', '发布中', '已发布'][chainStatus] || '--') }}</div>
        </div>
        <div class="chain-item">
          <div class="label">
            <el-button class="im-button mini" size="mini" type="text" v-if="chainStatus === 0" @click="handleUpdate">{{ $t('修改') }}</el-button>
            <el-button class="im-button mini" size="mini" type="text" v-if="canDeleteChain" @click="handleDelete">{{ $t('删除') }}</el-button>
          </div>
          <div class="value"><el-button class="im-button mini" size="mini" type="text" @click="handleExplorer">{{ $t('浏览器查看') }}</el-button></div>
        </div>
      </div>
    </div>

    <node-list />
  </div>
</template>

<script>
  import NodeList from "./NodeList";
  import ImTooltip from "@/components/ImTooltip";
  export default {
    name: "dashboard",
    components: { ImTooltip, NodeList },
    data () {
      return {
        chainStatus: 0, // 0 unrun、1 running、2 runned
      }
    },
    computed: {
      // 有未停止的节点，无法删除
      canDeleteChain () {

        return false
      },
    },
    created () {

    },
    methods: {
      handleUpdate () {
        this.$router.push('/get-started/create-chain')
      },

      handleDelete () {

      },

      handleExplorer () {
        this.$router.push('/explorer')
      }

    }
  }
</script>

<style lang="scss" scoped>
.dashboard {
  .chain-info {
    margin-bottom: 20px;

    .card-body {
      display: flex;
      max-width: 1000px;

      .chain-item {
        flex: 1;

        .label {
          height: 40px;
          line-height: 40px;
          text-align: center;
          color: #081C56;
          font-weight: bold;
          font-size: 14px;

          .label-inner {
            position: relative;
            .im-tooltip {
              position: absolute;
              right: -5px;
              top: 50%;
              transform: translate(100%, -50%);
            }
          }
        }
        .value {
          height: 40px;
          line-height: 40px;
          text-align: center;
          font-size: 14px;
        }
      }
    }
  }
}
.page-title {
  margin-bottom: 20px;
  font-weight: bold;
  font-size: 18px;
  color: $black-light;
}
.im-card {
  padding: 20px;
  margin-bottom: 20px;
  .card-header {
    margin-bottom: 20px;
    font-weight: bold;
    color: $black-light;
  }
}
</style>
