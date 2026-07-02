// 사업 참가신청(/apply) 페이지 공용 숫자 포맷 유틸
// 지원 프로그램 금액은 "천원" 단위로 입력받아 "만원"으로 환산 표시한다.

export function fmt(n) {
  return Number(n || 0).toLocaleString('ko-KR')
}

// 천원 → 만원 (5,000천원 = 5,000,000원 = 500만원 → 천원/10)
export function toMan(cheonwon) {
  return Number(cheonwon || 0) / 10
}

export function manLabel(cheonwon) {
  return `= ${fmt(toMan(cheonwon))}만원`
}
