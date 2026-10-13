<script setup lang="ts">
import { ArrowRight, ChevronDown, Download, Search, X } from 'lucide-vue-next'
import { computed, nextTick, onMounted, onUnmounted, ref } from 'vue'

type Dept = 'All' | 'Engineering' | 'Programmes' | 'Administration' | 'Finance'

interface JobDocument {
  label: string
  href: string
}

interface Opening {
  id: number
  title: string
  department: Exclude<Dept, 'All'>
  location: string
  type: string
  code: string
  openDate: string
  lastDate: string
  summary: string
  responsibilities: string[]
  requirements: string[]
  document?: JobDocument
}

const departments: Dept[] = [
  'All',
  'Engineering',
  'Programmes',
  'Administration',
  'Finance',
]

const openings: Opening[] = [
  {
    id: 1,
    title: 'Project Engineer — Solar',
    department: 'Engineering',
    location: 'Bhubaneswar',
    type: 'Full-time',
    code: 'OREDA/ENG/01',
    openDate: '01 Oct 2026',
    lastDate: '31 Oct 2026',
    summary:
      'Support planning, execution and monitoring of solar projects and installations under OREDA programmes.',
    responsibilities: [
      'Coordinate site surveys, technical assessments and vendor coordination.',
      'Monitor installation progress and ensure quality & safety compliance.',
      'Prepare technical reports and support scheme documentation.',
    ],
    requirements: [
      'B.Tech / B.E. in Electrical / Energy / related discipline.',
      '2+ years experience in solar or renewable project delivery preferred.',
      'Strong field coordination and reporting skills.',
    ],
    document: {
      label: 'Advertisement PDF',
      href: '/documents/careers/project-engineer-solar.pdf',
    },
  },
  {
    id: 2,
    title: 'Scheme Coordination Officer',
    department: 'Programmes',
    location: 'Bhubaneswar',
    type: 'Full-time',
    code: 'OREDA/PRG/02',
    openDate: '05 Oct 2026',
    lastDate: '05 Nov 2026',
    summary:
      'Drive citizen scheme facilitation, outreach support and inter-department coordination for renewable programmes.',
    responsibilities: [
      'Support application facilitation and stakeholder communication.',
      'Track scheme progress and prepare status updates.',
      'Coordinate with district units and partner agencies.',
    ],
    requirements: [
      'Graduate in any discipline; postgraduate preferred.',
      'Experience in government schemes or programme management is an advantage.',
      'Clear written and verbal communication skills.',
    ],
    document: {
      label: 'Detailed notification',
      href: '/documents/careers/scheme-coordination-officer.pdf',
    },
  },
  {
    id: 3,
    title: 'Electrical Engineer',
    department: 'Engineering',
    location: 'Bhubaneswar / Field',
    type: 'Full-time',
    code: 'OREDA/ENG/03',
    openDate: '08 Oct 2026',
    lastDate: '08 Nov 2026',
    summary:
      'Provide electrical engineering support for off-grid and on-grid renewable energy applications.',
    responsibilities: [
      'Review designs, BOQs and technical proposals.',
      'Support inspection, testing and commissioning activities.',
      'Advise on grid interconnection and system performance.',
    ],
    requirements: [
      'B.Tech / B.E. in Electrical Engineering.',
      'Knowledge of solar PV systems and distribution networks.',
      'Willingness for field travel across Odisha.',
    ],
    document: {
      label: 'Job description PDF',
      href: '/documents/careers/electrical-engineer.pdf',
    },
  },
  {
    id: 4,
    title: 'Accounts Assistant',
    department: 'Finance',
    location: 'Bhubaneswar',
    type: 'Full-time',
    code: 'OREDA/FIN/04',
    openDate: '10 Oct 2026',
    lastDate: '10 Nov 2026',
    summary:
      'Assist with accounting, bill processing and financial documentation for OREDA operations and schemes.',
    responsibilities: [
      'Maintain books, vouchers and payment records.',
      'Support audit documentation and financial reporting.',
      'Process bills and coordinate with banks/vendors as required.',
    ],
    requirements: [
      'B.Com / M.Com or equivalent.',
      'Working knowledge of Tally or similar accounting tools.',
      'Attention to detail and confidentiality.',
    ],
  },
  {
    id: 5,
    title: 'Administrative Officer',
    department: 'Administration',
    location: 'Bhubaneswar',
    type: 'Full-time',
    code: 'OREDA/ADM/05',
    openDate: '12 Oct 2026',
    lastDate: '12 Nov 2026',
    summary:
      'Manage office administration, correspondence and institutional support functions.',
    responsibilities: [
      'Handle official correspondence and file management.',
      'Support procurement logistics and facility coordination.',
      'Assist leadership with scheduling and institutional processes.',
    ],
    requirements: [
      'Graduate with relevant administrative experience.',
      'Strong organisational and documentation skills.',
      'Familiarity with government office procedures preferred.',
    ],
    document: {
      label: 'Recruitment notice',
      href: '/documents/careers/administrative-officer.pdf',
    },
  },
  {
    id: 6,
    title: 'GIS & Data Analyst',
    department: 'Programmes',
    location: 'Bhubaneswar',
    type: 'Contract',
    code: 'OREDA/PRG/06',
    openDate: '15 Oct 2026',
    lastDate: '15 Nov 2026',
    summary:
      'Analyse geospatial and programme data to support planning, monitoring and reporting of renewable initiatives.',
    responsibilities: [
      'Maintain GIS datasets and generate thematic maps.',
      'Support dashboards and progress analytics for schemes.',
      'Prepare visual reports for internal and stakeholder use.',
    ],
    requirements: [
      'Degree in Geography / Remote Sensing / IT / related field.',
      'Hands-on experience with GIS tools (QGIS / ArcGIS).',
      'Comfort with spreadsheets and basic data visualisation.',
    ],
  },
]

