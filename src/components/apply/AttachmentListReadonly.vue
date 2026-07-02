<script setup>
// AttachmentList.vue(신청 폼)와 동일한 항목 구성을 읽기전용으로 재구성한다.
// files: FILES + 제출 상태(submitted/fileName)가 병합된 배열
defineProps({
  files: { type: Array, required: true },
})

function onDownload(f) {
  // TODO: 실제 첨부파일 다운로드 API 연동 전까지는 시연용 알림으로 대체
  alert(`${f.fileName} 다운로드 (시연)`)
}
</script>

<template>
  <div class="file-list">
    <div v-for="f in files" :key="f.no" class="file-row">
      <div class="file-left">
        <span class="file-name">
          <span class="file-no">{{ f.no }}</span>
          <span class="doc">{{ f.doc }}</span>
          <span v-if="f.sub" class="sub">{{ f.sub }}</span>
          <span v-if="f.required" class="req">*</span>
          <span v-else class="opt">(해당 시)</span>
        </span>
      </div>
      <div class="file-actions">
        <template v-if="f.submitted">
          <button type="button" class="file-dl-link" :aria-label="`${f.doc} 제출본 다운로드`" @click="onDownload(f)">
            <i class="fa-solid fa-download" aria-hidden="true"></i>
            <span class="pname-text">{{ f.fileName }}</span>
          </button>
          <span class="file-status done">제출완료</span>
        </template>
        <span v-else class="file-status">미제출</span>
      </div>
    </div>
  </div>
</template>
