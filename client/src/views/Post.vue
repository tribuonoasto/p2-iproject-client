<script>
import { mapActions, mapState } from "pinia";
import { usePostStore } from "../stores/post";
import formatDistance from "date-fns/formatDistance";

export default {
  created() {
    this.checkAccessToken();
  },
  mounted() {
    var disqus_config = function () {
      this.page.url = "https://bukan9gag-dbeda.web.app/";
      this.page.identifier = PAGE_IDENTIFIER;
    };

    (function () {
      // DON'T EDIT BELOW THIS LINE
      var d = document,
        s = d.createElement("script");
      s.src = "https://https-bukan9gag-dbeda-web-app.disqus.com/embed.js";
      s.setAttribute("data-timestamp", +new Date());
      (d.head || d.body).appendChild(s);
    })();
  },
  watch: {
    "$route.params": {
      async handler(params) {
        await this.fetchPost(params.id);
      },
      immediate: true,
    },
  },
  computed: {
    ...mapState(usePostStore, ["post"]),
    formattedDate() {
      return formatDistance(new Date(this.post.createdAt), new Date());
    },
  },
  methods: {
    ...mapActions(usePostStore, ["fetchPost", "checkAccessToken"]),
  },
};
</script>

<template>
  <div class="row">
    <div class="col-3"></div>
    <div class="col-6">
      <div class="row">
        <div class="mb-2 border-bottom border-2">
          <div id="titlePost">
            <h3 class="mt-2">{{ post.title }}</h3>
            <h5 style="font-size: 15px" class="mt-2">
              {{ formattedDate }} ago
            </h5>
          </div>
          <div id="imgPost" class="d-flex justify-content-center">
            <img class="img-fluid" :src="post.imageUrl" alt="meme" />
          </div>
          <div
            id="likePost"
            class="border border-2 mt-3 mb-3"
            style="width: 100px; font-size: 1.5em"
          >
            <i class="fa-solid fa-thumbs-up ms-1"></i> {{ post.Likes.length }}
          </div>
        </div>
      </div>
      DISKUS
      <div id="disqus_thread"></div>
    </div>
  </div>
  <div class="col-3"></div>
</template>
