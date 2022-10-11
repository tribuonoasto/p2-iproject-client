<script>
import { mapActions, mapState } from "pinia";
import { usePostStore } from "../stores/post";
import Card from "../components/Card.vue";

export default {
  components: {
    Card,
  },
  created() {
    this.checkAccessToken();
    this.fetchPosts();
  },
  computed: {
    ...mapState(usePostStore, ["posts"]),
  },
  methods: {
    ...mapActions(usePostStore, ["checkAccessToken", "fetchPosts"]),
  },
};
</script>

<template>
  <div class="row">
    <div class="col-3"></div>
    <div class="col-6">
      <div class="row">
        <Card v-for="(post, index) in posts" :key="index" :post="post" />
      </div>
    </div>
  </div>
  <div class="col-3"></div>
</template>
