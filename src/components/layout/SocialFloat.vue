<script setup lang="ts">
import {
  ChevronLeft,
  Facebook,
  Instagram,
  Linkedin,
  Youtube,
  type LucideIcon,
} from 'lucide-vue-next'
import { onMounted, onUnmounted, ref } from 'vue'

interface SocialLink {
  label: string
  href: string
  icon?: LucideIcon
  brand?: 'x'
  tone: string
}

const open = ref(false)
const root = ref<HTMLElement | null>(null)

const links: SocialLink[] = [
  {
    label: 'Facebook',
    href: 'https://www.facebook.com/oreda.odisha1',
    icon: Facebook,
    tone: '#1877F2',
  },
  {
    label: 'X',
    href: 'https://x.com/OREDA_Odisha',
    brand: 'x',
    tone: '#0F1419',
  },
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/oreda_odisha/',
    icon: Instagram,
    tone: '#E4405F',
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/company/odisha-renewable-energy-development-agency',
    icon: Linkedin,
    tone: '#0A66C2',
  },
  {
    label: 'YouTube',
    href: 'https://www.youtube.com/@OREDAOdisha',
    icon: Youtube,
    tone: '#FF0000',
  },
]

function toggle() {
  open.value = !open.value
}

function onDocClick(e: MouseEvent) {
  if (!open.value || !root.value) return
  if (!root.value.contains(e.target as Node)) open.value = false
}

function onKey(e: KeyboardEvent) {
  if (e.key === 'Escape' && open.value) open.value = false
}

onMounted(() => {
  document.addEventListener('click', onDocClick)
  document.addEventListener('keydown', onKey)
})

onUnmounted(() => {
  document.removeEventListener('click', onDocClick)
  document.removeEventListener('keydown', onKey)
})
</script>

<template>
  <div
    ref="root"
    class="social-float"
    :class="{ 'is-open': open }"
    :aria-expanded="open"
  >
    <div class="social-rail" :aria-hidden="!open">
      <a
        v-for="(link, i) in links"
        :key="link.label"
        :href="link.href"
        class="social-btn"
        :style="{
          '--tone': link.tone,
          '--i': i,
          '--n': links.length,
        }"
        target="_blank"
        rel="noopener noreferrer"
        :tabindex="open ? 0 : -1"
        :aria-label="`Follow OREDA on ${link.label}`"
        :title="link.label"
      >
        <span class="social-btn-glow" aria-hidden="true" />
        <svg
          v-if="link.brand === 'x'"
          class="x-icon"
          viewBox="0 0 24 24"
          aria-hidden="true"
          focusable="false"
        >
          <path
            fill="currentColor"
            d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.74l7.727-8.835L1.254 2.25H8.08l4.253 5.622L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z"
          />
        </svg>
        <component
          :is="link.icon"
          v-else
          :size="18"
          :stroke-width="2.25"
        />
      </a>
    </div>

    <button
      type="button"
      class="social-toggle"
      :aria-label="open ? 'Close social links' : 'Open social links'"
      :aria-expanded="open"
      @click.stop="toggle"
    >
      <span class="toggle-pulse" aria-hidden="true" />
      <ChevronLeft :size="20" :stroke-width="2.5" class="toggle-icon" />
    </button>
  </div>
</template>

<style scoped>
.social-float {
  --brand: #382080;
  --brand-deep: #001038;
  position: fixed;
  right: 0;
  top: 50%;
  z-index: 55;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.65rem;
  transform: translateY(-50%);
  pointer-events: none;
}

.social-float > * {
  pointer-events: auto;
}

