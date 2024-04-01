<template lang="html">
  <div class="posts">
    <TitleBlock
      title="Информация о клиенте"
      :breadbrumb="['Клиенты']"
      lastLink="Информация о клиенте"
    >
      <div class="d-flex">
        <div
          class="add-btn add-header-btn add-header-btn-padding btn-light-primary mx-3"
          @click="$router.go(-1)"
        >
          Назад
        </div>
      </div>
    </TitleBlock>
    <a-spin :spinning="spinning" :delay="delayTime">
      <a-form-model :model="form" ref="ruleForm" :rules="rules" layout="vertical">
        <div class="pb-5 pt-5">
          <div class="container_xl app-container d-flex flex-column">
            <div class="">
              <div>
                <div class="card_block main-table px-4 py-4">
                  <FormTitle title="Информация о клиенте" />
                  <div class="order-grid-2">
                    <a-form-model-item class="form-item mb-0" label="Имя">
                      <a-input placeholder="Имя..." v-model="client.name" disabled />
                    </a-form-model-item>
                    <a-form-model-item class="form-item mb-0" label="Адрес">
                      <a-input placeholder="Адрес" v-model="client.address" disabled />
                    </a-form-model-item>
                    <a-form-model-item
                      class="form-item mb-0 disabled_input"
                      label="Номер клиента "
                    >
                      <the-mask
                        disabled
                        class="w-100"
                        type="text"
                        placeholder="(___) ___-____"
                        :mask="['+ (998) ## ### ## ##', '+ (998) ## ### ## ##']"
                        v-model="client.phone_number"
                        label-position="top"
                      />
                    </a-form-model-item>

                    <a-form-model-item class="form-item mb-3" label="Email">
                      <a-input
                        style="text-transform: capitalize"
                        placeholder="Email"
                        v-model="client.email"
                        disabled
                      />
                    </a-form-model-item>
                  </div>
                </div>

                <div class="mt-5">
                  <FormTitle title="История заказов" />
                </div>
                <div class="card_block main-table px-4 py-4">
                  <div
                    class="d-flex justify-content-between align-items-center card_header"
                  >
                    <div class="prodduct-list-header-grid w-100 align-items-center"></div>
                  </div>
                  <a-table
                    :columns="columns"
                    :data-source="client.general_orders"
                    :pagination="false"
                    :loading="loading"
                    align="center"
                  >
                    <!-- <span
                    to="/orders/1232/details"
                    slot="client"
                    slot-scope="text"
                    align="center"
                  >
                    {{ text }}
                  </span> -->
                    <a slot="amount" slot-scope="text">${{ text }}</a>
                    <span slot="orders" slot-scope="text">{{
                      text[0].service?.name?.ru ? text[0].service?.name?.ru : "------"
                    }}</span>
                    <span slot="orderId" slot-scope="text">#{{ text?.id }}</span>
                    <!-- <span slot="client" slot-scope="text" class="column-client">{{
                    text?.name ? text?.name : "----"
                  }}</span> -->
                    <span slot="dataAdd" slot-scope="text">{{
                      moment(text).format("DD/MM/YYYY")
                    }}</span>
                    <span slot="customTitle"></span>

                    <span
                      slot="status"
                      slot-scope="tags"
                      class="tags-style"
                      :class="{
                        tag_success: tags == 'new',
                        tag_inProgress: tags == 'in_process',
                        tag_approved: tags == 'accepted',
                        tag_rejected: tags == 'canceled',
                      }"
                    >
                      {{ status[tags] }}
                    </span>
                    <span slot="btns" slot-scope="text">
                      <!-- <span
                      v-if="checkAccess('orders', 'put')"
                      class="action-btn"
                      v-html="eyeIcon"
                      @click="$router.push(`/orders/order/${text}`)"
                    >
                    </span>
                    <span
                      v-if="checkAccess('orders', 'put')"
                      class="action-btn"
                      @click="$router.push(`/orders/order/${text}`)"
                      v-html="editIcon"
                    >
                    </span> -->
                      <!-- <span class="action-btn" @click="deleteAction(text)" v-html="deleteIcon">
            </span> -->
                    </span>
                  </a-table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </a-form-model>
    </a-spin>
  </div>
