<script setup>
import { fmt, manLabel } from '../../utils/applyFormat'

// ProgramTable.vue(신청 폼)와 동일한 열 구성을 읽기전용으로 재구성한다.
// rows: PROGRAM_ROWS + 제출 상태(checked/amount/note)가 병합된 배열
defineProps({
  rows: { type: Array, required: true },
  selectedCount: { type: Number, default: 0 },
  sumAmount: { type: Number, default: 0 },
})
</script>

<template>
  <div class="prog-scroll">
    <table class="prog">
      <thead>
        <tr>
          <th style="width:150px">구분</th>
          <th>기업지원 프로그램</th>
          <th style="width:110px">지원규모(천원)</th>
          <th style="width:60px">신청</th>
          <th style="width:210px">지원신청금액(천원)</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, idx) in rows" :key="idx" :class="{ 'checked-row': row.checked }">
          <td v-if="row.groupFirst" class="col-group" :rowspan="row.groupSpan">{{ row.group }}</td>

          <td class="col-name">
            <span class="prog-name">{{ row.name }}</span>
            <span v-if="row.must" class="must-badge">필수신청</span>
            <div v-if="row.checked" class="prog-detail">
              <p class="prog-guide">작성한 신청 내용</p>
              <div class="prog-note">{{ row.note || '-' }}</div>
            </div>
          </td>

          <td class="col-scale">{{ row.scale === null ? '직접지원' : fmt(row.scale) }}</td>

          <td class="col-check">
            <span v-if="row.checked" class="check-mark" aria-label="신청함">✓</span>
            <span v-else class="check-none" aria-label="미신청">–</span>
          </td>

          <td v-if="row.scale === null" class="col-amount"><span class="direct-cell">-</span></td>
          <td v-else class="col-amount">
            <div v-if="row.checked" class="amount-view">
              {{ fmt(row.amount) }} 천원
              <span class="amount-conv">{{ manLabel(row.amount) }}</span>
            </div>
            <span v-else class="direct-cell">–</span>
          </td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <td colspan="3" style="text-align:right">계</td>
          <td style="text-align:center">{{ selectedCount }}건</td>
          <td class="sum-amount">
            {{ fmt(sumAmount) }} 천원
            <small>{{ manLabel(sumAmount) }}</small>
          </td>
        </tr>
      </tfoot>
    </table>
  </div>
</template>
