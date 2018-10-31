import Affix from "./components/affix";
import Button from "./components/button";
import Icon from "./components/icon";
import { Row, Col } from "./components/grid";
import { Layout, Sider, Header, Content, Footer } from "./components/layout";

const components = {
  Affix,
  Col,
  Row,
  Layout,
  Sider,
  Header,
  Content,
  Footer,
  Button,
  ButtonGroup: Button.Group,
  Icon
};

const likeui = {
  ...components,
  iButton: Button
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
