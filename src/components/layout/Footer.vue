<script setup lang="ts">
import { useSiteStore } from '@/stores/site'
import {
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Youtube,
  type LucideIcon,
} from 'lucide-vue-next'
import { RouterLink } from 'vue-router'

const site = useSiteStore()

interface SocialLink {
  label: string
  href: string
  icon?: LucideIcon
  brand?: 'x'
  tone: string
}

const socialLinks: SocialLink[] = [
  {
    label: 'Facebook',
    href: 'https://www.facebook.com/oreda.odisha1',
    icon: Facebook,
    tone: '#1877F2',
  },
  {
    label: 'X',
    href: 'https://x.com/OREDA_Odisha',
    brand: 'x',
    tone: '#0F1419',
  },
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/oreda_odisha/',
    icon: Instagram,
    tone: '#E4405F',
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/company/odisha-renewable-energy-development-agency',
    icon: Linkedin,
    tone: '#0A66C2',
  },
  {
    label: 'YouTube',
    href: 'https://www.youtube.com/@OREDAOdisha',
    icon: Youtube,
    tone: '#FF0000',
  },
]

const quickLinks = [
  { label: 'Home', to: '/' },
  { label: 'About Us', to: '/about' },
  { label: 'Our Projects', to: '/projects' },
  { label: 'Tenders', to: '/tenders' },
  { label: 'Photo Gallery', to: '/gallery' },
]

const usefulLinks = [
  { label: 'Schemes', to: '/schemes' },
  { label: 'News & Updates', to: '/news' },
  { label: 'Notifications', to: '/notifications' },
  { label: 'Contact Us', to: '/contact' },
]

const schemeLinks = [
  { label: 'PM Surya Ghar', to: '/schemes' },
  { label: 'PM KUSUM', to: '/schemes' },
  { label: 'Rooftop Solar', to: '/schemes' },
  { label: 'Solar Street Lighting', to: '/schemes' },
]

const policyLinks = [
  { label: 'Privacy Policy', to: '/privacy' },
  { label: 'Terms of Use', to: '/terms' },
  { label: 'Sitemap', to: '/' },
]

const year = new Date().getFullYear()

const mapEmbedUrl =
  'https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d119744.01609645985!2d85.74943602904176!3d20.300246314265884!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a1909d6ffffffff%3A0xf7f28d87a45fb49!2sOrissa%20Renewable%20Energy%20Development%20Agency!5e0!3m2!1sen!2sin!4v1791801348072!5m2!1sen!2sin'
</script>

