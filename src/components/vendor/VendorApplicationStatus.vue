<script setup lang="ts">
import { vendorBids } from '@/data/vendorBids'
import { useVendorStore, type ApplicationStatus } from '@/stores/vendor'
import { openVendorBidFile } from '@/utils/vendorFiles'
import {
  CheckCircle2,
  Clock3,
  Eye,
  FileText,
  LogOut,
  X,
  XCircle,
} from 'lucide-vue-next'
import { computed, ref } from 'vue'
import { RouterLink } from 'vue-router'

const vendor = useVendorStore()

const showDocsModal = ref(false)
const viewingBidId = ref<number | null>(null)
const viewError = ref('')

const submittedAtLabel = computed(() => {
  const raw = vendor.currentVendor?.finalSubmittedAt
  if (!raw) return '—'
  return new Date(raw).toLocaleString('en-IN')
})

const status = computed<ApplicationStatus>(
  () => vendor.currentVendor?.applicationStatus ?? 'in_progress',
)

const statusLabel = computed(() => {
  switch (status.value) {
    case 'approved':
      return 'Approved'
    case 'rejected':
      return 'Rejected'
    default:
      return 'In Progress'
  }
})

const documentRows = computed(() =>
  vendorBids.map((bid) => {
    const progress = vendor.currentVendor?.bids[bid.id]
    return {
      id: bid.id,
      code: bid.code,
      title: bid.title,
      fileName: progress?.uploadedFileName ?? '—',
      hasFile: Boolean(progress?.uploadedFileName),
      uploadedAt: progress?.uploadedAt
        ? new Date(progress.uploadedAt).toLocaleString('en-IN')
        : '—',
    }
  }),
)

function openDocuments() {
  viewError.value = ''
  showDocsModal.value = true
}

function closeDocuments() {
  showDocsModal.value = false
  viewError.value = ''
}

async function viewDocument(bidId: number) {
  const vendorId = vendor.currentVendor?.id
  const fileName = vendor.currentVendor?.bids[bidId]?.uploadedFileName
  if (!vendorId || !fileName) {
    viewError.value = 'No uploaded document is available for this stage.'
    return
  }

  viewingBidId.value = bidId
  viewError.value = ''
  try {
    const opened = await openVendorBidFile(vendorId, bidId)
    if (!opened) {
      viewError.value =
        'Document file is not available for viewing. Please contact OREDA support if this persists.'
    }
  } catch {
    viewError.value = 'Unable to open the document. Please try again.'
  } finally {
    viewingBidId.value = null
  }
}
</script>

<template>
  <section class="vas" aria-label="Vendor application status">
    <header class="vas-masthead">
      <div class="vas-masthead-inner">
        <div>
          <p class="vas-dept">Odisha Renewable Energy Development Agency</p>
          <p class="vas-dept-sub">Department of Energy · Government of Odisha</p>
          <h1 class="vas-title">
            <span>Vendor</span>
            <span>e-Empanelment Portal</span>
          </h1>
        </div>
        <div class="vas-account">
          <div>
            <p class="vas-account-label">Organisation</p>
            <p class="vas-account-value">
              {{ vendor.currentVendor?.organisationName }}
            </p>
          </div>
          <button type="button" class="vas-logout" @click="vendor.logout()">
            <LogOut :size="14" :stroke-width="2.3" />
            Logout
          </button>
        </div>
      </div>
    </header>

    <div class="vas-shell">
      <nav class="vas-crumb" aria-label="Breadcrumb">
        <RouterLink to="/">Home</RouterLink>
        <span aria-hidden="true">»</span>
        <span>Application Status</span>
      </nav>

      <div class="vas-panel">
        <div class="vas-panel-head">
          <h2>Application Status</h2>
          <p>Track your submitted vendor empanelment application.</p>
        </div>

        <div class="vas-grid">
          <div class="vas-field">
            <span class="vas-label">Application Number</span>
            <button
              type="button"
              class="vas-app-no"
              @click="openDocuments"
              :title="'View uploaded documents'"
            >
              {{ vendor.currentVendor?.applicationNumber || '—' }}
            </button>
            <p class="vas-hint">Click application number to view uploaded documents.</p>
          </div>

          <div class="vas-field">
            <span class="vas-label">Organisation</span>
            <strong>{{ vendor.currentVendor?.organisationName }}</strong>
          </div>

          <div class="vas-field">
            <span class="vas-label">Submitted On</span>
            <strong>{{ submittedAtLabel }}</strong>
          </div>

          <div class="vas-field">
            <span class="vas-label">Application Status</span>
            <span class="vas-status" :class="`is-${status}`">
              <CheckCircle2
                v-if="status === 'approved'"
                :size="15"
                :stroke-width="2.3"
              />
              <XCircle
                v-else-if="status === 'rejected'"
                :size="15"
                :stroke-width="2.3"
              />
              <Clock3 v-else :size="15" :stroke-width="2.3" />
              {{ statusLabel }}
            </span>
          </div>
        </div>

        <div class="vas-remark">
          <span class="vas-label">Remark</span>
          <p>
            {{
              vendor.currentVendor?.applicationRemark ||
              'No remark available at this time.'
            }}
          </p>
        </div>

        <div class="vas-legend">
          <span class="vas-status is-in_progress"><Clock3 :size="13" /> In Progress</span>
          <span class="vas-status is-approved"><CheckCircle2 :size="13" /> Approved</span>
          <span class="vas-status is-rejected"><XCircle :size="13" /> Rejected</span>
        </div>
      </div>
    </div>

    <div
      v-if="showDocsModal"
      class="vas-modal-root"
      role="dialog"
      aria-modal="true"
      aria-labelledby="vas-docs-title"
    >
      <button
        type="button"
        class="vas-modal-backdrop"
        aria-label="Close documents"
        @click="closeDocuments"
      />
      <div class="vas-modal">
        <header class="vas-modal-head">
          <div>
            <p class="vas-modal-kicker">Uploaded Documents</p>
            <h3 id="vas-docs-title">
              {{ vendor.currentVendor?.applicationNumber }}
            </h3>
          </div>
          <button
            type="button"
            class="vas-modal-close"
            aria-label="Close"
            @click="closeDocuments"
          >
            <X :size="18" :stroke-width="2.2" />
          </button>
        </header>

        <p v-if="viewError" class="vas-modal-error" role="alert">{{ viewError }}</p>

        <div class="vas-modal-body">
          <table class="vas-docs-table">
            <thead>
              <tr>
                <th scope="col">Stage</th>
                <th scope="col">Document</th>
                <th scope="col">Uploaded On</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="row in documentRows" :key="row.id">
                <td>
                  <span class="vas-doc-code">{{ row.code }}</span>
                  <span class="vas-doc-title">{{ row.title }}</span>
                </td>
                <td class="vas-doc-file">
                  <FileText :size="14" :stroke-width="2.2" />
                  {{ row.fileName }}
                </td>
                <td>{{ row.uploadedAt }}</td>
                <td>
                  <button
                    type="button"
                    class="vas-view-btn"
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
    </div>
  </section>
