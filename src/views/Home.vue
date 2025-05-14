<template>
  <div class="space-y-8 w-full px-2 md:px-8">
    <!-- Artistas Populares -->
    <section>
      <h2 class="text-2xl font-bold mb-4">Artistas Populares</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        <div
          v-for="artist in artists"
          :key="artist.id"
          class="bg-spotify-gray p-4 rounded-lg hover:bg-opacity-80 transition-all cursor-pointer flex flex-col items-center"
        >
          <img
            :src="artist.image || 'https://placehold.co/160x160?text=No+Image'"
            :alt="artist.name"
            class="w-full aspect-square rounded-full shadow-lg mb-4 object-cover"
          />
          <h3 class="font-medium text-center w-full truncate">{{ artist.name }}</h3>
        </div>
      </div>
    </section>

    <!-- Álbuns Populares -->
    <section>
      <h2 class="text-2xl font-bold mb-4">Álbuns Populares</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        <div
          v-for="album in albums"
          :key="album.id"
          class="bg-spotify-gray p-4 rounded-lg hover:bg-opacity-80 transition-all cursor-pointer flex flex-col items-center"
        >
          <img
            :src="album.image || 'https://placehold.co/160x160?text=No+Image'"
            :alt="album.name"
            class="w-full aspect-square rounded-lg shadow-lg mb-4 object-cover"
          />
          <h3 class="font-medium text-center w-full truncate">{{ album.name }}</h3>
          <p class="text-sm text-spotify-light-gray text-center w-full truncate">{{ album.artist }}</p>
        </div>
      </div>
    </section>

    <!-- Músicas Populares -->
    <section>
      <h2 class="text-2xl font-bold mb-4">Músicas Populares</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        <div
          v-for="song in songs"
          :key="song.id"
          class="bg-spotify-gray p-4 rounded-lg hover:bg-opacity-80 transition-all cursor-pointer flex flex-col items-center"
        >
          <img
            :src="song.image || 'https://placehold.co/160x160?text=No+Image'"
            :alt="song.name"
            class="w-full aspect-square rounded-lg shadow-lg mb-4 object-cover"
          />
          <h3 class="font-medium text-center w-full truncate">{{ song.name }}</h3>
          <p class="text-sm text-spotify-light-gray text-center w-full truncate">{{ song.artist }}</p>
        </div>
      </div>
    </section>

    <!-- Playlists Populares -->
    <section>
      <h2 class="text-2xl font-bold mb-4">Playlists Populares</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        <div
          v-for="playlist in playlists"
          :key="playlist.id"
          class="bg-spotify-gray p-4 rounded-lg hover:bg-opacity-80 transition-all cursor-pointer flex flex-col items-center"
        >
          <img
            :src="playlist.picture_medium || 'https://placehold.co/160x160?text=No+Image'"
            :alt="playlist.title"
            class="w-full aspect-square rounded-lg shadow-lg mb-4 object-cover"
          />
          <h3 class="font-medium text-center w-full truncate">{{ playlist.title }}</h3>
          <p class="text-sm text-spotify-light-gray text-center w-full truncate">Por {{ playlist.user.name }}</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { searchMusic } from '../services/api'
import axios from 'axios'

const artists = ref([])
const albums = ref([])
const songs = ref([])
const playlists = ref([])

onMounted(async () => {
  const results = await searchMusic('pop')
  artists.value = results.artists.data
  albums.value = results.albums.data
  songs.value = results.songs.data

  // Playlists não está no searchMusic, então buscamos direto
  const response = await axios.get(
    'https://cors-anywhere.herokuapp.com/https://api.deezer.com/search/playlist?q=pop'
  )
  playlists.value = response.data.data
})
</script>
