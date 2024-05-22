<template lang="html">
  <a-layout id="components-layout-demo-side" style="min-height: 100vh">
    <a-layout>
      <a-layout-sider v-model="collapsed" collapsible width="265">
        <div class="layout-logo" :class="{ 'logo-collapsed': collapsed }">
          <h1 class="logo-text">MyLogist</h1>
          <div class="sidebar_toggle" @click="onCollapse">
            <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
              <path
                  opacity="0.5"
                  d="M14.2657 11.4343L18.45 7.25C18.8642 6.83579 18.8642 6.16421 18.45 5.75C18.0358 5.33579 17.3642 5.33579 16.95 5.75L11.4071 11.2929C11.0166 11.6834 11.0166 12.3166 11.4071 12.7071L16.95 18.25C17.3642 18.6642 18.0358 18.6642 18.45 18.25C18.8642 17.8358 18.8642 17.1642 18.45 16.75L14.2657 12.5657C13.9533 12.2533 13.9533 11.7467 14.2657 11.4343Z"
                  fill="currentColor"
              ></path>
              <path
                  d="M8.2657 11.4343L12.45 7.25C12.8642 6.83579 12.8642 6.16421 12.45 5.75C12.0358 5.33579 11.3642 5.33579 10.95 5.75L5.40712 11.2929C5.01659 11.6834 5.01659 12.3166 5.40712 12.7071L10.95 18.25C11.3642 18.6642 12.0358 18.6642 12.45 18.25C12.8642 17.8358 12.8642 17.1642 12.45 16.75L8.2657 12.5657C7.95328 12.2533 7.95328 11.7467 8.2657 11.4343Z"
                  fill="currentColor"
              ></path>
            </svg>
          </div>
        </div>
        <div class="a_menu">
          <a-menu
              mode="inline"
              style="background: #1e1e2d"
              :class="{ 'menu-collabsed': collapsed }"
              :default-selected-keys="['5']"
              :default-open-keys="defaultOpens"
              :open-keys.sync="openKeys"
              :inline-collapsed="collapsed"
          >
            <!--            <a-menu-item-->
            <!--                class="menu_item"-->
            <!--                v-if="menuList.dashboard.show"-->
            <!--                :key="menuList.dashboard.key"-->
            <!--                @click="$router.push(menuList.dashboard.to)"-->
            <!--                :class="{-->
            <!--                'is-active': $route.name == 'dashboard',-->
            <!--              }"-->
            <!--            >-->
            <!--              <a-icon v-html="menuList.dashboard.icon"></a-icon>-->
            <!--              <span>-->
            <!--                <nuxt-link :to="menuList.dashboard.to">-->
            <!--                  <span>{{ d(menuList.dashboard) }}</span>-->
            <!--                </nuxt-link>-->
            <!--              </span>-->
            <!--            </a-menu-item>-->
            <a-menu-item
                class="menu_item"
                v-if="menuList.freelancers.show"
                :key="menuList.freelancers.key"
                @click="$router.push(menuList.freelancers.to)"
                :class="{
                'is-active': $route.name == 'index',
              }"
            >
              <a-icon v-html="menuList.freelancers.icon"></a-icon>
              <span>
                <nuxt-link :to="menuList.freelancers.to">
                  <span>{{ d(menuList.freelancers) }}</span>
                </nuxt-link>
              </span>
            </a-menu-item>
            <a-menu-item
                class="menu_item"
                v-if="menuList.companies.show"
                :key="menuList.companies.key"
                @click="$router.push(menuList.companies.to)"
                :class="{
                'is-active': $route.name == 'companies',
              }"
            >
              <a-icon v-html="menuList.companies.icon"></a-icon>
              <span>
                <nuxt-link :to="menuList.companies.to">
                  <span>{{ d(menuList.companies) }}</span>
                </nuxt-link>
              </span>
            </a-menu-item>
            <a-menu-item
                class="menu_item"
                v-if="menuList.users.show"
                :key="menuList.users.key"
                @click="$router.push(menuList.users.to)"
                :class="{
                'is-active': $route.name == 'users',
              }"
            >
              <a-icon v-html="menuList.users.icon"></a-icon>
              <span>
                <nuxt-link :to="menuList.users.to">
                  <span>{{ d(menuList.users) }}</span>
                </nuxt-link>
              </span>
            </a-menu-item>
            <a-menu-item
                class="menu_item"
                v-if="menuList.orders.show"
                :key="menuList.orders.key"
                @click="$router.push(menuList.orders.to)"
                :class="{
                'is-active': 'orders-status' == $route.name,
              }"
            >
              <a-icon v-html="menuList.orders.icon"></a-icon>
              <span>
                <nuxt-link :to="menuList.orders.to"
                ><span>{{ d(menuList.orders) }}</span>
                </nuxt-link>
              </span>
            </a-menu-item>

            <!--            <a-menu-item-->
            <!--              class="menu_item"-->
            <!--              v-if="menuList.transactions.show"-->
            <!--              :key="menuList.transactions.key"-->
            <!--              @click="$router.push(menuList.transactions.to)"-->
            <!--              :class="{-->
            <!--                'is-active': 'transactions' == $route.name,-->
            <!--              }"-->
            <!--            >-->
            <!--              <a-icon v-html="menuList.transactions.icon"></a-icon>-->
            <!--              <span>-->
            <!--                <nuxt-link :to="menuList.transactions.to"-->
            <!--                  ><span>{{ d(menuList.transactions) }}</span>-->
            <!--                </nuxt-link>-->
            <!--              </span>-->
            <!--            </a-menu-item>-->
            <!--            <a-menu-item-->
            <!--              class="menu_item"-->
            <!--              v-if="menuList.helpDesk.show"-->
            <!--              :key="menuList.helpDesk.key"-->
            <!--              @click="$router.push(menuList.helpDesk.to)"-->
            <!--              :class="{-->
            <!--                'is-active': 'help-desk' == $route.name,-->
            <!--              }"-->
            <!--            >-->
            <!--              <a-icon v-html="menuList.helpDesk.icon"></a-icon>-->
            <!--              <span>-->
            <!--                <nuxt-link :to="menuList.helpDesk.to"-->
            <!--                  ><span>{{ d(menuList.helpDesk) }}</span>-->
            <!--                </nuxt-link>-->
            <!--              </span>-->
            <!--            </a-menu-item>-->
            <a-sub-menu :key="menu.sub" style="color: #9d9da6" v-for="menu in menuData">
              <span slot="title">
                <span v-html="menu.icon"></span
                ><span v-if="!collapsed">{{ menu.title }}</span></span
              >
              <a-menu-item
                  v-if="menu.menuItems.length > 0 && items.show"
                  :key="items.key"
                  v-for="items in menu.menuItems"
                  :class="{
                  'is-active':
                    items.to == $route.path ||
                    items.add == $route.name ||
                    items.edit == $route.name ||
                    items.path == $route.name,
                }"
              ><span v-if="!collapsed" class="menu-bullet"
              ><span class="bullet-dot"></span
              ></span>
                <nuxt-link :to="items.to">{{ d(items) }}</nuxt-link>
              </a-menu-item>
            </a-sub-menu>
          </a-menu>
        </div>
      </a-layout-sider>
      <a-layout class="layout-right" :class="{ 'right-collapsed': collapsed }">
        <div class="layout-header d-flex justify-content-end align-items-center">
          <a-dropdown :trigger="['click']">
            <a-avatar icon="user"/>
            <a-menu slot="overlay">
              <a-menu-item key="0">
                <span @click="logOut">Logout</span>
              </a-menu-item>
            </a-menu>
          </a-dropdown>
        </div>
        <a-layout-content class="layout-body">
          <Nuxt/>
        </a-layout-content>
      </a-layout>
    </a-layout>
  </a-layout>
