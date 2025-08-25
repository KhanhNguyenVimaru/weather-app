<template>
  <div class="flex-1">
    <Suspense>
      <template #default>
        <CityList />
      </template>

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
import { defineAsyncComponent } from 'vue'

const CityList = defineAsyncComponent(
  () =>
    new Promise((resolve) => {
      setTimeout(() => {
        resolve(import('@/components/CityList.vue'))
      }, 1000)
    }),
)
</script>

<style lang="scss" scoped></style>