</template>

<style scoped>
.vas {
  font-family: var(--font-sans);
  color: #1a1f2e;
}

.vas-masthead {
  background: linear-gradient(180deg, #001038 0%, #1a1450 55%, #2a1a68 100%);
  color: #fff;
  border-bottom: 4px solid #382080;
}

.vas-masthead-inner {
  width: min(100%, 1100px);
  margin: 0 auto;
  padding: 1.15rem 1.15rem 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

@media (min-width: 800px) {
  .vas-masthead-inner {
    flex-direction: row;
    align-items: flex-end;
    justify-content: space-between;
    padding: 1.25rem 1.5rem 1.35rem;
  }
}

.vas-dept {
  margin: 0;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: #c4b5f0;
}

.vas-dept-sub {
  margin: 0.2rem 0 0;
  font-size: 12px;
  color: rgba(255, 255, 255, 0.62);
}

.vas-title {
  margin: 0.65rem 0 0;
  display: flex;
  flex-direction: column;
  gap: 0.1rem;
}

.vas-title span:first-child {
  font-family: var(--font-display);
  font-size: clamp(1.5rem, 2.6vw, 1.9rem);
  font-weight: 700;
  line-height: 1.1;
  color: #fff;
}

.vas-title span:last-child {
  font-family: var(--font-display);
  font-size: clamp(1.1rem, 2vw, 1.35rem);
  font-weight: 600;
  color: #c4b5f0;
}

.vas-account {
  display: flex;
  align-items: flex-end;
  gap: 1rem;
  padding: 0.75rem 0.9rem;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.12);
}

.vas-account-label {
  margin: 0;
  font-size: 10.5px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.5);
}

.vas-account-value {
  margin: 0.2rem 0 0;
  font-size: 13.5px;
  font-weight: 700;
}

.vas-logout {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  height: 2.15rem;
  padding: 0 0.8rem;
  border: 1px solid rgba(255, 255, 255, 0.35);
  background: transparent;
  color: #fff;
  font-family: var(--font-sans);
  font-size: 12.5px;
  font-weight: 700;
  cursor: pointer;
}

.vas-shell {
  width: min(100%, 1100px);
  margin: 0 auto;
  padding: 0.9rem 1.15rem 2.75rem;
}

.vas-crumb {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.4rem;
  margin-bottom: 0.85rem;
  font-size: 12.5px;
  color: #5a6175;
}

.vas-crumb a {
  color: #382080;
  font-weight: 700;
  text-decoration: none;
}

.vas-panel {
  background: #fff;
  border: 1px solid #cfd3dc;
}

.vas-panel-head {
  padding: 0.85rem 1rem;
  background: #f4f5f8;
  border-bottom: 1px solid #cfd3dc;
}

.vas-panel-head h2 {
  margin: 0;
  font-size: 14px;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: #001038;
}

