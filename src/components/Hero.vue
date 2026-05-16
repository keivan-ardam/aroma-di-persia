<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useI18n } from '../composables/useI18n'

gsap.registerPlugin(ScrollTrigger)

const { t } = useI18n()
const heroRef = ref<HTMLElement | null>(null)
const frameCanvasRef = ref<HTMLCanvasElement | null>(null)
const smokeCanvasRef = ref<HTMLCanvasElement | null>(null)

const FRAME_COUNT = 80
const overlayTexts = [
  { text: 'PREPARATO CON AMORE', sub: 'Prepared with Love' },
]
const currentFrame = { value: 0 }



const frames: HTMLImageElement[] = []

function preloadFrames(): Promise<void> {
  return new Promise((resolve) => {
    let loaded = 0
    for (let i = 1; i <= FRAME_COUNT; i++) {
      const img = new Image()
      img.src = `${import.meta.env.BASE_URL}frames/frame_${String(i).padStart(3, '0')}.jpg`
      img.onload = () => { if (++loaded === FRAME_COUNT) resolve() }
      img.onerror = () => { if (++loaded === FRAME_COUNT) resolve() }
      frames.push(img)
    }
  })
}

function renderFrame(index: number) {
  if (!frameCanvasRef.value) return
  const ctx = frameCanvasRef.value.getContext('2d')
  if (!ctx || !frames[index] || !frames[index].complete) return
  const canvas = frameCanvasRef.value
  const img = frames[index]
  const imgW = img.naturalWidth || img.width
  const imgH = img.naturalHeight || img.height
  if (!imgW || !imgH) return
  const scale = Math.max(canvas.width / imgW, canvas.height / imgH)
  const w = imgW * scale
  const h = imgH * scale
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  ctx.drawImage(img, (canvas.width - w) / 2, (canvas.height - h) / 2, w, h)
}

// Smoke particles
interface Particle {
  x: number; y: number; vx: number; vy: number
  radius: number; opacity: number; life: number; maxLife: number; hue: number
}

let particles: Particle[] = []
let smokeAnimId: number
let smokeCtx: CanvasRenderingContext2D | null = null

function createParticle(cx: number, cy: number): Particle {
  return {
    x: cx + (Math.random() - 0.5) * 100,
    y: cy + (Math.random() - 0.5) * 30,
    vx: (Math.random() - 0.5) * 0.4,
    vy: -0.5 - Math.random() * 0.9,
    radius: 30 + Math.random() * 70,
    opacity: 0, life: 0,
    maxLife: 140 + Math.random() * 120,
    hue: 35 + Math.random() * 15,
  }
}

function animateSmoke() {
  if (!smokeCtx || !smokeCanvasRef.value) return
  const w = smokeCanvasRef.value.width / window.devicePixelRatio
  const h = smokeCanvasRef.value.height / window.devicePixelRatio
  smokeCtx.clearRect(0, 0, smokeCanvasRef.value.width, smokeCanvasRef.value.height)

  const cx = w / 2, cy = h / 2 + 30
  if (particles.length < 55 && Math.random() > 0.35) particles.push(createParticle(cx, cy))

  for (let i = particles.length - 1; i >= 0; i--) {
    const p = particles[i]
    p.life++
    p.x += p.vx + Math.sin(p.life * 0.015) * 0.4
    p.y += p.vy
    p.vx *= 0.995
    p.vy *= 0.997
    p.radius += 0.4

    const progress = p.life / p.maxLife
    if (progress < 0.12) p.opacity = progress / 0.12
    else if (progress > 0.55) p.opacity = 1 - (progress - 0.55) / 0.45
    else p.opacity = 1
    p.opacity *= 0.1

    if (p.life >= p.maxLife) { particles.splice(i, 1); continue }

    const gradient = smokeCtx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius)
    gradient.addColorStop(0, `hsla(${p.hue}, 75%, 58%, ${p.opacity})`)
    gradient.addColorStop(0.3, `hsla(${p.hue}, 65%, 48%, ${p.opacity * 0.7})`)
    gradient.addColorStop(0.7, `hsla(${p.hue}, 50%, 38%, ${p.opacity * 0.3})`)
    gradient.addColorStop(1, `hsla(${p.hue}, 40%, 30%, 0)`)

    smokeCtx.beginPath()
    smokeCtx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
    smokeCtx.fillStyle = gradient
    smokeCtx.fill()
  }
  smokeAnimId = requestAnimationFrame(animateSmoke)
}

function resizeCanvases() {
  const dpr = window.devicePixelRatio
  if (frameCanvasRef.value) {
    frameCanvasRef.value.width = window.innerWidth * dpr
    frameCanvasRef.value.height = window.innerHeight * dpr
    renderFrame(currentFrame.value)
  }
  if (smokeCanvasRef.value) {
    smokeCanvasRef.value.width = smokeCanvasRef.value.offsetWidth * dpr
    smokeCanvasRef.value.height = smokeCanvasRef.value.offsetHeight * dpr
    smokeCtx = smokeCanvasRef.value.getContext('2d')
    smokeCtx?.scale(dpr, dpr)
  }
}

