<template>
  <div>
    <TitleBlock title="Dashboard" :breadbrumb="['Каталог']" lastLink="Dashboard">
<!--      <div class="d-flex justify-content-between w-100">-->
<!--        <div-->
<!--          class="add-btn add-header-btn add-header-btn-padding btn-primary"-->
<!--          @click="visible = true"-->
<!--        >-->
<!--          Изменить дату-->
<!--        </div>-->
<!--      </div>-->
    </TitleBlock>
    <div class="container_xl app-container pb-5">
<!--      <Loader v-if="loading" />-->
      <div class="chart-grid-4">
        <div class="card_block py-5">
          <div class="price-title">
            <h1>Количество заказов на сегодня</h1>
          </div>
          <div class="price">
            <h1 class="color-blue">{{ dashboadData?.ordersCount?.today ?? 0 }}</h1>
          </div>
        </div>
        <div class="card_block py-5">
          <div class="price-title">
            <h1>Сумма заказов на сегодня</h1>
          </div>
          <div class="price">
            <h1 class="color-light-green">
              {{
                dashboadData?.ordersAmount?.today
                  ? `${dashboadData?.ordersAmount?.today}`.replace(/\B(?=(\d{3})+(?!\d))/g, " ")
                  : 0
              }}
              сум
            </h1>
          </div>
        </div>
        <div class="card_block py-5">
          <div class="price-title">
            <h1>Новый пользователь на сегодня</h1>
          </div>
          <div class="price">
            <h1 class="color-violet">{{ dashboadData?.consumersCount?.today ?? 0 }}</h1>
          </div>
        </div>
        <div class="card_block py-5">
          <div class="price-title">
            <h1>Количество водителей </h1>
          </div>
          <div class="price">
            <h1 class="color-violet">{{ dashboadData?.driversCount?.overall ?? 0 }}</h1>
          </div>
        </div>
        <div class="card_block mt-0 py-5">
          <div class="price2-title">
            <p>Всего заказов</p>
            <h1>
              {{ dashboadData?.ordersCount?.overall ?? 0 }}
            </h1>
          </div>
        </div>
        <div class="card_block mt-0 py-5">
          <div class="price2-title">
            <p>Сумма заказов на вес период</p>
            <h1>
              {{
                dashboadData?.ordersAmount?.overall
                  ? `${dashboadData?.ordersAmount?.overall}`.replace(/\B(?=(\d{3})+(?!\d))/g, " ")
                  : 0
              }}
              сум
            </h1>
          </div>
        </div>
        <div class="card_block mt-0 py-5">
          <div class="price2-title">
            <p>Количество пользователей</p>
            <h1>{{ dashboadData?.consumersCount?.overall ?? 0 }}</h1>
          </div>
        </div>
        <div class="card_block mt-0 py-5">
          <div class="price2-title">
            <p>Количество кампаний</p>
            <h1>{{ dashboadData?.companiesCount?.overall ?? 0 }}</h1>
          </div>
        </div>
      </div>
      <div class="grid-status">
        <div class="card_block mt-0 py-0 status_block">
          <div class="price2-title">
            <p class="status-light-blue">Новые</p>
            <h1>
              {{ $store.state.orders["newCount"] }}
            </h1>
          </div>
        </div>
        <div class="card_block mt-0 py-0 status_block">
          <div class="price2-title">
            <p class="status-blue">Завершенный </p>
            <h1>
              {{ $store.state.orders["completed"] }}
            </h1>
          </div>
        </div>
        <div class="card_block mt-0 py-0 status_block">
          <div class="price2-title">
            <p class="status-yellow">В процессе</p>
            <h1>{{ $store.state.orders["processCount"] }}</h1>
          </div>
        </div>
        <div class="card_block mt-0 py-0 status_block">
          <div class="price2-title">
            <p class="status-green">Отмена (исполнителем)</p>
            <h1>
              {{ $store.state.orders["canceledByExecutorCount"] }}
            </h1>
          </div>
        </div>
        <div class="card_block mt-0 py-0 status_block">
          <div class="price2-title">
            <p class="status-dark-green">Отмена (модератор)</p>
            <h1>
              {{ $store.state.orders["canceledByAdminCount"] }}
            </h1>
          </div>
        </div>
        <div class="card_block mt-0 py-0 status_block">
          <div class="price2-title">
            <p class="status-red">Отмена (клиент)</p>
            <h1>{{ $store.state.orders["canceledByConsumerCount"] }}</h1>
          </div>
        </div>
