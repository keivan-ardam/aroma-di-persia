<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useI18n } from '../composables/useI18n'

gsap.registerPlugin(ScrollTrigger)

const { t } = useI18n()
const sectionRef = ref<HTMLElement | null>(null)
const expandedItem = ref<string | null>(null)
let ctx: gsap.Context | null = null

const toggle = (id: string) => {
  expandedItem.value = expandedItem.value === id ? null : id
}

const categories = [
  {
    title: 'Zuppe',
    icon: '🥣',
    items: [
      { name: 'Zuppa Vermicelli', price: '6€', desc: 'Zuppa leggera con pasta sottile, pollo e verdure', ingredients: 'Pasta vermicelli, petto di pollo, carote, sedano, cipolla, curcuma, sale, pepe' },
      { name: 'Zuppa d\'orzo', price: '6€', desc: 'Zuppa cremosa con orzo, pollo, pomodoro e verdure', ingredients: 'Orzo, pollo, pomodoro, carote, patate, prezzemolo, curcuma' },
      { name: 'Zuppa di funghi e panna', price: '7€', desc: 'Zuppa cremosa con funghi e panna', ingredients: 'Funghi champignon, panna, burro, cipolla, aglio, timo' },
    ]
  },
  {
    title: 'Antipasti',
    icon: '🥗',
    items: [
      { name: 'Insalata Olivier', price: '8€', desc: 'Patate, pollo, uova e maionese', ingredients: 'Patate, petto di pollo, uova, piselli, cetrioli sottaceto, maionese' },
      { name: 'Kashk-e Bademjan', price: '9€', desc: 'Melanzane, yogurt fermentato, aglio e noci', ingredients: 'Melanzane, kashk (siero di latte), aglio, noci, cipolla fritta, menta secca' },
      { name: 'Mirza Ghasemi', price: '9€', desc: 'Melanzane affumicate, pomodoro, aglio e uova', ingredients: 'Melanzane affumicate, pomodoro, aglio, uova, olio, curcuma' },
    ]
  },
  {
    title: 'Panini',
    icon: '🌯',
    items: [
      { name: 'Panino Bandari', price: '8€', desc: 'Salsiccia di pollo speziata, cipolla e salsa piccante', ingredients: 'Salsiccia di pollo, cipolla, pomodoro, peperoncino, salsa piccante, pane' },
      { name: 'Hot Dog Funghi e Formaggio', price: '8€', desc: 'Hot dog con funghi saltati e formaggio fuso', ingredients: 'Wurstel, funghi, formaggio, pane, senape, ketchup' },
      { name: 'Falafel Fatto in Casa', price: '8€', desc: 'Polpette di ceci speziate con salsa e verdure fresche', ingredients: 'Ceci, prezzemolo, coriandolo, aglio, cumino, salsa tahini, verdure' },
    ]
  },
  {
    title: 'Piatti Principali',
    icon: '🍛',
    items: [
      { name: 'Gheimeh con patatine', price: '12€', desc: 'Stufato di manzo, lenticchie gialle, pomodoro e zafferano', ingredients: 'Manzo, lenticchie gialle, pomodoro, zafferano, limone secco, patatine fritte, riso' },
      { name: 'Aloo Spinaci', price: '12€', desc: 'Stufato di prugne, spinaci e carne', ingredients: 'Carne di manzo, spinaci, prugne secche, erbe aromatiche, cipolla, riso' },
      { name: 'Zereshk Polo con pollo', price: '12€', desc: 'Riso con zafferano e bacche di crespino, pollo', ingredients: 'Riso basmati, zafferano, bacche di crespino, pollo, burro, zucchero' },
      { name: 'Baghali Polo con pollo', price: '12€', desc: 'Riso con fave, aneto e zafferano, pollo', ingredients: 'Riso basmati, fave, aneto, zafferano, pollo, burro' },
      { name: 'Joojeh Kebab', price: '11€', desc: 'Pollo marinato allo zafferano con riso e pomodoro grigliato', ingredients: 'Pollo, zafferano, limone, cipolla, pomodoro grigliato, riso' },
      { name: 'Koobideh', price: '12€', desc: 'Carne macinata alla griglia con riso allo zafferano', ingredients: 'Carne macinata di manzo, cipolla, zafferano, riso basmati, pomodoro grigliato' },
      { name: 'Adas Polo', price: '9€', desc: 'Riso con lenticchie, uvetta e spezie', ingredients: 'Riso basmati, lenticchie, uvetta, datteri, carne macinata, cannella, cumino' },
      { name: 'Loobia Polo', price: '9€', desc: 'Riso con carne, fagiolini e salsa di pomodoro', ingredients: 'Riso basmati, carne macinata, fagiolini, pomodoro, curcuma, cannella' },
      { name: 'Kufteh Tabrizi (2 pz)', price: '10€', desc: 'Polpette grandi con carne, riso, erbe e ripieno', ingredients: 'Carne macinata, riso, ceci, erbe aromatiche, uovo sodo, noce, crespino' },
      { name: 'Maccharoni Persiani', price: '8€', desc: 'Pasta con carne macinata, salsa di pomodoro e spezie', ingredients: 'Pasta penne, carne macinata, pomodoro, cannella, curcuma, patate' },
      { name: 'Kotlet (5 pz)', price: '11€', desc: 'Polpette fritte di carne e patate con salsa di pomodoro', ingredients: 'Carne macinata, patate, cipolla, uovo, curcuma, pangrattato' },
    ]
  },
  {
    title: 'Piatti Speciali',
    icon: '👑',
    items: [
      { name: 'Fesenjan', price: '15€', desc: 'Stufato di polpettine con noci e melograno (min. 4 porzioni)', ingredients: 'Polpettine di pollo, noci macinate, melassa di melograno, zucchero, cannella' },
      { name: 'Baghali Polo con carne', price: '16€', desc: 'Riso con fave e aneto, carne di vitello (min. 4 porzioni)', ingredients: 'Riso basmati, fave, aneto, zafferano, stinco di vitello, burro' },
      { name: 'Khoresht Karafs', price: '14€', desc: 'Stufato di sedano, erbe aromatiche e carne', ingredients: 'Carne di manzo, sedano, prezzemolo, menta, limone secco, curcuma' },
    ]
  },
  {
    title: 'Contorni',
    icon: '🥒',
    items: [
      { name: 'Sottaceti di pomodoro', price: '4€', desc: 'Pomodori in salamoia, stile persiano', ingredients: 'Pomodori, aceto, sale, erbe aromatiche' },
      { name: 'Sottaceti misti', price: '4€', desc: 'Verdure miste in aceto', ingredients: 'Cetrioli, carote, cavolfiore, aceto, sale' },
      { name: 'Verdure in salamoia', price: '4€', desc: 'Verdure fresche in salamoia', ingredients: 'Verdure miste, acqua, sale, aceto' },
      { name: 'Insalata Shirazi', price: '5€', desc: 'Pomodoro, cetriolo, cipolla e limone', ingredients: 'Pomodoro, cetriolo, cipolla rossa, succo di limone, menta secca' },
      { name: 'Insalata di cavolo', price: '5€', desc: 'Cavolo fresco condito', ingredients: 'Cavolo, carote, mais, limone, olio d\'oliva' },
      { name: 'Yogurt con musir', price: '4€', desc: 'Yogurt con aglio selvatico persiano', ingredients: 'Yogurt, musir (aglio selvatico persiano)' },
      { name: 'Borani', price: '5€', desc: 'Yogurt con aglio e spinaci', ingredients: 'Yogurt, spinaci, aglio, sale' },
      { name: 'Yogurt con melanzane', price: '5€', desc: 'Yogurt con melanzane affumicate', ingredients: 'Yogurt, melanzane affumicate, aglio, menta' },
    ]
  },
]

