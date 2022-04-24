import Home from "@/pages/Home"
import Login from "@/pages/Login"
import Register from "@/pages/Register"
import Search from "@/pages/Search"
import Detail from "@/pages/Detail"

export default [
    {
        path:"/detail/:stuId",
        name:"detail",
        component:Detail
    },
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
        // path:'/search/:category?',
        path:'/search/:keyword?',
        name:"search",
        component:Search,
    }
]