const activeDept = ref<Dept>('All')
const expandedId = ref<number | null>(null)
const searchOpen = ref(false)
const searchQuery = ref('')
const searchInputRef = ref<HTMLInputElement | null>(null)
const sectionRef = ref<HTMLElement | null>(null)
const inView = ref(false)
let observer: IntersectionObserver | null = null

const filtered = computed(() => {
  const query = searchQuery.value.trim().toLowerCase()
  return openings.filter((job) => {
    const matchesDept =
      activeDept.value === 'All' || job.department === activeDept.value
    if (!matchesDept) return false
    if (!query) return true
    const haystack = [
      job.title,
      job.department,
      job.code,
      job.location,
      job.type,
      job.summary,
    ]
      .join(' ')
      .toLowerCase()
    return haystack.includes(query)
  })
})

function setDept(dept: Dept) {
  activeDept.value = dept
  expandedId.value = null
}

function toggle(id: number) {
  expandedId.value = expandedId.value === id ? null : id
}

async function openSearch() {
  searchOpen.value = true
  await nextTick()
  searchInputRef.value?.focus()
}

function closeSearch() {
  searchOpen.value = false
  searchQuery.value = ''
  expandedId.value = null
}

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
    id="career-openings"
    ref="sectionRef"
    class="career-jobs relative w-full overflow-hidden scroll-mt-24"
    aria-labelledby="career-jobs-heading"
    :class="{ 'is-inview': inView }"
  >
    <div class="pointer-events-none absolute inset-0" aria-hidden="true">
      <div class="career-jobs-base" />
      <div class="career-jobs-mesh" />
    </div>

    <div class="relative mx-auto max-w-[1400px] px-4 py-12 sm:px-6 sm:py-14 lg:px-8 lg:py-16">
      <div
        class="career-reveal flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between"
        style="--delay: 0ms"
      >
        <div class="max-w-xl">
          <div class="flex items-center gap-3">
            <span class="h-[2px] w-7 bg-oreda" aria-hidden="true" />
            <p class="text-[11px] font-bold tracking-[0.2em] text-oreda uppercase">
              Current openings
            </p>
          </div>
          <h2
            id="career-jobs-heading"
            class="mt-3 font-display text-[clamp(1.55rem,2.8vw,2.2rem)] leading-[1.15] font-semibold tracking-[-0.015em] text-oreda-dark"
          >
            Explore roles and download
            <em class="font-display not-italic text-oreda">official notices</em>
            where available.
          </h2>
        </div>
        <p class="text-[13px] font-semibold tracking-wide text-[#6b7c94] lg:pb-1">
          {{ filtered.length }}
          {{ filtered.length === 1 ? 'position' : 'positions' }}
        </p>
      </div>

      <div
        class="career-reveal career-toolbar mt-8 border-b border-oreda/10"
        style="--delay: 50ms"
      >
        <div
          class="career-tabs"
          :class="{ 'is-dimmed': searchOpen }"
          role="tablist"
          aria-label="Filter by department"
        >
          <button
            v-for="dept in departments"
            :key="dept"
            type="button"
            role="tab"
            class="career-filter"
            :class="{ 'is-active': activeDept === dept }"
            :aria-selected="activeDept === dept"
            @click="setDept(dept)"
          >
            {{ dept }}
          </button>
        </div>

        <div class="career-search" :class="{ 'is-open': searchOpen }">
          <button
            v-show="!searchOpen"
            type="button"
            class="career-search-trigger"
            aria-label="Search openings"
            @click="openSearch"
          >
            <Search :size="17" :stroke-width="2.2" />
          </button>

          <div class="career-search-panel" :aria-hidden="!searchOpen">
            <Search
              :size="16"
              :stroke-width="2.2"
              class="career-search-leading"
              aria-hidden="true"
            />
            <input
              ref="searchInputRef"
              v-model="searchQuery"
              type="search"
              class="career-search-input"
              placeholder="Search jobs by title, code, location…"
              aria-label="Search job openings"
              @keydown.escape="closeSearch"
            />
            <button
              type="button"
              class="career-search-close"
              aria-label="Close search"
              @click="closeSearch"
            >
              <X :size="16" :stroke-width="2.2" />
            </button>
          </div>
        </div>
      </div>

      <ul :key="activeDept" class="career-board mt-6" role="list">
        <li
          v-for="(job, index) in filtered"
          :key="job.id"
          class="career-role"
          :class="{ 'is-open': expandedId === job.id }"
          :style="{ '--job-delay': `${70 + index * 50}ms` }"
        >
          <div class="career-role-row">
            <!-- Left: identity -->
            <div class="career-role-identity">
              <p class="career-role-eyebrow">
                <span class="career-role-dept">{{ job.department }}</span>
                <span class="career-role-sep" aria-hidden="true" />
                <span class="career-role-code">{{ job.code }}</span>
              </p>
              <h3 class="career-role-title">{{ job.title }}</h3>
              <p class="career-role-meta">
                {{ job.location }}
                <span aria-hidden="true"> • </span>
                {{ job.type }}
              </p>
            </div>

            <!-- Middle: dates -->
            <div class="career-role-dates" aria-label="Application dates">
              <div class="career-date">
                <span class="career-date-label">Opening Date</span>
                <span class="career-date-value">{{ job.openDate }}</span>
              </div>
              <div class="career-date">
                <span class="career-date-label">Last Date</span>
                <span class="career-date-value">{{ job.lastDate }}</span>
              </div>
            </div>

            <!-- Right: actions -->
            <div class="career-role-actions">
              <a
                v-if="job.document"
                :href="job.document.href"
                class="career-btn career-btn--outline"
                download
                target="_blank"
                rel="noopener noreferrer"
              >
                <Download :size="14" :stroke-width="2.2" />
                Download
              </a>
              <a
                :href="`mailto:ceoreda@oredaorissa.com?subject=${encodeURIComponent(`Application for ${job.title}`)}`"
                class="career-btn career-btn--solid"
              >
                Apply Now
                <ArrowRight :size="14" :stroke-width="2.4" />
              </a>
              <button
                type="button"
                class="career-btn career-btn--icon"
                :class="{ 'is-open': expandedId === job.id }"
                :aria-expanded="expandedId === job.id"
                :aria-label="expandedId === job.id ? 'Hide details' : 'View details'"
                @click="toggle(job.id)"
              >
                <ChevronDown :size="18" :stroke-width="2.2" />
              </button>
            </div>
          </div>

          <div v-show="expandedId === job.id" class="career-role-body">
            <p class="career-role-summary">{{ job.summary }}</p>
            <div class="career-role-split">
              <div>
                <p class="career-body-label">Key responsibilities</p>
                <ul class="career-body-list" role="list">
                  <li v-for="item in job.responsibilities" :key="item">
                    {{ item }}
                  </li>
                </ul>
              </div>
              <div>
                <p class="career-body-label">Requirements</p>
                <ul class="career-body-list" role="list">
                  <li v-for="item in job.requirements" :key="item">
                    {{ item }}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </li>
      </ul>

      <p
        v-if="!filtered.length"
        class="mt-10 text-center text-[14px] text-[#6b7c94]"
      >
        <template v-if="searchQuery.trim()">
          No openings match “{{ searchQuery.trim() }}”.
        </template>
        <template v-else>
          No openings in this department right now. Check back soon.
        </template>
      </p>
    </div>
  </section>
