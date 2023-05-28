<template>
  <div class="container">
    <div id="article-detail-head">
      <div class="d-flex justify-content-between w-100">
        <p>
          <router-link 
          :to="{
            name: 'ProfileView',
            params: {username: article?.username } 
          }"
          class="text-decoration-none fw-bold fs-4"
          >
            {{ article?.username }}
          </router-link>
        </p>
        <div 
        v-if="this.$store.state.loggedInUser===article?.username"
        id="article-delete-button"
        @click="deleteArticle"
        >
          <i class="fa-solid fa-trash-can"></i>
        </div>
      </div>
      <p class="fs-4 mb-3">{{ article?.title }}</p>
      <div class="d-flex">
        <p class="mb-0">
          작성시간 : {{ article?.created_at.substring(0,10) }} |
          수정시간 : {{ article?.updated_at.substring(0,10) }}
        </p>
      </div>
    </div>
    <div id="article-detail-content">
      <p>{{ article?.content }}</p>
    </div>
    <hr>
    <CommentView :article="article"/>
  </div>
</template>

<script>
import axios from 'axios'
const API_URL = 'http://127.0.0.1:8000'

import CommentView from '@/components/CommentView.vue'

export default {
  name: 'DetailView',
  components: {
    CommentView,
  },
  data() {
    return {
      article: {},
      liked: null,
    }
  },
  created() {
    this.getArticleDetail()
  },
  methods: {
    getArticleDetail() {
      axios({
        method: 'get',
        url: `${API_URL}/api/v1/articles/${ this.$route.params.id }/`,
      })
      .then((res) => {
        this.article = res.data
        this.isLiked()
      })
      .catch((err) => {
        console.log(err)
      })
    },
    deleteArticle() {
      axios({
        method: 'delete',
        url: `${API_URL}/api/v1/articles/${ this.$route.params.id }`,
        headers: {
          Authorization: `Token ${ this.$store.state.token }`
          },
      })
      .then(() => {
        this.$router.push({name: 'ArticleView'})
      })
      .catch((err) => {
        console.log(err)
      })
    },
    likeArticle() {
      axios({
        method: 'post',
        url: `${API_URL}/api/v1/articles/${ this.article?.id }/like/`,
        headers: {
          Authorization: `Token ${ this.$store.state.token }`,
        },
      })
        .then((res) => {
          console.log(res.data)
          this.article = res.data
        })
        .catch((err) => {
          console.log(err)
        })
      if (this.liked === true) {
        this.liked = false;
      } else {
        this.liked = true;
        }
      console.log(this.liked)
    }, 
    isLiked() {
      this.liked = null
      if (this.article.liked_users.includes(this.$store.state.loggedInUser)) {
        this.liked = true;
        console.log(this.liked)
      } else {
        this.liked = false;
        console.log(this.liked)
      }
      }
    },
  }
  
</script>

<style scoped>
.container {
  padding: 40px 60px;
}
#article-detail-head {
  display: flex;
  flex-direction: column;
  align-items: start;
  padding: 20px;
  margin-bottom: 20px;
}
#article-detail-content {
  display: flex;
  flex-direction: column;
  text-align: start;
  padding: 20px;
}
#article-delete-button:hover {
  cursor: pointer;
}
</style>
