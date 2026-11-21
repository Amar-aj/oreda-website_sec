<script setup lang="ts">
import acsImg from '@/assets/images/officials/acs.png'
import ceoImg from '@/assets/images/officials/ceo.png'
import cmImg from '@/assets/images/officials/cm.png'
import deputyCmImg from '@/assets/images/officials/deputy-cm.png'
import SiteSearch from '@/components/layout/SiteSearch.vue'
import { useWeather } from '@/composables/useWeather'
import type { NavLink, Official } from '@/types'
import { ChevronDown, Contrast, Mail, Menu, Phone, Search, X } from 'lucide-vue-next'
import { ref, watch } from 'vue'
import { RouterLink, useRoute } from 'vue-router'

const route = useRoute()
const fontSize = ref<'sm' | 'base' | 'lg'>('base')
const highContrast = ref(false)
const mobileOpen = ref(false)
const searchOpen = ref(false)
const openDropdown = ref<string | null>(null)
const { weather, loading: weatherLoading, displayTemp } = useWeather()

const officials: { left: Official[]; right: Official[] } = {
  left: [
    {
      name: 'Shri Mohan Charan Majhi',
      title: "Hon'ble Chief Minister",
      image: cmImg,
    },
    {
      name: 'Shri Kanak Vardhan Singh Deo',
      title: "Hon'ble Deputy Chief Minister",
      image: deputyCmImg,
    },
  ],
  right: [
    {
      name: 'Shri Vishal Kumar Dev, IAS',
      title: 'Additional Chief Secretary',
      image: acsImg,
    },
    {
      name: 'Shri Saidutta Biplab Keshari Pradhan',
      title: 'Chief Executive Officer',
      image: ceoImg,
    },
  ],
}

const allOfficials = [...officials.left, ...officials.right]

const navLinks: NavLink[] = [
  { label: 'Home', to: '/', hasDropdown: false },
  {
    label: 'Organisation',
    hasDropdown: true,
    children: [
      { label: 'About Us', to: '/about' },
      { label: 'Leadership', to: '/leadership' },
      { label: 'Career', to: '/career' },
      { label: 'Memorandum of Understanding', to: '/mou' },
    ],
  },
  
  { label: 'Tenders', to: '/tenders', hasDropdown: false },
  { label: 'Photo Gallery', to: '/gallery', hasDropdown: false },
  { label: 'Awards & Recognition', to: '/awards', hasDropdown: false },
  {
    label: 'Re-Connect Portal',
    to: 'https://reconnect.odisha.gov.in/',
    external: true,
    hasDropdown: false,
  },
  {
    label: 'Bhubaneswar Solar City Portal',
    to: 'https://recitybhubaneswar.odisha.gov.in/home',
    external: true,
    hasDropdown: false,
  },
  { label: 'Contact Us', to: '/contact', hasDropdown: false },
]

function isActive(link: NavLink) {
  if (link.children?.length) {
    return link.children.some((child) => route.path.startsWith(child.to))
  }
  if (!link.to || link.external) return false
  if (link.to === '/') return route.path === '/'
  return route.path.startsWith(link.to)
}

function toggleDropdown(label: string) {
  openDropdown.value = openDropdown.value === label ? null : label
}

function setFontSize(size: 'sm' | 'base' | 'lg') {
  fontSize.value = size
  document.documentElement.style.fontSize =
    size === 'sm' ? '14px' : size === 'lg' ? '18px' : '16px'
}

function toggleContrast() {
  highContrast.value = !highContrast.value
  document.documentElement.classList.toggle('high-contrast', highContrast.value)
}

function toggleMobile() {
  mobileOpen.value = !mobileOpen.value
}

function closeMobile() {
  mobileOpen.value = false
  openDropdown.value = null
}

function openSearch() {
  closeMobile()
  searchOpen.value = true
}

watch(
  () => route.fullPath,
  () => closeMobile(),
)
</script>

