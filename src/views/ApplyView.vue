<script setup>
import { computed, onMounted, onUnmounted, reactive, ref } from 'vue'
import LocBar from '../components/layout/LocBar.vue'
import ApplySidebar from '../components/apply/ApplySidebar.vue'
import ProgramTable from '../components/apply/ProgramTable.vue'
import AttachmentList from '../components/apply/AttachmentList.vue'
import CompanyInfoForm from '../components/apply/CompanyInfoForm.vue'
import { SECTIONS } from '../data/applySections'
import { PROGRAM_ROWS } from '../data/applyProgramData'
import { fmt } from '../utils/applyFormat'

// LocBar 브레드크럼 데이터 — 기존 그대로 유지
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
    label: '참가신청',
    options: [
      { to: '/apply', label: '참가신청' },
      { to: '/apply/history', label: '신청내역' },
    ],
    current: '참가신청',
  },
]

// ── [섹션2] 과제명 ──
const taskName = ref('')

// ── [섹션3] 기업정보 (12필드, 자식 CompanyInfoForm과 공유하는 reactive 객체) ──
const companyInfo = reactive({
  company: '', ceo: '', foundDate: '', bizNo: '', mainProduct: '', bizType: '',
  addrHq: '', addrFactory: '', mgrName: '', mgrDept: '', mgrTel: '', mgrEmail: '',
})

// ── [섹션4] 지원 프로그램 상태 (정적 데이터 + 사용자 입력 상태 병합) ──
const programRows = reactive(
  PROGRAM_ROWS.map((r) => ({ ...r, checked: !!r.must, amount: '', note: '' })),
)
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

function handleToggle(idx) {
  const row = programRows[idx]
  if (row.must) return // 필수신청 항목은 해제 불가
  row.checked = !row.checked
  if (!row.checked) {
    // 체크 해제 시 금액 입력값 초기화 (원본 시안 동작 그대로)
    row.amount = ''
  }
}
function handleAmount(idx, value) {
  programRows[idx].amount = value
}
function handleNote(idx, value) {
  programRows[idx].note = value
}

// ── 목차 scrollspy + 진행바 (사이드바/모바일 상단바 동기화) ──
const activeSection = ref(SECTIONS[0].id)
const sectionRefs = {}
function setSectionRef(id, el) {
  if (el) sectionRefs[id] = el
}

let observer = null

// 헤더(66px 고정) + LocBar + 모바일 상단바(표시된 경우) 실측 높이만큼 여유를 두고 스크롤 이동
// — 브레이크포인트마다 LocBar/상단바 높이가 달라 고정값 대신 실제 DOM을 측정한다
function scrollToSection(id) {
  const el = sectionRefs[id]
  if (!el) return
  const locBarEl = document.querySelector('.apply-page .loc-bar')
  const mobileStatusEl = document.querySelector('.apply-page .mobile-status')
  const headerH = 66
  const locBarH = locBarEl ? locBarEl.getBoundingClientRect().height : 0
  const mobileStatusVisible = mobileStatusEl && getComputedStyle(mobileStatusEl).display !== 'none'
  const mobileStatusH = mobileStatusVisible ? mobileStatusEl.getBoundingClientRect().height : 0
  const offset = headerH + locBarH + mobileStatusH + 16
  const top = el.getBoundingClientRect().top + window.scrollY - offset
  window.scrollTo({ top, behavior: 'smooth' })
  activeSection.value = id
}

// 페이지 타이틀/LocBar 스티키 상태 — :class 바인딩으로만 제어
const isLocBarSticky = ref(false)
let scrollHandler = null

onMounted(() => {
  scrollHandler = () => {
    const locBarEl = document.querySelector('.loc-bar')
    if (!locBarEl) return
    // loc-bar(position:sticky)가 화면 상단 66px에 붙었는지로 판정
    // — offsetTop은 sticky 상태에서 부정확하므로 사용 금지
    isLocBarSticky.value = locBarEl.getBoundingClientRect().top <= 66
  }
  scrollHandler()
  window.addEventListener('scroll', scrollHandler, { passive: true })

  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) activeSection.value = entry.target.id
      })
    },
    { rootMargin: '-40% 0px -55% 0px', threshold: 0 },
  )
  SECTIONS.forEach((s) => {
    const el = sectionRefs[s.id]
    if (el) observer.observe(el)
  })
})

onUnmounted(() => {
  if (scrollHandler) window.removeEventListener('scroll', scrollHandler)
  if (observer) observer.disconnect()
})

// ── 제출 및 유효성 검사 ──
const REQUIRED_INFO_FIELDS = [
  ['company', '신청기업명'], ['ceo', '대표자'], ['foundDate', '설립일'], ['bizNo', '사업자등록번호'],
  ['mainProduct', '주생산품'], ['bizType', '업태·업종'], ['addrHq', '소재지(본사)'],
  ['addrFactory', '소재지(공장·연구소)'], ['mgrName', '담당자 성명'], ['mgrDept', '부서 및 직위'],
  ['mgrTel', '연락처'], ['mgrEmail', '전자메일'],
]

function handleSubmit() {
  if (!taskName.value.trim()) {
    alert('과제명을 입력해 주세요.')
    return
  }
  for (const [key, label] of REQUIRED_INFO_FIELDS) {
    if (!String(companyInfo[key] ?? '').trim()) {
      alert(`${label}을(를) 입력해 주세요.`)
      return
    }
  }
  alert('사업 참가 신청이 완료되었습니다.\n담당자 확인 후 연락드리겠습니다.')
}
</script>

