<script setup lang="ts">
import { useSiteStore } from '@/stores/site'
import { onMounted, onUnmounted, ref } from 'vue'
import { RouterLink } from 'vue-router'

const site = useSiteStore()
const activeId = ref('who')

const toc = [
  { id: 'who', n: '01', label: 'Who we are' },
  { id: 'accept', n: '02', label: 'Acceptance' },
  { id: 'scope', n: '03', label: 'Scope' },
  { id: 'info', n: '04', label: 'Information on this site' },
  { id: 'use', n: '05', label: 'Permitted use' },
  { id: 'filings', n: '06', label: 'Enquiries, tenders & careers' },
  { id: 'links', n: '07', label: 'Linked services' },
  { id: 'assistant', n: '08', label: 'Website assistant' },
  { id: 'ip', n: '09', label: 'Intellectual property' },
  { id: 'liability', n: '10', label: 'Availability & liability' },
  { id: 'law', n: '11', label: 'Governing law' },
  { id: 'contact', n: '12', label: 'Contact' },
]

const readings = [
  {
    title: 'Public information',
    text: 'Schemes, tenders, news and notices are published so citizens and bidders can read them. They do not themselves award a contract or sanction a subsidy.',
  },
  {
    title: 'Official instruments',
    text: 'Where a tender, scheme guideline or vacancy notice is issued as a downloadable document, that document prevails if anything on a webpage differs.',
  },
  {
    title: 'Linked portals',
    text: 'Re-Connect, Bhubaneswar Solar City and other government portals have their own terms. Leaving this site does not carry these conditions with you.',
  },
  {
    title: 'No user accounts',
    text: 'This website does not create logins or take payments. Applications, if required, are made on the portal or in the manner named in the relevant notice.',
  },
]

const allowed = [
  'Read, print or save published pages and notices for personal or official use',
  'Share a link to a public page or document',
  'Submit a genuine enquiry or career response as invited on this site',
  'Use the assistant to find published information',
]

const forbidden = [
  'Interfere with the site, attempt unauthorised access, or overload it',
  'Submit false, abusive or automated enquiries',
  'Misrepresent OREDA, its officers, or a scheme',
  'Use the OREDA name or emblem in a way that suggests endorsement you do not have',
]