<template>
  <footer class="site-footer w-full border-t border-[#1a3a6e]/40 bg-oreda-dark text-white">
    <div class="mx-auto max-w-[1400px] px-4 py-6 sm:px-6 lg:px-8">
      <div class="footer-grid">
        <!-- Brand -->
        <div class="footer-brand">
          <RouterLink
            to="/"
            class="inline-flex max-w-full items-center justify-center bg-white px-3 py-2"
          >
            <img
              src="/images/oreda-logo.png?v=3"
              :alt="site.siteName"
              class="footer-logo h-auto w-40 object-contain lg:w-[15rem]"
            />
          </RouterLink>

          <p class="mt-2.5 text-[12px] font-semibold tracking-wide text-[#9eb6d4]">
            Government of Odisha
            <span class="mx-1 text-white/30">|</span>
            Department of Energy
          </p>

          <p class="mt-2 text-justify text-[12.5px] leading-relaxed text-white/55">
            Odisha Renewable Energy Development Agency (OREDA) is the nodal
            body under the Department of Energy, Government of Odisha, driving
            solar, wind and other clean-energy programmes. We implement citizen
            schemes, support green power projects and work toward a sustainable,
            energy-secure Odisha.
          </p>

          <div class="footer-social">
            <div class="footer-social-row" role="list">
              <a
                v-for="link in socialLinks"
                :key="link.label"
                :href="link.href"
                class="footer-social-btn"
                :style="{ '--tone': link.tone }"
                target="_blank"
                rel="noopener noreferrer"
                role="listitem"
                :aria-label="`Follow OREDA on ${link.label}`"
                :title="link.label"
              >
                <svg
                  v-if="link.brand === 'x'"
                  class="footer-x-icon"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  focusable="false"
                >
                  <path
                    fill="currentColor"
                    d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.74l7.727-8.835L1.254 2.25H8.08l4.253 5.622L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z"
                  />
                </svg>
                <component
                  :is="link.icon"
                  v-else
                  :size="13"
                  :stroke-width="2.1"
                />
              </a>
            </div>
          </div>
        </div>

        <!-- Quick links -->
        <div class="footer-col">
          <h3 class="footer-title">Quick Links</h3>
          <ul class="footer-list" role="list">
            <li v-for="link in quickLinks" :key="link.label">
              <RouterLink :to="link.to" class="footer-link">
                <span class="footer-dot" aria-hidden="true" />
                {{ link.label }}
              </RouterLink>
            </li>
          </ul>
        </div>

        <!-- Useful links -->
        <div class="footer-col">
          <h3 class="footer-title">Useful Links</h3>
          <ul class="footer-list" role="list">
            <li v-for="link in usefulLinks" :key="link.label">
              <RouterLink :to="link.to" class="footer-link">
                <span class="footer-dot" aria-hidden="true" />
                {{ link.label }}
              </RouterLink>
            </li>
          </ul>
        </div>

        <!-- Key schemes -->
        <div class="footer-col">
          <h3 class="footer-title">Key Schemes</h3>
          <ul class="footer-list" role="list">
            <li v-for="link in schemeLinks" :key="link.label">
              <RouterLink :to="link.to" class="footer-link">
                <span class="footer-dot" aria-hidden="true" />
                {{ link.label }}
              </RouterLink>
            </li>
          </ul>
        </div>

        <!-- Contact -->
        <div class="footer-col">
          <h3 class="footer-title">Get in Touch</h3>
          <ul class="footer-contact" role="list">
            <li>
              <a
                :href="`tel:${site.phone.replace(/\s/g, '')}`"
                class="footer-contact-row group"
              >
                <span class="footer-icon">
                  <Phone :size="13" :stroke-width="2" />
                </span>
                <span class="min-w-0">
                  <span class="footer-contact-label">Phone</span>
                  <span class="footer-contact-value group-hover:text-[#9eb6d4]">
                    {{ site.phone }}
                  </span>
                </span>
              </a>
            </li>
            <li>
              <a :href="`mailto:${site.email}`" class="footer-contact-row group">
                <span class="footer-icon">
                  <Mail :size="13" :stroke-width="2" />
                </span>
                <span class="min-w-0">
                  <span class="footer-contact-label">Email</span>
                  <span class="footer-contact-value break-words group-hover:text-[#9eb6d4]">
                    {{ site.email }}
                  </span>
                </span>
              </a>
            </li>
            <li class="footer-contact-row">
              <span class="footer-icon">
                <MapPin :size="13" :stroke-width="2" />
              </span>
              <span class="min-w-0">
                <span class="footer-contact-label">Address</span>
                <span class="footer-contact-value footer-contact-value--muted">
                  S-59, Mancheswar I.E., Bhubaneswar – 751010
                </span>
              </span>
            </li>
          </ul>
        </div>

        <!-- Map -->
        <div class="footer-col footer-col--map">
          <h3 class="footer-title">Find Us</h3>
          <div class="footer-map">
            <iframe
              :src="mapEmbedUrl"
              title="OREDA office location on Google Maps"
              loading="lazy"
              referrerpolicy="strict-origin-when-cross-origin"
              allowfullscreen
            />
          </div>
        </div>
      </div>
    </div>

    <!-- Bottom bar -->
    <div class="border-t border-white/10 bg-[#00081f]">
      <div
        class="mx-auto flex max-w-[1400px] flex-wrap items-center justify-between gap-x-4 gap-y-2 px-4 py-2.5 text-[12px] text-white/45 sm:px-6 lg:px-8"
      >
        <p class="shrink-0">
          © {{ year }} {{ site.siteName }}. All rights reserved.
        </p>

        <nav
          class="flex flex-wrap items-center justify-center gap-x-3"
          aria-label="Legal"
        >
          <template v-for="(link, index) in policyLinks" :key="link.label">
            <span
              v-if="index > 0"
              class="text-white/25"
              aria-hidden="true"
            >|</span>
            <RouterLink
              :to="link.to"
              class="whitespace-nowrap text-white/55 transition hover:text-white"
            >
              {{ link.label }}
            </RouterLink>
          </template>
        </nav>

        <p class="shrink-0 sm:text-right">
          Content owned by OREDA / Dept. of Energy
        </p>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer-grid {
  display: grid;
  gap: 1.35rem 0.85rem;
  align-items: start;
}

