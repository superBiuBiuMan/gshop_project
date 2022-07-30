import Vue from "vue";
import {
  MessageBox,
  Message,
  Pagination,
  Button,
  Loading,
  Input,
  Form,
  FormItem,
  Dialog,
  Select,
  Option,
  OptionGroup,
  Checkbox,
  Popover,
  Popconfirm
} from "element-ui";
// import Popconfirm from "element-ui/packages/popconfirm/index.js"
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$prompt = MessageBox.prompt;
Vue.prototype.$loading = Loading.service;

//注册
Vue.use(Pagination);
Vue.use(Button);
Vue.use(Loading.directive);
Vue.use(Input);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Dialog);
Vue.use(Select);
Vue.use(Option);
Vue.use(OptionGroup);
Vue.use(Checkbox);
Vue.use(Popover);
Vue.use(Popconfirm);
//配置对象(全局配置) 这一步不能少!!必须要写!
Vue.prototype.$message = function (option) {
  return Message(option);
};
Vue.prototype.$message;
/* 设置弹窗的显示时长 (相当于重写一些弹窗的配置) */
Vue.prototype.$message.success = function (msg) {
  return Message.success({
    message: msg,
    duration: 1000,
  });
};

Vue.prototype.$message.success = function (option) {
  return Message.success(option);
};

Vue.prototype.$message.warning = function (msg) {
  return Message.warning({
    message: msg,
    duration: 3000,
  });
};

Vue.prototype.$message.error = function (msg) {
  return Message.error({
    message: msg,
    duration: 5000,
  });
};
