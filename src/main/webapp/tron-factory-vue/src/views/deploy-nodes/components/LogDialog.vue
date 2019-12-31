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
      <div class="title">{{ $t('tronNodeStatus') }}</div>
      <div class="title-info">以下均为必填项</div>
    </div>

    <div class="dialog-content" v-loading="initLoading">

      <el-timeline>
        <el-timeline-item
          v-for="(activity, index) in logInfo"
          :key="index"
          type="primary">
          {{activity }}
        </el-timeline-item>
      </el-timeline>

      <el-button type="text" style="margin-left: 30px;" :loading="processingLoading" v-show="processingShow">{{ processingText }}</el-button>
    </div>

  </el-dialog>
</template>

<script>
  export default {
    name: "LogDialog",
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
        processingText: this.$t('deploymentNodeLog'),
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
        this.$_api.nodeApi.deployLogInfoApi({ id: this.currentRow.id }, (err, res = {}) => {
          this.initLoading = false
          this.processingShow = true
          this.processingLoading = true
          this.processingText = this.$t('deploymentSearchLoading')

          if (err) {
            this.processingLoading = false
            this.processingText = this.$t('deploymentNodeLog')
            clearInterval(this.timeID)

            return
          }

          this.logInfo = res.logInfo || []

          if (this.logInfo.length) {
            this.logInfo.forEach(log => {
              if (log.indexOf('deploy finish') > -1) {
                this.processingLoading = false
                this.processingText = this.$t('deploymentDone')

                clearInterval(this.timeID)

              } else if (log === 'ssh connect failed') {
                this.processingLoading = false
                this.processingText = this.$t('deploymentFail')

                clearInterval(this.timeID)
              }
            })
          } else {
            this.processingLoading = false
            this.processingText = this.$t('deploymentNodeLog')

            clearInterval(this.timeID)
          }

        })
      },
    }
  }
</script>

<style scoped>

</style>
