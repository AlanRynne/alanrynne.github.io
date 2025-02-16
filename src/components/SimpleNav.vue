<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <nav class="flex lg:flex-col gap-3 lg:gap-1 lg:pl-8">
    <RouterLink
      v-for="route in [
        { to: '/', label: 'Home' },
        { to: '/about', label: 'About' },
        { to: '/contact', label: 'Contact' },
      ]"
      :key="route.to"
      :to="route.to"
      class="transition-all hover:text-amber-600 pointer-events-auto [&.router-link-active]:pointer-events-none [&.router-link-active]:text-amber-600 [&.router-link-active]:italic [&.router-link-active]:underline [&.router-link-active]:hover:text-amber-600"
    >
      {{ route.label }}
    </RouterLink>
  </nav>
</template>
