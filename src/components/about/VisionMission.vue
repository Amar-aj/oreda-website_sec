<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'

const missionLines = [
  {
    title: 'Access',
    text: 'Expand solar and clean-power reach across every district.',
  },
  {
    title: 'Delivery',
    text: 'Run citizen schemes with speed, clarity and accountability.',
  },
  {
    title: 'Future',
    text: 'Grow a resilient, low-carbon energy system for Odisha.',
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
    class="vm relative w-full overflow-hidden"
    aria-labelledby="vm-heading"
    :class="{ 'is-inview': inView }"
  >
    <!-- Same dark atmospheric background -->
    <div class="pointer-events-none absolute inset-0" aria-hidden="true">
      <div class="vm-base" />
      <div class="vm-mesh" />
      <div class="vm-orb vm-orb--a" />
      <div class="vm-orb vm-orb--b" />
      <div class="vm-slash" />
    </div>

    <div class="relative mx-auto max-w-[1400px] px-4 py-11 sm:px-6 sm:py-12 lg:px-8 lg:py-14">
      <!-- Header -->
      <div class="vm-reveal" style="--delay: 0ms">
        <div class="flex items-center gap-3">
          <span class="h-[2px] w-7 bg-[#c4b5f0]" aria-hidden="true" />
          <p class="text-[11px] font-bold tracking-[0.22em] text-[#c4b5f0] uppercase">
            Purpose Framework
          </p>
        </div>
        <div
          class="mt-3 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between lg:gap-10"
        >
          <h2 id="vm-heading" class="vm-heading">
            Our Vision &amp;
            <span>Our Mission</span>
          </h2>
          <p class="max-w-sm shrink-0 text-[14px] leading-relaxed text-white/60 lg:pb-1.5 lg:text-right">
            The twin mandate that shapes OREDA’s programmes, partnerships and
            clean-energy delivery across Odisha.
          </p>
        </div>
      </div>

      <!-- Two sides: Vision | Divider | Mission -->
      <div class="vm-reveal vm-split mt-9 lg:mt-11" style="--delay: 100ms">
        <!-- Vision -->
        <article class="vm-side vm-side--vision relative">
          <p class="vm-side-label" aria-hidden="true">VISION</p>
          <p class="vm-kicker">01 / Vision</p>
          <h3 class="vm-title">
            A renewable Odisha where clean power reaches every citizen.
          </h3>
          <div class="vm-copy">
            <p>
              To establish Odisha as a national leader in renewable energy
              adoption—delivering affordable, reliable and sustainable power that
              strengthens livelihoods, communities and long-term energy security
              across all thirty districts.
            </p>
            <p>
              We envision solar rooftops, green livelihoods and community-scale
              clean power as everyday realities—cutting carbon dependence while
              creating opportunity for households, farmers and local institutions.
            </p>
            <p>
              Through equitable access and lasting resilience, OREDA works toward
              a future where clean energy is not a privilege, but a shared
              foundation for growth in every part of Odisha.
            </p>
            <p>
              This vision guides our programmes and partnerships—so policy,
              technology and people move together toward a cleaner, brighter
              and energy-secure Odisha.
            </p>
          </div>
          <div class="vm-tags">
            <span>Clean Power</span>
            <span aria-hidden="true">·</span>
            <span>Statewide Reach</span>
            <span aria-hidden="true">·</span>
            <span>Sustainable Growth</span>
          </div>
        </article>

        <!-- Center divider -->
        <div class="vm-divider" aria-hidden="true">
          <span class="vm-divider-line" />
          <span class="vm-divider-core">
            <span class="vm-divider-diamond" />
          </span>
        </div>

        <!-- Mission -->
        <article class="vm-side vm-side--mission relative">
          <p class="vm-side-label vm-side-label--right" aria-hidden="true">MISSION</p>
          <p class="vm-kicker">02 / Mission</p>
          <h3 class="vm-title">
            Turn policy into practical clean-energy action.
          </h3>
          <p class="vm-copy vm-copy--single">
            To promote, facilitate and implement renewable energy programmes
            through innovative schemes, technology and partnerships—making solar
            and clean power accessible, transparent and citizen-focused.
          </p>

          <ul class="vm-list" role="list">
            <li
              v-for="(item, index) in missionLines"
              :key="item.title"
              class="vm-item"
              :style="{ '--item-delay': `${180 + index * 70}ms` }"
            >
              <span class="vm-item-num" aria-hidden="true">
                {{ String(index + 1).padStart(2, '0') }}
              </span>
              <div class="min-w-0">
                <p class="vm-item-label">{{ item.title }}</p>
                <p class="vm-item-text">{{ item.text }}</p>
              </div>
            </li>
          </ul>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
.vm-heading {
  margin: 0;
  font-family: var(--font-display);
  font-size: 1.75rem;
  font-weight: 600;
  line-height: 1.1;
  letter-spacing: -0.02em;
  color: #fff;
  white-space: nowrap;
}

.vm-heading span {
  color: #c4b5f0;
}

@media (min-width: 640px) {
  .vm-heading {
    font-size: 2.25rem;
  }
}

@media (min-width: 1024px) {
  .vm-heading {
    font-size: 2.75rem;
  }
}

.vm-base {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    125deg,
    #00061a 0%,
    #001038 34%,
    #1a0f48 68%,
    #2a1860 100%
  );
}

.vm-mesh {
  position: absolute;
  inset: 0;
  opacity: 0.3;
  background-image:
    linear-gradient(rgba(255, 255, 255, 0.035) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.035) 1px, transparent 1px);
  background-size: 56px 56px;
  mask-image: radial-gradient(ellipse 80% 70% at 50% 40%, black 20%, transparent 75%);
}

