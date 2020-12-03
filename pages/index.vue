<template>
  <section class="index">
    <card
      v-for="(post, i) in posts"
      :id="post.sys.id"
      :key="i"
      :title="post.fields.title"
      :date="post.sys.updatedAt"
    />
  </section>
</template>

<script>
import Card from '~/components/card.vue'
import { createClient } from '~/plugins/contentful'

const client = createClient()
export default {
  transition: 'slide-left',
  components: {
    Card,
  },
  asyncData({ env }) {
    return client.getEntries(env.CTF_BLOG_POST_TYPE_ID).then((entries) => {
      return {
        posts: entries.items,
      }
    })
  },
}
</script>
