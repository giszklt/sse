<template>
  <div class="sse-time_timer">
    <div class="sse-time_left">
      <span><a>{{ time }}</a></span>
    </div>
    <div class="sse-time_right">
      <div calss="sse-time_top">
        <div class="sse-time_type">{{timeType[type]}}</div>
        <div class="sse-time_week">{{week}}</div>
      </div>
      <div calss="sse-time_bottom">{{day}}</div>
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
      timeType:["北京时间", "世界时间"],
      time: "09:59:05",
      week:"星期一",
      day:"2022年06月15日"
    }
  }
}
</script>

<style scoped lang="scss">
.sse-time_timer {
  height: 40px;
  width: 100%;
}
</style>