<template>
  <div class="apply-page">
    <!-- 페이지 배너 — /bm/big-data 배너 구조 그대로, 텍스트·색상만 교체 -->
    <section class="page-banner" aria-label="페이지 배너">
      <div class="wrap page-banner-inner">
        <h1>사업 참가신청</h1>
        <p class="page-banner-sub">자동차 융합부품 세계화 지원사업 참가로 글로벌 시장 진출의 기회를 잡으세요</p>
      </div>
    </section>

    <!-- 브레드크럼 -->
    <LocBar :items="locItems" :class="{ 'is-sticky': isLocBarSticky }" />

    <!-- 모바일 상단 신청상황 바 (≤900px) -->
    <div class="mobile-status">
      <nav class="m-toc" aria-label="목차">
        <a
          v-for="s in SECTIONS"
          :key="s.id"
          class="m-tab"
          :class="{ active: activeSection === s.id }"
          :href="'#' + s.id"
          @click.prevent="scrollToSection(s.id)"
        >
          <span class="n">{{ s.num }}</span> {{ s.tab }}
        </a>
      </nav>
      <div class="m-summary">
        <span class="m-prog">선택 <b>{{ selectedCount }}건</b></span>
        <span>지원신청금액 <b>{{ fmt(sumAmount) }} 천원</b></span>
      </div>
    </div>

    <div class="layout">
      <!-- 좌측: 폼 콘텐츠 -->
      <div class="form-col">
        <form @submit.prevent>

          <!-- [섹션1] 사업 소개 -->
          <section id="sec1" class="form-section" :ref="(el) => setSectionRef('sec1', el)">
            <div class="section-head"><h2>사업 소개</h2></div>
            <div class="intro-card">
              <span class="intro-name">2026년도 자동차 융합부품 세계화 지원사업</span>
              <p class="intro-desc">
                충남 자동차부품 기업의 내수 중심 구조를 탈피하고 수출 중소·중견기업으로 육성하기 위해,
                해외 마케팅 인프라 구축부터 수출 전략 수립, 바이어 발굴, 해외 진출까지 전주기적으로 지원하는 사업입니다.
              </p>
              <div class="intro-meta">
                <b>수행기간</b>
                <span class="period-value">협약일 ~ 2026. 10. 31.</span>
              </div>
            </div>
          </section>

          <!-- [섹션2] 과제명 -->
          <section id="sec2" class="form-section" :ref="(el) => setSectionRef('sec2', el)">
            <div class="section-head">
              <h2>과제명</h2>
              <span class="req-note"><span class="req-star">*</span>필수 입력 항목입니다</span>
            </div>
            <div class="form-row">
              <label class="form-label" for="taskName">과제명<span class="req">*</span></label>
              <div class="form-field">
                <input
                  id="taskName"
                  v-model="taskName"
                  type="text"
                  class="form-input"
                  required
                  placeholder="○○○제품의 유럽시장 진출 및 해외 판로개척을 위한 전시회 참가"
                />
                <p class="form-note">※ 지원 분야와 관련하여 수행하고자 하는 과제를 구체적으로 작성해 주세요.</p>
              </div>
            </div>
          </section>

          <!-- [섹션3] 기업정보 -->
          <section id="sec3" class="form-section" :ref="(el) => setSectionRef('sec3', el)">
            <div class="section-head">
              <h2>기업정보</h2>
              <span class="req-note"><span class="req-star">*</span>모든 항목 필수 입력</span>
            </div>
            <CompanyInfoForm :info="companyInfo" />
          </section>

          <!-- [섹션4] 지원 프로그램 선택 -->
          <section id="sec4" class="form-section" :ref="(el) => setSectionRef('sec4', el)">
            <div class="section-head">
              <h2>지원 프로그램 선택</h2>
              <span class="req-note">신청할 항목만 체크하세요 (금액 단위: 천원)</span>
            </div>
            <ProgramTable
              :rows="programRows"
              :selected-count="selectedCount"
              :sum-amount="sumAmount"
              @toggle="handleToggle"
              @amount="handleAmount"
              @note="handleNote"
            />
          </section>

          <!-- [섹션5] 첨부파일 -->
          <section id="sec5" class="form-section" :ref="(el) => setSectionRef('sec5', el)">
            <div class="section-head">
              <h2>첨부파일</h2>
              <span class="req-note"><span class="req-star">*</span>①~⑤ 필수 · ⑥ 해당 시 제출</span>
            </div>
            <p class="attach-guide">
              <span><b>항목명</b>을 클릭하면 해당 서식(양식)을 다운로드할 수 있습니다. 서식 작성 후 우측에서 문서를 업로드해 주세요.</span>
            </p>
            <AttachmentList />
            <div class="file-notes">
              <p><span>※</span><span>간접지원 신청 시 공급처 비용 견적서 및 사업자등록증을 추가 제출해야 합니다.</span></p>
              <p><span>※</span><span>붙임 서류는 발급 6개월 이내본으로 준비해 주세요.</span></p>
            </div>
          </section>

          <!-- 제출 -->
          <div class="submit-area">
            <button type="button" class="btn-submit" @click="handleSubmit">사업 참가 신청</button>
          </div>

        </form>
      </div>

      <!-- 우측: sticky 신청상황 사이드바 -->
      <ApplySidebar
        :active-section="activeSection"
        :selected-count="selectedCount"
        @navigate="scrollToSection"
      />
    </div>
  </div>
</template>

<style src="../assets/styles/apply.css" />
