import {
    reqAddOrUpdateCart,
    reqCartList,
    reqCheckCart,
    reqDeleteCart
} from "@/api"
const state = {
    shopCartList:[],
}
const mutations = {
    SHOPCARTLIST(state,value){
        // console.log(value);
        state.shopCartList=value;
    },
}
const actions = {
    // 删除全部选中购物车商品
    async setDeleteCartAll({commit,dispatch,state}){
        let promises=[];
        state.shopCartList.forEach(item => {
            if(!item.isChecked) return;
            promises.push(dispatch("setDeleteCartOne",item.skuId));
        });
        return Promise.all(promises);
    },
    // 删除购物车商品单个
    async setDeleteCartOne({commit},skuId){
        let result = await reqDeleteCart(skuId);
        if(result.code==200){
            return "OK";
        }else {
            return Promise.reject(new Error("failed"));
        }
    },
    // 全选/全不选
    async checkAll({commit,dispatch,state},isChecked){
        let promiseall=[];//暂存所有更改的ajax请求结果
        state.shopCartList.forEach(item => {
            //如果遍历的数据和要切换的状态属性相同,则不发送ajax请求
            if(item.isChecked===isChecked) return;
            else{
                promiseall.push(dispatch("setCheckCart",{skuId:item.skuId,isChecked}));
            }
        });
        
        return Promise.all(promiseall);
    },
    // 切换购物车选中状态
    async setCheckCart({commit},{skuId, isChecked}){
        let result = await reqCheckCart(skuId, isChecked);
        if(result.code==200){
            return "OK"
        }else{
            return Promise.reject(new Error("failed"));
        }
    },
    // 获取购物车列表
    async getShopCartList({commit}){
        let result = await reqCartList();
        if(result.code==200){
            //只返回购物车的列表信息
            // console.log(result.data);
            let temp = result.data[0] || {};
            commit("SHOPCARTLIST",temp.cartInfoList||[]);
            // commit("SHOPCARTLIST",result.data)
        }
    },
    // 购物车添加判断 解构赋值
    async getAddOrUpdateCart({commit},{skuId,skuNum}){
        let result = await reqAddOrUpdateCart(skuId,skuNum);
        if(result.code==200){
            return "OK";
        }else {
            return Promise.reject(new Error("failed"));
        }
    },

}
const getters = {

}
export default {
    state,
    mutations,
    actions,
    getters
}