import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      alias: '/drone-list',
      name: 'drone-list',
      component: () => import('./components/DroneList')
    },
    {
      path: '/drone/:id',
      name: 'drone-detail',
      component: () => import('./components/DroneCreate')
    },
    {
      path: '/create',
      name: 'drone-create',
      component: () => import('./components/DroneCreate')
    }
  ]
});