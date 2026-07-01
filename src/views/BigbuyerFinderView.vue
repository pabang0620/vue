<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useBuyerSearchStore } from '../stores/buyerSearch.js'
import LocBar from '../components/layout/LocBar.vue'
import KeywordInput from '../components/finder/KeywordInput.vue'
import CategoryGrid from '../components/finder/CategoryGrid.vue'
import CountrySelect from '../components/finder/CountrySelect.vue'
import SearchSidebar from '../components/finder/SearchSidebar.vue'

const router = useRouter()
const store = useBuyerSearchStore()

/* ── 아코디언 상태 (step1 기본 열림) ── */
const isStep1Open = ref(false)
const isStep2Open = ref(false)

function toggleStep1() {
  if (isStep1Open.value) {
    isStep1Open.value = false
  } else {
    isStep1Open.value = true
    isStep2Open.value = false
  }
}

function toggleStep2() {
  if (isStep2Open.value) {
    isStep2Open.value = false
  } else {
    isStep2Open.value = true
    isStep1Open.value = false
  }
}

/* ── 키워드 카운터 표시 ── */
const MAX_KW = 5
const MAX_COMBO = 3
const MAX_COUNTRY = 3

const kwCountText = computed(() => store.keywords.length + ' / ' + MAX_KW)
const kwCountAtMax = computed(() => store.keywords.length >= MAX_KW)

const catCountText = computed(() => store.catCombos.length + ' / ' + MAX_COMBO)
const catCountAtMax = computed(() => store.catCombos.length >= MAX_COMBO)

const countryCount = computed(() => Object.keys(store.selectedCountries).length)
const countryCountText = computed(() => countryCount.value + ' / ' + MAX_COUNTRY)
const countryCountAtMax = computed(() => countryCount.value >= MAX_COUNTRY)

/* ── AI 결과 패널 표시 ── */
const showSpinner = ref(false)
const showResult = ref(false)
const sendCount = ref('')

let spinnerTimer = null

