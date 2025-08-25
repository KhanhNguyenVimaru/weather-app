<template>
  <div></div>
</template>

<script setup>
import { ref } from 'vue'
const getCities = () => {
  if (localStorage.getItem('savedCities')) {
    return JSON.parse(localStorage.getItem('savedCities'))
  }
}
</script>
<style lang="scss" scoped></style>
