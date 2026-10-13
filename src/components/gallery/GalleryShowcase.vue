<script setup lang="ts">
import aboutOredaImg from '@/assets/images/about/about-oreda.jpg'
import aboutPanelImg from '@/assets/images/about/about-panel.jpg'
import hybridImg from '@/assets/images/hero/hybrid.jpg'
import ruralImg from '@/assets/images/hero/rural.jpg'
import solarImg from '@/assets/images/hero/solar.jpg'
import windImg from '@/assets/images/hero/wind.jpg'
import {
  ChevronLeft,
  ChevronRight,
  Expand,
  X,
} from 'lucide-vue-next'
import { computed, onMounted, onUnmounted, ref } from 'vue'

type Category =
  | 'All'
  | 'Programmes'
  | 'Projects'
  | 'Community'
  | 'Leadership'
  | 'Events'

interface GalleryItem {
  id: number
  src: string
  category: Exclude<Category, 'All'>
  title: string
  caption: string
}

const categories: Category[] = [
  'All',
  'Programmes',
  'Projects',
  'Community',
  'Leadership',
  'Events',
]

const photos = {
  panel: aboutPanelImg,
  oreda: aboutOredaImg,
  solar: solarImg,
  rural: ruralImg,
  hybrid: hybridImg,
  wind: windImg,
}

const items: GalleryItem[] = [
  {
    id: 1,
    src: photos.panel,
    category: 'Leadership',
    title: 'Institutional engagement',
    caption: 'OREDA leadership in dialogue on renewable energy delivery.',
  },
  {
    id: 2,
    src: photos.solar,
    category: 'Programmes',
    title: 'Solar mission outreach',
    caption: 'Citizen-facing solar scheme awareness across Odisha.',
  },
  {
    id: 3,
    src: photos.rural,
    category: 'Community',
    title: 'Rural energy access',
    caption: 'Clean power reaching households and community spaces.',
  },
  {
    id: 4,
    src: photos.hybrid,
    category: 'Projects',
    title: 'Hybrid renewable sites',
    caption: 'Integrated solar and supporting infrastructure in the field.',
  },
  {
    id: 5,
    src: photos.wind,
    category: 'Projects',
    title: 'Wind corridor progress',
    caption: 'Renewable generation capacity expanding across the state.',
  },
  {
    id: 6,
    src: photos.oreda,
    category: 'Events',
    title: 'Agency milestones',
    caption: 'Moments from OREDA’s programmes and public engagements.',
  },
  {
    id: 7,
    src: photos.solar,
    category: 'Programmes',
    title: 'Rooftop solar drive',
    caption: 'Household and institutional rooftop installations underway.',
  },
  {
    id: 8,
    src: photos.rural,
    category: 'Community',
    title: 'Village electrification',
    caption: 'Last-mile renewable solutions for rural Odisha.',
  },
  {
    id: 9,
    src: photos.panel,
    category: 'Leadership',
    title: 'Policy & partnership',
    caption: 'Collaboration for a sustainable energy future.',
  },
  {
    id: 10,
    src: photos.hybrid,
    category: 'Events',
    title: 'Field review visits',
    caption: 'On-ground review of scheme delivery and project sites.',
  },
  {
    id: 11,
    src: photos.wind,
    category: 'Projects',
    title: 'Clean power landscape',
    caption: 'Landscapes shaped by Odisha’s renewable transition.',
  },
  {
    id: 12,
    src: photos.oreda,
    category: 'Programmes',
    title: 'Scheme facilitation',
    caption: 'Supporting citizens through OREDA’s renewable schemes.',
  },
  {
    id: 13,
    src: photos.solar,
    category: 'Programmes',
    title: 'Solar park overview',
    caption: 'Large-scale solar assets supporting Odisha’s clean energy goals.',
  },
  {
    id: 14,
    src: photos.rural,
    category: 'Community',
    title: 'Community solar hubs',
    caption: 'Shared renewable infrastructure strengthening local access.',
  },
  {
    id: 15,
    src: photos.hybrid,
    category: 'Projects',
    title: 'Project commissioning',
    caption: 'Renewable installations moving from build to operation.',
  },
  {
    id: 16,
    src: photos.wind,
    category: 'Programmes',
    title: 'Clean energy awareness',
    caption: 'Outreach programmes highlighting renewable options for citizens.',
  },
  {
    id: 17,
    src: photos.panel,
    category: 'Leadership',
    title: 'Stakeholder consultation',
    caption: 'Engagements guiding Odisha’s renewable energy roadmap.',
  },
  {
    id: 18,
    src: photos.solar,
    category: 'Projects',
    title: 'Utility-scale solar',
    caption: 'Grid-connected solar capacity across project locations.',
  },
  {
    id: 19,
    src: photos.rural,
    category: 'Community',
    title: 'Household solar support',
    caption: 'Helping families adopt rooftop and off-grid solar solutions.',
  },
  {
    id: 20,
    src: photos.oreda,
    category: 'Events',
    title: 'Public programme day',
    caption: 'Community gatherings around OREDA scheme launches.',
  },
  {
    id: 21,
    src: photos.hybrid,
    category: 'Programmes',
    title: 'PM Surya Ghar support',
    caption: 'Guiding applicants through rooftop solar scheme benefits.',
  },
  {
    id: 22,
    src: photos.wind,
    category: 'Projects',
    title: 'Generation assets review',
    caption: 'Monitoring renewable assets for reliable clean power.',
  },
  {
    id: 23,
    src: photos.panel,
    category: 'Events',
    title: 'Knowledge exchange',
    caption: 'Workshops and briefings on renewable programme delivery.',
  },
  {
    id: 24,
    src: photos.solar,
    category: 'Community',
    title: 'Local energy champions',
    caption: 'Community partners enabling wider scheme participation.',
  },
]