<!--        <div class="card_block mt-0 py-0 status_block">-->
<!--          <div class="price2-title">-->
<!--            <p class="color-violet">Возврат</p>-->
<!--            <h1>-->
<!--              {{ $store.state.orders["returned"] }}-->
<!--            </h1>-->
<!--          </div>-->
<!--        </div>-->
      </div>
      <div class="dashboard-grid">
        <div class="card_block py-5">
          <section class="pt-4 h-100">
            <div class="chart">
              <apexchart
                v-if="
                  chartOptionsHorizontal.xaxis.categories.length > 0 &&
                  seriesOrderClient[0].data.length > 0
                "
                type="bar"
                height="100%"
                :options="chartOptionsHorizontal"
                :series="seriesOrderClient"
              ></apexchart>
            </div>
          </section>
        </div>
        <div class="card_block py-5">
          <section class="pt-4 h-100">
            <div class="chart">
              <apexchart
                v-if="
                  chartOptionsHorizontalDirver.xaxis.categories.length > 0 &&
                  seriesDriverCompany[0].data.length > 0
                "
                type="bar"
                height="100%"
                :options="chartOptionsHorizontalDirver"
                :series="seriesDriverCompany"
              ></apexchart>
            </div>
          </section>
        </div>
      </div>
    </div>
    <a-modal v-model="visible" title="Изменить дату" :closable="false" @ok="handleOk">
      <div class="d-flex justify-content-center">
        <el-date-picker
          v-model="value1"
          type="daterange"
          start-placeholder="Дата начала"
          end-placeholder="Дата окончания"
        >
        </el-date-picker>
      </div>
      <template slot="footer">
        <div class="add_modal-footer d-flex justify-content-end">
          <div
            class="add-btn add-header-btn add-header-btn-padding btn-light-primary mx-3"
            @click="visible = false"
          >
            Отмена
          </div>
          <a-button
            class="add-btn add-header-btn btn-primary"
            type="primary"
            @click="changeDate"
          >
            Сохранить
          </a-button>
        </div>
      </template>
    </a-modal>
  </div>
</template>

<script>
import FormTitle from "../components/Form-title.vue";
import TitleBlock from "../components/Title-block.vue";
import moment from "moment";
export default {
  components: { TitleBlock, FormTitle, },
  layout: "toolbar",
  data() {
    return {
      loading: false,
      value1: "",
      visible: false,
      seriesOrderClient: [
        {
          name: "Точка А",
          data: [],
        },
        {
          name: "Точка Б",
          data: [],
        },
      ],
      chartOptionsHorizontal: {
        chart: {
          height: 1000,
          type: "bar",
        },
        title: {
          text: "Заказы по регионам",
          align: "left",
          style: {
            fontSize: "19px",
            fontWeight: "600",
            fontFamily: "TT Interfaces",
            color: "#263238",
          },
        },

        plotOptions: {
          bar: {
            horizontal: true,
            dataLabels: {
              position: "top",
            },
          },
        },
        dataLabels: {
          enabled: true,
          offsetX: -6,
          style: {
            fontSize: "12px",
            colors: ["#fff"],
          },
        },
        stroke: {
          show: true,
          width: 1,
          colors: ["#fff"],
        },
        tooltip: {
          shared: true,
          intersect: false,
          y: {
            show: true,
            formatter: (val) => {
              return val.toFixed();
            },
          },
        },
        // colors: ['#FFDB5C', '#E440FF'],
        legend: {
          position: "top",
          horizontalAlign: "center",
          offsetX: 40,
        },
        xaxis: {
          categories: [],
        },
      },
      seriesDriverCompany: [
        {
          name: "Драйверы",
          data: [],
        },
        {
          name: "Компании",
          data: [],
        },
      ],
      chartOptionsHorizontalDirver: {
        chart: {
          height: 1000,
          type: "bar",
        },
        title: {
          text: "Водители и компании по регионам",
          align: "left",
          style: {
            fontSize: "19px",
            fontWeight: "600",
            fontFamily: "TT Interfaces",
            color: "#263238",
          },
        },

        plotOptions: {
          bar: {
            horizontal: true,
            dataLabels: {
              position: "top",
            },
          },
        },
        dataLabels: {
          enabled: true,
          offsetX: -6,
          style: {
            fontSize: "12px",
            colors: ["#fff"],
          },
        },
        stroke: {
          show: true,
          width: 1,
          colors: ["#fff"],
        },
        tooltip: {
          shared: true,
          intersect: false,
          y: {
            show: true,
            formatter: (val) => {
              return val.toFixed();
            },
          },
        },
        colors: ['#FFDB5C', '#E440FF'],
        legend: {
          position: "top",
          horizontalAlign: "center",
          offsetX: 40,
        },
        xaxis: {
          categories: [],
        },
      },
      dashboadData: {},
      regions: []
    };
  },
  mounted() {
    this.__GET_DASHBOARD();
    this.__GET_REGIONS()
  },
  methods: {
    async __GET_REGIONS() {
      try {
        this.loading = true;
        const data = await this.$store.dispatch("fetchRegions/getRegions");

        this.regions = data?.content;
        this.chartOptionsHorizontal.xaxis.categories = data?.content.map(
          (item) => item?.name?.ru
        );
      } finally {
        this.loading = false;
      }
    },
    async changeDate() {
      let begin = moment(this.value1[0]).format("YYYY-MM-DD");
      let end = moment(this.value1[1]).format("YYYY-MM-DD");

      await this.$router.replace({
        path: this.$route.fullPath,
        query: { begin: begin, end: end },
      });
      this.__GET_DASHBOARD();
      this.visible = false;
    },
    handleOk() {
      this.visible = false;
    },
    async __GET_DASHBOARD() {
      this.loading = true;
      this.seriesOrderClient[0].data = [];
      this.seriesOrderClient[1].data = [];
      const data = await this.$store.dispatch("fetchDashboard/getDashboard", {
        ...this.$route.query,
      });
      this.dashboadData = data?.data;
      this.chartOptionsHorizontal.xaxis.categories = data?.data?.cityOrderStatistics.map(
        (item) => item?.name
      );
      this.seriesOrderClient[0].data = data?.data?.cityOrderStatistics.map(
        (item) => item?.firstCount
      );
      this.seriesOrderClient[1].data = data?.data?.cityOrderStatistics.map(
        (item) => item?.secondCount
      );
      this.chartOptionsHorizontalDirver.xaxis.categories = data?.data?.cityExecutorStatistics.map(
        (item) => item?.name
      );
      this.seriesDriverCompany[0].data = data?.data?.cityExecutorStatistics.map(
        (item) => item?.firstCount
      );
      this.seriesDriverCompany[1].data = data?.data?.cityExecutorStatistics.map(
        (item) => item?.secondCount
      );
      this.loading = false;
    },
  },
};
</script>

