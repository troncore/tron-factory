<template>
  <div class="page-view get-start">

    <div class="page-header">
      <div class="title">{{ $t('getStart.webTitle') }}</div>
      <div class="description">{{ $t('getStart.description') }}</div>
      <div class="description-more">{{ $t('getStart.descriptionMore') }}</div>
    </div>

    <div class="page-main">
      <div class="start-deploy" @click="handleStartSettingDeploy">{{ $t('getStart.getStartDeploy') }}</div>
      <div class="view-document" @click="handleViewDocument">{{ $t('getStart.viewDocument') }}</div>
    </div>

    <div class="page-footer">
      <div class="title"><span>{{ $t('getStart.forNewUserTitle') }}</span></div>
      <div class="guide-list">
        <div class="guide-item">
          <i class="guide-item__index"></i>
          <div class="guide-item__body">
            <div class="guide-item__body-title">{{ $t('getStart.addNode') }}</div>
            <div class="guide-item__body-detail">{{ $t('getStart.addNodeTips') }}</div>
          </div>
          <i class="guide-item__icon"></i>
        </div>
        <div class="guide-item">
          <i class="guide-item__index"></i>
          <div class="guide-item__body">
            <div class="guide-item__body-title">{{ $t('getStart.configManage') }}</div>
            <div class="guide-item__body-detail">{{ $t('getStart.configManageTips') }}</div>
          </div>
          <i class="guide-item__icon"></i>
        </div>
        <div class="guide-item">
          <i class="guide-item__index"></i>
          <div class="guide-item__body">
            <div class="guide-item__body-title">{{ $t('getStart.pluginImport') }}</div>
            <div class="guide-item__body-detail">{{ $t('getStart.pluginImportTips') }}</div>
          </div>
          <i class="guide-item__icon"></i>
        </div>
        <div class="guide-item">
          <i class="guide-item__index"></i>
          <div class="guide-item__body">
            <div class="guide-item__body-title">{{ $t('getStart.nodeDeploy') }}</div>
            <div class="guide-item__body-detail">{{ $t('getStart.nodeDeployTips') }}</div>
          </div>
          <i class="guide-item__icon"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  name: 'get-start',
  created() {},
  methods: {
    ...mapMutations('user', {
      updateAuthMenu: 'SET_AUTH_MENU',
    }),

    handleStartSettingDeploy() {
      this.$_api.getStart.oneClick({}, err => {
        if (err) return

        this.updateAuthMenu({nameList: ['get-start', 'node-list']})

        this.$router.push('/node-list')
      })
    },

    handleViewDocument() {
      let currentLanguage = sessionStorage.getItem('currentLang')
      if (currentLanguage === 'en-US') {
        window.open('http://39.106.174.213/wubin1/one-click-deployment/blob/master/README.md', '_blank')
      } else {
        window.open('http://39.106.174.213/wubin1/one-click-deployment/blob/master/README.zh-CN.md', '_blank')
      }
    },
  },
}
</script>

