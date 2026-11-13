<script setup lang="ts">
import { useSiteStore } from '@/stores/site'
import { ArrowRight, Mail, MapPin, Phone } from 'lucide-vue-next'
import { onMounted, onUnmounted, ref } from 'vue'
import { RouterLink } from 'vue-router'

const site = useSiteStore()

const contacts = [
  {
    icon: MapPin,
    label: 'Address',
    value: 'S-59, Mancheswar Industrial Estate, Bhubaneswar – 751010',
    href: 'https://maps.google.com/?q=OREDA+Mancheswar+Bhubaneswar',
    external: true,
  },
  {
    icon: Phone,
    label: 'Phone',
    value: site.phone,
    href: `tel:${site.phone.replace(/\s/g, '')}`,
    external: false,
  },
  {
    icon: Mail,
    label: 'Email',
    value: site.email,
    href: `mailto:${site.email}`,
    external: false,
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
    { threshold: 0.2 },
  )
  if (sectionRef.value) observer.observe(sectionRef.value)
})

onUnmounted(() => observer?.disconnect())
</script>

<template>
  <section
    id="home-contact"
    ref="sectionRef"
    class="contact relative w-full overflow-hidden"
    aria-labelledby="contact-heading"
    :class="{ 'is-inview': inView }"
  >
    <div class="pointer-events-none absolute inset-0" aria-hidden="true">
      <div class="contact-base" />
      <div class="contact-mesh" />
      <div class="contact-orb contact-orb--a" />
      <div class="contact-orb contact-orb--b" />
      <div class="contact-slash" />
      <p class="contact-watermark">OREDA</p>
    </div>

    <div
      class="relative mx-auto max-w-[1400px] px-4 py-4 sm:px-6 sm:py-5 lg:px-8 lg:py-5"
    >
      <!-- Top row: label left / Contact Us right -->
      <div
        class="contact-reveal flex flex-wrap items-center justify-between gap-3"
        style="--delay: 0ms"
      >
        <div class="flex items-center gap-3">
          <span class="h-[2px] w-6 bg-oreda" aria-hidden="true" />
          <p
            class="text-[11px] font-bold tracking-[0.2em] text-oreda uppercase"
          >
            Contact
          </p>
        </div>

        <RouterLink to="/contact" class="contact-cta group">
          <span class="contact-cta-label">Contact Us</span>
          <span class="contact-cta-icon" aria-hidden="true">
            <ArrowRight :size="12" :stroke-width="2.4" />
          </span>
        </RouterLink>
      </div>

      <div
        class="contact-reveal mt-2.5 grid items-end gap-4 lg:mt-3 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.35fr)] lg:gap-8"
        style="--delay: 60ms"
      >
        <!-- Left copy -->
        <div class="max-w-lg">
          <h2
            id="contact-heading"
            class="font-display text-[clamp(1.4rem,2.5vw,1.9rem)] leading-[1.15] font-semibold tracking-[-0.015em] text-oreda-dark"
          >
            Connect with
            <span class="text-oreda">OREDA</span>
          </h2>
          <p class="mt-1 text-[13px] leading-relaxed text-[#5a6b82] sm:text-[13.5px]">
            Department of Energy · Government of Odisha
          </p>
        </div>

        <!-- Right: contact details fully visible -->
        <div class="contact-rail">
          <a
            v-for="(item, index) in contacts"
            :key="item.label"
            :href="item.href"
            class="contact-chip group"
            :style="{ '--chip-delay': `${100 + index * 55}ms` }"
            :target="item.external ? '_blank' : undefined"
            :rel="item.external ? 'noopener noreferrer' : undefined"
          >
            <span class="contact-chip-icon">
              <component
                :is="item.icon"
                :size="15"
                :stroke-width="1.8"
              />
            </span>
            <span class="min-w-0 flex-1">
              <span
                class="block text-[10px] font-bold tracking-[0.14em] text-[#2a5080] uppercase"
              >
                {{ item.label }}
              </span>
              <span
                class="mt-0.5 block text-[13px] leading-snug font-semibold break-words text-oreda-dark transition group-hover:text-[#2a5080] sm:text-[13.5px]"
              >
                {{ item.value }}
              </span>
            </span>
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.contact-base {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    145deg,
    #e6eef8 0%,
    #f3f7fb 42%,
    #eaf1f8 78%,
    #dde8f4 100%
  );
}

.contact-mesh {
  position: absolute;
  inset: 0;
  opacity: 0.45;
  background-image:
    linear-gradient(rgba(0, 16, 56, 0.05) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0, 16, 56, 0.05) 1px, transparent 1px);
  background-size: 48px 48px;
  mask-image: radial-gradient(ellipse 70% 80% at 70% 40%, black 10%, transparent 72%);
}

.contact-orb {
  position: absolute;
  border-radius: 9999px;
  filter: blur(70px);
}

.contact-orb--a {
  top: -35%;
  right: -5%;
  width: min(48vw, 420px);
  height: min(48vw, 420px);
  background: radial-gradient(circle, rgba(90, 140, 190, 0.22) 0%, transparent 70%);
}

