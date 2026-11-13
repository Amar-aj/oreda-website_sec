<script setup lang="ts">
import { useSiteStore } from '@/stores/site'
import {
  ArrowRight,
  CheckCircle2,
  Clock3,
  Mail,
  MapPin,
  Phone,
  Send,
} from 'lucide-vue-next'
import { computed, onMounted, onUnmounted, reactive, ref } from 'vue'

const site = useSiteStore()

const channels = [
  {
    id: 'contact-office',
    icon: MapPin,
    label: 'Head Office',
    value: 'S-59, Mancheswar Industrial Estate, Bhubaneswar – 751010',
    href: 'https://maps.google.com/?q=OREDA+Mancheswar+Bhubaneswar',
    external: true,
    hint: 'Open in Maps',
  },
  {
    id: 'contact-phone',
    icon: Phone,
    label: 'Phone',
    value: site.phone,
    href: `tel:${site.phone.replace(/\s/g, '')}`,
    external: false,
    hint: 'Call reception',
  },
  {
    id: 'contact-email',
    icon: Mail,
    label: 'Email',
    value: site.email,
    href: `mailto:${site.email}`,
    external: false,
    hint: 'Send an email',
  },
  {
    id: 'contact-hours',
    icon: Clock3,
    label: 'Office Hours',
    value: 'Mon – Sat · 10:00 AM – 5:00 PM',
    href: null,
    external: false,
    hint: 'Closed on Sundays & holidays',
  },
]

const form = reactive({
  name: '',
  email: '',
  phone: '',
  subject: '',
  message: '',
})

const submitted = ref(false)
const submitting = ref(false)

const canSubmit = computed(
  () =>
    form.name.trim().length > 1 &&
    form.email.includes('@') &&
    form.subject.trim().length > 1 &&
    form.message.trim().length > 5,
)

function resetForm() {
  form.name = ''
  form.email = ''
  form.phone = ''
  form.subject = ''
  form.message = ''
}

function onSubmit() {
  if (!canSubmit.value || submitting.value) return
  submitting.value = true
  window.setTimeout(() => {
    submitting.value = false
    submitted.value = true
    resetForm()
  }, 700)
}

function writeAgain() {
  submitted.value = false
}

const sectionRef = ref<HTMLElement | null>(null)
const inView = ref(false)
let observer: IntersectionObserver | null = null

onMounted(() => {
  observer = new IntersectionObserver(
    ([entry]) => {
      if (entry?.isIntersecting) {
        inView.value = true
        observer?.disconnect()
      }
    },
    { threshold: 0.12 },
  )
  if (sectionRef.value) observer.observe(sectionRef.value)
})

onUnmounted(() => observer?.disconnect())
</script>

