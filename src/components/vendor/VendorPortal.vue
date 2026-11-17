<script setup lang="ts">
import { vendorBids } from '@/data/vendorBids'
import { useVendorStore } from '@/stores/vendor'
import { openVendorBidFile, saveVendorBidFile } from '@/utils/vendorFiles'
import {
  Check,
  ClipboardCheck,
  Download,
  Eye,
  FileUp,
  Info,
  LogOut,
  Send,
  Upload,
} from 'lucide-vue-next'
import { computed, onMounted, ref, watch } from 'vue'
import { RouterLink } from 'vue-router'

const emit = defineEmits<{
  submitted: []
}>()

const vendor = useVendorStore()

const activeBidId = ref(vendor.currentVendor?.currentStep ?? 1)
const showFinalReview = ref(Boolean(vendor.allBidsComplete))
const consentAccepted = ref(false)
const fileInputRef = ref<HTMLInputElement | null>(null)
const toast = ref('')
const viewingBidId = ref<number | null>(null)

const activeBid = computed(
  () => vendorBids.find((b) => b.id === activeBidId.value) ?? vendorBids[0],
)

const activeProgress = computed(
  () => vendor.currentVendor?.bids[activeBidId.value] ?? null,
)

const activeStatus = computed(() => vendor.getBidStatus(activeBidId.value))

const downloadDone = computed(() => Boolean(activeProgress.value?.downloaded))
const stageComplete = computed(() => activeStatus.value === 'completed')
const hasUploadedFile = computed(() =>
  Boolean(activeProgress.value?.uploadedFileName),
)

const reviewRows = computed(() =>
  vendorBids.map((bid) => {
    const progress = vendor.currentVendor?.bids[bid.id]
    return {
      ...bid,
      fileName: progress?.uploadedFileName ?? '—',
      hasFile: Boolean(progress?.uploadedFileName),
      uploadedAt: progress?.uploadedAt
        ? new Date(progress.uploadedAt).toLocaleString('en-IN')
        : '—',
      status: vendor.getBidStatus(bid.id),
    }
  }),
)

const canFinalSubmit = computed(
  () => consentAccepted.value && vendor.allBidsComplete && !vendor.isFinalSubmitted,
)

onMounted(() => {
  vendor.syncCompletionState()
  if (vendor.allBidsComplete) {
    showFinalReview.value = true
  }
})

watch(
  () => vendor.allBidsComplete,
  (done) => {
    if (done && !vendor.isFinalSubmitted) {
      showFinalReview.value = true
      toast.value =
        'All 16 BID documents are uploaded. Please review and submit your application.'
    }
  },
)

function selectBid(id: number) {
  const status = vendor.getBidStatus(id)
  if (status === 'locked') return
  showFinalReview.value = false
  activeBidId.value = id
  toast.value = ''
}

function openFinalReview() {
  vendor.syncCompletionState()
  if (!vendor.allBidsComplete) {
    toast.value = 'Complete all 16 BID stages before opening Final Review.'
    return
  }
  showFinalReview.value = true
  toast.value = ''
}

function onDownload() {
  if (activeStatus.value === 'locked') return
  vendor.markDownloaded(activeBidId.value)
  toast.value = ''
}

function openFilePicker() {
  if (activeStatus.value === 'locked' || vendor.isFinalSubmitted) return
  fileInputRef.value?.click()
}

async function onFileChange(e: Event) {
  const input = e.target as HTMLInputElement
  const file = input.files?.[0]
  if (!file) return

  const vendorId = vendor.currentVendor?.id
  if (!vendorId) {
    toast.value = 'Session expired. Please log in again.'
    input.value = ''
    return
  }

  try {
    await saveVendorBidFile(vendorId, activeBidId.value, file)
    vendor.uploadBidFile(activeBidId.value, file.name)
    toast.value = `File “${file.name}” uploaded successfully. Mark this BID as complete to unlock the next stage.`
  } catch {
    toast.value = 'Could not save the file for viewing. Please try again.'
  }

  input.value = ''
}

function onComplete() {
  if (!activeProgress.value?.uploadedFileName) {
    toast.value = 'Upload the scanned document before marking this BID complete.'
    return
  }
  const bidId = activeBidId.value
  vendor.completeBid(bidId)
  vendor.syncCompletionState()
  if (bidId < 16) {
    activeBidId.value = bidId + 1
    toast.value = `BID ${bidId} completed. BID ${bidId + 1} is now unlocked.`
  } else {
    showFinalReview.value = true
    toast.value =
      'All 16 BID documents are uploaded. Please review and submit your application.'
  }
}

