<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useBuyerSearchStore } from '../stores/buyerSearch.js'
import LocBar from '../components/layout/LocBar.vue'
import MessageEditor from '../components/send/MessageEditor.vue'
import FileAttach from '../components/send/FileAttach.vue'
import TemplateModal from '../components/send/TemplateModal.vue'
import MyFilesModal from '../components/send/MyFilesModal.vue'

const store = useBuyerSearchStore()

// ── 폼 상태 ────────────────────────────────────────────────
const msgTitle = ref('')
const sendCount = ref('')

// ── 모달 표시 상태 ──────────────────────────────────────────
const showTemplateModal = ref(false)
const showMyFilesModal = ref(false)
const showTipModal = ref(false)

// ── 발송 버튼 라벨 ─────────────────────────────────────────
const sendBtnLabel = computed(() => '마케팅 메시지 ' + (sendCount.value || '0') + '건 발송')

// ── 임시저장 ───────────────────────────────────────────────
function handleTempSave() {
  alert('임시저장 되었습니다.')
}

// ── 발송 ───────────────────────────────────────────────────
function handleSend() {
  if (!sendCount.value) {
    alert('발송 건수를 선택해 주세요.')
    return
  }
  alert(sendCount.value + '건 발송을 진행합니다.')
}

// ── 브레드크럼 항목 ─────────────────────────────────────────
const locItems = [
  {
    label: '빅바이어마케팅',
    options: [
      { to: '/bm/big-data', label: '빅바이어마케팅' },
      { to: '/apply', label: '사업 참가신청' },
    ],
    current: '빅바이어마케팅',
  },
  {
    label: '마케팅 메시지 발송',
    options: [
      { to: '/bm/big-data', label: '빅데이터 바이어 발굴' },
      { to: '/bm/push', label: '마케팅 메시지 발송' },
      { to: '/bigbuyer/history', label: '임시저장내역' },
    ],
    current: '마케팅 메시지 발송',
  },
]

// ── sticky 상태 ────────────────────────────────────────────
const isLocBarSticky = ref(false)
const isPageTitleSticky = ref(false)
const pageTitleTop = ref('')
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
    isPageTitleSticky.value = stuck
    if (titleEl) pageTitleTop.value = stuck ? (66 + locBarEl.offsetHeight) + 'px' : ''
  }
  window.addEventListener('scroll', scrollHandler, { passive: true })
  scrollHandler()
})

onUnmounted(() => {
  if (scrollHandler) window.removeEventListener('scroll', scrollHandler)
})
</script>

