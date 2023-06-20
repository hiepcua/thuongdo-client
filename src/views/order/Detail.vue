<template>
  <div class="frame-content-common-2022">
    <div class="order-detail">
      <div class="order-detail-status d-flex justify-content-between">
        <div>
          <div class="header">
            <span class="code">Mã đơn hàng: {{ listOrder.order_code }}</span>
            <span
              class="status"
              :style="{ backgroundColor: listOrder.status.color }"
              >{{ listOrder.status.name }}
            </span>
          </div>
        </div>
        <div class="d-flex justify-content-center align-items-center icon">
          <div class="edit d-flex align-items-center justify-content-center">
            <img src="@/static/icon/order-detail/edit.svg" alt="" />
            <span>Sửa đơn hàng</span>
          </div>
          <div
            class="edit d-flex align-items-center ml-3 justify-content-center"
          >
            <img src="@/static/icon/order-detail/delete.svg" alt="" />
            <span>Hủy đơn</span>
          </div>
          <div
            class="edit d-flex align-items-center ml-3 justify-content-center"
          >
            <img src="@/static/icon/order-detail/export.svg" alt="" />
            <span>Xuất Exel</span>
          </div>
        </div>
      </div>
      <div class="line"></div>
      <div class="order-info">
        <el-row>
          <el-col :span="12" class="pr-3">
            <div class="title-wrap">
              <span class="title-1">kho nhận hàng (*)</span>
              <div class="excerpt">
                <span>{{ listOrder.warehouse.address }}</span>
              </div>
            </div>
            <div class="title-wrap mt-5">
              <span class="title-1">thông tin mua hàng</span>
              <div class="excerpt">
                <span
                  >Bé kiên - 0888285559, 298 Trần Điền, Định Công, Thanh Xuân,
                  Hà Nội</span
                >
              </div>
            </div>
            <div class="title-wrap mt-4 title-2">
              <span>Vận chuyển</span>
              <span>{{ listOrder.services }}</span>
              <span>,</span>
              <span>Kiểm hàng</span>
            </div>
            <div class="title-wrap mt-4">
              <span class="title-2">Ghi chú cho thương đô</span>
              <el-input
                class="text"
                type="textarea"
                placeholder="Ghi chú chung dành cho nhà cung cấp"
                :rows="2"
                v-model="textarea"
              >
              </el-input>
            </div>
          </el-col>
          <el-col :span="12" class="pl-3">
            <div class="pricce-take-826218-item">
              <span class="title">Tổng tiền đặt hàng:</span>
              <span class="number">{{ listOrder.total_order | vnd }}</span>
            </div>
            <div class="pricce-take-826218-item">
              <span class="title">Phí đặt hàng:</span>
              <span class="number">{{ listOrder.order_fee | vnd }}</span>
            </div>
            <div class="pricce-take-826218-item">
              <span class="title">Phí đóng kiện:</span>
              <span class="number">đ</span>
            </div>
            <div class="pricce-take-826218-item">
              <span class="title">Phí chiết khấu:</span>
              <span class="number">đ</span>
            </div>
            <div class="pricce-take-826218-item">
              <span class="title">Phí kiểm đếm:</span>
              <span class="number">đ</span>
            </div>
            <div class="pricce-take-826218-item">
              <span class="title">Phí ship TQ:</span>
              <span class="number">đ</span>
            </div>
            <div class="pricce-take-826218-item">
              <span class="title">Phí vận chuyển quốc tế:</span>
              <span class="number">đ</span>
            </div>
            <div class="pricce-take-826218-item-total d-flex flex-column">
              <div class="pricce-take-826218-item">
                <span class="title">Tổng tiền đơn hàng:</span>
                <span class="number">{{ listOrder.total_amount | vnd }}</span>
              </div>
              <div class="pricce-take-826218-item">
                <span class="title">Đã đặt cọc:</span>
                <span class="number">đ</span>
              </div>
              <div class="pricce-take-826218-item">
                <span class="title">Còn lại:</span>
                <span class="number">{{
                  (listOrder.total_amount - listOrder.deposit_cost) | vnd
                }}</span>
              </div>
              <!-- <div class="pricce-take-826218-abc-item">
                <span class="title-1"
                  >quý khách vui lòng nạp thêm
                  <span class="title-2">...đ</span> để đặt hàng</span
                >
              </div> -->
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
    <div class="list-order-detail">
      <div>
        <div class="first">
          <span>Nhà cung cấp: </span>
        </div>
        <div class="table-v2-827292abcd-header d-flex">
          <div class="icon-item-image">
            <img :src="listOrder.products.image" alt="" />
          </div>
          <div class="icon-item-detail d-flex flex-column">
            <span class="name">{{ listOrder.products.name }}</span>
            <span>Phân loại hàng: </span>
            <span>Số lượng: </span>
            <span>Đường dẫn:</span>
          </div>
          <div class="icon-item">
            <el-input
              type="textarea"
              placeholder="Ghi chú cho sản phẩm đặt mua này"
              :rows="2"
              v-model="textarea"
            ></el-input>
          </div>
          <div class="icon-item">
            <div
              class="price-item d-flex flex-column justify-content-center align-items-center pt-3"
            >
              <span class="price-red">2630,823 đ</span>
              <span class="price-red">¥377.64</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="total-package">
      <span>Tổng số kiện hàng: 3</span>
    </div>
    <div class="history">
      <div class="title">
        <span>lịch sử hoạt dộng</span>
      </div>
      <div class="history-detail">
        <div
          class="d-flex justify-content-start align-items-start"
          v-for="i in 7"
          :key="i"
        >
          <span class="date">24-08-2022</span>
          <span class="hours">20:26:15</span>
          <span class="text">Vũ Phương Thảo đặt lại địa chỉ giao hàng</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "DetailOrder",
  metaInfo() {
    return {
      title: "Chi tiết đơn hàng",
    };
  },
  data() {
    return {
      loading: true,
      textarea: "",
      listOrder: {
        status: {
          color: "",
          name: "",
          value: "",
        },
        warehouse: {
          address: "",
          id: "",
        },
        products: {
          name: "",
          image: "",
        },
      },
    };
  },
  mounted() {
    // ID của đơn hàng đây e nhé
    // console.log(this.$route.params.order_id);
    this.fetchOrder();
  },
  methods: {
    fetchOrder(loading = true) {
      if (loading) {
        this.loading = true;
      }
      axios.get("order/" + this.$route.params.order_id).then((response) => {
        this.loading = false;
        switch (response.code) {
          case 200:
            this.listOrder = response.data;
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
    //
  },
};
</script>

<style lang="css" scoped>
/* order-detail  */
.order-detail {
  background: #fff;
  padding: 21px 30px 45px 40px;
}
.order-detail .header span.code {
  font-weight: 700;
  font-size: 16px;
  line-height: 20px;
  letter-spacing: 0.01em;
  color: #575757;
}
.order-detail .header .status {
  font-weight: 400;
  font-size: 10px;
  line-height: 20px;
  letter-spacing: 0.01em;
  color: #fff;
  margin-left: 7px;
  border-radius: 4px;
  padding: 5px 9px 5px 5px;
}
.order-detail .icon .edit {
  cursor: pointer;
  border: 1px solid #b4b4b4;
  border-radius: 4px;
  width: 149px;
  height: 32px;
}
.order-detail .icon .edit:hover {
  background: #1d60a6;
}
.order-detail .icon .edit:hover > span {
  color: #fff;
}
.order-detail .icon span {
  font-weight: 400;
  font-size: 14px;
  line-height: 16px;
  letter-spacing: 0.02em;
  text-transform: capitalize;
  color: #575757;
  padding-left: 6px;
}
.order-detail .line {
  border-top: 0.3px solid #b4b4b4;
  margin-top: 28px;
  margin-bottom: 20px;
}
.order-info .title-wrap span.title-1 {
  font-weight: 500;
  font-size: 16px;
  line-height: 16px;
  letter-spacing: 0.02em;
  text-transform: uppercase;
  color: #575757;
}
.order-info .title-wrap .excerpt {
  margin-top: 17px;
  font-weight: 400;
  font-size: 14px;
  line-height: 16px;
  letter-spacing: 0.02em;
  text-transform: capitalize;
  color: #575757;
}
.order-info .title-wrap.title-2 span {
  font-weight: 500;
  font-size: 14px;
  line-height: 16px;
  letter-spacing: 0.02em;
  color: #575757;
  margin-right: 28px;
}
.order-info .title-wrap .text {
  margin-top: 1em;
}
.pricce-take-826218-item {
  padding: 10px 10px 10px 15px;
}
.pricce-take-826218-item .title,
.pricce-take-826218-item .number {
  width: 160px;
  display: inline-block;
  color: #575757;
  font-size: 14px;
  line-height: 16px;
  font-weight: 400;
  letter-spacing: 0.02em;
}
.pricce-take-826218-item .number {
  padding-left: 2em;
}
.pricce-take-826218-item-total {
  border-top: 0.3px solid #b4b4b4;
  margin-top: 23px;
  padding-top: 23px;
}
.pricce-take-826218-item-total .number {
  color: #dd2120;
}
.pricce-take-826218-abc-item {
  background: #fde9ea;
  margin-top: 24px;
  padding: 12px 0 13px 0;
  text-align: center;
}
.pricce-take-826218-abc-item span.title-1 {
  font-weight: 400;
  font-size: 14px;
  line-height: 16px;
  letter-spacing: 0.02em;
  text-transform: capitalize;
  color: #da0606;
  text-align: center;
}
.pricce-take-826218-abc-item span.title-2 {
  font-weight: bold;
  font-size: 22px;
  text-transform: none;
}
/* List-order-detail  */
.list-order-detail {
  background: #fff;
  padding: 21px 80px 45px 110px;
  margin-top: 1em;
}
.table-v2-827292abcd-header {
  margin-top: 29px;
  border-bottom: 0.3px solid #b4b4b4;
  padding-bottom: 20px;
}
.table-v2-827292abcd-header .icon-item-image {
  width: 100px;
}
.table-v2-827292abcd-header .icon-item-image img {
  width: 100px;
}
.table-v2-827292abcd-header .icon-item-detail {
  width: 590px;
  padding: 0 1em;
}
.table-v2-827292abcd-header .icon-item {
  width: 160px;
}
.list-order-detail .first {
  font-weight: 700;
  font-size: 14px;
  line-height: 16px;
  color: #575757;
}
.icon-item-detail .name {
  font-size: 16px;
  color: #575757;
}
.icon-item-detail {
  font-weight: 400;
  font-size: 14px;
  line-height: 24px;
  text-transform: capitalize;
  color: #8b8b8b;
}
.icon-item .price-red {
  font-weight: 400;
  font-size: 14px;
  line-height: 16px;
  letter-spacing: 0.02em;
  color: #dd2120;
}
/* Tổng số kiện hàng  */
.total-package {
  background: #fff;
  margin-top: 1em;
  padding: 18px 0 17px 40px;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: 0.01em;
  color: #1771c1;
}
/* Lịch sử  */
.history {
  background: #fff;
  margin-top: 1em;
  padding: 19px 0 22px 40px;
}
.history .title {
  font-weight: 700;
  font-size: 14px;
  line-height: 16px;
  letter-spacing: 0.02em;
  text-transform: uppercase;
  color: #575757;
}
.history-detail .d-flex {
  border-bottom: 0.3px solid #b4b4b4;
  padding-bottom: 16px;
  padding-top: 11px;
}
.history-detail span {
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: 0.01em;
  color: #575757;
  padding-right: 2em;
}
</style>
<style>
.order-info .title-wrap .text .el-textarea__inner,
.icon-item .el-textarea__inner {
  border: none;
  outline: none;
}
.order-info .title-wrap .text .el-textarea__inner::placeholder,
.icon-item .el-textarea__inner::placeholder {
  font-style: italic;
  font-weight: 400;
  font-size: 14px;
  line-height: 16px;
  letter-spacing: 0.02em;
  text-transform: capitalize;
  color: #9c9c9c;
}
.img img {
  width: 50px;
  height: 50px;
}
</style>
