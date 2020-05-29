import axios from "axios";
import { Toast } from "antd-mobile";
// // 请求基础地址
const BASE_URL = "https://api-haoke-web.itheima.net";
const myAxios = axios.create({
  baseURL: BASE_URL,
});

// // 请求基础地址
// const BASE_URL = "https://api-haoke-web.itheima.net";
// // 创建axios实例
// const myAxios = axios.create({
//   baseURL: BASE_URL,
// });

// 请求拦截器 发送请求之前
myAxios.interceptors.request.use(
  function (config) {
    console.log("发送请求", config);
    Toast.loading("加载中...", 0);
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

//请求拦截器 请求成功之后
myAxios.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    console.log("请求成功后", response);
    Toast.hide();
    const data = response.data;
    let _res = {
      status: data.status,
      description: data.description,
      data: data.body,
    };
    return _res;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);

export { BASE_URL };
export default myAxios;
