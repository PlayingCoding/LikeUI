import Vue from "vue";
import App from "./App.vue";
import router from "./router";

import "../src/styles/index.less";
import likeui from "../src/index.js";
Vue.use(likeui);

Vue.config.productionTip = false;
new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