async function viewDocument(bidId: number) {
  const vendorId = vendor.currentVendor?.id
  const fileName = vendor.currentVendor?.bids[bidId]?.uploadedFileName
  if (!vendorId || !fileName) {
    toast.value = 'No uploaded document is available for this stage.'
    return
  }

  viewingBidId.value = bidId
  try {
    const opened = await openVendorBidFile(vendorId, bidId)
    if (!opened) {
      toast.value =
        'Document file is not available for viewing. Please re-upload this stage file.'
    }
  } catch {
    toast.value = 'Unable to open the document. Please try again.'
  } finally {
    viewingBidId.value = null
  }
}

function onFinalSubmit() {
  vendor.syncCompletionState()

  if (!consentAccepted.value) {
    toast.value = 'Please accept the declaration before final submission.'
    return
  }
  if (!vendor.allBidsComplete) {
    toast.value = 'Unable to submit. Ensure all 16 BID stages are completed.'
    return
  }

  const applicationNumber = vendor.submitFinalApplication()
  if (!applicationNumber) {
    toast.value = 'Unable to submit. Ensure all 16 BID stages are completed.'
    return
  }

  emit('submitted')
}

function statusLabel(status: string) {
  switch (status) {
    case 'completed':
      return 'Completed'
    case 'uploaded':
      return 'Uploaded'
    case 'current':
      return 'In Progress'
    default:
      return 'Locked'
  }
}

const inProgressCount = computed(() => {
  if (vendor.isFinalSubmitted) return 0
  if (vendor.allBidsComplete) return 0
  return 1
})

const pendingCount = computed(
  () => 16 - vendor.completedCount - inProgressCount.value,
)
</script>

