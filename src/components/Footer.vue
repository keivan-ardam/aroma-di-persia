<script setup lang="ts">
import { useI18n } from '../composables/useI18n'
const { t } = useI18n()
</script>

<template>
  <footer class="relative py-16 px-6 border-t border-saffron/10">
    <div class="max-w-6xl mx-auto text-center">
      <h3 class="font-heading text-3xl font-light text-cream tracking-wider mb-2">
        AROMA <span class="text-saffron">DI PERSIA</span>
      </h3>
      <p class="text-cream/40 text-sm italic mb-8">{{ t('footer.tagline') }}</p>
      <div class="w-16 h-px bg-saffron/30 mx-auto mb-8"></div>
      <p class="text-cream/30 text-xs tracking-wider">{{ t('footer.copy') }}</p>
      <p class="text-cream/20 text-xs mt-2">{{ t('footer.sub') }}</p>
    </div>
  </footer>
</template>
