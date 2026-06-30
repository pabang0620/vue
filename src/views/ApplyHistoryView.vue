<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import LocBar from '../components/layout/LocBar.vue'

const router = useRouter()

// ── loc-bar 항목 ──
const locItems = [
  {
    label: '사업 참가신청',
    options: [
      { to: '/bm/big-data', label: '빅바이어마케팅' },
      { to: '/apply',           label: '사업 참가신청' },
    ],
    current: '사업 참가신청',
  },
  {
    label: '신청내역',
    options: [
      { to: '/apply',         label: '참가신청' },
      { to: '/apply/history', label: '신청내역' },
    ],
    current: '신청내역',
  },
]

// ── 원본 샘플 데이터 ──
const allData = ref([
  { no: 6, date: '2025.06.21', exhibition: ['싱가포르 TECH WEEK (9/29~30)', '홍콩 Beauty & Wellness (8/13~17)'], item: '뷰티 디바이스',  company: '㈜코스모텍',     manager: '한소희', statusLabel: '접수완료' },
  { no: 5, date: '2025.06.20', exhibition: ['싱가포르 TECH WEEK (9/29~30)'],                                     item: '스마트 센서',    company: '㈜테크이노베이션', manager: '김지훈', statusLabel: '접수완료' },
  { no: 4, date: '2025.06.18', exhibition: ['홍콩 Beauty & Wellness (8/13~17)'],                                  item: '기능성 화장품',  company: '㈜뷰티랩코리아', manager: '이수진', statusLabel: '검토중'   },
  { no: 3, date: '2025.06.15', exhibition: ['싱가포르 TECH WEEK (9/29~30)'],                                     item: 'IoT 디바이스',   company: '㈜글로벌커넥트', manager: '박민서', statusLabel: '승인'     },
  { no: 2, date: '2025.06.10', exhibition: ['홍콩 Beauty & Wellness (8/13~17)'],                                  item: '헤어케어 제품',  company: '㈜헤어플러스',   manager: '최유나', statusLabel: '승인'     },
  { no: 1, date: '2025.06.05', exhibition: ['싱가포르 TECH WEEK (9/29~30)'],                                     item: '반도체 부품',    company: '㈜세미텍',       manager: '정현우', statusLabel: '반려'     },
])

// ── 검색 입력 상태 ──
const searchItem    = ref('')
const searchCompany = ref('')
const searchManager = ref('')
const dateFrom      = ref('')
const dateTo        = ref('')

// ── 필터링 결과 (computed) ──
const filteredData = computed(() => {
  const item    = searchItem.value.trim().toLowerCase()
  const company = searchCompany.value.trim().toLowerCase()
  const manager = searchManager.value.trim().toLowerCase()
  const from    = dateFrom.value
  const to      = dateTo.value

  return allData.value.filter(d => {
    if (item    && d.item.toLowerCase().indexOf(item) < 0)       return false
    if (company && d.company.toLowerCase().indexOf(company) < 0) return false
    if (manager && d.manager.toLowerCase().indexOf(manager) < 0) return false
    if (from || to) {
      const dDate = d.date.replace(/\./g, '-')
      if (from && dDate < from) return false
      if (to   && dDate > to)   return false
    }
    return true
  })
})

// ── 검색 (filteredData가 computed로 자동 갱신되므로 트리거 역할) ──
function doSearch() {
  // computed filteredData가 현재 입력 상태를 자동 반영함
}

// ── 초기화 ──
function resetSearch() {
  searchItem.value    = ''
  searchCompany.value = ''
  searchManager.value = ''
  dateFrom.value      = ''
  dateTo.value        = ''
}

// ── 행 클릭 → 상세 페이지 ──
function goToDetail() {
  router.push('/apply/detail')
}

// ── 스티키 처리 ──
const isLocBarSticky = ref(false)
const isTitleSticky = ref(false)
const titleTop = ref('')
let scrollHandler = null

onMounted(() => {
  scrollHandler = () => {
    const locBarEl = document.querySelector('.loc-bar')
    if (!locBarEl) return
    const titleEl = document.querySelector('.page-title-area')
    const stuck = locBarEl.getBoundingClientRect().top <= 66
    isLocBarSticky.value = stuck
    isTitleSticky.value = stuck
    if (titleEl) titleTop.value = stuck ? (66 + locBarEl.offsetHeight) + 'px' : ''
  }
  scrollHandler()
  window.addEventListener('scroll', scrollHandler, { passive: true })
})

