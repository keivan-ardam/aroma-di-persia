<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useI18n } from '../composables/useI18n'

gsap.registerPlugin(ScrollTrigger)

const { t } = useI18n()
const sectionRef = ref<HTMLElement | null>(null)
let ctx: gsap.Context | null = null

const base = import.meta.env.BASE_URL
const images = [
  `${base}5766966104784834313.jpg`,
  `${base}5766966104784834365.jpg`,
  `${base}5771616343185624501.jpg`,
  `${base}5774136294987468161.jpg`,
  `${base}6001075993176640699.jpg`,
  `${base}6012339553500335264.jpg`,
  `${base}6012339553500335265.jpg`,
  `${base}6030401046326217810.jpg`,
  `${base}6037119938545258429.jpg`,
  `${base}6039371738358943351.jpg`,
  `${base}6044085018289704431.jpg`,
  `${base}6048557002662809244.jpg`,
  `${base}6048557002662809464.jpg`,
]

onMounted(() => {
  if (!sectionRef.value) return
  ctx = gsap.context(() => {
    gsap.from('.gallery-header', {
      opacity: 0, y: 50, duration: 1, ease: 'power3.out',
      scrollTrigger: { trigger: sectionRef.value, start: 'top 75%' }
    })
    gsap.utils.toArray<HTMLElement>('.gallery-item').forEach((el, i) => {
      gsap.from(el, {
        opacity: 0, y: 30, scale: 0.96,
        duration: 0.6, delay: i * 0.04, ease: 'power2.out',
        scrollTrigger: { trigger: el, start: 'top 88%' }
      })
    })
  }, sectionRef.value)
})

onUnmounted(() => ctx?.revert())
</script>

<template>
  <section id="gallery" ref="sectionRef" class="relative py-32 px-6">
    <div class="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-pomegranate/5 blur-[180px]"></div>

    <div class="relative max-w-6xl mx-auto">
      <div class="gallery-header text-center mb-16">
        <p class="text-saffron text-xs tracking-[0.4em] uppercase mb-4">{{ t('gallery.label') }}</p>
        <h2 class="font-heading text-4xl md:text-6xl font-light text-cream">
          {{ t('gallery.title1') }} <span class="text-saffron">{{ t('gallery.title2') }}</span>
        </h2>
      </div>

      <div class="columns-2 md:columns-3 gap-4 space-y-4">
        <div v-for="(img, i) in images" :key="i" class="gallery-item break-inside-avoid">
          <img
            :src="img"
            :alt="`Persian dish ${i + 1}`"
            class="w-full rounded-lg border border-saffron/10 hover:border-saffron/40 transition-all duration-500 hover:scale-[1.02] hover:shadow-[0_10px_40px_rgba(212,160,23,0.15)]"
          />
        </div>
      </div>
    </div>
  </section>
</template>
