<script setup lang="ts">
import acsImg from '@/assets/images/officials/acs.png'
import femaleImg from '@/assets/images/officials/avatar-female.jpg'
import maleImg from '@/assets/images/officials/avatar-male.jpg'
import ceoImg from '@/assets/images/officials/ceo.png'
import cmImg from '@/assets/images/officials/cm1.png'
import deputyCmImg from '@/assets/images/officials/deputy-cm.png'
import { MapPin, Search, X } from 'lucide-vue-next'
import { computed, nextTick, onMounted, onUnmounted, ref } from 'vue'

type Gender = 'male' | 'female'
type CategoryId = 'all' | 'senior' | 'programme' | 'admin'

interface SeniorOfficial {
  id: number
  name: string
  designation: string
  organization: string
  image: string
  highlight?: boolean
}

interface TeamMember {
  id: number
  name: string
  designation: string
  unit: string
  location: string
  gender: Gender
  image?: string
}

interface TeamSection {
  id: 'programme' | 'admin'
  eyebrow: string
  title: string
  members: TeamMember[]
}

const categories: { id: CategoryId; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'senior', label: 'Senior officials' },
  { id: 'programme', label: 'Renewable energy delivery' },
  { id: 'admin', label: 'Support & coordination' },
]

const seniorOfficials: SeniorOfficial[] = [
  {
    id: 1,
    name: 'Shri Mohan Charan Majhi',
    designation: "Hon'ble Chief Minister, Odisha",
    organization: 'Government of Odisha',
    image: cmImg,
  },
  {
    id: 2,
    name: 'Shri Kanak Vardhan Singh Deo',
    designation: "Hon'ble Deputy Chief Minister, Odisha",
    organization: 'Government of Odisha',
    image: deputyCmImg,
  },
  {
    id: 3,
    name: 'Shri Vishal Kumar Dev, IAS',
    designation: 'Additional Chief Secretary, Energy',
    organization: 'Department of Energy',
    image: acsImg,
    highlight: true,
  },
  {
    id: 4,
    name: 'Shri Saidutta Biplab Keshari Pradhan',
    designation: 'Chief Executive Officer, OREDA',
    organization: 'OREDA',
    image: ceoImg,
  },
]

const stats = [
  { value: '04', label: 'Senior officials' },
  { value: '08', label: 'Programme wing' },
  { value: '06', label: 'Admin & support' },
  { value: '30', label: 'District coordinators' },
]

const teamSections: TeamSection[] = [
  {
    id: 'programme',
    eyebrow: 'Programme wing',
    title: 'Renewable energy delivery',
    members: [
      {
        id: 101,
        name: 'Shri Rakesh Kumar Sahoo',
        designation: 'Director, Renewable Energy Programmes',
        unit: 'Programme',
        location: 'Bhubaneswar',
        gender: 'male',
      },
      {
        id: 102,
        name: 'Smt. Priyanka Das',
        designation: 'Deputy Director, Solar Schemes',
        unit: 'Programme',
        location: 'Bhubaneswar',
        gender: 'female',
      },
      {
        id: 103,
        name: 'Shri Biswajit Mohapatra',
        designation: 'Project Manager, On-Grid Applications',
        unit: 'Programme',
        location: 'Bhubaneswar',
        gender: 'male',
      },
      {
        id: 104,
        name: 'Smt. Sneha Pattnaik',
        designation: 'Manager, Off-Grid & Rural Energy',
        unit: 'Programme',
        location: 'Bhubaneswar',
        gender: 'female',
      },
      {
        id: 105,
        name: 'Shri Surya Narayan Swain',
        designation: 'Technical Advisor, Hybrid Systems',
        unit: 'Technical',
        location: 'Bhubaneswar',
        gender: 'male',
      },
      {
        id: 106,
        name: 'Shri Pradeep Kumar Nayak',
        designation: 'Assistant Engineer, Electrical',
        unit: 'Technical',
        location: 'Bhubaneswar',
        gender: 'male',
      },
      {
        id: 107,
        name: 'Smt. Lipsa Routray',
        designation: 'Scheme Facilitation Officer',
        unit: 'Programme',
        location: 'Cuttack',
        gender: 'female',
      },
      {
        id: 108,
        name: 'Shri Niranjan Pradhan',
        designation: 'GIS & Monitoring Specialist',
        unit: 'Technical',
        location: 'Bhubaneswar',
        gender: 'male',
      },
    ],
  },
  {
    id: 'admin',
    eyebrow: 'Administration',
    title: 'Support & coordination',
    members: [
      {
        id: 201,
        name: 'Smt. Ananya Mishra, OAS',
        designation: 'Joint Secretary, Department of Energy',
        unit: 'Department',
        location: 'Bhubaneswar',
        gender: 'female',
      },
      {
        id: 202,
        name: 'Shri Ashok Kumar Behera',
        designation: 'Accounts Officer, OREDA',
        unit: 'Finance',
        location: 'Bhubaneswar',
        gender: 'male',
      },
      {
        id: 203,
        name: 'Smt. Madhusmita Jena',
        designation: 'Administrative Officer, Coordination',
        unit: 'Admin',
        location: 'Bhubaneswar',
        gender: 'female',
      },
      {
        id: 204,
        name: 'Smt. Dipti Ranjan Sahu',
        designation: 'Section Officer, Establishment',
        unit: 'Admin',
        location: 'Bhubaneswar',
        gender: 'female',
      },
      {
        id: 205,
        name: 'Shri Bikash Chandra Das',
        designation: 'Public Relations Officer',
        unit: 'Communications',
        location: 'Bhubaneswar',
        gender: 'male',
      },
      {
        id: 206,
        name: 'Smt. Ranjita Mohanty',
        designation: 'Office Superintendent',
        unit: 'Admin',
        location: 'Bhubaneswar',
        gender: 'female',
      },
    ],
  },
]

