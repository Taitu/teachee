<template>
  <div class="comments">
    <div v-if="loading">
      ...loading
    </div>
    <div v-if="error">
      Something bad happened
    </div>
    <div
      v-if="allComments && allComments.length > 0"
      class="comments__list"
    >
      <div
        v-for="comment in comments"
        :key="comment.id"
        class="comments__item"
      >
        <div class="comments__item__email">
          <a :href="`mailto: ${comment.email}`">
            <strong>
              {{ comment.email }}
            </strong>
          </a>
        </div>
        <div class="comments__item__name">
          <strong>{{ comment.name }}</strong>
        </div>
        <div class="comments__item__body">
          {{ comment.body }}
        </div>
      </div>
      <div class="pagination">
        <button
          class="pagination__btn"
          :disabled="comments.length >= allComments.length"
          @click="loadMore"
        >
          Load more
        </button>
      </div>
    </div>
    <div v-else-if="allComments && allComments.length === 0">
      No comments found
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      loading: false,
      allComments: undefined,
      comments: [],
      error: false,
      activePage: 0,
      totalPages: 0,
      perPage: 100
    }
  },
  watch: {
    activePage () {
      this.getComments()
    }
  },
  mounted () {
    this.fetchComments()
  },
  methods: {
    loadMore () {
      this.activePage = this.activePage + 1
    },
    getComments () {
      const comments = this.allComments.slice(0, (this.activePage + 1) * this.perPage)
      this.comments = comments
    },
    async fetchComments () {
      this.loading = true
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/comments')
        const allComments = await response.json()
        this.loading = false
        this.error = false
        this.allComments = allComments
        this.totalPages = Math.floor(allComments.length / this.perPage)
        this.getComments()
      } catch (e) {
        console.log(e)
        this.error = true
      }
    }
  }
}
</script>
