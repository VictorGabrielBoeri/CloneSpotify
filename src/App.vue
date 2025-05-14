<script setup>
import { RouterView } from 'vue-router'
import Sidebar from './components/Sidebar.vue'
import Navbar from './components/Navbar.vue'
import Player from './components/Player.vue'
import PageTransition from './components/PageTransition.vue'
import { useMusicStore } from './stores/music'
import { onMounted } from 'vue'
import {
  HeartIcon,
  BackwardIcon,
  PlayIcon,
  PauseIcon,
  ForwardIcon,
  SpeakerWaveIcon,
  ArrowPathIcon
} from '@heroicons/vue/24/outline'

const store = useMusicStore()

onMounted(() => {
  // Verificar preferência de tema do usuário
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
  if (prefersDark) {
    store.toggleDarkMode()
  }
})
</script>

<template>
  <div class="h-screen bg-spotify-black text-white flex flex-col md:flex-row overflow-hidden" style="width: 202%;">
    <!-- Sidebar -->
    <Sidebar class="w-full md:w-64 flex-shrink-0" />

    <!-- Main Content -->
    <div class="flex-1 flex flex-col min-h-0">
      <!-- Navbar -->
      <Navbar class="h-16 flex-shrink-0" />

      <!-- Content Area -->
      <main class="flex-1 overflow-y-auto p-2 md:p-6 min-h-0">
        <PageTransition>
          <router-view />
        </PageTransition>
      </main>

      <!-- Player -->
      <div class="sticky bottom-0 left-0 w-full z-50">
        <Player class="h-20 md:h-24" />
      </div>
    </div>
  </div>
</template>

<style scoped>
html, body, #app {
  height: 100%;
  margin: 0;
  padding: 0;
}

header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
