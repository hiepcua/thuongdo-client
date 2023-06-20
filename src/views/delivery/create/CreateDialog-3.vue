<template>
  <el-dialog
    title="Thông tin khách hàng"
    top="50px"
    width="55%"
    custom-class="create-delivery-dialog-882"
    :close-on-click-modal="false"
    :visible.sync="dialogTableVisible"
  >
    <div class="create-delivery-dialog-882-wrap">
      <div class="create-delivery-dialog-882-name">
        <span class="line-1">Họ và tên: {{ accountInfo.name }}</span>
        <span>SĐT: {{ accountInfo.phone_number }}</span>
      </div>
      <div class="create-delivery-dialog-882-main-title">
        <span>Danh sách kiện hàng cần giao</span>
      </div>
      <div class="create-delivery-dialog-882-table table-element-custom-2022">
        <el-table :data="orderPackV2Tab1SelectCopy" style="width: 100%">
          <el-table-column
            type="index"
            label="STT"
            width="150"
          ></el-table-column>
          <el-table-column label="Thông tin kiện hàng">
            <template slot-scope="scope">
              <div class="d-flex flex-column">
                <span>{{ scope.row.bill_code }}</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="Trạng thái">
            <template slot-scope="scope">
              <div class="d-flex flex-column">
                <span>{{ scope.row.status.name }}</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="Thao tác" width="100">
            <template slot-scope="scope">
              <div
                class="d-flex delete-pack-in-create-delivery-6182"
                @click="deletePackTap1(scope.row)"
              >
                <span>Xóa</span>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div
        class="create-delivery-dialog-882-item create-delivery-dialog-882-item-first d-flex align-items-center"
      >
        <span class="create-delivery-sub-title">Thời gian nhận hàng</span>
        <div>
          <el-date-picker
            v-model="modelData.date"
            type="date"
            :clearable="true"
            format="dd/MM/yyyy"
            value-format="yyyy-MM-dd"
            placeholder="Ngày nhận hàng"
            align="center"
            size="mini"
            :picker-options="pickerOptions"
          >
          </el-date-picker>
        </div>
      </div>
      <div class="create-delivery-dialog-882-item d-flex flex-column">
        <span class="create-delivery-sub-title">Hình thức vận chuyển</span>
        <div class="d-flex pt-3">
          <div
            class="item-common-9012"
            v-for="item in listTransporter"
            :key="item.id"
            @click="transporter_select = item"
          >
            <img
              src="@/static/icon/account/checked.svg"
              v-if="item.id == transporter_select.id"
            />
            <img src="@/static/icon/account/no-checked.svg" v-else />
            <span>{{ item.name }}</span>
          </div>
        </div>
      </div>
      <div
        class="create-delivery-dialog-882-item"
        v-if="transporter_select.name == 'Xe khách'"
      >
        <CreateDeliveryGarage
          :transporter_select="transporter_select"
          @changeGarageId="changeGarageIdParent"
        />
      </div>
      <div
        class="create-delivery-dialog-882-item d-flex flex-column"
        v-if="transporter_select.is_delivery_type == 1"
      >
        <span class="create-delivery-sub-title">Phương thức vận chuyển</span>
        <div class="d-flex pt-3">
          <div class="item-common-9012" @click="modelData.type = 'normal'">
            <img
              src="@/static/icon/account/checked.svg"
              alt=""
              v-if="modelData.type == 'normal'"
            />
            <img src="@/static/icon/account/no-checked.svg" alt="" v-else />
            <span>Chuyển nhanh</span>
          </div>
          <div class="item-common-9012" @click="modelData.type = 'fast'">
            <img
              src="@/static/icon/account/checked.svg"
              alt=""
              v-if="modelData.type == 'fast'"
            />
            <img src="@/static/icon/account/no-checked.svg" alt="" v-else />
            <span>Chuyển thường</span>
          </div>
        </div>
      </div>
      <div
        class="create-delivery-dialog-882-item d-flex"
        v-if="transporter_select.is_get_delivery_price"
      >
        <span class="create-delivery-sub-title">Phí vận chuyển tạm tính: </span>
        <i class="el-icon-loading" v-if="deliveryPriceLoading"></i>
        <span class="color-red" v-if="!deliveryPriceLoading">
          <span v-if="deliveryPriceTemp == 0">Chờ báo giá</span>
          <span v-else>{{ deliveryPriceTemp | vnd }}</span>
        </span>
      </div>
      <div class="create-delivery-dialog-882-item d-flex flex-column">
        <span class="create-delivery-sub-title">Hình thức thanh toán</span>
        <div class="d-flex pt-3">
          <div class="item-common-9012" @click="modelData.payment = 'e-wallet'">
            <img
              src="@/static/icon/account/checked.svg"
              alt=""
              v-if="modelData.payment == 'e-wallet'"
            />
            <img src="@/static/icon/account/no-checked.svg" alt="" v-else />
            <span>Ví điện tử</span>
          </div>
          <div class="item-common-9012" @click="modelData.payment = 'cod'">
            <img
              src="@/static/icon/account/checked.svg"
              alt=""
              v-if="modelData.payment == 'cod'"
            />
            <img src="@/static/icon/account/no-checked.svg" alt="" v-else />
            <span>COD</span>
          </div>
        </div>
      </div>
      <div
        v-if="dialogTableVisible"
        class="create-delivery-dialog-882-item create-delivery-dialog-882-item-none"
      >
        <CreateDeliveryDeliveryTake
          @changeDeliveryId="changeDeliveryIdParent"
        />
      </div>
      <div class="create-delivery-dialog-882-item">
        <span class="create-delivery-sub-title create-delivery-sub-title-bold"
          >Ghi chú</span
        >
        <div class="pt-2">
          <el-input
            type="textarea"
            :rows="4"
            placeholder="Ghi chú"
            v-model="modelData.note"
          >
          </el-input>
        </div>
      </div>
      <div class="create-delivery-dialog-882-item">
        <span class="create-delivery-sub-title pb-2"
          >Chi phí phải thanh toán</span
        >
        <div class="pay-item">
          <span class="title">Số dư ví</span>
          <span>{{ accountInfo.e_wallet | vnd }}</span>
        </div>
        <div class="pay-item">
          <span class="title">Tiền hàng còn thiếu</span>
          <i class="el-icon-loading" v-if="debtOrderLoading"></i>
          <span v-else>{{ debtOrder | vnd }}</span>
        </div>
        <div class="pay-item">
          <span class="title">Tổng phí vận chuyển TQ</span>
          <span>{{ totalDeliveryCostTQ | vnd }}</span>
        </div>
        <div class="pay-item">
          <span class="title">Phí vận chuyển tạm tính</span>
          <span v-if="deliveryPriceTemp == 0">Chờ báo giá</span>
          <span v-else>{{ deliveryPriceTemp | vnd }}</span>
        </div>
        <div class="pay-item">
          <span class="title">Số dư còn lại</span>
          <span>{{ getMoneyBalance() | vnd }}</span>
        </div>
        <div class="pay-item">
          <span class="title">Cần nạp thêm</span>
          <span class="color-red">{{ getMoneyChard() | vnd }}</span>
        </div>
      </div>
      <div
        class="d-flex justify-content-between align-items-center"
        v-if="getMoneyChard()"
      >
        <div class="not-enough-money">
          <span class="text">Số dư trong ví không đủ thanh toán</span>
          <span class="btn-add-money" @click="showQrCodeBank = true"
            >Nạp tiền</span
          >
        </div>
        <div>
          <span
            class="frame-btn-create-x-2022"
            :class="!canSubmit ? 'disable' : ''"
            @click="submitCreateDialog"
          >
            <i class="el-icon-loading" v-if="!canSubmit"></i>
            <span>Tạo giao hàng</span>
          </span>
        </div>
      </div>
      <div class="d-flex justify-content-end align-items-center" v-else>
        <span
          class="frame-btn-create-x-2022"
          :class="!canSubmit ? 'disable' : ''"
          @click="submitCreateDialog"
        >
          <i class="el-icon-loading" v-if="!canSubmit"></i>
          <span>Tạo giao hàng</span>
        </span>
      </div>
      <QrCodeBank
        v-if="showQrCodeBank"
        :totalMoneyBank="getMoneyChard()"
        @closeQrCodeBank="closeQrCodeBankParent"
      />
    </div>
  </el-dialog>
