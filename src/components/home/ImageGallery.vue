<script setup lang="ts">
import aboutPanelImg from '@/assets/images/about/about-panel.jpg'
import hybridImg from '@/assets/images/hero/hybrid.jpg'
import ruralImg from '@/assets/images/hero/rural.jpg'
import solarImg from '@/assets/images/hero/solar.jpg'
import { ArrowRight, X } from 'lucide-vue-next'
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { RouterLink } from 'vue-router'

const items = [
  {
    id: 1,
    src: aboutPanelImg,
    category: 'Leadership',
    title: 'Institutional engagement',
    span: 'hero',
  },
  {
    id: 2,
    src: solarImg,
    category: 'Programme',
    title: 'Solar mission outreach',
    span: 'top-a',
  },
  {
    id: 3,
    src: ruralImg,
    category: 'Community',
    title: 'Rural energy access',
    span: 'top-b',
  },
  {
    id: 4,
    src: hybridImg,
    category: 'Projects',
    title: 'Hybrid renewable sites',
    span: 'wide',
  },
]

const sectionRef = ref<HTMLElement | null>(null)
const inView = ref(false)
const activeId = ref<number | null>(null)
let observer: IntersectionObserver | null = null

const activeItem = computed(
  () => items.find((item) => item.id === activeId.value) ?? null,
)

function openLightbox(id: number) {
  activeId.value = id
  document.body.style.overflow = 'hidden'
}

function closeLightbox() {
  activeId.value = null
  document.body.style.overflow = ''
}

function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape' && activeId.value != null) closeLightbox()
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
    { threshold: 0.18 },
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
    class="gallery relative w-full overflow-hidden bg-[#f7f5f2]"
    aria-labelledby="gallery-heading"
    :class="{ 'is-inview': inView }"
  >
    <div
      class="relative mx-auto max-w-[1400px] px-4 py-10 sm:px-6 sm:py-12 lg:px-8 lg:py-14"
    >
      <!-- Header: left title / right copy + link -->
      <div
        class="gallery-reveal grid gap-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:items-end lg:gap-12"
        style="--delay: 0ms"
      >
        <div>
          <div class="flex items-center gap-3">
            <span class="h-[2px] w-7 bg-oreda" aria-hidden="true" />
            <p
              class="text-[11px] font-bold tracking-[0.2em] text-oreda uppercase sm:text-xs"
            >
              Image Gallery
            </p>
          </div>

          <h2
            id="gallery-heading"
            class="mt-4 font-display text-[clamp(1.85rem,3.8vw,3rem)] leading-[1.15] font-semibold tracking-[-0.015em] text-oreda-dark"
          >
            A visual journey through
            <em class="font-display text-oreda italic">
              governance excellence.
            </em>
          </h2>
        </div>

        <div class="lg:pb-1 lg:text-right">
          <p class="text-[14px] leading-relaxed text-[#6b7280] sm:text-[15px] lg:ml-auto lg:max-w-sm">
            Activities, achievements and contributions featured across OREDA’s
            renewable energy programmes statewide.
          </p>
          <RouterLink
            to="/gallery"
            class="group mt-3 inline-flex items-center gap-1.5 text-[14px] font-bold text-oreda transition hover:text-oreda-dark"
          >
            View full gallery
            <ArrowRight
              :size="15"
              :stroke-width="2.4"
              class="transition group-hover:translate-x-0.5"
            />
          </RouterLink>
        </div>
      </div>

      <!-- Reference grid: tall left + 2 top + 1 wide bottom -->
      <div
        class="gallery-reveal gallery-grid mt-8 sm:mt-9 lg:mt-10"
        style="--delay: 120ms"
      >
        <button
          v-for="(item, index) in items"
          :key="item.id"
          type="button"
          class="gallery-card group"
          :class="`gallery-card--${item.span}`"
          :style="{ '--card-delay': `${160 + index * 80}ms` }"
          :aria-label="`Open ${item.title}`"
          @click="openLightbox(item.id)"
        >
          <img
            :src="item.src"
            :alt="item.title"
            class="gallery-card-img"
            loading="lazy"
          />
          <div class="gallery-card-veil" aria-hidden="true" />
          <div class="gallery-card-meta">
            <p
              class="text-[10px] font-bold tracking-[0.16em] text-[#c4b5f0] uppercase sm:text-[11px]"
            >
              {{ item.category }}
            </p>
            <p
              class="mt-1 font-display text-[1.05rem] leading-snug text-white sm:text-[1.2rem]"
            >
              {{ item.title }}
            </p>
          </div>
        </button>
      </div>
    </div>

    <Teleport to="body">
      <div
        v-if="activeItem"
        class="gallery-lightbox fixed inset-0 z-[80] flex items-center justify-center p-4 sm:p-8"
        role="dialog"
        aria-modal="true"
        :aria-label="activeItem.title"
      >
        <button
          type="button"
          class="absolute inset-0 bg-oreda-dark/75 backdrop-blur-sm"
          aria-label="Close gallery preview"
          @click="closeLightbox"
        />
        <div
          class="relative z-10 w-full max-w-4xl overflow-hidden rounded-2xl border border-white/10 bg-oreda-dark shadow-[0_30px_80px_-20px_rgba(0,0,0,0.65)]"
        >
          <img
            :src="activeItem.src"
            :alt="activeItem.title"
            class="max-h-[min(72vh,720px)] w-full object-cover"
          />
          <div
            class="flex items-center justify-between gap-4 border-t border-white/10 px-4 py-3 sm:px-5"
          >
            <div>
              <p
                class="text-[10px] font-bold tracking-[0.16em] text-[#c4b5f0] uppercase"
              >
                {{ activeItem.category }}
              </p>
              <p class="mt-1 font-display text-[1.1rem] text-white">
                {{ activeItem.title }}
              </p>
            </div>
            <button
              type="button"
              class="flex h-9 w-9 items-center justify-center rounded-full text-white/70 transition hover:bg-white/10 hover:text-white"
              aria-label="Close"
              @click="closeLightbox"
            >
              <X :size="18" :stroke-width="2" />
            </button>
          </div>
        </div>
      </div>
    </Teleport>
  </section>
