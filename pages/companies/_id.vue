<template>
  <div class="posts">
    <TitleBlock
        :title="`Компания №${this.$route.params.id}`"
        :breadbrumb="['Главный']"
        :lastLink="`Компания №${this.$route.params.id}`"
    >
      <div class="d-flex justify-content-between btn_group">
        <a-button
            tabindex="1"
            ref="myButton"
            class="add-btn add-header-btn btn-primary d-flex align-items-center"
            :type="
            $route.hash == '#total_info' || $route.hash == '' ? 'primary' : 'default'
          "
            @click="$router.push({ hash: 'total_info' ,query: $route.query})"
        >
          О заказе
        </a-button>
        <a-button
            ref="urlInput"
            tabindex="2"
            class="add-btn add-header-btn btn-primary d-flex align-items-center"
            :type="$route.hash == '#orders' ? 'primary' : 'default'"
            @click="$router.push({ hash: 'orders',query: $route.query })"
        >
          Заказы
        </a-button>
        <a-button
            ref="urlInput"
            tabindex="2"
            class="add-btn add-header-btn btn-primary d-flex align-items-center"
            :type="$route.hash == '#applications' ? 'primary' : 'default'"
            @click="$router.push({ hash: 'applications' ,query: $route.query})"
        >
          Заявки
        </a-button>
        <a-button
            ref="urlInput"
            tabindex="2"
            class="add-btn add-header-btn btn-primary d-flex align-items-center"
            :type="$route.hash == '#balance' ? 'primary' : 'default'"
            @click="$router.push({ hash: 'balance',query: $route.query })"
        >
          Баланс
        </a-button>
        <a-button
            tabindex="3"
            class="add-btn add-header-btn btn-primary d-flex align-items-center"
            :type="$route.hash == '#complaints' ? 'primary' : 'default'"
            @click="$router.push({ hash: 'complaints' })"
        >
          Жалобы
        </a-button>

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
                  <div class="wrap">
                    <div class="cardo">
                      <div class="section">
                        <h4 class="title">О компании</h4>
                        <div class="items">
                          <div class="item">
                            <p class="question">Фаолият Тури</p>
                            <p class="answer">{{ driver?.id }}</p>
                          </div>
                          <div class="item">
                            <p class="question">ID</p>
                            <p class="answer">#{{ driver?.id }}</p>
                          </div>
                          <div class="item">
                            <p class="question">Дата регистрации</p>
                            <p class="answer">
                              {{ publishedDate }}
                            </p>
                          </div>
                          <div class="item">
                            <p class="question">Название компании</p>
                            <p class="answer"> {{ driver?.companyName }}  </p>
                          </div>
                          <div class="item">
                            <p class="question">Имя Фамилия</p>
                            <p class="answer"> {{ driver?.lastName }} {{ driver?.firstName }} </p>
                          </div>
                          <div class="item">
                            <p class="question">Телефон клиента</p>
                            <p class="answer">+{{ driver?.phoneNumber }}</p>
                          </div>
                          <div class="item">
                            <p class="question">Город</p>
                            <p class="answer">{{ driver?.city?.name || emptyText }}</p>
                          </div>
                        </div>
                      </div>
                      <div class="section">
                        <h4 class="title">Файлы</h4>
                        <div class="files">
                          <div class="file" @click="showImg(driver?.certificate)">
                            <div class="img">
                              <img :src="driver?.certificate" alt=""/>
                            </div>
                            <p class="size">Сертификат</p>
                          </div>
                          <div class="file" @click="showImg(driver?.passport)">
                            <div class="img">
                              <img :src="driver?.passport" alt=""/>
                            </div>
                            <p class="size">Фото на паспорт</p>
                          </div>
                          <div class="file" @click="showImg(driver?.passportBack)">
                            <div class="img">
                              <img :src="driver?.passportBack" alt=""/>
                            </div>
                            <p class="size">Фото на паспорт (Обратная сторона)</p>
                          </div>
                          <div class="file" @click="showImg(driver?.license)">
                            <div class="img">
                              <img :src="driver?.license" alt=""/>
                            </div>
                            <p class="size">Лицензия</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
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

                      >
                        {{ elem.label }}
                      </a-select-option>
                    </a-select>
                  </a-form-model-item>


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
                >
                  <FormTitle title="Активный заказ"/>
                  <ul class="driver-info">
                    <li>
                      <p>Номер заказа:</p>
                      <p>#5481</p>
                      <nuxtLink :to="'/'"
                      >Посмотреть заказ
                      </nuxtLink
                      >
                    </li>
                    <div class="map">
                      <iframe
                          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2996.134229445218!2d69.24423062643743!3d41.32769444969508!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38ae8b70de29132d%3A0x4f62d5ff05a9a3dd!2z0JPQsNGE0YPRgCDQk9GD0LvQvtC8!5e0!3m2!1sru!2s!4v1712050717492!5m2!1sru!2s"
                          height="146" style="border:0;width: 100%" allowfullscreen="" loading="lazy"
                          referrerpolicy="no-referrer-when-downgrade"></iframe>
                    </div>
                  </ul>
                </div>
                <div class="card_block main-table px-4 py-4 mt-4">
                  <FormTitle title="Баланс"/>
                  <a-form-model-item class="form-item mb-3" label="Остаток">
                    <a-input type="text" v-model="formBalance.amount" placeholder="0"/>
                  </a-form-model-item>
                  <a-button
                      class="py-3 add-btn btn-primary d-flex justify-content-center align-items-center "
                      style="height: 42px"
                      type="primary"
                      :class="{disabledBtn: formBalance.amount === 0}"
                      @click="onSubmitBalance(formBalance)"
                  >
                    Пополнить
                  </a-button>
                  <p class="answer mt-3">Последнее popolnenie</p>
                  <nuxt-link class="answer mt-3" to="">История транснакций</nuxt-link>
                </div>
                <div class="card_block main-table px-4 py-4 mt-4">
                  <FormTitle title="Статистика"/>
                  <ul class="driver-info">
                    <li>
                      <p>Кол-во выполненных заказов:</p>
                      <p>{{ driver?.statistic?.completedCount }}</p>

                    </li>
                    <li>
                      <p>Кол-во отмененных заказов:</p>
                      <p>{{ driver?.statistic?.canceledCount }}</p>

                    </li>
                    <li>
                      <p>Запросы:</p>
                      <p>{{ driver?.statistic?.offersCount }}</p>

                    </li>
                    <li>
                      <p>Рейтинг:</p>
                      <p>{{ driver?.statistic?.rating }}</p>

                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div
                class="card_block main-table px-4 py-4"
                v-if="$route.hash == '#orders'"
            >
              <FormTitle title="Заказы "/>
              <a-table
                  :columns="columnsDriverOrders"
                  :data-source="orders"
                  :pagination="false"
                  :loading="loading"
                  align="center"
              >
                <nuxt-link
                    class="title-link"
                    :to="`/orders/order/${text?.id}`"
                    slot="name"
                    slot-scope="text"
                >{{ text?.name }}
                </nuxt-link>


                <span slot="orderId" slot-scope="text">#{{ text?.id }}</span>

                <span
                    slot="status"
                    slot-scope="tags"
                    class="tags-style"
                    :class="{
              tag_success: tags === 'NEW',
              tag_inProgress: tags === 'PROCESS' || tags.status === 3,
              tag_approved: tags === 'COMPLETED',
              tag_rejected: tags === 'CANCELED_BY_EXECUTOR' || tags === 'CANCELED_BY_CONSUMER',
              tag_mode: tags === 0,
            }"
                >
            {{ tags.split("_").join(' ').toLowerCase() }}
          </span>
                <span slot="btns" slot-scope="text">
            <!-- <span
                v-if="checkAccess('orders', 'put')"
                class="action-btn"
                v-html="eyeIcon"
                @click="$router.push(`/orders/order/${text}`)"
              >
              </span> -->
            <span
                v-if="checkAccess('orders', 'put')"
                class="action-btn"
                @click="$router.push(`/orders/order/${text}`)"
                v-html="eyeIcon"
            >
            </span>
                  <!-- <span class="action-btn" @click="deleteAction(text)" v-html="deleteIcon">
                  </span> -->
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
                v-if="$route.hash == '#applications'"
            >
              <FormTitle title="Предложения"/>
              <a-table
                  :columns="columnsDriverApp"
                  :data-source="offers"
                  :pagination="false"
                  :loading="loading"
                  align="center"
              >
                <span
                    class="title-link"
                    @click="$router.push(`/drivers/${text?.id}`)"
                    slot="order_id"
                    slot-scope="text"
                >
                 #{{ text?.id }}
                </span>
                <span slot="orderId" slot-scope="text">#{{ text }}</span>
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
                    :class="{
              tag_success: tags === 'NEW',
              tag_inProgress: tags === 'PROCESS' || tags === 'SELECTED' || tags === 'PENDING',
              tag_approved: tags === 'COMPLETED',
              tag_rejected: tags === 'CANCELED_BY_EXECUTOR' || tags === 'CANCELED_BY_CONSUMER' || tags === 'REJECTED',
              tag_mode: tags === 0,
            }"
                >
            {{ tags.split("_").join(' ').toLowerCase() }}
          </span>
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

            <div v-if="$route.hash == '#balance'" class="balance-grid">
              <div>
                <div class="card_block main-table px-4 py-4 balance-card"><h4>Баланс</h4>
                  <h5>{{ driver?.balance?.toLocaleString() }} сум</h5></div>
                <div class="card_block main-table px-4 py-4 mt-3 balance-card">
                  <h4>Пополнение баланса</h4>
                  <a-form-model-item class="form-item mb-3" label="Введите сумму">
                    <a-input type="text" v-model="formBalance.amount" placeholder="0"/>
                  </a-form-model-item>
                  <a-button
                      class="py-3 add-btn btn-primary d-flex justify-content-center align-items-center "
                      style="height: 42px"
                      type="primary"
                      :class="{disabledBtn: formBalance.amount === 0}"
                      @click="onSubmitBalance(formBalance)"
                  >
                    Пополнить
                  </a-button>
                </div>
                <div class="card_block main-table px-4 py-4 mt-3 balance-card">
                  <h4>Вывод денежных средств водителю</h4>
                  <a-form-model-item class="form-item mb-3" label="Введите сумму">
                    <a-input type="text" v-model="formBalanceMinus.amount" placeholder="0"/>
                  </a-form-model-item>
                  <a-button
                      class="py-3 add-btn btn-primary d-flex justify-content-center align-items-center "
                      style="height: 42px"
                      type="primary"
                      :class="{disabledBtn: formBalance.amount === 0}"
                      @click="onSubmitBalance({amount: formBalanceMinus.amount * -1})"
                  >
                    Вывод
                  </a-button>
                </div>
              </div>
              <div>
                <div
                    class="card_block main-table px-4 py-4"

                >
                  <FormTitle title="История транзакций"/>
                  <a-table
                      :columns="columnsBalance"
                      :data-source="balances"
                      :pagination="false"
                      :loading="loading"
                      align="center"
                  >

                    <span slot="orderId" slot-scope="text">#{{ text?.id }}</span>
                    <span slot="price" slot-scope="text" :class="Number(text.replaceAll(' ','')) > 0 ? 'success':'rejected'">{{ text }}</span>
                    <span slot="btns" slot-scope="text">
