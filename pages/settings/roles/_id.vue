<template lang="html">
  <div class="posts">
    <RolesTemplate :isEdit="true" title="Изменить роль" save="Изменить" />
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