</template>

<style scoped>
.gallery-grid {
  display: grid;
  gap: 0.85rem;
  grid-template-columns: 1fr;
}

@media (min-width: 768px) {
  .gallery-grid {
    grid-template-columns: repeat(12, 1fr);
    grid-template-rows: 11.5rem 11.5rem;
    gap: 1rem;
  }

  .gallery-card--hero {
    grid-column: 1 / 6;
    grid-row: 1 / 3;
  }

  .gallery-card--top-a {
    grid-column: 6 / 9;
    grid-row: 1 / 2;
  }

  .gallery-card--top-b {
    grid-column: 9 / 13;
    grid-row: 1 / 2;
  }

  .gallery-card--wide {
    grid-column: 6 / 13;
    grid-row: 2 / 3;
  }
}

@media (min-width: 1024px) {
  .gallery-grid {
    grid-template-rows: 13.5rem 13.5rem;
    gap: 1.15rem;
  }
}

.gallery-card {
  position: relative;
  display: block;
  width: 100%;
  min-height: 14rem;
  overflow: hidden;
  border: 0;
  border-radius: 1.15rem;
  padding: 0;
  cursor: pointer;
  text-align: left;
  background: #1a1440;
  opacity: 0;
  transform: translateY(22px);
  transition:
    opacity 0.75s cubic-bezier(0.22, 1, 0.36, 1),
    transform 0.75s cubic-bezier(0.22, 1, 0.36, 1);
  transition-delay: var(--card-delay, 0ms);
}

@media (min-width: 768px) {
  .gallery-card {
    min-height: 0;
    height: 100%;
  }
}

.is-inview .gallery-card {
  opacity: 1;
  transform: translateY(0);
}

.gallery-card-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transform: scale(1.03);
  transition: transform 1.15s cubic-bezier(0.22, 1, 0.36, 1);
}

.gallery-card:hover .gallery-card-img,
.gallery-card:focus-visible .gallery-card-img {
  transform: scale(1.09);
}

.gallery-card-veil {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    180deg,
    transparent 40%,
    rgba(0, 16, 56, 0.35) 68%,
    rgba(0, 16, 56, 0.78) 100%
  );
  transition: opacity 0.4s ease;
}

.gallery-card-meta {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 1.1rem 1.15rem 1.2rem;
  transform: translateY(4px);
  transition: transform 0.45s cubic-bezier(0.22, 1, 0.36, 1);
}

.gallery-card:hover .gallery-card-meta,
.gallery-card:focus-visible .gallery-card-meta {
  transform: translateY(0);
}

.gallery-reveal {
  opacity: 0;
  transform: translateY(18px);
  transition:
    opacity 0.7s cubic-bezier(0.22, 1, 0.36, 1),
    transform 0.7s cubic-bezier(0.22, 1, 0.36, 1);
  transition-delay: var(--delay, 0ms);
}

.is-inview .gallery-reveal {
  opacity: 1;
  transform: translateY(0);
}

.gallery-lightbox {
  animation: gallery-fade 0.28s ease;
}

@keyframes gallery-fade {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@media (prefers-reduced-motion: reduce) {
  .gallery-reveal,
  .gallery-card,
  .gallery-card-img,
  .gallery-card-meta {
    transition: none !important;
  }

  .gallery-reveal,
  .gallery-card {
    opacity: 1;
    transform: none;
  }

  .gallery-card-img {
    transform: none;
  }

  .gallery-lightbox {
    animation: none;
  }
}
</style>
