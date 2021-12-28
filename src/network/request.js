import axios from "axios";
//第三种  这种终极版   最好
export function request(config) {
    const instance = axios.create({
        // baseURL: 'http://waiwai.vaiwan.com',
        baseURL: 'http://8eaa-223-70-192-226.ngrok.io',
        timeout: 5000
    })
    instance.interceptors.request.use(config => {
        // 第三步    登录过之后有token    别的页面请求的时候拦截并返回token   一起发送请求
        config.headers.Authorization = window.sessionStorage.getItem('token')
        return config
    })
    instance.interceptors.response.use(res => {
        return res.data
    }, err => {
        console.log(err);
    })
    return instance(config)


}