const activeCategory = ref<Category>('All')
const activeId = ref<number | null>(null)
const sectionRef = ref<HTMLElement | null>(null)
const inView = ref(false)
let observer: IntersectionObserver | null = null

const filtered = computed(() =>
  activeCategory.value === 'All'
    ? items
    : items.filter((item) => item.category === activeCategory.value),
)

const activeIndex = computed(() =>
  filtered.value.findIndex((item) => item.id === activeId.value),
)

const activeItem = computed(() =>
  activeIndex.value >= 0 ? filtered.value[activeIndex.value] : null,
)

function setCategory(category: Category) {
  activeCategory.value = category
  closeLightbox()
}

function openLightbox(id: number) {
  activeId.value = id
  document.body.style.overflow = 'hidden'
}

function closeLightbox() {
  activeId.value = null
  document.body.style.overflow = ''
}

function showPrev() {
  if (!filtered.value.length || activeIndex.value < 0) return
  const next =
    (activeIndex.value - 1 + filtered.value.length) % filtered.value.length
  activeId.value = filtered.value[next].id
}

function showNext() {
  if (!filtered.value.length || activeIndex.value < 0) return
  const next = (activeIndex.value + 1) % filtered.value.length
  activeId.value = filtered.value[next].id
}

function onKeydown(e: KeyboardEvent) {
  if (activeId.value == null) return
  if (e.key === 'Escape') closeLightbox()
  if (e.key === 'ArrowLeft') showPrev()
  if (e.key === 'ArrowRight') showNext()
}

