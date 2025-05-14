<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'
import { searchMusic } from '../services/api'

const route = useRoute()
const genre = ref(null)
const artists = ref([])
const albums = ref([])
const songs = ref([])

onMounted(async () => {
  // Buscar detalhes do gênero
  const genreRes = await axios.get(
    `https://cors-anywhere.herokuapp.com/https://api.deezer.com/genre/${route.params.id}`
  )
  genre.value = genreRes.data

  // Buscar artistas do gênero
  const artistsRes = await axios.get(
    `https://cors-anywhere.herokuapp.com/https://api.deezer.com/genre/${route.params.id}/artists`
  )
  artists.value = artistsRes.data.data

  // Buscar músicas e álbuns usando searchMusic (exemplo: busca pelo nome do gênero)
  const results = await searchMusic(genre.value.name)
  albums.value = results.albums.data
  songs.value = results.songs.data
})
</script>

<template>
  <div class="space-y-8 w-full px-2 md:px-8">
    <div v-if="genre" class="flex items-center space-x-4 mb-6">
      <img
        :src="genre.picture"
        :alt="genre.name"
        class="w-20 h-20 rounded-lg shadow-lg"
      />
      <h1 class="text-3xl font-bold">{{ genre.name }}</h1>
    </div>

    <section v-if="artists.length">
      <h2 class="text-2xl font-bold mb-4">Artistas do gênero</h2>
      <div
        class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
      >
        <div
          v-for="artist in artists"
          :key="artist.id"
          class="bg-spotify-gray p-4 rounded-lg hover:bg-opacity-80 transition-all cursor-pointer flex flex-col items-center"
        >
          <img
            :src="
              artist.picture_medium ||
              'https://placehold.co/160x160?text=No+Image'
            "
            :alt="artist.name"
            class="w-full aspect-square rounded-full shadow-lg mb-4 object-cover"
          />
          <h3 class="font-medium text-center w-full truncate">
            {{ artist.name }}
          </h3>
        </div>
      </div>
    </section>

    <section v-if="albums.length">
      <h2 class="text-2xl font-bold mb-4">Álbuns do gênero</h2>
      <div
        class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
      >
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
          <h3 class="font-medium text-center w-full truncate">
            {{ album.name }}
          </h3>
          <p
            class="text-sm text-spotify-light-gray text-center w-full truncate"
          >
            {{ album.artist }}
          </p>
        </div>
      </div>
    </section>

    <section v-if="songs.length">
      <h2 class="text-2xl font-bold mb-4">Músicas do gênero</h2>
      <div
        class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
      >
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
          <h3 class="font-medium text-center w-full truncate">
            {{ song.name }}
          </h3>
          <p
            class="text-sm text-spotify-light-gray text-center w-full truncate"
          >
            {{ song.artist }}
          </p>
        </div>
      </div>
    </section>
  </div>
</template>
