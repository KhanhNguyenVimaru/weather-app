<template>
  <div
    class="flex flex-col flex-1 items-center w-full bg-no-repeat bg-top"
    style="background-color: #92b6f0"
  >
    <!-- Banner -->
    <div
      v-if="route.query.preview"
      class="text-black p-4 bg-weather-secondary w-full text-center bg-gray-50"
    >
      <p>You are currently previewing this city, click the "+" icon to start tracking this city.</p>
    </div>

    <!-- Weather Overview -->
    <div v-if="weatherData" class="flex flex-col items-center text-gray-50 py-12">
      <h1 class="text-4xl mb-2">{{ route.params.city }}</h1>
      <p class="text-sm mb-4">
        {{
          new Date(weatherData.currentTime).toLocaleDateString('en-us', {
            weekday: 'short',
            day: '2-digit',
            month: 'long',
          })
        }}
        {{
          new Date(weatherData.currentTime).toLocaleTimeString('en-us', {
            timeStyle: 'short',
          })
        }}
      </p>

      <p class="mb-8 text-gray-50" style="font-size: 80px">
        {{ Math.round(weatherData.main.temp) }}&deg;
      </p>
      <p class="text-gray-50">Feels like {{ Math.round(weatherData.main.feels_like) }}&deg;</p>
      <p class="capitalize text-gray-50">
        {{ weatherData.weather[0].description }}
      </p>
      <img
        class="w-[100px] h-auto"
        :src="`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`"
        alt="weather icon"
      />

      <div class="mt-8 text-center">
        <p>Humidity: {{ weatherData.main.humidity }}%</p>
        <p>Wind: {{ weatherData.wind.speed }} m/s</p>
      </div>
    </div>

    <div
      class="flex items-center gap-2 py-12 text-gray-100 cursor-pointer duration-150 hover:text-red-500"
      @click="removeCity"
    >
      <i class="fa-solid fa-trash"></i>
      <p>Remove City</p>
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
      `https://api.openweathermap.org/data/2.5/weather?lat=${route.query.lat}&lon=${route.query.lon}&appid=7efa332cf48aeb9d2d391a51027f1a71&units=metric`,
    )

    const data = weatherData.data

    // Tính giờ địa phương (local time) dựa vào dt + timezone
    const localOffset = new Date().getTimezoneOffset() * 60000 // ms
    const utc = data.dt * 1000 + localOffset // ms
    data.currentTime = new Date(utc + 1000 * data.timezone).toLocaleString()
    await new Promise((resolve) => setTimeout(resolve, 1000))
    return weatherData.data
  } catch (error) {
    console.error('Weather API error:', error)
  }
}

const weatherData = await getWeatherData()
</script>
