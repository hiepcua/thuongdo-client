<template>
  <div class="component-header-top">
    <div class="component-header-top-line"></div>
    <div
      class="component-header-top-item d-flex justify-content-between align-items-center"
    >
      <div class="d-flex align-items-center">
        <div class="logo" @click="nextHome()">
          <img src="@/static/images/logo/thuongdo.svg" />
        </div>
        <div
          class="seach-china d-flex align-items-center"
          :class="showSelectMall ? 'add-border-99' : ''"
        >
          <div
            class="select-mall d-flex align-items-center"
            @click.stop="showSelectMall = true"
            @mouseleave="mouseLeaveSelectMall"
          >
            <div class="image">
              <img
                src="@/static/images/header-top/1688.png"
                v-if="mallActive == 1"
              />
              <img
                src="@/static/images/header-top/baidu.png"
                v-if="mallActive == 2"
              />
              <img
                src="@/static/images/header-top/taobao.png"
                v-if="mallActive == 3"
              />
              <img
                src="@/static/images/header-top/tmall.png"
                v-if="mallActive == 4"
              />
            </div>
            <img src="@/static/icon/header-top/down2.svg" />
            <div class="sub-select-mall" v-if="showSelectMall">
              <div class="image" @click.stop="changeMall(1)">
                <img src="@/static/images/header-top/1688.png" />
              </div>
              <div class="image" @click.stop="changeMall(2)">
                <img src="@/static/images/header-top/baidu.png" />
              </div>
              <div class="image" @click.stop="changeMall(3)">
                <img src="@/static/images/header-top/taobao.png" />
              </div>
              <div class="image" @click.stop="changeMall(4)">
                <img src="@/static/images/header-top/tmall.png" />
              </div>
            </div>
          </div>
          <input
            type="text"
            v-model="search"
            placeholder="Chào bạn, bạn muốn tìm gì hôm nay ?"
          />
          <div class="seach-button">
            <span class="btn-18">
              <img src="@/static/icon/header-top/search.svg" />
            </span>
          </div>
        </div>
      </div>
      <div class="d-flex justify-content-between align-items-center">
        <div
          class="user-ratio d-flex justify-content-between align-items-center"
        >
          <img class="ratio-image" src="@/static/icon/header-top/phone.svg" />
          <span>Hotline:</span>
          <span class="number-td-1202">1900 6825</span>
        </div>
        <div
          class="user-ratio d-flex justify-content-between align-items-center"
        >
          <img class="ratio-image" src="@/static/icon/header-top/ratio.svg" />
          <span>Tỉ giá:</span>
          <span class="number-td-1202">{{ configList.exchange_rate }}</span>
        </div>
        <div
          class="user-balance d-flex justify-content-between align-items-center"
        >
          <span>Số dư:</span>
          <span class="number-td-1202">10.000.000 đ</span>
          <img class="down" src="@/static/icon/header-top/money.svg" />
        </div>
        <div class="noti-global">
          <img class="down" src="@/static/icon/header-top/cart.svg" />
          <span class="count">10</span>
        </div>
        <div class="noti-global">
          <img class="down" src="@/static/icon/header-top/mail.svg" />
          <span class="count">0</span>
        </div>
        <div class="noti-global">
          <img class="down" src="@/static/icon/header-top/noti.svg" />
          <span class="count">10</span>
        </div>
        <div
          class="dropdown-account"
          @click="showMenuTop = true"
          @mouseleave="mouseLeave"
        >
          <img
            v-if="accountInfo.avatar"
            :src="accountInfo.avatar"
            class="avatar"
          />
          <img
            v-else
            class="avatar"
            src="@/static/icon/header-top/account.svg"
          />
          <span class="name">
            {{ accountInfo.name }}
            <img class="down" src="@/static/icon/header-top/down.svg" />
          </span>
          <ul
            v-if="showMenuTop"
            @mouseover="mouseOver"
            @mouseleave="mouseLeave"
          >
            <router-link
              :to="{ name: 'account-profile', params: {} }"
              @click.native.stop="showMenuTop = false"
            >
              <span>Thông tin tài khoản</span>
            </router-link>
            <router-link
              :to="{ name: 'account-reset-pass', params: {} }"
              @click.native.stop="showMenuTop = false"
            >
              <span>Đổi mật khẩu</span>
            </router-link>
            <a class="divider"></a>
            <a @click.stop.stop="confirmLogout">
              <span>Thoát tài khoản</span>
            </a>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "LayoutHeaderTop",
  data() {
    return {
      seach: "",
      showMenuTop: false,
      timer: {},

      // Ô Seach
      search: "",
      showSelectMall: false,
      mallActive: 1,
    };
  },
  computed: {
    ...mapGetters("account", ["accountInfo", "configList"]),
    ...mapGetters(["path", "full_path"]),
  },
  methods: {
    ...mapActions("account", ["removeAccountInfo"]),
    mouseLeave() {
      // this.showMenuTop = false;
      this.timer = setTimeout(() => {
        this.showMenuTop = false;
      }, 3000);
    },
    mouseOver() {
      clearTimeout(this.timer);
      this.showMenuTop = true;
    },
    confirmLogout() {
      this.$confirm("Xác nhận thoát tài khoản", "Warning", {
        confirmButtonText: "Đồng ý",
        cancelButtonText: "Hủy",
        type: "warning",
      })
        .then(() => {
          this.removeAccountInfo();
        })
        .catch(() => {});
    },
    nextRoute(name, full_path) {
      if (this.full_path !== full_path) {
        this.$router.push({ name: name });
      }
    },
    nextHome() {
      console.log("http://landing.thuongdo.vn/");
      window.location.href = "http://landing.thuongdo.vn/";
    },

    mouseLeaveSelectMall() {
      this.showSelectMall = false;
    },
    changeMall(mall) {
      this.showSelectMall = false;
      this.mallActive = mall;
    },
  },
};
</script>

