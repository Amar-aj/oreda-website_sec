<script setup lang="ts">
import { useSiteStore } from '@/stores/site'
import { onMounted, onUnmounted, ref } from 'vue'
import { RouterLink } from 'vue-router'

const site = useSiteStore()
const activeId = ref('who')

const toc = [
  { id: 'who', n: '01', label: 'Who we are' },
  { id: 'scope', n: '02', label: 'Scope' },
  { id: 'collect', n: '03', label: 'Information we collect' },
  { id: 'use', n: '04', label: 'How we use information' },
  { id: 'cookies', n: '05', label: 'Cookies & storage' },
  { id: 'location', n: '06', label: 'Location & weather' },
  { id: 'assistant', n: '07', label: 'Website assistant' },
  { id: 'third', n: '08', label: 'Third-party services' },
  { id: 'share', n: '09', label: 'Sharing' },
  { id: 'retain', n: '10', label: 'Retention & security' },
  { id: 'rights', n: '11', label: 'Your rights' },
  { id: 'contact', n: '12', label: 'Contact' },
]

const collected = [
  {
    title: 'Enquiries',
    text: 'Name, email, phone, subject and message when you use the contact form or write to the office.',
  },
  {
    title: 'Career applications',
    text: 'Details you submit against a published vacancy, as set out in that notice.',
  },
  {
    title: 'Technical data',
    text: 'IP address, browser type and pages visited, used to keep the site available and secure.',
  },
  {
    title: 'Optional location',
    text: 'If you allow it, a city name and weather snapshot for the header. Decline and Bhubaneswar is used.',
  },
]

const uses = [
  'Respond to scheme, tender, career or general enquiries',
  'Operate, secure and improve this website',
  'Show local weather when you permit location',
  'Meet legal, audit and record-keeping duties',
]

const vendors = [
  { name: 'Open-Meteo', use: 'Weather snapshot' },
  { name: 'Reverse geocoding', use: 'Place name from coordinates' },
  { name: 'Google Maps', use: 'Office location map' },
  { name: 'Google Fonts', use: 'Typography' },
  { name: 'Re-Connect / Solar City', use: 'Linked official portals' },
]

let observer: IntersectionObserver | null = null

onMounted(() => {
  const nodes = toc
    .map((item) => document.getElementById(item.id))
    .filter((node): node is HTMLElement => Boolean(node))

  observer = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
      if (visible?.target.id) activeId.value = visible.target.id
    },
    { rootMargin: '-20% 0px -60% 0px', threshold: [0.1, 0.25, 0.5] },
  )

  nodes.forEach((node) => observer?.observe(node))
})

onUnmounted(() => observer?.disconnect())
</script>

