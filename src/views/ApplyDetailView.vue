<script setup>
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import LocBar from '../components/layout/LocBar.vue'
import CompanyInfoReadonly from '../components/apply/CompanyInfoReadonly.vue'
import ProgramTableReadonly from '../components/apply/ProgramTableReadonly.vue'
import AttachmentListReadonly from '../components/apply/AttachmentListReadonly.vue'
import { PROGRAM_ROWS } from '../data/applyProgramData'
import { FILES } from '../data/applyFileData'

const router = useRouter()

// LocBar 브레드크럼 데이터 — 기존 구조 유지, current만 '신청 상세'
const locItems = [
  {
    label: '사업 참가신청',
    options: [
      { to: '/bm/big-data', label: '빅바이어마케팅' },
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

// ── 더미 상세 데이터 (새 /apply 스키마 기준) ────────────────────
// 실제 연동 시 라우트 파라미터(신청 ID)로 서버에서 조회한 결과로 교체한다.
const detail = {
  appliedAt: '2026.06.18',
  status: 'review',
  taskName: '차량용 경량화 알루미늄 부품의 북미·유럽 시장 진출 및 해외 판로개척을 위한 전시회 참가',
  companyInfo: {
    company: '㈜코스모텍',
    ceo: '김도현',
    foundDate: '2011.03.02',
    bizNo: '312-81-55620',
    mainProduct: '자동차 경량화 알루미늄 다이캐스팅 부품',
    bizType: '제조업 / 자동차부품 제조',
    addrHq: '충남 아산시 배방읍 희망로 42',
    addrFactory: '충남 천안시 서북구 성거읍 산단로 118',
    mgrName: '한소희',
    mgrDept: '해외사업팀 / 팀장',
    mgrTel: '010-3821-9047',
    mgrEmail: 'han.sohee@cosmotech.co.kr',
  },
  // 프로그램명 → 제출 상태(체크 여부/신청금액/작성 내용)
  programSubmit: {
    수출컨설팅: { checked: true, note: '북미 수출 시 관세 및 인증(FMVSS) 관련 자문이 필요합니다.' },
    '국제사업자번호 발급': { checked: true, note: '신규 발급 예정이며, EU 수출 시 EORI 번호로 활용할 계획입니다.' },
    '해외마케팅 자료 제작': { checked: true, amount: '2500', note: '영문·독일어 제품 카탈로그 및 소개 영상 제작을 희망합니다.' },
    '해외물류비 지원': { checked: true, amount: '4500', note: '북미 전시품 해상 운송비 지원을 요청드립니다.' },
    '국내·외 국제전시회 참가지원': { checked: true, amount: '4800', note: '독일 하노버 자동차부품 전시회 부스 참가를 희망합니다.' },
  },
  // 첨부파일 번호 → 제출 상태
  files: {
    '①': { submitted: true, fileName: '신청기업현황자료_코스모텍.pdf' },
    '②': { submitted: true, fileName: '정보활용동의서_코스모텍.pdf' },
    '③': { submitted: true, fileName: '법인인감증명서_코스모텍.pdf' },
    '④': { submitted: true, fileName: '재무제표_2024-2025_코스모텍.pdf' },
    '⑤': { submitted: true, fileName: '사업자등록증_코스모텍.pdf' },
    '⑥': { submitted: false, fileName: '' },
  },
}

// ── [섹션3] 기업정보 ──
const companyInfo = detail.companyInfo

// ── [섹션4] 지원 프로그램 — 정적 데이터 + 제출 상태 병합 ──
const programRows = PROGRAM_ROWS.map((r) => {
  const submitted = detail.programSubmit[r.name] ?? {}
  return { ...r, checked: !!submitted.checked, amount: submitted.amount ?? '', note: submitted.note ?? '' }
})
const selectedCount = computed(() => programRows.filter((r) => r.checked).length)
const sumAmount = computed(() =>
  programRows.reduce((sum, r) => {
    if (r.checked && r.scale !== null && r.amount !== '') {
      const v = Number(r.amount)
      if (!Number.isNaN(v)) return sum + v
    }
    return sum
  }, 0),
)

// ── [섹션5] 첨부파일 — 정적 6종 + 제출 상태 병합 ──
const fileRows = FILES.map((f) => ({ ...f, ...(detail.files[f.no] ?? { submitted: false, fileName: '' }) }))

// ── 상태 뱃지 ──
const STATUS_LABEL = { complete: '접수완료', review: '검토중', approved: '승인', rejected: '반려' }
const statusLabel = computed(() => STATUS_LABEL[detail.status] ?? '')
const statusClass = computed(() => ({
  'status-badge': true,
  complete: detail.status === 'complete',
  review: detail.status === 'review',
  approved: detail.status === 'approved',
  rejected: detail.status === 'rejected',
}))

// ── 브레드크럼 스티키 (ApplyView와 동일 패턴) ──
const isLocBarSticky = ref(false)
let scrollHandler = null

onMounted(() => {
  scrollHandler = () => {
    const locBarEl = document.querySelector('.apply-page .loc-bar')
    if (!locBarEl) return
    isLocBarSticky.value = locBarEl.getBoundingClientRect().top <= 66
  }
  scrollHandler()
  window.addEventListener('scroll', scrollHandler, { passive: true })
})

onUnmounted(() => {
  if (scrollHandler) window.removeEventListener('scroll', scrollHandler)
})

function goBack() {
  router.push('/apply/history')
}
</script>

<template>
  <div class="apply-page">
    <!-- 페이지 배너 — apply.css 그대로 재사용 -->
    <section class="page-banner" aria-label="페이지 배너">
      <div class="wrap page-banner-inner">
        <h1>사업 참가신청</h1>
        <p class="page-banner-sub">신청하신 사업 참가 내역의 상세 정보를 확인하세요</p>
      </div>
    </section>

    <!-- 브레드크럼 -->
    <LocBar :items="locItems" :class="{ 'is-sticky': isLocBarSticky }" />

    <div class="wrap">
      <!-- 상태 헤더: 신청일 + 상태 뱃지 -->
      <div class="detail-status-bar">
        <span class="detail-date">신청일 {{ detail.appliedAt }}</span>
        <span :class="statusClass">{{ statusLabel }}</span>
      </div>

      <!-- [섹션1] 과제명 -->
      <section class="form-section">
        <div class="section-head"><h2>과제명</h2></div>
        <div class="form-row">
          <div class="form-label">과제명</div>
          <div class="form-field">{{ detail.taskName }}</div>
        </div>
      </section>

      <!-- [섹션2] 기업정보 -->
      <section class="form-section">
        <div class="section-head"><h2>기업정보</h2></div>
        <CompanyInfoReadonly :info="companyInfo" />
      </section>

      <!-- [섹션3] 지원 프로그램 -->
      <section class="form-section">
        <div class="section-head">
          <h2>지원 프로그램</h2>
          <span class="req-note">신청 항목만 표시됩니다 (금액 단위: 천원)</span>
        </div>
        <ProgramTableReadonly :rows="programRows" :selected-count="selectedCount" :sum-amount="sumAmount" />
      </section>

      <!-- [섹션4] 첨부파일 -->
      <section class="form-section">
        <div class="section-head"><h2>첨부파일</h2></div>
        <AttachmentListReadonly :files="fileRows" />
      </section>

      <!-- 하단 -->
      <div class="submit-area">
        <button type="button" class="btn btn-line btn-list" @click="goBack">
          <i class="fa-solid fa-arrow-left"></i> 목록으로
        </button>
      </div>
    </div>
  </div>
</template>

<style src="../assets/styles/apply.css" />
<style src="../assets/styles/apply-detail.css" />
