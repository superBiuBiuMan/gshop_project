//引入二次封装的axios
import axios from "./axios.js";

export function reqBaseCategoryList(){
    return axios.get("/product/getBaseCategoryList")
}

