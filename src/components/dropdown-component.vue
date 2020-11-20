<template>
  <b-dropdown :text="text" variant="primary">
    <b-dropdown-item
      v-for="item in menu"
      :key="item"
      @click="() => onClick(item)"
      :value="item"
    >
      {{ item }}
    </b-dropdown-item>
  </b-dropdown>
</template>

<script lang="ts">
export default {
  name: "Dropdown",
  inheritAttrs: true,
  props: {
    text: {
      type: String
    },
    menu: {
      default: []
    },
    onClick: {
      required: true
    }
  }
};
</script>

<style scoped>
.media-image {
  object-fit: contain;
}
</style>
