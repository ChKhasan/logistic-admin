<template lang="html">
  <div class="order-links-grid">
    <nuxt-link
      class="order-links"
      :class="{ 'active-orders': $route.params.status == 'new' }"
      to="/orders/new"
    >
      <span class="order-green"></span> Новый ({{ `${$store.state.orders.newCount}` }})
    </nuxt-link>
    <nuxt-link
      class="order-links"
      :class="{ 'active-orders': $route.params.status == 'all-orders' }"
      to="/orders/all-orders"
    >
      <span class="order-light-blue"></span> Все заказы ({{
        `${$store.state.orders.all}`
      }})
    </nuxt-link>
    <nuxt-link
      class="order-links"
      :class="{ 'active-orders': $route.params.status == 'completed' }"
      to="/orders/completed"
    >
      <span class="order-blue"></span> Завершенный ({{
        `${$store.state.orders.completed}`
      }})
    </nuxt-link>
    <nuxt-link
      class="order-links"
      :class="{ 'active-orders': $route.params.status == 'process' }"
      to="/orders/process"
    >
      <span class="order-black"></span> В процессе ({{
        `${$store.state.orders.processCount}`
      }})
    </nuxt-link>

    <nuxt-link
      class="order-links"
      :class="{ 'active-orders': $route.params.status == 'canceled_by_executor' }"
      to="/orders/canceled_by_executor"
    >
      <span class="order-yellow"></span> Отмена - исполнителем ({{
        `${$store.state.orders.canceledByExecutorCount}`
      }})
    </nuxt-link>
    <nuxt-link
        class="order-links"
        :class="{ 'active-orders': $route.params.status == 'canceled_by_admin' }"
        to="/orders/canceled_by_admin"
    >
      <span class="order-red"></span> Отмена - модератор({{
        `${$store.state.orders.canceledByAdminCount}`
      }})
    </nuxt-link>
    <nuxt-link
      class="order-links"
      :class="{ 'active-orders': $route.params.status == 'canceled_by_consumer' }"
      to="/orders/canceled_by_consumer"
    >
      <span class="order-red"></span> Отмена - клиент({{
        `${$store.state.orders.canceledByConsumerCount}`
      }})
    </nuxt-link>
  </div>
</template>
<script>
export default {};
</script>
