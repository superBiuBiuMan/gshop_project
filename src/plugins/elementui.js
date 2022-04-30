import Vue from "vue"
import {MessageBox,Message,Pagination} from "element-ui"

Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$prompt = MessageBox.prompt;
Vue.prototype.$message = Message;
//注册
Vue.use(Pagination);