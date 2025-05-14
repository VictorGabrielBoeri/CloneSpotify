<template>
  <div class="space-y-8">
    <!-- Library Header -->
    <div class="flex items-center justify-between">
      <h1 class="text-2xl font-bold">Sua Biblioteca</h1>
      <button class="btn btn-primary" @click="showCreatePlaylistModal = true">
        Criar Playlist
      </button>
    </div>

    <!-- Playlists -->
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      <div
        v-for="playlist in playlists"
        :key="playlist.id"
        class="bg-spotify-gray p-4 rounded-lg hover:bg-opacity-80 transition-all cursor-pointer flex flex-col items-center"
        @click="goToPlaylist(playlist.id)"
      >
        <img
          :src="playlist.image || 'https://placehold.co/160x160?text=No+Image'"
          :alt="playlist.name"
          class="w-full aspect-square rounded-lg shadow-lg mb-4 object-cover"
        />
        <h3 class="font-medium text-center w-full truncate">{{ playlist.name }}</h3>
        <p class="text-sm text-spotify-light-gray text-center w-full truncate">{{ playlist.description }}</p>
      </div>
    </div>

    <!-- Create Playlist Modal -->
    <div
      v-if="showCreatePlaylistModal"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 px-2"
      @click="showCreatePlaylistModal = false"
    >
      <div class="bg-spotify-gray p-6 rounded-xl w-full max-w-md shadow-2xl relative animate-fadeIn mx-2" @click.stop>
        <button class="absolute top-3 right-3 text-spotify-light-gray hover:text-white text-2xl" @click="showCreatePlaylistModal = false">&times;</button>
        <h2 class="text-2xl font-bold mb-6 text-center">Criar Playlist</h2>
        <form @submit.prevent="createPlaylist" class="space-y-4">
          <div>
            <label class="block text-sm font-medium mb-1">Nome da Playlist</label>
            <input
              v-model="newPlaylist.name"
              type="text"
              class="w-full bg-white bg-opacity-10 rounded-lg px-4 py-2 text-white focus:outline-none focus:bg-opacity-20 border border-transparent focus:border-spotify-green transition"
              required
              maxlength="40"
              placeholder="Ex: Minhas Favoritas"
            />
          </div>
          <div>
            <label class="block text-sm font-medium mb-1">Descrição</label>
            <textarea
              v-model="newPlaylist.description"
              class="w-full bg-white bg-opacity-10 rounded-lg px-4 py-2 text-white focus:outline-none focus:bg-opacity-20 border border-transparent focus:border-spotify-green transition"
              rows="3"
              maxlength="120"
              placeholder="Sobre o que é essa playlist?"
            ></textarea>
          </div>
          <div>
            <label class="block text-sm font-medium mb-1">Capa da Playlist</label>
            <input
              type="file"
              accept="image/*"
              @change="handleImageUpload"
              class="w-full text-white"
            />
            <div v-if="newPlaylist.image" class="mt-2 flex justify-center">
              <img :src="newPlaylist.image" alt="Capa" class="w-24 h-24 rounded-lg object-cover" />
            </div>
          </div>
          <div class="flex justify-end space-x-2 mt-4">
            <button
              type="button"
              class="px-4 py-2 rounded-lg bg-spotify-light-gray text-black font-semibold hover:bg-white transition"
              @click="showCreatePlaylistModal = false"
            >
              Cancelar
            </button>
            <button type="submit" class="px-4 py-2 rounded-lg bg-spotify-green text-white font-semibold hover:bg-green-600 transition">Criar</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const playlists = ref([])
const showCreatePlaylistModal = ref(false)
const newPlaylist = ref({
  name: '',
  description: '',
})

onMounted(() => {
  // Carregar playlists do localStorage
  const savedPlaylists = localStorage.getItem('playlists')
  if (savedPlaylists) {
    playlists.value = JSON.parse(savedPlaylists)
  }
})

function createPlaylist() {
  const playlist = {
    id: Date.now(),
    name: newPlaylist.value.name,
    description: newPlaylist.value.description,
    tracks: [],
  }

  playlists.value.push(playlist)
  localStorage.setItem('playlists', JSON.stringify(playlists.value))
  showCreatePlaylistModal.value = false
  newPlaylist.value = { name: '', description: '' }
}

function goToPlaylist(id) {
  router.push(`/playlist/${id}`)
}

function handleImageUpload(event) {
  const file = event.target.files[0]
  if (!file) return
  const reader = new FileReader()
  reader.onload = e => {
    newPlaylist.value.image = e.target.result
  }
  reader.readAsDataURL(file)
}
</script>

<style scoped>
@media (max-width: 640px) {
  .bg-spotify-gray {
    padding: 1rem !important;
  }
  .rounded-xl {
    border-radius: 1rem !important;
  }
}
@keyframes fadeIn {
  from { opacity: 0; transform: scale(0.95); }
  to { opacity: 1; transform: scale(1); }
}
.animate-fadeIn {
  animation: fadeIn 0.2s ease;
}
</style>
