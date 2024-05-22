<template lang="html">
  <div class="all-orders pb-5">
    <TitleBlock
      v-if="orderStatus[$route.params.status]"
      :title="orderStatus[$route.params.status]"
      :breadbrumb="['Заказы']"
      :lastLink="orderStatus[$route.params.status]"
    >
    </TitleBlock>
    <TitleBlock v-else title="Все заказы" :breadbrumb="['Заказы']" lastLink="Все заказы">
    </TitleBlock>
    <div class="container_orders app-container pb-4 pt-5">
      <div class="card_block main-table px-4 pb-3">
        <OrderBtns/>
      </div>
    </div>
    <!--    <div class="container_orders app-container pb-4">-->
    <!--      <div class="card_block main-table px-4 py-3">-->
    <!--        <div class="d-flex justify-content-between align-items-center">-->
    <!--          <div class="oroder-filter-grid w-100 align-items-center">-->
    <!--            <SearchInput-->
    <!--                placeholder="Поиск"-->
    <!--                @changeSearch="($event) => changeSearch($event, '__GET_ORDERS')"-->
    <!--            />-->
    <!--            <div class="input status-select w-100">-->
    <!--&lt;!&ndash;              <a-form-model-item&ndash;&gt;-->
    <!--&lt;!&ndash;                  class="form-item mb-0"&ndash;&gt;-->
    <!--&lt;!&ndash;                  :class="{ 'select-placeholder': !value }"&ndash;&gt;-->
    <!--&lt;!&ndash;              >&ndash;&gt;-->
    <!--&lt;!&ndash;                <a-select v-model="value" placeholder="Статус">&ndash;&gt;-->
    <!--&lt;!&ndash;                  <a-select-option&ndash;&gt;-->
    <!--&lt;!&ndash;                      v-for="filterItem in statusFilter"&ndash;&gt;-->
    <!--&lt;!&ndash;                      :key="filterItem?.id"&ndash;&gt;-->
    <!--&lt;!&ndash;                      placeholder="good"&ndash;&gt;-->
    <!--&lt;!&ndash;                  >&ndash;&gt;-->
    <!--&lt;!&ndash;                    {{ filterItem?.name?.ru }}&ndash;&gt;-->
    <!--&lt;!&ndash;                  </a-select-option>&ndash;&gt;-->
    <!--&lt;!&ndash;                </a-select>&ndash;&gt;-->
    <!--&lt;!&ndash;              </a-form-model-item>&ndash;&gt;-->
    <!--            </div>-->
    <!--            <div class="input status-select w-100">-->
    <!--&lt;!&ndash;              <a-form-model-item&ndash;&gt;-->
    <!--&lt;!&ndash;                  class="form-date mb-0"&ndash;&gt;-->
    <!--&lt;!&ndash;                  :class="{ 'select-placeholder': !value }"&ndash;&gt;-->
    <!--&lt;!&ndash;              >&ndash;&gt;-->
    <!--&lt;!&ndash;                <a-range-picker @change="onChange"/>&ndash;&gt;-->
    <!--&lt;!&ndash;             &ndash;&gt;-->
    <!--&lt;!&ndash;              </a-form-model-item>&ndash;&gt;-->
    <!--            </div>-->
    <!--            <div class="input status-select w-100">-->
    <!--&lt;!&ndash;              <a-form-model-item&ndash;&gt;-->
    <!--&lt;!&ndash;                  class="form-item mb-0"&ndash;&gt;-->
    <!--&lt;!&ndash;                  :class="{ 'select-placeholder': !value }"&ndash;&gt;-->
    <!--&lt;!&ndash;              >&ndash;&gt;-->
    <!--&lt;!&ndash;                <a-select v-model="value" placeholder="Категория">&ndash;&gt;-->
    <!--&lt;!&ndash;                  <a-select-option&ndash;&gt;-->
    <!--&lt;!&ndash;                      v-for="filterItem in statusFilter"&ndash;&gt;-->
    <!--&lt;!&ndash;                      :key="filterItem?.id"&ndash;&gt;-->
    <!--&lt;!&ndash;                      placeholder="good"&ndash;&gt;-->
    <!--&lt;!&ndash;                  >&ndash;&gt;-->
    <!--&lt;!&ndash;                    {{ filterItem?.name?.ru }}&ndash;&gt;-->
    <!--&lt;!&ndash;                  </a-select-option>&ndash;&gt;-->
    <!--&lt;!&ndash;                </a-select>&ndash;&gt;-->
    <!--&lt;!&ndash;              </a-form-model-item>&ndash;&gt;-->
    <!--            </div>-->
    <!--            <a-button-->
    <!--                type="primary"-->
    <!--                class="d-flex align-items-center justify-content-center"-->
    <!--                @click="clearQuery('__GET_ORDERS')"-->
    <!--                style="height: 38px"-->
    <!--            >-->
    <!--              <a-icon type="reload"-->
    <!--              />-->
    <!--            </a-button>-->
    <!--          </div>-->
    <!--        </div>-->
    <!--      </div>-->
    <!--    </div>-->

    <div class="container_orders app-container main-table">
      <div class="card_block main-table px-4 py-4">
        <a-table
          :columns="columnsOrders"
          :data-source="orders"
          :pagination="false"
          :loading="loading"
          align="center"
        >
          <span slot="consumer" slot-scope="text">
          <nuxt-link :to="`/users/${text?.id}`">{{ text ? `${text?.firstName} - ${text?.id}` : "----" }}</nuxt-link>,
          </span>
          <span slot="driver" slot-scope="text">
          <nuxt-link v-if="text?.driver"
                     :to="`/driver/${text?.id}`">{{ `${text?.driver?.firstName} - ${text?.driver?.id}` }}</nuxt-link>
          <nuxt-link v-else-if="text?.company"
                     :to="`/company/${text?.id}`">{{ `${text?.company?.firstName} - ${text?.company?.id}` }}</nuxt-link>
            <span v-else>----</span>
          </span>
          <span slot="orderId" slot-scope="text">#{{ text?.id }}</span>
          <span
            slot="status"
            slot-scope="tags"
            class="tags-style"
            :class="{
              tag_success: tags === 'NEW',
              tag_inProgress: tags === 'PROCESS' || tags.status === 3,
              tag_approved: tags === 'COMPLETED',
              tag_rejected: tags === 'CANCELED_BY_EXECUTOR' || tags === 'CANCELED_BY_CONSUMER' || tags === 'CANCELED_BY_ADMIN',
              tag_mode: tags === 0,
            }"
          >
          {{status[tags]}}
          </span>
          <span slot="btn" slot-scope="text">
            <span
              class="action-btn"
              @click="$router.push(`/orders/order/${text}`)"
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
                changePageSizeGlobal(
                  $event,
                  `/orders/${$route.params.status}`,
                  '__GET_ORDERS'
                )
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
      class="text-modal"
      centered
      :title="'Специальности'"
      width="720px"
    >
      <div class="d-flex flex-column">
        <a-list item-layout="horizontal" :data-source="specialities">
          <a-list-item slot="renderItem" slot-scope="item, index">
            <a-list-item-meta>
              <!-- <a slot="id" href="https://www.antdv.com/">{{ item.id }}</a> -->
              <nuxt-link slot="title" :to="`/settings/specialities/${item.id}`">{{
                  item.name_ru
                }}
              </nuxt-link>
              <a-avatar
                shape="square"
                v-if="item.icon"
                slot="avatar"
                :src="`${imgUrl}${item.icon}`"
              />
              <a-avatar
                v-else
                slot="avatar"
                shape="square"
                src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
              />
            </a-list-item-meta>
          </a-list-item>
        </a-list>
      </div>
    </a-modal>
  </div>
