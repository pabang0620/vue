<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { RouterLink } from 'vue-router'

const mobileNavOpen = ref(false)
const isScrolled = ref(false)
const isSticky = ref(false)

function toggleMobileNav() {
  mobileNavOpen.value = !mobileNavOpen.value
}

function closeMobileNav() {
  mobileNavOpen.value = false
}

function handleScroll() {
  const y = window.scrollY
  isScrolled.value = y > 0
  isSticky.value = y > 66
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
  handleScroll()
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <header :class="{ 'is-scrolled': isScrolled, 'is-sticky': isSticky }">
    <div class="header-inner">
      <h1 class="header-logo">
        <RouterLink to="/"><img src="https://www.ctp.or.kr/css/egovframework/img/userpage/header-logo.png" alt="CTP 수출지원서비스" /></RouterLink>
      </h1>
      <nav>
        <ul class="gnb">
          <li><RouterLink to="/bigbuyer/finder">빅바이어 마케팅</RouterLink></li>
          <li><RouterLink to="/apply">사업 참가신청</RouterLink></li>
        </ul>
      </nav>
      <div class="util">
        <a href="#">로그인</a>
        <a href="#">회원가입</a>
      </div>
      <div
        class="hamburger"
        :class="{ open: mobileNavOpen }"
        aria-label="메뉴 열기"
        @click="toggleMobileNav"
      >
        <span></span><span></span><span></span>
      </div>
    </div>
  </header>

  <!-- 모바일 내비게이션 -->
  <div class="mobile-nav" :class="{ open: mobileNavOpen }">
    <ul>
      <li><RouterLink to="/bigbuyer/finder" @click="closeMobileNav">빅바이어 마케팅</RouterLink></li>
      <li><a href="#" @click="closeMobileNav">공지사항</a></li>
    </ul>
    <div class="m-util">
      <a href="#" class="m-login" @click="closeMobileNav">로그인</a>
      <a href="#" @click="closeMobileNav">회원가입</a>
    </div>
  </div>
</template>

<style src="../../assets/styles/layout.css" />
