<script setup lang="ts">
import { MapPin, Sun, Trees, Zap } from 'lucide-vue-next'
import { computed, onMounted, onUnmounted, ref } from 'vue'

type Stat = {
  target: number
  suffix: string
  decimals?: number
  label: string
  hint: string
  icon: typeof Zap
}

const stats: Stat[] = [
  {
    target: 780,
    suffix: '+',
    label: 'MW Renewable Capacity',
    hint: 'Installed across Odisha',
    icon: Zap,
  },
  {
    target: 706,
    suffix: '+',
    label: 'MW Solar Power',
    hint: 'Clean energy online',
    icon: Sun,
  },
  {
    target: 30,
    suffix: '',
    label: 'Districts Covered',
    hint: 'Statewide outreach',
    icon: MapPin,
  },
  {
    target: 30,
    suffix: '+',
    label: 'Years of Service',
    hint: "Powering Odisha's future",
    icon: Trees,
  },
]

const milestones = [
  {
    year: '1990s',
    title: 'Agency Foundation',
    text: 'OREDA established to lead renewable energy development for Odisha.',
  },
  {
    year: '2016',
    title: 'RE Policy Mandate',
    text: 'Named nodal agency for utility-scale solar projects up to 1 MW.',
  },
  {
    year: '2025',
    title: 'Capacity Milestone',
    text: 'State renewable capacity crosses 780 MW with solar leading growth.',
  },
  {
    year: 'Ahead',
    title: '1 GW Ambition',
    text: 'Strategic partnerships advancing wind, floating solar and storage.',
  },
]

const sectionRef = ref<HTMLElement | null>(null)
const inView = ref(false)
const displayValues = ref(stats.map(() => 0))
let rafId = 0
let observer: IntersectionObserver | null = null

const easeOutExpo = (t: number) => (t === 1 ? 1 : 1 - 2 ** (-10 * t))

function animateCounters() {
  const duration = 2200
  const start = performance.now()

  const tick = (now: number) => {
    const progress = Math.min((now - start) / duration, 1)
    const eased = easeOutExpo(progress)

    displayValues.value = stats.map((stat) => {
      const raw = stat.target * eased
      return stat.decimals ? Number(raw.toFixed(stat.decimals)) : Math.floor(raw)
    })

    if (progress < 1) {
      rafId = requestAnimationFrame(tick)
    } else {
      displayValues.value = stats.map((stat) => stat.target)
    }
  }

  rafId = requestAnimationFrame(tick)
}

const formattedStats = computed(() =>
  stats.map((stat, i) => {
    const value = displayValues.value[i]
    const text =
      stat.decimals != null
        ? value.toFixed(stat.decimals)
        : value.toLocaleString('en-IN')
    return `${text}${stat.suffix}`
  }),
)

onMounted(() => {
  observer = new IntersectionObserver(
    ([entry]) => {
      if (entry?.isIntersecting && !inView.value) {
        inView.value = true
        animateCounters()
        observer?.disconnect()
      }
    },
    { threshold: 0.28 },
  )

  if (sectionRef.value) observer.observe(sectionRef.value)
})

onUnmounted(() => {
  observer?.disconnect()
  cancelAnimationFrame(rafId)
})
</script>

