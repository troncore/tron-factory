<template>
  <div class="define-config">
    <ul class="im-steps">
      <li v-for="(step, index) in stepList" class="im-step" :class="{'is-active': activeStep === index + 1}">
        <div class="im-step__body" @click="handleStep(step, index + 1)">
          <span class="im-step__body-index">{{ index + 1 }}</span>
          <span class="im-step__body-title">{{ step.title }}</span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: "define-config",
    data () {
      return {
        activeStep: 3,
        stepList: [
          { title: '创世信息', component: '', },
          { title: '基础配置', component: '', },
          { title: 'HTTP/RPC配置', component: '', },
          { title: '数据库基础配置', component: '', },
          { title: 'P2P配置', component: '', },
          { title: '模块函数', component: '', },
        ]
      }
    },
    created () {

    },
    methods: {
      handleStep (item, index) {
        this.activeStep = index
      }
    }
  }
</script>

<style lang="scss" scoped>
$step_color_done: rgba(0, 0, 0, .8);
$step_color_active: theme-color();
$step_color_wait: rgba(8, 28, 86, .5);
.define-config {
  .el-steps {
    padding: 15px 50px;
  }

  .im-steps {
    display: flex;
    justify-content: space-between;
    margin: 0;
    padding: 15px 50px;
    list-style-type: none;
    font-size: 14px;
    font-weight: bold;
    color: $step_color_done;
    background-color: #F5F7FE;

    .im-step {
      display: flex;
      align-items: center;
      flex: 1 1 auto;
      &:last-child {
        flex: none;
      }
      &:not(:last-child):after {
        flex: 1;
        display: inline-block;
        margin: 0 15px;
        content: '';
        height: 1px;
        background-color: #C0C4CC;
      }
    }
    .im-step.is-active {
      color: $step_color_active;
      .im-step__body-index {
        color: white;
        border-color: $step_color_active;
        background-color: $step_color_active;
      }
    }
    .im-step.is-active ~ .im-step {
      color: $step_color_wait;
      .im-step__body-index {
        border-color: $step_color_wait;
      }
    }

    .im-step__body {
      cursor: pointer;
    }
    .im-step__body-index {
      display: inline-block;
      margin-right: 10px;
      width: 24px;
      height: 24px;
      line-height: 20px;
      text-align: center;
      vertical-align: middle;
      border: 2px solid $step_color_done;
      border-radius: 50%;
    }
    .im-step__body-title {
      display: inline-block;
      vertical-align: middle;
    }
  }
}
</style>
