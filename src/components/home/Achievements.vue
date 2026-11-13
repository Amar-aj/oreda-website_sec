<script setup lang="ts">
import { ArrowUpRight, FileText, Sun } from 'lucide-vue-next'
import { onMounted, onUnmounted, ref } from 'vue'

const items = [
  {
    year: '2015',
    period: 'Up to Aug 2015',
    title: 'Solar Energy Activities Undertaken',
    fullTitle: 'Solar Energy Activities Undertaken Up To August, 2015',
    icon: Sun,
  },
  {
    year: '2014–15',
    period: 'Financial Year',
    title: 'Achievement of OREDA',
    fullTitle: 'Achievement of OREDA 2014-15',
    icon: FileText,
  },
  {
    year: '2012–13',
    period: 'Cumulative',
    title: 'Achievement of OREDA',
    fullTitle: 'Achievement of OREDA up to 2012-13',
    icon: FileText,
  },
  {
    year: '2011–12',
    period: 'Cumulative',
    title: 'Achievement of OREDA',
    fullTitle: 'Achievement of OREDA up to 2011-12',
    icon: FileText,
  },
]

const sectionRef = ref<HTMLElement | null>(null)
const inView = ref(false)
const activeIndex = ref(0)
let observer: IntersectionObserver | null = null

onMounted(() => {
  observer = new IntersectionObserver(
    ([entry]) => {
      if (entry?.isIntersecting) {
        inView.value = true
        observer?.disconnect()
      }
    },
    { threshold: 0.22 },
  )
  if (sectionRef.value) observer.observe(sectionRef.value)
})

onUnmounted(() => observer?.disconnect())
</script>

<template>
  <section
    id="achievements"
    ref="sectionRef"
    class="achievements relative w-full overflow-hidden bg-[#f4f2f8]"
    aria-labelledby="achievements-heading"
    :class="{ 'is-inview': inView }"
  >
    <div class="pointer-events-none absolute inset-0" aria-hidden="true">
      <div class="achievements-orb achievements-orb--a" />
      <div class="achievements-orb achievements-orb--b" />
    </div>

    <div
      class="relative mx-auto max-w-[1400px] px-4 py-8 sm:px-6 sm:py-9 lg:px-8 lg:py-10"
    >
      <div
        class="achievements-reveal grid gap-5 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] lg:items-end lg:gap-10"
        style="--delay: 0ms"
      >
        <div>
          <p
            class="text-[11px] font-bold tracking-[0.22em] text-oreda-dark uppercase sm:text-xs"
          >
            Achievements
          </p>
          <span class="mt-2 block h-[3px] w-12 bg-oreda" aria-hidden="true" />

          <h2
            id="achievements-heading"
            class="mt-3.5 font-display text-[clamp(1.75rem,3vw,2.45rem)] leading-[1.18] font-semibold tracking-[-0.01em] text-oreda-dark"
          >
            Documented progress across
            <span class="text-oreda">key reporting years</span>
          </h2>
        </div>

        <div class="relative lg:pb-1 lg:text-right">
          <p
            class="pointer-events-none absolute -top-6 right-0 hidden font-display text-[4.5rem] leading-none text-oreda/[0.07] select-none lg:block"
            aria-hidden="true"
          >
            0{{ items.length }}
          </p>
          <p class="relative text-[14px] leading-[1.55] text-[#6b7280] sm:text-[15px] lg:ml-auto lg:max-w-sm">
            Explore OREDA’s published achievement records — from solar programme
            delivery to year-wise institutional milestones.
          </p>
        </div>
      </div>

      <div
        class="achievements-reveal mt-7 grid gap-4 lg:mt-8 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.35fr)] lg:gap-6"
        style="--delay: 100ms"
      >
        <!-- Featured preview -->
        <div
          class="relative overflow-hidden rounded-sm bg-oreda-dark px-5 py-6 text-white sm:px-6 sm:py-7"
        >
          <div
            class="pointer-events-none absolute -top-16 -right-10 h-44 w-44 rounded-full bg-oreda-light/40 blur-3xl"
            aria-hidden="true"
          />
          <div
            class="pointer-events-none absolute bottom-0 left-0 h-24 w-full bg-gradient-to-t from-black/25 to-transparent"
            aria-hidden="true"
          />

          <p class="relative text-[11px] font-semibold tracking-[0.18em] text-[#c4b5f0] uppercase">
            Featured record
          </p>

          <p
            class="relative mt-4 font-display text-[clamp(2.4rem,5vw,3.4rem)] leading-none tracking-tight text-white"
          >
            {{ items[activeIndex].year }}
          </p>

          <p class="relative mt-2 text-[12px] font-medium tracking-[0.12em] text-white/45 uppercase">
            {{ items[activeIndex].period }}
          </p>

          <h3
            class="relative mt-5 font-display text-[1.15rem] leading-snug text-white sm:text-[1.25rem]"
          >
            {{ items[activeIndex].fullTitle }}
          </h3>

          <div class="relative mt-6 flex items-center gap-2 text-[13px] font-semibold text-[#c4b5f0]">
            <span>View archive entry</span>
            <ArrowUpRight :size="15" :stroke-width="2.25" />
          </div>
        </div>

        <!-- Interactive list -->
        <ul class="flex flex-col" role="list">
          <li
            v-for="(item, index) in items"
            :key="item.fullTitle"
            class="achievements-row group relative border-b border-oreda-dark/10 last:border-b-0"
            :class="{ 'is-active': activeIndex === index }"
            :style="{ '--row-delay': `${160 + index * 70}ms` }"
          >
            <button
              type="button"
              class="flex w-full items-center gap-3 py-3.5 text-left transition sm:gap-4 sm:py-4"
              :aria-pressed="activeIndex === index"
              @mouseenter="activeIndex = index"
              @focus="activeIndex = index"
              @click="activeIndex = index"
            >
              <span
                class="flex h-10 w-10 shrink-0 items-center justify-center rounded-sm bg-white text-oreda shadow-[0_1px_0_rgba(0,16,56,0.06)] transition group-[.is-active]:bg-oreda group-[.is-active]:text-white sm:h-11 sm:w-11"
              >
                <component
                  :is="item.icon"
                  :size="18"
                  :stroke-width="1.7"
                />
              </span>

              <span class="min-w-0 flex-1">
                <span
                  class="block font-display text-[13px] leading-none text-oreda sm:text-[14px]"
                >
                  {{ item.year }}
                </span>
                <span
                  class="mt-1.5 block truncate text-[13px] font-semibold text-oreda-dark sm:text-[14px]"
                >
                  {{ item.fullTitle }}
                </span>
              </span>

              <span
                class="flex h-8 w-8 shrink-0 items-center justify-center text-oreda-dark/35 transition group-hover:text-oreda group-[.is-active]:translate-x-0.5 group-[.is-active]:-translate-y-0.5 group-[.is-active]:text-oreda"
              >
                <ArrowUpRight :size="16" :stroke-width="2.25" />
              </span>
            </button>

            <span
              class="achievements-accent pointer-events-none absolute inset-y-0 left-0 w-[3px] origin-top bg-oreda"
              aria-hidden="true"
            />
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<style scoped>
.achievements-orb {
  position: absolute;
  border-radius: 9999px;
  filter: blur(70px);
  opacity: 0.55;
}

