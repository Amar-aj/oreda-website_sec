<script setup lang="ts">
import {
  CalendarDays,
  ChevronDown,
  Clock3,
  Download,
  FileText,
  Search,
  X,
} from 'lucide-vue-next'
import { computed, nextTick, onMounted, onUnmounted, ref } from 'vue'

type StatusFilter = 'All' | 'Open' | 'Closed'
type DocKind = 'NIT' | 'RFP' | 'Corrigendum' | 'Clarification' | 'Addendum'

interface TenderDocument {
  id: string
  kind: DocKind
  title: string
  publishedOn: string
  note?: string
  href: string
  size: string
}

interface Tender {
  id: number
  ref: string
  title: string
  category: string
  status: 'Open' | 'Closed'
  publishedOn: string
  closesOn: string
  openingOn?: string
  emd?: string
  summary: string
  documents: TenderDocument[]
}

const statusFilters: StatusFilter[] = ['All', 'Open', 'Closed']
const CLOSING_SOON_DAYS = 7

const tenders: Tender[] = [
  {
    id: 1,
    ref: 'OREDA/SPV/2026/14',
    title: 'Rooftop solar PV — supply, installation & commissioning',
    category: 'Solar PV',
    status: 'Open',
    publishedOn: '01 Oct 2026',
    closesOn: '28 Oct 2026, 5:00 PM',
    openingOn: '30 Oct 2026',
    emd: '₹2,50,000',
    summary:
      'Design, supply, installation and commissioning of grid-connected rooftop solar PV systems under OREDA programmes across selected districts.',
    documents: [
      {
        id: 'd1a',
        kind: 'NIT',
        title: 'Notice Inviting Tender',
        publishedOn: '01 Oct 2026',
        href: '/documents/tenders/spv-2026-14-nit.pdf',
        size: '420 KB',
      },
      {
        id: 'd1b',
        kind: 'RFP',
        title: 'Request for Proposal — original',
        publishedOn: '01 Oct 2026',
        note: 'Baseline RFP with technical specifications and BOQ.',
        href: '/documents/tenders/spv-2026-14-rfp.pdf',
        size: '2.1 MB',
      },
      {
        id: 'd1c',
        kind: 'Corrigendum',
        title: 'Corrigendum — 01',
        publishedOn: '08 Oct 2026',
        note: 'Extended bid submission date and revised payment schedule (Clause 4.2).',
        href: '/documents/tenders/spv-2026-14-corr-01.pdf',
        size: '310 KB',
      },
      {
        id: 'd1d',
        kind: 'Clarification',
        title: 'Pre-bid clarifications',
        publishedOn: '12 Oct 2026',
        note: 'Responses to queries raised in the pre-bid meeting held on 10 Oct 2026.',
        href: '/documents/tenders/spv-2026-14-clarifications.pdf',
        size: '540 KB',
      },
      {
        id: 'd1e',
        kind: 'Corrigendum',
        title: 'Corrigendum — 02',
        publishedOn: '16 Oct 2026',
        note: 'Updated technical eligibility criteria for EPC experience.',
        href: '/documents/tenders/spv-2026-14-corr-02.pdf',
        size: '280 KB',
      },
    ],
  },
  {
    id: 2,
    ref: 'OREDA/SSL/2026/09',
    title: 'Solar LED street lighting for rural blocks',
    category: 'Street lighting',
    status: 'Open',
    publishedOn: '20 Sep 2026',
    closesOn: '18 Oct 2026, 5:00 PM',
    openingOn: '20 Oct 2026',
    emd: '₹1,00,000',
    summary:
      'Supply and installation of solar LED street lighting systems in identified rural blocks with five-year comprehensive maintenance.',
    documents: [
      {
        id: 'd2a',
        kind: 'NIT',
        title: 'Notice Inviting Tender',
        publishedOn: '20 Sep 2026',
        href: '/documents/tenders/ssl-2026-09-nit.pdf',
        size: '390 KB',
      },
      {
        id: 'd2b',
        kind: 'RFP',
        title: 'Detailed tender document',
        publishedOn: '20 Sep 2026',
        href: '/documents/tenders/ssl-2026-09-rfp.pdf',
        size: '1.8 MB',
      },
      {
        id: 'd2c',
        kind: 'Addendum',
        title: 'Addendum — site list update',
        publishedOn: '05 Oct 2026',
        note: 'Revised village / block-wise installation schedule (Annexure-B).',
        href: '/documents/tenders/ssl-2026-09-addendum.pdf',
        size: '650 KB',
      },
    ],
  },
  {
    id: 3,
    ref: 'OREDA/BIO/2026/03',
    title: 'Community biogas plant O&M services',
    category: 'Biogas',
    status: 'Open',
    publishedOn: '05 Oct 2026',
    closesOn: '12 Nov 2026, 5:00 PM',
    openingOn: '14 Nov 2026',
    emd: '₹75,000',
    summary:
      'Operation and maintenance of community biogas plants including feedstock management, safety compliance and beneficiary support.',
    documents: [
      {
        id: 'd3a',
        kind: 'NIT',
        title: 'Notice Inviting Tender',
        publishedOn: '05 Oct 2026',
        href: '/documents/tenders/bio-2026-03-nit.pdf',
        size: '360 KB',
      },
      {
        id: 'd3b',
        kind: 'RFP',
        title: 'RFP & scope of work',
        publishedOn: '05 Oct 2026',
        href: '/documents/tenders/bio-2026-03-rfp.pdf',
        size: '1.4 MB',
      },
    ],
  },
  {
    id: 4,
    ref: 'OREDA/HYB/2026/01',
    title: 'Hybrid renewable energy feasibility study',
    category: 'Consultancy',
    status: 'Open',
    publishedOn: '10 Oct 2026',
    closesOn: '20 Nov 2026, 3:00 PM',
    openingOn: '22 Nov 2026',
    emd: '₹50,000',
    summary:
      'Techno-economic feasibility study for hybrid solar-wind and storage configurations at prioritised sites in Odisha.',
    documents: [
      {
        id: 'd4a',
        kind: 'NIT',
        title: 'Notice Inviting Tender',
        publishedOn: '10 Oct 2026',
        href: '/documents/tenders/hyb-2026-01-nit.pdf',
        size: '340 KB',
      },
      {
        id: 'd4b',
        kind: 'RFP',
        title: 'Terms of reference',
        publishedOn: '10 Oct 2026',
        href: '/documents/tenders/hyb-2026-01-rfp.pdf',
        size: '980 KB',
      },
      {
        id: 'd4c',
        kind: 'Corrigendum',
        title: 'Corrigendum — 01',
        publishedOn: '14 Oct 2026',
        note: 'Clarified consultant team composition and deliverable timelines.',
        href: '/documents/tenders/hyb-2026-01-corr-01.pdf',
        size: '220 KB',
      },
    ],
  },
  {
    id: 5,
    ref: 'OREDA/SPV/2025/22',
    title: 'Off-grid solar water pumping systems',
    category: 'Solar PV',
    status: 'Closed',
    publishedOn: '12 Jun 2025',
    closesOn: '15 Jul 2025, 5:00 PM',
    openingOn: '18 Jul 2025',
    emd: '₹1,50,000',
    summary:
      'Supply and installation of off-grid solar water pumping systems for agricultural beneficiaries (archived notice).',
    documents: [
      {
        id: 'd5a',
        kind: 'NIT',
        title: 'Notice Inviting Tender',
        publishedOn: '12 Jun 2025',
        href: '/documents/tenders/spv-2025-22-nit.pdf',
        size: '400 KB',
      },
      {
        id: 'd5b',
        kind: 'RFP',
        title: 'Tender document',
        publishedOn: '12 Jun 2025',
        href: '/documents/tenders/spv-2025-22-rfp.pdf',
        size: '1.6 MB',
      },
      {
        id: 'd5c',
        kind: 'Corrigendum',
        title: 'Corrigendum — 01',
        publishedOn: '28 Jun 2025',
        note: 'Final corrigendum before bid closing.',
        href: '/documents/tenders/spv-2025-22-corr-01.pdf',
        size: '190 KB',
      },
    ],
  },
]

