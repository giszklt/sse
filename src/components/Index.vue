<template>
  <div class="sse-main">
    <el-container style="height: 100%">
      <el-header class="sse-main_header">
        <el-select class="sse-main_select sse-main_selectBorder" v-model="selMain" filterable size="medium"
                   @change="mainViewChange" popper-class="sse-main_selectPoper">
          <template slot="prefix">
            <i class="el-icon-s-tools"></i>
          </template>
          <el-option v-for="item in mainViews"
                     :key="item.key"
                     :label="item.name"
                     :value="item.key">
          </el-option>
        </el-select>
        <div class="sse-main_time">
          <timer :type="0"></timer>
        </div>
        <div class="sse-main_title">
          <div class="sse-main_titleIcon"></div>XXX系列卫星仿真评估系统</div>
        <div class="sse-main_time">
          <timer :type="1"></timer>
        </div>
        <el-select class="sse-main_select sse-main_selectBorder" v-model="selPage" filterable size="medium"
                   @change="mainViewChange" popper-class="sse-main_selectPoper">
          <template slot="prefix">
            <i class="el-icon-s-tools"></i>
          </template>
          <el-option v-for="item in mainPages"
                     :key="item.key"
                     :label="item.name"
                     :value="item.key">
          </el-option>
        </el-select>
      </el-header>
      <el-main class="sse-main_body sse-main_colorBorder">
        <userManagement v-show="selPage == 'adminManger'"></userManagement>
        <visual-map v-show="selPage == 'visual'"></visual-map>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import Timer from "@/components/Timer";
import userManagement from "@/components/userManagement.vue";
import VisualMap from "@/components/visualMap";

export default {
  name: 'HelloWorld',
  components: {VisualMap, Timer, userManagement},
  props: {
    msg: String
  },
  data() {
    return {
      mainViews: [{
        name: "系统管理",
        key: "systemSetting"
      }, {
        name: "基础服务",
        key: "baseService"
      }],
      selMain: "systemSetting",
      mainPages: [{
        name: "用户管理",
        key: "adminManger"
      }, {
        name: "可视化交互",
        key: "visual"
      }],
      selPage: "visual",
    }
  },
  methods: {
    mainViewChange(e) {
      console.log(e)
    },
    mainPageChange(e) {
      console.log(e)
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

@font-face {
  font-family: 'wryh';
  src: url("../assets/font/Technology.ttf");
}

.sse-main {
  height: 100%;
  width: 100%;
  padding: 0 10px 10px;
  background-color: #002938;

  .sse-main_colorBorder {
    background: linear-gradient(to bottom, #6BE4F9 0px, #6BE4F9 1px, transparent 2px, transparent 100%) left top no-repeat,
    linear-gradient(to right, #6BE4F9 0px, #6BE4F9 1px, transparent 2px, transparent 100%) left top no-repeat,
    linear-gradient(to bottom, #6BE4F9 0px, #6BE4F9 1px, transparent 2px, transparent 100%) right top no-repeat,
    linear-gradient(to left, #6BE4F9 0px, #6BE4F9 1px, transparent 2px, transparent 100%) right top no-repeat,
    linear-gradient(to top, #6BE4F9 0px, #6BE4F9 1px, transparent 2px, transparent 100%) left bottom no-repeat,
    linear-gradient(to right, #6BE4F9 0px, #6BE4F9 1px, transparent 2px, transparent 100%) left bottom no-repeat,
    linear-gradient(to top, #6BE4F9 0px, #6BE4F9 1px, transparent 2px, transparent 100%) right bottom no-repeat,
    linear-gradient(to left, #6BE4F9 0px, #6BE4F9 1px, transparent 2px, transparent 100%) right bottom no-repeat;
    background-size: 20px 20px;
  }

  .sse-main_selectBorder {
    background: linear-gradient(to bottom, #5EB1C8 0px, #5EB1C8 1px, transparent 2px, transparent 100%) left top no-repeat,
    linear-gradient(to right, #5EB1C8 0px, #5EB1C8 1px, transparent 2px, transparent 100%) left top no-repeat,
    linear-gradient(to bottom, #5EB1C8 0px, #5EB1C8 1px, transparent 2px, transparent 100%) right top no-repeat,
    linear-gradient(to left, #5EB1C8 0px, #5EB1C8 1px, transparent 2px, transparent 100%) right top no-repeat,
    linear-gradient(to top, #5EB1C8 0px, #5EB1C8 1px, transparent 2px, transparent 100%) left bottom no-repeat,
    linear-gradient(to right, #5EB1C8 0px, #5EB1C8 1px, transparent 2px, transparent 100%) left bottom no-repeat,
    linear-gradient(to top, #5EB1C8 0px, #5EB1C8 1px, transparent 2px, transparent 100%) right bottom no-repeat,
    linear-gradient(to left, #5EB1C8 0px, #5EB1C8 1px, transparent 2px, transparent 100%) right bottom no-repeat;
    background-size: 10px 10px;
  }

  .sse-main_header {
    height: 70px !important;
    padding: 15px 0 0;
    background-image: url("../assets/header.png");
    background-repeat: no-repeat;
    background-size: contain;
    background-position: center;
    display: flex;
    text-align: center;

    .sse-main_select {
      width: 160px;
      height: 40px;
      text-align: center;
      background-color: #183C4C;

      /deep/ .el-input {
        line-height: 40px;
        font-size: 16px;
        font-family: wryh;

        .el-input__prefix {
          font-size: 16px;
          color: #6BE4F9;
          font-weight: 700;
          left: 20px;
        }

        .el-input__suffix {
          right: 14px;

          .el-select__caret {
            width: 12px;
            line-height: 40px;
            font-weight: 700;
            font-size: 12px;
            color: #6BE4F9;
          }
        }

        .el-input__inner {
          text-align: center;
          font-weight: 700;
          border: none;
          padding-left: 24px;
          line-height: 40px;
          background-color: rgba(0, 0, 0, 0);
          -webkit-text-fill-color: #6BE4F9;
          font-family: wryh;
        }
      }
    }

    .sse-main_time {
      margin: 0 auto;
    }

    .sse-main_title {
      display: inline-flex;
      padding: 0 150px;
      color: #FFFFFF;
      font-size: 32px;
      line-height: 40px;
      text-align: center;
      height: 40px;
      .sse-main_titleIcon{
        height: 40px;
        width: 40px;
        margin-right: 10px;
        background-color: #FFFFFF;
        border-radius: 50% 50%;
      }
    }
  }

  .sse-main_body {
    width: 100%;
    background-color: #183C4C;
    padding: 2px;
    margin-top: 10px;
  }
}
</style>

<style lang="scss">
.sse-main_selectPoper {
  background-color: #183C4C !important;
  border: 1px solid #5EB1C8 !important;

  .el-select-dropdown__item {
    text-align: center;
    color: #6BE4F9;
    font-size: 16px;
    font-weight: 700;
  }

  .el-select-dropdown__item.hover, .el-select-dropdown__item:hover {
    background-color: #183C4C !important;
    color: #409EFF;
  }

  .popper__arrow {
    top: -7px !important;
    border-bottom-color: #5EB1C8 !important;

    &::after {
      border-bottom-color: #5EB1C8 !important;
    }
  }
}
</style>
