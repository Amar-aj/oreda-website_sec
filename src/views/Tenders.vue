<script setup lang="ts">
import ContactSection from '@/components/home/ContactSection.vue'
import TenderBoard from '@/components/tender/TenderBoard.vue'
import TenderHero from '@/components/tender/TenderHero.vue'
import TenderNotices from '@/components/tender/TenderNotices.vue'
</script>

<template>
  <div>
    <TenderHero />
    <TenderNotices />
    <TenderBoard />
    <ContactSection />
  </div>
</template>
