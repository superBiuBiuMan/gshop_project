/* 假数据服务 */
import Mock from "mockjs"
//数据文档
import floor from "./floor.json"
import recommends from "./recommends.json"
// 记录数据模板。当拦截到匹配 rurl 的 Ajax 请求时，将根据数据模板 template 生成模拟数据，并作为响应数据返回。

// 今日推荐假数据
Mock.mock("/mock/todayRecommend",{
    code:200,
    data:recommends
})
// floor数据
Mock.mock("/mock/floor",{
    code:200,
    data:floor
});