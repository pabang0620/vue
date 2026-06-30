<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import LocBar from '../components/layout/LocBar.vue'

const router = useRouter()

// ── 더미 상세 데이터 ────────────────────────────────────────
const detail = ref({
  appliedAt: '2025.06.21',
  status: 'complete',
  bizChips: ['싱가포르 TECH WEEK (9/29~30)', '홍콩 Beauty & Wellness (8/13~17)'],
  item: '뷰티 디바이스',
  companyName: '㈜코스모텍',
  managerName: '한소희 / 마케팅팀 팀장',
  phone: '010-3821-9047',
  email: 'han.sohee@cosmotech.co.kr',
  note: '부스 위치 관련 문의드립니다.\n가능하면 입구 쪽 배치를 희망하며, 전기 콘센트(220V) 2구 이상 필요합니다.\n홍콩 사업의 경우 2인 참가 예정이오니 별도 안내 부탁드립니다.',
})

// ── 상태 뱃지 ───────────────────────────────────────────────
const STATUS_LABEL = {
  complete: '접수완료',
  review: '검토중',
  approved: '승인',
  rejected: '반려',
}

const statusLabel = computed(() => STATUS_LABEL[detail.value.status] ?? '')

const statusClass = computed(() => ({
  'status-badge': true,
  complete: detail.value.status === 'complete',
  review: detail.value.status === 'review',
  approved: detail.value.status === 'approved',
  rejected: detail.value.status === 'rejected',
}))

// 추가 문의 내용 줄바꿈 → HTML <br>
const noteHtml = computed(() =>
  detail.value.note.split('\n').join('<br>')
)

// ── 브레드크럼 항목 ──────────────────────────────────────────
const locItems = [
  {
    label: '사업 참가신청',
    options: [
      { to: '/bigbuyer/finder', label: '빅바이어마케팅' },
      { to: '/apply', label: '사업 참가신청' },
    ],
    current: '사업 참가신청',
  },
  {
    label: '신청 상세',
    options: [
      { to: '/apply', label: '참가신청' },
      { to: '/apply/history', label: '신청내역' },
      { to: '/apply/detail', label: '신청 상세' },
    ],
    current: '신청 상세',
  },
]

// ── 페이지 타이틀 스티키 ─────────────────────────────────────
const isLocBarSticky = ref(false)
const isPageTitleSticky = ref(false)
const titleTop = ref('')
let scrollHandler = null

onMounted(() => {
  scrollHandler = () => {
    const locBarEl = document.querySelector('.loc-bar')
    if (!locBarEl) return
    const titleEl = document.querySelector('.page-title-area')
    const stuck = locBarEl.getBoundingClientRect().top <= 66
    isLocBarSticky.value = stuck
    isPageTitleSticky.value = stuck
    if (titleEl) titleTop.value = stuck ? (66 + locBarEl.offsetHeight) + 'px' : ''
  }
  scrollHandler()
  window.addEventListener('scroll', scrollHandler, { passive: true })
})

onUnmounted(() => {
  if (scrollHandler) window.removeEventListener('scroll', scrollHandler)
})

// ── 뒤로가기 ─────────────────────────────────────────────────
function goBack() {
  router.push('/apply/history')
}
</script>

<template>
  <!-- 페이지 배너 -->
  <section class="page-banner" aria-label="페이지 배너">
    <div class="wrap banner-inner">
      <h1 class="banner-title">사업 참가신청</h1>
      <p class="banner-sub">국내외 사업 참가를 통해 글로벌 시장 진출의 기회를 잡으세요</p>
    </div>
  </section>

  <!-- 브레드크럼 -->
  <LocBar :items="locItems" :class="{ 'is-sticky': isLocBarSticky }" />

  <!-- 본문 -->
  <main class="page-content">
    <div class="wrap">

      <div
        class="page-title-area"
        :class="{ 'is-sticky': isPageTitleSticky }"
        :style="titleTop ? { top: titleTop } : {}"
      >
        <h2>사업 참가 신청 정보</h2>
        <p>사업 참가 신청 내역의 상세 정보를 확인합니다.</p>
      </div>

      <!-- 상세 폼 -->
      <div class="detail-form-wrap">

        <div class="form-title-bar">
          <div class="form-title-meta">
            <span>{{ detail.appliedAt }}</span>
            <span :class="statusClass">{{ statusLabel }}</span>
          </div>
        </div>

        <!-- 사업명 -->
        <div class="form-row">
          <div class="form-label">사업명</div>
          <div class="form-field">
            <span
              v-for="chip in detail.bizChips"
              :key="chip"
              class="biz-chip"
            >{{ chip }}</span>
          </div>
        </div>

        <!-- 품목 -->
        <div class="form-row">
          <div class="form-label">품목</div>
          <div class="form-field">{{ detail.item }}</div>
        </div>

        <!-- 추가사항 섹션 -->
        <p class="form-section-title">추가사항</p>

        <!-- 참가기업명 -->
        <div class="form-row">
          <div class="form-label">참가기업명</div>
          <div class="form-field">{{ detail.companyName }}</div>
        </div>

        <!-- 담당자명/직함 -->
        <div class="form-row">
          <div class="form-label">담당자명/직함</div>
          <div class="form-field">{{ detail.managerName }}</div>
        </div>

        <!-- 연락처 -->
        <div class="form-row">
          <div class="form-label">연락처</div>
          <div class="form-field">{{ detail.phone }}</div>
        </div>

        <!-- 이메일 -->
        <div class="form-row">
          <div class="form-label">이메일</div>
          <div class="form-field">{{ detail.email }}</div>
        </div>

        <!-- 추가 문의 내용 -->
        <div class="form-row form-row--top">
          <div class="form-label form-label--top">추가 문의 내용</div>
          <!-- v-html: 줄바꿈을 <br>로 변환한 안전한 더미 문자열 렌더링 -->
          <div class="form-field multiline form-field--last" v-html="noteHtml" />
        </div>

        <!-- 하단 버튼 -->
        <div class="detail-btn-area">
          <button type="button" class="btn-back" @click="goBack">
            <i class="fa-solid fa-arrow-left"></i> 목록으로
          </button>
        </div>

      </div>
      <!-- /.detail-form-wrap -->

    </div>
  </main>
</template>

<style src="../assets/styles/apply-detail.css" />