</template>

<style scoped>
.career-jobs-base {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    165deg,
    #f4f6fa 0%,
    #eef1f7 42%,
    #f6f4fb 100%
  );
}

.career-jobs-mesh {
  position: absolute;
  inset: 0;
  opacity: 0.32;
  background-image:
    linear-gradient(rgba(0, 16, 56, 0.04) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0, 16, 56, 0.04) 1px, transparent 1px);
  background-size: 48px 48px;
  mask-image: radial-gradient(ellipse 80% 70% at 50% 0%, black 20%, transparent 78%);
}

.career-reveal {
  opacity: 0;
  transform: translateY(16px);
  transition:
    opacity 0.65s cubic-bezier(0.22, 1, 0.36, 1),
    transform 0.65s cubic-bezier(0.22, 1, 0.36, 1);
  transition-delay: var(--delay, 0ms);
}

.is-inview .career-reveal {
  opacity: 1;
  transform: translateY(0);
}

.career-toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
}

.career-tabs {
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

.career-tabs::-webkit-scrollbar {
  display: none;
}

.career-tabs.is-dimmed {
  opacity: 0.35;
  pointer-events: none;
}

.career-filter {
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

.career-filter::after {
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

.career-filter:hover {
  color: #001038;
}

.career-filter.is-active {
  color: #382080;
}

.career-filter.is-active::after {
  transform: scaleX(1);
}

.career-search {
  position: relative;
  z-index: 2;
  display: flex;
  width: 2.4rem;
  flex-shrink: 0;
  align-items: center;
  justify-content: flex-end;
}

.career-search-trigger {
  display: grid;
  place-items: center;
  width: 2.4rem;
  height: 2.4rem;
  color: #382080;
  background: transparent;
  border: 1px solid rgba(56, 32, 128, 0.18);
  cursor: pointer;
  transition:
    background 0.2s ease,
    border-color 0.2s ease,
    opacity 0.2s ease;
}

.career-search-trigger:hover {
  background: rgba(56, 32, 128, 0.06);
  border-color: rgba(56, 32, 128, 0.35);
}

.career-search-panel {
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

.career-search.is-open .career-search-panel {
  width: min(22rem, 72vw);
  opacity: 1;
  pointer-events: auto;
  border-color: rgba(56, 32, 128, 0.2);
  box-shadow: 0 10px 24px -16px rgba(0, 16, 56, 0.35);
}

.career-search-leading {
  flex-shrink: 0;
  margin-left: 0.7rem;
  color: #382080;
}

.career-search-input {
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

.career-search-input::placeholder {
  color: #9aa8bc;
}

.career-search-input::-webkit-search-cancel-button {
  display: none;
}

.career-search-close {
  display: grid;
  place-items: center;
  width: 2.1rem;
  height: 2.1rem;
  flex-shrink: 0;
  margin-right: 0.2rem;
  color: #6b7c94;
  background: transparent;
  border: 0;
  cursor: pointer;
  transition: color 0.2s ease;
}

.career-search-close:hover {
  color: #382080;
}

.career-board {
  margin: 1.5rem 0 0;
  padding: 0;
  list-style: none;
  background: #fff;
  border: 1px solid rgba(0, 16, 56, 0.08);
  box-shadow: 0 18px 40px -32px rgba(0, 16, 56, 0.35);
}

.career-role {
  border-bottom: 1px solid rgba(0, 16, 56, 0.08);
  opacity: 0;
  transform: translateY(12px);
  transition:
    opacity 0.5s cubic-bezier(0.22, 1, 0.36, 1),
    transform 0.5s cubic-bezier(0.22, 1, 0.36, 1),
    background 0.2s ease;
  transition-delay: var(--job-delay, 0ms);
}

.career-role:last-child {
  border-bottom: 0;
}

.is-inview .career-role {
  opacity: 1;
  transform: translateY(0);
}

.career-role:hover,
.career-role.is-open {
  background: #faf9fc;
}

.career-role-row {
  display: grid;
  gap: 1.15rem;
  padding: 1.25rem 1.15rem;
}

@media (min-width: 1024px) {
  .career-role-row {
    grid-template-columns: minmax(0, 1.35fr) auto minmax(15rem, 0.85fr);
    align-items: center;
    gap: 0;
    padding: 1.4rem 1.5rem;
  }
}

.career-role-identity {
  min-width: 0;
}

@media (min-width: 1024px) {
  .career-role-identity {
    padding-right: 1.5rem;
  }
}

.career-role-eyebrow {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.55rem;
  margin: 0;
}

.career-role-dept {
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: #382080;
}

.career-role-sep {
  width: 1px;
  height: 0.85rem;
  background: rgba(0, 16, 56, 0.18);
}

.career-role-code {
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.04em;
  color: #8a97ab;
}

.career-role-title {
  margin: 0.4rem 0 0;
  font-family: var(--font-display);
  font-size: clamp(1.2rem, 2vw, 1.45rem);
  font-weight: 600;
  line-height: 1.25;
  letter-spacing: -0.015em;
  color: #001038;
}

.career-role-meta {
  margin: 0.4rem 0 0;
  font-size: 13.5px;
  color: #7a889c;
}

.career-role-dates {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1rem;
}

@media (min-width: 1024px) {
  .career-role-dates {
    gap: 1.35rem;
    padding: 0 1.5rem;
  }
}

.career-date {
  display: flex;
  flex-direction: column;
  gap: 0.28rem;
}

@media (min-width: 1024px) {
  .career-date + .career-date {
    padding-left: 1.35rem;
    border-left: 1px solid rgba(0, 16, 56, 0.1);
  }
}

.career-date-label {
  font-size: 11px;
  font-weight: 600;
  color: #8a97ab;
}

.career-date-value {
  font-size: 14px;
  font-weight: 700;
  color: #001038;
  letter-spacing: -0.01em;
}

.career-role-actions {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.5rem;
}

@media (min-width: 1024px) {
  .career-role-actions {
    justify-content: flex-end;
    flex-wrap: nowrap;
    padding-left: 1.5rem;
  }
}

.career-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  min-height: 2.45rem;
  padding: 0.55rem 0.9rem;
  font-size: 12.5px;
  font-weight: 700;
  text-decoration: none;
  border: 1px solid transparent;
  cursor: pointer;
  transition:
    background 0.2s ease,
    border-color 0.2s ease,
    color 0.2s ease,
    box-shadow 0.2s ease,
    transform 0.2s ease;
}

.career-btn--outline {
  color: #382080;
  background: #fff;
  border-color: rgba(56, 32, 128, 0.35);
}

.career-btn--outline:hover {
  background: rgba(56, 32, 128, 0.05);
  border-color: #382080;
}

.career-btn--solid {
  color: #fff;
  background: #382080;
  box-shadow: 0 8px 18px -10px rgba(56, 32, 128, 0.55);
}

.career-btn--solid:hover {
  background: #2e1968;
}

.career-btn--icon {
  width: 2.45rem;
  min-width: 2.45rem;
  padding: 0;
  color: #382080;
  background: #fff;
  border-color: rgba(56, 32, 128, 0.35);
}

.career-btn--icon:hover {
  background: rgba(56, 32, 128, 0.05);
  border-color: #382080;
}

.career-btn--icon.is-open {
  background: rgba(56, 32, 128, 0.08);
  border-color: #382080;
}

.career-btn--icon.is-open svg {
  transform: rotate(180deg);
}

.career-btn--icon svg {
  transition: transform 0.25s ease;
}

.career-role-body {
  padding: 0 1.15rem 1.3rem;
  animation: role-body-in 0.3s cubic-bezier(0.22, 1, 0.36, 1);
}

@media (min-width: 1024px) {
  .career-role-body {
    padding: 0 1.5rem 1.45rem;
  }
}

.career-role-summary {
  margin: 0;
  max-width: 48rem;
  padding-top: 1rem;
  border-top: 1px solid rgba(0, 16, 56, 0.08);
  font-size: 14px;
  line-height: 1.65;
  color: #5a6b82;
}

.career-role-split {
  display: grid;
  gap: 1.25rem;
  margin-top: 1.15rem;
}

@media (min-width: 768px) {
  .career-role-split {
    grid-template-columns: 1fr 1fr;
    gap: 1.75rem;
  }
}

.career-body-label {
  margin: 0;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: #382080;
}

.career-body-list {
  margin: 0.55rem 0 0;
  padding: 0;
  list-style: none;
}

.career-body-list li {
  position: relative;
  padding: 0.28rem 0 0.28rem 0.85rem;
  font-size: 13.5px;
  line-height: 1.55;
  color: #4a5d75;
}

.career-body-list li::before {
  content: '';
  position: absolute;
  top: 0.75rem;
  left: 0;
  width: 4px;
  height: 4px;
  background: #382080;
}

@keyframes role-body-in {
  from {
    opacity: 0;
    transform: translateY(-6px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (prefers-reduced-motion: reduce) {
  .career-reveal,
  .career-role,
  .career-role-body {
    opacity: 1;
    transform: none;
    transition: none;
    animation: none;
  }
}
</style>

