<script setup lang="ts">
import type { NewsItem } from '@/types'
import { ArrowRight, Megaphone, X } from 'lucide-vue-next'
import { computed, onMounted, onUnmounted, ref } from 'vue'

const newsItems: NewsItem[] = [
  {
    id: 1,
    title: 'OREDA launches new rooftop solar subsidy scheme for households',
    excerpt:
      'Eligible households across Odisha can now apply for enhanced subsidies under the revised rooftop solar programme.',
    date: '08 OCT 2026',
    category: 'Scheme',
  },
  {
    id: 2,
    title: 'State-level workshop on renewable energy held in Bhubaneswar',
    excerpt:
      'Energy department officials and stakeholders discussed solar, wind, and hybrid project implementation strategies.',
    date: '05 OCT 2026',
    category: 'Event',
  },
  {
    id: 3,
    title: 'Tender invited for solar street lighting in rural blocks',
    excerpt:
      'OREDA invites qualified bidders for supply, installation, and maintenance of solar LED street lighting systems.',
    date: '02 OCT 2026',
    category: 'Tender',
  },
  {
    id: 4,
    title: 'Odisha crosses major milestone in installed solar capacity',
    excerpt:
      'The Department of Energy reports significant growth in grid-connected and off-grid solar installations statewide.',
    date: '28 SEP 2026',
    category: 'Update',
  },
  {
    id: 5,
    title: 'Biogas and biomass projects expanded under clean energy mission',
    excerpt:
      'New community-level biogas plants are being commissioned to support rural energy access and livelihoods.',
    date: '24 SEP 2026',
    category: 'Project',
  },
  {
    id: 6,
    title: 'Public awareness drive on energy conservation launched statewide',
    excerpt:
      'OREDA teams will visit districts to promote efficient energy use and adoption of renewable solutions.',
    date: '20 SEP 2026',
    category: 'Awareness',
  },
]

const isPaused = ref(false)
const showModal = ref(false)
const scrollingItems = computed(() => [...newsItems, ...newsItems])

function openModal() {
  showModal.value = true
  isPaused.value = true
  document.body.style.overflow = 'hidden'
}

function closeModal() {
  showModal.value = false
  isPaused.value = false
  document.body.style.overflow = ''
}

function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape' && showModal.value) closeModal()
}

function categoryClass(category: string) {
  const map: Record<string, string> = {
    Scheme: 'bg-emerald-100 text-emerald-800',
    Event: 'bg-sky-100 text-sky-800',
    Tender: 'bg-amber-100 text-amber-900',
    Update: 'bg-violet-100 text-violet-800',
    Project: 'bg-oreda/10 text-oreda',
    Awareness: 'bg-rose-100 text-rose-800',
  }
  return map[category] ?? 'bg-gray-100 text-gray-700'
}

onMounted(() => window.addEventListener('keydown', onKeydown))
onUnmounted(() => {
  window.removeEventListener('keydown', onKeydown)
  document.body.style.overflow = ''
})
</script>

