import {reqTradeInfo} from "@/api"
const state = {
    tradeInfo:{},
}
const mutations = {
    RECEIVE_TRADEINFO(state,value){
        state.tradeInfo = value;
    }
}
const actions = {
    async getTradeInfo({commit}){
        let result = await reqTradeInfo();
        if(result.code == 200){
            // 由于服务器关系,获取不到地址,这里传入和视频一样的地址信息
            result.data.userAddressList = [
                {
                    consignee:"admin",
                    id:2,
                    isDefault:"1",
                    phoneNum:"15011111111",
                    userAddress:"北京市昌平区2",
                    userId:2
                },
                {
                    consignee:"张三",
                    id:4,
                    isDefault:"0",
                    phoneNum:"13700000000",
                    userAddress:"北京市昌平区3",
                    userId:2
                }
            ];
            commit("RECEIVE_TRADEINFO",result.data);
        }
    }
}
const getters = {
    // 用户购物车商品信息
    detailArrayList(state){
        return state.tradeInfo.detailArrayList || [];
    },
    // 用户地址信息
    userAddressList(state){
        return state.tradeInfo.userAddressList || [];
    }
}
export default {
    state,
    mutations,
    actions,
    getters
}