<script>
import { mapActions, mapState } from "pinia";
import { usePostStore } from "../stores/post";

export default {
  data() {
    return {
      formCreate: {},
    };
  },
  created() {
    this.fetchMemes();
  },
  computed: {
    ...mapState(usePostStore, ["memes"]),
  },
  methods: {
    ...mapActions(usePostStore, ["createPost", "fetchMemes"]),
    async submitCreate() {
      this.createPost(this.formCreate);
    },
    async changeMeme(template_id) {
      this.formCreate.template_id = template_id;
    },
    async changePageMeme(page) {
      this.fetchMemes(page);
    },
  },
};
</script>

<template>
  <h1>create</h1>
  <!-- memetemplate -->
  <div>
    <a
      @click.prevent="changeMeme(meme.id)"
      v-for="(meme, index) in memes.memes"
      href=""
    >
      <img
        class="img-fluid m"
        :key="index"
        :src="meme.url"
        style="width: 150px; height: 110px"
        alt=""
      />
    </a>
  </div>

  <!-- pagination -->
  <div class="d-flex justify-content-center">
    <nav aria-label="Page navigation example">
      <ul class="pagination">
        <li class="page-item">
          <a
            v-if="memes.currentPage <= 1"
            class="page-link disabled"
            href="#"
            aria-label="Previous"
          >
            <span aria-hidden="true">&laquo;</span>
          </a>
          <a
            v-if="memes.currentPage > 1"
            @click.prevent="changePageMeme(+memes.currentPage - 1)"
            class="page-link"
            href="#"
            aria-label="Previous"
          >
            <span aria-hidden="true">&laquo;</span>
          </a>
        </li>
        <li class="page-item">
          <a
            v-if="memes.currentPage < memes.totalPages"
            @click.prevent="changePageMeme(+memes.currentPage + 1)"
            class="page-link"
            href="#"
            aria-label="Next"
          >
            <span aria-hidden="true">&raquo;</span>
          </a>
          <a
            v-if="memes.currentPage >= memes.totalPages"
            class="page-link disabled"
            href="#"
            aria-label="Next"
          >
            <span aria-hidden="true">&raquo;</span>
          </a>
        </li>
      </ul>
    </nav>
  </div>

  <!-- form -->
  <div class="row text-center mt-5">
    <div class="col-4"></div>
    <div class="col-4 border border-2">
      <h1 class="text-center mt-3">Create Meme</h1>
      <form @submit.prevent="submitCreate">
        <div class="mb-3">
          <label for="title" class="form-label">Template meme</label>
          <input
            type="text"
            class="form-control"
            id="title"
            placeholder="Choose your meme"
            v-model="formCreate.template_id"
            disabled
            required
          />
        </div>
        <div class="mb-3">
          <label for="title" class="form-label">Title</label>
          <input
            type="text"
            class="form-control"
            id="title"
            placeholder="type title here"
            v-model="formCreate.title"
            required
          />
        </div>
        <div class="mb-3">
          <label for="text1" class="form-label">Text 1</label>
          <input
            type="text"
            class="form-control"
            id="text1"
            placeholder="type text here"
            v-model="formCreate.text0"
            required
          />
        </div>
        <div class="mb-3">
          <label for="text2" class="form-label">Text 2</label>
          <input
            type="text"
            class="form-control"
            id="text2"
            placeholder="type text here"
            v-model="formCreate.text1"
          />
        </div>
        <button type="submit" class="btn btn-secondary mb-2">Post</button>
      </form>
    </div>
    <div class="col-4"></div>
  </div>
</template>
