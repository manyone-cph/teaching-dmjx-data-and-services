<template>
  <header>
    <div class="top-bar">
      <router-link to="/">
        <span class="logo">DMJX</span>
      </router-link>
      <nav>
        <a>Find medarbejder</a>
        <a>International</a>
      </nav>
    </div>
    <div class="nav-bar">
      <nav>
        <a>Uddannelser</a>
        <a>Kurser og videreuddannelser</a>
        <a>Forskning og udvikling</a>
      </nav>
      <nav>
        <router-link to="/">Home</router-link>
        <router-link to="/about">About</router-link>
        <a>Aktuelt</a>
        <a>Om DMJX</a>
      </nav>
    </div>
  </header>
</template>

<script setup></script>

<style scoped>
.top-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 4rem 1rem;
  border-bottom: 1px solid black;
  nav {
    font-size: 0.6rem;
    text-transform: uppercase;
  }
}

.logo {
  font-size: 2rem;
}

.nav-bar {
  display: flex;
  justify-content: space-between;
  padding: 1rem 4rem;

  nav {
    font-size: 1.2rem;
  }
}

nav {
  display: flex;
  gap: 1rem;
}
</style>
