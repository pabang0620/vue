<script setup>
// info는 부모(ApplyView)가 소유한 reactive 객체를 그대로 전달받아 v-model로 필드를 직접 갱신한다.
// (참가신청 폼처럼 필드 수가 많은 단일 엔티티 폼은 12개 프로퍼티 각각에 emit을 만드는 것보다
//  공유 reactive 객체 하나를 주고받는 편이 Vue 관용적이며 실용적이다)
defineProps({
  info: { type: Object, required: true },
})
</script>

<template>
  <div class="info-grid">
    <div class="info-cell">
      <label class="cell-label" for="company">신청기업명<span class="req">*</span></label>
      <div class="cell-input">
        <input id="company" v-model="info.company" type="text" class="form-input" required placeholder="기업명을 입력하세요" />
      </div>
    </div>
    <div class="info-cell">
      <label class="cell-label" for="ceo">대표자<span class="req">*</span></label>
      <div class="cell-input">
        <input id="ceo" v-model="info.ceo" type="text" class="form-input" required placeholder="대표자명" />
      </div>
    </div>
    <div class="info-cell">
      <label class="cell-label" for="foundDate">설립일<span class="req">*</span></label>
      <div class="cell-input">
        <input id="foundDate" v-model="info.foundDate" type="date" class="form-input" required />
      </div>
    </div>
    <div class="info-cell">
      <label class="cell-label" for="bizNo">사업자등록번호<span class="req">*</span></label>
      <div class="cell-input">
        <input id="bizNo" v-model="info.bizNo" type="text" class="form-input" required placeholder="000-00-00000" />
      </div>
    </div>
    <div class="info-cell">
      <label class="cell-label" for="mainProduct">주생산품<span class="req">*</span></label>
      <div class="cell-input">
        <input id="mainProduct" v-model="info.mainProduct" type="text" class="form-input" required placeholder="주요 생산 품목" />
      </div>
    </div>
    <div class="info-cell">
      <label class="cell-label" for="bizType">업태·업종<span class="req">*</span></label>
      <div class="cell-input">
        <input id="bizType" v-model="info.bizType" type="text" class="form-input" required placeholder="예) 제조업 / 자동차부품 제조" />
      </div>
    </div>
    <div class="info-cell span-2">
      <label class="cell-label" for="addrHq">소재지(본사)<span class="req">*</span></label>
      <div class="cell-input">
        <input id="addrHq" v-model="info.addrHq" type="text" class="form-input" required placeholder="본사 주소" />
      </div>
    </div>
    <div class="info-cell span-2">
      <label class="cell-label" for="addrFactory">소재지(공장·연구소)<span class="req">*</span></label>
      <div class="cell-input">
        <input id="addrFactory" v-model="info.addrFactory" type="text" class="form-input" required placeholder="공장 / 연구소 주소" />
      </div>
    </div>
    <div class="info-cell">
      <label class="cell-label" for="mgrName">담당자 성명<span class="req">*</span></label>
      <div class="cell-input">
        <input id="mgrName" v-model="info.mgrName" type="text" class="form-input" required placeholder="담당자명" />
      </div>
    </div>
    <div class="info-cell">
      <label class="cell-label" for="mgrDept">부서 및 직위<span class="req">*</span></label>
      <div class="cell-input">
        <input id="mgrDept" v-model="info.mgrDept" type="text" class="form-input" required placeholder="예) 해외사업팀 / 과장" />
      </div>
    </div>
    <div class="info-cell">
      <label class="cell-label" for="mgrTel">연락처<span class="req">*</span></label>
      <div class="cell-input">
        <input id="mgrTel" v-model="info.mgrTel" type="tel" class="form-input" required placeholder="010-0000-0000" />
      </div>
    </div>
    <div class="info-cell">
      <label class="cell-label" for="mgrEmail">전자메일<span class="req">*</span></label>
      <div class="cell-input">
        <input id="mgrEmail" v-model="info.mgrEmail" type="email" class="form-input" required placeholder="name@company.com" />
      </div>
    </div>
  </div>
</template>