.achievements-orb--a {
  top: -12%;
  left: -6%;
  width: min(42vw, 380px);
  height: min(42vw, 380px);
  background: radial-gradient(circle, rgba(56, 32, 128, 0.14) 0%, transparent 70%);
}

.achievements-orb--b {
  right: -8%;
  bottom: -18%;
  width: min(40vw, 360px);
  height: min(40vw, 360px);
  background: radial-gradient(circle, rgba(72, 40, 136, 0.12) 0%, transparent 70%);
}

.achievements-reveal,
.achievements-row {
  opacity: 0;
  transform: translateY(22px);
  transition:
    opacity 0.75s cubic-bezier(0.22, 1, 0.36, 1),
    transform 0.75s cubic-bezier(0.22, 1, 0.36, 1);
}

.achievements-reveal {
  transition-delay: var(--delay, 0ms);
}

.achievements-row {
  transition-delay: var(--row-delay, 0ms);
}

.is-inview .achievements-reveal,
.is-inview .achievements-row {
  opacity: 1;
  transform: translateY(0);
}

.achievements-accent {
  transform: scaleY(0);
  transition: transform 0.35s cubic-bezier(0.22, 1, 0.36, 1);
}

.achievements-row.is-active .achievements-accent,
.achievements-row:hover .achievements-accent {
  transform: scaleY(1);
}

.achievements-row.is-active {
  background: linear-gradient(
    90deg,
    rgba(56, 32, 128, 0.06) 0%,
    transparent 55%
  );
}

@media (prefers-reduced-motion: reduce) {
  .achievements-reveal,
  .achievements-row,
  .achievements-accent {
    transition: none !important;
  }

  .achievements-reveal,
  .achievements-row {
    opacity: 1;
    transform: none;
  }

  .achievements-accent {
    transform: scaleY(1);
  }
}
</style>
