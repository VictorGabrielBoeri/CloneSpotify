<template>
  <div class="space-y-8">
    <!-- Playlist Header -->
    <div v-if="playlist" class="flex items-end space-x-6">
      <img
        :src="playlist.image || 'https://via.placeholder.com/160'"
        :alt="playlist.name"
        class="w-48 h-48 rounded-lg shadow-2xl"
      />
      <div>
        <h1 class="text-4xl font-bold mb-2">{{ playlist.name }}</h1>
        <p class="text-spotify-light-gray">{{ playlist.description }}</p>
        <div class="flex space-x-2 mt-2">
          <button class="btn btn-secondary" @click="exportPlaylist">
            Exportar JSON
          </button>
          <button class="btn btn-secondary" @click="copyShareLink">
            Compartilhar
          </button>
        </div>
      </div>
    </div>

    <!-- Tracks -->
    <section v-if="playlist?.tracks?.length">
      <TrackList
        v-model:tracks="playlist.tracks"
        :show-remove="true"
        @remove="removeTrack"
        @play="store.play"
      />
    </section>

    <!-- Empty State -->
    <div v-else class="text-center py-12">
      <p class="text-spotify-light-gray mb-4">Esta playlist está vazia</p>
      <button class="btn btn-primary" @click="goToSearch">
        Adicionar Músicas
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import TrackList from '../components/TrackList.vue'

const route = useRoute()
const router = useRouter()

const playlist = ref(null)

onMounted(() => {
  const playlistId = parseInt(route.params.id)
  const savedPlaylists = localStorage.getItem('playlists')
  if (savedPlaylists) {
    const playlists = JSON.parse(savedPlaylists)
    playlist.value = playlists.find(p => p.id === playlistId)
  }
})

watch(
  () => playlist.value?.tracks,
  () => {
    updatePlaylist()
  },
  { deep: true }
)

function removeTrack(trackId) {
  playlist.value.tracks = playlist.value.tracks.filter(
    track => track.id !== trackId
  )
  updatePlaylist()
}

function updatePlaylist() {
  const savedPlaylists = JSON.parse(localStorage.getItem('playlists'))
  const index = savedPlaylists.findIndex(p => p.id === playlist.value.id)
  savedPlaylists[index] = playlist.value
  localStorage.setItem('playlists', JSON.stringify(savedPlaylists))
}

function goToSearch() {
  router.push('/search')
}

function exportPlaylist() {
  const dataStr =
    'data:text/json;charset=utf-8,' +
    encodeURIComponent(JSON.stringify(playlist.value, null, 2))
  const dlAnchorElem = document.createElement('a')
  dlAnchorElem.setAttribute('href', dataStr)
  dlAnchorElem.setAttribute('download', `${playlist.value.name}.json`)
  dlAnchorElem.click()
}

function copyShareLink() {
  const url = `${window.location.origin}/playlist/${playlist.value.id}`
  navigator.clipboard.writeText(url)
  alert('Link copiado para a área de transferência!')
}
</script>
