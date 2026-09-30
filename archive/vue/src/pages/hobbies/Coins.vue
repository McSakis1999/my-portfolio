<template>
  <div class="coins-page">
    <!-- Hero -->
    <div class="hero">
      <div class="hero-text">
        <h1 class="hero-title">Coin Collection</h1>
        <p class="hero-sub">A personal registry of world coins, commemoratives &amp; ancients</p>
      </div>
      <div class="stats-row">
        <div class="stat">
          <span class="stat-val">{{ stats.owned }}</span>
          <span class="stat-key">Owned</span>
        </div>
        <div class="stat">
          <span class="stat-val">{{ stats.wishlist }}</span>
          <span class="stat-key">Wishlist</span>
        </div>
        <div class="stat">
          <span class="stat-val">{{ stats.countries }}</span>
          <span class="stat-key">Countries</span>
        </div>
        <div class="stat">
          <span class="stat-val">{{ stats.sets }}</span>
          <span class="stat-key">Sets</span>
        </div>
      </div>
    </div>

    <div class="layout">
      <!-- Sidebar -->
      <aside class="sidebar">
        <div class="search-wrap">
          <i class="pi pi-search search-icon"></i>
          <input v-model="search" type="text" placeholder="Search coins..." class="search-input" />
          <button v-if="search" class="search-clear" @click="search = ''">
            <i class="pi pi-times"></i>
          </button>
        </div>

        <div class="filter-card">
          <span class="filter-title">Country</span>
          <ul class="filter-list">
            <li
              class="filter-item"
              :class="{ active: activeCountry === null }"
              @click="activeCountry = null"
            >
              <span class="filter-label">🌍 All</span>
              <span class="filter-badge">{{ stats.total }}</span>
            </li>
            <li
              v-for="c in countryOptions"
              :key="c.code"
              class="filter-item"
              :class="{ active: activeCountry === c.code }"
              @click="activeCountry = c.code"
            >
              <span class="filter-label">{{ c.flag }} {{ c.name }}</span>
              <span class="filter-badge">{{ c.count }}</span>
            </li>
          </ul>
        </div>

        <div class="filter-card">
          <span class="filter-title">Metal</span>
          <ul class="filter-list">
            <li
              class="filter-item"
              :class="{ active: activeMetal === null }"
              @click="activeMetal = null"
            >
              <span class="filter-label">All</span>
              <span class="filter-badge">{{ stats.total }}</span>
            </li>
            <li
              v-for="m in metalOptions"
              :key="m.value"
              class="filter-item"
              :class="{ active: activeMetal === m.value }"
              @click="activeMetal = m.value"
            >
              <span class="filter-label">
                <span class="metal-dot" :style="{ background: m.color }"></span>
                {{ m.label }}
              </span>
              <span class="filter-badge">{{ m.count }}</span>
            </li>
          </ul>
        </div>

        <div class="filter-card">
          <span class="filter-title">Show</span>
          <ul class="filter-list">
            <li class="filter-item" :class="{ active: !favOnly }" @click="favOnly = false">
              <span class="filter-label">All coins</span>
              <span class="filter-badge">{{ stats.total }}</span>
            </li>
            <li class="filter-item" :class="{ active: favOnly }" @click="favOnly = true">
              <span class="filter-label"><span class="fav-star">★</span> Favorites</span>
              <span class="filter-badge">{{ stats.favorites }}</span>
            </li>
          </ul>
        </div>

        <div class="filter-card">
          <span class="filter-title">Year range</span>
          <div class="year-range">
            <div class="year-inputs">
              <input
                v-model.number="yearFrom"
                type="number"
                class="year-input"
                :min="yearMin"
                :max="yearTo"
                placeholder="From"
              />
              <span class="year-sep">–</span>
              <input
                v-model.number="yearTo"
                type="number"
                class="year-input"
                :min="yearFrom"
                :max="yearMax"
                placeholder="To"
              />
            </div>
            <button
              v-if="yearFrom !== yearMin || yearTo !== yearMax"
              class="year-reset"
              @click="
                () => {
                  yearFrom = yearMin
                  yearTo = yearMax
                }
              "
            >
              Reset
            </button>
          </div>
        </div>

        <div class="legend">
          <div class="legend-item">
            <span class="legend-dot legend-dot--owned"></span><span>Owned</span>
          </div>
          <div class="legend-item">
            <span class="legend-dot legend-dot--wishlist"></span><span>Wishlist</span>
          </div>
        </div>

        <button v-if="hasActiveFilters" class="clear-btn" @click="clearFilters">
          <i class="pi pi-filter-slash"></i>
          Clear all filters
        </button>
      </aside>

      <!-- Main content -->
      <main class="main">
        <div class="toolbar">
          <span class="result-count">
            {{ totalFiltered }} coin{{ totalFiltered !== 1 ? 's' : '' }}
            <template v-if="activeCountry"> · {{ activeCountryName }}</template>
            <span class="result-breakdown"
              >— {{ ownedInFiltered }} owned, {{ wishlistInFiltered }} wishlist</span
            >
          </span>
          <div class="sort-tabs">
            <button
              v-for="s in sortOptions"
              :key="s.value"
              class="sort-tab"
              :class="{ active: sortBy === s.value }"
              @click="sortBy = s.value"
            >
              {{ s.label }}
            </button>
          </div>
        </div>

        <div v-if="totalFiltered === 0" class="empty-state">
          <i class="pi pi-search" style="font-size: 2rem; color: #2a5090; margin-bottom: 1rem"></i>
          <p>No coins match your filters.</p>
          <button class="clear-btn" @click="clearFilters">Clear filters</button>
        </div>

        <template v-else>
          <div v-for="country in groupedCoins" :key="country.code" class="country-section">
            <div class="country-heading">
              <span class="country-flag">{{ country.flag }}</span>
              <span class="country-name">{{ country.name }}</span>
              <span class="country-count">{{ country.totalCount }} coins</span>
              <div class="heading-line"></div>
            </div>

            <div v-for="set in country.sets" :key="set.name" class="set-section">
              <div class="set-label">
                {{ set.name }}
                <span class="set-count">· {{ set.coins.length + set.runs.length }} entries</span>
              </div>
              <div class="slab-grid">
                <!-- Date runs (grouped by designId) -->
                <DateRunSlab v-for="run in set.runs" :key="run.designId" :coins="run.coins" />
                <!-- Individual coins (no designId) -->
                <CoinSlab v-for="coin in set.coins" :key="coin.id" :coin="coin" />
              </div>
            </div>
          </div>
        </template>
      </main>
    </div>
  </div>
