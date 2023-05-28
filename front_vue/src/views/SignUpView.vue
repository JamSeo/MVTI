<template>
  <div class="background">
    <div class="wrapper">
      <div class="text-center mt-4 name">
        <div id="welcome-text">
          <p>Hi there!</p>
          <p>Sign Up Here!</p>
        </div>
      </div>
      <form class="p-3 mt-3" @submit.prevent="signUp">
        <div class="form-field d-flex align-items-center">
          <input 
          type="text" name="userName" id="userName" placeholder="Username" autocomplete='off' v-model="username" @blur="usernameBlured=true"
          >
        </div>
        <div class="form-field d-flex flex-column align-items-center">
          <input 
          type="password" name="password1" id="pwd1" placeholder="Password" autocomplete='off' v-model="password1" 
          :class="{'is-invalid': !validPassword1(password1) && password1Blured}" 
          @blur="password1Blured=true"
          >
          <div class="invalid-feedback">Password must be 8 chars long!</div>
        </div>
        <div class="form-field d-flex flex-column align-items-center">
          <input 
          type="password" name="password2" id="pwd2" placeholder="Password Again" autocomplete='off' v-model="password2"
          :class="{'is-invalid': !validPassword2(password2) && password2Blured}" 
          @blur="password2Blured=true"
          >
          <div class="invalid-feedback">It does not match!</div>
        </div>
        <button type="submit" class="btn mt-3">Sign Up</button>
      </form>
      <div class="text-center fs-6">
        <p style="color: #fff;">Wanna go back?</p>
        <a href="/login">Click here</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SignUpView',
  data() {
    return {
      username: '',
      usernameBlured: false,
      password1: '',
      password2: '',
      password1Blured: false,
      password2Blured: false,
      valid : false,
      submitted : false,
    }
  },
  methods: {
    signUp() {
      const username = this.username
      const password1 = this.password1
      const password2 = this.password2
      const payload = {
        username, password1, password2
      }
      this.$store.dispatch('signUp', payload)
    },
    validPassword1() {
      if (this.password1.length > 7) {
        return true;
      }
    },
    validPassword2(password) {
      if (password && password===this.password1) {
        return true;
      }
    },
    validate() {
      this.emailBlured = true;
      this.passwordBlured1 = true;
      this.passwordBlured2 = true;
      if( this.validPassword1(this.password1) && this.validPassword2(this.password2)){
        this.valid = true;
      }
    },
  }
}
</script>

<style scoped>
#welcome-text {
  font-size: 25px;
  color: goldenrod;
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
  border: 1px solid goldenrod;
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
  background-color: goldenrod;
}
.wrapper a {
  text-decoration: none;
  font-size: 0.8rem;
  color: #fff;
}
.wrapper a:hover {
  color: #42b983;
}
</style>