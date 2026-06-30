<script setup>
import { ref, watch, nextTick } from 'vue'

const props = defineProps({
  show: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['close'])

const templates = ref([])
const templateName = ref('')
const templateNameInput = ref(null)
const MAX_TEMPLATE = 20

// 모달이 열릴 때 입력란에 포커스
watch(() => props.show, val => {
  if (val) {
    nextTick(() => {
      if (templateNameInput.value) templateNameInput.value.focus()
    })
  }
})

function saveTemplate() {
  const name = templateName.value.trim()
  if (!name) {
    if (templateNameInput.value) templateNameInput.value.focus()
    return
  }
  if (templates.value.length >= MAX_TEMPLATE) {
    alert('템플릿은 최대 ' + MAX_TEMPLATE + '개까지 저장할 수 있습니다.')
    return
  }
  const today = new Date()
  const date =
    today.getFullYear() + '.' +
    String(today.getMonth() + 1).padStart(2, '0') + '.' +
    String(today.getDate()).padStart(2, '0')
  templates.value.push({ name, date })
  templateName.value = ''
}

function deleteTemplate(idx) {
  templates.value.splice(idx, 1)
}
</script>

<template>
  <!-- 템플릿 저장 모달 -->
  <div
    :class="['modal-overlay', { hidden: !show }]"
    @click.self="emit('close')"
  >
    <div class="modal-box">
      <div class="modal-hd">
        <h3>
          <i class="fa-solid fa-layer-group" style="color:#3D5A8A;margin-right:8px;"></i>마케팅 템플릿
        </h3>
        <button type="button" class="modal-close" @click="emit('close')">×</button>
      </div>
      <div class="modal-body">
        <div class="modal-info">
          <p>마케팅 입력에서 등록한 마케팅 템플릿 관리함 입니다.</p>
          <p class="info-limit">템플릿은 최대 20개까지 저장할 수 있습니다.</p>
        </div>
        <div class="template-list">
          <div v-if="!templates.length" class="template-empty">
            <i class="fa-regular fa-folder-open" style="font-size:32px;display:block;margin-bottom:10px;"></i>
            저장된 템플릿이 없습니다.
          </div>
          <div
            v-for="(t, idx) in templates"
            :key="idx"
            class="template-item"
          >
            <i class="fa-regular fa-file-lines"></i>
            <span class="template-item-name">{{ t.name }}</span>
            <span class="template-item-date">{{ t.date }}</span>
            <button
              type="button"
              class="template-item-del"
              title="삭제"
              @click.stop="deleteTemplate(idx)"
            >×</button>
          </div>
        </div>
        <div class="modal-save-row">
          <input
            ref="templateNameInput"
            v-model="templateName"
            type="text"
            class="modal-save-input"
            placeholder="템플릿 이름 입력 후 저장"
            @keyup.enter="saveTemplate"
          >
          <button type="button" class="modal-save-btn" @click="saveTemplate">저장</button>
        </div>
      </div>
    </div>
  </div>
</template>
