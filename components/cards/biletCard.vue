<template lang="html">
  <div class="bilet-card">
    <div class="bilet-card-header">
      <h5>Полет на воздушном шаре</h5>
      <div class="d-flex">
        <span class="bilet-card-header-text"
          >Номер билета:
          <p>{{ orderIn.id }}</p></span
        >
        <div class="column-btns">
          <span>
            <a
              :href="`https://api.safarpark.uz/api/orders/${orderIn.id}/get_ticket`"
              class="action-btn"
              download
              v-if="isPaid"
              @click.prevent="
                downloadItem(
                  `https://api.safarpark.uz/api/orders/${orderIn.id}/get_ticket`
                )
              "
              v-html="ticketIcon"
            >
            </a>
            <span class="action-btn" v-html="editIcon"> </span>
          </span>
        </div>
      </div>
    </div>
    <div class="bilet-card-body flex-column">
      <div class="d-flex" v-for="(dataIn, index) in orderIn.data" :key="index">
        <div class="bilet-card-services">
          <span>{{ dataIn?.name }}</span>
        </div>
        <p>
          <span>{{ dataIn.count }} x </span>
          {{ dataIn.price }} сум
        </p>
      </div>
    </div>
    <div class="bilet-card-footer">
      <div class="d-flex align-items-center">
        <span>Заказ на:</span>
        <div>
          {{ moment(orderIn.created_at).format("DD.MM.YYYY") }}
          <span v-if="orderIn.session">{{ orderIn.session }}</span>
        </div>
      </div>
      <h6>{{ orderIn.amount }} сум</h6>
    </div>
  </div>
</template>
<script>
import moment from "moment";
import status from "../../mixins/status";
export default {
  props: ["orderIn", "isPaid"],
  mixins: [status],
  data() {
    return {
      ticketIcon: require("../../assets/svg/ticket.svg?raw"),
      editIcon: require("../../assets/svg/edit.svg?raw"),
    };
  },
  methods: {
    moment,
    downloadItem(url) {
      this.$axios
        .$get(url, { responseType: "blob" })
        .then((response) => {
          const blob = new Blob([response.data], { type: "application/pdf" });
          const link = document.createElement("a");
          link.href = URL.createObjectURL(blob);
          link.download = "Safar park ticket";
          link.click();
          URL.revokeObjectURL(link.href);
        })
        .catch((err) => {
          this.statusFunc(err);
        });
    },
  },
};
</script>
<style lang=""></style>
