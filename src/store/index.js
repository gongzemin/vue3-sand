import { createStore } from 'vuex';

const path = require('path');

const files = require.context('@/store/modules', false, /\.js$/);
const moduleFile = {};
files.keys().forEach((key) => {
  const name = path.basename(key, '.js');
  moduleFile[name] = files(key).default || files(key);
});

export default createStore({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    ...moduleFile,
  },
});
