<template>
  <div class="">
    {{  }}
  </div>
</template>

<script>
export default {
  props: ['em', 'rem'],
  name: 'EmToRemConverter',
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
