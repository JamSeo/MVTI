<template>
  <div class="container">
    <div>
      <ul 
      class="nav nav-tabs"
      style="font-family: Avenir, Helvetica, Arial, sans-serif;"
      >
        <li class="nav-item px-0">
          <a 
          class="nav-link text-d fw-bold" 
          style="color: rgba(33, 37, 41, 0.75);"
          aria-current="page" 
          href="/articles"
          >전체
          </a>
        </li>
        <li class="nav-item px-0">
          <a 
          class="nav-link active fw-bold" 
          style="color: #42b983;"
          href="/create"
          >글작성
          </a>
        </li>
      </ul>
    </div>
    <ArticleCreateView />
  </div>
</template>

<script>
import ArticleCreateView from '@/components/ArticleCreateView.vue'

export default {
  name: 'CreateView',
  components: {
    ArticleCreateView
  },
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
