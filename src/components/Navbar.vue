<template>
  <nav class="bg-spotify-gray bg-opacity-95 px-6 flex items-center justify-between">
    <!-- Navigation Controls -->
    <div class="flex items-center space-x-4">
      <button @click="goBack" class="p-2 rounded-full bg-black bg-opacity-70 hover:bg-opacity-100">
        <ChevronLeftIcon class="w-5 h-5" />
      </button>
      <button @click="goForward" class="p-2 rounded-full bg-black bg-opacity-70 hover:bg-opacity-100">
        <ChevronRightIcon class="w-5 h-5" />
      </button>
    </div>

    <!-- Search Bar -->
    <div class="flex-1 max-w-xl mx-4">
      <div class="relative">
        <MagnifyingGlassIcon
          class="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-spotify-light-gray"
        />
        <input
          v-model="searchStore.query"
          type="text"
          placeholder="O que você quer ouvir?"
          class="w-full bg-white bg-opacity-10 rounded-full py-2 pl-10 pr-4 text-white placeholder-spotify-light-gray focus:outline-none focus:bg-opacity-20"
          @keyup.enter="goToSearch"
        />
      </div>
    </div>

    <!-- User Menu -->
    <div class="flex items-center space-x-4">
      <button
        class="flex items-center space-x-2 bg-black bg-opacity-70 hover:bg-opacity-100 px-4 py-1 rounded-full"
      >
        <UserCircleIcon class="w-6 h-6" />
        <span>Perfil</span>
        <ChevronDownIcon class="w-4 h-4" />
      </button>
    </div>
  </nav>
</template>

<script setup>
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  MagnifyingGlassIcon,
  UserCircleIcon,
  ChevronDownIcon,
} from '@heroicons/vue/24/outline'
import { useRouter } from 'vue-router'
import { useSearchStore } from '../stores/search'

const router = useRouter()
const searchStore = useSearchStore()

function goBack() {
  router.back()
}

function goForward() {
  router.forward()
}

function goToSearch() {
  if (searchStore.query.trim()) {
    router.push('/search')
  }
}
</script>