</template>

<script>
import CoinSlab from '@/components/hobbies/CoinSlab.vue'
import DateRunSlab from '@/components/hobbies/DateRunSlab.vue'
import coinsData from '@/assets/data/collection/coins.json'

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
  gold: '#c8a84b',
  silver: '#a8a8a8',
  copper: '#b87333',
  bronze: '#cd7f32',
  bimetallic: '#c8a84b',
  nickel: '#9aadbd',
  zinc: '#8f9fa8',
}

function metalKey(metal = '') {
  const m = metal.toLowerCase()
  for (const key of Object.keys(METAL_COLORS)) {
    if (m.includes(key)) return key
  }
  return 'silver'
}

export default {
  name: 'CoinsPage',
  components: { CoinSlab, DateRunSlab },

  data() {
    const coins = coinsData.coins
    const years = coins.map((c) => c.year).filter(Boolean)
    const yMin = Math.min(...years)
    const yMax = Math.max(...years)

    return {
      coins,
      search: '',
      activeCountry: null,
      activeMetal: null,
      favOnly: false,
      sortBy: 'year',
      yearMin: yMin,
      yearMax: yMax,
      yearFrom: yMin,
      yearTo: yMax,
      sortOptions: [
        { label: 'Year', value: 'year' },
        { label: 'Grade', value: 'condition' },
        { label: 'Name', value: 'name' },
      ],
    }
  },

  computed: {
    stats() {
      return {
        total: this.coins.length,
        owned: this.coins.filter((c) => c.isOwned).length,
        wishlist: this.coins.filter((c) => !c.isOwned).length,
        favorites: this.coins.filter((c) => c.isFavorite).length,
        countries: new Set(this.coins.map((c) => c.countryCode)).size,
        sets: new Set(this.coins.map((c) => c.set)).size,
      }
    },

    countryOptions() {
      const map = {}
      this.coins.forEach((c) => {
        if (!map[c.countryCode]) {
          map[c.countryCode] = {
            code: c.countryCode,
            name: c.country,
            flag: FLAG_MAP[c.countryCode] || '🌍',
            count: 0,
          }
        }
        map[c.countryCode].count++
      })
      return Object.values(map).sort((a, b) => b.count - a.count)
    },

    metalOptions() {
      const map = {}
      this.coins.forEach((c) => {
        const key = metalKey(c.metal)
        if (!map[key]) map[key] = { value: key, label: c.metal, color: METAL_COLORS[key], count: 0 }
        map[key].count++
      })
      return Object.values(map).sort((a, b) => b.count - a.count)
    },

    activeCountryName() {
      return this.countryOptions.find((c) => c.code === this.activeCountry)?.name || ''
    },

    hasActiveFilters() {
      return (
        this.activeCountry !== null ||
        this.activeMetal !== null ||
        this.favOnly ||
        this.search !== '' ||
        this.yearFrom !== this.yearMin ||
        this.yearTo !== this.yearMax
      )
    },

    filteredCoins() {
      const q = this.search.toLowerCase().trim()
      const gradeOrder = { PROOF: 7, UNC: 6, 'MS-65': 6, 'MS-63': 5, EF: 4, VF: 3, F: 2, P: 1 }

      return this.coins
        .filter((c) => {
          if (this.favOnly && !c.isFavorite) return false
          if (this.activeCountry && c.countryCode !== this.activeCountry) return false
          if (this.activeMetal && metalKey(c.metal) !== this.activeMetal) return false
          if (c.year < this.yearFrom || c.year > this.yearTo) return false
          if (
            q &&
            !c.name.toLowerCase().includes(q) &&
            !c.country.toLowerCase().includes(q) &&
            !c.set.toLowerCase().includes(q)
          )
            return false
          return true
        })
        .sort((a, b) => {
          if (a.isOwned !== b.isOwned) return a.isOwned ? -1 : 1
          if (this.sortBy === 'year') return a.year - b.year
          if (this.sortBy === 'condition')
            return (gradeOrder[b.condition] || 0) - (gradeOrder[a.condition] || 0)
          if (this.sortBy === 'name') return a.name.localeCompare(b.name)
          return 0
        })
    },

    totalFiltered() {
      return this.filteredCoins.length
    },
    ownedInFiltered() {
      return this.filteredCoins.filter((c) => c.isOwned).length
    },
    wishlistInFiltered() {
      return this.filteredCoins.filter((c) => !c.isOwned).length
    },

    groupedCoins() {
      const countryMap = {}

      this.filteredCoins.forEach((coin) => {
        const cc = coin.countryCode

        // Ensure country entry
        if (!countryMap[cc]) {
          countryMap[cc] = {
            code: cc,
            name: coin.country,
            flag: FLAG_MAP[cc] || '🌍',
            sets: {},
            totalCount: 0,
          }
        }

        // Ensure set entry
        if (!countryMap[cc].sets[coin.set]) {
          countryMap[cc].sets[coin.set] = {
            name: coin.set,
            coins: [], // individual coins (no designId)
            runMap: {}, // designId → [coins]
          }
        }

        const setEntry = countryMap[cc].sets[coin.set]

        if (coin.designId) {
          // Group into date run
          if (!setEntry.runMap[coin.designId]) {
            setEntry.runMap[coin.designId] = []
          }
          setEntry.runMap[coin.designId].push(coin)
        } else {
          setEntry.coins.push(coin)
        }

        countryMap[cc].totalCount++
      })

      // Flatten runMap into runs array
      return Object.values(countryMap).map((country) => ({
        ...country,
        sets: Object.values(country.sets).map((set) => ({
          name: set.name,
          coins: set.coins,
          runs: Object.entries(set.runMap).map(([designId, coins]) => ({ designId, coins })),
        })),
      }))
    },
  },

  methods: {
    clearFilters() {
      this.search = ''
      this.activeCountry = null
      this.activeMetal = null
      this.favOnly = false
      this.yearFrom = this.yearMin
      this.yearTo = this.yearMax
    },
  },
}
</script>