const activeStatus = ref<StatusFilter>('All')
const expandedIds = ref<Set<number>>(new Set(tenders.map((t) => t.id)))
const searchOpen = ref(false)
const searchQuery = ref('')
const searchInputRef = ref<HTMLInputElement | null>(null)
const sectionRef = ref<HTMLElement | null>(null)
const inView = ref(false)
let observer: IntersectionObserver | null = null

const filtered = computed(() => {
  const query = searchQuery.value.trim().toLowerCase()
  return tenders.filter((tender) => {
    const matchesStatus =
      activeStatus.value === 'All' || tender.status === activeStatus.value
    if (!matchesStatus) return false
    if (!query) return true
    const docText = tender.documents
      .map((d) => `${d.title} ${d.kind} ${d.note ?? ''}`)
      .join(' ')
    const haystack = [
      tender.title,
      tender.ref,
      tender.category,
      tender.summary,
      docText,
    ]
      .join(' ')
      .toLowerCase()
    return haystack.includes(query)
  })
})

const openCount = computed(
  () => tenders.filter((t) => t.status === 'Open').length,
)

function isExpanded(id: number) {
  return expandedIds.value.has(id)
}

function setStatus(status: StatusFilter) {
  activeStatus.value = status
}

function toggleExpand(id: number) {
  const next = new Set(expandedIds.value)
  if (next.has(id)) next.delete(id)
  else next.add(id)
  expandedIds.value = next
}

function parseClosesOn(value: string) {
  const parsed = Date.parse(value.replace(',', ''))
  return Number.isNaN(parsed) ? null : new Date(parsed)
}

