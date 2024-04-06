export const actions = {
  async getCompanies({}, payload) {
    return await this.$axios.$get(`/api/admin/companies`, payload);
  },
  async getCompaniesById({}, id) {
    return await this.$axios.$get(`/api/admin/companies/${id}`);
  },
  async getCompanyOrders({}, {id,params}) {
    return await this.$axios.$get(`/api/admin/companies/${id}/orders`,{params: {...params}});
  },
  async getCompanyOffers({}, {id,params}) {
    return await this.$axios.$get(`/api/admin/companies/${id}/offers`,{params: {...params}});
  },
  async getCompanyComp({}, {id,params}) {
    return await this.$axios.$get(`/api/admin/companies/${id}/complains`,{params: {...params}});
  },
  async getCompanyScore({}, {id,params}) {
    return await this.$axios.$get(`/api/admin/companies/${id}/scores`,{params: {...params}});
  },
  async getCompanyBalances({}, {id,params}) {
    return await this.$axios.$get(`/api/admin/companies/${id}/transactions`,{params: {...params}});
  },
  async postCompanyBalance({}, {id,data}) {
    const formData = new URLSearchParams();
    for (const key in data) {
      formData.append(key, data[key]);
    }
    return await this.$axios.post(`/api/admin/companies/${id}/fillBalance`,formData,{
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
  },
  async patchCompaniestatus({}, {id,data}) {
    const formData = new URLSearchParams();
    for (const key in data) {
      formData.append(key, data[key]);
    }
    return await this.$axios.patch(`/api/admin/companies/${id}/changeStatus`,formData,{
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
  },

};
