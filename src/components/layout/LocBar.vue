<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

defineProps({
  items: {
    type: Array,
    default: () => [],
  },
})

function onSelectChange(e) {
  const val = e.target.value
  if (val) router.push(val)
}
</script>

<template>
  <div class="loc-bar">
    <div class="loc-inner">
      <ul class="loc-path" aria-label="현재 위치">
        <li>
          <RouterLink to="/" class="loc-home" aria-label="홈">
            <i class="fa-solid fa-house" style="font-size:16px;"></i>
          </RouterLink>
        </li>
        <li v-for="(item, idx) in items" :key="idx">
          <select class="loc-select" @change="onSelectChange">
            <option
              v-for="opt in item.options"
              :key="opt.to"
              :value="opt.to"
              :selected="opt.label === item.current"
            >{{ opt.label }}</option>
          </select>
        </li>
      </ul>
    </div>
  </div>
</template>

<style src="../../assets/styles/global.css" />