<template>
  <section class="privacy-wrap w-full" aria-label="Privacy policy">
    <div
      class="mx-auto grid max-w-[1400px] gap-6 px-4 pb-14 sm:px-6 lg:grid-cols-[17.5rem_minmax(0,1fr)] lg:gap-8 lg:px-8 lg:pb-16"
    >
      <aside class="privacy-toc" aria-label="Policy contents">
        <p class="privacy-toc-kicker">Contents</p>
        <p class="privacy-toc-lead">Twelve articles</p>
        <nav>
          <ol>
            <li v-for="item in toc" :key="item.id">
              <a
                :href="`#${item.id}`"
                class="privacy-toc-link"
                :class="{ 'is-active': activeId === item.id }"
              >
                <span class="privacy-toc-n">{{ item.n }}</span>
                <span>{{ item.label }}</span>
              </a>
            </li>
          </ol>
        </nav>
      </aside>

      <article class="privacy-sheet">
        <header class="privacy-letterhead">
          <div>
            <p class="privacy-letterhead-kicker">Government of Odisha</p>
            <p class="privacy-letterhead-title">OREDA Limited</p>
          </div>
          <div class="privacy-letterhead-meta">
            <span>Doc. WEB/PP/2026</span>
            <span>Version 1.0</span>
          </div>
        </header>

        <div class="privacy-preamble">
          <p>
            This policy is issued for visitors of the OREDA public website. It
            should be read with the
            <RouterLink to="/terms">Terms of Use</RouterLink>
            and with any scheme-specific notice or portal terms that apply to
            an application you submit elsewhere.
          </p>
        </div>

        <section id="who" class="privacy-article">
          <div class="privacy-article-head">
            <span>01</span>
            <h2>Who we are</h2>
          </div>
          <p>
            This website is operated by
            <strong>OREDA Limited</strong> (Odisha Renewable Energy Development
            Agency), the nodal agency under the
            <strong>Department of Energy, Government of Odisha</strong>.
          </p>
          <div class="privacy-office">
            <p>
              <span>Head office</span>
              S-59, Mancheswar Industrial Estate, Bhubaneswar – 751010
            </p>
            <p>
              <span>Phone</span>
              <a :href="`tel:${site.phone.replace(/\s/g, '')}`">{{ site.phone }}</a>
            </p>
            <p>
              <span>Email</span>
              <a :href="`mailto:${site.email}`">{{ site.email }}</a>
            </p>
          </div>
        </section>

        <section id="scope" class="privacy-article">
          <div class="privacy-article-head">
            <span>02</span>
            <h2>Scope</h2>
          </div>
          <p>
            This notice covers the public website — schemes, tenders, news,
            careers, the contact form, header weather, and the on-site
            assistant. It does not cover official application portals we link
            to (Re-Connect, Bhubaneswar Solar City), which have their own terms.
          </p>
          <p>
            Personal data is handled in line with applicable Indian law,
            including the Information Technology Act, 2000 and the Digital
            Personal Data Protection Act, 2023, as they apply to a public
            renewable-energy agency.
          </p>
        </section>

        <section id="collect" class="privacy-article">
          <div class="privacy-article-head">
            <span>03</span>
            <h2>Information we collect</h2>
          </div>
          <p>We may receive or store the following. We do not create user accounts or take card payments on this site.</p>
          <div class="privacy-grid">
            <article v-for="item in collected" :key="item.title" class="privacy-card">
              <h3>{{ item.title }}</h3>
              <p>{{ item.text }}</p>
            </article>
          </div>
        </section>

        <section id="use" class="privacy-article">
          <div class="privacy-article-head">
            <span>04</span>
            <h2>How we use information</h2>
          </div>
          <ol class="privacy-steps">
            <li v-for="(item, i) in uses" :key="item">
              <span>{{ String(i + 1).padStart(2, '0') }}</span>
              {{ item }}
            </li>
          </ol>
          <p class="privacy-callout">
            We do not sell personal information or use it for advertising networks.
          </p>
        </section>

        <section id="cookies" class="privacy-article">
          <div class="privacy-article-head">
            <span>05</span>
            <h2>Cookies and local storage</h2>
          </div>
          <p>
            The browser’s local storage may keep a short weather snapshot
            (temperature, condition and place) so the header does not request
            it on every page. It expires and can be cleared in your browser.
          </p>
          <p>
            We do not run third-party advertising cookies. Embedded maps or
            fonts from other providers may set cookies under their own policies.
          </p>
        </section>

        <section id="location" class="privacy-article">
          <div class="privacy-article-head">
            <span>06</span>
            <h2>Location and weather</h2>
          </div>
          <p>
            Header weather uses your device location only if you grant
            permission. Coordinates go to a weather service (Open-Meteo) and,
            where needed, reverse geocoding for a place name. If permission is
            denied, conditions for Bhubaneswar (headquarters) are shown.
          </p>
        </section>

        <section id="assistant" class="privacy-article">
          <div class="privacy-article-head">
            <span>07</span>
            <h2>Website assistant</h2>
          </div>
          <p>
            The assistant is a guided help panel. Questions are matched to
            published pages (schemes, tenders, hours, contact). Messages are
            not sent to a live officer or a third-party AI service, and they
            are not stored after you leave the page.
          </p>
        </section>

        <section id="third" class="privacy-article">
          <div class="privacy-article-head">
            <span>08</span>
            <h2>Third-party services</h2>
          </div>
          <p>
            The site may load or link to the services below. Each is governed
            by its own privacy notice.
          </p>
          <table class="privacy-table">
            <thead>
              <tr>
                <th>Service</th>
                <th>Purpose</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="row in vendors" :key="row.name">
                <td>{{ row.name }}</td>
                <td>{{ row.use }}</td>
              </tr>
            </tbody>
          </table>
        </section>

        <section id="share" class="privacy-article">
          <div class="privacy-article-head">
            <span>09</span>
            <h2>Sharing</h2>
          </div>
          <p>
            We may share information with other Government of Odisha
            departments or authorised implementing partners when it is needed
            to answer your request or to run a scheme. We may also disclose
            information if the law requires it, or to protect this website
            and the public.
          </p>
        </section>

        <section id="retain" class="privacy-article">
          <div class="privacy-article-head">
            <span>10</span>
            <h2>Retention and security</h2>
          </div>
          <p>
            Correspondence and applications are kept only as long as needed
            for the purpose they were received, and as required under public-record
            rules. Technical logs are kept for a limited period for security
            and operations.
          </p>
          <p>
            We take reasonable organisational and technical steps to protect
            information. Do not send highly sensitive documents through the
            public contact form if a scheme asks you to use a designated portal.
          </p>
        </section>

        <section id="rights" class="privacy-article">
          <div class="privacy-article-head">
            <span>11</span>
            <h2>Your rights</h2>
          </div>
          <p>
            Subject to applicable law, you may ask us to confirm whether we
            hold your personal data, to correct it, or to explain how it is
            used. Withdraw browser location permission in your device settings
            at any time. For portal applications, use that portal’s own tools.
          </p>
          <p>
            This website is not directed at children. Do not submit a child’s
            personal details unless a published scheme expressly requires a
            parent or guardian to do so.
          </p>
        </section>

        <section id="contact" class="privacy-article">
          <div class="privacy-article-head">
            <span>12</span>
            <h2>Contact</h2>
          </div>
          <div class="privacy-contact">
            <p class="privacy-contact-kicker">Privacy correspondence</p>
            <p class="privacy-contact-name">Chief Executive Officer, OREDA Limited</p>
            <p>
              S-59, Mancheswar Industrial Estate, Bhubaneswar – 751010
            </p>
            <p>
              Email
              <a :href="`mailto:${site.email}?subject=Privacy`">{{ site.email }}</a>
              with the subject line “Privacy”, or use the
              <RouterLink to="/contact">contact page</RouterLink>.
            </p>
            <p class="privacy-contact-note">
              This policy may be updated when the website or the law changes.
              The effective date on the masthead will be revised when we do.
            </p>
          </div>
        </section>
      </article>
    </div>
  </section>