onMounted(() => {
  window.addEventListener('keydown', onKeydown)
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

onUnmounted(() => {
  window.removeEventListener('keydown', onKeydown)
  observer?.disconnect()
  document.body.style.overflow = ''
})
</script>

<template>
  <section
    ref="sectionRef"
    class="gallery-show relative w-full overflow-hidden"
    aria-labelledby="gallery-show-heading"
    :class="{ 'is-inview': inView }"
  >
    <div class="pointer-events-none absolute inset-0" aria-hidden="true">
      <div class="gallery-show-base" />
      <div class="gallery-show-mesh" />
    </div>

    <div class="relative mx-auto max-w-[1400px] px-4 py-12 sm:px-6 sm:py-14 lg:px-8 lg:py-16">
      <div
        class="gallery-reveal flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between"
        style="--delay: 0ms"
      >
        <div class="max-w-xl">
          <div class="flex items-center gap-3">
            <span class="h-[2px] w-7 bg-oreda" aria-hidden="true" />
            <p class="text-[11px] font-bold tracking-[0.2em] text-oreda uppercase">
              Browse collection
            </p>
          </div>
          <h2
            id="gallery-show-heading"
            class="mt-3 font-display text-[clamp(1.55rem,2.8vw,2.2rem)] leading-[1.15] font-semibold tracking-[-0.015em] text-oreda-dark"
          >
            Explore OREDA’s
            <em class="font-display not-italic text-oreda">visual record</em>
            of clean energy work.
          </h2>
        </div>

        <p class="text-[13px] font-semibold tracking-wide text-[#6b7c94] lg:pb-1">
          {{ filtered.length }}
          {{ filtered.length === 1 ? 'photograph' : 'photographs' }}
        </p>
      </div>

      <!-- Category filters -->
      <div
        class="gallery-reveal mt-8 border-b border-oreda/10"
        style="--delay: 60ms"
        role="tablist"
        aria-label="Gallery categories"
      >
        <div class="flex gap-1 overflow-x-auto pb-px [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <button
            v-for="category in categories"
            :key="category"
            type="button"
            role="tab"
            class="gallery-filter"
            :class="{ 'is-active': activeCategory === category }"
            :aria-selected="activeCategory === category"
            @click="setCategory(category)"
          >
            {{ category }}
          </button>
        </div>
      </div>

      <!-- Fixed landscape gallery grid -->
      <div
        :key="activeCategory"
        class="gallery-grid mt-8 sm:mt-9"
        role="list"
      >
        <button
          v-for="(item, index) in filtered"
          :key="item.id"
          type="button"
          class="gallery-tile group"
          role="listitem"
          :style="{ '--tile-delay': `${60 + (index % 9) * 40}ms` }"
          :aria-label="`View ${item.title}`"
          @click="openLightbox(item.id)"
        >
          <img
            :src="item.src"
            :alt="item.title"
            class="gallery-tile-img"
            loading="lazy"
          />
          <div class="gallery-tile-veil" aria-hidden="true" />
          <div class="gallery-tile-shine" aria-hidden="true" />

          <div class="gallery-tile-top">
            <span class="gallery-tile-cat">{{ item.category }}</span>
            <span class="gallery-tile-expand" aria-hidden="true">
              <Expand :size="14" :stroke-width="2.2" />
            </span>
          </div>

          <div class="gallery-tile-meta">
            <p class="gallery-tile-title">{{ item.title }}</p>
            <p class="gallery-tile-caption">{{ item.caption }}</p>
          </div>
        </button>
      </div>

      <p
        v-if="!filtered.length"
        class="mt-12 text-center text-[14px] text-[#6b7c94]"
      >
        No photographs in this category yet.
      </p>
    </div>

    <!-- Lightbox -->
    <Teleport to="body">
      <div
        v-if="activeItem"
        class="gallery-lightbox fixed inset-0 z-[90] flex items-center justify-center p-3 sm:p-6 lg:p-10"
        role="dialog"
        aria-modal="true"
        :aria-label="activeItem.title"
      >
        <button
          type="button"
          class="absolute inset-0 bg-[#00081f]/88 backdrop-blur-[6px]"
          aria-label="Close gallery preview"
          @click="closeLightbox"
        />

        <div class="gallery-lightbox-stage relative z-10 flex w-full max-w-5xl flex-col">
          <div class="gallery-lightbox-toolbar">
            <div class="min-w-0">
              <p class="text-[10px] font-bold tracking-[0.18em] text-[#c4b5f0] uppercase">
                {{ activeItem.category }}
                <span class="mx-2 text-white/25">·</span>
                <span class="text-white/55">
                  {{ activeIndex + 1 }} / {{ filtered.length }}
                </span>
              </p>
              <p class="mt-1 truncate font-display text-[1.15rem] text-white sm:text-[1.3rem]">
                {{ activeItem.title }}
              </p>
            </div>
            <button
              type="button"
              class="gallery-lightbox-iconbtn"
              aria-label="Close"
              @click="closeLightbox"
            >
              <X :size="18" :stroke-width="2" />
            </button>
          </div>

          <div class="gallery-lightbox-frame">
            <button
              type="button"
              class="gallery-lightbox-nav gallery-lightbox-nav--prev"
              aria-label="Previous photograph"
              @click.stop="showPrev"
            >
              <ChevronLeft :size="22" :stroke-width="2" />
            </button>

            <img
              :src="activeItem.src"
              :alt="activeItem.title"
              class="gallery-lightbox-img"
            />

            <button
              type="button"
              class="gallery-lightbox-nav gallery-lightbox-nav--next"
              aria-label="Next photograph"
              @click.stop="showNext"
            >
              <ChevronRight :size="22" :stroke-width="2" />
            </button>
          </div>

          <p class="mt-3 max-w-3xl text-[13.5px] leading-relaxed text-white/65">
            {{ activeItem.caption }}
          </p>
        </div>
      </div>
    </Teleport>
  </section>
</template>

<style scoped>
.gallery-show-base {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    160deg,
    #f5f4f8 0%,
    #eef1f7 45%,
    #f3f0f9 78%,
    #ebe8f4 100%
  );
}

.gallery-show-mesh {
  position: absolute;
  inset: 0;
  opacity: 0.35;
  background-image:
    linear-gradient(rgba(0, 16, 56, 0.04) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0, 16, 56, 0.04) 1px, transparent 1px);
  background-size: 52px 52px;
  mask-image: radial-gradient(ellipse 80% 70% at 50% 0%, black 20%, transparent 78%);
}