<style scoped>
.hero {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 1.5rem;
  margin-bottom: 2.5rem;
}
.hero-title {
  font-size: clamp(1.6rem, 4vw, 2.2rem);
  font-weight: 800;
  color: #e8f0ff;
  letter-spacing: -0.02em;
  margin: 0 0 0.3rem;
}
.hero-sub {
  font-size: 0.9rem;
  color: #4a6a8a;
  margin: 0;
}
.stats-row {
  display: flex;
  gap: 10px;
}
.stat {
  background: #0d1e35;
  border: 1px solid #1a3050;
  border-radius: 10px;
  padding: 12px 18px;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 70px;
}
.stat-val {
  font-size: 1.5rem;
  font-weight: 800;
  color: #4f9eff;
  line-height: 1;
}
.stat-key {
  font-size: 0.65rem;
  color: #4a6a8a;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-top: 4px;
}

.layout {
  display: flex;
  gap: 1.5rem;
  align-items: flex-start;
}

.sidebar {
  width: 200px;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
  position: sticky;
  top: 90px;
}

.search-wrap {
  display: flex;
  align-items: center;
  gap: 8px;
  background: #0d1e35;
  border: 1px solid #1a3050;
  border-radius: 8px;
  padding: 8px 10px;
  transition: border-color 0.2s;
}
.search-wrap:focus-within {
  border-color: rgba(79, 158, 255, 0.5);
}
.search-icon {
  font-size: 12px;
  color: #2a5090;
  flex-shrink: 0;
}
.search-input {
  background: none;
  border: none;
  outline: none;
  color: #c8d8f0;
  font-size: 12px;
  width: 100%;
}
.search-input::placeholder {
  color: #2a5090;
}
.search-clear {
  background: none;
  border: none;
  color: #2a5090;
  cursor: pointer;
  padding: 0;
  font-size: 10px;
  flex-shrink: 0;
  transition: color 0.2s;
}
.search-clear:hover {
  color: #4f9eff;
}

