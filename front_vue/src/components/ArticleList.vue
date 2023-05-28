<template>
  <div class="article-list">
    <ArticleListItem 
      v-for="article in articles" 
      :key="article.id" 
      :article="article"
    />
  </div>
</template>

<script>
import ArticleListItem from '@/components/ArticleListItem'

export default {
  name: 'ArticleList',
  components: {
    ArticleListItem,
  },
  computed: {
    articles() {
      return this.$store.state.articles.slice().reverse()
    }
  }
}
</script>

<style>
.article-list {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
