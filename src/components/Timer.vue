<template>
  <div class="sse-time_timer">
    <div class="sse-time_left">
      <span><a>{{ time }}</a></span>
    </div>
    <div class="sse-time_right">
      <div class="sse-time_top">
        <div class="sse-time_type">{{ timeType[type] }}</div>
        <div class="sse-time_week">{{ week }}</div>
      </div>
      <div class="sse-time_bottom">{{ day }}</div>
    </div>
  </div>
</template>

<script>

/* eslint-disable */
export default {
  name: "Timer",
  props: {
    type: {
      type: Number,
      default: 0
    },
  },
  data() {
    return {
      weeks: ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"],
      timeType: ["北京时间", "世界时间"],
      time: "09:59:05",
      week: "星期一",
      day: "2022年06月15日"
    }
  },
  methods: {
    getNow() {
      let date = new Date();
      if (this.type == 1) {
        date = new Date(date.getTime() - (3600000 * 8))
      }
      this.week = this.weeks[date.getDay()];
      this.time = this.fillZero(date.getHours()) + ":" + this.fillZero(date.getMinutes()) + ":" + this.fillZero(date.getSeconds());
      this.day = date.getFullYear() + "年" + this.fillZero(date.getMonth() + 1) + "月" + this.fillZero(date.getDate()) + "日";
    },
    fillZero(n) {
      if (n.toString().length < 2) {
        n = "0" + n;
      }
      return n;
    }
  },
  mounted() {
    setInterval(() => {
      this.getNow()
    }, 1000);
  }
}
</script>

<style scoped lang="scss">

@font-face {
  font-family: 'electronicFont';
  src: url("../assets/font/Technology.ttf");
}

@font-face {
  font-family: 'wryh';
  src: url("../assets/font/Technology.ttf");
}


.sse-time_timer {
  height: 40px;
  padding: 7px 0;
  width: 100%;
  line-height: 26px;
  display: flex;
  min-width: 250px;

  .sse-time_left {
    width: 50%;
    font-size: 34px;
    color: #6BE4F9;
    font-family: electronicFont;
    letter-spacing: 3px;
    min-width: 130px;
  }

  .sse-time_right {
    width: 50%;
    margin-left: 10px;
    display: block;
    color: #FFFFFF;
    font-family: wryh;

    .sse-time_top {
      width: 100%;
      height: 12px;
      line-height: 12px;
      display: flex;
      text-align: center;
      font-size: 12px;

      .sse-time_type {
        background-color: #D27110;
        padding: 1px 2px;
      }

      .sse-time_week {
        margin-left: 5px;
        font-size: 12px;
      }
    }

    .sse-time_bottom {
      font-size: 12px;
      //zoom: 0.83;
      height: 10px;
      width: 100%;
      text-align: left;
      line-height: 10px;
      margin-top: 4px;
      letter-spacing: 2px;
    }
  }
}
</style>
