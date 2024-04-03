<template lang="html">
  <div class="all-orders pb-5">
    <TitleBlock title="Водители"></TitleBlock>

    <div class="container_xl app-container pb-4 pt-5">
      <div class="card_block main-table px-4 py-3">
        <div class="d-flex justify-content-between align-items-center">
          <div class="driver-filter-grid w-100 align-items-center">
            <SearchInput
              placeholder="Поиск"
              @changeSearch="($event) => changeSearch($event, '__GET_ORDERS')"
            />
            <span></span>
            <div class="input status-select w-100">
              <a-form-model-item class="form-item mb-0">
                <a-select v-model="filter.region" placeholder="Тип транспорта">
                  <a-select-option v-for="filterItem in regions" :key="filterItem?.id">
                    {{ filterItem?.name_ru }}
                  </a-select-option>
                </a-select>
              </a-form-model-item>
            </div>
            <div class="input status-select w-100">
              <a-form-model-item class="form-item mb-0">
                <a-select v-model="filter.region" placeholder="Область">
                  <a-select-option v-for="filterItem in regions" :key="filterItem?.id">
                    {{ filterItem?.name_ru }}
                  </a-select-option>
                </a-select>
              </a-form-model-item>
            </div>
<!--            <div class="input status-select w-100">-->
<!--              <a-form-model-item class="form-item mb-0">-->
<!--                <a-select v-model="value" placeholder="Тип активности">-->
<!--                  <a-select-option-->
<!--                    v-for="filterItem in statusFilter"-->
<!--                    :key="filterItem?.id"-->
<!--                  >-->
<!--                    {{ filterItem?.name?.ru }}-->
<!--                  </a-select-option>-->
<!--                </a-select>-->
<!--              </a-form-model-item>-->
<!--            </div>-->
            <div class="input status-select w-100">
              <a-form-model-item class="form-item mb-0">
                <a-select v-model="filter.online" placeholder="Статус">
                  <a-select-option
                      v-for="(filterItem, index) in Object.entries(status)"
                      :key="index"
                      :value="filterItem[0]"
                  >
                    {{ filterItem[1] }}
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
          :data-source="freelancers"
          :pagination="false"
          :loading="loading"
          align="center"
        >

          <span slot="orderId" slot-scope="text">#{{ text?.id }}</span>
          <nuxt-link
            class="title-link"
            :to="`/freelancers/${text?.id}`"
            slot="name"
            slot-scope="text"
          >{{ text?.name }}
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
            {{ tags ? 'Активный':'Неактивный' }}
          </span>
          <span slot="specialities" slot-scope="text">
            <a-tag color="red" v-if="text?.length == 0"> {{ text?.length }} </a-tag>
            <a-tag
              color="blue"
              v-else
              style="cursor: pointer"
              @click="currentFreelancer(text)"
            >
              {{ text?.length }}
            </a-tag>
          </span>

          <span slot="btns" slot-scope="text">
            <span
                  v-if="checkAccess('drivers', 'put')"
                  class="action-btn"
                  v-html="eyeIcon"
                  @click="$router.push(`/drivers/${text}`)"
                >
                </span>
            <!-- <span
              v-if="checkAccess('orders', 'put')"
              class="action-btn"
              @click="$router.push(`/freelancers/${text}`)"
              v-html="editIcon"
            >
            </span> -->
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
    </div>
    <a-modal
      v-model="visible"
      class="text-modal"
      centered
      :title="'Специальности'"
      width="720px"
    >
      <div class="d-flex flex-column">
        <a-list item-layout="horizontal" :data-source="data">
          <a-list-item slot="renderItem" slot-scope="item, index">
            <a-list-item-meta>
              <a slot="id" href="https://www.antdv.com/">{{ item.id }}</a>
              <a slot="title" href="https://www.antdv.com/">{{ item.name_ru }}</a>
              <a-avatar v-if="item.icon" slot="avatar" :src="`${imgUrl}${item.icon}`"/>
              <a-avatar
                v-else
                slot="avatar"
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

      value: undefined,
      filter: {
        online: undefined,
        region: undefined,
      },
      pageSize: 10,
      eyeIcon: require("@/assets/svg/Eye.svg?raw"),
      editIcon: require("@/assets/svg/edit.svg?raw"),
      deleteIcon: require("@/assets/svg/delete.svg?raw"),
      loading: false,
      freelancers: [],
      data: [],
      status: {
        1: "В сети",
        0: "Не в сети",
      },
      regions: [],
    };
  },
  mounted() {
    this.getFirstData("__GET_ORDERS");
    this.checkAllActions("orders");
    this.__GET_REGIONS();
    Object.keys(this.$route.query).forEach((elem) => {
      if (Object.keys(this.filter).includes(elem)) {
        this.filter[elem] = this.$route.query[elem];
      }
    });
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
      this.data = array.map((item) => {
        return {
          ...item,
          title: item.name_ru,
        };
      });
      this.visible = true;
    },
    deleteAction(id) {
    },
    clearFilterPage() {
      this.value = undefined;
      this.filter = {
        online: undefined,
        region: undefined,
      };
      this.clearQuery("__GET_ORDERS");
    },
    async __GET_REGIONS() {
      const data = await this.$store.dispatch("fetchRegions/getRegions", {
        ...this.$route.query,
      });
      this.regions = data?.content;
    },
    async __GET_ORDERS() {
      this.loading = true;
      const data = await this.$store.dispatch("fetchDrivers/getDrivers", {
        params: {
          ...this.$route.query,
        },
      });
      console.log(data);
      this.loading = false;
      const pageIndex = this.indexPage(data?.number, data?.size);
      this.freelancers = data?.content.map((item, index) => {
        return {
          ...item,
          key: index + pageIndex,
        };
      });
      // console.log(this.freelancers);
      this.totalPage = data?.totalPages;
      // this.orders.dataAdd = moment(data?.orders?.created_at).format("DD/MM/YYYY");
    },
    indexPage(current_page, per_page) {
      return (current_page * 1 - 1) * per_page + 1;
    },
  },
  watch: {

    async current(val) {
      this.changePagination(val, "__GET_ORDERS");
    },
    async "filter.online"(val) {
      if (this.$route.query?.online != val)
        await this.$router.replace({
          path: this.$route.path,
          query: {...this.$route.query, online: val},
        });
      if (val == this.$route.query.online) this.__GET_ORDERS();
    },
    async "filter.region"(val) {
      if (this.$route.query?.region != val)
        await this.$router.replace({
          path: this.$route.path,
          query: {...this.$route.query, region: val},
        });
      if (val == this.$route.query.region) this.__GET_ORDERS();
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
@import "@/assets/css/pages/order.css";

.text-modal .ant-modal-footer {
  display: none;
}
.driver-filter-grid {
  display: grid;
  grid-template-columns: 4fr 2fr 2fr 2fr 2fr 40px;
  grid-gap: 8px;
}
</style>
