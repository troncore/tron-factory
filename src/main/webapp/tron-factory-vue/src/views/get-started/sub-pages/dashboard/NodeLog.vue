<template>
  <el-dialog
    :visible.sync="dialogVisible"
    :close-on-click-modal="false"
    :close-on-press-escape="false">

    <div slot="title" class="dialog-header">
      <div class="title">
        <b>{{ $t('getStarted.dashboard.logDialogTitle') }} </b>
        <i v-if="loading" class="el-icon-loading"></i>
      </div>
    </div>

    <div class="dialog-content">
      <div class="log-list">
        <div v-for="(log, index) in logList" :key="index" class="log-item" :class="log.scope">
          <span class="log-index">{{ index + 1 }}</span>
          <span class="log-text" :class="{ warning: !log.success }"><span class="text" v-html="log.content"></span></span>
          <span class="log-time" v-if="log.duration"><span class="text">{{ log.duration }}</span></span>
        </div>
      </div>
    </div>

  </el-dialog>
</template>

<script>
  export default {
    name: "node-log",
    props: {
      visible: {},
      currentRow: {},
    },
    data () {
      return {
        logList:[],
        isEmptyLogs: true,
        loading: true,
        flag: true, // to request next log and avoid multi-request when net is slow
        timeID: null,
      }
    },
    computed: {
      dialogVisible: {
        get () {
          return this.visible
        },
        set (val) {
          this.$emit('update:visible', val)
        }
      },
    },

    created () {
      this.init()
    },
    destroyed () {
      clearInterval(this.timeID)
    },

    methods: {
      init () {
        this.getLogInfo()
        this.timeID = setInterval(this.getLogInfo, 300)
      },
      getLogInfo() {
        this.$_api.getStarted.getNodeLog({ id: this.currentRow.id }, (err, res = {}) => {
          if (!this.flag) return
          this.flag = false

          if (err) {
            clearInterval(this.timeID)
            this.loading = false
            return
          }

          if (res.status === 0) {
            clearInterval(this.timeID)
            // empty log
            this.loading = false
            this.isEmptyLogs = true
            this.logList = []

            this.$notify.info({
              title: '提示',
              message: '暂无日志',
            })

          } else if (res.status === 2) {
            // loaded all log
            this.loading = false
            try {
              this.logList = (res.logInfo || []).map((log, index) => {
                console.log('log - ', index, ' : ', log)
                return JSON.parse(log)
              })
            } catch (e) {
              console.log('error: ', e)
            }
            clearInterval(this.timeID)
          } else if (res.status === 1) {
            // loading log
            try {
              this.logList = (res.logInfo || []).map(log => JSON.parse(log))
            } catch (e) {
              console.log('error: ', e)
            }
            this.flag = true
          } else {
            this.loading = false
            clearInterval(this.timeID)
          }
        })
      },
    }
  }
</script>

<style scoped lang="scss">
::v-deep .el-dialog {
  width: 800px;
  .el-dialog__header {
    padding: 8px;
  }
  .el-dialog__body {
    padding: 0;
    .dialog-content {
      background-color: #222;
    }
  }
  .el-dialog__headerbtn {
    top: 6px;
    right: 6px;
    font-size: 24px;
  }

  .log-list {
    padding: 5px 0 100px;
    line-height: 18px;
    height: 500px;
    color: #f6f8fa;
    overflow: auto;
    font-size: 14px;
    font-family: Cousine,monospace;

    span {
      font-weight: normal;
    }

    .log-item {
      display: flex;
      padding: 0 8px 0 4px;
      &:hover {
        background-color: #444;
      }
      &.title {
        background-color: #2b2b2b;
        .log-text {
          .text {
            color: #FFFF91;
            font-weight: bold;
          }
        }
      }
      &.sub-title {
        .log-text {
          .text {
            font-weight: bold;
          }
        }
      }
    }

    .log-index {
      display: inline-block;
      margin-right: 10px;
      min-width: 22px;
      text-align: right;
      color: #666;
    }
    .log-status {
      margin-right: 5px;
      span {
        font-weight: bold;
      }
    }
    .log-text {
      flex: 1;
      display: flex;
      align-items: center;

      &.warning {
        color: red;
      }
    }
    .log-time {
      margin-left: auto;
      flex-basis: auto;
      white-space: nowrap;
      .text {
        display: inline-block;
        padding: 0 3px;
        height: 14px;
        line-height: 14px;
        vertical-align: text-top;
        font-size: 12px;
        color: #bbb;
        background-color: #666;
        border-radius: 3px;
      }
    }
  }

  remark {
    font-weight: bold;
  }
  .success {
    color: #67C23A;
  }
  .info {
    color: #409EFF;
  }
  .warning {
    color: #E6A23C;
  }
  .error {
    color: #F56C6C;
  }
}
</style>
