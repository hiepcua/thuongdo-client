<template>
  <div class="order-detail-v2-info-common">
    <div class="title-789ah d-flex justify-content-between align-items-center">
      <div class="d-flex align-items-center">
        <span class="order-code"
          >Mã đơn hàng: {{ orderDetailV2.order_code }}</span
        >
        <div>
          <span
            class="order-detail-icon-status-6868amg"
            :style="{ backgroundColor: orderDetailV2.status.color }"
            >{{ orderDetailV2.status.name }}</span
          >
        </div>
      </div>
      <div class="btn-export-excel">
        <img src="@/static/icon/order-detail-v2/excel.svg" alt="" />
        <span>Xuất excel</span>
      </div>
    </div>
    <div class="info-789ah">
      <el-row :gutter="20">
        <el-col :span="12">
          <div class="info-789ah-left d-flex flex-column">
            <span class="title-1">Kho nhận hàng (*)</span>
            <span class="address-1">{{ orderDetailV2.warehouse.name }}</span>
            <span class="title-1">Thông tin mua hàng (*)</span>
            <span class="address-1">{{ orderDetailV2.delivery.name }}</span>
            <span class="transport-1"
              ><strong>Vận chuyển</strong>: {{ orderDetailV2.services }}</span
            >
            <span class="title-2">Ghi chú cho Thương Đô</span>
            <span class="note-2">{{ orderDetailV2.note }}</span>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="info-789ah-right d-flex flex-column">
            <div class="item-176">
              <span>Tổng tiền hàng:</span>
              <span class="number-999">{{
                orderDetailV2.order_cost | vnd
              }}</span>
            </div>
            <div class="item-176">
              <span>Phí đặt hàng:</span>
              <span class="number-999">{{
                orderDetailV2.order_fee | vnd
              }}</span>
            </div>
            <div class="item-176">
              <span>Phí chiết khấu:</span>
              <span class="number-999">{{
                orderDetailV2.discount_cost | vnd
              }}</span>
            </div>
            <div class="item-176">
              <span>Phí kiểm đếm:</span>
              <span class="number-999">{{
                orderDetailV2.inspection_cost | vnd
              }}</span>
            </div>
            <div class="item-176">
              <span>Phí ship TQ:</span>
              <span class="number-999">{{
                orderDetailV2.china_shipping_cost | vnd
              }}</span>
            </div>
            <div class="item-190-wrap">
              <div class="item-177">
                <span>Tổng tiền đơn hàng:</span>
                <span class="number-999 number-red">{{
                  orderDetailV2.total_amount | vnd
                }}</span>
              </div>
              <div class="item-177">
                <span>Đã đặt cọc:</span>
                <span class="number-999 number-red">{{
                  orderDetailV2.deposit_cost | vnd
                }}</span>
              </div>
              <div class="item-177 item-last-999">
                <span>Còn lại:</span>
                <span class="number-999 number-red">{{
                  (orderDetailV2.total_amount - orderDetailV2.deposit_cost)
                    | vnd
                }}</span>
              </div>
              <div>
                <span
                  class="order-all-999"
                  @click="orderAll()"
                  v-if="orderDetailV2.is_purchase"
                >
                  <span>Đặt hàng toàn bộ</span>
                </span>
              </div>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>

    <BankConfirm
      v-if="orderDetailV2.is_purchase"
      :randomOpen="randomOpen"
      :totalMoneyOrder="orderDetailV2.total_amount"
      @sentPaymentDone="sentPaymentDoneParent"
    />
  </div>
</template>

<script>
import BankConfirm from "@/views/order/detail-v2-components/BankConfirm";
export default {
  name: "DetailV2InfoCommon",
  props: {
    orderDetailV2: Object,
  },
  components: {
    BankConfirm,
  },
  data() {
    return {
      randomOpen: 0,
    };
  },
  methods: {
    orderAll() {
      this.randomOpen = Math.floor(Math.random() * 100000) + 1;
    },
    sentPaymentDoneParent() {
      // this.$emit("splitOrderDone", false);
      // Nếu đơn có 2 ncc thì cho nó về trang chủ
      if (this.orderDetailV2.suppliers.length > 1) {
        this.$router.push({
          name: "order-list",
        });
      } else {
        this.$emit("splitOrderDone", false);
      }
    },
  },
};
</script>

