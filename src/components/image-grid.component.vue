<template>
  <b-card :title="title">
    <ImageLazy :lazy-src="src" :width="width" :height="height"></ImageLazy>
    <b-card-text :class="useCardDescriptionClass">
      {{ description }}
    </b-card-text>
  </b-card>
</template>

<script lang="ts">
import { Vue } from "vue-property-decorator";
import ImageLazy from "./image.component.vue";

interface Props {
  src: string;
  description: string;
  title: string;
  height: string;
  width: string;
  truncateDescription: boolean;
}

interface Computed {
  useCardDescriptionClass: string;
}

interface Methods {
  getGalleryInfoById: (id: string) => void;
}

export default Vue.extend<{}, Methods, Computed, Props>({
  components: {
    ImageLazy
  },
  props: {
    src: {
      type: String
    },
    description: {
      type: String
    },
    title: {
      type: String
    },
    height: {
      type: String,
      default: "300px"
    },
    width: {
      type: String,
      default: "100%"
    },
    truncateDescription: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    useCardDescriptionClass(): string {
      return this.truncateDescription
        ? `text-muted my-2 text-truncate`
        : `text-muted my-2`;
    }
  }
});
</script>
<style scoped></style>