const activeCategory = ref<CategoryId>('all')
const searchOpen = ref(false)
const searchQuery = ref('')
const searchInputRef = ref<HTMLInputElement | null>(null)

const sectionRef = ref<HTMLElement | null>(null)
const inView = ref(false)
let observer: IntersectionObserver | null = null

function matchesQuery(name: string, designation: string) {
  const q = searchQuery.value.trim().toLowerCase()
  if (!q) return true
  return (
    name.toLowerCase().includes(q) || designation.toLowerCase().includes(q)
  )
}

const filteredSeniors = computed(() => {
  if (activeCategory.value !== 'all' && activeCategory.value !== 'senior') {
    return []
  }
  return seniorOfficials.filter((p) => matchesQuery(p.name, p.designation))
})

const filteredSections = computed(() =>
  teamSections
    .filter((section) => {
      if (activeCategory.value === 'all') return true
      if (activeCategory.value === 'senior') return false
      return section.id === activeCategory.value
    })
    .map((section) => ({
      ...section,
      members: section.members.filter((m) =>
        matchesQuery(m.name, m.designation),
      ),
    }))
    .filter((section) => section.members.length > 0),
)

const showSeniors = computed(() => filteredSeniors.value.length > 0)

const seniorCount = computed(() =>
  String(filteredSeniors.value.length).padStart(2, '0'),
)

