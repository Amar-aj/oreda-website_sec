<script setup lang="ts">
import {
  ArrowRight,
  Building2,
  Leaf,
  Lightbulb,
  Sun,
  Tractor,
  Users,
} from 'lucide-vue-next'
import { onMounted, onUnmounted, ref } from 'vue'
import { RouterLink } from 'vue-router'

const schemes = [
  {
    id: 1,
    icon: Sun,
    title: 'PM Surya Ghar',
    text: 'Rooftop solar subsidy support for households to cut power bills and adopt clean energy.',
  },
  {
    id: 2,
    icon: Tractor,
    title: 'PM KUSUM',
    text: 'Solar pumps and renewable energy for farmers to strengthen irrigation and livelihoods.',
  },
  {
    id: 3,
    icon: Building2,
    title: 'Rooftop Solar',
    text: 'Grid-connected rooftop systems for government buildings, campuses and institutions.',
  },
  {
    id: 4,
    icon: Lightbulb,
    title: 'Solar Street Lighting',
    text: 'LED solar street lights improving safety and night-time access in rural blocks.',
  },
  {
    id: 5,
    icon: Leaf,
    title: 'Biogas Programmes',
    text: 'Community and household biogas solutions supporting rural energy and waste use.',
  },
  {
    id: 6,
    icon: Users,
    title: 'Grievance & Guidance',
    text: 'Help with scheme eligibility, applications, status updates and field-level support.',
  },
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
    { threshold: 0.16 },
  )
  if (sectionRef.value) observer.observe(sectionRef.value)
})

onUnmounted(() => observer?.disconnect())
</script>

<template>
  <section
    ref="sectionRef"
    class="schemes relative w-full overflow-hidden bg-white"
    aria-labelledby="schemes-heading"
    :class="{ 'is-inview': inView }"
  >
    <div class="pointer-events-none absolute inset-0" aria-hidden="true">
      <div class="schemes-wash" />
      <div
        class="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-oreda/20 to-transparent"
      />
    </div>

    <div
      class="relative mx-auto max-w-[1400px] px-4 py-8 sm:px-6 sm:py-9 lg:px-8 lg:py-10"
    >
      <!-- Header -->
      <div
        class="schemes-reveal grid gap-5 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] lg:items-end lg:gap-10"
        style="--delay: 0ms"
      >
        <div>
          <div class="flex items-center gap-3">
            <span class="h-[2px] w-7 bg-oreda" aria-hidden="true" />
            <p
              class="text-[11px] font-bold tracking-[0.2em] text-oreda uppercase sm:text-xs"
            >
              Schemes &amp; Citizen Services
            </p>
          </div>

          <h2
            id="schemes-heading"
            class="mt-3.5 font-display text-[clamp(1.7rem,3.2vw,2.45rem)] leading-[1.16] font-semibold tracking-[-0.01em] text-oreda-dark"
          >
            Clean energy programmes
            <span class="text-oreda">for every citizen</span>
          </h2>
        </div>

        <div class="lg:pb-1 lg:text-right">
          <p class="text-[14px] leading-relaxed text-[#6b7280] sm:text-[15px] lg:ml-auto lg:max-w-md">
            Explore schemes and citizen services delivered by OREDA,<br class="hidden lg:inline" />
            Department of Energy, Government of Odisha.
          </p>
          <RouterLink
            to="/schemes"
            class="group mt-3 inline-flex items-center gap-1.5 text-[14px] font-bold text-oreda transition hover:text-oreda-dark"
          >
            View all schemes
            <ArrowRight
              :size="15"
              :stroke-width="2.4"
              class="transition group-hover:translate-x-0.5"
            />
          </RouterLink>
        </div>
      </div>

      <!-- Scheme grid -->
      <div
        class="schemes-reveal mt-7 grid gap-4 sm:mt-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5"
        style="--delay: 100ms"
        role="list"
      >
        <RouterLink
          v-for="(scheme, index) in schemes"
          :key="scheme.id"
          to="/schemes"
          class="schemes-item group"
          role="listitem"
          :style="{ '--item-delay': `${180 + index * 55}ms` }"
        >
          <span class="schemes-item-accent" aria-hidden="true" />
          <span class="schemes-item-glow" aria-hidden="true" />

          <div class="relative flex items-start justify-between gap-3">
            <span class="schemes-icon">
              <component
                :is="scheme.icon"
                :size="20"
                :stroke-width="1.6"
              />
            </span>
            <span class="schemes-index">
              {{ String(index + 1).padStart(2, '0') }}
            </span>
          </div>

          <div class="relative mt-5 flex-1">
            <h3 class="schemes-title">
              {{ scheme.title }}
            </h3>
            <p class="mt-2.5 text-[14px] leading-relaxed text-[#6b7280]">
              {{ scheme.text }}
            </p>
          </div>

          <div
            class="relative mt-6 flex items-center justify-between border-t border-oreda-dark/8 pt-4"
          >
            <span
              class="inline-flex items-center gap-1.5 text-[13.5px] font-bold text-oreda"
            >
              Know more
              <ArrowRight
                :size="14"
                :stroke-width="2.4"
                class="transition duration-300 group-hover:translate-x-1"
              />
            </span>
            <span
              class="schemes-arrow"
              aria-hidden="true"
            >
              <ArrowRight :size="15" :stroke-width="2.2" />
            </span>
          </div>
        </RouterLink>
      </div>
    </div>
  </section>
