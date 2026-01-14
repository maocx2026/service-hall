import { createApp } from 'vue';
import '@/styles/app.less';
import 'vant/lib/index.css';
import mitt from 'mitt';
import '@vant/touch-emulator';

import { i18n } from '@/i18n';
import { JWeixinPlugin } from '@/plugins/jweixin';

import { setWxIosFirstVisitUrl } from '@/helps/wx';
import App from './app.vue';
import router from './router';

const app = createApp(App);
const eventBus = mitt();

app.use(router);
app.use(i18n);
app.use(JWeixinPlugin);
/*
const miTT = mitt();
declare module 'vue' {
  export interface ComponentCustomProperties {
    $eventBus: typeof miTT,
  }
}
app.config.globalProperties.$eventBus = miTT;
*/

app.config.globalProperties.$eventBus = eventBus;
app.mount('#app');

setWxIosFirstVisitUrl();
