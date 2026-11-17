<script setup lang="ts">
import loginBg from '@/assets/images/vendor/vendor-login-bg.jpg'
import { useVendorStore } from '@/stores/vendor'
import {
  Building2,
  ClipboardList,
  Eye,
  EyeOff,
  Layers3,
  LockKeyhole,
  LogIn,
  ShieldCheck,
  UserPlus,
  UserRound,
} from 'lucide-vue-next'
import { reactive, ref, watch } from 'vue'

const vendor = useVendorStore()
const mode = ref<'login' | 'signup'>('login')
const showPassword = ref(false)
const submitting = ref(false)

const loginForm = reactive({
  username: '',
  password: '',
})

const signupForm = reactive({
  organisationName: '',
  username: '',
  password: '',
  confirmPassword: '',
})

watch(mode, () => {
  vendor.clearMessages()
  showPassword.value = false
})

async function onLogin() {
  submitting.value = true
  await new Promise((r) => setTimeout(r, 280))
  vendor.login({
    username: loginForm.username,
    password: loginForm.password,
  })
  submitting.value = false
}

async function onSignup() {
  vendor.clearMessages()
  if (signupForm.password !== signupForm.confirmPassword) {
    vendor.authError = 'Passwords do not match.'
    return
  }
  submitting.value = true
  await new Promise((r) => setTimeout(r, 320))
  vendor.signup({
    organisationName: signupForm.organisationName,
    username: signupForm.username,
    password: signupForm.password,
  })
  submitting.value = false
}
</script>

