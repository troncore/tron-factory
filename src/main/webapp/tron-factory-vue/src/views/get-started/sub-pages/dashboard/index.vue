<template>
  <div class="dashboard">
    <div class="page-title">{{ $t('getStarted.dashboard.dashboard')}}</div>
    <div class="chain-info im-card">
      <div class="card-header">{{$t('getStarted.dashboard.chainInfo')}}</div>
      <div class="card-body">
        <div class="chain-item">
          <div class="label">{{ $t('getStarted.dashboard.chainName') }}</div>
          <div class="value">{{ chainInfo.chainName || '-' }}</div>
        </div>
        <div class="chain-item">
          <div class="label">{{ $t('getStarted.dashboard.encryption') }}</div>
          <div class="value">{{ chainInfo.crypto || '-' }}</div>
        </div>
        <div class="chain-item">
          <div class="label">{{ $t('getStarted.dashboard.p2pVersion') }}</div>
          <div class="value">{{ chainInfo.p2pVersion || '-' }}</div>
        </div>
        <div class="chain-item">
          <div class="label">
            <span class="label-inner">
              {{ $t('getStarted.dashboard.status') }}
              <im-tooltip class="im-tooltip" :content="$t('getStarted.dashboard.statusTips')"/>
            </span>
          </div>
          <div class="value">
            {{ $t(['getStarted.dashboard.unPublish', 'getStarted.dashboard.publishing', 'getStarted.dashboard.published'][chainStatus] || '-') }}
          </div>
        </div>
        <div class="chain-item">
          <div class="label">
            <el-button
              class="im-button mini"
              size="mini"
              type="primary"
              v-if="chainStatus === 0"
              @click="handleUpdate">
              <i class="el-icon-edit"></i> {{ $t('base.modify') }}
            </el-button>
            <el-button
              class="im-button mini"
              size="mini"
              type="primary"
              v-if="chainStatus === 2"
              @click="handleExplorer">
              <i class="el-icon-view"></i> {{ $t('getStarted.dashboard.explorer') }}
            </el-button>
          </div>
          <div class="value">
            <el-button
              class="im-button mini"
              size="mini"
              v-if="chainStatus === 0"
              :disabled="deleteLoading"
              @click="handleDelete">
              <i :class="deleteLoading ? 'el-icon-loading' : 'el-icon-delete'"></i>
              {{ $t('base.delete') }}
            </el-button>
          </div>
        </div>
      </div>
    </div>

    <node-list :chain-status="chainStatus" @nodeList="getNodeList" @checkChainPublish="checkChainPublish()"/>
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
        chainInfo: {
          chainName: '',
          crypto: '',
          p2pVersion: '',
        },
        chainStatus: -1, // 0 unrun、1 running、2 runned
        nodeList: [],
        deleteLoading: false,
        timeoutID: null
      }
    },
    created () {
      this.getChainInfo()
      this.pollChainStatus()
    },
    destroyed () {
      clearTimeout(this.timeoutID)
    },
    methods: {
      getChainInfo () {
        this.$_api.getStarted.getChainInfo({}, (err, res = {}) => {
          if (err) return
          this.chainInfo = {
            chainName: res.chainName,
            crypto: res.crypto,
            p2pVersion: res.p2pVersion,
          }
        })
      },

      pollChainStatus () {
        clearTimeout(this.timeoutID)
        this.timeoutID = setTimeout(this.checkChainPublish, 600)
      },

      checkChainPublish () {
        this.$_api.getStarted.checkChainPublish({}, (err, res) => {
          if (err) {
            this.chainStatus = -1
            clearTimeout(this.timeoutID)
            return
          }
          this.chainStatus = res

          // when is un-run or runned, stop to request
          if ([0,2].includes(this.chainStatus)) clearTimeout(this.timeoutID)
          else this.pollChainStatus()
        })
      },

      handleUpdate () {
        this.$router.push('/get-started/chain-edit')
      },

      handleDelete () {
        if (~this.nodeList.findIndex(node => node.deployStatus !== 0)) {
          this.$notify.warning({
            title: this.$t('base.warning'),
            message: this.$t('getStarted.dashboard.stopDeleteChain')
          })
          return
        }

        this.$confirm(this.$t('getStarted.dashboard.deleteChainWarningTips'), this.$t('base.tips'), {
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

          this.$router.push('/get-started')
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
