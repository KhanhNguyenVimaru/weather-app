<template>
  <div class="container mx-auto max-w-4xl pt-8">
    <!-- Ô tìm kiếm -->
    <input
      type="text"
      class="w-full px-4 py-2 bg-transparent border-0 border-b-2 border-gray-300 focus:border-gray-500 focus:outline-none focus:ring-0 transition duration-200 ease-in-out placeholder-gray-400 text-gray-700"
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
      >
        {{ result.place_name }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onBeforeUnmount } from 'vue'
import axios from 'axios'

const queryTimeOut = ref(null)
const searchQuery = ref('')
const mapboxSearchResults = ref([])

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
      }
    }, 300)
  } else {
    mapboxSearchResults.value = []
  }
}

// clear timeout khi component unmount
onBeforeUnmount(() => {
  if (queryTimeOut.value) clearTimeout(queryTimeOut.value)
})
</script>

<style scoped lang="scss"></style>