function isClosingSoon(tender: Tender) {
  if (tender.status !== 'Open') return false
  const closes = parseClosesOn(tender.closesOn)
  if (!closes) return false
  const now = Date.now()
  if (closes.getTime() <= now) return false
  const daysLeft = (closes.getTime() - now) / (1000 * 60 * 60 * 24)
  return daysLeft <= CLOSING_SOON_DAYS
}

function hasUpdates(tender: Tender) {
  return tender.documents.some(
    (d) =>
      d.kind === 'Corrigendum' ||
      d.kind === 'Addendum' ||
      d.kind === 'Clarification',
  )
}

function latestUpdate(tender: Tender) {
  const updates = tender.documents.filter(
    (d) =>
      d.kind === 'Corrigendum' ||
      d.kind === 'Addendum' ||
      d.kind === 'Clarification',
  )
  return updates.length ? updates[updates.length - 1] : null
}

function kindClass(kind: DocKind) {
  switch (kind) {
    case 'Corrigendum':
      return 'is-corrigendum'
    case 'Clarification':
      return 'is-clarification'
    case 'Addendum':
      return 'is-addendum'
    case 'RFP':
      return 'is-rfp'
    default:
      return 'is-nit'
  }
}

async function openSearch() {
  searchOpen.value = true
  await nextTick()
  searchInputRef.value?.focus()
}

function closeSearch() {
  searchOpen.value = false
  searchQuery.value = ''
}

onMounted(() => {
  observer = new IntersectionObserver(
    ([entry]) => {
      if (entry?.isIntersecting) {
        inView.value = true
        observer?.disconnect()
      }
    },
    { threshold: 0.06 },
  )
  if (sectionRef.value) observer.observe(sectionRef.value)
})

onUnmounted(() => observer?.disconnect())
</script>

