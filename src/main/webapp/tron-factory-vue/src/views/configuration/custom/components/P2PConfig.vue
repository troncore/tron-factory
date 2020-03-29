<template>
  <div class="box-view p2p-config">
    <div class="box-body">
      <el-form class="im-form" ref="p2p-config-form" :rules="formRules" :model="form" label-position="top">

        <el-form-item prop="node_p2p_version" label="p2pVersion">
          <span slot="label">p2pVersion <i class="help-tips">({{ $t('configuration.helpTips.p2pVersion') }})</i></span>
          <el-input v-model.trim="form.node_p2p_version" type="number" :maxlength="50" :placeholder="$t('base.pleaseInput')"></el-input>
        </el-form-item>

        <el-form-item label="listenPort" prop="node_listen_port">
          <span slot="label">listenPort <i class="help-tips">({{ $t('configuration.helpTips.listenPort') }})</i></span>
          <el-input v-model.trim="form.node_listen_port" :maxlength="50" :placeholder="$t('base.pleaseInput')"></el-input>
        </el-form-item>

        <el-form-item label="seedNodeList" prop="seed_node_ip_list" class="seed-node-list">
          <span slot="label">seedNodeList <i class="help-tips">({{ $t('configuration.helpTips.seedNodeList') }})</i></span>
          <el-checkbox-group v-model="form.seed_node_ip_list">
            <el-checkbox class="checkBox" v-for="(ip, index) in seedNodeIpList" :key="index" :label="ip">
              <el-input v-model="form.node_listen_port" :placeholder="$t('configuration.valid.listenPort')" disabled>
                <template slot="prepend" style="width:100px">{{ ip }}</template>
              </el-input>
            </el-checkbox>
          </el-checkbox-group>
        </el-form-item>

        <div class="more-form">
          <el-button type="text" @click="showMore = !showMore"><i class="el-icon-arrow-right"></i> {{ $t('configuration.moreSetting') }}</el-button>
        </div>

        <el-collapse-transition>
          <div v-if="showMore">
            <el-form-item label="maxActiveNodes" prop="node_maxActiveNodes">
              <span slot="label">maxActiveNodes <i class="help-tips">({{ $t('configuration.helpTips.maxActiveNodes') }})</i></span>
              <el-input v-model.trim="form.node_maxActiveNodes" :maxlength="50" :placeholder="$t('base.pleaseInput')"></el-input>
            </el-form-item>

            <el-form-item label="maxActiveNodesWithSameIp" prop="node_maxActiveNodesWithSameIp">
              <span slot="label">maxActiveNodesWithSameIp <i class="help-tips">({{ $t('configuration.helpTips.maxActiveNodesWithSameIp') }})</i></span>
              <el-input v-model.trim="form.node_maxActiveNodesWithSameIp" :maxlength="50" :placeholder="$t('base.pleaseInput')"></el-input>
            </el-form-item>

            <el-form-item label="activeConnectFactor" prop="node_activeConnectFactor">
              <span slot="label">activeConnectFactor</span>
              <el-input-number
                v-model.trim="form.node_activeConnectFactor"
                controls-position="right"
                :min="0"
                :step="0.1"
                :maxlength="50"
                :placeholder="$t('base.pleaseInput')">
              </el-input-number>
            </el-form-item>

            <el-form-item label="connectFactor" prop="node_connectFactor">
              <span slot="label">connectFactor</span>
              <el-input-number
                controls-position="right"
                :min="0"
                :step="0.1"
                :maxlength="50"
                v-model.trim="form.node_connectFactor"
                :placeholder="$t('base.pleaseInput')">
              </el-input-number>
            </el-form-item>
          </div>
        </el-collapse-transition>
      </el-form>
    </div>

    <div class="box-footer align-right">
      <el-button class="im-button large" @click="handleCancel">{{ $t('base.prevStep') }}</el-button>
      <el-button class="im-button large" :loading="loading" :disabled="configLoading" type="primary" @click="handleSubmit">{{ $t('base.nextStep') }}</el-button>
    </div>

  </div>
