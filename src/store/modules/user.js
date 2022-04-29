import {
    getUserTempId,
    getItem,
    setItem,
    removeItem,
} from "@/utils/userabout";
import {
    reqRegister,
    reqCode,
    reqLogin,
    loginCheck,
    loginOut
} from "@/api"

const state = {
    // 存储用户信息
    userInfo:{},
    //临时id,用户购物车
    userTempId: getUserTempId(),
    //登录后产生的token
    token:getItem(),
}
const mutations = {
    RESET_INFO(state){
        state.userInfo = {};
        state.token = "";
    },
    RECEIVE_USERINFO(state,value){
        state.userInfo = value;
    },
    SETTOKEN_USER(state,token){
        state.token=token;
    }
}
const actions = {
    // 退出登录
    async setLoginOut({dispatch}){
        let result = await loginOut();
        if( result.code == 200 ){
            dispatch("restUserInfo");
            return "OK";
        }else{
            return Promise.reject(result.message);
        }
    },
    // 过期清空数据
    restUserInfo({commit}){
        removeItem();
        commit("RESET_INFO");
    },
    // 校验(根据token获取信息)
    async getUserInfo({commit,dispatch}){
        let result = await loginCheck();
        if( result.code == 200 ){
            commit("RECEIVE_USERINFO",result.data);
            return "OK";
        }else{
            return Promise.reject(new Error("token失效!请重新登录!"));
        }
    },
    // login
    async login({commit},info){
        let result = await reqLogin(info);
        if(result.code == 200){
            //暂存到localStorage
            commit("SETTOKEN_USER",result.data.token);
            setItem(result.data.token);
            return "OK";
        }else{
            return Promise.reject(result.message);
        }
    },
    // 获取验证码
    async sendCode({commit},phone){
        let result = await reqCode(phone);
        if(result.code == 200){
            console.log("您的验证码是:"+result.data);
        }else{
            alert("获取验证码失败!");
        }
    },
    // 提交注册信息
    async sendRegisterInfo({ commit }, info) {
       let result = await reqRegister(info)
       if(result.code == 200){
           return "OK";
       }else{
           return Promise.reject(new Error(result.message));
       }
    }
}
const getter = {

}
export default {
    state,
    mutations,
    actions,
    getter
}