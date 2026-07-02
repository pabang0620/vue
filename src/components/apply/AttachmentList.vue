<script setup>
import { reactive, ref } from 'vue'
import { FILES } from '../../data/applyFileData'

// 파일별 업로드 상태 — { name } 만 보관 (실제 업로드 연동 API가 없는 시안 단계이므로
// File 객체는 각 <input type="file"> DOM이 들고 있고, 여기서는 표시용 파일명만 추적한다)
const picks = reactive(FILES.map(() => ({ name: '' })))

// 삭제 시 두 개(업로드 전/후)의 file input 모두 value를 비워야
// 같은 파일을 다시 선택해도 change 이벤트가 발생한다
const emptyInputs = ref([])
const pickedInputs = ref([])

function onPick(idx, e) {
  const file = e.target.files && e.target.files[0]
  if (!file) return
  picks[idx].name = file.name
}

function onDelete(idx) {
  picks[idx].name = ''
  if (emptyInputs.value[idx]) emptyInputs.value[idx].value = ''
  if (pickedInputs.value[idx]) pickedInputs.value[idx].value = ''
}

function onDownload() {
  // TODO: 실제 양식 다운로드 API 연동 전까지는 시연용 알림으로 대체
  alert('양식 다운로드 (시연)')
}
</script>

<template>
  <div class="file-list">
    <div v-for="(f, idx) in FILES" :key="idx" class="file-row">
      <div class="file-left">
        <button type="button" class="file-name file-dl" title="클릭 시 양식 다운로드" @click="onDownload">
          <span class="file-no">{{ f.no }}</span>
          <span class="doc">{{ f.doc }}</span>
          <span v-if="f.sub" class="sub">{{ f.sub }}</span>
          <span v-if="f.required" class="req">*</span>
          <span v-else class="opt">(해당 시)</span>
        </button>
      </div>
      <div class="file-actions">
        <div class="file-empty" :class="{ on: !picks[idx].name }">
          <label class="btn btn-brand file-trigger">
            문서 업로드
            <input :ref="(el) => (emptyInputs[idx] = el)" type="file" @change="onPick(idx, $event)" />
          </label>
        </div>
        <div class="file-picked" :class="{ on: !!picks[idx].name }">
          <label class="picked-name file-trigger" title="클릭 시 재업로드">
            <span class="pname-text">{{ picks[idx].name }}</span>
            <input :ref="(el) => (pickedInputs[idx] = el)" type="file" @change="onPick(idx, $event)" />
          </label>
          <button type="button" class="btn btn-danger" @click="onDelete(idx)">삭제</button>
        </div>
      </div>
    </div>
  </div>
</template>
