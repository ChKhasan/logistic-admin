export default function ({ $axios, redirect, error }, inject) {
  console.log(process.env.BASE_URL);
  const axios = $axios.create({
    baseURL: process.env.BASE_URL || "https://test-api.hirelancer.ndc.uz",
  });
  axios.setHeader("Content-Type", "application/json");

  axios.onRequest((config) => {
    return config;
  });

  axios.onResponse((response) => {
    return response;
  });
  axios.onError((err) => {
    // const errors = [404, 500];
    // if (errors.includes(err.response.status)) {
    //   error({
    //     statusCode: err.response.status,
    //     message: "This page could not be found",
    //     layout: "error",
    //   });
    // }
    return Promise.reject(err);
  });
  inject("axios", axios);
}
