<template>
  <div
    class="container mx-auto max-w-4xl min-h-[80vh]"
    style="margin-top: 30px; margin-bottom: 100px"
  >
    <div v-for="city in savedCities" :key="city.id" :id="`city-${city.id}`">
      <CityCard :city="city" @click="goToCityView(city)" />
    </div>

    <p v-if="savedCities.length === 0" class="m-8 mt-8 text-center" style="margin-top: 2rem">
      No locations added. To start tracking a location, search in the field above.
    </p>
  </div>
</template>

<script setup>
import axios from 'axios'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import CityCard from './CityCard.vue'

const API_KEY = '19af39af5484e0dda5f33053e3c0a1c6'
const savedCities = ref([])

const getCities = async () => {
  if (localStorage.getItem('savedCities')) {
    savedCities.value = JSON.parse(localStorage.getItem('savedCities'))

    const requests = []
    savedCities.value.forEach((city) => {
      // chỉ gọi API khi city có đủ lat & lng
      if (city.coords?.lat && city.coords?.lng) {
        requests.push(
          axios.get('https://api.openweathermap.org/data/2.5/weather', {
            params: {
              lat: city.coords.lat,
              lon: city.coords.lon, // API yêu cầu "lon", storage lưu "lng"
              appid: API_KEY,
              units: 'metric',
              lang: 'en',
            },
          }),
        )
      }
    })

    // gọi song song tất cả requests
    const weatherData = await Promise.all(requests)

    // gắn weather data vào từng city
    let i = 0
    savedCities.value.forEach((city) => {
      if (city.coords?.lat && city.coords?.lng) {
        city.weather = weatherData[i].data
        i++
      }
    })
  }
}
await getCities()

const router = useRouter()
const goToCityView = (city) => {
  router.push({
    name: 'cityView',
    params: { state: city.state, city: city.city },
    query: {
      lat: city.coords.lat,
      lng: city.coords.lng,
    },
  })
}
</script>