<style lang="css" scoped>
.component-header-top {
  background-color: #436092;
  padding-top: 20px;
  height: 70px;
}
.component-header-top-line {
  background-color: #1d60a6;
  margin-bottom: 5px;
  height: 3px;
}
.component-header-top-item {
  height: 50px;
  padding: 0px 65px;
  padding: 0px 20px;
  background-color: #1d60a6;
}
.component-header-top-item .logo {
  cursor: pointer;
}

.dropdown-account {
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  height: 100%;
  padding: 0px 3px 0px 3px;
  position: relative;
  height: 73px;
  color: #fff;
}
.dropdown-account .avatar {
  max-width: 100%;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  margin-right: 5px;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
}
.dropdown-account ul {
  position: absolute;
  top: 31px;
  right: 0px;
  margin: 0px;
  width: 200px;
  background-color: #fff;
  padding: 5px 0px 5px 0px;
  z-index: 1000;
  border: 1px solid #f2f2f2;
  box-shadow: 0 2px 2px rgba(0, 0, 0, 0.05), 0 1px 0 rgba(0, 0, 0, 0.05);
  margin-top: 42px;
}
.dropdown-account ul a {
  list-style-type: none;
  height: 35px;
  display: flex;
  align-items: center;
  padding-left: 15px;
  text-decoration: none;
  color: #2c3e50;
}
.dropdown-account ul a:hover {
  background-color: #f2f2f2;
}
.dropdown-account ul a.divider {
  height: 1px;
  background-color: #ccc;
  margin-bottom: 5px;
}

.noti-global {
  padding-right: 28px;
  position: relative;
  cursor: pointer;
}
.noti-global img {
  width: 18px;
}
.noti-global .count {
  position: absolute;
  display: inline-block;
  padding: 2px 3px;
  background-color: #da0606;
  font-size: 10px;
  color: #fff;
  border-radius: 2px;
  top: -5px;
  right: 15px;
}

.number-td-1202 {
  color: #f1c330;
  font-weight: 500;
  margin-left: 5px;
  margin-right: 5px;
}

.user-balance {
  padding: 5px 15px;
  margin-right: 15px;
  background: #436092;
  border-radius: 42px;
  color: #fff;
}

.user-ratio {
  margin-right: 15px;
  color: #fff;
}
.user-ratio img {
  margin-right: 7px;
}

/*// Ô seach đa chức năng*/
.seach-china {
  margin-left: 35px;
  width: 420px;
  height: 38px;
  border-radius: 25px;
  background-color: #fff;
}
.select-mall {
  height: 38px;
  padding-left: 13px;
  padding: 0px 10px 0px 20px;
  border-right: 1px solid #bfd5ec;
  margin-right: 8px;
  cursor: pointer;
  position: relative;
  width: 120px;
}
.select-mall .image img {
  height: 22px;
  margin-right: 5px;
}
.seach-china input {
  width: 100%;
  height: 30px;
  border: none;
  font-size: 13px;
  color: #333;
  margin-right: 8px;
  outline: none;
}
.seach-china input::-webkit-input-placeholder {
  font-weight: 300;
  color: #bfd5ec;
  font-size: 13px;
  font-style: italic;
}
.seach-china input::-moz-placeholder {
  font-weight: 300;
  color: #bfd5ec;
  font-size: 13px;
  font-style: italic;
}
.seach-china input::-ms-input-placeholder {
  font-weight: 300;
  color: #bfd5ec;
  font-size: 13px;
  font-style: italic;
}
.seach-button {
  width: 80px;
}
.btn-18 {
  background: #fe6701;
  border: 1px solid #bfd5ec;
  border-radius: 20px;
  height: 38px;
  width: 58px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}
.btn-18:hover {
  opacity: 0.8;
}

.sub-select-mall {
  position: absolute;
  min-height: 100px;
  background-color: #fff;
  width: 102px;
  left: 0px;
  top: 38px;
}
.sub-select-mall .image {
  height: 38px;
  display: flex;
  align-items: center;
  padding-left: 20px;
  border-bottom: 1px solid #ccc;
}
.sub-select-mall .image:hover {
  background-color: #f2f2f2;
  transition: all 0.3s;
}
.add-border-99 {
  border-top-left-radius: 0px;
  border-bottom-left-radius: 0px;
}
</style>
