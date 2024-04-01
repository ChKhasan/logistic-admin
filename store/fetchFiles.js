export const actions = {
    async postDeleteFile({}, payload) {
        return this.$axiosInstance.post(`/api/delete-file`, {
            ...payload,
        });
    },

};