<template>
  <section
    id="tender-board"
    ref="sectionRef"
    class="tender-board relative w-full overflow-hidden"
    aria-labelledby="tender-board-heading"
    :class="{ 'is-inview': inView }"
  >
    <div class="pointer-events-none absolute inset-0" aria-hidden="true">
      <div class="tender-board-base" />
      <div class="tender-board-glow tender-board-glow--a" />
      <div class="tender-board-glow tender-board-glow--b" />
      <div class="tender-board-glow tender-board-glow--c" />
      <div class="tender-board-mesh" />
      <div class="tender-board-dots" />
      <div class="tender-board-slash tender-board-slash--a" />
      <div class="tender-board-slash tender-board-slash--b" />
    </div>

    <div class="relative mx-auto max-w-[1400px] px-4 py-12 sm:px-6 sm:py-14 lg:px-8 lg:py-16">
      <div
        class="tender-reveal flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between"
        style="--delay: 0ms"
      >
        <div class="max-w-2xl">
          <p class="tender-eyebrow">Procurement board</p>
          <h2
            id="tender-board-heading"
            class="mt-2 font-display text-[clamp(1.55rem,2.8vw,2.2rem)] leading-[1.15] font-semibold tracking-[-0.015em] text-oreda-dark"
          >
            One tender.
            <em class="font-display not-italic text-oreda">Every revision</em>
            under it.
          </h2>
        </div>
        <div class="tender-board-aside lg:pb-1">
          <p class="tender-board-aside-copy">
            Expand any notice to download the NIT, RFP and all subsequent
            corrigenda or clarifications released for that tender.
          </p>
          <p class="tender-board-aside-count">
            {{ openCount }} live
            <span aria-hidden="true"> · </span>
            {{ filtered.length }}
            {{ filtered.length === 1 ? 'result' : 'results' }}
          </p>
        </div>
      </div>

      <div
        class="tender-reveal tender-toolbar mt-8 border-b border-oreda/10"
        style="--delay: 50ms"
      >
        <div
          class="tender-tabs"
          :class="{ 'is-dimmed': searchOpen }"
          role="tablist"
          aria-label="Filter by status"
        >
          <button
            v-for="status in statusFilters"
            :key="status"
            type="button"
            role="tab"
            class="tender-filter"
            :class="{ 'is-active': activeStatus === status }"
            :aria-selected="activeStatus === status"
            @click="setStatus(status)"
          >
            {{ status }}
          </button>
        </div>

        <div class="tender-search" :class="{ 'is-open': searchOpen }">
          <button
            v-show="!searchOpen"
            type="button"
            class="tender-search-trigger"
            aria-label="Search tenders"
            @click="openSearch"
          >
            <Search :size="17" :stroke-width="2.2" />
          </button>

          <div class="tender-search-panel" :aria-hidden="!searchOpen">
            <Search
              :size="16"
              :stroke-width="2.2"
              class="tender-search-leading"
              aria-hidden="true"
            />
            <input
              ref="searchInputRef"
              v-model="searchQuery"
              type="search"
              class="tender-search-input"
              placeholder="Search by title, ref, category, corrigendum…"
              aria-label="Search tenders"
              @keydown.escape="closeSearch"
            />
            <button
              type="button"
              class="tender-search-close"
              aria-label="Close search"
              @click="closeSearch"
            >
              <X :size="16" :stroke-width="2.2" />
            </button>
          </div>
        </div>
      </div>

      <ul :key="activeStatus" class="tender-list mt-6" role="list">
        <li
          v-for="(tender, index) in filtered"
          :key="tender.id"
          class="tender-item"
          :class="{ 'is-open': isExpanded(tender.id) }"
          :style="{ '--item-delay': `${70 + index * 50}ms` }"
        >
          <span
            v-if="hasUpdates(tender)"
            class="tender-updated"
            title="Includes corrigendum or clarification"
          >
            Updated
          </span>

          <div class="tender-item-row">
            <div class="tender-item-main">
              <div class="tender-item-meta">
                <span
                  class="tender-status"
                  :class="{
                    'is-live': tender.status === 'Open',
                    'is-closed': tender.status === 'Closed',
                  }"
                >
                  {{ tender.status }}
                </span>
                <span
                  v-if="isClosingSoon(tender)"
                  class="tender-closing-soon"
                  title="Closing within 7 days"
                >
                  Closing soon
                </span>
                <span class="tender-ref">{{ tender.ref }}</span>
              </div>

              <h3 class="tender-item-title">{{ tender.title }}</h3>

              <div class="tender-item-dates">
                <span>
                  <CalendarDays :size="13" :stroke-width="2.2" aria-hidden="true" />
                  Published {{ tender.publishedOn }}
                </span>
                <span
                  class="tender-closes"
                  :class="{
                    'is-urgent': isClosingSoon(tender),
                    'is-closed': tender.status === 'Closed',
                  }"
                >
                  <Clock3 :size="13" :stroke-width="2.3" aria-hidden="true" />
                  <span class="tender-closes-label">Closes</span>
                  <strong>{{ tender.closesOn }}</strong>
                </span>
                <span class="tender-doc-count">
                  <FileText :size="13" :stroke-width="2.2" aria-hidden="true" />
                  {{ tender.documents.length }}
                  {{ tender.documents.length === 1 ? 'document' : 'documents' }}
                </span>
              </div>

              <p v-if="latestUpdate(tender)" class="tender-latest">
                Latest:
                <strong>{{ latestUpdate(tender)?.kind }}</strong>
                — {{ latestUpdate(tender)?.title }}
                <span aria-hidden="true"> · </span>
                {{ latestUpdate(tender)?.publishedOn }}
              </p>
            </div>

            <div class="tender-item-actions">
              <a
                :href="tender.documents[tender.documents.length - 1]?.href"
                class="tender-btn tender-btn--primary"
                download
                @click.stop
              >
                <Download :size="15" :stroke-width="2.2" aria-hidden="true" />
                <span>Latest file</span>
              </a>
              <button
                type="button"
                class="tender-btn tender-btn--ghost tender-btn--icon"
                :class="{ 'is-expanded': isExpanded(tender.id) }"
                :aria-expanded="isExpanded(tender.id)"
                :aria-label="
                  isExpanded(tender.id)
                    ? 'Hide documents'
                    : 'View all documents'
                "
                @click="toggleExpand(tender.id)"
              >
                <ChevronDown :size="18" :stroke-width="2.3" aria-hidden="true" />
              </button>
            </div>
          </div>

          <div v-show="isExpanded(tender.id)" class="tender-dossier">
            <div class="tender-dossier-intro">
              <p class="tender-dossier-summary">{{ tender.summary }}</p>
              <dl class="tender-dossier-facts">
                <div>
                  <dt>EMD</dt>
                  <dd>{{ tender.emd || '—' }}</dd>
                </div>
                <div>
                  <dt>Bid opening</dt>
                  <dd>{{ tender.openingOn || '—' }}</dd>
                </div>
                <div>
                  <dt>Document trail</dt>
                  <dd>{{ tender.documents.length }} files</dd>
                </div>
              </dl>
            </div>

            <ol class="tender-doc-trail" aria-label="Document history">
              <li
                v-for="(doc, docIndex) in tender.documents"
                :key="doc.id"
                class="tender-doc"
              >
                <div class="tender-doc-rail" aria-hidden="true">
                  <span class="tender-doc-dot" />
                  <span
                    v-if="docIndex < tender.documents.length - 1"
                    class="tender-doc-line"
                  />
                </div>

                <div class="tender-doc-body">
                  <div class="tender-doc-head">
                    <span class="tender-doc-kind" :class="kindClass(doc.kind)">
                      {{ doc.kind }}
                    </span>
                    <span class="tender-doc-date">{{ doc.publishedOn }}</span>
                    <span class="tender-doc-size">{{ doc.size }}</span>
                  </div>
                  <h4 class="tender-doc-title">{{ doc.title }}</h4>
                  <p v-if="doc.note" class="tender-doc-note">{{ doc.note }}</p>
                </div>

                <a
                  :href="doc.href"
                  class="tender-doc-download"
                  :download="true"
                  :aria-label="`Download ${doc.title}`"
                >
                  <Download :size="15" :stroke-width="2.2" aria-hidden="true" />
                  <span>Download</span>
                </a>
              </li>
            </ol>
          </div>
        </li>
      </ul>

      <p v-if="!filtered.length" class="tender-empty" role="status">
        <template v-if="searchQuery.trim()">
          No tenders match “{{ searchQuery.trim() }}”.
        </template>
        <template v-else>
          No tenders in this status right now.
        </template>
      </p>
    </div>
  </section>
