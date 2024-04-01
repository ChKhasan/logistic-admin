<template lang="html">
  <div class="calendar-day-card">
    <div class="calendar-day-card-header">
      <a-skeleton :paragraph="false" style="width: 70px" :title="{ width: 70 }" />
      <a-skeleton :paragraph="false" style="width: 70px" :title="{ width: 70 }" />
    </div>
    <div class="calendar-day-card-body">
      <div class="calendar-day-card-body-list">
        <a-skeleton :paragraph="false" :title="{ width: 100 }" />
        <a-skeleton :paragraph="false" :title="{ width: 100 }" />
        <a-skeleton :paragraph="false" :title="{ width: 100 }" />
      </div>
      <div class="calendar-day-card-body-list">
        <a-skeleton :paragraph="false" :title="{ width: 100 }" />
        <a-skeleton :paragraph="false" :title="{ width: 100 }" />
        <a-skeleton :paragraph="false" :title="{ width: 100 }" />
      </div>
      <div class="calendar-day-card-body-list">
        <a-skeleton :paragraph="false" :title="{ width: 100 }" />
        <a-skeleton :paragraph="false" :title="{ width: 100 }" />
        <a-skeleton :paragraph="false" :title="{ width: 100 }" />
      </div>
    </div>
  </div>
</template>
<script>
export default {};
</script>
<style lang="css">
.ant-skeleton-title {
  margin-top: 0 !important;
}
</style>
