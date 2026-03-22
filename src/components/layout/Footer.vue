<template>
  <footer class="footer">
    <!-- Top divider line with glow -->
    <div class="footer-glow-line"></div>

    <div class="footer-container">
      <!-- LEFT: Brand -->
      <div class="footer-brand">
        <RouterLink to="/">
          <img src="@/assets/images/logo-full.png" alt="MitsikostasTech" class="footer-logo" />
        </RouterLink>
        <p class="footer-tagline">Building tools, projects<br />and experiments.</p>

        <!-- Social icons -->
        <div class="social-links">
          <a
            href="https://github.com/yourusername"
            target="_blank"
            rel="noopener"
            aria-label="GitHub"
            class="social-btn"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
              <path
                d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.604-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836a9.59 9.59 0 012.504.337c1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.741 0 .267.18.579.688.481C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z"
              />
            </svg>
          </a>
          <a
            href="https://linkedin.com/in/yourusername"
            target="_blank"
            rel="noopener"
            aria-label="LinkedIn"
            class="social-btn"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
              <path
                d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
              />
            </svg>
          </a>
          <a href="mailto:mitsikostastech@gmail.com" aria-label="Email" class="social-btn">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              width="18"
              height="18"
            >
              <rect x="2" y="4" width="20" height="16" rx="2" />
              <path d="M22 7l-10 7L2 7" />
            </svg>
          </a>
        </div>
      </div>

      <!-- CENTER: Navigation columns -->
      <div class="footer-nav">
        <div class="nav-col">
          <span class="nav-col-title">Explore</span>
          <ul>
            <li><RouterLink to="/">Home</RouterLink></li>
            <li><RouterLink to="/about">About</RouterLink></li>
            <li><RouterLink to="/contact">Contact</RouterLink></li>
          </ul>
        </div>

        <div class="nav-col">
          <span class="nav-col-title">Work</span>
          <ul>
            <li><RouterLink to="/work/experience">Experience</RouterLink></li>
            <li><RouterLink to="/work/projects">Projects</RouterLink></li>
            <li><RouterLink to="/work/tools">Tools & Stack</RouterLink></li>
            <li><RouterLink to="/work/cv">CV</RouterLink></li>
          </ul>
        </div>

        <div class="nav-col">
          <span class="nav-col-title">Hobbies</span>
          <ul>
            <li><RouterLink to="/hobbies/coins">Coin Collection</RouterLink></li>
          </ul>
        </div>
      </div>

      <!-- RIGHT: Contact card -->
      <div class="footer-contact">
        <span class="nav-col-title">Get in touch</span>
        <a href="mailto:mitsikostastech@gmail.com" class="email-card">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.5"
            width="20"
            height="20"
          >
            <rect x="2" y="4" width="20" height="16" rx="2" />
            <path d="M22 7l-10 7L2 7" />
          </svg>
          <span>mitsikostastech@gmail.com</span>
        </a>
        <p class="contact-note">Open for freelance & collaborations.</p>
      </div>
    </div>

    <!-- Bottom bar -->
    <div class="footer-bottom">
      <div class="footer-bottom-inner">
        <span>© {{ year }} MitsikostasTech. All rights reserved.</span>
        <span class="built-with">
          Built with
          <svg
            viewBox="0 0 24 24"
            width="14"
            height="14"
            fill="#4fc08d"
            style="margin: 0 3px; vertical-align: middle"
          >
            <path d="M2 3h3.5L12 15l6.5-12H22L12 21 2 3z" />
            <path d="M6.5 3h4L12 7.5 13.5 3h4L12 15 6.5 3z" fill="#35495e" />
          </svg>
          Vue 3 &amp; PrimeVue
        </span>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { RouterLink } from 'vue-router'
const year = new Date().getFullYear()
</script>