.vas-panel-head p {
  margin: 0.25rem 0 0;
  font-size: 12.75px;
  color: #5a6175;
}

.vas-grid {
  display: grid;
  gap: 0;
  grid-template-columns: 1fr;
}

@media (min-width: 720px) {
  .vas-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

.vas-field {
  padding: 1rem;
  border-bottom: 1px solid #e6e8ee;
  border-right: 1px solid #e6e8ee;
}

.vas-label {
  display: block;
  margin-bottom: 0.35rem;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #5a6175;
}

.vas-field strong {
  font-size: 14.5px;
  color: #001038;
}

.vas-app-no {
  display: inline-flex;
  align-items: center;
  border: 0;
  background: transparent;
  padding: 0;
  color: #382080;
  font-family: var(--font-sans);
  font-size: 1.05rem;
  font-weight: 800;
  text-decoration: underline;
  text-underline-offset: 0.18em;
  cursor: pointer;
}

.vas-app-no:hover {
  color: #001038;
}

.vas-hint {
  margin: 0.4rem 0 0;
  font-size: 12px;
  color: #6b7280;
}

.vas-status {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.35rem 0.6rem;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.03em;
  text-transform: uppercase;
  border: 1px solid transparent;
}

.vas-status.is-in_progress {
  background: rgba(56, 32, 128, 0.1);
  border-color: rgba(56, 32, 128, 0.25);
  color: #382080;
}

.vas-status.is-approved {
  background: rgba(15, 118, 110, 0.1);
  border-color: rgba(15, 118, 110, 0.28);
  color: #0f766e;
}

.vas-status.is-rejected {
  background: rgba(185, 28, 28, 0.08);
  border-color: rgba(185, 28, 28, 0.25);
  color: #b91c1c;
}

.vas-remark {
  padding: 1rem;
  border-bottom: 1px solid #e6e8ee;
}

.vas-remark p {
  margin: 0;
  padding: 0.75rem 0.85rem;
  background: #fff8e8;
  border: 1px solid #e8d5a3;
  font-size: 13.5px;
  line-height: 1.5;
  color: #5c4a1f;
}

.vas-legend {
  display: flex;
  flex-wrap: wrap;
  gap: 0.55rem;
  padding: 0.85rem 1rem 1rem;
}

/* Modal */
.vas-modal-root {
  position: fixed;
  inset: 0;
  z-index: 80;
  display: grid;
  place-items: center;
  padding: 1rem;
}

.vas-modal-backdrop {
  position: absolute;
  inset: 0;
  border: 0;
  background: rgba(0, 16, 56, 0.55);
  cursor: pointer;
}

.vas-modal {
  position: relative;
  z-index: 1;
  width: min(100%, 860px);
  max-height: min(88vh, 720px);
  display: flex;
  flex-direction: column;
  background: #fff;
  border: 1px solid #cfd3dc;
  box-shadow: 0 24px 60px rgba(0, 16, 56, 0.28);
}

.vas-modal-head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;
  padding: 0.9rem 1rem;
  background: #f4f5f8;
  border-bottom: 1px solid #cfd3dc;
}

.vas-modal-kicker {
  margin: 0;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #5a6175;
}

.vas-modal-head h3 {
  margin: 0.25rem 0 0;
  font-size: 1.05rem;
  font-weight: 800;
  color: #382080;
}

.vas-modal-close {
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

.vas-modal-error {
  margin: 0.75rem 1rem 0;
  padding: 0.65rem 0.75rem;
  background: #fef2f2;
  border: 1px solid #fecaca;
  color: #991b1b;
  font-size: 12.75px;
  font-weight: 600;
}

.vas-modal-body {
  overflow: auto;
  padding: 0.75rem;
}

.vas-docs-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 12.75px;
}

.vas-docs-table th {
  padding: 0.5rem 0.65rem;
  text-align: left;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: #5a6175;
  background: #fafafb;
  border-bottom: 1px solid #cfd3dc;
}

.vas-docs-table td {
  padding: 0.65rem;
  border-bottom: 1px solid #e6e8ee;
  vertical-align: middle;
  color: #3d4458;
}

.vas-doc-code {
  display: block;
  font-weight: 800;
  color: #001038;
}

.vas-doc-title {
  display: block;
  margin-top: 0.15rem;
  font-size: 11.5px;
  color: #6b7280;
}

.vas-doc-file {
  display: flex;
  align-items: center;
  gap: 0.35rem;
  max-width: 16rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-weight: 600;
  color: #001038;
}

.vas-view-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  min-height: 2rem;
  padding: 0.3rem 0.65rem;
  border: 1px solid #382080;
  background: #fff;
  color: #382080;
  font-family: var(--font-sans);
  font-size: 11.5px;
  font-weight: 700;
  cursor: pointer;
}

.vas-view-btn:hover:not(:disabled) {
  background: rgba(56, 32, 128, 0.06);
}

.vas-view-btn:disabled {
  opacity: 0.45;
  cursor: not-allowed;
}
</style>
