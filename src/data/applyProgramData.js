// [섹션4] 지원 프로그램 선택 표 데이터 (시안6 원본 PROGRAMS 그대로 이관)
// - scale === null  → "직접지원" (금액 입력 없음, 항상 "-")
// - scale === 숫자  → 지원규모(천원). 체크 시 금액 입력란 노출
// - must === true   → 필수신청 (기본 체크 + 해제 불가)
// - groupFirst/groupSpan → <td rowspan> 렌더링을 위해 그룹의 첫 행에만 표기
export const MIN_GAP = 1000 // 하한 = 지원규모 - 1,000천원

export const PROGRAM_ROWS = [
  // ── 수출역량 강화지원 (4행) ──
  {
    group: '수출역량 강화지원', groupFirst: true, groupSpan: 4,
    name: '수출컨설팅', scale: null, must: true,
    guide: '※ 수출 시 애로사항 및 무역업무 관련 지원 필요사항 등 작성',
  },
  {
    group: '수출역량 강화지원', groupFirst: false,
    name: '해외마케팅 자료 제작', scale: 3000,
    guide: '※ 제작하고자 하는 자료 및 내용, 기대효과 등 작성',
  },
  {
    group: '수출역량 강화지원', groupFirst: false,
    name: '해외지식재산권 취득 지원', scale: 3000,
    guide: '※ 인증 종류 및 지원 필요 내용, 기대효과 등 작성',
  },
  {
    group: '수출역량 강화지원', groupFirst: false,
    name: '국제사업자번호 발급', scale: null,
    guide: '※ 신규발급/갱신 여부 및 활용계획 등 작성',
  },

  // ── 무역실무 지원 (6행) ──
  {
    group: '무역실무 지원', groupFirst: true, groupSpan: 6,
    name: '해외시장조사보고서 제공', scale: null,
    guide: '※ 해외시장조사보고서, ESG, TCB 평가 보고서 등 필요 사항 작성',
  },
  {
    group: '무역실무 지원', groupFirst: false,
    name: '글로벌 자동차 부품사-OEM 공급 현황 제공', scale: null,
    guide: '※ 조사하고자 하는 품목 및 대상 국가 작성',
  },
  {
    group: '무역실무 지원', groupFirst: false,
    name: '해외물류비 지원', scale: 5000,
    guide: '※ 물류비 활용 계획 및 지원 필요성 작성',
  },
  {
    group: '무역실무 지원', groupFirst: false,
    name: '기업신용평가보고서 제공', scale: null,
    guide: '',
  },
  {
    group: '무역실무 지원', groupFirst: false,
    name: '해외바이어 발굴', scale: null,
    guide: '',
  },
  {
    group: '무역실무 지원', groupFirst: false,
    name: '무역서류 검토', scale: null,
    guide: '※ 검토 요청하고자 하는 내용 및 애로사항 등 작성',
  },

  // ── 해외활동 및 영업지원 (4행) ──
  {
    group: '해외활동 및 영업지원', groupFirst: true, groupSpan: 4,
    name: '해외시장개척단', scale: null,
    guide: '※ 해외시장개척단을 통해 이루고자 하는 목표 작성',
  },
  {
    group: '해외활동 및 영업지원', groupFirst: false,
    name: '해외전시회 단체관', scale: null,
    guide: '※ 해외전시회 단체관 참가를 통해 이루고자 하는 목표 작성',
  },
  {
    group: '해외활동 및 영업지원', groupFirst: false,
    name: '해외바이어 초청상담회', scale: null,
    guide: '※ 타겟하는 품목 및 국가, 기대효과 등 작성',
  },
  {
    group: '해외활동 및 영업지원', groupFirst: false,
    name: '국내·외 국제전시회 참가지원', scale: 5000,
    guide: '※ 타겟하는 전시회 및 출품 제품·기술, 기대효과 등 작성',
  },
]
