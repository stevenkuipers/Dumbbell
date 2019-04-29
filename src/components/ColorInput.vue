<template>
  <div class="">
    <label :for="colordef.color">{{ colordef.color }}</label>
    <input
      type="color"
      :id="colordef.color"
      name=""
      :value="colordef.hex"
      v-on:change="emit"
      >
  </div>
</template>

<script>
export default {
  props: ['colordef'],
  name: 'ColorInput',
  methods: {
    emit(e) {
      const val = { property: this.colordef.color, value: e.target.value };
      this.$emit('setStyle', val);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
