<template>
  <div class="">
    <label :for="sizing.property">{{ sizing.property }}</label>
    <input
      :id="sizing.property"
      type="number"
      :value="filteredNumber"
      v-on:change="emit"
      step=".1"
      >
  </div>
</template>

<script>
export default {
  props: ['sizing'],
  name: 'NumberInput',
  data : function(){
    return {
      unit : ''
    }
  },
  methods : {
    emit: function(e){
      const val = { 'property' : this.sizing.property, 'value': e.target.value + this.unit}
      this.$emit( 'setStyle', val )
    }
  },
  created : function() {
    return this.unit = this.sizing.value.match(/[a-z]+/gi)[0]
  },
  computed : {
    filteredNumber : function(){
      return this.sizing.value.match(/^((?![a-z]).)*/i)[0]
    }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
