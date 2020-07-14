import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';
import './plugins/axios';
import './plugins/socketio';

import PageBase from './components/PageBase.vue';

Vue.config.productionTip = false;

Vue.component('PageBase', PageBase);

export default new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount('#app');
