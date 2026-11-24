<script setup>
defineProps({ item: { type: Object, required: true } })
</script>

<template>
  <section class="card card-body mt-4">
    <h2>{{ item.title }}</h2>
    <p class="text-muted mb-2">Szerző: {{ item.author }}</p>
    <p v-if="item.description">{{ item.description }}</p>
  </section>
</template>