.vm-orb {
  position: absolute;
  border-radius: 9999px;
  filter: blur(80px);
}

.vm-orb--a {
  top: -18%;
  left: -8%;
  width: min(48vw, 420px);
  height: min(48vw, 420px);
  background: radial-gradient(circle, rgba(90, 60, 170, 0.35), transparent 70%);
}

.vm-orb--b {
  right: -10%;
  bottom: -22%;
  width: min(46vw, 400px);
  height: min(46vw, 400px);
  background: radial-gradient(circle, rgba(196, 181, 240, 0.16), transparent 70%);
}

.vm-slash {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    118deg,
    transparent 0%,
    transparent 46%,
    rgba(255, 255, 255, 0.025) 46.2%,
    rgba(255, 255, 255, 0.05) 50%,
    rgba(255, 255, 255, 0.025) 54%,
    transparent 54.3%,
    transparent 100%
  );
}

.vm-split {
  display: grid;
  gap: 2.25rem;
  align-items: stretch;
}

@media (min-width: 1024px) {
  .vm-split {
    grid-template-columns: minmax(0, 1fr) 2.5rem minmax(0, 1fr);
    gap: 0;
  }
}

.vm-side {
  display: flex;
  min-width: 0;
  height: 100%;
  flex-direction: column;
}

.vm-kicker {
  margin: 0;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: #c4b5f0;
}

.vm-title {
  margin: 0.75rem 0 0;
  font-family: var(--font-display);
  font-size: clamp(1.35rem, 2.2vw, 1.75rem);
  font-weight: 600;
  line-height: 1.25;
  letter-spacing: -0.015em;
  color: #fff;
  text-wrap: balance;
}

.vm-copy {
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
  font-size: 14.5px;
  line-height: 1.7;
  color: rgba(255, 255, 255, 0.72);
  text-align: justify;
  text-justify: inter-word;
  hyphens: auto;
}

.vm-copy--single {
  display: block;
}

@media (min-width: 640px) {
  .vm-copy {
    font-size: 15px;
  }
}

.vm-tags {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.55rem 0.7rem;
  margin-top: auto;
  padding-top: 1.5rem;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: #c4b5f0;
}

.vm-tags span[aria-hidden='true'] {
  color: rgba(255, 255, 255, 0.25);
}

.vm-divider {
  display: none;
}

