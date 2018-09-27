import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import iKu from "../src/index";
Vue.config.productionTip = false;
Vue.use(iKu);

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
