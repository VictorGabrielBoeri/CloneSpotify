<template>
  <div
    class="bg-spotify-gray border-t border-spotify-light-gray border-opacity-20 px-4 flex items-center justify-between"
  >
    <!-- Current Track -->
    <div class="flex items-center space-x-4 w-1/3">
      <img
        :src="currentTrack?.image || 'https://via.placeholder.com/56'"
        :alt="currentTrack?.name || 'Album cover'"
        class="w-14 h-14 rounded"
      />
      <div>
        <h4 class="text-sm font-medium">
          {{ currentTrack?.name || 'Nenhuma música selecionada' }}
        </h4>
        <p class="text-xs text-spotify-light-gray">
          {{ currentTrack?.artist || 'Artista' }}
        </p>
      </div>
      <button class="text-spotify-light-gray hover:text-white">
        <HeartIcon class="w-5 h-5" />
      </button>
      <button
        v-if="currentTrack"
        class="ml-2 text-spotify-light-gray hover:text-white"
        @click="showLyrics = true"
        title="Ver Letra"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-5 h-5"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M12 6v6l4 2"
          />
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </button>
    </div>

    <!-- Player Controls -->
    <div class="flex flex-col items-center w-1/3">
      <div class="flex items-center space-x-6">
        <button
          class="text-spotify-light-gray hover:text-white"
          :class="{ 'text-spotify-green': isShuffle }"
          @click="toggleShuffle"
        >
          <ArrowPathIcon class="w-5 h-5" />
        </button>
        <button
          class="text-spotify-light-gray hover:text-white"
          @click="playPrevious"
        >
          <BackwardIcon class="w-5 h-5" />
        </button>
        <button
          class="bg-white rounded-full p-2 hover:scale-105"
          @click="isPlaying ? pause() : resume()"
        >
          <component
            :is="isPlaying ? PauseIcon : PlayIcon"
            class="w-6 h-6 text-black"
          />
        </button>
        <button
          class="text-spotify-light-gray hover:text-white"
          @click="playNext"
        >
          <ForwardIcon class="w-5 h-5" />
        </button>
        <button
          class="text-spotify-light-gray hover:text-white"
          :class="{ 'text-spotify-green': repeatMode !== 'none' }"
          @click="toggleRepeat"
        >
          <component
            :is="repeatMode === 'one' ? RepeatOneIcon : RepeatIcon"
            class="w-5 h-5"
          />
        </button>
      </div>

      <!-- Progress Bar -->
      <div class="flex items-center space-x-2 w-full mt-2">
        <span class="text-xs text-spotify-light-gray">{{
          formattedCurrentTime
        }}</span>
        <div
          class="flex-1 h-1 bg-spotify-light-gray bg-opacity-30 rounded-full cursor-pointer"
          @click="handleProgressClick"
        >
          <div
            class="h-full bg-white rounded-full"
            :style="{ width: `${(currentTime / duration) * 100}%` }"
          ></div>
        </div>
        <span class="text-xs text-spotify-light-gray">{{
          formattedDuration
        }}</span>
      </div>
    </div>

    <!-- Volume Control -->
    <div class="flex items-center justify-end space-x-4 w-1/3">
      <button class="text-spotify-light-gray hover:text-white">
        <SpeakerWaveIcon class="w-5 h-5" />
      </button>
      <div
        class="w-24 h-1 bg-spotify-light-gray bg-opacity-30 rounded-full cursor-pointer"
        @click="handleVolumeClick"
      >
        <div
          class="h-full bg-white rounded-full"
          :style="{ width: `${volume * 100}%` }"
        ></div>
      </div>
    </div>
  </div>
  <LyricsModal
    :show="showLyrics"
    :lyrics="lyrics"
    @close="showLyrics = false"
  />
</template>

<script setup>
import {
  HeartIcon,
  BackwardIcon,
  PlayIcon,
  PauseIcon,
  ForwardIcon,
  SpeakerWaveIcon,
  ArrowPathIcon,
  RepeatIcon,
  RepeatOneIcon
} from '@heroicons/vue/24/outline'
import { useMusicStore } from '../stores/music'
import LyricsModal from './LyricsModal.vue'
import { ref } from 'vue'

const store = useMusicStore()

const {
  currentTrack,
  isPlaying,
  volume,
  currentTime,
  duration,
  formattedCurrentTime,
  formattedDuration,
  isShuffle,
  repeatMode,
  play,
  pause,
  resume,
  setVolume,
  playNext,
  playPrevious,
  seekTo,
  toggleShuffle,
  toggleRepeat
} = store

const showLyrics = ref(false)
const lyrics = ref(
  'Esta é uma letra fictícia para a música selecionada.\nSinta-se livre para substituir por uma API real de letras!'
)

function handleProgressClick(event) {
  const rect = event.currentTarget.getBoundingClientRect()
  const x = event.clientX - rect.left
  const percentage = x / rect.width
  const newTime = percentage * duration
  seekTo(newTime)
}

function handleVolumeClick(event) {
  const rect = event.currentTarget.getBoundingClientRect()
  const x = event.clientX - rect.left
  const percentage = x / rect.width
  setVolume(percentage)
}
</script>
