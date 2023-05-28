<template>
  <div class="mt-5">
    <!-- 이미지 -->
    <div class="img-box w-100">
      <img src="@/assets/MVTI_Qna.gif" alt="">
    </div>
    <!-- 질문 -->
    <h4 class="question-title">{{ qnas[this.currentIndex].Q }}</h4>
    <!-- 답1 -->
    <div id="answer1" @click="clickOne">
      <p>{{ qnas[this.currentIndex].A[0] }}</p>
    </div>
    <!-- 답2 -->
    <div id="answer2" @click="clickTwo">
      <p>{{ qnas[this.currentIndex].A[1] }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MvtiMainQna.vue',
  props: {
    qnas:Array,
    currentIndex:Number
  },
  methods: {
    clickOne() {
      this.$emit('pickOne')
    },
    clickTwo() {
      this.$emit('pickTwo')
    },
  }
}
</script>

<style scoped>
.img-box {
  margin-bottom: 1.625rem;
  overflow: hidden;
  width: 100%;
}
.img-box img {
  height: 300px;
  overflow: clip;
  vertical-align: middle;
  border-style: none;
}
.question-title {
  color: #222222;
  font-size: 1.15rem;
  text-align: center;
  line-height: 1.55em;
  margin-top: -0.34375rem;
  font-weight: 700;
  margin-bottom: 1.125rem;
  word-break: keep-all;
  word-wrap: break-word;
}
#answer1 {
  border: 1px solid silver;
  border-radius: 2rem;
  height: 6rem;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 2rem;
  padding: 20px;
}
#answer1 p {
  margin: 0px;
  font-size: 1.1rem;
  font-weight: 700;
}
#answer1:hover {
  transform: scale(1.03);
  box-shadow: 2px 2px 4px silver;
  background-color: #4f8f56;
  color: white;
  border-color: white;
  cursor: pointer;
}
#answer2 {
  border: 1px solid silver;
  border-radius: 2rem;
  height: 6rem;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 2rem;
  padding: 20px;
}
#answer2 p {
  margin: 0px;
  font-size: 1.1rem;
  font-weight: 700;
}
#answer2:hover {
  transform: scale(1.03);
  box-shadow: 2px 2px 4px silver;
  background-color: #4f8f56;
  color: white;
  border-color: white;
  cursor: pointer;
}
</style>