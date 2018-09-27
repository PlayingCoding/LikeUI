import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import LIKEUI from "../src/index";
Vue.config.productionTip = false;
Vue.use(LIKEUI);

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
