const path = require('path');
// eslint-disable-next-line import/no-extraneous-dependencies
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const cesiumBuild = './node_modules/cesium/Build/Cesium';
module.exports = {
  lintOnSave: process.env.NODE_ENV !== 'production',
  publicPath: process.env.NODE_ENV === 'production' ? '/' : '/',
  productionSourceMap: false,
  devServer: {
    // public: '192.1.2.153',
    // hot: true, // 开启热更新 自动刷新页面。
    port: '8080',
    hot: true,
    proxy: {
      // api是访问内部服务器的请求地址，因为跨域，所以最后要重写路径
      // 把api换成空字符串
      '/api': {
        // 代理api
        target: 'http://172.17.30.95:8080/api/forest/', // 测试服务器api地址
        // target: 'http://172.17.30.85:8080/api/forest/', // 服务器api地址
        // target: 'http://172.17.7.104/forest', // 开发http://172.17.7.104/forest
        // target: 'http://172.17.7.115:8090/forest/', // 许稳
        changeOrigin: true, // 是否跨域
        ws: true, // proxy websockets
        pathRewrite: {
          // 重写路径
          '^/api': '',
        },
      },
      // 深圳市应急管理局 数据共享服务系统
      // http://10.253.202.29/api/exchange/QueryYjryYljg 应急人员_医疗机构
      // http://10.253.202.29/api/exchange/QueryGldxYjbncs 应急避难场所
      '/exchange': {
        target: 'http://10.253.202.29/api/exchange/', // 开发http://172.17.7.104/forest
        changeOrigin: true, // 是否跨域
        ws: true, // proxy websockets
        pathRewrite: {
          // 重写路径
          '^/exchange': '',
        },
      },
      '/map': {
        target: 'https://map.szsti.org:8090/iserver/services/', // 开发http://172.17.7.104/forest 超图
        changeOrigin: true, // 是否跨域
        ws: true, // proxy websockets
        pathRewrite: {
          // 重写路径
          '^/map': '',
        },
      },
      '/video': {
        target: 'https://58.251.3.22:10443/artemis/', // 开发http://172.17.7.104/forest 超图
        changeOrigin: true, // 是否跨域
        ws: true, // proxy websockets
        pathRewrite: {
          // 重写路径
          '^/video': '',
        },
      },
      // 生产环境代理
      // '/prod': {
      //   // 代理api
      //   target: 'http://172.17.30.85:8090/forest/', // 服务器api地址
      //   changeOrigin: true, // 是否跨域
      //   ws: true, // proxy websockets
      //   pathRewrite: {
      //     // 重写路径
      //     '^/prod': '',
      //   },
      // },
      // 目前没用到
      '/server': {
        // 代理api
        target: 'https://szjcyjct.szsti.org:9083/iserver', // 服务器api地址
        changeOrigin: true, // 是否跨域
        ws: true, // proxy websockets
        pathRewrite: {
          // 重写路径
          '^/server': '',
        },
      },
    },
  },
  css: {
    loaderOptions: {
      sass: {
        prependData: `
          @import '@/assets/styles/_variables.scss';
          @import '@/assets/styles/common.scss';
         `,
      },
    },
  },
  chainWebpack: (config) => {
    // config.resolve.extensions
    //   .add('.js')
    //   .add('.vue')
    //   .end()
    //   .alias.set('cesium', path.resolve(__dirname, cesiumBuild))
    //   .end();

    config
      .plugin('html')
      .tap((args) => {
        // eslint-disable-next-line no-param-reassign
        args[0].title = '深圳市智慧森防监测预警系统';
        return args;
      });

    config
      .plugin('copy')
      .use(CopyWebpackPlugin, [
        {
          patterns: [
            {
              from: path.join(cesiumBuild, 'Workers'),
              to: 'Workers',
            },
            { from: path.join(cesiumBuild, 'Assets'), to: 'Assets' },
            {
              from: path.join(cesiumBuild, 'Widgets'),
              to: 'Widgets',
            },
            {
              from: path.join(cesiumBuild, 'ThirdParty'),
              to: 'ThirdParty',
            },
          ],
        },
      ])
      .end();

    config
      .plugin('define')
      .use(webpack.DefinePlugin, [
        { CESIUM_BASE_URL: JSON.stringify('/') },
      ])
      .end();
  },
  configureWebpack: (config) => {
    if (process.env.NODE_ENV === 'production') {
      // eslint-disable-next-line no-param-reassign
      // config.optimization.minimizer[0].options.terserOptions.compress.drop_console = true;
    }
  },
};
// http://172.17.7.104:80/forestFireMonitoring/videoAlarmData/list
