<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const emit = defineEmits(['slideChange'])

// 슬라이드 데이터 (v-html: <strong> 태그 포함)
const slides = [
  {
    tag: 'BIG DATA',
    html: '세계 최대의 글로벌 기업정보 회사인 미국 Dun &amp; Bradstreet 社에 의해 수시로 업데이트되는 <strong>5억 건 이상의 빅데이터</strong>'
  },
  {
    tag: 'RPA',
    html: '바이어 정보 탐색·추출에 최적화된 자동화 로직으로 기업 니즈에 부합하는 해외 바이어 정보를 빠르게 정제 및 취합 <strong>(자사 보유 빅데이터 + 웹 상 데이터)</strong>'
  },
  {
    tag: 'AI',
    html: '1,000만 건 이상의 실제 바이어-셀러 매칭 데이터 및 10년 이상의 무역지원 노하우를 기반으로 실시간 학습 중인 <strong>AI 솔루션</strong>이 최선의 바이어 정보를 선별하여 제공'
  }
]

const currentSlide = ref(0)
const isPlaying = ref(true)
let timer = null

function show(n) {
  currentSlide.value = (n + slides.length) % slides.length
  emit('slideChange', currentSlide.value)
}

function startTimer() {
  timer = setInterval(() => show(currentSlide.value + 1), 3600)
  isPlaying.value = true
}

function stopTimer() {
  clearInterval(timer)
  isPlaying.value = false
}

function togglePlay() {
  if (isPlaying.value) stopTimer()
  else startTimer()
}

function goToSlide(i) {
  show(i)
  if (isPlaying.value) {
    clearInterval(timer)
    startTimer()
  }
}

onMounted(() => startTimer())
onUnmounted(() => clearInterval(timer))
</script>

<template>
  <div class="hvb-slider">
    <div
      v-for="(slide, index) in slides"
      :key="index"
      :class="['hvb-slide', { active: currentSlide === index }]"
    >
      <span class="hvb-slide-tag">{{ slide.tag }}</span>
      <p v-html="slide.html"></p>
    </div>
    <div class="hvb-dots">
      <span
        v-for="(slide, index) in slides"
        :key="index"
        :class="['hvb-dot', { active: currentSlide === index }]"
        @click="goToSlide(index)"
      ></span>
      <button
        class="hvb-play-btn"
        :aria-label="isPlaying ? '슬라이드 정지' : '슬라이드 재생'"
        @click="togglePlay"
      >
        <i :class="isPlaying ? 'fa-solid fa-pause' : 'fa-solid fa-play'"></i>
      </button>
    </div>
  </div>
</template>