<template>
  <section class="vp" aria-label="Vendor e-Empanelment Portal">
    <!-- Institutional masthead -->
    <header class="vp-masthead">
      <div class="vp-masthead-inner">
        <div class="vp-masthead-brand">
          <p class="vp-dept">
            Odisha Renewable Energy Development Agency
          </p>
          <p class="vp-dept-sub">
            Department of Energy · Government of Odisha
          </p>
          <h1 class="vp-portal-title">
            <span class="vp-portal-title-main">Vendor</span>
            <span class="vp-portal-title-sub">e-Empanelment Portal</span>
          </h1>
        </div>

        <div class="vp-masthead-account">
          <dl class="vp-account-meta">
            <div>
              <dt>Organisation</dt>
              <dd>{{ vendor.currentVendor?.organisationName }}</dd>
            </div>
            <div>
              <dt>User ID</dt>
              <dd>{{ vendor.currentVendor?.username }}</dd>
            </div>
            <div>
              <dt>Progress</dt>
              <dd>{{ vendor.completedCount }} / 16 BIDs</dd>
            </div>
          </dl>
          <button type="button" class="vp-logout" @click="vendor.logout()">
            <LogOut :size="14" :stroke-width="2.3" />
            Logout
          </button>
        </div>
      </div>
    </header>

    <div class="vp-shell">
      <nav class="vp-crumb" aria-label="Breadcrumb">
        <RouterLink to="/">Home</RouterLink>
        <span aria-hidden="true">»</span>
        <span>Vendor e-Empanelment Portal</span>
      </nav>

      <!-- Progress summary -->
      <div class="vp-summary" aria-label="Empanelment progress summary">
        <div class="vp-summary-head">
          <div>
            <h2>Empanelment Progress</h2>
            <p>Complete BID 1 to BID 16 in sequence to finish registration.</p>
          </div>
          <div class="vp-summary-current">
            <span>Current stage</span>
            <strong>
              {{
                vendor.isFinalSubmitted
                  ? 'Submitted'
                  : vendor.allBidsComplete
                    ? 'Final Review'
                    : `BID ${vendor.currentVendor?.currentStep}`
              }}
            </strong>
          </div>
        </div>

        <div class="vp-summary-stats">
          <div class="vp-stat is-done">
            <span class="vp-stat-value">{{ vendor.completedCount }}</span>
            <span class="vp-stat-label">Completed</span>
          </div>
          <div class="vp-stat is-active">
            <span class="vp-stat-value">{{ inProgressCount }}</span>
            <span class="vp-stat-label">In progress</span>
          </div>
          <div class="vp-stat is-left">
            <span class="vp-stat-value">{{ pendingCount }}</span>
            <span class="vp-stat-label">Pending</span>
          </div>
          <div class="vp-stat is-total">
            <span class="vp-stat-value">{{ vendor.progressPercent }}%</span>
            <span class="vp-stat-label">Overall</span>
          </div>
        </div>

        <div class="vp-summary-bar">
          <div class="vp-summary-bar-meta">
            <span>BID 1</span>
            <span>{{ vendor.completedCount }} of 16 stages completed</span>
            <span>BID 16</span>
          </div>
          <div
            class="vp-progress-track"
            role="progressbar"
            :aria-valuenow="vendor.completedCount"
            aria-valuemin="0"
            aria-valuemax="16"
            :aria-label="`${vendor.completedCount} of 16 BID stages completed`"
          >
            <div
              class="vp-progress-fill"
              :style="{ width: `${vendor.progressPercent}%` }"
            />
          </div>
          <div class="vp-summary-legend" aria-hidden="true">
            <span><i class="vp-dot is-done" /> Completed</span>
            <span><i class="vp-dot is-active" /> In progress</span>
            <span><i class="vp-dot is-left" /> Pending</span>
          </div>
        </div>
      </div>

      <div class="vp-layout">
        <!-- Stage list -->
        <aside class="vp-panel vp-stages" aria-label="BID stage list">
          <div class="vp-panel-head">
            <h2>Stage List</h2>
            <p>Select an unlocked stage</p>
          </div>
          <div class="vp-stage-table-wrap">
            <table class="vp-stage-table">
              <thead>
                <tr>
                  <th scope="col">Stage</th>
                  <th scope="col">Status</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="bid in vendorBids"
                  :key="bid.id"
                  :class="[
                    `is-${vendor.getBidStatus(bid.id)}`,
                    {
                      'is-selected':
                        !showFinalReview && activeBidId === bid.id,
                    },
                  ]"
                >
                  <td>
                    <button
                      type="button"
                      class="vp-stage-link"
                      :disabled="vendor.getBidStatus(bid.id) === 'locked'"
                      @click="selectBid(bid.id)"
                    >
                      {{ bid.code }}
                    </button>
                  </td>
                  <td>
                    <span class="vp-status-chip" :class="`is-${vendor.getBidStatus(bid.id)}`">
                      {{ statusLabel(vendor.getBidStatus(bid.id)) }}
                    </span>
                  </td>
                </tr>
                <tr
                  class="vp-final-row"
                  :class="{
                    'is-locked': !vendor.allBidsComplete,
                    'is-selected': showFinalReview,
                  }"
                >
                  <td colspan="2">
                    <button
                      type="button"
                      class="vp-stage-link vp-final-link"
                      :disabled="!vendor.allBidsComplete"
                      @click="openFinalReview"
                    >
                      <ClipboardCheck :size="14" :stroke-width="2.3" />
                      Final Review &amp; Submit
                      <span
                        class="vp-status-chip"
                        :class="vendor.allBidsComplete ? 'is-current' : 'is-locked'"
                      >
                        {{ vendor.allBidsComplete ? 'Ready' : 'Locked' }}
                      </span>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </aside>

        <!-- Final review -->
        <div v-if="showFinalReview" class="vp-panel vp-work">
          <div class="vp-panel-head vp-work-head">
            <div>
              <p class="vp-work-code">Final Step</p>
              <h2>Final Review &amp; Submission</h2>
            </div>
            <span class="vp-status-chip is-lg is-current">Ready for Submit</span>
          </div>

          <div class="vp-instruct">
            <Info :size="16" :stroke-width="2.2" aria-hidden="true" />
            <p>
              Review all uploaded BID documents below. Confirm the declaration,
              then submit your complete empanelment application to OREDA.
            </p>
          </div>

          <p v-if="toast" class="vp-toast" role="status">{{ toast }}</p>

          <div class="vp-form-block">
            <h3 class="vp-form-title">Document Checklist (BID 1 – BID 16)</h3>
            <div class="vp-review-wrap">
              <table class="vp-review-table">
                <thead>
                  <tr>
                    <th scope="col">Stage</th>
                    <th scope="col">Uploaded File</th>
                    <th scope="col">Uploaded On</th>
                    <th scope="col">Status</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="row in reviewRows" :key="row.id">
                    <td>
                      <button
                        type="button"
                        class="vp-stage-link"
                        @click="selectBid(row.id)"
                      >
                        {{ row.code }}
                      </button>
                    </td>
                    <td class="vp-file-cell">{{ row.fileName }}</td>
                    <td>{{ row.uploadedAt }}</td>
                    <td>
                      <span class="vp-status-chip" :class="`is-${row.status}`">
                        {{ statusLabel(row.status) }}
                      </span>
                    </td>
                    <td>
                      <button
                        type="button"
                        class="vp-btn vp-btn-secondary vp-btn-compact"
                        :disabled="!row.hasFile || viewingBidId === row.id"
                        @click="viewDocument(row.id)"
                      >
                        <Eye :size="13" :stroke-width="2.3" />
                        {{ viewingBidId === row.id ? 'Opening…' : 'View' }}
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div class="vp-consent-block">
            <h3 class="vp-form-title">Declaration &amp; Consent</h3>
            <label class="vp-consent">
              <input v-model="consentAccepted" type="checkbox" />
              <span>
                I hereby declare that all information and documents uploaded
                under BID 1 to BID 16 are true, complete and correct to the best
                of my knowledge. I understand that any false or misleading
                submission may lead to rejection of empanelment / appropriate
                action by OREDA. I consent to final submission of these documents
                for official processing.
              </span>
            </label>

            <div class="vp-consent-actions">
              <button
                type="button"
                class="vp-btn vp-btn-primary"
                :disabled="!canFinalSubmit"
                @click="onFinalSubmit"
              >
                <Send :size="14" :stroke-width="2.3" />
                Final Submit All Documents
              </button>
              <p v-if="!canFinalSubmit" class="vp-consent-hint">
                {{
                  !consentAccepted
                    ? 'Accept the declaration above to enable final submission.'
                    : !vendor.allBidsComplete
                      ? 'All 16 BID stages must be completed before final submission.'
                      : ''
                }}
              </p>
            </div>
          </div>

          <div class="vp-footnote">
            <p>
              <strong>Note:</strong> Final submission is allowed only after all
              16 BID stages are completed. After submission, documents will be
              treated as final for this application cycle.
            </p>
          </div>
        </div>

        <!-- Active stage workspace -->
        <div v-else class="vp-panel vp-work">
          <div class="vp-panel-head vp-work-head">
            <div>
              <p class="vp-work-code">{{ activeBid.code }}</p>
              <h2>{{ activeBid.title }}</h2>
            </div>
            <span class="vp-status-chip is-lg" :class="`is-${activeStatus}`">
              {{ statusLabel(activeStatus) }}
            </span>
          </div>

          <div class="vp-instruct">
            <Info :size="16" :stroke-width="2.2" aria-hidden="true" />
            <p>{{ activeBid.summary }}</p>
          </div>

          <p v-if="toast" class="vp-toast" role="status">{{ toast }}</p>

          <div class="vp-form-block">
            <h3 class="vp-form-title">Document Processing</h3>

            <table class="vp-action-table">
              <tbody>
                <tr>
                  <th scope="row">
                    <span class="vp-step-no">1</span>
                    Download Form
                  </th>
                  <td>
                    <p>
                      Download the official form for this stage
                      (<strong>{{ activeBid.documentLabel }}</strong>).
                      Fill offline, sign, and scan before upload.
                    </p>
                    <button
                      type="button"
                      class="vp-btn vp-btn-primary"
                      :disabled="activeStatus === 'locked'"
                      @click="onDownload"
                    >
                      <Download :size="14" :stroke-width="2.3" />
                      {{
                        downloadDone
                          ? 'Downloaded (Mark again)'
                          : 'Download Document'
                      }}
                    </button>
                    <p v-if="downloadDone" class="vp-done-note">
                      <Check :size="13" :stroke-width="2.5" />
                      Download marked
                    </p>
                  </td>
                </tr>

                <tr>
                  <th scope="row">
                    <span class="vp-step-no">2</span>
                    Upload Scanned Copy
                  </th>
                  <td>
                    <p>
                      Upload signed scanned copy in PDF / JPG / PNG format
                      (max recommended size as per circular). You can open any
                      previous completed stage anytime to view its uploaded file.
                    </p>
                    <p
                      v-if="activeProgress?.uploadedFileName"
                      class="vp-file-name"
                    >
                      <FileUp :size="14" :stroke-width="2.2" />
                      Uploaded:
                      <strong>{{ activeProgress.uploadedFileName }}</strong>
                    </p>
                    <input
                      ref="fileInputRef"
                      type="file"
                      class="sr-only"
                      accept=".pdf,.jpg,.jpeg,.png,application/pdf,image/*"
                      @change="onFileChange"
                    />
                    <div class="vp-inline-actions">
                      <button
                        type="button"
                        class="vp-btn vp-btn-secondary"
                        :disabled="
                          activeStatus === 'locked' || vendor.isFinalSubmitted
                        "
                        @click="openFilePicker"
                      >
                        <Upload :size="14" :stroke-width="2.3" />
                        {{
                          activeProgress?.uploadedFileName
                            ? 'Replace File'
                            : 'Choose File & Upload'
                        }}
                      </button>
                      <button
                        type="button"
                        class="vp-btn vp-btn-secondary"
                        :disabled="
                          !hasUploadedFile || viewingBidId === activeBidId
                        "
                        @click="viewDocument(activeBidId)"
                      >
                        <Eye :size="14" :stroke-width="2.3" />
                        {{
                          viewingBidId === activeBidId
                            ? 'Opening…'
                            : 'View Uploaded Document'
                        }}
                      </button>
                    </div>
                  </td>
                </tr>

                <tr>
                  <th scope="row">
                    <span class="vp-step-no">3</span>
                    Confirm Completion
                  </th>
                  <td>
                    <p>
                      After successful upload, mark this BID complete to unlock
                      the next stage.
                    </p>
                    <button
                      type="button"
                      class="vp-btn vp-btn-primary"
                      :disabled="
                        activeStatus === 'locked' ||
                        activeStatus === 'completed' ||
                        !activeProgress?.uploadedFileName
                      "
                      @click="onComplete"
                    >
                      <Check :size="14" :stroke-width="2.5" />
                      {{
                        stageComplete
                          ? 'Stage Completed'
                          : 'Submit & Mark Complete'
                      }}
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="vp-footnote">
            <p>
              <strong>Note:</strong> All stages are mandatory and must be
              completed in sequence (BID 1 to BID 16). Incomplete or incorrect
              uploads may delay empanelment processing. After BID 16, Final
              Review &amp; Submit will open.
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.vp {
  font-family: var(--font-sans);
  color: #1a1f2e;
}

