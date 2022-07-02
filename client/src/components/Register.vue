<template>
  <div>
    <h1>Register</h1>

    <p><input v-model="email" type="email" name="email" /></p>
    <p><input v-model="password" type="password" name="password" /></p>
    <div class="error" v-html="error"></div>
    <button @click="register">Register</button>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      email: "",
      password: "",
      error: null,
    };
  },
  methods: {
     register(){
      axios.create({
        baseURL:`http://localhost:8081`
      }).post('/auth/register',{ email:this.email, password:this.password }).then((res)=>{}).catch((err)=>{
      this.error = err.response.data.error
      })
    }
  },
};
</script>

<style scoped>
.error {
  color: red;
}
</style>
