/**
 * 封装axios请求模块
 */

import axios from 'axios'
const request = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/'
})

export default request

// 方式一：(简单方便，但是不便于接口维护)：我们可以直接将对象挂载到vue的原型上；然后在组件中，通过this.xxx去访问
// 方式二：把每个请求都封装为独立的模块；在需要加载的时候调用；这种做法便于接口的管理和维护
