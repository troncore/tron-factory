<template>
  <el-dialog
    :visible.sync="dialogVisible"
    custom-class="im-dialog"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    width="680px"
    top="200px"
    center>
    <div slot="title" class="dialog-header">
      <div class="title">{{ $t('nodesManage.logDialogTitle') }}</div>
    </div>

    <div class="dialog-content" style="min-height: 200px;" v-loading="initLoading">

      <el-timeline>
        <el-timeline-item
          v-for="(log, index) in logInfo"
          :key="index"
          type="primary">
          <div class="log-content" v-html="log"></div>
        </el-timeline-item>
      </el-timeline>

      <el-button type="text" style="margin-left: 30px;" :loading="processingLoading" v-show="processingShow">{{ processingText }}</el-button>
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
        logInfo: [],
        initLoading: true,
        processingShow: false,
        processingLoading: false,
        processingText: this.$t('nodesManage.emptyLog'),
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
        this.timeID = setInterval(this.getLogInfo, 1000 * 5)
      },
      getLogInfo() {
        this.$_api.getStarted.getNodeLog({ id: this.currentRow.id }, (err, res = {}) => {
          this.initLoading = false
          this.processingShow = true
          this.processingLoading = true
          this.processingText = this.$t('nodesManage.loadingLog')

          if (err) {
            this.processingLoading = false
            this.processingText = this.$t('nodesManage.emptyLog')
            clearInterval(this.timeID)
            return
          }

          if (res.status === -1 || res.status === 1) {
            this.processingShow = false
            this.processingLoading = false
            clearInterval(this.timeID)
          }

          if (Array.isArray(res.logInfo)) {
            this.logInfo = res.logInfo.map(log => log.replace(/^(\[.*\])(.*)/, '<i class="remark-time">$1</i>$2'))
          } else {
            this.processingLoading = false
            this.processingText = this.$t('nodesManage.emptyLog')

            clearInterval(this.timeID)
          }

        })
      },
    }
  }
</script>

<style scoped lang="scss">
  /deep/ .log-content {
    .remark-time {
      font-style: normal;
      font-size: 13px;
      color: font-color(.8);
    }
  }
</style>
