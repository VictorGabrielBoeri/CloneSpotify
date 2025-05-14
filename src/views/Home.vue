<template>
  <div class="space-y-8">
    <!-- Featured Playlists -->
    <section>
      <h2 class="text-2xl font-bold mb-4">Boa tarde</h2>
      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        <div
          v-for="i in 5"
          :key="i"
          class="bg-spotify-gray p-4 rounded-lg hover:bg-opacity-80 transition-all cursor-pointer"
        >
          <img
            src="https://via.placeholder.com/160"
            alt="Playlist cover"
            class="w-full aspect-square rounded-lg shadow-lg mb-4"
          />
          <h3 class="font-medium">Playlist {{ i }}</h3>
          <p class="text-sm text-spotify-light-gray">Descrição da playlist</p>
        </div>
      </div>
    </section>

    <!-- Recently Played -->
    <section>
      <h2 class="text-2xl font-bold mb-4">Tocadas recentemente</h2>
      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        <div
          v-for="i in 5"
          :key="i"
          class="bg-spotify-gray p-4 rounded-lg hover:bg-opacity-80 transition-all cursor-pointer"
        >
          <img
            src="https://via.placeholder.com/160"
            alt="Album cover"
            class="w-full aspect-square rounded-lg shadow-lg mb-4"
          />
          <h3 class="font-medium">Música {{ i }}</h3>
          <p class="text-sm text-spotify-light-gray">Artista {{ i }}</p>
        </div>
      </div>
    </section>

    <!-- Made for You -->
    <section>
      <h2 class="text-2xl font-bold mb-4">Feito para você</h2>
      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        <div
          v-for="i in 5"
          :key="i"
          class="bg-spotify-gray p-4 rounded-lg hover:bg-opacity-80 transition-all cursor-pointer"
        >
          <img
            src="https://via.placeholder.com/160"
            alt="Playlist cover"
            class="w-full aspect-square rounded-lg shadow-lg mb-4"
          />
          <h3 class="font-medium">Playlist Personalizada {{ i }}</h3>
          <p class="text-sm text-spotify-light-gray">Baseado no seu gosto musical</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
// Aqui vamos adicionar a lógica para buscar as playlists e músicas
</script>
