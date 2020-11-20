<template>
  <div class="bg-light px-2 py-2">
    <nav class="d-flex justify-content-end align-items-center flex-wrap">
      <Dropdown
        :text="'Sort by : ' + sort"
        :menu="['Viral', 'Top', 'Time', 'Rising']"
        class="my-3 mr-3"
        :onClick="onSortChange"
      />
      <Dropdown
        :text="'Section: ' + section"
        :menu="['Hot', 'Top', 'User']"
        class="my-3 mr-3"
        :onClick="onSectionChange"
      />
      <Dropdown
        :text="'Data shown by : ' + window"
        :menu="['Day', 'Week', 'Month', 'Year', 'All']"
        class="my-3 mr-3"
        :onClick="onWindowChange"
      />
      <b-form-checkbox v-model="showViral" name="check-button" switch>
        Show Viral
      </b-form-checkbox>
    </nav>

    <b-skeleton-wrapper :loading="loading">
      <template #loading>
        <b-row>
          <b-col
            cols
            md="3"
            sm="12"
            v-for="item in new Array(12).fill(0).map((_, index) => index + 1)"
            :key="item"
            class="my-2"
          >
            <b-skeleton width="100%" height="300px"></b-skeleton>
          </b-col>
        </b-row>
      </template>
      <b-row>
        <b-col
          cols
          md="3"
          sm="12"
          v-for="item in results"
          :key="item.id"
          class="my-2"
        >
          <router-link :to="'/' + item.id">
            <ImageGrid
              :src="item.images[0].link"
              :description="
                'Description : ' + (item.images[0].description || 'N/A')
              "
            />
          </router-link>
        </b-col>
      </b-row>
    </b-skeleton-wrapper>
  </div>
</template>

<script lang="ts">
import { Vue } from "vue-property-decorator";
import ImageGrid from "@/components/image-grid.component.vue";
import Dropdown from "@/components/dropdown-component.vue";
import {
  GalleryItem,
  GallerySection,
  GallerySort,
  GalleryWindow
} from "@/types";

import { ImgurGalleryService } from "@/services";

interface Data {
  results: GalleryItem[];
  loading: boolean;
  initialized: boolean;
  section: string;
  showViral: boolean;
  window: string;
  sort: string;
}

interface Computed {
  pickerList: string[];
  pickerMap: Map<string, number>;
}

interface Methods {
  fetchGallery: () => Promise<void>;
  onSortChange: (value: string) => void;
  onSectionChange: (value: string) => void;
  onWindowChange: (value: string) => void;
}

export default Vue.extend<Data, Methods, Computed, {}>({
  components: {
    ImageGrid,
    Dropdown
  },
  data() {
    return {
      results: [] as GalleryItem[],
      loading: false,
      initialized: false,
      section: "Hot",
      showViral: true,
      window: "Day",
      sort: "Viral"
    };
  },
  async mounted() {
    this.fetchGallery();
  },
  methods: {
    async fetchGallery() {
      this.loading = true;
      this.initialized = true;
      const response = await ImgurGalleryService.getGallery({
        page: 1,
        section: this.section.toLowerCase() as GallerySection,
        window: this.window.toLowerCase() as GalleryWindow,
        sort: this.sort.toLowerCase() as GallerySort,
        showViral: this.showViral
      });
      this.results = response;
      this.loading = false;
    },
    onSortChange(value: string) {
      this.sort = value;
    },
    onSectionChange(value: string) {
      this.section = value;
    },
    onWindowChange(value: string) {
      this.window = value;
    }
  },
  watch: {
    section: function() {
      this.fetchGallery();
    },
    window: function() {
      this.fetchGallery();
    },
    sort: function() {
      this.fetchGallery();
    },
    showViral: function() {
      this.fetchGallery();
    }
  }
});
</script>
