<script setup>
// 상세(읽기전용) 화면용 — CompanyInfoForm.vue와 동일한 필드 구성·순서를 유지하되
// <input> 대신 제출된 값을 텍스트로만 표시한다.
defineProps({
  info: { type: Object, required: true },
})
</script>

<template>
  <div class="info-grid">
    <div class="info-cell">
      <span class="cell-label">신청기업명</span>
      <div class="cell-input"><span class="cell-value">{{ info.company }}</span></div>
    </div>
    <div class="info-cell">
      <span class="cell-label">대표자</span>
      <div class="cell-input"><span class="cell-value">{{ info.ceo }}</span></div>
    </div>
    <div class="info-cell">
      <span class="cell-label">설립일</span>
      <div class="cell-input"><span class="cell-value">{{ info.foundDate }}</span></div>
    </div>
    <div class="info-cell">
      <span class="cell-label">사업자등록번호</span>
      <div class="cell-input"><span class="cell-value">{{ info.bizNo }}</span></div>
    </div>
    <div class="info-cell">
      <span class="cell-label">주생산품</span>
      <div class="cell-input"><span class="cell-value">{{ info.mainProduct }}</span></div>
    </div>
    <div class="info-cell">
      <span class="cell-label">업태·업종</span>
      <div class="cell-input"><span class="cell-value">{{ info.bizType }}</span></div>
    </div>
    <div class="info-cell span-2">
      <span class="cell-label">소재지(본사)</span>
      <div class="cell-input"><span class="cell-value">{{ info.addrHq }}</span></div>
    </div>
    <div class="info-cell span-2">
      <span class="cell-label">소재지(공장·연구소)</span>
      <div class="cell-input"><span class="cell-value">{{ info.addrFactory }}</span></div>
    </div>
    <div class="info-cell">
      <span class="cell-label">담당자 성명</span>
      <div class="cell-input"><span class="cell-value">{{ info.mgrName }}</span></div>
    </div>
    <div class="info-cell">
      <span class="cell-label">부서 및 직위</span>
      <div class="cell-input"><span class="cell-value">{{ info.mgrDept }}</span></div>
    </div>
    <div class="info-cell">
      <span class="cell-label">연락처</span>
      <div class="cell-input"><span class="cell-value">{{ info.mgrTel }}</span></div>
    </div>
    <div class="info-cell">
      <span class="cell-label">전자메일</span>
      <div class="cell-input"><span class="cell-value">{{ info.mgrEmail }}</span></div>
    </div>
  </div>
</template>
