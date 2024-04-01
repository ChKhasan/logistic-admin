<template>
  <div class="">
    <TitleBlock
      title="Специальности"
      :breadbrumb="['Настройки сайта']"
      lastLink="Специальности"
    >
      <div class="d-flex">
        <a-button
          class="add-btn add-header-btn btn-primary d-flex align-items-center mx-4"
          type="primary"
          @click="positionGenerator"
        >Сохранить позицию
        </a-button
        >
        <a-button
          class="add-btn add-header-btn btn-primary d-flex align-items-center"
          type="primary"
          @click="$router.push('/settings/specialities/add')"
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
              @changeSearch="changeSearch($event, '__GET_SPECIAL')"
            />
            <div></div>
            <a-button
              @click="clearQuery('__GET_SPECIAL')"
              type="primary"
              class="d-flex align-items-center justify-content-center"
              style="height: 38px"
            >
              <a-icon type="reload"
              />
            </a-button>
          </div>
        </div>
        <table class="ant-table ant-table-striped ant-table-scroll-position-left">
          <thead class="ant-table-thead">
          <tr>
            <th
              key="indexId"
              class="column-service ant-table-align-left ant-table-row-cell-break-word"
              style="text-align: left"
            >
              <span class="ant-table-column-title ant-table-header-column">№</span>
            </th>
            <th
              key="text_ru"
              class="column-name ant-table-align-left"
              style="text-align: left"
            >
              <span class="ant-table-column-title ant-table-header-column">НАЗВАНИЕ</span>
            </th>

            <th
              key="id"
              class="column-btns ant-table-align-right ant-table-row-cell-break-word ant-table-row-cell-last"
              style="text-align: left"
            >
              <span class="ant-table-column-title ant-table-header-column">ПОДКАТЕГОРИЯ</span>
            </th>
            <th
              key="btns"
              class="column-btns ant-table-align-right ant-table-row-cell-break-word ant-table-row-cell-last"
              style="text-align: right"
            >
              <span class="ant-table-header-column ant-table-column-title">ДЕЙСТВИЯ</span>
            </th>
          </tr>
          </thead>
          <draggable
            :list="specialities"
            class="ant-table-tbody"
            tag="tbody"
            handle=".handle"
          >
            <tr
              class="ant-table-row ant-table-row-level-0"
              :data-row-key="reason?.id"
              v-for="(reason, index) in specialities"
            >
              <td
                class="column-service ant-table-row-cell-break-word"
                style="text-align: left;width: 50px"
              >
                <span>#{{ index + 1 }}</span>
              </td>
              <td class="column-name ant-table-row-cell-break-word" style="text-align: left;">
                <span><img
                  src="https://test-api.hirelancer.ndc.uz//storage/icon/8SBGlYv7PbALrSj5OrEc9XP6y3wiVaDqCSoce9hx.png"
                  alt="" class="table-image">
                </span>
                <nuxt-link class="title-link px-3" :to="`/settings/specialities/${reason?.id}`">{{
                    reason?.name_ru
                  }}
                </nuxt-link>
              </td>
              <td class="column-tags" style="text-align: left;width: 400px">
                <span>
                    <a-tag
                      color="blue"
                      v-for="item in reason?.childs"
                      :key="item?.id"
                      class="cursor-pointer"
                      @click="$router.push(`/settings/specialities/${item?.id}`)"
                    >
                      {{ item?.name_ru }}
                    </a-tag>
                  </span>
              </td>


              <td
                class="column-btns ant-table-row-cell-break-word"
                style="text-align: right;width: 150px"
              >
                <span class="d-inline-flex" style="gap: 4px">
                  <span class="action-btn handle" style="cursor: grab">
                    <span class="svg-icon svg-icon-primary svg-icon-2x">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        xmlns:xlink="http://www.w3.org/1999/xlink"
                        width="24px"
                        height="24px"
                        viewBox="0 0 24 24"
                        version="1.1"
                      >
                        <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                          <polygon points="0 0 24 0 24 24 0 24"/>
                          <path
                            d="M10.4289322,12.3786797 L5.30761184,7.25735931 C4.91708755,6.86683502 4.91708755,6.23367004 5.30761184,5.84314575 C5.69813614,5.45262146 6.33130112,5.45262146 6.72182541,5.84314575 L11.8431458,10.9644661 L18.0355339,4.77207794 C18.4260582,4.38155365 19.0592232,4.38155365 19.4497475,4.77207794 C19.8402718,5.16260223 19.8402718,5.79576721 19.4497475,6.1862915 L13.2573593,12.3786797 L19.4497475,18.5710678 C19.8402718,18.9615921 19.8402718,19.5947571 19.4497475,19.9852814 C19.0592232,20.3758057 18.4260582,20.3758057 18.0355339,19.9852814 L11.8431458,13.7928932 L6.72182541,18.9142136 C6.33130112,19.3047379 5.69813614,19.3047379 5.30761184,18.9142136 C4.91708755,18.5236893 4.91708755,17.8905243 5.30761184,17.5 L10.4289322,12.3786797 Z"
                            fill="#3699FF"
                            opacity="0.3"
                            transform="translate(12.378680, 12.378680) rotate(-315.000000) translate(-12.378680, -12.378680) "
                          />
                          <path
                            d="M3.51471863,12 L5.63603897,14.1213203 C6.02656326,14.6736051 6.02656326,15.1450096 5.63603897,15.5355339 C5.24551468,15.9260582 4.77411016,15.9260582 4.22182541,15.5355339 L0.686291501,12 L4.22182541,8.46446609 C4.69322993,7.99306157 5.16463445,7.99306157 5.63603897,8.46446609 C6.10744349,8.93587061 6.10744349,9.40727514 5.63603897,9.87867966 L3.51471863,12 Z M12,20.4852814 L14.1213203,18.363961 C14.6736051,17.9734367 15.1450096,17.9734367 15.5355339,18.363961 C15.9260582,18.7544853 15.9260582,19.2258898 15.5355339,19.7781746 L12,23.3137085 L8.46446609,19.7781746 C7.99306157,19.3067701 7.99306157,18.8353656 8.46446609,18.363961 C8.93587061,17.8925565 9.40727514,17.8925565 9.87867966,18.363961 L12,20.4852814 Z M20.4852814,12 L18.363961,9.87867966 C17.9734367,9.32639491 17.9734367,8.85499039 18.363961,8.46446609 C18.7544853,8.0739418 19.2258898,8.0739418 19.7781746,8.46446609 L23.3137085,12 L19.7781746,15.5355339 C19.3067701,16.0069384 18.8353656,16.0069384 18.363961,15.5355339 C17.8925565,15.0641294 17.8925565,14.5927249 18.363961,14.1213203 L20.4852814,12 Z M12,3.51471863 L9.87867966,5.63603897 C9.32639491,6.02656326 8.85499039,6.02656326 8.46446609,5.63603897 C8.0739418,5.24551468 8.0739418,4.77411016 8.46446609,4.22182541 L12,0.686291501 L15.5355339,4.22182541 C16.0069384,4.69322993 16.0069384,5.16463445 15.5355339,5.63603897 C15.0641294,6.10744349 14.5927249,6.10744349 14.1213203,5.63603897 L12,3.51471863 Z"
                            fill="#3699FF"
                            fill-rule="nonzero"
                          />
                        </g></svg
                      ></span
                    ></span
                  >
                  <span
                    class="action-btn"
                    @click="editAction(reason?.id)"
                    v-html="editIcon"
                  ></span>
                  <a-popconfirm
                    title="Are you sure delete this row?"
                    ok-text="Yes"
                    cancel-text="No"
                    @confirm="deleteAction(reason?.id)"
                  >
                    <span class="action-btn" v-html="deleteIcon"> </span>
                  </a-popconfirm>
                </span>
              </td>
            </tr>
          </draggable>
        </table>
        <!--        <a-table-->
        <!--          :columns="columns"-->
        <!--          :pagination="false"-->
        <!--          :data-source="specialities"-->
        <!--          :loading="loading"-->
        <!--        >-->
        <!--          <span slot="indexId" slot-scope="text">#{{ text?.key }}</span>-->

        <!--          <nuxt-link-->
        <!--            class="title-link"-->
        <!--            :to="`/settings/specialities/${text?.id}`"-->
        <!--            slot="name"-->
        <!--            slot-scope="text"-->
        <!--          >{{ text?.name_ru }}-->
        <!--          </nuxt-link-->
        <!--          >-->
        <!--          <span slot="icon" slot-scope="text">-->
        <!--                    <img class="table-image" v-if="text" :src="`${imgUrl}${text}`" alt=""/>-->

        <!--                    <img-->
        <!--                      v-else-->
        <!--                      class="table-image"-->
        <!--                      src="@/assets/images/photo_2023-03-04_13-28-58.jpg"-->
        <!--                      alt=""-->
        <!--                    />-->
        <!--                  </span>-->
        <!--          <span slot="childs" slot-scope="text">-->
        <!--                    <a-tag-->
        <!--                      color="blue"-->
        <!--                      v-for="item in text"-->
        <!--                      :key="item?.id"-->
        <!--                      class="cursor-pointer"-->
        <!--                      @click="$router.push(`/settings/specialities/${item?.id}`)"-->
        <!--                    >-->
        <!--                      {{ item?.name_ru }}-->
        <!--                    </a-tag>-->
        <!--                  </span>-->

        <!--          <span slot="id" slot-scope="text">-->
        <!--                    <span class="action-btn" v-html="editIcon" @click="editAction(text)"> </span>-->
        <!--                    <a-popconfirm-->
        <!--                      title="Are you sure delete this row?"-->
        <!--                      ok-text="Yes"-->
        <!--                      cancel-text="No"-->
        <!--                      @confirm="deleteAction(text)"-->
        <!--                      v-if="checkAccess('regions', 'delete')"-->
        <!--                    >-->
        <!--                      <span class="action-btn" v-html="deleteIcon"> </span>-->
        <!--                    </a-popconfirm>-->
        <!--                  </span>-->
        <!--        </a-table>-->
        <div class="d-flex justify-content-between mt-4">
          <a-select
            v-model="params.pageSize"
            class="table-page-size"
            style="width: 120px"
            @change="($event) => changePageSizeGlobal($event, '__GET_SPECIAL')"
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
      width="524px"
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
            <a-form-model-item class="form-item mb-3" label="Название" prop="name_ru">
              <a-input v-model="form[`name_${item.index}`]" placeholder="Название..."/>
            </a-form-model-item>
            <a-form-model-item label="Специальности" class="form-item mb-3">
              <a-select v-model="form.parent_id" placeholder="please select your zone">
                <a-select-option
                  v-for="item in specialities"
                  :key="item?.id"
                  :value="item?.id"
                >
                  {{ item?.name_ru }}
                </a-select-option>
              </a-select>
            </a-form-model-item>
            <a-form-model-item label="Икона" class="form-item mb-3">
              <a-upload
                list-type="picture-card"
                :file-list="fileList"
                :remove="($event) => handleRemove($event, item)"
                :before-upload="handleBeforeUpload"
                :custom-request="($event) => customRequest($event, item)"
                accept=".jpg, .png, .jpeg, .webp"
              >
                <span v-if="fileList.length == 0"> <a-icon type="upload"/> </span>
              </a-upload>
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
import SearchInput from "@/components/form/Search-input.vue";
import TitleBlock from "@/components/Title-block.vue";
import status from "@/mixins/status";
import global from "@/mixins/global";
import authAccess from "@/mixins/authAccess";
import draggable from "vuedraggable";

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
    title: "Название ",
    dataIndex: "icon",
    key: "icon",
    slots: {title: "customTitle"},
    className: "column-name",
    scopedSlots: {customRender: "icon"},
    align: "left",
    colSpan: 2,
    width: "45px",
  },
  {
    slots: {title: "customTitle"},
    className: "column-name cursor-pointer",
    scopedSlots: {customRender: "name"},
    align: "left",
    colSpan: 0,
  },
  {
    title: "ПОПУЛЯРНЫЙ ",
    dataIndex: "popular",
    key: "popular",
    slots: {title: "customTitle"},
    scopedSlots: {customRender: "popular"},

    className: "column-name",
    align: "left",
  },
  {
    title: "Подкатегория ",
    dataIndex: "childs",
    key: "childs",
    slots: {title: "customTitle"},
    scopedSlots: {customRender: "childs"},
    className: "column-tags",
    align: "left",
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
    title: "Специальности",
  },
  mixins: [status, global, authAccess],
  data() {
    return {
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
      editIcon: require("@/assets/svg/edit.svg?raw"),
      deleteIcon: require("@/assets/svg/delete.svg?raw"),
      addIcon: require("@/assets/svg/add-icon.svg?raw"),
      loading: false,
      columns,
      specialities: [],
      rules: {
        name_ru: [
          {required: true, message: "This field is required", trigger: "change"},
        ],
        parent_id: [
          {required: true, message: "This field is required", trigger: "change"},
        ],
      },
      form: {
        name_ru: "",
        name_uz: "",
        icon: "",
        parent_id: undefined,
      },
      regions: [],
      fileList: [],
    };
  },
  async mounted() {
    this.getFirstData("__GET_SPECIAL");
    // this.checkAllActions("regions");
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
    handleChange(info) {
      if (info.file.status !== "uploading") {
        let formData = new FormData();
        formData.append("icon", info.file.originFileObj);
        console.log(formData);
        this.form.icon = info.file.originFileObj;
      }
      if (info.file.status === "done") {
        this.$message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === "error") {
        this.$message.error(`${info.file.name} file upload failed.`);
      }
    },
    positionGenerator() {
      this.specialities = this.specialities.map((elem, index) => {
        return {
          ...elem,
          position: index + 1
        }
      })
      console.log(this.specialities)
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
        onSuccess();
      };
      reader.onerror = () => {
        console.error("Error reading file as binary data");
        onError(new Error("Error reading file"));
      };
      reader.readAsDataURL(file); // Use readAsDataURL to get Base64 data
    },
    saveData() {
      let formData = new FormData();
      formData.append("icon", this.fileList.at(-1).originFileObj);
      if (this.form.icon) {
        formData.append("icon", this.form.icon);
      }
      if (this.editId) {
        formData.append("_method", "PUT");
      }
      formData.append("name_ru", this.form.name_ru);
      formData.append("name_uz", this.form.name_uz);
      formData.append("parent_id", this.form.parent_id ? this.form.parent_id : "");
      this.$refs["ruleForm"][0].validate((valid) => {
        if (valid) {
          this.editId ? this.__EDIT_SPECIAL(formData) : this.__POST_SPECIAL(formData);
        } else {
          return false;
        }
      });
    },

    editAction(id) {
      this.$router.push(`/settings/specialities/${id}`);
      // this.title = "Изменить";
      // this.editId = id;
      // this.__GET_SPECIAL_BY_ID(id);
    },
    deleteAction(id) {
      this.__DELETE_GLOBAL(
        id,
        "fetchSpecialities/deleteSpecialities",
        "Успешно удален",
        "__GET_SPECIAL"
      );
    },
    async __GET_SPECIAL() {
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
    },

    addCountries() {
      this.title = "Добавить";
      this.editId = null;
      this.visible = true;
    },
    handleOk() {
      this.visible = false;
    },
    async __POST_SPECIAL(data) {
      try {
        await this.$store.dispatch("fetchSpecialities/postSpecialities", data);
        this.notification("success", "success", "Успешно добавлен");
        this.handleOk();
        this.__GET_SPECIAL();
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
        this.visible = true;
        const {created_at, updated_at, id, ...rest} = data?.content;
        this.form = {...rest, icon: null};
      } catch (e) {
        this.statusFunc(e);
      }
    },
    emptyData() {
      this.fileList = [];
      this.form = {
        name_ru: "",
        name_uz: "",
        icon: "",
        parent_id: undefined,
      };
    },
    async __EDIT_SPECIAL(res) {
      try {
        await this.$store.dispatch("fetchSpecialities/editSpecialities", {
          id: this.editId,
          data: res,
        });
        this.handleOk();
        this.__GET_SPECIAL();
        this.notification("success", "success", "Успешно изменена");
      } catch (e) {
        this.statusFunc(e);
      }
    },
  },
  watch: {
    async current(val) {
      this.changePagination(val, "/regions", "__GET_SPECIAL");
    },
    visible(val) {
      if (val == false) {
        this.emptyData();
      }
    },
  },
  components: {draggable, TitleBlock, SearchInput},
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
