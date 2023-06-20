<template>
  <el-dialog
    title="Đặt hàng ngay"
    width="600px"
    top="50px"
    custom-class="bank-confirm-detail-order"
    :close-on-click-modal="false"
    :visible.sync="dialogTableVisible"
  >
    <el-row :gutter="10">
      <el-col :span="8">
        <div class="d-flex flex-column">
          <div class="item-common" @click="modelData.type = 0">
            <img
              src="@/static/icon/account/checked.svg"
              alt=""
              v-if="modelData.type == 0"
            />
            <img src="@/static/icon/account/no-checked.svg" alt="" v-else />
            <span>Đặt cọc</span>
          </div>
          <div class="item-common" @click="modelData.type = 1">
            <img
              src="@/static/icon/account/checked.svg"
              alt=""
              v-if="modelData.type == 1"
            />
            <img src="@/static/icon/account/no-checked.svg" alt="" v-else />
            <span>Thanh toán hết</span>
          </div>
        </div>
      </el-col>
      <el-col :span="16" v-if="accountInfo.offer">
        <div class="money-wrap">
          <div class="item">
            <span class="line-1">Tổng tiền hàng:</span>
            <span class="color-red">{{ totalMoneyOrder | vnd }}</span>
          </div>
          <div class="item" v-if="modelData.type == 0">
            <span class="line-1">Đặt cọc trước:</span>
            <span
              >{{
                ((totalMoneyOrder * accountInfo.offer.deposit) / 100) | vnd
              }}
              ({{ accountInfo.offer.deposit }}%)</span
            >
          </div>
          <div class="item" v-if="modelData.type == 1">
            <span class="line-1">Thanh toán hết:</span>
            <span class="color-red">{{ totalMoneyOrder | vnd }}</span>
          </div>
          <div class="item">
            <span class="line-1">Số dư ví:</span>
            <span>{{ accountInfo.e_wallet | vnd }}</span>
          </div>
          <div class="item">
            <span class="line-1">Số dư còn lại:</span>
            <span>{{ getMoneyBalance() | vnd }}</span>
          </div>
          <div class="item-confirm d-none">
            <div
              class="item-common"
              @click="modelData.confirmation = !modelData.confirmation"
            >
              <img
                src="@/static/icon/order-create/checked.svg"
                alt=""
                v-if="modelData.confirmation"
              />
              <img
                src="@/static/icon/order-create/no-checked.svg"
                alt=""
                v-else
              />
              <span>Xác nhận thanh toán</span>
            </div>
          </div>
          <div class="alert-1" v-if="getMoneyChard()">
            <span
              >Nạp thêm <strong>{{ getMoneyChard() | vnd }}</strong> để
              {{ modelData.type == 0 ? "đặt cọc" : "thanh toán" }}</span
            >
          </div>
          <div class="pt-3 d-flex align-items-center">
            <div
              class="btn-dialog-88 btn-dialog-danger"
              @click="dialogTableVisible = false"
            >
              <span>Hủy bỏ</span>
            </div>
            <div class="btn-space-88"></div>
            <div
              v-if="getMoneyChard() == 0"
              class="btn-dialog-88"
              :class="!canSubmit ? 'disable' : ''"
              @click="sentPaymentOrder()"
            >
              <span v-if="!canSubmit"><i class="el-icon-loading"></i></span>
              <span>Xác nhận</span>
            </div>
            <div class="btn-dialog-88" v-else @click="showBank()">
              <span>Nạp tiền</span>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
    <div class="bank-qr-scan" v-if="showBankQrScan">
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
        <div class="alert-1">
          <span
            >Nạp thêm tối thiểu <strong>{{ getMoneyChard() | vnd }}</strong> để
            thực hiện giao dịch này</span
          >
        </div>
      </div>
      <div class="d-flex justify-content-end">
        <span class="close-bank" @click="showBankQrScan = false"
          >Đóng nạp tiền</span
        >
      </div>
    </div>
  </el-dialog>
</template>

