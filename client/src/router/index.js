import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import Post from "../views/Post.vue";
import Register from "../views/Register.vue";
import User from "../views/User.vue";
import Create from "../views/Create.vue"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Home",
      component: Home,
    },
    {
      path: "/login",
      name: "Login",
      component: Login,
    },
    {
      path: "/register",
      name: "Register",
      component: Register,
    },
    {
      path: "/post/:id",
      name: "Post",
      component: Post,
    },
    {
      path: "/user",
      name: "User",
      component: User,
    },
    {
      path: "/create",
      name: "Create",
      component: Create,
    },
  ],
});

export default router;
