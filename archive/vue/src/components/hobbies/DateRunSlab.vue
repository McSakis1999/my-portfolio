<template>
  <div class="run-slab" :class="{ 'run-slab--partial': !allOwned }">
    <!-- Favorite badge if any in run are favorited -->
    <span v-if="anyFavorite" class="badge-fav">★</span>

    <!-- Header -->
    <div class="slab-header">
      <span class="slab-brand">MCT Registry</span>
      <span class="slab-flag">{{ countryFlag }}</span>
    </div>

    <!-- Coin window with flip -->
    <div class="slab-window">
      <div class="coin-flip-container">
        <div class="coin-face coin-face--front" :style="coinStyle">
          <img
            v-if="representative.imageObverse"
            :src="representative.imageObverse"
            :alt="representative.name"
            class="coin-img"
          />
          <span v-else class="coin-placeholder"
            >{{ representative.denomination }}<br />{{ representative.countryCode }}</span
          >
        </div>
        <div class="coin-face coin-face--back" :style="coinStyle">
          <img
            v-if="representative.imageReverse"
            :src="representative.imageReverse"
            :alt="representative.name + ' reverse'"
            class="coin-img"
          />
          <span v-else class="coin-placeholder">{{ representative.denomination }}</span>
        </div>
      </div>
    </div>

    <div class="slab-divider"></div>

    <!-- Label -->
    <div class="slab-label">
      <p class="coin-name">{{ representative.name }}</p>
      <p class="coin-country">{{ representative.country }} · {{ representative.set }}</p>

      <div class="run-meta">
        <div class="meta-col">
          <span class="meta-key">Metal</span>
          <span class="meta-val">{{ representative.metal }}</span>
        </div>
        <div class="run-progress-box">
          <span class="run-progress-label">Run</span>
          <span class="run-progress-val"
            >{{ ownedCount }}<span class="run-progress-total">/{{ coins.length }}</span></span
          >
        </div>
      </div>
    </div>

    <!-- Year chips -->
    <div class="year-chips">
      <div
        v-for="coin in sortedCoins"
        :key="coin.id"
        class="year-chip"
        :class="{
          'year-chip--owned': coin.isOwned,
          'year-chip--wishlist': !coin.isOwned,
        }"
        :title="
          coin.isOwned ? `${coin.year} — ${coin.condition || 'owned'}` : `${coin.year} — wishlist`
        "
      >
        {{ coin.year }}
      </div>
    </div>

    <!-- Cert strip -->
    <div class="slab-cert">
      <span class="cert-num"> {{ coins.length }} κοπές · {{ representative.denomination }} </span>
      <CoinBarcode :seed="representative.id" />
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
  name: 'DateRunSlab',

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
    // All coins sharing the same designId
    coins: { type: Array, required: true },
  },

  computed: {
    sortedCoins() {
      return [...this.coins].sort((a, b) => a.year - b.year)
    },

    // Use the first owned coin as representative, fallback to first coin
    representative() {
      return this.coins.find((c) => c.isOwned) || this.coins[0]
    },

    countryFlag() {
      return FLAG_MAP[this.representative.countryCode] || '🌍'
    },

    coinStyle() {
      const c = METAL_COLORS[metalKey(this.representative.metal)]
      return {
        background: c.bg,
        borderColor: c.border,
        boxShadow: `0 0 0 2px ${c.inner}, 0 4px 16px rgba(0,0,0,0.6), inset 0 1px 3px rgba(255,255,255,0.15)`,
        '--placeholder-color': c.text,
      }
    },

    ownedCount() {
      return this.coins.filter((c) => c.isOwned).length
    },
    allOwned() {
      return this.ownedCount === this.coins.length
    },
    anyFavorite() {
      return this.coins.some((c) => c.isFavorite)
    },
  },
}
</script>

<style scoped>
/* ── Slab shell ──────────────────────── */
.run-slab {
  width: 200px;
  border-radius: 12px;
  overflow: hidden;
  border: 1.5px solid #2a3f5f;
  background: #0d1e35;
  box-shadow:
    0 2px 0 #1a3a5e,
    inset 0 0 0 1px rgba(255, 255, 255, 0.04);
  cursor: default;
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;
  position: relative;
  user-select: none;
}
.run-slab:hover {
  transform: translateY(-5px);
  box-shadow:
    0 12px 32px rgba(0, 0, 0, 0.5),
    0 0 0 1px rgba(79, 158, 255, 0.25);
}

/* Partially owned gets a subtle amber tint on the border */
.run-slab--partial {
  border-color: #3a3020;
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
  perspective: 600px;
}

.coin-flip-container {
  width: 110px;
  height: 110px;
  position: relative;
  transform-style: preserve-3d;
  transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}
.run-slab:hover .coin-flip-container {
  transform: rotateY(180deg);
}

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
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
}
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

.run-meta {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
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

/* Progress box replaces grade box */
.run-progress-box {
  background: #0d1e35;
  border: 1.5px solid #1e3a6a;
  border-radius: 6px;
  padding: 4px 10px;
  text-align: center;
  min-width: 48px;
}
.run-progress-label {
  display: block;
  font-size: 8px;
  color: #2a5090;
  text-transform: uppercase;
  letter-spacing: 0.1em;
}
.run-progress-val {
  display: block;
  font-size: 18px;
  font-weight: 800;
  color: #4f9eff;
  line-height: 1.1;
}
.run-progress-total {
  font-size: 11px;
  font-weight: 400;
  color: #2a5090;
}

/* ── Year chips ──────────────────────── */
.year-chips {
  background: #08111f;
  padding: 0 10px 10px;
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
}

.year-chip {
  font-size: 9.5px;
  font-weight: 600;
  font-family: monospace;
  padding: 2px 5px;
  border-radius: 4px;
  letter-spacing: 0.02em;
  cursor: default;
  transition: transform 0.1s;
}
.year-chip:hover {
  transform: scale(1.1);
}

.year-chip--owned {
  background: rgba(34, 197, 94, 0.15);
  border: 1px solid rgba(34, 197, 94, 0.35);
  color: #22c55e;
}
.year-chip--wishlist {
  background: rgba(42, 80, 144, 0.2);
  border: 1px solid #1e3a6a;
  color: #2a5090;
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
