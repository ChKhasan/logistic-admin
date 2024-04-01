<template lang="html">
  <div class="freelancer">
    <TitleBlock :title="`Водители ${$route.params.id}`">

      <div class="d-flex justify-content-between btn_group">
        <a-button
            v-for="tabItem in tabList"
            :key="tabItem.id"
            class="add-btn add-header-btn btn-primary d-flex align-items-center"
            :type="$route.hash === `#${tabItem.hash}` ? 'primary' : 'default'"
            @click="$router.push({ hash: tabItem.hash })"
        >
          {{ tabItem.title }}
        </a-button>
      </div>
      <div class="d-flex" v-if="!toEdit">

        <a-button type="primary" @click="toEdit = true"
                  class="add-btn add-header-btn add-header-btn-padding">
          Изменить
        </a-button>

      </div>
      <div class="d-flex" v-else>
        <div

            class="add-btn add-header-btn add-header-btn-padding btn-light-primary mx-3"
            @click="toEdit = false"
        >
          Назад
        </div>
        <a-button type="primary" @click="onSubmit"
                  class="add-btn add-header-btn add-header-btn-padding">
          Сохранить
        </a-button>

      </div>
    </TitleBlock>
    <a-form-model :model="form" ref="ruleForm" :rules="rules" layout="vertical">
      <div class="pb-5 pt-5">
        <a-spin :spinning="spinning" :delay="delayTime">
          <div class="container_xl app-container d-flex flex-column spin-content">
            <div
                class="freelancer-grid"
                v-if="$route.hash == '#info' || $route.hash == ''"
            >
              <div>
                <div class="card_block main-table px-4 py-4">
                  <div class="client-info">
                    <div>
                      <div class="image-box">

                        <div class="image">
                          <img
                              class="w-full h-full object-cover"
                              v-if="fileList.length > 0"
                              :src="fileList.at(-1).url"
                              alt=""
                          />
                          <!--                        <img-->
                          <!--                            v-if="freelancer?.avatar"-->
                          <!--                            :src="`${imgUrl}${freelancer?.avatar}`"-->
                          <!--                            alt=""-->
                          <!--                        />-->
                          <img v-else src="@/assets/images/user-4.webp" alt=""/>
                        </div>
                        <span class="symbol-badge"></span>
                      </div>
                      <div class="d-flex" v-if="toEdit">
                        <a-upload
                            v-if="toEdit"
                            name="file"
                            :remove="removeAvatar"
                            :before-upload="handleBeforeUpload"
                            :custom-request="customRequest"
                            :file-list="fileList"
                            accept=".jpg, .png, .jpeg, .webp"
                        >
                          <button>
                            <svg
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                  d="M9 6L12 3M12 3L15 6M12 3L12 15"
                                  stroke="#5C46E6"
                                  stroke-width="1.5"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                              />
                              <path
                                  d="M7.5 9L7 9C4.79086 9 3 10.7909 3 13L3 17C3 19.2091 4.79086 21 7 21L17 21C19.2091 21 21 19.2091 21 17L21 13C21 10.7909 19.2091 9 17 9L16.5 9"
                                  stroke="#5C46E6"
                                  stroke-width="1.5"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                              />
                            </svg>
                          </button>
                        </a-upload>
                        <button @click="removeAvatar">
                          <svg
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                                d="M5 8V18C5 20.2091 6.79086 22 9 22H15C17.2091 22 19 20.2091 19 18V8M14 11V17M10 11L10 17M16 5L14.5937 2.8906C14.2228 2.3342 13.5983 2 12.9296 2H11.0704C10.4017 2 9.7772 2.3342 9.40627 2.8906L8 5M16 5H8M16 5H21M8 5H3"
                                stroke="#F2154A"
                                stroke-width="1.5"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>


                    <div class="info">
                      <a-form-model-item v-if="toEdit" class="form-item mb-0" prop="name">
                        <a-input v-model="form.name" placeholder="Имя"/>
                      </a-form-model-item>
                      <a-form-model-item v-if="toEdit" class="form-item mb-0" prop="surname">
                        <a-input v-model="form.surname" placeholder="Фамилия"/>
                      </a-form-model-item>
                      <h3 v-else>{{ freelancer?.name }}</h3>

                      <div class="d-flex flex-column">
                        <p>
                          ID: <span>#{{ freelancer?.id }}</span>
                        </p>
                        <p class="mt-1">
                          Номер телефона:

                          <span>+{{ freelancer?.phone }}</span>


                        </p>
                      </div>
                    </div>
                  </div>
                  <div class="personal-info">
                    <div>
                      <p class="mt-1">Дата рождения:
                        <a-form-model-item v-if="toEdit" class="form-item mb-0" prop="date_of_birth">
                          <a-date-picker v-model="form.date_of_birth" @change="onDateChange"/>
                        </a-form-model-item>
                        <span v-else>{{ dateOfBirth }}</span></p>
                      <p class="mt-1">
                        Генгер:
                        <a-form-model-item v-if="toEdit" class="form-item mb-0" prop="gender">
                          <a-select
                              v-model="form.gender"
                              placeholder="Пол"
                          >
                            <a-select-option
                                v-for="filterItem in gendertypes"
                                :key="filterItem?.value"
                            >
                              {{ filterItem?.name }}
                            </a-select-option>
                          </a-select>
                        </a-form-model-item>
                        <span v-else>{{ freelancer?.gender }}</span>
                      </p>
                      <p class="mt-1">
                        Рейтинг: <span>{{ Math.ceil(freelancer?.rating) }}</span>
                      </p>
                      <p class="mt-1">
                        Дата:


                        <span>{{
                            moment(freelancer?.created_at).format("YYYY-MM-DD")
                          }}</span>
                      </p>
                      <p class="mt-1">
                        Специальности:
                        <span style="cursor: pointer">
                          <a-tag color="red" v-if="freelancer?.specialities?.length == 0">
                            {{ freelancer?.specialities?.length }}
                          </a-tag>
                          <a-tag
                              v-else
                              color="blue"
                              style="cursor: pointer"
                              @click="visible = true"
                          >
                            {{ freelancer?.specialities?.length }}
                          </a-tag></span
                        >
                      </p>
                      <p class="mt-1">
                        Регион:
                        <a-form-model-item v-if="toEdit" class="form-item mb-0">
                          <a-select
                              v-model="form.region_id"
                              placeholder="Регион"
                          >
                            <a-select-option
                                v-for="region in regions"
                                :key="region?.id"
                            >
                              {{ region?.name_ru }}
                            </a-select-option>
                          </a-select>
                        </a-form-model-item>

                        <span v-else>{{
                            freelancer?.region?.name_ru
                          }}</span>
                      </p>
                    </div>
                  </div>
                  <FormTitle title="Статистика" class="mb-0 mt-4"/>
                  <div class="statistics-block personal-info mt-0">
                    <p class="mt-1">Количество активных заказов: <span>24</span></p>
                    <p class="mt-1">Количество ожидающих предложений: <span>30</span></p>
                    <p class="mt-1">Принимает предложения: <span>5</span></p>
                  </div>
                </div>
                <div class="card_block main-table px-4 py-4 mt-4">
                  <div class="messengers">
                    <ul>
                      <li>
                        <p>Telegram:</p>
                        <a-form-model-item v-if="toEdit" class="form-item mb-0">
                          <a-input v-model="form.telegram" placeholder="Telegram"/>
                        </a-form-model-item>
                        <span v-else>{{ freelancer?.contacts?.telegram || emptyText }}</span>
                      </li>
                      <li>
                        <p>Instagram:</p>
                        <a-form-model-item v-if="toEdit" class="form-item mb-0">
                          <a-input v-model="form.instagram" placeholder="Instagram"/>
                        </a-form-model-item>
                        <span v-else>{{ freelancer?.contacts?.instagram || emptyText }}</span>
                      </li>
                      <li>
                        <p>Facebook:</p>
                        <a-form-model-item v-if="toEdit" class="form-item mb-0">
                          <a-input v-model="form.facebook" placeholder="Facebook"/>
                        </a-form-model-item>
                        <span v-else>{{ freelancer?.contacts?.facebook || emptyText }}</span>
                      </li>
                      <li>
                        <p>Behance:</p>
                        <a-form-model-item v-if="toEdit" class="form-item mb-0">
                          <a-input v-model="form.behance" placeholder="Behance"/>
                        </a-form-model-item>
                        <span v-else>{{ freelancer?.contacts?.behance || emptyText }}</span>
                      </li>
                      <li>
                        <p>Dribble:</p>
                        <a-form-model-item v-if="toEdit" class="form-item mb-0">
                          <a-input v-model="form.dribble" placeholder="Dribble"/>
                        </a-form-model-item>
                        <span v-else>{{ freelancer?.contacts?.dribble || emptyText }}</span>
                      </li>
                      <li>
                        <p>LinkedIn:</p>
                        <a-form-model-item v-if="toEdit" class="form-item mb-0">
                          <a-input v-model="form.linkedin" placeholder="LinkedIn"/>
                        </a-form-model-item>

                        <span v-else>{{ freelancer?.contacts?.linkedin || emptyText }}</span>
                      </li>
                    </ul>
                  </div>
                </div>

              </div>
              <div>
                <div>
                  <div class="card_block main-table px-4 py-4">
                    <FormTitle title="BIO"/>
                    <a-form-model-item class="form-item mb-0" v-if="toEdit">
                      <quill-editor
                          v-model="form.bio"
                          class="product-editor mt-1"
                          :options="editorOption"
                      />
                    </a-form-model-item>
                    <div
                        class="bio"
                        v-if="freelancer?.bio && !toEdit"
                        v-html="freelancer?.bio"
                    ></div>

                    <div class="bio" v-if="!freelancer?.bio && !toEdit">
                      <a-empty/>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <div class="card_block main-table px-4 py-4">
                  <FormTitle title="Параметры"/>
                  <div class="settings ">
                    <a-select
                        v-if="toEdit"
                        v-model="form.blocked"
                        placeholder="Статус"
                    >
                      <a-select-option
                          v-for="filterItem in statusFilter"
                          :key="filterItem?.id"
                      >
                        {{ filterItem?.name }}
                      </a-select-option>
                    </a-select>
                    <p :class="form.blocked ? 'inactive':'active'" v-else>
                      {{ form.blocked ? 'Заблокирован' : 'Активный' }}</p>
                  </div>
                </div>
                <div class="card_block main-table px-4 py-4 mt-4">
                  <FormTitle title="Одобренный"/>
                  <div class="settings">
                    <a-select
                        v-if="toEdit"
                        v-model="form.approved"
                        placeholder="Статус"
                    >
                      <a-select-option
                          v-for="filterItem in statusApproved"
                          :key="filterItem?.id"
                      >
                        {{ filterItem?.name }}
                      </a-select-option>
                    </a-select>
                    <p :class="form.approved ? 'active':'inactive'" v-else>
                      {{ freelancer?.approved ? 'Верифицирован' : 'Не верифицирован' }}</p>
                  </div>
                </div>
              </div>
            </div>
            <div v-if="$route.hash == '#portfolio'">
              <div class="card_block main-table px-4 py-4">
                <FormTitle title="Portfolio"/>
                <div class="portfolios" v-if="freelancer?.works?.length > 0">
                  <a-card hoverable v-for="portfolio in freelancer?.works"
                          :key="portfolio?.id">
                    <img
                        class="portfolio-img"
                        v-if="portfolio?.images[0]?.img"
                        slot="cover"
                        alt="example"
                        :src="`${imgUrl}${portfolio?.images[0]?.img}`"
                    />
                    <img
                        v-else
                        class="portfolio-img"
                        slot="cover"
                        alt="example"
                        src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                    />
                    <div class="position-relative">
                      <a-card-meta
                          :title="portfolio?.name"
                          :description="portfolio?.desc"
                      >
                      </a-card-meta>
                    </div>
                    <div class="d-flex justify-content-between w-100 mt-2">
                      <a-statistic :value="portfolio?.classes_count">
                        <template #suffix>
                          <a-icon type="like"/>
                        </template>
                      </a-statistic>
                      <a-statistic :value="portfolio?.view_count">
                        <template #suffix>
                          <a-icon type="eye"/>
                        </template>
                      </a-statistic>
                    </div>
                  </a-card>
                </div>
                <div v-else>
                  <a-empty/>
                </div>
              </div>
            </div>
            <div v-if="$route.hash == '#orders'">
              <div class="card_block main-table px-4 py-4">
                <FormTitle title="Заказы"/>
                <a-table
                    :columns="columnsOrders"
                    :data-source="freelancer?.orders"
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
                      slot="status"
                      slot-scope="tags"
                      class="tags-style"
                      :class="{
                      tag_success: tags == 'active',
                      tag_inProgress: tags == 'in_process',
                      tag_approved: tags == 'accepted',
                      tag_rejected: tags == 'canceled',
                    }"
                  >
                    <!-- 'new', 'canceled', 'accepted', 'in_process' -->
                    Active
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
          </div>
        </a-spin>
      </div>
    </a-form-model>
    <a-modal
        v-model="visible"
        class="text-modal"
        centered
        :title="'Специальности'"
        width="720px"
        @ok="visible = false"
    >
      <div class="d-flex flex-column">
        <a-list item-layout="horizontal" :data-source="freelancer?.specialities">
          <a-list-item slot="renderItem" slot-scope="item, index">
            <a-list-item-meta>
              <nuxt-link slot="id" :to="`/settings/specialities/${item?.id}`">{{ item.id }}</nuxt-link>
              <nuxt-link :to="`/settings/specialities/${item?.id}`" slot="title">{{ item.name_ru }}</nuxt-link>
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
import FormTitle from "../../components/Form-title.vue";
import TitleBlock from "../../components/Title-block.vue";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import status from "../../mixins/status";
import columns from "../../mixins/columns";
import global from "../../mixins/global";
import authAccess from "../../mixins/authAccess";
import BiletCard from "../../components/cards/biletCard.vue";
import moment from "moment";

