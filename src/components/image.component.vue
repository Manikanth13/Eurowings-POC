<template>
  <div
    v-lazy-container="{ selector: 'img', loading: '/img/loaders/loader.gif' }"
  >
    <img
      :data-src="lazySrc"
      :height="height"
      :width="width"
      loading="lazy"
      class="media-image"
    />
  </div>
</template>

<script lang="ts">
export default {
  name: "ImageLazy",
  props: {
    lazySrc: {
      type: String,
      default: null
    },
    height: {
      type: String
    },
    width: {
      type: String
    }
  }
};
</script>

<style scoped>
.media-image {
  object-fit: contain;
}
</style>
