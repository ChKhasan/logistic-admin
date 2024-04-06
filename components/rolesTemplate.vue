<template lang="html">
  <div class="posts">
    <TitleBlock title="Роли" :breadbrumb="['Главный']" lastLink="Роли">
      <div class="d-flex">
        <div
            class="add-btn add-header-btn add-header-btn-padding btn-light-primary mx-3"
            @click="$router.push('/settings/roles')"
        >
          Отмена
        </div>
        <a-button
            class="add-btn add-header-btn btn-primary d-flex align-items-center"
            type="primary"
            @click="onSubmit"
            v-if="checkAccess('roles', 'post')"
        >
          <span class="svg-icon"> </span>
          {{ save }}
        </a-button>
      </div>
    </TitleBlock>
    <a-form-model :model="form" ref="ruleForm" :rules="rules" layout="vertical">
      <div class="pb-5 pt-5">
        <div class="container_xl app-container d-flex flex-column">
          <div class="">
            <div class="card_block main-table px-4 py-4">
              <FormTitle :title="title"/>
              <a-form-model-item class="form-item mb-3" label="Имя" prop="title">
                <a-input v-model="form.title" placeholder="Имя..."/>
              </a-form-model-item>
              <a-form-model-item class="form-item mb-3" label="Доступы к разделам" prop="permissions">
                <a-select
                    mode="multiple"
                    style="width: 100%"
                    placeholder="Выберите разрешения"
                    v-model="form.permissions"
                >
                  <a-select-option v-for="item in permissions" :key="item?.id">
                    {{ item?.title }}
                  </a-select-option>
                </a-select>
              </a-form-model-item>
              <a-form-model-item class="form-item mb-3" label="Доступы к разделам ( Группа )">
                <a-select
                    show-search
                    mode="multiple"
                    style="width: 100%"
                    placeholder="Выберите разрешения"
                    v-model="form.permissionGroups"
                >
                  <a-select-option v-for="item in permissions" :key="item?.id" :value="item?.id">
                    {{ item?.title }}
                  </a-select-option>
                </a-select>
              </a-form-model-item>

<!--              <div class="permissions-container">-->
<!--                <div class="permissions-header"><h5>Доступы к разделам</h5></div>-->
<!--                <div-->
<!--                    class="permissions-list"-->
<!--                    v-for="permission in permissions"-->
<!--                    :key="permission.id"-->
<!--                >-->
<!--                  <h4>{{ permission?.title }}</h4>-->
<!--                  <span-->
<!--                  ><a-switch @change="onChange(permission)"-->
<!--                  /></span>-->
<!--                </div>-->
<!--              </div>-->
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
  props: ['isEdit',"title","save"],
  head: {
    title: "Роли",
  },
  data() {
    return {
      formTab: "ru",
      formTabData: [
        {
          label: "Русский",
          index: "ru",
        },
        {
          label: "O'zbek",
          index: "uz",
        },
        {
          label: "English",
          index: "en",
        },
      ],
      rules: {
        title: [
          {
            required: true,
            message: "This field is required",
            trigger: "change",
          },
        ],
        permissions: [
          {
            required: true,
            message: "This field is required",
            trigger: "change",
          },
        ],
      },
      form: {
        title: "",
        permissions: [],
        permissionGroups: []
      },
      permissions: [],
      role: {}
    };
  },
  mounted() {
    this.__GET_PERMISSIONS();
    if(this.isEdit) this.__GET_ROLE()
  },
  methods: {
    onSubmit() {
      this.$refs["ruleForm"].validate((valid) => {
        if (!valid)  return false;
        this.isEdit ? this.__EDIT_ROLE(this.form):this.__POST_ROLE(this.form);
      });
    },
    onChange(obj) {
      let actions = [];
      actions.push(obj.method);
      this.form.permissions.push({id: obj.id, actions: actions});
    },
    onChangeCheckbox(obj, type) {
      const elem = this.form.permissions.find((item) => item.id == obj.id);
      if (elem) {
        elem.actions.push(type);
      } else {
        this.form.permissions.push({id: obj.id, actions: [type]});
      }
    },
    async __GET_ROLE() {
      const data = await this.$store.dispatch("fetchRole/getRoleById",this.$route.params.id);
      this.role = data;
      for(let elem in this.form) {
        this.form[elem] = data[elem] ?? this.form[elem]
      }
    },
    async __GET_PERMISSIONS() {
      const data = await this.$store.dispatch("fetchRole/getPermissions");
      this.permissions = data;
    },
    async __EDIT_ROLE(data) {
      try {
        await this.$store.dispatch("fetchRole/editRole", {id: this.$route.params.id,data});
        this.$router.push("/settings/roles");
        this.notification("success", "success", "Успешно добавлен");
      } catch (e) {
        this.statusFunc(e);
      }
    },
    async __POST_ROLE(data) {
      try {
        await this.$store.dispatch("fetchRole/postRole", data);
        this.$router.push("/settings/roles");
        this.notification("success", "success", "Успешно добавлен");
      } catch (e) {
        this.statusFunc(e);
      }
    },
  },
  components: {TitleBlock, FormTitle},
};
</script>
<style lang="css">
.ant-select-selection--multiple .ant-select-search--inline .ant-select-search__field {
  width: 100%;
}
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
  padding: 0 13px;
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
