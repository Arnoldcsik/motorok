<script setup>
import { computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useItemStore } from '../stores/itemStore'

const route = useRoute()
const id = route.params.id

const itemStore = useItemStore()

onMounted(() => {
  if (itemStore.items.length === 0) {
    itemStore.loadItems()
  }
})

const item = computed(() => itemStore.findById(id))

// Értékelés kiszámítása (ha a JSON-ben nincs rating mező, alapértelmezetten 4.5)
const rating = computed(() => item.value?.rating || 4.5)
// A százalékos szélesség kiszámítása a Bootstrap progress bar-hoz (szorzás 20-szal, mert 5 a maximum)
const ratingPercentage = computed(() => rating.value * 20)

// Az ISBN szám kinyerése a borítókép URL-jéből (opcionális, ha nincs külön ISBN mező a JSON-ben)
const isbn = computed(() => {
  if (!item.value?.cover) return '0061122416'
  const match = item.value.cover.match(/isbn\/([0-9X]+)-M/)
  return match ? match[1] : '0061122416'
})
</script>

<template>
  <div v-if="itemStore.loading" class="text-center p-5">
    <div class="spinner-border text-primary" role="status"></div>
    <p class="mt-2">Motor adatainak betöltése...</p>
  </div>

  <div v-else-if="itemStore.error" class="alert alert-danger mt-4" role="alert">
    {{ itemStore.error }}
  </div>

  <section v-else-if="item" class="card card-body mt-4 shadow border-0">
    <div class="row g-4 p-2">
      <!-- Bal oldal: Borítókép -->
      <div class="col-md-3 text-center">
        <img v-if="item.image" :src="item.image" :alt="item.title" class="img-fluid rounded shadow-sm w-100" style="max-height: 380px; object-fit: contain;" />
      </div>
      
      <!-- Jobb oldal: Motorok adatai és Értékelés sáv -->
      <div class="col-md-9 d-flex flex-column justify-content-between">
        <div>
          <h1 class="display-6 fw-normal mb-1">{{ item.brand }}</h1>
          <p class="fs-5 text-muted mb-4">{{ item.model }}</p>
          
          <!-- Motor adatai táblázatszerű blokk -->
          <div class="card mb-4 bg-light border-light-subtle">
            <div class="card-header bg-transparent py-2 border-0 text-muted small">Motor adatai</div>
            <div class="card-body py-2 border-top border-light-subtle">
              <div class="row">
                <div class="col-sm-6 mb-2 mb-sm-0">
                  <strong>Azonosító:</strong> {{ item.id }}
                </div>
                <div class="col-sm-6">
                  <strong>Engine:</strong> {{ item.engine }}
                </div>
                <div class="col-sm-6">
                  <strong>Évjárat:</strong> {{ item.year }}
                </div>
                <div class="col-sm-6">
                  <strong>Típus:</strong> {{ item.type}}
                </div>
              </div>
            </div>
          </div>

          <!-- Leírás -->
          <h4 class="h5 fw-bold mb-2">Leírás</h4>
          <p class="text-secondary lh-base mb-4 fs-6 text-justify">
            {{ item.description }}
          </p>

          <!-- Értékelések szekció (A kért csúszka / sáv) -->
          <h4 class="h5 fw-bold mb-2">Értékelések</h4>
          <div class="d-flex align-items-center mb-1">
            <span class="fw-bold me-3">{{ rating }}/5</span>
            
            <!-- Bootstrap állapotsáv (Progress Bar) -->
            <div class="progress flex-grow-1 bg-secondary-subtle rounded-1" style="height: 24px;">
              <div 
                class="progress-bar bg-success d-flex align-items-center justify-content-center text-white small" 
                role="progressbar" 
                :style="{ width: ratingPercentage + '%' }" 
                :aria-valuenow="rating" 
                aria-valuemin="0" 
                aria-valuemax="5"
              >
                {{ rating }}/5
              </div>
            </div>
          </div>
          <p class="text-muted small mb-4">Több mint 10 millió olvasó értékelése alapján</p>
        </div>

        <!-- Akció gombok alul -->
        <div class="d-flex gap-2 pt-3 border-top border-light-subtle">
          <RouterLink to="/motors" class="btn btn-secondary px-4">
            Vissza a Motorokhoz
          </RouterLink>
          
        </div>
      </div>
    </div>
  </section>

  <div v-else class="alert alert-warning mt-4 text-center">
    A keresett motor nem található (ID: {{ id }}).
  </div>
</template>
