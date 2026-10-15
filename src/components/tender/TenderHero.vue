<script setup lang="ts">
import { ArrowDown, ClipboardList, FileStack, ShieldCheck } from 'lucide-vue-next'
import { onMounted, onUnmounted, ref } from 'vue'
import { RouterLink } from 'vue-router'

const highlights = [
  { icon: ClipboardList, label: 'Live notices' },
  { icon: FileStack, label: 'RFP & corrigenda' },
  { icon: ShieldCheck, label: 'Official releases' },
]

const sectionRef = ref<HTMLElement | null>(null)
const inView = ref(false)
let observer: IntersectionObserver | null = null

function scrollToBoard() {
  document.getElementById('tender-board')?.scrollIntoView({
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
    class="tender-hero relative w-full overflow-hidden"
    aria-labelledby="tender-hero-heading"
    :class="{ 'is-inview': inView }"
  >
    <div class="pointer-events-none absolute inset-0" aria-hidden="true">
      <div class="tender-hero-base" />
      <div class="tender-hero-mesh" />
      <div class="tender-hero-glow tender-hero-glow--a" />
      <div class="tender-hero-glow tender-hero-glow--b" />
      <div class="tender-hero-slash" />
      <p class="tender-hero-watermark">TENDERS</p>
    </div>

    <div
      class="relative mx-auto flex max-w-[1400px] flex-col justify-center px-4 py-9 sm:px-6 sm:py-11 lg:min-h-[17.5rem] lg:px-8 lg:py-12"
    >
      <div class="tender-hero-reveal max-w-2xl" style="--delay: 0ms">
        <nav class="text-[12.5px] text-white/60" aria-label="Breadcrumb">
          <ol class="flex flex-wrap items-center gap-1.5">
            <li>
              <RouterLink to="/" class="transition hover:text-white">
                Home
              </RouterLink>
            </li>
            <li aria-hidden="true" class="text-white/35">/</li>
            <li class="font-semibold text-white">Tenders</li>
          </ol>
        </nav>

        <div class="mt-5 flex items-center gap-3">
          <span class="h-[2px] w-7 rounded-full bg-[#c4b5f0]" aria-hidden="true" />
          <p
            class="text-[11px] font-bold tracking-[0.2em] text-[#c4b5f0] uppercase sm:text-xs"
          >
            OREDA · Procurement notices
          </p>
        </div>

        <h1
          id="tender-hero-heading"
          class="mt-3 font-display text-[clamp(1.9rem,4.2vw,3rem)] leading-[1.1] font-semibold tracking-[-0.02em] text-white"
        >
          Official tenders,
          <span class="text-[#c4b5f0]">corrigenda</span>
          and RFP updates.
        </h1>

        <p
          class="mt-3.5 max-w-xl text-[14px] leading-relaxed text-white/68 sm:text-[15px]"
        >
          Browse active and archived procurement notices. Each tender keeps its
          full document trail — NIT, RFP revisions and corrigenda — in one place.
        </p>

        <div class="mt-7 flex flex-wrap items-center gap-3">
          <button type="button" class="tender-hero-cta group" @click="scrollToBoard">
            <span>View tender board</span>
            <span class="tender-hero-cta-icon" aria-hidden="true">
              <ArrowDown :size="14" :stroke-width="2.4" />
            </span>
          </button>
          <RouterLink to="/contact" class="tender-hero-link">
            Procurement desk
          </RouterLink>
        </div>
      </div>

      <div
        class="tender-hero-reveal mt-7 flex flex-wrap gap-x-6 gap-y-3 border-t border-white/12 pt-5"
        style="--delay: 120ms"
      >
        <div
          v-for="(item, index) in highlights"
          :key="item.label"
          class="tender-hero-chip"
          :style="{ '--chip-delay': `${160 + index * 70}ms` }"
        >
          <span class="tender-hero-chip-icon" aria-hidden="true">
            <component :is="item.icon" :size="15" :stroke-width="2" />
          </span>
          <span>{{ item.label }}</span>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.tender-hero-base {
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

.tender-hero-mesh {
  position: absolute;
  inset: 0;
  opacity: 0.28;
  background-image:
    linear-gradient(rgba(255, 255, 255, 0.045) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.045) 1px, transparent 1px);
  background-size: 52px 52px;
  mask-image: radial-gradient(ellipse 75% 70% at 40% 35%, black 20%, transparent 75%);
}

.tender-hero-glow {
  position: absolute;
  border-radius: 9999px;
  filter: blur(4px);
}

.tender-hero-glow--a {
  top: -18%;
  right: -8%;
  width: 28rem;
  height: 22rem;
  background: radial-gradient(circle, rgba(196, 181, 240, 0.28), transparent 70%);
}

.tender-hero-glow--b {
  bottom: -24%;
  left: -10%;
  width: 24rem;
  height: 20rem;
  background: radial-gradient(circle, rgba(56, 32, 128, 0.55), transparent 70%);
}

.tender-hero-slash {
  position: absolute;
  top: -20%;
  right: 18%;
  width: 1px;
  height: 140%;
  background: linear-gradient(
    180deg,
    transparent,
    rgba(255, 255, 255, 0.16),
    transparent
  );
  transform: rotate(18deg);
}

.tender-hero-watermark {
  position: absolute;
  right: -2%;
  bottom: -6%;
  margin: 0;
  font-family: var(--font-display);
  font-size: clamp(4.5rem, 14vw, 9rem);
  font-weight: 600;
  letter-spacing: -0.04em;
  line-height: 0.85;
  color: rgba(255, 255, 255, 0.045);
  user-select: none;
}

.tender-hero-cta {
  display: inline-flex;
  align-items: center;
  gap: 0.65rem;
  padding: 0.85rem 1.15rem;
  font-size: 13.5px;
  font-weight: 700;
  color: #001038;
  background: #fff;
  border: 0;
  cursor: pointer;
  transition:
    transform 0.3s cubic-bezier(0.22, 1, 0.36, 1),
    box-shadow 0.3s ease;
  box-shadow: 0 14px 28px -16px rgba(0, 0, 0, 0.45);
}

.tender-hero-cta:hover {
  transform: translateY(-2px);
  box-shadow: 0 18px 32px -14px rgba(0, 0, 0, 0.5);
}

.tender-hero-cta-icon {
  display: grid;
  place-items: center;
  width: 1.55rem;
  height: 1.55rem;
  color: #fff;
  background: #382080;
  transition: transform 0.3s cubic-bezier(0.22, 1, 0.36, 1);
}

.group:hover .tender-hero-cta-icon {
  transform: translateY(2px);
}

.tender-hero-link {
  font-size: 13.5px;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.78);
  text-decoration: none;
  border-bottom: 1px solid rgba(255, 255, 255, 0.28);
  padding-bottom: 0.15rem;
  transition: color 0.2s ease, border-color 0.2s ease;
}

.tender-hero-link:hover {
  color: #fff;
  border-color: rgba(255, 255, 255, 0.6);
}

.tender-hero-chip {
  display: inline-flex;
  align-items: center;
  gap: 0.55rem;
  font-size: 12.5px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.78);
  opacity: 0;
  transform: translateY(10px);
  transition:
    opacity 0.5s ease,
    transform 0.5s ease;
  transition-delay: var(--chip-delay, 0ms);
}

.is-inview .tender-hero-chip {
  opacity: 1;
  transform: translateY(0);
}

.tender-hero-chip-icon {
  display: grid;
  place-items: center;
  width: 1.85rem;
  height: 1.85rem;
  color: #c4b5f0;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.14);
}

.tender-hero-reveal {
  opacity: 0;
  transform: translateY(18px);
  transition:
    opacity 0.7s cubic-bezier(0.22, 1, 0.36, 1),
    transform 0.7s cubic-bezier(0.22, 1, 0.36, 1);
  transition-delay: var(--delay, 0ms);
}

.is-inview .tender-hero-reveal {
  opacity: 1;
  transform: translateY(0);
}

@media (prefers-reduced-motion: reduce) {
  .tender-hero-reveal,
  .tender-hero-chip {
    opacity: 1;
    transform: none;
    transition: none;
  }
}
</style>
