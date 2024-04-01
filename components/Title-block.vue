<template lang="html">
  <div class="title-block">
    <div class="page-title d-flex align-items-center" v-if="title">
      <h1>{{ title }}</h1>
      <span class="vertical_hr"></span>
      <ul class="d-flex">
        <li v-for="item in breadbrumb">
          {{ item }}
          <span class="list-bullet-box">
            <span class="list-bullet"></span>
          </span>
        </li>
        <li class="last-link">
          {{ lastLink }}
        </li>
      </ul>
    </div>
    <slot></slot>
  </div>
</template>
<script>
export default {
  props: ["title", "breadbrumb", "lastLink"],
};
</script>
<style lang=""></style>
