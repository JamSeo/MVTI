<template>
  <div id="mvtiTest">
      <MvtiStartView v-if="showMvtiStart" @start="onStart" />
      <MvtiMainView v-if="showMvtiMain" @result="goResult"/>
      <MvtiResultView v-if="showMvtiResult" @usermvti="pushUserMvti"/>
      <UserMvtiView
      v-if="showUserMvti"
      @restart="restartMvti"
      :userMvti="userMvti"
      :recomGenres="recomGenres"
      :recomMovies="recomMovies"
      />
  </div>
</template>

<script>
import MvtiStartView from '@/components/MvtiStartView.vue'
import MvtiMainView from '@/components/MvtiMainView.vue'
import MvtiResultView from '@/components/MvtiResultView.vue'
import UserMvtiView from '@/components/UserMvtiView.vue'

import axios from 'axios'
const API_URL = 'http://127.0.0.1:8000'


export default {
  name: 'MvtiView',
  data() {
    return{
      userMvti:{},
      recomGenres:[],
      recomMovies:[],
      showMvtiStart: true,
      showMvtiMain: false,
      showMvtiResult: false,
      showUserMvti: false,
    }
  },
  components: {
    MvtiStartView,
    MvtiMainView,
    MvtiResultView,
    UserMvtiView,
  },
  methods: {
    onStart() {
      this.showMvtiStart = false
      this.showMvtiMain = true
    },
    goResult() {
      this.showMvtiMain = false
      this.showMvtiResult = true
    },
    pushUserMvti() {
      this.showMvtiResult = false
      this.showUserMvti = true
      this.openUserMvti()
    },
    restartMvti() {
      this.showUserMvti = false
      this.showMvtiStart = true
    },
    openUserMvti() {
      this.recomMovies = []
      this.recomGenres = []

      axios({
        methods: 'get',
        url:  `${API_URL}/profile/${this.$store.state.loggedInUser}/mvti/`,
        headers: {
          Authorization: `Token ${ this.$store.state.token }`
          },
      })
      .then((res) => {
        if (res.data) {
          this.userMvti = res.data
          let paramSort = []

          const entries = Object.entries(this.userMvti)
          entries.sort((a, b) => b[1] - a[1])
          paramSort = entries.map(([key]) => key)

          if (paramSort.slice(0, 2).includes('actionparam')) {
            this.recomGenres.push({
              "id": 28,
              "name": "액션"
            })
          }
          if (paramSort.slice(0, 2).includes('comedyparam')) {
            this.recomGenres.push({
              "id": 35,
              "name": "코미디"
            })
          }
          if (paramSort.slice(0, 2).includes('dramaparam')) {
            this.recomGenres.push({
              "id": 18,
              "name": "드라마"
            })
          }
          if (paramSort.slice(0, 2).includes('fantasyparam')) {
            this.recomGenres.push({
              "id": 14,
              "name": "판타지"
            })
          }
          if (paramSort.slice(0, 2).includes('romanceparam')) {
            this.recomGenres.push({
              "id": 10749,
              "name": "로맨스"
            })
          }
          if (paramSort.slice(0, 2).includes('sfparam')) {
            this.recomGenres.push({
              "id": 878,
              "name": "SF"
            })
          }
          if (paramSort.slice(0, 2).includes('thrillerparam')) {
            this.recomGenres.push({
              "id": 53,
              "name": "스릴러"
            })
          }
          this.showMvtiStart = false
          this.showMvtiMain = false
          this.showMvtiResult = false
          this.showUserMvti = true
        }
        this.getRecomMovies()
      })
      .catch((err) => {
        console.log(err)
      })
    },
    getRecomMovies() {
      for (let recomGenre of this.recomGenres) {
        axios({
          method: 'GET',
          url:  `https://api.themoviedb.org/3/discover/movie`,
          params: {
            api_key: '6461758db19e829585c3a86900619f0c',
            language: 'ko-KR',
            with_genres: recomGenre.id
          }
        })
        .then((res) => {
          for (let i=0; i<=19; i++) {
            const item = res.data.results[i]
            if (!this.recomMovies.some((movie) => movie.id===item.id)) {
              this.recomMovies.push(item)
            } 
          }
          this.recomMovies.sort((a, b) => (b.vote_average - a.vote_average))
        })
        .catch((err) => console.log(err))
      }
    },
  },
  created() {
    this.openUserMvti()
  }
}
</script>

<style>

</style>