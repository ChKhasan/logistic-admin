<template>
  <div class="posts">
    <TitleBlock
        :title="`Заказ №${this.$route.params.index}`"
        :breadbrumb="['Заказы']"
        :lastLink="`Заказ №${this.$route.params.index}`"
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
          Заявки
        </a-button>
        <!-- <a-button
          tabindex="3"
          class="add-btn add-header-btn btn-primary d-flex align-items-center"
          :type="$route.hash == '#complaints' ? 'primary' : 'default'"
          @click="$router.push({ hash: 'complaints' })"
        >
          Жалобы
        </a-button>
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
        <!-- <a-button
          class="add-btn add-header-btn btn-primary d-flex align-items-center"
          type="primary"
          @click="onSubmit"
          v-if="checkAccess('services', 'post')"
        >
          <span class="svg-icon"> </span>
          Добавить
        </a-button> -->
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


                  <OrderShow :order="order"/>
                </div>
              </div>

              <div>
                <div class="card_block main-table px-4 py-4">
                  <FormTitle title="Параметры"/>

                  <a-form-model-item
                      class="form-item mb-3 status-style"
                      :class="classObject"
                      label="Статус"
                  >
                    <a-select v-model="statusValue">
                      <a-select-option
                          v-for="elem in statusData"
                          :key="elem.value"
                          :disabled="
                          !activeStatus.includes(elem.value)
                        "
                      >
                        {{ elem.label }}
                      </a-select-option>
                    </a-select>
                  </a-form-model-item>
                  <!--                  <p class="last_update">Последнее обновление: {{ lastUpdate }}</p>-->
                  <div v-if="order?.cancelReasons?.length > 0">
                    <h5>Причина отмены</h5>
                    <ul class="ml-4 mt-3">
                      <li
                          class="mt-1"
                          v-for="reason in order?.cancelReasons"
                          :key="reason?.id"
                      >
                        {{ reason?.name }}
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

                <div
                    class="card_block main-table px-4 py-4 mt-4"
                    v-if="order?.selectedOffer"
                >
                  <FormTitle title="Водитель:"/>
                  <ul class="driver-info">
                    <li>
                      <p>FISh</p>
                      <nuxtLink v-if="order?.selectedOffer?.driver" :to="`/drivers/${order?.selectedOffer?.driver?.id}`"
                      >{{ order?.selectedOffer?.driver?.lastName }}
                        {{ order?.selectedOffer?.driver?.firstName }} - #{{
                          order?.selectedOffer?.driver?.id
                        }}
                      </nuxtLink
                      >
                      <nuxtLink v-if="order?.selectedOffer?.company"
                                :to="`/drivers/${order?.selectedOffer?.company?.id}`"
                      >{{ order?.selectedOffer?.company?.lastName }}
                        {{ order?.selectedOffer?.company?.firstName }} - #{{
                          order?.selectedOffer?.company?.id
                        }}
                      </nuxtLink
                      >
                    </li>
                    <li v-if="order?.selectedOffer?.driver">
                      <p>Avto. nomer</p>
                      <p v-if="order?.selectedOffer?.driver">{{ order?.selectedOffer?.driver?.vehicleCode }}</p>
                      <p v-if="order?.selectedOffer?.company">{{ order?.selectedOffer?.company?.vehicleCode }}</p>
                    </li>
                    <li>
                      <p>Цена</p>
                      <p>{{ order?.selectedOffer?.price?.toLocaleString() }} сум</p>
                    </li>
                    <li>
                      <p>Дата вибора</p>
                      <p>
                        {{
                          moment(order?.selectedOffer?.createdAt).format(
                              "HH:mm DD.MM.YYYY"
                          )
                        }}
                      </p>
                    </li>
                  </ul>
                  <div class="driver-desc">
                    <h5>Текстовое предложение</h5>
                    <p>{{ order?.selectedOffer?.comment }}</p>
                    <div class="d-flex justify-content-between">
                      <h6>Ijrochiga qoyilgan baho</h6>
                      <h6>Buyurtma yakunlanmadi</h6>
                    </div>
                  </div>
                </div>
                <div class="card_block main-table px-4 py-4 mt-4" v-else>
                  <FormTitle title="Водитель: Еще не выбрано"/>
                </div>
              </div>
            </div>
            <div
                class="card_block main-table px-4 py-4"
                v-if="$route.hash == '#applications'"
            >
              <FormTitle title="Предложения"/>
              <a-table
                  :columns="columnsOrderApp"
                  :data-source="applications"
                  :pagination="false"
                  :loading="loading"
                  align="center"
              >

                <span
                    class="title-link"
                    @click="$router.push(`/drivers/${text?.id}`)"
                    slot="driver"
                    slot-scope="text"
                >
                 <span v-if="text?.driver"> {{ text?.driver?.firstName }} {{
                     text?.driver?.lastName
                   }} - {{ text?.driver?.id }}</span>
                   <span v-if="text?.company"> {{ text?.company?.firstName }} {{
                       text?.company?.lastName
                     }} - {{ text?.company?.id }}</span>
                </span>
                <span slot="phone" slot-scope="text">
                     <span v-if="text?.driver"> +{{ text?.driver?.phoneNumber }}</span>
                   <span v-if="text?.company"> +{{ text?.company?.phoneNumber }}</span>
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
                    Boolean(tags?.id == order?.selected_request?.id)
                      ? 'tag_success'
                      : 'tag_rejected'
                  "
                >
                  {{
                    Boolean(tags?.id == order?.selected_request?.id)
                        ? "Tanlangan"
                        : "Tanlanmagan"
                  }}
                </span>
                <span slot="btns" slot-scope="text">
                  <!-- <span
                  v-if="checkAccess('orders', 'put')"
                  class="action-btn"
                  v-html="eyeIcon"
                  @click="$router.push(`/orders/order/${text}`)"
                >
                </span> -->
                  <!-- <span
                    v-if="checkAccess('orders', 'put')"
                    class="action-btn"
                    @click="$router.push(`/orders/order/${text}`)"
                    v-html="editIcon"
                  >
                  </span> -->
                  <span class="action-btn" v-html="deleteIcon"> </span>
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
              <FormTitle title="Жалобы"/>
              <a-table
                  :columns="columnsComp"
                  :data-source="order?.complaints"
                  :pagination="false"
                  :loading="loading"
                  align="center"
              >
                <span
                    to="/orders/1232/details"
                    slot="client"
                    slot-scope="text"
                    align="center"
                >
                  {{ text }}
                </span>
                <span slot="orderId" slot-scope="text">#{{ text?.id }}</span>
                <span
                    slot="text"
                    slot-scope="text"
                    class="app-text"
                    @click="handleComp(text)"
                >Посмотреть текст</span
                >

                <span slot="btns" slot-scope="text">
                  <span
                      v-if="checkAccess('orders', 'put')"
                      class="action-btn"
                      @click="$router.push(`/orders/order/${text}`)"
                      v-html="editIcon"
                  >
                  </span>
                  <span
                      class="action-btn"
                      @click="deleteAction(text)"
                      v-html="deleteIcon"
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
            <li>{{ currentApp?.driver?.lastName }} {{ currentApp?.driver?.firstName }} - {{
                currentApp?.driver?.id
              }}
            </li>
            <li>
              Price:
              {{
                currentApp?.price
                    ? currentApp.price.toLocaleString()
                    : "----"
              }}
            </li>

          </ul>
        </div>
        <div class="body">
          <p>
            {{ currentApp?.comment }}
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
import status from "@/mixins/status";
import columns from "@/mixins/columns";
import global from "@/mixins/global";
import authAccess from "@/mixins/authAccess";
import moment from "moment";
import OrderShow from "@/components/show/OrderShow.vue";
import TitleBlock from "@/components/Title-block.vue";

