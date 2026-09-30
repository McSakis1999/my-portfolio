<template>
  <div class="slab" :class="{ 'slab--wishlist': !coin.isOwned }">
    <span v-if="coin.isOwned" class="badge-owned" title="In collection"></span>
    <span v-if="coin.isFavorite" class="badge-fav">★</span>

    <!-- Header -->
    <div class="slab-header">
      <span class="slab-brand">MCT Registry</span>
      <span class="slab-flag">{{ countryFlag }}</span>
    </div>

    <!-- Coin window — flip container -->
    <div class="slab-window">
      <div class="coin-flip-container">
        <!-- Front face (obverse) -->
        <div class="coin-face coin-face--front" :style="coinStyle">
          <Image
            v-if="coin.imageObverse"
            preview
            :src="coin.imageObverse"
            :alt="coin.name"
            class="coin-img"
          />
          <span v-else class="coin-placeholder">
            {{ coin.denomination }}<br />{{ coin.countryCode }}
          </span>
        </div>

        <!-- Back face (reverse) -->
        <div class="coin-face coin-face--back" :style="coinStyle">
          <Image
            v-if="coin.imageReverse"
            preview
            :src="coin.imageReverse"
            :alt="coin.name + ' — reverse'"
            class="coin-img"
          />
          <span v-else class="coin-placeholder">
            {{ displayYear }}
          </span>
        </div>
      </div>
    </div>

    <div class="slab-divider"></div>

    <!-- Label -->
    <div class="slab-label">
      <p class="coin-name">{{ coin.name }}</p>
      <p class="coin-country">{{ coin.country }} · {{ coin.set }}</p>

      <div class="meta-row">
        <div class="meta-col">
          <span class="meta-key">Year</span>
          <span class="meta-val">{{ displayYear }}</span>
        </div>
        <div class="meta-col">
          <span class="meta-key">Metal</span>
          <span class="meta-val">{{ coin.metal }}</span>
        </div>
        <div class="grade-box">
          <span class="grade-label">Grade</span>
          <span class="grade-val" :style="gradeStyle">
            {{ coin.condition || '—' }}
          </span>
        </div>
      </div>
    </div>

    <!-- Cert strip -->
    <div class="slab-cert">
      <span class="cert-num">
        #{{ String(coin.id).padStart(4, '0') }}
        <template v-if="coin.mintage"> · {{ formatMintage(coin.mintage) }} minted</template>
        <template v-else-if="!coin.isOwned"> · wishlist</template>
      </span>
      <CoinBarcode :seed="coin.id" />
    </div>
  </div>
</template>

<script>
const FLAG_MAP = {
  GR: '🇬🇷',
  DE: '🇩🇪',
  FR: '🇫🇷',
  IT: '🇮🇹',
  ES: '🇪🇸',
  PT: '🇵🇹',
  NL: '🇳🇱',
  BE: '🇧🇪',
  AT: '🇦🇹',
  FI: '🇫🇮',
  GB: '🇬🇧',
  US: '🇺🇸',
  RO: '🇷🇴',
  BG: '🇧🇬',
  TR: '🇹🇷',
  RU: '🇷🇺',
  HU: '🇭🇺',
  CZ: '🇨🇿',
  PL: '🇵🇱',
  CH: '🇨🇭',
}

const METAL_COLORS = {
  gold: { bg: '#c8a84b', border: '#e2c36a', inner: '#8a6e28', text: '#4a2800' },
  silver: { bg: '#a8a8a8', border: '#c8c8c8', inner: '#606060', text: '#2a2a2a' },
  copper: { bg: '#b87333', border: '#d4935a', inner: '#7a4a1a', text: '#4a2800' },
  bimetallic: { bg: '#c8a84b', border: '#e2c36a', inner: '#8a6e28', text: '#4a2800' },
  nickel: { bg: '#9aadbd', border: '#b8c8d4', inner: '#607080', text: '#2a3840' },
  bronze: { bg: '#cd7f32', border: '#e09050', inner: '#8a4a18', text: '#3a1800' },
  zinc: { bg: '#8f9fa8', border: '#aab8c0', inner: '#5a6870', text: '#20282c' },
}

function metalKey(metal = '') {
  const m = metal.toLowerCase()
  for (const key of Object.keys(METAL_COLORS)) {
    if (m.includes(key)) return key
  }
  return 'silver'
}

export default {
  name: 'CoinSlab',

  components: {
    CoinBarcode: {
      props: ['seed'],
      template: `<div class="barcode"><span v-for="(b,i) in bars" :key="i" :style="b"></span></div>`,
      computed: {
        bars() {
          const rng = (n) => (Math.sin(n * 9301 + 49297) * 233280) % 1
          return Array.from({ length: 9 }, (_, i) => ({
            display: 'inline-block',
            width: (i % 2 === 0 ? 1.5 : rng(this.seed + i) * 1.5 + 1) + 'px',
            height: (i % 2 === 0 ? 14 : Math.round(rng(this.seed * 2 + i) * 7 + 7)) + 'px',
            background: '#1e3a6a',
            borderRadius: '0.5px',
          }))
        },
      },
    },
  },

  props: {
    coin: { type: Object, required: true },
  },

  computed: {
    countryFlag() {
      return FLAG_MAP[this.coin.countryCode] || '🌍'
    },

    coinStyle() {
      const c = METAL_COLORS[metalKey(this.coin.metal)]
      return {
        background: c.bg,
        borderColor: c.border,
        boxShadow: `0 0 0 2px ${c.inner}, 0 4px 16px rgba(0,0,0,0.6), inset 0 1px 3px rgba(255,255,255,0.15)`,
        '--placeholder-color': c.text,
      }
    },

    gradeStyle() {
      const long = this.coin.condition && this.coin.condition.length > 3
      return long ? { fontSize: '13px' } : {}
    },

    displayYear() {
      if (!this.coin.year) return '—'
      return this.coin.year < 0 ? `${Math.abs(this.coin.year)} BC` : String(this.coin.year)
    },
  },

  methods: {
    formatMintage(n) {
      return new Intl.NumberFormat('el-GR').format(n)
    },
  },
}
</script>

