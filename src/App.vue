<script setup>
import TheHeader from './components/layout/TheHeader.vue'
import TheFooter from './components/layout/TheFooter.vue'
</script>

<template>
  <TheHeader />
  <router-view />
  <TheFooter />
</template>
