import { reqSearch } from "@/api"
const state = {
    //搜索产品列表
    productList:{}
}

const mutations = {
    //搜索
    SEARCHRESULT(state,value){
        state.productList=value;
    }
}

const actions = {
    //搜索
    async reqSearch({commit},searParams){
        //千万不要漏掉了await 不然就返回一个promise对象,就不能获取code了
        let searchResult = await reqSearch(searParams);
        if(searchResult.code==200){
            commit("SEARCHRESULT",searchResult.data);
        }
    },

}
// 
//为了避免undefined.xxx 出现报错,这里做处理
const getters = { 
    //返回搜索商品列表
    goodsList(state){
        return state.productList.goodsList||[];
    }
}

export default {
    state,
    mutations,
    actions,
    getters
}