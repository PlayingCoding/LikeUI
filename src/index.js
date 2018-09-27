import Button from "./components/button";
import Icon from "./components/icon";

const components = {
  Button,
  ButtonGroup: Button.Group,
  Icon
};

const iku = {
  ...components,
  iButton: Button
};

const install = function(Vue, opts = {}) {
  if (install.installed) return;

  Object.keys(iku).forEach(key => {
    Vue.component(key, iku[key]);
  });

  Vue.prototype.$IKU = {
    size: opts.size || "",
    transfer: "transfer" in opts ? opts.transfer : ""
  };
};

// auto install
if (typeof window !== "undefined" && window.Vue) {
  install(window.Vue);
}

const API = {
  version: process.env.VERSION, // eslint-disable-line no-undef
  install,
  ...components
};

export default API;
// module.exports.default = module.exports = API; // eslint-disable-line no-undef