<template>
  <section
    id="contact-main"
    ref="sectionRef"
    class="contact-main relative w-full overflow-hidden"
    aria-labelledby="contact-main-heading"
    :class="{ 'is-inview': inView }"
  >
    <div class="pointer-events-none absolute inset-0" aria-hidden="true">
      <div class="contact-main-base" />
      <div class="contact-main-mesh" />
      <div class="contact-main-orb contact-main-orb--a" />
      <div class="contact-main-orb contact-main-orb--b" />
    </div>

    <div class="relative mx-auto max-w-[1400px] px-4 py-12 sm:px-6 sm:py-14 lg:px-8 lg:py-16">
      <div
        class="contact-reveal grid gap-10 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:gap-12 xl:gap-16"
        style="--delay: 0ms"
      >
        <!-- Channels -->
        <div>
          <div class="flex items-center gap-3">
            <span class="h-[2px] w-7 bg-oreda" aria-hidden="true" />
            <p class="text-[11px] font-bold tracking-[0.2em] text-oreda uppercase">
              Reach us
            </p>
          </div>

          <h2
            id="contact-main-heading"
            class="mt-3 font-display text-[clamp(1.65rem,3vw,2.35rem)] leading-[1.15] font-semibold tracking-[-0.015em] text-oreda-dark"
          >
            Official channels for
            <em class="font-display not-italic text-oreda">citizen &amp; partner</em>
            support.
          </h2>

          <p class="mt-3 max-w-md text-[14.5px] leading-relaxed text-[#5a6b82]">
            Prefer a direct line? Use the contacts below, or send a message and
            our team will respond during office hours.
          </p>

          <ul class="mt-8 space-y-0" role="list">
            <li
              v-for="(item, index) in channels"
              :id="item.id"
              :key="item.label"
              class="contact-channel"
              :style="{ '--channel-delay': `${80 + index * 70}ms` }"
            >
              <component
                :is="item.href ? 'a' : 'div'"
                :href="item.href || undefined"
                :target="item.external ? '_blank' : undefined"
                :rel="item.external ? 'noopener noreferrer' : undefined"
                class="contact-channel-row group"
              >
                <span class="contact-channel-icon" aria-hidden="true">
                  <component :is="item.icon" :size="18" :stroke-width="1.9" />
                </span>
                <span class="min-w-0 flex-1">
                  <span
                    class="block text-[10px] font-bold tracking-[0.16em] text-oreda uppercase"
                  >
                    {{ item.label }}
                  </span>
                  <span
                    class="mt-1 block text-[14px] leading-snug font-semibold text-oreda-dark transition group-hover:text-oreda sm:text-[14.5px]"
                  >
                    {{ item.value }}
                  </span>
                  <span
                    class="mt-1 block text-[12px] font-medium text-[#7a8aa0]"
                  >
                    {{ item.hint }}
                  </span>
                </span>
                <span
                  v-if="item.href"
                  class="contact-channel-arrow"
                  aria-hidden="true"
                >
                  <ArrowRight :size="15" :stroke-width="2.2" />
                </span>
              </component>
            </li>
          </ul>
        </div>

        <!-- Inquiry form -->
        <div class="contact-form-shell" style="--delay: 100ms">
          <div class="contact-form-accent" aria-hidden="true" />

          <div v-if="!submitted" class="relative">
            <div class="flex items-start justify-between gap-4">
              <div>
                <p class="text-[11px] font-bold tracking-[0.18em] text-oreda uppercase">
                  Write to OREDA
                </p>
                <h3
                  class="mt-1.5 font-display text-[1.35rem] font-semibold tracking-[-0.01em] text-oreda-dark sm:text-[1.5rem]"
                >
                  Send an inquiry
                </h3>
              </div>
              <span class="contact-form-badge" aria-hidden="true">
                <Send :size="15" :stroke-width="2" />
              </span>
            </div>

            <form class="mt-6 space-y-4" @submit.prevent="onSubmit">
              <div class="grid gap-4 sm:grid-cols-2">
                <label class="contact-field">
                  <span class="contact-label">Full name</span>
                  <input
                    v-model="form.name"
                    type="text"
                    name="name"
                    autocomplete="name"
                    required
                    placeholder="Your name"
                    class="contact-input"
                  />
                </label>
                <label class="contact-field">
                  <span class="contact-label">Email</span>
                  <input
                    v-model="form.email"
                    type="email"
                    name="email"
                    autocomplete="email"
                    required
                    placeholder="you@example.com"
                    class="contact-input"
                  />
                </label>
              </div>

              <div class="grid gap-4 sm:grid-cols-2">
                <label class="contact-field">
                  <span class="contact-label">Phone <span class="font-normal text-[#8a9bb0]">(optional)</span></span>
                  <input
                    v-model="form.phone"
                    type="tel"
                    name="phone"
                    autocomplete="tel"
                    placeholder="Mobile number"
                    class="contact-input"
                  />
                </label>
                <label class="contact-field">
                  <span class="contact-label">Subject</span>
                  <input
                    v-model="form.subject"
                    type="text"
                    name="subject"
                    required
                    placeholder="How can we help?"
                    class="contact-input"
                  />
                </label>
              </div>

              <label class="contact-field">
                <span class="contact-label">Message</span>
                <textarea
                  v-model="form.message"
                  name="message"
                  rows="5"
                  required
                  placeholder="Share a short note about your query…"
                  class="contact-input contact-textarea"
                />
              </label>

              <div class="flex flex-wrap items-center justify-between gap-3 pt-1">
                <p class="max-w-xs text-[12px] leading-relaxed text-[#7a8aa0]">
                  Responses are typically shared within 2–3 working days.
                </p>
                <button
                  type="submit"
                  class="contact-submit group"
                  :disabled="!canSubmit || submitting"
                >
                  <span>{{ submitting ? 'Sending…' : 'Send message' }}</span>
                  <span class="contact-submit-icon" aria-hidden="true">
                    <ArrowRight :size="14" :stroke-width="2.4" />
                  </span>
                </button>
              </div>
            </form>
          </div>

          <div v-else class="contact-success">
            <span class="contact-success-icon" aria-hidden="true">
              <CheckCircle2 :size="28" :stroke-width="1.8" />
            </span>
            <h3 class="mt-4 font-display text-[1.45rem] font-semibold text-oreda-dark">
              Message received
            </h3>
            <p class="mt-2 max-w-sm text-[14px] leading-relaxed text-[#5a6b82]">
              Thank you for writing to OREDA. Our team will review your inquiry
              and get back to you during office hours.
            </p>
            <button type="button" class="contact-submit mt-6 group" @click="writeAgain">
              <span>Write another message</span>
              <span class="contact-submit-icon" aria-hidden="true">
                <ArrowRight :size="14" :stroke-width="2.4" />
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.contact-main-base {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    155deg,
    #f4f6fa 0%,
    #eef2f8 40%,
    #f7f5fc 72%,
    #ebe7f5 100%
  );
}

