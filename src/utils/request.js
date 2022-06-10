import axios from 'axios'
import { Message } from 'element-ui';

const request = axios.create({
  baseURL:process.env.VUE_APP_BASE_API,
  timeout:5000
})


// 添加请求拦截器
request.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 添加响应拦截器
request.interceptors.response.use(function (response) { 
  const {success,message,data} = response.data
  if(success){
    return data
  }else{
    Message.error(message)
    return Promise.reject(new Error(message))
  }
}, function (error) {
  Message.error(error.message)
  return Promise.reject(error);
});

export default request