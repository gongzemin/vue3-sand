/* eslint-disable max-len */
<template>
  <div class="leftDraw">
    <div class="triangle"><img src="../../public/images/sand/left_top.png"></div>
    <div class="leftMainContent">
      <!--大标题-->
      <div class="leftTitle">
        <div class="bigTitle">
          <span class="iconfont icon-jichu-sanweishapan"></span>
          <span class="text">电子沙盘</span>
          <img src="../../public/images/sand/dot.png">
        </div>
        <div class="back">
          <div class="backIcon" @click="back">
            <img src="../../public/images/sand/back.png">
            <span>返回</span>
          </div>
        </div>
      </div>
      <el-tabs type="card" class="tabcard">
        <el-tab-pane label="" icon="md-analytics">
          <div class="middleCont">
            <div class="listout">
              <div class="listin">
                <!--粒子特效-->
                <div class="spareTitle">
                  <span class="iconfont icon-lizitexiao"></span>
                  <span>粒子特效</span>
                </div>
                <div class="particle">
                  <div :class="particlelist == item.id ?'img active':'img'" v-for="(item,index) in particleList" :key="'particleList'+index" @click="getParticle(item)"><img :src="item.imgUrl" :title="item.name"></div>
                </div>
                <!--POI标绘-->
                <div class="spareTitle">
                  <span class="iconfont icon-biaohui2"></span>
                  <span>POI标绘</span>
                </div>
                <div class="poi">
                  <div class="poismall">
                    <div :class="poilist == item.id ?'img active':'img'" v-for="(item,index) in poiList" :key="'poiList'+index" @click="getPOI(item)"><img :src="item.accessUrl" :title="item.imgName"></div>
                  </div>
                </div>
                <!--矢量图形-->
                <div class="spareTitle">
                  <span class="iconfont icon-shiliangtuxing"></span>
                  <span>矢量图形</span>
                </div>
                <div class="particle">
                  <div :class="vectorlist == item.id ?'img active':'img'" v-for="(item,index) in vectorList" :key="'vectorList'+index" @click="getVector(item)"><img :src="item.imgUrl" :title="item.name"></div>
                </div>
                <!--GLB模型-->
                <div class="spareTitle">
                  <span class="iconfont icon-moxing1"></span>
                  <span>GLB模型</span>
                </div>
                <div class="glb">
                  <div class="glbsmall">
                    <div :class="glblist1 == item.id ?'img active':'img'" v-for="(item,index) in glbList" :key="'glbList'+index" @click="getGlb(item)"><img :src="item.imageList.length>0?item.imageList[0].accessPath:''" :title="item.modelName"></div>
                  </div>
                </div>
                <!--军事标绘-->
                <div class="spareTitle">
                  <span class="iconfont icon-biaohui2"></span>
                  <span>军事标绘</span>
                </div>
                <div class="military">
                  <div :id="item.divId" :class="militarylist == item.id ?'img active':'img'" v-for="(item,index) in militaryList" :key="'military'+index" @click="getMilitary(item.id)"><img :src="item.img" :title="item.name"></div>
                </div>
              </div>
            </div>
          </div>
        </el-tab-pane>

      </el-tabs>
    </div>
    <div class="triangle"><img src="../../public/images/sand/left_bottom.png"></div>
    <!--修改粒子特效的名称-->
    <el-dialog class="sandModal" v-model="particleName" draggable scrollable title="粒子名称编辑" @on-ok="ok">
      <div><el-input v-model="editParticleName" placeholder="Enter something..." /></div>
    </el-dialog>
    <!--POI标绘名称修改-->
    <el-dialog class="sandModal" v-model="POIModal" title="POI标绘编辑" @on-ok="POIok" @on-cancel="POIcancel" draggable>
      <el-input v-model="POIName" placeholder="Enter something..." />
    </el-dialog>
    <!--矢量图形名称修改-->
    <el-dialog class="sandModal" v-model="VectorModal" title="矢量图形编辑" @on-ok="Vectorok" @on-cancel="Vectorcancel" draggable>
      <el-input v-model="VectorName" placeholder="Enter something..." />
    </el-dialog>
    <!--确认批量删除对话框 -->
     <el-dialog class="sandModal" v-model="batchDeletionFlag" title="批量删除" @on-ok="batchDeletion"  draggable>
       <div style="color:#ffffff;text-align:center;">确定删除选中的&nbsp;{{batchTitle}}&nbsp;数据吗？</div>
    </el-dialog>
    <!--单体模型姿态修改-->
    <el-dialog class="sandModal" v-model="GLBModal" title="单体模型编辑" @on-ok="GLBModalok" @on-cancel="GLBModalcancel" draggable>
      <div class="glbAdjust">
        名称：<el-input v-model="glbOptions.name" placeholder="Enter something..." style="width:436px;" @on-change="adjustGLB" />
      </div>
      <div class="glbAdjust">
        经度：<el-input-number style="width:190px;"  class="glbAdjustInput"  :step="0.000001"  v-model="glbOptions.lng" @on-change="adjustGLB"></el-input-number>
         <span style="margin-left:10px;">纬度：</span><el-input-number style="width:190px;"  class="glbAdjustInput"   :step="0.000001"  v-model="glbOptions.lat" @on-change="adjustGLB"></el-input-number>
        </div>
      <div class="glbAdjust">
        高度：<el-input-number style="width:190px;"  class="glbAdjustInput"  :step="0.1"  v-model="glbOptions.height" @on-change="adjustGLB"></el-input-number>
      <span style="margin-left:10px;">旋转角度(四周)：</span><el-input-number  style="width:125px;" class="glbAdjustInput"  :max="180.0" :min="-180.0" :step="0.5"  v-model="glbOptions.heading" @on-change="adjustGLB"></el-input-number>
      </div>
      <br>
       <div style="color:gold;text-align:center;"><Icon type="md-bulb" color="yellow" size="22"/>&nbsp;&nbsp;参数调整可使用键盘<Icon type="md-arrow-dropup" color="aqua" size="20"/><Icon type="md-arrow-dropdown" color="aqua" size="20"/>控制增减</div>
    </el-dialog>

  </div>
</template>
<script>
require('../../public/css/fonts.css');
require('../../public/css/common.css');
require('../../public/css/sand.css');
const Particle = require('../libs/DESource/Particle');
const POI = require('../libs/DESource/POI');
const EditEntity = require('../libs/DESource/EditEntity');

let MilitaryPlotting = null;

