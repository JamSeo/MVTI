<template>
  <div class="container">
    <!-- 테스트 결과 -->
    <div class="test_result">
      <p>{{this.$store.state.loggedInUser}}님의 취향저격 장르는</p> 
      <span v-for="genre in recomGenres" :key="genre.id" class="fs-3">
        "{{ genre.name }}"
      </span>
      <span>입니다</span>
    </div>
    <!-- 이미지 -->
    <div class="img-box mb-5">
      <img src="@/assets/MVTI_result.gif" alt="...">
    </div>
    <!-- 추천 영화 -->
    <div class="test_result">
      {{this.$store.state.loggedInUser}}님에게 추천하는 영화
      <div class="row">
        <MovieCard 
        v-for="recomMovie in recomMovies.slice(0, 12)" 
        :key="recomMovie.id" 
        :movie="recomMovie" 
        />
      </div>
    </div>
    <button type="button" class="restarttest btn btn-success btn-lg" @click="restartMvti">테스트 다시하기</button>
  </div>
</template>

<script>
import axios from 'axios'
import MovieCard from '@/components/MovieCard.vue'
const API_URL = 'http://127.0.0.1:8000'

export default {
  name:'UserMvtiVue',
  props: {
    recomGenres: Array,
    recomMovies: Array,
  },
  components: {
    MovieCard,
  },
  methods: {
    restartMvti() {
      axios({
        method: 'delete',
        url:  `${API_URL}/profile/${this.$store.state.loggedInUser}/mvti/`,
        headers: {
        Authorization: `Token ${ this.$store.state.token }`
        },
      })
      .then(() => {
        this.$emit('restart')
      })
      .catch((err) => {
        console.log(err)
      })
    },

  },
}
</script>

<style scoped>
.container {
  padding: 60px 40px;
}
.test_result {
  margin-bottom: 20px;
  font-size: 1.1rem;
  font-weight: 700;
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
</style>