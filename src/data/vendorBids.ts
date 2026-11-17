export type BidStatus = 'locked' | 'current' | 'uploaded' | 'completed'

export interface VendorBidDef {
  id: number
  code: string
  title: string
  summary: string
  documentLabel: string
}

export const VENDOR_BID_COUNT = 16

export const vendorBids: VendorBidDef[] = Array.from({ length: VENDOR_BID_COUNT }, (_, i) => {
  const id = i + 1
  return {
    id,
    code: `BID ${id}`,
    title: `Empanelment document — Stage ${id}`,
    summary:
      id === 1
        ? 'Download the stage form, complete it offline, scan the signed copy, and upload it to proceed.'
        : `Continue the empanelment sequence. Download the BID ${id} document, fill it carefully, then upload the scanned copy.`,
    documentLabel: `BID-${String(id).padStart(2, '0')}-Form.pdf`,
  }
})
