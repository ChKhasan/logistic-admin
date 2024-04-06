<template lang="html">
  <div class="posts">
    <UsersTemlate save="Добавить" :isEdit="true"/>
  </div>
</template>
<script>

import UsersTemlate from "@/components/usersTemlate.vue";


export default {
  head: {
    title: "Пользователи",
  },
  components: {UsersTemlate},
};
</script>
<style lang="css">
.posts-grid {
  display: grid;
  grid-gap: 13px;
  grid-template-columns: 5fr 2fr;
}

.posts .ant-upload.ant-upload-select-picture-card,
.posts .ant-upload-list-picture-card .ant-upload-list-item,
.posts .ant-upload-list-picture-card-container {
  width: 100% !important;
  height: 150px !important;
}

.permissions-list {
  display: flex;
  justify-content: space-between;
  padding: 10px 13px 0 13px;
}

.permissions-list h4 {
  font-family: "Inter";
  font-style: normal;
  font-weight: 600;
  font-size: 13px;
  line-height: 32px;
  color: #181c32;
}

.permissions-container {
  border: 1px solid #e4e6ef;
  border-radius: 6.175px;
  padding: 10px 0;
}

.permissions-header h5 {
  font-family: "Inter";
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 32px;
  color: #181c32;
  padding: 0 13px;
  padding-bottom: 10px;
  border-bottom: 1px solid #e4e6ef;
}

.permissions-checkbox {
  display: flex;
  flex-direction: column;
  font-family: "TT Interfaces";
  font-style: normal;
  letter-spacing: 1.3px;
  font-weight: 600;
  color: #b5b5c3;
  font-size: 11.7px;
  line-height: 32px;
  justify-content: center;
  text-align: center;
}

.permissions-checkbox .ant-checkbox-wrapper {
  display: flex;
  justify-content: center;
}

.permissions-checkbox-list {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 20px;
}
</style>
