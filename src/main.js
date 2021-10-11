import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import * as validator from "vee-validate";

import router from "./router/router";
import store from "./store";
import apiservice from "./services/api.service";

import VueCoreVideoPlayer from 'vue-core-video-player'

Vue.use(VueCoreVideoPlayer);

// Charts chartkick
//import VueChartkick from "vue-chartkick"
//import Chart from "chart.js"
//Vue.use(VueChartkick, { adapter: Chart })

import { setupComponents } from "./config/setup-components";
import { setupAndGetI18n } from "./config/setup-i18n";
const i18n = setupAndGetI18n(Vue);

//Importante, incluir no index.html 
//<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900">
//<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@mdi/font@latest/css/materialdesignicons.min.css">
//import "material-design-icons-iconfont/dist/material-design-icons.css";
import "./styles/global.css";
//import './plugins/base'

Vue.config.productionTip = false;

setupComponents(Vue);

//Instância global - Nesse caso não precisa declarar a local, acesse com this.$apiservice.xxx
Vue.prototype.$apiservice = apiservice;

export const ConfigApp = Object.freeze({
  LINHASPAGINA: 15,
  API_URL_PROD: "http://45.71.107.3/ApiMNET/",
  API_URL_VPN: "http://10.2.0.193/ApiMNET/",
  API_URL_DEBUG_SSL: "https://localhost:44397/",
  API_URL_DEBUG: "http://localhost:9466/",
  //API_URL: "https://localhost:44397/"  ,
  API_URL: "http://45.71.107.3/ApiMNET/",
});
//componentes poderão ser acessados em qualquer lugar com this.$nomecomponente
//Config lida de public/config.json - acessar com this.$config.KEY <- problemas com string?
//fetch(process.env.BASE_URL + "config.json")
//  .then((response) => response.json())
//  .then((config) => {
//    Vue.prototype.$config = config;
new Vue({
  vuetify,
  validator,
  router,
  store,
  i18n,
  
  render: (h) => h(App),
}).$mount("#app");
//  });