<template>
  <!-- 페이지 배너 -->
  <section class="page-banner" aria-label="페이지 배너">
    <div class="wrap banner-inner">
      <h1 class="banner-title">빅바이어 마케팅</h1>
      <p class="banner-sub">발굴된 바이어에게 마케팅 메시지를 발송합니다</p>
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
        :style="pageTitleTop ? { top: pageTitleTop } : {}"
      >
        <h2>마케팅 메시지 발송</h2>
        <p>발굴된 바이어에게 전달할 마케팅 메시지를 작성하고 발송하세요.</p>
      </div>

      <!-- ── 상단 액션 바 ── -->
      <div class="send-action-bar">
        <!-- 좌측 버튼 4개 -->
        <div class="send-action-left">
          <button type="button" class="btn-outline" @click="handleTempSave">
            <i class="fa-regular fa-floppy-disk"></i> 임시저장
          </button>
          <RouterLink to="/bigbuyer/history" class="btn-outline">
            <i class="fa-solid fa-clock-rotate-left"></i> 임시저장내역
          </RouterLink>
          <button type="button" class="btn-outline" @click="showTemplateModal = true">
            <i class="fa-solid fa-layer-group"></i> 템플릿
          </button>
          <button type="button" class="btn-outline" @click="showTipModal = true">
            <i class="fa-regular fa-lightbulb"></i> 작성팁
          </button>
        </div>

        <!-- 우측: 건수 선택 + 발송 버튼 -->
        <div class="send-action-right">
          <select class="send-count-select-top" v-model="sendCount">
            <option value="">건수 선택</option>
            <option value="10">10건</option>
            <option value="30">30건</option>
            <option value="50">50건</option>
            <option value="100">100건</option>
            <option value="150">150건</option>
          </select>
          <button type="button" class="btn-send-primary" @click="handleSend">
            <i class="fa-solid fa-paper-plane"></i>
            <span>{{ sendBtnLabel }}</span>
          </button>
        </div>
      </div>

      <!-- ── 폼 영역 ── -->
      <div class="send-form-card">

        <!-- 검색어 (읽기 전용) -->
        <div class="form-row">
          <div class="form-label">검색어</div>
          <div class="form-field" style="flex-wrap: wrap; gap: 8px;">
            <template v-if="store.keywords.length">
              <span v-for="(kw, idx) in store.keywords" :key="idx" class="criteria-kw-chip">{{ kw }}</span>
            </template>
            <template v-else>
              <span class="readonly-note">선택된 검색어가 없습니다.</span>
            </template>
          </div>
        </div>

        <!-- 카테고리 (읽기 전용) -->
        <div class="form-row">
          <div class="form-label">카테고리</div>
          <div class="form-field" style="flex-wrap: wrap; gap: 8px;">
            <template v-if="store.catCombos.length">
              <span
                v-for="(combo, idx) in store.catCombos"
                :key="idx"
                class="criteria-cat-chip"
              >{{ combo.cat1 }}<template v-if="combo.cat2"> &gt; {{ combo.cat2 }}</template><template v-if="combo.cat3"> &gt; {{ combo.cat3 }}</template></span>
            </template>
            <template v-else>
              <span class="criteria-cat-chip">Home &amp; Kitchen &gt; Home &gt; Bathroom</span>
            </template>
            <span class="readonly-note">(빅데이터 바이어 발굴에서 선택된 항목으로 수정 불가)</span>
          </div>
        </div>

        <!-- 국가 (읽기 전용) -->
        <div class="form-row">
          <div class="form-label">국가</div>
          <div class="form-field" style="flex-wrap: wrap; gap: 8px;">
            <template v-if="Object.keys(store.selectedCountries).length">
              <span
                v-for="(name, code) in store.selectedCountries"
                :key="code"
                class="criteria-country-chip"
              >{{ name }}</span>
            </template>
            <template v-else>
              <span class="criteria-country-chip">미국</span>
              <span class="criteria-country-chip">일본</span>
              <span class="criteria-country-chip">독일</span>
            </template>
            <span class="readonly-note">(빅데이터 바이어 발굴에서 선택된 항목으로 수정 불가)</span>
          </div>
        </div>

        <!-- 발신자 -->
        <div class="form-row">
          <div class="form-label">발신자</div>
          <div class="form-field">
            <input
              type="text"
              class="form-input"
              value="sender@example.com"
              readonly
              style="background:#F5F7FA; color:#4A5A6A; cursor:default;"
            >
          </div>
        </div>

        <!-- 파일첨부 -->
        <div class="form-row">
          <div class="form-label">파일첨부</div>
          <div class="form-field">
            <FileAttach @open-my-files="showMyFilesModal = true" />
          </div>
        </div>

        <!-- 제목 -->
        <div class="form-row">
          <div class="form-label">제목</div>
          <div class="form-field">
            <input
              v-model="msgTitle"
              type="text"
              class="form-input"
              placeholder="메시지 제목을 입력하세요"
            >
          </div>
        </div>

        <!-- 내용 -->
        <div class="form-row">
          <div class="form-label" style="align-items: flex-start; padding-top: 20px;">내용</div>
          <div class="form-field align-top" style="padding-top: 18px;">
            <MessageEditor />
          </div>
        </div>

      </div>
      <!-- /send-form-card -->

      <!-- ── 하단 버튼 영역 ── -->
      <div class="form-bottom-btns">
        <button type="button" class="btn-bottom-outline" @click="handleTempSave">
          <i class="fa-regular fa-floppy-disk"></i> 임시저장
        </button>
        <select class="send-count-select" v-model="sendCount">
          <option value="">발송 건수 선택</option>
          <option value="10">10건</option>
          <option value="30">30건</option>
          <option value="50">50건</option>
          <option value="100">100건</option>
          <option value="150">150건</option>
        </select>
        <button type="button" class="btn-bottom-primary" @click="handleSend">
          <i class="fa-solid fa-paper-plane"></i>
          <span>{{ sendBtnLabel }}</span>
        </button>
      </div>

    </div>
  </main>

  <!-- ── 작성팁 모달 ── -->
  <div
    :class="['modal-overlay', { hidden: !showTipModal }]"
    @click.self="showTipModal = false"
  >
    <div class="tip-modal-box">
      <div class="modal-hd">
        <h3>
          <i class="fa-regular fa-lightbulb" style="color:#E07B00;margin-right:8px;"></i>작성팁
        </h3>
        <button type="button" class="modal-close" @click="showTipModal = false">×</button>
      </div>
      <div class="tip-img-wrap">
        <p style="font-size:14px;color:#4A5A6A;margin-bottom:14px;">"샘플 다운로드"를 통해 아래 양식을 이용할 수 있습니다.</p>
        <img src="/linker_eDM_des.png" alt="eDM 작성팁">
      </div>
      <div class="tip-modal-ft">
        <a href="/linker_eDM_sample.pptx" download class="btn-download">
          <i class="fa-solid fa-download"></i> 샘플 파일 다운로드
        </a>
      </div>
    </div>
  </div>

  <!-- ── 템플릿 모달 ── -->
  <TemplateModal
    :show="showTemplateModal"
    @close="showTemplateModal = false"
  />

  <!-- ── 나의 파일함 모달 ── -->
  <MyFilesModal
    :show="showMyFilesModal"
    @close="showMyFilesModal = false"
  />
</template>

<style src="../assets/styles/bigbuyer-send.css" />
