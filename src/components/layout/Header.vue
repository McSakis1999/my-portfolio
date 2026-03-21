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
                <Button label="Επικοινώνησε" icon="pi pi-arrow-right" iconPos="right" />
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
          label: 'Category',
          items: [
            {
              label: 'subcategory',
              command: () => {
                this.$router.push('/')
              },
            },
          ],
        },
        {
          label: 'link',
          command: () => {
            this.$router.push('/')
          },
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
.mega {
  width: 100%;
  background-color: transparent;
  border: none;
}

/* Header */
.header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 50;

  background: white;
  border-bottom: 1px solid #eee;

  transition: all 0.3s ease;
}

.header-scrolled {
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
}

/* Container */

.header-container {
  max-width: 1200px;
  margin: auto;

  display: flex;
  align-items: center;

  padding: 10px 16px;
}

/* Logo */

.logo img {
  height: 60px;
  margin-right: 1rem;
}

/* =========================
   Mobile tweaks
========================= */
@media (max-width: 1150px) {
  /* Reduce header padding */
  .header-container {
    padding: 0;
  }

  /* Make logo smaller */
  .logo img {
    height: 28px;
    margin-right: 0.5rem;
  }

  /* Make CTA button smaller */
  .cta :deep(.p-button) {
    font-size: 12px;
    padding: 0.35rem 0.75rem;
  }
  .cta :deep(.p-button-icon) {
    font-size: 12px;
  }
}
</style>
