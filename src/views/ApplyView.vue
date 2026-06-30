<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import LocBar from '../components/layout/LocBar.vue'

// LocBar 브레드크럼 데이터 — sub-apply.html loc-bar 선택지 그대로
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

// 폼 상태
const exhibitionNames = ref([])  // 체크박스 배열 v-model
const itemName = ref('')
const companyName = ref('')
const managerName = ref('')
const contact = ref('')
const email = ref('')
const extraNote = ref('')

// 글자 수 카운터 (computed)
const noteCounter = computed(() => `${extraNote.value.length}/1000`)

// 페이지 타이틀 스티키 상태 — :class 바인딩으로만 제어
const isLocBarSticky = ref(false)
const isTitleSticky = ref(false)
const titleTop = ref('')
let scrollHandler = null

onMounted(() => {
  // 스크롤 시점에 현재 DOM 기준으로 매번 판정 — SPA 라우트 전환 타이밍에 안전
  scrollHandler = () => {
    const locBarEl = document.querySelector('.loc-bar')
    if (!locBarEl) return
    const titleEl = document.querySelector('.page-title-area')
    // loc-bar(position:sticky)가 화면 상단 66px에 붙었는지로 판정
    // — offsetTop은 sticky 상태에서 부정확하므로 사용 금지
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

// 폼 유효성 검사 및 제출
function handleSubmit() {
  if (exhibitionNames.value.length === 0) {
    alert('참가 희망 사업을 선택하세요.')
    return
  }
  if (!companyName.value.trim()) {
    alert('참가기업명을 입력해 주세요.')
    return
  }
  if (!managerName.value.trim()) {
    alert('담당자명/직함을 입력해 주세요.')
    return
  }
  if (!contact.value.trim()) {
    alert('연락처를 입력해 주세요.')
    return
  }
  if (!email.value.trim()) {
    alert('이메일을 입력해 주세요.')
    return
  }
  alert('사업 참가 신청이 완료되었습니다.\n담당자 확인 후 연락드리겠습니다.')
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

  <!-- 메인 콘텐츠 -->
  <main class="page-content" id="main-content">
    <div class="wrap">

      <div class="page-title-area" :class="{ 'is-sticky': isTitleSticky }" :style="titleTop ? { top: titleTop } : {}">
        <h2>사업 참가 신청</h2>
        <p>아래 양식을 작성하여 사업 참가를 신청해 주세요. 담당자 확인 후 연락드립니다.</p>
      </div>

      <div class="change-notice">
        <i class="fa-solid fa-circle-info"></i>
        <span>항목들이 변경될 예정입니다. 참고 부탁드립니다.</span>
      </div>

      <div class="apply-form-wrap">

        <!-- 폼 상단 타이틀 -->
        <div class="form-title-bar">
          <span class="form-required-note"><span class="req-star">*</span> 표시는 필수 입력 항목입니다</span>
        </div>

        <!-- 사업명 (체크박스) -->
        <div class="form-row">
          <div class="form-label">사업명<span class="req">*</span></div>
          <div class="form-field">
            <div class="check-group">
              <label class="check-item"><input type="checkbox" v-model="exhibitionNames" value="sg"> 싱가포르 TECH WEEK (9/29~30)</label>
              <label class="check-item"><input type="checkbox" v-model="exhibitionNames" value="hk"> 홍콩 Beauty &amp; Wellness (8/13~17)</label>
            </div>
          </div>
        </div>

        <!-- 품목 -->
        <div class="form-row">
          <div class="form-label">품목</div>
          <div class="form-field">
            <input type="text" class="form-input" v-model="itemName" placeholder="품목을 입력하세요">
          </div>
        </div>

        <!-- 추가사항 섹션 -->
        <p class="form-section-title">추가사항<span style="font-size:14px;font-weight:500;color:#555;margin-left:10px;">(필수4, 선택1)</span></p>

        <!-- 참가기업명 -->
        <div class="form-row">
          <div class="form-label">참가기업명<span class="req">*</span></div>
          <div class="form-field">
            <input type="text" class="form-input" v-model="companyName" placeholder="참가기업명을 입력하세요">
          </div>
        </div>

        <!-- 담당자명/직함 -->
        <div class="form-row">
          <div class="form-label">담당자명/직함<span class="req">*</span></div>
          <div class="form-field">
            <input type="text" class="form-input" v-model="managerName" placeholder="담당자명 및 직함을 입력하세요">
          </div>
        </div>

        <!-- 연락처 -->
        <div class="form-row">
          <div class="form-label">연락처<span class="req">*</span></div>
          <div class="form-field">
            <input type="text" class="form-input" v-model="contact" placeholder="연락처를 입력하세요">
          </div>
        </div>

        <!-- 이메일 -->
        <div class="form-row">
          <div class="form-label">이메일<span class="req">*</span></div>
          <div class="form-field">
            <input type="text" class="form-input" v-model="email" placeholder="이메일 주소를 입력하세요">
          </div>
        </div>

        <!-- 추가 문의 내용 (선택) -->
        <div class="form-row" style="align-items:flex-start;">
          <div class="form-label" style="padding-top:30px;">추가 문의 내용</div>
          <div class="form-field" style="align-items:flex-start;border-bottom:none;">
            <div class="textarea-wrap">
              <textarea class="form-textarea" v-model="extraNote" placeholder="추가 문의 내용을 입력하세요" maxlength="1000"></textarea>
              <span class="char-counter">{{ noteCounter }}</span>
            </div>
          </div>
        </div>

        <!-- 제출 버튼 -->
        <div class="form-submit-area">
          <button type="button" class="btn-submit" @click="handleSubmit">사업 참가 신청</button>
        </div>

      </div>
      <!-- /.apply-form-wrap -->

    </div>
  </main>
</template>

<style src="../assets/styles/apply.css" />
