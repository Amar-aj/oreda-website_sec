<script setup lang="ts">
import { useSiteStore } from '@/stores/site'
import { ArrowUpRight, FileText, Mail, Send } from 'lucide-vue-next'
import { onMounted, onUnmounted, ref } from 'vue'
import { RouterLink } from 'vue-router'

const site = useSiteStore()

const steps = [
  {
    icon: FileText,
    title: 'Review the role',
    text: 'Open a vacancy above and check responsibilities and requirements.',
  },
  {
    icon: Send,
    title: 'Share your profile',
    text: 'Email your CV and a short cover note mentioning the role title.',
  },
  {
    icon: Mail,
    title: 'HR follows up',
    text: 'Shortlisted candidates are contacted for the next selection steps.',
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
    class="career-apply relative w-full overflow-hidden"
    aria-labelledby="career-apply-heading"
    :class="{ 'is-inview': inView }"
  >
    <div class="pointer-events-none absolute inset-0" aria-hidden="true">
      <div class="career-apply-base" />
      <div class="career-apply-mesh" />
      <div class="career-apply-glow" />
      <p class="career-apply-watermark">APPLY</p>
    </div>

    <div class="relative mx-auto max-w-[1400px] px-4 py-12 sm:px-6 sm:py-14 lg:px-8 lg:py-16">
      <div
        class="career-reveal grid gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-end lg:gap-14"
        style="--delay: 0ms"
      >
        <div>
          <div class="flex items-center gap-3">
            <span class="h-[2px] w-7 rounded-full bg-[#c4b5f0]" aria-hidden="true" />
            <p class="text-[11px] font-bold tracking-[0.2em] text-[#c4b5f0] uppercase">
              How to apply
            </p>
          </div>
          <h2
            id="career-apply-heading"
            class="mt-3 font-display text-[clamp(1.65rem,3vw,2.35rem)] leading-[1.15] font-semibold tracking-[-0.015em] text-white"
          >
            Ready to contribute to
            <span class="text-[#c4b5f0]">Odisha’s</span>
            renewable mission?
          </h2>
          <p class="mt-3.5 max-w-lg text-[14.5px] leading-relaxed text-white/65">
            Send your application to the official OREDA desk. Include the exact
            role title in your email subject for faster processing.
          </p>

          <div class="mt-7 flex flex-wrap items-center gap-3">
            <a
              :href="`mailto:${site.email}?subject=Career%20Application%20-%20OREDA`"
              class="career-apply-cta group"
            >
              <span>Email your application</span>
              <span class="career-apply-cta-icon" aria-hidden="true">
                <ArrowUpRight :size="14" :stroke-width="2.4" />
              </span>
            </a>
            <RouterLink to="/contact" class="career-apply-secondary">
              Contact office
            </RouterLink>
          </div>
        </div>

        <ol class="career-steps" role="list">
          <li
            v-for="(step, index) in steps"
            :key="step.title"
            class="career-step"
            :style="{ '--step-delay': `${120 + index * 80}ms` }"
          >
            <span class="career-step-index" aria-hidden="true">
              {{ String(index + 1).padStart(2, '0') }}
            </span>
            <span class="career-step-icon" aria-hidden="true">
              <component :is="step.icon" :size="16" :stroke-width="2" />
            </span>
            <div class="min-w-0">
              <p class="text-[14px] font-bold text-white">{{ step.title }}</p>
              <p class="mt-1 text-[13px] leading-relaxed text-white/60">
                {{ step.text }}
              </p>
            </div>
          </li>
        </ol>
      </div>
    </div>
  </section>
</template>

<style scoped>
.career-apply-base {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    125deg,
    #00081f 0%,
    #001038 32%,
    #24145a 68%,
    #382080 100%
  );
}

.career-apply-mesh {
  position: absolute;
  inset: 0;
  opacity: 0.25;
  background-image:
    linear-gradient(rgba(255, 255, 255, 0.045) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.045) 1px, transparent 1px);
  background-size: 42px 42px;
  mask-image: radial-gradient(ellipse 70% 80% at 80% 50%, black 10%, transparent 75%);
}

.career-apply-glow {
  position: absolute;
  top: -30%;
  right: -10%;
  width: min(50vw, 420px);
  height: min(50vw, 420px);
  border-radius: 9999px;
  background: radial-gradient(circle, rgba(196, 181, 240, 0.22), transparent 68%);
  filter: blur(70px);
}

.career-apply-watermark {
  position: absolute;
  right: 4%;
  bottom: -0.15em;
  margin: 0;
  font-family: var(--font-display);
  font-size: clamp(3.5rem, 12vw, 7.5rem);
  font-weight: 600;
  line-height: 1;
  letter-spacing: -0.04em;
  color: rgba(255, 255, 255, 0.06);
  user-select: none;
  pointer-events: none;
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

.career-apply-cta {
  display: inline-flex;
  align-items: center;
  gap: 0.55rem;
  padding: 0.72rem 0.75rem 0.72rem 1.15rem;
  font-size: 13px;
  font-weight: 700;
  color: #001038;
  text-decoration: none;
  background: #fff;
  box-shadow: 0 12px 28px -14px rgba(0, 0, 0, 0.45);
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;
}

.career-apply-cta:hover {
  transform: translateY(-1px);
  box-shadow: 0 16px 32px -14px rgba(0, 0, 0, 0.5);
}

.career-apply-cta-icon {
  display: grid;
  place-items: center;
  width: 1.7rem;
  height: 1.7rem;
  background: rgba(56, 32, 128, 0.1);
  transition: transform 0.25s ease;
}

.group:hover .career-apply-cta-icon {
  transform: translate(1px, -1px);
}

.career-apply-secondary {
  font-size: 13px;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.78);
  text-decoration: none;
  border-bottom: 1px solid rgba(196, 181, 240, 0.45);
  padding-bottom: 2px;
  transition: color 0.2s ease;
}

.career-apply-secondary:hover {
  color: #fff;
}

.career-steps {
  margin: 0;
  padding: 0;
  list-style: none;
  border: 1px solid rgba(255, 255, 255, 0.14);
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
}

.career-step {
  display: grid;
  grid-template-columns: auto auto minmax(0, 1fr);
  align-items: flex-start;
  gap: 0.85rem;
  padding: 1.15rem 1.1rem;
  opacity: 0;
  transform: translateX(12px);
  transition:
    opacity 0.55s cubic-bezier(0.22, 1, 0.36, 1),
    transform 0.55s cubic-bezier(0.22, 1, 0.36, 1);
  transition-delay: var(--step-delay, 0ms);
}

.is-inview .career-step {
  opacity: 1;
  transform: translateX(0);
}

.career-step + .career-step {
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.career-step-index {
  margin-top: 0.2rem;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.12em;
  color: rgba(196, 181, 240, 0.8);
  font-variant-numeric: tabular-nums;
}

.career-step-icon {
  display: grid;
  place-items: center;
  width: 2.15rem;
  height: 2.15rem;
  color: #efe8ff;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(196, 181, 240, 0.35);
}

@media (prefers-reduced-motion: reduce) {
  .career-reveal,
  .career-step {
    opacity: 1;
    transform: none;
    transition: none;
  }
}
</style>