/* ── Masthead ── */
.vp-masthead {
  background: linear-gradient(180deg, #001038 0%, #1a1450 55%, #2a1a68 100%);
  color: #fff;
  border-bottom: 4px solid #382080;
}

.vp-masthead-inner {
  width: min(100%, 1180px);
  margin: 0 auto;
  padding: 1.1rem 1.15rem 1.2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

@media (min-width: 900px) {
  .vp-masthead-inner {
    flex-direction: row;
    align-items: flex-end;
    justify-content: space-between;
    gap: 2rem;
    padding: 1.25rem 1.5rem 1.35rem;
  }
}

.vp-dept {
  margin: 0;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: #c4b5f0;
}

.vp-dept-sub {
  margin: 0.2rem 0 0;
  font-size: 12px;
  color: rgba(255, 255, 255, 0.62);
}

.vp-portal-title {
  margin: 0.7rem 0 0;
  display: flex;
  flex-direction: column;
  gap: 0.1rem;
}

.vp-portal-title-main {
  font-family: var(--font-display);
  font-size: clamp(1.55rem, 2.8vw, 2rem);
  font-weight: 700;
  line-height: 1.1;
  letter-spacing: -0.02em;
  color: #fff;
}

.vp-portal-title-sub {
  font-family: var(--font-display);
  font-size: clamp(1.15rem, 2.2vw, 1.45rem);
  font-weight: 600;
  line-height: 1.2;
  letter-spacing: -0.015em;
  color: #c4b5f0;
}

.vp-masthead-account {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  gap: 0.85rem 1.1rem;
  padding: 0.85rem 0.95rem;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.12);
}

.vp-account-meta {
  margin: 0;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, auto));
  gap: 0.65rem 1.25rem;
}

