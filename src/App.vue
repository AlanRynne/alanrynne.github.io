<script setup lang="ts">
import PersonalIntro from '@/components/PersonalIntro.vue'
import SocialNav from '@/components/SocialNav.vue'
import { computed, watch } from 'vue'
import { useThemeStore } from '@/stores/useThemeStore.ts'
import { useLayoutStore } from '@/stores/layout'
import { useRoute } from 'vue-router'

const themeStore = useThemeStore()
const layoutStore = useLayoutStore()
const route = useRoute()

themeStore.initTheme()

const isWideLayout = computed(() => layoutStore.isWide)

watch(
  () => route.meta.wideLayout,
  (wide) => layoutStore.setWideLayout(!!wide),
)
</script>

<template>
  <div id="root" :class="{ 'wide-layout': isWideLayout }">
    <header
      class="lg:sticky lg:top-0 flex flex-col gap-10 p-10 lg:px-10 lg:py-60 lg:max-h-screen shrink"
    >
      <PersonalIntro />
      <!-- <SimpleNav /> -->
      <social-nav />
    </header>
    <main class="lg:my-20">
      <RouterView />
    </main>
  </div>
</template>
