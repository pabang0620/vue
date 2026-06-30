<script setup>
import { ref, computed } from 'vue'
import { useBuyerSearchStore } from '../../stores/buyerSearch.js'
import categoriesData from '../../data/categories.json'

const store = useBuyerSearchStore()
const MAX_COMBO = 3

// 카테고리 객체를 그대로 저장 (문자열 → 객체)
const activeCat1 = ref(null)
const activeCat2 = ref(null)

const isAtMax = computed(() => store.catCombos.length >= MAX_COMBO)

// depth-1: JSON 루트 배열 그대로
const cat1Items = categoriesData

// depth-2: activeCat1의 children
const cat2Items = computed(() => activeCat1.value?.children ?? [])

// depth-3: activeCat2의 children
const cat3Items = computed(() => activeCat2.value?.children ?? [])

function selectCat1(item) {
  if (isAtMax.value) return
  // 동일 아이템 재클릭 시 토글
  activeCat1.value = activeCat1.value?.categoryNo === item.categoryNo ? null : item
  // 1차 변경 시 2차 초기화
  activeCat2.value = null
}

function selectCat2(item) {
  if (isAtMax.value) return
  // 동일 아이템 재클릭 시 토글
  activeCat2.value = activeCat2.value?.categoryNo === item.categoryNo ? null : item
}

function selectCat3(item) {
  if (isAtMax.value) return
  if (!activeCat1.value) return

  const cat1No = activeCat1.value.categoryNo
  const cat2No = activeCat2.value?.categoryNo ?? null
  const cat3No = item.categoryNo

  // 동일 조합 중복 방지 — 이미 선택된 조합이면 추가하지 않고 초기화만
  const isDuplicate = store.catCombos.some(
    (c) => c.cat1No === cat1No && c.cat2No === cat2No && c.cat3No === cat3No,
  )
  if (isDuplicate) {
    activeCat1.value = null
    activeCat2.value = null
    return
  }

  // SSOT 객체 구조로 push (BigbuyerSendView가 combo.cat1/cat2/cat3 로 읽음)
  store.catCombos.push({
    cat1: activeCat1.value.categoryNm,
    cat2: activeCat2.value?.categoryNm ?? null,
    cat3: item.categoryNm,
    cat1No,
    cat2No,
    cat3No,
  })
  // 원본 동작: 3차 추가 후 1·2차 초기화
  activeCat1.value = null
  activeCat2.value = null
}

// 현재 1·2차 기준으로 해당 3차 조합이 이미 선택됐는지 (중복 → 비활성 표시용)
function isCat3Used(item) {
  const cat1No = activeCat1.value?.categoryNo ?? null
  const cat2No = activeCat2.value?.categoryNo ?? null
  return store.catCombos.some(
    (c) => c.cat1No === cat1No && c.cat2No === cat2No && c.cat3No === item.categoryNo,
  )
}
</script>

<template>
  <!-- 3단 카테고리 그리드 -->
  <div
    class="category-grid"
    :class="{ 'cat-grid--disabled': isAtMax }"
    role="group"
    aria-label="카테고리 선택"
  >
    <!-- 1차 카테고리 -->
    <div class="cat-col">
      <div class="cat-col-header">1차 카테고리</div>
      <div class="cat-list" role="listbox" aria-label="1차 카테고리">
        <div
          v-for="item in cat1Items"
          :key="item.categoryNo"
          class="cat-item"
          :class="{ active: activeCat1?.categoryNo === item.categoryNo }"
          role="option"
          :aria-selected="activeCat1?.categoryNo === item.categoryNo"
          tabindex="0"
          @click="selectCat1(item)"
          @keydown.enter.prevent="selectCat1(item)"
          @keydown.space.prevent="selectCat1(item)"
        >{{ item.categoryNm }}</div>
      </div>
    </div>

    <!-- 2차 카테고리 -->
    <div class="cat-col">
      <div class="cat-col-header">2차 카테고리</div>
      <div class="cat-list" role="listbox" aria-label="2차 카테고리">
        <template v-if="cat2Items.length > 0">
          <div
            v-for="item in cat2Items"
            :key="item.categoryNo"
            class="cat-item"
            :class="{ active: activeCat2?.categoryNo === item.categoryNo }"
            role="option"
            :aria-selected="activeCat2?.categoryNo === item.categoryNo"
            tabindex="0"
            @click="selectCat2(item)"
            @keydown.enter.prevent="selectCat2(item)"
            @keydown.space.prevent="selectCat2(item)"
          >{{ item.categoryNm }}</div>
        </template>
        <span v-else class="sidebar-empty-hint">1차를 선택하세요.</span>
      </div>
    </div>

    <!-- 3차 카테고리 -->
    <div class="cat-col">
      <div class="cat-col-header">3차 카테고리</div>
      <div class="cat-list" role="listbox" aria-label="3차 카테고리">
        <template v-if="cat3Items.length > 0">
          <div
            v-for="item in cat3Items"
            :key="item.categoryNo"
            class="cat-item"
            :class="{ 'cat-item--used': isCat3Used(item) }"
            role="option"
            tabindex="0"
            :aria-disabled="isCat3Used(item)"
            @click="selectCat3(item)"
            @keydown.enter.prevent="selectCat3(item)"
            @keydown.space.prevent="selectCat3(item)"
          >{{ item.categoryNm }}</div>
        </template>
        <span v-else class="sidebar-empty-hint">2차를 선택하세요.</span>
      </div>
    </div>
  </div>
</template>
