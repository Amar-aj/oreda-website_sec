<script setup lang="ts">
import solarImg from '@/assets/images/hero/solar.jpg'
import { Camera } from 'lucide-vue-next'
import { onMounted, onUnmounted, ref } from 'vue'
import { RouterLink } from 'vue-router'

const sectionRef = ref<HTMLElement | null>(null)
const inView = ref(false)
let observer: IntersectionObserver | null = null

onMounted(() => {
  observer = new IntersectionObserver(
    ([entry]) => {
      if (entry?.isIntersecting) {
        inView.value = true
        observer?.disconnect()
      }
    },
    { threshold: 0.2 },
  )
  if (sectionRef.value) observer.observe(sectionRef.value)
})

onUnmounted(() => observer?.disconnect())
</script>

<template>
  <section
    ref="sectionRef"
    class="gallery-hero relative w-full overflow-hidden"
    aria-labelledby="gallery-hero-heading"
    :class="{ 'is-inview': inView }"
  >
    <div class="pointer-events-none absolute inset-0" aria-hidden="true">
      <img
        :src="solarImg"
        alt=""
        class="gallery-hero-photo"
      />
      <div class="gallery-hero-veil" />
      <div class="gallery-hero-mesh" />
      <p class="gallery-hero-watermark">GALLERY</p>
    </div>

    <div
      class="relative mx-auto flex max-w-[1400px] flex-col justify-end px-4 py-14 sm:px-6 sm:py-16 lg:min-h-[22rem] lg:px-8 lg:py-20"
    >
      <div class="gallery-hero-reveal max-w-2xl" style="--delay: 0ms">
        <nav class="text-[12.5px] text-white/60" aria-label="Breadcrumb">
          <ol class="flex flex-wrap items-center gap-1.5">
            <li>
              <RouterLink to="/" class="transition hover:text-white">
                Home
              </RouterLink>
            </li>
            <li aria-hidden="true" class="text-white/35">/</li>
            <li class="font-semibold text-white">Photo Gallery</li>
          </ol>
        </nav>

        <div class="mt-5 flex items-center gap-3">
          <span class="gallery-hero-mark" aria-hidden="true">
            <Camera :size="13" :stroke-width="2.2" />
          </span>
          <p
            class="text-[11px] font-bold tracking-[0.2em] text-[#c4b5f0] uppercase sm:text-xs"
          >
            OREDA · Visual archive
          </p>
        </div>

        <h1
          id="gallery-hero-heading"
          class="mt-3 font-display text-[clamp(1.9rem,4.2vw,3rem)] leading-[1.1] font-semibold tracking-[-0.02em] text-white"
        >
          Moments that power
          <span class="text-[#c4b5f0]">Odisha’s</span>
          clean energy story.
        </h1>

        <p
          class="mt-3.5 max-w-xl text-[14px] leading-relaxed text-white/68 sm:text-[15px]"
        >
          Field programmes, community outreach, project sites and institutional
          milestones captured across the state.
        </p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.gallery-hero-photo {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center 35%;
  transform: scale(1.04);
  filter: saturate(0.92) brightness(0.72);
}

.gallery-hero-veil {
  position: absolute;
  inset: 0;
  background:
    linear-gradient(
      115deg,
      rgba(0, 8, 31, 0.88) 0%,
      rgba(0, 16, 56, 0.72) 42%,
      rgba(56, 32, 128, 0.55) 78%,
      rgba(74, 47, 143, 0.45) 100%
    ),
    linear-gradient(0deg, rgba(0, 8, 31, 0.55) 0%, transparent 55%);
}

.gallery-hero-mesh {
  position: absolute;
  inset: 0;
  opacity: 0.22;
  background-image:
    linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px);
  background-size: 42px 42px;
  mask-image: radial-gradient(ellipse 70% 80% at 70% 40%, black 10%, transparent 75%);
}

.gallery-hero-watermark {
  position: absolute;
  right: 3%;
  bottom: -0.12em;
  margin: 0;
  font-family: var(--font-display);
  font-size: clamp(3.8rem, 13vw, 8.5rem);
  font-weight: 600;
  line-height: 1;
  letter-spacing: -0.04em;
  color: rgba(255, 255, 255, 0.07);
  user-select: none;
  pointer-events: none;
}

.gallery-hero-mark {
  display: grid;
  place-items: center;
  width: 1.65rem;
  height: 1.65rem;
  color: #efe8ff;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(196, 181, 240, 0.4);
}

.gallery-hero-reveal {
  opacity: 0;
  transform: translateY(18px);
  transition:
    opacity 0.7s cubic-bezier(0.22, 1, 0.36, 1),
    transform 0.7s cubic-bezier(0.22, 1, 0.36, 1);
  transition-delay: var(--delay, 0ms);
}

.is-inview .gallery-hero-reveal {
  opacity: 1;
  transform: translateY(0);
}

@media (prefers-reduced-motion: reduce) {
  .gallery-hero-reveal {
    opacity: 1;
    transform: none;
    transition: none;
  }

  .gallery-hero-photo {
    transform: none;
  }
}
</style>
