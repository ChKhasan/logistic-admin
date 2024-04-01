<template lang="html">
  <div class="calendar-order-card">
    <div class="calendar-order-card-left">
      <h6>{{ order?.name }}</h6>
      <div class="calendar-order-card-services" v-for="service in order?.data">
        <span>{{ service?.name }}</span>
        <p>{{ service?.count }} x</p>
      </div>
    </div>
    <div class="calendar-order-card-center">
      <span
        > no билета
        <p>{{ order?.id }}</p>
      </span>
      <h6>{{ order?.general_order?.client?.name }}</h6>
      <!-- <h5>Ручной бронь</h5> -->
    </div>
    <div class="calendar-order-card-right">
      <div class="column-btns" v-if="checkAccess('orders', 'put')">
        <span>
          <span
            class="action-btn mx-3"
            v-html="eyeIcon"
            @click="$router.push(`/orders/order/${order.general_order_id}`)"
          >
          </span>
          <span
            class="action-btn"
            v-html="editIcon"
            @click="$router.push(`/orders/order/${order.general_order_id}`)"
          >
          </span>
        </span>
      </div>
    </div>
  </div>
</template>
<script>
import authAccess from "../../mixins/authAccess";

export default {
  props: ["order"],
  mixins: [authAccess],
  data() {
    return {
      eyeIcon: require("../../assets/svg/Eye.svg?raw"),
      editIcon: require("../../assets/svg/edit.svg?raw"),
      deleteIcon: require("../../assets/svg/delete.svg?raw"),
    };
  },
};
</script>
<style lang=""></style>
