import { VENDOR_BID_COUNT } from '@/data/vendorBids'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export type ApplicationStatus = 'in_progress' | 'approved' | 'rejected'

export interface VendorBidProgress {
  downloaded: boolean
  uploadedFileName: string | null
  uploadedAt: string | null
  completed: boolean
}

export interface VendorAccount {
  id: string
  organisationName: string
  username: string
  passwordHash: string
  createdAt: string
  currentStep: number
  bids: Record<number, VendorBidProgress>
  finalSubmitted: boolean
  finalSubmittedAt: string | null
  applicationNumber: string | null
  applicationStatus: ApplicationStatus | null
  applicationRemark: string | null
}

interface VendorSession {
  vendorId: string
  username: string
  organisationName: string
}

const ACCOUNTS_KEY = 'oreda-vendor-accounts'
const SESSION_KEY = 'oreda-vendor-session'

function emptyBids(): Record<number, VendorBidProgress> {
  const bids: Record<number, VendorBidProgress> = {}
  for (let i = 1; i <= VENDOR_BID_COUNT; i += 1) {
    bids[i] = {
      downloaded: false,
      uploadedFileName: null,
      uploadedAt: null,
      completed: false,
    }
  }
  return bids
}

function hashPassword(password: string) {
  // Client-side demo hash only — replace with real auth when backend is ready.
  let hash = 0
  for (let i = 0; i < password.length; i += 1) {
    hash = (hash << 5) - hash + password.charCodeAt(i)
    hash |= 0
  }
  return `v1:${password.length}:${hash}`
}

function createApplicationNumber(dateInput?: string | null) {
  const now = dateInput ? new Date(dateInput) : new Date()
  const safe = Number.isNaN(now.getTime()) ? new Date() : now
  const y = safe.getFullYear()
  const m = String(safe.getMonth() + 1).padStart(2, '0')
  const d = String(safe.getDate()).padStart(2, '0')
  const seq = String(Math.floor(Math.random() * 9000) + 1000)
  return `OREDA/VEP/${y}${m}${d}/${seq}`
}

function createStableApplicationNumber(account: VendorAccount) {
  const stamp = account.finalSubmittedAt || account.createdAt || ''
  const date = new Date(stamp)
  const safe = Number.isNaN(date.getTime()) ? new Date() : date
  const y = safe.getFullYear()
  const m = String(safe.getMonth() + 1).padStart(2, '0')
  const d = String(safe.getDate()).padStart(2, '0')
  const seed = account.id.replace(/\W/g, '').slice(-4).toUpperCase() || '0000'
  return `OREDA/VEP/${y}${m}${d}/${seed}`
}

function normalizeAccount(account: VendorAccount): VendorAccount {
  const finalSubmitted = Boolean(account.finalSubmitted)
  return {
    ...account,
    finalSubmitted,
    finalSubmittedAt: account.finalSubmittedAt ?? null,
    applicationNumber:
      account.applicationNumber ??
      (finalSubmitted ? createStableApplicationNumber(account) : null),
    applicationStatus:
      account.applicationStatus ?? (finalSubmitted ? 'in_progress' : null),
    applicationRemark:
      account.applicationRemark ??
      (finalSubmitted
        ? 'Application received successfully and is under scrutiny by OREDA.'
        : null),
    bids: account.bids ?? emptyBids(),
  }
}

function loadAccounts(): VendorAccount[] {
  try {
    const raw = localStorage.getItem(ACCOUNTS_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw) as VendorAccount[]
    if (!Array.isArray(parsed)) return []

    let dirty = false
    const normalized = parsed.map((account) => {
      const next = normalizeAccount(account)
      if (
        next.finalSubmitted &&
        (!account.applicationNumber ||
          !account.applicationStatus ||
          !account.applicationRemark)
      ) {
        dirty = true
      }
      return next
    })

    if (dirty) saveAccounts(normalized)
    return normalized
  } catch {
    return []
  }
}

function saveAccounts(accounts: VendorAccount[]) {
  localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(accounts))
}

