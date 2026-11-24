import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ItemsView from '../views/ItemsView.vue'
import ItemDetailsView from '../views/ItemDetailsView.vue' // Az új részletek oldal

export default createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'home', component: HomeView },
    { path: '/motors', name: 'items', component: ItemsView },
    {
      path: '/motors/:id', // Dinamikus ID paraméter a külön laphoz
      component: ItemDetailsView,
      // Ha a komponenst propként akarod átadni az elemnek, használhatod a props: true-t is
    }
  ]
})
