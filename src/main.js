import Vue from 'vue';
import FontPicker from 'font-picker-vue';
import App from './App.vue';


Vue.use(FontPicker);
Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
}).$mount('#app');
