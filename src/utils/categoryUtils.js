/**
 * catCombos SSOT 객체 { cat1, cat2, cat3 } → 표시용 레이블 문자열 반환
 * @param {{ cat1: string, cat2: string|null, cat3: string|null }} combo
 * @returns {string}
 */
export function formatCatLabel(combo) {
  return [combo.cat1, combo.cat2, combo.cat3].filter(Boolean).join(' > ')
}
