import Vue from "vue"
import {MessageBox,Message,Pagination} from "element-ui"

Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$prompt = MessageBox.prompt;
// Vue.prototype.$message = Message;
//注册
Vue.use(Pagination);

//配置对象(全局配置) 这一步不能少!!必须要写!
Vue.prototype.$message = function(option){
    return Message(option)
}

Vue.prototype.$message.success = function (msg){
    return Message.success({
        message:msg,
        duration:1000
    })
}

Vue.prototype.$message.success = function (option){
    return Message.success(option)
}

Vue.prototype.$message.warning = function (msg){
    return Message.warning({
        message:msg,
        duration:3000
    })
}

Vue.prototype.$message.error = function (msg) {
    return Message.error({
        message:msg,
        duration:5000
    })
}