onMounted(() => {
  if (!sectionRef.value) return
  ctx = gsap.context(() => {
    gsap.from('.menu-header', {
      opacity: 0, y: 60, duration: 1, ease: 'power3.out',
      scrollTrigger: { trigger: sectionRef.value, start: 'top 75%' }
    })
    gsap.utils.toArray<HTMLElement>('.menu-category').forEach((el, i) => {
      gsap.from(el, {
        opacity: 0, y: 50, duration: 0.8, delay: i * 0.1, ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 85%' }
      })
    })
  }, sectionRef.value)
})

onUnmounted(() => ctx?.revert())
</script>

<template>
  <section id="menu" ref="sectionRef" class="relative py-32 px-6">
    <div class="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full bg-saffron/3 blur-[200px]"></div>

    <div class="relative max-w-6xl mx-auto">
      <div class="menu-header text-center mb-20">
        <p class="text-saffron text-xs tracking-[0.4em] uppercase mb-4">{{ t('menu.label') }}</p>
        <h2 class="font-heading text-4xl md:text-6xl font-light text-cream">
          {{ t('menu.title1') }} <span class="text-saffron">{{ t('menu.title2') }}</span>
        </h2>
        <p class="mt-4 text-cream/50 max-w-lg mx-auto">{{ t('menu.subtitle') }}</p>
      </div>

      <div class="space-y-16">
        <div v-for="(cat, ci) in categories" :key="ci" class="menu-category">
          <div class="flex items-center gap-4 mb-8">
            <span class="text-2xl">{{ cat.icon }}</span>
            <h3 class="font-heading text-2xl md:text-3xl text-cream font-light">{{ cat.title }}</h3>
            <div class="flex-1 h-px bg-gradient-to-r from-saffron/30 to-transparent"></div>
          </div>

          <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div
              v-for="(item, ii) in cat.items"
              :key="ii"
              class="menu-card rounded-lg p-5 group cursor-pointer transition-all duration-300"
              :class="expandedItem === `${ci}-${ii}` ? 'ring-1 ring-saffron/30' : ''"
              @click="toggle(`${ci}-${ii}`)"
            >
              <div class="flex items-start justify-between gap-3">
                <div class="flex-1">
                  <h4 class="text-cream font-medium text-sm group-hover:text-saffron transition-colors">
                    {{ item.name }}
                  </h4>
                  <p class="text-cream/40 text-xs mt-1 leading-relaxed">{{ item.desc }}</p>
                </div>
                <span class="text-saffron font-heading text-lg font-semibold whitespace-nowrap">
                  {{ item.price }}
                </span>
              </div>

              <!-- Expandable ingredients -->
              <div
                v-if="expandedItem === `${ci}-${ii}`"
                class="mt-3 pt-3 border-t border-saffron/10"
              >
                <p class="text-saffron/70 text-[10px] uppercase tracking-wider mb-1">{{ t('menu.ingredients') }}</p>
                <p class="text-cream/50 text-xs leading-relaxed">{{ item.ingredients }}</p>
                <p class="text-cream/30 text-[10px] mt-2 italic">{{ t('menu.close') }} ↑</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