.contact-main-mesh {
  position: absolute;
  inset: 0;
  opacity: 0.4;
  background-image:
    linear-gradient(rgba(0, 16, 56, 0.045) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0, 16, 56, 0.045) 1px, transparent 1px);
  background-size: 48px 48px;
  mask-image: radial-gradient(ellipse 75% 70% at 30% 20%, black 15%, transparent 75%);
}

.contact-main-orb {
  position: absolute;
  border-radius: 9999px;
  filter: blur(80px);
}

.contact-main-orb--a {
  top: -20%;
  right: -8%;
  width: min(45vw, 380px);
  height: min(45vw, 380px);
  background: radial-gradient(circle, rgba(56, 32, 128, 0.12), transparent 70%);
}

.contact-main-orb--b {
  bottom: -25%;
  left: -6%;
  width: min(40vw, 320px);
  height: min(40vw, 320px);
  background: radial-gradient(circle, rgba(42, 80, 128, 0.1), transparent 70%);
}

.contact-reveal {
  opacity: 0;
  transform: translateY(18px);
  transition:
    opacity 0.7s cubic-bezier(0.22, 1, 0.36, 1),
    transform 0.7s cubic-bezier(0.22, 1, 0.36, 1);
  transition-delay: var(--delay, 0ms);
}

.is-inview .contact-reveal {
  opacity: 1;
  transform: translateY(0);
}

.contact-channel {
  opacity: 0;
  transform: translateX(-12px);
  transition:
    opacity 0.55s cubic-bezier(0.22, 1, 0.36, 1),
    transform 0.55s cubic-bezier(0.22, 1, 0.36, 1);
  transition-delay: var(--channel-delay, 0ms);
}

.is-inview .contact-channel {
  opacity: 1;
  transform: translateX(0);
}

.contact-channel + .contact-channel {
  border-top: 1px solid rgba(56, 32, 128, 0.08);
}

.contact-channel-row {
  display: flex;
  align-items: flex-start;
  gap: 0.9rem;
  padding: 1.05rem 0.15rem;
  text-decoration: none;
  color: inherit;
}

.contact-channel-icon {
  display: grid;
  place-items: center;
  width: 2.55rem;
  height: 2.55rem;
  flex-shrink: 0;
  color: #382080;
  background: rgba(56, 32, 128, 0.08);
  border: 1px solid rgba(56, 32, 128, 0.14);
  transition:
    background 0.25s ease,
    border-color 0.25s ease,
    color 0.25s ease;
}

.group:hover .contact-channel-icon {
  color: #fff;
  background: #382080;
  border-color: #382080;
}

