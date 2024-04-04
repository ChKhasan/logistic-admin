<template>
  <div class="posts">
    <TitleBlock
      :title="`Клиенты №${this.$route.params.id}`"
      :breadbrumb="['Главный']"
      :lastLink="`Клиенты №${this.$route.params.id}`"
    >
      <div class="d-flex justify-content-between btn_group">
        <a-button
          tabindex="1"
          ref="myButton"
          class="add-btn add-header-btn btn-primary d-flex align-items-center"
          :type="
            $route.hash == '#total_info' || $route.hash == '' ? 'primary' : 'default'
          "
          @click="$router.push({ hash: 'total_info' })"
        >
          О заказе
        </a-button>
        <a-button
          ref="urlInput"
          tabindex="2"
          class="add-btn add-header-btn btn-primary d-flex align-items-center"
          :type="$route.hash == '#applications' ? 'primary' : 'default'"
          @click="$router.push({ hash: 'applications' })"
        >
        Заказы
        </a-button>
        <a-button
          tabindex="3"
          class="add-btn add-header-btn btn-primary d-flex align-items-center"
          :type="$route.hash == '#complaints' ? 'primary' : 'default'"
          @click="$router.push({ hash: 'complaints' })"
        >
          Жалобы
        </a-button>
        <!--
        <a-button
          tabindex="4"
          class="add-btn add-header-btn btn-primary d-flex align-items-center"
          :type="$route.hash == '#history' ? 'primary' : 'default'"
          @click="$router.push({ hash: 'history' })"
        >
          История чата
        </a-button> -->
      </div>
      <div class="d-flex">
        <!-- <a-select v-model="filter" placeholder="Filter" style="min-width: 125px">
          <a-select-option v-for="item in [1, 2, 4]" :key="item">
            {{ item }}
          </a-select-option>
        </a-select> -->
        <div
          class="add-btn add-header-btn add-header-btn-padding btn-light-primary mx-3"
          @click="$router.go(-1)"
        >
          Назад
        </div>
      </div>
    </TitleBlock>
    <a-form-model :model="form" ref="ruleForm" layout="vertical">
      <div class="pb-5 pt-5">
        <a-spin :spinning="spinning" :delay="delayTime">
          <div class="container_xl app-container d-flex flex-column spin-content">
            <div
              class="order-grid"
              v-if="$route.hash == '#total_info' || $route.hash == ''"
            >
              <div>
                <div class="card_block main-table px-4 py-4">
                  <div class="wrap">
                    <div class="cardo">
                      <div class="section">
                        <h4 class="title">О клиенте</h4>
                        <div class="items">
                          <div class="item">
                            <p class="question">ID</p>
                            <p class="answer">{{ client?.id }}</p>
                          </div>
                          <div class="item">
                            <p class="question">Дата регистрации</p>
                            <p class="answer">
                              {{ publishedDate }}
                            </p>
                          </div>
                          <div class="item">
                            <p class="question">FISH</p>
                            <p class="answer">
                              {{ client?.lastName }}
                              {{ client?.firstName }}
                              <nuxt-link :to="`/users/${client?.id}`"
                                >Перейти к клиенту</nuxt-link
                              >
                            </p>
                          </div>
                          <div class="item">
                            <p class="question">Номер телефона</p>
                            <p class="answer">+{{ client?.phoneNumber }}</p>
                          </div>
                          <div class="item">
                            <p class="question">Район</p>
                            <p class="answer">{{ client?.region || "----" }}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <div class="card_block main-table px-4 py-4">
                  <FormTitle title="Статус заказа" />
                  <a-form-model-item
                    class="form-item mb-3 status-style"
                    :class="classObject"
                    label="Статус"
                  >
                    <a-select v-model="statusValue">
                      <a-select-option v-for="elem in statusData" :key="elem.value">
                        {{ elem.label }}
                      </a-select-option>
                    </a-select>
                  </a-form-model-item>
                  <!--                  <p class="last_update">Последнее обновление: {{ lastUpdate }}</p>-->
                  <div v-if="client?.cancelReasons?.length > 0">
                    <h5>Причина отмены</h5>
                    <ul class="ml-4 mt-3">
                      <li
                        class="mt-1"
                        v-for="reason in client?.cancelReasons"
                        :key="reason?.id"
                      >
                        {{ reason }}
                      </li>
                    </ul>
                  </div>

                  <a-button
                    class="py-3 add-btn btn-primary d-flex justify-content-center align-items-center"
                    style="height: 42px"
                    type="primary"
                    @click="onSubmit"
                  >
                    Изменить статус
                  </a-button>
                </div>

                <div class="card_block main-table px-4 py-4 mt-4">
                  <FormTitle title="Статистика" />
                  <ul class="driver-info">
                    <li>
                      <p>Кол-во созданных заказов</p>
                      <p>{{ client?.completedCount }}</p>
                    </li>
                    <li>
                      <p>Кол-во отмененных заказов</p>
                      <p>{{ client?.canceledCount }}</p>
                    </li>
                  </ul>
                </div>
                <div
                  class="card_block main-table px-4 py-4 mt-4"
                  v-if="client?.activeOrderId"
                >
                  <FormTitle title="Активный заказ" />
                  <div class="item d-flex">
                    <p class="question">Номер заказа:</p>
                    <span
                      ><p class="answer">#{{ client?.activeOrderId }}</p></span
                    ><nuxt-link :to="`/order/${client?.activeOrderId}`"
                      >Просмотреть заказ</nuxt-link
                    >
                  </div>
                </div>
              </div>
            </div>
            <div
              class="card_block main-table px-4 py-4"
              v-if="$route.hash == '#applications'"
            >
              <FormTitle title="Заказы" />
              <a-table
                :columns="columnsConsumerOrders"
                :data-source="orders"
                :pagination="false"
                :loading="loading"
                align="center"
              >
                 <span slot="driver" slot-scope="text">
          <nuxt-link v-if="text?.driver" :to="`/driver/${text?.id}`">{{ `${text?.driver?.firstName} - ${text?.driver?.id}` }}</nuxt-link>
          <nuxt-link v-else-if="text?.company" :to="`/company/${text?.id}`">{{ `${text?.company?.firstName} - ${text?.company?.id}`}}</nuxt-link>
            <span v-else>----</span>
          </span>
                <span
                  @click="$router.push(`/drivers/${text?.id}`)"
                  slot="freelancer"
                  slot-scope="text"
                >
                  {{ text?.name }}
                </span>
                <span slot="orderId" slot-scope="text">#{{ text?.id }}</span>
                <span
                  slot="text"
                  slot-scope="text"
                  class="app-text"
                  @click="handleApp(text)"
                  >Посмотреть текст</span
                >
                <span
                  slot="status"
                  slot-scope="tags"
                  class="tags-style"
                  :class="
                    Boolean(tags?.id == client?.selected_request?.id)
                      ? 'tag_success'
                      : 'tag_rejected'
                  "
                >
                  {{
                    Boolean(tags?.id == client?.selected_request?.id)
                      ? "Tanlangan"
                      : "Tanlanmagan"
                  }}
                </span>
                <span slot="btns" @click="$router.push(`/orders/order/${text}`)" slot-scope="text">
                  <span class="action-btn" v-html="eyeIcon"> </span>
                </span>
              </a-table>
              <div class="d-flex justify-content-between mt-4">
                <a-select
                  v-model="params.pageSize"
                  class="table-page-size"
                  style="width: 120px"
                  @change="
                    ($event) =>
                      changePageSizeGlobal($event, '/orders/all-orders', '__GET_ORDERS')
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
            <div
              class="card_block main-table px-4 py-4"
              v-if="$route.hash == '#complaints'"
            >
              <FormTitle title="Жалобы" />
              <a-table
                :columns="columnsConsumerComp"
                :data-source="comp"
                :pagination="false"
                :loading="loading"
                align="center"
              >

                  <span slot="orderId" slot-scope="text">#{{ text }}</span>
                  <span slot="driver" slot-scope="text">
                    <nuxt-link v-if="text?.driver" :to="`/drivers/${text?.driver?.id}`">{{ text?.driver?.firstName }} #{{text?.driver?.id}}</nuxt-link>
                     <nuxt-link v-if="text?.company" :to="`/company/${text?.company?.id}`">{{ text?.company?.firstName }} #{{text?.company?.id}}</nuxt-link>
                  </span>
                  <span slot="order_id" slot-scope="text"><nuxt-link :to="`/orders/order/${text}`">#{{text}}</nuxt-link></span>
                <span
                  slot="text"
                  slot-scope="text"
                  class="app-text"
                  @click="handleComp(text)"
                  >Посмотреть текст</span
                >

                <span slot="btns" slot-scope="text">
                  <span
                    class="action-btn"
                    v-html="eyeIcon"
                  >
                  </span>
                </span>
              </a-table>
              <div class="d-flex justify-content-between mt-4">
                <a-select
                  v-model="params.pageSize"
                  class="table-page-size"
                  style="width: 120px"
                  @change="
                    ($event) =>
                      changePageSizeGlobal($event, '/orders/all-orders', '__GET_ORDERS')
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
        </a-spin>
      </div>
    </a-form-model>

    <a-modal
      v-model="visible"
      class="text-modal"
      centered
      :title="'Текст предложения'"
      width="720px"
      @ok="handleOk"
    >
      <div class="d-flex flex-column">
        <div class="head">
          <ul>
            <li>{{ currentApp?.freelancer?.name }} - {{ currentApp?.freelancer?.id }}</li>
            <li>
              Price:
              {{
                currentApp?.price
                  ? currentApp.price.toLocaleString()
                  : "По договоренности"
              }}
            </li>
            <li>
              Srok:
              {{
                currentApp?.deadline ? `${currentApp.deadline} дней` : "По договоренности"
              }}
            </li>
          </ul>
        </div>
        <div class="body">
          <p>
            {{ currentApp?.additional_info }}
          </p>
        </div>
      </div>
    </a-modal>
    <a-modal
      v-model="visibleComp"
      class="text-modal"
      centered
      :title="'Текст жалобы'"
      width="720px"
      @ok="handleOk"
    >
      <div class="d-flex flex-column">
        <div class="head">
          <ul>
            <li>
              {{ currentComp?.freelancer?.name }} - {{ currentComp?.freelancer?.id }}
            </li>
            <li>
              Дата:
              {{ moment(currentComp.created_at).format("HH:mm DD.MM.YYYY") }}
            </li>
          </ul>
        </div>
        <div class="body">
          <p>
            {{ currentComp?.complaints }}
          </p>
        </div>
      </div>
    </a-modal>
  </div>
