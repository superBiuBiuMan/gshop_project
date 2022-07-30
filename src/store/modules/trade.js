import {
    reqTradeInfo,
    reqAddressInfo,
} from "@/api"
import {Message} from "element-ui"
const state = {
    tradeInfo:{},
    // 暂存修改地址时候的信息
    changAddress:{}
}
const mutations = {
    RECEIVE_CHANGEADDRESSINFO(state,value){
        state.changAddress = value;
    },
    RECEIVE_TRADEINFO(state,value){
        state.tradeInfo = value;
    }
}
const actions = {
    //用户修改地址信息暂存
    setChangeAddressInfo({commit},value){
        commit("RECEIVE_CHANGEADDRESSINFO",value);
    },
    //获取商品信息
    async getTradeInfo({commit}){
        let result = await reqTradeInfo();
        let addressInfo = await reqAddressInfo();//获取地址信息
        if(result.code == 200 && addressInfo.code == 200){
            // // 由于服务器关系,获取不到地址,这里传入和视频一样的地址信息
            // let fakeAddress = [
            //     {
            //         "id":1,
            //         "userAddress":"地球村008号",
            //         "userId":2,
            //         "provinceId":1,
            //         "consignee":"动感超人",
            //         "phoneNum":"13888888888",
            //         "isDefault":"1",
            //         "regionId":1,
            //         "fullAddress":"地球村008号动感超人堡垒"
            //     },
            //     {
            //         "id":2,
            //         "userAddress":"地球村009号",
            //         "userId":2,
            //         "provinceId":1,
            //         "consignee":"西瓜超人",
            //         "phoneNum":"13666666666",
            //         "isDefault":"0",
            //         "regionId":1,
            //         "fullAddress":"地球村009号西瓜超人堡垒"
            //     }
            // ];
            // result.data.userAddressList = addressInfo.data.length != 0 ? addressInfo.data : fakeAddress
            result.data.userAddressList = addressInfo.data;
            // result.data.userAddressList = addressInfo.data || fakeAddress;空对象空数组也是真啊!
            commit("RECEIVE_TRADEINFO",result.data);
        }else{
            Message.error(result.message)
            // alert(result.message);
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