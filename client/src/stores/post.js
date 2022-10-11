import { defineStore } from "pinia";
import axios from "axios";
import Swal from "sweetalert2";

const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener("mouseenter", Swal.stopTimer);
    toast.addEventListener("mouseleave", Swal.resumeTimer);
  },
});

export const usePostStore = defineStore("post", {
  state: () => ({
    baseUrl: "http://localhost:3000",
    loginData: {},
    posts: [],
    currentPage: 0,
  }),
  getters: {},
  actions: {
    // LOGIN
    async login(form) {
      try {
        const loginData = await axios({
          method: "post",
          url: `${this.baseUrl}/login`,
          data: form,
        });
        localStorage.setItem("access_token", loginData.data.access_token);
        this.router.push("/");
        Toast.fire({
          icon: "success",
          title: "Login Successfully",
        });
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Cannot Login!",
          text: error.response.data.message,
        });
      }
    },

    // CHECK ACCESS TOKEN
    async checkAccessToken() {
      const access_token = localStorage.access_token;
      if (!access_token) {
      } else {
        try {
          const loginData = await axios({
            method: "get",
            url: `${this.baseUrl}/authentication`,
            headers: {
              access_token: access_token,
            },
          });
          this.loginData = loginData.data;
        } catch (error) {
          this.router.push("/");
          this.loginData = {};
          localStorage.removeItem("access_token");
          Swal.fire({
            icon: "error",
            title: "Invalid Token!",
            text: error.response.data.message,
          });
        }
      }
    },

    // LOGOUT
    async logout() {
      localStorage.removeItem("access_token");
      this.router.push("/");
      this.loginData = {};
      Toast.fire({
        icon: "success",
        title: "Logout Successfully",
      });
    },

    // REGISTER
    async register(form) {
      try {
        await axios({
          method: "post",
          url: `${this.baseUrl}/register`,
          data: form,
        });
        this.router.push("/login");
        Toast.fire({
          icon: "success",
          title: "Register Successfully",
        });
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Cannot Register!",
          text: error.response.data.message,
        });
      }
    },

    // FETCH POST
    async fetchPosts(page) {
      try {
        if (!page) {
          page = 0;
        }
        const posts = await axios({
          method: "get",
          url: `${this.baseUrl}/posts/?page=${page}`,
          headers: {
            access_token: localStorage.access_token,
          },
        });
        this.posts.push(...posts.data.posts);
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Cannot Find Movies!",
          text: error.response.data.message,
        });
      }
    },

    // FETCH NEXT PAGE
    getNextPost() {
      window.onscroll = () => {
        let bottomOfWindow =
          document.documentElement.scrollTop +
            document.documentElement.clientHeight ===
          document.documentElement.offsetHeight;
        if (bottomOfWindow) {
          this.currentPage += 1;
          this.fetchPosts(this.currentPage);
        }
      };
    },

    // CREATE POST
    async createPost(form) {
      try {
        await axios({
          method: "post",
          url: `${this.baseUrl}/posts`,
          data: form,
          headers: {
            access_token: localStorage.access_token,
          },
        });
        
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Cannot Add Movies!",
          text: error.response.data.message,
        });
      }
    },
  },
});
