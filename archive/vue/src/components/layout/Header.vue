<template>
  <div>
    <!-- Header -->
    <header ref="headerRef" :class="['header', isScrolled ? 'header-scrolled' : '']">
      <div class="header-container">
        <Menubar id="menu-bar" :model="items" class="mega">
          <!-- Logo -->
          <template #start>
            <router-link to="/" class="logo">
              <img src="@/assets/images/logo.png" alt="logo" />
            </router-link>
          </template>

          <!-- Logout -->
          <template #end>
            <!-- CTA -->
            <div>
              <router-link to="/login">
                <Button severity="info" label="Επικοινώνησε" icon="pi pi-send" iconPos="right" />
              </router-link>
            </div>
          </template>
        </Menubar>
      </div>
    </header>

    <!-- Prevent page jump -->
    <main :style="{ paddingTop: headerHeight + 'px' }">
      <slot />
    </main>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isScrolled: false,
      headerHeight: 0,
      items: [
        {
          label: 'Αρχική',
          command: () => this.$router.push({ name: 'home' }),
        },
        {
          label: 'Εργασία',
          items: [
            { label: 'Εκπαίδευση', command: () => this.$router.push({ name: 'work-education' }) },
            { label: 'Προυπηρεσία', command: () => this.$router.push({ name: 'work-experience' }) },
            { label: 'Έργα', command: () => this.$router.push({ name: 'work-projects' }) },
            { label: 'Εργαλεία', command: () => this.$router.push({ name: 'work-tools' }) },
            { label: 'Βιογραφικό', command: () => this.$router.push({ name: 'work-cv' }) },
          ],
        },
        {
          label: 'Hobbies',
          items: [
            {
              label: 'Coin Collecting',
              command: () => this.$router.push({ name: 'hobbies-coins' }),
            },
          ],
        },
        {
          label: 'About',
          command: () => this.$router.push({ name: 'about' }),
        },
      ],
    }
  },

  mounted() {
    this.updateHeight()
    window.addEventListener('scroll', this.handleScroll)
    window.addEventListener('resize', this.updateHeight)
  },

  beforeUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
    window.removeEventListener('resize', this.updateHeight)
  },

  methods: {
    handleScroll() {
      this.isScrolled = window.scrollY > 10
    },
    updateHeight() {
      this.$nextTick(() => {
        this.headerHeight = this.$refs.headerRef?.offsetHeight || 0
      })
    },
  },
}
</script>

<style scoped>
/* ── Override PrimeVue Menubar text colors #menu-bar  ── */
:deep(.p-menubar-item-label) {
  color: #7a99c2;
}
#menu-bar :deep(.p-menubar-item:hover > .p-menubar-item-content) {
  background: rgba(255, 255, 255, 0.05);
}
#menu-bar :deep(.p-menubar-item:hover .p-menubar-item-label) {
  color: #e8eef8;
}
#menu-bar :deep(.p-menubar-item-icon) {
  color: #7a99c2;
}

/* ── Dropdown panel ── */
#menu-bar :deep(.p-menubar-submenu) {
  background: #0d1e35;
  border: 1px solid rgba(255, 255, 255, 0.07);
  border-radius: 10px;
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.5);
  padding: 0.4rem;
}
#menu-bar :deep(.p-menubar-submenu .p-menubar-item-content) {
  border-radius: 7px;
}
#menu-bar :deep(.p-menubar-submenu .p-menubar-item-label) {
  color: #7a99c2;
}
#menu-bar :deep(.p-menubar-submenu .p-menubar-item:hover .p-menubar-item-label) {
  color: #e8eef8;
}
#menu-bar :deep(.p-menubar-submenu .p-menubar-item:hover > .p-menubar-item-content) {
  background: rgba(79, 158, 255, 0.08);
}

/* ── Mobile hamburger button ── */
#menu-bar :deep(.p-menubar-button) {
  color: #7a99c2;
  background: transparent;
}
#menu-bar :deep(.p-menubar-button:hover) {
  background: rgba(255, 255, 255, 0.05);
  color: #e8eef8;
}

/* ── Mobile panel ── */
#menu-bar :deep(.p-menubar-mobile-active .p-menubar-root-list) {
  background: #0d1e35;
  border: 1px solid rgba(255, 255, 255, 0.07);
  border-radius: 10px;
}

.mega {
  width: 100%;
  background-color: transparent;
  border: none;
}

/* ── Header shell ── */
.header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 50;
  background: #070f1e;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
  transition: all 0.3s ease;
}

.header-scrolled {
  background: rgba(255, 255, 255, 0.06);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  box-shadow: 0 4px 32px rgba(0, 0, 0, 0.4);
}

/* ── Container ── */
.header-container {
  max-width: 1200px;
  margin: auto;
  display: flex;
  align-items: center;
  padding: 10px 16px;
}

/* ── Logo ── */
.logo img {
  height: 50px;
  margin-right: 1rem;
}

/* ── Mobile tweaks ── */
@media (max-width: 1150px) {
  .header-container {
    padding: 0 8px;
  }
  .logo img {
    height: 32px;
    margin-right: 0.5rem;
  }
}
</style>
