<template>
  <!-- 타이틀 -->
  <div id="game-main">
    <div class="container">
      <div class="title-wrap">
        <p style="color: white;">{{ currentIndex+1 }} / {{ qnas.length+1 }}</p>
        <h2 class="title">{{ title }}</h2>
        <p>{{ currentIndex+1 }} / {{ qnas.length+1 }}</p>
      </div>
      <!-- 진행상태 바 -->
      <div class="progress" style="height: 0.5rem;" role="progressbar" aria-label="Success striped example" aria-valuemin="0" aria-valuemax="100">
        <div class="progress-bar progress-bar-striped bg-success" :style="{ width: progressBarWidth }"></div>
      </div>
      <!-- 질문 Component -->
      <MvtiMainQna
        :currentIndex="currentIndex" 
        :qnas="qnas" 
        @pickOne="addOne" 
        @pickTwo="addTwo"
        @goNext="next" 
      />
    </div>
  </div>
</template>

<script>
import MvtiMainQna from '@/components/MvtiMainQna.vue'

export default {
  name: 'MvtiMainView',
  data() {
    return {
      title: 'MVTI 테스트',
      currentIndex: 0,
      qnas:[
        {
          Q: '아침에 일어난 당신. 커텐을 젖히며 드는 생각은?',
          A: [
            '"햇빛아 구름아 보고싶었어~" 자연을 느끼며 꽃에 물을 준다', 
            '"몹쓸 세상아!!!! 오늘도 기꺼이 정복해주마 캬하하" 열정이 솟구치며 피가 막 돈다'
          ],
        },
        {
          Q: '멀티캠퍼스에 도착한 당신. 1층 로비로 들어가며',
          A: [
            '"ㅎㅎ" 당신을 취향저격하는 스타일의 우연한 인연을 기대한다', 
            '"아놔 여기를 또왔네..ㅡㅡ" 온감각이 예민해지며 피가 막 돈다'
          ],
        },
        {
          Q: '점심 식사 전 엘리베이터를 기다리는 당신.',
          A: [
            '"아 배고파~배고파~오늘의 메뉴는 뭘까ㅎㅎ" 가만히 흐뭇한 표정을 짓는다', 
            '"옆 반 사람들 양심도 없나. 왜이렇게 벌써 나와있는거야..ㅡㅡ"'
          ],
        },
        {
          Q: '오후 수업 듣는 당신. 나른하게 멍때리며',
          A: [
            'print("지금하는_생각")  #=> null', 
            '"총 든 무장공비가 문열고 들어오면 어떻게 하지?" 긴급 건물탈출 계획을 세운다'
          ],
        },
        {
          Q: '오후 6시 취업박람회가 끝난 당신. 18층 엘리베이터 줄을 기다리며',
          A: [
            '"강의 들었어? 나는 처음부터 끝까지 풀로 잤어ㅋㅋ" 친구들과 수다를 떤다', 
            '"집 빨리 가고 싶은데..그냥 뛰어내리면 빠르지 않을까?" 낙하산 타고 내려가는 상상을 한다'
          ],
        },
      ],
      answers:[],
    }
  },
  components: {
    MvtiMainQna,
  },
  methods: {
    addOne() {
      this.answers.push(1)
      this.next()
    },
    addTwo() {
      this.answers.push(2)
      this.next()
    },
    next() {
      if(this.currentIndex < this.qnas.length-1) {
        this.currentIndex++;
      } else {
        this.showResult();
      }
    },
    showResult() {
      this.$store.state.mvtiAnswers = this.answers
      this.$emit('result')
    },
  },
  computed: {
    progressPercentage() {
      return (this.currentIndex+1) / (this.qnas.length+1) * 100
    },
    progressBarWidth() {
      return `${ this.progressPercentage }%`
    }
  }
}
</script>

<style scoped>
#game-main {
  width: 600px;
  height: 100%;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  overflow: hidden;
  font-weight: 400;
  line-height: 1.2rem;
  font-family: 'Noto Sans KR', sans-serif;
}
.title-wrap {
  display: flex;
  justify-content: space-between;
  align-items: end;
}
.title-wrap .title {
  font-size: 1.5rem;
}
</style>