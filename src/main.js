import Vue from 'vue';
import {
  ButtonPlugin,
  NavbarPlugin,
  ImagePlugin,
  LayoutPlugin,
  FormInputPlugin,
} from 'bootstrap-vue';
import VueCompositionAPI from '@vue/composition-api';
import App from './App.vue';
import router from './router';
import store from './store';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

[
  ButtonPlugin,
  NavbarPlugin,
  ImagePlugin,
  LayoutPlugin,
  FormInputPlugin,
].forEach((comp) => {
  Vue.use(comp);
});
Vue.use(VueCompositionAPI);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
