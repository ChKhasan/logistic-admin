<template lang="html">
  <div class="posts">
    <TitleBlock title="СМС рассылка" :breadbrumb="['Главный']" lastLink="СМС рассылка">
      <div class="d-flex">
        <div
          class="add-btn add-header-btn add-header-btn-padding btn-light-primary mx-3"
          @click="$router.push('/news')"
        >
          Отмена
        </div>
        <a-button
          class="add-btn add-header-btn btn-primary d-flex align-items-center"
          type="primary"
          @click="onSubmit"
          v-if="checkAccess('posts', 'post')"
        >
          <span class="svg-icon"> </span>
          Отправлять
        </a-button>
      </div>
    </TitleBlock>
    <a-form-model :model="form" ref="ruleForm" :rules="rules" layout="vertical">
      <div class="pb-5 pt-5">
        <div class="container_xl app-container d-flex flex-column">
          <div>
            <div class="card_block main-table px-4 py-4">
              <a-form-model-item class="form-item mb-3" prop="message" label="Сообщение">
                <a-input
                  type="textarea"
                  rows="5"
                  v-model="form.message"
                  placeholder="Сообщение..."
                />
              </a-form-model-item>
              <a-form-model-item class="form-item mb-3" label="Пользователи">
                <a-select
                  v-model="form.clients"
                  mode="multiple"
                  class="pxy-0"
                  style="width: 100%"
                  placeholder="Пользователи..."
                  option-label-prop="label"
                >
                  <a-select-option
                    :value="client?.id"
                    :label="client?.name"
                    :key="client.id"
                    v-for="client in clients"
                  >
                    {{ client?.name }}
                  </a-select-option>
                </a-select>
              </a-form-model-item>
              <div class="form-item">
                <label for="">Отправить всем пользователям</label>
                <a-checkbox class="mx-3" @change="onChange"></a-checkbox>
              </div>
            </div>
          </div>
        </div>
      </div>
    </a-form-model>
  </div>
</template>
<script>
import FormTitle from "../components/Form-title.vue";
import TitleBlock from "../components/Title-block.vue";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import status from "../mixins/status";
import authAccess from "../mixins/authAccess";

export default {
  mixins: [status, authAccess],
  head: {
    title: "СМС рассылка",
  },
  data() {
    return {
      value: [],
      rules: {
        message: [
          {
            required: true,
            message: "This field is required",
            trigger: "change",
          },
          {min: 12, message: "Min length 12", trigger: "blur"},
        ],
      },
      form: {
        clients: [],
        message: "",
      },
      clients: [],
    };
  },
  mounted() {
    // this.__GET_CLIENTS();
  },
  methods: {
    onSubmit() {
      this.$refs["ruleForm"].validate((valid) => {
        if (valid) {
          if (this.form.clients.length > 0) {
            this.__POST_MAILING(this.form);
          }
        } else {
          return false;
        }
      });
    },
    onChange(e) {
      if (e) {
        this.form.clients = this.clients.map((item) => item.id);
      } else {
        this.form.clients = [];
      }
    },
    async __GET_CLIENTS() {
      const data = await this.$store.dispatch("fetchClients/getClients", {
        ...this.$route.query,
      });
      this.clients = data?.clients?.data;
    },
    async __POST_MAILING(data) {
      try {
        await this.$store.dispatch("fetchClients/postMailing", data);
        this.notification("success", "success", "Успешно отправлен");
      } catch (e) {
        this.statusFunc(e);
      }
    },
  },
  components: {TitleBlock, FormTitle},
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

.pxy-0 .ant-select-selection {
  padding: 0 !important;
}

.pxy-0 .ant-select-selection__rendered {
  width: 100%;
}
</style>

