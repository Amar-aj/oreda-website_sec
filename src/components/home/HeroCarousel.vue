<script setup lang="ts">
import hybridImg from '@/assets/images/hero/hybrid.jpg'
import ruralImg from '@/assets/images/hero/rural.jpg'
import solarImg from '@/assets/images/hero/solar.jpg'
import windImg from '@/assets/images/hero/wind.jpg'
import { ChevronLeft, ChevronRight } from 'lucide-vue-next'
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import { RouterLink } from 'vue-router'

interface HeroSlide {
  id: number
  image: string
  brand: string
  title: string
  description: string
  ctaLabel: string
  ctaTo: string
  accent: string
}

const slides: HeroSlide[] = [
  {
    id: 1,
    image: solarImg,
    brand: 'OREDA Limited',
    title: 'Powering Odisha with the Sun',
    description:
      'Scaling solar energy across the state to deliver clean, reliable power for every community.',
    ctaLabel: 'Explore Solar Projects',
    ctaTo: '/projects',
    accent: 'Solar Mission',
  },
  {
    id: 2,
    image: windImg,
    brand: 'OREDA Limited',
    title: 'Harnessing Coastal Winds',
    description:
      'Advancing wind energy initiatives that strengthen Odisha’s renewable capacity and energy security.',
    ctaLabel: 'View Our Projects',
    ctaTo: '/projects',
    accent: 'Wind Energy',
  },
  {
    id: 3,
    image: ruralImg,
    brand: 'OREDA Limited',
    title: 'Clean Energy for Every Village',
    description:
      'Bringing rooftop solar and decentralized solutions to rural households, schools, and livelihoods.',
    ctaLabel: 'Discover Schemes',
    ctaTo: '/schemes',
    accent: 'Rural Access',
  },
  {
    id: 4,
    image: hybridImg,
    brand: 'OREDA Limited',
    title: 'A Greener Energy Future',
    description:
      'Integrating solar, wind, and modern systems for a sustainable tomorrow under the Department of Energy.',
    ctaLabel: 'Contact OREDA',
    ctaTo: '/contact',
    accent: 'Clean Future',
  },
]

const activeIndex = ref(0)
const isPaused = ref(false)
const isAnimating = ref(false)
const progress = ref(0)
const reduceMotion = ref(false)

const SLIDE_MS = 6500
const TICK_MS = 50

let timer: ReturnType<typeof setInterval> | null = null

const activeSlide = computed(() => slides[activeIndex.value])
const progressPercent = computed(() => `${progress.value}%`)

function clearTimer() {
  if (timer) {
    clearInterval(timer)
    timer = null
  }
}

function startTimer() {
  clearTimer()
  if (reduceMotion.value) return

  timer = setInterval(() => {
    if (isPaused.value) return
    progress.value += (TICK_MS / SLIDE_MS) * 100
    if (progress.value >= 100) {
      progress.value = 0
      goTo((activeIndex.value + 1) % slides.length)
    }
  }, TICK_MS)
}

function goTo(index: number) {
  if (index === activeIndex.value || isAnimating.value) return
  isAnimating.value = true
  activeIndex.value = index
  progress.value = 0
  window.setTimeout(() => {
    isAnimating.value = false
  }, 700)
}

function next() {
  goTo((activeIndex.value + 1) % slides.length)
}

function prev() {
  goTo((activeIndex.value - 1 + slides.length) % slides.length)
}

function pause() {
  isPaused.value = true
}

function resume() {
  isPaused.value = false
}

watch(activeIndex, () => {
  progress.value = 0
})

onMounted(() => {
  reduceMotion.value = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  startTimer()
})

onUnmounted(() => {
  clearTimer()
})
</script>