.vp-account-meta dt {
  font-size: 10.5px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.5);
}

.vp-account-meta dd {
  margin: 0.15rem 0 0;
  font-size: 13px;
  font-weight: 700;
  color: #fff;
}

.vp-logout {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  height: 2.2rem;
  padding: 0 0.85rem;
  border: 1px solid rgba(255, 255, 255, 0.35);
  background: transparent;
  color: #fff;
  font-family: var(--font-sans);
  font-size: 12.5px;
  font-weight: 700;
  cursor: pointer;
}

.vp-logout:hover {
  background: rgba(255, 255, 255, 0.1);
}

/* ── Shell ── */
.vp-shell {
  width: min(100%, 1180px);
  margin: 0 auto;
  padding: 0.9rem 1.15rem 2.5rem;
}

@media (min-width: 768px) {
  .vp-shell {
    padding: 1rem 1.5rem 3rem;
  }
}

.vp-crumb {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.4rem;
  margin-bottom: 0.85rem;
  font-size: 12.5px;
  color: #5a6175;
}

.vp-crumb a {
  color: #382080;
  font-weight: 700;
  text-decoration: none;
}

.vp-crumb a:hover {
  text-decoration: underline;
}

/* ── Progress summary ── */
.vp-summary {
  background: #fff;
  border: 1px solid #cfd3dc;
  margin-bottom: 0.9rem;
}