</template>
<script>
import TitleBlock from "../components/Title-block.vue";

export default {
  middleware: ["auth"],

  data() {
    return {
      collapsed: false,
      defaultOpens: ["1"],
      openKeys: ["1"],
      logo: require("../assets/svg/logo-light.svg?raw"),
      icon: require("../assets/svg/toolbar-catalog.svg?raw"),
      menuData: [],
      menuList: {
        dashboard: {
          key: "1",
          icon: require("../assets/svg/dashboard.svg?raw"),
          name: "Dashboard",
          show: true,
          to: "/dashboard",
        },
        freelancers: {
          key: "2",
          icon: require("../assets/svg/clients.svg?raw"),
          name: "Водители",
          show: true,
          to: "/",
        },
        companies: {
          key: "3",
          icon: require("../assets/svg/clients.svg?raw"),
          name: "Компании",
          show: true,
          to: "/companies",
        },
        users: {
          key: "4",
          icon: require("../assets/svg/clients.svg?raw"),
          name: "Клиенты",
          show: true,
          to: "/users",
        },
        orders: {
          name: "Все заказы",
          key: "5",
          to: "/orders/all-orders",
          icon: require("../assets/svg/orderIcon.svg?raw"),
          show: true,
        },
        // transactions: {
        //   name: "Транзакции",
        //   key: "4",
        //   to: "/transactions",
        //   icon: require("../assets/svg/transc.svg?raw"),
        //   show: true,
        // },
        // helpDesk: {
        //   name: "Служба поддержки",
        //   key: "5",
        //   to: "/help-desk",
        //   icon: require("../assets/svg/helpDesk.svg?raw"),
        //   show: true,
        // },
      },
    };
  },

  computed: {
    routerName() {
      return this.$route.name;
    },
  },
  async mounted() {
    this.$store.dispatch("getOrders");
    await this.$store.dispatch("getPermissions");

    this.menuData = [
      {
        title: "Cправочник",
        sub: "7",
        icon: require("../assets/svg/derictory.svg?raw"),
        menuItems: [
          // {
          //   key: "71",
          //   name: "Cправочник",
          //   to: "/directory/directory",
          //   add: "directory-directory",
          //   edit: "directory-directory",
          //   show: true,
          // },
          {
            key: "72",
            name: "Причины отказа ( Водитель )",
            to: "/directory/reasons",
            add: "directory-reasons",
            edit: "directory-reasons",
            show: true,
          },
          {
            key: "73",
            name: "Причины отказа ( Клиент )",
            to: "/directory/cancel-reasons",
            add: "directory-cancel-reasons",
            edit: "directory-cancel-reasons",
            show: true,
          },
          {
            key: "74",
            name: "Жалобы",
            to: "/directory/complaints",
            add: "directory-complaints",
            edit: "directory-complaints",
            show: true,
          },
          {
            key: "75",
            name: "Критерии",
            to: "/directory/criteria",
            add: "directory-criteria",
            edit: "directory-criteria",
            show: true,
          },
        ],
      },
      {
        title: "Настройки сайта",
        sub: "6",
        icon: require("../assets/svg/settings.svg?raw"),
        menuItems: [
          // {
          //   key: "23",
          //   name: "Общие данные",
          //   to: "/settings/site-info",
          //   add: "settings-site-info",
          //   edit: "settings-site-info",
          //   show: true,
          // },
          // {
          //   key: "24",
          //   name: "Переводы",
          //   to: "/settings/translations",
          //   add: "settings-translations",
          //   edit: "settings-translations",
          //   show: true,
          // },
          {
            key: "25",
            name: "Регионы",
            to: "/settings/regions",
            add: "settings-regions",
            edit: "settings-regions",
            show: true,
          },
          {
            key: "26",
            name: "Города",
            to: "/settings/cities",
            add: "settings-cities",
            edit: "settings-cities",
            show: true,
          },
          {
            key: "27",
            name: "Тип груза",
            to: "/settings/load-types",
            add: "settings-load-types",
            edit: "settings-load-types",
            show: true,
          },

          {
            key: "28",
            name: "Страны",
            to: "/settings/countries",
            add: "settings-countries",
            edit: "settings-countries",
            show: true,
          },
          {
            key: "29",
            name: "Транспорт",
            to: "/settings/vehilces",
            add: "settings-vehilces",
            edit: "settings-vehilces",
            show: true,
          },
          {
            key: "30",
            name: "Роли",
            to: "/settings/roles",
            add: "settings-roles",
            edit: "settings-roles",
            // show: this.checkShow("roles"),
            show: true,
          },
          {
            key: "31",
            name: "Пользователи",
            to: "/settings/users",
            add: "settings-users",
            edit: "settings-users",
            // show: this.checkShow("users"),
            show: true
          },
        ],
      },
    ];
    this.checkDefaultOpen();
    // if (localStorage.getItem("auth_token")) {
    //   this.$store.commit("logIn");
    // } else {
    //   this.$router.push("/admin/login");
    //   this.$store.commit("logOut");
    // }
  },

  methods: {

    checkShow(val) {
      // if (this.$store.state.permissions.length > 0) {
      // const target = this.$store.state.permissions.find((item) => item.url == val);
      // return target?.pivot?.actions.includes("get");
      return true;
      // } else {
      //   return true;
      // }
    }
    ,
    removeToken() {
      localStorage.removeItem('auth_token');
      this.$router.push("/admin/login");
    }
    ,
    onCollapse(collapsed, type) {
      this.collapsed = !this.collapsed;
    }
    ,
    async logOut() {
      try {
        const data = await this.$store.dispatch("fetchAuth/logOut");
        await this.removeToken();
      } catch (e) {
        await this.removeToken();
        this.statusFunc(e);
      }
    }
    ,
    checkDefaultOpen() {
      if (this.$route.name.includes("settings")) {
        this.openKeys = ["6"];
      }
      if (this.$route.name.includes("directory")) {
        this.openKeys = ["7"];
      }
    }
    ,
    d(item) {
      switch (item.index) {
        case "31":
          return `${item.name} (${this.$store.state.orders.all})`;
        case "32":
          return `${item.name} (${this.$store.state.orders.new})`;
        case "33":
          return `${item.name} (${this.$store.state.orders.accepted})`;
        case "34":
          return `${item.name} (${this.$store.state.orders.in_process})`;
        case "35":
          return `${item.name} (${this.$store.state.orders.is_edited})`;
        case "38":
          return `${item.name} (${this.$store.state.orders.canceled})`;
        default:
          return item.name;
      }
    }
    ,
    success() {
      this.$message.success("You are online");
    }
    ,
    error() {
      this.$message.error("You are offline");
    }
    ,
  },
  watch: {
    "$nuxt.isOffline"(val) {
      val && this.error();
    }
    ,
    "$nuxt.isOnline"(val) {
      val && this.success();
    }
    ,
    routerName() {
      this.checkDefaultOpen();
    }
    ,
  }
  ,
  components: {
    TitleBlock
  }
  ,
}
;
</script>
<style lang="css">
@import "../assets/css/layout/default.css";

.menu_item {
  margin-bottom: 0 !important;
  margin-top: 0 !important;
}

.menu_item span svg {
  margin-right: 10px;
}
</style>