</template>

<script>
import axios from "axios";
import { findIndex } from "lodash";
import { mapGetters } from "vuex";
import CreateDeliveryGarage from "@/views/delivery/create/Garage";
import CreateDeliveryDeliveryTake from "@/views/delivery/create/DeliveryTake";
import QrCodeBank from "@/components/QrCodeBank";
export default {
  name: "CreateDeliveryDialog",
  props: {
    showCreateDialog: Boolean,
    orderPackV2Tab1Select: Array,
  },
  components: {
    CreateDeliveryGarage,
    CreateDeliveryDeliveryTake,
    QrCodeBank,
  },

  data() {
    return {
      dialogTableVisible: false,

      day: "",
      month: "",
      year: "",
      days: [],
      months: [],
      years: [],

      listTransporter: [],
      transporter_select: {},

      canSubmit: true,
      modelData: {
        packages: [],
        transporter_id: "",
        transporter_detail_id: "",
        type: "",
        payment: "",
        customer_delivery_id: "",
        note: "",
        date: "",
      },

      loadDone: false,

      // Ẩn date:
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() < Date.now() - 86400000;
        },
      },

      // Xóa kiện Tab 1
      orderPackV2Tab1SelectCopy: [],

      // Tính giá tạm ứng:
      deliveryPriceLoading: false,
      deliveryPriceTemp: 0,

      // Tiền hàng còn thiếu
      debtOrderLoading: 0,
      debtOrder: 0,

      // Tổng phí vận chuyển TQ
      totalDeliveryCostTQ: 0,

      // Show QrCodeBank
      showQrCodeBank: false,
    };
  },
  computed: {
    ...mapGetters("account", ["accountInfo"]),
  },
  mounted() {
    this.configDate();
    // this.fetchTransporter();
  },
  methods: {
    configDate() {
      for (let i = 1; i <= 31; i++) {
        let value = i;
        if (i < 10) {
          value = "0" + i;
        }
        let temp = {
          value: value,
          label: i,
        };
        this.days.push(temp);
      }
      for (let i = 1; i <= 12; i++) {
        let value = i;
        if (i < 10) {
          value = "0" + i;
        }
        let temp = {
          value: value,
          label: i,
        };
        this.months.push(temp);
      }
      let year = new Date().getFullYear();
      for (let i = year; i <= year + 1; i++) {
        let temp = {
          value: i,
          label: i,
        };
        this.years.push(temp);
      }
    },
    fetchTransporter() {
      axios.get("transporter").then((response) => {
        this.loading = false;
        switch (response.code) {
          case 200:
            this.listTransporter = response.data;
            this.loadDone = true;
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

    changeGarageIdParent(value) {
      this.modelData.transporter_detail_id = value;
    },
    changeDeliveryIdParent(value) {
      this.modelData.customer_delivery_id = value;
    },

    checkDataPushError() {
      let message = "";
      let flag = false;
      // if (this.day == "") {
      //   flag = true;
      //   message = "Vui lòng chọn ngày giao hàng";
      // }
      // if (this.month == "") {
      //   flag = true;
      //   message = "Vui lòng chọn tháng giao hàng";
      // }
      // if (this.year == "") {
      //   flag = true;
      //   message = "Vui lòng chọn năm giao hàng";
      // }
      if (this.modelData.date == "") {
        flag = true;
        message = "Thời gian giao hàng không được để trống";
      }
      if (
        this.transporter_select.name == "Xe khách" &&
        this.modelData.transporter_detail_id == ""
      ) {
        flag = true;
        message = "Vui lòng chọn nhà xe";
      }
      let ab = Object.keys(this.transporter_select).length;
      if (ab == 0) {
        flag = true;
        message = "Vui lòng chọn hình thức vận chuyển";
      }
      if (this.transporter_select.id == "") {
        flag = true;
        message = "Vui lòng chọn hình thức vận chuyển";
      }

      if (
        this.modelData.type == "" &&
        this.transporter_select.is_delivery_type == 1
      ) {
        flag = true;
        message = "Vui lòng chọn phương thức vận chuyển";
      }
      if (this.modelData.payment == "") {
        flag = true;
        message = "Vui lòng chọn hình thức thanh toán";
      }

      if (flag) {
        this.$notify({
          title: "Có lỗi xảy ra",
          message: message,
          type: "warning",
        });
      }
      return flag;
    },

    deletePackTap1(item) {
      let index = findIndex(this.orderPackV2Tab1SelectCopy, function (o) {
        return o.id === item.id;
      });
      if (index > -1) {
        this.orderPackV2Tab1SelectCopy.splice(index, 1);
      }
    },
    submitCreateDialog() {
      if (this.checkDataPushError()) {
        return;
      }
      this.canSubmit = false;
      let data = {};
      let packages = [];
      // let date = "";
      let transporter_detail_id = "";

      this.orderPackV2Tab1SelectCopy.forEach((item) => {
        packages.push(item.id);
      });
      // date = this.year + "-" + this.month + "-" + this.day;
      if (this.transporter_select.name == "Xe khách") {
        transporter_detail_id = this.modelData.transporter_detail_id;
        data.transporter_detail_id = transporter_detail_id;
      }

      // Gán
      data.packages = packages;
      data.transporter_id = this.transporter_select.id;
      if (this.modelData.type !== "") {
        data.type = this.modelData.type;
      }
      data.payment = this.modelData.payment;
      data.customer_delivery_id = this.modelData.customer_delivery_id;
      if (this.modelData.note !== "") {
        data.note = this.modelData.note;
      }
      data.date = this.modelData.date;

      axios.post("delivery/", data).then((response) => {
        this.canSubmit = true;
        switch (response.code) {
          case 200:
            this.$notify({
              title: "Thành công",
              message: "Tạo giao hàng thành công",
              type: "success",
            });
            this.dialogTableVisible = false;
            this.$emit("submitDialogDone", false);

            this.day = "";
            this.month = "";
            this.year = "";
            this.modelData.type = "";
            this.modelData.payment = "";
            this.modelData.customer_delivery_id = "";
            this.modelData.note = "";
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
    getDeliveryPrice() {
      this.deliveryPriceLoading = true;
      let packages = [];
      this.orderPackV2Tab1SelectCopy.forEach((item) => {
        packages.push(item.id);
      });
      let data = {
        carrier: this.transporter_select.short_name,
        delivery_type:
          this.modelData.type == "" ? "normal" : this.modelData.type,
        packages: packages,
        customer_delivery_id: this.modelData.customer_delivery_id,
      };
      axios.patch("carrier/get-price/", data).then((response) => {
        this.deliveryPriceLoading = false;
        switch (response.code) {
          case 200:
            this.deliveryPriceTemp = response.data;
            break;
          case 422:
            this.$notify({
              title: "Có lỗi xảy ra",
              message: Object.values(response.data)[0],
              type: "warning",
            });
            break;

          case 500:
            this.deliveryPriceTemp = 0;
            this.$message({
              message:
                "Có lỗi phát sinh từ phía bên nhà vận chuyển! Vui lòng quay lại sau",
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
    // Tiền hàng còn thiếu
    getDebtOrder() {
      this.debtOrderLoading = true;
      let orders = "";
      this.orderPackV2Tab1SelectCopy.forEach((item) => {
        orders += item.order_id + ",";
      });
      orders = orders.slice(0, -1);

      if (orders == "") {
        this.debtOrder = 0;
        this.debtOrderLoading = false;
        return;
      }

      axios.get("order/get-debt/" + orders).then((response) => {
        this.debtOrderLoading = false;
        switch (response.code) {
          case 200:
            this.debtOrder = response.data;
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

    // Tính số tiền cần nạp
    getMoneyChard() {
      let totalFree =
        this.debtOrder + this.totalDeliveryCostTQ + this.deliveryPriceTemp;
      if (totalFree > this.accountInfo.e_wallet) {
        return totalFree - this.accountInfo.e_wallet;
      }
      return 0;
    },
    // Tính số dư
    getMoneyBalance() {
      let totalFree =
        this.debtOrder + this.totalDeliveryCostTQ + this.deliveryPriceTemp;
      if (this.accountInfo.e_wallet < totalFree) {
        return 0;
      }
      return this.accountInfo.e_wallet - totalFree;
    },

    // Đóng nạp tiền
    closeQrCodeBankParent() {
      this.showQrCodeBank = false;
    },
  },
  watch: {
    showCreateDialog(value) {
      if (value) {
        this.dialogTableVisible = true;

        if (this.loadDone == false) {
          this.fetchTransporter();
        }
      }
    },
    dialogTableVisible() {
      if (this.dialogTableVisible == false) {
        this.$emit("closeCreateDialog", false);
        this.modelData.type = "";
        this.modelData.payment = "";
        this.modelData.customer_delivery_id = "";
        this.modelData.note = "";
        this.modelData.date = "";
        this.transporter_select = {};
      }
      if (this.dialogTableVisible == true) {
        this.orderPackV2Tab1SelectCopy = JSON.parse(
          JSON.stringify(this.orderPackV2Tab1Select)
        );
      }
    },
    transporter_select() {
      if (this.transporter_select.is_get_delivery_price) {
        this.getDeliveryPrice();
      }
    },
    "modelData.type": function () {
      if (this.transporter_select.is_get_delivery_price) {
        this.getDeliveryPrice();
      }
    },
    orderPackV2Tab1SelectCopy() {
      let temp = 0;
      this.orderPackV2Tab1SelectCopy.forEach((item) => {
        temp += item.delivery_cost;
      });
      this.totalDeliveryCostTQ = temp;
      this.getDebtOrder();
    },
  },
};
</script>

<style lang="css" scoped>
.create-delivery-dialog-882-wrap {
  font-weight: 400;
  color: #575757;
}
.create-delivery-dialog-882-item-first {
  padding-top: 20px;
}
.create-delivery-dialog-882-item {
  /*padding: 15px 0px;*/
  padding-bottom: 20px;
}
.create-delivery-dialog-882-item-none {
  padding-bottom: 0px;
}
.create-delivery-dialog-882-name .line-1 {
  margin-right: 10px;
}
.create-delivery-dialog-882-main-title span {
  font-weight: 500;
  font-size: 16px;
  line-height: 16px;
  letter-spacing: 0.02em;
  color: #575757;
  margin-top: 25px;
  margin-bottom: 20px;
  display: inline-block;
}
.create-delivery-sub-title {
  font-weight: 500;
  font-size: 14px;
  line-height: 16px;
  letter-spacing: 0.02em;
  color: #575757;
  margin-right: 20px;
}
.create-delivery-sub-title-bold {
  font-weight: 700;
}

.delete-pack-in-create-delivery-6182 {
  cursor: pointer;
}

.color-red {
  color: red;
}
.pay-item {
  height: 38px;
  line-height: 38px;
  border-bottom: 1px solid #ccc;
  color: #575757;
}
.pay-item .title {
  width: 200px;
  display: inline-block;
}

/*not-enough-money*/
.not-enough-money {
  height: 39px;
  width: calc(100% - 215px);
  background-color: #fde9ea;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 15px;
}
.not-enough-money .text {
  font-weight: 500;
  font-size: 12px;
  line-height: 16px;
  letter-spacing: 0.02em;
  color: #da0606;
  padding-left: 45px;
}
.not-enough-money .btn-add-money {
  background: #fe6701;
  border-radius: 4px;
  color: #fff;
  text-transform: uppercase;
  padding: 10px 30px;
  cursor: pointer;
}
.not-enough-money .btn-add-money:hover {
  opacity: 0.8;
}
</style>
<style type="text/css">
.create-delivery-dialog-882 .el-dialog__body {
  padding: 5px 25px 20px 25px;
}
.create-delivery-dialog-882 .el-dialog__title {
  font-weight: 500;
  font-size: 16px;
  line-height: 16px;
  letter-spacing: 0.02em;
  color: #575757;
}
.account-profile-select-bod {
  width: 90px;
  margin-right: 10px;
}

/*Đè ô nhập thời gian chỗ filter*/
.create-delivery-dialog-882-wrap .el-date-editor.el-input,
.create-delivery-dialog-882-wrap .el-date-editor.el-input__inner {
  width: 160px;
}
</style>
