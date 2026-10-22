<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { RouterLink } from 'vue-router'

const facts = [
  { label: 'Document', value: 'Terms of Use' },
  { label: 'Effective', value: '21 October 2026' },
  { label: 'Issuer', value: 'OREDA Limited' },
  { label: 'Jurisdiction', value: 'Odisha, India' },
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
    { threshold: 0.2 },
  )
  if (sectionRef.value) observer.observe(sectionRef.value)
})

onUnmounted(() => observer?.disconnect())
</script>

<template>
  <section
    ref="sectionRef"
    class="terms-hero relative w-full overflow-hidden"
    aria-labelledby="terms-hero-heading"
    :class="{ 'is-inview': inView }"
  >
    <div class="pointer-events-none absolute inset-0" aria-hidden="true">
      <div class="terms-hero-base" />
      <div class="terms-hero-mesh" />
      <div class="terms-hero-glow terms-hero-glow--a" />
      <div class="terms-hero-glow terms-hero-glow--b" />
    </div>

    <div
      class="relative mx-auto max-w-[1400px] px-4 pt-9 pb-16 sm:px-6 sm:pt-10 sm:pb-[4.5rem] lg:px-8 lg:pt-12 lg:pb-20"
    >
      <div class="terms-hero-reveal max-w-3xl">
        <nav class="text-[12.5px] text-white/60" aria-label="Breadcrumb">
          <ol class="flex flex-wrap items-center gap-1.5">
            <li>
              <RouterLink to="/" class="transition hover:text-white">Home</RouterLink>
            </li>
            <li aria-hidden="true" class="text-white/35">/</li>
            <li class="font-semibold text-white">Terms of Use</li>
          </ol>
        </nav>

        <div class="mt-5 flex items-center gap-3">
          <span class="h-[2px] w-7 bg-[#c4b5f0]" aria-hidden="true" />
          <p class="text-[11px] font-bold tracking-[0.22em] text-[#c4b5f0] uppercase sm:text-xs">
            Official document
          </p>
        </div>

        <h1
          id="terms-hero-heading"
          class="mt-3 font-display text-[clamp(1.9rem,4vw,3rem)] leading-[1.1] font-semibold tracking-[-0.025em] text-white"
        >
          Terms of Use
        </h1>

        <p class="mt-3.5 max-w-2xl text-[14.5px] leading-relaxed text-white/68 sm:text-[15.5px]">
          Conditions for using the public website of OREDA Limited, nodal
          agency under the Department of Energy, Government of Odisha.
        </p>
      </div>

      <dl
        class="terms-hero-reveal mt-8 grid grid-cols-2 gap-px overflow-hidden border border-white/12 sm:grid-cols-4"
        style="animation-delay: 80ms"
      >
        <div v-for="fact in facts" :key="fact.label" class="bg-white/[0.06] px-3.5 py-3 sm:px-4 sm:py-3.5">
          <dt class="text-[10px] font-bold tracking-[0.18em] text-[#c4b5f0] uppercase">
            {{ fact.label }}
          </dt>
          <dd class="mt-1.5 text-[13px] font-semibold text-white sm:text-[13.5px]">
            {{ fact.value }}
          </dd>
        </div>
      </dl>
    </div>
  </section>
</template>

<style scoped>
.terms-hero-base {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    122deg,
    #00081f 0%,
    #001038 34%,
    #1a1044 62%,
    #382080 100%
  );
}

.terms-hero-mesh {
  position: absolute;
  inset: 0;
  opacity: 0.22;
  background-image:
    linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px);
  background-size: 40px 40px;
}

.terms-hero-glow {
  position: absolute;
  border-radius: 9999px;
  filter: blur(72px);
}

.terms-hero-glow--a {
  top: -30%;
  right: -8%;
  width: min(50vw, 420px);
  height: min(50vw, 420px);
  background: radial-gradient(circle, rgba(196, 181, 240, 0.28), transparent 68%);
}

.terms-hero-glow--b {
  bottom: -40%;
  left: 0;
  width: min(40vw, 320px);
  height: min(40vw, 320px);
  background: radial-gradient(circle, rgba(56, 32, 128, 0.5), transparent 70%);
}

.terms-hero-reveal {
  opacity: 0;
  transform: translateY(14px);
  transition:
    opacity 0.65s cubic-bezier(0.22, 1, 0.36, 1),
    transform 0.65s cubic-bezier(0.22, 1, 0.36, 1);
}

.is-inview .terms-hero-reveal {
  opacity: 1;
  transform: translateY(0);
}

@media (prefers-reduced-motion: reduce) {
  .terms-hero-reveal {
    opacity: 1;
    transform: none;
    transition: none;
  }
}
</style>