.gallery-reveal {
  opacity: 0;
  transform: translateY(16px);
  transition:
    opacity 0.65s cubic-bezier(0.22, 1, 0.36, 1),
    transform 0.65s cubic-bezier(0.22, 1, 0.36, 1);
  transition-delay: var(--delay, 0ms);
}

.is-inview .gallery-reveal {
  opacity: 1;
  transform: translateY(0);
}

.gallery-filter {
  position: relative;
  flex-shrink: 0;
  padding: 0.85rem 1rem;
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.04em;
  color: #6b7c94;
  background: transparent;
  border: 0;
  cursor: pointer;
  transition: color 0.2s ease;
}

.gallery-filter::after {
  content: '';
  position: absolute;
  right: 1rem;
  bottom: -1px;
  left: 1rem;
  height: 2px;
  background: #382080;
  transform: scaleX(0);
  transform-origin: center;
  transition: transform 0.25s cubic-bezier(0.22, 1, 0.36, 1);
}

.gallery-filter:hover {
  color: #001038;
}

.gallery-filter.is-active {
  color: #382080;
}

.gallery-filter.is-active::after {
  transform: scaleX(1);
}

.gallery-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 0.85rem;
}

@media (min-width: 640px) {
  .gallery-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 1rem;
  }
}

@media (min-width: 1024px) {
  .gallery-grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 1.15rem;
  }
}

.gallery-tile {
  position: relative;
  display: block;
  width: 100%;
  aspect-ratio: 3 / 2;
  overflow: hidden;
  padding: 0;
  border: 0;
  cursor: pointer;
  text-align: left;
  background: #001038;
  box-shadow: 0 18px 36px -28px rgba(0, 16, 56, 0.55);
  opacity: 0;
  transform: translateY(14px);
  transition:
    opacity 0.55s cubic-bezier(0.22, 1, 0.36, 1),
    transform 0.55s cubic-bezier(0.22, 1, 0.36, 1);
  transition-delay: var(--tile-delay, 0ms);
}

.is-inview .gallery-tile {
  opacity: 1;
  transform: translateY(0);
}

.gallery-tile-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  transform: scale(1.02);
  transition: transform 1.1s cubic-bezier(0.22, 1, 0.36, 1);
}

.gallery-tile:hover .gallery-tile-img,
.gallery-tile:focus-visible .gallery-tile-img {
  transform: scale(1.1);
}

.gallery-tile-veil {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    180deg,
    rgba(0, 8, 31, 0.15) 0%,
    transparent 38%,
    rgba(0, 16, 56, 0.35) 68%,
    rgba(0, 8, 31, 0.88) 100%
  );
  transition: opacity 0.35s ease;
}

.gallery-tile-shine {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    120deg,
    transparent 30%,
    rgba(255, 255, 255, 0.12) 48%,
    transparent 62%
  );
  opacity: 0;
  transform: translateX(-30%);
  transition:
    opacity 0.45s ease,
    transform 0.7s cubic-bezier(0.22, 1, 0.36, 1);
}

.gallery-tile:hover .gallery-tile-shine {
  opacity: 1;
  transform: translateX(20%);
}

.gallery-tile-top {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  z-index: 2;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 0.75rem;
  padding: 0.95rem 1rem;
}

