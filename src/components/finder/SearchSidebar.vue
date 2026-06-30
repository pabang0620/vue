<script setup>
import { computed } from 'vue'
import { useBuyerSearchStore } from '../../stores/buyerSearch.js'
import { formatCatLabel } from '../../utils/categoryUtils.js'

const emit = defineEmits(['search'])

const store = useBuyerSearchStore()

const selectedCountryKeys = computed(() => Object.keys(store.selectedCountries))

const kwCount = computed(() => store.keywords.length)
const catCount = computed(() => store.catCombos.length)
const countryCount = computed(() => selectedCountryKeys.value.length)

function removeKeyword(idx) {
  store.keywords.splice(idx, 1)
}

function removeCatCombo(idx) {
  store.catCombos.splice(idx, 1)
}

function removeCountry(key) {
  const next = { ...store.selectedCountries }
  delete next[key]
  store.selectedCountries = next
}

function handleSearch() {
  emit('search')
}
</script>

<template>
  <div class="sidebar-panel">
    <div class="sidebar-panel-hd">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="9 11 12 14 22 4"/>
        <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>
      </svg>
      선택된 검색 조건
    </div>

    <div class="sidebar-panel-body">
      <!-- 키워드 섹션 -->
      <div>
        <div class="sidebar-section-label">
          검색어
          <span class="sidebar-section-count" :class="{ 'has-items': kwCount > 0 }">{{ kwCount }}</span>
        </div>
        <div class="sidebar-chips">
          <template v-if="kwCount > 0">
            <span
              v-for="(kw, idx) in store.keywords"
              :key="kw + idx"
              class="criteria-kw-chip"
            >
              {{ kw }}
              <button type="button" @click="removeKeyword(idx)">×</button>
            </span>
          </template>
          <span v-else class="sidebar-empty-hint">검색어를 입력하세요.</span>
        </div>
      </div>

      <hr class="sidebar-divider">

      <!-- 카테고리 섹션 -->
      <div>
        <div class="sidebar-section-label">
          카테고리
          <span class="sidebar-section-count" :class="{ 'has-items': catCount > 0 }">{{ catCount }}</span>
        </div>
        <div class="sidebar-chips">
          <template v-if="catCount > 0">
            <span
              v-for="(combo, idx) in store.catCombos"
              :key="(combo.cat1No ?? combo.cat1) + '-' + idx"
              class="criteria-cat-chip"
            >
              {{ formatCatLabel(combo) }}
              <button type="button" @click="removeCatCombo(idx)">×</button>
            </span>
          </template>
          <span v-else class="sidebar-empty-hint">카테고리를 선택하세요.</span>
        </div>
      </div>

      <hr class="sidebar-divider">

      <!-- 국가 섹션 -->
      <div>
        <div class="sidebar-section-label">
          국가
          <span class="sidebar-section-count" :class="{ 'has-items': countryCount > 0 }">{{ countryCount }}</span>
        </div>
        <div class="sidebar-chips">
          <template v-if="countryCount > 0">
            <span
              v-for="key in selectedCountryKeys"
              :key="key"
              class="criteria-country-chip"
            >
              {{ store.selectedCountries[key] }}
              <button type="button" @click="removeCountry(key)">×</button>
            </span>
          </template>
          <span v-else class="sidebar-empty-hint">국가를 선택하세요.</span>
        </div>
      </div>

      <!-- 발굴 버튼 -->
      <button class="sidebar-submit-btn" type="button" @click="handleSearch">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="11" cy="11" r="8"/>
          <line x1="21" y1="21" x2="16.65" y2="16.65"/>
        </svg>
        AI 바이어 발굴
      </button>
    </div>
  </div>
</template>
