<script setup lang="ts">
import heroTrophy from '@/assets/images/awards/hero-trophy.png'
import { awards, type AwardKind } from '@/data/awards'
import {
  Award,
  CalendarDays,
  Medal,
  Sparkles,
  Trophy,
} from 'lucide-vue-next'
import { computed, onMounted, onUnmounted, ref } from 'vue'

type FilterId = 'All' | AwardKind

const filters: { id: FilterId; label: string; icon: typeof Trophy }[] = [
  { id: 'All', label: 'All', icon: Trophy },
  { id: 'Award', label: 'Awards', icon: Medal },
  { id: 'Recognition', label: 'Recognitions', icon: Sparkles },
  { id: 'Accolade', label: 'Accolades', icon: Award },
]

const active = ref<FilterId>('All')

const filtered = computed(() =>
  active.value === 'All'
    ? awards
    : awards.filter((item) => item.kind === active.value),
)

const featuredPrimary = computed(() => filtered.value[0] ?? null)
const featuredSide = computed(() => filtered.value.slice(1, 3))
const listRest = computed(() => filtered.value.slice(3))

const kindMeta: Record<
  AwardKind,
  { label: string; icon: typeof Trophy }
> = {
  Award: { label: 'Award', icon: Medal },
  Recognition: { label: 'Recognition', icon: Sparkles },
  Accolade: { label: 'Accolade', icon: Award },
}

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
    { threshold: 0.08 },
  )
  if (sectionRef.value) observer.observe(sectionRef.value)
})

onUnmounted(() => observer?.disconnect())
</script>

<template>
  <section
    ref="sectionRef"
    class="awards-board w-full"
    aria-label="Awards and recognitions list"
    :class="{ 'is-inview': inView }"
  >
    <div class="awards-emblem awards-reveal">
      <div class="awards-emblem-inner">
        <div class="awards-emblem-copy">
          <p class="awards-emblem-kicker">Recognition archive</p>
          <h2>Milestones acknowledged across platforms</h2>
        </div>
        <img
          :src="heroTrophy"
          alt=""
          class="awards-emblem-trophy"
          width="180"
          height="180"
        />
      </div>
    </div>

    <div class="mx-auto max-w-[1400px] px-4 pb-14 sm:px-6 lg:px-8 lg:pb-16">
      <div class="awards-filters" role="tablist" aria-label="Filter awards">
        <button
          v-for="filter in filters"
          :key="filter.id"
          type="button"
          role="tab"
          class="awards-filter"
          :class="{ 'is-active': active === filter.id }"
          :aria-selected="active === filter.id"
          @click="active = filter.id"
        >
          <component
            :is="filter.icon"
            :size="15"
            :stroke-width="2.2"
            aria-hidden="true"
          />
          <span>{{ filter.label }}</span>
        </button>
        <span class="awards-filters-rule" aria-hidden="true" />
      </div>

      <!-- Featured first 3 -->
      <div
        v-if="featuredPrimary"
        class="awards-featured awards-reveal"
        style="--delay: 40ms"
      >
        <article class="awards-feature-main">
          <img
            :src="featuredPrimary.image"
            :alt="`${featuredPrimary.title} — demo award image`"
            class="awards-feature-main-img"
          />
          <div class="awards-feature-main-veil" aria-hidden="true" />
          <div class="awards-feature-main-body">
            <p class="awards-feature-badge awards-feature-badge--light">
              <component
                :is="kindMeta[featuredPrimary.kind].icon"
                :size="12"
                :stroke-width="2.3"
                aria-hidden="true"
              />
              <span>{{ kindMeta[featuredPrimary.kind].label }}</span>
            </p>
            <h3>{{ featuredPrimary.title }}</h3>
            <p class="awards-feature-summary">{{ featuredPrimary.summary }}</p>
            <p class="awards-feature-date">
              <CalendarDays :size="14" :stroke-width="2.1" aria-hidden="true" />
              <span>{{ featuredPrimary.date }}</span>
            </p>
          </div>
        </article>

        <div class="awards-feature-side">
          <article
            v-for="item in featuredSide"
            :key="item.id"
            class="awards-feature-side-card"
          >
            <div class="awards-feature-side-media">
              <img
                :src="item.image"
                :alt="`${item.title} — demo award image`"
                loading="lazy"
              />
            </div>
            <div class="awards-feature-side-body">
              <p class="awards-feature-badge">
                <component
                  :is="kindMeta[item.kind].icon"
                  :size="12"
                  :stroke-width="2.3"
                  aria-hidden="true"
                />
                <span>{{ kindMeta[item.kind].label }}</span>
              </p>
              <h3>{{ item.title }}</h3>
              <p class="awards-feature-summary">{{ item.summary }}</p>
              <p class="awards-feature-date">
                <CalendarDays :size="14" :stroke-width="2.1" aria-hidden="true" />
                <span>{{ item.date }}</span>
              </p>
            </div>
          </article>
        </div>
      </div>

      <!-- Remaining list -->
      <div v-if="listRest.length" class="awards-list-head awards-reveal" style="--delay: 100ms">
        <p class="awards-list-kicker">Full archive</p>
        <h3>More awards &amp; recognitions</h3>
      </div>

      <div v-if="listRest.length" class="awards-grid">
        <article
          v-for="(item, index) in listRest"
          :key="item.id"
          class="awards-card awards-reveal"
          :style="{ '--delay': `${140 + index * 60}ms` }"
        >
          <div class="awards-card-media">
            <img
              :src="item.image"
              :alt="`${item.title} — demo award image`"
              loading="lazy"
            />
          </div>

          <div class="awards-card-body">
            <p class="awards-card-badge">
              <component
                :is="kindMeta[item.kind].icon"
                :size="12"
                :stroke-width="2.3"
                aria-hidden="true"
              />
              <span>{{ kindMeta[item.kind].label }}</span>
            </p>

            <h3>{{ item.title }}</h3>
            <p class="awards-card-summary">{{ item.summary }}</p>

            <p class="awards-card-date">
              <CalendarDays :size="14" :stroke-width="2.1" aria-hidden="true" />
              <span>{{ item.date }}</span>
            </p>
          </div>
        </article>
      </div>

      <p v-if="!filtered.length" class="awards-empty" role="status">
        No items in this category yet.
      </p>
    </div>
  </section>
