<script setup lang="ts">
import BackToTop from '@/components/layout/BackToTop.vue'
import Footer from '@/components/layout/Footer.vue'
import Navbar from '@/components/layout/Navbar.vue'
import SocialFloat from '@/components/layout/SocialFloat.vue'
</script>

<template>
  <div class="flex min-h-svh flex-col bg-white">
    <Navbar />
    <main id="main-content" class="flex-1">
      <RouterView />
    </main>
    <Footer />
    <SocialFloat />
    <BackToTop />
  </div>
</template>
