<template>
<div id="movieDetaiView">
  <div
  id="movieDetailBackground" 
  class="movie_detail_background"
  :style="{ backgroundImage: `url(${image(theMovie.backdrop_path)})`}"
  >
    <div class="custom_bg">
      <div class="container">
        <div class="movie_details">
          <div 
            class="poster"
            :style="{ backgroundImage: `url(${ image(theMovie.poster_path) })` }"
          >
          </div>
          <div class="specs">
            <div class="d-flex justify-content-between">
              <div class="title">{{ theMovie.title }}</div>
              <button 
              v-show="liked"
              class="btn btn-danger fs-4" 
              style="border: none !important; height: 45px;"
              @click="likeMovie" 
              >
                <i class="fas fa-heart" style="color: #fff;"></i>
              </button>
              <button 
              v-show="!liked" 
              class="btn btn-secondary fs-4" 
              style="border: none !important; height: 45px;"
              @click="likeMovie" 
              >
                <i class="far fa-heart" style="color: #fff;"></i>
              </button>
            </div>
            <div class="original_title">
              {{ theMovie.original_title }}
            </div>
            <div class="labels">
              <span>{{ theMovie.release_date }}</span>
              <span v-for="genre in theMovie.genres" :key="genre.id">{{ genre.name }}</span>
              <span>{{ theMovie.runtime }}분</span>
            </div>
            <div class="tagline" v-if="theMovie.tagline">
              <p>"{{ theMovie.tagline }}"</p>
            </div>
            <div class="overview">
              <p>{{ theMovie.overview }}</p>
            </div>
            <div class="d-flex justify-content-around py-3">
              <div v-if="director" style="width: 180px;">
                <p class="pb-0">감독</p>
                <p class="fw-bold fs-5">{{ director.name }}</p>
              </div>
              <div v-if="writer" style="width: 180px;">
                <p class="pb-0">작가</p>
                <p class="fw-bold fs-5">{{ writer.name }}</p>
              </div>
              <div style="width: 180px;">
                <p class="pb-0">평점</p>
                <p class="fw-bold fs-5">{{ theMovie.vote_average }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div id="movieDetailTrailer" class="movie_detail_trailer">
    <div class="content_wrapper">
      <div class="container py-4">
        <div class="row">
          <div class="col-6">
            <p class="d-flex fw-bold fs-4 mb-0">주요 출연진</p>
            <carousel
              :perPage="4"
              :paginationEnabled="false"
            >
              <slide id="actorDiv" v-for="actor in actors" :key="actor.id">
                <div class="card" style="width: 10rem;">
                  <img img :src="image(actor.profile_path)" id="actorsSlide" />
                  <div class="card-body" style="text-align: left;">
                    <p class="mb-0 fw-bold">{{ actor.name }}</p>
                    <p class="mb-0">{{ actor.character }}</p>
                  </div>
                </div>
              </slide>
            </carousel>
          </div>
          <div 
          class="col-6" 
          v-if="video" 
          style="padding-left: 40px; padding-right: 0px"
          >
            <p class="d-flex fw-bold fs-4 mb-0">트레일러</p>
            <div>
              <iframe
                :src="youtube(video.key)"
                frameborder="0"
                allow="fullscreen;"
                class="mt-3"
                style="height: 34vh; width: 100%"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script src="https://www.youtube.com/iframe_api"></script>
<script>
import axios from 'axios'
import { Carousel, Slide } from "vue-carousel"

const DRF_API_URL = 'http://127.0.0.1:8000'

export default {
  name: 'MovieDetail',
  props: [ 'id' ],
  data() {
    return {
      apiKey: "6461758db19e829585c3a86900619f0c",
      theMovie: {},
      director: [],
      writer: [],
      actors: [],
      video: [],
      liked: null,
    }
  },
  components: {
    Carousel,
    Slide,
  },
  mounted() {
    this.getDetails(),
    this.getCrews(),
    this.getVideos(),
    this.checkLiked()
  },
  methods: {
    image(img) {
      return `https://image.tmdb.org/t/p/original/${ img }`;
    },
    youtube(src) {
      return `https://www.youtube.com/embed/${ src }`;
    },
    getDetails() {
      axios({
        method: 'GET',
        url: `https://api.themoviedb.org/3/movie/${ this.id }`,
        params: {
          api_key: this.apiKey,
          language: 'ko-KR',
        }
      }).then((res) => {
        this.theMovie = res.data
      }).catch((err) => console.log(err))
    },
    getCrews() {
      axios({
        method: 'GET',
        url: `https://api.themoviedb.org/3/movie/${ this.id }/credits`,
        params: { api_key: this.apiKey }
      }).then((res) => {
        this.director = res.data.crew.filter(item => item.job==="Director")[0]
        this.writer = res.data.crew.filter(item => item.job==="Writer")[0]
        this.actors = res.data.cast.filter(item => item.profile_path!==null)
        this.actors.sort((a,b) => b.popularity - a.popularity)
      }).catch((err) => console.log(err))
    },
    getVideos() {
      axios({
        method: 'GET',
        url: `https://api.themoviedb.org/3/movie/${ this.id }/videos`,
        params: { 
          api_key: this.apiKey,
          language: 'ko-KR',
        }
      }).then((res) => {
        this.video = res.data.results.filter(item => item.type==="Trailer")[0]
        if (!this.video) {
          this.video = res.data.results.filter(item => item.type==="Teaser")[0]
        } else {
          this.video = res.data.results[0]
        }
      }).catch((err) => console.log(err))
    },
    likeMovie() {
      const user = this.$store.state.user
      let movie_id = this.id

      axios({
        method:'put',
        url: `${DRF_API_URL}/profile/like/${movie_id}/`,
        data: {
          user, movie_id
        },
        headers: {
          Authorization: `Token ${ this.$store.state.token }`,
        },
      })
      .then((res) => {
        if (typeof movie_id === 'string' ) {
        movie_id = parseInt(movie_id)
        }
        this.$store.state.user = res.data
        const likedMovies = res.data.like_movies.split(' ').map(
          item => parseInt(item.trim())
          ).filter(Boolean);
        if (likedMovies.includes(movie_id)) {
          this.liked = true
        } else {
          this.liked = false
        }
      })
      .catch((err) => {
        console.log(err)
      })
    },
    checkLiked() {
      this.$store.dispatch('getUserProfile')
      const likedMovies = this.$store.state.user.like_movies.split(' ').map(
          item => parseInt(item.trim())
          ).filter(Boolean);
      let movie_id = this.id
      if (typeof movie_id === 'string' ) {
        movie_id = parseInt(movie_id)
        }
      if (likedMovies.includes(movie_id)) {
        this.liked = true
      } else {
        this.liked = false
      }
    },
  }
};
</script>

<style scoped>
.movie_detail_background {
  background-position: left calc((50vw - 170px) - 340px) top;
  background-size: cover;
  background-repeat: no-repeat;
  position: relative;
  width: 100%;
  z-index: 1;
}
.custom_bg {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  background-image: linear-gradient(to right, rgba(94.5, 94.5, 94.5, 1) calc((50vw - 170px) - 340px), rgba(94.5, 94.5, 94.5, 0.84) 50%, rgba(94.5, 94.5, 94.5, 0.84) 100%);
}
.container {
  padding: 40px 0px;
  margin: 0 auto;
}
.movie_details{
  display: flex;
  color: #fff;
}
.movie_details .poster {
  flex-shrink: 0;
  width: 300px;
  height: 450px;
  margin-right: 70px;
  border-radius: 10px;
  background-color: lightgray;
  background-size: cover;
  background-position: center;
}
.movie_details .specs {
  flex-grow: 1;
  text-shadow: 1px 1px 8px black;
}
.movie_details .specs .title {
  color: white;
  display: flex;
  font-family: "Gill Sans", sans-serif;
  font-weight: 600;
  font-size: 40px;
  line-height: 1;
  margin-bottom: 10px;
}
.movie_details .specs .original_title {
  color: white;
  display: flex;
  font-family: "Gill Sans", sans-serif;
  font-weight: 600;
  font-size: 30px;
  line-height: 1;
  margin-bottom: 10px;
}
.movie_details .specs .labels {
  display: flex;
  margin-bottom: 16px;
}
.movie_details .specs .labels span::after{
  content:"\00b7";
  margin: 0 6px;
}
.movie_details .specs .labels span:last-child::after{
  display: none;
}
.movie_details .specs .tagline {
  font: bold 1.4em system-ui;
  display: flex;
  margin-top: 30px; 
}
.movie_details .specs .overview {
  margin-top: 20px;
  display: flex;
  text-align: left;
}
.card:hover {
  transform: scale(1.0);
}
#actorDiv {
  margin-top: 10px;
  margin-bottom: 10px;
  padding-left: 6px;
  padding-right: 6px;
  flex: 1;
}
#actorsSlide {
  transition: 0.3s;
  width: 100%;
  border-radius: 5px 5px 0px 0px;
}
</style>