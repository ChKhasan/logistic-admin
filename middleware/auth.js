export default function ({ store, redirect, route }) {
  // const publicPages = ["galleries1"];
  // const authpage = publicPages.includes(route.name);
  const token = localStorage.getItem("auth_token");
  // if (!store.state.authenticated) redirect("/admin/login");
  if (!token) redirect("/admin/login");
}
