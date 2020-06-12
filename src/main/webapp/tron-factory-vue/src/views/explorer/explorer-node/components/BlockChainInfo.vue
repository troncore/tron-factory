<template>
  <div class="block-chain-info">
    <div class="info-header">
      <div class="line-item">
        <div class="info-item">
          <!--<span class="label">{{ $t('explorer.lastBlockTime')}}：</span>-->
          <!--<span class="value">{{(lastProductBlockTime || '0.0') + 's ago' }}</span>-->
        </div>
        <div class="info-item">
          <span class="label">{{ $t('explorer.blockDuring')}}：</span>
          <span class="value">{{ '3s' }}</span>
        </div>
      </div>
    </div>

    <!-- last block list-->
    <div class="block-list">
      <div class="block-list__header">
        {{ $t('explorer.lastBlock')}}
        <el-button class="refresh" :disabled="loading" type="text" @click="handleRefresh"><i class="el-icon-refresh-right"></i> {{ $t('explorer.refresh')}}</el-button>
      </div>

      <div v-loading="loading">
        <!-- every block-->
        <template v-if="lastBlockList.length">
          <div class="block-box" v-for="(block, index) in lastBlockList" :key="block.high">
            <div class="box-header">
              <div class="block-high">{{ block.high }}</div>
              <div class="block-time">{{ $_moment(block.timestamp).format('YYYY-MM-DD HH:mm:ss') }}</div>
            </div>
            <div class="box-body">
              <div class="line-item">
                <span class="label">{{ $t('explorer.hashValue')}}：</span>
                <span class="value">{{ block.hash }}</span>
              </div>
              <!--<div class="line-item">
                <span class="label">{{ $t('explorer.status')}}：</span>
                <span class="value">{{ $t(block.status ? 'explorer.confirmed' : 'explorer.unconfirmed') }}</span>
              </div>-->
            </div>
          </div>
        </template>

        <div v-else class="empty-data">{{ $t('base.emptyData')}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "block-chain-info",
  props: {
    configForm: Object,
  },
  data () {
    return {
      loading: false,
      lastBlockList: [],
      lastProductBlockTime: 0,
      timeID: null,
      httpTimeID: null,
      httpTimeIDs: [],
      stopHttp: false,
    }
  },
  watch: {
    // when the config-node form params change, it will refresh info
    'configForm.refresh': {
      handler (val) {
        if (val) this.getBlockChainInfo()
      }
    },
  },
  created () {
    this.getBlockChainInfo()
  },
  destroyed() {
    clearInterval(this.timeID)
    this.clearAllTimeout()
    this.stopHttp = true
  },

  methods: {
    getBlockChainInfo () {
      this.configForm.refresh = false
      this.handleRefresh()
    },

    handleRefresh() {
      clearInterval(this.timeID)
      this.clearAllTimeout()

      this.lastProductBlockTime = 0
      this.lastBlockList.splice(0)

      this.stopHttp = false
      this.loading = true
      setTimeout(this.getNowBlockInfo, 1000)
    },

    getNowBlockInfo () {
      this.$_api.explorer.getNowBlockInfo({
        type: this.configForm.nodeType,
        url: this.configForm.nodeURL,
      }, {
        timeout: 10000,
      }, (err, res = {}) => {
        this.loading = false

        if (err || this.stopHttp) {
          this.lastProductBlockTime = 0
          clearInterval(this.timeID)
          return
        }

        let resData = res.result || {}
        if (resData.blockID && !~this.lastBlockList.findIndex(block => block.hash === resData.blockID)) {
          let rawData = resData.block_header.raw_data
          let block = {
            high: '#' + rawData.number,
            timestamp: rawData.timestamp,
            hash: resData.blockID,
            status: 0
          }

          /*this.lastProductBlockTime = Math.abs((Date.now() - block.timestamp) / 1000).toFixed(1)
          clearInterval(this.timeID)
          this.timeID = setInterval(() => {
            this.lastProductBlockTime = (Number(this.lastProductBlockTime) + 0.1).toFixed(1)
          }, 100)*/
          this.lastBlockList.unshift(block)
          if(this.lastBlockList.length > 20) this.lastBlockList.splice(20)
        }

        this.httpTimeID = setTimeout(this.getNowBlockInfo, 1000)
        this.httpTimeIDs.push(this.httpTimeID)
      })
    },

    clearAllTimeout () {
      this.httpTimeIDs.forEach(clearTimeout)
      this.httpTimeIDs = []
    }

  }
}
</script>

<style lang="scss" scoped>
.block-chain-info {
  font-size: 14px;
  color: font-color();

  .info-header {
    margin-bottom: 15px;
    .line-item {
      display: flex;
      justify-content: space-between;
    }
  }

  .block-list {
    .block-list__header {
      display: flex;
      justify-content: space-between;
      margin-bottom: 10px;
      font-weight: bold;
      .refresh {
        margin-left: 20px;
        padding: 0;
        font-weight: normal;
      }
    }

    .block-box {
      padding: 10px 15px;
      border-radius: 4px;
      border: 1px solid theme-color(.2);
      background-color: theme-color(.02);
      /*background-color: #F5F7FE;*/
      & + .block-box {
        margin-top: 20px;
      }
    }
    .box-header {
      display: flex;
      justify-content: space-between;
      margin-bottom: 10px;

      .block-high {
        font-weight: bold;
        color: #081C56;
        font-size: 14px;
      }
    }
    .line-item {
      margin-bottom: 5px;

      .label {
        display: inline-block;
        /*color: black;*/
        width: 60px;
      }

      .value {
        color: font-color(.6);
      }

      &:last-child {
        margin-bottom: 0;
      }
    }
  }
}
</style>