</template>

<style scoped>
.tender-board-base {
  position: absolute;
  inset: 0;
  background:
    radial-gradient(ellipse 90% 55% at 8% -10%, rgba(56, 32, 128, 0.12), transparent 55%),
    radial-gradient(ellipse 70% 50% at 92% 8%, rgba(196, 181, 240, 0.28), transparent 52%),
    linear-gradient(
      155deg,
      #efeaf8 0%,
      #f5f3fb 28%,
      #f2f5f9 58%,
      #f7f4fc 78%,
      #eef1f7 100%
    );
}

.tender-board-glow {
  position: absolute;
  border-radius: 9999px;
  filter: blur(2px);
}

.tender-board-glow--a {
  top: -8%;
  left: -6%;
  width: 26rem;
  height: 20rem;
  background: radial-gradient(circle, rgba(56, 32, 128, 0.16), transparent 70%);
}

.tender-board-glow--b {
  top: 12%;
  right: -8%;
  width: 22rem;
  height: 18rem;
  background: radial-gradient(circle, rgba(148, 122, 210, 0.22), transparent 70%);
}

.tender-board-glow--c {
  bottom: 8%;
  left: 35%;
  width: 28rem;
  height: 16rem;
  background: radial-gradient(circle, rgba(0, 16, 56, 0.06), transparent 70%);
}

.tender-board-mesh {
  position: absolute;
  inset: 0;
  opacity: 0.4;
  background-image:
    linear-gradient(rgba(56, 32, 128, 0.045) 1px, transparent 1px),
    linear-gradient(90deg, rgba(56, 32, 128, 0.045) 1px, transparent 1px);
  background-size: 42px 42px;
  mask-image: radial-gradient(ellipse 85% 70% at 50% 15%, black 10%, transparent 78%);
}

.tender-board-dots {
  position: absolute;
  inset: 0;
  opacity: 0.35;
  background-image: radial-gradient(rgba(56, 32, 128, 0.14) 1px, transparent 1px);
  background-size: 18px 18px;
  mask-image: radial-gradient(ellipse 60% 45% at 80% 70%, black 5%, transparent 70%);
}

.tender-board-slash {
  position: absolute;
  width: 1px;
  height: 120%;
  background: linear-gradient(
    180deg,
    transparent,
    rgba(56, 32, 128, 0.12),
    transparent
  );
}

.tender-board-slash--a {
  top: -15%;
  left: 18%;
  transform: rotate(16deg);
}

.tender-board-slash--b {
  top: -20%;
  right: 22%;
  transform: rotate(-12deg);
  opacity: 0.7;
}

.tender-reveal {
  opacity: 0;
  transform: translateY(16px);
  transition:
    opacity 0.65s cubic-bezier(0.22, 1, 0.36, 1),
    transform 0.65s cubic-bezier(0.22, 1, 0.36, 1);
  transition-delay: var(--delay, 0ms);
}

.is-inview .tender-reveal {
  opacity: 1;
  transform: translateY(0);
}

.tender-eyebrow {
  margin: 0;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: #382080;
}

.tender-board-aside {
  max-width: 28rem;
}

.tender-board-aside-copy {
  margin: 0;
  max-width: 28rem;
  font-size: 13.5px;
  line-height: 1.5;
  color: #5a6b82;
  text-wrap: pretty;
}

@media (min-width: 1024px) {
  .tender-board-aside {
    text-align: right;
  }

  .tender-board-aside-copy {
    margin-left: auto;
  }
}

.tender-board-aside-count {
  margin: 0.65rem 0 0;
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.04em;
  color: #6b7c94;
}

.tender-toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
}

.tender-tabs {
  display: flex;
  min-width: 0;
  flex: 1;
  gap: 0.15rem;
  overflow-x: auto;
  padding-bottom: 1px;
  scrollbar-width: none;
  -ms-overflow-style: none;
  transition: opacity 0.3s ease;
}

.tender-tabs::-webkit-scrollbar {
  display: none;
}

.tender-tabs.is-dimmed {
  opacity: 0.35;
  pointer-events: none;
}

