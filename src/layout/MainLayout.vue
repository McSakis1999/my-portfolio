<template>
  <div class="fix layout">
    <Header />
    <main class="main-container">
      <RouterView />
    </main>
    <Footer />
  </div>
</template>

<script>
import { RouterView } from 'vue-router'
import Footer from '@/components/layout/Footer.vue'
import Header from '@/components/layout/Header.vue'

export default {
  components: {
    RouterView,
    Footer,
    Header,
  },
}
</script>

<style scoped>
.layout {
  background: #070f1e; /* light gray like design */
  color: #c8d8f0;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.main-container {
  display: flex;
  flex-direction: column;
  flex: 1;
  max-width: 1300px;
  margin: 0 auto;
  width: 100%;
  padding: 2rem 1rem;
}
</style>
