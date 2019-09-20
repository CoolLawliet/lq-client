//入口JS
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Mint from 'mint-ui';
import 'mint-ui/lib/style.css'
import 'swiper/dist/css/swiper.css'
// import preview from 'vue-photo-preview'
// import 'vue-photo-preview/dist/skin.css'
// Vue.use(preview)
import Viewer from 'v-viewer'
import 'viewerjs/dist/viewer.css'
import '../host.js'
import Mui from 'vue-awesome-mui';

Vue.use(Mui);


Vue.use(Viewer);
Viewer.setDefaults({
  Options: { "inline": true, "button": 0, "navbar": 0, "title": 0, "toolbar": 0, "tooltip": true, "movable": false, "zoomable": true, "rotatable": false, "scalable": false, "transition": true, "fullscreen": true, "keyboard": false, "url": "data-source" }
});
Vue.use(Mint);

import VueAwesomeSwiper from 'vue-awesome-swiper'

// require styles
import 'swiper/dist/css/swiper.css'

Vue.use(VueAwesomeSwiper, /* { default global options } */)



new Vue({
  el:'#app',
  render:h=>h(App),
  router,
  store,
})