function setCategory(id: CategoryId) {
  activeCategory.value = id
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

function memberImage(member: TeamMember) {
  if (member.image) return member.image
  return member.gender === 'female' ? femaleImg : maleImg
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
    ref="sectionRef"
    class="who-dir relative w-full overflow-hidden"
    aria-labelledby="who-senior-heading"
    :class="{ 'is-inview': inView }"
  >
    <div class="pointer-events-none absolute inset-0" aria-hidden="true">
      <div class="who-dir-base" />
      <div class="who-dir-mesh" />
    </div>

    <div class="relative mx-auto max-w-[1400px] px-4 pt-6 pb-12 sm:px-6 sm:pt-7 sm:pb-14 lg:px-8 lg:pt-8 lg:pb-16">
      <div class="who-toolbar who-reveal" style="--delay: 0ms">
        <div
          class="who-tabs"
          :class="{ 'is-dimmed': searchOpen }"
          role="tablist"
          aria-label="Filter leadership directory"
        >
          <button
            v-for="cat in categories"
            :key="cat.id"
            type="button"
            role="tab"
            class="who-tab"
            :class="{ 'is-active': activeCategory === cat.id }"
            :aria-selected="activeCategory === cat.id"
            @click="setCategory(cat.id)"
          >
            {{ cat.label }}
          </button>
        </div>

        <div class="who-search" :class="{ 'is-open': searchOpen }">
          <button
            v-show="!searchOpen"
            type="button"
            class="who-search-trigger"
            aria-label="Search by name or designation"
            @click="openSearch"
          >
            <Search :size="17" :stroke-width="2.2" />
          </button>

          <div class="who-search-panel" :aria-hidden="!searchOpen">
            <Search
              :size="16"
              :stroke-width="2.2"
              class="who-search-leading"
              aria-hidden="true"
            />
            <input
              ref="searchInputRef"
              v-model="searchQuery"
              type="search"
              class="who-search-input"
              placeholder="Search by name or designation…"
              aria-label="Search by name or designation"
              @keydown.escape="closeSearch"
            />
            <button
              type="button"
              class="who-search-close"
              aria-label="Close search"
              @click="closeSearch"
            >
              <X :size="16" :stroke-width="2.2" />
            </button>
          </div>
        </div>
      </div>

      <!-- Senior officials -->
      <div
        v-if="showSeniors || activeCategory === 'all' || activeCategory === 'senior'"
        class="who-reveal mt-8 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between"
        style="--delay: 40ms"
      >
        <div class="max-w-xl">
          <p class="who-eyebrow">Institutional leadership</p>
          <h2
            id="who-senior-heading"
            class="mt-2 font-display text-[clamp(1.7rem,3vw,2.35rem)] leading-[1.15] font-semibold tracking-[-0.015em] text-oreda-dark"
          >
            Senior officials
          </h2>
          <p class="mt-2 max-w-md text-[14px] leading-relaxed text-[#5a6b82]">
            Hon’ble leadership and senior officers guiding Odisha’s renewable
            energy mission.
          </p>
        </div>

        <div class="who-count" aria-label="Senior officials count">
          <span class="who-count-num">{{ seniorCount }}</span>
          <span class="who-count-bar" aria-hidden="true" />
          <span class="who-count-label">Senior officials</span>
        </div>
      </div>

      <ul v-if="showSeniors" class="who-senior-grid" role="list">
        <li
          v-for="(person, index) in filteredSeniors"
          :key="person.id"
          class="who-senior"
          :class="{ 'is-highlight': person.highlight }"
          :style="{ '--tile-delay': `${80 + index * 70}ms` }"
        >
          <div class="who-senior-top">
            <span class="who-senior-index">
              {{ String(index + 1).padStart(2, '0') }}
            </span>
            <span class="who-senior-badge">Senior official</span>
          </div>

          <div class="who-senior-photo">
            <img
              :src="person.image"
              :alt="person.name"
              class="who-senior-img"
              loading="lazy"
            />
          </div>

          <h3 class="who-senior-name">{{ person.name }}</h3>
          <p class="who-senior-role">{{ person.designation }}</p>
          <p class="who-senior-org">{{ person.organization }}</p>
        </li>
      </ul>

      <p
        v-else-if="!filteredSections.length"
        class="who-empty"
        role="status"
      >
        No people match your filter.
      </p>
    </div>

    <!-- Stats rail -->
    <div class="who-stats who-reveal" style="--delay: 120ms">
      <div class="mx-auto grid max-w-[1400px] gap-4 px-4 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8">
        <div
          v-for="(stat, index) in stats"
          :key="stat.label"
          class="who-stat"
          :style="{ '--stat-delay': `${140 + index * 50}ms` }"
        >
          <span class="who-stat-value">{{ stat.value }}</span>
          <span class="who-stat-label">{{ stat.label }}</span>
        </div>
      </div>
    </div>

    <!-- Team sections -->
    <div
      v-if="filteredSections.length"
      class="relative mx-auto max-w-[1400px] px-4 py-12 sm:px-6 sm:py-14 lg:px-8 lg:py-16"
    >
      <section
        v-for="(team, teamIndex) in filteredSections"
        :id="team.id"
        :key="team.id"
        class="who-team"
        :class="{ 'mt-14': teamIndex > 0 }"
        :aria-labelledby="`${team.id}-heading`"
      >
        <div
          class="who-reveal flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"
          :style="{ '--delay': `${80 + teamIndex * 40}ms` }"
        >
          <div>
            <p class="who-eyebrow">{{ team.eyebrow }}</p>
            <h3
              :id="`${team.id}-heading`"
              class="mt-2 font-display text-[clamp(1.45rem,2.5vw,1.95rem)] leading-[1.15] font-semibold tracking-[-0.015em] text-oreda-dark"
            >
              {{ team.title }}
            </h3>
          </div>
          <span class="who-team-badge">
            {{ String(team.members.length).padStart(2, '0') }} members
          </span>
        </div>

        <ul class="who-team-grid" role="list">
          <li
            v-for="(member, index) in team.members"
            :key="member.id"
            class="who-member"
            :style="{ '--tile-delay': `${100 + teamIndex * 40 + index * 45}ms` }"
          >
            <div class="who-member-photo">
              <img
                :src="memberImage(member)"
                :alt="member.name"
                class="who-member-img"
                loading="lazy"
              />
              <span class="who-member-shine" aria-hidden="true" />
            </div>
            <div class="who-member-copy">
              <span class="who-member-unit">{{ member.unit }}</span>
              <h4 class="who-member-name">{{ member.name }}</h4>
              <p class="who-member-role">{{ member.designation }}</p>
              <p class="who-member-loc">
                <MapPin :size="12" :stroke-width="2.2" aria-hidden="true" />
                <span>{{ member.location }}</span>
              </p>
            </div>
          </li>
        </ul>
      </section>
    </div>
  </section>
</template>

<style scoped>
.who-dir-base {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    165deg,
    #f7f5fc 0%,
    #f3f5f9 45%,
    #f8f6fc 100%
  );
}

.who-dir-mesh {
  position: absolute;
  inset: 0;
  opacity: 0.28;
  background-image:
    linear-gradient(rgba(0, 16, 56, 0.035) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0, 16, 56, 0.035) 1px, transparent 1px);
  background-size: 48px 48px;
  mask-image: radial-gradient(ellipse 80% 60% at 50% 0%, black 15%, transparent 75%);
}

