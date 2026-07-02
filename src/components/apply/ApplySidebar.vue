<script setup>
import { computed } from 'vue'
import { SECTIONS } from '../../data/applySections'

const props = defineProps({
  activeSection: { type: String, required: true },
  selectedCount: { type: Number, default: 0 },
})
const emit = defineEmits(['navigate'])

const activeIndex = computed(() => {
  const idx = SECTIONS.findIndex((s) => s.id === props.activeSection)
  return idx < 0 ? 0 : idx
})
const progressLabel = computed(() => activeIndex.value + 1)
const progressPercent = computed(() => ((activeIndex.value + 1) / SECTIONS.length) * 100)

// 모바일에는 없는 데스크탑 전용 sticky 사이드바이므로 별도 tab scrollIntoView 처리는 불필요
function onNavigate(id) {
  emit('navigate', id)
}
</script>

<template>
  <aside class="side">
    <div class="side-inner">
      <p class="side-title">신청 진행</p>
      <div class="side-body">
        <nav aria-label="목차">
          <ul class="toc-list">
            <li v-for="s in SECTIONS" :key="s.id">
              <a
                class="toc-link"
                :class="{ active: activeSection === s.id }"
                :href="'#' + s.id"
                @click.prevent="onNavigate(s.id)"
              >
                <span class="toc-num">{{ s.num }}</span> {{ s.toc }}
              </a>
            </li>
          </ul>
        </nav>
        <div class="toc-progress">
          진행 <b>{{ progressLabel }} / {{ SECTIONS.length }}</b>
          <div class="bar"><span :style="{ width: progressPercent + '%' }"></span></div>
        </div>

        <div class="side-summary">
          <p class="ss-title">신청 상황</p>
          <div class="ss-row"><span>선택 프로그램</span><b>{{ selectedCount }}건</b></div>
        </div>
      </div>
    </div>
  </aside>
</template>
