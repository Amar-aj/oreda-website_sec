<script setup lang="ts">
import { FolderKanban, ScrollText, Sun, Users } from 'lucide-vue-next'
import { onMounted, onUnmounted, ref } from 'vue'
import { RouterLink } from 'vue-router'

const pillars = [
  { label: 'Solar', detail: 'Clean power', icon: Sun, top: '4%', left: '50%' },
  { label: 'Schemes', detail: 'Citizen first', icon: ScrollText, top: '50%', left: '96%' },
  { label: 'Projects', detail: 'Statewide', icon: FolderKanban, top: '96%', left: '50%' },
  { label: 'Community', detail: 'Inclusive', icon: Users, top: '50%', left: '4%' },
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
    class="about-hero relative w-full overflow-hidden"
    aria-labelledby="about-hero-heading"
    :class="{ 'is-inview': inView }"
  >
    <div class="pointer-events-none absolute inset-0" aria-hidden="true">
      <div class="about-hero-base" />
      <div class="about-hero-mesh" />
      <div class="about-hero-glow about-hero-glow--a" />
      <div class="about-hero-glow about-hero-glow--b" />
      <p class="about-hero-watermark">OREDA</p>
    </div>

    <div
      class="relative mx-auto grid max-w-[1400px] items-center gap-8 px-4 py-7 sm:px-6 sm:py-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.9fr)] lg:gap-4 lg:px-8 lg:py-9"
    >
      <!-- Left copy -->
      <div class="about-hero-reveal max-w-xl" style="--delay: 0ms">
        <nav class="text-[12.5px] text-white/60" aria-label="Breadcrumb">
          <ol class="flex flex-wrap items-center gap-1.5">
            <li>
              <RouterLink to="/" class="transition hover:text-white">
                Home
              </RouterLink>
            </li>
            <li aria-hidden="true" class="text-white/35">/</li>
            <li class="font-semibold text-white">About Us</li>
          </ol>
        </nav>

        <div class="mt-4 flex items-center gap-3">
          <span class="h-[2px] w-7 rounded-full bg-[#c4b5f0]" aria-hidden="true" />
          <p
            class="text-[11px] font-bold tracking-[0.2em] text-[#c4b5f0] uppercase sm:text-xs"
          >
            Renewable Energy Agency
          </p>
        </div>

        <h1
          id="about-hero-heading"
          class="mt-2.5 font-display text-[clamp(1.55rem,3.2vw,2.35rem)] leading-[1.15] font-semibold tracking-[-0.02em] text-white"
        >
          Powering Odisha’s
          <span class="text-[#c4b5f0]">clean energy</span>
          future.
        </h1>

        <p
          class="mt-2.5 max-w-lg text-[13.5px] leading-relaxed text-white/68 sm:text-[14.5px]"
        >
          OREDA is the Government of Odisha’s nodal agency for renewable
          energy—delivering solar programmes, citizen schemes and clean-power
          projects that make sustainable energy accessible across the state.
        </p>
      </div>

      <!-- Right: advanced orbit -->
      <div
        class="about-hero-reveal relative mx-auto w-full max-w-[300px] sm:max-w-[320px] lg:max-w-[340px]"
        style="--delay: 140ms"
      >
        <div class="about-orbit" aria-hidden="true">
          <div class="about-orbit-bloom" />
          <div class="about-orbit-ring about-orbit-ring--soft" />
          <div class="about-orbit-ring about-orbit-ring--dash" />
          <div class="about-orbit-pulse" />

          <div class="about-orbit-core">
            <span class="about-orbit-core-mark" />
            <span class="about-orbit-core-title">OREDA</span>
            <span class="about-orbit-core-sub">Since 1984</span>
          </div>

          <div
            v-for="(pillar, index) in pillars"
            :key="pillar.label"
            class="about-orbit-node"
            :style="{
              top: pillar.top,
              left: pillar.left,
              '--node-delay': `${80 + index * 90}ms`,
            }"
          >
            <div class="about-orbit-card">
              <span class="about-orbit-icon">
                <component :is="pillar.icon" :size="14" :stroke-width="2.2" />
              </span>
              <span class="about-orbit-copy">
                <span class="about-orbit-label">{{ pillar.label }}</span>
                <span class="about-orbit-detail">{{ pillar.detail }}</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.about-hero-base {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    118deg,
    #00081f 0%,
    #001038 28%,
    #24145a 62%,
    #382080 86%,
    #4a2f8f 100%
  );
}

.about-hero-mesh {
  position: absolute;
  inset: 0;
  opacity: 0.28;
  background-image:
    linear-gradient(rgba(255, 255, 255, 0.04) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.04) 1px, transparent 1px);
  background-size: 42px 42px;
  mask-image: radial-gradient(ellipse 65% 75% at 70% 45%, black 15%, transparent 75%);
}

.about-hero-glow {
  position: absolute;
  border-radius: 9999px;
  filter: blur(70px);
}

.about-hero-glow--a {
  top: -20%;
  right: -8%;
  width: min(50vw, 420px);
  height: min(50vw, 420px);
  background: radial-gradient(circle, rgba(196, 181, 240, 0.28), transparent 68%);
}

.about-hero-glow--b {
  bottom: -30%;
  left: 8%;
  width: min(40vw, 320px);
  height: min(40vw, 320px);
  background: radial-gradient(circle, rgba(56, 32, 128, 0.55), transparent 70%);
}

