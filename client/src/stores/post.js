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
  },
});
