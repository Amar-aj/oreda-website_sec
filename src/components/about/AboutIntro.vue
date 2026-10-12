<script setup lang="ts">
import { Building2, Handshake, ScrollText, Sun } from 'lucide-vue-next'
import { onMounted, onUnmounted, ref } from 'vue'

const glanceItems = [
  {
    icon: Building2,
    title: 'Nodal Agency',
    text: 'Steers Odisha’s renewable energy mandate under the Department of Energy.',
  },
  {
    icon: Sun,
    title: 'Solar Pioneer',
    text: 'Scales rooftop, street-lighting and large solar projects across districts.',
  },
  {
    icon: ScrollText,
    title: 'Citizen Schemes',
    text: 'Delivers PM Surya Ghar, KUSUM and other clean-energy schemes to people.',
  },
  {
    icon: Handshake,
    title: 'Green Partner',
    text: 'Works with government, industry and communities for lasting adoption.',
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
    class="about-intro relative w-full overflow-hidden"
    aria-labelledby="about-intro-heading"
    :class="{ 'is-inview': inView }"
  >
    <div class="pointer-events-none absolute inset-0" aria-hidden="true">
      <div class="about-intro-base" />
      <div class="about-intro-orb" />
    </div>

    <div
      class="relative mx-auto grid max-w-[1400px] items-start gap-10 px-4 py-12 sm:px-6 sm:py-14 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.95fr)] lg:gap-12 lg:px-8 lg:py-16"
    >
      <!-- Left copy -->
      <div class="about-intro-reveal min-w-0" style="--delay: 0ms">
        <div class="flex items-center gap-3">
          <span class="h-[2px] w-7 bg-oreda" aria-hidden="true" />
          <p class="text-[11px] font-bold tracking-[0.2em] text-oreda uppercase sm:text-xs">
            About OREDA
            <span class="mx-1.5 text-oreda/40">|</span>
            <span class="text-[#8b849c]">Est 1984</span>
          </p>
        </div>

        <h2
          id="about-intro-heading"
          class="mt-4 font-display text-[clamp(1.7rem,3.4vw,2.55rem)] leading-[1.18] font-semibold tracking-[-0.015em] text-oreda-dark"
        >
          A nodal agency for
          <em class="font-display not-italic text-oreda">clean energy progress.</em>
        </h2>

        <p class="mt-4 text-[15px] leading-relaxed font-semibold text-oreda sm:text-[15.5px]">
          OREDA strives for excellence and places strong emphasis on generating
          lasting value—turning Odisha’s renewable energy priorities into
          practical programmes citizens can access.
        </p>

        <div class="mt-4 space-y-3.5 text-[14.5px] leading-relaxed text-[#5c6478] sm:text-[15px]">
          <p>
            As the nodal agency under the Department of Energy, Government of
            Odisha, OREDA Limited promotes solar, wind and other clean-energy
            solutions through policy support, project implementation and
            stakeholder partnerships.
          </p>
          <p>
            From citizen rooftop schemes to community street lighting and
            utility-scale initiatives, our work connects technology, process and
            people so renewable power reaches every district.
          </p>
        </div>

        <blockquote class="about-quote mt-7">
          <span class="about-quote-mark" aria-hidden="true">“</span>
          <p class="about-quote-text">
            Clean energy becomes meaningful when policy, projects, people and
            appropriate technology work together for every citizen of Odisha.
          </p>
        </blockquote>
      </div>

      <!-- Right: at a glance -->
      <aside
        class="about-intro-reveal about-glance"
        style="--delay: 120ms"
        aria-label="OREDA at a glance"
      >
        <div class="about-glance-head">
          <h3 class="font-display text-[1.35rem] font-semibold tracking-[-0.01em] text-oreda-dark sm:text-[1.45rem]">
            OREDA at a glance
          </h3>
          <span class="about-glance-tag">Nodal Agency</span>
        </div>

        <div class="mt-5 grid gap-3 sm:grid-cols-2 sm:gap-3.5">
          <article
            v-for="(item, index) in glanceItems"
            :key="item.title"
            class="about-glance-card"
            :style="{ '--card-delay': `${160 + index * 70}ms` }"
          >
            <span class="about-glance-icon">
              <component :is="item.icon" :size="17" :stroke-width="2" />
            </span>
            <h4 class="mt-3 text-[14.5px] font-bold text-oreda">
              {{ item.title }}
            </h4>
            <p class="mt-1.5 text-[13px] leading-relaxed text-[#6b7280]">
              {{ item.text }}
            </p>
          </article>
        </div>
      </aside>
    </div>
  </section>
</template>

<style scoped>
.about-intro-base {
  position: absolute;
  inset: 0;
  background:
    linear-gradient(180deg, #f7f5fc 0%, #ffffff 42%, #f4f1fa 100%);
}

.about-intro-orb {
  position: absolute;
  top: -18%;
  right: -8%;
  width: min(48vw, 420px);
  height: min(48vw, 420px);
  border-radius: 9999px;
  background: radial-gradient(circle, rgba(56, 32, 128, 0.08), transparent 68%);
  filter: blur(10px);
}

.about-quote {
  position: relative;
  overflow: hidden;
  padding: 1.15rem 1.25rem 1.2rem 1.2rem;
  background: linear-gradient(135deg, #f3eefc 0%, #faf8ff 100%);
  border-left: 3px solid #382080;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.8);
}

.about-quote-mark {
  position: absolute;
  top: -0.15em;
  right: 0.35rem;
  font-family: var(--font-display);
  font-size: 5.5rem;
  line-height: 1;
  color: rgba(56, 32, 128, 0.08);
  pointer-events: none;
  user-select: none;
}

.about-quote-text {
  position: relative;
  margin: 0;
  max-width: 36rem;
  font-family: var(--font-display);
  font-size: clamp(1rem, 1.7vw, 1.15rem);
  font-weight: 500;
  line-height: 1.55;
  color: #2e1968;
}

.about-glance {
  position: relative;
  padding: 1.35rem 1.25rem 1.35rem;
  background: linear-gradient(165deg, #ffffff 0%, #f8f5fd 100%);
  border: 1px solid rgba(56, 32, 128, 0.1);
  box-shadow:
    0 18px 48px -28px rgba(0, 16, 56, 0.28),
    0 1px 0 rgba(255, 255, 255, 0.9) inset;
}

@media (min-width: 640px) {
  .about-glance {
    padding: 1.5rem 1.4rem 1.5rem;
  }
}

.about-glance::before {
  content: '';
  position: absolute;
  inset: 0 auto 0 0;
  width: 3px;
  background: linear-gradient(180deg, #382080, #8b6fd4);
}

.about-glance-head {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
}

.about-glance-tag {
  display: inline-flex;
  align-items: center;
  padding: 0.35rem 0.7rem;
  font-size: 10.5px;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: #fff;
  background: linear-gradient(135deg, #382080, #482888);
  box-shadow: 0 6px 16px -8px rgba(56, 32, 128, 0.55);
}

.about-glance-card {
  padding: 1rem 0.95rem 1.05rem;
  background: #fff;
  border: 1px solid rgba(56, 32, 128, 0.08);
  opacity: 0;
  transform: translateY(12px);
  transition:
    opacity 0.55s cubic-bezier(0.22, 1, 0.36, 1),
    transform 0.55s cubic-bezier(0.22, 1, 0.36, 1),
    border-color 0.25s ease,
    box-shadow 0.25s ease;
  transition-delay: var(--card-delay, 0ms);
}

.is-inview .about-glance-card {
  opacity: 1;
  transform: translateY(0);
}

.about-glance-card:hover {
  border-color: rgba(56, 32, 128, 0.2);
  box-shadow: 0 12px 28px -18px rgba(56, 32, 128, 0.35);
  transform: translateY(-2px);
}

.about-glance-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.25rem;
  height: 2.25rem;
  color: #382080;
  background: linear-gradient(145deg, rgba(56, 32, 128, 0.1), rgba(56, 32, 128, 0.04));
  border: 1px solid rgba(56, 32, 128, 0.12);
}

.about-intro-reveal {
  opacity: 0;
  transform: translateY(18px);
  transition:
    opacity 0.65s cubic-bezier(0.22, 1, 0.36, 1),
    transform 0.65s cubic-bezier(0.22, 1, 0.36, 1);
  transition-delay: var(--delay, 0ms);
}

.is-inview .about-intro-reveal {
  opacity: 1;
  transform: translateY(0);
}

@media (prefers-reduced-motion: reduce) {
  .about-intro-reveal,
  .about-glance-card {
    opacity: 1;
    transform: none;
    transition: none;
  }
}
</style>
