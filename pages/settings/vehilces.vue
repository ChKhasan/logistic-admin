<template>
  <div class="">
    <TitleBlock title="Транспорт" :breadbrumb="['Настройки сайта']" lastLink="Транспорт">
      <div class="d-flex">
        <a-button
          class="add-btn add-header-btn btn-primary d-flex align-items-center"
          type="primary"
          @click="addCountries"
          v-if="checkAccess('regions', 'post')"
        >
          <span v-if="!loadingBtn" class="svg-icon" v-html="addIcon"></span>
          Добавить
        </a-button>
      </div>
    </TitleBlock>
    <div class="container_xl app-container pb-5 pt-5">
      <div class="card_block main-table px-4 pb-4">
        <div class="d-flex justify-content-between align-items-center card_header">
          <div class="prodduct-list-header-grid w-100 align-items-center">
            <SearchInput
              placeholder="Поиск"
              @changeSearch="changeSearch($event,  '__GET_TRANSPORTS')"
            />
            <div></div>
            <a-button
              @click="clearQuery('/regions', '__GET_TRANSPORTS')"
              type="primary"
              class="d-flex align-items-center justify-content-center"
              style="height: 38px"
            >
              <a-icon type="reload"/>
            </a-button>
          </div>
        </div>
        <a-table
          :columns="columns"
          :pagination="false"
          :data-source="regions"
          :loading="loading"
        >
           <span slot="image" slot-scope="text">
            <img v-if="text" class="table-image" :src="text"/>
            <img
              v-else
              class="table-image"
              src="../../assets/images/photo_2023-03-04_13-28-58.jpg"
            />
          </span>
          <span slot="indexId" slot-scope="text">#{{ text?.key }}</span>
          <span
            @click="editAction(text.id)"
            class="title-link"
            slot="name"
            slot-scope="text"
          >{{ text?.name?.ru }}
          </span>
          <span slot="id" slot-scope="text">
            <span
              class="action-btn"
              v-if="checkAccess('regions', 'put')"
              v-html="editIcon"
              @click="editAction(text)"
            >
            </span>
            <a-popconfirm
              title="Are you sure delete this row?"
              ok-text="Yes"
              cancel-text="No"
              @confirm="deleteAction(text)"
              v-if="checkAccess('regions', 'delete')"
            >
              <span class="action-btn" v-html="deleteIcon"> </span>
            </a-popconfirm>
          </span>
        </a-table>
        <div class="d-flex justify-content-between mt-4">
          <a-select
            v-model="params.pageSize"
            class="table-page-size"
            style="width: 120px"
            @change="
              ($event) => changePageSizeGlobal($event, '/regions', '__GET_TRANSPORTS')
            "
          >
            <a-select-option
              v-for="item in pageSizes"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >{{ item.label }}
            </a-select-option>
          </a-select>
          <a-pagination
            class="table-pagination"
            :simple="false"
            v-model.number="current"
            :total="totalPage"
            :page-size.sync="params.pageSize"
          />
        </div>
      </div>
    </div>
    <a-modal
      v-model="visible"
      centered
      :title="title"
      :closable="false"
      width="768px"
      @ok="handleOk"
    >
      <div class="d-flex flex-column">
        <div class="form_tab mb-4 bottom_hr">
          <span
            v-for="(item, index) in formTabData"
            :key="index"
            @click="formTab = item.index"
            :class="{ 'avtive-formTab': formTab == item.index }"
          >
            {{ item.label }}
          </span>
        </div>
        <div
          class="d-flex flex-column"
          v-for="(item, index) in formTabData"
          :key="index"
          v-if="formTab == item.index"
        >
          <a-form-model :model="form" ref="ruleForm" :rules="rules" layout="vertical">
            <a-form-model-item
              class="form-item mb-3"
              label="Название "
              prop="name.ru"
            >
              <a-input v-model="form.name[`${item.index}`]" placeholder="Название..."/>
            </a-form-model-item>

            <a-form-model-item
              class="form-item mb-3"
              label="Описание"
            >
              <a-input type="textarea" rows="5" v-model="form.description[`${item.index}`]" placeholder="Описание..."/>
            </a-form-model-item>
            <a-form-model-item
              class="form-item mb-3"
              label="Размер"
              prop="size"
            >
              <a-input v-model="form.size" placeholder="100x100x100"/>
            </a-form-model-item>
            <a-form-model-item
              class="form-item mb-3"
              label="Изображение"
            >
              <a-upload
                action="https://api.logistic.ndc.uz/api/files/upload"
                list-type="picture-card"
                :file-list="fileList"
                :headers="headers"
                @preview="handlePreview"
                @change="handleChange"
                :remove="removeFile"
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
            </a-form-model-item>

          </a-form-model>
        </div>
      </div>
      <template slot="footer">
        <div class="add_modal-footer d-flex justify-content-end">
          <div
            class="add-btn add-header-btn add-header-btn-padding btn-light-primary mx-3"
            @click="handleOk"
          >
            Отмена
          </div>
          <a-button
            class="add-btn add-header-btn btn-primary"
            type="primary"
            :loading="loadingBtn"
            @click="saveData"
          >
            Сохранять
          </a-button>
        </div>
      </template>
    </a-modal>
  </div>
