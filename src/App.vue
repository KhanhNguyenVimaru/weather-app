<template>
  <div id="app" class="flex flex-col min-h-[100vh]">
    <SiteNavigation />
    <RouterView />
  </div>
</template>

<script>
import { RouterView } from 'vue-router'
import SiteNavigation from './components/SiteNavigation.vue'

export default {
  components: {
    RouterView,
    SiteNavigation,
  },
}
</script>
