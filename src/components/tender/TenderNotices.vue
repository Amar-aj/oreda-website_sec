<script setup lang="ts">
import { getRecentNotices, NEW_BADGE_DAYS } from '@/data/tenders'
import { computed } from 'vue'

const notices = computed(() => getRecentNotices())

function scrollToTender(tenderId: number) {
  document.getElementById(`tender-${tenderId}`)?.scrollIntoView({
    behavior: 'smooth',
    block: 'start',
  })
}

function formatNoticeDate(value: string) {
  const cleaned = value.replace(',', '').trim()
  const match = cleaned.match(/^(\d{1,2})\s+([A-Za-z]{3})\s+(\d{4})/)
  if (!match) return value
  const months: Record<string, string> = {
    Jan: '01',
    Feb: '02',
    Mar: '03',
    Apr: '04',
    May: '05',
    Jun: '06',
    Jul: '07',
    Aug: '08',
    Sep: '09',
    Oct: '10',
    Nov: '11',
    Dec: '12',
  }
  const day = match[1].padStart(2, '0')
  const month = months[match[2].slice(0, 1).toUpperCase() + match[2].slice(1, 3).toLowerCase()]
  if (!month) return value
  return `${day}/${month}/${match[3]}`
}

function noticeLabel(notice: (typeof notices.value)[number]) {
  if (notice.type === 'tender') return 'New tender'
  return notice.docKind
}

function noticeTitle(notice: (typeof notices.value)[number]) {
  return notice.type === 'tender' ? notice.tenderTitle : notice.docTitle
}

function noticeCode(notice: (typeof notices.value)[number]) {
  return notice.serial
}
</script>

<template>
  <section
    v-if="notices.length"
    class="tender-notices relative w-full"
    aria-labelledby="tender-notices-heading"
  >
    <div class="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <div class="tender-notices-base" />
      <div class="tender-notices-glow tender-notices-glow--a" />
      <div class="tender-notices-glow tender-notices-glow--b" />
      <div class="tender-notices-mesh" />
    </div>

    <div class="relative mx-auto max-w-[1400px] px-4 py-7 sm:px-6 sm:py-8 lg:px-8 lg:py-9">
      <div class="tender-notices-layout">
        <header class="tender-notices-intro">
          <div class="tender-notices-kicker-row">
            <p class="tender-notices-kicker">
              <span class="tender-notices-kicker-dot" aria-hidden="true" />
              <span>Latest activity</span>
            </p>
            <p class="tender-notices-count">
              {{ notices.length }}
              {{ notices.length === 1 ? 'update' : 'updates' }} live
            </p>
          </div>
          <h2
            id="tender-notices-heading"
            class="tender-notices-heading"
          >
            Recent tender notifications
          </h2>
          <p class="tender-notices-sub">
            New tenders, corrigenda and linked updates from the last
            {{ NEW_BADGE_DAYS }} days.
          </p>
        </header>

        <ul class="tender-notices-grid" role="list">
          <li
            v-for="notice in notices"
            :key="notice.id"
            class="tender-notice"
          >
            <button
              type="button"
              class="tender-notice-card"
              :aria-label="`Open ${notice.tenderRef}`"
              @click="scrollToTender(notice.tenderId)"
            >
              <span class="tender-notice-code">{{ noticeCode(notice) }}</span>

              <div class="tender-notice-body">
                <span
                  class="tender-notice-label"
                  :class="notice.type === 'tender' ? 'is-tender' : 'is-document'"
                >
                  {{ noticeLabel(notice) }}
                </span>
                <span class="tender-notice-title">{{ noticeTitle(notice) }}</span>
                <span class="tender-notice-under">{{ notice.tenderRef }}</span>
              </div>

              <time class="tender-notice-date" :datetime="notice.date">
                {{ formatNoticeDate(notice.date) }}
              </time>
            </button>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<style scoped>
.tender-notices-base {
  position: absolute;
  inset: 0;
  background:
    radial-gradient(ellipse 90% 55% at 8% -10%, rgba(56, 32, 128, 0.11), transparent 55%),
    radial-gradient(ellipse 70% 50% at 92% 8%, rgba(196, 181, 240, 0.26), transparent 52%),
    linear-gradient(
      155deg,
      #efeaf8 0%,
      #f5f3fb 28%,
      #f2f5f9 58%,
      #f7f4fc 78%,
      #eef1f7 100%
    );
}

.tender-notices-glow {
  position: absolute;
  border-radius: 9999px;
  filter: blur(2px);
}

.tender-notices-glow--a {
  top: -25%;
  left: -6%;
  width: 18rem;
  height: 14rem;
  background: radial-gradient(circle, rgba(56, 32, 128, 0.12), transparent 70%);
}

.tender-notices-glow--b {
  top: -15%;
  right: -4%;
  width: 16rem;
  height: 12rem;
  background: radial-gradient(circle, rgba(148, 122, 210, 0.18), transparent 70%);
}

.tender-notices-mesh {
  position: absolute;
  inset: 0;
  opacity: 0.32;
  background-image:
    linear-gradient(rgba(56, 32, 128, 0.04) 1px, transparent 1px),
    linear-gradient(90deg, rgba(56, 32, 128, 0.04) 1px, transparent 1px);
  background-size: 42px 42px;
  mask-image: radial-gradient(ellipse 85% 70% at 50% 0%, black 12%, transparent 75%);
}

.tender-notices-layout {
  display: grid;
  gap: 1.25rem;
}

