//入口JS
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Mint from 'mint-ui';

Vue.use(Mint);

new Vue({
  el:'#app',
  render:h=>h(App),
  router,
  store,
})
