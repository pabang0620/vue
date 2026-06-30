<script setup>
import { ref } from 'vue'

const msgContent = ref(null)

const tbBoldActive = ref(false)
const tbItalicActive = ref(false)
const tbUnderlineActive = ref(false)

function execFormat(cmd, value = null) {
  msgContent.value.focus()
  document.execCommand(cmd, false, value)
  updateToolbarState()
}

function editorCmd(cmd) {
  execFormat(cmd)
}

function handleFontSizeChange(e) {
  msgContent.value.focus()
  document.execCommand('fontSize', false, '7')
  const els = msgContent.value.querySelectorAll('font[size="7"]')
  els.forEach(el => {
    el.removeAttribute('size')
    el.style.fontSize = e.target.value + 'px'
  })
  updateToolbarState()
}

function updateToolbarState() {
  tbBoldActive.value = document.queryCommandState('bold')
  tbItalicActive.value = document.queryCommandState('italic')
  tbUnderlineActive.value = document.queryCommandState('underline')
}

function getContent() {
  return msgContent.value ? msgContent.value.innerHTML : ''
}

defineExpose({ getContent })
</script>

<template>
  <div class="editor-wrap">
    <div class="editor-toolbar">
      <!-- 폰트 크기 -->
      <select class="tb-select" title="글자 크기" @change="handleFontSizeChange">
        <option value="12">12</option>
        <option value="14">14</option>
        <option value="16" selected>16</option>
        <option value="18">18</option>
        <option value="20">20</option>
        <option value="24">24</option>
        <option value="28">28</option>
        <option value="32">32</option>
      </select>
      <div class="tb-sep"></div>
      <!-- 서식 -->
      <button
        type="button"
        :class="['tb-btn', { active: tbBoldActive }]"
        title="굵게"
        @click="editorCmd('bold')"
      ><b>B</b></button>
      <button
        type="button"
        :class="['tb-btn', { active: tbItalicActive }]"
        title="기울임"
        @click="editorCmd('italic')"
      ><i>I</i></button>
      <button
        type="button"
        :class="['tb-btn', { active: tbUnderlineActive }]"
        title="밑줄"
        @click="editorCmd('underline')"
      ><u>U</u></button>
      <div class="tb-sep"></div>
      <!-- 정렬 -->
      <button type="button" class="tb-btn" title="왼쪽 정렬" @click="editorCmd('justifyLeft')">
        <i class="fa-solid fa-align-left"></i>
      </button>
      <button type="button" class="tb-btn" title="가운데 정렬" @click="editorCmd('justifyCenter')">
        <i class="fa-solid fa-align-center"></i>
      </button>
      <button type="button" class="tb-btn" title="오른쪽 정렬" @click="editorCmd('justifyRight')">
        <i class="fa-solid fa-align-right"></i>
      </button>
    </div>
    <div
      ref="msgContent"
      class="editor-body"
      contenteditable="true"
      data-placeholder="바이어에게 전달할 메시지 내용을 입력하세요"
      @keyup="updateToolbarState"
      @mouseup="updateToolbarState"
    ></div>
  </div>
</template>