@media (min-width: 960px) {
  .tender-notices-layout {
    grid-template-columns: 20rem minmax(0, 1fr);
    gap: 0.75rem;
    align-items: start;
  }
}

.tender-notices-kicker-row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.55rem 0.75rem;
}

.tender-notices-kicker {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  margin: 0;
  font-size: 10.5px;
  font-weight: 800;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: #382080;
}

.tender-notices-kicker-dot {
  position: relative;
  display: inline-block;
  flex-shrink: 0;
  width: 0.55rem;
  height: 0.55rem;
  border-radius: 9999px;
  background: #382080;
  box-shadow: 0 0 0 0 rgba(56, 32, 128, 0.45);
  animation: tender-notices-dot-blink 1.6s ease-in-out infinite;
}

.tender-notices-kicker-dot::after {
  content: '';
  position: absolute;
  inset: -3px;
  border-radius: inherit;
  border: 1.5px solid rgba(56, 32, 128, 0.35);
  animation: tender-notices-dot-ring 1.6s ease-in-out infinite;
}

@keyframes tender-notices-dot-blink {
  0%,
  100% {
    opacity: 1;
    box-shadow: 0 0 0 0 rgba(56, 32, 128, 0.45);
  }
  50% {
    opacity: 0.35;
    box-shadow: 0 0 0 4px rgba(56, 32, 128, 0);
  }
}

@keyframes tender-notices-dot-ring {
  0%,
  100% {
    opacity: 0.7;
    transform: scale(1);
  }
  50% {
    opacity: 0;
    transform: scale(1.55);
  }
}

@media (prefers-reduced-motion: reduce) {
  .tender-notices-kicker-dot,
  .tender-notices-kicker-dot::after {
    animation: none;
  }
}

.tender-notices-heading {
  margin: 0.7rem 0 0;
  max-width: 14ch;
  font-family: var(--font-display);
  font-size: clamp(1.45rem, 2.4vw, 2rem);
  font-weight: 600;
  line-height: 1.15;
  letter-spacing: -0.02em;
  color: #001038;
}

.tender-notices-sub {
  margin: 0.65rem 0 0;
  max-width: 34ch;
  font-size: 13.5px;
  line-height: 1.5;
  color: #5a6b82;
}

.tender-notices-count {
  display: inline-flex;
  margin: 0;
  padding: 0.3rem 0.6rem;
  font-size: 10.5px;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #382080;
  background: rgba(56, 32, 128, 0.08);
  border: 1px solid rgba(56, 32, 128, 0.12);
}

.tender-notices-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.75rem;
  margin: 0;
  padding: 0;
  list-style: none;
}

@media (max-width: 700px) {
  .tender-notices-grid {
    grid-template-columns: 1fr;
  }
}

.tender-notice-card {
  position: relative;
  display: grid;
  grid-template-columns: auto minmax(0, 1fr) auto;
  align-items: center;
  gap: 0.75rem;
  width: 100%;
  min-height: 4.35rem;
  padding: 0.8rem 0.9rem;
  text-align: left;
  background: #fff;
  border: 1px solid rgba(56, 32, 128, 0.1);
  box-shadow:
    0 12px 28px -24px rgba(0, 16, 56, 0.45),
    inset 0 1px 0 rgba(255, 255, 255, 0.9);
  cursor: pointer;
  transition:
    transform 0.25s cubic-bezier(0.22, 1, 0.36, 1),
    border-color 0.25s ease,
    box-shadow 0.25s ease;
}

.tender-notice-card::before {
  content: '';
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  width: 3px;
  background: linear-gradient(180deg, #482888, #382080);
  opacity: 0;
  transition: opacity 0.25s ease;
}

.tender-notice-card:hover {
  transform: translateY(-2px);
  border-color: rgba(56, 32, 128, 0.22);
  box-shadow: 0 18px 32px -22px rgba(0, 16, 56, 0.55);
}

.tender-notice-card:hover::before {
  opacity: 1;
}

.tender-notice-card:focus-visible {
  outline: 2px solid #382080;
  outline-offset: 2px;
}

.tender-notice-code {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 3.1rem;
  height: 2.15rem;
  padding: 0 0.55rem;
  font-size: 12px;
  font-weight: 800;
  letter-spacing: 0.02em;
  color: #382080;
  background: rgba(56, 32, 128, 0.08);
  border: 1px solid rgba(56, 32, 128, 0.14);
  font-variant-numeric: tabular-nums;
  white-space: nowrap;
}

.tender-notice-body {
  display: flex;
  min-width: 0;
  flex-direction: column;
  gap: 0.18rem;
}

.tender-notice-label {
  font-size: 10px;
  font-weight: 800;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: #382080;
}

.tender-notice-label.is-tender {
  color: #0f6b3d;
}

.tender-notice-label.is-document {
  color: #382080;
}

.tender-notice-title {
  font-size: 13.5px;
  font-weight: 700;
  line-height: 1.3;
  color: #001038;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.tender-notice-under {
  font-size: 11px;
  font-weight: 600;
  color: #8a97ab;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.tender-notice-date {
  align-self: start;
  padding-top: 0.1rem;
  font-size: 11.5px;
  font-weight: 600;
  color: #6b7c94;
  white-space: nowrap;
  font-variant-numeric: tabular-nums;
}

@media (prefers-reduced-motion: reduce) {
  .tender-notice-card {
    transition: none;
  }

  .tender-notice-card:hover {
    transform: none;
  }
}
</style>
