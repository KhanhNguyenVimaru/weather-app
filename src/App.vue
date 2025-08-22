<template>
  <div id="app" class="flex flex-col min-h-full">
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