</template>
<script>
import FormTitle from "@/components/Form-title.vue";
import TitleBlock from "@/components/Title-block.vue";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import status from "@/mixins/status";
import columns from "@/mixins/columns";
import global from "@/mixins/global";
import authAccess from "@/mixins/authAccess";
import BiletCard from "@/components/cards/biletCard.vue";
import moment from "moment";

export default {
  mixins: [status, authAccess, columns, global],
  head: {
    title: "Клиенты",
  },
  data() {
    return {
      filter: undefined,
      loading: false,
      status: {
        selected: "Выбрано",
        notSelected: "Не выбран",
      },
      visible: false,
      visibleComp: false,
      spinning: false,
      delayTime: 0,
      disabledBtn: true,
      ticketIcon: require("@/assets/svg/ticket.svg?raw"),
      editIcon: require("@/assets/svg/edit.svg?raw"),
      eyeIcon: require("@/assets/svg/Eye.svg?raw"),
      statusValue: 1,
      statusData: [
        {
          label: "Active",
          value: 1,
        },
        {
          label: "Inactive",
          value: 0,
        },
      ],
      client: {},
      formModal: {
        name: "",
        order_id: null,
        session: null,
      },
      form: {
        title: {
          ru: "",
          uz: "",
        },
        subtitle: {
          ru: "",
          uz: "",
        },
        desc: {
          ru: "",
          uz: "",
        },
        user: {
          name: "",
        },
        poster: "",
        instagram: "",
        telegram: "",
        facebook: "",
        visible: false,
      },
      sessions: {},
      currentApp: {},
      currentComp: {},
      orders: [],
      comp: []
    };
  },

  computed: {
    publishedDate() {
      return moment(this.client.created_at).format("HH:mm DD.MM.YYYY");
    },
    baseUrl() {
      return process.env.BASE_URL;
    },
    imgUrl() {
      return this.baseUrl + "/storage/";
    },
    orderSpecialities() {
      return this.client?.specialities && this.client?.specialities[0]?.name_ru;
    },
    lastUpdate() {
      return moment(this.client?.updated_at).format("DD.MM.YYYY HH:mm");
    },
    classObject: function () {
      return {
        "status-process": this.statusValue == "in_process",
        "status-inactive": this.statusValue == "canceled",
        "status-accepted": this.statusValue == "accepted",
      };
    },

  },
  async mounted() {
    this.$store.dispatch("getOrders");
    this.__GET_CLIENT_BY_ID();
      this.getTabBlocks(this.$route.hash)
  },

  methods: {
    async handleApp(obj) {
      this.currentApp = await obj;
      this.visible = true;
    },
    async handleComp(obj) {
      this.currentComp = await obj;
      this.visibleComp = true;
    },
    moment,
    onSubmit() {
      this.__EDIT_ORDER_STATUS({ isActive: Boolean(this.statusValue) });
    },
    handleOk() {
      this.visible = false;
    },

    async __EDIT_ORDER_STATUS(res) {
      try {
        await this.$store.dispatch("fetchConsumers/putConsumer", {
          id: this.$route.params.id,
          data: res,
        });
        this.$store.dispatch("getOrders");
        this.notification("success", "success", "Заказ успешно изменена");
      } catch (e) {
        this.statusFunc(e);
      }
    },
    async __GET_ORDERS_BY_ID(id) {
      try {
        const data = await this.$store.dispatch(
          "fetchConsumers/getConsumerOrdersById",
          {id: this.$route.params.id,params: {...this.$route.query}}
        );
        this.orders = data?.content
        this.totalPage = data?.totalElements;
      } catch (e) {
        this.statusFunc(e);
      }
    },
      async __GET_COMP_BY_ID(id) {
          try {
              const data = await this.$store.dispatch(
                  "fetchConsumers/getConsumerCompById",
                  {id: this.$route.params.id,params: {...this.$route.query}}
              );
              this.comp = data?.content.map((item,index) => {
                  return {
                      ...item,
                      key: index + 1
                  }
              })
              this.totalPage = data?.totalElements;
          } catch (e) {
              this.statusFunc(e);
          }
      },
    async __GET_CLIENT_BY_ID(id) {
      try {
        const data = await this.$store.dispatch(
          "fetchConsumers/getConsumerById",
          this.$route.params.id
        );
        this.client = data;
        this.statusValue = this.client.active ? 1 : 0;
        this.spinning = false;
      } catch (e) {
        console.log(e);
        this.statusFunc(e);
      }
    },
    getTabBlocks(val) {
      switch (val) {
        case '#applications':
          this.getFirstData("__GET_ORDERS_BY_ID");
          break;
        case '#complaints':
          this.getFirstData("__GET_COMP_BY_ID");
          break;
      }
  }
  },
  watch: {
    "$route.hash"(val) {
      this.getTabBlocks(val)
    },
    current(val) {
      switch (this.$route.hash) {
        case '#applications':
          this.changePagination(val, "__GET_ORDERS_BY_ID");
          break;
        case '#complaints':
          this.changePagination(val,"__GET_COMP_BY_ID");
          break;
      }
    },},
  components: { TitleBlock, FormTitle, BiletCard }
}
</script>
<style lang="css" scoped>
@import "@/assets/css/pages/order.css";

