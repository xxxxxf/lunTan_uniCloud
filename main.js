import Vue from 'vue'
import App from './App'
import $app from "./common/common.js";
Vue.config.productionTip = false
Vue.prototype.app=$app;
import unLogin from  "./components/un-login.vue";
Vue.component("unLogin",unLogin);
App.mpType = 'app'

const app = new Vue({
	...App
})
app.$mount()
