import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useBuyerSearchStore = defineStore('buyerSearch', () => {
  const keywords = ref([])
  const catCombos = ref([])
  const selectedCountries = ref({})
  const resultCount = ref(0)

  function reset() {
    keywords.value = []
    catCombos.value = []
    selectedCountries.value = {}
    resultCount.value = 0
  }

  return { keywords, catCombos, selectedCountries, resultCount, reset }
})
