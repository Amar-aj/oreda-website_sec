<script setup lang="ts">
defineProps<{
  leaving?: boolean
}>()
</script>

<template>
  <div
    class="site-loader"
    :class="{ 'is-leaving': leaving }"
    role="status"
    aria-live="polite"
    aria-label="Loading OREDA website"
  >
    <div class="site-loader-pane site-loader-pane--brand" aria-hidden="true">
      <div class="site-loader-brand-fx">
        <span class="site-loader-glow site-loader-glow--brand-a" />
        <span class="site-loader-glow site-loader-glow--brand-b" />
        <span class="site-loader-brand-mesh" />
        <span class="site-loader-slash site-loader-slash--brand" />
      </div>
      <p class="site-loader-spine">Odisha</p>
      <p class="site-loader-year">Est. 1984</p>
    </div>

    <div class="site-loader-pane site-loader-pane--light">
      <div class="site-loader-light-fx" aria-hidden="true">
        <span class="site-loader-light-base" />
        <span class="site-loader-glow site-loader-glow--light-a" />
        <span class="site-loader-glow site-loader-glow--light-b" />
        <span class="site-loader-glow site-loader-glow--light-c" />
        <span class="site-loader-light-mesh" />
        <span class="site-loader-light-dots" />
        <span class="site-loader-beam" />
        <span
          v-for="n in 8"
          :key="n"
          class="site-loader-mote"
          :style="{ '--i': n }"
        />
      </div>
      <div class="site-loader-content">
        <p class="site-loader-eyebrow">Renewable Energy Agency</p>

        <div class="site-loader-solar">
          <span class="site-loader-sun" aria-hidden="true" />
          <span class="site-loader-rays" aria-hidden="true" />
          <span class="site-loader-halo" aria-hidden="true" />
          <div class="site-loader-logo-wrap">
            <img
              src="/images/oreda-logo.png?v=3"
              alt="OREDA Limited"
              class="site-loader-logo"
            />
          </div>
        </div>

        <div class="site-loader-rule" aria-hidden="true" />

        <p class="site-loader-name">OREDA Limited</p>
        <p class="site-loader-dept">Department of Energy, Government of Odisha</p>
      </div>
    </div>

    <div class="site-loader-rail" aria-hidden="true">
      <span class="site-loader-rail-fill" />
    </div>
  </div>
</template>

<style scoped>
.site-loader {
  position: fixed;
  inset: 0;
  z-index: 9999;
  display: grid;
  grid-template-columns: minmax(7.5rem, 22vw) minmax(0, 1fr);
  background: #f6f3ee;
  overflow: hidden;
}

.site-loader-pane {
  position: relative;
  min-height: 100%;
}

.site-loader-pane--brand {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 2rem 1.1rem 1.6rem;
  background:
    linear-gradient(180deg, #482888 0%, #382080 42%, #001038 100%);
  overflow: hidden;
}

.site-loader-brand-fx,
.site-loader-light-fx {
  position: absolute;
  inset: 0;
  pointer-events: none;
  overflow: hidden;
}

.site-loader-glow {
  position: absolute;
  border-radius: 9999px;
  filter: blur(2px);
}

.site-loader-glow--brand-a {
  top: -18%;
  left: -40%;
  width: 12rem;
  height: 14rem;
  background: radial-gradient(circle, rgba(196, 181, 240, 0.32), transparent 70%);
}

.site-loader-glow--brand-b {
  right: -50%;
  bottom: -8%;
  width: 11rem;
  height: 12rem;
  background: radial-gradient(circle, rgba(0, 16, 56, 0.45), transparent 70%);
}

.site-loader-brand-mesh {
  position: absolute;
  inset: 0;
  opacity: 0.22;
  background-image:
    linear-gradient(rgba(255, 255, 255, 0.14) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.14) 1px, transparent 1px);
  background-size: 28px 28px;
  mask-image: linear-gradient(180deg, black 10%, transparent 88%);
}

.site-loader-slash {
  position: absolute;
  width: 1px;
  height: 130%;
  background: linear-gradient(180deg, transparent, rgba(56, 32, 128, 0.16), transparent);
}

.site-loader-slash--brand {
  top: -20%;
  left: 58%;
  background: linear-gradient(180deg, transparent, rgba(255, 255, 255, 0.22), transparent);
  transform: rotate(18deg);
}

.site-loader-spine {
  position: relative;
  z-index: 1;
  margin: 0;
  writing-mode: vertical-rl;
  transform: rotate(180deg);
  font-family: var(--font-display);
  font-size: clamp(2.4rem, 6vw, 4.4rem);
  font-weight: 600;
  letter-spacing: 0.18em;
  line-height: 1;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.92);
  animation: site-loader-rise 1s cubic-bezier(0.22, 1, 0.36, 1) both;
}

.site-loader-year {
  position: relative;
  z-index: 1;
  margin: 0;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: rgba(196, 181, 240, 0.78);
  animation: site-loader-rise 1s 0.12s cubic-bezier(0.22, 1, 0.36, 1) both;
}

