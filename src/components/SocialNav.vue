<template>
  <div class="group flex justify-start space-x-4 items-center align-middle text-xl lg:mt-auto">
    <a
      v-for="social in socials"
      :key="social.url"
      :href="social.url"
      target="_blank"
      rel="noopener"
    >
      <FontAwesomeIcon
        :icon="social.icon"
        class="hover:dark:text-amber-400 hover:text-amber-600 text-primary"
        :class="{ 'text-sm': layoutStore.isWide }"
      />
    </a>
    <span> | </span>
    <FontAwesomeIcon
      :class="{ 'text-sm': layoutStore.isWide }"
      :icon="isDark ? faMoon : faSun"
      @click="onLightModeToggleClick"
    />
  </div>
</template>

<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faGithub, faXTwitter, faLinkedinIn, faBluesky } from '@fortawesome/free-brands-svg-icons'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { useLayoutStore } from '@/stores/layout'
import { useThemeStore } from '@/stores/useThemeStore.ts'
import { computed } from 'vue'
import { faMoon, faSun } from '@fortawesome/free-regular-svg-icons'

const themeStore = useThemeStore()
const layoutStore = useLayoutStore()

themeStore.initTheme()

const isDark = computed(() => themeStore.isDark)

function onLightModeToggleClick() {
  themeStore.toggleTheme()
}

const socials = [
  {
    url: 'mailto:alan@rynne.dev',
    icon: faEnvelope,
    hoverColor: '',
  },
  {
    url: 'https://github.com/alanrynne',
    icon: faGithub,
    hoverColor: '',
  },
  {
    url: 'https://twitter.com/alanrynne',
    icon: faXTwitter,
    hoverColor: '',
  },
  {
    url: 'https://linkedin.com/in/alanrynnevidal',
    icon: faLinkedinIn,
    hoverColor: '',
  },
  {
    url: 'https://bsky.app/profile/alan.rynne.dev',
    icon: faBluesky,
    hoverColor: '',
  },
]
</script>
