<script setup lang="ts">
import { ExternalLink, Navigation } from 'lucide-vue-next'
import { onMounted, onUnmounted, ref } from 'vue'

const mapEmbedUrl =
  'https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d119744.01609645985!2d85.74943602904176!3d20.300246314265884!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a1909d6ffffffff%3A0xf7f28d87a45fb49!2sOrissa%20Renewable%20Energy%20Development%20Agency!5e0!3m2!1sen!2sin!4v1791801348072!5m2!1sen!2sin'

const mapLink =
  'https://maps.google.com/?q=OREDA+Mancheswar+Bhubaneswar'

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
    class="contact-map relative w-full overflow-hidden"
    aria-labelledby="contact-map-heading"
    :class="{ 'is-inview': inView }"
  >
    <div class="relative mx-auto max-w-[1400px] px-4 py-10 sm:px-6 sm:py-12 lg:px-8 lg:py-14">
      <div
        class="contact-map-reveal flex flex-wrap items-end justify-between gap-4"
        style="--delay: 0ms"
      >
        <div class="max-w-xl">
          <div class="flex items-center gap-3">
            <span class="h-[2px] w-7 bg-oreda" aria-hidden="true" />
            <p class="text-[11px] font-bold tracking-[0.2em] text-oreda uppercase">
              Find us
            </p>
          </div>
          <h2
            id="contact-map-heading"
            class="mt-3 font-display text-[clamp(1.55rem,2.8vw,2.2rem)] leading-[1.15] font-semibold tracking-[-0.015em] text-oreda-dark"
          >
            Visit OREDA at Mancheswar,
            <em class="font-display not-italic text-oreda">Bhubaneswar</em>.
          </h2>
          <p class="mt-2.5 text-[14px] leading-relaxed text-[#5a6b82]">
            S-59, Mancheswar Industrial Estate · Pin 751010
          </p>
        </div>

        <a
          :href="mapLink"
          target="_blank"
          rel="noopener noreferrer"
          class="contact-map-cta group"
        >
          <span class="contact-map-cta-icon" aria-hidden="true">
            <Navigation :size="14" :stroke-width="2.2" />
          </span>
          <span>Get directions</span>
          <ExternalLink :size="13" :stroke-width="2.2" class="opacity-70" />
        </a>
      </div>

      <div
        class="contact-map-reveal contact-map-frame mt-7"
        style="--delay: 100ms"
      >
        <iframe
          :src="mapEmbedUrl"
          title="OREDA office location on Google Maps"
          class="h-full w-full border-0"
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
          allowfullscreen
        />
        <div class="contact-map-glow" aria-hidden="true" />
      </div>
    </div>
  </section>
</template>

<style scoped>
.contact-map {
  background: linear-gradient(180deg, #ffffff 0%, #f3f1f9 100%);
}

.contact-map-reveal {
  opacity: 0;
  transform: translateY(16px);
  transition:
    opacity 0.65s cubic-bezier(0.22, 1, 0.36, 1),
    transform 0.65s cubic-bezier(0.22, 1, 0.36, 1);
  transition-delay: var(--delay, 0ms);
}

.is-inview .contact-map-reveal {
  opacity: 1;
  transform: translateY(0);
}

.contact-map-cta {
  display: inline-flex;
  align-items: center;
  gap: 0.55rem;
  padding: 0.65rem 1rem 0.65rem 0.65rem;
  font-size: 13px;
  font-weight: 700;
  color: #001038;
  text-decoration: none;
  background: #fff;
  border: 1px solid rgba(56, 32, 128, 0.16);
  box-shadow: 0 10px 24px -16px rgba(0, 16, 56, 0.35);
  transition:
    border-color 0.2s ease,
    color 0.2s ease,
    transform 0.2s ease;
}

.contact-map-cta:hover {
  color: #382080;
  border-color: rgba(56, 32, 128, 0.35);
  transform: translateY(-1px);
}

.contact-map-cta-icon {
  display: grid;
  place-items: center;
  width: 1.85rem;
  height: 1.85rem;
  color: #382080;
  background: rgba(56, 32, 128, 0.08);
  border: 1px solid rgba(56, 32, 128, 0.12);
}

.contact-map-frame {
  position: relative;
  height: min(52vw, 26rem);
  min-height: 16rem;
  overflow: hidden;
  border: 1px solid rgba(56, 32, 128, 0.12);
  box-shadow: 0 28px 50px -30px rgba(0, 16, 56, 0.4);
}

.contact-map-glow {
  pointer-events: none;
  position: absolute;
  inset: 0;
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.35);
  background: linear-gradient(
    180deg,
    rgba(56, 32, 128, 0.04) 0%,
    transparent 28%,
    transparent 72%,
    rgba(0, 16, 56, 0.06) 100%
  );
}

@media (prefers-reduced-motion: reduce) {
  .contact-map-reveal {
    opacity: 1;
    transform: none;
    transition: none;
  }
}
</style>
