<template>
  <div>
    <div class="form-floating py-3">
      <textarea 
        class="form-control" 
        id="content" 
        style="height: 70px; width: 600px;" 
        v-model.trim="content"
        @keyup.enter="createComment"
      ></textarea>
      <label for="content">댓글달기</label>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
const API_URL = 'http://127.0.0.1:8000'

export default {
  name: 'CreateComment',
  data() {
    return {
      content: null,
    }
  },
  props: {
    getComments: Function,
    article: Object,
  },
  methods: {
    createComment() {
      const content = this.content

      if (!content) {
        alert('내용을 입력해주세요')
        return
      }
      axios({
        method: 'post',
        url: `${API_URL}/api/v1/articles/${ this.$route.params.id }/comments/`,
        data: { content },
        headers: {
          Authorization: `Token ${ this.$store.state.token }`
        },
      })
      .then(() => {
        this.content = ''
        this.getComments()
      })
      .catch((err) => {
        console.log(err)
      })
    },
  },
}
</script>