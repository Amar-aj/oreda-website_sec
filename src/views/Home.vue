<script setup lang="ts">
import AboutOreda from '@/components/home/AboutOreda.vue'
import Achievements from '@/components/home/Achievements.vue'
import ContactSection from '@/components/home/ContactSection.vue'
import HeroCarousel from '@/components/home/HeroCarousel.vue'
import ImageGallery from '@/components/home/ImageGallery.vue'
import LatestNews from '@/components/home/LatestNews.vue'
import Opportunities from '@/components/home/Opportunities.vue'
import OurImpact from '@/components/home/OurImpact.vue'
import SchemesServices from '@/components/home/SchemesServices.vue'
</script>

<template>
  <div class="bg-[#f7f6fb]">
    <div class="relative">
      <HeroCarousel />
      <LatestNews />
    </div>
    <AboutOreda />
    <SchemesServices />
    <OurImpact />
    <Achievements />
    <Opportunities />
    <ImageGallery />
    <ContactSection />
  </div>
</template>
