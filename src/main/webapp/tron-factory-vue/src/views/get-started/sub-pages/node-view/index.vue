<template>
  <div class="node-view">
    <div class="page-title">{{ $t('getStarted.nodesManage.nodeDetail') }}</div>
    <div class="page-body">
      <div class="im-card">
        <div class="card-header">{{ $t('getStarted.nodesManage.serverInfo') }}</div>
        <div class="card-body">
          <div class="line-item">
            <span class="label">{{ $t('getStarted.nodesManage.ip') }}:</span>
            <span class="value">{{ nodeInfo.ip || '--' }}</span>
          </div>
          <div class="line-item">
            <span class="label">{{ $t('getStarted.nodesManage.listenPort') }}:</span>
            <span class="value">{{ nodeInfo.listenPort || '--' }}</span>
          </div>
        </div>
        <div class="card-header">{{ $t('getStarted.nodesManage.sshInfo') }}</div>
        <div class="card-body">
          <div class="line-item">
            <span class="label">{{ $t('getStarted.nodesManage.sshConnectType') }}:</span>
            <span class="value">{{ sshConnectTypeStr || '--' }}</span>
          </div><br/>
          <div class="line-item">
            <span class="label">{{ $t('getStarted.nodesManage.sshUserName') }}:</span>
            <span class="value">{{ nodeInfo.userName || '--' }}</span>
          </div>
          <div class="line-item">
            <span class="label">{{ $t('getStarted.nodesManage.port') }}:</span>
            <span class="value">{{ nodeInfo.port || '--' }}</span>
          </div>
        </div>
      </div>

      <div class="im-card">
        <div class="card-header">{{ $t('getStarted.nodesManage.nodeType') }}</div>
        <div class="card-body">
          <div class="line-item">
            <span class="label">{{ $t('getStarted.nodesManage.nodeType') }}:</span>
            <span class="value">{{ nodeTypeStr|| '--' }}</span>
          </div>
        </div>
        <div class="card-header" v-if="nodeInfo.isSR">{{ $t('getStarted.nodesManage.superNode') }}</div>
        <div class="card-body" v-if="nodeInfo.isSR">
          <div class="line-item">
            <span class="label">{{ $t('getStarted.nodesManage.url') }}:</span>
            <span class="value">
              <el-link v-if="urlStr" type="primary" :href="urlStr" target="_blank">{{ urlStr }}</el-link>
              <template v-else>--</template>
            </span>
          </div>
          <div class="line-item">
            <span class="label">{{ $t('getStarted.nodesManage.voteCount') }}:</span>
            <span class="value">{{ nodeInfo.voteCount || '--' }}</span>
          </div><br/>
          <div class="line-item width-auto">
            <span class="label">{{ $t('getStarted.nodesManage.publicKey') }}:</span>
            <span class="value">{{ nodeInfo.publicKey || '--' }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="page-footer align-right">
      <el-button class="im-button large" @click="handleCancel">{{ $t('base.return') }}</el-button>
      <el-button v-if="nodeInfo.deployStatus === 0" class="im-button large" :disabled="disabled" :loading="loading" @click="handleDelete">{{ $t('base.delete') }}</el-button>
      <el-button v-if="nodeInfo.deployStatus === 0" class="im-button large" type="primary" :disabled="disabled" @click="handleSubmit">{{ $t('base.edit') }}</el-button>
    </div>
  </div>
</template>

<script>
  export default {
    name: "node-view",
    data () {
      return {
        nodeInfo: {},
        disabled: true,
        loading: false,
      }
    },
    computed: {
      opNodeId () {
        let id = this.$route.query.id
        return /\d+/.test(id) ? Number(id) : undefined
      },
      urlStr () {
        let res = ''
        if(this.nodeInfo.hasOwnProperty('url')) {
          res = this.nodeInfo.url.replace(/^("|')(.*)("|')$/, '$2')
        }
        return res
      },

      nodeTypeStr () {
        let res = ''
        if(this.nodeInfo.hasOwnProperty('isSR')) {
          res = this.nodeInfo.isSR ? 'getStarted.nodesManage.superNode' : 'getStarted.nodesManage.fullNode'
        }
        return this.$t(res)
      },
      sshConnectTypeStr () {
        let res = ''
        if(this.nodeInfo.hasOwnProperty('sshConnectType')) {
          res = this.nodeInfo.sshConnectType === 1 ? 'getStarted.nodesManage.byPassword' : 'getStarted.nodesManage.byPublicKey'
        }
        return this.$t(res)
      }
    },
    created () {
      this.getNodeInfo()
    },
    methods: {
      getNodeInfo () {
        if (!this.testValidNode()) return

        // this.form.isSR = false // for hide  layout when start render
        // this.form.sshConnectType = 2 // for hide  layout when start render
        this.disabled = true
        this.$_api.getStarted.getNodeInfo({id: this.opNodeId}, (err, res = {}) => {
          if (err) return
          this.disabled = false
          this.init = true
          this.nodeInfo = res
        })
      },
      testValidNode () {
        // invalid edit node
        if (!/\d+/.test(this.opNodeId)) {
          this.$notify.warning({
            title: this.$t('base.warning'),
            message: this.$t('getStarted.nodesManage.viewUnValidNode'),
          })
          return false
        }
        return true
      },

      handleSubmit () {
        this.$router.push('/get-started/node-edit?id=' + this.opNodeId)
      },

      handleDelete () {
        this.loading = true
        this.$_api.getStarted.canDeleteNode({ id: this.opNodeId }, (err, res) => {
          this.loading = false
          if (err) return

          if(res.hasOwnProperty('status')) {
            switch (res.status) {
              case 0:
                this.deleteNode('getStarted.nodesManage.deleteNodeTips')
                break
              case 1:
                this.$notify.warning({
                  title: this.$t('base.warning'),
                  message: this.$t('getStarted.nodesManage.deleteNodeRunningTips'),
                })
                break
              case 2:
                this.deleteNode('getStarted.nodesManage.deleteNodeLastTips')
                break
            }
          } else {
            this.$notify.warning({
              title: this.$t('base.warning'),
              message: this.$t('getStarted.nodesManage.deleteNodeServerError'),
            })
          }
        })
      },

      deleteNode (deleteMsg) {
        this.$confirm(this.$t(deleteMsg), this.$t('base.tips'), {
          confirmButtonText: this.$t('base.delete'),
          cancelButtonText: this.$t('base.cancel'),
          center: true,
          customClass: 'im-message-box',
          cancelButtonClass: 'im-message-cancel-button',
          confirmButtonClass: 'im-message-confirm-button',
        }).then(() => {
          this.loading = true
          this.$_api.getStarted.deleteNoteInfo({ id: this.opNodeId }, err => {
            this.loading = false
            if (err) return
            this.$notify.success({
              title: this.$t('base.successful'),
              message: this.$t('base.success.delete'),
            })

            this.$router.push('/get-started/dashboard')
          })
        }).catch(err => console.log('err: ', err))
      },

      handleCancel () {
        this.$router.push('/get-started/dashboard')
      }
    }
  }
</script>

<style lang="scss" scoped>
.node-view {
  margin-bottom: 100px;
}
.page-title {
  margin-bottom: 20px;
  font-weight: bold;
  font-size: 18px;
  color: $black-light;
}
.page-footer {
  .delete-btn {
    float: right;
  }
}
.im-card {
  padding: 20px 20px 0;
  margin-bottom: 20px;
  .card-header {
    margin-bottom: 20px;
    font-weight: bold;
    font-size: 14px;
    color: $black-light;
    @media all and (max-width: 1439px) {
      font-size: 15px;
    }
  }
}

.line-item {
  display: inline-block;
  min-width: 300px;
  width: 50%;
  margin-bottom: 20px;
  font-size: 14px;

  @media all and (max-width: 1439px) {
    font-size: 15px;
  }

  .label {
    display: inline-block;
    width: 150px;
    text-align: left;
  }
}
.width-300 {
  width: 300px
}
.width-auto {
  width: 100%;
}
.margin-bottom-0 {
  margin-bottom: 0;
}
</style>
