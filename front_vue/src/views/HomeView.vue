<template>
  <div id='home'>
    <!-- 검색 창 -->
    <div class="input-group w-50 mt-4 mb-3 mx-auto">
      <input
        type="text" 
        class="form-control form-control-lg rounded-pill px-4 py-2"
        list="datalistOptions"
        placeholder="영화제목을 입력해 주세요" 
        v-model.trim="inputData"
        @keyup="searchMovie"
      >
      <!-- 검색키 추천 -->
      <datalist id="datalistOptions" >
        <option 
        v-for="movie_search in movies_search" 
        :key="movie_search.title" 
        :value="movie_search.title"
        ></option>
      </datalist>
    </div>
    <p class="my-0 fw-semibold">{{ no_results }}</p>
    <br>
    <p class="subtitle fw-bold fs-6">{{ results }}</p>
    <!-- 검색 전 -->
    <div v-if="!movies_search.length">
      <MovieSlide 
      :key="movie.id" 
      :type="movie.type" 
      :description="movie.description" 
      v-for="movie in movies"
      />
    </div>
    <!-- 검색 후-->
    <div v-else>
      <div id='searchMovies' class="row">
        <MovieCard 
        v-for="movie_search in movies_search" 
        :key="movie_search.id" 
        :movie="movie_search"
        />
      </div>
      <br>
      <p class="subtitle">더 다양한 영화도 보고가세요!</p>
      <div class="row">
        <MovieCard 
        v-for="movie_related in movies_related" 
        :key="movie_related.id" 
        :movie="movie_related" 
        />
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { mapState } from 'vuex'
import MovieCard from '@/components/MovieCard.vue'
import MovieSlide from "@/components/MovieSlide.vue"

export default {
  name: 'HomeView',
  components: {
    MovieCard,
    MovieSlide,
  },
  data() {
    return {
      apiKey: "6461758db19e829585c3a86900619f0c",
      inputData: null,
      no_results: null,
      results: null,
      movies_search: [],
      movies_related: [],
    }
  },
  methods: {
    searchMovie() {
      if (this.inputData) {
        axios({
          method: 'GET',
          url: `https://api.themoviedb.org/3/search/movie`,
          params: {
            api_key: this.apiKey,
            language: 'ko-KR',
            query: this.inputData
          }
        }).then((res) => {
          if (res.data.results.length !== 0) {
            this.movies_search = res.data.results.filter(movie => movie.poster_path !== null)
            this.no_results = ''
            this.results = `검색결과: 약 ${ this.movies_search.length }개`
            this.searchMovieRelated(this.movies_search[0].id)
          } else {
            this.no_results = `입력하신 검색어 "${ this.inputData }"(와)과 일치하는 결과가 없습니다.`
            this.results = ''
          }
        }).catch((err) => console.log(err))
      } else {
        this.movies_search = []
        this.results = this.no_results = ''
      }
    },
    searchMovieRelated(id) {
      axios({
          method: 'GET',
          url: `https://api.themoviedb.org/3/movie/${id}/similar`,
          params: {
            api_key: this.apiKey,
            language: 'ko-KR'
          }
      })
      .then((res) => {
        this.movies_related = res.data.results
      }).catch((err) => console.log(err))
    }
  },
  computed: {
    ...mapState(['selectedMovie']),
    movies() {
      return [
        {id: 1, type: "now_playing", description: "현재 상영하는 영화"},
        {id: 2, type: "popular", description: "지금 뜨는 영화"},
        {id: 3, type: "top_rated", description: "평단의 찬사를 받은 영화"},
        {id: 4, type: "upcoming", description: "곧 개봉하는 영화"},
      ]
    },
  }
}  
</script>

<style scoped>
#home {
  width: 95%;
  height: 100%;
  text-align: center;
  margin: auto;
}
.subtitle {
  display: flex;
  justify-content: flex-start;
  margin-top: 0px;
  margin-bottom: 0px;
  font-weight: 800;
  font-size: 1.1rem; 
}
#movies h4 {
  color: #e9e9e9;
  text-align: center;
  font-family: Arial, Helvetica, sans-serif;
  padding-top: 30px;
  padding-bottom: 30px;
}
@media only screen and (max-width: 599px) {
  #movies h4 {
    font-size: 14px;
  }
}
.form-control:focus { 
  border: 2px solid #42b983;
  box-shadow: 3px 3px 4px silver;
  outline: 0 none;
}
</style>