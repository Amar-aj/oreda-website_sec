<script setup lang="ts">
import { Compass, Handshake, Sparkles } from 'lucide-vue-next'
import { onMounted, onUnmounted, ref } from 'vue'

const pillars = [
  {
    icon: Compass,
    title: 'Mission-led work',
    text: 'Contribute directly to Odisha’s renewable energy goals through schemes, projects and citizen services.',
  },
  {
    icon: Sparkles,
    title: 'Learning & growth',
    text: 'Build expertise across solar, policy support and programme delivery in a dynamic public-sector setting.',
  },
  {
    icon: Handshake,
    title: 'Collaborative culture',
    text: 'Partner with departments, communities and technical teams to deliver clean power statewide.',
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
    { threshold: 0.15 },
  )
  if (sectionRef.value) observer.observe(sectionRef.value)
})

onUnmounted(() => observer?.disconnect())
</script>

<template>
  <section
    ref="sectionRef"
    class="career-culture relative w-full overflow-hidden"
    aria-labelledby="career-culture-heading"
    :class="{ 'is-inview': inView }"
  >
    <div class="pointer-events-none absolute inset-0" aria-hidden="true">
      <div class="career-culture-base" />
      <div class="career-culture-mesh" />
    </div>

    <div class="relative mx-auto max-w-[1400px] px-4 py-12 sm:px-6 sm:py-14 lg:px-8 lg:py-16">
      <div class="career-reveal max-w-2xl" style="--delay: 0ms">
        <div class="flex items-center gap-3">
          <span class="h-[2px] w-7 bg-oreda" aria-hidden="true" />
          <p class="text-[11px] font-bold tracking-[0.2em] text-oreda uppercase">
            Life at OREDA
          </p>
        </div>
        <h2
          id="career-culture-heading"
          class="mt-3 font-display text-[clamp(1.6rem,3vw,2.3rem)] leading-[1.15] font-semibold tracking-[-0.015em] text-oreda-dark"
        >
          A workplace built around
          <em class="font-display not-italic text-oreda">purpose</em>
          and public impact.
        </h2>
        <p class="mt-3 max-w-xl text-[14.5px] leading-relaxed text-[#5a6b82]">
          Join a team that designs, delivers and supports renewable energy
          programmes for citizens and institutions across Odisha.
        </p>
      </div>

      <ul class="mt-10 grid gap-0 lg:grid-cols-3" role="list">
        <li
          v-for="(pillar, index) in pillars"
          :key="pillar.title"
          class="career-pillar"
          :style="{ '--pillar-delay': `${90 + index * 90}ms` }"
        >
          <span class="career-pillar-icon" aria-hidden="true">
            <component :is="pillar.icon" :size="20" :stroke-width="1.8" />
          </span>
          <h3 class="mt-4 font-display text-[1.25rem] font-semibold tracking-[-0.01em] text-oreda-dark">
            {{ pillar.title }}
          </h3>
          <p class="mt-2 text-[14px] leading-relaxed text-[#5a6b82]">
            {{ pillar.text }}
          </p>
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
.career-culture-base {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    160deg,
    #f5f4f8 0%,
    #eef1f7 48%,
    #f4f1fa 100%
  );
}

.career-culture-mesh {
  position: absolute;
  inset: 0;
  opacity: 0.35;
  background-image:
    linear-gradient(rgba(0, 16, 56, 0.04) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0, 16, 56, 0.04) 1px, transparent 1px);
  background-size: 48px 48px;
  mask-image: radial-gradient(ellipse 75% 70% at 40% 0%, black 15%, transparent 75%);
}

.career-reveal {
  opacity: 0;
  transform: translateY(16px);
  transition:
    opacity 0.65s cubic-bezier(0.22, 1, 0.36, 1),
    transform 0.65s cubic-bezier(0.22, 1, 0.36, 1);
  transition-delay: var(--delay, 0ms);
}

.is-inview .career-reveal {
  opacity: 1;
  transform: translateY(0);
}

.career-pillar {
  padding: 1.5rem 0;
  opacity: 0;
  transform: translateY(18px);
  transition:
    opacity 0.6s cubic-bezier(0.22, 1, 0.36, 1),
    transform 0.6s cubic-bezier(0.22, 1, 0.36, 1);
  transition-delay: var(--pillar-delay, 0ms);
}

@media (min-width: 1024px) {
  .career-pillar {
    padding: 0.35rem 1.75rem;
  }

  .career-pillar:first-child {
    padding-left: 0;
  }

  .career-pillar:last-child {
    padding-right: 0;
  }

  .career-pillar + .career-pillar {
    border-left: 1px solid rgba(56, 32, 128, 0.1);
  }
}

@media (max-width: 1023px) {
  .career-pillar + .career-pillar {
    border-top: 1px solid rgba(56, 32, 128, 0.1);
  }
}

.is-inview .career-pillar {
  opacity: 1;
  transform: translateY(0);
}

.career-pillar-icon {
  display: grid;
  place-items: center;
  width: 2.75rem;
  height: 2.75rem;
  color: #382080;
  background: rgba(56, 32, 128, 0.08);
  border: 1px solid rgba(56, 32, 128, 0.14);
}

@media (prefers-reduced-motion: reduce) {
  .career-reveal,
  .career-pillar {
    opacity: 1;
    transform: none;
    transition: none;
  }
}
</style>
