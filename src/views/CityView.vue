<template>
  <div class="flex-1">
    <Suspense>
      <!-- component with nested async dependencies -->
      <AsyncCityView />

      <!-- fallback loading state -->
      <template #fallback>
        <div class="flex items-center justify-center h-screen">
          <div
            class="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500 border-solid"
          ></div>
        </div>
      </template>
    </Suspense>
  </div>
</template>

<script setup>
import AsyncCityView from '@/components/AsyncCityView.vue'
</script>