export default {
  mixins: [status, authAccess, columns, global],
  head: {
    title: "Заказ",
  },
  data() {
    return {
      toEdit: false,
      loading: false,
      visible: false,
      userType: 1,
      rules: {
        name: [
          {
            required: true,
            message: 'This field is required',
            trigger: "blur",
          },
        ],
        surname: [
          {
            required: true,
            message: 'This field is required',
            trigger: "blur",
          },
        ],
        gender: [
          {
            required: true,
            message: 'This field is required',
            trigger: "blur",
          },
        ],
        date_of_birth: [
          {
            required: true,
            message: 'This field is required',
            trigger: "blur",
          },
        ],
        email: [
          {
            type: "email",
            message: "Please insert a valid email address.",
            trigger: "change",
          },
        ],
      },
      editorOption: {
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
      form: {
        name: '',
        surname: '',
        gender: "",
        country_id: 1,
        region_id: 1,
        registered: 1,
        approved: 0,
        date_of_birth: null,
        bio: "",
        telegram: "",
        instagram: "",
        facebook: "",
        twitter: "",
        linkedin: "",
        github: "",
        dribble: "",
        xing: "",
        blocked: 0,
        _method: 'PUT'
      },
      emptyText: "----",
      delayTime: 0,
      gendertypes: [
        {
          value: "male",
          name: "Erkak",
        },
        {
          value: "female",
          name: "Ayol",
        },
      ],
      statusApproved: [
        {
          name: "Не верифицирован",
          id: 0,
        },
        {
          name: "Верифицирован",
          id: 1,
        },
      ],
      statusFilter: [
        {
          name: "Активный",
          id: 0,
        },
        {
          name: "Заблокирован",
          id: 1,
        },
      ],
      value: "",
      data: [],
      eyeIcon: require("../../assets/svg/Eye.svg?raw"),
      editIcon: require("../../assets/svg/edit.svg?raw"),
      deleteIcon: require("../../assets/svg/delete.svg?raw"),
      status: {
        new: "Новые",
        in_process: "Ожидание",
        accepted: "Принятые",
        canceled: "Отмененные",
      },
      freelancer: {},
      spinning: false,
      regions: [],
      fileList: [],
      tabList: [
        {
          title: "Общие данные",
          id: 1,
          hash: "info",
        },
        {
          title: "Портфолио",
          id: 2,
          hash: "portfolio",
        },
        {
          title: "Заказы",
          id: 3,
          hash: "orders",
        },
        {
          title: "Отзывы",
          id: 4,
          hash: "reviews",
        },

      ],
    };
  },
  computed: {
    baseUrl() {
      return process.env.BASE_URL;
    },
    imgUrl() {
      return this.baseUrl + "/storage/";
    },
    dateOfBirth() {
      return moment(this.freelancer.date_of_birth).format('YYYY-MM-DD')
    }
  },
  mounted() {
    this.__GET_FREELANCER();
    this.__GET_REGIONS()
  },
  methods: {
    moment,
    onSubmit() {
      let formData = new FormData();
      Object.keys(this.form).filter((elem) => elem !== "avatar").forEach(elem => {
        formData.append(`${elem}`, this.form[elem])
      })
      if (!this.fileList.at(-1)?.id && this.fileList.at(-1)?.originFileObj) {
        formData.append("avatar", this.fileList.at(-1).originFileObj);
      }
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.__PUT_FREELANDER(formData);
        }
      })
    },
    formDataTransform() {
      this.getObjjectKeys(this.form).forEach((elem) => {
        if (this.freelancer[elem]) this.form[elem] = this.freelancer[elem]
      })
      if (this.freelancer.contacts) this.getObjjectKeys(this?.form).forEach((elem) => {
        if (this.freelancer?.contacts[elem]) this.form[elem] = this.freelancer?.contacts[elem]
      })
      if (this.freelancer.avatar) {
        this.fileList = [
          {
            uid: "-1",
            name: "image.png",
            status: "done",
            url: this.imgUrl + this.freelancer.avatar,
            id: 1,
          },
        ];
      }
      this.form.region_id = this.freelancer?.region?.id
    },
    getObjjectKeys(value) {
      return Object.keys(value)
    },
    callback(e) {
      this.userType = Number(e);
      this.$router.push({hash: this.tabList[this.userType][0].hash});
    },
    onDateChange(e) {
      this.form.date_of_birth = moment(e).format('YYYY-MM-DD');
    },
    handleBeforeUpload(file) {
      return true;
    },
    customRequest({onSuccess, onError, file}) {
      const reader = new FileReader();
      reader.onload = () => {
        const uploadedFile = {
          uid: file.uid,
          name: file.name,
          originFileObj: file,
          url: reader.result,
        };
        this.fileList.push(uploadedFile);
        onSuccess();
      };
      reader.onerror = () => {
        console.error("Error reading file as binary data");
        onError(new Error("Error reading file"));
      };
      reader.readAsDataURL(file); // Use readAsDataURL to get Base64 data
    },
    async __PUT_FREELANDER(payload) {
      try {
        const data = await this.$store.dispatch('fetchFreelancers/putFreelancer', {
          id: this.$route.params.id,
          payload
        });
        this.__GET_FREELANCER();
        this.notification("success", "success", "Успешно изменен");
        this.toEdit = false
      } catch (e) {
        this.statusFunc(e);
      }
    },
    async __GET_FREELANCER() {
      try {
        this.spinning = true;
        const data = await this.$store.dispatch(
            "fetchFreelancers/getFreelancerById",
            this.$route.params.id
        );
        this.freelancer = data?.content;
        this.freelancer.orders = data?.content?.orders.map((elem) => {
          return {
            ...elem,
            ...elem.order,
          };
        });

        this.formDataTransform();
      } catch (e) {
      } finally {
        this.spinning = false;
      }
    },
    async __DELETE_FILE(payload) {
      try {
        await this.$store.dispatch("fetchFiles/postDeleteFile", payload);
        this.$notification["success"]({
          message: "Success",
          description: "Fayl muvaffaqiyatli o'chirildi",
        });
        return true
      } catch (e) {
        this.$notification["error"]({
          message: "Error",
          description: e.response.statusText,
        });
        return false
      }
    },

    async removeAvatar(e) {
      if (this.fileList[0]?.id) {
        const res = this.__DELETE_FILE({id: this.freelancer?.id, type: 'user'});
        if (res) {
          this.fileList = [];
        }
      } else {
        this.fileList = [];

      }

    },
    async __GET_REGIONS() {
      this.loading = true;
      const data = await this.$store.dispatch("fetchRegions/getRegions", {
        ...this.$route.query,
      });
      this.loading = false;
      this.regions = data?.content
    },
  },

  components: {TitleBlock, FormTitle, BiletCard},
};
</script>
<style lang="css" scoped>
.portfolio-img {
  max-height: 260px;
  width: 100%;
  object-fit: contain;
}

