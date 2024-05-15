<template>
  <div class="">
    <TitleBlock title="Страны" :breadbrumb="['Настройки сайта']" lastLink="Страны">
      <div class="d-flex">
        <a-button
          class="add-btn add-header-btn btn-primary d-flex align-items-center"
          type="primary"
          @click="addCountries"
          v-if="checkAccess('countries', 'post')"
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
              @changeSearch="changeSearch($event, '/countries', '__GET_COUNTRIES')"
            />
            <div></div>
            <a-button
              @click="clearQuery('/countries', '__GET_COUNTRIES')"
              type="primary"
              class="d-flex align-items-center justify-content-center"
              style="height: 38px"
            >
              <a-icon type="reload"
              />
            </a-button>
          </div>
        </div>
        <a-table
          :columns="columns"
          :pagination="false"
          :data-source="countries"
          :loading="loading"
        >
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
              v-if="checkAccess('countries', 'put')"
              v-html="editIcon"
              @click="editAction(text)"
            >
            </span>
            <a-popconfirm
              title="Are you sure delete this row?"
              ok-text="Yes"
              cancel-text="No"
              @confirm="deleteAction(text)"
              v-if="checkAccess('countries', 'delete')"
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
              ($event) => changePageSizeGlobal($event, '/countries', '__GET_COUNTRIES')
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
            <a-form-model-item
              class="form-item mb-3"
              label="Название региона"
              prop="name.ru"
            >
              <a-input v-model="form.name[`${item.index}`]" placeholder="Название..."/>
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
    title: "Название ",
    slots: {title: "customTitle"},
    className: "column-name",
    scopedSlots: {customRender: "name"},
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
    title: "Страны",
  },
  mixins: [status, global, authAccess],
  data() {
    return {
      headers: {
        authorization: `Bearer ${localStorage.getItem("auth_token")}`,
      },
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
      countries: [],
      rules: {
        name: {
          ru: [
            {required: true, message: "This field is required", trigger: "change"},
          ],
        }
      },
      form: {
        name: {
          ru: "",
          uz: ''
        }
      },
    };
  },
  async mounted() {
    this.getFirstData("__GET_COUNTRIES");
    // this.checkAllActions("countries");
  },
  methods: {
    saveData() {
      this.$refs["ruleForm"][0].validate((valid) => {
        if (valid) {
          this.editId
            ? this.__EDIT_COUNTRIES(this.form)
            : this.__POST_COUNTRIES(this.form);
        } else {
          return false;
        }
      });
    },

    editAction(id) {
      this.title = "Изменить";
      this.editId = id;
      this.__GET_COUNTRIES_BY_ID(id);
    },
    deleteAction(id) {
      this.__DELETE_GLOBAL(
        id,
        "fetchCountries/deleteCountries",
        "Успешно удален",
        "__GET_COUNTRIES"
      );
    },
    async __GET_COUNTRIES() {
      try {
        this.loading = true;
        const data = await this.$store.dispatch("fetchCountries/getCountries", {
          ...this.$route.query,
        });

        this.countries = data?.content.map((item, index) => {
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
    async __POST_COUNTRIES(data) {
      try {
        await this.$store.dispatch("fetchCountries/postCountries", data);
        this.notification("success", "success", "Успешно добавлен");
        this.handleOk();
        this.__GET_COUNTRIES();
      } catch (e) {
        this.statusFunc(e);
      }
    },
    async __GET_COUNTRIES_BY_ID(targetId) {
      try {
        const data = await this.$store.dispatch(
          "fetchCountries/getCountriesById",
          targetId
        );
        this.visible = true;
        const {created_at, updated_at, id, ...rest} = data;
        this.form = {...rest};
      } catch (e) {
        this.statusFunc(e);
      }
    },
    emptyData() {
      this.form = {
        name: {
          ru: "",
          uz: ""
        }
      };
    },
    async __EDIT_COUNTRIES(res) {
      try {
        await this.$store.dispatch("fetchCountries/editCountries", {
          id: this.editId,
          data: {...res, _method: "PUT"},
        });
        this.handleOk();

        this.__GET_COUNTRIES();
        this.notification("success", "success", "Успешно изменена");
      } catch (e) {
        this.statusFunc(e);
      }
    },
  },
  watch: {
    current(val) {
      this.changePagination(val, "__GET_COUNTRIES");
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
