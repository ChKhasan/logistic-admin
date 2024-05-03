<template lang="html">
  <div class="all-orders pb-5">
    <TitleBlock title="Водители"></TitleBlock>

    <div class="container_xl app-container pb-4 pt-5">
      <div class="card_block main-table px-4 py-3">
        <div class="d-flex justify-content-between align-items-center">
          <div class="driver-filter-grid w-100 align-items-center">
            <SearchInput
              placeholder="Поиск"
              @changeSearch="($event) => changeSearch($event, '__GET_DRIVERS')"
            />
            <span> </span>
            <div class="input status-select w-100">
              <a-form-model-item class="form-item mb-0">
                <a-select v-model="filter.vehicleId" placeholder="Тип транспорта"
                          @change="$event => onFilterChange($event,'vehicleId')">
                  <a-select-option v-for="filterItem in transports" :key="filterItem?.id">
                    {{ filterItem?.name?.ru }}
                  </a-select-option>
                </a-select>
              </a-form-model-item>
            </div>
            <div class="input status-select w-100">
              <a-form-model-item class="form-item mb-0">
                <a-select v-model="filter.cityId" placeholder="Область"
                          @change="$event => onFilterChange($event,'cityId')">
                  <a-select-option v-for="filterItem in cities" :key="filterItem?.id">
                    {{ filterItem?.name.ru }}
                  </a-select-option>
                </a-select>
              </a-form-model-item>
            </div>

            <div class="input status-select w-100">
              <a-form-model-item class="form-item mb-0">
                <a-select v-model="filter.isActive" placeholder="Статус"
                          @change="$event => onFilterChange($event,'isActive')">
                  <a-select-option
                    v-for="filterItem in statusFilter"
                    :key="filterItem?.id"
                    :value="filterItem?.id"
                  >
                    {{ filterItem?.name?.ru }}
                  </a-select-option>
                </a-select>
              </a-form-model-item>
            </div>

            <a-button
              type="primary"
              class="d-flex align-items-center justify-content-center"
              @click="clearFilterPage"
              style="height: 38px"
            >
              <a-icon type="reload"
              />
            </a-button>
          </div>
        </div>
      </div>
    </div>

    <div class="container_xl app-container main-table">
      <div class="card_block main-table px-4 py-4">
        <a-table
          :columns="columnsDrivers"
          :data-source="drivers"
          :pagination="false"
          :loading="loading"
          align="center"
        >

          <span slot="orderId" slot-scope="text">#{{ text?.id }}</span>
          <span slot="score" @click="openScore(text)" slot-scope="text">{{ text?.score }}</span>
          <nuxt-link
            class="title-link"
            :to="`/drivers/${text?.id}`"
            slot="name"
            slot-scope="text"
          >{{ text?.firstName }} {{ text?.lastName }}
          </nuxt-link
          >

          <span
            slot="isActive"
            slot-scope="tags"
            class="tags-style"
            :class="{
              tag_success: tags,
              tag_rejected: !tags,
            }"
          >
            <!-- 'new', 'canceled', 'accepted', 'in_process' -->
            {{ tags ? 'Активный' : 'Неактивный' }}
          </span>
          <span slot="btns" slot-scope="text">
            <span
              v-if="checkAccess('drivers', 'put')"
              class="action-btn"
              v-html="eyeIcon"
              @click="$router.push(`/drivers/${text}`)"
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
                changePageSizeGlobal($event, '/orders/all-orders', '__GET_DRIVERS')
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
      v-model="visibleScore"
      class="text-modal"
      centered
      :title="`Общий балл водителя: ${currentDriver?.score}`"
      width="720px"
    >
      <div class="d-flex flex-column main-table">
        <a-button
          type="primary"
          class="d-flex align-items-center justify-content-center mb-2"
          @click="visibleScoreAdd = true"
          style="height: 38px"
        >
          Добавить оценку
        </a-button>
        <a-table
          :columns="columnsScores"
          :data-source="scores"
          :pagination="false"
          :loading="loading"
          align="center"
        >
          <span slot="score" slot-scope="text" :class="text > 0 ? 'success':'rejected'">{{ text }}</span>
          <span slot="btns" slot-scope="text">
            <span
              v-if="checkAccess('orders', 'put')"
              class="action-btn"
              @click="openIsScore(text)"
              v-html="editIcon"
            >
            </span>
          </span>
        </a-table>
      </div>
    </a-modal>
    <a-modal
      v-model="visibleScoreEdit"
      class="text-modal"
      centered
      :title="`Общий балл водителя: ${currentDriver?.score}`"
      width="540px"
    >
      <div class="d-flex flex-column main-table">
        <a-form-model-item class="form-item mb-3" label="Имя" prop="title">
          <a-input v-model="formScore.score" placeholder="Имя..."/>
        </a-form-model-item>
        <a-button
          type="primary"
          class="d-flex align-items-center justify-content-center"
          @click="clearFilterPage"
          style="height: 38px"
        >
          edit score
        </a-button>
      </div>
    </a-modal>
    <a-modal
      v-model="visibleScoreAdd"
      class="text-modal"
      centered
      :title="'Оценка'"
      width="540px"
    >
      <div class="d-flex flex-column main-table">
        <a-form-model-item class="form-item mb-3" prop="title">
          <a-input type="number" v-model="formScore.score" placeholder="0"/>
        </a-form-model-item>
        <a-form-model-item class="form-item mb-3" prop="title">
          <a-input type="textarea" v-model="formScore.desc" placeholder="Text"/>
        </a-form-model-item>
        <a-button
          type="primary"
          class="d-flex align-items-center justify-content-center"
          @click="submitScore(-1)"
          :class="{disabledBtn: formScore.score <= 0}"
          style="height: 38px"
        >
          Вычесть
        </a-button>
        <a-button
          type="primary"
          class="d-flex align-items-center justify-content-center mt-2"
          @click="submitScore(1)"
          :class="{disabledBtn: formScore.score <= 0}"
          style="height: 38px"
        >
          Добавлять
        </a-button>
      </div>
    </a-modal>
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
      drivers: [],
      columnsScores: [
        {
          title: "ID",
          slots: {title: "customTitle"},
          customRender: (text) => "#" + text?.id,
          className: "column-service",
        },
        {
          title: "Дата",
          dataIndex: "createdAt",
          scopedSlots: {customRender: "createdAt"},
          customRender: (text) => moment(text).format("DD.MM.YYYY"),
          className: "column-date",
          key: "createdAt",
        },
        {
          title: "БАЛЛ",
          dataIndex: "score",
          scopedSlots: {customRender: "score"},
          className: "column-name",
          key: "score",
        },
        {
          title: "Описание балов",
          dataIndex: "desc",
          scopedSlots: {customRender: "desc"},
          customRender: (text) => text ? text : '----',
          className: "column-name",
          key: "desc",
        },
        // {
        //   title: "ДЕЙСТВИЯ",
        //   key: "id",
        //   scopedSlots: {customRender: "btns"},
        //   className: "column-btns",
        //   width: "100px",
        //   align: "center",
        // },
      ],
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
      this.__GET_TRANSPORTS(),
      this.getFirstData("__GET_DRIVERS"),
      this.__GET_CITIES(),
    ]);
    for (let item in this.filter) {
      if (Object.keys(this.$route.query).includes(item))
        this.filter[item] = Number(this.$route.query[item]);
    }
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
    openIsScore(score) {
      this.formScore.score = score?.score;
      this.visibleScoreEdit = true
    },
    openScore(driver) {
      this.currentDriver = driver
      this.formScore.driverId = driver?.id;
      this.visibleScore = true;
      this.__GET_SCORE(driver?.id);
    },
    async __GET_SCORE(id) {
      const data = await this.$store.dispatch("fetchDrivers/getDriverScore", {id});
      this.scores = data?.content
    },
    async __GET_TRANSPORTS() {
      const data = await this.$store.dispatch("fetchVehilces/getVehilces",);
      this.transports = data?.content
    },
    async __GET_CITIES() {
      const data = await this.$store.dispatch("fetchCities/getCities");
      this.cities = data?.content;
    },
    submitScore(position) {
      const data = {
        ...this.formScore,
        score: this.formScore.score * position
      }
      this.__POST_SCORE(data)
    },
    moment,
    clearFilterPage() {
      this.filter = {
        online: undefined,
        region: undefined,
      };
      this.clearQuery("__GET_DRIVERS");
    },
    async __POST_SCORE(data) {
      try {
        await this.$store.dispatch("fetchDrivers/postScore", data);
        this.visibleScoreAdd = false;
        this.notification("success", "success", "Успешно добавлен");
        this.__GET_DRIVERS();
        this.__GET_SCORE(this.currentDriver?.id);

      } catch (e) {
        this.statusFunc(e);
      }
    },
    async __GET_DRIVERS() {
      this.loading = true;
      const data = await this.$store.dispatch("fetchDrivers/getDrivers", {
        params: {
          ...this.$route.query,
        },
      });
      this.loading = false;
      const pageIndex = this.indexPage(data?.number, data?.size);
      this.drivers = data?.content.map((item, index) => {
        return {
          ...item,
          key: index + pageIndex,
        };
      });
      this.totalPage = data?.totalElements;
    },
    indexPage(current_page, per_page) {
      return (current_page * 1 - 1) * per_page + 1;
    },
    async onFilterChange(id, name) {
      if (this.$route.query[name] != id)
        await this.$router.replace({
          path: this.$route.path,
          query: {...this.$route.query, [name]: id},
        });
      if (id == this.$route.query[name]) this.__GET_DRIVERS();
    }
  },
  watch: {
    async current(val) {
      this.changePagination(val, "__GET_DRIVERS");
    },
    visibleScoreAdd(val) {
      if (!val) {
        this.formScore = {
          score: 0,
          desc: "",
          driverId: null,
        }
      } else {
        this.formScore.driverId = this.currentDriver?.id
      }
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