export default {
  name: 'sand',
  data() {
    return {
      /** *批量删除**  */
      //  弹窗状态
      batchDeletionFlag: false,
      //  标题
      batchTitle: '',

      /** *树结构**  */
      //  获取到的定位标志i
      selectedId: '',
      //  粒子特效render
      particleEffect: [
        {
          title: '粒子特效',
          expand: true,
          render: (h, { root, node, data }) => h('span', [
            h('span', [
              h('Icon', {
                props: {
                  type: 'ios-folder',
                },
                style: {
                  marginRight: '8px',
                },
              }),
              h('span', data.title),

              h('Icon', {
                props: {
                  type: 'ios-trash',
                },
                style: {
                  marginLeft: this.$store.state.common.ScreenWidth >= 1920 ? '92px' : '29px',
                  fontSize: '18px',
                  color: this.ParticleEffectToggleExpand == true ? '#ffffff' : '#e7c57a',
                },
                on: {
                  click: () => {
                    this.batchDeletionFlag = true;
                    this.batchTitle = '粒子特效';
                  },
                },
              }),
            ]),
          ]),
          children: [

          ],
        },
      ],
      //  POI标绘render
      POIMarks: [
        {
          title: 'POI标绘',
          expand: true,
          render: (h, { root, node, data }) => h('span', [
            h('span', [
              h('Icon', {
                props: {
                  type: 'ios-folder',
                },
                style: {
                  marginRight: '8px',
                },
              }),
              h('span', data.title),
              h('Icon', {
                props: {
                  type: 'ios-trash',
                },
                style: {
                  marginLeft: this.$store.state.common.ScreenWidth >= 1920 ? '93px' : '30px',
                  fontSize: '18px',
                  color: this.POIToggleExpand == true ? '#ffffff' : '#e7c57a',
                },
                on: {
                  click: () => {
                    this.batchDeletionFlag = true;
                    this.batchTitle = 'POI标绘';
                  },
                },
              }),
            ]),
          ]),
          children: [
          ],
        },
      ],
      //  矢量图形render
      VectorGP: [
        {
          title: '矢量图形',
          expand: true,
          render: (h, { root, node, data }) => h('span', [
            h('span', [
              h('Icon', {
                props: {
                  type: 'ios-folder',
                },
                style: {
                  marginRight: '8px',
                },
              }),
              h('span', data.title),
              h('Icon', {
                props: {
                  type: 'ios-trash',
                },
                style: {
                  marginLeft: this.$store.state.common.ScreenWidth >= 1920 ? '92px' : '29px',
                  fontSize: '18px',
                  color: this.VectorGPToggleExpand == true ? '#ffffff' : '#e7c57a',
                },
                on: {
                  click: () => {
                    this.batchDeletionFlag = true;
                    this.batchTitle = '矢量图形';
                  },
                },
              }),
            ]),
          ]),
          children: [

          ],
        },
      ],
      //  GLB模型render
      GLBModel: [
        {
          title: '单体模型',
          expand: true,
          render: (h, { root, node, data }) => h('span', [
            h('span', [
              h('Icon', {
                props: {
                  type: 'ios-folder',
                },
                style: {
                  marginRight: '8px',
                },
              }),
              h('span', data.title),
              h('Icon', {
                props: {
                  type: 'ios-trash',
                },
                style: {
                  marginLeft: this.$store.state.common.ScreenWidth >= 1920 ? '92px' : '29px',
                  fontSize: '18px',
                  color: this.GLBToggleExpand == true ? '#ffffff' : '#e7c57a',
                },
                on: {
                  click: () => {
                    this.batchDeletionFlag = true;
                    this.batchTitle = '单体模型';
                  },
                },
              }),
            ]),
          ]),
          children: [
          ],
        },
      ],

      /** *粒子特效**  */
      //  粒子示意图片列表
      particleList: [
        {
          id: 1,
          name: '火粒子',
          imgUrl: './images/sandIcon/fireIcon.png',
        },
        {
          id: 2,
          name: '水粒子',
          imgUrl: './images/sandIcon/water.png',
        },
      ],
      //  当前点击的粒子特效id
      particlelist: 0,
      //  粒子特效列表展开与收起
      ParticleEffectToggleExpand: true,
      //  修改粒子名称的模态框的显示与隐藏
      particleName: false,
      //  修改的粒子名称
      editParticleName: '',
      editParticleContent: null,

      /** *POI**  */
      //  poi图片列表
      poiList: [],
      //  当前点击选中的poi图标id
      poilist: 0,
      //  POI标绘列表展开与收起
      POIToggleExpand: true,
      //  POI标绘名称修改框状态
      POIModal: false,
      //  POI修改的名称
      POIName: '',
      //  修改POI的数据
      POIData: null,

      /** *矢量图形**  */
      //  矢量图形图片列表
      vectorList: [
        {
          id: 1,
          name: '画线',
          imgUrl: './images/sandIcon/line.png',
        },
        {
          id: 2,
          name: '画面',
          imgUrl: './images/sandIcon/area.png',
        },
      ],
      //  当前选中的矢量图形id
      vectorlist: 0,
      //  矢量图形树结构是否展开标志
      VectorGPToggleExpand: true,
      //  矢量图形名称修改框标志
      VectorModal: false,
      //  矢量图形修改的名称
      VectorName: '',

      /** *单体模型**  */
      //  单体模型图片列表
      glbList: [],
      //  当前选中的单体模型id
      glblist1: 0,
      //  树结构是否展开标志
      GLBToggleExpand: true,
      //  模型基础路径
      glbBaseURL: '',
      //  模型姿态调整对话框
      GLBModal: false,
      //  模型参数
      glbOptions: {
        lng: 0.0,
        lat: 0.0,
        height: 0.0,
        heading: 0.0,
        name: '',
        id: null,
        modelId: null,
      },
      glbOriginalOptions: {},

      /** *军事标绘**  */
      militaryList: [
        {
          divId: 'straightArrow', id: 1, name: '直线箭头', img: './images/sandIcon/attack1.png',
        },
        {
          divId: 'pincerArrow', id: 2, name: '钳击箭头', img: './images/sandIcon/attack3.png',
        },
        {
          divId: 'attackArrow', id: 3, name: '攻击箭头', img: './images/sandIcon/attack2.png',
        },
      ],
      //  当前选中的标绘图形id
      militarylist: 0,
    };
  },
  mounted() {
    this.$nextTick(() => {
      MilitaryPlotting = require('../libs/DESource/MilitaryPlotting');
      MilitaryPlotting.initArrow();
    });
  },
  watch: {
    '$store.state.common.particleArr': function (val) {
      if (this.$store.state.common.particleArr.length == 0) {
        return;
      }
      this.$store.state.common.particleArr.forEach((v, index) => {
        v.render = this.renderParticleEffect;
        this.particleEffect[0].children.push(this.$store.state.common.particleArr[index]);
      });
      this.$store.state.common.particleArr = [];
    },
    '$store.state.common.POIArr': function (val) {
      if (this.$store.state.common.POIArr.length == 0) {
        return;
      }
      this.$store.state.common.POIArr.forEach((v, index) => {
        v.render = this.renderPOI;
        this.POIMarks[0].children.push(this.$store.state.common.POIArr[index]);
      });
      this.$store.state.common.POIArr = [];
    },
    '$store.state.common.VectorArray': function (val) {
      if (this.$store.state.common.VectorArray.length == 0) {
        return;
      }
      this.$store.state.common.VectorArray.forEach((v, index) => {
        v.render = this.renderVectorGP;
        this.VectorGP[0].children.push(this.$store.state.common.VectorArray[index]);
      });
      this.$store.state.common.VectorArray = [];
    },
    '$store.state.common.GLBModelArr': function (val) {
      if (this.$store.state.common.GLBModelArr.length == 0) {
        return;
      }
      this.$store.state.common.GLBModelArr.forEach((v, index) => {
        v.render = this.renderGLBModel;
        this.GLBModel[0].children.push(this.$store.state.common.GLBModelArr[index]);
      });
      this.$store.state.common.GLBModelArr = [];
    },
  },
  methods: {
    //  批量删除
    batchDeletion() {
      switch (this.batchTitle) {
        case '粒子特效':
          this.batchDeletionParticle();
          break;
        case 'POI标绘':
          this.batchDeletionPOI();
          break;
        case '矢量图形':
          this.batchDeletionVector();
          break;
        case '单体模型':
          this.batchDeletionGlb();
          break;
        default:
          break;
      }
    },
    // 粒子批量删除
    batchDeletionParticle() {
      const idArr = [];
      // 获取需要删除的粒子的id数组
      if (this.$store.state.common.particleSelectedArr.length > 0) {
        if (this.$store.state.common.particleSelectedArr[0].nodeKey == 0) {
          this.$store.state.common.particleSelectedArr[0].children.forEach((v) => {
            idArr.push(v.id);
          });
        } else {
          this.$store.state.common.particleSelectedArr.forEach((v) => {
            idArr.push(v.id);
          });
        }

        this.$axios.delete(encodeURI(`/particleInstance/delete/${idArr.toString()}`), {}).then((data) => {
          if (data.data.code === 200) {
            //  删除成功后，删除在地图上对应的粒子实体及列表中粒子
            idArr.forEach((n) => {
              if (this.$store.state.common.particleSystemSets.hasOwnProperty(n)) {
                window.viewer.scene.primitives.remove(this.$store.state.common.particleSystemSets[n]);
              }
              this.particleEffect[0].children.forEach((v, index) => {
                if (this.particleEffect[0].children[index].id === n) {
                  this.particleEffect[0].children.splice(index, 1);
                }
              });
            });
          }
        })
          .catch((response) => {
            console.log(`InfoErr:${response}`);
          });
      } else {
        this.$Message.warning('请先勾选要删除的数据！');
      }
    },
    // POI批量删除
    batchDeletionPOI() {
      const idArr = [];
      // 获取需要删除的poi的id数组
      if (this.$store.state.common.poiMarkSelectedArr.length > 0) {
        if (this.$store.state.common.poiMarkSelectedArr[0].nodeKey == 0) {
          this.$store.state.common.poiMarkSelectedArr[0].children.forEach((v) => {
            idArr.push(v.id);
          });
        } else {
          this.$store.state.common.poiMarkSelectedArr.forEach((v) => {
            idArr.push(v.id);
          });
        }
        this.$axios.delete(encodeURI(`/poiInstance/delete/${idArr.toString()}`), {}).then((data) => {
          if (data.data.code === 200) {
            //  删除成功后，删除在地图上对应的poi实体及列表中poi
            idArr.forEach((n) => {
              if (window.viewer.entities.getById(`POI_${n}`)) {
                window.viewer.entities.remove(window.viewer.entities.getById(`POI_${n}`));
              }
              this.POIMarks[0].children.forEach((v, index) => {
                if (this.POIMarks[0].children[index].id === n) {
                  this.POIMarks[0].children.splice(index, 1);
                }
              });
            });
          }
        })
          .catch((response) => {
            console.log(`InfoErr:${response}`);
          });
      } else {
        this.$Message.warning('请先勾选要删除的POI数据！');
      }
    },
    // 矢量图形批量删除
    batchDeletionVector() {
      const idArr = [];
      // 获取需要删除的矢量图形的id数组
      if (this.$store.state.common.vectorSelectedArr.length > 0) {
        if (this.$store.state.common.vectorSelectedArr[0].nodeKey == 0) {
          this.$store.state.common.vectorSelectedArr[0].children.forEach((v) => {
            idArr.push(v.id);
          });
        } else {
          this.$store.state.common.vectorSelectedArr.forEach((v) => {
            idArr.push(v.id);
          });
        }
        this.$axios.delete(encodeURI(`/vectorInstance/delete/${idArr.toString()}`), {}).then((data) => {
          if (data.data.code === 200) {
            //  删除成功后，删除在地图上对应的矢量图形实体及列表中矢量图形
            idArr.forEach((n) => {
              if (window.viewer.entities.getById(n)) {
                window.viewer.entities.remove(window.viewer.entities.getById(n));
              }
              if (this.$store.state.common.VectorArraySet.hasOwnProperty(n)) {
                window.viewer.entities.remove(this.$store.state.common.VectorArraySet[n]);
              }
              this.VectorGP[0].children.forEach((v, index) => {
                if (this.VectorGP[0].children[index].id === n) {
                  this.VectorGP[0].children.splice(index, 1);
                }
              });
            });
          }
        })
          .catch((response) => {
            console.log(`InfoErr:${response}`);
          });
      } else {
        this.$Message.warning('请先勾选要删除的POI数据！');
      }
    },
    // glb模型批量删除
    batchDeletionGlb() {
      const idArr = [];
      // 获取需要删除的glb模型的id数组
      if (this.$store.state.common.glbSelectedArr.length > 0) {
        if (this.$store.state.common.glbSelectedArr[0].nodeKey == 0) {
          this.$store.state.common.glbSelectedArr[0].children.forEach((v) => {
            idArr.push(v.id);
          });
        } else {
          this.$store.state.common.glbSelectedArr.forEach((v) => {
            idArr.push(v.id);
          });
        }
        this.$axios.delete(encodeURI(`/glbInstance/delete/${idArr.toString()}`), {}).then((data) => {
          if (data.data.code === 200) {
            //  删除成功后，删除在地图上对应的glb模型实体及列表中glb
            idArr.forEach((n) => {
              if (window.viewer.entities.getById(`GLB_${n}`)) {
                window.viewer.entities.remove(window.viewer.entities.getById(`GLB_${n}`));
              }
              this.GLBModel[0].children.forEach((v, index) => {
                if (this.GLBModel[0].children[index].id === n) {
                  this.GLBModel[0].children.splice(index, 1);
                }
              });
            });
          }
        })
          .catch((response) => {
            console.log(`InfoErr:${response}`);
          });
      } else {
        this.$Message.warning('请先勾选要删除的POI数据！');
      }
    },
    // 从电子沙盘详情界面返回
    back() {
      this.$store.commit('common/changeSand', false);
    },
    // 粒子列表初始化
    ListInit() {
      // 接口:获取已添加到数据库的本部门的粒子列表
      // this.$axios.get(encodeURI('/particleInstance/list'), {
      //   params: {
      //     deptId: this.$Cookies.get('zdDeptId')
      //   }
      // }).then(data => {
      //   if (data.data.code === 200) {
      //     data.data.rows.forEach((v, index) => {
      //       v.render = this.renderParticleEffect;
      //     });
      //     this.particleEffect[0].children = data.data.rows;

      //   }
      // })
      //   .catch(response => {
      //     console.log('ListInitErr:' + response)
      //   })

      // 获取本地json数据,实际请调用上面接口,本方法只做演示用
      this.$axios.get('./json/ParticleList.json').then((res) => {
        if (res.status === 200) {
          res.data.rows.forEach((v, index) => {
            v.render = this.renderParticleEffect;
          });
          this.particleEffect[0].children = res.data.rows;
        }
      })
        .catch((response) => {
          console.log(`ListInitErr:${response}`);
        });
    },
    // POI列表初始化
    POIList() {
      // 接口:获取已添加到数据库的本部门的POI列表
      // this.$axios.get(encodeURI('/poiInstance/list'), {
      //   params: {
      //     deptId: this.$Cookies.get('zdDeptId')
      //   }
      // }).then(data => {
      //   if (data.data.code === 200) {
      //     data.data.rows.forEach((v, index) => {
      //       v.render = this.renderPOI;
      //     });
      //     this.POIMarks[0].children = data.data.rows;
      //   }
      // })
      //   .catch(response => {
      //     console.log('POIListErr:' + response)
      //   })

      // 获取本地json数据,实际请调用上面接口,本方法只做演示用
      this.$axios.get('./json/POIList.json').then((res) => {
        if (res.status === 200) {
          res.data.rows.forEach((v, index) => {
            v.render = this.renderPOI;
          });
          this.POIMarks[0].children = res.data.rows;
        }
      })
        .catch((response) => {
          console.log(`POIListErr:${response}`);
        });
    },
    // 矢量图形列表初始化
    VectorList() {
      // 接口:获取已添加到数据库的本部门的矢量图形列表
      // this.$axios.get(encodeURI('/vectorInstance/list'), {
      //   params: {
      //     deptId: this.$Cookies.get('zdDeptId')
      //   }
      // })
      //   .then(data => {
      //     if (data.data.code === 200) {
      //       data.data.rows.forEach((v, index) => {
      //         v.render = this.renderVectorGP;
      //       });
      //       this.VectorGP[0].children = data.data.rows;
      //     }
      //   })
      //   .catch(response => {
      //     console.log('VectorListErr:' + response)
      //   })

      //  获取本地json数据,实际请调用上面接口,本方法只做演示用
      this.$axios.get('./json/VectorList.json')
        .then((res) => {
          if (res.status === 200) {
            res.data.rows.forEach((v, index) => {
              v.render = this.renderVectorGP;
            });
            this.VectorGP[0].children = res.data.rows;
          }
        })
        .catch((response) => {
          console.log(`VectorListErr:${response}`);
        });
    },
    // 查询GLB实例列表
    GlbModelList() {
      // 接口:获取已添加到数据库的本部门的已上传的glb模型列表
      // this.$axios.get(encodeURI('/glbInstance/list'), {
      //   params: {
      //     deptId: this.$Cookies.get('zdDeptId')
      //   }
      // })
      //   .then(data => {
      //     if (data.data.code === 200) {
      //       data.data.rows.forEach((v, index) => {
      //         v.render = this.renderGLBModel;
      //         this.$set(v, 'title', v.name);
      //       });
      //       this.GLBModel[0].children = data.data.rows;
      //     }
      //   })
      //   .catch(response => {
      //     console.log('GlbModelListErr:' + response)
      //   })

      //  获取本地json数据,实际请调用上面接口,本方法只做演示用
      this.$axios.get('./json/GlbList.json').then((res) => {
        if (res.status === 200) {
          res.data.rows.forEach((v, index) => {
            v.render = this.renderGLBModel;
            this.$set(v, 'title', v.name);
          });
          this.GLBModel[0].children = res.data.rows;
        }
      })
        .catch((response) => {
          console.log(`GlbModelListErr:${response}`);
        });
    },

    // 获取POI图片列表
    getPOIList() {
      // 接口:获取已添加到数据库的本部门的已上传的poi图片列表
      // this.$axios.get(encodeURI('/poi/poiList?deptId=' + this.$Cookies.get('zdDeptId')), {
      // }).then(data => {
      //   if (data.status == 200) {
      //     this.poiList = data.data.rows;
      //   }
      // })
      //   .catch(response => {
      //     console.log('InfoErr:' + response);
      //   })

      //  获取本地json数据,实际请调用上面接口,本方法只做演示用
      this.$axios.get('./json/POIImageList.json')
        .then((res) => {
          if (res.status == 200) {
            this.poiList = res.data.rows;
          }
        })
        .catch((response) => {
          console.log(`InfoErr:${response}`);
        });
    },
    // 获取GLB模型图片列表
    getGLBList() {
      // 接口:获取已添加到数据库的本部门的已上传的glb模型图片列表
      // this.$axios.get(encodeURI('/emergency/model/gisList'), {
      //   params: {
      //     deptId: this.$Cookies.get('zdDeptId'),
      //     deFlag: 0
      //   }
      // }).then(data => {
      //   if (data.data.code == 200) {
      //     this.glbBaseURL = data.data.data.baseUrl;
      //     this.glbList=[];
      //     data.data.data.modelList.forEach(v => {
      //       if((v.savePath!==null)&&(v.type==4)){
      //         this.glbList.push(v);
      //       }
      //     });
      //   }
      // })
      //   .catch(response => {
      //     console.log('getGLBListErr:' + response);
      //   })

      //  获取本地json数据,实际请调用上面接口,本方法只做演示用
      this.$axios.get('./json/GlbImageList.json').then((res) => {
        if (res.status == 200) {
          this.glbBaseURL = res.data.data.baseUrl;
          this.glbList = [];
          res.data.data.modelList.forEach((v) => {
            if ((v.savePath !== null) && (v.type == 4)) {
              this.glbList.push(v);
            }
          });
        }
      })
        .catch((response) => {
          console.log(`getGLBListErr:${response}`);
        });
    },
    // 在地球上添加POI
    getPOI(item) {
      this.vectorlist = 0;
      this.particlelist = 0;
      this.glblist1 = 0;
      this.militarylist = 0;

      this.poilist = item.id;
      POI.AddPOI(window.viewer, item);
    },
    // 在地球上添加矢量图形
    getVector(item) {
      this.particlelist = 0;
      this.glblist1 = 0;
      this.militarylist = 0;
      this.poilist = 0;

      this.vectorlist = item.id;
      switch (item.id) {
        case 1:
          EditEntity.DrawLine(window.viewer);
          break;
        case 2:
          EditEntity.DrawPolygon(window.viewer);
          break;
      }
    },
    // 在地球上添加GLB模型
    getGlb(item) {
      this.vectorlist = 0;
      this.particlelist = 0;
      this.militarylist = 0;
      this.poilist = 0;

      this.glblist1 = item.id;
      this.$set(item, 'title', item.modelName);
      this.$set(item, 'glb', this.glbBaseURL + item.accessUrl);
      POI.AddGLBModel(window.viewer, item);
    },
    // 点击在地球上添加军事标绘
    getMilitary(id) {
      this.vectorlist = 0;
      this.particlelist = 0;
      this.glblist1 = 0;
      this.poilist = 0;

      this.militarylist = id;
      switch (id) {
        case 1:
          MilitaryPlotting.addArrow('straightArrow');
          break;
        case 2:
          MilitaryPlotting.addArrow('pincerArrow');
          break;
        case 3:
          MilitaryPlotting.addArrow('attackArrow');
          break;
        default:
          break;
      }
    },
    // 在地球上添加粒子
    getParticle(item) {
      this.vectorlist = 0;
      this.glblist1 = 0;
      this.militarylist = 0;
      this.poilist = 0;

      this.particlelist = item.id;
      switch (item.id) {
        case 1://  火
          var options = {
            emissionRate: 30,
            gravity: 3,
            minimumParticleLife: 1.1,
            maximumParticleLife: 2.1,
            minimumSpeed: 1,
            maximumSpeed: 3,
            startScale: 3,
            endScale: 4,
            particleSize: 20,
            transX: 2.5,
            transY: 4.0,
            transZ: 1.0,
            heading: -50,
            pitch: 0.0,
            roll: 0.0,
            fly: true,
            spin: true,
            show: true,
          };
          Particle.addFireParticleSystem(window.viewer, options);
          break;
        case 2://  水
          var options = {
            emissionRate: 57,
            gravity: -2.5,
            minimumParticleLife: 4.1,
            maximumParticleLife: 4.2,
            minimumSpeed: 10.0,
            maximumSpeed: 11.0,
            startScale: 5,
            endScale: 6,
            particleSize: 3,
            transX: 0.5,
            transY: 0.5,
            transZ: 3,
            heading: 200,
            pitch: 0.0,
            roll: 40.0,
            fly: true,
            spin: true,
            show: true,
          };
          Particle.addWaterParticleSystem(window.viewer, options1);
          break;
        default:
          break;
      }
    },

    // 粒子特效--判断树节点是否被选中（点击复选框时触发）
    getParticleShow(selectedArr, selectedItem) {
      this.$store.state.common.particleSelectedArr = selectedArr;
      if (selectedItem.hasOwnProperty('children')) {
        if (selectedItem.checked == true) {
          selectedItem.children.forEach((v, index) => {
            if (this.$store.state.common.particleSystemSets.hasOwnProperty(v.id)) {
              this.$store.state.common.particleSystemSets[v.id].show = true;
            } else if (v.type == 2) {
              const options = {
                emissionRate: 30,
                gravity: 3,
                minimumParticleLife: 1.1,
                maximumParticleLife: 2.1,
                minimumSpeed: 1,
                maximumSpeed: 3,
                startScale: 3,
                endScale: 4,
                particleSize: 20,
                transX: 2.5,
                transY: 4.0,
                transZ: 1.0,
                heading: -50,
                pitch: 0.0,
                roll: 0.0,
                fly: true,
                spin: true,
                show: true,
              };
              this.$store.state.common.particleSystemSets[v.id] = Particle.addFire(window.viewer, v.lon, v.lat, v.height, options);
            } else {
              const options = {
                emissionRate: 57,
                gravity: -2.5,
                minimumParticleLife: 4.1,
                maximumParticleLife: 4.2,
                minimumSpeed: 10.0,
                maximumSpeed: 11.0,
                startScale: 5,
                endScale: 6,
                particleSize: 3,
                transX: 0.5,
                transY: 0.5,
                transZ: 3,
                heading: 200,
                pitch: 0.0,
                roll: 40.0,
                fly: true,
                spin: true,
                show: true,
              };
              this.$store.state.common.particleSystemSets[v.id] = Particle.addWater(window.viewer, v.lon, v.lat, v.height, options);
            }
          });
        } else {
          selectedItem.children.forEach((v, index) => {
            if (this.$store.state.common.particleSystemSets.hasOwnProperty(v.id)) {
              this.$store.state.common.particleSystemSets[v.id].show = false;
            }
          });
        }
      } else if (selectedItem.checked == true) {
        if (this.$store.state.common.particleSystemSets.hasOwnProperty(selectedItem.id)) {
          this.$store.state.common.particleSystemSets[selectedItem.id].show = true;
        } else if (selectedItem.type == 2) {
          var options = {
            emissionRate: 30,
            gravity: 3,
            minimumParticleLife: 1.1,
            maximumParticleLife: 2.1,
            minimumSpeed: 1,
            maximumSpeed: 3,
            startScale: 3,
            endScale: 4,
            particleSize: 20,
            transX: 2.5,
            transY: 4.0,
            transZ: 1.0,
            heading: -50,
            pitch: 0.0,
            roll: 0.0,
            fly: true,
            spin: true,
            show: true,
          };
          this.$store.state.common.particleSystemSets[selectedItem.id] = Particle.addFire(window.viewer, selectedItem.lon, selectedItem.lat, selectedItem.altitude, options);
        } else {
          var options = {
            emissionRate: 57,
            gravity: -2.5,
            minimumParticleLife: 4.1,
            maximumParticleLife: 4.2,
            minimumSpeed: 10.0,
            maximumSpeed: 11.0,
            startScale: 5,
            endScale: 6,
            particleSize: 3,
            transX: 0.5,
            transY: 0.5,
            transZ: 3,
            heading: 200,
            pitch: 0.0,
            roll: 40.0,
            fly: true,
            spin: true,
            show: true,
          };
          this.$store.state.common.particleSystemSets[selectedItem.id] = Particle.addWater(window.viewer, selectedItem.lon, selectedItem.lat, selectedItem.altitude, options);
        }
      } else if (this.$store.state.common.particleSystemSets.hasOwnProperty(selectedItem.id)) {
        this.$store.state.common.particleSystemSets[selectedItem.id].show = false;
      }
    },
    // 粒子特效（自定义当前节点渲染内容，见示例）
    renderParticleEffect(h, { root, node, data }) {
      let src = '';
      if (!data.iconColor) {
        this.$set(data, 'iconColor', 'grey');
      }
      if (this.selectedId != null && this.selectedId != data.id) {
        data.iconColor = 'grey';
      }
      if (data.type === 2) {
        src = './images/sandIcon/fireIcon.png';
      } else if (data.type === 1) {
        src = './images/sandIcon/water.png';
      }
      return h('span', [
        h('span', {
          style: {
            display: 'inline-block',
            width: this.$store.state.common.ScreenWidth == 1920 ? '165px' : '125px',
          },
        }, [h('Img', {
          style: {
            marginRight: '8px',

            width: '13px',
            height: '13px',
          },
          attrs: {
            src,
          },
        }),
        h('span', data.name),
        ]),
        h('Icon', {
          props: {
            type: 'md-pin',
          },
          style: {
            height: '35px',
            lineHeight: '35px',
            marginTop: '5px',
            color: data.iconColor,
            marginRight: '5px',
            fontSize: '16px',
          },
          on: {
            click: () => {
              // 点击定位
              if (data.iconColor == 'grey') {
                data.iconColor = '#00FA9A';
              } else {
                data.iconColor = 'grey';
              }
              const options = {
                lng: data.lon,
                lat: data.lat,
                height: data.altitude + 35,
                heading: 359.7,
                pitch: -89.7,
                roll: 0.0,
              };
              POI.flyTo(window.viewer, options);
              this.selectedId = data.id;
            },
          },
        }),
        h('Icon', {
          props: {
            type: 'ios-create-outline',
          },
          style: {
            height: '35px',
            lineHeight: '35px',
            color: '#00FA9A',
            marginRight: '5px',
            fontSize: '16px',
          },
          on: {
            click: () => {
              this.editParticle(data);
            },
          },
        }),
      ]);
    },
    // 粒子特效--展开关闭的样式类的添加（展开和收起子列表时触发）
    getParticleEffectToggleExpand() {
      this.ParticleEffectToggleExpand = !this.ParticleEffectToggleExpand;
    },
    // 编辑粒子名称（modal窗弹出）
    editParticle(item) {
      this.particleName = true;
      this.editParticleContent = item;
      this.editParticleName = item.name;
    },
    // 确定更改粒子的名称
    ok() {
      const options = {
        id: this.editParticleContent.id,
        name: this.editParticleName,
        checkedNodes: 1,
        uid: this.editParticleContent.uid,
      };
      this.$axios.put(encodeURI('/particleInstance/edit'), options).then((res) => {
        this.particleEffect[0].children.forEach((v, index) => {
          if (this.particleEffect[0].children[index].id === this.editParticleContent.id) {
            this.particleEffect[0].children[index].name = this.editParticleName;
          }
        });
        if (res.data.code === 200) {
          this.$Message.success({
            background: true,
            content: '编辑成功',
          });
        }
      })
        .catch((response) => {
          console.log(`InfoErr:${response}`);
        });
    },

    // POI标绘树结构render
    renderPOI(h, { root, node, data }) {
      if (!data.iconColor) {
        this.$set(data, 'iconColor', 'grey');
      }
      if (this.selectedId != null && this.selectedId != data.id) {
        data.iconColor = 'grey';
      }
      return h('span', [
        h('span', {
          style: {
            display: 'inline-block',
            width: this.$store.state.common.ScreenWidth == 1920 ? '165px' : '125px',
          },
        }, [h('Img', {
          style: {
            marginRight: '8px',
            width: '13px',
            height: '13px',

          },
          attrs: {
            src: data.poiList.accessUrl,
          },
        }),
        h('span', data.name),
        ]),
        h('Icon', {
          props: {
            type: 'md-pin',
          },
          style: {
            height: '35px',
            lineHeight: '35px',
            marginTop: '5px',
            color: data.iconColor,
            marginRight: '5px',
            fontSize: '16px',
          },
          on: {
            click: () => {
              if (data.iconColor == 'grey') {
                data.iconColor = '#00FA9A';
              } else {
                data.iconColor = 'grey';
              }
              const options = {
                lng: data.lon,
                lat: data.lat,
                height: data.altitude + 35,
                heading: 359.7,
                pitch: -89.7,
                roll: 0.0,
              };
              POI.flyTo(window.viewer, options);
              this.selectedId = data.id;
            },
          },
        }),
        h('Icon', {
          props: {
            type: 'ios-create-outline',
          },
          style: {
            lineHeight: '35px',
            color: '#00FA9A',
            fontSize: '16px',
          },
          on: {
            click: () => {
              this.POIEdit(data);
            },
          },
        }),
      ]);
    },
    // POI标绘的显示与隐藏
    POIShow(selectedArr, selectedItem) {
      this.$store.state.common.poiMarkSelectedArr = selectedArr;
      if (selectedItem.hasOwnProperty('children')) {
        if (selectedItem.checked == true) {
          selectedItem.children.forEach((v, index) => {
            if (window.viewer.entities.getById(`POI_${v.id}`)) {
              window.viewer.entities.getById(`POI_${v.id}`).show = true;
            } else {
              const options = {
                name: v.name,
                checked: true,
                lng: v.lon,
                lat: v.lat,
                altitude: v.altitude,
                img: v.poiList.accessUrl,
                id: v.id,
              };
              POI.addBillboardsList(window.viewer, options);
            }
          });
        } else {
          selectedItem.children.forEach((v, index) => {
            if (window.viewer.entities.getById(`POI_${v.id}`)) {
              window.viewer.entities.getById(`POI_${v.id}`).show = false;
            }
          });
        }
      } else if (selectedItem.checked == true) {
        if (window.viewer.entities.getById(`POI_${selectedItem.id}`)) {
          window.viewer.entities.getById(`POI_${selectedItem.id}`).show = true;
        } else {
          const options = {
            name: selectedItem.name,
            checked: true,
            lng: selectedItem.lon,
            lat: selectedItem.lat,
            altitude: selectedItem.altitude,
            img: selectedItem.poiList.accessUrl,
            id: selectedItem.id,
          };
          POI.addBillboardsList(window.viewer, options);
        }
      } else if (window.viewer.entities.getById(`POI_${selectedItem.id}`)) {
        window.viewer.entities.getById(`POI_${selectedItem.id}`).show = false;
      }
    },
    // 编辑POI标绘
    POIEdit(item) {
      this.POIModal = true;
      this.POIData = item;
      this.POIName = item.name;
    },
    // 确定编辑POI标绘
    POIok() {
      const params = {
        checkedNodes: true,
        accessUrl: this.POIData.poiList.accessUrl,
        altitude: this.POIData.altitude,
        checkednodes: this.POIData.checkednodes,
        deptId: this.$Cookies.get('deptId'),
        uid: this.$Cookies.get('uid'),
        id: this.POIData.id,
        name: this.POIName,
        imgId: this.POIData.imgId,
        lon: this.POIData.lon,
        lat: this.POIData.lat,
        imgName: this.POIData.poiList.imgName,
      };
      this.$axios.put(encodeURI('/poiInstance/edit'), params).then((data) => {
        if (data.data.code === 200) {
          this.POIMarks[0].children.forEach((v, index) => {
            if (this.POIMarks[0].children[index].id === this.POIData.id) {
              this.POIMarks[0].children[index].name = this.POIName;
            }
          });
          window.viewer.entities.getById(`POI_${this.POIData.id}`)._label._text._value = this.POIName;
          this.$Message.success({
            background: true,
            content: '编辑成功',
          });
        }
      })
        .catch((response) => {
          console.log(`InfoErr:${response}`);
        });
    },
    // 取消编辑POI标绘
    POIcancel() {
      this.$Message.info('取消编辑');
    },
    // POI标绘--展开关闭的样式类的添加（展开和收起子列表时触发）
    getPOIToggleExpand() {
      this.POIToggleExpand = !this.POIToggleExpand;
    },

    // 矢量图形render
    renderVectorGP(h, { root, node, data }) {
      let src = '';
      if (!data.iconColor) {
        this.$set(data, 'iconColor', 'grey');
      }
      if (this.selectedId != null && this.selectedId != data.id) {
        data.iconColor = 'grey';
      }
      if (data.type === 1) {
        src = './images/sandIcon/line.png';
      } else if (data.type === 2) {
        src = './images/sandIcon/area.png';
      }
      return h('span', [
        h('span', {
          style: {
            display: 'inline-block',
            width: this.$store.state.common.ScreenWidth == 1920 ? '165px' : '125px',
          },
        }, [h('Img', {
          style: {
            marginRight: '8px',
            width: '13px',
            height: '13px',

          },
          attrs: {
            src,
          },
        }),
        h('span', data.name),
        ]),
        h('Icon', {
          props: {
            type: 'md-pin',
          },
          style: {
            height: '35px',
            lineHeight: '35px',
            marginTop: '5px',
            color: data.iconColor,
            marginRight: '5px',
            fontSize: '16px',
          },
          on: {
            click: () => {
              if (data.iconColor == 'grey') {
                data.iconColor = '#00FA9A';
              } else {
                data.iconColor = 'grey';
              }
              if (data.positionList == null) {
                this.$Message.warning('请先选中该矢量图形！');
              } else {
                if (window.viewer.entities.getById(data.id)) {
                  window.viewer.flyTo(window.viewer.entities.getById(data.id));
                }
                if (this.$store.state.common.VectorArraySet.hasOwnProperty(data.id)) {
                  window.viewer.flyTo(this.$store.state.common.VectorArraySet[data.id]);
                }
              }
              this.selectedId = data.id;
            },
          },
        }),
        h('Icon', {
          props: {
            type: 'ios-create-outline',
          },
          style: {
            lineHeight: '35px',
            color: '#00FA9A',
            fontSize: '16px',
          },
          on: {
            click: () => {
              this.VectorEdit(data);
            },
          },
        }),
      ]);
    },
    // 矢量图形--展开关闭的样式类的添加
    getVectorGPToggleExpand() {
      this.VectorGPToggleExpand = !this.VectorGPToggleExpand;
    },
    // 矢量图形的显示与隐藏
    VectorShow(selectedArr, selectedItem) {
      this.$store.state.common.vectorSelectedArr = selectedArr;
      this.$axios.get(encodeURI('/vectorInstance/') + selectedItem.id, {})//  矢量图形详情
        .then((res) => {
          if (res.data.code == 200) {
            this.$set(selectedItem, 'positionArr', res.data.data.positionList);
            selectedItem.positionList = [];
            res.data.data.positionList.forEach((k) => {
              selectedItem.positionList.push(k.longitude);
              selectedItem.positionList.push(k.latitude);
            });

            if (selectedItem.hasOwnProperty('children')) {
              if (selectedItem.checked == true) {
                selectedItem.children.forEach((v, index) => {
                  if (window.viewer.entities.getById(v.id)) {
                    window.viewer.entities.getById(v.id).show = true;
                  } else if (this.$store.state.common.VectorArraySet.hasOwnProperty(v.id)) {
                    this.$store.state.common.VectorArraySet[v.id].show = true;
                  } else {
                    const options = {
                      name: v.name,
                      checked: true,
                      hierarchy: v.positionList,
                      type: v.type,
                      checkedNodes: v.checkedNodes,
                      uid: v.uid,
                      id: v.id,
                    };
                    EditEntity.addVectorList(window.viewer, options);
                  }
                });
              } else {
                selectedItem.children.forEach((v, index) => {
                  if (window.viewer.entities.getById(v.id)) {
                    window.viewer.entities.getById(v.id).show = false;
                  } else if (this.$store.state.common.VectorArraySet.hasOwnProperty(v.id)) {
                    this.$store.state.common.VectorArraySet[v.id].show = false;
                  }
                });
              }
            } else if (selectedItem.checked == true) {
              if (window.viewer.entities.getById(selectedItem.id)) {
                window.viewer.entities.getById(selectedItem.id).show = true;
              } else if (this.$store.state.common.VectorArraySet.hasOwnProperty(selectedItem.id)) {
                this.$store.state.common.VectorArraySet[selectedItem.id].show = true;
              } else {
                const options = {
                  name: selectedItem.name,
                  checked: true,
                  hierarchy: selectedItem.positionList,
                  type: selectedItem.type,
                  checkedNodes: selectedItem.checkedNodes,
                  uid: selectedItem.uid,
                  id: selectedItem.id,
                };
                EditEntity.addVectorList(window.viewer, options);
              }
            } else if (window.viewer.entities.getById(selectedItem.id)) {
              window.viewer.entities.getById(selectedItem.id).show = false;
            } else if (this.$store.state.common.VectorArraySet.hasOwnProperty(selectedItem.id)) {
              this.$store.state.common.VectorArraySet[selectedItem.id].show = false;
            }
          }
        });
    },
    // 矢量图形编辑
    VectorEdit(item) {
      this.VectorModal = true;
      this.VectorData = item;
      this.VectorName = item.name;
    },
    // 确定编辑矢量图形标绘
    Vectorok() {
      const options = {
        checkedNodes: true,
        id: this.VectorData.id,
        checkednodes: 1, //  0=未选中 1=选中
        deptId: this.$store.state.common.deptId, //  部门id
        name: this.VectorName,
        type: this.VectorData.type, //  矢量类型 1=线 2=面
        uid: this.$store.state.common.uid, //  用户ID
      };
      this.$axios.put(encodeURI('/vectorInstance/edit/'), options).then((data) => {
        if (data.data.code == 200) {
          this.VectorGP[0].children.forEach((v, index) => {
            if (this.VectorGP[0].children[index].id === this.VectorData.id) {
              this.VectorGP[0].children[index].name = this.VectorName;
            }
          });
          this.$Message.success({
            background: true,
            content: '编辑成功',
          });
        }
      })
        .catch((response) => {
          console.log(`VectorokErr:${response}`);
        });
    },
    // 取消编辑矢量图形标绘
    Vectorcancel() {
      this.$Message.info('取消编辑');
    },

    // 单体模型--展开关闭的样式类的添加
    getGLBToggleExpand() {
      this.GLBToggleExpand = !this.GLBToggleExpand;
    },
    // 调整模型姿态位置等参数
    adjustGLB() {
      const position = Cesium.Cartesian3.fromDegrees(parseFloat(this.glbOptions.lng) || this.glbOriginalOptions.lon, parseFloat(this.glbOptions.lat) || this.glbOriginalOptions.lat, parseFloat(this.glbOptions.height) || 0.0);
      const heading = Cesium.Math.toRadians(parseFloat(this.glbOptions.heading));
      const hpr = new Cesium.HeadingPitchRoll(heading || 0.0, 0.0, 0.0);
      const orientation = Cesium.Transforms.headingPitchRollQuaternion(position, hpr);
      const a = window.viewer.entities.getById(`GLB_${this.glbOptions.id}`);
      if (a && a._show == true) {
        a._position._value = position;
        a._orientation._value = orientation;
      }
    },
    // GLB单体模型的显示与隐藏
    GLBShow(selectedArr, selectedItem) {
      this.$store.state.common.glbSelectedArr = selectedArr;
      if (selectedItem.hasOwnProperty('children')) {
        if (selectedItem.checked == true) {
          selectedItem.children.forEach((v, index) => {
            if (window.viewer.entities.getById(`GLB_${v.id}`)) {
              window.viewer.entities.getById(`GLB_${v.id}`).show = true;
            } else {
              const options = {
                title: v.title,
                name: v.name,
                lon: v.lon,
                lat: v.lat,
                height: v.altitude,
                heading: v.heading,
                pitch: v.pitch,
                roll: v.roll,
                glb: this.glbBaseURL + v.model.accessUrl,
                id: v.id,
              };
              POI.addGLBSingleModelList(window.viewer, options);
            }
          });
        } else {
          selectedItem.children.forEach((v, index) => {
            if (window.viewer.entities.getById(`GLB_${v.id}`)) {
              window.viewer.entities.getById(`GLB_${v.id}`).show = false;
            }
          });
        }
      } else if (selectedItem.checked == true) {
        if (window.viewer.entities.getById(`GLB_${selectedItem.id}`)) {
          window.viewer.entities.getById(`GLB_${selectedItem.id}`).show = true;
        } else {
          const options = {
            title: selectedItem.title,
            name: selectedItem.name,
            lon: selectedItem.lon,
            lat: selectedItem.lat,
            height: selectedItem.altitude,
            heading: selectedItem.heading,
            pitch: selectedItem.pitch,
            roll: selectedItem.roll,
            glb: this.glbBaseURL + selectedItem.model.accessUrl,
            id: selectedItem.id,
          };
          POI.addGLBSingleModelList(window.viewer, options);
        }
      } else if (window.viewer.entities.getById(`GLB_${selectedItem.id}`)) {
        window.viewer.entities.getById(`GLB_${selectedItem.id}`).show = false;
      }
    },

    // GLB模型render
    renderGLBModel(h, { root, node, data }) {
      if (!data.iconColor) {
        this.$set(data, 'iconColor', 'grey');
      }
      if (this.selectedId != null && this.selectedId != data.id) {
        data.iconColor = 'grey';
      }
      return h('span', [
        h('span', {
          style: {
            display: 'inline-block',
            width: this.$store.state.common.ScreenWidth == 1920 ? '165px' : '125px',
          },
        }, [h('Icon', {
          props: {
            type: 'md-cube',
          },
          style: {
            marginRight: '8px',
          },
        }),
        h('span', data.title),
        ]),
        h('Icon', {
          props: {
            type: 'md-pin',
          },
          style: {
            height: '35px',
            lineHeight: '35px',
            marginTop: '5px',
            color: data.iconColor,
            marginRight: '5px',
            fontSize: '16px',
          },
          on: {
            click: () => {
              if (data.iconColor == 'grey') {
                data.iconColor = '#00FA9A';
              } else {
                data.iconColor = 'grey';
              }
              const options = {
                lng: data.lon,
                lat: data.lat,
                height: data.altitude + 35,
                heading: 359.7,
                pitch: -89.7,
                roll: 0.0,
              };
              POI.flyTo(window.viewer, options);
              this.selectedId = data.id;
            },
          },
        }),
        h('Icon', {
          props: {
            type: 'ios-create-outline',
          },
          style: {
            lineHeight: '35px',
            color: '#00FA9A',
            fontSize: '16px',
          },
          on: {
            click: () => {
              this.GLBModelTools(data);
            },
          },
        }),
      ]);
    },
    // glb模型参数修改确定
    GLBModalok() {
      const params = {
        name: this.glbOptions.name,
        lon: this.glbOptions.lng,
        lat: this.glbOptions.lat,
        altitude: this.glbOptions.height,
        checkednodes: 1, //  0=未选中 1=选中
        deptId: this.$store.state.common.deptId,
        uid: this.$store.state.common.uid,
        heading: this.glbOptions.heading,
        pitch: 0,
        roll: 0.0,
        id: this.glbOptions.id,
        modelId: this.glbOptions.modelId,
      };
      this.$axios.put(encodeURI('/glbInstance/edit'), params, {
      }).then((data) => {
        if (data.status === 200) {
          this.GLBModel[0].children.forEach((v, index) => {
            if (this.GLBModel[0].children[index].id === this.glbOptions.id) {
              this.GLBModel[0].children[index].title = this.glbOptions.name;
              this.GLBModel[0].children[index].name = this.glbOptions.name;
              this.GLBModel[0].children[index].lon = this.glbOptions.lng;
              this.GLBModel[0].children[index].lat = this.glbOptions.lat;
              this.GLBModel[0].children[index].altitude = this.glbOptions.height;
              this.GLBModel[0].children[index].heading = this.glbOptions.heading;
            }
          });
          window.viewer.entities.getById(`GLB_${this.glbOptions.id}`)._label._text._value = this.glbOptions.name;
          this.$Message.success({
            background: true,
            content: '编辑成功',
          });
        }
      })
        .catch((response) => {
          console.log(`InfoErr:${response}`);
        });
    },
    // glb模型参数修改取消
    GLBModalcancel() {
      const position = Cesium.Cartesian3.fromDegrees(parseFloat(this.glbOriginalOptions.lon), parseFloat(this.glbOriginalOptions.lat), parseFloat(this.glbOriginalOptions.altitude));
      const heading = Cesium.Math.toRadians(parseFloat(this.glbOriginalOptions.heading));
      const hpr = new Cesium.HeadingPitchRoll(heading || 0.0, 0.0, 0.0);
      const orientation = Cesium.Transforms.headingPitchRollQuaternion(position, hpr);
      const a = window.viewer.entities.getById(`GLB_${this.glbOptions.id}`);
      if (a) {
        a._position._value = position;
        a._orientation._value = orientation;
        a._label._text._value = this.glbOriginalOptions.name;
      }
    },
    // glb模型内容的初始化
    GLBModelTools(data) {
      this.GLBModal = true;
      this.glbOptions = {
        lng: data.lon,
        lat: data.lat,
        height: data.height,
        heading: data.heading,
        name: data.name,
        id: data.id,
        modelId: data.modelId,
      };
      this.glbOriginalOptions = data;
    },
    // GLB模型--展开关闭的样式类的添加
    getGLBToggleExpand() {
      this.GLBToggleExpand = !this.GLBToggleExpand;
    },
    // 时间
    timestamp() {
      let time = new Date();
      let dd = time.getDate();
      let mm = time.getMonth() + 1; //  一月是0，一定要注意
      const yyyy = time.getFullYear();
      const hour = time.getHours();
      let minutes = time.getMinutes();
      let seconds = time.getSeconds();
      if (dd < 10) { dd = `0${dd}`; }
      if (mm < 10) { mm = `0${mm}`; }
      if (minutes < 10) { minutes = `0${minutes}`; }
      if (seconds < 10) { seconds = `0${seconds}`; }
      time = yyyy + mm + dd + hour + minutes + seconds;
      return time;
    },
  },
  created() {

  },
  components: {
  },
};
</script>
<style>
.sandModal .ivu-modal-header {
  background-color: #397ee3;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  border-bottom: 1px solid rgba(43, 63, 119, 0.9);
}
.sandModal .ivu-modal-header p,
.ivu-modal-header-inner {
  color: #ffffff;
}
.sandModal .ivu-modal-close .ivu-icon-ios-close {
  color: #ffffff;
}
.sandModal .ivu-modal-footer {
  border-top: 1px solid rgba(43, 63, 119, 0.9);
  background-image: linear-gradient(rgba(25, 42, 96), rgba(26, 39, 79));
}
.sandModal .ivu-btn-text {
  color: #ffffff;
}
.sandModal .ivu-modal-body {
  background-color: rgba(28, 46, 101);
}
.sandModal .ivu-input {
  color: #ffffff;
  background-image: linear-gradient(rgba(28, 46, 101), rgba(25, 42, 96));
  border: 1px solid rgba(43, 63, 119, 0.9);
}
.sandModal .ivu-btn-text:hover{
  background-color:#57a3f3;
}
.batchModal{
  position: fixed;
  left:25%;
  top:10%;
  width:350px;
  height:130px;
  background-image: linear-gradient(rgba(28, 46, 101), rgba(25, 42, 96));
  border: 1px solid rgba(43, 63, 119, 0.9);
  border-radius:5px;
}
.glbAdjust{
  color:#ffffff;
  padding:5px 0px;
}
.glbAdjustInput .ivu-input-number-input{
  background-color: rgba(43, 63, 119, 1.0);
  color:#ffff;
}
.ivu-input-number{
  border: 1px solid rgba(43, 63, 119, 0.9);
  background-color:  rgba(25, 42, 96);

}

</style>
