<template>
  <div class="space-y-2">
    <div
      v-for="(track, index) in tracks"
      :key="track.id"
      class="flex items-center space-x-4 p-2 rounded hover:bg-spotify-gray hover:bg-opacity-80 transition-all cursor-pointer"
      draggable="true"
      @dragstart="handleDragStart($event, index)"
      @dragover.prevent
      @drop="handleDrop($event, index)"
      @click="playTrack(track)"
    >
      <span class="text-spotify-light-gray w-8">{{ index + 1 }}</span>
      <img :src="track.image" :alt="track.name" class="w-12 h-12 rounded" />
      <div class="flex-1">
        <h3 class="font-medium">{{ track.name }}</h3>
        <p class="text-sm text-spotify-light-gray">{{ track.artist }}</p>
      </div>
      <span class="text-sm text-spotify-light-gray">{{ track.duration }}</span>
      <button
        v-if="showRemove"
        class="text-spotify-light-gray hover:text-white"
        @click.stop="removeTrack(track.id)"
      >
        <TrashIcon class="w-5 h-5" />
      </button>
    </div>
  </div>
</template>

<script setup>
import { TrashIcon } from '@heroicons/vue/24/outline'
import { useMusicStore } from '../stores/music'

const props = defineProps({
  tracks: {
    type: Array,
    required: true
  },
  showRemove: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:tracks', 'remove'])

const store = useMusicStore()

function playTrack(track) {
  store.play(track)
}

function removeTrack(trackId) {
  emit('remove', trackId)
}

function handleDragStart(event, index) {
  event.dataTransfer.setData('text/plain', index)
  event.dataTransfer.effectAllowed = 'move'
}

function handleDrop(event, targetIndex) {
  const sourceIndex = parseInt(event.dataTransfer.getData('text/plain'))
  if (sourceIndex === targetIndex) return

  const newTracks = [...props.tracks]
  const [movedTrack] = newTracks.splice(sourceIndex, 1)
  newTracks.splice(targetIndex, 0, movedTrack)

  emit('update:tracks', newTracks)
}
</script>
