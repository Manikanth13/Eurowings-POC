<template>
  <div class="bg-light px-5 py-2 root">
    <b-skeleton-wrapper
      :loading="loading"
      :isLoaded="isLoaded"
      class="d-flex vh-100 flex-column"
    >
      <template #loading>
        <div
          fluid
          class="d-flex justify-content-center align-items-center vh-100"
        >
          <b-spinner label="Loading..." variant="primary"></b-spinner>
        </div>
      </template>
      <template v-if="isLoaded">
        <b-row>
          <b-col cols md="4" sm="12">
            <ImageGrid
              :src="result.images[0].link"
              description=""
              :title="result.title"
              height="400px"
              class="bg-transparent border-0"
              :truncateDescription="false"
            />
          </b-col>
          <b-col cols md="8" sm="12">
            <div class="my-4">
              <h4>Details</h4>
              <b-card-body class="bg-white my-4">
                <b-card-text class="text-muted">
                  {{ result.images[0].description }}
                </b-card-text>
              </b-card-body>
              <b-card-body class="text-center bg-white my-4">
                <b-card-title>Upvotes</b-card-title>
                <b-card-text class="text-success">
                  {{ result.ups }}
                </b-card-text>
              </b-card-body>

              <b-card-body class="text-center bg-white my-4">
                <b-card-title>Down votes</b-card-title>
                <b-card-text class="text-success">
                  {{ result.downs }}
                </b-card-text>
              </b-card-body>

              <b-card-body class="text-center bg-white my-4">
                <b-card-title>Score</b-card-title>
                <b-card-text class="text-success">
                  {{ result.score }}
                </b-card-text>
              </b-card-body>
            </div>
          </b-col>
        </b-row>
      </template>
    </b-skeleton-wrapper>
  </div>
</template>

<script lang="ts">
import { Vue } from "vue-property-decorator";
import ImageGrid from "@/components/image-grid.component.vue";

import { ImgurGalleryService } from "@/services";
import { GalleryItem } from "@/types";

interface Data {
  result: GalleryItem;
  loading: boolean;
}

interface Computed {
  isLoaded: boolean;
}

interface Methods {
  getGalleryInfoById: (id: string) => void;
}

export default Vue.extend<Data, Methods, Computed, {}>({
  components: {
    ImageGrid
  },
  data() {
    return {
      result: (null as unknown) as GalleryItem,
      loading: true
    };
  },
  async mounted() {
    this.getGalleryInfoById(this.$route.params.id);
  },
  methods: {
    async getGalleryInfoById(id: string) {
      this.loading = true;
      this.result = await ImgurGalleryService.getGalleryDetail(id);
      this.loading = false;
    }
  },
  computed: {
    isLoaded() {
      return Boolean(this.result);
    }
  }
});
</script>

<style scoped>
.root {
  min-height: 100vh;
}
</style>
