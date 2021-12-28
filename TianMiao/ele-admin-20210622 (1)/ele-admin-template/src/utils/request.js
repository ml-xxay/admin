import axiox from 'axios'

//创建axios实例
const sutangservice = axiox.create({
  baseURL: 'http://192.168.1.61:8087/tmlms',
  timeout: 5000
})

//请求拦截
//所有的网络请求都会先走这个方法
// 添加请求拦截器,所有的网络请求都会先走这个方法，我们可以在它里面为请求添加一些自定义的内容
sutangservice.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
 /* console.log('全局请求拦截')
  console.log(config)
  console.groupEnd()*/
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 添加响应拦截器
//此处可以根据服务器的返回状态码做响应的处理
//404 404 500
sutangservice.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  /*console.log('全局响应拦截')
  console.log(response)
  console.groupEnd()*/
  return response
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error)
})

export function get(url, params) {
  return sutangservice.get(url, {
    params
  })
}

export function post(url, data) {
  return sutangservice.post(url, data)
}

export function del(url) {
  return sutangservice.delete(url)
}

export function put(url, data) {
  return sutangservice.put(url, data)
}
