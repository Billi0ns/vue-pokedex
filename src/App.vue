<template>
  <div id="app">
    <app-header></app-header>
    <div class="fixed-top-padding"></div>
    <router-view />
  </div>
</template>

<script>
import AppHeader from '@/components/AppHeader.vue';

export default {
  components: {
    AppHeader,
  },
};
</script>

<style lang="scss">
#app {
  font-family: Helvetica, PingFang TC, Microsoft JhengHei, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

.fixed-top-padding {
  padding-top: 70px;
}

@media (min-width: 768px) {
  .fixed-top-padding {
    padding-top: 100px;
  }
}
</style>
