<template>
  <div class="">
    <TitleBlock title="Пользователи" :breadbrumb="['Главный']" lastLink="Пользователи">
      <div class="d-flex">
        <a-button
          class="add-btn add-header-btn btn-primary d-flex align-items-center"
          type="primary"
          @click="$router.push('/settings/create-users')"
          v-if="checkAccess('users', 'post')"
        >
          <span class="svg-icon" v-html="addIcon"> </span>
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
              @changeSearch="
                ($event) => changeSearch($event, '/settings/users', '__GET_USERS')
              "
            />
            <div></div>
            <a-button
              @click="clearQuery('/settings/users', '__GET_USERS')"
              type="primary"
              class="d-flex align-items-center justify-content-center"
              style="height: 38px"
              ><a-icon type="reload"
            /></a-button>
          </div>
        </div>
        <a-table
          :columns="columns"
          :pagination="false"
          :data-source="posts"
          :page-size="params.pageSize"
          :loading="loading"
        >
          <span slot="indexId" slot-scope="text">#{{ text?.key }}</span>
          <span slot="name" slot-scope="text">{{ text ? text : "-----" }}</span>

          <span slot="id" slot-scope="text">
            <span
              v-if="checkAccess('users', 'put')"
              class="action-btn"
              v-html="editIcon"
              @click="$router.push(`/settings/edit-users/${text}`)"
            >
            </span>
            <a-popconfirm
              v-if="checkAccess('users', 'delete')"
              title="Are you sure delete this row?"
              ok-text="Yes"
              cancel-text="No"
              @confirm="deleteAction(text)"
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
              ($event) => changePageSizeGlobal($event, '/settings/users', '__GET_USERS')
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
  </div>
</template>

<script>
import SearchInput from "../../components/form/Search-input.vue";
import TitleBlock from "../../components/Title-block.vue";
import status from "../../mixins/status";
import global from "../../mixins/global";
import authAccess from "../../mixins/authAccess";
import moment from "moment";

const columns = [
  {
    title: "№",
    key: "indexId",
    slots: { title: "customTitle" },
    scopedSlots: { customRender: "indexId" },
    className: "column-service",
    align: "left",
    width: 50,
  },
  {
    title: "Имя",
    dataIndex: "name",
    key: "name",
    slots: { title: "customTitle" },
    scopedSlots: { customRender: "name" },
    className: "column-name",
    align: "left",
  },
  {
    title: "Имя пользователя",
    dataIndex: "username",
    key: "username",
    slots: { title: "customTitle" },
    className: "column-name",
    align: "left",
  },

  {
    title: "ДЕЙСТВИЯ",
    className: "column-btns",
    dataIndex: "id",
    key: "id",
    align: "right",
    scopedSlots: { customRender: "id" },
    width: 100,
  },
];

export default {
  name: "IndexPage",
  head: {
    title: "Пользователи",
  },
  mixins: [status, global, authAccess],
  data() {
    return {
      eyeIcon: require("../../assets/svg/Eye.svg?raw"),
      editIcon: require("../../assets/svg/edit.svg?raw"),
      deleteIcon: require("../../assets/svg/delete.svg?raw"),
      addIcon: require("../../assets/svg/add-icon.svg?raw"),
      loading: false,
      search: "",
      columns,
      posts: [],
    };
  },
  async mounted() {
    this.getFirstData("/settings/users", "__GET_USERS");
    this.checkAllActions("users");
  },
  methods: {
    moment,
    deleteAction(id) {
      this.__DELETE_GLOBAL(id, "fetchRole/deleteUsers", "Успешно удален", "__GET_USERS");
    },
    async __GET_USERS() {
      this.loading = true;
      const data = await this.$store.dispatch("fetchRole/getUsers", {
        ...this.$route.query,
      });
      this.loading = false;
      const pageIndex = this.indexPage(data?.users?.current_page, data?.users?.per_page);
      console.log(pageIndex);
      this.posts = data?.users?.data.map((item, index) => {
        return {
          ...item,
          key: index + pageIndex,
        };
      });
      this.totalPage = data?.users?.total;
    },
    indexPage(current_page, per_page) {
      return (current_page * 1 - 1) * per_page + 1;
    },
  },
  watch: {
    async current(val) {
      this.changePagination(val, "/settings/users", "__GET_USERS");
    },
  },
  components: { TitleBlock, SearchInput },
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
