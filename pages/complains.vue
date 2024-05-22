<template lang="html">
  <div class="all-orders pb-5">
    <TitleBlock title="Жалобы"></TitleBlock>
    <div class="container_xl app-container main-table pb-4 pt-5">
      <div class="card_block main-table px-4 py-4">
        <a-table
          :columns="columnsAllComp"
          :data-source="complains"
          :pagination="false"
          :loading="loading"
          align="center"
        >
          <span slot="orderId" slot-scope="text">#{{ text }}</span>
          <span slot="score" @click="openScore(text)" slot-scope="text">{{ text?.score }}</span>
        </a-table>
        <div class="d-flex justify-content-between mt-4">
          <a-select
            v-model="params.pageSize"
            class="table-page-size"
            style="width: 120px"
            @change="
              ($event) =>
                changePageSizeGlobal($event, '/orders/all-orders', '__GET_complains')
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
import SearchInput from "@/components/form/Search-input.vue";
import TitleBlock from "@/components/Title-block.vue";
import columns from "@/mixins/columns";
import moment from "moment";
import global from "@/mixins/global";
import OrderBtns from "@/components/order-btns.vue";
import authAccess from "@/mixins/authAccess";

export default {
  layout: "toolbar",
  mixins: [columns, global, authAccess],
  data() {
    return {
      visibleScoreAdd: false,
      visibleScoreEdit: false,
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
          id: 0,
        },
      ],
      filter: {
        isActive: undefined,
        vehicleId: undefined,
        cityId: undefined
      },
      pageSize: 10,
      eyeIcon: require("@/assets/svg/Eye.svg?raw"),
      editIcon: require("@/assets/svg/edit.svg?raw"),
      deleteIcon: require("@/assets/svg/delete.svg?raw"),
      loading: false,
      complains: [],
      cities: [],
      transports: [],
      visibleScore: false,
      scores: [],
      currentDriver: {},
      formScore: {
        score: 0,
        desc: "",
        driverId: null,
      }
    };
  },
  async mounted() {
    await Promise.all([
      this.getFirstData("__GET_complains"),
    ]);

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

    async __GET_complains() {
      try {
        this.loading = true;
        const data = await this.$store.dispatch("fetchOrders/getAllComp", {
          params: {
            ...this.$route.query,
          },
        });

        const pageIndex = this.indexPage(data?.number, data?.size);
        this.complains = data?.content.map((item, index) => {
          return {
            ...item,
            key: index + pageIndex,
          };
        });
        this.totalPage = data?.totalElements;
        console.log(this.complains)
      } finally {
        this.loading = false;
      }
    },
    indexPage(current_page, per_page) {
      return (current_page * 1) * per_page + 1;
    },

  },
  watch: {
    async current(val) {
      this.changePagination(val, "__GET_complains");
    },

  },
  components: {TitleBlock, SearchInput, OrderBtns},
};
</script>
<style lang="css">
@import "@/assets/css/pages/order.css";

.rejected {
  color: #f65160;
}

.success {
  color: #18b3bd;
}

.text-modal .ant-modal-footer {
  display: none;
}

.driver-filter-grid {
  display: grid;
  grid-template-columns: 4fr 2fr 2fr 2fr 2fr 40px;
  grid-gap: 8px;
}
</style>
