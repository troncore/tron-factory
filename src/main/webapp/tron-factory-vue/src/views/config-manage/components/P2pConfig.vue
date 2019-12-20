<template>
  <div class="p2p-config">
    <el-card class="box-body" shadow="hover">

      <el-form ref="p2p-config-form" :rules="formRules" :model="form" label-width="250px" label-position="left">
        <div @click="showContent = !showContent">
          <i :class="showContent ? 'el-icon-arrow-down' : 'el-icon-arrow-right'"></i>
          {{ $t('tronSettingP2p') }}
        </div>

        <template v-if="showContent">
          <el-form-item prop="node_p2p_version" class="baseFormItem mgt20">
            <span slot="label">
              p2pVersion
              <el-tooltip class="item" effect="dark" :content="$t('tronp2pVersionPlaceholder')" placement="top">
                <i class="iconfont icon-iconset0143"></i>
              </el-tooltip>
            </span>

            <el-input v-model.trim="form.node_p2p_version" size="small" :maxlength="50" :placeholder="$t('tronP2pVersionPlaceholder')"></el-input>
          </el-form-item>

          <el-form-item class="baseFormItem" label="listenPort" prop="node_listen_port">
            <el-input
              v-model.trim="form.node_listen_port"
              size="small"
              :maxlength="50"
              :placeholder="$t('tronhttpRpcListenPortPlaceholder')">
            </el-input>
          </el-form-item>

          <el-form-item class="baseFormItem" label="seedNode" prop="seed_node_ip_list">
            <el-checkbox-group size="small" v-model="form.seed_node_ip_list">
              <el-checkbox class="checkBox" v-for="(ip, index) in seedNodeIpList" :key="index" :label="ip">
                <el-input v-model="form.node_listen_port" size="small" :placeholder="$t('tronSettingPortPlaceholder')" disabled>
                  <template slot="prepend" style="width:100px">{{ ip }}</template>
                </el-input>
              </el-checkbox>
            </el-checkbox-group>
          </el-form-item>

          <el-button type="text" size="small" @click="moreSetting = !moreSetting">{{ $t('tronMoreSetting') }}</el-button>

          <template v-if="moreSetting">
            <el-form-item label="maxActiveNodes" prop="node_maxActiveNodes" class="baseFormItem">
              <el-input v-model.trim="form.node_maxActiveNodes" size="small" :maxlength="50" :placeholder="$t('tronMaxActionNodesPlaceholder')"></el-input>
            </el-form-item>

            <el-form-item class="baseFormItem" label="maxActiveNodesWithSameIp" prop="node_maxActiveNodesWithSameIp">
              <el-input v-model.trim="form.node_maxActiveNodesWithSameIp" size="small" :maxlength="50" :placeholder="$t('tronMaxActiveNodesWithSameIpPlaceholder')"></el-input>
            </el-form-item>

            <el-form-item class="baseFormItem" label="activeConnectFactor" prop="node_activeConnectFactor">
              <el-input-number
                v-model.trim="form.node_activeConnectFactor"
                size="small"
                controls-position="right"
                :min="0"
                :step="0.1"
                :maxlength="50"
                :placeholder="$t('tronSettingPlaceholder')">
              </el-input-number>
            </el-form-item>

            <el-form-item class="baseFormItem" label="connectFactor" prop="node_connectFactor">
              <el-input-number
                size="small"
                controls-position="right"
                :min="0"
                :step="0.1"
                :maxlength="50"
                v-model.trim="form.node_connectFactor"
                :placeholder="$t('tronSettingPlaceholder')">
              </el-input-number>
            </el-form-item>
          </template>

        </template>
      </el-form>

    </el-card>

    <div class="box-footer align-right">
      <el-button size="small" type="primary" @click="handleCancel">{{$t('tronSettingPreviousStep') }}</el-button>
      <el-button size="small" type="primary" @click="handleSubmit">{{ $t('tronSettingNextStep') }}</el-button>
    </div>
  </div>