</template>
<script>
import { isvalidateNum, twoDecimal } from '@/utils/validate.js'
import { isvalidateIntegerNum } from "@/utils/validate";
export default {
  name: 'p2p-config',
  props: {
    initConfigInfo: {
      type: Function,
      required: true,
    },
    configLoading: Boolean,
  },
  data() {
    return {
      showMore: false,
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
      seedNodeIpList: [],
      loading: false,
    }
  },
  computed: {
    formRules() {
      const validNum = (rule, value, callback) => {
        if (!isvalidateIntegerNum(value)) {
          callback(new Error(this.$t('configuration.valid.gteZeroInt')))
        } else {
          callback()
        }
      }
      const validMaxNum = (rule, value, callback) => {
        if (value > 2147483647) {
          callback(new Error(this.$t('configuration.valid.maxNumberValue')))
        } else {
          callback()
        }
      }
      const validMainnet = (rule, value, callback) => {
        if (value == 11111) {
          callback(new Error(this.$t('configuration.valid.mainnetPlaceholder')))
        } else {
          callback()
        }
      }
      const validTestNet = (rule, value, callback) => {
        if (value == 20180622) {
          callback(new Error(this.$t('configuration.valid.testnetPlaceholder')))
        } else {
          callback()
        }
      }
      const validSpecialNet = (rule, value, callback) => {
        if (value == 1) {
          callback(new Error(this.$t('configuration.valid.specialPlaceholder')))
        } else {
          callback()
        }
      }
      const validPortNum = (rule, value, callback) => {
        if (value > 65535) {
          callback(new Error(this.$t('configuration.valid.maxPortValue')))
        } else {
          callback()
        }
      }
      const validTwoDecimalFun = (rule, value, callback) => {
        if (!twoDecimal(value)) {
          callback(new Error(this.$t('configuration.valid.validTwoDecimal')))
        } else {
          callback()
        }
      }
      const rules = {
        node_p2p_version: [
          { required: true, message: this.$t('base.pleaseInput'), trigger: 'blur', },
          { validator: validNum, trigger: 'blur', },
          { validator: validMainnet, trigger: 'blur', },
          { validator: validTestNet, trigger: 'blur', },
          { validator: validSpecialNet, trigger: 'blur', },
          { validator: validMaxNum, trigger: 'blur', },
        ],
        node_listen_port: [
          { required: true, message: this.$t('base.pleaseInput'), trigger: 'blur', },
          { validator: validNum, trigger: 'blur', },
          { validator: validPortNum, trigger: 'blur', },
        ],
        seed_node_ip_list: [
          { required: true, message: this.$t('base.pleaseSelect'), trigger: 'change', },
        ],
        node_maxActiveNodes: [
          { required: true, message: this.$t('base.pleaseInput'), trigger: 'blur', },
          { validator: validNum, trigger: 'blur', },
          { validator: validMaxNum, trigger: 'blur', },
        ],
        node_maxActiveNodesWithSameIp: [
          { required: true, message: this.$t('base.pleaseInput'), trigger: 'blur', },
          { validator: validNum, trigger: 'blur', },
          { validator: validMaxNum, trigger: 'blur', },
        ],
        node_activeConnectFactor: [
          { required: true, message: this.$t('base.pleaseInput'), trigger: 'blur', },
          { validator: validMaxNum, trigger: 'blur', },
          { validator: validTwoDecimalFun, trigger: 'blur', },
        ],
        node_connectFactor: [
          { required: true, message: this.$t('base.pleaseInput'), trigger: 'blur', },
          { validator: validMaxNum, trigger: 'blur', },
          { validator: validTwoDecimalFun, trigger: 'blur', },
        ],
      }
      return rules
    },
  },

  created () {
    this.getConfigInfo()
  },

  methods: {
    getConfigInfo() {
      this.initConfigInfo().then((res = {}) => {
        let ipWithPortList = res.seed_node_ip_list || []
        let seedNodeIpList = ipWithPortList.map(item => item.split(':')[0])

        this.seedNodeIpList = res.allNodes || []

        this.form = {
          ...this.form,
          ...res,
          seed_node_ip_list: seedNodeIpList
        }
      })
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
          this.$_api.configuration.p2pConfig(params, err => {
            this.loading = false
            if (err) return

            this.$notify({
              type: 'success',
              title: this.$t('base.successful'),
              message: this.$t('configuration.p2pSaveSuccess')
            })
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
@import "~@/assets/styles/base.scss";
.p2p-config {
  /deep/ .seed-node-list {
    display: block;
    width: 100%;

    .el-checkbox {
      display: inline-flex;
      align-items: center;
      margin-right: 120px;
      width: 300px;
      margin-bottom: 20px;

      .el-checkbox__label {
        flex: 1;
      }
      .el-input-group__prepend {
        width: 200px;
      }
    }
  }
}
</style>