export default {
  mixins: [status, authAccess, columns, global],
  head: {
    title: "Заказ",
  },
  data() {
    return {
      form: {},
      delayTime: 0,
      activeStatus: ["COMPLETED","CANCELED_BY_ADMIN"],
      filter: undefined,
      loading: false,
      visible: false,
      visibleComp: false,
      spinning: false,
      ticketIcon: require("@/assets/svg/ticket.svg?raw"),
      editIcon: require("@/assets/svg/edit.svg?raw"),
      deleteIcon: require("@/assets/svg/delete.svg?raw"),
      statusValue: 1,
      statusData: [
        {
          label: "Приём заявок",
          value: "NEW",
        },
        {
          label: "В процессе",
          value: "PROCESS",
        },
        {
          label: "Ожидаем одобрения клиента",
          value: 3,
        },
        {
          label: "Завершенный",
          value: "COMPLETED",
        },
        {
          label: "Отменено администратором",
          value: "CANCELED_BY_ADMIN",
        },
        {
          label: "Отменено клиентом",
          value: "CANCELED_BY_CONSUMER",
        },
        {
          label: "Отменено водителом",
          value: "CANCELED_BY_EXECUTOR",
        },
      ],
      order: {},
      currentApp: {},
      currentComp: {},
      applications: []
    };
  },
  computed: {
    lastUpdate() {
      return moment(this.order?.updated_at).format("DD.MM.YYYY HH:mm");
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
    this.__GET_ORDERS_BY_ID();
    this.__GET_OFFERS_BY_ID()
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
    async panelChange(e) {
      this.currentDay = await e;
      await this.__GET_EMPTY_DATE();
      await this.disabledDays();
    },
    async editTicket(data) {
      this.targetTicket = await data;
      await this.__GET_EMPTY_DATE();
      await this.disabledDays();
      this.visible = true;
    },
    moment,
    onSubmit() {
      this.__EDIT_ORDER_STATUS({status: this.statusValue});
    },
    handleOk() {
      this.visible = false;
    },
    async __EDIT_ORDER_STATUS(res) {
      try {
        await this.$store.dispatch("fetchOrders/editOrders", {
          id: this.$route.params.index,
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
            "fetchOrders/getOrdersById",
            this.$route.params.index
        );
        this.order = data;
        this.statusValue = this.order.status;
        this.spinning = false;
      } catch (e) {
        this.statusFunc(e);
      }
    },
    async __GET_OFFERS_BY_ID(id) {
      try {
        const data = await this.$store.dispatch(
            "fetchOrders/getOrderOffersById",
            this.$route.params.index
        );
        this.applications = data.content;
        this.spinning = false;
      } catch (e) {
        this.statusFunc(e);
      }
    },
  },
  components: {TitleBlock, FormTitle, OrderShow},
};
</script>
<style lang="css">
@import "@/assets/css/pages/order.css";

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
