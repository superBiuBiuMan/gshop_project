//引入二次封装的axios
import axios from "./axios.js";

export function getBaseCategoryList(){
    return axios.get("/product/getBaseCategoryList")
}

