<script setup lang="ts">
import aboutImg from '@/assets/images/about/about-panel.jpg'
import { ArrowRight, Handshake, Leaf, Users } from 'lucide-vue-next'
import { RouterLink } from 'vue-router'

const highlights = [
  {
    icon: Leaf,
    title: 'Renewable Energy Promotion',
    text: 'Advancing solar, wind and clean energy initiatives across Odisha.',
  },
  {
    icon: Users,
    title: 'Community Impact',
    text: 'Enabling sustainable growth for a brighter future.',
  },
  {
    icon: Handshake,
    title: 'Strategic Partnerships',
    text: 'Collaborating with stakeholders for a resilient and energy-secure Odisha.',
  },
]

const stats = [
  { value: '30+', label: 'Years of Service' },
  { value: 'All 30', label: 'Districts Covered' },
  { value: 'Clean', label: 'Energy Focus' },
  { value: 'Millions', label: 'Lives Impacted' },
]

const wheelSpokes = Array.from({ length: 16 }, (_, i) => {
  const angle = (i * Math.PI) / 8
  return {
    x2: 50 + 36 * Math.cos(angle),
    y2: 50 + 36 * Math.sin(angle),
  }
})
</script>

<template>
  <section
    id="about-oreda"
    class="about-oreda w-full overflow-hidden bg-white pb-5 sm:pb-6"
    aria-labelledby="about-oreda-heading"
  >
    <div class="grid w-full lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.35fr)] lg:min-h-[320px]">
      <!-- LEFT: text aligns with upper sections; right image stays full-bleed -->
      <div
        class="about-left relative z-10 flex items-center bg-[#f5f6f8] py-6 pr-4 sm:py-7 sm:pr-6 lg:py-8 lg:pr-8"
      >
        <div class="relative z-10 w-full max-w-[540px]">
          <div class="relative">
            <!-- Background watermark — absolute so it doesn't affect spacing -->
            <p
              class="pointer-events-none absolute top-1/2 left-[10rem] z-0 -translate-y-1/2 select-none font-display text-[clamp(3.25rem,7vw,5.25rem)] leading-none tracking-tight whitespace-nowrap text-oreda-dark/[0.07] sm:left-[11rem]"
              aria-hidden="true"
            >
              OREDA
            </p>

            <div class="relative z-10">
              <p
                class="text-[11px] font-bold tracking-[0.22em] text-oreda-dark uppercase sm:text-xs"
              >
                About OREDA
              </p>
              <span
                class="mt-2.5 block h-[3px] w-12 bg-oreda"
                aria-hidden="true"
              />
            </div>
          </div>

          <h2
            id="about-oreda-heading"
            class="mt-5 font-display text-[clamp(2rem,3.4vw,2.85rem)] leading-[1.22] font-semibold tracking-[-0.01em]"
          >
            <span class="text-oreda-dark">Driving a</span><br />
            <span class="text-oreda">Cleaner, Greener</span><br />
            <span class="text-oreda-dark">and Brighter Odisha</span>
          </h2>

          <p class="mt-4 text-[15px] leading-[1.65] text-[#6b7280] sm:text-[15.5px]">
            OREDA Limited, under the Department of Energy, Government of Odisha,
            is committed to promoting renewable energy through innovative
            policies, sustainable projects and strategic partnerships for a
            resilient and prosperous Odisha.
          </p>

          <RouterLink
            to="/about"
            class="group relative z-10 mt-6 inline-flex shrink-0 items-center gap-2 rounded-[4px] bg-oreda-dark px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-oreda focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-oreda"
          >
            Know more about OREDA
            <ArrowRight
              :size="16"
              :stroke-width="2.25"
              class="transition group-hover:translate-x-0.5"
            />
          </RouterLink>
        </div>
      </div>

      <!-- RIGHT: landscape + overlays -->
      <div class="relative z-20 min-h-[280px] sm:min-h-[300px] lg:min-h-full">
        <img
          :src="aboutImg"
          alt="Solar panels, wind turbines and renewable energy campus landscape"
          class="absolute inset-0 h-full w-full object-cover object-center"
        />

        <!-- Feature cards — flush to the right edge of the image -->
        <div
          class="absolute top-[10%] right-0 z-10 w-[min(88%,300px)] overflow-hidden rounded-l-md bg-white shadow-[-8px_12px_40px_rgba(0,16,56,0.18)] sm:w-[320px] lg:w-[340px]"
        >
          <div
            v-for="(item, index) in highlights"
            :key="item.title"
            class="flex items-start gap-3 px-4 py-3.5 sm:gap-3.5 sm:px-5 sm:py-4"
            :class="index < highlights.length - 1 ? 'border-b border-[#e8eaee]' : ''"
          >
            <component
              :is="item.icon"
              :size="22"
              :stroke-width="1.6"
              class="mt-0.5 shrink-0 text-oreda"
            />
            <div class="min-w-0 flex-1">
              <div class="flex items-start justify-between gap-2">
                <h3
                  class="font-display text-[14px] leading-snug text-oreda-dark sm:text-[15px]"
                >
                  {{ item.title }}
                </h3>
                <ArrowRight
                  :size="13"
                  :stroke-width="2.25"
                  class="mt-1 shrink-0 text-oreda-dark/55"
                />
              </div>
              <p class="mt-1 text-[11px] leading-snug text-[#7a8190] sm:text-xs">
                {{ item.text }}
              </p>
            </div>
          </div>
        </div>

        <!-- Stats bar — full width of landscape column -->
        <div
          class="absolute inset-x-0 bottom-0 z-10 overflow-hidden bg-[#001038] px-2 py-3 sm:px-3 sm:py-3.5"
        >
          <svg
            class="pointer-events-none absolute right-0 bottom-0 h-24 w-24 text-[#5a7aaa]/30 sm:h-28 sm:w-28"
            viewBox="0 0 100 100"
            fill="none"
            stroke="currentColor"
            stroke-width="1"
            aria-hidden="true"
          >
            <circle cx="50" cy="50" r="42" />
            <circle cx="50" cy="50" r="32" />
            <circle cx="50" cy="50" r="10" />
            <line
              v-for="(spoke, i) in wheelSpokes"
              :key="i"
              x1="50"
              y1="50"
              :x2="spoke.x2"
              :y2="spoke.y2"
            />
          </svg>

          <div
            class="relative grid grid-cols-2 sm:grid-cols-4 sm:divide-x sm:divide-white/20"
          >
            <div
              v-for="stat in stats"
              :key="stat.label"
              class="px-2 py-0.5 text-center sm:px-3"
            >
              <p
                class="font-display text-[1.5rem] leading-none text-white sm:text-[1.7rem]"
              >
                {{ stat.value }}
              </p>
              <p
                class="mt-1.5 text-[9px] font-semibold tracking-[0.14em] text-[#9eb6d4] uppercase sm:text-[10px]"
              >
                {{ stat.label }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* Match Latest News / hero: max-w-[1400px] + px-4 / sm:px-6 / lg:px-8 */
.about-left {
  padding-left: max(1rem, calc((100vw - 1400px) / 2 + 1rem));
}

@media (min-width: 640px) {
  .about-left {
    padding-left: max(1.5rem, calc((100vw - 1400px) / 2 + 1.5rem));
  }
}

@media (min-width: 1024px) {
  .about-left {
    padding-left: max(2rem, calc((100vw - 1400px) / 2 + 2rem));
  }
}
</style>
