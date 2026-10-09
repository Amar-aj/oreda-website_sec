<script setup lang="ts">
import { ArrowRight, Briefcase, Download, FileText } from 'lucide-vue-next'
import { onMounted, onUnmounted, ref } from 'vue'
import { RouterLink } from 'vue-router'

const tenders = [
  {
    id: 'OREDA/SPV/2026/14',
    title: 'Rooftop solar PV — supply & installation',
    closes: '28.10.2026',
  },
  {
    id: 'OREDA/SSL/2026/09',
    title: 'Solar LED street lighting for rural blocks',
    closes: '05.11.2026',
  },
  {
    id: 'OREDA/BIO/2026/03',
    title: 'Community biogas plant O&M services',
    closes: '12.11.2026',
  },
  {
    id: 'OREDA/HYB/2026/01',
    title: 'Hybrid renewable energy feasibility study',
    closes: '20.11.2026',
  },
]

const openings = [
  {
    id: 'ADV/01/2026',
    role: 'Project Engineer — Solar',
    type: 'Contract',
    location: 'Bhubaneswar',
    lastDate: '15.11.2026',
  },
  {
    id: 'ADV/02/2026',
    role: 'Field Officer — District Outreach',
    type: 'Regular',
    location: 'Statewide',
    lastDate: '18.11.2026',
  },
  {
    id: 'ADV/03/2026',
    role: 'Accounts Assistant',
    type: 'Contract',
    location: 'Bhubaneswar',
    lastDate: '22.11.2026',
  },
  {
    id: 'ADV/04/2026',
    role: 'Technical Consultant — Wind & Hybrid',
    type: 'Contract',
    location: 'Bhubaneswar',
    lastDate: '30.11.2026',
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
    { threshold: 0.12 },
  )
  if (sectionRef.value) observer.observe(sectionRef.value)
})

onUnmounted(() => observer?.disconnect())
</script>