<template>
  <header class="w-full bg-white shadow-sm">
    <!-- Top utility bar -->
    <div class="bg-oreda-dark text-white text-[13px]">
      <div
        class="mx-auto flex max-w-[1400px] items-center justify-end px-4 py-1.5 sm:px-6 lg:justify-between lg:px-8"
      >
        <!-- Desktop: gov + contact -->
        <div class="hidden flex-wrap items-center gap-x-3 gap-y-1 lg:flex">
          <p class="tracking-wide">
            Government of Odisha
            <span class="mx-1.5 opacity-70">|</span>
            Department of Energy
          </p>
          <span class="h-3.5 w-px bg-white/50" aria-hidden="true" />
          <a
            href="tel:06742588260"
            class="inline-flex items-center gap-1.5 hover:underline"
          >
            <Phone :size="13" :stroke-width="2" />
            <span>0674 2588260</span>
          </a>
          <span class="h-3.5 w-px bg-white/50" aria-hidden="true" />
          <a
            href="mailto:ceoreda@oredaorissa.com"
            class="inline-flex items-center gap-1.5 hover:underline"
          >
            <Mail :size="13" :stroke-width="2" />
            <span>ceoreda@oredaorissa.com</span>
          </a>
        </div>

        <!-- Accessibility + weather (mobile right-aligned / desktop right) -->
        <div class="flex items-center gap-2.5 sm:gap-4">
          <div
            v-if="weather || weatherLoading"
            class="nav-weather"
            :title="
              weather
                ? `${weather.location}: ${weather.label}, ${displayTemp}`
                : 'Loading weather'
            "
            :aria-label="
              weather
                ? `Current weather in ${weather.location}: ${weather.label}, ${displayTemp}`
                : 'Loading weather'
            "
            role="status"
          >
            <component
              :is="weather?.icon"
              v-if="weather"
              :size="14"
              :stroke-width="2.2"
              class="nav-weather-icon"
              aria-hidden="true"
            />
            <span
              v-else
              class="nav-weather-skeleton"
              aria-hidden="true"
            />
            <span class="nav-weather-temp">
              {{ weather ? displayTemp : '—' }}
            </span>
            <span class="nav-weather-meta hidden sm:inline">
              <span class="nav-weather-dot" aria-hidden="true" />
              {{ weather?.location ?? 'Bhubaneswar' }}
            </span>
          </div>

          <a
            href="#main-content"
            class="hidden hover:underline focus:underline md:inline"
          >
            Skip to content
          </a>
          <div class="flex items-center gap-1" aria-label="Font size controls">
            <button
              type="button"
              class="px-1 leading-none transition hover:opacity-80"
              :class="{ 'font-bold underline': fontSize === 'sm' }"
              aria-label="Decrease font size"
              @click="setFontSize('sm')"
            >
              A-
            </button>
            <button
              type="button"
              class="px-1 text-[15px] leading-none transition hover:opacity-80"
              :class="{ 'font-bold underline': fontSize === 'base' }"
              aria-label="Default font size"
              @click="setFontSize('base')"
            >
              A
            </button>
            <button
              type="button"
              class="px-1 text-[17px] leading-none transition hover:opacity-80"
              :class="{ 'font-bold underline': fontSize === 'lg' }"
              aria-label="Increase font size"
              @click="setFontSize('lg')"
            >
              A+
            </button>
          </div>
          <button
            type="button"
            class="flex items-center gap-1.5 transition hover:opacity-80"
            aria-label="Toggle contrast"
            @click="toggleContrast"
          >
            <Contrast :size="15" :stroke-width="2" />
            <span class="hidden lg:inline">Contrast</span>
          </button>
        </div>
      </div>
    </div>

    <!-- ========== MOBILE branding + officials ========== -->
    <div class="lg:hidden">
      <div class="flex items-center justify-between gap-3 border-b border-oreda/15 bg-white px-3 py-1.5 sm:px-4 sm:py-2">
        <RouterLink to="/" class="shrink-0" @click="closeMobile">
          <img
            src="/images/oreda-logo.png?v=3"
            alt="OREDA Limited"
            class="h-16 w-auto max-w-[16rem] object-contain object-left sm:h-[4.5rem] sm:max-w-[18rem]"
          />
        </RouterLink>

        <button
          type="button"
          class="flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-oreda/25 bg-[#f7f5fc] text-oreda-dark transition hover:border-oreda/40 hover:bg-[#efeaf8]"
          :aria-expanded="mobileOpen"
          aria-controls="mobile-nav"
          aria-label="Toggle menu"
          @click="toggleMobile"
        >
          <X v-if="mobileOpen" :size="20" :stroke-width="2.25" />
          <Menu v-else :size="20" :stroke-width="2.25" />
        </button>
      </div>

      <!-- Officials 2×2 cards -->
      <div class="border-b border-oreda/10 bg-[#faf9fc] px-3 py-3 sm:px-4">
        <div class="grid grid-cols-2 gap-2.5 sm:gap-3">
          <div
            v-for="person in allOfficials"
            :key="person.name"
            class="flex items-center gap-2 rounded-lg border border-oreda/20 bg-white px-2 py-2 sm:gap-2.5 sm:px-2.5"
          >
            <div
              class="h-11 w-11 shrink-0 overflow-hidden rounded-full border border-oreda/25 bg-[#ebe6f5] sm:h-12 sm:w-12"
            >
              <img
                :src="person.image"
                :alt="person.name"
                class="h-full w-full object-cover object-top"
              />
            </div>
            <div class="min-w-0 leading-[1.2]">
              <p class="line-clamp-2 text-[11px] font-bold text-oreda sm:text-[12px]">
                {{ person.name }}
              </p>
              <p class="mt-0.5 line-clamp-2 text-[9.5px] text-[#777] sm:text-[10.5px]">
                {{ person.title }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Mobile nav panel -->
      <nav
        id="mobile-nav"
        class="overflow-hidden border-b border-oreda/15 bg-oreda transition-[max-height] duration-300 ease-out"
        :class="mobileOpen ? 'max-h-[40rem]' : 'max-h-0 border-b-0'"
        aria-label="Primary mobile"
      >
        <ul class="px-2 py-2" role="list">
          <li v-for="link in navLinks" :key="link.label">
            <template v-if="link.children?.length">
              <button
                type="button"
                class="flex w-full items-center justify-between rounded-md px-3 py-2.5 text-left text-[14px] font-semibold text-white transition hover:bg-oreda-mid"
                :aria-expanded="openDropdown === link.label"
                @click="toggleDropdown(link.label)"
              >
                {{ link.label }}
                <ChevronDown
                  :size="14"
                  :stroke-width="2.5"
                  class="opacity-90 transition"
                  :class="openDropdown === link.label ? 'rotate-180' : ''"
                />
              </button>
              <ul
                v-show="openDropdown === link.label"
                class="mb-1.5 ml-1 space-y-0.5 border-l border-white/20 pl-2"
                role="list"
              >
                <li
                  v-for="(child, index) in link.children"
                  :key="child.label"
                >
                  <RouterLink
                    :to="child.to"
                    class="flex items-start gap-2.5 rounded-md px-2.5 py-2.5 text-[13px] font-medium leading-snug text-white/85 transition hover:bg-oreda-mid hover:text-white"
                    @click="closeMobile"
                  >
                    <span
                      class="mt-px flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full bg-white/15 text-[9px] font-bold tabular-nums text-white"
                      aria-hidden="true"
                    >
                      {{ String(index + 1).padStart(2, '0') }}
                    </span>
                    <span>{{ child.label }}</span>
                  </RouterLink>
                </li>
              </ul>
            </template>
            <a
              v-else-if="link.to && link.external"
              :href="link.to"
              target="_blank"
              rel="noopener noreferrer"
              class="flex items-center justify-between rounded-md px-3 py-2.5 text-[14px] font-semibold text-white transition hover:bg-oreda-mid"
              @click="closeMobile"
            >
              {{ link.label }}
            </a>
            <RouterLink
              v-else-if="link.to"
              :to="link.to"
              class="flex items-center justify-between rounded-md px-3 py-2.5 text-[14px] font-semibold text-white transition"
              :class="
                isActive(link)
                  ? 'bg-oreda-light'
                  : 'hover:bg-oreda-mid'
              "
              @click="closeMobile"
            >
              {{ link.label }}
            </RouterLink>
            <span
              v-else
              class="flex items-center justify-between rounded-md px-3 py-2.5 text-[14px] font-semibold text-white/90"
            >
              {{ link.label }}
            </span>
          </li>
        </ul>
        <div class="flex items-center gap-2 border-t border-white/15 px-3 py-2.5">
          <button
            type="button"
            class="flex flex-1 items-center justify-center gap-2 rounded-md bg-white/10 py-2 text-[13px] font-semibold text-white transition hover:bg-white/15"
            aria-label="Search"
            @click="openSearch"
          >
            <Search :size="16" :stroke-width="2.25" />
            Search
          </button>
        </div>
      </nav>
    </div>

    <!-- ========== DESKTOP branding bar ========== -->
    <div class="hidden border-b border-gray-200 bg-white lg:block">
      <div
        class="mx-auto grid max-w-[1400px] grid-cols-[1fr_auto_1fr] items-center px-4 py-2.5 sm:px-6 lg:px-8"
      >
        <div class="flex items-center justify-between gap-4 py-1 pr-3">
          <div
            v-for="person in officials.left"
            :key="person.name"
            class="flex items-center gap-2.5"
          >
            <div
              class="h-[68px] w-[68px] shrink-0 overflow-hidden rounded-full border border-[#cfc8e0] bg-[#ebe6f5]"
            >
              <img
                :src="person.image"
                :alt="person.name"
                class="h-full w-full object-cover object-top"
              />
            </div>
            <div class="w-[130px] text-left leading-[1.2]">
              <p class="text-[13px] font-bold text-oreda">
                {{ person.name }}
              </p>
              <p class="mt-0.5 text-[11px] leading-snug text-[#777]">
                {{ person.title }}
              </p>
            </div>
          </div>
        </div>

        <div
          class="flex items-center justify-center border-x border-oreda/45 px-8 py-1"
        >
          <RouterLink to="/" class="block">
            <img
              src="/images/oreda-logo.png?v=3"
              alt="OREDA Limited — Department of Energy, Government of Odisha"
              class="block h-[62px] w-auto max-w-[360px] object-contain"
            />
          </RouterLink>
        </div>

        <div class="flex items-center justify-between gap-4 py-1 pl-3">
          <div
            v-for="person in officials.right"
            :key="person.name"
            class="flex items-center gap-2.5"
          >
            <div
              class="h-[68px] w-[68px] shrink-0 overflow-hidden rounded-full border border-[#cfc8e0] bg-[#ebe6f5]"
            >
              <img
                :src="person.image"
                :alt="person.name"
                class="h-full w-full object-cover object-top"
              />
            </div>
            <div class="w-[130px] text-left leading-[1.2]">
              <p class="text-[13px] font-bold text-oreda">
                {{ person.name }}
              </p>
              <p class="mt-0.5 text-[11px] leading-snug text-[#777]">
                {{ person.title }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Desktop navigation bar -->
    <nav class="hidden bg-oreda lg:block" aria-label="Primary">
      <div
        class="mx-auto flex max-w-[1400px] items-stretch justify-between px-4 sm:px-6 lg:px-8"
      >
        <ul class="flex min-w-0 flex-1 flex-nowrap items-stretch">
          <li
            v-for="link in navLinks"
            :key="link.label"
            class="group/nav relative shrink-0"
            :class="link.children?.length ? 'has-dropdown' : ''"
          >
            <template v-if="link.children?.length">
              <button
                type="button"
                class="relative flex h-full items-center gap-1.5 px-3 py-3 text-[14px] font-semibold whitespace-nowrap text-white transition group-hover/nav:bg-oreda-mid xl:px-3.5"
                :class="isActive(link) ? 'bg-oreda-light' : ''"
                aria-haspopup="true"
              >
                {{ link.label }}
                <ChevronDown
                  :size="14"
                  :stroke-width="2.5"
                  class="opacity-90 transition duration-300 ease-out group-hover/nav:rotate-180"
                />
              </button>
              <div
                class="nav-dropdown pointer-events-none absolute top-full left-0 z-50 pt-2 opacity-0"
                role="presentation"
              >
                <div
                  class="nav-dropdown-panel w-[20.5rem] overflow-hidden rounded-b-lg bg-white shadow-[0_18px_40px_-14px_rgba(0,16,56,0.4)] ring-1 ring-oreda/10"
                >
                  <div
                    class="h-[3px] bg-gradient-to-r from-oreda via-[#5a3aad] to-oreda-light"
                    aria-hidden="true"
                  />
                  <div class="border-b border-oreda/10 bg-[#f8f6fc] px-4 py-2.5">
                    <p class="text-[10px] font-bold tracking-[0.18em] text-oreda uppercase">
                      {{
                        link.label === 'Organisation'
                          ? 'Explore organisation'
                          : 'Explore programs'
                      }}
                    </p>
                  </div>
                  <ul class="py-1.5" role="menu">
                    <li
                      v-for="(child, index) in link.children"
                      :key="child.label"
                      class="nav-dropdown-item"
                      :style="{ '--i': index }"
                      role="none"
                    >
                      <RouterLink
                        :to="child.to"
                        role="menuitem"
                        class="group/item flex items-start gap-3 px-4 py-3 transition-colors duration-200 hover:bg-[#f3f0fa]"
                      >
                        <span
                          class="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-oreda/10 text-[10px] font-bold tabular-nums text-oreda transition duration-200 group-hover/item:bg-oreda group-hover/item:text-white"
                          aria-hidden="true"
                        >
                          {{ String(index + 1).padStart(2, '0') }}
                        </span>
                        <span
                          class="min-w-0 flex-1 text-[13px] leading-snug font-semibold text-oreda-dark transition-colors duration-200 group-hover/item:text-oreda"
                        >
                          {{ child.label }}
                        </span>
                        <span
                          class="mt-px shrink-0 text-[15px] leading-none text-oreda/0 transition duration-200 group-hover/item:translate-x-0.5 group-hover/item:text-oreda"
                          aria-hidden="true"
                        >
                          ›
                        </span>
                      </RouterLink>
                    </li>
                  </ul>
                </div>
              </div>
            </template>
            <a
              v-else-if="link.to && link.external"
              :href="link.to"
              target="_blank"
              rel="noopener noreferrer"
              class="relative flex h-full items-center gap-1 px-3 py-3 text-[14px] font-semibold whitespace-nowrap text-white transition hover:bg-oreda-mid xl:px-3.5"
            >
              {{ link.label }}
            </a>
            <RouterLink
              v-else-if="link.to"
              :to="link.to"
              class="relative flex h-full items-center gap-1 px-3 py-3 text-[14px] font-semibold whitespace-nowrap text-white transition xl:px-3.5"
              :class="
                isActive(link)
                  ? 'bg-oreda-light after:absolute after:inset-x-3 after:bottom-0 after:h-[3px] after:rounded-t-sm after:bg-white/90'
                  : 'hover:bg-oreda-mid'
              "
            >
              {{ link.label }}
            </RouterLink>
            <span
              v-else
              class="relative flex h-full cursor-default items-center gap-1 px-3 py-3 text-[14px] font-semibold whitespace-nowrap text-white/90 xl:px-3.5"
            >
              {{ link.label }}
            </span>
          </li>
        </ul>

        <button
          type="button"
          class="flex shrink-0 items-center justify-center border-l border-white/25 px-4 text-white transition hover:bg-oreda-mid"
          aria-label="Search"
          @click="openSearch"
        >
          <Search :size="18" :stroke-width="2.25" />
        </button>
      </div>
    </nav>

    <SiteSearch v-model:open="searchOpen" />
  </header>
</template>

<style scoped>
.nav-weather {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.15rem 0.55rem 0.15rem 0.4rem;
  border: 1px solid rgba(255, 255, 255, 0.22);
  border-radius: 9999px;
  background: rgba(255, 255, 255, 0.08);
  line-height: 1;
  white-space: nowrap;
}

.nav-weather-icon {
  flex-shrink: 0;
  color: #f5e6a8;
}

.nav-weather-temp {
  font-size: 12.5px;
  font-weight: 700;
  font-variant-numeric: tabular-nums;
  letter-spacing: 0.01em;
}

.nav-weather-meta {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  font-size: 11.5px;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.78);
}

.nav-weather-dot {
  width: 3px;
  height: 3px;
  border-radius: 9999px;
  background: rgba(255, 255, 255, 0.45);
}

.nav-weather-skeleton {
  width: 14px;
  height: 14px;
  border-radius: 9999px;
  background: rgba(255, 255, 255, 0.25);
  animation: nav-weather-pulse 1.2s ease-in-out infinite;
}

@keyframes nav-weather-pulse {
  0%,
  100% {
    opacity: 0.45;
  }
  50% {
    opacity: 1;
  }
}

.has-dropdown .nav-dropdown {
  transform: translateY(0.6rem) scale(0.96);
  transform-origin: top left;
  transition:
    opacity 0.28s cubic-bezier(0.22, 1, 0.36, 1),
    transform 0.32s cubic-bezier(0.22, 1, 0.36, 1);
}

.has-dropdown:hover .nav-dropdown,
.has-dropdown:focus-within .nav-dropdown {
  pointer-events: auto;
  opacity: 1;
  transform: translateY(0) scale(1);
}

.nav-dropdown-item {
  opacity: 0;
  transform: translateY(10px);
  transition:
    opacity 0.3s cubic-bezier(0.22, 1, 0.36, 1),
    transform 0.3s cubic-bezier(0.22, 1, 0.36, 1);
  transition-delay: 0ms;
}

.has-dropdown:hover .nav-dropdown-item,
.has-dropdown:focus-within .nav-dropdown-item {
  opacity: 1;
  transform: translateY(0);
  transition-delay: calc(70ms + var(--i, 0) * 48ms);
}

.nav-dropdown-item + .nav-dropdown-item {
  border-top: 1px solid rgba(56, 32, 128, 0.07);
}
</style>
