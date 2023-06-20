<template>
  <div class="order-detail-v2-ncc">
    <div
      v-for="(hic, index_hic) in orderDetailV2.suppliers"
      :key="index_hic"
      class="pb-4"
    >
      <el-row :gutter="10">
        <el-col :span="16">
          <div class="table-v2-827292abc">
            <div class="table-v2-827292abc-header d-flex">
              <div class="icon-item first">
                <span>Nhà Cung cấp: {{ hic.name }}</span>
              </div>
              <div class="icon-item"></div>
            </div>
            <div
              class="table-v2-827292abc-item d-flex"
              v-for="i in hic.products"
              :key="i.id"
            >
              <div class="icon-item first info-main-892s">
                <div class="image">
                  <img :src="i.image" alt="" />
                </div>
                <div class="d-flex flex-column pl-3">
                  <span class="line-1">{{ i.name }}</span>
                  <span class="line-2">{{ i.classification }}</span>
                  <span class="line-3"
                    >Số lượng: <strong>{{ i.quantity }}</strong></span
                  >
                  <span class="line-4"
                    >Giá:
                    <strong class="strong-1">{{
                      (i.unit_price_cny *
                        i.quantity *
                        orderDetailV2.exchange_rate)
                        | vnd
                    }}</strong>
                    <strong>¥{{ i.unit_price_cny * i.quantity }}</strong></span
                  >
                  <span class="line-5"
                    ><a :href="i.url" target="_blank"
                      >Đường dẫn: {{ i.url }}</a
                    ></span
                  >
                </div>
              </div>
              <div class="icon-item">
                <span class="table-v2-827292abc-note-90s">{{ i.note }}</span>
              </div>
            </div>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="info-789ah-right d-flex flex-column">
            <div class="item-176">
              <span>Tổng tiền hàng:</span>
              <span class="number-999">{{ hic.total_order | vnd }}</span>
            </div>
            <div class="item-176">
              <span>Phí đặt hàng:</span>
              <span class="number-999">{{ hic.order_fee | vnd }}</span>
            </div>
            <div class="item-176">
              <span>Phí đóng kiện:</span>
              <span class="number-999">0đ</span>
            </div>
            <div class="item-176">
              <span>Phí chiết khấu:</span>
              <span class="number-999">0đ</span>
            </div>
            <div class="item-176">
              <span>Phí kiểm đếm:</span>
              <span class="number-999">0đ</span>
            </div>
            <div class="item-176">
              <span>Phí ship TQ:</span>
              <span class="number-999">0đ</span>
            </div>
            <div class="item-176 item-last-999">
              <span>Phí vận chuyển quốc tế:</span>
              <span class="number-999">0đ</span>
            </div>
            <div class="item-190-wrap">
              <div class="item-177 item-last-999">
                <span>Tổng tiền đơn hàng:</span>
                <span class="number-999 number-red">{{
                  hic.total_amount | vnd
                }}</span>
              </div>
              <span class="order-now-7788ab" @click="confirmsplitOrder(hic)"
                >Đặt hàng ngay</span
              >
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "DetailV2NCC",
  props: {
    orderDetailV2: Object,
  },
  data() {
    return {};
  },
  methods: {
    confirmsplitOrder(item) {
      console.log(item);
      this.$confirm("Xác nhận tách đơn", "Cảnh báo", {
        confirmButtonText: "Đồng ý",
        cancelButtonText: "Hủy",
        type: "warning",
      })
        .then(() => {
          this.splitOrder(item);
        })
        .catch(() => {});
    },
    // Xóa bản ghi
    splitOrder(item) {
      axios
        .get("order/split/" + this.$route.params.order_id + "/" + item.id)
        .then((response) => {
          switch (response.code) {
            case 200:
              this.$notify({
                title: "Thành công",
                message: "Tách đơn thành công",
                type: "success",
              });
              this.$emit("splitOrderDone", false);
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
  },
};
</script>

<style lang="css" scoped>
.order-detail-v2-ncc {
  padding: 20px 30px;
  background: #fff;
  margin-bottom: 15px;
}

/*Khúc thông tin tiền*/
.info-789ah-right .item-176 {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 38px;
  border-bottom: 1px solid #e6e6e6;
  padding-left: 30px;
  padding-right: 0px;
  font-weight: 400;
  font-size: 14px;
  line-height: 16px;
  letter-spacing: 0.02em;
  color: #575757;
}
.info-789ah-right .item-190-wrap {
  background: #f8f9fc;
  padding: 5px 0px 15px 30px;
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
.order-now-7788ab {
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
  display: inline-block;
  cursor: pointer;
}
.order-now-7788ab:hover {
  opacity: 0.8;
}
/*Hết khúc thông tin tiền*/

/*Đè bảng*/
.table-v2-827292abc {
  padding-right: 30px;
}
.table-v2-827292abc .icon-item {
  font-weight: 400;
  font-size: 14px;
  line-height: 16px;
  text-align: center;
  letter-spacing: 0.02em;
  text-transform: capitalize;
  color: #575757;
  border-bottom: 1px solid #dfdbdb;
}
.table-v2-827292abc .icon-item.first {
  text-align: left;
  display: flex;
  user-select: none;
  width: 500px;
  flex-grow: initial;
}
.table-v2-827292abc-header .icon-item {
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  color: #575757;
}
.table-v2-827292abc-header .first span {
  font-weight: 500;
  font-weight: 700;
  font-size: 14px;
  line-height: 16px;
  color: #575757;
}
.table-v2-827292abc-note-90s {
  color: #ccc;
}
.info-main-892s .image img {
  width: 70px;
}
.info-main-892s span {
  margin-bottom: 8px;
}
.info-main-892s .line-1 {
  font-weight: 700;
  font-size: 16px;
  line-height: 24px;
  text-transform: capitalize;
  color: #575757;
}
.info-main-892s .line-2 {
  font-weight: 400;
  font-size: 14px;
  line-height: 16px;
  letter-spacing: 0.02em;
  text-transform: capitalize;
  color: #8b8b8b;
}
.info-main-892s .line-3 {
  font-weight: 400;
  font-size: 14px;
  line-height: 16px;
  letter-spacing: 0.02em;
  text-transform: capitalize;
  color: #8b8b8b;
}
.info-main-892s .line-3 strong {
  color: #575757;
}
.info-main-892s .line-4 {
  font-weight: 400;
  font-size: 14px;
  line-height: 16px;
  letter-spacing: 0.02em;
  color: #8b8b8b;
}
.info-main-892s .line-4 strong {
  font-weight: 700;
  color: #575757;
}
.info-main-892s .line-4 .strong-1 {
  margin-right: 15px;
}
.info-main-892s .line-5 a {
  font-weight: 400;
  font-size: 14px;
  line-height: 16px;
  letter-spacing: 0.02em;
  color: #8b8b8b;
  text-decoration: none;
}
/*Hết Đè bảng*/
</style>
