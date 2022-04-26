import {
    getUserTempId,
    getItem,
    setItem,
    removeItem,
} from "@/utils/userabout";
import {
    reqRegister,
    reqCode,
    reqLogin
} from "@/api"

const state = {
    //存储用户信息
    // userInfo:{}
    userTempId: getUserTempId(),
    token:""
}
const mutations = {
    SETTOKEN_USER(state,token){
        state.token=token;
    }
}
const actions = {
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