.who-reveal {
  opacity: 0;
  transform: translateY(16px);
  transition:
    opacity 0.65s cubic-bezier(0.22, 1, 0.36, 1),
    transform 0.65s cubic-bezier(0.22, 1, 0.36, 1);
  transition-delay: var(--delay, 0ms);
}

.is-inview .who-reveal {
  opacity: 1;
  transform: translateY(0);
}

.who-toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  padding-bottom: 0.15rem;
  border-bottom: 1px solid rgba(56, 32, 128, 0.1);
}

.who-tabs {
  display: flex;
  min-width: 0;
  flex: 1;
  gap: 0.2rem;
  overflow-x: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;
  transition: opacity 0.3s ease;
}

.who-tabs::-webkit-scrollbar {
  display: none;
}

.who-tabs.is-dimmed {
  opacity: 0.35;
  pointer-events: none;
}

.who-tab {
  position: relative;
  flex-shrink: 0;
  padding: 0.8rem 0.95rem;
  font-size: 12.5px;
  font-weight: 700;
  letter-spacing: 0.03em;
  color: #6b7c94;
  background: transparent;
  border: 0;
  cursor: pointer;
  transition: color 0.2s ease;
}

.who-tab::after {
  content: '';
  position: absolute;
  right: 0.95rem;
  bottom: -1px;
  left: 0.95rem;
  height: 2px;
  background: #382080;
  transform: scaleX(0);
  transition: transform 0.25s cubic-bezier(0.22, 1, 0.36, 1);
}

.who-tab:hover {
  color: #001038;
}

.who-tab.is-active {
  color: #382080;
}

.who-tab.is-active::after {
  transform: scaleX(1);
}

.who-search {
  position: relative;
  z-index: 2;
  display: flex;
  width: 2.4rem;
  flex-shrink: 0;
  align-items: center;
  justify-content: flex-end;
}

.who-search-trigger {
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
    border-color 0.2s ease;
}

.who-search-trigger:hover {
  background: rgba(56, 32, 128, 0.06);
  border-color: rgba(56, 32, 128, 0.35);
}

