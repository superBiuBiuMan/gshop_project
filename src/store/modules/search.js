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
    async reqSearch({commit},searchParams){
        //千万不要漏掉了await 不然就返回一个promise对象,就不能获取code了
        //对搜索参数进行处理,删除不必要的空对象或者数组
        //先进行浅拷贝
        searchParams={...searchParams};
        Object.keys(searchParams).forEach(key=>{
            // if(searchParams[key]==='' || (Array.isArray(searchParams[key]) && searchParams[key].length===0)){
            //     delete searchParams[key];
            // }
            if(searchParams[key]==='' || (searchParams[key] instanceof Array && searchParams[key].length===0)){
                delete searchParams[key];
            }
        });
        let searchResult = await reqSearch(searchParams);
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
    },
    //返回品牌列表
    trademarkList(state){
        return state.productList.trademarkList||[];
    },
    //返回属性列表
    attrsList(state){
        return state.productList.attrsList||[];
    },
    //返回总页数
    totalPage(state){
        return state.productList.total||0;
    }
}

export default {
    state,
    mutations,
    actions,
    getters
}