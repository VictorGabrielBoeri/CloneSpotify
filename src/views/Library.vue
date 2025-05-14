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
    <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      <div
        v-for="playlist in playlists"
        :key="playlist.id"
        class="bg-spotify-gray p-4 rounded-lg hover:bg-opacity-80 transition-all cursor-pointer"
        @click="goToPlaylist(playlist.id)"
      >
        <img
          :src="playlist.image || 'https://via.placeholder.com/160'"
          :alt="playlist.name"
          class="w-full aspect-square rounded-lg shadow-lg mb-4"
        />
        <h3 class="font-medium">{{ playlist.name }}</h3>
        <p class="text-sm text-spotify-light-gray">{{ playlist.description }}</p>
      </div>
    </div>

    <!-- Create Playlist Modal -->
    <div
      v-if="showCreatePlaylistModal"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
      @click="showCreatePlaylistModal = false"
    >
      <div class="bg-spotify-gray p-6 rounded-lg w-full max-w-md" @click.stop>
        <h2 class="text-xl font-bold mb-4">Criar Playlist</h2>
        <form @submit.prevent="createPlaylist">
          <div class="mb-4">
            <label class="block text-sm font-medium mb-2">Nome da Playlist</label>
            <input
              v-model="newPlaylist.name"
              type="text"
              class="w-full bg-white bg-opacity-10 rounded px-3 py-2 text-white focus:outline-none focus:bg-opacity-20"
              required
            />
          </div>
          <div class="mb-4">
            <label class="block text-sm font-medium mb-2">Descrição</label>
            <textarea
              v-model="newPlaylist.description"
              class="w-full bg-white bg-opacity-10 rounded px-3 py-2 text-white focus:outline-none focus:bg-opacity-20"
              rows="3"
            ></textarea>
          </div>
          <div class="flex justify-end space-x-2">
            <button
              type="button"
              class="btn btn-secondary"
              @click="showCreatePlaylistModal = false"
            >
              Cancelar
            </button>
            <button type="submit" class="btn btn-primary">Criar</button>
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
</script>
