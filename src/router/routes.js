import Home from "@/pages/Home"
import Login from "@/pages/Login"
import Register from "@/pages/Register"
import Search from "@/pages/Search"

export default [
    {
        path:'/',
        component:Home
    },
    {
        path:'/login',
        name:"login",
        component:Login,
        // 元数据
        meta:{
            isHidenFooter:true
        }
    },
    {
        path:'/register',
        name:"register",
        component:Register,
        //元数据
        meta:{
            isHidenFooter:true
        }
    },
    {
        path:'/search',
        name:"search",
        component:Search
    }
]