<template>
  <div id="newMovies">
    <p class="subtitle">{{ description }}</p>
    <div v-show="showLoading" id="loadingMovie">
    </div>
    <carousel
      :perPage="9"
      :navigateTo="0"
      :mouse-drag="false"
      :paginationEnabled="false"
      :navigationEnabled="true"
      :navigationClickTargetSize="5"
      :autoplay="true"
      :autoplayTimeout="3000"
      :loop="true"
      :minSwipeDistance="4"
    >
      <slide id="movieDiv" :key="movie.id" v-for="movie in movies">
        <img :src="image(movie.poster_path)" @click="goToDetail(movie.id)" id="imagePosterSlide" loading="lazy" />
      </slide>
    </carousel>
  </div>
</template>

<script>
import { Carousel, Slide } from "vue-carousel"
import { Movies } from "@/services/api"

export default {
  name: "MovieSlide",
  data() {
    return {
      movies: [],
      showLoading: true,
      paginationButtons: false,
    };
  },
  props: {
    type: String,
    description: String,
  },
  components: {
    Carousel,
    Slide,
  },
  mounted() {
    this.getMovieDetail()
  },
  methods: {
    async getMovieDetail(){
      this.showLoading = true
      try {
        const { data: { results } } = await Movies(this.type).get()
        this.movies = results.filter(movie => movie.poster_path !== null)
      } catch (error) {
        console.error(error)
      } finally {
        this.showLoading = false
      }
    },
    goToDetail(movieId) {
      this.$router.push({ name: 'MovieDetail', params: { id: movieId }})
    },
    image(img) {
      return `https://image.tmdb.org/t/p/w500/${ img }`
    }
  }
};
</script>

<style>
#newMovies {
  width: 100%;
  height: 100%;
  text-align: center;
  margin: auto;
}
#buttonNexts {
  color: #f1f;
}
#newMovies h1 {
  color: #cacaca;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 22px;
  font-weight: bold;
  margin-bottom: 10px;
  margin-top: 15px;
  padding-left: 20px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
#loadingMovie {
  display: flex;
  justify-content: center;
  align-items: center;
}
#movieDiv {
  margin-top: 15px;
  margin-bottom: 10px;
  padding-left: 6px;
  padding-right: 6px;
  flex: 1;
}
#imagePosterSlide {
  border-radius: 5px;
  transition: 0.3s;
  height: 300px;
  margin-bottom: 20px;
  width: 200px;
}
#imagePosterSlide:hover {
  transform: scale(1.1);
  cursor: pointer;
}
.subtitle {
  display: flex;
  justify-content: flex-start;
  margin-top: 0px;
  margin-bottom: 0px;
  font-weight: 800;
  font-size: 1.1rem; 
}
button.VueCarousel-navigation-button {
  height: 90%;
  width: 2.7%;
  color: silver !important;
  outline: none !important;
}
button.VueCarousel-navigation-button:hover {
  background-color: #f0eded;
}
@media only screen and (max-width: 599px) {
  #newMovies h1 {
    font-size: 15px;
    margin-bottom: 5px;
    margin-top: 5px;
  }
}
</style>
  