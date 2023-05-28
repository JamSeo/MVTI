<template>
  <!-- 결과 -->
  <div id="result" class="result-wrap container">
    <div id="waitResult" v-show="!showResult">
      <h3 class="fw-bold">검사 결과를 확인하세요!</h3>
    </div>
    <div class="img-box" @click="changeShowResult">
      <img src="@/assets/MVTI_check_button.png" alt="">
    </div>
    <div>
      <i class="fa-regular fa-hand-point-up"></i>
      이미지를 클릭하세요!
    </div>
    <div id="finalResult" v-show="showResult">
      <p >{{ results }}</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
const API_URL = 'http://127.0.0.1:8000'

export default {
  name: 'MvtiResultVue',
  data() {
    return{
      showResult: false,
      results: {
        actionParam: 0,
        comedyParam: 0,
        dramaParam: 0,
        fantasyParam: 0,
        romanceParam: 0,
        sfParam: 0,
        thrillerParam: 0,
      },
    }
  },
  created() {
    this.applyResults
  },
  methods:{
    changeShowResult() {
      this.applyResults()
      this.createUserMvti()
      this.showResult = true
    },
    applyResults() {
      if (this.answers[0] === 1) {
        this.results.fantasyParam += 1
        this.results.romanceParam += 1
        this.results.dramaParam += 2
      } else if (this.answers[0] === 2) {
        this.results.comedyParam += 1
        this.results.actionParam += 1
        this.results.thrillerParam += 1
      }
      if (this.answers[1] === 1) {
        this.results.fantasyParam += 1
        this.results.dramaParam += 1
        this.results.romanceParam += 2
      } else if (this.answers[1] === 2) {
        this.results.actionParam += 1
        this.results.thrillerParam += 2
        this.results.sfParam += 1
      }
      if (this.answers[2] === 1) {
        this.results.comedyParam += 2
        this.results.dramaParam += 2
      } else if (this.answers[2] === 2) {
        this.results.sfParam += 1
        this.results.thrillerParam += 1 
        this.results.actionParam += 2
      }
      if (this.answers[3] === 1) {
        this.results.comedyParam += 2
        this.results.dramaParam += 2
      } else if (this.answers[3] === 2) {
        this.results.actionParam += 1
        this.results.thrillerParam += 1
        this.results.sfParam += 1
        this.results.fantasyParam += 1
      }
      if (this.answers[4] === 1) {
        this.results.comedyParam += 2
        this.results.dramaParam += 2
      } else if (this.answers[4] === 2) {
        this.results.sfParam += 1
        this.results.fantasyParam += 1
        this.results.actionParam += 2
      }
    },
    createUserMvti() {
      const actionparam = this.results.actionParam
      const comedyparam = this.results.comedyParam
      const dramaparam = this.results.dramaParam
      const fantasyparam = this.results.fantasyParam
      const romanceparam = this.results.romanceParam
      const sfparam = this.results.sfParam
      const thrillerparam = this.results.thrillerParam

      axios({
        method: 'post',
        url:  `${API_URL}/profile/${this.$store.state.loggedInUser}/mvti/`,
        data: { 
          actionparam,
          comedyparam,
          dramaparam,
          fantasyparam,
          romanceparam,
          sfparam,
          thrillerparam
          },
          headers: {
          Authorization: `Token ${ this.$store.state.token }`
          },
      })
      .then(() => {
        this.$emit('usermvti')
      })
      .catch((err) => {
        console.log(err)
      })
    }
  },
  computed: {
    answers() {
      return this.$store.state.mvtiAnswers
    }
  }
}
</script>

<style scoped>
#result {
  width: 500px;
  height: 100%;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  overflow: hidden;
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
  height: 300px;
  overflow: clip;
  vertical-align: middle;
  border-style: none;
}
.img-box img:hover {
  transform: scale(1.08);
  cursor: pointer;
}
</style>