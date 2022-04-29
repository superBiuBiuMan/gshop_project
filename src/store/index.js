import Vue from "vue"
import vuex from "vuex"
//模块化
import home from "./modules/home"
import user from "./modules/user"
import search from "./modules/search"
import detail from "./modules/detail"
import shopcart from "./modules/shopcart"
import trade from "./modules/trade"
Vue.use(vuex)
const mutations = {

}
const actions = {

}
const getter = {

}

export default new vuex.Store({
    mutations,
    actions,
    getter,
    //vuex模块化,不同页面不同数据管理
    modules:{
        home,
        user,
        search,
        detail,
        shopcart,
        trade,
    }
})