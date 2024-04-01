export default ({ $axios, redirect, error }, inject) => {
  const tokenKey = "auth_token";
  const axiosInstance = $axios.create({
    baseURL: process.env.BASE_URL || 'https://test-api.hirelancer.ndc.uz',
  });
  // axiosInstance.setHeader("Content-Type", "application/json");

  axiosInstance.onRequest((config) => {
    const token = localStorage.getItem(tokenKey);
    if (token) {
      config.headers.common["Authorization"] = `Bearer ${token}`;
    }
    return config;
  });
  axiosInstance.onResponse((response) => {
    return response;
  });

  axiosInstance.onError(async (e) => {
    if(e.response.status === 401) {
      localStorage.removeItem(tokenKey);
      redirect('/admin/login')
    }
    return Promise.reject(e);
  });
  inject("axiosInstance", axiosInstance);
};