.filter-card {
  background: #0d1e35;
  border: 1px solid #1a3050;
  border-radius: 8px;
  padding: 12px;
}
.filter-title {
  display: block;
  font-size: 9.5px;
  font-weight: 700;
  color: #4f9eff;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  margin-bottom: 8px;
}
.filter-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 1px;
}
.filter-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px 4px;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.15s;
}
.filter-item:hover {
  background: rgba(255, 255, 255, 0.03);
}
.filter-item.active {
  background: rgba(79, 158, 255, 0.08);
}
.filter-label {
  font-size: 11.5px;
  color: #4a6a8a;
  display: flex;
  align-items: center;
  gap: 5px;
  transition: color 0.15s;
}
.filter-item.active .filter-label {
  color: #c8d8f0;
}
.filter-item:hover .filter-label {
  color: #8aafd4;
}
.filter-badge {
  font-size: 10px;
  color: #2a5090;
  background: #0a1628;
  border-radius: 10px;
  padding: 1px 6px;
  min-width: 20px;
  text-align: center;
  transition:
    color 0.15s,
    background 0.15s;
}
.filter-item.active .filter-badge {
  color: #4f9eff;
  background: #0d2040;
}
.fav-star {
  color: #f59e0b;
  font-size: 12px;
  line-height: 1;
}
.metal-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  flex-shrink: 0;
}

