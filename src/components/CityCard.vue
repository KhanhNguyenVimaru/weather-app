<template>
  <div
    class="flex py-6 px-3 bg-white cursor-pointer border-1 border-gray-300 p-5 transition duration-300 hover:shadow-lg hover:border-gray-500 hover:scale-101"
    style="margin-top: 1rem"
  >
    <div class="flex flex-col flex-1">
      <h2 class="text-3xl font-bold">{{ city.city }}</h2>
      <h3 class="text-gray-600">{{ city.state }}</h3>
    </div>

    <div v-if="weatherData" class="flex flex-col gap-2">
      <p class="text-3xl self-end font-semibold">{{ Math.round(weatherData.main.temp) }}°C</p>
      <div class="flex gap-2 text-gray-500">
        <span class="text-xs"> H: {{ Math.round(weatherData.main.temp_max) }}°C </span>
        <span class="text-xs"> L: {{ Math.round(weatherData.main.temp_min) }}°C </span>
      </div>
    </div>

    <div v-else class="flex items-center text-sm text-gray-400">Loading...</div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const props = defineProps({
  city: {
    type: Object,
    required: true,
  },
})

const weatherData = ref(null)

onMounted(async () => {
  try {
    const apiKey = '19af39af5484e0dda5f33053e3c0a1c6'
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${props.city.coords.lat}&lon=${props.city.coords.lon}&appid=${apiKey}&units=metric`
    const res = await axios.get(url)
    weatherData.value = res.data
  } catch (err) {
    console.error('Error fetching weather:', err)
  }
})
</script>
