<template>
  <div class="container">
    <div>
      <ul class="nav nav-tabs">
        <li class="nav-item px-0">
          <a 
          class="nav-link active fw-bold" 
          style="color: #42b983;" 
          href=""
          >전체
          </a>
        </li>
        <li class="nav-item px-0">
          <a 
          class="nav-link text-d fw-bold" 
          style="color: rgba(33, 37, 41, 0.75);" 
          href="/create"
          >글작성
          </a>
        </li>
      </ul>
    </div>
    <ArticleList />
  </div>
</template>

<script>
import ArticleList from '@/components/ArticleList.vue'

export default {
  name: 'ArticleView',
  components: {
    ArticleList,
  },
  computed:{
    isLogin() {
      return this.$store.getters.isLogin // 로그인 여부
    }
  },
  created() {
    this.getArticles()
  },
  methods: {
    getArticles() {
      if (this.isLogin) {
        this.$store.dispatch('getArticles')
      } else {
        alert('로그인이 필요한 페이지입니다...')
        this.$router.push({ name: 'LogInView' })
      }
    }
  }
}
</script>

<style scoped>
.container {
  padding: 40px 60px;
}
.container ul li a {
  text-decoration: none;
}
</style>
