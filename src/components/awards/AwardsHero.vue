<script setup lang="ts">
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
    class="awards-hero relative w-full overflow-hidden"
    aria-labelledby="awards-hero-heading"
    :class="{ 'is-inview': inView }"
  >
    <div class="pointer-events-none absolute inset-0" aria-hidden="true">
      <div class="awards-hero-base" />
      <div class="awards-hero-mesh" />
      <div class="awards-hero-glow awards-hero-glow--a" />
      <div class="awards-hero-glow awards-hero-glow--b" />
      <div class="awards-hero-slash" />
      <p class="awards-hero-watermark">Awards &amp; Recognition</p>
    </div>

    <div
      class="relative mx-auto flex max-w-[1400px] flex-col justify-center px-4 py-12 sm:px-6 sm:py-14 lg:min-h-[20rem] lg:px-8 lg:py-16"
    >
      <div class="awards-hero-reveal max-w-2xl" style="--delay: 0ms">
        <nav class="text-[12.5px] text-white/60" aria-label="Breadcrumb">
          <ol class="flex flex-wrap items-center gap-1.5">
            <li>
              <RouterLink to="/" class="transition hover:text-white">
                Home
              </RouterLink>
            </li>
            <li aria-hidden="true" class="text-white/35">/</li>
            <li class="font-semibold text-white">Awards &amp; Recognition</li>
          </ol>
        </nav>

        <div class="mt-5 flex items-center gap-3">
          <span class="h-[2px] w-7 rounded-full bg-[#c4b5f0]" aria-hidden="true" />
          <p
            class="text-[11px] font-bold tracking-[0.2em] text-[#c4b5f0] uppercase sm:text-xs"
          >
            OREDA · Distinctions
          </p>
        </div>

        <h1
          id="awards-hero-heading"
          class="mt-3 font-display text-[clamp(1.9rem,4.2vw,3rem)] leading-[1.1] font-semibold tracking-[-0.02em] text-white"
        >
          Honours that reflect our work for
          <span class="text-[#c4b5f0]">Odisha’s</span>
          clean energy future.
        </h1>

        <p
          class="mt-3.5 max-w-xl text-[14px] leading-relaxed text-white/68 sm:text-[15px]"
        >
          A record of national awards and public acknowledgements earned by
          OREDA for renewable-energy delivery across the state.
        </p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.awards-hero-base {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    122deg,
    #00081f 0%,
    #001038 28%,
    #1f1452 58%,
    #382080 84%,
    #4a2f8f 100%
  );
}

.awards-hero-mesh {
  position: absolute;
  inset: 0;
  opacity: 0.28;
  background-image:
    linear-gradient(rgba(255, 255, 255, 0.045) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.045) 1px, transparent 1px);
  background-size: 44px 44px;
  mask-image: radial-gradient(ellipse 70% 80% at 75% 35%, black 12%, transparent 78%);
}

.awards-hero-glow {
  position: absolute;
  border-radius: 9999px;
  filter: blur(72px);
}

.awards-hero-glow--a {
  top: -28%;
  right: -8%;
  width: min(52vw, 440px);
  height: min(52vw, 440px);
  background: radial-gradient(circle, rgba(196, 181, 240, 0.28), transparent 68%);
}

.awards-hero-glow--b {
  bottom: -36%;
  left: 2%;
  width: min(42vw, 340px);
  height: min(42vw, 340px);
  background: radial-gradient(circle, rgba(56, 32, 128, 0.55), transparent 70%);
}

.awards-hero-slash {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    115deg,
    transparent 0%,
    transparent 54%,
    rgba(255, 255, 255, 0.03) 54.2%,
    rgba(255, 255, 255, 0.055) 58%,
    rgba(255, 255, 255, 0.03) 62%,
    transparent 62.3%,
    transparent 100%
  );
}

.awards-hero-watermark {
  position: absolute;
  top: 52%;
  right: 3%;
  margin: 0;
  max-width: 48%;
  transform: translateY(-50%);
  font-family: var(--font-display);
  font-size: clamp(2.4rem, 7.5vw, 5.5rem);
  font-weight: 600;
  line-height: 0.95;
  letter-spacing: -0.035em;
  text-align: right;
  color: rgba(255, 255, 255, 0.07);
  user-select: none;
  pointer-events: none;
}

.awards-hero-reveal {
  opacity: 0;
  transform: translateY(16px);
  transition:
    opacity 0.65s cubic-bezier(0.22, 1, 0.36, 1),
    transform 0.65s cubic-bezier(0.22, 1, 0.36, 1);
  transition-delay: var(--delay, 0ms);
}

.is-inview .awards-hero-reveal {
  opacity: 1;
  transform: translateY(0);
}

@media (prefers-reduced-motion: reduce) {
  .awards-hero-reveal {
    opacity: 1;
    transform: none;
    transition: none;
  }
}
</style>