</template>

<script>
import SearchInput from "../../components/form/Search-input.vue";
import TitleBlock from "../../components/Title-block.vue";
import status from "../../mixins/status";
import global from "../../mixins/global";
import authAccess from "../../mixins/authAccess";

const columns = [
  {
    title: "№",
    key: "indexId",
    slots: {title: "customTitle"},
    scopedSlots: {customRender: "indexId"},
    className: "column-service",
    align: "left",
    width: 50,
  },
  {
    title: "заголовок",
    dataIndex: "image",
    key: "image",
    slots: {title: "customTitle"},
    scopedSlots: {customRender: "image"},
    className: "column-name",
    align: "left",
    colSpan: 2,
    width: 55,
  },
  {
    title: "Название ",
    slots: {title: "customTitle"},
    scopedSlots: {customRender: "name"},
    className: "column-name",
    align: "left",
    colSpan: 0
  },
  {
    title: "Размер",
    dataIndex: "size",
    key: "size",
    className: "column-text",
    customRender: (text) => text
  },
  {
    title: "описание",
    dataIndex: "description",
    key: "description",
    className: "column-text",
    scopedSlots: {customRender: "description"},
    customRender: (text) => text?.ru || '----'
  },
  {
    title: "ДЕЙСТВИЯ",
    className: "column-btns",
    dataIndex: "id",
    key: "id",
    align: "right",
    scopedSlots: {customRender: "id"},
    width: 100,
  },
];