<script>
import axios from "axios";
import { mapGetters, mapActions } from "vuex";
export default {
  name: "BankConfirmDetailOrder",
  props: {
    randomOpen: Number,
    supplierId: String,
    totalMoneyOrder: Number,
  },
  computed: {
    ...mapGetters("account", ["accountInfo"]),
  },
  data() {
    return {
      canSubmit: true,
      // Dialog
      dialogTableVisible: false,
      openDialog: 0, // Số này nhẩy thì sẽ bật dialog lên

      // Form
      modelData: {
        type: 0, // 0 - Đặt cọc, 1 - Tất
        confirmation: 0,
      },

      // Nạp tiền
      showBankQrScan: false,
      bankId: "",
      linkImgBank: "",
      listBank: [],
    };
  },
  mounted() {
    console.log("BankConfirmDetailOrder");
  },
  methods: {
    ...mapActions("account", ["getAccountInfo"]),
    getMoneyChard() {
      if (this.accountInfo.e_wallet < this.totalMoneyOrder) {
        if (this.modelData.type == 1) {
          return this.totalMoneyOrder;
        }
        let a = (this.totalMoneyOrder * this.accountInfo.offer.deposit) / 100;
        return a;
      }
      return 0;
    },
    getMoneyBalance() {
      if (this.modelData.type == 0) {
        let a = (this.totalMoneyOrder * this.accountInfo.offer.deposit) / 100;
        if (this.accountInfo.e_wallet < a) {
          return 0;
        } else {
          return this.accountInfo.e_wallet - a;
        }
      }

      if (this.modelData.type == 1) {
        if (this.accountInfo.e_wallet < this.totalMoneyOrder) {
          return 0;
        } else {
          return this.accountInfo.e_wallet - this.totalMoneyOrder;
        }
      }
      return 0;
    },
    showBank() {
      this.showBankQrScan = !this.showBankQrScan;
      if (this.showBankQrScan) {
        this.fetchListBank();
      }
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
    sentPaymentOrder() {
      this.canSubmit = false;

      let linkP = "purchase/order/" + this.$route.params.order_id;
      if (this.supplierId) {
        linkP =
          "purchase/order-supplier/" +
          this.$route.params.order_id +
          "/" +
          this.supplierId;
      }

      axios.patch(linkP, this.modelData).then((response) => {
        this.canSubmit = true;
        switch (response.code) {
          case 200:
            if (this.supplierId == null) {
              this.$notify({
                title: "Thành công",
                message: "Đặt hàng toàn bộ thành công",
                type: "success",
              });
            } else {
              this.$notify({
                title: "Thành công",
                message: "Tách đơn thành công",
                type: "success",
              });
            }
            this.getAccountInfo();
            this.dialogTableVisible = false;
            this.$emit("sentPaymentDone", true);
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
    randomOpen(value) {
      if (this.openDialog != value) {
        this.openDialog = value;
        this.dialogTableVisible = true;
      }
    },
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
    dialogTableVisible() {
      this.modelData.type = 0;
      this.modelData.confirmation = 0;
      this.showBankQrScan = false;
      this.bankId = "";
    },
  },
};
</script>

<style lang="css" scoped>
.bank-confirm-detail-order .item-common {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}
.bank-confirm-detail-order .item-common img {
  margin-right: 8px;
}
.bank-confirm-detail-order .item-common span {
  cursor: pointer;
}
.bank-confirm-detail-order .item-common span:hover {
  opacity: 0.8;
}

.money-wrap .item {
  padding: 10px 15px;
  border-bottom: 1px solid #e1e1e1;
}
.money-wrap .item .line-1 {
  min-width: 180px;
  display: inline-block;
}
.money-wrap .item-confirm {
  padding: 10px 15px 0px 15px;
}
.money-wrap .alert-1 {
  background: #fde9ea;
  padding: 16px 40px;
  color: #da0606;
  margin-top: 15px;
  margin-bottom: 8px;
}
.btn-dialog-88 {
  border-radius: 4px;
  padding: 10px 20px;
  display: inline-block;
  background-color: #ccc;
  cursor: pointer;
  width: 140px;
  text-align: center;
  background-color: #26b01c;
  color: #fff;
  text-transform: uppercase;
  user-select: none;
}
.btn-dialog-88.disable {
  pointer-events: none;
}
.btn-dialog-88.disable span {
  margin-left: 5px;
}
.btn-dialog-danger {
  background-color: #da0606;
  background-color: #b9bcbe;
}
.btn-dialog-88:hover {
  opacity: 0.8;
}
.btn-space-88 {
  width: 20px;
}

/*bank-qr-scan*/
.bank-qr-scan {
  margin-top: 25px;
  border-top: 1px solid #e1e1e1;
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
.bank-confirm-detail-order .el-dialog__body {
  padding: 5px 25px 20px 25px;
}
.bank-confirm-detail-order .el-dialog__title {
  font-weight: 700;
  font-size: 20px;
  text-transform: uppercase;
  color: #1771c1;
}
.bank-confirm-select-bank {
  width: 290px;
  margin-left: 10px;
}
</style>
