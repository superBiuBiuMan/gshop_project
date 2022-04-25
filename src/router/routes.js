import Home from "@/pages/Home"
import Login from "@/pages/Login"
import Register from "@/pages/Register"
import Search from "@/pages/Search"
import Detail from "@/pages/Detail"
import AddCarSuccess from "@/pages/AddCartSuccess"
export default [
    {
        //添加购物车成功
        path:"/addcartsuccess",
        name:"addcartsuccess",
        component:AddCarSuccess
    },
    {
        //商品详情
        path:"/detail/:skuId",
        name:"detail",
        component:Detail
    },
    {
        //主页
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
        //搜索商品
        // path:'/search/:category?',
        path:'/search/:keyword?',
        name:"search",
        component:Search,
    }
]