.contact-channel-arrow {
  display: grid;
  place-items: center;
  margin-top: 0.35rem;
  color: rgba(56, 32, 128, 0.35);
  transition:
    color 0.25s ease,
    transform 0.25s ease;
}

.group:hover .contact-channel-arrow {
  color: #382080;
  transform: translateX(3px);
}

.contact-form-shell {
  position: relative;
  padding: 1.6rem 1.4rem 1.5rem;
  background: rgba(255, 255, 255, 0.88);
  border: 1px solid rgba(56, 32, 128, 0.1);
  box-shadow:
    0 24px 50px -28px rgba(0, 16, 56, 0.35),
    inset 0 1px 0 rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(8px);
  opacity: 0;
  transform: translateY(22px);
  transition:
    opacity 0.7s cubic-bezier(0.22, 1, 0.36, 1),
    transform 0.7s cubic-bezier(0.22, 1, 0.36, 1);
  transition-delay: var(--delay, 0ms);
}

@media (min-width: 640px) {
  .contact-form-shell {
    padding: 1.85rem 1.75rem 1.7rem;
  }
}

.is-inview .contact-form-shell {
  opacity: 1;
  transform: translateY(0);
}

.contact-form-accent {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  height: 3px;
  background: linear-gradient(90deg, #382080, #5a3aad, #8b6fd4);
}

.contact-form-badge {
  display: grid;
  place-items: center;
  width: 2.4rem;
  height: 2.4rem;
  color: #382080;
  background: rgba(56, 32, 128, 0.08);
  border: 1px solid rgba(56, 32, 128, 0.12);
}

.contact-field {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.contact-label {
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: #4a3a72;
}

.contact-input {
  width: 100%;
  padding: 0.72rem 0.85rem;
  font-size: 14px;
  font-weight: 500;
  color: #001038;
  background: #f7f6fb;
  border: 1px solid rgba(56, 32, 128, 0.12);
  outline: none;
  transition:
    border-color 0.2s ease,
    background 0.2s ease,
    box-shadow 0.2s ease;
}

.contact-input::placeholder {
  color: #9aa8bc;
  font-weight: 450;
}

.contact-input:focus {
  background: #fff;
  border-color: rgba(56, 32, 128, 0.45);
  box-shadow: 0 0 0 3px rgba(56, 32, 128, 0.1);
}

.contact-textarea {
  min-height: 8.5rem;
  resize: vertical;
  line-height: 1.55;
}

.contact-submit {
  display: inline-flex;
  align-items: center;
  gap: 0.55rem;
  padding: 0.7rem 0.75rem 0.7rem 1.15rem;
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.02em;
  color: #fff;
  background: linear-gradient(135deg, #382080 0%, #2e1968 100%);
  border: none;
  cursor: pointer;
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease,
    opacity 0.2s ease;
  box-shadow: 0 10px 24px -12px rgba(56, 32, 128, 0.65);
}

.contact-submit:hover:not(:disabled) {
  transform: translateY(-1px);
  box-shadow: 0 14px 28px -12px rgba(56, 32, 128, 0.7);
}

.contact-submit:disabled {
  opacity: 0.55;
  cursor: not-allowed;
}

.contact-submit-icon {
  display: grid;
  place-items: center;
  width: 1.7rem;
  height: 1.7rem;
  background: rgba(255, 255, 255, 0.14);
  transition: transform 0.25s ease;
}

.group:hover .contact-submit-icon {
  transform: translateX(2px);
}

.contact-success {
  display: flex;
  min-height: 22rem;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  padding: 0.5rem 0;
  animation: success-in 0.5s cubic-bezier(0.22, 1, 0.36, 1);
}

.contact-success-icon {
  display: grid;
  place-items: center;
  width: 3.4rem;
  height: 3.4rem;
  color: #382080;
  background: rgba(56, 32, 128, 0.08);
  border: 1px solid rgba(56, 32, 128, 0.14);
}

@keyframes success-in {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (prefers-reduced-motion: reduce) {
  .contact-reveal,
  .contact-channel,
  .contact-form-shell,
  .contact-success {
    opacity: 1;
    transform: none;
    transition: none;
    animation: none;
  }
}
</style>
