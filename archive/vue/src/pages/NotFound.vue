<template>
  <div class="not-found">
    <!-- Starfield background -->
    <canvas ref="canvas" class="starfield"></canvas>

    <div class="content">
      <!-- Animated coin -->
      <div class="coin-wrap">
        <div class="coin" :class="{ flip: isFlipping }">
          <div class="coin-face coin-front">
            <span class="coin-num">4</span>
          </div>
          <div class="coin-face coin-back">
            <span class="coin-num">0</span>
          </div>
        </div>
      </div>

      <h1 class="title">
        <span class="four">4</span>
        <span class="zero">0</span>
        <span class="four">4</span>
      </h1>

      <p class="subtitle">Looks like this page got lost in the collection.</p>
      <p class="hint">Even the rarest coin can go missing.</p>

      <router-link to="/" class="home-btn">
        <i class="pi pi-arrow-left"></i>
        Back to home
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NotFound',

  data() {
    return {
      isFlipping: false,
      flipInterval: null,
      animFrame: null,
      stars: [],
    }
  },

  mounted() {
    this.initStars()
    this.animateStars()
    this.flipInterval = setInterval(() => {
      this.isFlipping = true
      setTimeout(() => (this.isFlipping = false), 700)
    }, 3000)
  },

  beforeUnmount() {
    clearInterval(this.flipInterval)
    cancelAnimationFrame(this.animFrame)
  },

  methods: {
    initStars() {
      const canvas = this.$refs.canvas
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      this.stars = Array.from({ length: 120 }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 1.5 + 0.3,
        opacity: Math.random() * 0.6 + 0.1,
        speed: Math.random() * 0.3 + 0.05,
        twinkle: Math.random() * Math.PI * 2,
      }))
    },

    animateStars() {
      const canvas = this.$refs.canvas
      if (!canvas) return
      const ctx = canvas.getContext('2d')
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      this.stars.forEach((s) => {
        s.twinkle += 0.02
        const alpha = s.opacity * (0.7 + 0.3 * Math.sin(s.twinkle))
        ctx.beginPath()
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(180, 210, 255, ${alpha})`
        ctx.fill()
      })

      this.animFrame = requestAnimationFrame(this.animateStars)
    },
  },
}
</script>

<style scoped>
/* ── Layout ─────────────────────────── */
.not-found {
  position: relative;
  min-height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #070f1e;
  overflow: hidden;
  border-radius: 2rem;
}

.starfield {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.content {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 2rem;
  gap: 1rem;
}

/* ── 404 title ──────────────────────── */
.title {
  font-size: clamp(6rem, 18vw, 10rem);
  font-weight: 800;
  letter-spacing: -0.04em;
  line-height: 1;
  margin: 0;
  display: flex;
  gap: 0.1em;
}

.four {
  color: #4f9eff;
  text-shadow: 0 0 40px rgba(79, 158, 255, 0.4);
}

.zero {
  color: rgba(255, 255, 255, 0.08);
  -webkit-text-stroke: 2px rgba(79, 158, 255, 0.3);
}

/* ── Coin ───────────────────────────── */
.coin-wrap {
  perspective: 600px;
  margin-bottom: 0.5rem;
}

.coin {
  width: 72px;
  height: 72px;
  position: relative;
  transform-style: preserve-3d;
  transition: transform 0.7s cubic-bezier(0.4, 0, 0.2, 1);
}

.coin.flip {
  transform: rotateY(180deg);
}

.coin-face {
  position: absolute;
  inset: 0;
  border-radius: 50%;
  backface-visibility: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 3px solid rgba(79, 158, 255, 0.4);
}

.coin-front {
  background: radial-gradient(circle at 35% 35%, #1e3a6e, #0b1e3a);
  box-shadow:
    inset 0 2px 6px rgba(255, 255, 255, 0.1),
    0 0 20px rgba(79, 158, 255, 0.2);
}

.coin-back {
  background: radial-gradient(circle at 35% 35%, #1a3560, #091828);
  transform: rotateY(180deg);
  box-shadow: inset 0 2px 6px rgba(255, 255, 255, 0.08);
}

.coin-num {
  font-size: 1.75rem;
  font-weight: 700;
  color: #b8d4ff;
}

/* ── Text ───────────────────────────── */
.subtitle {
  font-size: 1.1rem;
  color: #7a99c2;
  margin: 0;
  font-weight: 400;
}

.hint {
  font-size: 0.875rem;
  color: rgba(122, 153, 194, 0.5);
  margin: 0;
  font-style: italic;
}

/* ── Button ─────────────────────────── */
.home-btn {
  margin-top: 1rem;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.65rem 1.4rem;
  background: transparent;
  border: 1px solid rgba(79, 158, 255, 0.35);
  color: #4f9eff;
  font-size: 0.9rem;
  font-weight: 500;
  text-decoration: none;
  border-radius: 8px;
  transition:
    background 0.2s,
    border-color 0.2s,
    transform 0.15s;
}

.home-btn:hover {
  background: rgba(79, 158, 255, 0.1);
  border-color: rgba(79, 158, 255, 0.6);
  transform: translateX(-3px);
}
</style>
