import { Row, Col } from "./components/grid";

const components = {
  Col,
  Row
};

const likeui = {
  ...components
};

const install = function(Vue, opts = {}) {
  if (install.installed) return;

  Object.keys(likeui).forEach(key => {
    Vue.component(key, likeui[key]);
  });

  Vue.prototype.$LIKEUI = {
    size: opts.size || "",
    transfer: "transfer" in opts ? opts.transfer : ""
  };
};

if (typeof window !== "undefined" && window.Vue) {
  install(window.Vue);
}

const API = {
  version: process.env.VERSION,
  install,
  ...components
};

export default API;
