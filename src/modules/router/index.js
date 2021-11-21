import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store/index'

import CabinetRoutes from './routes/cabinet'

import {Authenticated, middlewarePipeline} from './middleware'

Vue.use(VueRouter);

const routes = [
  {
    path: '/auth',
    name: 'auth',
    redirect: {name: 'auth.signin'},
    component: () => import('../../layouts/auth'),
    children: [
      {
        name: 'auth.signin',
        path: 'signin',
        component: () => import('@/views/auth/SignIn'),
        meta: {title: 'Authorization'}
      }
    ]
  },
  {
    path: '/',
    name: 'admin',
    redirect: {name: 'cabinet.dashboard'},
    component: () => import('@/layouts/default'),
    children: CabinetRoutes,
    meta: {
      middleware: [Authenticated]
    }
  },
  {
    path: '/404',
    name: '404',
    component: () => import('../../views/NotFound'),
    meta: {
      title: 'Page not found'
    }
  }, {
    path: '*',
    redirect: '/404'
  }
];

const router = new VueRouter({
  base: process.env.BASE_URL,
  mode: 'history',
  routes: routes
});

router.beforeEach((to, from, next) => {
  document.title = 'vwRatings ' + to.meta.title;
  next();
});

middlewarePipeline(router, store);

export default router