.about-hero-watermark {
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 1;
  margin: 0;
  transform: translate(-50%, -50%);
  font-family: var(--font-display);
  font-size: clamp(4.5rem, 16vw, 10rem);
  font-weight: 600;
  line-height: 1;
  letter-spacing: -0.045em;
  color: rgba(255, 255, 255, 0.07);
  user-select: none;
  white-space: nowrap;
  pointer-events: none;
}

/* Orbit visual */
.about-orbit {
  position: relative;
  aspect-ratio: 1 / 1;
  width: 100%;
}

.about-orbit-bloom {
  position: absolute;
  inset: 18%;
  border-radius: 9999px;
  background: radial-gradient(
    circle,
    rgba(255, 255, 255, 0.14) 0%,
    rgba(196, 181, 240, 0.08) 38%,
    transparent 70%
  );
}

.about-orbit-ring {
  position: absolute;
  inset: 20%;
  border-radius: 9999px;
  pointer-events: none;
}

.about-orbit-ring--soft {
  border: 1px solid rgba(255, 255, 255, 0.22);
  box-shadow:
    inset 0 0 24px rgba(196, 181, 240, 0.08),
    0 0 40px rgba(196, 181, 240, 0.08);
}

.about-orbit-ring--dash {
  inset: 19.5%;
  border: 1.5px dashed rgba(196, 181, 240, 0.45);
  animation: orbit-spin 28s linear infinite;
}

.about-orbit-pulse {
  position: absolute;
  inset: 32%;
  border-radius: 9999px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  animation: orbit-pulse 3.6s ease-in-out infinite;
}

.about-orbit-core {
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 4;
  display: flex;
  width: 5.6rem;
  height: 5.6rem;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 9999px;
  background: linear-gradient(160deg, #ffffff 0%, #f3eefc 100%);
  box-shadow:
    0 14px 34px -12px rgba(0, 8, 31, 0.55),
    0 0 0 1px rgba(255, 255, 255, 0.7) inset,
    0 0 0 8px rgba(255, 255, 255, 0.06);
  transform: translate(-50%, -50%);
}

.about-orbit-core-mark {
  width: 1.15rem;
  height: 2px;
  margin-bottom: 0.35rem;
  border-radius: 9999px;
  background: linear-gradient(90deg, #382080, #8b6fd4);
}

.about-orbit-core-title {
  font-family: var(--font-display);
  font-size: 1.05rem;
  font-weight: 600;
  line-height: 1;
  letter-spacing: 0.04em;
  color: #001038;
}

.about-orbit-core-sub {
  margin-top: 0.28rem;
  font-size: 9px;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: #5c5278;
}

.about-orbit-node {
  position: absolute;
  z-index: 5;
  transform: translate(-50%, -50%);
  opacity: 0;
  transition:
    opacity 0.55s cubic-bezier(0.22, 1, 0.36, 1),
    transform 0.55s cubic-bezier(0.22, 1, 0.36, 1);
  transition-delay: var(--node-delay, 0ms);
}

.is-inview .about-orbit-node {
  opacity: 1;
}

.about-orbit-card {
  display: flex;
  align-items: center;
  gap: 0.45rem;
  min-width: 7.4rem;
  padding: 0.4rem 0.55rem 0.4rem 0.4rem;
  color: #fff;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.22);
  backdrop-filter: blur(2px);
  -webkit-backdrop-filter: blur(2px);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.12);
  transition:
    transform 0.3s ease,
    border-color 0.3s ease,
    background 0.3s ease,
    box-shadow 0.3s ease;
}

.about-orbit-card:hover {
  transform: translateY(-3px);
  border-color: rgba(196, 181, 240, 0.5);
  background: rgba(255, 255, 255, 0.1);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.2);
}

.about-orbit-icon {
  display: grid;
  place-items: center;
  width: 1.85rem;
  height: 1.85rem;
  flex-shrink: 0;
  color: #efe8ff;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(196, 181, 240, 0.35);
  border-radius: 9999px;
}

.about-orbit-copy {
  display: flex;
  min-width: 0;
  flex-direction: column;
  line-height: 1.15;
}

.about-orbit-label {
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.01em;
}

.about-orbit-detail {
  margin-top: 0.12rem;
  font-size: 10px;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.62);
}

.is-inview .about-orbit-card {
  animation: node-float 4.8s ease-in-out infinite;
  animation-delay: var(--node-delay, 0ms);
}

@keyframes orbit-spin {
  to {
    transform: rotate(360deg);
  }
}

@keyframes orbit-pulse {
  0%,
  100% {
    opacity: 0.35;
    transform: scale(1);
  }
  50% {
    opacity: 0.7;
    transform: scale(1.04);
  }
}

@keyframes node-float {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-3px);
  }
}

.about-hero-reveal {
  opacity: 0;
  transform: translateY(16px);
  transition:
    opacity 0.65s cubic-bezier(0.22, 1, 0.36, 1),
    transform 0.65s cubic-bezier(0.22, 1, 0.36, 1);
  transition-delay: var(--delay, 0ms);
}

.is-inview .about-hero-reveal {
  opacity: 1;
  transform: translateY(0);
}

@media (prefers-reduced-motion: reduce) {
  .about-orbit-ring--dash,
  .about-orbit-pulse,
  .is-inview .about-orbit-card {
    animation: none;
  }

  .about-hero-reveal {
    opacity: 1;
    transform: none;
    transition: none;
  }

  .about-orbit-node {
    opacity: 1;
    transition: none;
  }
}
</style>
