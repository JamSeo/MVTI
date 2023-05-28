<template>
<!-- 도입부 -->
  <div id="game-start">
    <div class="container">
      <!-- 이미지 -->
      <div class="img-box">
        <img src="@/assets/MVTI_start.gif" alt="...">
      </div>
      <!-- 제목, 부제목 -->
      <h2 class="game-intro-title">취향저격 MVTI 테스트</h2>
      <div class="game-intro-text">
        <span>자연 감수성으로 알아본 나의 영화 취향</span>
      </div>
      <!-- 게임 시작 버튼 -->
      <div class="btn-wrap">
        <div class="btn-game-start" @click="start">테스트 시작!</div>
      </div>
      <!-- 참여자 수 -->
      <dl class="game-count">
        <dt class="count-label">
          "참여자 수"
        </dt>
        <dd class="count-num">123,165</dd>
      </dl>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MvtiStartView',
  methods: {
    start() {
      this.$emit('start')
    }
  }
}
</script>

<style scoped>
#game-start {
  width: 500px;
  height: 100%;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  overflow: hidden;
  font-size: 10.5rem;
  font-weight: 400;
  line-height: 1.2rem;
  font-family: 'Noto Sans KR', sans-serif;
}
.container {
  padding: 60px 40px;
}
.img-box {
  margin-bottom: 1.625rem;
  overflow: hidden;
  width: 100%;
}
.img-box img {
  overflow: clip;
  vertical-align: middle;
  border-style: none;
}
.game-intro-title {
  font-weight: bold;
  font-size: 2rem;
  line-height: 1.55em;
  margin-bottom: 0.9375rem;
  letter-spacing: -1.5px;
  text-align: center;
}
.game-intro-text {
  font-weight: 700;
  color: #909090;
  font-size: 1.2rem;
  line-height: 1.55em;
  letter-spacing: -1.5px;
  text-align: center;
}
.btn-wrap {
  margin: 2rem auto;
  width: 16rem;
}
.btn-game-start {
  font-weight: bold;
  background-color: #4f8f56;
  color: #ffffff;
  display: inline-block;
  width: 100%;
  box-shadow: 0.3rem 0.4rem 0 #222222;
  border-radius: 3rem;
  border: 0.25rem solid #222222;
  font-size: 1.8rem;
  text-align: center;
  line-height: 5rem;
}
.btn-game-start:hover {
  cursor: pointer;
  transform: scale(1.1);
}
.game-count {
  margin-bottom: 4rem;
  text-align: center;
}
.game-count .count-label {
  padding: 0.45rem 0rem;
  font-weight: bold;
  font-size: 1.5rem;
  margin-bottom: 0.3rem;
  color: #222;
  position: relative;
  display: inline-block;
  z-index: 0;
}
.game-count .count-label::before {
  background: #84d38d;
  content: '';
  height: 0.5rem;
  bottom: 0.15rem;
  position: absolute;
  left: 0;
  width: 100%;
  z-index: -1;
  box-sizing: border-box;
}
.game-count .count-num {
  font-weight: 700;
  color: #222222;
  font-size: 2.3rem;
  line-height: 1.5;
}
</style>