<template>
  <section
    ref="sectionRef"
    class="impact relative w-full overflow-hidden bg-oreda-dark text-white"
    aria-labelledby="impact-heading"
    :class="{ 'is-inview': inView }"
  >
    <!-- Atmosphere -->
    <div class="pointer-events-none absolute inset-0" aria-hidden="true">
      <div class="impact-glow impact-glow--a" />
      <div class="impact-glow impact-glow--b" />
      <div class="impact-grid" />
      <div
        class="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent"
      />
    </div>

    <div
      class="relative mx-auto max-w-[1400px] px-4 py-8 sm:px-6 sm:py-9 lg:px-8 lg:py-10"
    >
      <!-- Header -->
      <div class="impact-reveal max-w-2xl" style="--delay: 0ms">
        <p
          class="text-[11px] font-bold tracking-[0.22em] text-white/70 uppercase sm:text-xs"
        >
          Our Impact
        </p>
        <span class="mt-2 block h-[3px] w-12 bg-oreda-light" aria-hidden="true" />

        <h2
          id="impact-heading"
          class="mt-3.5 font-display text-[clamp(1.75rem,3vw,2.45rem)] leading-[1.18] font-semibold tracking-[-0.01em]"
        >
          <span class="text-white">Milestones that</span>
          <br />
          <span class="text-[#c4b5f0]">power Odisha forward</span>
        </h2>

        <p class="mt-3 max-w-xl text-[14px] leading-[1.55] text-white/65 sm:text-[15px]">
          From district-level outreach to utility-scale clean energy, OREDA’s
          work is measured in capacity added, communities reached and a clearer
          path to a renewable Odisha.
        </p>
      </div>

      <!-- Impact metrics -->
      <div
        class="impact-reveal mt-6 grid grid-cols-2 gap-px overflow-hidden rounded-sm bg-white/10 sm:mt-7 lg:grid-cols-4"
        style="--delay: 120ms"
        role="list"
      >
        <article
          v-for="(stat, index) in stats"
          :key="stat.label"
          class="impact-stat group relative bg-oreda-dark/90 px-3.5 py-4 sm:px-5 sm:py-4.5"
          role="listitem"
          :style="{ '--stat-delay': `${180 + index * 90}ms` }"
        >
          <div
            class="impact-bar absolute inset-x-0 top-0 h-0.5 origin-left bg-gradient-to-r from-oreda-light to-[#8b6fd4]"
            aria-hidden="true"
          />

          <component
            :is="stat.icon"
            :size="18"
            :stroke-width="1.6"
            class="text-[#b8a4ef] transition duration-500 group-hover:text-white"
          />

          <p
            class="mt-2.5 font-display text-[clamp(1.75rem,3.2vw,2.4rem)] leading-none tracking-tight tabular-nums text-white"
          >
            {{ formattedStats[index] }}
          </p>

          <p
            class="mt-2 text-[11px] font-semibold tracking-[0.12em] text-white/90 uppercase sm:text-[12px]"
          >
            {{ stat.label }}
          </p>
          <p class="mt-0.5 text-[11px] leading-snug text-white/45 sm:text-[12px]">
            {{ stat.hint }}
          </p>
        </article>
      </div>

      <!-- Timeline milestones -->
      <div class="impact-reveal mt-7 sm:mt-8" style="--delay: 280ms">
        <div class="relative">
          <div
            class="impact-rail pointer-events-none absolute top-[0.9rem] right-0 left-0 hidden h-px bg-white/15 lg:block"
            aria-hidden="true"
          >
            <div class="impact-rail-fill absolute inset-y-0 left-0 bg-gradient-to-r from-oreda-light via-[#8b6fd4] to-transparent" />
          </div>

          <ol class="grid gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
            <li
              v-for="(item, index) in milestones"
              :key="item.year"
              class="impact-item relative"
              :style="{ '--m-delay': `${360 + index * 110}ms` }"
            >
              <div class="flex items-center gap-2.5 lg:block">
                <span
                  class="impact-dot relative z-10 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-white/25 bg-oreda-dark"
                  aria-hidden="true"
                >
                  <span class="h-1.5 w-1.5 rounded-full bg-[#c4b5f0]" />
                </span>
                <p
                  class="font-display text-[1.15rem] leading-none text-[#c4b5f0] lg:mt-3.5"
                >
                  {{ item.year }}
                </p>
              </div>

              <h3
                class="mt-2 font-display text-[0.95rem] leading-snug text-white sm:text-[1rem]"
              >
                {{ item.title }}
              </h3>
              <p class="mt-1.5 text-[12px] leading-relaxed text-white/50 sm:text-[13px]">
                {{ item.text }}
              </p>
            </li>
          </ol>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.impact-glow {
  position: absolute;
  border-radius: 9999px;
  filter: blur(80px);
  opacity: 0.45;
  will-change: transform;
}

