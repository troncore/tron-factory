<template>
  <div class="block-chain-info" v-loading="loading">
    <div class="info-header">
      <div class="line-item">
        <div class="info-item">
          <span class="label">{{ $t('explorer.lastBlockTime')}}：</span>
          <span class="value">{{(lastProductBlockTime || '0.0') + 's ago' }}</span>
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
        <!--<i class="el-icon-loading" :loading="true"></i>-->
        <el-button class="refresh" type="text" @click="handleRefresh">{{ $t('explorer.refresh')}}</el-button>
      </div>

      <!-- every block-->
      <template v-if="lastBlockList.length">
        <div class="block-box" v-for="(block, index) in lastBlockList" :key="index">
          <div class="box-header">
            <div class="block-high">{{ block.high }}</div>
            <div class="block-time">{{ $_moment(block.timestamp).format('YYYY-MM-DD HH:mm:ss') }}</div>
          </div>
          <div class="box-body">
            <div class="line-item">
              <span class="label">{{ $t('explorer.hashValue')}}：</span>
              <span class="value">{{ block.hash }}</span>
            </div>
            <div class="line-item">
              <span class="label">{{ $t('explorer.status')}}：</span>
              <span class="value">{{ $t(block.status ? 'explorer.confirmed' : 'explorer.unconfirmed') }}</span>
            </div>
          </div>
        </div>
      </template>

      <div v-else class="empty-data">{{ $t('base.emptyData')}}</div>
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
      lastBlockChainInfo: {},
      loading: false,
      lastBlockList: [],
      lastProductBlockTime: 0,
      timeID: null,
      httpTimeID: null,
      reload: true, // when enter this component
    }
  },
  computed: {
    blockHeaderRawData () {
      return this.lastBlockChainInfo.block_header && this.lastBlockChainInfo.block_header.raw_data || {}
    },
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
    clearTimeout(this.httpTimeID)
  },

  methods: {
    getBlockChainInfo () {
      if (this.configForm.refresh || this.reload) {
        this.reload = false
        this.loading = true
      }
      this.configForm.refresh = false
      this.lastBlockChainInfo = {}


      this.$_api.explorer.getNowBlockInfo({
        type: this.configForm.nodeType,
        url: this.configForm.nodeURL,
      }, (err, res = {}) => {
        this.loading = false
        if (err) return

        let blockTimestamp = 0
        try{
          this.lastBlockChainInfo = res.result || {}
          if (this.lastBlockChainInfo.blockID && !~this.lastBlockList.findIndex(block => block.hash === this.lastBlockChainInfo.blockID)) {
            let rawData = this.lastBlockChainInfo.block_header.raw_data
            blockTimestamp = rawData.timestamp
            let block = {
              high: '#' + rawData.number,
              timestamp: rawData.timestamp,
              hash: this.lastBlockChainInfo.blockID,
              status: 0
            }

            clearInterval(this.timeID)
            this.lastProductBlockTime = Math.floor((Date.now() - block.timestamp) / 1000).toFixed(1)
            this.timeID = setInterval(() => {
              this.lastProductBlockTime = (Number(this.lastProductBlockTime) + 0.1).toFixed(1)
            }, 100)
            this.lastBlockList.unshift(block)
          }
        } catch (e) {
          console.dir(e)
        }

        clearTimeout(this.httpTimeID)
        let disTime = blockTimestamp + 3000 - Date.now()
        this.httpTimeID = setTimeout(this.getBlockChainInfo, disTime)
      })
    },

    handleRefresh() {
      clearInterval(this.timeID)
      clearTimeout(this.httpTimeID)
      this.lastBlockList.splice(0)
      this.getBlockChainInfo()
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
      margin-bottom: 10px;
      font-weight: bold;
      .refresh {
        margin-left: 20px;
        padding: 0;
      }
    }

    .block-box {
      margin-bottom: 15px;
      padding: 10px;
      border: 1px solid rgba(200, 200, 200, .5);
      border-radius: 4px;
      background-color: rgba(230, 230, 230, .3);
      &:last-child {
        margin-bottom: 0;
      }
    }
    .box-header {
      display: flex;
      justify-content: space-between;
      margin-bottom: 5px;
    }
    .line-item {
      margin-bottom: 5px;

      &:last-child {
        margin-bottom: 0;
      }
    }
  }
}
</style>
