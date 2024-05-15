export default function ({ store, redirect, route }) {
  const token = localStorage.getItem("auth_token");
  if (!token) redirect("/admin/login");
}
