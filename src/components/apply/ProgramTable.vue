<script setup>
import { MIN_GAP } from '../../data/applyProgramData'
import { fmt, manLabel } from '../../utils/applyFormat'

const props = defineProps({
  rows: { type: Array, required: true }, // { group, groupFirst, groupSpan, name, scale, must, guide, checked, amount, note }
  selectedCount: { type: Number, default: 0 },
  sumAmount: { type: Number, default: 0 },
})
const emit = defineEmits(['toggle', 'amount', 'note'])

function isInvalid(row) {
  if (row.scale === null) return false
  if (row.amount === '' || row.amount === null || row.amount === undefined) return false
  const v = Number(row.amount)
  const min = row.scale - MIN_GAP
  const max = row.scale
  return Number.isNaN(v) || v < min || v > max
}

function convLabel(row) {
  if (row.amount === '' || row.amount === null || row.amount === undefined) return manLabel(0)
  const v = Number(row.amount)
  return manLabel(Number.isNaN(v) ? 0 : v)
}

function warnText(row) {
  if (!isInvalid(row)) return ''
  return `※ ${fmt(row.scale - MIN_GAP)} ~ ${fmt(row.scale)} 천원 범위로 입력하세요.`
}
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
            <div class="prog-detail">
              <p v-if="row.guide" class="prog-guide">{{ row.guide }}</p>
              <textarea
                class="prog-note"
                rows="2"
                :value="row.note"
                @input="emit('note', idx, $event.target.value)"
              ></textarea>
            </div>
          </td>

          <td class="col-scale">{{ row.scale === null ? '직접지원' : fmt(row.scale) }}</td>

          <td class="col-check">
            <input
              type="checkbox"
              :checked="row.checked"
              :disabled="row.must"
              :aria-label="row.name + ' 신청'"
              @change="emit('toggle', idx)"
            />
          </td>

          <td v-if="row.scale === null" class="col-amount"><span class="direct-cell">-</span></td>
          <td v-else class="col-amount">
            <div class="amount-box" :class="{ on: row.checked }">
              <input
                type="number"
                class="amount-input"
                :class="{ invalid: isInvalid(row) }"
                :value="row.amount"
                :min="row.scale - MIN_GAP"
                :max="row.scale"
                step="100"
                :placeholder="fmt(row.scale)"
                @input="emit('amount', idx, $event.target.value)"
              />
              <span class="amount-conv">{{ convLabel(row) }}</span>
              <span class="amount-warn" :class="{ on: isInvalid(row) }">{{ warnText(row) }}</span>
            </div>
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
