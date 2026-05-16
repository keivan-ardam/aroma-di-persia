<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useI18n } from '../composables/useI18n'

gsap.registerPlugin(ScrollTrigger)

const { t } = useI18n()
const sectionRef = ref<HTMLElement | null>(null)
let ctx: gsap.Context | null = null

onMounted(() => {
  if (!sectionRef.value) return
  ctx = gsap.context(() => {
    gsap.from('.contact-content', {
      opacity: 0, y: 60, duration: 1, ease: 'power3.out',
      scrollTrigger: { trigger: sectionRef.value, start: 'top 70%' }
    })
  }, sectionRef.value)
})

onUnmounted(() => ctx?.revert())
</script>

<template>
  <section id="contact" ref="sectionRef" class="relative py-32 px-6">
    <div class="absolute inset-0 bg-gradient-to-b from-transparent via-saffron/3 to-transparent"></div>

    <div class="contact-content relative max-w-4xl mx-auto text-center">
      <p class="text-saffron text-xs tracking-[0.4em] uppercase mb-4">{{ t('contact.label') }}</p>
      <h2 class="font-heading text-4xl md:text-6xl font-light text-cream mb-6">
        {{ t('contact.title1') }}<br/>
        <span class="text-saffron">{{ t('contact.title2') }}</span>
      </h2>
      <p class="text-cream/60 max-w-xl mx-auto mb-12">{{ t('contact.desc') }}</p>

      <div class="grid md:grid-cols-3 gap-6 mb-12">
        <div class="menu-card rounded-lg p-6 text-center">
          <div class="text-3xl mb-3">📞</div>
          <p class="text-cream/50 text-xs uppercase tracking-wider mb-2">{{ t('contact.phone') }}</p>
          <p class="text-cream font-medium">+39 XXX XXX XXXX</p>
        </div>
        <div class="menu-card rounded-lg p-6 text-center">
          <div class="text-3xl mb-3">💬</div>
          <p class="text-cream/50 text-xs uppercase tracking-wider mb-2">{{ t('contact.whatsapp') }}</p>
          <p class="text-cream font-medium">+39 XXX XXX XXXX</p>
        </div>
        <div class="menu-card rounded-lg p-6 text-center">
          <div class="text-3xl mb-3">📍</div>
          <p class="text-cream/50 text-xs uppercase tracking-wider mb-2">{{ t('contact.location') }}</p>
          <p class="text-cream font-medium">Piacenza, Italia</p>
        </div>
      </div>

      <a
        href="https://wa.me/39XXXXXXXXXX"
        target="_blank"
        class="inline-flex items-center gap-3 px-10 py-4 bg-saffron text-navy font-semibold tracking-wider uppercase text-sm rounded-sm hover:bg-amber transition-all duration-300 hover:scale-105 saffron-glow"
      >
        <span>{{ t('contact.cta') }}</span>
        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
        </svg>
      </a>

      <div class="mt-12 text-cream/40 text-sm">
        <p>{{ t('contact.hours') }}</p>
      </div>
    </div>
  </section>
</template>
