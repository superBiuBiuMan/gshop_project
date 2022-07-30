//引入二次封装的axios
import axios from "./ajax.js";
//假数据的ajax请求
import mockAjax from "./mockAjax.js";

/* 获取分类列表 在线版*/
// export function reqBaseCategoryList(){
//     return axios.get("/product/getBaseCategoryList");
// }
/* 获取分类列表 离线版*/
export function reqBaseCategoryList() {
    return mockAjax.get("/product/getBaseCategoryList");
}
/* 获取轮播图在线版 */
// export function reqBannerList() {
//     return axios.get("/cms/banner");
// }
/* 获取轮播图离线版 */
export function reqBannerList() {
    return mockAjax.get("/cms/banner");
}


/* 假数据 */
// 引入后输出是这个
// ƒ reqRecommend() {
//     return (0,_mockAjax_js__WEBPACK_IMPORTED_MODULE_1__["default"])("/mock/todayRecommend");
//   }
export const reqRecommend = () => mockAjax("/todayRecommend"); //今日推荐(假数据版)

export const reqFloor = () => mockAjax("/floor"); //二个floor(假数据版)

/* 获取搜索结果 */
export const reqSearch = (searParams) => axios.post("/list", searParams);
/* 获取商品详情 */
export const reqDetailInfo = (skuId) => {
    return axios.get("/item/" + skuId);
}
/* 添加进入购物车或对已有物品数据更改 */
// /api/cart/addToCart/{ skuId }/{ skuNum }
export const reqAddOrUpdateCart = (skuId, skuNum) => {
    return axios.post("/cart/addToCart/" + skuId + "/" + skuNum);
}
/* 获取购物车列表 */
export const reqCartList = () => {
    return axios.get("/cart/cartList");
}
/* 切换商品选中状态 */
// /api/cart/checkCart/{skuId}/{isChecked}
export const reqCheckCart = (skuId, isChecked) => {
    return axios.get(`/cart/checkCart/${skuId}/${isChecked}`)
}
/* 删除购物车商品 */
// /api/cart/deleteCart/{skuId}
export const reqDeleteCart = (skuId) => {
    return axios.delete(`/cart/deleteCart/${skuId}`);
}
/* 获取验证码 */
// api/user/passport/sendCode/{phone}
export const reqCode = (phone) => {
    return axios.get("/user/passport/sendCode/" + phone);
}
/* 用户注册 */
// /api/user/passport/register
export const reqRegister = (info) => {
    return axios.post("/user/passport/register", info);
}
/* 用户登录 */
export const reqLogin = (userLoginInfo) => {
    return axios.post("/user/passport/login", userLoginInfo);
}
/* token校验 */
export const loginCheck = () => {
    return axios.get("/user/passport/auth/getUserInfo");
}
/* 退出登录 */
export const loginOut = () => {
    return axios.get("/user/passport/logout");
}
/* 获取订单交易页信息 */
export const reqTradeInfo = () => {
    return axios.get("/order/auth/trade");
}
/* 提交订单 */
export const reqOrderInfo = (tradeNo, tradeInfoObj) => {
    return axios.post(`/order/auth/submitOrder?tradeNo=${tradeNo}`, tradeInfoObj)
}
/* 获取用户地址信息 */
export const reqAddressInfo = () => {
    return axios.get("/user/userAddress/auth/findUserAddressList");
}
/* 从orderId获取支付信息 */
export const reqPayInfo = (orderId) => {
    return axios.get("/payment/weixin/createNative/" + orderId);
}
/* 获取订单支付情况(轮询) */
export const queryPayStatus = (orderId) => {
    return axios.get("/payment/weixin/queryPayStatus/" + orderId);
}
/* 获取我的订单列表 */
export const reqMyOrderInfo = (page,limit) => {
    return axios.get(`/order/auth/${page}/${limit}`);
}

// 获取地址大区列表
// api/user/userAddress/auth/findBaseRegion GET
export const reqAddressBaseRegion = () => {
    return axios.get("user/userAddress/auth/findBaseRegion");
}

// 根据地址大区获取省份
// /api/user/userAddress/auth/findBaseProvinceByRegionId/{regionId} GET
export const reqAddressBaseProvinceByRegionId = (regionId) => {
    return axios.get(`/user/userAddress/auth/findBaseProvinceByRegionId/${regionId}`)
}

// 新增用户地址
// /api/user/userAddress/auth/save POST
export const reqSaveUserAddress = (userAddressInfo) => {
    return axios.post(`/user/userAddress/auth/save`,userAddressInfo)
}

//删除用户地址
//  /api/user/userAddress/auth/delete/{userAddressId} GET
export const reqRemoveUserAddress = (userAddressId) => {
    return axios.get(`/user/userAddress/auth/delete/${userAddressId}`)
}

// 更新用户地址
//  /api/user/userAddress/auth/update POST
export const reqUpdateUserAddress = (userAddressInfo) => {
    return axios.post(`/user/userAddress/auth/update`, userAddressInfo)
}