<!--                  <span-->
<!--                      v-if="checkAccess('orders', 'put')"-->
<!--                      class="action-btn"-->
<!--                      v-html="eyeIcon"-->
<!--                      @click="$router.push(`/orders/order/${text}`)"-->
<!--                  >-->
<!--                  </span>-->
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
                    {{ totalPage }}
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
            <div v-if="$route.hash == '#complaints'">
              <div class="card_block main-table px-4 py-3">
                <div class="d-flex justify-content-between align-items-center">
                  <div class="oroder-filter-grid w-100 align-items-center">
                    <SearchInput
                        placeholder="Поиск"
                        @changeSearch="($event) => changeSearch($event, '__GET_COMP')"
                    />
                    <div class="input status-select w-100">

                    </div>
                    <div class="input status-select w-100">

                    </div>
                    <div class="input status-select w-100">

                    </div>
                    <a-button
                        type="primary"
                        class="d-flex align-items-center justify-content-center"
                        @click="clearQuery('__GET_COMP')"
                        style="height: 38px"
                    >
                      <a-icon type="reload"
                      />
                    </a-button>
                  </div>
                </div>
              </div>
              <div
                  class="card_block main-table px-4 py-4 mt-3"

              >
                <FormTitle title="Жалобы"/>
                <a-table
                    :columns="columnsDriverComp"
                    :data-source="comp"
                    :pagination="false"
                    :loading="loading"
                    align="center"
                >

                  <span slot="orderId" slot-scope="text">#{{ text }}</span>
                  <span slot="client" slot-scope="text">
                    <nuxt-link :to="`/users/${text?.consumer?.id}`">{{ text?.consumer?.firstName }} #{{text?.consumer?.id}}</nuxt-link>
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
            <li>
              {{ currentApp?.driver?.lastName }} {{ currentApp?.driver?.firstName }} -
              {{ currentApp?.driver?.id }}
            </li>
            <li>
              Price:
              {{ currentApp?.price ? currentApp.price.toLocaleString() : "----" }}
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
    <a-modal
        v-model="visibleImg"
        class="text-modal"
        centered
        :title="'Изображение'"
        width="720px"
        @ok="handleOk"
    >
      <div class="d-flex flex-column">
        <img :src="previewUrl" alt="">
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
import SearchInput from "@/components/form/Search-input.vue";