.year-range {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.year-inputs {
  display: flex;
  align-items: center;
  gap: 6px;
}
.year-input {
  background: #08111f;
  border: 1px solid #1a3050;
  border-radius: 5px;
  color: #8aafd4;
  font-size: 11px;
  padding: 4px 6px;
  width: 0;
  flex: 1;
  outline: none;
  transition: border-color 0.2s;
  -moz-appearance: textfield;
}
.year-input::-webkit-inner-spin-button,
.year-input::-webkit-outer-spin-button {
  -webkit-appearance: none;
}
.year-input:focus {
  border-color: rgba(79, 158, 255, 0.5);
}
.year-sep {
  font-size: 11px;
  color: #2a5090;
}
.year-reset {
  background: none;
  border: none;
  color: #2a5090;
  font-size: 10px;
  cursor: pointer;
  padding: 0;
  text-align: left;
  transition: color 0.2s;
}
.year-reset:hover {
  color: #4f9eff;
}

.legend {
  display: flex;
  gap: 12px;
  padding: 8px 10px;
  background: #0d1e35;
  border: 1px solid #1a3050;
  border-radius: 8px;
}
.legend-item {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 10px;
  color: #4a6a8a;
}
.legend-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  flex-shrink: 0;
}
.legend-dot--owned {
  background: #22c55e;
  box-shadow: 0 0 4px rgba(34, 197, 94, 0.4);
}
.legend-dot--wishlist {
  background: #4a6a8a;
}

.clear-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  background: none;
  border: 1px solid #1a3050;
  border-radius: 7px;
  color: #4a6a8a;
  font-size: 11px;
  padding: 7px 10px;
  cursor: pointer;
  width: 100%;
  justify-content: center;
  transition:
    color 0.2s,
    border-color 0.2s;
}
.clear-btn:hover {
  color: #4f9eff;
  border-color: rgba(79, 158, 255, 0.3);
}

.main {
  flex: 1;
  min-width: 0;
}
.toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
  gap: 8px;
}
.result-count {
  font-size: 12px;
  color: #4a6a8a;
}
.result-breakdown {
  color: #2a5090;
  font-size: 11px;
}
.sort-tabs {
  display: flex;
  gap: 4px;
  background: #0d1e35;
  border: 1px solid #1a3050;
  border-radius: 7px;
  padding: 3px;
}
.sort-tab {
  font-size: 11px;
  color: #4a6a8a;
  padding: 4px 10px;
  border-radius: 5px;
  border: none;
  background: none;
  cursor: pointer;
  transition:
    color 0.15s,
    background 0.15s;
}
.sort-tab.active {
  color: #c8d8f0;
  background: #1a3050;
}
.sort-tab:hover:not(.active) {
  color: #8aafd4;
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem 2rem;
  color: #4a6a8a;
  font-size: 14px;
  text-align: center;
  gap: 0.5rem;
}

.country-section {
  margin-bottom: 2.5rem;
}
.country-heading {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 1.25rem;
}
.country-flag {
  font-size: 1.4rem;
  line-height: 1;
}
.country-name {
  font-size: 1rem;
  font-weight: 700;
  color: #c8d8f0;
  letter-spacing: -0.01em;
}
.country-count {
  font-size: 11px;
  color: #2a5090;
  background: #0a1628;
  border: 1px solid #1a3050;
  border-radius: 10px;
  padding: 2px 8px;
}
.heading-line {
  flex: 1;
  height: 1px;
  background: linear-gradient(to right, #1a3050, transparent);
}

.set-section {
  margin-bottom: 1.5rem;
}
.set-label {
  font-size: 10px;
  font-weight: 600;
  color: #2a5090;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  margin-bottom: 12px;
  padding-left: 2px;
}
.set-count {
  color: #1a3050;
  font-weight: 400;
}
.slab-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
}

@media (max-width: 860px) {
  .layout {
    flex-direction: column;
  }
  .sidebar {
    width: 100%;
    position: static;
    flex-direction: row;
    flex-wrap: wrap;
  }
  .filter-card {
    flex: 1;
    min-width: 140px;
  }
  .search-wrap,
  .legend {
    width: 100%;
  }
}
@media (max-width: 560px) {
  .coins-page {
    padding: 1.5rem 1rem 3rem;
  }
  .hero {
    flex-direction: column;
  }
  .stats-row {
    width: 100%;
    justify-content: space-between;
  }
  .stat {
    flex: 1;
  }
}
</style>