<template>
  <section
    id="latest-news"
    class="updates-bridge relative z-30 -mt-8 sm:-mt-9"
    aria-labelledby="latest-updates-label"
  >
    <div class="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
      <div
        class="updates-bar flex h-[54px] items-stretch rounded-full bg-white shadow-[0_8px_30px_rgba(0,16,56,0.12)] ring-1 ring-black/5 sm:h-[58px]"
        @mouseenter="isPaused = true"
        @mouseleave="isPaused = false"
      >
        <!-- Left label -->
        <div class="updates-label shrink-0">
          <div class="updates-label-shape">
            <div class="updates-label-content">
              <Megaphone
                :size="28"
                :stroke-width="2"
                class="shrink-0 text-white"
                aria-hidden="true"
              />
              <span class="updates-label-divider" aria-hidden="true" />
              <p
                id="latest-updates-label"
                class="text-[13px] leading-[1.1] font-bold tracking-[0.02em] text-white uppercase sm:text-[14px]"
              >
                Latest<br />Updates
              </p>
            </div>
          </div>
        </div>

        <!-- Scrolling news -->
        <div class="min-w-0 flex-1 overflow-hidden">
          <div
            class="updates-track flex h-full items-center"
            :class="{ 'is-paused': isPaused }"
          >
            <article
              v-for="(item, index) in scrollingItems"
              :key="`${item.id}-${index}`"
              class="flex shrink-0 items-center border-r border-gray-200 px-4 sm:px-5"
            >
              <div class="w-[min(62vw,320px)] sm:w-[340px]">
                <p class="text-[9px] font-medium tracking-wide text-gray-400 uppercase sm:text-[10px]">
                  {{ item.date }}
                </p>
                <h3
                  class="truncate text-[12px] font-bold text-oreda-dark sm:text-[13px]"
                  :title="item.title"
                >
                  {{ item.title }}
                </h3>
              </div>
            </article>
          </div>
        </div>

        <!-- View all -->
        <div
          class="flex shrink-0 items-center gap-2 border-l border-gray-200 pl-3 pr-3 sm:gap-2.5 sm:pl-4 sm:pr-4"
        >
          <button
            type="button"
            class="hidden text-sm font-bold whitespace-nowrap text-oreda-dark transition hover:text-oreda sm:inline"
            @click="openModal"
          >
            View All
          </button>
          <button
            type="button"
            class="flex h-8 w-8 items-center justify-center rounded-full bg-oreda-dark text-white transition hover:bg-oreda sm:h-9 sm:w-9"
            aria-label="View all news"
            @click="openModal"
          >
            <ArrowRight :size="16" :stroke-width="2.25" />
          </button>
        </div>
      </div>
    </div>

    <div class="h-6 bg-[#f7f6fb] sm:h-7" aria-hidden="true" />

    <!-- All news modal -->
    <Teleport to="body">
      <div
        v-if="showModal"
        class="fixed inset-0 z-[100] flex items-center justify-center p-4"
        role="dialog"
        aria-modal="true"
        aria-labelledby="news-modal-title"
      >
        <div
          class="absolute inset-0 bg-oreda-dark/60 backdrop-blur-sm"
          @click="closeModal"
        />
        <div
          class="relative flex max-h-[85vh] w-full max-w-2xl flex-col overflow-hidden rounded-xl bg-white shadow-2xl"
        >
          <div class="flex items-center justify-between border-b border-gray-200 px-5 py-4 sm:px-6">
            <div>
              <p class="text-xs font-semibold tracking-widest text-oreda uppercase">
                Latest Updates
              </p>
              <h2 id="news-modal-title" class="mt-0.5 text-xl font-bold text-oreda-dark">
                All News
              </h2>
            </div>
            <button
              type="button"
              class="flex h-9 w-9 items-center justify-center rounded-full text-oreda-muted transition hover:bg-gray-100 hover:text-oreda-dark"
              aria-label="Close"
              @click="closeModal"
            >
              <X :size="20" :stroke-width="2" />
            </button>
          </div>

          <ul class="overflow-y-auto px-5 py-4 sm:px-6">
            <li
              v-for="item in newsItems"
              :key="item.id"
              class="border-b border-gray-100 py-4 last:border-b-0"
            >
              <div class="mb-2 flex flex-wrap items-center gap-2">
                <span
                  class="rounded-full px-2.5 py-0.5 text-[11px] font-semibold"
                  :class="categoryClass(item.category)"
                >
                  {{ item.category }}
                </span>
                <span class="text-xs text-gray-400">{{ item.date }}</span>
              </div>
              <h3 class="text-[15px] font-bold text-oreda-dark">
                {{ item.title }}
              </h3>
              <p v-if="item.excerpt" class="mt-1.5 text-sm leading-relaxed text-oreda-muted">
                {{ item.excerpt }}
              </p>
            </li>
          </ul>
        </div>
      </div>
    </Teleport>
  </section>
</template>

<style scoped>
.updates-label {
  position: relative;
  z-index: 2;
  display: flex;
  height: 100%;
  width: 11rem;
  margin-right: -0.6rem;
}

@media (min-width: 640px) {
  .updates-label {
    width: 12.5rem;
    margin-right: -0.65rem;
  }
}

.updates-label-shape {
  position: relative;
  z-index: 1;
  display: flex;
  height: 100%;
  width: 100%;
  align-items: center;
  background: #001038;
  border-radius: 9999px 0 0 9999px;
  clip-path: polygon(0 0, calc(100% - 1.25rem) 0, 100% 100%, 0 100%);
}

.updates-label-content {
  display: flex;
  height: 100%;
  align-items: center;
  gap: 0.55rem;
  padding-left: 0.9rem;
  padding-right: 1.6rem;
}

@media (min-width: 640px) {
  .updates-label-content {
    gap: 0.65rem;
    padding-left: 1.05rem;
    padding-right: 1.85rem;
  }
}

.updates-label-divider {
  display: block;
  height: 2rem;
  width: 1.5px;
  flex-shrink: 0;
  background: rgba(255, 255, 255, 0.55);
}

.updates-track {
  animation: updatesScroll 50s linear infinite;
}

.updates-track.is-paused {
  animation-play-state: paused;
}

@keyframes updatesScroll {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-50%);
  }
}

@media (max-width: 639px) {
  .updates-track {
    animation-duration: 60s;
  }
}

@media (prefers-reduced-motion: reduce) {
  .updates-track {
    animation: none;
  }

  .updates-bar > div:nth-child(2) {
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
  }
}
</style>
