<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useBuyerSearchStore } from '../../stores/buyerSearch.js'
import countriesData from '../../data/countries.json'

const store = useBuyerSearchStore()
const MAX_COUNTRY = 3
const INITIAL_LIMIT = 50

const isOpen = ref(false)
const searchQuery = ref('')
const triggerRef = ref(null)
const panelRef = ref(null)
const searchInputRef = ref(null)

// 하드코딩 삭제 → JSON 전체 492개를 영문 레이블로 변환
const COUNTRIES = countriesData.map(c => ({
  value: c.natCd,
  label: `${c.natCdNm} (${c.natCd})`,
}))

const selectedKeys = computed(() => Object.keys(store.selectedCountries))
const selectedCount = computed(() => selectedKeys.value.length)
const isAtMax = computed(() => selectedCount.value >= MAX_COUNTRY)

const filteredCountries = computed(() => {
  const q = searchQuery.value.toLowerCase()
  // 검색어 없을 때: 상위 50개만 반환 (492개 전체 렌더 방지)
  if (!q) return COUNTRIES.slice(0, INITIAL_LIMIT)
  return COUNTRIES.filter(c => c.label.toLowerCase().includes(q))
})

const placeholderText = computed(() =>
  isAtMax.value ? '최대 3개 선택 완료' : '국가 선택 (최대 3개)'
)

function isSelected(val) {
  return Object.prototype.hasOwnProperty.call(store.selectedCountries, val)
}

function toggleDropdown() {
  if (isAtMax.value && !isOpen.value) return
  isOpen.value = !isOpen.value
  if (isOpen.value) {
    searchQuery.value = ''
    // focus 검색 인풋
    setTimeout(() => {
      if (searchInputRef.value) searchInputRef.value.focus()
    }, 50)
  }
}

function toggleCountry(country) {
  const key = country.value
  const next = { ...store.selectedCountries }
  if (next[key]) {
    delete next[key]
  } else if (selectedCount.value < MAX_COUNTRY) {
    next[key] = country.label
  }
  store.selectedCountries = next
}

function removeCountry(key) {
  const next = { ...store.selectedCountries }
  delete next[key]
  store.selectedCountries = next
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
        <!-- 선택된 국가 칩 -->
        <template v-if="selectedCount > 0">
          <span
            v-for="key in selectedKeys"
            :key="key"
            class="cms-chip"
          >
            {{ store.selectedCountries[key] }}
            <button
              type="button"
              class="cms-chip-rm"
              @click.stop="removeCountry(key)"
              aria-label="국가 제거"
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
          placeholder="국가 검색..."
          autocomplete="off"
        >
      </div>
      <ul class="cms-options" role="listbox" aria-multiselectable="true">
        <li
          v-for="country in filteredCountries"
          :key="country.value"
          class="cms-opt"
          :class="{
            sel: isSelected(country.value),
            'cms-opt--disabled': isAtMax && !isSelected(country.value)
          }"
          role="option"
          :aria-selected="isSelected(country.value)"
          @click.stop="toggleCountry(country)"
        >
          <span class="cms-chk"></span>
          {{ country.label }}
        </li>
      </ul>
    </div>
  </div>
</template>
