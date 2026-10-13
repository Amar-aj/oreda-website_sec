<script setup lang="ts">
import { Mail, MapPin, Phone } from 'lucide-vue-next'
import { onMounted, onUnmounted, ref } from 'vue'
import { RouterLink } from 'vue-router'

const signals = [
  { icon: Phone, label: 'Call' },
  { icon: Mail, label: 'Email' },
  { icon: MapPin, label: 'Visit' },
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
    class="contact-hero relative w-full overflow-hidden"
    aria-labelledby="contact-hero-heading"
    :class="{ 'is-inview': inView }"
  >
    <div class="pointer-events-none absolute inset-0" aria-hidden="true">
      <div class="contact-hero-base" />
      <div class="contact-hero-mesh" />
      <div class="contact-hero-glow contact-hero-glow--a" />
      <div class="contact-hero-glow contact-hero-glow--b" />
      <div class="contact-hero-slash" />
      <p class="contact-hero-watermark">OREDA</p>
    </div>

    <div
      class="relative mx-auto flex max-w-[1400px] flex-col justify-center px-4 py-10 sm:px-6 sm:py-12 lg:px-8 lg:py-14"
    >
      <div class="contact-hero-reveal max-w-2xl" style="--delay: 0ms">
        <nav class="text-[12.5px] text-white/60" aria-label="Breadcrumb">
          <ol class="flex flex-wrap items-center gap-1.5">
            <li>
              <RouterLink to="/" class="transition hover:text-white">
                Home
              </RouterLink>
            </li>
            <li aria-hidden="true" class="text-white/35">/</li>
            <li class="font-semibold text-white">Contact Us</li>
          </ol>
        </nav>

        <div class="mt-5 flex items-center gap-3">
          <span class="h-[2px] w-7 rounded-full bg-[#c4b5f0]" aria-hidden="true" />
          <p
            class="text-[11px] font-bold tracking-[0.2em] text-[#c4b5f0] uppercase sm:text-xs"
          >
            OREDA · Get in touch
          </p>
        </div>

        <h1
          id="contact-hero-heading"
          class="mt-3 font-display text-[clamp(1.85rem,4vw,2.85rem)] leading-[1.12] font-semibold tracking-[-0.02em] text-white"
        >
          Let’s connect on
          <span class="text-[#c4b5f0]">clean energy</span>
          for Odisha.
        </h1>

        <p
          class="mt-3.5 max-w-xl text-[14px] leading-relaxed text-white/68 sm:text-[15px]"
        >
          Reach the Odisha Renewable Energy Development Agency for scheme
          support, project queries, and official correspondence.
        </p>
      </div>

      <div
        class="contact-hero-reveal mt-8 flex flex-wrap items-center gap-3"
        style="--delay: 120ms"
      >
        <div
          v-for="(item, index) in signals"
          :key="item.label"
          class="contact-hero-signal"
          :style="{ '--signal-delay': `${160 + index * 70}ms` }"
        >
          <span class="contact-hero-signal-icon" aria-hidden="true">
            <component :is="item.icon" :size="15" :stroke-width="2.1" />
          </span>
          <span class="text-[12px] font-bold tracking-[0.08em] text-white uppercase">
            {{ item.label }}
          </span>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.contact-hero-base {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    122deg,
    #00081f 0%,
    #001038 30%,
    #1f1452 58%,
    #382080 82%,
    #4a2f8f 100%
  );
}

.contact-hero-mesh {
  position: absolute;
  inset: 0;
  opacity: 0.3;
  background-image:
    linear-gradient(rgba(255, 255, 255, 0.045) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.045) 1px, transparent 1px);
  background-size: 44px 44px;
  mask-image: radial-gradient(ellipse 70% 80% at 75% 40%, black 12%, transparent 78%);
}

.contact-hero-glow {
  position: absolute;
  border-radius: 9999px;
  filter: blur(72px);
}

.contact-hero-glow--a {
  top: -28%;
  right: -6%;
  width: min(52vw, 440px);
  height: min(52vw, 440px);
  background: radial-gradient(circle, rgba(196, 181, 240, 0.3), transparent 68%);
}

.contact-hero-glow--b {
  bottom: -36%;
  left: 4%;
  width: min(42vw, 340px);
  height: min(42vw, 340px);
  background: radial-gradient(circle, rgba(56, 32, 128, 0.55), transparent 70%);
}

.contact-hero-slash {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    115deg,
    transparent 0%,
    transparent 52%,
    rgba(255, 255, 255, 0.03) 52.2%,
    rgba(255, 255, 255, 0.055) 56%,
    rgba(255, 255, 255, 0.03) 60%,
    transparent 60.3%,
    transparent 100%
  );
}

.contact-hero-watermark {
  position: absolute;
  top: 52%;
  right: 4%;
  z-index: 1;
  margin: 0;
  transform: translateY(-50%);
  font-family: var(--font-display);
  font-size: clamp(4.2rem, 14vw, 9rem);
  font-weight: 600;
  line-height: 1;
  letter-spacing: -0.045em;
  color: rgba(255, 255, 255, 0.07);
  user-select: none;
  white-space: nowrap;
  pointer-events: none;
}

.contact-hero-signal {
  display: inline-flex;
  align-items: center;
  gap: 0.55rem;
  padding: 0.55rem 0.9rem 0.55rem 0.55rem;
  color: #fff;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.18);
  opacity: 0;
  transform: translateY(10px);
  transition:
    opacity 0.55s cubic-bezier(0.22, 1, 0.36, 1),
    transform 0.55s cubic-bezier(0.22, 1, 0.36, 1),
    background 0.25s ease,
    border-color 0.25s ease;
  transition-delay: var(--signal-delay, 0ms);
}

.is-inview .contact-hero-signal {
  opacity: 1;
  transform: translateY(0);
}

.contact-hero-signal:hover {
  background: rgba(255, 255, 255, 0.1);
  border-color: rgba(196, 181, 240, 0.45);
}

.contact-hero-signal-icon {
  display: grid;
  place-items: center;
  width: 1.85rem;
  height: 1.85rem;
  color: #efe8ff;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(196, 181, 240, 0.35);
  border-radius: 9999px;
}

.contact-hero-reveal {
  opacity: 0;
  transform: translateY(16px);
  transition:
    opacity 0.65s cubic-bezier(0.22, 1, 0.36, 1),
    transform 0.65s cubic-bezier(0.22, 1, 0.36, 1);
  transition-delay: var(--delay, 0ms);
}

.is-inview .contact-hero-reveal {
  opacity: 1;
  transform: translateY(0);
}

@media (prefers-reduced-motion: reduce) {
  .contact-hero-reveal,
  .contact-hero-signal {
    opacity: 1;
    transform: none;
    transition: none;
  }
}
</style>