</template>
<script>
import FormTitle from "../../components/Form-title.vue";
import TitleBlock from "../../components/Title-block.vue";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import status from "../../mixins/status";
import authAccess from "../../mixins/authAccess";

import BiletCard from "../../components/cards/biletCard.vue";
import moment from "moment";

export default {
  mixins: [status, authAccess],
  head: {
    title: "Новости",
  },
  data() {
    return {
      delayTime: 0,
      spinning: false,
      status: {
        new: "Новые",
        in_process: "Ожидание",
        accepted: "Принятые",
        canceled: "Отмененные",
      },
      columns: [
        {
          title: "ID заказа",
          slots: { title: "customTitle" },
          scopedSlots: { customRender: "orderId" },
          className: "column-service",
        },
        {
          title: "дата добавления",
          dataIndex: "created_at",
          key: "created_at",
          scopedSlots: { customRender: "dataAdd" },
          className: "column-date",
        },
        {
          title: "Услуга",
          dataIndex: "orders",
          scopedSlots: { customRender: "orders" },
          className: "column-name",
          key: "orders",
        },
        {
          title: "сумма",
          dataIndex: "amount",
          scopedSlots: { customRender: "amount" },
          className: "column-name",
          key: "amount",
        },
        {
          title: "статус",
          dataIndex: "status",
          scopedSlots: { customRender: "status" },
          className: "column-tags",
          key: "status",
        },
        // {
        //   title: "ДЕЙСТВИЯ",
        //   key: "id",
        //   dataIndex: "id",
        //   scopedSlots: { customRender: "btns" },
        //   className: "column-btns",
        //   width: "100px",
        //   align: "center",
        // },
      ],
      statusValue: "new",
      editorOption: {
        // Some Quill options...
        theme: "snow",
        modules: {
          toolbar: [
            [
              {
                font: [],
              },
              {
                size: [],
              },
            ],
            ["bold", "italic", "underline", "strike"],
            [
              {
                color: [],
              },
              {
                background: [],
              },
            ],
            [
              {
                script: "super",
              },
              {
                script: "sub",
              },
            ],
            [
              {
                header: [false, 1, 2, 3, 4, 5, 6],
              },
              "blockquote",
              "code-block",
            ],
            [
              {
                list: "ordered",
              },
              {
                list: "bullet",
              },
              {
                indent: "-1",
              },
              {
                indent: "+1",
              },
            ],
            [
              "direction",
              {
                align: [],
              },
            ],
            ["link", "image", "video"],
            ["clean"],
          ],
        },
      },
      statusData: [
        {
          label: "Ожидание",
          value: "in_process",
        },
        {
          label: "Принятые",
          value: "accepted",
        },
        {
          label: "Отмененные",
          value: "canceled",
        },
      ],

      client: {},
      rules: {
        title: {
          ru: [
            {
              required: true,
              message: "This field is required",
              trigger: "change",
            },
          ],
        },
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
        poster: "",
        instagram: "",
        telegram: "",
        facebook: "",
      },
    };
  },
  async mounted() {
    this.__GET_CLIENTS_BY_ID();
  },
  methods: {
    moment,
    onSubmit() {
      this.__EDIT_CATEGORIES({ status: this.statusValue });
    },

    async __GET_CLIENTS_BY_ID(id) {
      try {
        this.spinning = true;
        const data = await this.$store.dispatch(
          "fetchClients/getClientsById",
          this.$route.params.index
        );
        this.visible = true;
        this.client = data?.client;
        this.spinning = false;
      } catch (e) {
        this.statusFunc(e);
        this.spinning = false;
      }
    },
  },
  components: { TitleBlock, FormTitle, BiletCard },
};
</script>
<style lang="css">
@import "../../assets/css/pages/order.css";
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
</style>
