<template>
  <header class="sticky top-0 bg-white shadow-md flex justify-center items-center">
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
          class="bi bi-plus text-lg cursor-pointer text-black hover:text-blue-600 transition-colors duration-200"
        ></i>
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
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import BaseModal from './BaseModal.vue'

const modalActive = ref(false)

const toggleModal = () => {
  modalActive.value = !modalActive.value
}
</script>

<style lang="scss" scoped></style>
