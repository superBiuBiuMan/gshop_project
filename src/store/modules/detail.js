import {
    reqDetailInfo
} from "@/api"
const state = {
    //商品详细信息
    skuDetailInfo:{},
}
const mutations = {
    DETAILINFO(state,value){
        state.skuDetailInfo=value;
    },
}
const actions = {
    //获取商品详情
    async getDetailInfo({commit},skuId) {
        //发送ajax请求
        const detailInfo = await reqDetailInfo(skuId);
        if(detailInfo.code==200){
            commit("DETAILINFO",detailInfo.data);
        }
    }
}
const getters = {
    // 面包屑
    categoryView(state){
        return state.skuDetailInfo.categoryView||{};
    },
    // 商品详情
    skuInfo(state){
        return state.skuDetailInfo.skuInfo||{};
    },
    // 商品售卖属性
    spuSaleAttrList(state){
        return state.skuDetailInfo.spuSaleAttrList||[]
    }
}
export default {
    state,
    mutations,
    actions,
    getters
}