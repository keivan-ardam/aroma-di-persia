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
    gsap.from('.about-content', {
      opacity: 0, y: 80, duration: 1.2, ease: 'power3.out',
      scrollTrigger: { trigger: sectionRef.value, start: 'top 70%' }
    })
    gsap.from('.about-img', {
      opacity: 0, scale: 0.9, duration: 1.4, ease: 'power3.out',
      scrollTrigger: { trigger: sectionRef.value, start: 'top 60%' }
    })
  }, sectionRef.value)
})

onUnmounted(() => ctx?.revert())
</script>

<template>
  <section id="about" ref="sectionRef" class="relative py-32 px-6">
    <div class="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
      <div class="about-img relative">
        <div class="absolute -inset-4 bg-saffron/5 rounded-lg blur-2xl"></div>
        <img
          src="/6030401046326217810.jpg"
          alt="Persian cuisine"
          class="relative rounded-lg shadow-2xl w-full object-cover aspect-[4/5] border border-saffron/10"
        />
        <div class="absolute -bottom-4 -right-4 w-24 h-24 border border-saffron/20 rounded-lg"></div>
      </div>

      <div class="about-content">
        <p class="text-saffron text-xs tracking-[0.4em] uppercase mb-4">{{ t('about.label') }}</p>
        <h2 class="font-heading text-4xl md:text-5xl font-light text-cream leading-tight mb-8">
          {{ t('about.title1') }}<br/>
          <span class="text-saffron">{{ t('about.title2') }}</span> {{ t('about.title3') }}
        </h2>
        <div class="space-y-5 text-cream/70 leading-relaxed">
          <p>{{ t('about.p1') }}</p>
          <p>{{ t('about.p2') }}</p>
          <p>{{ t('about.p3') }}</p>
        </div>

        <div class="mt-10 flex items-center gap-8">
          <div class="text-center">
            <p class="font-heading text-3xl text-saffron">100%</p>
            <p class="text-xs text-cream/50 tracking-wider uppercase mt-1">{{ t('about.homemade') }}</p>
          </div>
          <div class="w-px h-12 bg-saffron/20"></div>
          <div class="text-center">
            <p class="font-heading text-3xl text-saffron">{{ t('about.daily') }}</p>
            <p class="text-xs text-cream/50 tracking-wider uppercase mt-1">{{ t('about.special') }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