</template>

<style scoped>
.schemes-wash {
  position: absolute;
  inset: 0;
  background:
    radial-gradient(ellipse 55% 45% at 8% 0%, rgba(56, 32, 128, 0.06), transparent 55%),
    radial-gradient(ellipse 45% 40% at 92% 100%, rgba(72, 40, 136, 0.05), transparent 50%),
    linear-gradient(180deg, #faf9fc 0%, #ffffff 48%, #f7f6fb 100%);
}

.schemes-item {
  position: relative;
  display: flex;
  flex-direction: column;
  min-height: 100%;
  overflow: hidden;
  border: 1px solid rgba(0, 16, 56, 0.08);
  background:
    linear-gradient(165deg, rgba(255, 255, 255, 0.98) 0%, rgba(247, 245, 252, 0.95) 100%);
  padding: 1.35rem 1.35rem 1.2rem;
  opacity: 0;
  transform: translateY(18px);
  transition:
    opacity 0.65s cubic-bezier(0.22, 1, 0.36, 1),
    transform 0.65s cubic-bezier(0.22, 1, 0.36, 1),
    border-color 0.3s ease,
    box-shadow 0.3s ease;
  transition-delay: var(--item-delay, 0ms);
}

.schemes-item-accent {
  position: absolute;
  top: 0;
  left: 0;
  height: 3px;
  width: 0;
  background: linear-gradient(90deg, #382080, #8b6fd4 60%, #c4b5f0);
  transition: width 0.45s cubic-bezier(0.22, 1, 0.36, 1);
}

.schemes-item-glow {
  position: absolute;
  top: -40%;
  right: -20%;
  width: 11rem;
  height: 11rem;
  border-radius: 9999px;
  background: radial-gradient(circle, rgba(56, 32, 128, 0.1), transparent 68%);
  opacity: 0;
  transition: opacity 0.4s ease;
}

.schemes-icon {
  display: flex;
  height: 2.75rem;
  width: 2.75rem;
  align-items: center;
  justify-content: center;
  color: #382080;
  background: linear-gradient(145deg, rgba(56, 32, 128, 0.1), rgba(56, 32, 128, 0.04));
  border: 1px solid rgba(56, 32, 128, 0.1);
  box-shadow: 0 8px 18px -14px rgba(56, 32, 128, 0.55);
  transition:
    background 0.3s ease,
    color 0.3s ease,
    border-color 0.3s ease,
    transform 0.3s ease;
}

.schemes-index {
  align-self: flex-start;
  font-family: var(--font-display);
  font-size: 1.05rem;
  font-weight: 600;
  letter-spacing: 0.04em;
  line-height: 1;
  color: rgba(56, 32, 128, 0.35);
  transition: color 0.25s ease;
}

.schemes-item:hover .schemes-index {
  color: #382080;
}

.schemes-title {
  font-family: var(--font-display);
  font-size: 1.2rem;
  line-height: 1.25;
  color: #001038;
  transition: color 0.25s ease;
}

.schemes-arrow {
  display: flex;
  height: 2rem;
  width: 2rem;
  align-items: center;
  justify-content: center;
  color: #8b849c;
  border: 1px solid rgba(0, 16, 56, 0.1);
  background: #fff;
  transition:
    background 0.3s ease,
    color 0.3s ease,
    border-color 0.3s ease,
    transform 0.3s cubic-bezier(0.22, 1, 0.36, 1);
}

.schemes-item:hover {
  border-color: rgba(56, 32, 128, 0.2);
  box-shadow:
    0 22px 44px -28px rgba(0, 16, 56, 0.4),
    0 1px 0 rgba(255, 255, 255, 0.9) inset;
  transform: translateY(-4px);
}

.schemes-item:hover .schemes-item-accent {
  width: 100%;
}

.schemes-item:hover .schemes-item-glow {
  opacity: 1;
}

.schemes-item:hover .schemes-icon {
  color: #fff;
  background: #382080;
  border-color: #382080;
  transform: scale(1.04);
}

.schemes-item:hover .schemes-title {
  color: #382080;
}

.schemes-item:hover .schemes-arrow {
  color: #fff;
  background: #001038;
  border-color: #001038;
  transform: translateX(2px);
}

.is-inview .schemes-item {
  opacity: 1;
  transform: translateY(0);
}

.is-inview .schemes-item:hover {
  transform: translateY(-4px);
}

.schemes-reveal {
  opacity: 0;
  transform: translateY(16px);
  transition:
    opacity 0.65s cubic-bezier(0.22, 1, 0.36, 1),
    transform 0.65s cubic-bezier(0.22, 1, 0.36, 1);
  transition-delay: var(--delay, 0ms);
}

.is-inview .schemes-reveal {
  opacity: 1;
  transform: translateY(0);
}

@media (prefers-reduced-motion: reduce) {
  .schemes-reveal,
  .schemes-item,
  .schemes-item-accent,
  .schemes-icon,
  .schemes-arrow {
    transition: none !important;
  }

  .schemes-reveal,
  .schemes-item {
    opacity: 1;
    transform: none;
  }

  .is-inview .schemes-item:hover {
    transform: none;
  }
}
</style>
