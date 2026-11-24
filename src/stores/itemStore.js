import { defineStore } from 'pinia'
import { ref } from 'vue'

// Az API címe közvetlenül itt van megadva (nincs .env és config.js).
// Ha más a szerver címe vagy az erőforrás neve, csak ezt a sort kell átírni.
const API_URL = 'http://localhost:3000/motorcycles'

export const useItemStore = defineStore('items', () => {
  const items = ref([])
  const loading = ref(false)
  const error = ref('')

  async function loadItems() {
    loading.value = true
    error.value = ''
    try {
      const response = await fetch(API_URL)
      if (!response.ok) throw new Error('HTTP ' + response.status)
      items.value = await response.json()
    } catch (e) {
      error.value = 'Az adatok betöltése nem sikerült: ' + e.message
    } finally {
      loading.value = false
    }
  }

  // Szám és szöveges azonosítóval is működik (String összehasonlítás).
  function findById(id) {
    return items.value.find((item) => String(item.id) === String(id)) ?? null
  }

  return { items, loading, error, loadItems, findById }
})