.gallery-tile-cat {
  display: inline-flex;
  align-items: center;
  padding: 0.38rem 0.65rem;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: #fff;
  background: linear-gradient(135deg, #382080 0%, #2e1968 100%);
  border: 1px solid rgba(255, 255, 255, 0.18);
  box-shadow:
    0 8px 18px -10px rgba(0, 8, 31, 0.65),
    inset 0 1px 0 rgba(255, 255, 255, 0.12);
}

.gallery-tile-expand {
  display: grid;
  place-items: center;
  width: 2rem;
  height: 2rem;
  color: #fff;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.22);
  opacity: 0;
  transform: translateY(-6px);
  transition:
    opacity 0.3s ease,
    transform 0.3s ease,
    background 0.25s ease;
}

.gallery-tile:hover .gallery-tile-expand,
.gallery-tile:focus-visible .gallery-tile-expand {
  opacity: 1;
  transform: translateY(0);
  background: rgba(255, 255, 255, 0.16);
}

.gallery-tile-meta {
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 2;
  padding: 1.15rem 1.05rem 1.2rem;
  transform: translateY(8px);
  transition: transform 0.4s cubic-bezier(0.22, 1, 0.36, 1);
}

.gallery-tile:hover .gallery-tile-meta,
.gallery-tile:focus-visible .gallery-tile-meta {
  transform: translateY(0);
}

.gallery-tile-title {
  margin: 0;
  font-family: var(--font-display);
  font-size: clamp(1.05rem, 1.6vw, 1.25rem);
  font-weight: 600;
  line-height: 1.2;
  color: #fff;
}

.gallery-tile-caption {
  display: -webkit-box;
  margin: 0.4rem 0 0;
  overflow: hidden;
  font-size: 12.5px;
  line-height: 1.45;
  color: rgba(255, 255, 255, 0.68);
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  opacity: 0;
  transform: translateY(6px);
  transition:
    opacity 0.35s ease,
    transform 0.35s ease;
}

.gallery-tile:hover .gallery-tile-caption,
.gallery-tile:focus-visible .gallery-tile-caption {
  opacity: 1;
  transform: translateY(0);
}

.gallery-lightbox {
  animation: lightbox-in 0.32s cubic-bezier(0.22, 1, 0.36, 1);
}

.gallery-lightbox-toolbar {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 0.85rem;
}

.gallery-lightbox-iconbtn {
  display: grid;
  place-items: center;
  width: 2.4rem;
  height: 2.4rem;
  flex-shrink: 0;
  color: #fff;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.16);
  cursor: pointer;
  transition: background 0.2s ease;
}

.gallery-lightbox-iconbtn:hover {
  background: rgba(255, 255, 255, 0.14);
}

.gallery-lightbox-frame {
  position: relative;
  overflow: hidden;
  background: #00081f;
  border: 1px solid rgba(255, 255, 255, 0.12);
  box-shadow: 0 30px 70px -28px rgba(0, 0, 0, 0.75);
}

.gallery-lightbox-img {
  display: block;
  width: 100%;
  max-height: min(72vh, 740px);
  aspect-ratio: 3 / 2;
  object-fit: contain;
  object-position: center;
  background: #00081f;
  animation: image-in 0.35s cubic-bezier(0.22, 1, 0.36, 1);
}

.gallery-lightbox-nav {
  position: absolute;
  top: 50%;
  z-index: 2;
  display: grid;
  place-items: center;
  width: 2.6rem;
  height: 2.6rem;
  color: #fff;
  background: rgba(0, 16, 56, 0.55);
  border: 1px solid rgba(255, 255, 255, 0.2);
  cursor: pointer;
  transform: translateY(-50%);
  backdrop-filter: blur(8px);
  transition:
    background 0.2s ease,
    border-color 0.2s ease;
}

.gallery-lightbox-nav:hover {
  background: rgba(56, 32, 128, 0.75);
  border-color: rgba(196, 181, 240, 0.45);
}

.gallery-lightbox-nav--prev {
  left: 0.75rem;
}

.gallery-lightbox-nav--next {
  right: 0.75rem;
}

@keyframes lightbox-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes image-in {
  from {
    opacity: 0;
    transform: scale(0.985);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

@media (prefers-reduced-motion: reduce) {
  .gallery-reveal,
  .gallery-tile,
  .gallery-tile-img,
  .gallery-tile-meta,
  .gallery-tile-caption,
  .gallery-tile-shine,
  .gallery-lightbox,
  .gallery-lightbox-img {
    transition: none !important;
    animation: none !important;
  }

  .gallery-reveal,
  .gallery-tile {
    opacity: 1;
    transform: none;
  }

  .gallery-tile-img {
    transform: none;
  }
}
</style>
