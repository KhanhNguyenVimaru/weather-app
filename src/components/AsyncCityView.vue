<template>
  <div
    v-if="weatherData"
    class="flex flex-col flex-1 items-center w-full bg-no-repeat bg-top pb-12"
    style="background-color: #283762"
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
          new Date(weatherData.current.dt * 1000).toLocaleDateString('en-us', {
            weekday: 'short',
            day: '2-digit',
            month: 'long',
          })
        }}
        {{
          new Date(weatherData.current.dt * 1000).toLocaleTimeString('en-us', {
            timeStyle: 'short',
          })
        }}
      </p>

      <p class="mb-8 text-gray-50" style="font-size: 84px">
        {{ Math.round(weatherData.current.temp) }}&deg;
      </p>
      <p class="text-gray-50">Feels like {{ Math.round(weatherData.current.feels_like) }}&deg;</p>
      <p class="capitalize text-gray-50">
        {{ weatherData.current.weather[0].description }}
      </p>
      <img
        class="w-[100px] h-auto"
        :src="`http://openweathermap.org/img/wn/${weatherData.current.weather[0].icon}@2x.png`"
        alt="weather icon"
      />

      <div class="mt-8 text-center">
        <p>Humidity: {{ weatherData.current.humidity }}%</p>
        <p>Wind: {{ weatherData.current.wind_speed }} m/s</p>
      </div>
    </div>

    <!-- Hourly Weather -->
    <div v-if="weatherData" class="max-w-screen-md w-full py-12">
      <div class="mx-8 text-white">
        <h2 class="mb-4">Hourly Weather</h2>
        <div class="flex gap-10 overflow-x-scroll hide-scrollbar">
          <div
            v-for="hourData in weatherData.hourly.slice(0, 12)"
            :key="hourData.dt"
            class="flex flex-col gap-4 items-center"
          >
            <p class="whitespace-nowrap text-md">
              {{
                new Date(hourData.dt * 1000).toLocaleTimeString('en-us', {
                  hour: 'numeric',
                })
              }}
            </p>
            <img
              class="w-auto h-[50px] object-cover"
              :src="`http://openweathermap.org/img/wn/${hourData.weather[0].icon}@2x.png`"
              alt=""
            />
            <p class="text-xl">{{ Math.round(hourData.temp) }}&deg;</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Weekly Weather -->
    <div v-if="weatherData" class="max-w-screen-md w-full py-12">
      <div class="mx-8 text-white">
        <h2 class="mb-4">7 Day Forecast</h2>
        <div v-for="day in weatherData.daily" :key="day.dt" class="flex items-center">
          <p class="flex-1">
            {{
              new Date(day.dt * 1000).toLocaleDateString('en-us', {
                weekday: 'long',
              })
            }}
          </p>
          <img
            class="w-[50px] h-[50px] object-cover"
            :src="`http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`"
            alt=""
          />
          <div class="flex gap-2 flex-1 justify-end">
            <p>H: {{ Math.round(day.temp.max) }}</p>
            <p>L: {{ Math.round(day.temp.min) }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from 'axios'
import { useRoute } from 'vue-router'
import { ref, onMounted } from 'vue'

const route = useRoute()

const weatherData = ref(null)
const loading = ref(true)
const errorMsg = ref(null)

const API_KEY = '19af39af5484e0dda5f33053e3c0a1c6' // thay bằng key Pro của bạn

const getWeatherData = async () => {
  try {
    const res = await axios.get('https://pro.openweathermap.org/data/2.5/forecast/hourly', {
      params: {
        lat: route.query.lat,
        lon: route.query.lon,
        appid: API_KEY,
        units: 'metric',
        lang: 'en',
      },
    })

    const data = res.data

    // current (giờ gần nhất)
    const first = data.list[0]
    const current = {
      dt: first.dt,
      temp: first.main.temp,
      feels_like: first.main.feels_like,
      humidity: first.main.humidity,
      wind_speed: first.wind.speed,
      weather: first.weather,
    }

    // hourly (chuẩn hóa cho 24h tới)
    const hourly = data.list.slice(0, 24).map((item) => ({
      dt: item.dt,
      temp: item.main.temp,
      weather: item.weather,
    }))

    // daily (nhóm theo ngày)
    const dailyMap = {}
    data.list.forEach((item) => {
      const day = item.dt_txt.split(' ')[0]
      if (!dailyMap[day]) {
        dailyMap[day] = []
      }
      dailyMap[day].push(item)
    })

    const daily = Object.keys(dailyMap).map((day) => {
      const items = dailyMap[day]
      return {
        dt: items[0].dt,
        temp: {
          min: Math.min(...items.map((i) => i.main.temp_min)),
          max: Math.max(...items.map((i) => i.main.temp_max)),
        },
        weather: items[0].weather,
      }
    })

    return { current, hourly, daily, city: data.city }
  } catch (error) {
    console.error('Weather API error:', error)
    errorMsg.value = error.response?.data?.message || error.message
    return null
  }
}

onMounted(async () => {
  weatherData.value = await getWeatherData()
  loading.value = false
})
</script>
<style>
.hide-scrollbar {
  overflow-x: auto;
  -ms-overflow-style: none; /* IE, Edge */
  scrollbar-width: none; /* Firefox */
}

.hide-scrollbar::-webkit-scrollbar {
  display: none; /* Chrome, Safari */
}
</style>