<style scoped>
/* ── Slab shell ──────────────────────── */
.slab {
  width: 200px;
  border-radius: 12px;
  overflow: hidden;
  border: 1.5px solid #2a3f5f;
  background: #0d1e35;
  box-shadow:
    0 2px 0 #1a3a5e,
    inset 0 0 0 1px rgba(255, 255, 255, 0.04);
  cursor: pointer;
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;
  position: relative;
  user-select: none;
}
.slab:hover {
  transform: translateY(-5px);
  box-shadow:
    0 12px 32px rgba(0, 0, 0, 0.5),
    0 0 0 1px rgba(79, 158, 255, 0.25);
}
.slab--wishlist {
  opacity: 0.55;
}
.slab--wishlist:hover {
  opacity: 0.8;
}

/* ── Badges ──────────────────────────── */
.badge-owned {
  position: absolute;
  top: 8px;
  right: 8px;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #22c55e;
  box-shadow: 0 0 6px rgba(34, 197, 94, 0.5);
  z-index: 1;
}
.badge-fav {
  position: absolute;
  top: 6px;
  left: 8px;
  color: #f59e0b;
  font-size: 12px;
  line-height: 1;
  z-index: 1;
}

/* ── Header ──────────────────────────── */
.slab-header {
  background: #0a1628;
  border-bottom: 2px solid #1e3a6a;
  padding: 7px 10px 6px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.slab-brand {
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.15em;
  color: #4f9eff;
  text-transform: uppercase;
}
.slab-flag {
  font-size: 16px;
  line-height: 1;
}

/* ── Coin window ─────────────────────── */
.slab-window {
  background: #091528;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 18px 0;
  /* Required so the 3D flip is not clipped */
  perspective: 600px;
}

/* Flip container — this is what rotates */
.coin-flip-container {
  width: 110px;
  height: 110px;
  position: relative;
  transform-style: preserve-3d;
  transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Trigger the flip on slab hover */
.slab:hover .coin-flip-container {
  transform: rotateY(180deg);
}

/* Both faces share the same position and size */
.coin-face {
  position: absolute;
  inset: 0;
  border-radius: 50%;
  border-width: 3px;
  border-style: solid;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  /* This is the key — hides the face when it's pointing away */
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
}

/* Front is already facing us — no extra transform needed */
.coin-face--front {
}

/* Back starts pre-rotated 180° so it's hidden until the container flips */
.coin-face--back {
  transform: rotateY(180deg);
}

.coin-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
}

.coin-placeholder {
  font-size: 13px;
  font-weight: 700;
  color: var(--placeholder-color, #4a2800);
  text-align: center;
  line-height: 1.3;
  padding: 8px;
}

/* ── Divider ─────────────────────────── */
.slab-divider {
  height: 1px;
  background: linear-gradient(
    to right,
    transparent,
    #1e3a6a 20%,
    #2a5090 50%,
    #1e3a6a 80%,
    transparent
  );
}

/* ── Label ───────────────────────────── */
.slab-label {
  background: #08111f;
  padding: 10px 10px 8px;
}

.coin-name {
  font-size: 11px;
  font-weight: 700;
  color: #c8d8f0;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  line-height: 1.3;
  margin: 0 0 3px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.coin-country {
  font-size: 10px;
  color: #4f9eff;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  margin: 0 0 8px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.meta-row {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1rem;
}
.meta-col {
  display: flex;
  flex-direction: column;
  gap: 2px;
}
.meta-key {
  font-size: 9px;
  color: #4a6a8a;
  text-transform: uppercase;
  letter-spacing: 0.07em;
}
.meta-val {
  font-size: 11px;
  color: #8aafd4;
  font-weight: 600;
}

.grade-box {
  background: #0d1e35;
  border: 1.5px solid #1e3a6a;
  border-radius: 6px;
  padding: 4px 10px;
  text-align: center;
  min-width: 48px;
}
.grade-label {
  display: block;
  font-size: 8px;
  color: #2a5090;
  text-transform: uppercase;
  letter-spacing: 0.1em;
}
.grade-val {
  display: block;
  font-size: 20px;
  font-weight: 800;
  color: #4f9eff;
  line-height: 1.1;
}

/* ── Cert strip ──────────────────────── */
.slab-cert {
  border-top: 1px solid #0f2040;
  padding: 6px 10px 5px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #08111f;
}
.cert-num {
  font-size: 9px;
  color: #2a5090;
  font-family: monospace;
  letter-spacing: 0.04em;
}

:deep(.barcode) {
  display: flex;
  gap: 1.5px;
  align-items: flex-end;
  height: 16px;
}
</style>
