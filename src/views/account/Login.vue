<template>
  <div class="account-login d-flex justify-content-center align-items-center">
    <div class="mark-t8-2022"></div>
    <div class="form-login">
      <a href="http://landing.thuongdo.vn/" class="exit-912391">
        <img src="@/static/icon/login/exit.svg" alt="" />
      </a>
      <div class="title-wrap">
        <span class="title-1" @click="toRegister()">Đăng ký</span>
        <span class="line">/</span>
        <span class="title-1 active">Đăng nhập</span>
      </div>
      <div class="form-content">
        <div class="item-input d-flex align-items-center">
          <div class="image d-flex justify-content-center align-items-center">
            <img src="@/static/icon/login/email.svg" alt="" />
          </div>
          <input
            type="text"
            v-model="userInfo.email"
            placeholder="Số điện thoại hoặc email"
            ref="myInput"
          />
        </div>
        <div class="item-input d-flex align-items-center">
          <div class="image d-flex justify-content-center align-items-center">
            <img src="@/static/icon/login/pass.svg" alt="" />
          </div>
          <input
            type="password"
            v-model="userInfo.password"
            placeholder="Mật khẩu"
          />
        </div>
      </div>
      <div class="forgot d-flex justify-content-between align-items-center">
        <el-checkbox v-model="checked">Duy trì đăng nhập</el-checkbox>
        <span @click="toForgotPassword()">Quên mật khẩu?</span>
      </div>
      <div class="d-flex justify-content-center align-items-center">
        <div
          class="login-button d-flex justify-content-center align-items-center"
          @click="submitForm()"
        >
          <span v-if="!canSubmit"><i class="el-icon-loading"></i></span>
          <span v-else>Đăng nhập</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import ls from "local-storage";
import { mapActions, mapGetters } from "vuex";
export default {
  name: "AccountLogin",
  metaInfo() {
    return {
      title: "Đăng nhập",
    };
  },
  components: {},
  data() {
    return {
      canSubmit: true,
      userInfo: {
        email: "",
        password: "",
      },
      checked: true,
    };
  },
  computed: {
    ...mapGetters("account", ["logged", "accountInfo"]),
  },
  mounted() {
    this.$refs.myInput.focus();
    if (this.logged) {
      this.$router.push({ name: "home-index" });
    }
  },
  methods: {
    ...mapActions("account", ["getAccountInfo"]),
    // Lưu dữ liệu
    submitForm() {
      if (this.canSubmit) {
        this.storeModel();
      }
    },
    storeModel() {
      this.canSubmit = false;
      let data = {
        username: this.userInfo.email,
        password: this.userInfo.password,
      };
      axios.post("auth/sign-in", data).then((response) => {
        this.canSubmit = true;
        switch (response.code) {
          case 200:
            ls("authen", response);
            this.$notify({
              title: "Thành công",
              message: "Đăng nhập thành công",
              type: "success",
            });
            this.setCookie("x-client", JSON.stringify(response.data), 365);
            this.getAccountInfo();
            break;
          case 400:
            this.$notify({
              title: "Đăng nhập thất bại",
              message: response.errors[0],
              type: "warning",
            });
            break;
          case 422:
            this.$notify({
              title: "Có lỗi xảy ra",
              message: Object.values(response.data)[0],
              type: "warning",
            });
            break;
          case 500:
            this.$notify({
              title: "Đăng nhập thất bại",
              message: response.message,
              type: "warning",
            });
            break;
          default:
            this.$notify.error({
              title: "Error",
              message: "Đã có lỗi xảy ra. Vui lòng liên hệ Admin !",
            });
            break;
        }
      });
    },

    toRegister() {
      this.$router.push({ name: "account-register" });
    },

    toForgotPassword() {
      this.$router.push({ name: "account-forgot-password" });
    },

    setCookie(cname, cvalue, exdays) {
      var d = new Date();
      d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
      var expires = "expires=" + d.toUTCString();
      document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    },
  },
  watch: {
    logged() {
      if (this.logged) {
        this.$router.push({ name: "home-index" });
      }
    },
  },
};
</script>

<style lang="css" scoped>
.account-login {
  height: 100vh;
  background-color: #f6f6f6;
  background-image: url("@/static/images/login/banner-4.jpeg");
  background-size: cover;
  background-repeat: no-repeat;
}
.mark-t8-2022 {
  width: 100%;
  height: 100%;
  background-color: #000;
  opacity: 0.75;
}
.form-login {
  width: 320px;
  height: 400px;
  background: #fff;
  border-radius: 0px;
  padding: 45px 45px;
  padding-top: 45px;
  padding-bottom: 45px;
  position: absolute;
}
.title-wrap {
  margin-bottom: 30px;
}
.title-wrap .title-1 {
  font-size: 25px;
  cursor: pointer;
  font-weight: 400;
  color: #333333;
}
.title-wrap .title-1.active {
  border-bottom: 2px solid #084c94;
  padding-bottom: 5px;
  color: #084c94;
}
.title-wrap .line {
  margin: 0px 10px;
  font-size: 25px;
}

.form-content .item-input {
  border-bottom: 1px solid #f2f2f2;
  padding-bottom: 10px;
  margin-top: 10px;
}
.form-content .item-input .image {
  width: 40px;
}
.form-content .item-input .image img {
  width: 18px;
}
.form-content .item-input .image-2 img {
  width: 14px;
}
.form-content .item-input input {
  width: 100%;
  height: 25px;
  border: none;
  font-size: 12px;
  color: #333333;
}
.form-content .item-input input:focus {
  outline: none;
}

.forgot {
  margin-top: 18px;
}
.forgot span {
  color: #333333;
  font-weight: 300;
  font-size: 12px;
  display: inline-block;
  cursor: pointer;
}
.forgot span:hover {
  color: #054474;
}

.login-button {
  margin-top: 20px;
  background: #ffbf00;
  border-radius: 8px;
  color: #00347f;
  padding: 10px;
  cursor: pointer;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  -o-user-select: none;
  user-select: none;
  /*margin: 30px 81px 0px 81px;*/
  width: 200px;
  font-weight: bold;
  margin-top: 40px;
}
.login-button:hover {
  background: #e5ad08;
}
.login-button:active {
  background: #e5ad08;
}

/*Nút exit*/
.exit-912391 {
  position: absolute;
  right: 15px;
  top: 10px;
  cursor: pointer;
}
</style>

<style type="text/css">
.account-login .el-checkbox__label {
  color: #333333;
  font-weight: 300;
  font-size: 12px;
  display: inline-block;
  cursor: pointer;
  margin-left: -2px;
}
.account-login .el-checkbox__input.is-checked + .el-checkbox__label {
  color: #333333;
}
.account-login .el-checkbox__input.is-checked .el-checkbox__inner,
.account-login .el-checkbox__input.is-indeterminate .el-checkbox__inner {
  background: #fff;
  border-color: #f4f4f4;
}
.account-login .el-checkbox__inner::after {
  border-color: #000;
}
</style>
