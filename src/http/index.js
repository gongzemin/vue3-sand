import axios from 'axios';
import { ElLoading, ElNotification } from 'element-plus';
// 异步axios请求先进入这个文件，然后判断是否为开发者环境。
// 然后判断baseurl的地址是api还是线上地址
// 如过是开发者环境，就在后面添加/api，然后进入全局的vue.config
const instance = axios.create({
  baseURL: process.env.NODE_ENV === 'development' ? '' // /api
    // : 'http://121.35.9.106:8080/api', // 外网
    : 'http://172.17.30.95:8080/api', // http://172.17.30.85:8080/api
});

// 2021/03/12
// 调用大数据平台所需的密匙
// E4Fzprw3gtnfqUnFyd_ArZLesNB5uPofmtQs5lyyUDM;

const LoadingService = null;
// 添加请求拦截器
instance.interceptors.request.use((config) => {
  // config.headers['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
  // config.headers['Content-Type'] = 'application/json';
  // 在发送请求之前做些什么
  // LoadingService = ElLoading.service({
  //   title: '数据加载中',
  //   background: 'transparent',
  // });
  if (config.method === 'post') {
    const params = config.data || {};
    if (!params.pageNo) params.pageNo = 1;
    if (!params.pageSize) params.pageSize = 20;
    params.access_token = 'E4Fzprw3gtnfqUnFyd_ArZLesNB5uPofmtQs5lyyUDM';
    config.data = new URLSearchParams(params);
  }
  return config;
},
(error) =>
  // 对请求错误做些什么
  // eslint-disable-next-line implicit-arrow-linebreak
  Promise.reject(error));

// 添加响应拦截器
instance.interceptors.response.use(
  (response) => {
    // loading.close();
    const { status, data: result } = response;
    const success = status === 200;
    // const configParams = JSON.parse(configData || '{}') // ?????????????
    // const { errorIgnore } = configParams
    // if (success) {
    //   store.commit('toggleLoading', false)
    // }
    if (!success || (result.status !== '200' && result.msg)) {
      ElNotification.error({
        message: result.msg || '接口异常',
      });
    } else {
      // LoadingService.close();
      // ElNotification.error({
      //   message: result.msg || '接口异常',
      // });
    }
    return {
      success,
      data: result.data ? result.data : result,
      result,
    }; // 后台把数据写在msg里了 然而前端这里没有把msg返回出来 我就写出来了
  }, (error) =>
  // 对响应错误做点什么
    // eslint-disable-next-line implicit-arrow-linebreak
    Promise.reject(error),
);

export default instance;
