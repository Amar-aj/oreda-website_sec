<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <section class="w-full bg-[#f7f6fb]">
    <div class="border-b border-oreda/10 bg-oreda-dark text-white">
      <div class="mx-auto max-w-[1400px] px-4 py-10 sm:px-6 sm:py-12 lg:px-8 lg:py-14">
        <nav class="text-[12.5px] text-white/60" aria-label="Breadcrumb">
          <ol class="flex flex-wrap items-center gap-1.5">
            <li>
              <RouterLink to="/" class="transition hover:text-white">
                Home
              </RouterLink>
            </li>
            <li aria-hidden="true" class="text-white/35">/</li>
            <li class="font-semibold text-white">Vendor Empanelment</li>
          </ol>
        </nav>

        <div class="mt-5 flex items-center gap-3">
          <span class="h-[2px] w-7 rounded-full bg-[#c4b5f0]" aria-hidden="true" />
          <p
            class="text-[11px] font-bold tracking-[0.2em] text-[#c4b5f0] uppercase sm:text-xs"
          >
            Vendors · Apply
          </p>
        </div>

        <h1
          class="mt-3 font-display text-[clamp(1.85rem,4vw,2.85rem)] leading-[1.12] font-semibold tracking-[-0.02em] text-white"
        >
          Vendor
          <span class="text-[#c4b5f0]">Empanelment</span>
        </h1>

        <p class="mt-3.5 max-w-2xl text-[14px] leading-relaxed text-white/68 sm:text-[15px]">
          Apply for empanelment with OREDA to participate in renewable-energy
          programmes, supply, and related services across Odisha.
        </p>
      </div>
    </div>

    <div class="mx-auto max-w-[1400px] px-4 py-10 sm:px-6 lg:px-8 lg:py-12">
      <div class="max-w-3xl rounded-sm border border-oreda/10 bg-white p-6 sm:p-8">
        <h2 class="text-lg font-bold text-oreda-dark">Empanelment form</h2>
        <p class="mt-2 text-[14px] leading-relaxed text-[#5a6b82]">
          The vendor empanelment form will be available here. Please check back
          shortly, or contact OREDA for current empanelment requirements.
        </p>
        <RouterLink
          to="/contact"
          class="mt-5 inline-flex items-center text-[14px] font-bold text-oreda transition hover:text-oreda-dark"
        >
          Contact Us
        </RouterLink>
      </div>
    </div>
  </section>
</template>
