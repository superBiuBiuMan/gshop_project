import {
    reqBaseCategoryList,
    reqBannerList,
    reqRecommend,
    reqFloor
}  from "@/api"

const state = {
    //分类栏目
    baseCategoryList:[],
    //首页轮播图片
    bannerList:[],
    //今日推荐
    recommendList:[],
    //二个底部
    floorList:[]
}
const mutations = {
    //分类栏目
    GETBASECATEGORYLIST(state,value){
        //太长了,截取前15个
        value=value.splice(0,15);
        state.baseCategoryList=value;
    },
    //首页轮播
    GETBANNERLIST(state,value){
        state.bannerList=value;
    },
    //进入推荐
    RECOMMENDLIST(state,value){
        state.recommendList=value;
    },
    //Floor
    REQFLOOR(state,value){
        state.floorList=value;
    }
}
const actions = {
    //获取三级分类
    async getBaseCategoryList({ commit }){
        //发送ajax请求
        let categoryList = await reqBaseCategoryList();
        if(categoryList.code==200){
            //请求成功
            commit("GETBASECATEGORYLIST",categoryList.data);
        }
    },
    //获取首页轮播
    async getBannerList({commit}){
        //调用ajax,发送,将返回值放在bannerList
        let bannerList = await reqBannerList();
        if(bannerList.code==200){
            commit("GETBANNERLIST",bannerList.data);
        }
    },
    //今日推荐
    async getRecommend({commit}){
        let recommendList=await reqRecommend();
        if(recommendList.code==200){
            commit("RECOMMENDLIST",recommendList.data);
        }
    },
    // 底部二个Floor
    async getFloor({commit}){
        let floorList = await reqFloor();
        //注意获取对应的代码
        if(floorList.code==200){
            commit("REQFLOOR",floorList.data);
        }
    }
}
const getter = {

}
// // // 测试假数据是否成功获取
// reqFloor().then(data=>{
//     console.log(data);
// })

export default {
    state,
    mutations,
    actions,
    getter
}