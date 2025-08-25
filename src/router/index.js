import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CityView from '@/views/CityView.vue'
import SavedCitiesView from '@/views/SavedCitiesView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: { title: 'Home' },
    },
    {
      path: '/weather/:state/:city',
      name: 'CityView',
      component: CityView,
    },
    {
      path: '/saved-cities',
      name: 'SavedCities',
      component: SavedCitiesView,
      meta: { title: 'Saved Cities' },
    },
  ],
})

export default router
