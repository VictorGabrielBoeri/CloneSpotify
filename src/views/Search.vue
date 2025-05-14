<template>
  <div class="space-y-8">
    <!-- Search Bar -->
    <div class="relative">
      <MagnifyingGlassIcon
        class="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-spotify-light-gray"
      />
      <input
        v-model="searchQuery"
        type="text"
        placeholder="O que você quer ouvir?"
        class="w-full bg-white bg-opacity-10 rounded-full py-2 pl-10 pr-4 text-white placeholder-spotify-light-gray focus:outline-none focus:bg-opacity-20"
        @input="handleSearch"
      />
    </div>

    <!-- Search Results -->
    <div v-if="searchQuery">
      <!-- Artists -->
      <section v-if="artists.data.length">
        <h2 class="text-2xl font-bold mb-4">Artistas</h2>
        <div
          class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4"
        >
          <div
            v-for="artist in artists.data"
            :key="artist.id"
            class="bg-spotify-gray p-4 rounded-lg hover:bg-opacity-80 transition-all cursor-pointer"
            @click="goToArtist(artist.id)"
          >
            <img
              :src="artist.image"
              :alt="artist.name"
              class="w-full aspect-square rounded-full shadow-lg mb-4"
            />
            <h3 class="font-medium">{{ artist.name }}</h3>
            <p class="text-sm text-spotify-light-gray">Artista</p>
          </div>
        </div>
        <div
          v-if="artists.data.length < artists.total"
          class="text-center mt-4"
          ref="artistsObserver"
        >
          <div
            class="inline-block animate-spin rounded-full h-8 w-8 border-4 border-spotify-green border-t-transparent"
          ></div>
        </div>
      </section>

      <!-- Albums -->
      <section v-if="albums.data.length">
        <h2 class="text-2xl font-bold mb-4">Álbuns</h2>
        <div
          class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4"
        >
          <div
            v-for="album in albums.data"
            :key="album.id"
            class="bg-spotify-gray p-4 rounded-lg hover:bg-opacity-80 transition-all cursor-pointer"
            @click="goToAlbum(album.id)"
          >
            <img
              :src="album.image"
              :alt="album.name"
              class="w-full aspect-square rounded-lg shadow-lg mb-4"
            />
            <h3 class="font-medium">{{ album.name }}</h3>
            <p class="text-sm text-spotify-light-gray">{{ album.artist }}</p>
          </div>
        </div>
        <div
          v-if="albums.data.length < albums.total"
          class="text-center mt-4"
          ref="albumsObserver"
        >
          <div
            class="inline-block animate-spin rounded-full h-8 w-8 border-4 border-spotify-green border-t-transparent"
          ></div>
        </div>
      </section>

      <!-- Songs -->
      <section v-if="songs.data.length">
        <h2 class="text-2xl font-bold mb-4">Músicas</h2>
        <TrackList :tracks="songs.data" />
        <div
          v-if="songs.data.length < songs.total"
          class="text-center mt-4"
          ref="songsObserver"
        >
          <div
            class="inline-block animate-spin rounded-full h-8 w-8 border-4 border-spotify-green border-t-transparent"
          ></div>
        </div>
      </section>
    </div>

    <!-- Browse Categories -->
    <div v-else>
      <h2 class="text-2xl font-bold mb-4">Navegar por categorias</h2>
      <div
        class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4"
      >
        <div
          v-for="category in categories"
          :key="category.id"
          class="bg-spotify-gray p-4 rounded-lg hover:bg-opacity-80 transition-all cursor-pointer"
        >
          <img
            :src="category.image"
            :alt="category.name"
            class="w-full aspect-square rounded-lg shadow-lg mb-4"
          />
          <h3 class="font-medium">{{ category.name }}</h3>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { MagnifyingGlassIcon } from '@heroicons/vue/24/outline'
import { searchMusic } from '../services/api'
import TrackList from '../components/TrackList.vue'

const router = useRouter()

const searchQuery = ref('')
const artists = ref({ data: [], total: 0 })
const albums = ref({ data: [], total: 0 })
const songs = ref({ data: [], total: 0 })
const categories = ref([
  { id: 1, name: 'Pop', image: 'https://via.placeholder.com/160' },
  { id: 2, name: 'Rock', image: 'https://via.placeholder.com/160' },
  { id: 3, name: 'Hip Hop', image: 'https://via.placeholder.com/160' },
  { id: 4, name: 'Eletrônica', image: 'https://via.placeholder.com/160' },
  { id: 5, name: 'MPB', image: 'https://via.placeholder.com/160' }
])

const artistsObserver = ref(null)
const albumsObserver = ref(null)
const songsObserver = ref(null)
const currentPage = ref(0)
const isLoading = ref(false)

let searchTimeout

async function handleSearch() {
  clearTimeout(searchTimeout)
  searchTimeout = setTimeout(async () => {
    if (searchQuery.value.trim()) {
      currentPage.value = 0
      const results = await searchMusic(searchQuery.value)
      artists.value = results.artists
      albums.value = results.albums
      songs.value = results.songs
    } else {
      artists.value = { data: [], total: 0 }
      albums.value = { data: [], total: 0 }
      songs.value = { data: [], total: 0 }
    }
  }, 300)
}

async function loadMore(type) {
  if (isLoading.value) return

  isLoading.value = true
  currentPage.value++
  const results = await searchMusic(searchQuery.value, currentPage.value)

  switch (type) {
    case 'artists':
      artists.value.data = [...artists.value.data, ...results.artists.data]
      break
    case 'albums':
      albums.value.data = [...albums.value.data, ...results.albums.data]
      break
    case 'songs':
      songs.value.data = [...songs.value.data, ...results.songs.data]
      break
  }

  isLoading.value = false
}

function goToArtist(id) {
  router.push(`/artist/${id}`)
}

function goToAlbum(id) {
  router.push(`/album/${id}`)
}

onMounted(() => {
  const options = {
    root: null,
    rootMargin: '0px',
    threshold: 1.0
  }

  const handleIntersect = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const type = entry.target.dataset.type
        loadMore(type)
      }
    })
  }

  const observer = new IntersectionObserver(handleIntersect, options)

  if (artistsObserver.value) {
    artistsObserver.value.dataset.type = 'artists'
    observer.observe(artistsObserver.value)
  }

  if (albumsObserver.value) {
    albumsObserver.value.dataset.type = 'albums'
    observer.observe(albumsObserver.value)
  }

  if (songsObserver.value) {
    songsObserver.value.dataset.type = 'songs'
    observer.observe(songsObserver.value)
  }

  onUnmounted(() => {
    observer.disconnect()
  })
})
</script>
