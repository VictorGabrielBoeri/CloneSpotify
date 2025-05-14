<template>
  <aside class="bg-spotify-gray p-6">
    <!-- Logo -->
    <div class="mb-8">
      <h1 class="text-2xl font-bold text-spotify-green">Vueify</h1>
    </div>

    <!-- Navigation -->
    <nav class="space-y-4">
      <router-link
        to="/"
        class="flex items-center space-x-3 text-spotify-light-gray hover:text-white"
      >
        <HomeIcon class="w-6 h-6" />
        <span>Início</span>
      </router-link>

      <router-link
        to="/search"
        class="flex items-center space-x-3 text-spotify-light-gray hover:text-white"
      >
        <MagnifyingGlassIcon class="w-6 h-6" />
        <span>Buscar</span>
      </router-link>

      <router-link
        to="/library"
        class="flex items-center space-x-3 text-spotify-light-gray hover:text-white"
      >
        <BookOpenIcon class="w-6 h-6" />
        <span>Sua Biblioteca</span>
      </router-link>
    </nav>

    <!-- Playlists -->
    <div class="mt-8">
      <h2 class="text-spotify-light-gray font-semibold mb-4">PLAYLISTS</h2>
      <div class="space-y-2">
        <button class="flex items-center space-x-3 text-spotify-light-gray hover:text-white">
          <PlusIcon class="w-6 h-6" />
          <span>Criar Playlist</span>
        </button>
      </div>
    </div>
  </aside>
</template>

<script setup>
import { HomeIcon, MagnifyingGlassIcon, BookOpenIcon, PlusIcon } from '@heroicons/vue/24/outline'
</script>
