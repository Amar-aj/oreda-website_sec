<script setup lang="ts">
import Navbar from '@/components/layout/Navbar.vue'
</script>

<template>
  <div class="flex min-h-svh flex-col bg-white">
    <Navbar />
    <main id="main-content" class="flex-1">
      <RouterView />
    </main>
  </div>
</template>
