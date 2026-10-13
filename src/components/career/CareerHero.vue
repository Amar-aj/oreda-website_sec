<script setup lang="ts">
import { ArrowDown, BriefcaseBusiness, Leaf, Users } from 'lucide-vue-next'
import { onMounted, onUnmounted, ref } from 'vue'
import { RouterLink } from 'vue-router'

const highlights = [
  { icon: Leaf, label: 'Clean energy mission' },
  { icon: Users, label: 'Public service impact' },
  { icon: BriefcaseBusiness, label: 'Statewide programmes' },
]

const sectionRef = ref<HTMLElement | null>(null)
const inView = ref(false)
let observer: IntersectionObserver | null = null

function scrollToOpenings() {
  document.getElementById('career-openings')?.scrollIntoView({
    behavior: 'smooth',
    block: 'start',
  })
}

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
    class="career-hero relative w-full overflow-hidden"
    aria-labelledby="career-hero-heading"
    :class="{ 'is-inview': inView }"
  >
    <div class="pointer-events-none absolute inset-0" aria-hidden="true">
      <div class="career-hero-base" />
      <div class="career-hero-mesh" />
      <div class="career-hero-glow career-hero-glow--a" />
      <div class="career-hero-glow career-hero-glow--b" />
      <div class="career-hero-slash" />
      <p class="career-hero-watermark">CAREERS</p>
    </div>

    <div
      class="relative mx-auto flex max-w-[1400px] flex-col justify-center px-4 py-12 sm:px-6 sm:py-14 lg:min-h-[22rem] lg:px-8 lg:py-16"
    >
      <div class="career-hero-reveal max-w-2xl" style="--delay: 0ms">
        <nav class="text-[12.5px] text-white/60" aria-label="Breadcrumb">
          <ol class="flex flex-wrap items-center gap-1.5">
            <li>
              <RouterLink to="/" class="transition hover:text-white">
                Home
              </RouterLink>
            </li>
            <li aria-hidden="true" class="text-white/35">/</li>
            <li class="font-semibold text-white">Career</li>
          </ol>
        </nav>

        <div class="mt-5 flex items-center gap-3">
          <span class="h-[2px] w-7 rounded-full bg-[#c4b5f0]" aria-hidden="true" />
          <p
            class="text-[11px] font-bold tracking-[0.2em] text-[#c4b5f0] uppercase sm:text-xs"
          >
            OREDA · Join our team
          </p>
        </div>

        <h1
          id="career-hero-heading"
          class="mt-3 font-display text-[clamp(1.9rem,4.2vw,3rem)] leading-[1.1] font-semibold tracking-[-0.02em] text-white"
        >
          Shape Odisha’s
          <span class="text-[#c4b5f0]">clean energy</span>
          future with us.
        </h1>

        <p
          class="mt-3.5 max-w-xl text-[14px] leading-relaxed text-white/68 sm:text-[15px]"
        >
          Work with the state’s renewable energy agency on solar programmes,
          community schemes and projects that power a sustainable Odisha.
        </p>

        <div class="mt-7 flex flex-wrap items-center gap-3">
          <button type="button" class="career-hero-cta group" @click="scrollToOpenings">
            <span>View openings</span>
            <span class="career-hero-cta-icon" aria-hidden="true">
              <ArrowDown :size="14" :stroke-width="2.4" />
            </span>
          </button>
          <RouterLink to="/contact" class="career-hero-link">
            Contact HR desk
          </RouterLink>
        </div>
      </div>

      <div
        class="career-hero-reveal mt-10 flex flex-wrap gap-x-6 gap-y-3 border-t border-white/12 pt-6"
        style="--delay: 120ms"
      >
        <div
          v-for="(item, index) in highlights"
          :key="item.label"
          class="career-hero-chip"
          :style="{ '--chip-delay': `${160 + index * 70}ms` }"
        >
          <span class="career-hero-chip-icon" aria-hidden="true">
            <component :is="item.icon" :size="15" :stroke-width="2" />
          </span>
          <span>{{ item.label }}</span>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.career-hero-base {
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

.career-hero-mesh {
  position: absolute;
  inset: 0;
  opacity: 0.28;
  background-image:
    linear-gradient(rgba(255, 255, 255, 0.045) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.045) 1px, transparent 1px);
  background-size: 44px 44px;
  mask-image: radial-gradient(ellipse 70% 80% at 75% 35%, black 12%, transparent 78%);
}

.career-hero-glow {
  position: absolute;
  border-radius: 9999px;
  filter: blur(72px);
}

.career-hero-glow--a {
  top: -28%;
  right: -8%;
  width: min(52vw, 440px);
  height: min(52vw, 440px);
  background: radial-gradient(circle, rgba(196, 181, 240, 0.28), transparent 68%);
}

.career-hero-glow--b {
  bottom: -36%;
  left: 2%;
  width: min(42vw, 340px);
  height: min(42vw, 340px);
  background: radial-gradient(circle, rgba(56, 32, 128, 0.55), transparent 70%);
}

.career-hero-slash {
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

.career-hero-watermark {
  position: absolute;
  top: 55%;
  right: 2%;
  margin: 0;
  transform: translateY(-50%);
  font-family: var(--font-display);
  font-size: clamp(3.5rem, 12vw, 8rem);
  font-weight: 600;
  line-height: 1;
  letter-spacing: -0.04em;
  color: rgba(255, 255, 255, 0.07);
  user-select: none;
  pointer-events: none;
}

.career-hero-cta {
  display: inline-flex;
  align-items: center;
  gap: 0.55rem;
  padding: 0.72rem 0.75rem 0.72rem 1.15rem;
  font-size: 13px;
  font-weight: 700;
  color: #001038;
  background: #fff;
  border: 0;
  cursor: pointer;
  box-shadow: 0 12px 28px -14px rgba(0, 0, 0, 0.45);
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;
}

.career-hero-cta:hover {
  transform: translateY(-1px);
  box-shadow: 0 16px 32px -14px rgba(0, 0, 0, 0.5);
}

.career-hero-cta-icon {
  display: grid;
  place-items: center;
  width: 1.7rem;
  height: 1.7rem;
  background: rgba(56, 32, 128, 0.1);
  transition: transform 0.25s ease;
}

.group:hover .career-hero-cta-icon {
  transform: translateY(2px);
}

.career-hero-link {
  font-size: 13px;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.78);
  text-decoration: none;
  border-bottom: 1px solid rgba(196, 181, 240, 0.45);
  padding-bottom: 2px;
  transition: color 0.2s ease;
}

.career-hero-link:hover {
  color: #fff;
}

.career-hero-chip {
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

.is-inview .career-hero-chip {
  opacity: 1;
  transform: translateY(0);
}

.career-hero-chip-icon {
  display: grid;
  place-items: center;
  width: 1.85rem;
  height: 1.85rem;
  color: #efe8ff;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(196, 181, 240, 0.35);
}

.career-hero-reveal {
  opacity: 0;
  transform: translateY(16px);
  transition:
    opacity 0.65s cubic-bezier(0.22, 1, 0.36, 1),
    transform 0.65s cubic-bezier(0.22, 1, 0.36, 1);
  transition-delay: var(--delay, 0ms);
}

.is-inview .career-hero-reveal {
  opacity: 1;
  transform: translateY(0);
}

@media (prefers-reduced-motion: reduce) {
  .career-hero-reveal,
  .career-hero-chip {
    opacity: 1;
    transform: none;
    transition: none;
  }
}
</style>
