<template>
  <div class="p2p-config">
    <el-card>
      <div class="box-header title">{{ $t('tronSettingP2p') }}</div>

      <div class="box-body">
        <el-form ref="p2p-config-form" :rules="formRules" :model="form" label-position="top">
          <template v-if="showContent">
            <el-form-item prop="node_p2p_version" label="p2pVersion">
              <el-input v-model.trim="form.node_p2p_version" :maxlength="50" :placeholder="$t('tronP2pVersionPlaceholder')"></el-input>
            </el-form-item>

            <el-form-item label="listenPort" prop="node_listen_port">
              <el-input v-model.trim="form.node_listen_port" :maxlength="50" :placeholder="$t('tronhttpRpcListenPortPlaceholder')"></el-input>
            </el-form-item>

            <el-form-item class="seed-node-list" label="seedNode" prop="seed_node_ip_list">
              <el-checkbox-group v-model="form.seed_node_ip_list">
                <el-checkbox class="checkBox" v-for="(ip, index) in seedNodeIpList" :key="index" :label="ip">
                  <el-input v-model="form.node_listen_port" :placeholder="$t('tronSettingPortPlaceholder')" disabled>
                    <template slot="prepend" style="width:100px">{{ ip }}</template>
                  </el-input>
                </el-checkbox>
              </el-checkbox-group>
            </el-form-item>

            <div class="more-form">
              <el-button type="text">{{ $t('tronMoreSetting') }}</el-button>
            </div>

            <el-form-item label="maxActiveNodes" prop="node_maxActiveNodes">
              <el-input v-model.trim="form.node_maxActiveNodes" :maxlength="50" :placeholder="$t('tronMaxActionNodesPlaceholder')"></el-input>
            </el-form-item>

            <el-form-item label="maxActiveNodesWithSameIp" prop="node_maxActiveNodesWithSameIp">
              <el-input v-model.trim="form.node_maxActiveNodesWithSameIp" :maxlength="50" :placeholder="$t('tronMaxActiveNodesWithSameIpPlaceholder')"></el-input>
            </el-form-item>

            <el-form-item label="activeConnectFactor" prop="node_activeConnectFactor">
              <el-input-number
                v-model.trim="form.node_activeConnectFactor"
                controls-position="right"
                :min="0"
                :step="0.1"
                :maxlength="50"
                :placeholder="$t('tronSettingPlaceholder')">
              </el-input-number>
            </el-form-item>

            <el-form-item label="connectFactor" prop="node_connectFactor">
              <el-input-number
                controls-position="right"
                :min="0"
                :step="0.1"
                :maxlength="50"
                v-model.trim="form.node_connectFactor"
                :placeholder="$t('tronSettingPlaceholder')">
              </el-input-number>
            </el-form-item>
          </template>
        </el-form>
      </div>

    </el-card>

    <div class="box-footer align-right">
      <el-button class="im-button large" @click="handleCancel">{{ $t('base.prevStep') }}</el-button>
      <el-button class="im-button large" type="primary" @click="handleSubmit">{{ $t('base.nextStep') }}</el-button>
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

  watch: {
    configInfo: {
      handler: 'init',
      immediate: true,
    },
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
            seed_node_ip_list: this.form.seed_node_ip_list.map(ip => ip + '":"' + this.form.node_listen_port),
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

<style lang="scss" scoped>
.p2p-config {
  /deep/ .el-card {
    .el-card__body {
      padding: 30px;
    }
  }

  .box-header {
    margin-bottom: 30px;
    &.title {
      font-size: 20px;
      font-weight: bold;
      color: #081C56;
    }
  }

  /deep/ .el-form-item {
    display: inline-block;
    margin-right: 150px;
    width: 350px;

  }
  /deep/ .el-form-item {
    display: inline-block;
    margin-right: 150px;
    width: 350px;

    .el-form-item__label {
      padding: 0;
      font-size: 16px;
      color: rgba(8, 28, 86, .7);
    }

    &.seed-node-list {
      display: block;
      width: 100%;

      .el-checkbox {
        display: inline-flex;
        align-items: center;
        width: 350px;
        margin-right: 150px;
        margin-bottom: 30px;

        .el-checkbox__label {
          flex: 1;
        }
        .el-input-group__prepend {
          width: 200px;
        }
      }
    }
  }

  .more-form {
    margin-top: 20px;
    .el-button {
      font-size: 18px;
      font-weight: bold;
    }
  }

  .box-footer {
    margin-top: 40px;
    &.align-right {
      text-align: right;
    }
  }
}
</style>
