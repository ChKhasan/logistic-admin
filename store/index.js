export const state = () => ({
  authenticated: false,
  services: [],
  orders: {
    new: "0",
    in_process: "0",
    accepted: "0",
    canceled: "0",
    all: "0",
    is_edited: "0",
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
      payload.in_process + payload.accepted + payload.canceled + payload.new;
    state.orders.new = payload.new;
    state.orders.in_process = payload.in_process ? payload.in_process : 0;
    state.orders.accepted = payload.accepted;
    state.orders.canceled = payload.canceled;
    state.orders.is_edited = payload.edited;
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
    // const res = await this.$axiosInstance.$get(`/api/admin/orders/counts`, {});
    // commit("orders", res?.counts);
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
