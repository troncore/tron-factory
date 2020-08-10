<template>
  <el-dialog
    :visible.sync="dialogVisible"
    :close-on-click-modal="false"
    :close-on-press-escape="false">

    <div slot="title" class="dialog-header">
      <div class="title"><b>{{ $t('getStarted.dashboard.logDialogTitle') }}</b></div>
    </div>

    <div class="dialog-content">
      <div class="log-list">
        <div v-for="(log, index) in logList" :key="index" class="log-item">
          <span v-if="log.status" class="log-status">[<span :class="log.status">{{ log.status.toLocaleUpperCase() }}</span>]</span>
          <span class="log-text" :class="log.scope">
            <span class="text" v-html="log.text"></span>
            <span v-if="log.scope === 'title'">------------------------------------------------------------------------</span>
          </span>
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
        initLoading: false,
        processingShow: false,
        processingLoading: false,
        processingText: this.$t('getStarted.dashboard.emptyLog'),
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
          this.initLoading = false
          this.processingShow = true
          this.processingLoading = true
          this.processingText = this.$t('getStarted.dashboard.loadingLog')

          if (err) {
            this.processingLoading = false
            this.processingText = this.$t('getStarted.dashboard.emptyLog')
            clearInterval(this.timeID)
            return
          }

          if (res.status === -1 || res.status === 1) {
            this.processingShow = false
            this.processingLoading = false
            clearInterval(this.timeID)
          }

          if (Array.isArray(res.list)) {
            this.logList = res.list
          } else {
            this.processingLoading = false
            this.processingText = this.$t('getStarted.dashboard.emptyLog')

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
      background-color: black;
    }
  }
  .el-dialog__headerbtn {
    top: 6px;
    right: 6px;
    font-size: 24px;
  }

  .log-list {
    padding: 5px;
    line-height: 20px;
    min-height: 600px;
    color: white;
    overflow: auto;
    font-size: 14px;
    font-family: monospace;

    span {
      font-weight: normal;
    }

    .log-status {
      margin-right: 5px;
      span {
        font-weight: bold;
      }
    }

    .log-text {
      position: relative;

      &.title .text {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        padding-left: 10px;
        padding-right: 10px;
        background-color: black;
        font-weight: bold;
      }


      &.sub-title .text {
        font-weight: bold;
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
