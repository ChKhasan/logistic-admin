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
          @click="handleSubmit"
          v-if="checkAccess('users', 'post')"
        >
          <span class="svg-icon"> </span>
          Добавить
        </a-button>
      </div>
    </TitleBlock>
    <a-form-model :model="form" ref="ruleForm" :rules="rules" layout="vertical">
      <div class="pb-5 pt-5">
        <div class="container_xl app-container d-flex flex-column">
          <div class="">
            <div class="card_block main-table px-4 py-4">
              <FormTitle title="Создать пользователя" />
              <a-form-model-item class="form-item mb-3" label="Имя" prop="username">
                <a-input v-model="form.username" placeholder="Имя..." />
              </a-form-model-item>
              <a-form-model-item
                class="form-item mb-3"
                label="Роль"
              >
                <a-select v-model="form.roleId" placeholder="Роль...">
                  <a-select-option v-for="(role, index) in roles" :key="role?.id">
                    {{ role?.title }}
                  </a-select-option>
                </a-select>
              </a-form-model-item>

              <a-form-model-item class="form-item mb-3" label="Пароль" prop="password" :validate-status="passwordError ? 'error' : ''" :help="passwordError || ''">
                <a-input v-model="form.password" placeholder="Пароль..." />
              </a-form-model-item>
              <a-form-model-item class="form-item mb-3" label="Подтвердите пароль" prop="password2" :validate-status="confirmPasswordError ? 'error' : ''" :help="confirmPasswordError || ''">
                <a-input v-model="form.password2" placeholder="Подтвердите ваш пароль..." />
              </a-form-model-item>
              <a-form-model-item class="form-item mb-3" label="Статус" >
                <a-switch v-model="form.active" />
              </a-form-model-item>
            </div>
          </div>
        </div>
      </div>
    </a-form-model>
  </div>
</template>
<script>
import FormTitle from "@/components/Form-title.vue";
import TitleBlock from "@/components/Title-block.vue";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import status from "@/mixins/status";
import authAccess from "@/mixins/authAccess";

export default {
  mixins: [status, authAccess],
  props: ['isEdit'],
  head: {
    title: "Пользователи",
  },
  data() {
    return {
      rules: {
        username: [
          {
            required: true,
            message: "This field is required",
            trigger: "change",
          },
        ],
        roleId: [
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
        password2: [
          {
            required: true,
            message: "This field is required",
            trigger: "change",
          },
        ],
      },
      form: {
        username: "",
        roleId: undefined,
        password: "",
        password2: "",
        active: true
      },
      roles: [],
      confirmPasswordError: "",
      confirmPassword: "",
      passwordError: '',
    };
  },
  mounted() {
    if(this.isEdit) this.__GET_USER();
    this.__GET_ROLES();
  },
  methods: {
    handleSubmit() {
      this.$refs["ruleForm"].validate((valid) => {
        if (valid) {
          if (this.form.password !== this.form.password2) {
            this.confirmPasswordError = 'Passwords do not match';
          } else {
            this.isEdit ? this.__EDIT_USER(this.form):this.__POST_USER(this.form);
          }
        }
      });
    },
    async __GET_USER() {
      const data = await this.$store.dispatch("fetchRole/getUsersById",this.$route.params.id);
      this.role = data;
      for(let elem in this.form) {
        this.form[elem] = data[elem] ?? this.form[elem]
      }
      this.form.roleId = data?.role?.id
    },
    onSubmit() {
      this.$refs["ruleForm"].validate((valid) => {
        if (valid) {
          console.log(this.isEdit)

        } else {
          return false;
        }
      });
    },
    async __GET_ROLES() {
      const data = await this.$store.dispatch("fetchRole/getRole");
      this.roles = data?.content;

    },
    async __POST_USER(data) {
      console.log("post")
      try {
        await this.$store.dispatch("fetchRole/postUser", data);
        this.$router.push("/settings/users");
        this.notification("success", "success", "Успешно добавлен");
      } catch (e) {
        this.statusFunc(e);
      }
    },
    async __EDIT_USER(data) {
      console.log("edit")
      try {
        await this.$store.dispatch("fetchRole/editUser", {id: this.$route.params.id,data});
        this.$router.push("/settings/users");
        this.notification("success", "success", "Успешно добавлен");
      } catch (e) {
        this.statusFunc(e);
      }
    },
  },
  watch: {
    'form.password2'() {
      this.confirmPasswordError = ""
    }
  },
  components: { TitleBlock, FormTitle },
};
</script>
<style lang="css">
.ant-select-search--inline .ant-select-search__field__wrap {
  display: flex;
  align-items: center;
}
.form-item .ant-select-selection--multiple input {
  padding: 0 !important;
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
