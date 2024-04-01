<template lang="html">
  <div class="calendar-day-card">
    <div class="calendar-day-card-header">
      <p>{{ day[0]?.date }}</p>
      <span>Вторник</span>
    </div>
    <div class="calendar-day-card-body">
      <div class="calendar-day-card-body-list" v-for="(info, index) in day" :key="index">
        <div class="time">{{ info?.session ? info?.session : "----" }}</div>
        <div class="name">{{ info?.tariff_name?.ru }}</div>
        <!-- <div class="info">
          <span v-if="info?.max_clients">{{ info?.booked }}asd{{ info?.max_clients }}</span
          >/{{ info?.max_clients ? info?.max_clients : "null" }}
        </div> -->
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ["day"],
};
</script>
<style lang=""></style>
