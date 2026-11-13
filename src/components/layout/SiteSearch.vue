<script setup lang="ts">
import {
  getSearchLocation,
  getSuggestedSearchItems,
  highlightParts,
  searchSite,
  type SiteSearchHit,
  type SiteSearchItem,
} from '@/data/siteSearch'
import { ArrowRight, FileText, MapPin, Search, X } from 'lucide-vue-next'
import { computed, nextTick, onUnmounted, ref, watch } from 'vue'
import { useRouter } from 'vue-router'

const open = defineModel<boolean>('open', { default: false })

const router = useRouter()
const query = ref('')
const inputRef = ref<HTMLInputElement | null>(null)
const activeIndex = ref(0)

const results = computed(() => searchSite(query.value))
const hasQuery = computed(() => query.value.trim().length > 0)
const emptyMessage = computed(() =>
  hasQuery.value
    ? `No content found for “${query.value.trim()}”.`
    : 'Start typing a word to find where it appears on the site.',
)

watch(open, async (isOpen) => {
  if (isOpen) {
    query.value = ''
    activeIndex.value = 0
    document.body.style.overflow = 'hidden'
    await nextTick()
    inputRef.value?.focus()
  } else {
    document.body.style.overflow = ''
  }
})

watch(results, () => {
  activeIndex.value = 0
})

onUnmounted(() => {
  document.body.style.overflow = ''
})

function close() {
  open.value = false
}

function goTo(item: SiteSearchItem) {
  close()
  void router.push(getSearchLocation(item))
}

function onKeydown(e: KeyboardEvent) {
  if (!open.value) return

  if (e.key === 'Escape') {
    e.preventDefault()
    close()
    return
  }

  if (!results.value.length) return

  if (e.key === 'ArrowDown') {
    e.preventDefault()
    activeIndex.value = (activeIndex.value + 1) % results.value.length
    return
  }

  if (e.key === 'ArrowUp') {
    e.preventDefault()
    activeIndex.value =
      (activeIndex.value - 1 + results.value.length) % results.value.length
    return
  }

  if (e.key === 'Enter') {
    e.preventDefault()
    const hit = results.value[activeIndex.value]
    if (hit) goTo(hit.item)
  }
}

function titleParts(hit: SiteSearchHit) {
  return highlightParts(hit.item.title, query.value)
}

function snippetParts(hit: SiteSearchHit) {
  return highlightParts(hit.snippet, query.value)
}

const suggestions = getSuggestedSearchItems(6)
</script>

<template>
  <Teleport to="body">
    <div
      v-if="open"
      class="site-search"
      role="dialog"
      aria-modal="true"
      aria-label="Site search"
      @keydown="onKeydown"
    >
      <button
        type="button"
        class="site-search-backdrop"
        aria-label="Close search"
        @click="close"
      />

      <div class="site-search-panel">
        <div class="site-search-bar">
          <Search class="site-search-leading" :size="18" :stroke-width="2.2" />
          <input
            ref="inputRef"
            v-model="query"
            type="search"
            class="site-search-input"
            placeholder="Type a word to find matching content…"
            aria-label="Search the website"
            autocomplete="off"
            enterkeyhint="search"
          />
          <button
            type="button"
            class="site-search-close"
            aria-label="Close search"
            @click="close"
          >
            <X :size="18" :stroke-width="2.25" />
          </button>
        </div>

        <div class="site-search-body">
          <p class="site-search-label">
            <template v-if="hasQuery">
              {{ results.length }}
              {{ results.length === 1 ? 'match' : 'matches' }}
              for “{{ query.trim() }}”
            </template>
            <template v-else>Suggested pages</template>
          </p>

          <ul v-if="results.length" class="site-search-list" role="listbox">
            <li v-for="(hit, index) in results" :key="hit.item.id">
              <button
                type="button"
                class="site-search-item"
                :class="{ 'is-active': index === activeIndex }"
                role="option"
                :aria-selected="index === activeIndex"
                @mouseenter="activeIndex = index"
                @click="goTo(hit.item)"
              >
                <span class="site-search-item-icon" aria-hidden="true">
                  <FileText :size="15" :stroke-width="2.1" />
                </span>

                <span class="site-search-item-copy">
                  <span class="site-search-item-title">
                    <template
                      v-for="(part, partIndex) in titleParts(hit)"
                      :key="`${hit.item.id}-t-${partIndex}`"
                    >
                      <mark v-if="part.match" class="site-search-mark">{{
                        part.text
                      }}</mark>
                      <template v-else>{{ part.text }}</template>
                    </template>
                  </span>

                  <span class="site-search-item-desc">
                    <template
                      v-for="(part, partIndex) in snippetParts(hit)"
                      :key="`${hit.item.id}-s-${partIndex}`"
                    >
                      <mark v-if="part.match" class="site-search-mark">{{
                        part.text
                      }}</mark>
                      <template v-else>{{ part.text }}</template>
                    </template>
                  </span>

                  <span class="site-search-page">
                    <MapPin :size="12" :stroke-width="2.2" aria-hidden="true" />
                    Found on
                    <strong>{{ hit.item.pageLabel }}</strong>
                    <span class="site-search-path">
                      {{ hit.item.to }}{{ hit.item.hash ? `#${hit.item.hash}` : '' }}
                    </span>
                  </span>
                </span>

                <ArrowRight
                  class="site-search-arrow"
                  :size="15"
                  :stroke-width="2.2"
                  aria-hidden="true"
                />
              </button>
            </li>
          </ul>

          <div v-else class="site-search-empty">
            <p>{{ emptyMessage }}</p>
            <div v-if="hasQuery" class="site-search-empty-suggestions">
              <button
                v-for="item in suggestions"
                :key="item.id"
                type="button"
                class="site-search-chip"
                @click="goTo(item)"
              >
                {{ item.pageLabel }}
              </button>
            </div>
          </div>
        </div>

        <p class="site-search-hint">
          Results show the matching word and the page where it appears. Use ↑ ↓,
          Enter to open, Esc to close.
        </p>
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
.site-search {
  position: fixed;
  inset: 0;
  z-index: 80;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding: 4.5rem 1rem 1.5rem;
}