<style scoped>
/* ── Variables ───────────────────────── */
.footer {
  --accent: #4f9eff;
  --accent-dim: rgba(79, 158, 255, 0.15);
  --text: #c8d8f0;
  --text-muted: #5a7a9e;
  --border: rgba(255, 255, 255, 0.06);

  background: #070f1e;
  color: var(--text);
  margin-top: auto;
}

/* ── Glow line ───────────────────────── */
.footer-glow-line {
  height: 1px;
  background: linear-gradient(
    to right,
    transparent 0%,
    rgba(79, 158, 255, 0.4) 30%,
    rgba(79, 158, 255, 0.6) 50%,
    rgba(79, 158, 255, 0.4) 70%,
    transparent 100%
  );
}

/* ── Main container ──────────────────── */
.footer-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 3rem 1.5rem 2rem;
  display: grid;
  grid-template-columns: 1.6fr 2fr 1.4fr;
  gap: 3rem;
  align-items: start;
}

/* ── Brand ───────────────────────────── */
.footer-logo {
  height: 64px;
  display: block;
  margin-bottom: 1rem;
  opacity: 0.9;
  transition: opacity 0.2s;
}
.footer-logo:hover {
  opacity: 1;
}

.footer-tagline {
  font-size: 0.875rem;
  color: var(--text-muted);
  line-height: 1.6;
  margin: 0 0 1.25rem;
}

/* ── Social buttons ──────────────────── */
.social-links {
  display: flex;
  gap: 0.5rem;
}

.social-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 34px;
  height: 34px;
  border-radius: 8px;
  border: 1px solid var(--border);
  color: var(--text-muted);
  background: rgba(255, 255, 255, 0.03);
  transition:
    color 0.2s,
    border-color 0.2s,
    background 0.2s,
    transform 0.15s;
  text-decoration: none;
}
.social-btn:hover {
  color: var(--accent);
  border-color: rgba(79, 158, 255, 0.4);
  background: var(--accent-dim);
  transform: translateY(-2px);
}

/* ── Nav columns ─────────────────────── */
.footer-nav {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
}

.nav-col-title {
  display: block;
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--accent);
  margin-bottom: 1rem;
}

.nav-col ul {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}

.nav-col a {
  font-size: 0.875rem;
  color: var(--text-muted);
  text-decoration: none;
  transition:
    color 0.2s,
    padding-left 0.2s;
  display: inline-block;
}
.nav-col a:hover,
.nav-col a.router-link-active {
  color: var(--text);
  padding-left: 4px;
}

/* ── Contact card ────────────────────── */
.footer-contact {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.email-card {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.75rem 1rem;
  border: 1px solid var(--border);
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.02);
  color: var(--text-muted);
  font-size: 0.8rem;
  text-decoration: none;
  transition:
    color 0.2s,
    border-color 0.2s,
    background 0.2s;
  word-break: break-all;
}
.email-card svg {
  flex-shrink: 0;
  color: var(--accent);
}
.email-card:hover {
  color: var(--text);
  border-color: rgba(79, 158, 255, 0.35);
  background: var(--accent-dim);
}

.contact-note {
  font-size: 0.8rem;
  color: var(--text-muted);
  margin: 0;
  opacity: 0.7;
  font-style: italic;
}

/* ── Bottom bar ──────────────────────── */
.footer-bottom {
  border-top: 1px solid var(--border);
}

.footer-bottom-inner {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.78rem;
  color: var(--text-muted);
  opacity: 0.7;
}

.built-with {
  display: flex;
  align-items: center;
  gap: 2px;
}

/* ── Responsive ──────────────────────── */
@media (max-width: 900px) {
  .footer-container {
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
  }
  .footer-brand {
    grid-column: 1 / -1;
  }
}

@media (max-width: 560px) {
  .footer-container {
    grid-template-columns: 1fr;
    padding: 2rem 1.25rem 1.5rem;
  }
  .footer-nav {
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
  }
  .footer-bottom-inner {
    flex-direction: column;
    gap: 0.4rem;
    text-align: center;
  }
}
</style>