.title {
  color: var(--Dark-Blue, #32324d);
  font-size: 24px;
  font-style: normal;
  font-weight: 600;
  line-height: 32px; /* 133.333% */
  margin-bottom: 16px;
}
.items {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  row-gap: 16px;
}
.item {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 8px;
}
.question {
  color: #5d5d5f;
  font-size: 13px;
  font-style: normal;
  font-weight: 500;
  line-height: 16px; /* 123.077% */
}
.answer {
  color: #1c1c29;
  font-size: 13px;
  font-style: normal;
  font-weight: 500;
  line-height: 16px; /* 123.077% */
}
.section {
  margin-bottom: 40px;
  max-width: 770px;
}
.section:last-child {
  margin-bottom: 0;
}
.desc p {
  color: var(--grey-80, #353437);
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 140%; /* 22.4px */
  display: flex;
  flex-direction: column;
  margin-bottom: 16px;
}
.desc p:last-child {
  margin: 0;
}
.desc a {
  color: var(--Agro-Blue, #3c4bdc);
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 140%;
}
.files {
  display: flex;
  align-items: center;
  gap: 16px;
}
.img {
  width: 104px;
  height: 104px;
  border-radius: 4px;
  border: 1px solid var(--grey-8, #ebebeb);
  overflow: hidden;
  margin-bottom: 8px;
}
.img img {
  display: flex;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.name {
  color: var(--grey-80, #353437);
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 130%; /* 15.6px */
}
.cats {
  display: flex;
  align-items: center;
  gap: 8px;
}
.slash {
  margin-left: 8px;
}
.cat {
  border-radius: 22px;
  background: var(--BG-grey, #f8f9ff);
  padding: 8px 16px;
  color: var(--grey-64, #5d5d5f);
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 140%; /* 19.6px */
}
.categories {
  padding-bottom: 48px;
}
.last_update {
  margin-top: -12px;
  margin-bottom: 16px;
}
.ant-fullcalendar-fullscreen .ant-fullcalendar-month,
.ant-fullcalendar-fullscreen .ant-fullcalendar-date {
  height: 70px !important;
}
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
.events {
  list-style: none;
  margin: 0;
  padding: 0;
}
.events .ant-badge-status {
  overflow: hidden;
  white-space: nowrap;
  width: 100%;
  text-overflow: ellipsis;
  font-size: 12px;
}
.notes-month {
  text-align: center;
  font-size: 28px;
}
.notes-month section {
  font-size: 28px;
}
.ant-fullcalendar-last-month-cell {
  pointer-events: none !important;
  opacity: 0;

  background-color: rgba(0, 0, 0, 0.06) !important;
}
.ant-fullcalendar-next-month-btn-day,
.ant-fullcalendar-last-month-btn-day {
  pointer-events: none !important;
  opacity: 0;
}
.ant-fullcalendar td {
  overflow: hidden;
}
.ant-fullcalendar-disabled-cell {
  background-color: rgba(0, 0, 0, 0.06) !important;
}
.ant-fullcalendar-fullscreen .ant-fullcalendar-header .ant-radio-group {
  display: none !important;
}
.app-text {
  text-decoration: underline;
  color: #5c46e5;
  cursor: pointer;
}
.text-modal .ant-modal-footer {
  display: none;
}
.text-modal .head ul {
  list-style: none;
}
.text-modal .head ul li {
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
}
.text-modal .body {
  border-top: 1px solid rgb(0, 0, 0, 0.2);
  padding-top: 16px;
}
.text-modal .body p {
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
}
.driver-info {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.driver-info li {
  display: flex;
  justify-content: space-between;
  color: #020105;
  font-size: 13px;
  font-style: normal;
  font-weight: 500;
  line-height: 16px; /* 123.077% */
}
.driver-desc {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.driver-desc h5 {
  color: #020105;
  font-size: 13px;
  font-style: normal;
  font-weight: 500;
  line-height: 16px; /* 123.077% */
}
.driver-desc p {
  color: #5d5d5f;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%; /* 21px */
}
.driver-desc h6 {
  color: #020105;
  font-size: 13px;
  font-style: normal;
  font-weight: 500;
  line-height: 16px; /* 123.077% */
}
</style>
