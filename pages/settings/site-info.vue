<template lang="html">
  <div class="site-info">
    <TitleBlock
        title="Общие данные"
        :breadbrumb="['Настройки сайта']"
        lastLink="Общие данные"
    >
      <div class="d-flex">
        <a-button
            v-if="checkAccess('site_infos', 'put') && checkAccess('site_infos', 'post')"
            class="add-btn add-header-btn btn-primary d-flex align-items-center"
            type="primary"
            @click="onSubmit"
        >
          <span class="svg-icon"> </span>
          Сохранить
        </a-button>
      </div>
    </TitleBlock>
    <a-spin :spinning="spinning" :delay="delayTime">
      <a-form-model :model="form" ref="ruleForm" :rules="rules" layout="vertical">
        <div class="pb-5 pt-5">
          <div class="container_xl app-container d-flex flex-column">
            <div class="form_tab">
              <div>
                <span
                    v-for="(item, index) in formTabData"
                    :key="index"
                    @click="formTab = item.index"
                    :class="{ 'avtive-formTab': formTab == item.index }"
                >
                  {{ item.label }}
                </span>
              </div>
            </div>
            <div >
              <div
                  class="card_block main-table px-4 py-4 border-left-radius"
                  v-for="(item, index) in formTabData"
                  :key="index"
                  v-if="formTab === item.index"
              >
                <div class="grid-2">
                  <div class="d-flex gx-5" style="gap: 16px">
                    <a-form-model-item
                      class="form-item mb-3 w-100"
                      label="Заголовок"
                      prop="title.ru"
                    >
                      <a-input v-model="form.title[item.index]" placeholder="Заголовок"/>
                    </a-form-model-item>

                  </div>
                  <div class="d-flex gx-5" style="gap: 16px">
                    <a-form-model-item
                      class="form-item mb-3 w-100"
                      label="Заголовок ( Водитель )"
                      prop="titleDriver.ru"
                    >
                      <a-input v-model="form.titleDriver[item.index]" placeholder="Заголовок"/>
                    </a-form-model-item>

                  </div>
                  <a-form-model-item class="form-item mb-3" label="Описание">
                    <quill-editor
                      v-model="form.description[item.index]"
                      class="product-editor mt-1"
                      :options="editorOption"
                    />
                  </a-form-model-item>
                  <a-form-model-item class="form-item mb-3" label="Описание ( Водитель )">
                    <quill-editor
                      v-model="form.descriptionDriver[item.index]"
                      class="product-editor mt-1"
                      :options="editorOption"
                    />
                  </a-form-model-item>
                  <div class="d-flex gx-5" style="gap: 16px">
                    <a-form-model-item
                      class="form-item mb-3 w-100"
                      label="Номер телефона"
                    >
                      <a-input v-model="form.phoneNumber" placeholder="(___) ___-____"/>
                    </a-form-model-item>

                  </div>

                </div>



              </div>
              <span>
            </span>
            </div>
          </div>
        </div>
      </a-form-model>
    </a-spin>
  </div>
</template>
<script>
import FormTitle from "../../components/Form-title.vue";
import TitleBlock from "../../components/Title-block.vue";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import status from "../../mixins/status";
import authAccess from "../../mixins/authAccess";

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

export default {
  mixins: [status, authAccess],
  head: {
    title: "Общие данные",
  },
  data() {
    return {
      fileListIcon: [],
      fileListLogo: [],
      delayTime: 0,
      spinning: false,
      headers: {
        authorization: `Bearer ${localStorage.getItem("auth_token")}`,
      },
      editorOption: {
        theme: "snow",
        modules: {
          toolbar: [
            [
              {
                font: [],
              },
              {
                size: [],
              },
            ],
            ["bold", "italic", "underline", "strike"],
            [
              {
                color: [],
              },
              {
                background: [],
              },
            ],
            [
              {
                script: "super",
              },
              {
                script: "sub",
              },
            ],
            [
              {
                header: [false, 1, 2, 3, 4, 5, 6],
              },
              "blockquote",
              "code-block",
            ],
            [
              {
                list: "ordered",
              },
              {
                list: "bullet",
              },
              {
                indent: "-1",
              },
              {
                indent: "+1",
              },
            ],
            [
              "direction",
              {
                align: [],
              },
            ],
            ["link", "image", "video"],
            ["clean"],
          ],
        },
      },
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
        // {
        //   label: "English",
        //   index: "en",
        // },
      ],
      rules: {
        title: {
          ru: [
            {
              required: true,
              message: "This field is required",
              trigger: "change",
            },
          ],
        },
        titleDriver: {
          ru: [
            {
              required: true,
              message: "This field is required",
              trigger: "change",
            },
          ],
        },
      },
      form: {
        phoneNumber: "",
        title: {ru: "", uz: ""},
        description: {ru: "", uz: ""},
        titleDriver: {ru: "", uz: ""},
        descriptionDriver: {ru: "", uz: ""}
      },
      previewVisible: false,
      previewImage: "",
      fileListFavicon: [],

    };
  },
  mounted() {
    this.__GET_STATIC_INFO()
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  },
  computed: {
    baseUrl() {
      return process.env.BASE_URL;
    },
    imgUrl() {
      return this.baseUrl + "/storage/";
    },
  },
  methods: {
    onSubmit() {
      const data = {...this.form}
      this.$refs["ruleForm"].validate((valid) => {
        if(!valid) return false
        this.__POST_STATIC_INFO(data);
      });
    },
    async __POST_STATIC_INFO(data) {
      try {
        await this.$store.dispatch("fetchStaticInfo/postStaticInfo", data);
        this.notification("success", "success", "Успешно изменена");
      } catch (e) {
        this.statusFunc(e);
      }
    },
    async __GET_STATIC_INFO() {
      try {
        this.spinning = true;
        const data = await this.$store.dispatch("fetchStaticInfo/getStaticInfo");
        Object.keys(this.form).forEach(elem => {
          this.form[elem] = data[elem]
        })
      } catch (e) {
        this.statusFunc(e);
      } finally {
        this.spinning = false;

      }
    },
    handleCancel() {
      this.previewVisible = false;
    },
  },
  components: {TitleBlock, FormTitle},
};
</script>
<style lang="css" scoped>
.grid-2 {
  display: grid;
  grid-gap: 16px;
  grid-template-columns: repeat(2,1fr);
}



.posts .ant-upload.ant-upload-select-picture-card,
.posts .ant-upload-list-picture-card .ant-upload-list-item,
.posts .ant-upload-list-picture-card-container {
  width: 100% !important;
  height: 150px !important;
}


</style>
