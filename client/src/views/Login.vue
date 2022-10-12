<script>
import { mapActions } from "pinia";
import { usePostStore } from "../stores/post";

export default {
  data() {
    return {
      form: {},
    };
  },
  methods: {
    ...mapActions(usePostStore, ["login", "githubSign"]),
    async handleLogin() {
      this.login(this.form);
    },
    githubSignHandler() {
      this.githubSign()
      
    },
  },
};
</script>

<template>
  <section class="loginPage">
    <div class="row" style="height: 250px"></div>
    <div class="row text-center">
      <div class="col-4"></div>
      <div class="col-4 border border-2">
        <h1 class="text-center mt-3">Login With Your Account</h1>
        <form @submit.prevent="handleLogin">
          <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label"
              >Email address</label
            >
            <input
              type="email"
              class="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              required
              v-model="form.email"
            />
            <div id="emailHelp" class="form-text">
              We'll never share your email with anyone else.
            </div>
          </div>
          <div class="mb-3">
            <label for="exampleInputPassword1" class="form-label"
              >Password</label
            >
            <input
              type="password"
              class="form-control"
              id="exampleInputPassword1"
              required
              v-model="form.password"
            />
          </div>
          <button type="submit" class="btn btn-secondary mb-2">Login</button>
        </form>
        <a
          @click.prevent="githubSignHandler"
          id="github-button"
          class="btn btn-block btn-social btn-github"
        >
          <i class="fa fa-github"></i> Sign in with Github
        </a>
      </div>
      <div class="col-4"></div>
    </div>
  </section>
</template>
<style>
.loginPage {
  color: #2d3436;
}
</style>
