<template>
  <div>
    <Suspense>
      <!-- component with nested async dependencies -->
      <AsyncCityView />
      <!-- loading state via #fallback slot -->
      <template #fallback> Loading... </template>
    </Suspense>
  </div>
</template>

<script setup>
import AsyncCityView from '@/components/AsyncCityView.vue'
</script>
