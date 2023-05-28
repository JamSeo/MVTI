<template>
  <div class="article-list-item" @click="goToDetailView">
    <p class="d-flex fs-4" style="margin-bottom: 25px;">{{ userArticle.title }}</p>
    <div class="d-flex">
      <div style="margin-right: 60px">
        <p class="mb-1 fw-bold">작성시간</p>
        {{ userArticle.created_at.substring(0, 10) }}
      </div>
      <div style="margin-right: 30px">
        <p class="mb-1 fw-bold">수정시간</p>
        {{ userArticle.updated_at.substring(0, 10) }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UserArticleListItem',
  props: {
    userArticle: Object,
  },
  methods: {
    goToDetailView() {
      this.$router.push({ 
        name: 'DetailView', 
        params: { id: this.userArticle.id } 
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
  box-shadow: 3px 3px 4px silver;
  transform: scale(1.03);
  background-color: rgb(243, 243, 243);
}
</style>