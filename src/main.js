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

Vue.use(Viewer);
Viewer.setDefaults({
  Options: { "inline": true, "button": 0, "navbar": 0, "title": 0, "toolbar": 0, "tooltip": true, "movable": false, "zoomable": true, "rotatable": false, "scalable": false, "transition": true, "fullscreen": true, "keyboard": false, "url": "data-source" }
});

Vue.use(Mint);
// import preview from 'vue-photo-preview'
// import 'vue-photo-preview/dist/skin.css'
// Vue.use(preview)

new Vue({
  el:'#app',
  render:h=>h(App),
  router,
  store,
})