.tender-filter {
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

.tender-filter::after {
  content: '';
  position: absolute;
  right: 1rem;
  bottom: -1px;
  left: 1rem;
  height: 2px;
  background: #382080;
  transform: scaleX(0);
  transition: transform 0.25s cubic-bezier(0.22, 1, 0.36, 1);
}

.tender-filter:hover {
  color: #001038;
}

.tender-filter.is-active {
  color: #382080;
}

.tender-filter.is-active::after {
  transform: scaleX(1);
}

.tender-search {
  position: relative;
  z-index: 2;
  display: flex;
  width: 2.4rem;
  flex-shrink: 0;
  align-items: center;
  justify-content: flex-end;
}

.tender-search-trigger {
  display: grid;
  place-items: center;
  width: 2.4rem;
  height: 2.4rem;
  color: #382080;
  background: transparent;
  border: 1px solid rgba(56, 32, 128, 0.18);
  cursor: pointer;
  transition: background 0.2s ease, border-color 0.2s ease;
}

.tender-search-trigger:hover {
  background: rgba(56, 32, 128, 0.06);
  border-color: rgba(56, 32, 128, 0.35);
}

.tender-search-panel {
  position: absolute;
  top: 50%;
  right: 0;
  display: flex;
  align-items: center;
  gap: 0.45rem;
  width: 2.4rem;
  height: 2.4rem;
  overflow: hidden;
  opacity: 0;
  pointer-events: none;
  background: #fff;
  border: 1px solid transparent;
  transform: translateY(-50%);
  transition:
    width 0.4s cubic-bezier(0.22, 1, 0.36, 1),
    opacity 0.25s ease,
    border-color 0.25s ease,
    box-shadow 0.25s ease;
}

.tender-search.is-open .tender-search-panel {
  width: min(24rem, 72vw);
  opacity: 1;
  pointer-events: auto;
  border-color: rgba(56, 32, 128, 0.2);
  box-shadow: 0 10px 24px -16px rgba(0, 16, 56, 0.35);
}

.tender-search-leading {
  flex-shrink: 0;
  margin-left: 0.7rem;
  color: #382080;
}

.tender-search-input {
  width: 100%;
  min-width: 0;
  height: 2.4rem;
  padding: 0 0.15rem;
  font-size: 13.5px;
  font-weight: 500;
  color: #001038;
  background: transparent;
  border: 0;
  outline: none;
}

.tender-search-input::placeholder {
  color: #9aa8bc;
}

.tender-search-close {
  display: grid;
  place-items: center;
  flex-shrink: 0;
  width: 2rem;
  height: 2rem;
  margin-right: 0.3rem;
  color: #6b7c94;
  background: transparent;
  border: 0;
  cursor: pointer;
}

.tender-search-close:hover {
  color: #382080;
}

.tender-list {
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
  margin: 0;
  padding: 0;
  list-style: none;
}

.tender-item {
  position: relative;
  overflow: hidden;
  background: #fff;
  border: 1px solid rgba(56, 32, 128, 0.1);
  box-shadow: 0 16px 34px -28px rgba(0, 16, 56, 0.4);
  opacity: 0;
  transform: translateY(14px);
  transition:
    opacity 0.5s cubic-bezier(0.22, 1, 0.36, 1),
    transform 0.5s cubic-bezier(0.22, 1, 0.36, 1),
    border-color 0.25s ease,
    box-shadow 0.25s ease;
  transition-delay: var(--item-delay, 0ms);
}

.is-inview .tender-item {
  opacity: 1;
  transform: translateY(0);
}

.tender-item.is-open {
  border-color: rgba(56, 32, 128, 0.22);
  box-shadow: 0 22px 40px -24px rgba(0, 16, 56, 0.5);
}

.tender-item-row {
  display: grid;
  gap: 1rem;
  padding: 1.15rem 1.2rem;
}

@media (min-width: 900px) {
  .tender-item-row {
    grid-template-columns: minmax(0, 1fr) auto;
    align-items: center;
    gap: 1.25rem;
    padding: 1.25rem 1.4rem;
  }
}

.tender-item-meta {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.45rem 0.65rem;
  margin-bottom: 0.55rem;
}

.tender-status {
  padding: 0.28rem 0.55rem;
  font-size: 10px;
  font-weight: 800;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  border: 1px solid transparent;
}

.tender-status.is-live {
  color: #0f6b3d;
  background: rgba(15, 107, 61, 0.08);
  border-color: rgba(15, 107, 61, 0.16);
}

.tender-status.is-closed {
  color: #6b7c94;
  background: rgba(107, 124, 148, 0.1);
  border-color: rgba(107, 124, 148, 0.18);
}

.tender-closing-soon {
  padding: 0.28rem 0.55rem;
  font-size: 10px;
  font-weight: 800;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #fff;
  background: linear-gradient(135deg, #c47a00 0%, #9a5b00 100%);
  border: 1px solid rgba(154, 91, 0, 0.35);
  animation: tender-closing-blink 1.2s ease-in-out infinite;
}

@keyframes tender-closing-blink {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.35;
  }
}

.tender-ref {
  font-size: 11.5px;
  font-weight: 700;
  letter-spacing: 0.04em;
  color: #382080;
  font-variant-numeric: tabular-nums;
}

.tender-updated {
  position: absolute;
  top: 0;
  right: 0;
  z-index: 3;
  padding: 0.4rem 0.75rem;
  font-size: 10px;
  font-weight: 800;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: #fff;
  background: linear-gradient(135deg, #482888 0%, #382080 55%, #241456 100%);
  box-shadow: 0 8px 18px -10px rgba(56, 32, 128, 0.65);
  animation: tender-updated-blink 1.35s ease-in-out infinite;
}

@keyframes tender-updated-blink {
  0%,
  100% {
    opacity: 1;
    box-shadow: 0 8px 18px -10px rgba(56, 32, 128, 0.65);
  }
  50% {
    opacity: 0.35;
    box-shadow: 0 4px 10px -10px rgba(56, 32, 128, 0.25);
  }
}

.tender-item-title {
  margin: 0;
  font-family: var(--font-display);
  font-size: clamp(1.05rem, 1.6vw, 1.25rem);
  font-weight: 600;
  line-height: 1.3;
  letter-spacing: -0.015em;
  color: #001038;
}

.tender-item-dates {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.55rem 0.85rem;
  margin-top: 0.7rem;
  font-size: 12.5px;
  font-weight: 600;
  color: #5a6b82;
}

.tender-item-dates > span {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
}

.tender-closes {
  gap: 0.4rem !important;
  padding: 0.35rem 0.65rem;
  color: #382080;
  background: rgba(56, 32, 128, 0.08);
  border: 1px solid rgba(56, 32, 128, 0.18);
}

.tender-closes-label {
  font-size: 10px;
  font-weight: 800;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #6b5a9e;
}

.tender-closes strong {
  font-size: 12.5px;
  font-weight: 800;
  letter-spacing: 0.01em;
  color: #001038;
  font-variant-numeric: tabular-nums;
}

.tender-closes.is-urgent {
  color: #9a5b00;
  background: rgba(154, 91, 0, 0.1);
  border-color: rgba(154, 91, 0, 0.22);
}

.tender-closes.is-urgent .tender-closes-label {
  color: #b06d00;
}

.tender-closes.is-urgent strong {
  color: #7a4500;
}

.tender-closes.is-closed {
  color: #6b7c94;
  background: rgba(107, 124, 148, 0.1);
  border-color: rgba(107, 124, 148, 0.2);
}

.tender-closes.is-closed .tender-closes-label,
.tender-closes.is-closed strong {
  color: #5a6b82;
}

.tender-doc-count {
  color: #382080;
}

.tender-latest {
  margin: 0.75rem 0 0;
  padding-top: 0.7rem;
  border-top: 1px dashed rgba(56, 32, 128, 0.14);
  font-size: 12.5px;
  line-height: 1.45;
  color: #5a6b82;
}

.tender-latest strong {
  font-weight: 800;
  color: #382080;
}

.tender-item-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.tender-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  height: 2.45rem;
  padding: 0 0.95rem;
  font-size: 12.5px;
  font-weight: 700;
  text-decoration: none;
  border: 1px solid transparent;
  cursor: pointer;
  transition:
    background 0.2s ease,
    border-color 0.2s ease,
    color 0.2s ease,
    transform 0.2s ease;
}

.tender-btn--primary {
  color: #fff;
  background: #382080;
  border-color: #382080;
}

.tender-btn--primary:hover {
  background: #482888;
  border-color: #482888;
  transform: translateY(-1px);
}

.tender-btn--ghost {
  color: #382080;
  background: transparent;
  border-color: rgba(56, 32, 128, 0.2);
}

.tender-btn--ghost:hover,
.tender-btn--ghost.is-expanded {
  background: rgba(56, 32, 128, 0.06);
  border-color: rgba(56, 32, 128, 0.35);
}

.tender-btn--ghost svg {
  transition: transform 0.3s cubic-bezier(0.22, 1, 0.36, 1);
}

.tender-btn--ghost.is-expanded svg {
  transform: rotate(180deg);
}

.tender-btn--icon {
  width: 2.45rem;
  padding: 0;
  justify-content: center;
}

.tender-dossier {
  padding: 0 1.2rem 1.25rem;
  border-top: 1px solid rgba(56, 32, 128, 0.08);
  background: linear-gradient(180deg, #fbfafe 0%, #fff 100%);
}

@media (min-width: 900px) {
  .tender-dossier {
    padding: 0 1.4rem 1.4rem;
  }
}

.tender-dossier-intro {
  display: grid;
  gap: 1rem;
  padding: 1.15rem 0 1rem;
}

@media (min-width: 900px) {
  .tender-dossier-intro {
    grid-template-columns: minmax(0, 1.5fr) minmax(14rem, 1fr);
    gap: 1.5rem;
    align-items: start;
  }
}

.tender-dossier-summary {
  margin: 0;
  font-size: 13.5px;
  line-height: 1.6;
  color: #5a6b82;
}

.tender-dossier-facts {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 0.65rem;
  margin: 0;
}

.tender-dossier-facts dt {
  margin: 0 0 0.2rem;
  font-size: 10px;
  font-weight: 800;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: #8a97ab;
}

.tender-dossier-facts dd {
  margin: 0;
  font-size: 13px;
  font-weight: 700;
  color: #001038;
}

.tender-doc-trail {
  margin: 0;
  padding: 0.35rem 0 0;
  list-style: none;
}

.tender-doc {
  display: grid;
  grid-template-columns: 1.1rem minmax(0, 1fr);
  gap: 0.85rem;
  padding: 0.15rem 0 1rem;
}

@media (min-width: 700px) {
  .tender-doc {
    grid-template-columns: 1.1rem minmax(0, 1fr) auto;
    align-items: start;
  }
}

.tender-doc:last-child {
  padding-bottom: 0.25rem;
}

.tender-doc-rail {
  position: relative;
  display: flex;
  justify-content: center;
  min-height: 100%;
}

.tender-doc-dot {
  position: relative;
  z-index: 1;
  width: 0.65rem;
  height: 0.65rem;
  margin-top: 0.45rem;
  background: #382080;
  border: 2px solid #ebe6f5;
  box-shadow: 0 0 0 1px rgba(56, 32, 128, 0.25);
}

.tender-doc-line {
  position: absolute;
  top: 1.1rem;
  bottom: -1rem;
  left: 50%;
  width: 1px;
  background: linear-gradient(
    180deg,
    rgba(56, 32, 128, 0.35),
    rgba(56, 32, 128, 0.08)
  );
  transform: translateX(-50%);
}

.tender-doc-body {
  min-width: 0;
}

.tender-doc-head {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.45rem 0.7rem;
  margin-bottom: 0.35rem;
}

.tender-doc-kind {
  padding: 0.22rem 0.5rem;
  font-size: 10px;
  font-weight: 800;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  border: 1px solid transparent;
}

.tender-doc-kind.is-nit {
  color: #001038;
  background: rgba(0, 16, 56, 0.06);
  border-color: rgba(0, 16, 56, 0.12);
}

.tender-doc-kind.is-rfp {
  color: #382080;
  background: rgba(56, 32, 128, 0.08);
  border-color: rgba(56, 32, 128, 0.14);
}

.tender-doc-kind.is-corrigendum {
  color: #8a3d00;
  background: rgba(138, 61, 0, 0.08);
  border-color: rgba(138, 61, 0, 0.16);
}

.tender-doc-kind.is-clarification {
  color: #0b5f8a;
  background: rgba(11, 95, 138, 0.08);
  border-color: rgba(11, 95, 138, 0.16);
}

.tender-doc-kind.is-addendum {
  color: #5b3d8f;
  background: rgba(91, 61, 143, 0.08);
  border-color: rgba(91, 61, 143, 0.16);
}

.tender-doc-date,
.tender-doc-size {
  font-size: 11.5px;
  font-weight: 600;
  color: #8a97ab;
}

.tender-doc-title {
  margin: 0;
  font-size: 14px;
  font-weight: 700;
  line-height: 1.35;
  color: #001038;
}

.tender-doc-note {
  margin: 0.35rem 0 0;
  font-size: 12.5px;
  line-height: 1.5;
  color: #5a6b82;
}

.tender-doc-download {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  height: 2.3rem;
  padding: 0 0.85rem;
  margin-top: 0.15rem;
  font-size: 12px;
  font-weight: 700;
  color: #382080;
  text-decoration: none;
  background: rgba(56, 32, 128, 0.05);
  border: 1px solid rgba(56, 32, 128, 0.14);
  transition:
    background 0.2s ease,
    border-color 0.2s ease,
    transform 0.2s ease;
}

.tender-doc-download:hover {
  background: rgba(56, 32, 128, 0.1);
  border-color: rgba(56, 32, 128, 0.28);
  transform: translateY(-1px);
}

@media (max-width: 699px) {
  .tender-doc-download {
    grid-column: 2;
    justify-self: start;
  }
}

.tender-empty {
  margin: 2rem 0 0;
  padding: 2rem 1rem;
  text-align: center;
  font-size: 14px;
  font-weight: 600;
  color: #6b7c94;
}

@media (prefers-reduced-motion: reduce) {
  .tender-reveal,
  .tender-item,
  .tender-search-panel,
  .tender-btn--ghost svg,
  .tender-updated,
  .tender-closing-soon {
    opacity: 1;
    transform: none;
    transition: none;
    animation: none;
  }
}
</style>