<template>
  <section class="vep" aria-label="Vendor e-Empanelment login">
    <img :src="loginBg" alt="" class="vep-bg" aria-hidden="true" />

    <div class="vep-shell">
      <aside class="vep-left">
        <div class="vep-org">
          Department of Energy · Government of Odisha
        </div>

        <div class="vep-intro">
          <span class="vep-accent-line" aria-hidden="true" />
          <h1>
            Vendor
            <span>Empanelment Portal</span>
          </h1>
          <p>
            A digital platform for vendor registration and structured
            empanelment under OREDA’s renewable energy programmes.
          </p>
        </div>

        <ul class="vep-features" role="list">
          <li>
            <span class="vep-feature-icon" aria-hidden="true">
              <ClipboardList :size="22" :stroke-width="1.9" />
            </span>
            <span class="vep-feature-label">Easy Registration</span>
          </li>
          <li class="vep-feature-sep" aria-hidden="true" />
          <li>
            <span class="vep-feature-icon" aria-hidden="true">
              <Layers3 :size="22" :stroke-width="1.9" />
            </span>
            <span class="vep-feature-label">Structured Process</span>
          </li>
          <li class="vep-feature-sep" aria-hidden="true" />
          <li>
            <span class="vep-feature-icon" aria-hidden="true">
              <ShieldCheck :size="22" :stroke-width="1.9" />
            </span>
            <span class="vep-feature-label">Transparent &amp; Secure</span>
          </li>
        </ul>
      </aside>

      <div class="vep-right">
        <div class="vep-card">
          <header class="vep-card-head">
            <h2>{{ mode === 'login' ? 'Vendor Login' : 'Vendor Registration' }}</h2>
            <p>
              {{
                mode === 'login'
                  ? 'Access your vendor account to manage registration, applications and empanelment details.'
                  : 'Create your organisation account to begin the 16-stage BID empanelment process.'
              }}
            </p>
          </header>

          <p v-if="vendor.authError" class="vep-alert is-error" role="alert">
            {{ vendor.authError }}
          </p>
          <p
            v-else-if="vendor.authSuccess"
            class="vep-alert is-success"
            role="status"
          >
            {{ vendor.authSuccess }}
          </p>

          <form
            v-if="mode === 'login'"
            class="vep-form"
            @submit.prevent="onLogin"
          >
            <label class="vep-field">
              <span class="vep-label">User ID / Registered Email</span>
              <span class="vep-control">
                <UserRound :size="17" :stroke-width="2" class="vep-icon" />
                <input
                  v-model="loginForm.username"
                  type="text"
                  autocomplete="username"
                  placeholder="Enter user ID or email"
                  required
                />
              </span>
            </label>

            <label class="vep-field">
              <span class="vep-label">Password</span>
              <span class="vep-control">
                <LockKeyhole :size="17" :stroke-width="2" class="vep-icon" />
                <input
                  v-model="loginForm.password"
                  :type="showPassword ? 'text' : 'password'"
                  autocomplete="current-password"
                  placeholder="Enter password"
                  required
                />
                <button
                  type="button"
                  class="vep-eye"
                  :aria-label="showPassword ? 'Hide password' : 'Show password'"
                  @click="showPassword = !showPassword"
                >
                  <EyeOff v-if="showPassword" :size="17" :stroke-width="2" />
                  <Eye v-else :size="17" :stroke-width="2" />
                </button>
              </span>
            </label>

            <div class="vep-forgot-row">
              <button type="button" class="vep-forgot" disabled>
                Forgot Password?
              </button>
            </div>

            <button type="submit" class="vep-btn-primary" :disabled="submitting">
              <LogIn :size="17" :stroke-width="2.3" />
              <span>{{ submitting ? 'Signing in…' : 'Login' }}</span>
            </button>

            <div class="vep-divider"><span>New Vendor?</span></div>

            <button
              type="button"
              class="vep-btn-secondary"
              @click="mode = 'signup'"
            >
              <UserPlus :size="17" :stroke-width="2.2" />
              Register Now
            </button>
          </form>

          <form v-else class="vep-form" @submit.prevent="onSignup">
            <label class="vep-field">
              <span class="vep-label">Organisation Name</span>
              <span class="vep-control">
                <Building2 :size="17" :stroke-width="2" class="vep-icon" />
                <input
                  v-model="signupForm.organisationName"
                  type="text"
                  autocomplete="organization"
                  placeholder="Registered organisation name"
                  required
                />
              </span>
            </label>

            <label class="vep-field">
              <span class="vep-label">Username</span>
              <span class="vep-control">
                <UserRound :size="17" :stroke-width="2" class="vep-icon" />
                <input
                  v-model="signupForm.username"
                  type="text"
                  autocomplete="username"
                  placeholder="Choose a username"
                  required
                />
              </span>
            </label>

            <label class="vep-field">
              <span class="vep-label">Password</span>
              <span class="vep-control">
                <LockKeyhole :size="17" :stroke-width="2" class="vep-icon" />
                <input
                  v-model="signupForm.password"
                  :type="showPassword ? 'text' : 'password'"
                  autocomplete="new-password"
                  placeholder="Minimum 6 characters"
                  required
                />
                <button
                  type="button"
                  class="vep-eye"
                  :aria-label="showPassword ? 'Hide password' : 'Show password'"
                  @click="showPassword = !showPassword"
                >
                  <EyeOff v-if="showPassword" :size="17" :stroke-width="2" />
                  <Eye v-else :size="17" :stroke-width="2" />
                </button>
              </span>
            </label>

            <label class="vep-field">
              <span class="vep-label">Confirm Password</span>
              <span class="vep-control">
                <LockKeyhole :size="17" :stroke-width="2" class="vep-icon" />
                <input
                  v-model="signupForm.confirmPassword"
                  :type="showPassword ? 'text' : 'password'"
                  autocomplete="new-password"
                  placeholder="Re-enter password"
                  required
                />
              </span>
            </label>

            <button type="submit" class="vep-btn-primary" :disabled="submitting">
              <UserPlus :size="17" :stroke-width="2.3" />
              <span>{{ submitting ? 'Creating…' : 'Register Now' }}</span>
            </button>

            <div class="vep-divider"><span>Already registered?</span></div>

            <button
              type="button"
              class="vep-btn-secondary"
              @click="mode = 'login'"
            >
              <LogIn :size="17" :stroke-width="2.2" />
              Back to Login
            </button>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.vep {
  position: relative;
  isolation: isolate;
  min-height: calc(100svh - 7.5rem);
  overflow: hidden;
  background: #fbfafe;
  font-family: var(--font-sans);
}