<template>
  <section
    ref="sectionRef"
    class="opportunities relative w-full overflow-hidden"
    aria-labelledby="opportunities-heading"
    :class="{ 'is-inview': inView }"
  >
    <div class="pointer-events-none absolute inset-0" aria-hidden="true">
      <div class="opportunities-base" />
      <div class="opportunities-band" />
      <div class="opportunities-arcs">
        <span class="opportunities-arc opportunities-arc--1" />
        <span class="opportunities-arc opportunities-arc--2" />
        <span class="opportunities-arc opportunities-arc--3" />
      </div>
      <div class="opportunities-dots" />
      <p class="opportunities-watermark">OREDA</p>
    </div>

    <div class="relative mx-auto max-w-[1400px] px-4 py-6 sm:px-6 sm:py-7 lg:px-8 lg:py-8">
      <!-- Header lives on the dark backdrop -->
      <div
        class="opportunities-reveal flex flex-col gap-2.5 sm:flex-row sm:items-end sm:justify-between"
        style="--delay: 0ms"
      >
        <div class="max-w-xl">
          <div class="flex items-center gap-3">
            <p
              class="text-[11px] font-bold tracking-[0.22em] text-[#c4b5f0] uppercase sm:text-xs"
            >
              Opportunities
            </p>
            <span class="h-px w-8 bg-[#c4b5f0]/50" aria-hidden="true" />
          </div>
          <h2
            id="opportunities-heading"
            class="mt-2 font-display text-[clamp(1.45rem,2.5vw,2rem)] leading-[1.15] font-semibold tracking-[-0.01em] text-white"
          >
            Current Tenders &amp;
            <span class="text-[#c4b5f0]">Openings</span>
          </h2>
          <p class="mt-1.5 max-w-md text-[13px] leading-snug text-white/55">
            Official procurement notices and career advertisements from OREDA.
          </p>
        </div>

        <p
          class="rounded-sm border border-white/10 bg-white/5 px-3 py-1.5 text-[11px] text-white/50 backdrop-blur-sm sm:text-[12px]"
        >
          Department of Energy · Govt. of Odisha
        </p>
      </div>

      <!-- Twin elevated panels -->
      <div
        class="opportunities-reveal mt-5 grid gap-4 lg:mt-6 lg:grid-cols-2 lg:gap-5"
        style="--delay: 90ms"
      >
        <!-- Tenders panel -->
        <article class="opportunities-panel flex flex-col overflow-hidden">
          <div class="opportunities-panel-accent" aria-hidden="true" />

          <header
            class="flex items-center justify-between gap-3 border-b border-oreda-dark/10 px-4 py-3.5 sm:px-5"
          >
            <div class="flex items-center gap-3">
              <span
                class="flex h-9 w-9 items-center justify-center bg-oreda text-white"
              >
                <FileText :size="17" :stroke-width="1.8" />
              </span>
              <div>
                <h3 class="font-display text-[1.15rem] leading-none text-oreda-dark sm:text-[1.2rem]">
                  Current Tenders
                </h3>
                <p class="mt-1 text-[12.5px] text-oreda-muted">
                  {{ tenders.length }} active notices
                </p>
              </div>
            </div>
            <RouterLink
              to="/tenders"
              class="group/link inline-flex items-center gap-1.5 text-[13px] font-bold text-oreda transition hover:text-oreda-dark"
            >
              View all
              <ArrowRight
                :size="14"
                :stroke-width="2.5"
                class="transition group-hover/link:translate-x-0.5"
              />
            </RouterLink>
          </header>

          <ul class="flex-1 divide-y divide-oreda-dark/8 px-2 py-1 sm:px-2.5" role="list">
            <li
              v-for="(item, index) in tenders"
              :key="item.id"
              class="opportunities-row"
              :style="{ '--row-delay': `${140 + index * 45}ms` }"
            >
              <RouterLink
                to="/tenders"
                class="group flex items-center gap-3.5 rounded-sm px-3 py-3.5 transition hover:bg-[#f4f1fa] sm:px-3.5 sm:py-4"
              >
                <div class="min-w-0 flex-1">
                  <div class="flex flex-wrap items-center gap-x-2.5 gap-y-1">
                    <span class="font-mono text-[12.5px] font-semibold text-oreda sm:text-[13px]">
                      {{ item.id }}
                    </span>
                    <span class="text-[12px] text-[#9aa1ae]" aria-hidden="true">·</span>
                    <span class="text-[12.5px] font-medium text-oreda-muted sm:text-[13px]">
                      {{ item.closes }}
                    </span>
                  </div>
                  <p
                    class="mt-1.5 line-clamp-2 text-[15px] leading-snug font-semibold text-oreda-dark transition group-hover:text-oreda sm:text-[15.5px]"
                  >
                    {{ item.title }}
                  </p>
                </div>
                <span
                  class="flex h-9 w-9 shrink-0 items-center justify-center border border-oreda-dark/12 bg-white text-[#8b849c] transition group-hover:border-oreda/30 group-hover:bg-oreda group-hover:text-white"
                  title="Download tender document"
                >
                  <Download :size="15" :stroke-width="2" />
                </span>
              </RouterLink>
            </li>
          </ul>
        </article>

        <!-- Openings panel -->
        <article class="opportunities-panel flex flex-col overflow-hidden">
          <div class="opportunities-panel-accent" aria-hidden="true" />

          <header
            class="flex items-center justify-between gap-3 border-b border-oreda-dark/10 px-4 py-3.5 sm:px-5"
          >
            <div class="flex items-center gap-3">
              <span
                class="flex h-9 w-9 items-center justify-center bg-oreda-dark text-[#c4b5f0]"
              >
                <Briefcase :size="17" :stroke-width="1.8" />
              </span>
              <div>
                <h3 class="font-display text-[1.15rem] leading-none text-oreda-dark sm:text-[1.2rem]">
                  Current Openings
                </h3>
                <p class="mt-1 text-[12.5px] text-oreda-muted">
                  {{ openings.length }} positions open
                </p>
              </div>
            </div>
            <RouterLink
              to="/contact"
              class="group/link inline-flex items-center gap-1.5 text-[13px] font-bold text-oreda transition hover:text-oreda-dark"
            >
              View all
              <ArrowRight
                :size="14"
                :stroke-width="2.5"
                class="transition group-hover/link:translate-x-0.5"
              />
            </RouterLink>
          </header>

          <ul class="flex-1 divide-y divide-oreda-dark/8 px-2 py-1 sm:px-2.5" role="list">
            <li
              v-for="(job, index) in openings"
              :key="job.id"
              class="opportunities-row"
              :style="{ '--row-delay': `${180 + index * 45}ms` }"
            >
              <RouterLink
                to="/contact"
                class="group flex items-center gap-3.5 rounded-sm px-3 py-3.5 transition hover:bg-[#f4f1fa] sm:px-3.5 sm:py-4"
              >
                <div class="min-w-0 flex-1">
                  <div class="flex flex-wrap items-center gap-x-2 gap-y-1">
                    <span class="font-mono text-[12.5px] font-semibold text-oreda sm:text-[13px]">
                      {{ job.id }}
                    </span>
                    <span
                      class="bg-oreda/8 px-2 py-0.5 text-[10.5px] font-bold tracking-[0.06em] text-oreda uppercase"
                    >
                      {{ job.type }}
                    </span>
                    <span class="text-[12.5px] font-medium text-oreda-muted sm:text-[13px]">
                      {{ job.lastDate }}
                    </span>
                  </div>
                  <p
                    class="mt-1.5 line-clamp-2 text-[15px] leading-snug font-semibold text-oreda-dark transition group-hover:text-oreda sm:text-[15.5px]"
                  >
                    {{ job.role }}
                  </p>
                </div>
                <span
                  class="flex h-9 w-9 shrink-0 items-center justify-center border border-oreda-dark/12 bg-white text-[#8b849c] transition group-hover:border-oreda/30 group-hover:bg-oreda group-hover:text-white group-hover:translate-x-0.5"
                >
                  <ArrowRight :size="15" :stroke-width="2.25" />
                </span>
              </RouterLink>
            </li>
          </ul>
        </article>
      </div>

      <p
        class="opportunities-reveal mt-3 text-center text-[12px] text-white/45"
        style="--delay: 180ms"
      >
        For clarifications, contact
        <a
          href="mailto:ceoreda@oredaorissa.com"
          class="font-semibold text-[#c4b5f0] transition hover:text-white"
        >
          ceoreda@oredaorissa.com
        </a>
      </p>
    </div>
  </section>
