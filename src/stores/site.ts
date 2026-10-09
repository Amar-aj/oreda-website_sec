import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useSiteStore = defineStore('site', () => {
  const siteName = ref('OREDA Limited')
  const phone = ref('0674 2588260')
  const email = ref('ceoreda@oredaorissa.com')

  return {
    siteName,
    phone,
    email,
  }
})
