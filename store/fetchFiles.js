export const actions = {
    async postDeleteFile({}, payload) {
        const formData = new URLSearchParams();
        for (const key in payload) {
            formData.append(key, payload[key]);
        }
        return this.$axiosInstance.post(`/api/files/delete`, {
            ...payload,
        },{
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
        });
    },

};

