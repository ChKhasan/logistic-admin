<template lang="html">
  <div><h1 v-for="item in list" :key="item">Ttitle {{item}}</h1></div>
</template>
<script>
export default {
  data() {
    return {
      list: [1, 2, 3],
    };
  },
  methods: {
    getData() {
      return this.list;
    },
    setList(list) {
      this.list = list;
    },
  },
};
</script>
<style lang=""></style>
