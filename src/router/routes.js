// import Home from "@/pages/Home"
const Home = () => import("@/pages/Home")
// 相当于
// const Home = function(){
//     return import("@/pages/Home")
// }
//路由懒加载模式
const Login = () => import("@/pages/Login")
const Register = () => import("@/pages/Register")
const Search = () => import("@/pages/Search")
const Detail = () => import("@/pages/Detail")
const AddCarSuccess = () => import("@/pages/AddCartSuccess")
const ShopCart = () => import("@/pages/ShopCart")
const Trade = () => import("@/pages/Trade")
const Center = () => import("@/pages/Center")
const Pay = () => import("@/pages/Pay")
const PaySuccess = () => import("@/pages/PaySuccess")
const MyOrder = () => import("@/pages/Center/MyOrder")
const OrderGroup = () => import("@/pages/Center/OrderGroup")
const AddressModel = () => import("@/components/AddressModel")
import {Message} from "element-ui"
// import Login from "@/pages/Login"
// import Register from "@/pages/Register"
// import Search from "@/pages/Search"
// import Detail from "@/pages/Detail"
// import AddCarSuccess from "@/pages/AddCartSuccess"
// import ShopCart from "@/pages/ShopCart"
// import Trade from "@/pages/Trade"
// import Center from "@/pages/Center"
// import Pay from "@/pages/Pay"
// import PaySuccess from "@/pages/PaySuccess"
// import MyOrder from "@/pages/Center/MyOrder"
// import OrderGroup from "@/pages/Center/OrderGroup"
import store from "@/store/index.js"
export default [
    {
        //测试使用
        path:"/addressmodel",
        component:AddressModel
    },
    {
        
        //我的订单/个人中心
        path:"/center",
        component:Center,
        children:[
            {
                path:"myorder",
                name:"myorder",
                component:MyOrder
            },
            {
                path:"ordergroup",
                name:"ordergroup",
                component:OrderGroup
            },
            //重定向
            {
                path:"",
                redirect:"myorder"
            }
        ]
    },
    {
        //支付界面
        path:"/pay",
        name:"pay",
        component:Pay,
        // 只有从交易页面(创建订单)页面才能跳转到支付页面
        beforeEnter:(to,from,next) => {
            if(from.path === '/trade'){
                next();
            }else{
                Message.error("只有从交易页面(创建订单)页面才能跳转到支付页面");
                // alert("只有从交易页面(创建订单)页面才能跳转到支付页面");
                next("/");
            }
        }
    },
    {
        //支付成功界面
        path:"/paysuccess",
        name:"paysuccess",
        component:PaySuccess,
        // 只有从支付页面才能跳转到支付成功页面
        beforeEnter:(to,from,next) => {
            if(from.path === '/pay'){
                next();
            }else{
                Message.error("只有从支付页面才能跳转到支付成功页面")
                // alert("只有从支付页面才能跳转到支付成功页面");
                next("/");
            }
        }
    },
    {
        //结算购物车页面
        path:"/trade",
        name:"trade",
        component:Trade,
        // 只有从购物车界面才能跳转到交易页面(创建订单)
         beforeEnter:(to,from,next) => {
            if(from.path === '/shopcart'){
                next();
            }else{
                Message.error("只有从购物车界面才能跳转到交易页面")
                // alert("只有从购物车界面才能跳转到交易页面")
                next("/");
            }
        }
    }
    ,
    {
        //购物车列表
        path:"/shopcart",
        name:"shopcart",
        component:ShopCart
    },
    {
        //添加购物车成功
        path:"/addcartsuccess",
        name:"addcartsuccess",
        component:AddCarSuccess,
        // 只有携带了skuNum和sessionStorage内部有skulnfo数据才能看到添加购物车成功的界面
        beforeEnter:(to,from,next) => {
            let skuNum = to.query.skuNum;
            let skuInfo = sessionStorage.getItem("SKUINFO_KEY");
            if(skuNum && skuInfo){
                //均存在值
                next();//放行
            }else{
                Message.error("只有携带了skuNum和sessionStorage内部有skulnfo数据才能看到添加购物车成功的界面")
                // alert("只有携带了skuNum和sessionStorage内部有skulnfo数据才能看到添加购物车成功的界面");
                next("/");
            }
        }
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
    },
    {
        path:'/login',
        name:"login",
        component:Login,
        // 元数据
        meta:{
            isHidenFooter:true
        },
        // // 路由独享守卫
        beforeEnter:(to,from,next) =>{
            //token存在
            if(store.state.user.token){
                //存在返回主页
                next("/");
            }else{
                //不存在放行
                next();
            }
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