.vep-bg {
  position: absolute;
  inset: 0;
  z-index: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: left bottom;
  pointer-events: none;
  user-select: none;
}

.vep-shell {
  position: relative;
  z-index: 1;
  display: grid;
  gap: 2rem;
  width: min(100%, 1320px);
  margin: 0 auto;
  padding: 1.75rem 1.25rem 2.25rem;
}

@media (min-width: 980px) {
  .vep-shell {
    grid-template-columns: minmax(0, 1.05fr) minmax(28rem, 0.95fr);
    align-items: start;
    min-height: calc(100svh - 7.5rem);
    gap: 3rem;
    padding: 2rem 2rem 3rem;
  }
}

@media (min-width: 1200px) {
  .vep-shell {
    gap: 4rem;
    padding-inline: 2.5rem;
  }
}

.vep-left {
  display: flex;
  flex-direction: column;
  gap: 1.75rem;
  max-width: 38rem;
  padding-top: 0.15rem;
  align-self: start;
}

.vep-org {
  display: inline-flex;
  align-items: center;
  width: fit-content;
  border: 1px solid rgba(56, 32, 128, 0.14);
  background: rgba(255, 255, 255, 0.78);
  backdrop-filter: blur(8px);
  padding: 0.48rem 0.85rem;
  font-family: var(--font-sans);
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.04em;
  line-height: 1.3;
  color: #382080;
  white-space: nowrap;
}

.vep-intro {
  max-width: 34rem;
}

.vep-accent-line {
  display: block;
  width: 2.75rem;
  height: 3px;
  background: #382080;
  margin-bottom: 0.9rem;
}

.vep-intro h1 {
  margin: 0;
  display: flex;
  flex-direction: column;
  font-family: var(--font-display);
  font-size: clamp(1.95rem, 3.6vw, 2.55rem);
  font-weight: 700;
  line-height: 1.12;
  letter-spacing: -0.02em;
  color: #000;
}

.vep-intro h1 span {
  display: block;
  color: #382080;
}

.vep-intro p {
  margin: 0.85rem 0 0;
  max-width: 30rem;
  font-family: var(--font-sans);
  font-size: 14.75px;
  font-weight: 400;
  line-height: 1.55;
  color: rgba(56, 32, 128, 0.68);
}

.vep-features {
  margin: 0.35rem 0 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-wrap: nowrap;
  align-items: flex-start;
  gap: 0;
}

.vep-features > li:not(.vep-feature-sep) {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.6rem;
  min-width: 8.25rem;
  text-align: center;
}

.vep-feature-sep {
  width: 1px;
  align-self: stretch;
  min-height: 4.75rem;
  margin: 0.2rem 1rem;
  background: rgba(56, 32, 128, 0.14);
}

.vep-feature-icon {
  display: inline-flex;
  height: 3.2rem;
  width: 3.2rem;
  align-items: center;
  justify-content: center;
  border-radius: 0.9rem;
  background: rgba(196, 181, 240, 0.42);
  color: #382080;
}

.vep-feature-label {
  max-width: 8.5rem;
  font-family: var(--font-sans);
  font-size: 12.75px;
  font-weight: 700;
  line-height: 1.3;
  color: #001038;
}

.vep-right {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  padding-top: 0.15rem;
}

@media (min-width: 980px) {
  .vep-right {
    justify-content: flex-end;
  }
}

.vep-card {
  width: min(100%, 32rem);
  border-radius: 1.5rem;
  background: #fff;
  padding: 1.85rem 1.55rem 1.7rem;
  border: 1px solid rgba(56, 32, 128, 0.06);
  box-shadow:
    0 28px 60px rgba(56, 32, 128, 0.14),
    0 8px 18px rgba(0, 16, 56, 0.04);
}

@media (min-width: 640px) {
  .vep-card {
    padding: 2.15rem 2rem 1.95rem;
  }
}

@media (min-width: 980px) {
  .vep-card {
    width: min(100%, 34rem);
  }
}