<style lang="scss" scoped>
@import "~@/assets/styles/base";
$media1680: 1680px;
.get-start {
  padding: 160px 100px 0;
  @media screen and (max-width: $media1680){
    padding-top: 100px;
  }

  .page-header {
    text-align: center;
    .title {
      margin-bottom: 10px;
      font-size: 50px;
      color: #333333;
    }
    .description {
      font-size: 18px;
      color: #3F3F3F;
    }
    .description-more {
      font-size: 18px;
      color: #777;
    }
  }

  .page-main {
    margin: 70px 0 120px 0;
    text-align: center;
    @media screen and (max-width: $media1680){
      margin: 60px 0 90px 0;
    }
    .start-deploy {
      margin: 0 auto 40px;
      width: 500px;
      height: 80px;
      line-height:80px;
      font-size: 36px;
      text-align: center;
      color: white;
      background-color: theme-color();
      box-shadow: 0 12px 20px 0 rgba(1,1,71,0.10);
      border-radius: 6px;
      cursor: pointer;
      @media screen and (max-width: $media1680){
        margin-bottom: 30px;
        width: 300px;
        height: 60px;
        line-height:60px;
        font-size: 26px;
      }
    }
    .view-document {
      display: inline-block;
      font-size: 16px;
      color: theme-color();
      cursor: pointer;
      text-decoration: underline;
    }
  }

  .page-footer {
    .title {
      display: flex;
      align-items: center;
      span {
        width: 130px;
        font-size: 26px;
        font-weight: bold;
        text-align: center;
        color: rgba(8, 28, 86, 0.7);
      }

      &:before,
      &:after {
        display: inline-block;
        content: ' ';
        width: calc((100% - 130px) / 2);
        height: 1px;
        opacity: 0.3;
        border: 1px solid #979797;
      }
    }
    .guide-list {
      display: flex;
      margin-top: 60px;
      .guide-item {
        flex: 1;
        display: flex;
        align-items: center;
        margin-right: 20px;
        padding: 0 40px;
        height: 140px;
        box-shadow: 0 2px 40px 0 rgba(4, 4, 64, 0.04);
        border-radius: 10px;
        background-color: #fff;

        @media screen and (max-width: $media1680){
          padding: 0 20px;
          height: 120px;
        }

        &:last-child {
          margin-right: 0;
        }

        .guide-item__index {
          display: inline-block;
          margin-right: 10px;
          background-repeat: no-repeat;
          background-size: 100% auto;
          background-position: center;
        }
        .guide-item__body-title {
          margin-bottom: 5px;
          font-size: 22px;
          font-weight: bold;
          color: #666;
          @media screen and (max-width: $media1680){
            font-size: 18px
          }
        }
        .guide-item__body-detail {
          font-size: 14px;
          color: #999;
          @media screen and (max-width: $media1680){
            font-size: 12px;
          }
        }
        .guide-item__icon {
          display: inline-block;
          margin-left: 32px;
          background-repeat: no-repeat;
          background-size: 100% auto;
          background-position: center;
          @media screen and (max-width: $media1680){
            margin-left: 10px;
          }
        }

        &:hover {
          background-color: theme-color();
          box-shadow: 0 12px 20px 0 rgba(1, 1, 71, 0.10);

          .guide-item__body-title {
            color: rgb(255, 255, 255);
          }
          .guide-item__body-detail {
            color: rgba(255, 255, 255, .8);
          }
        }

        &:nth-child(1) {
          .guide-item__index {
            width: 22px;
            height: 47px;
            background-image: url(../../assets/images/num-one-disabled.png);
            @media screen and (max-width: $media1680){
              width: 15px;
            }
          }
          .guide-item__icon {
            width: 76px;
            height: 75px;
            background-image: url(../../assets/images/add-node-disabled.png);
            @media screen and (max-width: $media1680){
              width: 50px;
            }
          }
          &:hover {
            .guide-item__index {
              background-image: url(../../assets/images/num-one-active.png);
            }
            .guide-item__icon {
              background-image: url(../../assets/images/add-node-active.png);
            }
          }
        }
        &:nth-child(2) {
          .guide-item__index {
            width: 39px;
            height: 48px;
            background-image: url(../../assets/images/num-two-disabled.png);
            @media screen and (max-width: $media1680){
              width: 26px;
            }
          }
          .guide-item__icon {
            width: 69px;
            height: 51px;
            background-image: url(../../assets/images/config-manage-disabled.png);
            @media screen and (max-width: $media1680){
              width: 46px;
            }
          }
          &:hover {
            .guide-item__index {
              background-image: url(../../assets/images/num-two-active.png);
            }
            .guide-item__icon {
              background-image: url(../../assets/images/config-manage-active.png);
            }
          }
        }
        &:nth-child(3) {
          .guide-item__index {
            width: 39px;
            height: 50px;
            background-image: url(../../assets/images/num-three-disabled.png);
            @media screen and (max-width: $media1680){
              width: 26px;
            }
          }
          .guide-item__icon {
            width: 68px;
            height: 75px;
            background-image: url(../../assets/images/plugin-import-disabled.png);
            @media screen and (max-width: $media1680){
              width: 45px;
            }
          }
          &:hover {
            .guide-item__index {
              background-image: url(../../assets/images/num-three-active.png);
            }
            .guide-item__icon {
              background-image: url(../../assets/images/plugin-import-active.png);
            }
          }
        }
        &:nth-child(4) {
          .guide-item__index {
            width: 39px;
            height: 48px;
            background-image: url(../../assets/images/num-four-disabled.png);
            @media screen and (max-width: $media1680){
              width: 26px;
            }
          }
          .guide-item__icon {
            width: 83px;
            height: 65px;
            background-image: url(../../assets/images/node-deploy-disabled.png);
            @media screen and (max-width: $media1680){
              width: 55px;
            }
          }
          &:hover {
            .guide-item__index {
              background-image: url(../../assets/images/num-four-active.png);
            }
            .guide-item__icon {
              background-image: url(../../assets/images/node-deploy-active.png);
            }
          }
        }
      }
    }
  }
}
</style>
