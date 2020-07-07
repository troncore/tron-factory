<template>
  <div class="dashboard">
    <!--<div class="page-title">{{ $t('Dashboard')}}</div>-->
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
            <el-button
              class="im-button mini"
              size="mini"
              type="primary"
              v-if="chainStatus === 0"
              @click="handleUpdate">
              <i class="el-icon-edit"></i> {{ $t('修改') }}
            </el-button>
            <el-button
              class="im-button mini"
              size="mini"
              type="primary"
              v-if="chainStatus === 2"
              @click="handleExplorer">
              <i class="el-icon-view"></i> {{ $t('浏览器') }}
            </el-button>
          </div>
          <div class="value">
            <el-button
              class="im-button mini"
              size="mini"
              v-if="chainStatus === 2"
              :disabled="deleteLoading"
              @click="handleDelete">
              <i :class="deleteLoading ? 'el-icon-loading' : 'el-icon-delete'"></i>
              {{ $t('删除') }}
            </el-button>
          </div>
        </div>
      </div>
    </div>

    <node-list @nodeList="getNodeList" @checkChainPublish="checkChainPublish()"/>
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
        chainStatus: -1, // 0 unrun、1 running、2 runned
        nodeList: [],
        deleteLoading: false,
      }
    },
    created () {
      this.checkChainPublish()
    },
    methods: {
      checkChainPublish () {
        this.$_api.getStarted.checkChainPublish({}, (err, res) => {
          if (err) {
            this.chainStatus = -1
            return
          }

          this.chainStatus = res
        })
      },

      handleUpdate () {
        this.$router.push('/get-started/create-chain')
      },

      handleDelete () {
        if (~this.nodeList.findIndex(node => node.deployStatus !== 0)) {
          this.$notify.warning({
            title: this.$t('base.warning'),
            message: this.$t('有未停止的节点，无法删除')
          })
          return
        }

        this.$confirm(this.$t('这将会删除此区块链，是否继续？'), this.$t('base.tips'), {
          cancelButtonText: this.$t('base.cancel'),
          confirmButtonText: this.$t('base.delete'),
          center: true,
          customClass: 'im-message-box',
          cancelButtonClass: 'im-message-cancel-button',
          confirmButtonClass: 'im-message-confirm-button warning',
        }).then(this.deleteChain)
          .catch(() => {
          this.$notify.info({
            title: this.$t('base.cancel'),
            message: this.$t('base.cancelDelete'),
          })
        })
      },

      deleteChain () {
        this.deleteLoading = true
        this.$_api.getStarted.deleteChain({}, (err, res) => {
          this.deleteLoading = false
          if (err) return
          this.$notify.success({
            title: this.$t('base.successful'),
            message: this.$t('base.success.delete'),
          })

          res === true && this.$router.push('/get-started')
        })
      },

      getNodeList (list) {
        this.nodeList = list
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
