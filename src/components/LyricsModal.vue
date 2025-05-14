<template>
  <div
    v-if="show"
    class="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
  >
    <div class="bg-spotify-gray p-8 rounded-lg w-full max-w-lg relative">
      <button
        class="absolute top-2 right-2 text-spotify-light-gray hover:text-white"
        @click="$emit('close')"
      >
        &times;
      </button>
      <h2 class="text-2xl font-bold mb-4">Letra da Música</h2>
      <pre class="whitespace-pre-wrap text-white text-base">{{ lyrics }}</pre>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  show: Boolean,
  lyrics: {
    type: String,
    default: 'Letra não disponível para esta música.'
  }
})
</script>
