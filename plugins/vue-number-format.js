import Vue from "vue";
import VueNumberFormat from "@coders-tm/vue-number-format";

// register directive v-number and component <number>
Vue.use(VueNumberFormat, { precision: 4 });
