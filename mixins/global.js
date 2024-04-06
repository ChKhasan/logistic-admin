export default {
  data() {
    return {
      page: 0,
      current: 0,
      pageSizes: [
        {
          value: 10,
          label: "10",
        },
        {
          value: 25,
          label: "25",
        },
        {
          value: 50,
          label: "50",
        },
        {
          value: 100,
          label: "100",
        },
      ],
      totalPage: 1,
      params: {
        page: 0,
        pageSize: 10,
      },
      searchVal: "",
      value: "",
    };
  },
  computed: {
    routerSearch() {
      return Object.keys(this.$route.query).includes("search");
    },
  },
  methods: {
    async changeSearch(val, func) {
      this.searchVal = val.target.value;
      if (val.target.value.length > 2) {
        if (this.$route.query?.search != val.target.value)
          await this.$router.replace({
            path: this.$route.path,
            hash: this.$route.hash,
            query: { ...this.$route.query, search: val.target.value, page: 0 },
          });
        if (val.target.value == this.$route.query.search) this[func]();
      } else if (val.target.value.length == 0) {
        this.clearQuery(func);
      }
    },
    async clearQuery(func) {
      this.value = undefined;
      const query = { pageSize: this.params.pageSize, page: 0 };
      this.current = 0;
      if (Object.keys(this.$route.query).length > 2) {
        await this.$router.replace({
          path: this.$route.path,
          hash: this.$route.hash,
          query: { ...query },
        });
        this[func]();
      }
    },
    cancel(e) {
      this.$message.error("Click on No");
    },
    async changePageSizeGlobal(e, link, data) {
      this.current = 0;
      if (this.$route.query.pageSize != e) {
        await this.$router.replace({
          path: this.$route.path,
          hash: this.$route.hash,
          query: {
            ...this.$route.query,
            page: this.current,
            pageSize: e,
          },
        });
        this[data]();
      }
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    },
    async changePagination(val, dataFunc) {
      if (this.$route.query.page != val) {
        await this.$router.replace({
          path: this.$route.path,
          hash: this.$route.hash,
          query: {
            ...this.$route.query,
            page: val,
            pageSize: this.params.pageSize,
          },
        });
        this[dataFunc]();
      }
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    },
    async getFirstData(dataFunc) {
      if (
        !Object.keys(this.$route.query).includes("page") ||
        !Object.keys(this.$route.query).includes("pageSize")
      ) {
        await this.$router.replace({
          path: this.$route.path,
          hash: this.$route.hash,
          query: {
            ...this.$route.query,
            page: this.params.page,
            pageSize: this.params.pageSize,
          },
        });
      }
      this[dataFunc]();
      this.current = Number(this.$route.query.page);
      this.params.pageSize = Number(this.$route.query.pageSize);
    },
    async __DELETE_GLOBAL(id, link, message, data) {
      try {
        await this.$store.dispatch(link, id);
        this.notification("success", "success", message);
        data && this[data]();
      } catch (e) {
        this.statusFunc(e.response);
      }
    },
    notification(type, message, desc) {
      this.$notification[type]({
        message: message,
        description: desc,
      });
    },
    statusFunc(res) {
      switch (res.status) {
        case 422:
          this.notification(
            "error",
            "Error",
            "Указанные данные недействительны."
          );
          break;
        case 500:
          this.notification("error", "Error", "Cервер не работает");
          break;
        case 404:
          this.notification(
            "error",
            "Error",
            "Нет результатов запроса для модели"
          );
          break;
        default:
          this.notification("error", "Error", "Нет результатов запроса");
      }
    },
  },
  watch: {
    routerSearch(val) {
      if (val) {
      }
    },
  },
};
