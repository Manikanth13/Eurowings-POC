import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";

import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import VueLazyload from "vue-lazyload";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

Vue.use(BootstrapVue);
Vue.use(IconsPlugin);

Vue.use(VueLazyload);

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
