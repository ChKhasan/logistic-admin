<template lang="html">
  <div class="posts">
    <TitleBlock
      title="Специальности"
      :breadbrumb="['Настройки сайта']"
      lastLink="Специальности"
    >
      <div class="d-flex">
        <div
          class="add-btn add-header-btn add-header-btn-padding btn-light-primary "
          @click="$router.go(-1)"
        >
          Отмена
        </div>
        <a-popconfirm
          title="Вы уверены, что хотите удалить эту специальность?"
          ok-text="Да"
          cancel-text="Нет"
          @confirm="deleteAction()"
        >
          <a-button
            class="add-btn add-header-btn btn-primary d-flex align-items-center mx-3"
            type="danger"
          >
            Удалить
          </a-button>
        </a-popconfirm>

        <a-button
          class="add-btn add-header-btn btn-primary d-flex align-items-center"
          type="primary"
          @click="onSubmit"
        >
          <span class="svg-icon"> </span>
          Добавить
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
                :class="{ 'avtive-formTab': formTab == item.index }"
              >
                {{ item.label }}
              </span>
            </div>
          </div>
          <div class="posts-grid">
            <div>
              <div
                class="card_block main-table px-4 py-4 border-left-radius"
                v-for="(item, index) in formTabData"
                :key="index"
                v-if="formTab == item.index"
              >
                <FormTitle title="Специальности"/>
                <a-form-model-item
                  class="form-item mb-3"
                  label="Заголовок"
                  prop="name_ru"
                >
                  <a-input v-model="form[`name_${item.index}`]" placeholder="Заголовок"/>
                </a-form-model-item>
                <a-form-model-item class="form-item mb-3" label="Подзаголовок">
                  <a-select
                    v-model="form.parent_id"
                    class="form-item w-100"
                    placeholder="Родительские специальности"
                  >
                    <a-select-option
                      v-for="item in specialities"
                      :key="item?.id"
                      :value="item?.id"
                    >
                      {{ item?.name_ru }}
                    </a-select-option>
                  </a-select>
                </a-form-model-item>
                <a-form-model-item class="form-item mb-3" label="Описание">
                  <quill-editor class="product-editor mt-1" :options="editorOption"/>
                </a-form-model-item>
              </div>
              <div class="d-flex flex-column mt-4">
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
                <div
                  class="card_block main-table px-4 py-4 border-left-radius"
                  v-for="(item, index) in formTabData"
                  :key="index"
                  v-if="formTab == item.index"
                >
                  <FormTitle title="SEO"/>
                  <a-form-model-item class="form-item mb-3" label="Slug">
                    <a-input placeholder="Slug..."/>
                  </a-form-model-item>

                  <a-form-model-item class="form-item mb-3" label="Мета-ключевые слова">
                    <a-input type="textarea" rows="5" placeholder="Ключевые слова..."/>
                  </a-form-model-item>
                  <a-form-model-item class="form-item mb-3" label="Мета-описание">
                    <a-input type="textarea" rows="5" placeholder="Описание..."/>
                  </a-form-model-item>
                </div>
              </div>
            </div>

            <span>
              <div class="card_block main-table px-4 py-4">
                <FormTitle title="Параметры"/>
                <a-select v-model="value" class="form-item w-100" placeholder="Status">
                  <a-select-option
                    v-for="item in statusData"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >{{ item.label }}
                  </a-select-option>
                </a-select>
                <div class="clearfix mt-4">
                  <a-upload
                    list-type="picture-card"
                    :file-list="fileList"
                    :remove="($event) => handleRemove($event, item)"
                    :before-upload="handleBeforeUpload"
                    @preview="previewVisible = true"
                    :custom-request="($event) => customRequest($event, item)"
                    accept=".jpg, .png, .jpeg, .webp"
                  >
                    <div v-if="fileList.length < 1">
                      <a-icon type="plus"/>
                      <div class="ant-upload-text">Загрузить изображение</div>
                    </div>
                  </a-upload>
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
  head: {
    title: "Специальности",
  },
  data() {
    return {
      value: undefined,
      statusData: [
        {
          label: "Активный",
          value: 1,
        },
        {
          label: "Не активный",
          value: 0,
        },
      ],
      editorOption: {
        theme: "snow",
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
        name_ru: [
          {
            required: true,
            message: "This field is required",
            trigger: "change",
          },
        ],
      },
      form: {
        name_ru: "",
        name_uz: "",
        icon: "",
        parent_id: undefined,
      },
      previewVisible: false,
      previewImage: "",
      fileList: [],
      specialities: [],
    };
  },
  mounted() {
    this.__GET_SPECIAL();
    this.__GET_SPECIAL_BY_ID(this.$route.params.id);
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
    deleteAction() {
      this.__DELETE_GLOBAL()
    },
    onSubmit() {
      let formData = new FormData();
      if (this.fileList.length > 0) {
        formData.append("icon", this.fileList.at(-1).originFileObj);
        // formData.append("icon", this.form.icon);
      }
      formData.append("_method", "PUT");
      formData.append("name_ru", this.form.name_ru);
      formData.append("name_uz", this.form.name_uz);
      formData.append("parent_id", this.form.parent_id ? this.form.parent_id : "");
      this.$refs["ruleForm"].validate((valid) => {
        if (valid) {
          this.__EDIT_SPECIAL(formData);
        } else {
          return false;
        }
      });
    },
    async __DELETE_GLOBAL() {
      try {
        await this.$store.dispatch("fetchSpecialities/deleteSpecialities", this.$route.params.id);
        this.notification("success", "success", "Успешно удален");
        this.$router.push('/settings/specialities')
      } catch (e) {
        this.statusFunc(e.response);
      }
    },
    async __EDIT_SPECIAL(res) {
      try {
        await this.$store.dispatch("fetchSpecialities/editSpecialities", {
          id: this.$route.params.id,
          data: res,
        });
        this.__GET_SPECIAL();
        this.notification("success", "success", "Успешно изменена");
        this.$router.go(-1);
      } catch (e) {
        this.statusFunc(e);
      }
    },
    async __GET_SPECIAL_BY_ID(targetId) {
      try {
        const data = await this.$store.dispatch(
          "fetchSpecialities/getSpecialitiesById",
          targetId
        );
        Object.keys(this.form).forEach((elem) => {
          this.form[elem] = data?.content[elem];
        });
        this.form.icon = null;
        this.form.parent_id = data?.content?.parent?.id;
        if (data?.content?.icon)
          this.fileList = [
            {
              uid: "-1",
              name: "image.png",
              status: "done",
              oldImg: true,
              url: this.imgUrl + data?.content?.icon,
            },
          ];
        this.previewImage = this.imgUrl + data?.content?.icon;
      } catch (e) {
        console.log(e);
        this.statusFunc(e);
      }
    },
    async __GET_SPECIAL() {
      try {
        this.loading = true;
        const data = await this.$store.dispatch("fetchSpecialities/getSpecialities", {
          ...this.$route.query,
        });
        this.loading = false;
        this.specialities = data?.content.map((item, index) => {
          let elem = {
            ...item,
            childs: item.children,
            key: index + 1,
          };
          delete elem["children"];
          return elem;
        });
      } catch (e) {
      }
    },
    handleBeforeUpload(file) {
      return true;
    },
    handleRemove(e, name) {
      this.fileList = [];
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
        this.fileList.push(uploadedFile);
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

.posts .ant-upload.ant-upload-select-picture-card,
.posts .ant-upload-list-picture-card .ant-upload-list-item,
.posts .ant-upload-list-picture-card-container {
  width: 100% !important;
  height: 150px !important;
}
</style>