.social-toggle {
  position: relative;
  display: grid;
  place-items: center;
  width: 2.65rem;
  height: 3.15rem;
  margin: 0;
  padding: 0;
  border: none;
  border-radius: 0.9rem 0 0 0.9rem;
  color: #fff;
  background: linear-gradient(145deg, #482888 0%, var(--brand) 48%, var(--brand-deep) 100%);
  box-shadow:
    -6px 8px 24px -8px rgba(56, 32, 128, 0.55),
    inset 0 1px 0 rgba(255, 255, 255, 0.18);
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
  transition:
    width 0.45s cubic-bezier(0.22, 1, 0.36, 1),
    box-shadow 0.35s ease,
    transform 0.35s cubic-bezier(0.22, 1, 0.36, 1);
}

.social-toggle:hover {
  width: 2.95rem;
  box-shadow:
    -10px 12px 28px -8px rgba(56, 32, 128, 0.65),
    inset 0 1px 0 rgba(255, 255, 255, 0.22);
}

.social-toggle:focus-visible {
  outline: 2px solid var(--brand);
  outline-offset: 3px;
}

.toggle-icon {
  display: block;
  transition: transform 0.55s cubic-bezier(0.34, 1.4, 0.64, 1);
}

.is-open .toggle-icon {
  transform: rotate(180deg);
}

.toggle-pulse {
  position: absolute;
  inset: 0;
  border-radius: inherit;
  pointer-events: none;
  box-shadow: 0 0 0 0 rgba(56, 32, 128, 0.45);
  animation: social-pulse 2.4s ease-out infinite;
}

.is-open .toggle-pulse {
  animation: none;
  opacity: 0;
}

.social-rail {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.55rem;
  padding-right: 0.35rem;
}

.social-btn {
  --delay: calc(var(--i) * 55ms);
  position: relative;
  display: grid;
  place-items: center;
  width: 2.75rem;
  height: 2.75rem;
  border-radius: 9999px;
  color: #fff;
  background: linear-gradient(145deg, color-mix(in srgb, var(--tone) 88%, white), var(--tone));
  box-shadow:
    0 8px 20px -10px color-mix(in srgb, var(--tone) 70%, transparent),
    inset 0 1px 0 rgba(255, 255, 255, 0.25);
  text-decoration: none;
  transform-origin: right center;
  opacity: 0;
  transform: translateX(1.6rem) scale(0.45) rotate(-18deg);
  filter: blur(4px);
  pointer-events: none;
  transition:
    opacity 0.42s cubic-bezier(0.22, 1, 0.36, 1),
    transform 0.55s cubic-bezier(0.34, 1.45, 0.64, 1),
    filter 0.4s ease,
    box-shadow 0.3s ease,
    background 0.3s ease;
  transition-delay: 0ms;
}

.is-open .social-btn {
  opacity: 1;
  transform: translateX(0) scale(1) rotate(0deg);
  filter: blur(0);
  pointer-events: auto;
  transition-delay: var(--delay);
}

.social-float:not(.is-open) .social-btn {
  transition-delay: calc((var(--n) - var(--i) - 1) * 40ms);
}

.social-btn-glow {
  position: absolute;
  inset: -2px;
  border-radius: inherit;
  background: radial-gradient(
    circle at 30% 25%,
    rgba(255, 255, 255, 0.35),
    transparent 55%
  );
  opacity: 0.7;
  pointer-events: none;
}

.x-icon {
  width: 1rem;
  height: 1rem;
  display: block;
}

.social-btn:hover {
  transform: translateX(-4px) scale(1.08);
  box-shadow:
    0 14px 28px -10px color-mix(in srgb, var(--tone) 80%, transparent),
    0 0 0 3px color-mix(in srgb, var(--tone) 22%, transparent);
}

.social-btn:active {
  transform: translateX(-2px) scale(0.96);
}

.social-btn:focus-visible {
  outline: 2px solid var(--brand);
  outline-offset: 3px;
}

@keyframes social-pulse {
  0% {
    box-shadow: 0 0 0 0 rgba(56, 32, 128, 0.4);
  }
  70% {
    box-shadow: 0 0 0 12px rgba(56, 32, 128, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(56, 32, 128, 0);
  }
}

@media (prefers-reduced-motion: reduce) {
  .toggle-pulse {
    animation: none;
  }

  .social-btn,
  .toggle-icon,
  .social-toggle {
    transition: none !important;
  }

  .social-float:not(.is-open) .social-btn {
    display: none;
  }

  .is-open .social-btn {
    opacity: 1;
    transform: none;
    filter: none;
  }
}
</style>
