<script setup>
import { onMounted } from 'vue'
import { useItemStore } from '../stores/itemStore'
import ItemCard from '../components/ItemCard.vue'

const store = useItemStore()

onMounted(store.loadItems)

function showDetails(itemId) {
  console.log(itemId) // a feladat ezt kéri
}
</script>

<template>
  <h1>Motoraink</h1>

  <p v-if="store.loading">Betöltés...</p>
  <p v-if="store.error" class="text-danger">{{ store.error }}</p>

  <div class="row g-4">
    <div v-for="item in store.items" :key="item.id" class="col-sm-6 col-md-4 col-lg-3">
      <ItemCard :item="item" @details="showDetails" />
    </div>
  </div>
</template>
