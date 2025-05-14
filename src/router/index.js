import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/search',
      name: 'search',
      component: () => import('../views/Search.vue'),
    },
    {
      path: '/library',
      name: 'library',
      component: () => import('../views/Library.vue'),
    },
    {
      path: '/playlist/:id',
      name: 'playlist',
      component: () => import('../views/Playlist.vue'),
    },
    {
      path: '/artist/:id',
      name: 'artist',
      component: () => import('../views/Artist.vue'),
    },
    {
      path: '/album/:id',
      name: 'album',
      component: () => import('../views/Album.vue'),
    },
    {
      path: '/category/:id',
      name: 'Category',
      component: () => import('@/views/Category.vue')
    },
  ],
})

export default router
