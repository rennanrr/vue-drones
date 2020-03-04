<template>
  <div id="app" class="mt-0">
    <nav class="navbar navbar-expand text-white bg-dark border border-dark justify-content-between">
      <div class="navbar-nav text-white">
        <li class="nav-item">
          <a href="/drone-list" class="navbar-brand">Drone list</a>
        </li>
        <li class="nav-item">
          <a href="/create" class="navbar-brand">New drone</a>
        </li>
      </div>
      <a class="navbar-brand">Teste de seleção Full-Stack SoluCX- 2020-01J (Rennan Ribas)</a>
    </nav>

    <div class="container mt-3 mb-3">
      <router-view />
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import { BootstrapVue } from 'bootstrap-vue';

import './assets/styles/custom.scss'

// Install BootstrapVue
Vue.use(BootstrapVue)

export default {
  name: 'app'
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