</template>

<style scoped>
.opportunities-base {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    180deg,
    #0b1230 0%,
    #16104a 28%,
    #2a1a6e 52%,
    #3d2688 72%,
    #4a2f96 100%
  );
}

.opportunities-band {
  position: absolute;
  inset: 0;
  background:
    linear-gradient(
      118deg,
      transparent 0%,
      transparent 42%,
      rgba(255, 255, 255, 0.04) 42.2%,
      rgba(255, 255, 255, 0.07) 48%,
      rgba(255, 255, 255, 0.04) 54%,
      transparent 54.3%,
      transparent 100%
    ),
    radial-gradient(ellipse 80% 55% at 15% 20%, rgba(140, 110, 210, 0.35), transparent 55%),
    radial-gradient(ellipse 70% 50% at 90% 80%, rgba(56, 32, 128, 0.55), transparent 50%);
}

.opportunities-arcs {
  position: absolute;
  right: -8%;
  top: 50%;
  width: min(58vw, 620px);
  height: min(58vw, 620px);
  transform: translateY(-50%);
}

.opportunities-arc {
  position: absolute;
  inset: 0;
  border-radius: 9999px;
  border: 1px solid rgba(196, 181, 240, 0.16);
}

.opportunities-arc--1 {
  inset: 8%;
  animation: opp-spin 48s linear infinite;
}

.opportunities-arc--2 {
  inset: 18%;
  border-color: rgba(196, 181, 240, 0.1);
  border-style: dashed;
  animation: opp-spin-rev 64s linear infinite;
}

.opportunities-arc--3 {
  inset: 30%;
  border-color: rgba(255, 255, 255, 0.08);
}

.opportunities-dots {
  position: absolute;
  inset: 0;
  opacity: 0.4;
  background-image: radial-gradient(rgba(255, 255, 255, 0.18) 1px, transparent 1px);
  background-size: 22px 22px;
  mask-image: linear-gradient(180deg, rgba(0, 0, 0, 0.55), transparent 70%);
}

.opportunities-watermark {
  position: absolute;
  left: 3%;
  bottom: -0.35em;
  margin: 0;
  font-family: var(--font-display);
  font-size: clamp(3.5rem, 12vw, 7.5rem);
  font-weight: 600;
  line-height: 1;
  letter-spacing: -0.04em;
  color: rgba(255, 255, 255, 0.07);
  user-select: none;
  white-space: nowrap;
}

.opportunities-panel {
  position: relative;
  background: rgba(255, 255, 255, 0.96);
  border: 1px solid rgba(255, 255, 255, 0.55);
  box-shadow:
    0 1px 0 rgba(255, 255, 255, 0.9) inset,
    0 24px 48px -28px rgba(0, 0, 0, 0.55),
    0 10px 28px -18px rgba(56, 32, 128, 0.45);
  backdrop-filter: blur(10px);
}

.opportunities-panel-accent {
  height: 3px;
  background: linear-gradient(90deg, #382080, #8b6fd4 55%, #c4b5f0);
}

.opportunities-reveal,
.opportunities-row {
  opacity: 0;
  transform: translateY(14px);
  transition:
    opacity 0.55s cubic-bezier(0.22, 1, 0.36, 1),
    transform 0.55s cubic-bezier(0.22, 1, 0.36, 1);
}

.opportunities-reveal {
  transition-delay: var(--delay, 0ms);
}

.opportunities-row {
  transition-delay: var(--row-delay, 0ms);
}

.is-inview .opportunities-reveal,
.is-inview .opportunities-row {
  opacity: 1;
  transform: translateY(0);
}

@keyframes opp-spin {
  to {
    transform: rotate(360deg);
  }
}

@keyframes opp-spin-rev {
  to {
    transform: rotate(-360deg);
  }
}

@media (prefers-reduced-motion: reduce) {
  .opportunities-arc--1,
  .opportunities-arc--2 {
    animation: none;
  }

  .opportunities-reveal,
  .opportunities-row {
    opacity: 1;
    transform: none;
    transition: none !important;
  }
}
</style>