export default {
  mixins: [status, authAccess, columns, global],
  head: {
    title: "Водител",
  },
  data() {
    return {
      visibleImg: false,
      emptyText: '----',
      form: {},
      driver: {},
      delayTime: 0,
      activeStatus: ["NEW", "COMPLETED", "CANCELED_BY_EXECUTOR"],
      filter: undefined,
      loading: false,
      visible: false,
      visibleComp: false,
      spinning: false,
      eyeIcon: require("@/assets/svg/Eye.svg?raw"),
      editIcon: require("@/assets/svg/edit.svg?raw"),
      deleteIcon: require("@/assets/svg/delete.svg?raw"),
      statusValue: 1,
      statusData: [
        {
          label: "Активный",
          value: 1,
        },
        {
          label: "Неактивный",
          value: 0
        },

      ],
      orders: [],
      currentApp: {},
      currentComp: {},
      applications: [],
      previewUrl: '',
      formBalance: {
        amount: null

      },
      formBalanceMinus: {
        amount: null

      },
      balances: [],
      offers: [],
      comp: []
    };
  },
  computed: {
    publishedDate() {
      return moment(this.driver.created_at).format("HH:mm DD.MM.YYYY");
    },

    classObject: function () {
      return {
        "status-process": this.statusValue == "in_process",
        "status-inactive": this.statusValue == "canceled",
        "status-accepted": this.statusValue == "accepted",
      };
    },
  },
  mounted() {
    this.getTabBlocks(this.$route.hash)
    this.__GET_DRIVER_BY_ID();
  },
  methods: {
    showImg(url) {
      this.previewUrl = url;
      this.visibleImg = true
    },
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
      this.__EDIT_STATUS({isActive: Boolean(this.statusValue)});
    },
    onSubmitBalance(formData) {
      this.__EDIT_BALANCE(formData);
    },
    handleOk() {
      this.visible = false;
    },
    async __EDIT_BALANCE(res) {
      try {
        await this.$store.dispatch("fetchCompanies/postCompanyBalance", {
          id: this.$route.params.id,
          data: res,
        });
        this.__GET_BALANCES();
        this.__GET_DRIVER_BY_ID();
        this.formBalance.amount = null
        this.notification("success", "success", "Успешно изменена");
      } catch (e) {
        this.statusFunc(e);
      }
    },
    async __EDIT_STATUS(res) {
      try {
        await this.$store.dispatch("fetchCompanies/patchCompaniestatus", {
          id: this.$route.params.id,
          data: res,
        });
        this.notification("success", "success", "Успешно изменена");
      } catch (e) {
        this.statusFunc(e);
      }
    },
    async __GET_DRIVER_BY_ID() {
      try {
        const data = await this.$store.dispatch(
            "fetchCompanies/getCompaniesById",
            this.$route.params.id
        );
        this.driver = data;
        // this.formBalance.amount = data?.balance
        this.statusValue = this.driver.isActive ? 1 : 0;
      } catch (e) {
        this.statusFunc(e);
      }
    },
    indexPage(current_page, per_page) {
      return (current_page * 1) * per_page + 1;
    },
    async __GET_BALANCES() {
      try {
        const data = await this.$store.dispatch(
            "fetchCompanies/getCompanyBalances",
            {
              id: this.$route.params.id, params: {
                ...this.$route.query,
              },
            }
        );
        const pageIndex = this.indexPage(data?.number, data?.size);
        this.balances = data?.content.map((item, index) => {
          return {
            ...item,
            key: index + pageIndex,
          };
        });
        this.totalPage = data?.totalElements;
      } catch (e) {
        console.log(e)
        this.statusFunc(e);
      }
    },
    async __GET_ORDERS() {
      try {
        const data = await this.$store.dispatch(
            "fetchCompanies/getCompanyOrders",
            {id: this.$route.params.id, params: {...this.$route.query}}
        );
        console.log(data)
        this.orders = data?.content;
        this.totalPage = data?.totalElements;
      } catch (e) {
        this.statusFunc(e);
      }
    },
    async __GET_OFFERS() {
      try {
        const data = await this.$store.dispatch(
            "fetchCompanies/getCompanyOffers",
            {id: this.$route.params.id, params: {...this.$route.query}}
        );
        const pageIndex = this.indexPage(data?.number, data?.size);
        this.offers = data?.content.map((item, index) => {
          return {
            ...item,
            key: index + pageIndex,
          };
        });
        this.totalPage = data?.totalElements;
      } catch (e) {
        this.statusFunc(e);
      }
    },
    async __GET_COMP() {
      try {
        const data = await this.$store.dispatch(
            "fetchCompanies/getCompanyComp",
            {id: this.$route.params.id, params: {...this.$route.query}}
        );
        const pageIndex = this.indexPage(data?.number, data?.size);
        this.comp = data?.content.map((item, index) => {
          return {
            ...item,
            key: index + pageIndex,
          };
        });
        this.totalPage = data?.totalElements;
      } catch (e) {
        this.statusFunc(e);
      }
    },
    async __GET_OFFERS_BY_ID() {
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
    getTabBlocks(val) {
      switch (val) {
        case '#orders':
          this.getFirstData("__GET_ORDERS");
          break;
        case '#balance':
          this.getFirstData("__GET_BALANCES");
          break;
        case '#applications':
          this.getFirstData("__GET_OFFERS");
          break;
        case '#complaints':
          this.getFirstData("__GET_COMP");
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
        case '#orders':
          this.changePagination(val, "__GET_ORDERS");
          break;
        case '#balance':
          this.changePagination(val, "__GET_BALANCES");
          break;
        case '#applications':
          this.changePagination(val, "__GET_OFFERS");
          break;
        case '#complaints':
          this.changePagination(val,"__GET_COMP");
          break;
      }
    },
  },
  components: {SearchInput, TitleBlock, FormTitle, OrderShow},
};
</script>
<style lang="css" scoped>
@import "@/assets/css/pages/order.css";

.rejected {
  color: #f65160;
}
.success {
  color: #18b3bd;
}
.balance-card h4 {
  color: var(--Dark-Blue, #32324D);
  font-family: 'TT Interfaces';
  font-size: 24px;
  font-style: normal;
  font-weight: 600;
  line-height: 32px;
}

.balance-card h5 {
  color: var(--Facebook-blue, #1878F3);
  font-family: 'TT Interfaces';
  font-size: 24px;
  font-style: normal;
  font-weight: 600;
  line-height: 32px;
  margin-top: 10px;
}

.balance-grid {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 20px;
}

.title {
  color: var(--dark-blue, #32324d);
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
  color: #5D5D5F;
  font-size: 13px;
  font-style: normal;
  font-weight: 500;
  line-height: 16px; /* 123.077% */
}

.answer {
  color: #1C1C29;
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
  align-items: flex-start;
  gap: 16px;
}

.file {
  width: 166px;
  overflow: hidden;
}

.img {
  width: 100%;
  height: 166px;
  object-fit: contain;
  border-radius: 4px;
  border: 1px solid var(--grey-8, #ebebeb);
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
  justify-content: flex-start;
  color: #020105;
  font-size: 13px;
  font-style: normal;
  font-weight: 500;
  gap: 12px;
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
