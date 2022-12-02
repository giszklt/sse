<template>
  <div class="sse-visual_main">
    <div id="cesiumContainer" ref="map">
    </div>
    <div class="sse-visual_title">
      <div class="sse-visual_titleicon"></div>{{wxname}}</div>
  </div>
</template>

<script>
import * as Cesium from "../../public/Cesium/Cesium";

export default {
  name: "visualMap",
  data() {
    return {
      wxname:"卫星名称1号"
    }
  },
  mounted() {
    Cesium.Ion.defaultAccessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJkM2U3YmMyOS0xNjAxLTRhMjAtOTRkZi0xNzQ3NTQ2YTNmNGIiLCJpZCI6Njk3MTEsImlhdCI6MTYzNDEwNDc4NX0.UB8L0lR4rQixyIenng8k6bONubEBu1QHy0zXmNV6wX4"
    Cesium.Camera.DEFAULT_VIEW_FACTOR = 1.2;
    this.lastMouseX = -1
    this.lastMouseY = -1
    document.oncontextmenu = function () {
      return false;
    }
    // const Cesium = this.Cesium
    const viewer = new Cesium.Viewer("cesiumContainer", {
      geocoder: false,
      selectionIndicator: false,
      baseLayerPicker: false,
      animation: false,
      navigationHelpButton: false,
      infoBox: false,
      timeline: false,
      homeButton: false,
      showRenderLoopErrors: false,
      sceneModePicker: false,
      mapMode2D: Cesium.MapMode2D.ROTATE,
      fullscreenButton: false,
      sceneMode: Cesium.SceneMode.SCENE3D,
      // 连接地图服务
      // imageryProvider: new Cesium.ArcGisMapServerImageryProvider({
      //   // url: window.mapUrl + ":9109/map/?z={z}&x={x}&y={y}",
      //   url: "https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer",
      //   tilingScheme: new Cesium.WebMercatorTilingScheme(),
      //   maximumLevel: 7,
      //   show: false
      // }),
    });

    // 将三维球定位到中国区域
    viewer.camera.flyTo({
      destination: Cesium.Cartesian3.fromDegrees(103.84, 31.15, 25000000),
    });

    // this.utils.transformTime(this, window.viewer); //时间转换
    // this.utils.setView(window.viewer);
    viewer.cesiumWidget.creditContainer.style.display = "none";
    //是否开启抗锯齿
    viewer.scene.fxaa = true;
    viewer.scene.debugShowFramesPerSecond = false;
    viewer.scene.postProcessStages.fxaa.enabled = true;
  }
}
</script>
<style scoped lang="scss">

#cesiumContainer, .sse-visual_main {
  width: 100%;
  height: 100%;
  position: relative;
  .sse-visual_title{
    color: #6BE4F9;
    height: 50px;
    line-height: 50px;
    background-image: url("../assets/wxname.png");
    background-repeat: no-repeat;
    background-size: contain;
    background-position: center;
    text-align: center;
    font-size: 24px;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    .sse-visual_titleicon{
      width: 28px;
      height: 28px;
      margin-right: 16px;
      background-repeat: no-repeat;
      background-size: contain;
      background-position: center;
      vertical-align: middle;
      display: -webkit-inline-box;
      background-image: url("../assets/icon/wx.svg");

    }
  }
}
</style>
