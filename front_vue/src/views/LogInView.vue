<template>
  <div class="background">
    <div class="wrapper">
      <div class="text-center mt-4 name">
        <p id="welcome-text">Sign In to Your Account!</p>
      </div>
      <form class="p-3 mt-3" @submit.prevent="login">
        <div class="form-field d-flex align-items-center">
          <input type="text" name="userName" id="userName" placeholder="Username" autocomplete='off' v-model="username">
        </div>
        <div class="form-field d-flex align-items-center">
          <input type="password" name="password" id="pwd" placeholder="Password" autocomplete='off' v-model="password">
        </div>
        <button type="submit" class="btn mt-3" value="logIn">Login</button>
      </form>
      <div class="text-center fs-6">
        <p style="color: #fff;">have no Account yet?</p>
        <a href="/signup">Sign up here</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LogInView',
  data() {
    return {
      username: null,
      password: null,
    }
  },
  methods: {
    login() {
      const username = this.username
      const password = this.password
      const payload = {
        username, password
      }
      this.$store.dispatch('login', payload)
    }
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&display=swap');

@media (max-width: 1024px) {
  .background {
    background-image: url(@/assets/login-background.webp);
    animation-duration: 17600ms;
  }
}
#welcome-text {
  font-size: 25px;
  text-shadow: 4px 4px 16px #1B1B1B;
  color: #42b983;
}
.background {
  width: 100%;
  height: 100vh;
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: center;
  justify-content: center;
  background-color: rgb(0, 0, 0);
  background-size: auto 100%;
  background-image: url(https://web-prod.laftel.net/3.3.9/assets/img-landing-background.36bcefc5.webp);
  background-repeat: repeat;
  animation: 100s linear 0s infinite normal none running kmVFNa;
}
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Poppins', sans-serif;
}
.wrapper {
  max-width: 350px;
  min-height: 400px;
  margin: 200px auto;
  padding: 20px;
  background-color: clear;
  border-radius: 5px;
}
.wrapper .name {
  font-weight: 600;
  font-size: 1.4rem;
  letter-spacing: 1.3px;
  padding-left: 10px;
  color: #2c3e50;
}
.wrapper .form-field input {
  width: 100%;
  display: block;
  border: 1px solid #2c3e50;
  border-radius: 10px;
  outline: none;
  background: none;
  font-size: 1.1rem;
  color: #fff;
  padding: 10px 25px;
}
.wrapper .form-field {
  margin-bottom: 20px;
}
.wrapper .form-field input:focus {
  border: 1px solid #42b983;
}
.wrapper .btn {
  box-shadow: none;
  width: 100%;
  height: 40px;
  background-color: #2c3e50;
  color: #fff;
  border-radius: 15px;
  letter-spacing: 1.3px;
}
.wrapper .btn:hover {
  background-color: #42b983;
}
.wrapper a {
  text-decoration: none;
  font-size: 0.8rem;
  color: #fff;
}
.wrapper a:hover {
  color: goldenrod;
}
@keyframes kmVFNa {
  0% {
      background-position: 0px 0px;
  }
  100% {
      background-position: calc(-100vw + 100%) 0px;
  }
}
</style>