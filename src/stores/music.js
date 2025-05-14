import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { Howl } from 'howler'

export const useMusicStore = defineStore('music', () => {
  // Estado
  const currentTrack = ref(null)
  const isPlaying = ref(false)
  const volume = ref(1)
  const queue = ref([])
  const currentTime = ref(0)
  const duration = ref(0)
  const sound = ref(null)
  const isDarkMode = ref(false)
  const isShuffle = ref(false)
  const repeatMode = ref('none') // 'none', 'one', 'all'
  const originalQueue = ref([])

  // Getters
  const formattedCurrentTime = computed(() => {
    const minutes = Math.floor(currentTime.value / 60)
    const seconds = Math.floor(currentTime.value % 60)
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  })

  const formattedDuration = computed(() => {
    const minutes = Math.floor(duration.value / 60)
    const seconds = Math.floor(duration.value % 60)
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  })

  // Actions
  function play(track) {
    if (sound.value) {
      sound.value.stop()
    }

    currentTrack.value = track
    sound.value = new Howl({
      src: [track.preview],
      html5: true,
      onplay: () => {
        isPlaying.value = true
        requestAnimationFrame(updateProgress)
      },
      onpause: () => {
        isPlaying.value = false
      },
      onstop: () => {
        isPlaying.value = false
        currentTime.value = 0
      },
      onload: () => {
        duration.value = sound.value.duration()
      },
      onend: () => {
        handleTrackEnd()
      }
    })

    sound.value.play()
  }

  function pause() {
    if (sound.value) {
      sound.value.pause()
      isPlaying.value = false
    }
  }

  function resume() {
    if (sound.value) {
      sound.value.play()
      isPlaying.value = true
    }
  }

  function setVolume(value) {
    volume.value = value
    if (sound.value) {
      sound.value.volume(value)
    }
  }

  function addToQueue(track) {
    queue.value.push(track)
    if (!isShuffle.value) {
      originalQueue.value = [...queue.value]
    }
  }

  function removeFromQueue(trackId) {
    queue.value = queue.value.filter(track => track.id !== trackId)
    if (!isShuffle.value) {
      originalQueue.value = originalQueue.value.filter(
        track => track.id !== trackId
      )
    }
  }

  function updateProgress() {
    if (sound.value && isPlaying.value) {
      currentTime.value = sound.value.seek()
      requestAnimationFrame(updateProgress)
    }
  }

  function setDuration(time) {
    duration.value = time
  }

  function toggleDarkMode() {
    isDarkMode.value = !isDarkMode.value
    document.documentElement.classList.toggle('dark')
  }

  function seekTo(time) {
    if (sound.value) {
      sound.value.seek(time)
      currentTime.value = time
    }
  }

  function toggleShuffle() {
    isShuffle.value = !isShuffle.value
    if (isShuffle.value) {
      originalQueue.value = [...queue.value]
      shuffleQueue()
    } else {
      queue.value = [...originalQueue.value]
    }
  }

  function toggleRepeat() {
    const modes = ['none', 'one', 'all']
    const currentIndex = modes.indexOf(repeatMode.value)
    repeatMode.value = modes[(currentIndex + 1) % modes.length]
  }

  function shuffleQueue() {
    const shuffled = [...queue.value]
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
    }
    queue.value = shuffled
  }

  function handleTrackEnd() {
    if (repeatMode.value === 'one') {
      play(currentTrack.value)
    } else if (repeatMode.value === 'all' || queue.value.length > 0) {
      playNext()
    } else {
      isPlaying.value = false
      currentTime.value = 0
    }
  }

  function playNext() {
    if (queue.value.length > 0) {
      const nextTrack = queue.value.shift()
      play(nextTrack)
    }
  }

  function playPrevious() {
    if (currentTrack.value) {
      if (currentTime.value > 3) {
        // Se a música já está tocando há mais de 3 segundos, volta para o início
        seekTo(0)
      } else if (queue.value.length > 0) {
        // Se não, volta para a música anterior
        const previousTrack = queue.value.pop()
        play(previousTrack)
      }
    }
  }

  return {
    // Estado
    currentTrack,
    isPlaying,
    volume,
    queue,
    currentTime,
    duration,
    isDarkMode,
    isShuffle,
    repeatMode,

    // Getters
    formattedCurrentTime,
    formattedDuration,

    // Actions
    play,
    pause,
    resume,
    setVolume,
    addToQueue,
    removeFromQueue,
    updateProgress,
    setDuration,
    toggleDarkMode,
    seekTo,
    playNext,
    playPrevious,
    toggleShuffle,
    toggleRepeat
  }
})
