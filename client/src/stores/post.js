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
  actions: {},
});
