<template>
  <div class="bank-qr-scan" :class="totalMoneyBank == false ? 'none' : ''">
    <div class="select-bank d-flex justify-content-center align-items-center">
      <span>Chọn ngân hàng *</span>
      <div>
        <el-select
          v-model="bankId"
          placeholder="Chọn ngân hàng"
          class="frame-select-common-2022 bank-confirm-select-bank"
          popper-class="frame-select-popper-common-2022"
          size="small"
        >
          <el-option
            v-for="item in listBank"
            :key="item.code"
            :label="item.bank_name"
            :value="item.code"
          >
          </el-option>
        </el-select>
      </div>
    </div>
    <div class="show-bank" v-if="bankId">
      <span class="line-1">Quét mã QR để chuyển khoản nạp tiền</span>
      <div class="img-bank">
        <img :src="linkImgBank" />
      </div>
      <span class="line-2">Cú pháp nạp tiền</span>
      <div class="recharge-syntax">
        <!-- <span>NAP {{ accountInfo.phone_number }}</span> -->
        <input
          v-on:focus="$event.target.select()"
          ref="clone"
          readonly
          :value="'NAP ' + accountInfo.phone_number"
          class="clone-nap"
        />
        <div class="copy" @click="copyNap()">
          <img src="@/static/icon/order-detail-v2/copy.svg" />
        </div>
      </div>
      <div class="alert-1" v-if="totalMoneyBank">
        <span
          >Nạp thêm tối thiểu <strong>{{ totalMoneyBank | vnd }}</strong> để
          thực hiện giao dịch này</span
        >
      </div>
    </div>
    <div class="d-flex justify-content-end">
      <span class="close-bank" @click="closeBank()">Đóng nạp tiền</span>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { mapGetters } from "vuex";
export default {
  name: "QrCodeBank",
  props: {
    totalMoneyBank: Number,
  },
  computed: {
    ...mapGetters("account", ["accountInfo"]),
  },
  data() {
    return {
      // Nạp tiền
      showBankQrScan: false,
      bankId: "",
      linkImgBank: "",
      listBank: [],
    };
  },
  mounted() {
    this.fetchListBank();
  },
  methods: {
    closeBank() {
      this.$emit("closeQrCodeBank", true);
    },
    fetchListBank() {
      axios.get("organization/banks").then((response) => {
        switch (response.code) {
          case 200:
            this.listBank = response.data;
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
    copyNap() {
      this.$refs.clone.focus();
      document.execCommand("copy");
      this.$message({
        message: "Đã copy nội dung chuyển khoản",
        type: "success",
      });
    },
  },
  watch: {
    bankId() {
      let bankNumber = "";
      this.listBank.forEach((item) => {
        if (item.code == this.bankId) {
          bankNumber = item.account_number;
        }
      });
      this.linkImgBank =
        "https://img.vietqr.io/image/" +
        this.bankId +
        "-" +
        bankNumber +
        "-qr_only.png?addInfo=NAP " +
        this.accountInfo.phone_number;
    },
  },
};
</script>

<style lang="css" scoped>
/*bank-qr-scan*/
.bank-qr-scan {
  margin-top: 25px;
  border-top: 1px solid #e1e1e1;
}
.bank-qr-scan.none {
  margin-top: 0px;
  border-top: none;
}
.bank-qr-scan .select-bank {
  margin-top: 15px;
  margin-bottom: 15px;
}
.bank-qr-scan .select-bank span {
  color: #575757;
  font-weight: 500;
}
.bank-qr-scan .show-bank {
  background-color: #1d60a6;
  padding: 10px;
  color: #fff;
  margin-bottom: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.bank-qr-scan .line-1 {
  font-size: 18px;
  margin-top: 5px;
  margin-bottom: 5px;
}
.bank-qr-scan .line-2 {
  margin-bottom: 10px;
}
.bank-qr-scan .show-bank .img-bank {
  width: 200px;
  height: 200px;
  margin-top: 12px;
  margin-bottom: 12px;
}
.bank-qr-scan .show-bank .img-bank img {
  width: 100%;
}
.bank-qr-scan .recharge-syntax {
  background-color: #fff;
  height: 30px;
  width: 200px;
  border-radius: 4px;
  position: relative;
  color: #575757;
  line-height: 30px;
  padding-left: 10px;
}
.bank-qr-scan .recharge-syntax .copy {
  position: absolute;
  top: 1px;
  background-color: #26b01c;
  height: 28px;
  width: 28px;
  right: 1px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  cursor: pointer;
}
.bank-qr-scan .recharge-syntax .copy img {
  width: 17px;
}
.bank-qr-scan .recharge-syntax .clone-nap {
  outline: none;
  border: none;
}
.bank-qr-scan .show-bank .alert-1 {
  width: 100%;
  margin-top: 15px;
  margin-bottom: 8px;
  background: #fde9ea;
  color: #da0606;
  padding: 16px 0px;
  text-align: center;
}
.bank-qr-scan .close-bank {
  color: #2672ab;
  background: #ffffff;
  border: 1px solid #72b5e8;
  border-radius: 4px;
  display: inline-block;
  padding: 8px 16px;
  cursor: pointer;
  user-select: none;
  text-transform: uppercase;
  font-size: 12px;
}
.bank-qr-scan .close-bank:hover {
  opacity: 0.8;
}
</style>

<style type="text/css">
.bank-confirm-select-bank {
  width: 290px;
  margin-left: 10px;
}
</style>