@media (min-width: 1024px) {
  .vm-divider {
    position: relative;
    display: flex;
    width: 100%;
    height: 100%;
    flex-direction: column;
    align-items: center;
    justify-content: stretch;
  }

  .vm-divider-line {
    flex: 1;
    width: 1px;
    min-height: 100%;
    background: linear-gradient(
      180deg,
      transparent 0%,
      rgba(196, 181, 240, 0.2) 10%,
      rgba(196, 181, 240, 0.65) 50%,
      rgba(196, 181, 240, 0.2) 90%,
      transparent 100%
    );
  }

  .vm-divider-core {
    position: absolute;
    top: 50%;
    left: 50%;
    display: grid;
    place-items: center;
    width: 1.6rem;
    height: 1.6rem;
    background: linear-gradient(155deg, #1a0f48, #001038);
    border: 1px solid rgba(196, 181, 240, 0.5);
    box-shadow:
      0 0 0 5px rgba(0, 16, 56, 0.55),
      0 0 16px rgba(196, 181, 240, 0.28);
    transform: translate(-50%, -50%) rotate(45deg);
  }

  .vm-divider-diamond {
    width: 0.35rem;
    height: 0.35rem;
    background: #c4b5f0;
    box-shadow: 0 0 8px rgba(196, 181, 240, 0.75);
  }
}

.vm-side-label {
  display: none;
}

@media (min-width: 1280px) {
  .vm-side-label {
    position: absolute;
    top: 50%;
    left: -0.15rem;
    z-index: 0;
    display: block;
    margin: 0;
    transform: translateY(-50%) rotate(-90deg);
    transform-origin: left center;
    font-family: var(--font-display);
    font-size: 4.25rem;
    font-weight: 600;
    letter-spacing: 0.08em;
    line-height: 1;
    color: rgba(255, 255, 255, 0.05);
    white-space: nowrap;
    pointer-events: none;
    user-select: none;
  }

  .vm-side-label--right {
    top: auto;
    bottom: 0;
    left: auto;
    right: -0.15rem;
    transform: rotate(90deg);
    transform-origin: right bottom;
  }

  .vm-side--vision,
  .vm-side--mission {
    z-index: 1;
  }

  .vm-side--vision .vm-kicker,
  .vm-side--vision .vm-title,
  .vm-side--vision .vm-copy,
  .vm-side--vision .vm-tags,
  .vm-side--mission .vm-kicker,
  .vm-side--mission .vm-title,
  .vm-side--mission .vm-copy,
  .vm-side--mission .vm-list {
    position: relative;
    z-index: 1;
  }
}

.vm-list {
  margin: 1.5rem 0 0;
  padding: 0;
  list-style: none;
}

.vm-item {
  display: grid;
  grid-template-columns: 2rem minmax(0, 1fr);
  gap: 0.75rem;
  align-items: start;
  padding: 0.85rem 0;
  border-top: 1px solid rgba(255, 255, 255, 0.14);
  opacity: 0;
  transform: translateY(10px);
  transition:
    opacity 0.5s cubic-bezier(0.22, 1, 0.36, 1),
    transform 0.5s cubic-bezier(0.22, 1, 0.36, 1);
  transition-delay: var(--item-delay, 0ms);
}

.vm-item:last-child {
  border-bottom: 1px solid rgba(255, 255, 255, 0.14);
}

.is-inview .vm-item {
  opacity: 1;
  transform: translateY(0);
}

.vm-item-num {
  padding-top: 0.15rem;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.08em;
  color: #c4b5f0;
}

.vm-item-label {
  margin: 0;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: #c4b5f0;
}

.vm-item-text {
  margin: 0.25rem 0 0;
  font-size: 13.5px;
  line-height: 1.45;
  color: rgba(255, 255, 255, 0.85);
  text-align: justify;
  text-justify: inter-word;
}

.vm-reveal {
  opacity: 0;
  transform: translateY(16px);
  transition:
    opacity 0.6s cubic-bezier(0.22, 1, 0.36, 1),
    transform 0.6s cubic-bezier(0.22, 1, 0.36, 1);
  transition-delay: var(--delay, 0ms);
}

.is-inview .vm-reveal {
  opacity: 1;
  transform: translateY(0);
}

@media (prefers-reduced-motion: reduce) {
  .vm-reveal,
  .vm-item {
    opacity: 1;
    transform: none;
    transition: none;
  }
}
</style>