@media (min-width: 640px) {
  .footer-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (min-width: 1024px) {
  .footer-grid {
    grid-template-columns:
      minmax(0, 1.7fr)
      repeat(3, minmax(0, 0.75fr))
      minmax(0, 0.95fr)
      minmax(0, 1.1fr);
    column-gap: 1.1rem;
    row-gap: 1.25rem;
  }
}

.footer-brand {
  min-width: 0;
}

@media (min-width: 1024px) {
  .footer-brand {
    padding-right: 1.25rem;
  }
}

@media (min-width: 640px) and (max-width: 1023px) {
  .footer-brand {
    grid-column: 1 / -1;
  }
}

.footer-col {
  display: flex;
  min-width: 0;
  flex-direction: column;
}

@media (min-width: 640px) and (max-width: 1023px) {
  .footer-col--map {
    grid-column: 1 / -1;
  }
}

.footer-logo {
  max-width: none;
}

.footer-title {
  margin: 0;
  min-height: 1rem;
  font-size: 11px;
  font-weight: 700;
  line-height: 1;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: #9eb6d4;
}

.footer-list,
.footer-contact {
  margin: 0.65rem 0 0;
  padding: 0;
  list-style: none;
}

.footer-list {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
}

.footer-contact {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.footer-link {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 13.5px;
  line-height: 1.35;
  color: rgba(255, 255, 255, 0.65);
  text-decoration: none;
  transition: color 0.2s ease;
}

.footer-link:hover {
  color: #fff;
}

.footer-dot {
  width: 4px;
  height: 4px;
  border-radius: 9999px;
  background: rgba(158, 182, 212, 0.55);
  flex-shrink: 0;
}

.footer-contact-row {
  display: flex;
  align-items: flex-start;
  gap: 0.65rem;
  text-decoration: none;
}

.footer-icon {
  display: flex;
  height: 1.15rem;
  width: 1.15rem;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  margin-top: 0.15rem;
  color: #9eb6d4;
}

.footer-contact-label {
  display: block;
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.08em;
  line-height: 1.2;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.4);
}

.footer-contact-value {
  display: block;
  margin-top: 0.2rem;
  font-size: 13px;
  font-weight: 600;
  line-height: 1.35;
  color: #fff;
  transition: color 0.2s ease;
}

.footer-contact-value--muted {
  font-weight: 500;
  color: rgba(255, 255, 255, 0.85);
}

.footer-map {
  margin-top: 0.65rem;
  overflow: hidden;
  width: 100%;
  height: 8.75rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(255, 255, 255, 0.04);
}

.footer-map iframe {
  display: block;
  width: 100%;
  height: 100%;
  border: 0;
}

@media (min-width: 1024px) {
  .footer-map {
    height: 9.25rem;
  }
}

.footer-social {
  margin-top: 0.75rem;
}

.footer-social-row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.7rem;
}

.footer-social-btn {
  display: inline-flex;
  height: 1.75rem;
  width: 1.75rem;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  border-radius: 9999px;
  border: none;
  background: var(--tone);
  color: #fff;
  box-shadow: 0 4px 10px color-mix(in srgb, var(--tone) 35%, transparent);
  text-decoration: none;
  transition:
    transform 0.2s ease,
    filter 0.2s ease,
    box-shadow 0.2s ease;
}

.footer-social-btn:hover {
  transform: translateY(-2px);
  filter: brightness(1.08);
  box-shadow: 0 8px 16px color-mix(in srgb, var(--tone) 45%, transparent);
}

.footer-social-btn:focus-visible {
  outline: 2px solid #fff;
  outline-offset: 2px;
}

.footer-x-icon {
  width: 11px;
  height: 11px;
  display: block;
}
</style>
