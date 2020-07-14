import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';

const Login = () => import('../views/Login.vue');
const Auction = () => import('../views/Auction.vue');
const AuctionDetail = () => import('../views/AuctionDetail.vue');
const NotFound = () => import('../views/NotFound.vue');

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Auction',
    component: Auction,
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/auctions/:auctionId',
    name: 'AuctionDetail',
    component: AuctionDetail,
  },
  {
    path: '*',
    name: 'NotFound',
    component: NotFound,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
