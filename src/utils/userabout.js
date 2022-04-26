import {
    v4 as uudiv4
} from "uuid"
const TOKEN_KEY="TOKEN_KEY";

/* 获取用户临时uuid,先从localStorage读取,如果有则返回,如果没有则新建再返回 */
function getUserTempId() {
    let userTempId = localStorage.getItem("USERTEMPID_KEY");
    if(!userTempId){
        //不存在,新建一个
        userTempId=uudiv4();
        localStorage.setItem("USERTEMPID_KEY",userTempId);
    }
    return userTempId;
}
function getItem(){
    return localStorage.getItem(TOKEN_KEY);
}
function setItem(token){
    localStorage.setItem(TOKEN_KEY,token);
}
function removeItem(){
    localStorage.removeItem(TOKEN_KEY);
}


export {
    getUserTempId,
    getItem,
    setItem,
    removeItem
}