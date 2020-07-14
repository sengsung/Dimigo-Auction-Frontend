import axios, { AxiosInstance } from 'axios';
import Vue from 'vue';
import vue from '../main';

// import store from '@/store';

const axi = axios.create({
  baseURL: 'http://localhost',
  withCredentials: true,
});

axi.interceptors.response.use(async res => {
  switch (res.data.status) {
    case 401:
      // eslint-disable-next-line
      res.data = null;
      if (vue.$router.currentRoute.path !== '/login') {
        vue.$router.push(`/login?redirect=${vue.$router.currentRoute.path}`).catch(() => {});
      }
      break;
    case 500:
      // eslint-disable-next-line
      res.data = null;
      vue.$emit('alert', '서버에 에러가 발생했어요..!');
      break;
  }
  return res;
}, err => {
  console.log(err);
  alert('요청했는데..에러가 발생했어요..!');
  alert('아니면 제가 바보인거겠죠..');
});

Vue.prototype.$axios = axi;

declare module 'vue/types/vue' {
  interface Vue {
    $axios: AxiosInstance;
  }
}

export default axi;