</template>

<style scoped>
.awards-board {
  background: #f7f4fc;
}

.awards-emblem {
  position: relative;
  z-index: 2;
  width: 100%;
  margin-bottom: 1.1rem;
  overflow: hidden;
  background: #fff;
  border-top: 1px solid rgba(56, 32, 128, 0.06);
  border-bottom: 1px solid rgba(56, 32, 128, 0.06);
  box-shadow: 0 18px 40px -28px rgba(56, 32, 128, 0.35);
}

.awards-emblem-inner {
  display: grid;
  gap: 0.75rem;
  align-items: center;
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  padding: 0.55rem 1rem;
  overflow: hidden;
}

@media (min-width: 640px) {
  .awards-emblem-inner {
    padding: 0.75rem 1.5rem;
  }
}

@media (min-width: 768px) {
  .awards-emblem-inner {
    grid-template-columns: minmax(0, 1fr) auto;
    gap: 1rem;
  }
}

@media (min-width: 1024px) {
  .awards-emblem-inner {
    padding-left: 2rem;
    padding-right: 2rem;
  }
}

.awards-emblem-kicker {
  margin: 0;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: #382080;
}

.awards-emblem-copy h2 {
  margin: 0.2rem 0 0;
  font-family: var(--font-display);
  font-size: clamp(1.15rem, 2vw, 1.4rem);
  font-weight: 600;
  color: #001038;
}

.awards-emblem-trophy {
  display: block;
  width: auto;
  height: 3.35rem;
  max-width: 7.5rem;
  margin: 0 auto;
  object-fit: contain;
  object-position: center;
  background: transparent;
  filter: drop-shadow(0 8px 12px rgba(56, 32, 128, 0.14));
}

@media (min-width: 768px) {
  .awards-emblem-trophy {
    height: 3.6rem;
    max-width: 8.5rem;
    margin: 0 0 0 auto;
  }
}

.awards-filters {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.65rem;
  padding-top: 0.15rem;
}

.awards-filter {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.55rem 1rem;
  font-family: inherit;
  font-size: 13.5px;
  font-weight: 600;
  color: #382080;
  background: #fff;
  border: 1px solid rgba(56, 32, 128, 0.22);
  border-radius: 9999px;
  cursor: pointer;
  transition:
    background 0.18s ease,
    color 0.18s ease,
    border-color 0.18s ease,
    box-shadow 0.18s ease;
}

.awards-filter:hover {
  border-color: #382080;
  background: #f3effa;
}

.awards-filter.is-active {
  color: #fff;
  background: #382080;
  border-color: #382080;
  box-shadow: 0 10px 22px -14px rgba(56, 32, 128, 0.7);
}

.awards-filters-rule {
  display: none;
  flex: 1;
  height: 1px;
  min-width: 3rem;
  background: rgba(56, 32, 128, 0.18);
}

@media (min-width: 768px) {
  .awards-filters-rule {
    display: block;
  }
}

.awards-featured {
  display: grid;
  gap: 1rem;
  margin-top: 1.35rem;
}

