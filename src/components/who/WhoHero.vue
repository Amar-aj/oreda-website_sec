<script setup lang="ts">
import { Building2, Landmark, Users } from 'lucide-vue-next'
import { onMounted, onUnmounted, ref } from 'vue'
import { RouterLink } from 'vue-router'

const highlights = [
  { icon: Landmark, label: 'State leadership' },
  { icon: Building2, label: 'Department & agency' },
  { icon: Users, label: 'OREDA team' },
]

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
    class="who-hero relative w-full overflow-hidden"
    aria-labelledby="who-hero-heading"
    :class="{ 'is-inview': inView }"
  >
    <div class="pointer-events-none absolute inset-0" aria-hidden="true">
      <div class="who-hero-base" />
      <div class="who-hero-mesh" />
      <div class="who-hero-glow who-hero-glow--a" />
      <div class="who-hero-glow who-hero-glow--b" />
      <div class="who-hero-slash" />
      <p class="who-hero-watermark">Our Leadership</p>
    </div>

    <div
      class="relative mx-auto flex max-w-[1400px] flex-col justify-center px-4 py-12 sm:px-6 sm:py-14 lg:min-h-[20rem] lg:px-8 lg:py-16"
    >
      <div class="who-hero-reveal max-w-2xl" style="--delay: 0ms">
        <nav class="text-[12.5px] text-white/60" aria-label="Breadcrumb">
          <ol class="flex flex-wrap items-center gap-1.5">
            <li>
              <RouterLink to="/" class="transition hover:text-white">
                Home
              </RouterLink>
            </li>
            <li aria-hidden="true" class="text-white/35">/</li>
            <li class="font-semibold text-white">Leadership</li>
          </ol>
        </nav>

        <div class="mt-5 flex items-center gap-3">
          <span class="h-[2px] w-7 rounded-full bg-[#c4b5f0]" aria-hidden="true" />
          <p
            class="text-[11px] font-bold tracking-[0.2em] text-[#c4b5f0] uppercase sm:text-xs"
          >
            OREDA · Leadership directory
          </p>
        </div>

        <h1
          id="who-hero-heading"
          class="mt-3 font-display text-[clamp(1.9rem,4.2vw,3rem)] leading-[1.1] font-semibold tracking-[-0.02em] text-white"
        >
          The people guiding
          <span class="text-[#c4b5f0]">Odisha’s</span>
          renewable energy mission.
        </h1>

        <p
          class="mt-3.5 max-w-xl text-[14px] leading-relaxed text-white/68 sm:text-[15px]"
        >
          Meet the hon’ble leadership, department officers and OREDA executives
          driving clean energy programmes across the state.
        </p>
      </div>

      <div
        class="who-hero-reveal mt-10 flex flex-wrap gap-x-6 gap-y-3 border-t border-white/12 pt-6"
        style="--delay: 120ms"
      >
        <div
          v-for="(item, index) in highlights"
          :key="item.label"
          class="who-hero-chip"
          :style="{ '--chip-delay': `${160 + index * 70}ms` }"
        >
          <span class="who-hero-chip-icon" aria-hidden="true">
            <component :is="item.icon" :size="15" :stroke-width="2" />
          </span>
          <span>{{ item.label }}</span>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.who-hero-base {
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

.who-hero-mesh {
  position: absolute;
  inset: 0;
  opacity: 0.28;
  background-image:
    linear-gradient(rgba(255, 255, 255, 0.045) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.045) 1px, transparent 1px);
  background-size: 44px 44px;
  mask-image: radial-gradient(ellipse 70% 80% at 75% 35%, black 12%, transparent 78%);
}

.who-hero-glow {
  position: absolute;
  border-radius: 9999px;
  filter: blur(72px);
}

.who-hero-glow--a {
  top: -28%;
  right: -8%;
  width: min(52vw, 440px);
  height: min(52vw, 440px);
  background: radial-gradient(circle, rgba(196, 181, 240, 0.28), transparent 68%);
}

.who-hero-glow--b {
  bottom: -36%;
  left: 2%;
  width: min(42vw, 340px);
  height: min(42vw, 340px);
  background: radial-gradient(circle, rgba(56, 32, 128, 0.55), transparent 70%);
}

.who-hero-slash {
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

.who-hero-watermark {
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

.who-hero-chip {
  display: inline-flex;
  align-items: center;
  gap: 0.55rem;
  font-size: 12.5px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.78);
  opacity: 0;
  transform: translateY(8px);
  transition:
    opacity 0.5s cubic-bezier(0.22, 1, 0.36, 1),
    transform 0.5s cubic-bezier(0.22, 1, 0.36, 1);
  transition-delay: var(--chip-delay, 0ms);
}

.is-inview .who-hero-chip {
  opacity: 1;
  transform: translateY(0);
}

.who-hero-chip-icon {
  display: grid;
  place-items: center;
  width: 1.85rem;
  height: 1.85rem;
  color: #efe8ff;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(196, 181, 240, 0.35);
}

.who-hero-reveal {
  opacity: 0;
  transform: translateY(16px);
  transition:
    opacity 0.65s cubic-bezier(0.22, 1, 0.36, 1),
    transform 0.65s cubic-bezier(0.22, 1, 0.36, 1);
  transition-delay: var(--delay, 0ms);
}

.is-inview .who-hero-reveal {
  opacity: 1;
  transform: translateY(0);
}

@media (prefers-reduced-motion: reduce) {
  .who-hero-reveal,
  .who-hero-chip {
    opacity: 1;
    transform: none;
    transition: none;
  }
}
</style>