function handleSearch() {
  showResult.value = false
  showSpinner.value = true
  // 스피너로 스크롤
  setTimeout(() => {
    const spinnerEl = document.querySelector('.search-spinner')
    if (spinnerEl) spinnerEl.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, 50)
  // 1.5초 후 결과 패널 표시
  spinnerTimer = setTimeout(() => {
    showSpinner.value = false
    showResult.value = true
    setTimeout(() => {
      const resultEl = document.querySelector('.search-result-panel')
      if (resultEl) resultEl.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 50)
  }, 1500)
}

/* ── sticky 상태 ── */
const isLocBarSticky = ref(false)
const isContentHeaderSticky = ref(false)
const contentHeaderTop = ref('')
let scrollHandler = null

onMounted(() => {
  // 스크롤 시점에 현재 DOM 기준으로 매번 판정 — SPA 라우트 전환 타이밍에 안전
  scrollHandler = () => {
    const locBarEl = document.querySelector('.loc-bar')
    if (!locBarEl) return
    const titleEl = document.querySelector('.content-header')
    // loc-bar(position:sticky)가 화면 상단 66px에 붙었는지로 판정
    // — offsetTop은 sticky 상태에서 부정확하므로 사용 금지
    const stuck = locBarEl.getBoundingClientRect().top <= 66
    isLocBarSticky.value = stuck
    isContentHeaderSticky.value = stuck
    if (titleEl) contentHeaderTop.value = stuck ? (66 + locBarEl.offsetHeight) + 'px' : ''
  }
  window.addEventListener('scroll', scrollHandler, { passive: true })
  scrollHandler()
})

onUnmounted(() => {
  if (scrollHandler) window.removeEventListener('scroll', scrollHandler)
  if (spinnerTimer) clearTimeout(spinnerTimer)
})

/* ── 브레드크럼 항목 ── */
const locBarItems = [
  {
    label: '빅바이어마케팅',
    options: [
      { label: '빅바이어마케팅', to: '/bm/big-data' },
      { label: '사업 참가신청', to: '/apply' },
    ],
    current: '빅바이어마케팅',
  },
  {
    label: '빅데이터 바이어 발굴',
    options: [
      { label: '빅데이터 바이어 발굴', to: '/bm/big-data' },
      { label: '임시저장내역', to: '/bm/tmp' },
    ],
    current: '빅데이터 바이어 발굴',
  },
]
</script>

<template>
  <!-- 페이지 배너 -->
  <section class="page-banner" aria-label="페이지 배너">
    <div class="wrap page-banner-inner">
      <h1>빅바이어 마케팅</h1>
      <p class="page-banner-sub">단계별 검색으로 전 세계 최적 바이어를 찾아드립니다</p>
    </div>
  </section>

  <!-- 브레드크럼 -->
  <LocBar :items="locBarItems" :class="{ 'is-sticky': isLocBarSticky }" />

  <!-- 메인 콘텐츠 -->
  <main class="page-content" aria-label="빅데이터 바이어 발굴">
    <div class="wrap">

      <!-- 페이지 제목 -->
      <div class="content-header" :class="{ 'is-sticky': isContentHeaderSticky }" :style="contentHeaderTop ? { top: contentHeaderTop } : {}">
        <h2 class="content-title">빅데이터 바이어 발굴</h2>
        <p class="content-desc">아래 단계를 따라 검색 조건을 설정하면 AI가 최적 바이어를 발굴해 드립니다. 원하는 단계만 입력해도 검색이 가능합니다.</p>
      </div>

      <div class="search-layout">
        <!-- 왼쪽: 스텝 카드 -->
        <div>
          <div class="search-card" role="form" aria-label="바이어 발굴 검색 폼">

            <!-- ─────────────────────────────────
                 STEP 1: 검색어 입력
            ───────────────────────────────── -->
            <div class="step-row" :class="{ open: isStep1Open }">
              <!-- 스텝 헤더 -->
              <div class="step-header accordion-hd" @click="toggleStep1">
                <div class="step-icon"><i class="fa-solid fa-magnifying-glass"></i></div>
                <span class="step-title">검색어 입력</span>
                <span class="step-opt-badge">선택 사항</span>
                <span
                  class="keyword-counter"
                  :class="{ 'at-max': kwCountAtMax }"
                >{{ kwCountText }}</span>
                <i class="fa-solid fa-chevron-down step-chevron"></i>
              </div>

              <!-- 스텝 본문 -->
              <div class="step-body collapsible">
                <KeywordInput />
              </div>
            </div>

            <!-- ─────────────────────────────────
                 STEP 2: 카테고리 선택
            ───────────────────────────────── -->
            <div class="step-row" :class="{ open: isStep2Open }">
              <div class="step-header accordion-hd" @click="toggleStep2">
                <div class="step-icon"><i class="fa-solid fa-layer-group"></i></div>
                <span class="step-title">카테고리 선택</span>
                <span class="step-opt-badge">선택 사항</span>
                <span
                  class="keyword-counter"
                  :class="{ 'at-max': catCountAtMax }"
                >{{ catCountText }}</span>
                <i class="fa-solid fa-chevron-down step-chevron"></i>
              </div>

              <div class="step-body collapsible">
                <CategoryGrid />
              </div>
            </div>

            <!-- ─────────────────────────────────
                 STEP 3: 국가 선택
            ───────────────────────────────── -->
            <div class="step-row">
              <div class="step-header">
                <div class="step-icon"><i class="fa-solid fa-earth-asia"></i></div>
                <span class="step-title">국가 선택</span>
                <span class="step-req-badge">필수</span>
                <span
                  class="keyword-counter"
                  :class="{ 'at-max': countryCountAtMax }"
                >{{ countryCountText }}</span>
              </div>

              <div class="step-body">
                <CountrySelect />
              </div>
            </div>

          </div>
          <!-- /search-card -->
        </div>
        <!-- /왼쪽 -->

        <!-- 오른쪽: 스티키 요약 패널 -->
        <div class="search-sidebar">
          <SearchSidebar @search="handleSearch" />
        </div>
        <!-- /오른쪽 -->

      </div>
      <!-- /search-layout -->

      <!-- ── AI 발굴 스피너 ── -->
      <div class="search-spinner" :class="{ 'is-hidden': !showSpinner }">
        <div class="spinner-ring"></div>
        <p class="spinner-text">AI 바이어 발굴 중...</p>
      </div>

      <!-- ── AI 검색 결과 패널 ── -->
      <div class="search-result-panel" :class="{ 'is-hidden': !showResult }">
        <div class="result-panel-hd">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
          AI 바이어 발굴 결과
        </div>
        <div class="result-stats-row">
          <div class="result-stat">
            <div class="result-stat-label">검색결과<br>(기업기준)</div>
            <div>
              <span class="result-stat-value">0</span>
              <span class="result-stat-unit">건</span>
            </div>
          </div>
          <div class="result-stat">
            <div class="result-stat-label">발송가능 건수<br>(이메일기준)</div>
            <div>
              <span class="result-stat-value">0</span>
              <span class="result-stat-unit">건</span>
            </div>
          </div>
          <div class="result-stat">
            <div class="result-stat-label">(예상)차감</div>
            <div>
              <span class="result-stat-value">0</span>
              <span class="result-stat-unit">캐시</span>
            </div>
          </div>
        </div>
        <div class="result-cta">
          <p class="cta-title">발굴된 바이어에게 마케팅 메시지 발송</p>
          <div class="cta-send-row">
            <select class="cta-send-select" v-model="sendCount">
              <option value="">발송 건수 선택</option>
              <option value="10">10건</option>
              <option value="30">30건</option>
              <option value="50">50건</option>
              <option value="100">100건</option>
              <option value="150">150건</option>
            </select>
            <RouterLink to="/bm/push" class="btn-marketing-write">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
              </svg>
              마케팅 메시지 발송
            </RouterLink>
          </div>
        </div>
      </div>

    </div>
  </main>
</template>

<style src="../assets/styles/bigbuyer-finder.css" />
