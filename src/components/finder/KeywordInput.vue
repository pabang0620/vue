<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useBuyerSearchStore } from '../../stores/buyerSearch.js'
import keywordsData from '../../data/keywords.json'

const store = useBuyerSearchStore()
const MAX_KW = 5

const isOpen = ref(false)
const searchQuery = ref('')
const triggerRef = ref(null)
const panelRef = ref(null)
const searchInputRef = ref(null)

const KEYWORDS = keywordsData

const selectedCount = computed(() => store.keywords.length)
const isAtMax = computed(() => selectedCount.value >= MAX_KW)

const filteredKeywords = computed(() => {
  const q = searchQuery.value.toLowerCase()
  if (!q) return KEYWORDS
  return KEYWORDS.filter(kw =>
    kw.keywordEn.toLowerCase().includes(q) ||
    kw.keywordKr.toLowerCase().includes(q)
  )
})

const placeholderText = computed(() =>
  isAtMax.value ? '최대 5개 선택 완료' : '키워드 선택 (최대 5개)'
)

function isSelected(kw) {
  return store.keywords.includes(kw.keywordEn)
}

function toggleDropdown() {
  if (isAtMax.value && !isOpen.value) return
  isOpen.value = !isOpen.value
  if (isOpen.value) {
    searchQuery.value = ''
    setTimeout(() => {
      if (searchInputRef.value) searchInputRef.value.focus()
    }, 50)
  }
}

function toggleKeyword(kw) {
  const idx = store.keywords.indexOf(kw.keywordEn)
  if (idx !== -1) {
    store.keywords = store.keywords.filter((_, i) => i !== idx)
  } else if (selectedCount.value < MAX_KW) {
    store.keywords = [...store.keywords, kw.keywordEn]
  }
}

function removeKeyword(kwEn) {
  store.keywords = store.keywords.filter(k => k !== kwEn)
}

function handleOutsideClick(e) {
  const ms = triggerRef.value?.closest?.('.country-ms')
  if (ms && !ms.contains(e.target)) {
    isOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleOutsideClick)
})
onUnmounted(() => {
  document.removeEventListener('click', handleOutsideClick)
})
</script>

<template>
  <div class="country-ms" ref="triggerRef">
    <!-- 트리거 -->
    <div
      class="cms-trigger"
      :class="{ open: isOpen }"
      tabindex="0"
      role="combobox"
      :aria-expanded="isOpen"
      @click="toggleDropdown"
    >
      <div class="cms-chips">
        <!-- 선택된 키워드 칩 -->
        <template v-if="selectedCount > 0">
          <span
            v-for="kwEn in store.keywords"
            :key="kwEn"
            class="cms-chip"
          >
            {{ kwEn }}
            <button
              type="button"
              class="cms-chip-rm"
              @click.stop="removeKeyword(kwEn)"
              aria-label="키워드 제거"
            >×</button>
          </span>
        </template>
        <!-- 플레이스홀더 -->
        <span class="cms-placeholder">{{ placeholderText }}</span>
      </div>
      <span class="cms-caret">▾</span>
    </div>

    <!-- 드롭다운 패널 -->
    <div
      class="cms-panel"
      ref="panelRef"
      :class="{ 'is-hidden': !isOpen }"
    >
      <div class="cms-search-row">
        <input
          type="text"
          class="cms-search-input"
          ref="searchInputRef"
          v-model="searchQuery"
          placeholder="키워드 검색..."
          autocomplete="off"
        >
      </div>
      <ul class="cms-options" role="listbox" aria-multiselectable="true">
        <li
          v-for="kw in filteredKeywords"
          :key="kw.keywordNo"
          class="cms-opt"
          :class="{
            sel: isSelected(kw),
            'cms-opt--disabled': isAtMax && !isSelected(kw)
          }"
          role="option"
          :aria-selected="isSelected(kw)"
          @click.stop="toggleKeyword(kw)"
        >
          <span class="cms-chk"></span>
          {{ kw.keywordEn }}
        </li>
      </ul>
    </div>
  </div>
</template>