.freelancer-grid {
  display: grid;
  grid-gap: 13px;
  grid-template-columns: 390px 5fr 2fr;
}

.freelancer .image {
  width: 100px;
  height: 100px;
  border-radius: 0.42rem;
  overflow: hidden;
  background-color: rgb(128, 128, 128, 0.3);
}

.freelancer .image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.freelancer .image-box {
  position: relative;
  width: 100px;
  height: 100px;
}

.freelancer .image-box .symbol-badge {
  position: absolute;
  border: 2px solid #ffffff;
  border-radius: 100%;
  background-color: #1bc5bd !important;
  width: 12px;
  height: 12px;
  top: -6px;
  right: -6px;
}

.freelancer .info {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.freelancer .info h3 {
  font-family: "Inter", sans-serif;
  font-weight: 500;
  font-size: 24px;
  line-height: 24px;
  color: #3f4254;
  position: relative;
/* //white-space: nowrap; */
}

.freelancer .info p {
  font-family: "Inter", sans-serif;
  font-weight: 500;
  font-size: 13px;
  line-height: 24px;
  color: #b5b5c3;
  position: relative;
  white-space: nowrap;
}

.freelancer .info span {
  color: #3f4254;
}

.client-info {
  display: flex;
  gap: 16px;
}

.messengers ul {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.messengers ul li {
  display: flex;
  justify-content: space-between;
}

.messengers ul li p,
.personal-info p,
.messengers ul li span {
  font-family: "Inter", sans-serif;
  font-weight: 500;
  font-size: 13px;
  line-height: 24px;
  color: #b5b5c3;
  position: relative;
  white-space: nowrap;
}

.personal-info p {
  justify-content: space-between;
  display: flex;
}

.personal-info {
  margin-top: 16px;
}

.messengers ul li span,
.personal-info p span,
.bio p {
  color: #3f4254;
}

.portfolios {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 16px;
}

.settings {
  display: flex;
  justify-content: space-between;
  gap: 32px;
}

.settings p {
  font-family: "Inter", sans-serif;
  font-weight: 500;
  font-size: 13px;
  line-height: 24px;
  color: #3f4254;
  position: relative;
  white-space: nowrap;
}

.statistics-block {
  display: flex;
  gap: 8px;
  flex-direction: column;
}

:deep(.ant-tabs-tab) {
  font-family: "Inter", sans-serif;
  font-size: 17.55px;
  font-weight: 600;
  margin-top: 3.25px;
  color: rgba(0, 0, 0, 0.85);
}

:deep(.ant-tabs-bar) {
  margin-bottom: 0;
}

.active {
  color: #18b3bd !important;
}

.inactive {
  color: #f65160 !important;
}

:deep(.ant-upload-list-item-info) {
  display: none !important;
}

:deep(.ant-upload-list-item) {
  margin: 0 !important;
  height: 0 !important;
}
</style>
