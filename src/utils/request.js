import store from '@/store';
import axios from 'axios'
import { Message } from 'element-ui';
import { getTimestamp } from '@/utils/auth';
import router from '@/router'

const TimeOut = 3600
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000
})


// 添加请求拦截器
service.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么

  //统一向请求头上设置token
  if (store.getters.token) {
    if(IsCheckTimeOut()){
      store.dispatch('user/loginout')
      router.push('/login')
      return Promise.reject(new Error('token超时了'))
    }
    //如果token存在，把token设置到请求头上
    config.headers['Authorization'] = `Bearer ${store.getters.token}`
  }

  if(store.getters.token){
    config.headers['Authorization'] = `Bearer ${store.getters.token}`
  }

  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 添加响应拦截器
service.interceptors.response.use(function (response) {
  const { success, message, data } = response.data
  if (success) {
    return data
  } else {
    Message.error(message)
    return Promise.reject(new Error(message))
  }
}, function (error) {
  if(error.response&&error.response.data&&error.response.data.code===10002){
    store.dispatch('user/loginout')
    router.push('/login')
  }else{
    Message.error(error.message)
  }
  return Promise.reject(error);
});

function IsCheckTimeOut(){
  var oldTimestamp = getTimestamp()
  var currentTimestamp = Date.now()
  return (currentTimestamp - oldTimestamp)/1000 > TimeOut
}

export default service