export const state = () => ({
  authenticated: false,
  services: [],
  orders: {
    canceledByAdminCount: 0,
    canceledByConsumerCount: 0,
    canceledByExecutorCount: 0,
    completed: 0,
    newCount: 0,
    processCount: 0,
    all: 0
  },
  permissions: [],
  operator: {
    name: "",
  },
});
export const mutations = {
  logIn(state) {
    state.authenticated = true;
  },
  logOut(state) {
    state.authenticated = false;
  },
  services(state, payload) {
    state.services = payload;
  },
  orders(state, payload) {
    state.orders.all =
      payload.canceledByAdminCount + payload.canceledByConsumerCount + payload.canceledByExecutorCount + payload.newCount + payload.processCount + payload.completed;

    state.orders.canceledByAdminCount = payload.canceledByAdminCount;
    state.orders.canceledByConsumerCount = payload.canceledByConsumerCount;
    state.orders.canceledByExecutorCount = payload.canceledByExecutorCount;
    state.orders.newCount = payload.newCount;
    state.orders.processCount = payload.processCount;
    state.orders.completed = payload.completed;
  },
  permissions(state, payload) {
    if (payload) {
      state.permissions = payload.map((item) => {
        return {
          ...item,
          pivot: {
            ...item.pivot,
            actions: JSON.parse(item.pivot.actions),
          },
        };
      });
    }
  },
  findPermissions(state, payload) {
    const target = state.permissions.find((item) => item.url == "services");
    return target.pivot.actions.includes("get");
  },
  takeOperatorName(state, payload) {
    state.operator = payload;
  },
};
export const actions = {
  async getOrders({ commit }, payload) {
    const res = await this.$axiosInstance.$get(`/api/admin/orders/countByStatus`, {});
    commit("orders", res);
  },
  async getPermissions({ commit }, payload) {
    try {
      // const res = await this.$axiosInstance.$post(`/api/admin/auth/me`);
      // commit("permissions", res?.me?.role?.permissions);
      // commit("takeOperatorName", res?.me);
    } catch (e) {
      // localStorage.removeItem("auth_token");
    }
  },
};