.who-search-panel {
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

.who-search.is-open .who-search-panel {
  width: min(22rem, 72vw);
  opacity: 1;
  pointer-events: auto;
  border-color: rgba(56, 32, 128, 0.2);
  box-shadow: 0 10px 24px -16px rgba(0, 16, 56, 0.35);
}

.who-search-leading {
  flex-shrink: 0;
  margin-left: 0.7rem;
  color: #382080;
}

.who-search-input {
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

.who-search-input::placeholder {
  color: #9aa8bc;
}

.who-search-close {
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

.who-search-close:hover {
  color: #382080;
}

.who-empty {
  margin: 1.5rem 0 0;
  font-size: 14px;
  font-weight: 600;
  color: #6b7c94;
}

.who-eyebrow {
  margin: 0;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: #382080;
}

.who-count {
  display: inline-flex;
  align-items: center;
  gap: 0.7rem;
}

.who-count-num {
  font-family: var(--font-display);
  font-size: 2rem;
  font-weight: 600;
  line-height: 1;
  color: #001038;
}

.who-count-bar {
  width: 2px;
  height: 1.7rem;
  background: #382080;
}

.who-count-label {
  max-width: 5.5rem;
  font-size: 11px;
  font-weight: 700;
  line-height: 1.3;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #6b7c94;
}

.who-senior-grid {
  display: grid;
  gap: 1rem;
  margin: 1.75rem 0 0;
  padding: 0;
  list-style: none;
}

@media (min-width: 640px) {
  .who-senior-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (min-width: 1100px) {
  .who-senior-grid {
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 1.15rem;
  }
}

.who-senior {
  display: flex;
  flex-direction: column;
  padding: 1rem 1rem 1.15rem;
  background: #fff;
  border: 1px solid rgba(56, 32, 128, 0.1);
  box-shadow: 0 18px 36px -28px rgba(0, 16, 56, 0.4);
  opacity: 0;
  transform: translateY(18px);
  transition:
    opacity 0.55s cubic-bezier(0.22, 1, 0.36, 1),
    transform 0.55s cubic-bezier(0.22, 1, 0.36, 1),
    box-shadow 0.25s ease;
  transition-delay: var(--tile-delay, 0ms);
}

.is-inview .who-senior {
  opacity: 1;
  transform: translateY(0);
}

.who-senior:hover {
  transform: translateY(-4px);
  box-shadow: 0 24px 40px -24px rgba(0, 16, 56, 0.5);
}

.who-senior.is-highlight {
  color: #fff;
  background: linear-gradient(160deg, #382080 0%, #2e1968 100%);
  border-color: transparent;
}

.who-senior-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  margin-bottom: 0.85rem;
}

.who-senior-index {
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.08em;
  color: #8a97ab;
  font-variant-numeric: tabular-nums;
}

.who-senior.is-highlight .who-senior-index {
  color: rgba(255, 255, 255, 0.55);
}

.who-senior-badge {
  padding: 0.28rem 0.55rem;
  font-size: 9px;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #382080;
  background: rgba(56, 32, 128, 0.08);
  border: 1px solid rgba(56, 32, 128, 0.12);
}

.who-senior.is-highlight .who-senior-badge {
  color: #fff;
  background: rgba(255, 255, 255, 0.14);
  border-color: rgba(255, 255, 255, 0.2);
}

.who-senior-photo {
  overflow: hidden;
  aspect-ratio: 1 / 1;
  background: #ebe6f5;
  border: 1px solid rgba(56, 32, 128, 0.1);
}

.who-senior.is-highlight .who-senior-photo {
  border-color: rgba(255, 255, 255, 0.18);
}

.who-senior-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center top;
  transition: transform 0.7s cubic-bezier(0.22, 1, 0.36, 1);
}

.who-senior:hover .who-senior-img {
  transform: scale(1.05);
}

.who-senior-name {
  margin: 0.9rem 0 0;
  font-family: var(--font-display);
  font-size: clamp(1.05rem, 1.5vw, 1.18rem);
  font-weight: 600;
  line-height: 1.25;
  letter-spacing: -0.01em;
  color: #001038;
}

.who-senior.is-highlight .who-senior-name {
  color: #fff;
}

.who-senior-role {
  margin: 0.4rem 0 0;
  font-size: 12.5px;
  line-height: 1.45;
  color: #5a6b82;
}

.who-senior.is-highlight .who-senior-role {
  color: rgba(255, 255, 255, 0.72);
}

.who-senior-org {
  margin: 0.85rem 0 0;
  padding-top: 0.75rem;
  border-top: 1px solid rgba(56, 32, 128, 0.1);
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: #382080;
}

.who-senior.is-highlight .who-senior-org {
  border-top-color: rgba(255, 255, 255, 0.18);
  color: rgba(255, 255, 255, 0.75);
}

.who-stats {
  background: linear-gradient(115deg, #382080 0%, #2e1968 55%, #241456 100%);
  padding: 1.35rem 0;
}

.who-stat {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
  padding: 0.35rem 0.75rem;
  text-align: center;
  opacity: 0;
  transform: translateY(10px);
  transition:
    opacity 0.45s ease,
    transform 0.45s ease;
  transition-delay: var(--stat-delay, 0ms);
}

@media (min-width: 1024px) {
  .who-stat + .who-stat {
    border-left: 1px solid rgba(255, 255, 255, 0.18);
  }
}

.is-inview .who-stat {
  opacity: 1;
  transform: translateY(0);
}

.who-stat-value {
  font-family: var(--font-display);
  font-size: 1.65rem;
  font-weight: 600;
  line-height: 1;
  color: #fff;
}

.who-stat-label {
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.7);
}

.who-team-badge {
  display: inline-flex;
  align-items: center;
  padding: 0.4rem 0.7rem;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #382080;
  background: rgba(56, 32, 128, 0.08);
  border: 1px solid rgba(56, 32, 128, 0.12);
}

.who-team-grid {
  display: grid;
  gap: 0.9rem;
  margin: 1.75rem 0 0;
  padding: 0;
  list-style: none;
}

@media (min-width: 700px) {
  .who-team-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (min-width: 1100px) {
  .who-team-grid {
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 1rem;
  }
}

.who-member {
  position: relative;
  display: grid;
  grid-template-columns: 5.75rem minmax(0, 1fr);
  overflow: hidden;
  background: linear-gradient(145deg, #ffffff 0%, #fbfafd 100%);
  border: 1px solid rgba(56, 32, 128, 0.1);
  box-shadow:
    0 14px 30px -24px rgba(0, 16, 56, 0.4),
    inset 0 1px 0 rgba(255, 255, 255, 0.9);
  opacity: 0;
  transform: translateY(14px);
  transition:
    opacity 0.45s cubic-bezier(0.22, 1, 0.36, 1),
    transform 0.45s cubic-bezier(0.22, 1, 0.36, 1),
    border-color 0.25s ease,
    box-shadow 0.25s ease;
  transition-delay: var(--tile-delay, 0ms);
}

.who-member::before {
  content: '';
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 2;
  width: 3px;
  background: linear-gradient(180deg, #382080, #8b6fd4);
  opacity: 0;
  transition: opacity 0.25s ease;
}

.is-inview .who-member {
  opacity: 1;
  transform: translateY(0);
}

.who-member:hover {
  border-color: rgba(56, 32, 128, 0.24);
  box-shadow: 0 20px 36px -22px rgba(0, 16, 56, 0.5);
  transform: translateY(-3px);
}

.who-member:hover::before {
  opacity: 1;
}

.who-member-photo {
  position: relative;
  overflow: hidden;
  background: linear-gradient(160deg, #ebe6f5 0%, #ddd5ef 100%);
}

.who-member-img {
  width: 100%;
  height: 100%;
  min-height: 7.25rem;
  object-fit: cover;
  object-position: center top;
  transition: transform 0.7s cubic-bezier(0.22, 1, 0.36, 1);
}

.who-member:hover .who-member-img {
  transform: scale(1.08);
}

.who-member-shine {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    125deg,
    transparent 35%,
    rgba(255, 255, 255, 0.18) 48%,
    transparent 62%
  );
  opacity: 0;
  transform: translateX(-20%);
  transition:
    opacity 0.4s ease,
    transform 0.65s cubic-bezier(0.22, 1, 0.36, 1);
  pointer-events: none;
}

.who-member:hover .who-member-shine {
  opacity: 1;
  transform: translateX(25%);
}

.who-member-copy {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0.28rem;
  padding: 0.9rem 0.95rem 0.95rem;
}

.who-member-unit {
  display: inline-flex;
  align-self: flex-start;
  padding: 0.22rem 0.45rem;
  margin: 0;
  font-size: 9.5px;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: #382080;
  background: rgba(56, 32, 128, 0.08);
  border: 1px solid rgba(56, 32, 128, 0.12);
}

.who-member-name {
  margin: 0.15rem 0 0;
  font-family: var(--font-display);
  font-size: 14.5px;
  font-weight: 600;
  line-height: 1.25;
  letter-spacing: -0.01em;
  color: #001038;
}

.who-member-role {
  margin: 0;
  font-size: 12px;
  line-height: 1.45;
  color: #5a6b82;
}

.who-member-loc {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  margin: 0.35rem 0 0;
  padding-top: 0.45rem;
  border-top: 1px solid rgba(56, 32, 128, 0.08);
  font-size: 11.5px;
  font-weight: 600;
  color: #6b7c94;
}

@media (prefers-reduced-motion: reduce) {
  .who-reveal,
  .who-senior,
  .who-member,
  .who-stat,
  .who-senior-img,
  .who-member-img {
    opacity: 1;
    transform: none;
    transition: none;
  }
}
</style>
