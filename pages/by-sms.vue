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
          <div class="form_tab">
            <div>
              <span
                v-for="(item, index) in formTabData"
                :key="index"
                @click="formTab = item.index"
                :class="{ 'avtive-formTab': formTab === item.index }"
              >
                {{ item.label }}
              </span>
            </div>
          </div>
          <div>
            <div class="card_block main-table px-4 py-4"
                 v-for="(item, index) in formTabData"
                 :key="index"
                 v-if="formTab === item.index"
            >
              <a-form-model-item class="form-item mb-3" label="Заголовок" prop="title.uz">
                <a-input v-model="form.title[item.index]" placeholder="Заголовок..."/>
              </a-form-model-item>

              <a-form-model-item class="form-item mb-3" prop="message.uz" label="Сообщение">
                <a-input
                  type="textarea"
                  rows="5"
                  v-model="form.message[item.index]"
                  placeholder="Сообщение..."
                />
              </a-form-model-item>
              <a-form-model-item class="form-item mb-3" label="Пользователи" prop="userType">
                <a-select
                  :disabled="checkValue"
                  v-model="form.userType"
                  style="width: 100%"
                  placeholder="Выберите, кому отправить"
                  option-label-prop="label"
                >
                  <a-select-option
                    :value="option.value"
                    :label="option.label"
                    :key="option.value"
                    v-for="option in options"
                  >
                    {{ option.label }}
                  </a-select-option>
                </a-select>
              </a-form-model-item>
              <div class="form-item">
                <label for="">Отправить всем</label>
                <a-checkbox :checked="checkValue" class="mx-3" @change="checkValue = !checkValue"></a-checkbox>
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
      checkValue: true,
      options: [{
        value: 'DRIVER',
        label: 'Водителям'
      }, {
        value: 'COMPANY',
        label: 'Компаниям'
      }, {
        value: 'CONSUMER',
        label: 'Клиентам'
      }
      ],
      formTabData: [
        {
          label: "O'zbek",
          index: "uz",
        },
        {
          label: "Русский",
          index: "ru",
        },
      ],
      formTab: "uz",
      value: [],
      rules: {
        message: {
          uz: [
            {
              required: true,
              message: "This field is required",
              trigger: "change",
            },
          ]
        },
        title: {
          uz: [
            {
              required: true,
              message: "This field is required",
              trigger: "change",
            },
          ]
        },

      },
      form: {
        userType: undefined,
        title: {ru: "", uz: ""},
        message: {ru: "", uz: ""}
      },
      clients: [],
    };
  },
  methods: {
    onSubmit() {
      const data = {
        ...this.form,
        userType: this.checkValue ? null : this.form.userType
      }
      this.$refs["ruleForm"].validate((valid) => valid && this.__POST_MAILING(data));
    },
    onChange() {
      this.form.userType = null
    },
    async __POST_MAILING(data) {
      try {
        await this.$store.dispatch("fetchNotifications/postNotifications", data);
        this.notification("success", "success", "Успешно отправлен");
        this.formReset()
      } catch (e) {
        this.statusFunc(e);
      }
    },
    formReset() {
      this.form = {
        userType: undefined,
        title: {ru: "", uz: ""},
        message: {ru: "", uz: ""}
      }
    }
  },
  watch: {
    checkValue(val) {
      val ? this.form.userType = undefined : this.form.userType = undefined
    }
  },
  components: {TitleBlock, FormTitle},
};
</script>
<style lang="css">

</style>

