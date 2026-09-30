<script setup lang="ts">
import { ref } from 'vue'
import { ChevronDown, Contrast, Mail, Phone, Search } from 'lucide-vue-next'

const activeLink = ref('Home')
const fontSize = ref<'sm' | 'base' | 'lg'>('base')
const highContrast = ref(false)

const officials = {
  left: [
    {
      name: 'Shri Mohan Charan Majhi',
      title: "Hon'ble Chief Minister",
      image: '/images/officials/cm.png',
    },
    {
      name: 'Shri Kanak Vardhan Singh Deo',
      title: "Hon'ble Deputy Chief Minister",
      image: '/images/officials/deputy-cm.png',
    },
  ],
  right: [
    {
      name: 'Shri Vishal Kumar Dev, IAS',
      title: 'Additional Chief Secretary',
      image: '/images/officials/acs.png',
    },
    {
      name: 'Shri Debashis Mohanty',
      title: 'Chief Executive Officer',
      image: '/images/officials/ceo.png',
    },
  ],
}

const navLinks = [
  { label: 'Home', hasDropdown: false },
  { label: 'About Us', hasDropdown: false },
  { label: 'Who is Who', hasDropdown: false },
  { label: 'Our Projects', hasDropdown: true },
  { label: 'OPMS Corner', hasDropdown: false },
  { label: 'Tenders', hasDropdown: false },
  { label: 'Photo Gallery', hasDropdown: false },
  { label: 'ORTPSA', hasDropdown: false },
  { label: 'Contact Us', hasDropdown: false },
]

function setFontSize(size: 'sm' | 'base' | 'lg') {
  fontSize.value = size
  document.documentElement.style.fontSize =
    size === 'sm' ? '14px' : size === 'lg' ? '18px' : '16px'
}

function toggleContrast() {
  highContrast.value = !highContrast.value
  document.documentElement.classList.toggle('high-contrast', highContrast.value)
}
</script>

<template>
  <header class="w-full bg-white shadow-sm">
    <!-- Top utility bar -->
    <div class="bg-oreda-dark text-white text-[13px]">
      <div class="mx-auto flex max-w-[1400px] flex-wrap items-center justify-between gap-y-1 px-4 py-1.5 sm:px-6 lg:px-8">
        <div class="flex flex-wrap items-center gap-x-3 gap-y-1">
          <p class="tracking-wide">
            Government of Odisha
            <span class="mx-1.5 opacity-70">|</span>
            Department of Energy
          </p>
          <span class="hidden h-3.5 w-px bg-white/50 sm:block" aria-hidden="true" />
          <a
            href="tel:06742588260"
            class="inline-flex items-center gap-1.5 hover:underline"
          >
            <Phone :size="13" :stroke-width="2" />
            <span>0674 2588260</span>
          </a>
          <span class="hidden h-3.5 w-px bg-white/50 sm:block" aria-hidden="true" />
          <a
            href="mailto:ceoreda@oredaorissa.com"
            class="inline-flex items-center gap-1.5 hover:underline"
          >
            <Mail :size="13" :stroke-width="2" />
            <span>ceoreda@oredaorissa.com</span>
          </a>
        </div>
        <div class="flex items-center gap-4">
          <a href="#main-content" class="hover:underline focus:underline">
            Skip to content
          </a>
          <div class="flex items-center gap-1.5" aria-label="Font size controls">
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
            <span>Contrast</span>
          </button>
        </div>
      </div>
    </div>

    <!-- Middle branding bar (CMGI-style 3-section layout) -->
    <div class="border-b border-gray-200 bg-white">
      <div
        class="mx-auto grid max-w-[1400px] grid-cols-1 items-center px-4 py-2.5 sm:px-6 lg:grid-cols-[1fr_auto_1fr] lg:px-8"
      >
        <!-- Left section -->
        <div class="flex items-center justify-between gap-4 py-1 lg:pr-3">
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

        <!-- Center section: equal padding → equal gap to both divider bars -->
        <div
          class="flex items-center justify-center border-y border-oreda/45 px-7 py-2 lg:border-x lg:border-y-0 lg:px-8 lg:py-1"
        >
          <a href="/" class="block">
            <img
              src="/images/oreda-logo.png?v=3"
              alt="OREDA Limited — Department of Energy, Government of Odisha"
              class="block h-[62px] w-auto max-w-[360px] object-contain"
            />
          </a>
        </div>

        <!-- Right section -->
        <div class="flex items-center justify-between gap-4 py-1 lg:pl-3">
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

    <!-- Bottom navigation bar -->
    <nav class="bg-oreda" aria-label="Primary">
      <div
        class="mx-auto flex max-w-[1400px] items-stretch justify-between px-4 sm:px-6 lg:px-8"
      >
        <ul class="flex flex-1 flex-wrap items-stretch">
          <li v-for="link in navLinks" :key="link.label">
            <a
              href="#"
              class="relative flex h-full items-center gap-1 px-3 py-3 text-[13px] font-semibold whitespace-nowrap text-white transition sm:px-3.5 sm:text-sm lg:px-4"
              :class="
                activeLink === link.label
                  ? 'bg-oreda-light after:absolute after:inset-x-3 after:bottom-0 after:h-[3px] after:rounded-t-sm after:bg-white/90'
                  : 'hover:bg-oreda-mid'
              "
              @click.prevent="activeLink = link.label"
            >
              {{ link.label }}
              <ChevronDown
                v-if="link.hasDropdown"
                :size="14"
                :stroke-width="2.5"
                class="opacity-90"
              />
            </a>
          </li>
        </ul>

        <button
          type="button"
          class="flex items-center justify-center border-l border-white/25 px-4 text-white transition hover:bg-oreda-mid"
          aria-label="Search"
        >
          <Search :size="18" :stroke-width="2.25" />
        </button>
      </div>
    </nav>
  </header>
</template>
