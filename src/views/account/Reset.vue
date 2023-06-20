<template>
  <div
    class="account-login account-register account-forgot d-flex justify-content-center align-items-center"
  >
    <div class="mark-t8-2022"></div>
    <div class="form-login">
      <a href="http://landing.thuongdo.vn/" class="exit-912391">
        <img src="@/static/icon/login/exit.svg" alt="" />
      </a>
      <div class="title-wrap">
        <span class="title-1">Tạo mật khẩu mới</span>
      </div>
      <div class="form-content">
        <div class="input-fake-091232">
          <input name="hidden" type="text" />
          <input name="hidden2" type="password" />
          <div class="make-fake-0122022"></div>
        </div>
        <div class="item-input d-flex align-items-center">
          <div class="image d-flex justify-content-center align-items-center">
            <img src="@/static/icon/login/code.svg" alt="" />
          </div>
          <input
            type="text"
            v-model="modelData.verify_code"
            placeholder="Mã xác thực (*)"
            autocomplete="off"
          />
        </div>
        <div class="item-input d-flex align-items-center">
          <div class="image d-flex justify-content-center align-items-center">
            <img src="@/static/icon/login/pass.svg" alt="" />
          </div>
          <input
            type="password"
            v-model="modelData.password"
            placeholder="Mật khẩu mới (*)"
            autocomplete="off"
          />
        </div>
        <div class="item-input d-flex align-items-center">
          <div class="image d-flex justify-content-center align-items-center">
            <img src="@/static/icon/login/pass.svg" alt="" />
          </div>
          <input
            type="password"
            v-model="modelData.password_re"
            placeholder="Nhập lại mật khẩu mới(*)"
            autocomplete="off"
          />
        </div>
      </div>
      <div class="d-flex justify-content-center align-items-center">
        <div
          class="login-button d-flex justify-content-center align-items-center"
          @click="submitForm()"
        >
          <span v-if="!canSubmit"><i class="el-icon-loading"></i></span>
          <span v-else>Tạo mật khẩu mới</span>
        </div>
      </div>
      <div class="d-flex justify-content-center align-items-center">
        <span class="go-back-login" @click="toGoBack">Về trang đăng nhập</span>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
// import ls from "local-storage";
import { mapActions, mapGetters } from "vuex";
export default {
  name: "AccountReset",
  metaInfo() {
    return {
      title: "Tạo mật khẩu mới",
    };
  },
  components: {},
  data() {
    return {
      canSubmit: true,
      modelData: {
        verify_code: "",
        password: "",
        password_re: "",
      },
      checked: true,
      services: [
        {
          value: 1,
          label: "Ký gửi",
        },
        {
          value: 0,
          label: "Đặt hàng",
        },
      ],
      warehouses: [],
    };
  },
  computed: {
    ...mapGetters("account", ["logged", "accountInfo"]),
  },
  mounted() {
    this.$refs.myInput.focus();
  },
  methods: {
    ...mapActions("account", ["getAccountInfo"]),
    // Lưu dữ liệu
    submitForm() {
      if (this.modelData.verify_code == "") {
        this.$notify({
          title: "Có lỗi xảy ra",
          message: "Vui lòng nhập mã xác nhận ở email",
          type: "warning",
        });
        return;
      }
      if (this.modelData.password == "") {
        this.$notify({
          title: "Có lỗi xảy ra",
          message: "Vui lòng nhập mật khẩu mới",
          type: "warning",
        });
        return;
      }
      if (this.modelData.password_re == "") {
        this.$notify({
          title: "Có lỗi xảy ra",
          message: "Vui lòng nhập lại mật khẩu mới",
          type: "warning",
        });
        return;
      }
      if (this.modelData.password_re !== this.modelData.password) {
        this.$notify({
          title: "Có lỗi xảy ra",
          message: "Mật khẩu xác nhận không trùng khớp",
          type: "warning",
        });
        return;
      }
      if (this.canSubmit) {
        this.storeModel();
      }
    },
    storeModel() {
      this.canSubmit = false;
      let data = {
        email: this.$route.params.email,
        verify_code: this.modelData.verify_code,
        password: this.modelData.password,
      };
      axios.post("/auth/change-password/", data).then((response) => {
        this.canSubmit = true;
        switch (response.code) {
          case 200:
            // ls("authen", response);
            this.$notify({
              title: "Thành công",
              message: "Đổi mật khẩu thành công",
              type: "success",
            });
            this.$router.push({ name: "account-login" });
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
              title: "Có lỗi xảy ra",
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
      this.$router.push({ name: "account-login" });
    },
    toGoBack() {
      this.$router.push({ name: "account-login" });
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
  background: #fff;
  border-radius: 0px;
  padding: 45px 45px;
  padding-top: 45px;
  padding-bottom: 45px;
  position: absolute;
}
.title-wrap {
  margin-bottom: 30px;
  text-align: center;
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
.form-content .item-input-2 {
  margin-top: 15px;
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
  /*margin-top: 40px;*/
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

/*Ẩn đi input autofill*/
/*https://stackoverflow.com/questions/15738259/disabling-chrome-autofill*/
.input-fake-091232 {
  position: relative;
}
.input-fake-091232 input {
  height: 1px;
}
.make-fake-0122022 {
  position: absolute;
  top: 0;
  background-color: #fff;
  width: 100%;
  height: 100%;
}
.title-wrap {
  margin-bottom: 12px;
}

/* Quay lại trang cũ*/
.go-back-login {
  margin-top: 15px;
  display: inline-block;
  cursor: pointer;
}
.account-forgot .title-wrap {
  margin-bottom: 0px;
}
</style>
