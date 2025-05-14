<template>
  <div class="space-y-8">
    <!-- Artist Header -->
    <div v-if="artist" class="flex items-end space-x-6">
      <img :src="artist.picture_xl" :alt="artist.name" class="w-48 h-48 rounded-full shadow-2xl" />
      <div>
        <h1 class="text-4xl font-bold mb-2">{{ artist.name }}</h1>
        <p class="text-spotify-light-gray">{{ artist.nb_fan }} ouvintes mensais</p>
      </div>
    </div>

    <!-- Top Tracks -->
    <section v-if="artist?.topTracks?.length">
      <h2 class="text-2xl font-bold mb-4">Músicas Populares</h2>
      <div class="space-y-2">
        <div
          v-for="(track, index) in artist.topTracks"
          :key="track.id"
          class="flex items-center space-x-4 p-2 rounded hover:bg-spotify-gray hover:bg-opacity-80 transition-all cursor-pointer"
          @click="playSong(track)"
        >
          <span class="text-spotify-light-gray w-8">{{ index + 1 }}</span>
          <img :src="track.album.cover_medium" :alt="track.title" class="w-12 h-12 rounded" />
          <div class="flex-1">
            <h3 class="font-medium">{{ track.title }}</h3>
            <p class="text-sm text-spotify-light-gray">{{ track.artist.name }}</p>
          </div>
          <span class="text-sm text-spotify-light-gray">{{ formatDuration(track.duration) }}</span>
        </div>
      </div>
    </section>

    <!-- Albums -->
    <section v-if="artist?.albums?.length">
      <h2 class="text-2xl font-bold mb-4">Álbuns</h2>
      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        <div
          v-for="album in artist.albums"
          :key="album.id"
          class="bg-spotify-gray p-4 rounded-lg hover:bg-opacity-80 transition-all cursor-pointer"
          @click="goToAlbum(album.id)"
        >
          <img
            :src="album.cover_medium"
            :alt="album.title"
            class="w-full aspect-square rounded-lg shadow-lg mb-4"
          />
          <h3 class="font-medium">{{ album.title }}</h3>
          <p class="text-sm text-spotify-light-gray">{{ album.release_date.split('-')[0] }}</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getArtist } from '../services/api'
import { useMusicStore } from '../stores/music'

const route = useRoute()
const router = useRouter()
const store = useMusicStore()

const artist = ref(null)

onMounted(async () => {
  const artistId = route.params.id
  artist.value = await getArtist(artistId)
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
    image: track.album.cover_medium,
    preview: track.preview,
    duration: formatDuration(track.duration),
  })
}

function goToAlbum(id) {
  router.push(`/album/${id}`)
}
</script>
