<template>
  <div class="space-y-8">
    <!-- Album Header -->
    <div v-if="album" class="flex items-end space-x-6">
      <img :src="album.cover_xl" :alt="album.title" class="w-48 h-48 rounded-lg shadow-2xl" />
      <div>
        <h1 class="text-4xl font-bold mb-2">{{ album.title }}</h1>
        <p class="text-spotify-light-gray">
          {{ album.artist.name }} • {{ album.release_date.split('-')[0] }} •
          {{ album.tracks.data.length }} músicas
        </p>
      </div>
    </div>

    <!-- Tracks -->
    <section v-if="album?.tracks?.data?.length">
      <div class="space-y-2">
        <div
          v-for="(track, index) in album.tracks.data"
          :key="track.id"
          class="flex items-center space-x-4 p-2 rounded hover:bg-spotify-gray hover:bg-opacity-80 transition-all cursor-pointer"
          @click="playSong(track)"
        >
          <span class="text-spotify-light-gray w-8">{{ index + 1 }}</span>
          <img :src="album.cover_medium || 'https://placehold.co/56x56?text=No+Image'" :alt="track.title" class="w-12 h-12 rounded object-cover" />
          <div class="flex-1 min-w-0">
            <h3 class="font-medium truncate">{{ track.title }}</h3>
            <p class="text-sm text-spotify-light-gray truncate">{{ track.artist.name }}</p>
          </div>
          <span class="text-sm text-spotify-light-gray">{{ formatDuration(track.duration) }}</span>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { getAlbum } from '../services/api'
import { useMusicStore } from '../stores/music'

const route = useRoute()
const store = useMusicStore()

const album = ref(null)

onMounted(async () => {
  const albumId = route.params.id
  album.value = await getAlbum(albumId)
})

function formatDuration(seconds) {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
}

function playSong(track) {
  store.play({
    id: track.id,
    name: track.title,
    artist: track.artist.name,
    image: album.value.cover_medium,
    preview: track.preview,
    duration: formatDuration(track.duration),
  })
}
</script>