.site-loader-pane--light {
  display: grid;
  place-items: center;
  padding: 2.5rem 1.5rem 3.2rem;
  overflow: hidden;
  background: #efeaf8;
}

.site-loader-light-base {
  position: absolute;
  inset: 0;
  background:
    radial-gradient(ellipse 80% 55% at 12% -8%, rgba(56, 32, 128, 0.16), transparent 56%),
    radial-gradient(ellipse 70% 50% at 92% 8%, rgba(196, 181, 240, 0.42), transparent 52%),
    radial-gradient(ellipse 55% 40% at 50% 100%, rgba(0, 16, 56, 0.08), transparent 60%),
    linear-gradient(155deg, #efeaf8 0%, #f5f3fb 28%, #f2f5f9 58%, #f7f4fc 78%, #eef1f7 100%);
}

.site-loader-glow--light-a {
  top: -18%;
  left: -6%;
  width: 22rem;
  height: 16rem;
  background: radial-gradient(circle, rgba(56, 32, 128, 0.16), transparent 70%);
}

.site-loader-glow--light-b {
  top: 8%;
  right: -8%;
  width: 20rem;
  height: 16rem;
  background: radial-gradient(circle, rgba(148, 122, 210, 0.26), transparent 70%);
}

.site-loader-glow--light-c {
  bottom: -12%;
  left: 28%;
  width: 24rem;
  height: 14rem;
  background: radial-gradient(circle, rgba(196, 181, 240, 0.22), transparent 70%);
}

.site-loader-light-mesh {
  position: absolute;
  inset: 0;
  opacity: 0.38;
  background-image:
    linear-gradient(rgba(56, 32, 128, 0.055) 1px, transparent 1px),
    linear-gradient(90deg, rgba(56, 32, 128, 0.055) 1px, transparent 1px);
  background-size: 42px 42px;
  mask-image: radial-gradient(ellipse 80% 70% at 50% 40%, black 12%, transparent 78%);
}

.site-loader-light-dots {
  position: absolute;
  inset: 0;
  opacity: 0.4;
  background-image: radial-gradient(rgba(56, 32, 128, 0.16) 1px, transparent 1px);
  background-size: 18px 18px;
  mask-image: radial-gradient(ellipse 55% 45% at 80% 72%, black 8%, transparent 72%);
}

.site-loader-content {
  position: relative;
  z-index: 1;
  display: grid;
  justify-items: center;
  width: min(100%, 22rem);
  text-align: center;
}

.site-loader-beam {
  position: absolute;
  top: -20%;
  left: 8%;
  width: 38%;
  height: 140%;
  background: linear-gradient(
    108deg,
    transparent 36%,
    rgba(255, 214, 130, 0.16) 48%,
    transparent 60%
  );
  transform: rotate(18deg);
  animation: site-loader-beam 5.2s ease-in-out infinite;
}

.site-loader-mote {
  position: absolute;
  width: 5px;
  height: 5px;
  border-radius: 9999px;
  background: radial-gradient(circle, #ffe08a 0%, rgba(255, 200, 87, 0.1) 70%);
  left: calc(18% + (var(--i) * 8%));
  top: calc(22% + (var(--i) * 7%));
  animation: site-loader-mote 4.8s ease-in-out infinite;
  animation-delay: calc(var(--i) * 0.28s);
}

.site-loader-eyebrow {
  margin: 0 0 1.6rem;
  font-size: 10.5px;
  font-weight: 700;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  color: #382080;
  animation: site-loader-rise 0.85s 0.08s cubic-bezier(0.22, 1, 0.36, 1) both;
}

.site-loader-solar {
  position: relative;
  display: grid;
  place-items: center;
  width: min(100%, 17.5rem);
  aspect-ratio: 1;
  animation: site-loader-rise 0.95s 0.16s cubic-bezier(0.22, 1, 0.36, 1) both;
}

.site-loader-sun {
  position: absolute;
  width: 7.2rem;
  height: 7.2rem;
  border-radius: 9999px;
  background:
    radial-gradient(circle at 38% 34%, #fff6c8 0%, #ffc857 42%, #f59e0b 78%, transparent 80%);
  box-shadow:
    0 0 40px 12px rgba(255, 200, 87, 0.28),
    0 0 90px 28px rgba(255, 176, 70, 0.12);
  animation: site-loader-sun 3.6s ease-in-out infinite;
  opacity: 0.55;
}

.site-loader-rays {
  position: absolute;
  inset: -8%;
  border-radius: 9999px;
  background: repeating-conic-gradient(
    from 0deg,
    rgba(255, 200, 87, 0.2) 0deg 6deg,
    transparent 6deg 20deg
  );
  mask-image: radial-gradient(circle, transparent 34%, black 38%, black 58%, transparent 72%);
  animation: site-loader-rays 16s linear infinite;
}

.site-loader-halo {
  position: absolute;
  inset: 6%;
  border-radius: 9999px;
  border: 1px solid rgba(255, 200, 87, 0.28);
  box-shadow: inset 0 0 0 8px rgba(255, 200, 87, 0.05);
  animation: site-loader-halo 3.2s ease-in-out infinite;
}

.site-loader-logo-wrap {
  position: relative;
  z-index: 1;
  width: min(100%, 15.5rem);
  padding: 1.15rem 1.3rem;
  background: rgba(255, 255, 255, 0.94);
  border: 1px solid rgba(56, 32, 128, 0.08);
  box-shadow:
    0 24px 50px -32px rgba(0, 16, 56, 0.35),
    0 0 0 10px rgba(255, 200, 87, 0.06);
}

.site-loader-logo {
  display: block;
  width: 100%;
  height: auto;
  object-fit: contain;
}

.site-loader-rule {
  width: 2.4rem;
  height: 1px;
  margin: 1.55rem 0 1.15rem;
  background: #382080;
  transform-origin: center;
  animation: site-loader-rule 0.8s 0.45s cubic-bezier(0.22, 1, 0.36, 1) both;
}

.site-loader-name {
  margin: 0;
  font-family: var(--font-display);
  font-size: clamp(1.55rem, 2.8vw, 2rem);
  font-weight: 600;
  letter-spacing: -0.02em;
  color: #001038;
  animation: site-loader-rise 0.9s 0.28s cubic-bezier(0.22, 1, 0.36, 1) both;
}

.site-loader-dept {
  margin: 0.45rem 0 0;
  font-size: 13px;
  line-height: 1.5;
  color: #6b7c94;
  animation: site-loader-rise 0.9s 0.36s cubic-bezier(0.22, 1, 0.36, 1) both;
}

.site-loader-rail {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 3px;
  background: rgba(56, 32, 128, 0.08);
}

.site-loader-rail-fill {
  display: block;
  height: 100%;
  width: 0;
  background: linear-gradient(90deg, #482888, #382080 55%, #001038);
  animation: site-loader-rail 2.1s cubic-bezier(0.22, 1, 0.36, 1) forwards;
}

.site-loader.is-leaving .site-loader-pane--brand {
  animation: site-loader-exit-left 0.8s cubic-bezier(0.76, 0, 0.24, 1) both;
}

.site-loader.is-leaving .site-loader-pane--light {
  animation: site-loader-exit-right 0.8s cubic-bezier(0.76, 0, 0.24, 1) both;
}

.site-loader.is-leaving .site-loader-rail {
  animation: site-loader-fade 0.35s ease both;
}

@keyframes site-loader-rise {
  from {
    opacity: 0;
    transform: translateY(16px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes site-loader-rule {
  from {
    transform: scaleX(0);
    opacity: 0;
  }
  to {
    transform: scaleX(1);
    opacity: 1;
  }
}

@keyframes site-loader-rail {
  to {
    width: 100%;
  }
}

@keyframes site-loader-exit-left {
  to {
    transform: translateX(-105%);
  }
}

@keyframes site-loader-exit-right {
  to {
    transform: translateX(105%);
  }
}

@keyframes site-loader-fade {
  to {
    opacity: 0;
  }
}

@keyframes site-loader-rays {
  to {
    transform: rotate(360deg);
  }
}

@keyframes site-loader-sun {
  0%,
  100% {
    transform: scale(1);
    opacity: 0.48;
  }
  50% {
    transform: scale(1.08);
    opacity: 0.7;
  }
}

@keyframes site-loader-halo {
  0%,
  100% {
    transform: scale(1);
    opacity: 0.7;
  }
  50% {
    transform: scale(1.06);
    opacity: 1;
  }
}

@keyframes site-loader-beam {
  0%,
  100% {
    opacity: 0.15;
    transform: translateX(-8%) rotate(18deg);
  }
  50% {
    opacity: 0.42;
    transform: translateX(18%) rotate(18deg);
  }
}

@keyframes site-loader-mote {
  0%,
  100% {
    transform: translateY(0) scale(0.7);
    opacity: 0.15;
  }
  50% {
    transform: translateY(-18px) scale(1);
    opacity: 0.85;
  }
}

@media (max-width: 720px) {
  .site-loader {
    grid-template-columns: 4.6rem minmax(0, 1fr);
  }

  .site-loader-pane--brand {
    padding: 1.4rem 0.55rem 1.2rem;
  }

  .site-loader-spine {
    letter-spacing: 0.14em;
  }

  .site-loader-solar,
  .site-loader-logo-wrap {
    width: min(100%, 13rem);
  }
}

@media (prefers-reduced-motion: reduce) {
  .site-loader-spine,
  .site-loader-year,
  .site-loader-eyebrow,
  .site-loader-logo-wrap,
  .site-loader-rule,
  .site-loader-name,
  .site-loader-dept,
  .site-loader-rail-fill,
  .site-loader-sun,
  .site-loader-rays,
  .site-loader-halo,
  .site-loader-beam,
  .site-loader-mote,
  .site-loader.is-leaving .site-loader-pane--brand,
  .site-loader.is-leaving .site-loader-pane--light,
  .site-loader.is-leaving .site-loader-rail {
    animation: none;
  }

  .site-loader-rail-fill {
    width: 100%;
  }

  .site-loader.is-leaving {
    opacity: 0;
  }
}
</style>