.impact-glow--a {
  top: -20%;
  left: -8%;
  width: min(52vw, 520px);
  height: min(52vw, 520px);
  background: radial-gradient(circle, rgba(72, 40, 136, 0.75) 0%, transparent 70%);
  animation: float-a 14s ease-in-out infinite;
}

.impact-glow--b {
  right: -10%;
  bottom: -25%;
  width: min(48vw, 480px);
  height: min(48vw, 480px);
  background: radial-gradient(circle, rgba(56, 32, 128, 0.7) 0%, transparent 70%);
  animation: float-b 18s ease-in-out infinite;
}

.impact-grid {
  position: absolute;
  inset: 0;
  opacity: 0.07;
  background-image:
    linear-gradient(to right, rgba(255, 255, 255, 0.35) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(255, 255, 255, 0.35) 1px, transparent 1px);
  background-size: 72px 72px;
  mask-image: radial-gradient(ellipse at center, black 20%, transparent 75%);
}

.impact-reveal,
.impact-stat,
.impact-item {
  opacity: 0;
  transform: translateY(28px);
  transition:
    opacity 0.85s cubic-bezier(0.22, 1, 0.36, 1),
    transform 0.85s cubic-bezier(0.22, 1, 0.36, 1);
}

.impact-reveal {
  transition-delay: var(--delay, 0ms);
}

.impact-stat {
  transition-delay: var(--stat-delay, 0ms);
}

.impact-item {
  transition-delay: var(--m-delay, 0ms);
}

.is-inview .impact-reveal,
.is-inview .impact-stat,
.is-inview .impact-item {
  opacity: 1;
  transform: translateY(0);
}

.impact-bar {
  transform: scaleX(0);
  transition: transform 0.7s cubic-bezier(0.22, 1, 0.36, 1);
  transition-delay: var(--stat-delay, 0ms);
}

.is-inview .impact-bar {
  transform: scaleX(1);
}

.impact-rail-fill {
  width: 0;
  transition: width 1.6s cubic-bezier(0.22, 1, 0.36, 1) 0.45s;
}

.is-inview .impact-rail-fill {
  width: 78%;
}

.impact-dot {
  transition:
    border-color 0.5s ease,
    box-shadow 0.5s ease,
    transform 0.5s cubic-bezier(0.22, 1, 0.36, 1);
  transition-delay: var(--m-delay, 0ms);
}

.is-inview .impact-dot {
  border-color: rgba(196, 181, 240, 0.55);
  box-shadow: 0 0 0 6px rgba(72, 40, 136, 0.35);
}

.impact-stat:hover {
  background: rgba(46, 25, 104, 0.55);
}

@keyframes float-a {
  0%,
  100% {
    transform: translate(0, 0) scale(1);
  }
  50% {
    transform: translate(40px, 28px) scale(1.08);
  }
}

@keyframes float-b {
  0%,
  100% {
    transform: translate(0, 0) scale(1);
  }
  50% {
    transform: translate(-36px, -24px) scale(1.06);
  }
}

@media (prefers-reduced-motion: reduce) {
  .impact-glow--a,
  .impact-glow--b {
    animation: none;
  }

  .impact-reveal,
  .impact-stat,
  .impact-item,
  .impact-rail-fill,
  .impact-dot,
  .impact-bar {
    transition: none !important;
  }

  .impact-bar {
    transform: scaleX(1);
  }

  .impact-reveal,
  .impact-stat,
  .impact-item {
    opacity: 1;
    transform: none;
  }

  .impact-rail-fill {
    width: 78%;
  }
}
</style>
