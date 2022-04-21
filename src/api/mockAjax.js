/* 假数据的ajax请求二次封装 */
import axios from "axios"
import nProgress from "nprogress";
const service = axios.create({
    baseURL:"/mock",
    timeout:2000
});

service.interceptors.request.use(
    (config)=>{
        nProgress.start();
        return config
    }
);

service.interceptors.response.use(
    (result)=>{
        nProgress.done();
        return result.data;
    },
    (error)=>{
        nProgress.done();
        return Promise.reject(error);
    }
)

export default service;