let gsapCtx: gsap.Context | null = null

onMounted(async () => {
  if (!heroRef.value || !frameCanvasRef.value || !smokeCanvasRef.value) return

  smokeCtx = smokeCanvasRef.value.getContext('2d')
  resizeCanvases()
  window.addEventListener('resize', resizeCanvases)
  animateSmoke()

  await preloadFrames()
  renderFrame(0)

  gsapCtx = gsap.context(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: heroRef.value,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.6,
      }
    })

    // Phase 1: Frame sequence (0 - 60)
    tl.to(currentFrame, {
      value: FRAME_COUNT - 1,
      ease: 'none',
      duration: 60,
      onUpdate: () => {
        renderFrame(Math.round(currentFrame.value))
      }
    })

    // Phase 2: Logo fades out, frames fade out (50 - 75)
    tl.to('.hero-logo-group', { opacity: 0, y: -40, duration: 10, ease: 'power2.inOut' }, 50)
    tl.to('.frame-canvas-wrap', { opacity: 0, duration: 15, ease: 'power1.inOut' }, 60)

    // Phase 3: Text appears, holds, then fades (75 - 100)
    tl.fromTo('.hero-text-overlay',
      { opacity: 0, y: 60, scale: 0.97 },
      { opacity: 1, y: 0, scale: 1, duration: 10, ease: 'power2.out' }, 72)
    tl.to('.hero-text-overlay', { opacity: 0, y: -40, duration: 8, ease: 'power2.in' }, 90)

  }, heroRef.value)
})

onUnmounted(() => {
  gsapCtx?.revert()
  cancelAnimationFrame(smokeAnimId)
  window.removeEventListener('resize', resizeCanvases)
})
</script>

<template>
  <section ref="heroRef" class="relative h-[400vh]" id="hero">
    <div class="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center will-change-transform">
      <!-- Frame sequence canvas -->
      <div class="frame-canvas-wrap absolute inset-0 will-change-[opacity]">
        <canvas ref="frameCanvasRef" class="w-full h-full"></canvas>
        <div class="absolute inset-0 bg-navy/20"></div>
      </div>

      <!-- Gradient overlays -->
      <div class="absolute inset-0 bg-gradient-to-b from-navy/50 via-transparent to-navy/60 pointer-events-none"></div>

      <!-- Smoke canvas -->
      <canvas
        ref="smokeCanvasRef"
        class="absolute inset-0 w-full h-full pointer-events-none z-10"
        style="mix-blend-mode: screen;"
      ></canvas>

      <!-- Center logo -->
      <div class="hero-logo-group relative z-20 text-center">
        <p class="text-saffron/50 text-[10px] md:text-xs tracking-[0.5em] uppercase mb-6 font-body">
          {{ t('hero.tagline') }}
        </p>
        <h1 class="font-heading text-6xl md:text-9xl font-light text-cream tracking-wide leading-none text-shadow-luxury">
          AROMA
        </h1>
        <div class="flex items-center justify-center gap-4 my-3">
          <div class="w-12 md:w-20 h-px bg-gradient-to-r from-transparent to-saffron/60"></div>
          <span class="text-saffron/60 text-lg">✦</span>
          <div class="w-12 md:w-20 h-px bg-gradient-to-l from-transparent to-saffron/60"></div>
        </div>
        <h1 class="font-heading text-5xl md:text-8xl font-light text-saffron tracking-widest leading-none text-shadow-luxury">
          DI PERSIA
        </h1>
        <p class="mt-8 text-cream/40 text-xs md:text-sm tracking-[0.3em] font-light">
          {{ t('hero.subtitle') }}
        </p>
      </div>



      <!-- Scroll text overlay -->
      <div
        v-for="(item, i) in overlayTexts"
        :key="i"
        class="hero-text-overlay absolute inset-0 flex items-center justify-center opacity-0 z-30 pointer-events-none will-change-[transform,opacity]"
      >
        <div class="text-center px-6">
          <h2 class="font-heading text-4xl md:text-7xl text-cream font-light tracking-wider text-shadow-luxury leading-tight">
            {{ item.text }}
          </h2>
          <p class="mt-4 text-saffron/60 text-sm md:text-xl tracking-[0.3em] italic font-light">{{ item.sub }}</p>
        </div>
      </div>

      <!-- Scroll indicator -->
      <div class="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-20">
        <span class="text-cream/30 text-[10px] tracking-[0.4em] uppercase">{{ t('hero.scroll') }}</span>
        <div class="w-px h-8 bg-gradient-to-b from-saffron/50 to-transparent animate-pulse"></div>
      </div>
    </div>
  </section>
</template>
