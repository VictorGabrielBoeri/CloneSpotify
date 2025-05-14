<template>
  <transition
    name="page"
    mode="out-in"
    @before-enter="beforeEnter"
    @enter="enter"
    @leave="leave"
  >
    <slot />
  </transition>
</template>

<script setup>
function beforeEnter(el) {
  el.style.opacity = 0
  el.style.transform = 'translateY(20px)'
}

function enter(el, done) {
  const delay = 100
  setTimeout(() => {
    el.style.transition = 'all 0.3s ease-out'
    el.style.opacity = 1
    el.style.transform = 'translateY(0)'
    done()
  }, delay)
}

function leave(el, done) {
  el.style.transition = 'all 0.3s ease-in'
  el.style.opacity = 0
  el.style.transform = 'translateY(-20px)'
  setTimeout(done, 300)
}
</script>

<style scoped>
.page-enter-active,
.page-leave-active {
  transition: all 0.3s ease;
}

.page-enter-from,
.page-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
</style>