</template>

<style scoped>
.privacy-wrap {
  position: relative;
  z-index: 2;
  margin-top: -2.75rem;
  background: linear-gradient(180deg, transparent 0 2.75rem, #ebe7f2 2.75rem);
}

.privacy-toc {
  height: fit-content;
  padding: 1.15rem 1rem 1.2rem;
  background: #fff;
  border-top: 3px solid #382080;
  box-shadow: 0 18px 40px -28px rgba(0, 16, 56, 0.45);
}

@media (min-width: 1024px) {
  .privacy-toc {
    position: sticky;
    top: 6.75rem;
  }
}

.privacy-toc-kicker {
  margin: 0;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: #382080;
}

.privacy-toc-lead {
  margin: 0.25rem 0 0.85rem;
  font-family: var(--font-display);
  font-size: 1.05rem;
  font-weight: 600;
  color: #001038;
}

.privacy-toc-link {
  display: flex;
  align-items: baseline;
  gap: 0.55rem;
  padding: 0.4rem 0.35rem;
  font-size: 12.5px;
  line-height: 1.35;
  color: #5c5278;
  text-decoration: none;
  border-left: 2px solid transparent;
}

.privacy-toc-link:hover,
.privacy-toc-link.is-active {
  color: #001038;
  border-left-color: #382080;
  background: rgba(56, 32, 128, 0.04);
}

.privacy-toc-n {
  flex-shrink: 0;
  width: 1.4rem;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.08em;
  color: #382080;
}

.privacy-sheet {
  min-width: 0;
  padding: 1.35rem 1.15rem 2rem;
  background: #fff;
  box-shadow: 0 24px 50px -32px rgba(0, 16, 56, 0.5);
}

@media (min-width: 640px) {
  .privacy-sheet {
    padding: 1.75rem 2rem 2.4rem;
  }
}

.privacy-letterhead {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  justify-content: space-between;
  gap: 0.75rem;
  padding-bottom: 1.1rem;
  border-bottom: 1px solid rgba(0, 16, 56, 0.1);
}

.privacy-letterhead-kicker {
  margin: 0;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: #382080;
}

.privacy-letterhead-title {
  margin: 0.2rem 0 0;
  font-family: var(--font-display);
  font-size: 1.35rem;
  font-weight: 600;
  color: #001038;
}

.privacy-letterhead-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 0.55rem;
}

.privacy-letterhead-meta span {
  padding: 0.28rem 0.55rem;
  font-size: 10.5px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #382080;
  background: #f4f0fa;
}

.privacy-preamble {
  margin: 1.25rem 0 0.4rem;
  padding: 1rem 1.1rem;
  background: #f4f0fa;
  border-left: 3px solid #382080;
}

.privacy-preamble p {
  margin: 0;
  font-size: 14.5px;
  line-height: 1.65;
  color: #3a3550;
}

.privacy-preamble a {
  color: #382080;
  font-weight: 600;
  text-decoration: underline;
  text-underline-offset: 3px;
}

