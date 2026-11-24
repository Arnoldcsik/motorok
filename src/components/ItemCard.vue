<script setup>
import { computed } from 'vue'

const props = defineProps({
  item: { type: Object, required: true }
})

const emit = defineEmits(['details'])

// Közvetlen, tiszta hivatkozások a JSON struktúrára
const id = computed(() => props.item.id)
const brand = computed(() => props.item.brand)

const image = computed(() => props.item.image)
</script>

<template>
  <div class="card h-100 shadow-sm">
    <!-- Motorok borítóképe a JSON-ből -->
    <img v-if="image" :src="image" :alt="title" class="card-img-top object-fit-cover" style="height: 250px;" />
    <div v-else class="bg-secondary-subtle text-center p-5 text-muted">Nincs borítókép</div>

    <div class="card-body d-flex flex-column">
      <!-- Cím és Szerző -->
      <h5 class="card-title mb-1">{{ brand }}</h5>
      

      <!-- Navigáció a külön részletek lapra; kattintáskor a szülő is értesül -->
      <RouterLink :to="'/motors/' + id" class="btn btn-primary mt-auto w-100" @click="emit('details', id)">
        Részletek
      </RouterLink>
    </div>
  </div>
</template>