onUnmounted(() => {
  if (scrollHandler) window.removeEventListener('scroll', scrollHandler)
})
</script>

<template>
  <!-- ── 페이지 배너 ── -->
  <section class="page-banner" aria-label="페이지 배너">
    <div class="wrap banner-inner">
      <h1 class="banner-title">사업 참가신청</h1>
      <p class="banner-sub">국내외 사업 참가를 통해 글로벌 시장 진출의 기회를 잡으세요</p>
    </div>
  </section>

  <!-- ── 브레드크럼 ── -->
  <LocBar :items="locItems" :class="{ 'is-sticky': isLocBarSticky }" />

  <!-- ── 메인 콘텐츠 ── -->
  <main class="page-content">
    <div class="wrap">

      <div
        class="page-title-area"
        :class="{ 'is-sticky': isTitleSticky }"
        :style="titleTop ? { top: titleTop } : {}"
      >
        <h2>신청내역</h2>
        <p>사업 참가 신청 내역을 조회합니다.</p>
      </div>

      <div class="change-notice">
        <i class="fa-solid fa-circle-info"></i>
        <span>항목들이 변경될 수 있습니다. 참고 부탁드립니다.</span>
      </div>

      <!-- ── 검색 패널 ── -->
      <div class="search-panel">
        <div class="search-grid">

          <!-- 신청기간 -->
          <div class="search-row">
            <div class="search-label">신청기간</div>
            <div class="search-field">
              <div class="date-range">
                <input type="date" class="search-input" v-model="dateFrom">
                <span class="date-sep">~</span>
                <input type="date" class="search-input" v-model="dateTo">
              </div>
            </div>
          </div>

          <!-- 품목 -->
          <div class="search-row">
            <div class="search-label">품목</div>
            <div class="search-field">
              <input type="text" class="search-input" v-model="searchItem" placeholder="품목 입력">
            </div>
          </div>

          <!-- 기업명 -->
          <div class="search-row">
            <div class="search-label">기업명</div>
            <div class="search-field">
              <input type="text" class="search-input" v-model="searchCompany" placeholder="기업명 입력">
            </div>
          </div>

          <!-- 담당자명 -->
          <div class="search-row">
            <div class="search-label">담당자명</div>
            <div class="search-field">
              <input type="text" class="search-input" v-model="searchManager" placeholder="담당자명 입력">
            </div>
          </div>

        </div>

        <div class="search-btn-area">
          <button type="button" class="btn-reset" @click="resetSearch">
            <i class="fa-solid fa-rotate-left"></i> 초기화
          </button>
          <button type="button" class="btn-search" @click="doSearch">
            <i class="fa-solid fa-magnifying-glass"></i> 검색
          </button>
        </div>
      </div>

      <!-- ── 검색 결과 ── -->
      <div class="result-area">
        <div class="result-header">
          <p class="result-count">총 <strong>{{ filteredData.length }}</strong>건</p>
        </div>

        <div class="result-table-wrap">
          <table class="result-table">
            <thead>
              <tr>
                <th style="width:60px;">No</th>
                <th style="width:110px;">신청일</th>
                <th>사업명</th>
                <th style="width:140px;">품목명</th>
                <th style="width:160px;">참가기업명</th>
                <th style="width:120px;">담당자명</th>
                <th style="width:100px;">접수상태</th>
              </tr>
            </thead>
            <tbody>
              <template v-if="filteredData.length > 0">
                <tr
                  v-for="row in filteredData"
                  :key="row.no"
                  style="cursor:pointer;"
                  @click="goToDetail()"
                >
                  <td>{{ row.no }}</td>
                  <td>{{ row.date }}</td>
                  <td class="left" v-html="row.exhibition.join('<br>')"></td>
                  <td>{{ row.item }}</td>
                  <td>{{ row.company }}</td>
                  <td>{{ row.manager }}</td>
                  <td>{{ row.statusLabel }}</td>
                </tr>
              </template>
              <tr v-else>
                <td colspan="7" style="padding:60px 0;color:#aaa;font-size:16px;">검색 결과가 없습니다.</td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- 페이지네이션 -->
        <div class="pagination">
          <button class="page-btn arrow">&#8249;</button>
          <button class="page-btn active">1</button>
          <button class="page-btn">2</button>
          <button class="page-btn">3</button>
          <button class="page-btn arrow">&#8250;</button>
        </div>
      </div>

    </div>
  </main>
</template>

<style src="../assets/styles/apply-history.css" />