.vp-summary-head {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: space-between;
  gap: 0.75rem 1.25rem;
  padding: 0.85rem 1rem;
  background: #f4f5f8;
  border-bottom: 1px solid #cfd3dc;
}

.vp-summary-head h2 {
  margin: 0;
  font-size: 13.5px;
  font-weight: 700;
  color: #001038;
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.vp-summary-head p {
  margin: 0.25rem 0 0;
  font-size: 12.5px;
  color: #5a6175;
}

.vp-summary-current {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.15rem;
  padding: 0.45rem 0.7rem;
  background: #fff;
  border: 1px solid #cfd3dc;
}

.vp-summary-current span {
  font-size: 10.5px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #5a6175;
}

.vp-summary-current strong {
  font-size: 15px;
  font-weight: 800;
  color: #382080;
}

.vp-summary-stats {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0;
  border-bottom: 1px solid #cfd3dc;
}

@media (min-width: 720px) {
  .vp-summary-stats {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
}

.vp-stat {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  padding: 0.9rem 1rem;
  border-right: 1px solid #cfd3dc;
  border-bottom: 1px solid #cfd3dc;
}

@media (min-width: 720px) {
  .vp-stat {
    border-bottom: 0;
  }

  .vp-stat:last-child {
    border-right: 0;
  }
}

@media (max-width: 719px) {
  .vp-stat:nth-child(2n) {
    border-right: 0;
  }

  .vp-stat:nth-child(n + 3) {
    border-bottom: 0;
  }
}

.vp-stat-value {
  font-size: 1.45rem;
  font-weight: 800;
  line-height: 1;
  font-variant-numeric: tabular-nums;
  color: #001038;
}

.vp-stat.is-done .vp-stat-value {
  color: #0f766e;
}

.vp-stat.is-active .vp-stat-value {
  color: #382080;
}

.vp-stat.is-left .vp-stat-value {
  color: #6b7280;
}

.vp-stat.is-total .vp-stat-value {
  color: #001038;
}

.vp-stat-label {
  font-size: 11.5px;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: #5a6175;
}

.vp-summary-bar {
  padding: 0.9rem 1rem 1rem;
}

.vp-summary-bar-meta {
  display: flex;
  justify-content: space-between;
  gap: 0.75rem;
  margin-bottom: 0.45rem;
  font-size: 12px;
  font-weight: 600;
  color: #5a6175;
}

.vp-summary-bar-meta span:nth-child(2) {
  text-align: center;
  color: #001038;
}

.vp-progress-track {
  height: 10px;
  background: #e4e6ec;
  border: 1px solid #cfd3dc;
  overflow: hidden;
}

.vp-progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #0f766e 0%, #382080 100%);
  transition: width 0.35s ease;
}

.vp-summary-legend {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem 1.25rem;
  margin-top: 0.65rem;
  font-size: 12px;
  font-weight: 600;
  color: #5a6175;
}

.vp-summary-legend span {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
}

.vp-dot {
  display: inline-block;
  width: 0.55rem;
  height: 0.55rem;
  border: 1px solid transparent;
}

.vp-dot.is-done {
  background: #0f766e;
}

.vp-dot.is-active {
  background: #382080;
}

.vp-dot.is-left {
  background: #d1d5db;
  border-color: #9ca3af;
}

/* ── Layout ── */
.vp-layout {
  display: grid;
  gap: 0.9rem;
}

@media (min-width: 980px) {
  .vp-layout {
    grid-template-columns: 15.5rem minmax(0, 1fr);
    align-items: start;
  }
}

.vp-panel {
  background: #fff;
  border: 1px solid #cfd3dc;
}

.vp-panel-head {
  padding: 0.7rem 0.85rem;
  background: #f4f5f8;
  border-bottom: 1px solid #cfd3dc;
}

.vp-panel-head h2 {
  margin: 0;
  font-size: 13.5px;
  font-weight: 700;
  color: #001038;
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.vp-panel-head p {
  margin: 0.2rem 0 0;
  font-size: 12px;
  color: #5a6175;
}

/* Stage table */
.vp-stage-table-wrap {
  max-height: min(62vh, 36rem);
  overflow: auto;
}

.vp-stage-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 12.75px;
}

.vp-stage-table th {
  padding: 0.45rem 0.7rem;
  text-align: left;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: #5a6175;
  background: #fafafb;
  border-bottom: 1px solid #cfd3dc;
}

.vp-stage-table td {
  padding: 0.35rem 0.55rem;
  border-bottom: 1px solid #e6e8ee;
  vertical-align: middle;
}

.vp-stage-table tr.is-selected {
  background: rgba(56, 32, 128, 0.08);
}

.vp-stage-table tr.is-locked {
  opacity: 0.7;
}

.vp-stage-link {
  border: 0;
  background: transparent;
  padding: 0.25rem 0.15rem;
  color: #001038;
  font-family: var(--font-sans);
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
  text-align: left;
}

.vp-stage-link:disabled {
  color: #8a90a0;
  cursor: not-allowed;
  font-weight: 600;
}

.vp-stage-link:hover:not(:disabled) {
  color: #382080;
  text-decoration: underline;
}

.vp-status-chip {
  display: inline-block;
  padding: 0.18rem 0.4rem;
  font-size: 10.5px;
  font-weight: 700;
  letter-spacing: 0.03em;
  text-transform: uppercase;
  border: 1px solid transparent;
}

.vp-status-chip.is-lg {
  padding: 0.3rem 0.55rem;
  font-size: 11px;
}

.vp-status-chip.is-current,
.vp-status-chip.is-uploaded {
  background: rgba(56, 32, 128, 0.1);
  border-color: rgba(56, 32, 128, 0.25);
  color: #382080;
}

.vp-status-chip.is-completed {
  background: rgba(15, 118, 110, 0.1);
  border-color: rgba(15, 118, 110, 0.28);
  color: #0f766e;
}

.vp-status-chip.is-locked {
  background: #f1f2f5;
  border-color: #d5d8e0;
  color: #6b7280;
}

/* Work panel */
.vp-work-head {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: space-between;
  gap: 0.75rem;
}

.vp-work-code {
  margin: 0;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: #382080;
}

.vp-work-head h2 {
  margin: 0.25rem 0 0;
  font-family: var(--font-display);
  font-size: clamp(1.15rem, 2vw, 1.4rem);
  font-weight: 700;
  letter-spacing: -0.015em;
  text-transform: none;
  color: #001038;
  line-height: 1.25;
}

.vp-instruct {
  display: flex;
  gap: 0.55rem;
  align-items: flex-start;
  margin: 0.85rem 0.9rem 0;
  padding: 0.7rem 0.8rem;
  background: #fff8e8;
  border: 1px solid #e8d5a3;
  color: #5c4a1f;
}

.vp-instruct p {
  margin: 0;
  font-size: 13px;
  line-height: 1.5;
}

.vp-toast {
  margin: 0.75rem 0.9rem 0;
  padding: 0.65rem 0.75rem;
  background: #eef2ff;
  border: 1px solid #c7d2fe;
  color: #1e1b4b;
  font-size: 13px;
  font-weight: 600;
  line-height: 1.45;
}

.vp-form-block {
  margin: 0.9rem;
  border: 1px solid #cfd3dc;
}

.vp-form-title {
  margin: 0;
  padding: 0.55rem 0.75rem;
  background: #382080;
  color: #fff;
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.vp-action-table {
  width: 100%;
  border-collapse: collapse;
}

.vp-action-table th,
.vp-action-table td {
  padding: 0.95rem 0.85rem;
  border-top: 1px solid #cfd3dc;
  vertical-align: top;
  text-align: left;
}

.vp-action-table th {
  width: 11.5rem;
  background: #f7f8fa;
  font-size: 13px;
  font-weight: 700;
  color: #001038;
}

@media (max-width: 640px) {
  .vp-action-table,
  .vp-action-table tbody,
  .vp-action-table tr,
  .vp-action-table th,
  .vp-action-table td {
    display: block;
    width: 100%;
  }

  .vp-action-table th {
    border-bottom: 0;
  }
}

.vp-step-no {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 1.35rem;
  height: 1.35rem;
  margin-right: 0.4rem;
  background: #382080;
  color: #fff;
  font-size: 11px;
  font-weight: 800;
  vertical-align: middle;
}

.vp-action-table td p {
  margin: 0 0 0.7rem;
  font-size: 13.25px;
  line-height: 1.5;
  color: #3d4458;
}

.vp-file-name {
  display: inline-flex !important;
  align-items: center;
  gap: 0.35rem;
  margin-bottom: 0.65rem !important;
  color: #0f766e !important;
  font-weight: 600;
}

.vp-done-note {
  display: inline-flex !important;
  align-items: center;
  gap: 0.3rem;
  margin: 0.55rem 0 0 !important;
  color: #0f766e !important;
  font-size: 12.5px !important;
  font-weight: 700;
}

.vp-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  min-height: 2.35rem;
  padding: 0.45rem 0.9rem;
  border: 1px solid transparent;
  font-family: var(--font-sans);
  font-size: 12.75px;
  font-weight: 700;
  cursor: pointer;
}

.vp-btn-primary {
  background: #382080;
  border-color: #2a1868;
  color: #fff;
}

.vp-btn-primary:hover:not(:disabled) {
  background: #001038;
}

.vp-btn-secondary {
  background: #fff;
  border-color: #382080;
  color: #382080;
}

.vp-btn-secondary:hover:not(:disabled) {
  background: rgba(56, 32, 128, 0.06);
}

.vp-btn:disabled {
  opacity: 0.45;
  cursor: not-allowed;
}

.vp-footnote {
  margin: 0 0.9rem 0.95rem;
  padding: 0.7rem 0.75rem;
  background: #f7f8fa;
  border: 1px solid #e1e4ea;
}

.vp-footnote p {
  margin: 0;
  font-size: 12.25px;
  line-height: 1.5;
  color: #5a6175;
}

.vp-final-row td {
  padding: 0.45rem 0.55rem !important;
  background: #f7f8fa;
}

.vp-final-row.is-selected td {
  background: rgba(56, 32, 128, 0.08);
}

.vp-final-row.is-done td {
  background: rgba(15, 118, 110, 0.08);
}

.vp-final-link {
  display: flex !important;
  width: 100%;
  align-items: center;
  gap: 0.45rem;
  padding: 0.4rem 0.2rem !important;
}

.vp-final-link .vp-status-chip {
  margin-left: auto;
}

.vp-review-wrap {
  max-height: min(42vh, 22rem);
  overflow: auto;
}

.vp-review-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 12.75px;
}