</template>
<script>
import SearchInput from "../../components/form/Search-input.vue";
import TitleBlock from "../../components/Title-block.vue";
import columns from "../../mixins/columns";
import moment from "moment";
import global from "../../mixins/global";
import OrderBtns from "../../components/order-btns.vue";
import authAccess from "../../mixins/authAccess";

export default {
  layout: "toolbar",
  mixins: [columns, global, authAccess],
  data() {
    return {
      specialities: [],
      visible: false,
      statusFilter: [
        {
          name: {
            ru: "Активный",
          },
          id: 1,
        },
        {
          name: {
            ru: "Неактивный",
          },
          id: 2,
        },
      ],
      value: "",
      pageSize: 10,
      eyeIcon: require("../../assets/svg/Eye.svg?raw"),
      editIcon: require("../../assets/svg/edit.svg?raw"),
      deleteIcon: require("../../assets/svg/delete.svg?raw"),
      loading: false,
      orders: [],
      data: [
        {
          id: 1,
          name: "Order name",
          seller: "Seller name",
          freelancer: "Freelancer name",
          date: "24/09/2024",
          count: 4,
          category: "Kategoriya",
          status: "active",
        },
      ],
        // NEW,
        // PROCESS,
        // COMPLETED,
        // CANCELED_BY_CONSUMER,
        // CANCELED_BY_EXECUTOR,
        //
        // CANCELED_BY_ADMIN,
      status: {
          NEW: "Новый",
          COMPLETED: "Завершенный",
          PROCESS: "В процессе",
          CANCELED_BY_EXECUTOR: "Отменено исполнителем",
          CANCELED_BY_CONSUMER: "Отмена клиентом",
          CANCELED_BY_ADMIN: 'Отменено администратором'
      },
      orderStatus: {
        in_process: "В процессе",
        in_moderation: "В модерации",
        active: "Aктивный",
        cancelled: "Отмена клиентом",
      },
    };
  },
  mounted() {
    this.getFirstData("__GET_ORDERS");
    this.checkAllActions("orders");
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
    moment,
    currentFreelancer(array) {
      this.specialities = array.map((item) => {
        return {
          ...item,
          title: item.name_ru,
        };
      });
      this.visible = true;
    },
    currentStatus(tags) {
      if (tags.status == 4) {
        return "Завершенный";
      }
      if (tags.status == 0) {
        return "В модерации";
      }
      if (tags.status == 2 || tags.status == 3) {
        return "В процессе";
      }
      if (tags.status == 5) {
        return "Отмена - клиент";
      }
      if (tags.status == 6) {
        return "Отмена - модератор";
      }
      if (tags.status == 1) {
        return "Aктивный";
      }
    },
    deleteAction(id) {
    },
    async onChange(date, dateString) {
      let params = {
        date_begin: dateString[0],
        date_end: dateString[1],
      };
      await this.$router.replace({
        path: this.$route.path,
        query: {...this.$route.query, page: 1, ...params},
      });
      this.__GET_ORDERS();
    },
    async __GET_ORDERS() {
      try {
        this.loading = true;
        let params = {...this.$route.query};
        if (this.$route.params.status !== 'all-orders') {
          params.status = `${this.$route.params.status}`.toUpperCase();
        } else {
          delete params.status;
        }
        const data = await this.$store.dispatch("fetchOrders/getOrders", {
          ...params,
        });

        const pageIndex = this.indexPage(data?.number, data?.size);
        this.orders = data?.content.map((item, index) => {
          return {
            ...item,
            key: index + pageIndex,
          };
        });
        console.log(data);
        console.log(this.orders)
        this.totalPage = data?.totalElements;
      } finally {
        this.loading = false;
      }
    },
    indexPage(current_page, per_page) {
      return (current_page * 1 - 1) * per_page + 1;
    },
  },
  watch: {
    async current(val) {
      this.changePagination(val, "__GET_ORDERS");
    },
    async value(val) {
      if (val) {
        if (this.$route.query?.service != val)
          await this.$router.replace({
            path: this.$route.path,
            query: {...this.$route.query, service: val},
          });
        if (val == this.$route.query.service) this.__GET_ORDERS();
      }
    },
  },
  components: {TitleBlock, SearchInput, OrderBtns},
};
</script>
<style lang="css">
@import "../../assets/css/pages/order.css";
</style>