@media (min-width: 1024px) {
  .awards-featured {
    grid-template-columns: minmax(0, 1.35fr) minmax(0, 1fr);
    gap: 1.1rem;
    align-items: stretch;
  }
}

.awards-feature-main {
  position: relative;
  min-height: 22rem;
  overflow: hidden;
  border-radius: 1.15rem;
  background: #001038;
  box-shadow: 0 18px 40px -26px rgba(56, 32, 128, 0.5);
  transition:
    transform 0.35s cubic-bezier(0.22, 1, 0.36, 1),
    box-shadow 0.35s ease;
}

.awards-feature-main:hover {
  transform: translateY(-4px);
  box-shadow: 0 26px 48px -24px rgba(56, 32, 128, 0.65);
}

@media (min-width: 1024px) {
  .awards-feature-main {
    min-height: 100%;
  }
}

.awards-feature-main-img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center right;
  transition: transform 0.55s cubic-bezier(0.22, 1, 0.36, 1);
}

.awards-feature-main:hover .awards-feature-main-img {
  transform: scale(1.05);
}

.awards-feature-main-veil {
  position: absolute;
  inset: 0;
  background:
    linear-gradient(
      90deg,
      rgba(0, 16, 56, 0.55) 0%,
      rgba(0, 16, 56, 0.18) 48%,
      rgba(0, 16, 56, 0.05) 100%
    ),
    linear-gradient(
      180deg,
      transparent 0%,
      transparent 42%,
      rgba(0, 16, 56, 0.55) 72%,
      rgba(0, 16, 56, 0.92) 100%
    );
  transition: opacity 0.35s ease;
}

.awards-feature-main:hover .awards-feature-main-veil {
  opacity: 0.92;
}

.awards-feature-main-body {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-end;
  gap: 0;
  padding: 1.35rem 1.25rem 1.4rem;
  pointer-events: none;
}

.awards-feature-main-body > * {
  pointer-events: auto;
}

@media (min-width: 640px) {
  .awards-feature-main-body {
    padding: 1.5rem 1.45rem 1.55rem;
  }
}

.awards-feature-main-body h3 {
  margin: 0.65rem 0 0;
  max-width: 28rem;
  font-family: var(--font-display);
  font-size: clamp(1.35rem, 2.4vw, 1.85rem);
  font-weight: 600;
  line-height: 1.2;
  color: #fff;
}

.awards-feature-main-body .awards-feature-summary {
  margin-top: 0.45rem;
  max-width: 30rem;
  color: rgba(255, 255, 255, 0.78);
  -webkit-line-clamp: 3;
}

.awards-feature-main-body .awards-feature-date {
  margin-top: 0.85rem;
  color: rgba(255, 255, 255, 0.72);
}

.awards-feature-side {
  display: grid;
  gap: 1rem;
}

.awards-feature-side-card {
  display: grid;
  grid-template-columns: 8.5rem minmax(0, 1fr);
  gap: 0;
  min-height: 10.5rem;
  overflow: hidden;
  background: #fff;
  border-radius: 1.15rem;
  border: 1px solid rgba(56, 32, 128, 0.06);
  box-shadow: 0 16px 36px -24px rgba(56, 32, 128, 0.45);
  transition:
    transform 0.35s cubic-bezier(0.22, 1, 0.36, 1),
    box-shadow 0.35s ease,
    border-color 0.3s ease;
}

.awards-feature-side-card:hover {
  transform: translateY(-4px);
  border-color: rgba(56, 32, 128, 0.18);
  box-shadow: 0 24px 42px -22px rgba(56, 32, 128, 0.55);
}

@media (min-width: 640px) {
  .awards-feature-side-card {
    grid-template-columns: 10rem minmax(0, 1fr);
  }
}

.awards-feature-side-media {
  overflow: hidden;
  background: #ece6f6;
}

.awards-feature-side-media img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  transition: transform 0.5s cubic-bezier(0.22, 1, 0.36, 1);
}

.awards-feature-side-card:hover .awards-feature-side-media img {
  transform: scale(1.06);
}

.awards-feature-side-card:hover .awards-feature-side-body h3 {
  color: #382080;
}

.awards-feature-side-body {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  min-width: 0;
  height: 100%;
  padding: 0.95rem 1rem 1rem;
}

.awards-feature-side-body h3 {
  margin: 0.5rem 0 0;
  font-size: 15px;
  font-weight: 700;
  line-height: 1.3;
  color: #1a1440;
  transition: color 0.25s ease;
}

.awards-feature-side-body .awards-feature-date {
  margin-top: auto;
  padding-top: 0.75rem;
}