.vep-card-head h2 {
  margin: 0;
  font-family: var(--font-display);
  font-size: 1.65rem;
  font-weight: 700;
  color: #382080;
  line-height: 1.2;
  letter-spacing: -0.02em;
}

.vep-card-head p {
  margin: 0.55rem 0 0;
  max-width: 28rem;
  font-family: var(--font-sans);
  font-size: 13.5px;
  font-weight: 400;
  line-height: 1.5;
  color: rgba(0, 16, 56, 0.58);
}

.vep-alert {
  margin: 1rem 0 0;
  padding: 0.7rem 0.8rem;
  border-radius: 0.7rem;
  font-family: var(--font-sans);
  font-size: 12.75px;
  font-weight: 600;
  line-height: 1.4;
}

.vep-alert.is-error {
  background: #fef2f2;
  color: #991b1b;
}

.vep-alert.is-success {
  background: #ecfdf5;
  color: #047857;
}

.vep-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 1.35rem;
}

.vep-field {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.vep-label {
  font-family: var(--font-sans);
  font-size: 12.75px;
  font-weight: 700;
  color: #001038;
}

.vep-control {
  position: relative;
  display: flex;
  align-items: center;
}

.vep-icon {
  position: absolute;
  left: 0.9rem;
  color: #382080;
  pointer-events: none;
}

.vep-control input {
  width: 100%;
  height: 3.15rem;
  border: 1px solid #d9d4e6;
  border-radius: 0.75rem;
  background: #fff;
  padding: 0 2.65rem 0 2.7rem;
  color: #001038;
  font-family: var(--font-sans);
  font-size: 14.25px;
  outline: none;
  transition:
    border-color 0.18s ease,
    box-shadow 0.18s ease;
}

.vep-control input::placeholder {
  color: #9aa0b0;
}

.vep-control input:focus {
  border-color: #382080;
  box-shadow: 0 0 0 4px rgba(196, 181, 240, 0.4);
}

.vep-eye {
  position: absolute;
  right: 0.4rem;
  display: inline-flex;
  height: 2rem;
  width: 2rem;
  align-items: center;
  justify-content: center;
  border: 0;
  background: transparent;
  color: #8b8798;
  cursor: pointer;
}

.vep-eye:hover {
  color: #382080;
}

.vep-forgot-row {
  display: flex;
  justify-content: flex-end;
  margin-top: -0.25rem;
}

.vep-forgot {
  border: 0;
  background: transparent;
  padding: 0;
  color: #382080;
  font-family: var(--font-sans);
  font-size: 12.5px;
  font-weight: 700;
  cursor: pointer;
}

.vep-forgot:disabled {
  opacity: 0.55;
  cursor: default;
}

.vep-btn-primary {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  height: 3.15rem;
  border: 0;
  border-radius: 0.8rem;
  background: #382080;
  color: #fff;
  font-family: var(--font-sans);
  font-size: 15px;
  font-weight: 700;
  cursor: pointer;
  transition: background 0.18s ease;
}

.vep-btn-primary:hover:not(:disabled) {
  background: #001038;
}

.vep-btn-primary:disabled {
  opacity: 0.72;
  cursor: wait;
}

.vep-divider {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: #8b8798;
  font-family: var(--font-sans);
  font-size: 12.5px;
  font-weight: 600;
}

.vep-divider::before,
.vep-divider::after {
  content: '';
  flex: 1;
  height: 1px;
  background: #e4e0ec;
}

.vep-btn-secondary {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  height: 3.15rem;
  border: 1.5px solid #382080;
  border-radius: 0.8rem;
  background: #fff;
  color: #382080;
  font-family: var(--font-sans);
  font-size: 14.75px;
  font-weight: 700;
  cursor: pointer;
  transition: background 0.18s ease;
}

.vep-btn-secondary:hover {
  background: rgba(196, 181, 240, 0.22);
}

@media (max-width: 979px) {
  .vep-left {
    max-width: none;
  }

  .vep-feature-sep {
    display: none;
  }

  .vep-features {
    flex-wrap: wrap;
    gap: 1rem 1.25rem;
  }

  .vep-card {
    width: min(100%, 36rem);
  }
}
</style>
