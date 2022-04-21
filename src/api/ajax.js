/* 对axios二次封装 */
import axios from "axios"
import NProgress from "nprogress";
// 脚手架帮我们配置好了才可以引入css的
// import "nprogress/nprogress.css";
//创建一个axios实例
const service = axios.create({
    baseURL: "http://39.98.123.211/api",
    // baseURL:"/api",
    timeout: 2000
});
// 设置拦截器
//请求发送前拦截器
service.interceptors.request.use((config) => {
    //对config进行操作
    /* 显示请求进度条 */
    NProgress.start();
    return config;
})

//响应拦截器
service.interceptors.response.use(
    (response) => {
        /* 隐藏请求进度条 */
        NProgress.done();
        //对响应数据做处理
        return response.data || response;
    },
    (error) => {
        /* 隐藏请求进度条 */
        NProgress.done();
        //统一提示
        alert(error.message||"未知错误");
        //或者 throw error
        return Promise.reject(error);
    }
)

export default service;