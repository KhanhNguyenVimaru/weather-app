<template>
  <div class="flex flex-col flex-1 items-center">
    <div
      v-if="route.query.preview"
      class="text-black py-4 w-full max-w-full bg-gray-100 flex justify-center items-center px-4"
    >
      <p class="text-gray-600">
        You are currently previewing this city, click the "+" icon to start tracking this city.
      </p>
    </div>
  </div>
</template>

<script setup>
import axios from 'axios'
import { useRoute } from 'vue-router'

const route = useRoute()

const getWeatherData = async () => {
  try {
    const weatherData = await axios.get(
      `https://api.openweathermap.org/data/3.0/onecall?lat=${route.query.lat}&lon=${route.query.lon}&exclude={part}&appid=1d22ca32a0d82624bfa8a4190a7f5789&units=imperial`,
    )
    // cal current date & time
    const localOffset = new Date().getTimezoneOffset() * 60000
    const utc = weatherData.data.current.dt * 1000 + localOffset
    weatherData.data.currentTime = utc + 1000 * weatherData.data.timezone_offset

    // cal hourly weather offset
    weatherData.data.hourly.forEach((hour) => {
      const utc = hour.dt * 1000 + localOffset
      hour.currentTime = utc + 1000 * weatherData.data.timezone_offset
    })

    return weatherData.data
  } catch (error) {
    console.error(error)
  }
}

const weatherData = await getWeatherData()
</script>
