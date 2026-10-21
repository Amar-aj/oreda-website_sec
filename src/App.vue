<script setup lang="ts">
import SiteLoader from '@/components/layout/SiteLoader.vue'
import { onMounted, ref } from 'vue'

const showLoader = ref(true)
const leaving = ref(false)

const MIN_MS = 2300
const FADE_MS = 850

onMounted(() => {
  const started = performance.now()
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  document.documentElement.classList.add('is-booting')
  document.getElementById('boot-splash')?.remove()

  const reveal = () => {
    const wait = reduceMotion
      ? 0
      : Math.max(0, MIN_MS - (performance.now() - started))

    window.setTimeout(() => {
      leaving.value = true
      window.setTimeout(() => {
        showLoader.value = false
        document.documentElement.classList.remove('is-booting')
      }, reduceMotion ? 0 : FADE_MS)
    }, wait)
  }

  const logo = new Image()
  logo.src = '/images/oreda-logo.png?v=3'

  const ready = Promise.all([
    document.fonts?.ready ?? Promise.resolve(),
    new Promise<void>((resolve) => {
      logo.onload = () => resolve()
      logo.onerror = () => resolve()
    }),
    new Promise<void>((resolve) => {
      if (document.readyState === 'complete') resolve()
      else window.addEventListener('load', () => resolve(), { once: true })
    }),
  ])

  void ready.then(reveal)
})
</script>

<template>
  <SiteLoader v-if="showLoader" :leaving="leaving" />
  <RouterView />
</template>
