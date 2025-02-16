<template>
  <div
    class="group transition-all flex justify-start space-x-4 items-center align-middle text-xl lg:mt-auto"
  >
    <a
      v-for="social in socials"
      :key="social.url"
      :href="social.url"
      target="_blank"
      rel="noopener"
    >
      <FontAwesomeIcon
        :icon="social.icon"
        :class="{ 'text-sm': layoutStore.isWide, [`${social.hoverColor}`]: true }"
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
    url: 'https://github.com/alanrynne',
    icon: faGithub,
    hoverColor: 'group-hover:text-gray-400',
  },
  {
    url: 'https://github.com/alanrynne',
    icon: faEnvelope,
    hoverColor: 'group-hover:text-amber-700',
  },
  {
    url: 'https://twitter.com/alanrynne',
    icon: faXTwitter,
    hoverColor: 'group-hover:text-blue-500',
  },
  {
    url: 'https://linkedin.com/in/alanrynne',
    icon: faLinkedinIn,
    hoverColor: '',
  },
  {
    url: 'https://twitter.com/alanrynne',
    icon: faBluesky,
    hoverColor: '',
  },
]
</script>
