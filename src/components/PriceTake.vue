<template>
  <div class="pricce-take-826218" v-loading="loading">
    <div class="title-wrap d-flex align-items-center">
      <span class="title-1">ĐƠN HÀNG</span>
    </div>
    <div class="pricce-take-826218-item">
      <span class="title">Tổng tiền đặt hàng:</span>
      <span class="number">{{ priceTotal.total_amount_cny | number }}đ</span>
    </div>
    <div class="pricce-take-826218-item">
      <span class="title">Phí đặt hàng:</span>
      <span class="number">{{ priceTotal.total_fee_cny | number }}đ</span>
    </div>
    <div class="pricce-take-826218-item">
      <span class="title">Phí kiểm đếm:</span>
      <span class="number">0đ</span>
    </div>
    <div class="pricce-take-826218-item">
      <span class="title">Phí chiết khấu:</span>
      <span class="number">0đ</span>
    </div>
    <div class="pricce-take-826218-item-total d-flex flex-column">
      <span class="title">Tổng tiền/Chưa có phí ship TQ:</span>
      <span class="number"
        >{{ priceTotal.total_amount_cny_not_ship | number }}đ</span
      >
    </div>
  </div>
</template>

<script>
export default {
  name: "PriceTake",
  props: {
    priceTotal: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      loading: false,
    };
  },
  mounted() {},
  methods: {},
};
</script>

<style lang="css" scoped>
.pricce-take-826218 {
  padding: 20px 15px 20px 45px;
  /*min-height: 342px;*/
  background-color: #fff;
  width: 100%;
  height: calc(100% - 50px);
  margin-left: 15px;
}
.pricce-take-826218 .title-wrap {
  margin-bottom: 22px;
}
.pricce-take-826218 .title-1 {
  font-weight: 500;
  font-weight: 700;
  color: #575757;
}
.pricce-take-826218-item {
  border-bottom: 1px solid #b4b4b4;
  padding: 10px 10px 10px 15px;
}
.pricce-take-826218-item .title {
  width: 135px;
  display: inline-block;
  color: #575757;
  font-size: 14px;
}
.pricce-take-826218-item .number {
  font-size: 14px;
  color: #dd2120;
}
.pricce-take-826218-item-total {
  padding: 30px 10px 10px 15px;
}
.pricce-take-826218-item-total .title {
  font-size: 15px;
  font-weight: 500;
  font-weight: 700;
  color: #575757;
}
.pricce-take-826218-item-total .number {
  font-size: 32px;
  letter-spacing: 0.02em;
  text-transform: capitalize;
  color: #dd2120;
  margin-top: 10px;
  font-weight: 500;
}
</style>
