<template>
  <div class="node-view">
    <div class="page-title">{{ $t('节点详情') }}</div>
    <div class="page-body">
      <div class="im-card">
        <div class="card-header">{{ $t('服务器信息') }}:</div>
        <div class="card-body">
          <div class="line-item">
            <span class="label">{{ $t('服务器IP') }}:</span>
            <span class="value">{{ nodeInfo.ip || '--' }}</span>
          </div>
          <div class="line-item">
            <span class="label">{{ $t('监听端口') }}:</span>
            <span class="value">{{ nodeInfo.listenPort || '--' }}</span>
          </div>
        </div>
        <div class="card-header">{{ $t('SSH信息') }}</div>
        <div class="card-body">
          <div class="line-item">
            <span class="label">{{ $t('端口') }}:</span>
            <span class="value">{{ nodeInfo.port || '--' }}</span>
          </div>
          <div class="line-item">
            <span class="label">{{ $t('安全验证方式') }}:</span>
            <span class="value">{{ sshConnectTypeStr || '--' }}</span>
          </div><br/>
          <div class="line-item">
            <span class="label">{{ $t('用户名') }}:</span>
            <span class="value">{{ nodeInfo.userName || '--' }}</span>
          </div>
        </div>
      </div>

      <div class="im-card">
        <div class="card-header">{{ $t('节点类型') }}</div>
        <div class="card-body">
          <div class="line-item">
            <span class="label">{{ $t('节点类型') }}:</span>
            <span class="value">{{ nodeTypeStr|| '--' }}</span>
          </div>
        </div>
        <div class="card-header" v-if="nodeInfo.isSR">{{ $t('超级代表信息') }}</div>
        <div class="card-body" v-if="nodeInfo.isSR">
          <div class="line-item">
            <span class="label">{{ $t('URL') }}:</span>
            <span class="value">
              <el-link v-if="urlStr" type="primary" :href="urlStr" target="_blank">{{ urlStr }}</el-link>
              <template v-else>--</template>
            </span>
          </div>
          <div class="line-item">
            <span class="label">{{ $t('投票数量') }}:</span>
            <span class="value">{{ nodeInfo.voteCount || '--' }}</span>
          </div><br/>
          <div class="line-item width-auto">
            <span class="label">{{ $t('Address') }}:</span>
            <span class="value">{{ nodeInfo.publicKey || '--' }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="page-footer">
      <el-button class="im-button large" type="primary" :disabled="disabled" @click="handleSubmit">{{ $t('base.modify') }}</el-button>
      <el-button class="im-button large" type="danger" :disabled="disabled" :loading="loading" @click="handleDelete">{{ $t('base.delete') }}</el-button>
      <el-button class="im-button large" @click="handleCancel">{{ $t('base.return') }}</el-button>
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
          res = this.nodeInfo.isSR ? '超级代表' : '普通节点'
        }
        return this.$t(res)
      },
      sshConnectTypeStr () {
        let res = ''
        if(this.nodeInfo.hasOwnProperty('sshConnectType')) {
          res = this.nodeInfo.sshConnectType === 1 ? '口令登陆' : '密钥登陆'
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
            message: this.$t('当前所查看的节点为无效节点!'),
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
                this.deleteNode('nodesManage.deleteNodeTips')
                break
              case 1:
                this.$notify.warning({
                  title: this.$t('base.warning'),
                  message: this.$t('当前节点正在运行，不可删除！'),
                })
                break
              case 2:
                this.deleteNode('当前节点为最后一个节点，如果删除此节点则同时将删除此节点所在的区块链，是否继续？')
                break
            }
          } else {
            this.$notify.warning({
              title: this.$t('base.warning'),
              message: this.$t('服务器出问题，不可进行此操作！'),
            })
          }
        })
      },

      deleteNode (deleteMsg) {
        this.$confirm(this.$t(deleteMsg), this.$t('nodesManage.deleteNodeTipsTitle'), {
          confirmButtonText: this.$t('base.confirm'),
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
        }).catch(() => {
          this.$notify.info({
            title: this.$t('base.cancel'),
            message: this.$t('base.cancelDelete'),
          });
        })
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
