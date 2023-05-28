<template>
  <div class="container">
    <!-- 프로필 상단 -->
    <div id="profile-head" class="mb-4">
      <div class="d-flex align-items-center mb-3">
        <p style="font-size: 2em; margin: 0px 30px 0px 0px">
          {{ user.username }}님의 프로필
        </p>
      </div>
      <!-- 팔로우 관련 모음 -->
      <div class="d-flex mb-3">
        <div class="mx-2">
          <p class="mb-0 fw-bold">{{userArticles.length}}</p>
          <p class="mb-0">게시글</p>
        </div>
        <div class="mx-2">
          <p class="mb-0 fw-bold">{{user.followers.length}}</p>
          <p class="mb-0">팔로워</p>
        </div>
        <div class="mx-2">
          <p class="mb-0 fw-bold">{{user.followings.length}}</p>
          <p class="mb-0">팔로잉</p>
        </div>
      </div>
      <hr style="margin-top: 0px;">
    </div>
    <!-- 작성한 게시글 -->
    <div id="user-article" class="mb-5">
      <div class="d-flex mb-6">
        <p class="subtitle">{{ user.username }}님의 글</p>
      </div>
      <div v-if="userArticles.length" class="d-flex flex-column justify-content-center">
        <UserArticleListItem
          v-for="userArticle in userArticles" 
          :key="userArticle.id" 
          :userArticle="userArticle" 
        />
      </div>
      <div v-else class="d-flex mt-3">
        <p>게시글이 없습니다...</p>
      </div>
    </div>
    <!-- 좋아하는 영화 -->
    <div id="user-movie">
      <div class="d-flex">
        <p class="subtitle">{{ user.username }}님이 찜한 영화</p>
      </div>
      <carousel
        v-if="liked_movies.length"
        :paginationEnabled="false"
      >
        <slide 
        id="movieDiv" 
        :key="liked_movie.id" 
        v-for="liked_movie in liked_movies"
        >
          <img 
            :src="image(liked_movie.poster_path)" 
            @click="goToMovieDetail(liked_movie.id)"
            style="width: 12rem;"
            id="movieSlide" 
            loading="lazy" 
          />
        </slide>
      </carousel>
      <div v-else class="d-flex mt-3">
        <p>좋아하는 영화가 없습니다...</p>
      </div>
    </div>

  </div>
</template>

<script>
import axios from 'axios'
import UserArticleListItem from '@/components/UserArticleListItem.vue'
import { Carousel, Slide } from "vue-carousel"
const API_URL = 'http://127.0.0.1:8000'

export default {
  name: 'MyProfileView',
  data() {
    return {
      user: {},
      liked_movies: [],
      liked_movies_id: [],
    }
  },
  mounted() {
    this.getUserProfile()
  },
  components: {
    UserArticleListItem,
    Carousel, 
    Slide,
  },
  methods: {
    getUserProfile() {
      axios({
        method: 'get',
        url: `${API_URL}/profile/${ this.$route.params.loggedInUser }/`,
        headers: {
          Authorization: `Token ${ this.$store.state.token }`,
        },
      })
      .then((res) => {
        this.user = res.data
        this.getUserArticles()
        this.getLikedMovies()
      })
      .catch((err) => {
        console.log(err)
      })
    },
    getUserArticles() {
      this.$store.dispatch('getUserArticles', this.user.username)
    },
    getLikedMovies() {
      const likedMovies = this.user.like_movies.split(' ').map(
          item => parseInt(item.trim())
          ).filter(Boolean);
      this.liked_movies_id = likedMovies
      this.getMovieDetail()
    },
    getMovieDetail() {
      for (let movie_id of this.liked_movies_id) {
        axios({
          method: 'GET',
          url: `https://api.themoviedb.org/3/movie/${ movie_id }`,
          params: {
            api_key: "6461758db19e829585c3a86900619f0c",
            language: 'ko-KR',
          }
        })
        .then((res) => {
          const movie_info = res.data
          this.liked_movies.push(movie_info)
        })
        .catch((err) => console.log(err))
      }
    },
    goToMovieDetail(movieId) {
      this.$router.push({ name: 'MovieDetail', params: { id: movieId }})
    },    
    image(img) {
      return `https://image.tmdb.org/t/p/w500/${ img }`
    },
  },
  computed: {
    userArticles() {
      return this.$store.state.userArticles
    }
  },
}
</script>

<style scoped>
.container {
  padding: 40px 60px;
}
.subtitle {
  display: flex;
  margin: 0px;
  font-weight: 600;
  font-size: 1.2rem; 
}
#movieSlide {
  border-radius: 5px;
  transition: 0.3s;
  margin: 10px 0px 20px 5px;
  width: 100%;
  transition: 0.3s;
}
#movieSlide:hover {
  transform: scale(1.1);
  cursor: pointer;
}
#movieDiv {
  margin-top: 10px;
  margin-bottom: 10px;
  padding-left: 6px;
  padding-right: 6px;
  flex: 1;
}
</style>