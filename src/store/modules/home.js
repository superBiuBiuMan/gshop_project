import {reqBaseCategoryList}  from "@/api"
const state = {
    //分类栏目
    baseCategoryList:[]
}
const mutations = {
    //分类栏目
    GETBASECATEGORYLIST(state,value){
        //太长了,截取前15个
        value=value.splice(0,15);
        state.baseCategoryList=value;
    }
}
const actions = {
    //获取三级分类
    async getBaseCategoryList({ commit }){
        const categoryList = await reqBaseCategoryList();
        if(categoryList.code==200){
            //请求成功
            commit("GETBASECATEGORYLIST",categoryList.data);
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