<template lang="html">
  <div class="posts">
    <TitleBlock title="Пользователи" :breadbrumb="['Главный']" lastLink="Пользователи">
      <div class="d-flex">
        <div
          class="add-btn add-header-btn add-header-btn-padding btn-light-primary mx-3"
          @click="$router.push('/settings/users')"
        >
          Отмена
        </div>
        <a-button
          class="add-btn add-header-btn btn-primary d-flex align-items-center"
          type="primary"
          @click="onSubmit"
          v-if="checkAccess('users', 'put')"
        >
          <span class="svg-icon"> </span>
          Сохранять
        </a-button>
      </div>
    </TitleBlock>
    <a-form-model :model="form" ref="ruleForm" :rules="rules" layout="vertical">
      <div class="pb-5 pt-5">
        <div class="container_xl app-container d-flex flex-column">
          <div class="">
            <div class="card_block main-table px-4 py-4">
              <FormTitle title="Редактировать пользователя" />
              <a-form-model-item class="form-item mb-3" label="Имя" prop="name">
                <a-input v-model="form.name" placeholder="Имя..." />
              </a-form-model-item>
              <a-form-model-item
                class="form-item mb-3"
                :class="{ 'select-placeholder': form.role_id == null }"
                label="Роль"
                prop="role_id"
              >
                <a-select v-model="form.role_id" placeholder="Роль...">
                  <a-select-option v-for="(role, index) in roles" :key="role?.id">
                    {{ role?.name }}
                  </a-select-option>
                </a-select>
              </a-form-model-item>
              <a-form-model-item
                class="form-item mb-3"
                label="Имя пользователя"
                prop="username"
              >
                <a-input v-model="form.username" placeholder="Имя..." />
              </a-form-model-item>
            </div>
          </div>
        </div>
      </div>
    </a-form-model>
  </div>
</template>
<script>
import FormTitle from "../../../components/Form-title.vue";
import TitleBlock from "../../../components/Title-block.vue";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import status from "../../../mixins/status";
import authAccess from "../../../mixins/authAccess";

export default {
  mixins: [status, authAccess],
  head: {
    title: "Пользователи",
  },
  data() {
    return {
      rules: {
        name: [
          {
            required: true,
            message: "This field is required",
            trigger: "change",
          },
        ],
        role_id: [
          {
            required: true,
            message: "This field is required",
            trigger: "change",
          },
        ],
        username: [
          {
            required: true,
            message: "This field is required",
            trigger: "change",
          },
        ],
        password: [
          {
            required: true,
            message: "This field is required",
            trigger: "change",
          },
        ],
      },
      form: {
        name: "",
        role_id: null,
        username: "",
      },
      roles: [],
    };
  },
  mounted() {
    this.__GET_ROLES();
    this.__GET_USERS_BY_ID(this.$route.params.index);
  },
  methods: {
    onSubmit() {
      this.$refs["ruleForm"].validate((valid) => {
        if (valid) {
          this.__POST_USER(this.form);
        } else {
          return false;
        }
      });
    },
    async __GET_USERS_BY_ID(id) {
      try {
        const data = await this.$store.dispatch("fetchRole/getUsersById", id);
        this.visible = true;
        this.form = {
          name: data?.user?.name,
          role_id: data?.user?.role_id,
          username: data?.user?.username,
        };
      } catch (e) {
        this.statusFunc(e);
      }
    },
    async __GET_ROLES() {
      const data = await this.$store.dispatch("fetchRole/getRole");
      this.roles = data?.roles?.data;
    },
    async __POST_USER(data) {
      try {
        await this.$store.dispatch("fetchRole/postUser", data);
        this.$router.push("/settings/users");
        this.notification("success", "success", "Успешно добавлен");
      } catch (e) {
        this.statusFunc(e);
      }
    },
  },
  components: { TitleBlock, FormTitle },
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