.vp-review-table th {
  position: sticky;
  top: 0;
  z-index: 1;
  padding: 0.5rem 0.7rem;
  text-align: left;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: #5a6175;
  background: #fafafb;
  border-bottom: 1px solid #cfd3dc;
}

.vp-review-table td {
  padding: 0.5rem 0.7rem;
  border-bottom: 1px solid #e6e8ee;
  vertical-align: middle;
  color: #3d4458;
}

.vp-file-cell {
  max-width: 14rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-weight: 600;
  color: #001038;
}

.vp-submit-success {
  display: flex;
  gap: 0.65rem;
  align-items: flex-start;
  margin: 0.85rem 0.9rem 0;
  padding: 0.8rem 0.85rem;
  background: #ecfdf5;
  border: 1px solid #a7f3d0;
  color: #065f46;
}

.vp-submit-success strong {
  display: block;
  font-size: 13.5px;
}

.vp-submit-success p {
  margin: 0.25rem 0 0;
  font-size: 12.75px;
  line-height: 1.45;
  font-weight: 500;
}

.vp-consent-block {
  margin: 0.9rem;
  border: 1px solid #cfd3dc;
}

.vp-consent {
  display: flex;
  gap: 0.7rem;
  align-items: flex-start;
  padding: 0.9rem 0.85rem;
  font-size: 13px;
  line-height: 1.55;
  color: #3d4458;
  cursor: pointer;
}

.vp-consent input {
  margin-top: 0.2rem;
  width: 1.05rem;
  height: 1.05rem;
  flex-shrink: 0;
  accent-color: #382080;
}

.vp-consent-actions {
  padding: 0 0.85rem 0.95rem;
}

.vp-consent-hint {
  margin: 0.55rem 0 0;
  font-size: 12.25px;
  line-height: 1.45;
  color: #8a5a00;
}

.vp-inline-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.vp-btn-compact {
  min-height: 2rem;
  padding: 0.3rem 0.65rem;
  font-size: 11.5px;
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
</style>
