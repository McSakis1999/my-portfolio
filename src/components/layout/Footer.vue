<template>
  <footer class="footer">
    <div class="footer-container">
      <div class="footer-left">
        <h3 class="brand">MitsikostasTech</h3>
        <p class="tagline">Building tools, projects and experiments.</p>
      </div>

      <div class="footer-center">
        <ul>
          <li><RouterLink to="/">Home</RouterLink></li>
          <li><RouterLink to="/projects">Projects</RouterLink></li>
          <li><RouterLink to="/hobbies">Hobbies</RouterLink></li>
        </ul>
      </div>

      <div class="footer-right">
        <p>© {{ year }} MitsikostasTech</p>
        <p>Built with Vue</p>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { RouterLink } from 'vue-router'

const year = new Date().getFullYear()
</script>

<style scoped>
.footer {
  background: #0b1e3a;
  color: #dfe7ff;
  margin-top: auto;
}

.footer-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;

  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 2rem;
}

.brand {
  color: #4da3ff;
  margin-bottom: 0.5rem;
}

.tagline {
  font-size: 0.9rem;
  opacity: 0.8;
}

ul {
  list-style: none;
  padding: 0;
}

li {
  margin-bottom: 0.5rem;
}

a {
  color: #dfe7ff;
  text-decoration: none;
}

a:hover {
  color: #4da3ff;
}

.footer-right {
  text-align: right;
  font-size: 0.85rem;
  opacity: 0.7;
}
</style>