<style lang="css" scoped>
.order-detail-v2-info-common {
  padding: 20px 30px;
  background: #fff;
  margin-bottom: 15px;
}
.order-detail-v2-info-common .title-789ah {
  border-bottom: 1px solid #dfdbdb;
  padding: 22px 0px;
}
.order-detail-v2-info-common .title-789ah .order-code {
  font-weight: 700;
  font-size: 20px;
  line-height: 20px;
  letter-spacing: 0.01em;
  color: #575757;
  margin-right: 20px;
}
.order-detail-v2-info-common .title-789ah .btn-export-excel {
  border: 1px solid #b4b4b4;
  border-radius: 4px;
  display: flex;
  align-items-center: center;
  padding: 5px 21px;
  cursor: pointer;

  font-weight: 300;
  font-size: 13px;
  line-height: 16px;
  letter-spacing: 0.02em;
  text-transform: capitalize;
  color: #575757;
}
.order-detail-v2-info-common .title-789ah .btn-export-excel:hover {
  opacity: 0.8;
}
.btn-export-excel img {
  margin-right: 5px;
}

.info-789ah-left {
  padding-top: 20px;
}
.info-789ah-left .title-1 {
  font-weight: 500;
  font-weight: 700;
  font-size: 16px;
  line-height: 16px;
  letter-spacing: 0.02em;
  text-transform: uppercase;
  color: #575757;
  padding-bottom: 15px;
}
.info-789ah-left .address-1 {
  font-weight: 400;
  font-size: 14px;
  line-height: 16px;
  letter-spacing: 0.02em;
  text-transform: capitalize;
  color: #575757;
  margin-bottom: 43px;
}
.info-789ah-left .transport-1 {
  margin-bottom: 25px;
}
.info-789ah-left .transport-1 strong {
  font-weight: 500;
  font-size: 14px;
  line-height: 16px;
  letter-spacing: 0.02em;
  color: #575757;
}
.info-789ah-left .title-2 {
  font-weight: 500;
  font-size: 14px;
  line-height: 16px;
  letter-spacing: 0.02em;
  color: #575757;
  margin-bottom: 15px;
}
.info-789ah-left .note-2 {
  font-weight: 400;
  font-size: 14px;
  line-height: 16px;
  letter-spacing: 0.02em;
  color: #9c9c9c;
  font-style: italic;
}

.info-789ah-right .item-176 {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 38px;
  border-bottom: 1px solid #e6e6e6;
  padding-left: 100px;
  padding-right: 60px;
  font-weight: 400;
  font-size: 14px;
  line-height: 16px;
  letter-spacing: 0.02em;
  color: #575757;
}
.info-789ah-right .item-190-wrap {
  background: #f8f9fc;
  padding: 5px 60px 5px 100px;
  margin-top: 10px;
}
.info-789ah-right .item-177 {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 42px;
  border-bottom: 1px solid #e6e6e6;
  font-weight: 400;
  font-size: 14px;
  line-height: 16px;
  letter-spacing: 0.02em;
  color: #575757;
}
.number-999 {
  min-width: 100px;
  text-align: left;
  font-weight: 400;
  font-size: 14px;
  line-height: 16px;
  letter-spacing: 0.02em;
  color: #575757;
}
.number-red {
  color: #dd2120;
  font-weight: 700;
}
.item-last-999 {
  border-bottom: 1px solid transparent !important;
}

.order-all-999 {
  padding: 10px 20px;
  background: #26b01c;
  border-radius: 4px;
  font-weight: 500;
  font-size: 16px;
  line-height: 16px;
  letter-spacing: 0.02em;
  text-transform: uppercase;
  color: #ffffff;
  margin-top: 10px;
  margin-bottom: 20px;
  display: inline-block;
  cursor: pointer;
}
.order-all-999:hover {
  opacity: 0.8;
}
</style>
