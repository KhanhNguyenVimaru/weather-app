<template>
  <div id="app" class="flex flex-col min-h-[100vh]">
    <SiteNavigation />
    <RouterView />
    <BaseFooter />
  </div>
</template>

<script>
import { RouterView } from 'vue-router'
import SiteNavigation from './components/SiteNavigation.vue'
import BaseFooter from './components/BaseFooter.vue'
export default {
  components: {
    RouterView,
    SiteNavigation,
    BaseFooter,
  },
}
</script>
