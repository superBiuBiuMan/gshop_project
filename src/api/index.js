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
/* 获取轮播图 */
export function reqBannerList() {
    return axios.get("/cms/banner");
}

/* 假数据 */
// 引入后输出是这个
// ƒ reqRecommend() {
//     return (0,_mockAjax_js__WEBPACK_IMPORTED_MODULE_1__["default"])("/mock/todayRecommend");
//   }
export const reqRecommend = () => mockAjax("/todayRecommend"); //今日推荐
export const reqFloor = () => mockAjax("/floor"); //二个floor

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