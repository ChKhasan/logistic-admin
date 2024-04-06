<template lang="html">
  <div class="posts">
  <RolesTemplate :isEdit="false" title="Создать роль" save="Добавить"/>
  </div>
</template>
<script>
import RolesTemplate from "@/components/rolesTemplate.vue";
export default {
  head: {
    title: "Роли",
  },

  components: { RolesTemplate},
};
</script>
