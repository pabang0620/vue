<script setup>
import { ref } from 'vue'

const emit = defineEmits(['open-my-files'])

const selectedFiles = ref([])
const fileInput = ref(null)

function triggerFileInput() {
  fileInput.value.click()
}

function handleFileChange(e) {
  Array.from(e.target.files).forEach(f => {
    selectedFiles.value.push(f)
  })
  e.target.value = ''
}

function removeFile(idx) {
  selectedFiles.value.splice(idx, 1)
}

defineExpose({ selectedFiles })
</script>

<template>
  <div>
    <div class="file-attach-wrap">
      <button type="button" class="btn-file-choose" @click="triggerFileInput">
        <i class="fa-solid fa-paperclip"></i> 파일 선택
      </button>
      <button type="button" class="btn-file-choose" @click="emit('open-my-files')">
        <i class="fa-solid fa-folder-open"></i> 나의 파일함
      </button>
      <span class="file-attach-hint" style="margin-top:0;">
        pdf, jpg, jpeg, gif, png, txt, html, xlsx, xls, csv, ppt, pptx, doc, docx 파일만 첨부 가능합니다.
      </span>
      <input
        ref="fileInput"
        type="file"
        multiple
        accept=".pdf,.jpg,.jpeg,.gif,.png,.txt,.html,.xlsx,.xls,.csv,.ppt,.pptx,.doc,.docx"
        @change="handleFileChange"
      >
    </div>
    <div class="file-list">
      <div
        v-for="(file, idx) in selectedFiles"
        :key="idx"
        class="file-list-item"
      >
        <i class="fa-solid fa-file"></i>
        <span>{{ file.name }}</span>
        <button type="button" class="file-remove" aria-label="삭제" @click="removeFile(idx)">×</button>
      </div>
    </div>
  </div>
</template>
