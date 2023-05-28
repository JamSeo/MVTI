<template>
  <div class="container d-flex justify-content-center">
    <form @submit.prevent="createArticle">
      <!-- 제목 -->
      <div class="mb-3">
        <label for="title" class="form-label">Title</label>
        <input type="text" class="form-control" id="title" autocomplete='off' v-model.trim="title">
      </div>
      <!-- 내용 -->
      <div class="mb-4">
        <label for="content" class="form-label">Content</label>
        <input type="text" class="form-control" id="content" autocomplete='off' v-model.trim="content">
      </div>
      <!-- 제출버튼 -->
      <div class="d-flex mb-3">
        <button type="submit" class="btn btn-success">Submit</button>
      </div>
    </form>
  </div>
</template>

<script>
import axios from 'axios'
const API_URL = 'http://127.0.0.1:8000'

export default {
  name: 'ArticleCreateView',
  data() {
    return {
      title: '',
      content: '',
    }
  },
  methods: {
    createArticle() {
      const title = this.title
      const content = this.content

      if (!title) {
        alert('제목을 입력해주세요')
        return
      } else if (!content){
        alert('내용을 입력해주세요')
        return
      }
      
      axios({
        method: 'post',
        url: `${API_URL}/api/v1/articles/`,
        data: { title, content},
        headers: {
          Authorization: `Token ${ this.$store.state.token }`
        },
      })
      .then(() => {
        this.$router.push({ name: 'ArticleView' })
      })
      .catch((err) => {
        console.log(err)
      })
    }
  }
}
</script>

<style>
.container {
  padding: 40px;
}
.container ul li a {
  text-decoration: none;
}
.form-label {
  display: flex;
  font-size: 1.2em;
}
.form-control:focus {
  border : 1px solid #dee2e6;
  box-shadow: 3px 3px 4px silver;
}
#title {
  width: 500px;
}
#content {
  width: 500px;
  height: 30vh;
}
</style>