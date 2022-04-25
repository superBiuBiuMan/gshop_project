import {
    reqAddOrUpdateCart
} from "@/api"
const state = {

}
const mutations = {

}
const actions = {
    // 解构赋值
    async getAddOrUpdateCart({commit},{skuId,skuNum}){
        let result = await reqAddOrUpdateCart(skuId,skuNum);
        if(result.code==200){
            return "OK";
        }else {
            return Promise.reject(new Error("failed"));
        }
    }
}
const getters = {

}
export default {
    state,
    mutations,
    actions,
    getters
}