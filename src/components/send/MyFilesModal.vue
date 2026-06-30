<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  show: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['close'])

const myFiles = ref([])
const myFileInput = ref(null)

const MAX_COUNT = 10
const MAX_BYTES = 20 * 1024 * 1024

const myFileCountText = computed(() => myFiles.value.length + ' / 10개')

function triggerMyFileInput() {
  myFileInput.value.click()
}

function handleMyFileUpload(e) {
  const newFiles = Array.from(e.target.files)
  const remaining = MAX_COUNT - myFiles.value.length
  if (remaining <= 0) {
    alert('파일은 최대 10개까지 등록할 수 있습니다.')
    e.target.value = ''
    return
  }
  const currentSize = myFiles.value.reduce((s, f) => s + f.size, 0)
  let accumulated = currentSize
  const added = []
  for (let i = 0; i < newFiles.length; i++) {
    if (added.length >= remaining) {
      alert('파일은 최대 10개까지 등록할 수 있습니다.')
      break
    }
    if (accumulated + newFiles[i].size > MAX_BYTES) {
      alert('전체 파일 용량이 20MB를 초과합니다.')
      break
    }
    accumulated += newFiles[i].size
    added.push(newFiles[i])
  }
  myFiles.value = myFiles.value.concat(added)
  e.target.value = ''
}

function removeMyFile(idx) {
  myFiles.value.splice(idx, 1)
}

function getFileIcon(name) {
  const ext = (name.split('.').pop() || '').toLowerCase()
  if (['jpg', 'jpeg', 'gif', 'png'].includes(ext)) return 'fa-solid fa-file-image'
  if (ext === 'pdf') return 'fa-solid fa-file-pdf'
  if (['xlsx', 'xls', 'csv'].includes(ext)) return 'fa-solid fa-file-excel'
  if (['ppt', 'pptx'].includes(ext)) return 'fa-solid fa-file-powerpoint'
  if (['doc', 'docx'].includes(ext)) return 'fa-solid fa-file-word'
  if (ext === 'html') return 'fa-solid fa-file-code'
  return 'fa-solid fa-file'
}

function formatBytes(bytes) {
  if (bytes < 1024) return bytes + ' B'
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB'
  return (bytes / (1024 * 1024)).toFixed(1) + ' MB'
}
</script>

<template>
  <!-- 나의 파일함 모달 -->
  <div
    :class="['modal-overlay', { hidden: !show }]"
    @click.self="emit('close')"
  >
    <div class="modal-box">
      <div class="modal-hd">
        <h3>
          <i class="fa-solid fa-folder-open" style="color:#3D5A8A;margin-right:8px;"></i>나의 파일함
        </h3>
        <button type="button" class="modal-close" @click="emit('close')">×</button>
      </div>
      <div class="modal-body">
        <div class="modal-info">
          <p>회원님이 등록한 파일 관리함 입니다.</p>
          <p class="info-limit">파일 업로드 시, 파일 개수 10개, 용량 최대 20MB이하로 등록해 주세요.</p>
          <p style="font-size:13px;color:var(--text-mid);margin-top:6px;">
            허용 확장자 : pdf, jpg, jpeg, gif, png, txt, html, xlsx, xls, csv, ppt, pptx, doc, docx
          </p>
        </div>
        <div class="myfile-upload-row">
          <button type="button" class="btn-myfile-upload" @click="triggerMyFileInput">
            <i class="fa-solid fa-arrow-up-from-bracket"></i> 파일 업로드
          </button>
          <input
            ref="myFileInput"
            type="file"
            multiple
            accept=".pdf,.jpg,.jpeg,.gif,.png,.txt,.html,.xlsx,.xls,.csv,.ppt,.pptx,.doc,.docx"
            @change="handleMyFileUpload"
          >
        </div>
        <div class="myfile-count">{{ myFileCountText }}</div>
        <div class="myfile-list">
          <div v-if="!myFiles.length" class="myfile-empty">
            <i class="fa-regular fa-folder-open" style="font-size:32px;display:block;margin-bottom:10px;"></i>
            등록된 파일이 없습니다.
          </div>
          <div
            v-for="(f, idx) in myFiles"
            :key="idx"
            class="myfile-item"
          >
            <i :class="getFileIcon(f.name)"></i>
            <span class="myfile-item-name" :title="f.name">{{ f.name }}</span>
            <span class="myfile-item-size">{{ formatBytes(f.size) }}</span>
            <button
              type="button"
              class="myfile-item-del"
              title="삭제"
              @click="removeMyFile(idx)"
            ><i class="fa-solid fa-trash-can"></i></button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