<style scoped>
.chart {
  height: 700px
}
.card_block {
  border: 0;
  padding-top: 0 !important;
  padding-bottom: 1.25rem !important;
  border-radius: 7.125px;
  position: relative;
  display: flex;
  flex-direction: column;
  min-width: 0;
  margin-top: 25px;
  padding: 0 24px;
}
.top-products {
  min-height: 900px;
}
.product-list {
  display: flex;
  gap: 16px;
  flex-direction: column;
}
.product-item .name h6 {
  text-align: start;
  line-height: 24px;
  color: #181c32;
  font-family: "TT Interfaces";
  font-size: 17px;
  font-weight: bold;
  font-style: normal;
  overflow: hidden;
  width: 90%;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  display: -webkit-box;
  text-overflow: ellipsis;
}
.product-item .name {
  width: 100%;
  display: flex;
  align-items: center;
}
.product-item {
  display: flex;
  gap: 16px;
  padding-bottom: 16px;
  border-bottom: 1px solid #e8e8e8;
}
.title-products h2 {
  font-family: Helvetica, Arial, sans-serif;
}
.status_block {
  padding-bottom: 0 !important;
}
:deep(.chartjs-size-monitor) {
  position: relative;
}
.chart {
  width: 100%;
}
.chart-grid {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  gap: 32px;
  color: rgba(54, 153, 255);
  grid-row-gap: 16px;
}
.chart-grid-3 {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
  color: rgba(54, 153, 255);
}
.chart-grid-4 {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 8px;
  color: rgba(54, 153, 255);
}
.grid-status {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 10px;
  margin-top: 24px;
}
.price-title,
.price2-title {
  padding: 16px 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
}
.price-title h1 {
  font-size: 16px;
  color: #181c32;
  line-height: 1.2;
  font-weight: 600;
  font-family: "Poppins", Helvetica, "sans-serif";
}
.price-title p,
.price2-title p {
  color: #878787;
  font-family: "Poppins", Helvetica, "sans-serif";
  margin-top: 0.25rem;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: 24px;
}
.price {
  padding-top: 0;
}
.price h1,
.price2-title h1 {
  /* color: #3f4254; */
  font-size: 24px;
  letter-spacing: -0.115rem;
  line-height: 1;
  font-weight: 600;
  font-family: "Poppins", Helvetica, "sans-serif";
  display: flex;
  align-items: center;
}
.price2-title h1 {
  margin-top: 16px;
}
.price h1 span {
  color: #b5b5c3;
  font-weight: 500;
  font-size: 1.25rem;
  margin-right: 0.25rem;
  margin-left: 0.5rem;
}
.dashboard-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  grid-row: 8px;
}
.price-status {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
}
.price-status h1:first-child {
  color: #18b3bd;
}
.price-status h1:last-child {
  color: #f65160;
}
.color-violet {
  color: #ad00c9 !important;
}
.color-blue {
  color: #437fec;
}
.color-light-green {
  color: #00b2a9;
}
.status-light-blue {
  color: #18b3bd !important;
}
.status-blue {
  color: #3699ff !important;
}
.status-green {
  color: #62cacf !important;
}
/* .status-blue {
  color: rgb(27, 69, 236) !important;
} */
.status-yellow {
  color: #ffa909 !important;
}
.status-purple {
  color: rgb(243, 18, 213) !important;
}
.status-dark-green {
  color: rgb(11, 95, 55) !important;
}
.status-red {
  color: rgb(243, 18, 18) !important;
}
</style>
