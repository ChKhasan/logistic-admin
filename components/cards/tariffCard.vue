<template lang="html">
  <div class="seans-card">
    <div class="seans-card-header d-flex justify-content-between">
      <div class="d-flex">
        <h5>{{ tariff?.name?.ru }}</h5>
        <span>{{ tariff?.subtitle?.ru }}</span>
      </div>
      <div class="column-btns">
        <span>
          <span
            v-if="checkAccess('tariffs', 'put')"
            class="action-btn"
            @click="$router.push(`/edit_tariff/${tariff?.id}`)"
            v-html="editIcon"
          >
          </span>
          <a-popconfirm
            v-if="checkAccess('tariffs', 'delete')"
            title="Are you sure delete this tariff?"
            ok-text="Yes"
            cancel-text="No"
            @confirm="deletePoduct(tariff?.id)"
          >
            <span class="action-btn" v-html="deleteIcon"> </span>
          </a-popconfirm>
        </span>
      </div>
    </div>
    <div class="seans-card-body">
      <span v-if="tariff.type == 'by_count'"
        >Minimum: {{ tariff.min_clients }}, Maximum: {{ tariff.max_clients }}</span
      >
    </div>
  </div>
</template>
<script>
import global from "../../mixins/global";
import authAccess from "../../mixins/authAccess";

export default {
  props: {
    tariff: {
      type: Object,
    },
    reloadTariff: {
      type: Function,
    },
  },
  mixins: [global, authAccess],
  data() {
    return {
      editIcon: require("../../assets/svg/edit.svg?raw"),
      deleteIcon: require("../../assets/svg/delete.svg?raw"),
    };
  },
  methods: {
    async deletePoduct(id) {
      await this.__DELETE_GLOBAL(
        id,
        "fetchTariff/deleteTariff",
        "Тариф был успешно удален"
      );
      if (this.reloadTariff) {
        this.reloadTariff();
      }
    },
  },
};
</script>
