<template>
  <header class="sticky top-0 shadow-md flex justify-center items-center px-4 bg-white z-10">
    <nav
      class="container flex flex-col sm:flex-row items-center gap-4 text-white py-4 justify-between max-w-4xl"
    >
      <RouterLink :to="{ name: 'home' }" class="flex items-center gap-3 flex-1 text-lg text-black">
        <i class="bi bi-cloud-sun text-xl"></i>
        The Local Weather
      </RouterLink>

      <div class="flex gap-3">
        <i
          class="bi bi-info-circle text-lg cursor-pointer text-black hover:text-blue-600 transition-colors duration-200"
          @click="toggleModal"
        ></i>

        <i
          class="bi bi-bookmark-plus text-lg cursor-pointer text-black hover:text-blue-600 transition-colors duration-200"
          @click="addCity"
        ></i>
        <i
          class="bi bi-bookmark-dash text-lg cursor-pointer text-black hover:text-blue-600 transition-colors duration-200"
          @click="$router.push('/saved-cities')"
        ></i>
        <i
          class="bi bi-bookmark-x text-lg cursor-pointer text-black hover:text-red-600 transition-colors duration-200"
          @click="deleteStorage"
        >
        </i>
      </div>

      <BaseModal :modalActive="modalActive" @close-modal="toggleModal">
        <div class="text-black">
          <h1 class="text-md mb-1 font-bold">About:</h1>
          <p class="mb-4 text-gray-600">
            The Local Weather allows you to track the current and future weather of cities of your
            choosing.
          </p>
          <h1 class="text-md font-bold">How it works:</h1>
          <ol class="list-decimal list-inside mb-4">
            <li class="text-gray-600">
              Search for your city by entering the name into the search bar.
            </li>
            <li class="text-gray-600">
              Select a city within the results, this will take you to the current weather for your
              selection.
            </li>
            <li class="text-gray-600">
              Track the city by clicking on the <i class="bi bi-bookmark-plus"></i> icon in the top
              right. This will save the city to view at a later time on the home page.
            </li>
            <li class="text-gray-600">
              To check all cities you are tracking, click the
              <i class="bi bi-bookmark-dash"></i> icon in the top right.
            </li>
          </ol>

          <h1 class="text-md font-bold">Removing all cities</h1>
          <p class="text-gray-600">
            If you wish to remove all saved cities, you can click
            <i class="bi bi-bookmark-x"></i> to clear your browser's local storage. This will delete
            all saved city data.
          </p>
        </div>
      </BaseModal>
    </nav>
  </header>
</template>

<script setup>
import { RouterLink, useRoute, useRouter } from 'vue-router'
import { uid } from 'uid'
import { ref } from 'vue'
import BaseModal from './BaseModal.vue'
import { notification } from 'ant-design-vue'
const savedCities = ref([])
const route = useRoute()
const router = useRouter()

const addCity = () => {
  // load lại storage cũ
  if (localStorage.getItem('savedCities')) {
    savedCities.value = JSON.parse(localStorage.getItem('savedCities'))
  }

  const lat = route.query.lat
  const lon = route.query.lon

  // nếu lat hoặc lon không tồn tại thì báo lỗi
  if (!lat || !lon) {
    notification.error({
      message: 'Save failed',
      description: 'Could not find valid coordinates (lat/lon) to save.',
    })
    return
  }

  // kiểm tra city trùng
  const exists = savedCities.value.some(
    (c) => c.city === route.params.city && c.state === route.params.state,
  )
  if (exists) {
    notification.warning({
      message: 'Notification',
      description: 'This city is already in the list.',
    })
    return
  }

  const locationObj = {
    id: uid(),
    state: route.params.state,
    city: route.params.city,
    coords: {
      lat,
      lon,
    },
  }

  savedCities.value.push(locationObj)
  localStorage.setItem('savedCities', JSON.stringify(savedCities.value))

  notification.success({
    message: 'Save successful',
    description: `Saved ${route.params.city}, ${route.params.state} to the list.`,
  })

  // update query trên URL
  let query = { ...route.query }
  delete query.preview
  query.id = locationObj.id
  router.replace({ query })
}

const modalActive = ref(null)
const toggleModal = () => {
  modalActive.value = !modalActive.value
}

const deleteStorage = () => {
  localStorage.clear()
  notification.info({
    message: 'Delete successful',
    description: 'All city data has been deleted.',
  })
  location.reload()
}
</script>

<style lang="scss" scoped>
li {
  margin-bottom: 8px;
}
</style>