export default {
  name: "IndexPage",
  head: {
    title: "Транспорт",
  },
  mixins: [status, global, authAccess],
  data() {
    return {
      previewVisible: false,
      previewImage: "",
      fileList: [],
      headers: {
        authorization: `Bearer ${localStorage.getItem("auth_token")}`,
      },
      mapSettings: {
        zoom: 1,
        maxZoom: 4,
        minZoom: 4,
      },
      coords: [41.311081, 69.240562],
      title: "Добавить",
      editId: null,
      formTab: "ru",
      visible: false,
      loadingBtn: false,
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
      editIcon: require("../../assets/svg/edit.svg?raw"),
      deleteIcon: require("../../assets/svg/delete.svg?raw"),
      addIcon: require("../../assets/svg/add-icon.svg?raw"),
      loading: false,
      columns,
      regions: [],
      rules: {
        name: {
          ru: [
            {required: true, message: "This field is required", trigger: "change"},
          ]
        },
        size: [
          {required: true, message: "This field is required", trigger: "change"},
        ],
      },
      form: {
        name: {
          ru: "",
          en: "",
        },
        description: {
          ru: "",
          en: "",
        },
        size: "",
        image: ''
      },
      countries: [],
    };
  },
  async mounted() {
    this.getFirstData("__GET_TRANSPORTS");
    this.__GET_COUNTRIES();
    // this.checkAllActions("regions");
  },
  methods: {
    onClick(e) {
      this.coords = e.get("coords");
      this.form.lat = this.coords[0];
      this.form.lon = this.coords[1];
    },
    saveData() {
      this.$refs["ruleForm"][0].validate((valid) => {
        if (valid) {
          this.editId ? this.__EDIT_TRANSPORTS(this.form) : this.__POST_TRANSPORTS(this.form);
        } else {
          return false;
        }
      });
    },

    editAction(id) {
      this.title = "Изменить";
      this.editId = id;
      this.__GET_TRANSPORTS_BY_ID(id);
    },
    deleteAction(id) {
      this.__DELETE_GLOBAL(
        id,
        "fetchVehilces/deleteVehilces",
        "Успешно удален",
        "__GET_TRANSPORTS"
      );
    },
    async __GET_TRANSPORTS() {
      try {
        this.loading = true;
        const data = await this.$store.dispatch("fetchVehilces/getVehilces", {
          ...this.$route.query,
        });

        this.regions = data?.content.map((item, index) => {
          return {
            ...item,
            key: index + 1,
          };
        });
        this.totalPage = data?.totalElements;
      } finally {
        this.loading = false;
      }

    },

    addCountries() {
      this.title = "Добавить";
      this.editId = null;
      this.visible = true;
    },
    handleOk() {
      this.visible = false;
    },
    async __POST_TRANSPORTS(data) {
      try {
        await this.$store.dispatch("fetchVehilces/postVehilces", data);
        this.notification("success", "success", "Успешно добавлен");
        this.handleOk();
        this.__GET_TRANSPORTS();
      } catch (e) {
        this.statusFunc(e);
      }
    },
    async __GET_COUNTRIES() {
      const data = await this.$store.dispatch("fetchCities/getCities");
      this.countries = data?.content;
    },
    removeFile(e) {
      this.__DELETE_FILE({filePath: e.url});
    },
    async __DELETE_FILE(payload) {
      try {
        await this.$store.dispatch("fetchFiles/postDeleteFile", payload);

      } catch (e) {

      }

    },
    async __GET_TRANSPORTS_BY_ID(targetId) {
      try {
        const data = await this.$store.dispatch("fetchVehilces/getVehilcesById", targetId);
        this.visible = true;
        const {created_at, updated_at, id, ...rest} = data;
        this.form = {...rest};
        this.fileList = [{
          uid: `-1`,
          name: "image.png",
          status: "done",
          oldImg: true,
          url: rest.image,
          response: {
            filePath: rest.image,
          },
        }];
      } catch (e) {
        this.statusFunc(e);
      }
    },
    emptyData() {
      this.form = {
        name: {
          ru: "",
          en: "",
        },
        description: {
          ru: "",
          en: "",
        },
        size: "",
        image: ''
      };
    },
    async __EDIT_TRANSPORTS(res) {
      try {
        await this.$store.dispatch("fetchVehilces/editVehilces", {
          id: this.editId,
          data: {...res},
        });
        this.handleOk();

        this.__GET_TRANSPORTS();
        this.notification("success", "success", "Успешно изменена");
      } catch (e) {
        this.statusFunc(e);
      }
    },
    handleCancel() {
      this.previewVisible = false;
    },
    async handlePreview(file) {
      if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj);
      }
      this.previewImage = file.url || file.preview;
      this.previewVisible = true;
    },
    handleChange({fileList}) {
      this.loadingBtn = true;
      this.fileList = fileList;
      if (fileList[0]?.response?.filePath) {
        this.form.image = fileList[0]?.response?.filePath
        this.loadingBtn = false;
      }
    },
  },
  watch: {
    async current(val) {
      this.changePagination(val, "__GET_TRANSPORTS");
    },
    visible(val) {
      if (val == false) {
        this.emptyData();
      }
    },
  },
  components: {TitleBlock, SearchInput},
};
</script>
<style lang="css">
.prodduct-list-header-grid {
  display: grid;
  grid-template-columns: 3fr 2fr 40px;
  grid-gap: 8px;
}

.card_header {
  padding: 16.25px 0;
}
</style>
