<template>
  <div class="article-list-item" @click="goToDetailView">
    <!-- 게시글 제목 -->
    <p class="fw-bold fs-5" style="margin-bottom: 25px;">
      {{ article.title }}
    </p>
    <div class="d-flex">
      <!-- 게시글 작성자 -->
      <div class="me-5">
        <p class="mb-1 fw-bold">작성자</p>
        <router-link 
        class="text-decoration-none fw-bold fs-6"
        :to="{
          name: 'ProfileView',
          params: {username: article.username } 
        }">
          {{ article.username }}
        </router-link>
      </div>
      <!-- 게시글 작성시간 -->
      <div class="me-5">
        <p class="mb-1 fw-bold">작성시간</p>
        {{ article.created_at.substring(0, 10) }}
      </div>
      <!-- 게시글 수정시간 -->
      <div>
        <p class="mb-1 fw-bold">수정시간</p>
        {{ article.updated_at.substring(0, 10) }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ArticleListItem',
  props: {
    article: Object,
  },
  methods: {
    goToDetailView() {
      this.$router.push({ 
        name: 'DetailView', 
        params: { id: this.article.id } 
      })
    },
  },
}
</script>

<style scoped>
.article-list-item {
  width: 650px;
  margin: 20px 0px; 
  padding: 20px 30px;
  border: 1px solid #e9ecef;
  border-radius: 10px;
  cursor: pointer;
}
.article-list-item:hover {
  transform: scale(1.03);
  box-shadow: 3px 3px 4px silver;
  background-color: rgb(243, 243, 243);
}
a:hover {
  color: blue;
}
</style>
