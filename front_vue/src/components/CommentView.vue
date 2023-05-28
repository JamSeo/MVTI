<template>
  <div class="comment-list">
    <CreateComment :article="article" :getComments="getComments"/>
    <p class="fw-bold">댓글 {{this.$store.state.comments.length}}개</p>
    <CommentList :article="article" :getComments="getComments"/>
  </div>
</template>

<script>
import CommentList from '@/components/CommentList'
import CreateComment from '@/components/CreateComment'

export default {
  name: 'CommentView',
  props: {
    article: Object
  },
  components: {
    CommentList,
    CreateComment,
  },
  created() {
    this.getComments()
  },
  methods: {
    getComments() {
      this.$store.dispatch('getComments', this.article?.id)
    }
  },
}
</script>

<style>
.comment-list {
  text-align: start;

}
</style>
