(function () {
  define('newVueInstance', ['axios', 'cesium'], (axios, Cesium) => {
    const newVueInstance = {
      VERSION: '1.0',
    };
    console.log('*******89999', axios);
    const vm = require('../../main.js');
    debugger;
    // const Vue = require('vue').default; // undefined
    const Vue = require('vue');
    const axios_instance = axios.create({

    });
    const app = Vue.createApp();
    console.log('********', require('vue'));
    console.log('Vue', Vue);
    app.config.globalProperties.$axios = axios;
    app.config.globalProperties.Cesium = Cesium;

    // return require('vue');
    return app;

    // return newVueInstance;
  });
}());