<template>
  <section
    class="hero-carousel relative h-[min(72vh,680px)] min-h-[520px] w-full overflow-hidden bg-oreda-dark"
    aria-roledescription="carousel"
    aria-label="OREDA featured highlights"
    @mouseenter="pause"
    @mouseleave="resume"
    @focusin="pause"
    @focusout="resume"
  >
    <!-- Slides -->
    <div class="absolute inset-0">
      <div
        v-for="(slide, index) in slides"
        :key="slide.id"
        class="absolute inset-0 transition-opacity duration-700 ease-out"
        :class="index === activeIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'"
        role="group"
        :aria-roledescription="'slide'"
        :aria-label="`${index + 1} of ${slides.length}`"
        :aria-hidden="index !== activeIndex"
      >
        <img
          :src="slide.image"
          :alt="slide.title"
          class="hero-image h-full w-full object-cover"
          :class="{ 'is-active': index === activeIndex && !reduceMotion }"
        />
        <!-- Atmospheric gradient for readability — full-bleed, not a card overlay -->
        <div
          class="absolute inset-0 bg-gradient-to-r from-oreda-dark/92 via-oreda-dark/50 to-oreda-dark/15"
        />
        <div
          class="absolute inset-0 bg-gradient-to-t from-oreda-dark/50 via-transparent to-oreda-dark/20"
        />
      </div>
    </div>

    <!-- Content + controls — extra bottom space clears overlapping Latest Updates bar -->
    <div
      class="relative z-20 mx-auto flex h-full max-w-[1400px] flex-col px-4 pt-6 pb-16 sm:px-6 sm:pt-8 sm:pb-[4.5rem] lg:px-8"
    >
      <!-- Vertically centered copy -->
      <div class="flex flex-1 items-center">
        <div
          :key="activeSlide.id"
          class="hero-copy max-w-2xl text-white"
        >
          <p
            class="mb-3 text-xs font-semibold tracking-[0.22em] text-white/80 uppercase sm:text-sm"
          >
            {{ activeSlide.brand }}
            <span class="mx-2 opacity-50">·</span>
            {{ activeSlide.accent }}
          </p>
          <h1
            class="font-display text-[clamp(2rem,4.5vw,3.5rem)] leading-[1.1] tracking-tight text-white"
          >
            {{ activeSlide.title }}
          </h1>
          <p
            class="mt-4 max-w-xl text-base leading-relaxed text-white/85 sm:text-lg"
          >
            {{ activeSlide.description }}
          </p>
          <div class="mt-6 flex flex-wrap items-center gap-3 sm:mt-7">
            <RouterLink
              :to="activeSlide.ctaTo"
              class="inline-flex items-center bg-white px-5 py-2.5 text-sm font-semibold text-oreda transition hover:bg-white/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              {{ activeSlide.ctaLabel }}
            </RouterLink>
            <RouterLink
              to="/about"
              class="inline-flex items-center border border-white/40 px-5 py-2.5 text-sm font-semibold text-white transition hover:border-white hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              About OREDA
            </RouterLink>
          </div>
        </div>
      </div>

      <!-- Bottom controls -->
      <div class="flex shrink-0 items-center justify-between gap-4 pb-1">
        <div class="flex items-center gap-2" role="tablist" aria-label="Slide selectors">
          <button
            v-for="(slide, index) in slides"
            :key="slide.id"
            type="button"
            role="tab"
            class="group relative h-1.5 overflow-hidden rounded-full transition-all duration-300"
            :class="index === activeIndex ? 'w-10 bg-white/30' : 'w-5 bg-white/25 hover:bg-white/40'"
            :aria-selected="index === activeIndex"
            :aria-label="`Go to slide ${index + 1}: ${slide.title}`"
            @click="goTo(index)"
          >
            <span
              v-if="index === activeIndex"
              class="absolute inset-y-0 left-0 bg-white transition-[width] duration-75 ease-linear"
              :style="{ width: progressPercent }"
            />
          </button>
        </div>

        <div class="flex items-center gap-2">
          <button
            type="button"
            class="flex h-9 w-9 items-center justify-center border border-white/35 text-white transition hover:bg-white/15 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:h-10 sm:w-10"
            aria-label="Previous slide"
            @click="prev"
          >
            <ChevronLeft :size="20" :stroke-width="2" />
          </button>
          <button
            type="button"
            class="flex h-9 w-9 items-center justify-center border border-white/35 text-white transition hover:bg-white/15 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:h-10 sm:w-10"
            aria-label="Next slide"
            @click="next"
          >
            <ChevronRight :size="20" :stroke-width="2" />
          </button>
          <span class="ml-1 hidden text-xs tracking-widest text-white/70 tabular-nums sm:inline">
            {{ String(activeIndex + 1).padStart(2, '0') }}
            /
            {{ String(slides.length).padStart(2, '0') }}
          </span>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero-image {
  transform: scale(1.04);
  transition: transform 7s ease-out;
}

.hero-image.is-active {
  transform: scale(1.12);
}

.hero-copy {
  animation: heroRise 0.75s cubic-bezier(0.22, 1, 0.36, 1) both;
}

@keyframes heroRise {
  from {
    opacity: 0;
    transform: translateY(14px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (prefers-reduced-motion: reduce) {
  .hero-image,
  .hero-image.is-active {
    transform: none;
    transition: none;
  }

  .hero-copy {
    animation: none;
  }
}
</style>
