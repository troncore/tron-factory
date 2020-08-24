<template>
  <div class="dashboard">
    <div class="page-title">{{ $t('getStarted.dashboard.dashboard')}}</div>
    <div class="chain-info im-card">
      <div class="card-header">
        <div class="card-title">{{$t('getStarted.dashboard.chainInfo')}}</div>
        <div class="op-list">
          <el-button class="im-button mini" type="primary" :disabled="chainStatus !== 0 || deleteLoading" @click="handleUpdate"><i class="el-icon-edit"></i> {{ $t('base.edit') }}</el-button>
          <el-button class="im-button mini" :disabled="chainStatus !== 0 || deleteLoading" @click="handleDelete"><i class="el-icon-delete"></i> {{ $t('base.delete') }}</el-button>
        </div>
      </div>
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
        this.$confirm(this.$t('getStarted.dashboard.deleteChainWarningTips'), this.$t('base.tips'), {
          cancelButtonText: this.$t('base.cancel'),
          confirmButtonText: this.$t('base.delete'),
          center: true,
          customClass: 'im-message-box',
          cancelButtonClass: 'im-message-cancel-button',
          confirmButtonClass: 'im-message-confirm-button warning',
        }).then(this.deleteChain)
          .catch(err => console.log('err: ', err))
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
    }
  }
</script>

<style lang="scss" scoped>
.dashboard {
  .page-title {
    margin-bottom: 20px;
    font-weight: bold;
    font-size: 18px;
    color: $black-light;
  }

  .chain-info {
    margin-bottom: 20px;
    .card-body {
      display: flex;
      max-width: 800px;

      .chain-item {
        flex: 1;

        .label {
          height: 40px;
          line-height: 40px;
          text-align: center;
          color: $black-light;
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
.im-card {
  padding: 20px;
  margin-bottom: 20px;
  .card-header {
    margin-bottom: 20px;
    .card-title {
      display: inline-block;
      margin-right: 15px;
      font-weight: bold;
      color: $black-light;
    }
    .op-list {
      float: right;
      display: inline-block;

      .el-button + .el-button {
        margin-left: 20px;
      }
    }
  }
}
</style>
