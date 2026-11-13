<script setup lang="ts">
import {
  ClipboardList,
  DraftingCompass,
  Rocket,
  Target,
  Users,
} from 'lucide-vue-next'
import { onMounted, onUnmounted, ref } from 'vue'

const steps = [
  {
    num: '01',
    title: 'Assess',
    text: 'Map energy needs, renewable potential and district priorities.',
    icon: ClipboardList,
  },
  {
    num: '02',
    title: 'Design',
    text: 'Shape schemes, project models and delivery frameworks.',
    icon: DraftingCompass,
  },
  {
    num: '03',
    title: 'Engage',
    text: 'Consult citizens, partners and institutions for workable solutions.',
    icon: Users,
  },
  {
    num: '04',
    title: 'Implement',
    text: 'Roll out solar projects, schemes, training and on-ground support.',
    icon: Rocket,
  },
  {
    num: '05',
    title: 'Sustain',
    text: 'Monitor, maintain and scale clean-energy impact statewide.',
    icon: Target,
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
    id="delivery-pathway"
    ref="sectionRef"
    class="pathway relative w-full overflow-hidden"
    aria-labelledby="pathway-heading"
    :class="{ 'is-inview': inView }"
  >
    <div class="pointer-events-none absolute inset-0" aria-hidden="true">
      <div class="pathway-fade" />
    </div>

    <div class="relative mx-auto max-w-[1400px] px-4 py-12 sm:px-6 sm:py-14 lg:px-8 lg:py-16">
      <!-- Header -->
      <div
        class="pathway-reveal flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between lg:gap-12"
        style="--delay: 0ms"
      >
        <div class="max-w-2xl">
          <div class="flex items-center gap-3">
            <span class="h-[2px] w-7 bg-oreda" aria-hidden="true" />
            <p class="text-[11px] font-bold tracking-[0.2em] text-oreda uppercase">
              Delivery Pathway
            </p>
          </div>
          <h2
            id="pathway-heading"
            class="mt-3 font-display text-[clamp(1.7rem,3.2vw,2.45rem)] leading-[1.15] font-semibold tracking-[-0.015em] text-oreda-dark"
          >
            A clear journey from need to lasting clean energy.
          </h2>
        </div>
        <p class="max-w-md text-[14.5px] leading-relaxed text-[#6b7280] lg:pb-1 lg:text-right">
          Every OREDA initiative moves through assessment, design, engagement,
          implementation and sustained impact.
        </p>
      </div>

      <!-- Process track -->
      <ol
        class="pathway-reveal pathway-track mt-12 grid gap-10 sm:grid-cols-2 lg:mt-14 lg:grid-cols-5 lg:gap-2"
        style="--delay: 110ms"
        role="list"
      >
        <li
          v-for="(step, index) in steps"
          :key="step.num"
          class="pathway-step"
          :class="{ 'is-last': index === steps.length - 1 }"
          :style="{ '--step-delay': `${150 + index * 75}ms` }"
        >
          <!-- Top number + arch bridge -->
          <div class="pathway-top">
            <span class="pathway-badge">{{ step.num }}</span>
            <span
              v-if="index < steps.length - 1"
              class="pathway-arch"
              aria-hidden="true"
            />
          </div>

          <!-- Icon circle + dashed rail -->
          <div class="pathway-mid">
            <div class="pathway-icon-wrap">
              <component
                :is="step.icon"
                :size="20"
                :stroke-width="1.75"
                class="pathway-icon"
              />
            </div>
            <span
              v-if="index < steps.length - 1"
              class="pathway-dash"
              aria-hidden="true"
            />
          </div>

          <h3 class="pathway-title">{{ step.title }}</h3>
          <p class="pathway-text">{{ step.text }}</p>
        </li>
      </ol>
    </div>
  </section>
</template>

<style scoped>
.pathway-fade {
  position: absolute;
  inset: 0;
  background:
    radial-gradient(ellipse 60% 45% at 50% 30%, rgba(56, 32, 128, 0.05), transparent 65%),
    linear-gradient(180deg, #f3f0fa 0%, #faf9fc 42%, #ffffff 100%);
}

.pathway-step {
  position: relative;
  opacity: 0;
  transform: translateY(14px);
  transition:
    opacity 0.55s cubic-bezier(0.22, 1, 0.36, 1),
    transform 0.55s cubic-bezier(0.22, 1, 0.36, 1);
  transition-delay: var(--step-delay, 0ms);
}

.is-inview .pathway-step {
  opacity: 1;
  transform: translateY(0);
}

@media (min-width: 1024px) {
  .pathway-step {
    text-align: center;
  }
}

/* Top badge row */
.pathway-top {
  position: relative;
  display: flex;
  justify-content: flex-start;
  margin-bottom: 1.15rem;
}

@media (min-width: 1024px) {
  .pathway-top {
    justify-content: center;
    margin-bottom: 1.35rem;
  }
}

.pathway-badge {
  position: relative;
  z-index: 2;
  display: grid;
  place-items: center;
  width: 2.15rem;
  height: 2.15rem;
  font-family: var(--font-display);
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 0.02em;
  color: #fff;
  background: linear-gradient(145deg, #482888, #382080 60%, #2e1968);
  border-radius: 9999px;
  box-shadow: 0 8px 18px -8px rgba(56, 32, 128, 0.55);
}

.pathway-arch {
  display: none;
}

@media (min-width: 1024px) {
  .pathway-arch {
    position: absolute;
    top: 0.05rem;
    left: calc(50% + 1.08rem);
    z-index: 1;
    display: block;
    width: calc(100% - 2.15rem + 0.5rem);
    height: 1.15rem;
    border: 1.5px solid rgba(148, 163, 184, 0.55);
    border-bottom: none;
    border-radius: 12px 12px 0 0;
    pointer-events: none;
  }
}

/* Mid icon + dashed connector */
.pathway-mid {
  position: relative;
  display: flex;
  justify-content: flex-start;
  margin-bottom: 1rem;
}

@media (min-width: 1024px) {
  .pathway-mid {
    justify-content: center;
    margin-bottom: 1.1rem;
  }
}

.pathway-icon-wrap {
  position: relative;
  z-index: 2;
  display: grid;
  place-items: center;
  width: 4rem;
  height: 4rem;
  background: #fff;
  border: 1.5px solid rgba(56, 32, 128, 0.14);
  border-radius: 9999px;
  box-shadow:
    0 12px 28px -14px rgba(56, 32, 128, 0.32),
    0 0 0 6px rgba(56, 32, 128, 0.035);
  transition:
    transform 0.25s ease,
    box-shadow 0.25s ease,
    border-color 0.25s ease;
}

.pathway-step:hover .pathway-icon-wrap {
  border-color: rgba(56, 32, 128, 0.28);
  transform: translateY(-3px);
  box-shadow:
    0 18px 40px -16px rgba(56, 32, 128, 0.42),
    0 0 0 10px rgba(56, 32, 128, 0.045);
}

.pathway-icon {
  color: #382080;
}

.pathway-dash {
  display: none;
}

@media (min-width: 1024px) {
  .pathway-dash {
    position: absolute;
    top: 50%;
    left: calc(50% + 2.05rem);
    z-index: 1;
    display: block;
    width: calc(100% - 4rem + 0.5rem);
    height: 0;
    border-top: 1.5px dashed rgba(56, 32, 128, 0.28);
    transform: translateY(-50%);
  }

}

.pathway-title {
  margin: 0;
  font-size: 1.05rem;
  font-weight: 700;
  color: #001038;
}

.pathway-text {
  margin: 0.4rem 0 0;
  font-size: 13.5px;
  line-height: 1.55;
  color: #6b7280;
}

@media (min-width: 1024px) {
  .pathway-title,
  .pathway-text {
    max-width: 11.5rem;
    margin-inline: auto;
  }
}

.pathway-reveal {
  opacity: 0;
  transform: translateY(16px);
  transition:
    opacity 0.6s cubic-bezier(0.22, 1, 0.36, 1),
    transform 0.6s cubic-bezier(0.22, 1, 0.36, 1);
  transition-delay: var(--delay, 0ms);
}

.is-inview .pathway-reveal {
  opacity: 1;
  transform: translateY(0);
}

@media (prefers-reduced-motion: reduce) {
  .pathway-reveal,
  .pathway-step {
    opacity: 1;
    transform: none;
    transition: none;
  }
}
</style>