const vendors = [
  { name: 'Re-Connect / Solar City', use: 'Linked application portals' },
  { name: 'Open-Meteo', use: 'Optional header weather' },
  { name: 'Google Maps', use: 'Office location map' },
  { name: 'Google Fonts', use: 'Typography' },
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
  <section class="terms-wrap w-full" aria-label="Terms of use">
    <div
      class="mx-auto grid max-w-[1400px] gap-6 px-4 pb-14 sm:px-6 lg:grid-cols-[17.5rem_minmax(0,1fr)] lg:gap-8 lg:px-8 lg:pb-16"
    >
      <aside class="terms-toc" aria-label="Terms contents">
        <p class="terms-toc-kicker">Contents</p>
        <p class="terms-toc-lead">Twelve articles</p>
        <nav>
          <ol>
            <li v-for="item in toc" :key="item.id">
              <a
                :href="`#${item.id}`"
                class="terms-toc-link"
                :class="{ 'is-active': activeId === item.id }"
              >
                <span class="terms-toc-n">{{ item.n }}</span>
                <span>{{ item.label }}</span>
              </a>
            </li>
          </ol>
        </nav>
      </aside>

      <article class="terms-sheet">
        <header class="terms-letterhead">
          <div>
            <p class="terms-letterhead-kicker">Government of Odisha</p>
            <p class="terms-letterhead-title">OREDA Limited</p>
          </div>
          <div class="terms-letterhead-meta">
            <span>Doc. WEB/TU/2026</span>
            <span>Version 1.0</span>
          </div>
        </header>

        <div class="terms-preamble">
          <p>
            These conditions govern access to the OREDA public website. They
            should be read with the
            <RouterLink to="/privacy">Privacy Policy</RouterLink>
            and with any scheme-specific notice or portal terms that apply to
            an application you submit elsewhere.
          </p>
        </div>

        <section id="who" class="terms-article">
          <div class="terms-article-head">
            <span>01</span>
            <h2>Who we are</h2>
          </div>
          <p>
            This website is operated by
            <strong>OREDA Limited</strong> (Odisha Renewable Energy Development
            Agency), the nodal agency under the
            <strong>Department of Energy, Government of Odisha</strong>.
          </p>
          <div class="terms-office">
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

        <section id="accept" class="terms-article">
          <div class="terms-article-head">
            <span>02</span>
            <h2>Acceptance</h2>
          </div>
          <p>
            By browsing this website you agree to these terms. If you do not
            agree, please do not use the site. Continuing to use the site after
            a revision means you accept the updated text. The effective date on
            the masthead is the date that applies.
          </p>
        </section>

        <section id="scope" class="terms-article">
          <div class="terms-article-head">
            <span>03</span>
            <h2>Scope</h2>
          </div>
          <p>
            These terms cover the public website — home, about, leadership,
            schemes, projects, tenders, news, notifications, gallery, careers,
            contact, the header weather, and the on-site assistant.
          </p>
          <p>
            They do not govern official application portals we link to
            (including Re-Connect and Bhubaneswar Solar City), third-party maps
            or fonts, or any other Government of Odisha property that is not
            this website.
          </p>
        </section>

        <section id="info" class="terms-article">
          <div class="terms-article-head">
            <span>04</span>
            <h2>Information on this site</h2>
          </div>
          <p>
            Content is published to inform citizens, bidders and partners about
            OREDA programmes. We take care to keep it accurate, but it may be
            updated, corrected or withdrawn without prior notice.
          </p>
          <div class="terms-grid">
            <article v-for="item in readings" :key="item.title" class="terms-card">
              <h3>{{ item.title }}</h3>
              <p>{{ item.text }}</p>
            </article>
          </div>
          <p class="terms-callout">
            A webpage is not a substitute for the signed tender, scheme
            guideline or vacancy notice. If they differ, the issued document
            prevails.
          </p>
        </section>

        <section id="use" class="terms-article">
          <div class="terms-article-head">
            <span>05</span>
            <h2>Permitted use</h2>
          </div>
          <p>
            You may use this website for lawful, non-abusive purposes connected
            with OREDA’s public functions.
          </p>
          <div class="terms-split">
            <div>
              <p class="terms-split-label">You may</p>
              <ul class="terms-rules terms-rules--yes">
                <li v-for="item in allowed" :key="item">{{ item }}</li>
              </ul>
            </div>
            <div>
              <p class="terms-split-label">You may not</p>
              <ul class="terms-rules terms-rules--no">
                <li v-for="item in forbidden" :key="item">{{ item }}</li>
              </ul>
            </div>
          </div>
        </section>

        <section id="filings" class="terms-article">
          <div class="terms-article-head">
            <span>06</span>
            <h2>Enquiries, tenders and careers</h2>
          </div>
          <ol class="terms-steps">
            <li>
              <span>01</span>
              The contact form is for general correspondence. It is not an
              application for a scheme, a bid, or a grievance filing unless a
              published notice says otherwise.
            </li>
            <li>
              <span>02</span>
              Tender participation follows the notice and the documents issued
              with it — including dates, fees, portals and formats named there.
            </li>
            <li>
              <span>03</span>
              Career responses must follow the vacancy notice. Sending a résumé
              through the public contact form does not constitute an application
              unless that notice allows it.
            </li>
            <li>
              <span>04</span>
              Do not send highly sensitive documents through the public form if
              the scheme or tender asks you to use a designated portal.
            </li>
          </ol>
        </section>

        <section id="links" class="terms-article">
          <div class="terms-article-head">
            <span>07</span>
            <h2>Linked services</h2>
          </div>
          <p>
            The site may load or link to the services below. Each is governed
            by its own terms. OREDA is not responsible for the content or
            availability of a site we do not operate.
          </p>
          <table class="terms-table">
            <thead>
              <tr>
                <th>Service</th>
                <th>Purpose on this website</th>
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

        <section id="assistant" class="terms-article">
          <div class="terms-article-head">
            <span>08</span>
            <h2>Website assistant</h2>
          </div>
          <p>
            The assistant is a guided help panel. It matches questions to
            published pages (schemes, tenders, hours, contact). It is not a
            live officer, not a third-party AI service, and not a source of
            binding advice, sanction or award.
          </p>
          <p>
            If the assistant and a published notice differ, follow the notice.
            Messages are not stored after you leave the page.
          </p>
        </section>

        <section id="ip" class="terms-article">
          <div class="terms-article-head">
            <span>09</span>
            <h2>Intellectual property</h2>
          </div>
          <p>
            Unless a page says otherwise, text, layout, photographs and the
            OREDA name and emblem on this website are used for the Agency’s
            public functions. You may quote short extracts with acknowledgement
            for personal, academic or news use.
          </p>
          <p>
            You may not reproduce the emblem or present material as an official
            OREDA publication without permission, except where Indian law
            already allows it.
          </p>
        </section>

        <section id="liability" class="terms-article">
          <div class="terms-article-head">
            <span>10</span>
            <h2>Availability and liability</h2>
          </div>
          <p>
            We aim to keep the site available, but access may be interrupted
            for maintenance, connectivity or events outside our control. Header
            weather and maps depend on third-party services and may be
            unavailable or inexact.
          </p>
          <p>
            To the extent permitted by law, OREDA is not liable for loss arising
            solely from your use of this public information website, including
            reliance on a page that has since been updated, or from a linked
            site we do not operate. Nothing in these terms limits liability
            that Indian law does not allow us to limit.
          </p>
        </section>

        <section id="law" class="terms-article">
          <div class="terms-article-head">
            <span>11</span>
            <h2>Governing law</h2>
          </div>
          <p>
            These terms are governed by the laws of India. Subject to any
            mandatory forum, disputes relating to this website may be brought
            before the courts at Bhubaneswar, Odisha.
          </p>
          <p>
            How we handle personal information is set out in the
            <RouterLink to="/privacy">Privacy Policy</RouterLink>.
          </p>
        </section>

        <section id="contact" class="terms-article">
          <div class="terms-article-head">
            <span>12</span>
            <h2>Contact</h2>
          </div>
          <div class="terms-contact">
            <p class="terms-contact-kicker">Website correspondence</p>
            <p class="terms-contact-name">Chief Executive Officer, OREDA Limited</p>
            <p>S-59, Mancheswar Industrial Estate, Bhubaneswar – 751010</p>
            <p>
              Email
              <a :href="`mailto:${site.email}?subject=Terms%20of%20Use`">{{ site.email }}</a>
              with the subject line “Terms of Use”, or use the
              <RouterLink to="/contact">contact page</RouterLink>.
            </p>
            <p class="terms-contact-note">
              These terms may be updated when the website or the law changes.
              The effective date on the masthead will be revised when we do.
            </p>
          </div>
        </section>
      </article>
    </div>
  </section>
</template>

<style scoped>
.terms-wrap {
  position: relative;
  z-index: 2;
  margin-top: -2.75rem;
  background: linear-gradient(180deg, transparent 0 2.75rem, #ebe7f2 2.75rem);
}

.terms-toc {
  height: fit-content;
  padding: 1.15rem 1rem 1.2rem;
  background: #fff;
  border-top: 3px solid #382080;
  box-shadow: 0 18px 40px -28px rgba(0, 16, 56, 0.45);
}

@media (min-width: 1024px) {
  .terms-toc {
    position: sticky;
    top: 6.75rem;
  }
}

.terms-toc-kicker {
  margin: 0;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: #382080;
}

.terms-toc-lead {
  margin: 0.25rem 0 0.85rem;
  font-family: var(--font-display);
  font-size: 1.05rem;
  font-weight: 600;
  color: #001038;
}

.terms-toc-link {
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

.terms-toc-link:hover,
.terms-toc-link.is-active {
  color: #001038;
  border-left-color: #382080;
  background: rgba(56, 32, 128, 0.04);
}

.terms-toc-n {
  flex-shrink: 0;
  width: 1.4rem;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.08em;
  color: #382080;
}

.terms-sheet {
  min-width: 0;
  padding: 1.35rem 1.15rem 2rem;
  background: #fff;
  box-shadow: 0 24px 50px -32px rgba(0, 16, 56, 0.5);
}

@media (min-width: 640px) {
  .terms-sheet {
    padding: 1.75rem 2rem 2.4rem;
  }
}

.terms-letterhead {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  justify-content: space-between;
  gap: 0.75rem;
  padding-bottom: 1.1rem;
  border-bottom: 1px solid rgba(0, 16, 56, 0.1);
}

.terms-letterhead-kicker {
  margin: 0;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: #382080;
}

.terms-letterhead-title {
  margin: 0.2rem 0 0;
  font-family: var(--font-display);
  font-size: 1.35rem;
  font-weight: 600;
  color: #001038;
}

.terms-letterhead-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 0.55rem;
}

.terms-letterhead-meta span {
  padding: 0.28rem 0.55rem;
  font-size: 10.5px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #382080;
  background: #f4f0fa;
}

.terms-preamble {
  margin: 1.25rem 0 0.4rem;
  padding: 1rem 1.1rem;
  background: #f4f0fa;
  border-left: 3px solid #382080;
}

.terms-preamble p {
  margin: 0;
  font-size: 14.5px;
  line-height: 1.65;
  color: #3a3550;
}

.terms-preamble a {
  color: #382080;
  font-weight: 600;
  text-decoration: underline;
  text-underline-offset: 3px;
}

.terms-article {
  scroll-margin-top: 7rem;
  padding-top: 1.85rem;
  margin-top: 1.5rem;
  border-top: 1px solid rgba(0, 16, 56, 0.08);
}

.terms-article-head {
  display: flex;
  align-items: baseline;
  gap: 0.85rem;
  margin-bottom: 0.85rem;
}

.terms-article-head span {
  font-family: var(--font-display);
  font-size: 1.65rem;
  font-weight: 600;
  line-height: 1;
  color: rgba(56, 32, 128, 0.22);
}

.terms-article-head h2 {
  margin: 0;
  font-family: var(--font-display);
  font-size: clamp(1.25rem, 2vw, 1.55rem);
  font-weight: 600;
  letter-spacing: -0.02em;
  color: #001038;
}

.terms-article p {
  margin: 0;
  font-size: 15px;
  line-height: 1.72;
  color: #3a3550;
}

.terms-article p + p {
  margin-top: 0.8rem;
}

.terms-article a {
  color: #382080;
  font-weight: 600;
  text-decoration: underline;
  text-underline-offset: 3px;
}

.terms-article strong {
  font-weight: 600;
  color: #001038;
}

.terms-office {
  display: grid;
  gap: 0.65rem;
  margin-top: 1.05rem;
  padding: 0.95rem 1rem;
  background: #f8f6fb;
  border: 1px solid rgba(56, 32, 128, 0.08);
}

@media (min-width: 640px) {
  .terms-office {
    grid-template-columns: 1.4fr 0.9fr 1.2fr;
  }
}

.terms-office p {
  margin: 0;
  font-size: 13.5px;
}

.terms-office span {
  display: block;
  margin-bottom: 0.2rem;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: #382080;
}

.terms-grid {
  display: grid;
  gap: 0.7rem;
  margin-top: 1rem;
}

@media (min-width: 640px) {
  .terms-grid {
    grid-template-columns: 1fr 1fr;
  }
}

.terms-card {
  padding: 0.9rem 1rem;
  background: #fff;
  border: 1px solid rgba(0, 16, 56, 0.08);
  border-top: 2px solid #382080;
}

.terms-card h3 {
  margin: 0 0 0.4rem;
  font-size: 13.5px;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: #001038;
}

.terms-card p {
  margin: 0;
  font-size: 13.5px;
  line-height: 1.55;
  color: #5c5278;
}

.terms-split {
  display: grid;
  gap: 0.85rem;
  margin-top: 1rem;
}

@media (min-width: 640px) {
  .terms-split {
    grid-template-columns: 1fr 1fr;
  }
}

.terms-split-label {
  margin: 0 0 0.45rem !important;
  font-size: 10px !important;
  font-weight: 700;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: #382080 !important;
}

.terms-rules {
  margin: 0;
  padding: 0;
  list-style: none;
}

.terms-rules li {
  position: relative;
  padding: 0.55rem 0.75rem 0.55rem 1.65rem;
  font-size: 13.5px;
  line-height: 1.5;
  color: #3a3550;
  border-bottom: 1px solid rgba(0, 16, 56, 0.06);
}

.terms-rules li::before {
  position: absolute;
  left: 0.15rem;
  top: 0.55rem;
  font-size: 11px;
  font-weight: 700;
}

.terms-rules--yes li::before {
  content: '+';
  color: #382080;
}

.terms-rules--no li::before {
  content: '–';
  color: #382080;
}

.terms-steps {
  margin: 0.9rem 0 0;
  padding: 0;
  list-style: none;
}

.terms-steps li {
  display: flex;
  gap: 0.75rem;
  padding: 0.65rem 0;
  font-size: 15px;
  line-height: 1.5;
  color: #3a3550;
  border-bottom: 1px solid rgba(0, 16, 56, 0.06);
}

.terms-steps span {
  flex-shrink: 0;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.1em;
  color: #382080;
}

.terms-callout {
  margin-top: 1rem !important;
  padding: 0.8rem 1rem;
  font-size: 14px !important;
  background: #001038;
  color: #fff !important;
}

.terms-table {
  width: 100%;
  margin-top: 1rem;
  border-collapse: collapse;
  font-size: 13.5px;
}

.terms-table th,
.terms-table td {
  padding: 0.7rem 0.8rem;
  text-align: left;
  border-bottom: 1px solid rgba(0, 16, 56, 0.08);
}

.terms-table th {
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: #382080;
  background: #f8f6fb;
}

.terms-table td:first-child {
  font-weight: 600;
  color: #001038;
}

.terms-contact {
  margin-top: 0.3rem;
  padding: 1.2rem 1.15rem 1.25rem;
  color: #fff;
  background: #001038;
}

.terms-contact-kicker {
  margin: 0 0 0.35rem !important;
  font-size: 10px !important;
  font-weight: 700;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: #c4b5f0 !important;
}

.terms-contact-name {
  margin: 0 0 0.65rem !important;
  font-family: var(--font-display);
  font-size: 1.2rem !important;
  font-weight: 600;
  color: #fff !important;
}

.terms-contact p {
  color: rgba(255, 255, 255, 0.78);
}

.terms-contact a {
  color: #c4b5f0;
}

.terms-contact-note {
  margin-top: 0.9rem !important;
  padding-top: 0.85rem;
  font-size: 13px !important;
  color: rgba(255, 255, 255, 0.55) !important;
  border-top: 1px solid rgba(255, 255, 255, 0.12);
}

@media (max-width: 1023px) {
  .terms-toc {
    order: -1;
  }
}
</style>