.awards-feature-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  width: fit-content;
  margin: 0;
  padding: 0.28rem 0.55rem;
  font-size: 11px;
  font-weight: 700;
  color: #382080;
  background: #efeaf8;
  border-radius: 9999px;
}

.awards-feature-badge--light {
  color: #fff;
  background: rgba(255, 255, 255, 0.16);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.awards-feature-summary {
  margin: 0.4rem 0 0;
  flex: 1;
  font-size: 13px;
  line-height: 1.5;
  color: #6b6578;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.awards-feature-date {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  margin: 0.7rem 0 0;
  font-size: 12.5px;
  font-weight: 600;
  color: #5c5278;
}

.awards-list-head {
  margin-top: 2rem;
}

.awards-list-kicker {
  margin: 0;
  font-size: 10.5px;
  font-weight: 700;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: #382080;
}

.awards-list-head h3 {
  margin: 0.3rem 0 0;
  font-family: var(--font-display);
  font-size: 1.25rem;
  font-weight: 600;
  color: #001038;
}

.awards-grid {
  display: grid;
  gap: 1.15rem;
  margin-top: 1rem;
}

@media (min-width: 768px) {
  .awards-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (min-width: 1100px) {
  .awards-grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

.awards-card {
  display: grid;
  grid-template-columns: 7.25rem minmax(0, 1fr);
  gap: 0;
  min-height: 11.5rem;
  padding: 0;
  overflow: hidden;
  background: #fff;
  border-radius: 1.15rem;
  box-shadow: 0 16px 36px -24px rgba(56, 32, 128, 0.45);
  border: 1px solid rgba(56, 32, 128, 0.06);
  transition:
    transform 0.35s cubic-bezier(0.22, 1, 0.36, 1),
    box-shadow 0.35s ease,
    border-color 0.3s ease;
}

.awards-card:hover {
  transform: translateY(-4px);
  border-color: rgba(56, 32, 128, 0.18);
  box-shadow: 0 24px 42px -22px rgba(56, 32, 128, 0.55);
}

@media (min-width: 640px) {
  .awards-card {
    grid-template-columns: 8.25rem minmax(0, 1fr);
  }
}

.awards-card-media {
  overflow: hidden;
  background: #ece6f6;
}

.awards-card-media img {
  display: block;
  width: 100%;
  height: 100%;
  min-height: 11.5rem;
  object-fit: cover;
  object-position: center;
  transition: transform 0.5s cubic-bezier(0.22, 1, 0.36, 1);
}

.awards-card:hover .awards-card-media img {
  transform: scale(1.06);
}

.awards-card:hover .awards-card-body h3 {
  color: #382080;
}

.awards-card-body {
  display: flex;
  flex-direction: column;
  min-width: 0;
  height: 100%;
  padding: 0.95rem 1rem 1rem;
}

.awards-card-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  width: fit-content;
  margin: 0;
  padding: 0.28rem 0.55rem;
  font-size: 11px;
  font-weight: 700;
  color: #382080;
  background: #efeaf8;
  border-radius: 9999px;
}

.awards-card-body h3 {
  margin: 0.5rem 0 0;
  font-size: 15px;
  font-weight: 700;
  line-height: 1.3;
  color: #1a1440;
  transition: color 0.25s ease;
}

.awards-card-summary {
  margin: 0.4rem 0 0;
  flex: 1;
  font-size: 13px;
  line-height: 1.5;
  color: #6b6578;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.awards-card-date {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  margin-top: auto;
  padding-top: 0.75rem;
  font-size: 12.5px;
  font-weight: 600;
  color: #5c5278;
}

.awards-empty {
  margin: 2rem 0 0;
  text-align: center;
  font-size: 14px;
  color: #6b5b9a;
}

.awards-reveal {
  opacity: 0;
  transform: translateY(14px);
  transition:
    opacity 0.55s cubic-bezier(0.22, 1, 0.36, 1) var(--delay, 0ms),
    transform 0.55s cubic-bezier(0.22, 1, 0.36, 1) var(--delay, 0ms);
}

.is-inview .awards-reveal {
  opacity: 1;
  transform: translateY(0);
}

@media (prefers-reduced-motion: reduce) {
  .awards-reveal {
    opacity: 1;
    transform: none;
    transition: none;
  }

  .awards-feature-main,
  .awards-feature-side-card,
  .awards-card,
  .awards-feature-main-img,
  .awards-feature-side-media img,
  .awards-card-media img {
    transition: none;
  }

  .awards-feature-main:hover,
  .awards-feature-side-card:hover,
  .awards-card:hover {
    transform: none;
  }

  .awards-feature-main:hover .awards-feature-main-img,
  .awards-feature-side-card:hover .awards-feature-side-media img,
  .awards-card:hover .awards-card-media img {
    transform: none;
  }
}
</style>
