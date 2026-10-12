<script setup lang="ts">
import { ArrowUp } from 'lucide-vue-next'
import { computed, onMounted, onUnmounted, ref } from 'vue'

const visible = ref(false)
const progress = ref(0)

const R = 22
const circumference = 2 * Math.PI * R
const dashOffset = computed(
  () => circumference - (progress.value / 100) * circumference,
)

function update() {
  const scrollTop = window.scrollY || document.documentElement.scrollTop
  const docHeight =
    document.documentElement.scrollHeight - document.documentElement.clientHeight

  visible.value = scrollTop > 320
  progress.value = docHeight > 0 ? Math.min(100, (scrollTop / docHeight) * 100) : 0
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

onMounted(() => {
  update()
  window.addEventListener('scroll', update, { passive: true })
  window.addEventListener('resize', update, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', update)
  window.removeEventListener('resize', update)
})
</script>

<template>
  <Transition name="btt">
    <button
      v-if="visible"
      type="button"
      class="back-to-top"
      aria-label="Back to top"
      title="Back to top"
      @click="scrollToTop"
    >
      <svg class="btt-ring" viewBox="0 0 52 52" aria-hidden="true">
        <circle class="btt-ring-track" cx="26" cy="26" :r="R" />
        <circle
          class="btt-ring-progress"
          cx="26"
          cy="26"
          :r="R"
          :stroke-dasharray="circumference"
          :stroke-dashoffset="dashOffset"
        />
      </svg>

      <span class="btt-core">
        <ArrowUp :size="18" :stroke-width="2.5" class="btt-icon" />
      </span>
    </button>
  </Transition>
</template>

<style scoped>
.back-to-top {
  position: fixed;
  right: 1.25rem;
  bottom: 1.5rem;
  z-index: 60;
  width: 3.25rem;
  height: 3.25rem;
  padding: 0;
  border: none;
  border-radius: 9999px;
  background: transparent;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
}

@media (min-width: 640px) {
  .back-to-top {
    right: 1.75rem;
    bottom: 1.85rem;
  }
}

.btt-ring {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  transform: rotate(-90deg);
  pointer-events: none;
}

.btt-ring-track {
  fill: none;
  stroke: rgba(56, 32, 128, 0.16);
  stroke-width: 2;
}

.btt-ring-progress {
  fill: none;
  stroke: #382080;
  stroke-width: 2;
  stroke-linecap: round;
  transition: stroke-dashoffset 0.12s linear;
}

.btt-core {
  position: absolute;
  inset: 5px;
  display: grid;
  place-items: center;
  border-radius: 9999px;
  color: #fff;
  background: #382080;
  box-shadow: 0 6px 18px -6px rgba(56, 32, 128, 0.55);
  transition:
    transform 0.3s cubic-bezier(0.22, 1, 0.36, 1),
    background 0.3s ease,
    box-shadow 0.3s ease;
}

.btt-icon {
  display: block;
  transition: transform 0.3s cubic-bezier(0.22, 1, 0.36, 1);
}

.back-to-top:hover .btt-core {
  background: #482888;
  transform: translateY(-2px);
  box-shadow: 0 12px 26px -8px rgba(56, 32, 128, 0.6);
}

.back-to-top:hover .btt-icon {
  animation: btt-nudge 0.65s ease infinite;
}

.back-to-top:active .btt-core {
  transform: translateY(0) scale(0.96);
}

.back-to-top:focus-visible {
  outline: 2px solid #382080;
  outline-offset: 3px;
}

@keyframes btt-nudge {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-3px);
  }
}

.btt-enter-active,
.btt-leave-active {
  transition:
    opacity 0.3s ease,
    transform 0.3s cubic-bezier(0.22, 1, 0.36, 1);
}

.btt-enter-from,
.btt-leave-to {
  opacity: 0;
  transform: translateY(10px) scale(0.9);
}

@media (prefers-reduced-motion: reduce) {
  .back-to-top:hover .btt-icon {
    animation: none;
  }

  .btt-enter-active,
  .btt-leave-active,
  .btt-core,
  .btt-icon,
  .btt-ring-progress {
    transition: none;
  }
}
</style>
