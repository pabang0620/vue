<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

function onFamilySiteChange(e) {
  const val = e.target.value
  if (val) {
    window.open(val, '_blank')
    e.target.value = ''
  }
}
</script>

<template>
  <footer>
    <div class="footer__inner">
      <div class="fnb">
        <ul class="fnb__wrap">
          <li><a href="#" class="fnb__link" style="color:red;">개인정보처리방침</a></li>
          <li><a href="/policy-details" class="fnb__link">이용약관</a></li>
          <li><a href="/credit-usage-notice" class="fnb__link">신용정보활용체제공시</a></li>
          <li><a href="/email-no-collection" class="fnb__link">이메일무단수집거부</a></li>
        </ul>
      </div>
      <div class="footer__logo">
        <img src="https://www.ctp.or.kr/css/egovframework/img/userpage/header-logo.png" alt="CTP 수출지원서비스" />
        <img src="/nicelinker-logo.png" alt="LINKER" />
      </div>
      <div class="footer__info-row">
        <address class="site-address">
          (04535) 서울특별시 중구 소공로 70, 포스트타워 16층 (주)NICE디앤비<br />
          통신판매업신고: 제2024-서울중구-1736호 사업자등록번호: 107-86-24874 TEL: 02-2122-0233 FAX: 02-2122-2591
        </address>
        <select id="familySite" name="familySite" @change="onFamilySiteChange">
          <option value="" disabled selected>Family site</option>
          <option value="https://www.nicednb.com">나이스디앤비 홈페이지</option>
          <option value="https://global.nicednb.com"> 나이스디앤비 글로벌 홈페이지 </option>
        </select>
      </div>
      <p class="copyright">ⓒ 2023. NICE D&amp;B Co.,Ltd. ALL RIGHTS RESERVED.</p>
    </div>
  </footer>
</template>

<style src="../../assets/styles/layout.css" />
