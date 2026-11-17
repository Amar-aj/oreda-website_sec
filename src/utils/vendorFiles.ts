const DB_NAME = 'oreda-vendor-docs'
const DB_VERSION = 1
const STORE = 'files'

interface StoredFile {
  name: string
  type: string
  buffer: ArrayBuffer
  savedAt: number
}

function fileKey(vendorId: string, bidId: number) {
  return `${vendorId}:${bidId}`
}

function openDb(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION)

    request.onupgradeneeded = () => {
      const db = request.result
      if (!db.objectStoreNames.contains(STORE)) {
        db.createObjectStore(STORE)
      }
    }

    request.onsuccess = () => resolve(request.result)
    request.onerror = () => reject(request.error ?? new Error('IndexedDB open failed'))
  })
}

export async function saveVendorBidFile(
  vendorId: string,
  bidId: number,
  file: File,
): Promise<void> {
  const buffer = await file.arrayBuffer()
  const record: StoredFile = {
    name: file.name,
    type: file.type || 'application/octet-stream',
    buffer,
    savedAt: Date.now(),
  }

  const db = await openDb()
  await new Promise<void>((resolve, reject) => {
    const tx = db.transaction(STORE, 'readwrite')
    tx.oncomplete = () => resolve()
    tx.onerror = () => reject(tx.error ?? new Error('Failed to save file'))
    tx.objectStore(STORE).put(record, fileKey(vendorId, bidId))
  })
  db.close()
}

export async function getVendorBidFile(
  vendorId: string,
  bidId: number,
): Promise<{ blob: Blob; name: string } | null> {
  const db = await openDb()
  const record = await new Promise<StoredFile | undefined>((resolve, reject) => {
    const tx = db.transaction(STORE, 'readonly')
    const request = tx.objectStore(STORE).get(fileKey(vendorId, bidId))
    request.onsuccess = () => resolve(request.result as StoredFile | undefined)
    request.onerror = () => reject(request.error ?? new Error('Failed to read file'))
  })
  db.close()

  if (!record?.buffer) return null
  return {
    name: record.name,
    blob: new Blob([record.buffer], { type: record.type }),
  }
}

export async function openVendorBidFile(
  vendorId: string,
  bidId: number,
): Promise<boolean> {
  const file = await getVendorBidFile(vendorId, bidId)
  if (!file) return false

  const url = URL.createObjectURL(file.blob)
  const opened = window.open(url, '_blank', 'noopener,noreferrer')
  window.setTimeout(() => URL.revokeObjectURL(url), 60_000)
  return Boolean(opened)
}