.site-search-backdrop {
  position: absolute;
  inset: 0;
  border: 0;
  background: rgba(0, 16, 56, 0.55);
  backdrop-filter: blur(2px);
}

.site-search-panel {
  position: relative;
  z-index: 1;
  width: min(100%, 42rem);
  overflow: hidden;
  border: 1px solid rgba(56, 32, 128, 0.18);
  background: #fff;
  box-shadow: 0 24px 60px rgba(0, 16, 56, 0.28);
}

.site-search-bar {
  display: flex;
  align-items: center;
  gap: 0.65rem;
  border-bottom: 1px solid rgba(56, 32, 128, 0.12);
  padding: 0.85rem 0.95rem;
}

.site-search-leading {
  flex-shrink: 0;
  color: #382080;
}

.site-search-input {
  min-width: 0;
  flex: 1;
  border: 0;
  background: transparent;
  color: #001038;
  font-size: 15px;
  font-weight: 560;
  line-height: 1.4;
  outline: none;
}

.site-search-input::placeholder {
  color: rgba(0, 16, 56, 0.42);
  font-weight: 500;
}

.site-search-close {
  display: inline-flex;
  height: 2rem;
  width: 2rem;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  border: 0;
  background: rgba(56, 32, 128, 0.08);
  color: #382080;
  cursor: pointer;
  transition: background 0.15s ease;
}

.site-search-close:hover {
  background: rgba(56, 32, 128, 0.14);
}

.site-search-body {
  max-height: min(60vh, 28rem);
  overflow: auto;
  padding: 0.75rem 0.65rem 0.85rem;
}

.site-search-label {
  margin: 0 0.35rem 0.55rem;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: rgba(0, 16, 56, 0.45);
}

.site-search-list {
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
}

.site-search-item {
  display: grid;
  width: 100%;
  grid-template-columns: auto minmax(0, 1fr) auto;
  align-items: start;
  gap: 0.7rem;
  border: 1px solid transparent;
  background: transparent;
  padding: 0.75rem 0.65rem;
  text-align: left;
  cursor: pointer;
  transition:
    background 0.15s ease,
    border-color 0.15s ease;
}

.site-search-item:hover,
.site-search-item.is-active {
  border-color: rgba(56, 32, 128, 0.12);
  background: rgba(196, 181, 240, 0.22);
}

.site-search-item-icon {
  display: inline-flex;
  height: 1.85rem;
  width: 1.85rem;
  align-items: center;
  justify-content: center;
  margin-top: 0.1rem;
  background: rgba(56, 32, 128, 0.08);
  color: #382080;
}

.site-search-item-copy {
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 0.28rem;
}

.site-search-item-title {
  font-size: 13.75px;
  font-weight: 700;
  line-height: 1.3;
  color: #001038;
}

.site-search-item-desc {
  font-size: 12.5px;
  line-height: 1.45;
  color: rgba(0, 16, 56, 0.62);
}

.site-search-mark {
  background: #ffe08a;
  color: #001038;
  font-weight: 700;
  padding: 0 0.1em;
}

.site-search-page {
  display: inline-flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.3rem;
  margin-top: 0.1rem;
  font-size: 11.5px;
  font-weight: 600;
  color: #382080;
}

.site-search-page strong {
  font-weight: 750;
}

.site-search-path {
  color: rgba(0, 16, 56, 0.42);
  font-weight: 500;
}

.site-search-arrow {
  flex-shrink: 0;
  margin-top: 0.25rem;
  color: rgba(56, 32, 128, 0.45);
}

.site-search-empty {
  padding: 1.4rem 0.75rem 1rem;
  text-align: center;
  color: rgba(0, 16, 56, 0.55);
  font-size: 13.5px;
}

.site-search-empty-suggestions {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.4rem;
  margin-top: 0.85rem;
}

.site-search-chip {
  border: 0;
  background: rgba(56, 32, 128, 0.1);
  color: #382080;
  padding: 0.22rem 0.5rem;
  font-size: 11px;
  font-weight: 700;
  cursor: pointer;
}

.site-search-hint {
  margin: 0;
  border-top: 1px solid rgba(56, 32, 128, 0.1);
  background: rgba(56, 32, 128, 0.04);
  padding: 0.55rem 0.95rem;
  font-size: 11.5px;
  color: rgba(0, 16, 56, 0.48);
}

@media (max-width: 640px) {
  .site-search {
    padding: 3.25rem 0.65rem 0.85rem;
  }

  .site-search-arrow {
    display: none;
  }

  .site-search-hint {
    display: none;
  }
}
</style>
