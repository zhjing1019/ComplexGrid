<template>
  <div class="cover-div" :style="coverStyle"></div>
</template>

<script>
export default {
  props: {
    isCover: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    coverStyle() {
      return {
        display: this.isCover ? "block" : "none"
      };
    }
  }
};
</script>
<style lang="scss">
.cover-div {
  width: 100%;
  height: 100%;
  position: absolute;
  background: rgba(255, 255, 255, 0.6);
  top: 0;
  left: 0;
  z-index: 1000;
}
</style>
