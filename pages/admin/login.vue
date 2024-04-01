<template lang="html">
  <div class="login_container">
    <div class="login_block">
      <div class="login_header mb-10">
        <h1 class="mb-3">Sign In</h1>
      </div>
      <div class="login_form">
        <a-form-model :model="form" ref="ruleForm" :rules="rules" layout="vertical">
          <div class="login_input mb-10">
            <label for="">Имя пользователя</label>
            <a-form-model-item prop="email" class="mb-0">
              <a-input
                @keyup.enter="login"
                type="text"
                class="input"
                placeholder="email"
                v-model="form.email"
              />
            </a-form-model-item>
            <!-- <input type="text" class="input" v-model="form.username" /> -->
          </div>
          <div class="login_input mb-10">
            <div class="d-flex justify-content-between">
              <label for="">Пароль</label>
              <!-- <nuxt-link to="/">Forgot Password ?</nuxt-link> -->
            </div>
            <!-- <input type="password" class="input" v-model="form.password" /> -->
            <a-form-model-item prop="password" class="mb-0">
              <a-input-password
                @keyup.enter="login"
                placeholder="Password"
                type="password"
                class="input"
                v-model="form.password"
              />
            </a-form-model-item>
          </div>
        </a-form-model>
        <transition name="slide-fade">
          <span class="mb-3 d-block" style="margin-top: -15px">
            <a-alert
              v-if="showError"
              message="Пароль или логин неверный"
              type="error"
              closable
              show-icon
              :after-close="handleClose"
            />
          </span>
        </transition>
      </div>
      <button class="login_btn d-flex justify-content-center" @click="login">
        Continue
      </button>
    </div>
  </div>
</template>
<script>
import status from "../../mixins/status";
import CodeInput from "vue-verification-code-input";
import global from "../../mixins/global";
export default {
  layout: "empty",
  middleware: "login",
  mixins: [status, global],
  data() {
    return {
      showError: false,
      rules: {
        email: [{ required: true, message: "This field is required", trigger: "change" }],
        password: [
          { required: true, message: "This field is required", trigger: "change" },
        ],
      },
      form: {
        email: "",
        password: "",
      },
    };
  },
  methods: {
    handleClose() {},
    async __AUTH(data) {
      try {
        const res = await this.$store.dispatch("fetchAuth/auth", data);
        console.log(res);
        localStorage.setItem("auth_token", res.content.accessToken);
        this.$store.commit("logIn");
        this.$router.push("/");
      } catch (e) {
        this.showError = true;
      }
    },
    login() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.__AUTH(this.form);
        }
      });
    },
  },
  components: {
    CodeInput,
  },
};
</script>
<style lang="css">
@import "../../assets/css/pages/login.css";
.slide-fade-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}
.login_input .ant-input {
  height: auto;
}
</style>
