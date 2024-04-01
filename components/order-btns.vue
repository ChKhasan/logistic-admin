<template lang="html">
  <div class="order-links-grid">
    <nuxt-link
      class="order-links"
      :class="{ 'active-orders': $route.params.status == 'new' }"
      to="/orders/new"
    >
      <span class="order-green"></span> Новый ({{ `${$store.state.orders.all}` }})
    </nuxt-link>
    <nuxt-link
      class="order-links"
      :class="{ 'active-orders': $route.params.status == 'all-orders' }"
      to="/orders/all-orders"
    >
      <span class="order-light-blue"></span> Все заказы ({{
        `${$store.state.orders.new}`
      }})
    </nuxt-link>
    <nuxt-link
      class="order-links"
      :class="{ 'active-orders': $route.params.status == 'completed' }"
      to="/orders/completed"
    >
      <span class="order-blue"></span> Завершенный ({{
        `${$store.state.orders.in_process}`
      }})
    </nuxt-link>
    <nuxt-link
      class="order-links"
      :class="{ 'active-orders': $route.params.status == 'process' }"
      to="/orders/process"
    >
      <span class="order-black"></span> В процессе ({{
        `${$store.state.orders.accepted}`
      }})
    </nuxt-link>

    <nuxt-link
      class="order-links"
      :class="{ 'active-orders': $route.params.status == 'canceled_by_executor' }"
      to="/orders/canceled_by_executor"
    >
      <span class="order-yellow"></span> Отмена - модератор ({{
        `${$store.state.orders.is_edited}`
      }})
    </nuxt-link>
    <nuxt-link
      class="order-links"
      :class="{ 'active-orders': $route.params.status == 'canceled_by_consumer' }"
      to="/orders/canceled_by_consumer"
    >
      <span class="order-red"></span> Отмена - клиент({{
        `${$store.state.orders.canceled}`
      }})
    </nuxt-link>
  </div>
</template>
<script>
export default {};
</script>
