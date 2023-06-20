<template>
  <div
    class="account-login account-register d-flex justify-content-center align-items-center"
  >
    <div class="mark-t8-2022"></div>
    <div class="form-login">
      <a href="http://landing.thuongdo.vn/" class="exit-912391">
        <img src="@/static/icon/login/exit.svg" alt="" />
      </a>
      <div class="title-wrap">
        <span class="title-1 active">Đăng ký</span>
        <span class="line">/</span>
        <span class="title-1" @click="toRegister()">Đăng nhập</span>
      </div>
      <div class="form-content">
        <div class="input-fake-091232">
          <input name="hidden" type="text" />
          <input name="hidden2" type="password" />
          <div class="make-fake-0122022"></div>
        </div>
        <div class="item-input d-flex align-items-center">
          <div class="image d-flex justify-content-center align-items-center">
            <img src="@/static/icon/login/email.svg" alt="" />
          </div>
          <input
            type="text"
            v-model="userInfo.name"
            placeholder="Họ và tên (*)"
            ref="myInput"
          />
        </div>
        <div class="item-input d-flex align-items-center">
          <div class="image d-flex justify-content-center align-items-center">
            <img src="@/static/icon/login/phone.svg" alt="" />
          </div>
          <input
            type="text"
            v-model="userInfo.phone_number"
            placeholder="Số điện thoại (*)"
          />
        </div>
        <div class="item-input d-flex align-items-center">
          <div class="image d-flex justify-content-center align-items-center">
            <img src="@/static/icon/login/mail.svg" alt="" />
          </div>
          <input
            type="text"
            v-model="userInfo.email"
            placeholder="Email - Thư điện tử (*)"
            autocomplete="off"
          />
        </div>
        <div class="item-input d-flex align-items-center">
          <div class="image d-flex justify-content-center align-items-center">
            <img src="@/static/icon/login/pass.svg" alt="" />
          </div>
          <input
            type="password"
            v-model="userInfo.password"
            placeholder="Mật khẩu (*)"
            autocomplete="off"
          />
        </div>
        <div class="item-input-2">
          <el-select
            v-model="userInfo.warehouse_id"
            placeholder="Chọn kho nhận hàng (*)"
            class="account-register-select-2022"
            popper-class="account-register-select-popper-2022"
          >
            <el-option
              v-for="item in warehouses"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </div>
        <div class="item-input-2">
          <el-select
            v-model="userInfo.service"
            placeholder="Chọn dịch vụ (*)"
            class="account-register-select-2022"
            popper-class="account-register-select-popper-2022"
          >
            <el-option
              v-for="item in services"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </div>
      </div>
      <div class="forgot d-flex justify-content-between align-items-center">
        <el-checkbox v-model="checked"
          >Tôi đã đọc và đồng ý với điều khoản của Thương Đô (*)</el-checkbox
        >
      </div>
      <div class="d-flex justify-content-center align-items-center">
        <div
          class="login-button d-flex justify-content-center align-items-center"
          @click="submitForm()"
        >
          <span v-if="!canSubmit"><i class="el-icon-loading"></i></span>
          <span v-else>Đăng ký</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
// import ls from "local-storage";
import { mapActions, mapGetters } from "vuex";
export default {
  name: "AccountRegister",
  metaInfo() {
    return {
      title: "Đăng ký",
    };
  },
  components: {},
  data() {
    return {
      canSubmit: true,
      userInfo: {
        email: "",
        password: "",
        name: "",
        phone_number: "",
        warehouse_id: "",
        service: "",
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
    if (this.logged) {
      this.$router.push({ name: "home-index" });
    }
    this.fetchDelivery();
    setTimeout(() => {
      this.userInfo.email = "";
      this.userInfo.password = "";
    }, 200);
  },
  methods: {
    ...mapActions("account", ["getAccountInfo"]),
    fetchDelivery() {
      this.loading = true;
      axios.get("warehouse/vi").then((response) => {
        this.loading = false;
        switch (response.code) {
          case 200:
            this.warehouses = response.data;
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
    // Lưu dữ liệu
    submitForm() {
      if (this.checked == false) {
        this.$notify({
          title: "Có lỗi xảy ra",
          message: "Vui lòng chấp nhận với điều khoản của Thương Đô",
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
      axios.post("/auth/sign-up/", this.userInfo).then((response) => {
        this.canSubmit = true;
        switch (response.code) {
          case 200:
            // ls("authen", response);
            this.$notify({
              title: "Thành công",
              message: "Đăng ký thành công",
              type: "success",
            });
            // this.getAccountInfo();
            this.$router.push({ name: "account-login" });
            break;
          case 400:
            this.$notify({
              title: "Đăng ký thất bại",
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

.account-register-select-2022 {
  width: 100%;
}
.account-register-select-2022 input {
  border: 1px solid #f2f2f2;
  border-radius: 1px;
  width: 100%;
  font-size: 13px;
}
.account-register-select-2022 input::-webkit-input-placeholder {
  font-weight: 300;
  color: #333333;
  font-size: 12px;
}
.account-register-select-2022 input::-moz-placeholder {
  font-weight: 300;
  color: #333333;
  font-size: 12px;
}
.account-register-select-2022 input::-ms-input-placeholder {
  font-weight: 300;
  color: #333333;
  font-size: 12px;
}
.account-register-select-popper-2022 .el-select-dropdown__item {
  font-size: 13px;
}
.account-register-select-popper-2022 .el-select-dropdown__item.selected {
  color: #015d71;
}

.account-register-select-2022 .el-icon-arrow-up:before {
  content: "\e78f";
}
.account-register-select-2022 .el-icon-arrow-down:before {
  content: "\e790";
}
</style>
