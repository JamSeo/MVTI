import Vue from 'vue'
import Vuex from 'vuex'

import axios from 'axios'
import createPersistedState from 'vuex-persistedstate'
import router from '../router'

const API_URL = 'http://127.0.0.1:8000'

Vue.use(Vuex)


export default new Vuex.Store({
  plugins: [
    createPersistedState(),
  ],
  state: {
    selectedMovie: {},
    articles: [],
    comments: [],
    token: null,
    user: [],
    userArticles:[],
    loggedInUser: null,
    mvtiAnswers:[]
  },
  getters: {
    isLogin(state) {
      return state.token ? true : false
    }
  },
  mutations: {
    SET_SELECTED_MOVIE(state, movie) {
      state.selectedMovie = movie
    },
    GET_ARTICLES(state, articles) {
      state.articles = articles
    },
    GET_COMMENTS(state, comments) {
      state.comments = comments
    },
    GET_USER_PROFILE(state, user) {
      state.user = user
    },
    GET_USER_ARTICLES(state, userArticles) {
      state.userArticles = userArticles
    },
    SAVE_TOKEN(state, token) {
      state.token = token
      router.push({name: 'HomeView'}) 
    }
  },
  actions: {
    setSelectedMovie(context, movie) {
      context.commit('SET_SELECTED_MOVIE', movie)
    },
    getArticles(context) {
      axios({
        method: 'get',
        url: `${API_URL}/api/v1/articles/`,
        headers: {
          Authorization: `Token ${ context.state.token }`,
        },
      })
      .then((res) => {
        context.commit('GET_ARTICLES', res.data)
      })
      .catch((err) => {
      console.log(err)
      })
    },
    getComments(context, article_id) {
      axios({
        method: 'get',
        url: `${API_URL}/api/v1/articles/${article_id}/`,
        headers: {
          Authorization: `Token ${ context.state.token }`,
        }
      })
      .then((res) => {
        context.commit('GET_COMMENTS', res.data.comment_set)
      })
      .catch((err) => {
        console.log(err)
      })
    },
    getUserProfile(context) {
      axios({
        method: 'get',
        url: `${API_URL}/profile/${ this.state.loggedInUser }/`,
        headers: {
          Authorization: `Token ${ context.state.token }`,
        },
      })
      .then((res) => {
        console.log(res.data)
        context.commit('GET_USER_PROFILE', res.data)
      })
      .catch((err) => {
        console.log(err)
      })
    },
    getUserArticles(context, username) {
      axios({
        method: 'get',
        url: `${API_URL}/api/v1/articles/`,
        headers: {
          Authorization: `Token ${ context.state.token }`,
        }
      })
      .then((res) => {
        const userArticles = res.data.filter(article => article.username === username)
        context.commit('GET_USER_ARTICLES', userArticles.slice().reverse())
      })
      .catch((err) => {
      console.log(err)
      })
    },
    signUp(context, payload) {
      const username = payload.username
      const password1 = payload.password1
      const password2 = payload.password2

      axios({
        method: 'post',
        url: `${API_URL}/accounts/signup/`,
        data: {
          username, password1, password2
        }
      })
        .then((res1) => {
          this.state.loggedInUser = username
          context.commit('SAVE_TOKEN', res1.data.key)
        })
        axios({
          method: 'get',
          url: `${API_URL}/profile/${ username }/`,
          headers: {
            Authorization: `Token ${ context.state.token }`,
          },
        })
          .then((res2) => {
            console.log(res2.data)
            context.commit('GET_USER_PROFILE', res2.data)
          })
          .catch((err2) => {
            console.log(err2)
          })
        .catch((err1) => {
        console.log(err1)
        })
    },
    login(context, payload) {
      const username = payload.username
      const password = payload.password

      axios({
        method: 'post',
        url: `${API_URL}/accounts/login/`,
        data: {
          username, password
        }
      })
      .then((res1) => {
        this.state.loggedInUser = username
        context.commit('SAVE_TOKEN', res1.data.key)

        axios({
          method: 'get',
          url: `${API_URL}/profile/${ username }/`,
          headers: {
            Authorization: `Token ${ context.state.token }`,
          },
        })
        .then((res2) => {
          console.log(res2.data)
          context.commit('GET_USER_PROFILE', res2.data)
        })
        .catch((err2) => {
          console.log(err2)
        })
      })
      .catch((err1) => {
        console.log(err1)
        alert('일치하는 정보가 없습니다!')
      })
    },
  },
  modules: {
  }
})
