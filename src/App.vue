<template>
  <div id="app">
    <app-header></app-header>
    <div class="fixed-top-padding"></div>

    <transition name="component-fade" mode="out-in">
      <keep-alive include="Home">
        <router-view />
      </keep-alive>
    </transition>
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

body {
  overflow-y: scroll;
}

.fixed-top-padding {
  padding-top: 70px;
}

@media (min-width: 768px) {
  .fixed-top-padding {
    padding-top: 100px;
  }
}

// Transition
.component-fade-enter-active {
  transition: opacity 0.3s ease-out;
}

.component-fade-enter,
.component-fade-leave-active {
  opacity: 0;
}
</style>
