<template>
  <div class="">
    <TitleBlock title="Уведомления" :breadbrumb="['Cправочник']" lastLink="Уведомления">
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
              @changeSearch="changeSearch($event, '/regions', '__GET_NOTIFICATIONS')"
            />
            <div></div>
            <a-button
              @click="clearQuery('/regions', '__GET_NOTIFICATIONS')"
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
          :data-source="notifications"
          :loading="loading"
        >
          <span slot="indexId" slot-scope="text">#{{ text?.key }}</span>
          <span slot="theme" class="title-link" @click="showNotification(text)" slot-scope="text">
              {{ text?.theme }}
          </span>

          <!--          <span slot="id" slot-scope="text">-->
          <!--            <span-->
          <!--              class="action-btn"-->
          <!--              v-if="checkAccess('regions', 'put')"-->
          <!--              v-html="editIcon"-->
          <!--              @click="editAction(text)"-->
          <!--            >-->
          <!--            </span>-->
          <!--            <a-popconfirm-->
          <!--              title="Are you sure delete this row?"-->
          <!--              ok-text="Yes"-->
          <!--              cancel-text="No"-->
          <!--              @confirm="deleteAction(text)"-->
          <!--              v-if="checkAccess('regions', 'delete')"-->
          <!--            >-->
          <!--              <span class="action-btn" v-html="deleteIcon"> </span>-->
          <!--            </a-popconfirm>-->
          <!--          </span>-->
        </a-table>
        <div class="d-flex justify-content-between mt-4">
          <a-select
            v-model="params.pageSize"
            class="table-page-size"
            style="width: 120px"
            @change="
              ($event) => changePageSizeGlobal($event, '/regions', '__GET_NOTIFICATIONS')
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
        <div
          class="d-flex flex-column"
        >
          <a-form-model :model="form" ref="ruleForm" :rules="rules" layout="vertical">
            <a-form-model-item
              class="form-item mb-3"
              label="Заголовок"
              prop="theme"
            >
              <a-input v-model="form.theme" placeholder="Текст..."/>
            </a-form-model-item>
            <a-form-model-item
              class="form-item mb-3"
              label="Сообщение"
              prop="message"
            >
              <a-input type="textarea" rows="5" v-model="form.message" placeholder="Текст сообщения..."/>
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
    <a-modal
      v-model="visibleShow"
      class="text-modal"
      centered
      :title="'Уведомление'"
      width="576px"
    >
      <div class="d-flex flex-column">
       <h4 class="mb-4 notification-title">{{ currentNotification.theme }}</h4>
        <p>{{currentNotification.message}}</p>
      </div>
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
    title: "Заголовок ",
    slots: {title: "customTitle"},
    scopedSlots: {customRender: "theme"},
    className: "column-name",
    align: "left",
  },
  {
    title: "Сообщение ",
    dataIndex: "message",
    key: "message",
    slots: {title: "customTitle"},
    className: "column-name",
    align: "left",
  },
  // {
  //   title: "ДЕЙСТВИЯ",
  //   className: "column-btns",
  //   dataIndex: "id",
  //   key: "id",
  //   align: "right",
  //   scopedSlots: {customRender: "id"},
  //   width: 100,
  // },
];

export default {
  name: "IndexPage",
  head: {
    title: "Уведомление",
  },
  mixins: [status, global, authAccess],
  data() {
    return {
      currentNotification: {},
      visibleShow: false,
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
      notifications: [],
      rules: {
        name_ru: [
          {required: true, message: "This field is required", trigger: "change"},
        ],
        country_id: [
          {required: true, message: "This field is required", trigger: "change"},
        ],
      },
      form: {
        theme: "",
        message: ""
      },
      countries: [],
    };
  },
  async mounted() {
    await this.getFirstData("__GET_NOTIFICATIONS");
  },
  methods: {
    showNotification(obj) {
      this.currentNotification = {...obj};
      this.visibleShow = true
    },
    saveData() {
      this.$refs["ruleForm"].validate((valid) => {
        if (!valid) return false;
        this.__POST_NOTIFICATIONS(this.form);
      });
    },

    async __GET_NOTIFICATIONS() {
      this.loading = true;
      const data = await this.$store.dispatch("fetchNotifications/getNotifications", {
        ...this.$route.query,
      });
      this.loading = false;
      this.notifications = data?.content?.data.map((item, index) => {
        return {
          ...item,
          key: index + 1,
        };
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
    async __POST_NOTIFICATIONS(data) {
      try {
        await this.$store.dispatch("fetchNotifications/postNotifications", data);
        this.notification("success", "success", "Успешно добавлен");
        this.handleOk();
        this.__GET_NOTIFICATIONS();
      } catch (e) {
        this.statusFunc(e);
      }
    },

    emptyData() {
      this.form = {
        theme: "",
        message: "",
      };
    },
    async __EDIT_REGIONS(res) {
      try {
        await this.$store.dispatch("fetchRegions/editRegions", {
          id: this.editId,
          data: {...res, _method: "PUT"},
        });
        this.handleOk();

        this.__GET_NOTIFICATIONS();
        this.notification("success", "success", "Успешно изменена");
      } catch (e) {
        this.statusFunc(e);
      }
    },
  },
  watch: {
    async current(val) {
      this.changePagination(val, "/regions", "__GET_NOTIFICATIONS");
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
.notification-title {
  font-family: "TT Interfaces";
  font-size: 16px;
  font-weight: 700;
}
.notification-message {
  font-family: "TT Interfaces";
  font-size: 14.04px;
  font-weight: 400;
}
.prodduct-list-header-grid {
  display: grid;
  grid-template-columns: 3fr 2fr 40px;
  grid-gap: 8px;
}

.card_header {
  padding: 16.25px 0;
}
</style>
