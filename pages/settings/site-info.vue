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
            <div class="posts-grid">
              <div
                  class="card_block main-table px-4 py-4 border-left-radius"
                  v-for="(item, index) in formTabData"
                  :key="index"
                  v-if="formTab == item.index"
              >
                <div class="d-flex gx-5" style="gap: 16px">
                  <a-form-model-item
                      class="form-item mb-3 w-100"
                      label="Заголовок"
                      prop="title_ru"
                  >
                    <a-input v-model="form[`title_${item.index}`]" placeholder="Заголовок"/>
                  </a-form-model-item>

                </div>

                <a-form-model-item class="form-item mb-3" label="Описание">
                  <quill-editor
                      v-model="form[`desc_${item.index}`]"
                      class="product-editor mt-1"
                      :options="editorOption"
                  />
                </a-form-model-item>
                <a-form-model-item class="form-item mb-3 w-100" label="Номер телефона">
                  <div class="d-flex flex-column numbers">
                    <span v-for="(number,index) in form.phone_numbers" :key="number.id">
                       <a-input placeholder="(___) ___-____" v-model="number.value"/>
                    </span>
                  </div>
                </a-form-model-item>

                <div class="create-inner-variant" @click="addNumber('phone_numbers')">
                  Добавить номер
                </div>

              </div>
              <span>
                <div class="card_block px-4 py-4">
                  <a-form-model-item class="form-item mb-3" label="Email">
                    <div class="d-flex flex-column numbers">
                    <span v-for="email in form.emails" :key="email.id">
                    <a-input v-model="email.value" placeholder="link"/>
                    </span>
                    </div>
                  </a-form-model-item>
                   <div class="create-inner-variant" @click="addNumber('emails')">
                    Добавить почту
                  </div>
                  <!--                  <a-form-model-item class="form-item mb-3" label="Instagram">-->
                  <!--                    <a-input v-model="form.instagram" placeholder="link" />-->
                  <!--                  </a-form-model-item>-->
                  <!--                  <a-form-model-item class="form-item mb-3" label="Telegram">-->
                  <!--                    <a-input v-model="form.telegram" placeholder="link" />-->
                  <!--                  </a-form-model-item>-->
                  <!--                  <a-form-model-item class="form-item mb-3" label="Facebook">-->
                  <!--                    <a-input v-model="form.facebook" placeholder="link" />-->
                  <!--                  </a-form-model-item>-->
                  <!--                  <a-form-model-item class="form-item mb-3" label="YouTube">-->
                  <!--                    <a-input v-model="form.youtube" placeholder="link" />-->
                  <!--                  </a-form-model-item>-->
                  <!--                  <a-form-model-item-->
                  <!--                    class="form-item mb-3"-->
                  <!--                    label="Втсавить карту(iframe)"-->
                  <!--                  >-->
                  <!--                    <a-input v-model="form.map" placeholder="iframe"/>-->
                  <!--                  </a-form-model-item>-->
                  <div class="clearfix d-flex">
                    <a-form-model-item class="form-item mb-3 w-100" label="Лого">
                      <a-upload
                          list-type="picture-card"
                          :file-list="fileListLogo"
                          :remove="($event) => handleRemove($event,'fileListLogo')"
                          :before-upload="handleBeforeUpload"
                          @preview="previewVisible = true"
                          :custom-request="($event) => customRequest($event,'fileListLogo')"
                          accept=".jpg, .png, .jpeg, .webp"
                      >
                    <div v-if="fileListLogo.length < 1">
                      <a-icon type="plus"/>
                      <div class="ant-upload-text">Загрузить изображение</div>
                    </div>
                  </a-upload>

                    </a-form-model-item>
                    <a-form-model-item class="form-item mb-3 w-100" label="Favicon">
                       <a-upload
                           list-type="picture-card"
                           :file-list="fileListIcon"
                           :remove="($event) => handleRemove($event,'fileListIcon')"
                           :before-upload="handleBeforeUpload"
                           @preview="previewVisible = true"
                           :custom-request="($event) => customRequest($event,'fileListIcon')"
                           accept=".jpg, .png, .jpeg, .webp"
                       >
                    <div v-if="fileListIcon.length < 1">
                      <a-icon type="plus"/>
                      <div class="ant-upload-text">Загрузить изображение</div>
                    </div>
                  </a-upload>
                    </a-form-model-item>
                    <a-modal
                        :visible="previewVisible"
                        :footer="null"
                        @cancel="handleCancel"
                    >
                      <img alt="example" style="width: 100%" :src="previewImage"/>
                    </a-modal>
                  </div>
            </div>
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
        {
          label: "English",
          index: "en",
        },
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
      },
      form: {
        title_uz: "",
        title_ru: "",
        desc_ru: "",
        desc_uz: "",
        phone_numbers: [{
          value: "",
          id: 1,
        }],
        emails: [
          {
            value: "",
            id: 1,
          }
        ],
      },
      previewVisible: false,
      previewImage: "",
      fileListFavicon: [],

    };
  },
  mounted() {
    this.__GET_STATIC_INFO();
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
      let formData = new FormData();

      const data = {
        ...this.form,
      }
      delete data.phone_numbers
      delete data.emails
      delete data.logo
      delete data.icon
      Object.keys(data).forEach((elem) => {
        formData.append(elem, data[elem]);
      })
      this.form.emails.forEach((elem) => {
        formData.append('emails[]', elem.value);
      })
      this.form.phone_numbers.forEach((elem) => {
        formData.append('phone_numbers[]', elem.value);
      })
      if (this.fileListIcon.at(-1)?.originFileObj)
        formData.append("favicon", this.fileListIcon.at(-1).originFileObj);
      // if (this.form.icon)
      //   formData.append("icon", this.form.icon);
      if (this.fileListLogo.at(-1)?.originFileObj)
        formData.append("logo", this.fileListLogo.at(-1).originFileObj);
      // if (this.form.logo)
      //   formData.append("logo", this.form.logo);
      this.$refs["ruleForm"].validate((valid) => {
        if (!valid) return false;
        this.__POST_STATIC_INFO(formData);
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
          this.form[elem] = data?.content[elem]
        })
        this.form.phone_numbers = JSON.parse(data?.content?.phone_numbers).map((item,index) => {
          return {
            id: index + 1,
            value: item
          }
        })
        this.form.emails = JSON.parse(data?.content?.emails).map((item,index) => {
          return {
            id: index + 1,
            value: item
          }
        })
        if (data?.content?.favicon){
          this.form.icon = data?.content?.favicon;
          this.fileListIcon = [
            {
              uid: "-1",
              name: "image.png",
              status: "done",
              oldImg: true,
              url: this.imgUrl + data?.content?.favicon,
            },
          ];
        }

        if (data?.content?.logo) {
          this.form.logo = data?.content?.logo;
          this.fileListLogo = [
            {
              uid: "-1",
              name: "image.png",
              status: "done",
              oldImg: true,
              url: this.imgUrl + data?.content?.logo,
            },
          ];
        }

        this.spinning = false;
      } catch (e) {
        this.statusFunc(e);
        this.spinning = false;
      }
    },
    addNumber(name) {
      this.form[name].push({
        value: '',
        id: this.form[name].length + 1
      })
    },
    handleBeforeUpload(file) {
      return true;
    },
    handleRemove(e, name) {
      this[name] = [];
    },
    customRequest({onSuccess, onError, file}, name) {
      const reader = new FileReader();
      reader.onload = () => {
        const uploadedFile = {
          uid: file.uid,
          name: file.name,
          originFileObj: file,
          url: reader.result,
        };
        this[name].push(uploadedFile);
        this.previewImage = reader.result;
        onSuccess();
      };
      reader.onerror = () => {
        console.error("Error reading file as binary data");
        onError(new Error("Error reading file"));
      };
      reader.readAsDataURL(file); // Use readAsDataURL to get Base64 data
    },

    handleCancel() {
      this.previewVisible = false;
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

.numbers {
  gap: 16px;
}

.posts .ant-upload.ant-upload-select-picture-card,
.posts .ant-upload-list-picture-card .ant-upload-list-item,
.posts .ant-upload-list-picture-card-container {
  width: 100% !important;
  height: 150px !important;
}

.site-info .galleries-grid-1 .ant-upload.ant-upload-select-picture-card,
.site-info .galleries-grid-2 .ant-upload.ant-upload-select-picture-card,
.site-info .galleries-grid-1 .ant-upload-list-picture-card-container,
.site-info .galleries-grid-2 .ant-upload-list-picture-card-container,
.site-info .galleries-grid-1 .ant-upload-list-picture-card .ant-upload-list-item,
.site-info .galleries-grid-2 .ant-upload-list-picture-card .ant-upload-list-item {
  width: 100%;
  height: 180px;
}
</style>
