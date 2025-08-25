<template>
  <div class="container mx-auto max-w-4xl pt-8 min-h-[80vh]">
    <!-- Ô tìm kiếm -->
    <input
      type="text"
      class="w-full px-4 py-2 bg-transparent border-0 border-b-2 border-gray-300 focus:border-gray-500 focus:outline-none focus:ring-0 transition duration-200 ease-in-out placeholder-gray-400 text-gray-700 my-6"
      placeholder="Search for a city..."
      v-model="searchQuery"
      @input="getSearchResults"
    />

    <!-- Hiển thị kết quả -->
    <ul v-if="mapboxSearchResults.length" class="mt-4 border border-gray-200 rounded-lg shadow-sm">
      <li
        v-for="(result, index) in mapboxSearchResults"
        :key="index"
        class="px-4 py-2 cursor-pointer hover:bg-gray-100 transition"
        @click="preview(result)"
      >
        {{ result.place_name }}
      </li>
    </ul>
    <Suspense>
      <template #default>
        <MyCityCard />
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
import { ref, onBeforeUnmount, defineAsyncComponent } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'
import { notification } from 'ant-design-vue'

const MyCityCard = defineAsyncComponent({
  loader: () => import('@/components/MyCityCard.vue'),
  delay: 2000,
  timeout: 10000,
  onError(error, retry, fail, attempts) {
    if (attempts <= 3) {
      retry()
    } else {
      fail()
    }
  },
})

const ShowNotifyFailed = () => {
  notification.error({
    message: 'Error',
    description: 'Load weather data failed',
  })
}

const queryTimeOut = ref(null)
const searchQuery = ref('')
const mapboxSearchResults = ref([])
const router = useRouter()

const preview = (search) => {
  const [city, state] = search.place_name.split(',').map((s) => s.trim())
  router.push({
    name: 'CityView',
    params: { city, state },
    query: {
      lat: search.geometry.coordinates[1],
      lon: search.geometry.coordinates[0],
      preview: true,
    },
  })
}

const getSearchResults = () => {
  clearTimeout(queryTimeOut.value)

  if (searchQuery.value.trim() !== '') {
    queryTimeOut.value = setTimeout(async () => {
      try {
        const results = await axios.get(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
            searchQuery.value,
          )}.json?access_token=pk.eyJ1Ijoia2hhbmhuZ3V5ZW52aW1hcnUiLCJhIjoiY21lbWo3dnc0MHJ6bjJqb29lN3l4cHR2ZSJ9.Ip3M8PL5PAWgV2iSqnl_qw&types=place`,
        )
        mapboxSearchResults.value = results.data.features
      } catch (error) {
        console.error('Mapbox API error:', error)
        mapboxSearchResults.value = []
        ShowNotifyFailed()
      }
    }, 200)
  } else {
    mapboxSearchResults.value = []
  }
}

onBeforeUnmount(() => {
  if (queryTimeOut.value) clearTimeout(queryTimeOut.value)
})
</script>
