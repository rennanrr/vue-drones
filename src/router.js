import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      alias: '/drones',
      name: 'drones',
      component: () => import('./components/DroneList')
    },
    {
      path: '/drones/:id',
      name: 'drone-detail',
      component: () => import('./components/Drone')
    },
    {
      path: '/create',
      name: 'drone-create',
      component: () => import('./components/DroneCreate')
    }
  ]
});