<script setup lang="ts">
import VendorApplicationStatus from '@/components/vendor/VendorApplicationStatus.vue'
import VendorAuth from '@/components/vendor/VendorAuth.vue'
import VendorPortal from '@/components/vendor/VendorPortal.vue'
import { useVendorStore } from '@/stores/vendor'
import { CheckCircle2, X } from 'lucide-vue-next'
import { onMounted, ref, watch } from 'vue'

const JUST_SUBMITTED_KEY = 'oreda-vendor-just-submitted'

const vendor = useVendorStore()
const showSuccessModal = ref(false)

onMounted(() => {
  if (
    vendor.isFinalSubmitted &&
    sessionStorage.getItem(JUST_SUBMITTED_KEY) === '1'
  ) {
    showSuccessModal.value = true
  }
})

watch(
  () => vendor.isFinalSubmitted,
  (submitted) => {
    if (submitted && sessionStorage.getItem(JUST_SUBMITTED_KEY) === '1') {
      showSuccessModal.value = true
    }
  },
)

function closeSuccessModal() {
  showSuccessModal.value = false
  sessionStorage.removeItem(JUST_SUBMITTED_KEY)
}

function onApplicationSubmitted() {
  sessionStorage.setItem(JUST_SUBMITTED_KEY, '1')
  showSuccessModal.value = true
}
</script>

<template>
  <div
    class="vendor-page w-full"
    :class="vendor.isLoggedIn ? 'is-portal' : 'is-auth'"
  >
    <VendorAuth v-if="!vendor.isLoggedIn" />
    <VendorApplicationStatus v-else-if="vendor.isFinalSubmitted" />
    <VendorPortal v-else @submitted="onApplicationSubmitted" />

    <div
      v-if="showSuccessModal"
      class="vendor-success-root"
      role="dialog"
      aria-modal="true"
      aria-labelledby="vendor-success-title"
    >
      <button
        type="button"
        class="vendor-success-backdrop"
        aria-label="Close success message"
        @click="closeSuccessModal"
      />
      <div class="vendor-success-modal">
        <button
          type="button"
          class="vendor-success-close"
          aria-label="Close"
          @click="closeSuccessModal"
        >
          <X :size="18" :stroke-width="2.2" />
        </button>

        <div class="vendor-success-icon" aria-hidden="true">
          <CheckCircle2 :size="42" :stroke-width="2" />
        </div>

        <h2 id="vendor-success-title">Application Submitted Successfully</h2>
        <p>
          Your vendor empanelment application has been submitted to OREDA for
          processing.
        </p>
        <p class="vendor-success-appno">
          Application No.
          <strong>{{ vendor.currentVendor?.applicationNumber }}</strong>
        </p>

        <button
          type="button"
          class="vendor-success-btn"
          @click="closeSuccessModal"
        >
          View Application Status
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.vendor-page.is-auth {
  background: #fbfafe;
}

.vendor-page.is-portal {
  min-height: calc(100svh - 7.5rem);
  background: #eef0f4;
}

.vendor-success-root {
  position: fixed;
  inset: 0;
  z-index: 90;
  display: grid;
  place-items: center;
  padding: 1rem;
}

.vendor-success-backdrop {
  position: absolute;
  inset: 0;
  border: 0;
  background: rgba(0, 16, 56, 0.58);
  cursor: pointer;
}

.vendor-success-modal {
  position: relative;
  z-index: 1;
  width: min(100%, 28rem);
  padding: 1.75rem 1.4rem 1.5rem;
  background: #fff;
  border: 1px solid #cfd3dc;
  text-align: center;
  box-shadow: 0 24px 60px rgba(0, 16, 56, 0.28);
  font-family: var(--font-sans);
}

.vendor-success-close {
  position: absolute;
  top: 0.65rem;
  right: 0.65rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  border: 1px solid #cfd3dc;
  background: #fff;
  color: #001038;
  cursor: pointer;
}

.vendor-success-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 4rem;
  height: 4rem;
  margin: 0 auto;
  background: rgba(15, 118, 110, 0.1);
  color: #0f766e;
}

.vendor-success-modal h2 {
  margin: 1rem 0 0;
  font-family: var(--font-display);
  font-size: 1.35rem;
  font-weight: 700;
  color: #001038;
}

.vendor-success-modal p {
  margin: 0.65rem 0 0;
  font-size: 14px;
  line-height: 1.5;
  color: #5a6175;
}

.vendor-success-appno {
  padding: 0.7rem 0.8rem;
  background: #f4f5f8;
  border: 1px solid #cfd3dc;
  color: #001038 !important;
}

.vendor-success-appno strong {
  display: inline-block;
  margin-left: 0.25rem;
  color: #382080;
  font-weight: 800;
}

.vendor-success-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-top: 1.15rem;
  min-height: 2.55rem;
  padding: 0.55rem 1.1rem;
  border: 0;
  background: #382080;
  color: #fff;
  font-family: var(--font-sans);
  font-size: 13.5px;
  font-weight: 700;
  cursor: pointer;
}

.vendor-success-btn:hover {
  background: #001038;
}
</style>
