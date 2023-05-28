<template>
  <div id="app">
    <nav v-if="this.$store.state.token" class="navbar bg-body-clear">
      <div class="container-fluid">
        <!-- 좌측 배너 -->
        <div>
          <a class="navbar-brand" href="/">
            <img src="@/assets/logo.png" alt="Logo" width="77" height="24" class="d-inline-block align-text-top">
          </a>
          <router-link :to="{ name: 'HomeView'}">Movie</router-link>
          <router-link :to="{ name: 'ArticleView' }">Community</router-link>
          <router-link :to="{ 
                  name: 'MvtiView',
                  params: {loggedInUser: this.$store.state.loggedInUser} 
                }">MVTI</router-link>
        </div>
        <!-- 우측 배너 -->
        <div>
          <div class="btn-group">
            <button type="button" class="btn toggle-down fs-5 py-0" data-bs-toggle="dropdown" aria-expanded="false">
              <i class="fa-solid fa-user"></i>
            </button>
            <ul class="dropdown-menu dropdown-menu-end">
              <li>
                <router-link
                class="hello_master"
                :to="{ 
                  name: 'MyProfileView',
                  params: {loggedInUser: this.$store.state.loggedInUser} 
                }"><i class="fa-regular fa-id-badge me-1"></i>&nbsp;
                {{ this.$store.state.loggedInUser }}
                </router-link>
              </li>
              <li>
                <p 
                v-if="this.$store.state.token" 
                class="logout"
                @click="logout"
                ><i class="fa-solid fa-arrow-right-from-bracket"></i>&nbsp;
                로그아웃
                </p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
    <router-view />
  </div>
</template>

<script>
import axios from 'axios'
const API_URL = 'http://127.0.0.1:8000'

export default {
  name: 'NavView',
  methods: {
    logout() {
      axios({
        method: 'post',
        url:`${API_URL}/accounts/logout/`,
        headers: {
          Authorization: `Token ${ this.$store.state.token }`
        },
      })
      .then((res) => {
        console.log(res)
        this.$store.state.token = null
        this.$store.state.loggedInUser = null
        this.$store.state.user = {}
        localStorage.clear()
        this.$router.push({name: 'LogInView'})
      })
      .catch(error => {
        console.log(error)
      })
    }
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.navbar {
  padding: 12px 24px;
}
nav {
  padding: 30px;
}
nav a {
  font-size: 1.1rem;
  font-weight: bold;
  color: #2c3e50;
  text-decoration: none;
  padding: 12px;
}
nav a.router-link-exact-active {
  color: #42b983;
}
.btn-group button {
  border: none !important;
}
.btn-group ul li {
  padding: 12px;
}
.btn-group ul li p {
  width: 100%;
  font-size: 1.1rem;
  font-weight: bold;
  color: #2c3e50;
  text-decoration: none;
  padding: 0px 12px;
  margin: 0px;
}
.btn-group ul li:hover {
  cursor: pointer;
  background-color: rgb(230, 230, 230);
}
</style>
