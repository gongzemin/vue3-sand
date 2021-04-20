<template>
  <div id="mainDiv">
    <div id="DECoreContainer"> </div>
    <!-- 电子沙盘按钮 -->
      <el-button class="sand-button" type="primary" v-if="!sandMenuFlag" @click="getMenu">电子沙盘</el-button>
      <!-- 电子沙盘组件 -->
      <sand id="sand" ref="sand" v-else></sand>
      <!-- 在地球绘制矢量图形等跟随鼠标tootip -->
      <div id="toolTip"></div>
      <!-- 军事标绘tooltip,固定位置 -->
      <div id="toolTip1"></div>
  </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex';
import '../../node_modules/cesium/Build/Cesium/Widgets/widgets.css';

import sand from '@/views/Sand.vue';

require('../../public/css/sand.css');
const POI = require('../libs/DESource/POI');
const TEST = require('../libs/DESource/Test');

export default {
  name: 'DECoreViewer',
  data() {
    return {
    };
  },
  props: {
    msg: String,
  },
  computed: {
    ...mapState('common', [
      'sandMenuFlag',
    ]),
  },
  mounted() {
    const { Cesium } = this;
    debugger
    /** **初始化地球(请替换成初始化地球代码)*** */
    Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIzZmM4MWYwYS0xOWM3LTQ0ZWEtYTUzNC1mMWI3ODAyODA1ZmYiLCJpZCI6NDQ2OTEsImlhdCI6MTYxNDI0NDk1OX0.5wce5JelLgCOVQ513YI9QtLDuqTA_L9Y0u_s2oFkWR4';
    // 高德卫星地图
    // var earthView = {
    //   containerDiv: "DECoreContainer",
    //   mapFlag: "gd_sa"
    // };
    // window.viewer = POI.initEarth(earthView);

    // 地形深度检测
    window.viewer = new Cesium.Viewer('DECoreContainer');
    console.log('poi', POI);
    // POI.depthTestAT(window.viewer, true);
    // TEST.depthTestAT(window.viewer, true);
    const options = {
      lng: 106.2955299594,
      lat: 40.092238415,
      height: 10e6,
      heading: 0.0,
      pitch: -90,
      roll: 0.0,
    };
    console.log('88888888888888888****', this.$refs, this.sandMenuFlag);
    this.$nextTick(() => {
      // 需要从cookie获取数据
      // this.$store.commit('common/getDeptId',this.$Cookies.get('deptId'));
      // this.$store.commit('common/getUid',this.$Cookies.get('uid'));
      // 相机视角
      TEST.flyTo(window.viewer, options);
      /** *************替换结束************** */
    });
  },
  methods: {
    ...mapMutations('common', ['changeSand']),
    // 电子沙盘按钮
    getMenu() {
      this.changeSand(true);
      setTimeout(() => {
        console.log('1q', this.sandMenuFlag);
      }, 2000);
    },
  },
  components: {
    sand,
  },
  watch: {
    sandMenuFlag(newV, oldV) {
      if (newV === true) {
        console.log('77777777777777777');
        this.$nextTick(() => {
          this.$refs.sand.getPOIList();
          this.$refs.sand.getGLBList();
          this.$refs.sand.ListInit();
          this.$refs.sand.POIList();
          this.$refs.sand.VectorList();
          this.$refs.sand.GlbModelList();
        });
      }
      console.log('new-old', newV, oldV);
    },
  },
};
</script>
<style>
#DECoreContainer,#mainDiv{
  height: 100%;
}
.sand-button{
  position:absolute;
  top:120px;
  left:110px;
  z-index:6;
}
#toolTip{
  display:none;
  color:rgb(236, 159, 30);
  border: 1px solid rgb(236, 159, 30);
  position:absolute;
  font-size:12px;
  color:#fff;
  width:140px;
  text-align:center;
}
#toolTip1{
  display:none;
  color:rgb(236, 159, 30);
  border: 1px solid rgb(236, 159, 30);
  position:absolute;
  font-size:12px;
  color:#fff;
  width:325px;
  text-align:left;
}
</style>
