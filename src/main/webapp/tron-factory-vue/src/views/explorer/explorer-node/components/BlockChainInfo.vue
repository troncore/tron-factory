<template>
  <div class="block-chain-info" v-loading="loading">
    <div class="info-header">
      <div class="line-item">
        <div class="info-item">
          <span class="label">{{ $t('最新产块时间')}}：</span>
          <span class="value">{{ '2.25s ago' }}</span>
        </div>
        <div class="info-item">
          <span class="label">{{ $t('产块周期')}}：</span>
          <span class="value">{{ '3s' }}</span>
        </div>
      </div>
    </div>

    <!-- last block list-->
    <div class="block-list">
      <div class="block-list__header">
        {{ $t('最近区块')}}
        <i class="el-icon-loading" :loading="true"></i>
        <el-button class="refresh" type="text" @click="handleRefresh">{{ $t('刷新')}}</el-button>
      </div>

      <!-- every block-->
      <template v-if="lastBlockList.length">
        <div class="block-box" v-for="(block, index) in lastBlockList" :key="index">
          <div class="box-header">
            <div class="block-high">{{ block.high }}</div>
            <div class="block-time">{{ block.time }}</div>
          </div>
          <div class="box-body">
            <div class="line-item">
              <span class="label">{{ $t('哈希值')}}：</span>
              <span class="value">{{ block.hash }}</span>
            </div>
            <div class="line-item">
              <span class="label">{{ $t('状态')}}：</span>
              <span class="value">{{ block.status }}</span>
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
      blockChainInfo: {

      },
      loading: false,
      lastBlockList: [],
    }
  },
  watch: {
    // when the config-node form params change, it will refresh info
    'configForm.refresh': {
      handler (val) {
        if (val) this.getBlockChainInfo()
      }
    }
  },
  created () {
    this.getBlockChainInfo()

    // this.getLastBlockList()
  },

  methods: {
    getBlockChainInfo (params = {}) {
      this.configForm.refresh = false
      this.blockChainInfo = {}
      this.loading = true

      this.$_api.explorer.getBlockChainInfo({
        type: params.nodeType,
        url: params.nodeURL,
      }, (err, res = {}) => {
        this.loading = false
        if (err) return

        this.blockChainInfo = res.result || {}
      })
    },

    getLastBlockList () {
      setInterval(this.pollLastBlock, 3000)
    },

    pollLastBlock () {
      this.lastBlockList.unshift({
        high: '#' + (1000 + this.lastBlockList.length),
        time: this.$_moment(Date.now()).format('YYYY-MM-DD HH:mm:ss'),
        hash: '0000000001233e3b151f48f3df7299e912dfba7dea5d0406a923e9abe96892c2',
        status: '已确认',
      })
    },

    handleRefresh() {
      this.lastBlockList.splice(0);
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