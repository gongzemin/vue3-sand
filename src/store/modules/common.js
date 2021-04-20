const state = {
  sandMenuFlag: false,
  handler: null,
  militaryHandler: null,
  sandBaseUrl: '',
  POIArr: [],
  poiMarkSelectedArr: [],
  deptId: null,
  uid: '',
  GLBModelArr: [],
  glbSelectedArr: [],
  ScreenWidth: 1920,
  particleSelectedArr: [],
  particleArr: [],
  particleSystemSets: {}, // 粒子特效的实体集
  VectorArraySet: {}, // 矢量图形的实体集
  vectorSelectedArr: [],

};

// getters
const getters = {

};

// actions
const actions = {

};

// mutations
const mutations = {
  changeSand(state, payload) {
    state.sandMenuFlag = payload;
  },
  changeHandler(state, payload) {
    state.handler = payload;
  },
  getDeptId(state, payload) {
    state.deptId = payload;
  },
  getUid(state, payload) {
    state.uid = payload;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
