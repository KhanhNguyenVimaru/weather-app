<template>
  <div
    ref="cardRef"
    class="flex py-6 px-3 bg-white cursor-pointer border border-gray-300 p-5 transition duration-300 hover:shadow-lg hover:border-gray-500 hover:scale-101 pr-0 pl-5"
    style="margin-top: 1rem"
    @click="showWeatherView(city)"
  >
    <div class="flex flex-col flex-1">
      <h2 class="text-3xl font-bold">{{ city.city }}</h2>
      <h3 class="text-gray-600">{{ city.state }}</h3>
    </div>

    <div v-if="weatherData" class="flex flex-col gap-2">
      <p class="text-3xl self-end font-semibold mb-4">{{ Math.round(weatherData.main.temp) }}°C</p>
      <div class="flex gap-2 text-gray-500">
        <span class="text-xs">H: {{ Math.round(weatherData.main.temp_max) }}°C</span>
        <span class="text-xs">L: {{ Math.round(weatherData.main.temp_min) }}°C</span>
      </div>
    </div>
    <div v-else class="flex items-center text-sm text-gray-400">Loading...</div>

    <!-- Icon + Dropdown -->
    <div class="relative p-3 pt-0 pr-1">
      <i
        class="bi bi-three-dots-vertical cursor-pointer"
        id="dot-icon"
        @click.stop.prevent="toggleDropdown"
      ></i>

      <!-- Dropdown -->
      <div
        v-if="showDropdown"
        class="absolute right-0 w-28 bg-white border border-gray-200 rounded-lg shadow-lg z-10"
      >
        <ul class="text-sm text-gray-700 mb-0" style="margin-bottom: 0 !important">
          <li
            class="px-4 py-2 hover:bg-gray-100 cursor-pointer text-red-600"
            @click.stop.prevent="deleteItem(city.id)"
          >
            Delete
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'
import { notification } from 'ant-design-vue'

const router = useRouter()
const props = defineProps({
  city: {
    type: Object,
    required: true,
  },
})

const weatherData = ref(null)
const showDropdown = ref(false)
const cardRef = ref(null) // <-- reference to the card div

const showWeatherView = (city) => {
  router.push({
    name: 'CityView',
    params: { city: city.city, state: city.state },
    query: {
      lat: city.coords.lat,
      lon: city.coords.lon,
      preview: true,
    },
  })
}

const toggleDropdown = () => {
  showDropdown.value = !showDropdown.value
}

const handleClickOutside = (e) => {
  if (!e.target.closest('.relative')) {
    showDropdown.value = false
  }
}

const deleteItem = (id) => {
  const savedCities = JSON.parse(localStorage.getItem('savedCities')) || []
  const city = savedCities.find((item) => item.id === id)

  if (!city) return

  const updatedCities = savedCities.filter((item) => item.id !== id)
  localStorage.setItem('savedCities', JSON.stringify(updatedCities))

  // Hide this card via ref
  if (cardRef.value) {
    cardRef.value.style.display = 'none'
  }

  showDropdown.value = false

  notification.success({
    message: 'Success',
    description: `City "${city.city}" has been removed from favorites.`,
  })
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)

  const apiKey = '19af39af5484e0dda5f33053e3c0a1c6'
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${props.city.coords.lat}&lon=${props.city.coords.lon}&appid=${apiKey}&units=metric`
  axios.get(url).then((res) => {
    weatherData.value = res.data
  })
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>
