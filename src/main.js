import { createApp } from 'vue';
import ElementPlus from 'element-plus';
import 'element-plus/lib/theme-chalk/index.css';
// eslint-disable-next-line import/no-extraneous-dependencies
import 'dayjs/locale/zh-cn'; // 使用element组件并调整语言
import locale from 'element-plus/lib/locale/lang/zh-cn'; // 使用element组件并调整语言
import * as Cesium from 'cesium/Source/Cesium';
import '../node_modules/cesium/Build/Cesium/Widgets/widgets.css';

import axios from 'axios';
import App from './App.vue';
import router from './router';
import store from './store';


const app = createApp(App);




app.config.globalProperties.Cesium = Cesium;
app.config.globalProperties.$store = store;
app.config.globalProperties.$axios = axios;
// 使用element组件并调整语言
app.use(ElementPlus, { locale });


app.use(store).use(router).mount('#app');
