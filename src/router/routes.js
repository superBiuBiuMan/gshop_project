import Home from "@/pages/Home"
import Login from "@/pages/Login"
import Register from "@/pages/Register"
import Search from "@/pages/Search"
// Home下方路由


export default [
    {
        path:'/',
        component:Home,
        // children:[
        //     {
        //         path:"/",
        //         name:"nav",
        //         component:Nav
        //     },
        //     //只显示一个还是都会显示?
        //     {
        //         path:"/",
        //         name:"brand",
        //         component:Brand
        //     }
        // ]
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
        path:'/search/:category?',
        name:"search",
        component:Search
    }
]