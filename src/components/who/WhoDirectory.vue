<script setup lang="ts">
import acsImg from '@/assets/images/officials/acs.png'
import femaleImg from '@/assets/images/officials/avatar-female.jpg'
import maleImg from '@/assets/images/officials/avatar-male.jpg'
import ceoImg from '@/assets/images/officials/ceo.png'
import cmImg from '@/assets/images/officials/cm.png'
import deputyCmImg from '@/assets/images/officials/deputy-cm.png'
import { MapPin } from 'lucide-vue-next'
import { computed, onMounted, onUnmounted, ref } from 'vue'

type Gender = 'male' | 'female'

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
  id: string
  eyebrow: string
  title: string
  members: TeamMember[]
}

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
    name: 'Shri Debashis Mohanty',
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

const sectionRef = ref<HTMLElement | null>(null)
const inView = ref(false)
let observer: IntersectionObserver | null = null

const seniorCount = computed(() =>
  String(seniorOfficials.length).padStart(2, '0'),
)

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

    <div class="relative mx-auto max-w-[1400px] px-4 py-12 sm:px-6 sm:py-14 lg:px-8 lg:py-16">
      <!-- Senior officials -->
      <div
        class="who-reveal flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between"
        style="--delay: 0ms"
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

      <ul class="who-senior-grid" role="list">
        <li
          v-for="(person, index) in seniorOfficials"
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
    <div class="relative mx-auto max-w-[1400px] px-4 py-12 sm:px-6 sm:py-14 lg:px-8 lg:py-16">
      <section
        v-for="(team, teamIndex) in teamSections"
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