</template>
<script>
import { isvalidateNum, twoDecimal } from '@/utils/validate.js'
export default {
  name: 'p2p-config',
  props: {
    configInfo: {
      type: Object,
      required: true,
    },
    initConfigInfo: {
      type: Function,
      required: true,
    }
  },
  data() {
    return {
      showContent: true,
      moreSetting: false,
      form: {
        seed_node_ip_list: [], // selected seed node
        node_p2p_version: '',
        node_listen_port: '',
        node_maxActiveNodes: '',
        node_maxActiveNodesWithSameIp: '',
        node_connectFactor: '',
        node_activeConnectFactor: '',
      },
      loading: false,
    }
  },
  computed: {
    seedNodeIpList () {
      let p2pConfig = this.configInfo.p2pConfig || {}
      return p2pConfig.allNodes || []
    },

    formRules() {
      const validNum = (rule, value, callback) => {
        if (!isvalidateNum(value)) {
          callback(new Error(this.$t('tronSettingNumberPlaceholder')))
        } else {
          callback()
        }
      }
      const validMaxNum = (rule, value, callback) => {
        if (value > 2147483647) {
          callback(new Error(this.$t('tronNumberPlaceholder')))
        } else {
          callback()
        }
      }
      const validMainnet = (rule, value, callback) => {
        if (value == 11111) {
          callback(new Error(this.$t('tronp2pVersionMainnetPlaceholder')))
        } else {
          callback()
        }
      }
      const validTestNet = (rule, value, callback) => {
        if (value == 20180622) {
          callback(new Error(this.$t('tronp2pVersionTestnetPlaceholder')))
        } else {
          callback()
        }
      }
      const validSpecialNet = (rule, value, callback) => {
        if (value == 1) {
          callback(new Error(this.$t('tronp2pVersionSpecialPlaceholder')))
        } else {
          callback()
        }
      }
      const validPortNum = (rule, value, callback) => {
        if (value > 65535) {
          callback(new Error(this.$t('tronPortNumberPlaceholder')))
        } else {
          callback()
        }
      }
      const validTwoDecimalFun = (rule, value, callback) => {
        if (!twoDecimal(value)) {
          callback(new Error(this.$t('validTwoDecimal')))
        } else {
          callback()
        }
      }
      const rules = {
        node_p2p_version: [
          {
            required: true,
            message: this.$t('tronP2pVersionPlaceholder'),
            trigger: 'blur',
          },
          {
            message: this.$t('tronSettingNumberPlaceholder'),
            validator: validNum,
            trigger: 'blur',
          },
          {
            message: this.$t('tronp2pVersionMainnetPlaceholder'),
            validator: validMainnet,
            trigger: 'blur',
          },
          {
            message: this.$t('tronp2pVersionTestnetPlaceholder'),
            validator: validTestNet,
            trigger: 'blur',
          },
          {
            message: this.$t('tronp2pVersionSpecialPlaceholder'),
            validator: validSpecialNet,
            trigger: 'blur',
          },
          {
            required: true,
            validator: validMaxNum,
            trigger: 'blur',
          },
        ],
        node_listen_port: [
          {
            required: true,
            message: this.$t('tronhttpRpcListenPortPlaceholder'),
            trigger: 'blur',
          },
          {
            message: this.$t('tronSettingNumberPlaceholder'),
            validator: validNum,
            trigger: 'blur',
          },
          {
            required: true,
            validator: validPortNum,
            trigger: 'blur',
          },
        ],
        seed_node_ip_list: [
          {
            required: true,
            message: this.$t('tronP2pSeedNodeSelectPlaceholder'),
            trigger: 'blur',
          },
        ],
        node_maxActiveNodes: [
          {
            required: true,
            message: this.$t('tronMaxActionNodesPlaceholder'),
            trigger: 'blur',
          },
          {
            message: this.$t('tronSettingNumberPlaceholder'),
            validator: validNum,
            trigger: 'blur',
          },
          {
            required: true,
            validator: validMaxNum,
            trigger: 'blur',
          },
        ],
        node_maxActiveNodesWithSameIp: [
          {
            required: true,
            message: this.$t('tronMaxActiveNodesWithSameIpPlaceholder'),
            trigger: 'blur',
          },
          {
            message: this.$t('tronSettingNumberPlaceholder'),
            validator: validNum,
            trigger: 'blur',
          },
          {
            required: true,
            validator: validMaxNum,
            trigger: 'blur',
          },
        ],
        node_activeConnectFactor: [
          {
            required: true,
            message: this.$t('tronSettingPlaceholder'),
            trigger: 'blur',
          },
          {
            required: true,
            validator: validMaxNum,
            trigger: 'blur',
          },
          {
            message: this.$t('tronSettingNumberTwoDecimal'),
            validator: validTwoDecimalFun,
            trigger: 'blur',
          },
        ],
        node_connectFactor: [
          {
            required: true,
            message: this.$t('tronSettingPlaceholder'),
            trigger: 'blur',
          },
          {
            required: true,
            validator: validMaxNum,
            trigger: 'blur',
          },
          {
            message: this.$t('tronSettingNumberTwoDecimal'),
            validator: validTwoDecimalFun,
            trigger: 'blur',
          },
        ],
      }
      return rules
    },
  },

  created () {
    this.init()
  },

  methods: {
    init () {
      let p2pConfig = this.configInfo.p2pConfig || {}
      let selectedSeedNodeIpList = p2pConfig.seed_node_ip_list || []

      this.form = {
        ...this.form,
        ...p2pConfig,
        seed_node_ip_list: selectedSeedNodeIpList.map(item => item.split(':')[0])
      }
    },

    handleSubmit() {
      this.$refs['p2p-config-form'].validate(valid => {
        if (valid) {
          let params = {
            p2pVersion: this.form.node_p2p_version,
            listenPort: this.form.node_listen_port,
            seed_node_ip_list: this.form.seed_node_ip_list.map(ip => ip + ':' + this.form.node_listen_port),
            maxActiveNodes: this.form.node_maxActiveNodes,
            nodeActiveConnectFactor: this.form.node_activeConnectFactor,
            nodeMaxActiveNodesWithSameIp: this.form.node_maxActiveNodesWithSameIp,
            connectFactor: this.form.node_connectFactor,
          }

          this.loading = true
          // TODO POST
          this.$_api.settingApi.p2pSettingApi(params, err => {
            this.loading = false
            if (err) return

            this.$message.success(this.$t('tronSettingp2pSaveSuccess'))
            this.$emit('next-step')
          })
        }
      })
    },

    handleCancel() {
      this.$emit('prev-step')
    },
  },
}
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
.p2p-config {
  padding-right: 80px;

  .el-form-item {
    width: 600px;
  }
  .box-footer {
    &.align-right {
      margin-top: 40px;
      text-align: right;
    }
  }
}
</style>
<style lang="scss">
.p2p-config {
  .el-checkbox-group {
    .el-checkbox__label {
      line-height: 34px;
    }
    .el-input-group__prepend {
      width: 125px;
    }
    .el-input-group--prepend .el-input__inner,
    .el-input-group__append {
      width: 100px;
    }
  }
}
</style>