.privacy-article {
  scroll-margin-top: 7rem;
  padding-top: 1.85rem;
  margin-top: 1.5rem;
  border-top: 1px solid rgba(0, 16, 56, 0.08);
}

.privacy-article-head {
  display: flex;
  align-items: baseline;
  gap: 0.85rem;
  margin-bottom: 0.85rem;
}

.privacy-article-head span {
  font-family: var(--font-display);
  font-size: 1.65rem;
  font-weight: 600;
  line-height: 1;
  color: rgba(56, 32, 128, 0.22);
}

.privacy-article-head h2 {
  margin: 0;
  font-family: var(--font-display);
  font-size: clamp(1.25rem, 2vw, 1.55rem);
  font-weight: 600;
  letter-spacing: -0.02em;
  color: #001038;
}

.privacy-article p {
  margin: 0;
  font-size: 15px;
  line-height: 1.72;
  color: #3a3550;
}

.privacy-article p + p {
  margin-top: 0.8rem;
}

.privacy-article a {
  color: #382080;
  font-weight: 600;
  text-decoration: underline;
  text-underline-offset: 3px;
}

.privacy-article strong {
  font-weight: 600;
  color: #001038;
}

.privacy-office {
  display: grid;
  gap: 0.65rem;
  margin-top: 1.05rem;
  padding: 0.95rem 1rem;
  background: #f8f6fb;
  border: 1px solid rgba(56, 32, 128, 0.08);
}

@media (min-width: 640px) {
  .privacy-office {
    grid-template-columns: 1.4fr 0.9fr 1.2fr;
  }
}

.privacy-office p {
  margin: 0;
  font-size: 13.5px;
}

.privacy-office span {
  display: block;
  margin-bottom: 0.2rem;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: #382080;
}

.privacy-grid {
  display: grid;
  gap: 0.7rem;
  margin-top: 1rem;
}

@media (min-width: 640px) {
  .privacy-grid {
    grid-template-columns: 1fr 1fr;
  }
}

.privacy-card {
  padding: 0.9rem 1rem;
  background: #fff;
  border: 1px solid rgba(0, 16, 56, 0.08);
  border-top: 2px solid #382080;
}

.privacy-card h3 {
  margin: 0 0 0.4rem;
  font-size: 13.5px;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: #001038;
}

.privacy-card p {
  margin: 0;
  font-size: 13.5px;
  line-height: 1.55;
  color: #5c5278;
}

.privacy-steps {
  margin: 0.9rem 0 0;
  padding: 0;
  list-style: none;
}

.privacy-steps li {
  display: flex;
  gap: 0.75rem;
  padding: 0.65rem 0;
  font-size: 15px;
  line-height: 1.5;
  color: #3a3550;
  border-bottom: 1px solid rgba(0, 16, 56, 0.06);
}

.privacy-steps span {
  flex-shrink: 0;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.1em;
  color: #382080;
}

.privacy-callout {
  margin-top: 1rem !important;
  padding: 0.8rem 1rem;
  font-size: 14px !important;
  background: #001038;
  color: #fff !important;
}

.privacy-table {
  width: 100%;
  margin-top: 1rem;
  border-collapse: collapse;
  font-size: 13.5px;
}

.privacy-table th,
.privacy-table td {
  padding: 0.7rem 0.8rem;
  text-align: left;
  border-bottom: 1px solid rgba(0, 16, 56, 0.08);
}

.privacy-table th {
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: #382080;
  background: #f8f6fb;
}

.privacy-table td:first-child {
  font-weight: 600;
  color: #001038;
}

.privacy-contact {
  margin-top: 0.3rem;
  padding: 1.2rem 1.15rem 1.25rem;
  color: #fff;
  background: #001038;
}

.privacy-contact-kicker {
  margin: 0 0 0.35rem !important;
  font-size: 10px !important;
  font-weight: 700;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: #c4b5f0 !important;
}

.privacy-contact-name {
  margin: 0 0 0.65rem !important;
  font-family: var(--font-display);
  font-size: 1.2rem !important;
  font-weight: 600;
  color: #fff !important;
}

.privacy-contact p {
  color: rgba(255, 255, 255, 0.78);
}

.privacy-contact a {
  color: #c4b5f0;
}

.privacy-contact-note {
  margin-top: 0.9rem !important;
  padding-top: 0.85rem;
  font-size: 13px !important;
  color: rgba(255, 255, 255, 0.55) !important;
  border-top: 1px solid rgba(255, 255, 255, 0.12);
}

@media (max-width: 1023px) {
  .privacy-toc {
    order: -1;
  }
}
</style>