function loadSession(): VendorSession | null {
  try {
    const raw = localStorage.getItem(SESSION_KEY)
    if (!raw) return null
    return JSON.parse(raw) as VendorSession
  } catch {
    return null
  }
}

function createId() {
  return `vnd_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`
}

export const useVendorStore = defineStore('vendor', () => {
  const accounts = ref<VendorAccount[]>(loadAccounts())
  const session = ref<VendorSession | null>(loadSession())
  const authError = ref('')
  const authSuccess = ref('')

  const isLoggedIn = computed(() => Boolean(session.value))

  const currentVendor = computed(() => {
    if (!session.value) return null
    return accounts.value.find((a) => a.id === session.value?.vendorId) ?? null
  })

  const completedCount = computed(() => {
    const vendor = currentVendor.value
    if (!vendor) return 0
    let count = 0
    for (let i = 1; i <= VENDOR_BID_COUNT; i += 1) {
      const bid = vendor.bids[i]
      if (bid?.completed && bid.uploadedFileName) count += 1
    }
    return count
  })

  const progressPercent = computed(() =>
    Math.round((completedCount.value / VENDOR_BID_COUNT) * 100),
  )

  const allBidsComplete = computed(() => {
    const vendor = currentVendor.value
    if (!vendor) return false
    for (let i = 1; i <= VENDOR_BID_COUNT; i += 1) {
      const bid = vendor.bids[i]
      if (!bid?.completed || !bid.uploadedFileName) return false
    }
    return true
  })

  const isFinalSubmitted = computed(
    () => Boolean(currentVendor.value?.finalSubmitted),
  )

  function persist() {
    saveAccounts(accounts.value)
    if (session.value) {
      localStorage.setItem(SESSION_KEY, JSON.stringify(session.value))
    } else {
      localStorage.removeItem(SESSION_KEY)
    }
  }

  function clearMessages() {
    authError.value = ''
    authSuccess.value = ''
  }

  function signup(payload: {
    organisationName: string
    username: string
    password: string
  }) {
    clearMessages()
    const organisationName = payload.organisationName.trim()
    const username = payload.username.trim().toLowerCase()
    const password = payload.password

    if (organisationName.length < 2) {
      authError.value = 'Please enter a valid organisation name.'
      return false
    }
    if (username.length < 3) {
      authError.value = 'Username must be at least 3 characters.'
      return false
    }
    if (password.length < 6) {
      authError.value = 'Password must be at least 6 characters.'
      return false
    }
    if (accounts.value.some((a) => a.username === username)) {
      authError.value = 'This username is already registered. Please log in.'
      return false
    }

    const account: VendorAccount = {
      id: createId(),
      organisationName,
      username,
      passwordHash: hashPassword(password),
      createdAt: new Date().toISOString(),
      currentStep: 1,
      bids: emptyBids(),
      finalSubmitted: false,
      finalSubmittedAt: null,
      applicationNumber: null,
      applicationStatus: null,
      applicationRemark: null,
    }

    accounts.value = [...accounts.value, account]
    session.value = {
      vendorId: account.id,
      username: account.username,
      organisationName: account.organisationName,
    }
    persist()
    authSuccess.value = 'Account created successfully. Welcome to Vendor Empanelment.'
    return true
  }

  function login(payload: { username: string; password: string }) {
    clearMessages()
    const username = payload.username.trim().toLowerCase()
    const password = payload.password
    const account = accounts.value.find((a) => a.username === username)

    if (!account || account.passwordHash !== hashPassword(password)) {
      authError.value = 'Invalid username or password.'
      return false
    }

    session.value = {
      vendorId: account.id,
      username: account.username,
      organisationName: account.organisationName,
    }
    persist()
    return true
  }

  function logout() {
    session.value = null
    clearMessages()
    localStorage.removeItem(SESSION_KEY)
  }

  function updateVendor(mutator: (vendor: VendorAccount) => void) {
    const vendor = currentVendor.value
    if (!vendor) return
    mutator(vendor)
    accounts.value = accounts.value.map((a) => (a.id === vendor.id ? { ...vendor } : a))
    persist()
  }

  function markDownloaded(bidId: number) {
    updateVendor((vendor) => {
      const bid = vendor.bids[bidId]
      if (!bid || bidId > vendor.currentStep) return
      bid.downloaded = true
    })
  }

  function uploadBidFile(bidId: number, fileName: string) {
    updateVendor((vendor) => {
      if (vendor.finalSubmitted) return
      const bid = vendor.bids[bidId]
      if (!bid || bidId > vendor.currentStep) return
      bid.uploadedFileName = fileName
      bid.uploadedAt = new Date().toISOString()
      if (bid.completed || bidId < vendor.currentStep) {
        bid.completed = true
      }
    })
  }

  function completeBid(bidId: number) {
    updateVendor((vendor) => {
      const bid = vendor.bids[bidId]
      if (!bid || bidId > vendor.currentStep) return
      if (!bid.uploadedFileName) return
      bid.completed = true

      for (let i = 1; i < bidId; i += 1) {
        const prev = vendor.bids[i]
        if (prev?.uploadedFileName) prev.completed = true
      }

      if (bidId === vendor.currentStep && vendor.currentStep < VENDOR_BID_COUNT) {
        vendor.currentStep += 1
      }
    })
  }

  function getBidStatus(bidId: number): 'locked' | 'current' | 'uploaded' | 'completed' {
    const vendor = currentVendor.value
    if (!vendor) return 'locked'
    const bid = vendor.bids[bidId]
    if (!bid) return 'locked'
    if (bid.completed) return 'completed'
    if (bidId === vendor.currentStep) {
      return bid.uploadedFileName ? 'uploaded' : 'current'
    }
    if (bidId < vendor.currentStep) {
      return bid.uploadedFileName ? 'completed' : 'current'
    }
    return 'locked'
  }

  function syncCompletionState() {
    updateVendor((vendor) => {
      for (let i = 1; i <= VENDOR_BID_COUNT; i += 1) {
        const bid = vendor.bids[i]
        if (!bid) continue
        if (bid.uploadedFileName && i <= vendor.currentStep) {
          if (i < vendor.currentStep || bid.completed) {
            bid.completed = true
          }
        }
      }

      let allUploaded = true
      for (let i = 1; i <= VENDOR_BID_COUNT; i += 1) {
        if (!vendor.bids[i]?.uploadedFileName) {
          allUploaded = false
          break
        }
      }
      if (allUploaded) {
        for (let i = 1; i <= VENDOR_BID_COUNT; i += 1) {
          vendor.bids[i].completed = true
        }
        vendor.currentStep = VENDOR_BID_COUNT
      }
    })
  }

  function submitFinalApplication() {
    const vendor = currentVendor.value
    if (!vendor || vendor.finalSubmitted) return null

    syncCompletionState()
    const latest = currentVendor.value
    if (!latest) return null

    for (let i = 1; i <= VENDOR_BID_COUNT; i += 1) {
      const bid = latest.bids[i]
      if (!bid?.completed || !bid.uploadedFileName) return null
    }

    const submittedAt = new Date().toISOString()
    const applicationNumber =
      latest.applicationNumber || createApplicationNumber(submittedAt)

    updateVendor((account) => {
      account.finalSubmitted = true
      account.finalSubmittedAt = submittedAt
      account.applicationNumber = applicationNumber
      account.applicationStatus = 'in_progress'
      account.applicationRemark =
        'Application received successfully and is under scrutiny by OREDA.'
    })

    return applicationNumber
  }

  return {
    accounts,
    session,
    authError,
    authSuccess,
    isLoggedIn,
    currentVendor,
    completedCount,
    progressPercent,
    allBidsComplete,
    isFinalSubmitted,
    clearMessages,
    signup,
    login,
    logout,
    markDownloaded,
    uploadBidFile,
    completeBid,
    getBidStatus,
    syncCompletionState,
    submitFinalApplication,
  }
})
