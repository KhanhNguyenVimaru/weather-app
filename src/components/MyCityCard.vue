<template>
  <h2 class="mt-6 ml-7 text-lg">The weather at your place</h2>

  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6 pt-4" v-if="weatherData">
    <!-- Card 1: Location & Weather -->
    <div
      class="bg-white text-black border-2 border-gray-300 rounded-xl p-5 transition duration-300 hover:shadow-lg hover:border-gray-500 hover:scale-105"
    >
      <p v-if="weatherData">
        <span class="font-semibold text-lg"
          >{{ weatherData.name }}, {{ weatherData.sys.country }}</span
        >
      </p>
      <p>Main: {{ weatherData?.weather[0]?.main }}</p>
      <p>Description: {{ weatherData?.weather[0]?.description }}</p>
    </div>

    <!-- Card 2: Temperature -->
    <div
      class="bg-white text-black border-2 border-gray-300 rounded-xl p-5 transition duration-300 hover:shadow-lg hover:border-gray-500 hover:scale-105"
    >
      <h2 class="text-lg font-bold mb-3">Temperature</h2>
      <p>
        Current: <span class="font-semibold">{{ weatherData?.main.temp }}°C</span>
      </p>
      <p>Feels Like: {{ weatherData?.main.feels_like }}°C</p>
      <p>Min: {{ weatherData?.main.temp_min }}°C • Max: {{ weatherData?.main.temp_max }}°C</p>
    </div>

    <!-- Card 3: Wind -->
    <div
      class="bg-white text-black border-2 border-gray-300 rounded-xl p-5 transition duration-300 hover:shadow-lg hover:border-gray-500 hover:scale-105"
    >
      <h2 class="text-lg font-bold mb-3">Wind</h2>
      <p>Speed: {{ weatherData?.wind.speed }} m/s</p>
      <p>Direction: {{ weatherData?.wind.deg }}°</p>
      <p>Gust: {{ weatherData?.wind.gust }} m/s</p>
    </div>

    <!-- Card 4: Atmosphere -->
    <div
      class="bg-white text-black border-2 border-gray-300 rounded-xl p-5 transition duration-300 hover:shadow-lg hover:border-gray-500 hover:scale-105"
    >
      <h2 class="text-lg font-bold mb-3">Atmosphere</h2>
      <p>Pressure: {{ weatherData?.main.pressure }} hPa</p>
      <p>Humidity: {{ weatherData?.main.humidity }}%</p>
      <p>Clouds: {{ weatherData?.clouds.all }}%</p>
      <p>Visibility: {{ weatherData?.visibility / 1000 }} km</p>
    </div>

    <!-- Card 5: Sunrise & Sunset -->
    <div
      class="bg-white text-black border-2 border-gray-300 rounded-xl p-5 transition duration-300 hover:shadow-lg hover:border-gray-500 hover:scale-105"
    >
      <h2 class="text-lg font-bold mb-3">Sun</h2>
      <p>Sunrise: {{ formatTime(weatherData?.sys.sunrise) }}</p>
      <p>Sunset: {{ formatTime(weatherData?.sys.sunset) }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'

const weatherData = ref(null)

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(
    async (position) => {
      const lat = position.coords.latitude
      const lon = position.coords.longitude

      console.log('Vĩ độ:', lat)
      console.log('Kinh độ:', lon)

      try {
        // Gọi API OpenWeather theo vị trí thực
        const res = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=7efa332cf48aeb9d2d391a51027f1a71&units=metric`,
        )
        weatherData.value = res.data
      } catch (err) {
        console.error('Lỗi khi gọi API thời tiết:', err)
      }
    },
    (error) => {
      console.error('Lỗi khi lấy vị trí:', error)
    },
  )
} else {
  console.log('Trình duyệt không hỗ trợ Geolocation')
}

function formatTime(unix) {
  if (!unix) return ''
  const date = new Date(unix * 1000)
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}
</script>
