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
          class="bi bi-plus-square text-lg cursor-pointer text-black hover:text-blue-600 transition-colors duration-200"
          @click="addCity"
        ></i>
        <i
          class="bi bi-bookmark text-lg cursor-pointer text-black hover:text-blue-600 transition-colors duration-200"
          @click="$router.push('/saved-cities')"
        ></i>
        <i
          class="bi bi-x-square text-lg cursor-pointer text-black hover:text-red-600 transition-colors duration-200"
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
              Track the city by clicking on the "+" icon in the top right. This will save the city
              to view at a later time on the home page.
            </li>
          </ol>

          <h1 class="text-md font-bold">Removing a city</h1>
          <p class="text-gray-600">
            If you no longer wish to track a city, simply select the city within the home page. At
            the bottom of the page, there will be am option to delete the city.
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
      message: 'Lưu thất bại',
      description: 'Không tìm thấy tọa độ (lat/lon) hợp lệ để lưu.',
    })
    return
  }

  // kiểm tra city trùng
  const exists = savedCities.value.some(
    (c) => c.city === route.params.city && c.state === route.params.state,
  )
  if (exists) {
    notification.warning({
      message: 'Thông báo',
      description: 'Thành phố này đã có trong danh sách.',
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
    message: 'Lưu thành công',
    description: `Đã lưu ${route.params.city}, ${route.params.state} vào danh sách.`,
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
    message: 'Xóa thành công',
    description: 'Toàn bộ danh sách thành phố đã được xóa.',
  })
  location.reload()
}
</script>

<style lang="scss" scoped></style>
