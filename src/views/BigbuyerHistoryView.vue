<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import LocBar from '../components/layout/LocBar.vue'

const router = useRouter()

// ── 스크롤 스티키 상태 ──────────────────────────────────────
const isLocSticky = ref(false)
const isTitleSticky = ref(false)
const titleTop = ref('')
let scrollHandler = null

onMounted(() => {
  scrollHandler = () => {
    const locBarEl = document.querySelector('.loc-bar')
    if (!locBarEl) return
    const titleEl = document.querySelector('.page-title-area')
    const stuck = locBarEl.getBoundingClientRect().top <= 66
    isLocSticky.value = stuck
    isTitleSticky.value = stuck
    if (titleEl) titleTop.value = stuck ? (66 + locBarEl.offsetHeight) + 'px' : ''
  }
  scrollHandler()
  window.addEventListener('scroll', scrollHandler, { passive: true })
})

onUnmounted(() => {
  if (scrollHandler) window.removeEventListener('scroll', scrollHandler)
})

// ── 샘플 데이터 (원본 allData + HTML 행 시각 반영) ────────
const allData = ref([
  { no: 5, date: '2025.06.28 14:32', title: '홈&키친 바이어 대상 신제품 소개', category: 'Home & Kitchen > Home', count: '50건' },
  { no: 4, date: '2025.06.25 10:15', title: '뷰티 디바이스 프로모션 안내',      category: 'Beauty & Personal Care',  count: '30건' },
  { no: 3, date: '2025.06.22 09:04', title: '스마트 센서 수출 제안',             category: 'Electronic Products',     count: '100건' },
  { no: 2, date: '2025.06.18 16:50', title: '식품 바이어 미팅 요청',             category: 'Food & Beverage',         count: '10건' },
  { no: 1, date: '2025.06.10 11:22', title: '패션 신상품 컬렉션 발송',           category: 'Fashion',                 count: '50건' },
])

// renderTable(data) → computed tableData
const tableData = computed(() => allData.value)

// ── 페이지네이션 ─────────────────────────────────────────────
const currentPage = ref(1)
const totalPages = ref(3)

function goToPage(page) {
  if (page < 1 || page > totalPages.value) return
  currentPage.value = page
}

// ── 행 클릭 → 발송 페이지 이동 ──────────────────────────────
function goToSend() {
  router.push('/bigbuyer/send')
}

// ── LocBar 아이템 ─────────────────────────────────────────────
const locBarItems = [
  {
    label: '빅바이어마케팅',
    current: '빅바이어마케팅',
    options: [
      { label: '빅바이어마케팅', to: '/bigbuyer/finder' },
      { label: '사업 참가신청',  to: '/apply' },
    ],
  },
  {
    label: '임시저장내역',
    current: '임시저장내역',
    options: [
      { label: '빅데이터 바이어 발굴', to: '/bigbuyer/finder' },
      { label: '임시저장내역',         to: '/bigbuyer/history' },
    ],
  },
]
</script>

<template>
  <!-- ── 페이지 배너 ── -->
  <section class="page-banner" aria-label="페이지 배너">
    <div class="wrap banner-inner">
      <h1 class="banner-title">빅바이어 마케팅</h1>
      <p class="banner-sub">마케팅 메시지 임시저장 내역을 관리합니다</p>
    </div>
  </section>

  <!-- ── 브레드크럼 ── -->
  <LocBar
    :class="{ 'is-sticky': isLocSticky }"
    :items="locBarItems"
  />

  <!-- ── 메인 콘텐츠 ── -->
  <main class="page-content">
    <div class="wrap">

      <div class="page-title-area" :class="{ 'is-sticky': isTitleSticky }" :style="titleTop ? { top: titleTop } : {}">
        <h2>임시저장내역</h2>
        <p>작성 중인 마케팅 메시지 임시저장 내역을 조회합니다.</p>
      </div>

      <!-- ── 목록 ── -->
      <div class="result-area">
        <div class="result-header">
          <p class="result-count">총 <strong>{{ tableData.length }}</strong>건</p>
        </div>

        <div class="result-table-wrap">
          <table class="result-table">
            <thead>
              <tr>
                <th style="width:60px;">No</th>
                <th style="width:180px;">대상바이어</th>
                <th>제목</th>
                <th style="width:160px;">임시저장 일시</th>
              </tr>
            </thead>
            <tbody>
              <tr v-if="tableData.length === 0">
                <td colspan="4" class="empty-cell">검색 결과가 없습니다.</td>
              </tr>
              <tr
                v-for="row in tableData"
                :key="row.no"
                class="clickable-row"
                @click="goToSend()"
              >
                <td>{{ row.no }}</td>
                <td>
                  바이어 발굴<br>
                  <span style="font-size:13px;color:#888;font-weight:400;">(발송건수: {{ row.count }})</span>
                </td>
                <td class="left">{{ row.title }}</td>
                <td>{{ row.date }}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- ── 페이지네이션 ── -->
        <div class="pagination">
          <button class="page-btn arrow" @click="goToPage(currentPage - 1)">&#8249;</button>
          <button
            v-for="page in totalPages"
            :key="page"
            class="page-btn"
            :class="{ active: page === currentPage }"
            @click="goToPage(page)"
          >{{ page }}</button>
          <button class="page-btn arrow" @click="goToPage(currentPage + 1)">&#8250;</button>
        </div>
      </div>

    </div>
  </main>
</template>

<style src="../assets/styles/bigbuyer-history.css" />
