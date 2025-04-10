<template>
  <Navbar v-if="!shouldHideNavbar" />
  <router-view />
</template>

<script setup>
import { useRoute } from 'vue-router'
import { computed } from 'vue'
import Navbar from './components/Navbar.vue'

const route = useRoute()

const shouldHideNavbar = computed(() => {
  const path = route.path
  return path === '/login' || path === '/register' || path.startsWith('/dashboard')
})
</script>
