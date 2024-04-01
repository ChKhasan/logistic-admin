export default {
  methods: {
    statusFunc(res) {
      if (res.response) {
        switch (res.response.status) {
          case 422:
            this.notification(
              "error",
              "Error",
              "Указанные данные недействительны."
            );
            break;
          case 500:
            this.notification("error", "Error", "Внутренняя ошибка сервера");
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
      } else {
        this.notification("error", "Error", "Внутренняя ошибка сервера.");
      }
    },
    notification(type, message, desc) {
      this.$notification[type]({
        message: message,
        description: desc,
      });
    },
  },
};