.contact-orb--b {
  bottom: -45%;
  left: -8%;
  width: min(42vw, 360px);
  height: min(42vw, 360px);
  background: radial-gradient(circle, rgba(0, 16, 56, 0.08) 0%, transparent 70%);
}

.contact-slash {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    118deg,
    transparent 0%,
    transparent 48%,
    rgba(0, 16, 56, 0.025) 48.2%,
    rgba(0, 16, 56, 0.05) 52%,
    rgba(0, 16, 56, 0.025) 56%,
    transparent 56.3%,
    transparent 100%
  );
}

.contact-watermark {
  position: absolute;
  right: 2%;
  bottom: -0.2em;
  margin: 0;
  font-family: var(--font-display);
  font-size: clamp(3.5rem, 11vw, 7rem);
  font-weight: 600;
  line-height: 1;
  letter-spacing: -0.04em;
  color: rgba(0, 16, 56, 0.045);
  user-select: none;
  white-space: nowrap;
}

.contact-rail {
  display: grid;
  gap: 0.4rem;
}

@media (min-width: 768px) {
  .contact-rail {
    grid-template-columns: 1.35fr 0.85fr 1.1fr;
    gap: 0.5rem;
    align-items: stretch;
  }
}

.contact-chip {
  display: flex;
  align-items: flex-start;
  gap: 0.6rem;
  min-width: 0;
  height: 100%;
  padding: 0.55rem 0.7rem;
  text-decoration: none;
  border: 1px solid rgba(0, 16, 56, 0.12);
  background: rgba(255, 255, 255, 0.78);
  box-shadow: 0 1px 0 rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  opacity: 0;
  transform: translateY(12px);
  transition:
    opacity 0.55s cubic-bezier(0.22, 1, 0.36, 1),
    transform 0.55s cubic-bezier(0.22, 1, 0.36, 1),
    background 0.25s ease,
    border-color 0.25s ease,
    box-shadow 0.25s ease;
  transition-delay: var(--chip-delay, 0ms);
}

.contact-chip:hover {
  background: #fff;
  border-color: rgba(42, 80, 128, 0.35);
  box-shadow: 0 8px 24px -12px rgba(0, 16, 56, 0.2);
}

.contact-chip-icon {
  display: flex;
  height: 1.9rem;
  width: 1.9rem;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  color: #2a5080;
  background: rgba(0, 16, 56, 0.05);
  border: 1px solid rgba(0, 16, 56, 0.12);
}

.contact-cta {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  overflow: hidden;
  padding: 0.35rem 0.35rem 0.35rem 0.85rem;
  text-decoration: none;
  color: #382080;
  background: #fff;
  border: 1.5px solid rgba(56, 32, 128, 0.28);
  box-shadow: 0 1px 0 rgba(255, 255, 255, 0.9);
  transition:
    color 0.35s ease,
    border-color 0.35s ease,
    box-shadow 0.35s ease,
    transform 0.35s cubic-bezier(0.22, 1, 0.36, 1);
}

.contact-cta::before {
  content: '';
  position: absolute;
  inset: 0;
  z-index: 0;
  background: linear-gradient(115deg, #382080 0%, #482888 55%, #2e1968 100%);
  transform: scaleX(0);
  transform-origin: left center;
  transition: transform 0.4s cubic-bezier(0.22, 1, 0.36, 1);
}

.contact-cta-label {
  position: relative;
  z-index: 1;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.01em;
}

.contact-cta-icon {
  position: relative;
  z-index: 1;
  display: flex;
  height: 1.4rem;
  width: 1.4rem;
  align-items: center;
  justify-content: center;
  color: #fff;
  background: #382080;
  transition:
    background 0.35s ease,
    color 0.35s ease,
    transform 0.35s cubic-bezier(0.22, 1, 0.36, 1);
}

.contact-cta:hover {
  color: #fff;
  border-color: transparent;
  transform: translateY(-2px);
  box-shadow: 0 10px 28px -12px rgba(56, 32, 128, 0.55);
}

.contact-cta:hover::before {
  transform: scaleX(1);
}

.contact-cta:hover .contact-cta-icon {
  background: rgba(255, 255, 255, 0.18);
  transform: translateX(2px);
}

.contact-cta:focus-visible {
  outline: 2px solid #382080;
  outline-offset: 3px;
}

.contact-reveal {
  opacity: 0;
  transform: translateY(14px);
  transition:
    opacity 0.6s cubic-bezier(0.22, 1, 0.36, 1),
    transform 0.6s cubic-bezier(0.22, 1, 0.36, 1);
  transition-delay: var(--delay, 0ms);
}

.is-inview .contact-reveal,
.is-inview .contact-chip {
  opacity: 1;
  transform: translateY(0);
}

@media (prefers-reduced-motion: reduce) {
  .contact-reveal,
  .contact-chip {
    opacity: 1;
    transform: none;
    transition: none !important;
  }
}
</style>
