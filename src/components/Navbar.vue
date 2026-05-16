<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useI18n } from '../composables/useI18n'
import type { Lang } from '../composables/useI18n'

const { t, setLang, lang } = useI18n()

const scrolled = ref(false)
const mobileOpen = ref(false)

const langs: { code: Lang; label: string }[] = [
  { code: 'it', label: 'IT' },
  { code: 'en', label: 'EN' },
  { code: 'fa', label: 'فا' },
]

const handleScroll = () => { scrolled.value = window.scrollY > 50 }
onMounted(() => window.addEventListener('scroll', handleScroll))
onUnmounted(() => window.removeEventListener('scroll', handleScroll))
</script>

<template>
  <nav
    class="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
    :class="scrolled ? 'bg-navy/90 backdrop-blur-md border-b border-saffron/10' : 'bg-transparent'"
  >
    <div class="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
      <a href="#" class="font-heading text-2xl md:text-3xl font-light tracking-wider text-cream">
        AROMA <span class="text-saffron">DI PERSIA</span>
      </a>

      <div class="hidden md:flex items-center gap-8 text-sm tracking-widest uppercase">
        <a href="#about" class="text-cream/70 hover:text-saffron transition-colors duration-300">{{ t('nav.about') }}</a>
        <a href="#menu" class="text-cream/70 hover:text-saffron transition-colors duration-300">{{ t('nav.menu') }}</a>
        <a href="#gallery" class="text-cream/70 hover:text-saffron transition-colors duration-300">{{ t('nav.gallery') }}</a>
        <a href="#contact" class="text-cream/70 hover:text-saffron transition-colors duration-300">{{ t('nav.contact') }}</a>

        <!-- Language switcher -->
        <div class="flex items-center gap-1 text-xs tracking-normal normal-case">
          <button
            v-for="l in langs"
            :key="l.code"
            class="px-2 py-1 rounded transition-colors duration-200"
            :class="lang === l.code ? 'text-saffron bg-saffron/10' : 'text-cream/50 hover:text-cream'"
            @click="setLang(l.code)"
          >{{ l.label }}</button>
        </div>

        <a
          href="#contact"
          class="px-5 py-2 border border-saffron/50 text-saffron hover:bg-saffron hover:text-navy transition-all duration-300 rounded-sm"
        >{{ t('nav.order') }}</a>
      </div>

      <button class="md:hidden text-cream" @click="mobileOpen = !mobileOpen">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path v-if="!mobileOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 6h16M4 12h16M4 18h16"/>
          <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M6 18L18 6M6 6l12 12"/>
        </svg>
      </button>
    </div>

    <div
      v-if="mobileOpen"
      class="md:hidden bg-navy/95 backdrop-blur-md border-t border-saffron/10 px-6 py-6 flex flex-col gap-4 text-sm tracking-widest uppercase"
    >
      <a href="#about" class="text-cream/70 hover:text-saffron" @click="mobileOpen = false">{{ t('nav.about') }}</a>
      <a href="#menu" class="text-cream/70 hover:text-saffron" @click="mobileOpen = false">{{ t('nav.menu') }}</a>
      <a href="#gallery" class="text-cream/70 hover:text-saffron" @click="mobileOpen = false">{{ t('nav.gallery') }}</a>
      <a href="#contact" class="text-cream/70 hover:text-saffron" @click="mobileOpen = false">{{ t('nav.contact') }}</a>

      <!-- Mobile language switcher -->
      <div class="flex items-center gap-2 pt-2 border-t border-saffron/10">
        <button
          v-for="l in langs"
          :key="l.code"
          class="px-3 py-1.5 rounded text-xs normal-case tracking-normal"
          :class="lang === l.code ? 'text-saffron bg-saffron/10' : 'text-cream/50'"
          @click="setLang(l.code)"
        >{{ l.label }}</button>
      </div>

      <a href="#contact" class="px-5 py-2 border border-saffron/50 text-saffron text-center" @click="mobileOpen = false">{{ t('nav.order') }}</a>
    </div>
  </nav>
</template>
