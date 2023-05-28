<template>
  <div class="col-4 col-sm-3 col-lg-2">
    <!-- 무비 카드 -->
    <div class="card mx-1 my-2">
      <img 
      class="card-img object-fit-cover"
      @click="goToDetail(movie.id)"
      :src="image(movie.poster_path)" 
      alt="..."
      >
    </div>
  </div>
</template>

<script>
export default {
  name: 'MovieCard',
  props: {
    movie: Object
  },
  methods: {
    image(img) {
      return `https://image.tmdb.org/t/p/w500/${img}`
    },
    goToDetail(movieId) {
      this.$router.push({ name: 'MovieDetail', params: { id: movieId }})
    },
  }
} 
</script>

<style>
.card {
  border: 1px solid #ccc;
  transition: background-color 0.3s, cursor 0.3s, transform 0.3s, border 0.3s;
}
.card:hover {
  cursor: pointer;
  transform: scale(1.1);
  z-index: 5;
}
</style>