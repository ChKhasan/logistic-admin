<template>
<div class="container">
<ckeditor-nuxt v-model="content" />
<button @click="saveContent">Save</button>
</div>
</template>

<script>
import CkeditorNuxt from '@/components/CkeditorNuxt';

export default {
  components: { CkeditorNuxt },
  data() {
    return {
      content: '',
    };
  },
  methods: {
    saveContent() {
      alert(this.content);
    },
  },
};
</script>
