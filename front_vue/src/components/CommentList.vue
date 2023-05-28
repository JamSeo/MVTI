<template>
  <div class="comment-list">
    <CommentListItem 
    v-for="comment in comments" :key="comment.id" :comment="comment"
    :article="article" :getComments="getComments"/>
  </div>
</template>

<script>
import CommentListItem from '@/components/CommentListItem'

export default {
  name: 'CommentList',
  props:{
    article: Object,
    getComments: Function,
  },
  components: {
    CommentListItem,
  },
  computed: {
    comments() {
      return this.$store.state.comments
    }
  }
}
</script>

<style>
.article-list {
  text-align: start;
}
</style>
