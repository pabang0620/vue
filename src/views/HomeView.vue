<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import HeroSlider from '../components/home/HeroSlider.vue'

// ── 섹션 네비게이션 ──────────────────────────────────────────
const snavItems = [
  { id: 's-hero',      label: '메인' },
  { id: 's-marketing', label: '마케팅 서비스' },
  { id: 's-process',   label: '프로세스' },
  { id: 's-consult',   label: '컨설팅 서비스' },
  { id: 's-lookup',    label: '기업조회 서비스' },
]

const currentSection = ref('s-hero')

function onScroll() {
  let current = snavItems[0].id
  snavItems.forEach(item => {
    const el = document.getElementById(item.id)
    if (el && el.getBoundingClientRect().top <= window.innerHeight * 0.4) current = item.id
  })
  currentSection.value = current
}

onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })
  onScroll()
})
onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
})

// ── 히어로 슬라이더 비주얼 연동 ─────────────────────────────
const currentSlide = ref(0)

function onSlideChange(index) {
  currentSlide.value = index
}
</script>

<template>
  <!-- ── 히어로 ── -->
  <section class="hero-vb" id="s-hero">
    <span class="hvb-orb" style="width:500px;height:500px;top:-180px;left:-120px;background:radial-gradient(circle,rgba(26,111,216,.1) 0%,transparent 65%);"></span>
    <div class="wrap" style="position:relative;z-index:1;">
      <div class="hvb-inner">
        <!-- 왼쪽 카피 -->
        <div class="hvb-copy">
          <p class="hvb-pre">나이스디앤비가 보유한</p>
          <p class="hvb-num">5억 건<span>+</span></p>
          <p class="hvb-sub">글로벌 기업 빅데이터</p>
          <div class="hvb-rule"></div>
          <!-- 자동 슬라이더 컴포넌트 -->
          <HeroSlider @slide-change="onSlideChange" />
          <RouterLink to="/bm/big-data" class="hvb-btn">서비스 바로가기</RouterLink>
        </div>
        <!-- 오른쪽: 슬라이드 연동 비주얼 -->
        <div class="hvb-map-wrap">
          <div class="hvb-visuals">
            <!-- PANEL 0: BIG DATA → 지구 글로브 -->
            <div :class="['hvb-visual', { active: currentSlide === 0 }]">
              <svg class="hvb-globe" viewBox="0 0 440 440" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <radialGradient id="gGrad" cx="35%" cy="32%" r="70%">
                    <stop offset="0%" stop-color="#EBF5FF"/>
                    <stop offset="48%" stop-color="#BDD9FE"/>
                    <stop offset="100%" stop-color="#1A3870"/>
                  </radialGradient>
                  <radialGradient id="gShadow" cx="72%" cy="70%" r="55%">
                    <stop offset="0%" stop-color="rgba(8,18,52,.42)"/>
                    <stop offset="100%" stop-color="transparent"/>
                  </radialGradient>
                  <clipPath id="gc"><circle cx="220" cy="215" r="168"/></clipPath>
                </defs>
                <!-- Atmosphere glow rings -->
                <circle cx="220" cy="215" r="186" fill="rgba(26,111,216,.04)"/>
                <circle cx="220" cy="215" r="177" fill="rgba(26,111,216,.07)"/>
                <!-- Globe sphere -->
                <circle cx="220" cy="215" r="168" fill="url(#gGrad)"/>
                <!-- Grid lines -->
                <g clip-path="url(#gc)" stroke="#3B82F6" fill="none" opacity=".22">
                  <ellipse cx="220" cy="215" rx="168" ry="9" stroke-width="1.3"/>
                  <ellipse cx="220" cy="162" rx="158" ry="36"/>
                  <ellipse cx="220" cy="118" rx="135" ry="26"/>
                  <ellipse cx="220" cy="80"  rx="100" ry="16"/>
                  <ellipse cx="220" cy="268" rx="158" ry="36"/>
                  <ellipse cx="220" cy="312" rx="135" ry="26"/>
                  <ellipse cx="220" cy="350" rx="100" ry="16"/>
                  <ellipse cx="220" cy="215" rx="36"  ry="168"/>
                  <ellipse cx="220" cy="215" rx="82"  ry="168"/>
                  <ellipse cx="220" cy="215" rx="132" ry="168"/>
                  <line x1="220" y1="47" x2="220" y2="383"/>
                </g>
                <!-- Continents -->
                <g clip-path="url(#gc)">
                  <!-- Asia -->
                  <path d="M 250 98 L 328 83 L 358 103 L 365 140 L 350 170 L 318 186 L 282 180 L 258 160 L 244 132 Z"
                        fill="rgba(26,111,216,.28)" stroke="#2563EB" stroke-width="1.3"/>
                  <!-- India -->
                  <path d="M 280 180 L 305 174 L 315 202 L 300 228 L 276 224 L 265 205 Z"
                        fill="rgba(26,111,216,.25)" stroke="#2563EB" stroke-width="1"/>
                  <!-- SEA -->
                  <path d="M 328 183 L 352 178 L 360 200 L 344 212 L 325 205 Z"
                        fill="rgba(26,111,216,.2)" stroke="#2563EB" stroke-width="0.8"/>
                  <!-- Australia -->
                  <path d="M 335 268 L 378 260 L 388 286 L 372 310 L 344 312 L 322 292 Z"
                        fill="rgba(26,111,216,.2)" stroke="#2563EB" stroke-width="1"/>
                  <!-- Europe -->
                  <path d="M 156 94 L 200 84 L 216 106 L 208 128 L 185 138 L 158 128 L 147 110 Z"
                        fill="rgba(45,170,106,.3)" stroke="#16A34A" stroke-width="1.2"/>
                  <!-- Africa -->
                  <path d="M 153 140 L 194 134 L 207 160 L 204 220 L 183 250 L 158 252 L 140 234 L 134 196 L 138 166 Z"
                        fill="rgba(26,111,216,.2)" stroke="#2563EB" stroke-width="1"/>
                  <!-- N. America -->
                  <path d="M 52 92 L 118 78 L 130 104 L 122 144 L 100 162 L 73 150 Z"
                        fill="rgba(245,124,30,.22)" stroke="#EA580C" stroke-width="1.2"/>
                  <!-- S. America -->
                  <path d="M 80 175 L 115 170 L 126 200 L 118 250 L 99 270 L 78 262 L 68 232 Z"
                        fill="rgba(245,124,30,.14)" stroke="#EA580C" stroke-width="1"/>
                </g>
                <!-- Sphere depth shadow + specular -->
                <circle cx="220" cy="215" r="168" fill="url(#gShadow)"/>
                <ellipse cx="165" cy="145" rx="46" ry="30" fill="rgba(255,255,255,.2)"/>
                <!-- Data point: 아시아 -->
                <circle cx="322" cy="128" r="28" fill="rgba(26,111,216,.1)"/>
                <circle cx="322" cy="128" r="15" fill="rgba(26,111,216,.2)" stroke="rgba(26,111,216,.45)" stroke-width="1.5"/>
                <circle cx="322" cy="128" r="6" fill="#1A6FD8"/>
                <line x1="337" y1="118" x2="362" y2="96" stroke="rgba(26,111,216,.45)" stroke-width="1" stroke-dasharray="3 2"/>
                <rect x="362" y="74" width="70" height="42" rx="7" fill="rgba(255,255,255,.92)" stroke="rgba(26,111,216,.25)" stroke-width="1"/>
                <text x="397" y="93" text-anchor="middle" font-size="10" font-weight="700" fill="#1A6FD8" font-family="Pretendard,sans-serif">아시아</text>
                <text x="397" y="109" text-anchor="middle" font-size="15" font-weight="900" fill="#1A6FD8" font-family="Pretendard,sans-serif">180M</text>
                <!-- Data point: 유럽 -->
                <circle cx="178" cy="108" r="24" fill="rgba(45,170,106,.1)"/>
                <circle cx="178" cy="108" r="12" fill="rgba(45,170,106,.22)" stroke="rgba(45,170,106,.5)" stroke-width="1.5"/>
                <circle cx="178" cy="108" r="5" fill="#2DAA6A"/>
                <line x1="170" y1="96" x2="150" y2="70" stroke="rgba(45,170,106,.45)" stroke-width="1" stroke-dasharray="3 2"/>
                <rect x="98" y="48" width="68" height="42" rx="7" fill="rgba(255,255,255,.92)" stroke="rgba(45,170,106,.25)" stroke-width="1"/>
                <text x="132" y="67" text-anchor="middle" font-size="10" font-weight="700" fill="#2DAA6A" font-family="Pretendard,sans-serif">유럽</text>
                <text x="132" y="83" text-anchor="middle" font-size="15" font-weight="900" fill="#2DAA6A" font-family="Pretendard,sans-serif">156M</text>
                <!-- Data point: 북미 -->
                <circle cx="92" cy="116" r="22" fill="rgba(245,124,30,.1)"/>
                <circle cx="92" cy="116" r="11" fill="rgba(245,124,30,.2)" stroke="rgba(245,124,30,.5)" stroke-width="1.5"/>
                <circle cx="92" cy="116" r="5" fill="#F57C1E"/>
                <line x1="81" y1="106" x2="54" y2="80" stroke="rgba(245,124,30,.45)" stroke-width="1" stroke-dasharray="3 2"/>
                <rect x="6" y="58" width="66" height="42" rx="7" fill="rgba(255,255,255,.92)" stroke="rgba(245,124,30,.25)" stroke-width="1"/>
                <text x="39" y="77" text-anchor="middle" font-size="10" font-weight="700" fill="#F57C1E" font-family="Pretendard,sans-serif">북미</text>
                <text x="39" y="93" text-anchor="middle" font-size="15" font-weight="900" fill="#F57C1E" font-family="Pretendard,sans-serif">117M</text>
                <!-- Total badge -->
                <rect x="148" y="368" width="144" height="46" rx="10" fill="#1A6FD8"/>
                <text x="220" y="387" text-anchor="middle" font-size="11" fill="rgba(255,255,255,.78)" font-weight="600" font-family="Pretendard,sans-serif">글로벌 총 빅데이터</text>
                <text x="220" y="406" text-anchor="middle" font-size="18" fill="#fff" font-weight="900" font-family="Pretendard,sans-serif">5억 건 이상</text>
              </svg>
            </div><!-- /PANEL 0 -->

            <!-- PANEL 1: RPA → 자동화 파이프라인 -->
            <div :class="['hvb-visual', { active: currentSlide === 1 }]">
              <svg viewBox="0 0 400 430" fill="none" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:440px;filter:drop-shadow(0 20px 56px rgba(26,111,216,.18))">
                <defs>
                  <marker id="rpaArr" markerWidth="9" markerHeight="9" refX="5" refY="4.5" orient="auto">
                    <path d="M1 1.5 L5 4.5 L1 7.5" stroke="#1A6FD8" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
                  </marker>
                  <marker id="rpaArrO" markerWidth="9" markerHeight="9" refX="5" refY="4.5" orient="auto">
                    <path d="M1 1.5 L5 4.5 L1 7.5" stroke="#F57C1E" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
                  </marker>
                </defs>
                <!-- Title -->
                <text x="200" y="30" text-anchor="middle" font-size="14" font-weight="800" letter-spacing=".07em" fill="#1A6FD8" font-family="Pretendard,sans-serif">RPA 자동화 파이프라인</text>
                <!-- Step 1 -->
                <rect x="10" y="46" width="380" height="72" rx="12" fill="#fff" stroke="rgba(26,111,216,.18)" stroke-width="1.2"/>
                <circle cx="60" cy="82" r="26" fill="rgba(26,111,216,.1)"/>
                <ellipse cx="60" cy="73" rx="15" ry="5" fill="#1A6FD8"/>
                <rect x="45" y="73" width="30" height="16" fill="rgba(26,111,216,.75)"/>
                <ellipse cx="60" cy="89" rx="15" ry="5" fill="#1259B8"/>
                <text x="100" y="75" font-size="15" font-weight="800" fill="#1B2535" font-family="Pretendard,sans-serif">글로벌 빅데이터 연동</text>
                <text x="100" y="95" font-size="12" fill="#8997A8" font-family="Pretendard,sans-serif">D&amp;B 5억 건 + 웹 데이터 실시간 반영</text>
                <!-- Arrow 1 -->
                <line x1="200" y1="119" x2="200" y2="137" stroke="#1A6FD8" stroke-width="1.8" stroke-dasharray="4 2.5" marker-end="url(#rpaArr)"/>
                <!-- Step 2 -->
                <rect x="10" y="138" width="380" height="72" rx="12" fill="#fff" stroke="rgba(26,111,216,.18)" stroke-width="1.2"/>
                <circle cx="60" cy="174" r="26" fill="rgba(26,111,216,.1)"/>
                <circle cx="55" cy="169" r="11" stroke="#1A6FD8" stroke-width="2.2" fill="none"/>
                <line x1="63" y1="178" x2="75" y2="190" stroke="#1A6FD8" stroke-width="2.5" stroke-linecap="round"/>
                <text x="100" y="166" font-size="15" font-weight="800" fill="#1B2535" font-family="Pretendard,sans-serif">웹 자동 탐색 · 수집</text>
                <text x="100" y="186" font-size="12" fill="#8997A8" font-family="Pretendard,sans-serif">바이어 정보 자동 크롤링 및 추출</text>
                <!-- Arrow 2 -->
                <line x1="200" y1="211" x2="200" y2="229" stroke="#1A6FD8" stroke-width="1.8" stroke-dasharray="4 2.5" marker-end="url(#rpaArr)"/>
                <!-- Step 3 -->
                <rect x="10" y="230" width="380" height="72" rx="12" fill="#fff" stroke="rgba(26,111,216,.18)" stroke-width="1.2"/>
                <circle cx="60" cy="266" r="26" fill="rgba(26,111,216,.1)"/>
                <path d="M 44 253 L 76 253 L 70 263 L 70 278 L 50 278 L 50 263 Z" fill="#1A6FD8" opacity=".85"/>
                <text x="100" y="258" font-size="15" font-weight="800" fill="#1B2535" font-family="Pretendard,sans-serif">데이터 정제 · 취합</text>
                <text x="100" y="278" font-size="12" fill="#8997A8" font-family="Pretendard,sans-serif">중복 제거 · 품질 검증 · 데이터 통합</text>
                <!-- Arrow 3 (orange) -->
                <line x1="200" y1="303" x2="200" y2="321" stroke="#F57C1E" stroke-width="1.8" stroke-dasharray="4 2.5" marker-end="url(#rpaArrO)"/>
                <!-- Step 4 (result, orange) -->
                <rect x="10" y="322" width="380" height="72" rx="12" fill="rgba(245,124,30,.05)" stroke="rgba(245,124,30,.3)" stroke-width="1.5"/>
                <circle cx="60" cy="358" r="26" fill="rgba(245,124,30,.15)"/>
                <path d="M 46 358 L 56 368 L 76 347" stroke="#F57C1E" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
                <text x="100" y="350" font-size="15" font-weight="800" fill="#1B2535" font-family="Pretendard,sans-serif">바이어 리스트 출력</text>
                <text x="100" y="370" font-size="12" fill="#F57C1E" font-weight="600" font-family="Pretendard,sans-serif">고품질 바이어 정보 제공 완료</text>
              </svg>
            </div><!-- /PANEL 1 -->

            <!-- PANEL 2: AI → 레이더 차트 (바이어 적합도 분석) -->
            <div :class="['hvb-visual', { active: currentSlide === 2 }]">
              <svg viewBox="0 0 440 415" fill="none" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:440px;">
                <!-- Title -->
                <text x="220" y="28" text-anchor="middle" font-size="14" font-weight="800" letter-spacing=".07em" fill="#1A6FD8" font-family="Pretendard,sans-serif">AI 바이어 적합도 분석</text>
                <!-- Grid rings (33% / 66% / 100%) -->
                <polygon points="220,157 256,183 242,226 198,226 184,183" fill="rgba(26,111,216,.03)" stroke="rgba(26,111,216,.12)" stroke-width="0.8"/>
                <polygon points="220,119 292,171 265,257 175,257 148,171" fill="rgba(26,111,216,.03)" stroke="rgba(26,111,216,.12)" stroke-width="0.8"/>
                <polygon points="220,80 329,160 288,288 152,288 111,160" fill="rgba(26,111,216,.03)" stroke="rgba(26,111,216,.16)" stroke-width="1.2"/>
                <!-- Axis lines center→outer -->
                <g stroke="rgba(26,111,216,.16)" stroke-width="0.8">
                  <line x1="220" y1="195" x2="220" y2="80"/>
                  <line x1="220" y1="195" x2="329" y2="160"/>
                  <line x1="220" y1="195" x2="288" y2="288"/>
                  <line x1="220" y1="195" x2="152" y2="288"/>
                  <line x1="220" y1="195" x2="111" y2="160"/>
                </g>
                <!-- Candidate B polygon (gray, dashed) — 비교 후보 -->
                <polygon points="220,132 286,174 254,242 181,249 163,177" fill="rgba(148,163,184,.1)" stroke="rgba(148,163,184,.5)" stroke-width="1.5" stroke-dasharray="4 2"/>
                <!-- Candidate A polygon (blue fill) — AI 선택 바이어 -->
                <polygon points="220,92 313,165 274,269 161,277 119,162" fill="rgba(26,111,216,.13)" stroke="#1A6FD8" stroke-width="2"/>
                <!-- Vertex dots on A -->
                <g fill="#1A6FD8" stroke="#fff" stroke-width="1.5">
                  <circle cx="220" cy="92"  r="5"/>
                  <circle cx="313" cy="165" r="5"/>
                  <circle cx="274" cy="269" r="5"/>
                  <circle cx="161" cy="277" r="5"/>
                  <circle cx="119" cy="162" r="5"/>
                </g>
                <!-- Center badge -->
                <circle cx="220" cy="195" r="36" fill="#fff" stroke="rgba(26,111,216,.2)" stroke-width="1.5"/>
                <text x="220" y="191" text-anchor="middle" font-size="14" font-weight="900" fill="#1A6FD8" font-family="Pretendard,sans-serif">AI 분석</text>
                <text x="220" y="207" text-anchor="middle" font-size="10" font-weight="600" fill="#8997A8" font-family="Pretendard,sans-serif">종합 평가</text>
                <!-- Axis labels -->
                <text x="220" y="67" text-anchor="middle" font-size="12" font-weight="700" fill="#2C3A4A" font-family="Pretendard,sans-serif">매칭 정확도</text>
                <text x="350" y="162" text-anchor="start" font-size="12" font-weight="700" fill="#2C3A4A" font-family="Pretendard,sans-serif">거래 신뢰도</text>
                <text x="295" y="314" text-anchor="middle" font-size="12" font-weight="700" fill="#2C3A4A" font-family="Pretendard,sans-serif">업종 적합성</text>
                <text x="145" y="314" text-anchor="middle" font-size="12" font-weight="700" fill="#2C3A4A" font-family="Pretendard,sans-serif">성장 가능성</text>
                <text x="90" y="162" text-anchor="end" font-size="12" font-weight="700" fill="#2C3A4A" font-family="Pretendard,sans-serif">연락 가능성</text>
                <!-- Legend -->
                <circle cx="108" cy="385" r="6" fill="rgba(26,111,216,.85)"/>
                <text x="120" y="389" font-size="12" font-weight="600" fill="#2C3A4A" font-family="Pretendard,sans-serif">AI 추천 바이어</text>
                <circle cx="295" cy="385" r="6" fill="rgba(148,163,184,.5)" stroke="rgba(148,163,184,.8)" stroke-width="1.5"/>
                <text x="307" y="389" font-size="12" font-weight="600" fill="#8997A8" font-family="Pretendard,sans-serif">일반 후보군</text>
              </svg>
            </div><!-- /PANEL 2 -->
          </div><!-- /hvb-visuals -->
        </div>
      </div>
    </div>
  </section>

  <!-- ── 마케팅 서비스 ── -->
  <section id="s-marketing">
    <div class="wrap">
      <div class="section-title">
        <div class="tag">Section 01</div>
        <h2>마케팅 서비스</h2>
        <p>5억개 이상의 DB POOL을 활용하여 잠재된 바이어들에게 마케팅 서비스를 제공합니다.</p>
      </div>
      <div class="svc-cards">
        <div class="svc-card c-blue">
          <div class="card-thumb">
            <img src="https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?auto=format&fit=crop&w=600&h=280&q=80" alt="빅바이어 마케팅">
            <span class="card-thumb-bar"></span>
          </div>
          <div class="card-body">
            <h3>빅바이어 마케팅</h3>
            <p>NICE D&amp;B가 보유한 5억 개 이상의 해외기업 DB POOL을 활용하여, 잠재된 바이어들에게 마케팅 서비스를 제공합니다.</p>
          </div>
        </div>
        <div class="svc-card c-orange">
          <div class="card-thumb">
            <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&h=280&q=80" alt="수출바우처 컨설팅">
            <span class="card-thumb-bar"></span>
          </div>
          <div class="card-body">
            <h3>수출바우처 컨설팅</h3>
            <p>전문 MD가 귀사를 위한 맞춤 컨설팅을 무료로 제공해 드립니다.</p>
          </div>
        </div>
        <div class="svc-card c-green">
          <div class="card-thumb">
            <img src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=600&h=280&q=80" alt="해외기업 보고서">
            <span class="card-thumb-bar"></span>
          </div>
          <div class="card-body">
            <h3>해외기업 보고서</h3>
            <p>D&amp;B의 글로벌 네트워크를 통해 모든 국가 내 대상 기업을 조회하고 보고서를 발급받으세요.</p>
          </div>
        </div>
        <div class="svc-card c-dark">
          <div class="card-thumb">
            <img src="https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=600&h=280&q=80" alt="바이어 확인">
            <span class="card-thumb-bar"></span>
          </div>
          <div class="card-body">
            <h3>바이어 확인</h3>
            <p>사기바이어를 실시간으로 확인할 수 있습니다.</p>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- ── 서비스 소개 (프로세스) ── -->
  <section class="process-sec" id="s-process">
    <div class="wrap">
      <div class="section-title">
        <div class="tag">Section 02</div>
        <h2>서비스 소개</h2>
        <p>바이어 AI 발굴부터 마케팅 메시지 발송까지, 6단계 프로세스</p>
      </div>
      <div class="grid-3">
        <div class="status-card">
          <div class="badge active">STEP 01</div>
          <div class="card-icon"><i class="fa-solid fa-database"></i></div>
          <h3>빅데이터 발굴</h3>
          <p>세계 최대 규모(5억 건 이상)의 글로벌 기업 빅데이터를 실시간 웹데이터와 정밀 결합시켜 최적의 맞춤 바이어를 추출합니다.</p>
          <div class="foot-val"><span>정확도 지표</span><span>98.2% 수렴</span></div>
        </div>
        <div class="status-card">
          <div class="badge active">STEP 02</div>
          <div class="card-icon"><i class="fa-solid fa-bezier-curve"></i></div>
          <h3>AI 추천 로직</h3>
          <p>실제 무역 거래 데이터를 학습한 AI가 독자 알고리즘을 가동하여 거래 성사 확률이 높은 진성 바이어를 선별합니다.</p>
          <div class="foot-val"><span>매칭 알고리즘</span><span>실시간 분석중</span></div>
        </div>
        <div class="status-card">
          <div class="badge">STEP 03</div>
          <div class="card-icon"><i class="fa-solid fa-sliders"></i></div>
          <h3>마케팅 메시지 작성</h3>
          <p>발굴된 타겟 바이어군에 전송할 eDM을 간편하게 작성합니다. 자주 쓰이는 프리셋 포맷은 템플릿에 저장 가능합니다.</p>
          <div class="foot-val"><span>스마트 메시지</span><span>템플릿 제공</span></div>
        </div>
        <div class="status-card">
          <div class="badge">STEP 04</div>
          <div class="card-icon"><i class="fa-solid fa-paper-plane"></i></div>
          <h3>마케팅 메시지 발송</h3>
          <p>작성이 완료된 타겟형 eDM을 전 세계 바이어 메일망으로 안전하게 발송합니다. A/B 테스트를 통한 회신율 모니터링을 제공합니다.</p>
          <div class="foot-val"><span>서버 발송 상태</span><span>안정성 100%</span></div>
        </div>
        <div class="status-card">
          <div class="badge">STEP 05</div>
          <div class="card-icon"><i class="fa-solid fa-envelope-open-text"></i></div>
          <h3>바이어 확인 및 열람</h3>
          <p>핵심 Selling Point가 담긴 eDM을 수신한 글로벌 바이어가 실시간으로 내용을 열람하고 검토합니다.</p>
          <div class="foot-val"><span>추적 코드 연동</span><span>실시간 추적</span></div>
        </div>
        <div class="status-card">
          <div class="badge">STEP 06</div>
          <div class="card-icon"><i class="fa-solid fa-comments"></i></div>
          <h3>바이어 답변 메시지 확인</h3>
          <p>일반 발굴·발송 대비 타겟팅을 통해 최대 5배 이상 도출되는 글로벌 바이어의 피드백 답변을 확인하세요.</p>
          <div class="foot-val"><span>평균 피드백률</span><span>5배 상승 도달</span></div>
        </div>
      </div>
    </div>
  </section>

  <!-- ── 컨설팅 서비스 ── -->
  <section class="consult-sec" id="s-consult">
    <div class="wrap">
      <div class="section-title">
        <div class="tag">Section 03</div>
        <h2>컨설팅 서비스</h2>
        <p>해외기업 신용조사 — 글로벌 5억 5천만 기업 데이터</p>
      </div>
      <div class="consult-inner">
        <div class="bar-chart">
          <h3>글로벌 데이터 현황 (단위: 건)</h3>
          <div class="bar-rows">
            <div class="bar-row">
              <span class="bar-label">Asia Pacific</span>
              <div class="bar-track"><div class="bar-fill" style="width:100%; background:var(--blue);"></div></div>
              <span class="bar-val">180,161,374</span>
            </div>
            <div class="bar-row">
              <span class="bar-label">Europe</span>
              <div class="bar-track"><div class="bar-fill" style="width:87%; background:#4898F0;"></div></div>
              <span class="bar-val">156,229,203</span>
            </div>
            <div class="bar-row">
              <span class="bar-label">North America</span>
              <div class="bar-track"><div class="bar-fill" style="width:65%; background:var(--orange);"></div></div>
              <span class="bar-val">117,948,961</span>
            </div>
            <div class="bar-row">
              <span class="bar-label">Latin America</span>
              <div class="bar-track"><div class="bar-fill" style="width:47%; background:var(--green);"></div></div>
              <span class="bar-val">83,850,324</span>
            </div>
            <div class="bar-row">
              <span class="bar-label">Africa</span>
              <div class="bar-track"><div class="bar-fill" style="width:7%; background:#C9D2DC;"></div></div>
              <span class="bar-val">11,564,797</span>
            </div>
            <div class="bar-row">
              <span class="bar-label">Middle East</span>
              <div class="bar-track"><div class="bar-fill" style="width:3%; background:#C9D2DC;"></div></div>
              <span class="bar-val">3,854,992</span>
            </div>
          </div>
        </div>
        <div>
          <div class="globe-box">
            <div class="total-label">Global Total</div>
            <div class="total-num">553,609,651건</div>
            <div class="total-sub">6개 지역 · 실시간 업데이트</div>
            <!-- 평면 세계지도 스타일 SVG -->
            <svg viewBox="0 0 300 180" fill="none" xmlns="http://www.w3.org/2000/svg"
              style="width:100%;max-width:280px;margin:8px auto 0;display:block;">
              <!-- 배경 -->
              <rect width="300" height="180" rx="10" fill="rgba(255,255,255,.04)"/>
              <!-- 경선 격자 -->
              <line x1="50"  y1="10" x2="50"  y2="170" stroke="rgba(255,255,255,.1)" stroke-width=".6"/>
              <line x1="100" y1="10" x2="100" y2="170" stroke="rgba(255,255,255,.1)" stroke-width=".6"/>
              <line x1="150" y1="10" x2="150" y2="170" stroke="rgba(255,255,255,.1)" stroke-width=".6"/>
              <line x1="200" y1="10" x2="200" y2="170" stroke="rgba(255,255,255,.1)" stroke-width=".6"/>
              <line x1="250" y1="10" x2="250" y2="170" stroke="rgba(255,255,255,.1)" stroke-width=".6"/>
              <!-- 위선 격자 -->
              <line x1="10" y1="45"  x2="290" y2="45"  stroke="rgba(255,255,255,.1)" stroke-width=".6"/>
              <line x1="10" y1="90"  x2="290" y2="90"  stroke="rgba(255,255,255,.15)" stroke-width=".8"/>
              <line x1="10" y1="135" x2="290" y2="135" stroke="rgba(255,255,255,.1)" stroke-width=".6"/>
              <!-- 대륙 단순화 (North America) -->
              <path d="M28 38 L68 30 L78 45 L72 70 L58 80 L40 72 L28 55Z" fill="rgba(26,111,216,.55)"/>
              <!-- South America -->
              <path d="M62 90 L80 86 L88 108 L82 132 L68 138 L54 120 L56 100Z" fill="rgba(45,170,106,.55)"/>
              <!-- Europe -->
              <path d="M128 28 L158 24 L164 40 L155 55 L138 58 L126 45Z" fill="rgba(74,152,240,.65)"/>
              <!-- Africa -->
              <path d="M130 62 L160 58 L168 80 L165 114 L148 126 L132 118 L122 96 L124 74Z" fill="rgba(245,124,30,.55)"/>
              <!-- Middle East -->
              <path d="M162 55 L188 50 L194 68 L178 78 L160 72Z" fill="rgba(245,158,11,.55)"/>
              <!-- Asia -->
              <path d="M180 22 L245 18 L262 38 L258 65 L240 75 L210 78 L192 68 L184 50Z" fill="rgba(26,111,216,.65)"/>
              <!-- Asia Pacific islands -->
              <path d="M240 80 L265 76 L272 92 L258 100 L242 94Z" fill="rgba(45,170,106,.5)"/>
              <!-- 핀 마커들 -->
              <circle cx="53"  cy="55" r="5" fill="#fff"/>
              <circle cx="53"  cy="55" r="3" fill="#1A6FD8"/>
              <line x1="53" y1="50" x2="53" y2="30" stroke="#fff" stroke-width="1" opacity=".7"/>
              <rect x="26" y="16" width="54" height="16" rx="4" fill="rgba(26,111,216,.9)"/>
              <text x="53" y="28" text-anchor="middle" font-size="8.5" fill="#fff" font-weight="700">NAm 118M</text>
              <circle cx="145" cy="42" r="5" fill="#fff"/>
              <circle cx="145" cy="42" r="3" fill="#4898F0"/>
              <line x1="145" y1="37" x2="160" y2="18" stroke="#fff" stroke-width="1" opacity=".7"/>
              <rect x="134" y="8" width="52" height="14" rx="4" fill="rgba(74,152,240,.9)"/>
              <text x="160" y="19" text-anchor="middle" font-size="8" fill="#fff" font-weight="700">Eur 156M</text>
              <circle cx="220" cy="48" r="5" fill="#fff"/>
              <circle cx="220" cy="48" r="3" fill="#1A6FD8"/>
              <line x1="220" y1="43" x2="235" y2="20" stroke="#fff" stroke-width="1" opacity=".7"/>
              <rect x="206" y="8" width="58" height="14" rx="4" fill="rgba(26,111,216,.9)"/>
              <text x="235" y="19" text-anchor="middle" font-size="8" fill="#fff" font-weight="700">Asia 180M</text>
              <circle cx="143" cy="92" r="5" fill="#fff"/>
              <circle cx="143" cy="92" r="3" fill="#F57C1E"/>
              <line x1="143" y1="97" x2="143" y2="155" stroke="#fff" stroke-width="1" opacity=".7"/>
              <rect x="112" y="154" width="62" height="14" rx="4" fill="rgba(245,124,30,.9)"/>
              <text x="143" y="165" text-anchor="middle" font-size="8" fill="#fff" font-weight="700">Africa 12M</text>
              <circle cx="70"  cy="110" r="5" fill="#fff"/>
              <circle cx="70"  cy="110" r="3" fill="#2DAA6A"/>
              <line x1="70" y1="115" x2="55" y2="155" stroke="#fff" stroke-width="1" opacity=".7"/>
              <rect x="18" y="154" width="72" height="14" rx="4" fill="rgba(45,170,106,.9)"/>
              <text x="54" y="165" text-anchor="middle" font-size="8" fill="#fff" font-weight="700">LatAm 84M</text>
            </svg>
          </div>
        </div>
      </div>
      <p class="consult-desc">전문 MD가 귀사를 위한 맞춤 컨설팅을 무료로 제공해 드립니다.<br>수출바우처를 활용하여 글로벌 시장 진출을 가속화하세요.</p>
    </div>
  </section>

  <!-- ── 기업조회 서비스 ── -->
  <section class="lookup-sec" id="s-lookup">
    <div class="wrap">
      <div class="section-title">
        <div class="tag">Section 04</div>
        <h2>기업조회 서비스</h2>
        <p>거래기업의 등록상태를 확인할 수 있습니다.</p>
      </div>
      <!-- 서비스 설명 배너 -->
      <div class="lookup-brief">
        <div class="lookup-brief-kicker">
          <img src="https://api.iconify.design/lucide:info.svg?color=%231A6FD8" alt="">
          <span>거래 정보 브리프</span>
        </div>
        <p>
          공공/민간 각 부문이 보유한 해외기업의 중요 거래정보(불량/우량정보, 위험정보 등)를 실시간 공유합니다.
        </p>
      </div>
      <div class="lookup-cards">
        <div class="lookup-card">
          <div class="lookup-card-head">
            <img src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=600&h=380&q=80" alt="금융기관">
            <h3>금융기관</h3>
          </div>
          <div class="lookup-copy">
            <ul class="item-list">
              <li>무역사기</li>
              <li>대금지급 지연</li>
              <li>부정당 체제</li>
              <li>탈세</li>
              <li>자금세탁</li>
            </ul>
          </div>
        </div>
        <div class="lookup-card">
          <div class="lookup-card-head">
            <img src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=600&h=380&q=80" alt="우량정보">
            <h3>우량정보</h3>
          </div>
          <div class="lookup-copy">
            <ul class="item-list">
              <li>적기 결제</li>
              <li>무역활동 지수</li>
            </ul>
          </div>
        </div>
        <div class="lookup-card">
          <div class="lookup-card-head">
            <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=600&h=380&q=80" alt="등급정보">
            <h3>등급정보</h3>
          </div>
          <div class="lookup-copy">
            <ul class="item-list">
              <li>D&amp;B Rating</li>
              <li>PAYDEX</li>
              <li>수출거래 위험지표</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- ── 섹션 네비게이션 (고정) ── -->
  <nav class="snav" aria-label="섹션 이동">
    <a
      v-for="item in snavItems"
      :key="item.id"
      :href="'#' + item.id"
      :class="['snav-item', { active: currentSection === item.id }]"
    >
      <span class="snav-line"></span>
      <span class="snav-dot"></span>
      <span class="snav-label">{{ item.label }}</span>
    </a>
  </nav>
</template>

<style src="../assets/styles/home.css" />
