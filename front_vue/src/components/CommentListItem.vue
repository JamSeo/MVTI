<template>
  <div id="comment-card">
    <div class="d-flex justify-content-between mb-2">
      <div>
        <span class="fw-bold me-2">{{ comment.username }}</span>
        <span style="font-size: 0.8rem; color: #a3a3a3;">
          {{ comment.created_at.substring(0,10) }}
        </span>
      </div>
      <span 
      v-if="this.$store.state.loggedInUser==comment.username"
      id="delete-button"
      @click="deleteComment"
    ><i class="fa-regular fa-square-minus"></i>
    </span>
    </div>
    <span>{{ comment.content }}</span>
  </div>
</template>

<script>
import axios from 'axios'
const API_URL = 'http://127.0.0.1:8000'

export default {
  name: 'CommentListItem',
  props: {
    article: Object,
    comment: Object,
    getComments: Function,
  },
  methods: {
    deleteComment() {
      const comment = this.comment
      axios({
        method: 'delete',
        url: `${API_URL}/api/v1/comments/${ this.comment.id }/`,
        data: { comment },
        headers: {
          Authorization: `Token ${ this.$store.state.token }`
          },
      })
      .then(() => {
        this.getComments()
      })
      .catch((err) => {
        console.log(err)
      })
    }
  }
}
</script>

<style scoped>
#delete-button:hover {
  color: red;
  cursor: pointer;
}
#comment-card {
  padding: 10px;
  width: 600px;
  border: 1px solid #dee2e6;
  border-radius: 5px;
  margin-bottom: 0px;
}
</style>
