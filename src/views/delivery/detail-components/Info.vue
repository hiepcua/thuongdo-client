<template>
  <div class="info-detail-delivey">
    <span class="title-main">Chi tiết giao hàng</span>
    <div
      class="info-wrap-action d-flex justify-content-between align-items-center pt-1 pb-4"
    >
      <div class="info-wrap d-flex align-items-center">
        <strong>Khách hàng:</strong>
        <span>{{ deliveryDetail.delivery.receiver }}</span>

        <strong>SĐT:</strong>
        <span>{{ deliveryDetail.delivery.phone_number }}</span>

        <strong>Ngày tạo:</strong>
        <span>{{ deliveryDetail.created_at }}</span>
      </div>
      <div
        class="btn-delete-delivey"
        v-if="deliveryDetail.is_delete"
        @click="confirmDeleteModel()"
      >
        <span>Xóa giao hàng</span>
      </div>
    </div>
    <div class="table-element-custom-2022 boder delivey-detail-table-89">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column label="Thông tin giao hàng" width="300">
          <div class="item-9271a">
            <img src="@/static/icon/order-detail-v2/tab3/user.svg" />
            <span>{{ deliveryDetail.delivery.receiver }}</span>
          </div>
          <div class="item-9271a">
            <img src="@/static/icon/order-detail-v2/tab3/phone.svg" />
            <span>{{ deliveryDetail.delivery.phone_number }}</span>
          </div>
          <div class="item-9271a">
            <img src="@/static/icon/order-detail-v2/tab3/localtion.svg" />
            <span>{{ deliveryDetail.delivery.address }}</span>
          </div>
        </el-table-column>
        <el-table-column label="Ngày giao" property="date">
          <span>{{ deliveryDetail.date }}</span>
        </el-table-column>
        <el-table-column label="Hàng vẫn chuyển" property="transporter">
          <span>{{ deliveryDetail.transporter }}</span>
        </el-table-column>
        <el-table-column label="Phí vận chuyển" property="delivery_cost">
          <!-- <span>{{ deliveryDetail.delivery_cost | vnd }}</span> -->
          <span v-if="deliveryDetail.delivery_cost == 0" class="bg-red">
            Chờ báo giá
          </span>
          <span v-else class="color-red">{{
            deliveryDetail.delivery_cost | vnd
          }}</span>
        </el-table-column>
        <el-table-column label="Hình thức thanh toán" property="payment">
          <span>{{ deliveryDetail.payment }}</span>
        </el-table-column>
        <el-table-column label="Tiền hàng + ShipTQ">
          <span>{{ deliveryDetail.shipping_and_order_cost | vnd }}</span>
        </el-table-column>
        <el-table-column label="Tổng phí thu">
          <!-- <span>{{ deliveryDetail.amount | vnd }}</span> -->
          <span class="bg-red" v-if="isNaN(deliveryDetail.amount)">
            Chờ báo giá
          </span>
          <span v-else>{{ deliveryDetail.amount | vnd }}</span>
        </el-table-column>
        <el-table-column label="Trạng thái" width="100">
          <div>
            <span
              class="order-detail-icon-status-6868amg"
              :style="{ backgroundColor: deliveryDetail.status.color }"
              >{{ deliveryDetail.status.name }}</span
            >
          </div>
        </el-table-column>
        <el-table-column label="Ghi chú">
          <span>{{ deliveryDetail.note }}</span>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "InfoDetailDelivery",
  data() {
    return {
      deliveryDetail: {
        delivery: {},
        status: {},
      },
      tableData: [],
    };
  },
  mounted() {
    this.fetchOrder();
  },
  methods: {
    fetchOrder() {
      axios
        .get("delivery/detail/" + this.$route.params.delivery_id)
        .then((response) => {
          this.loading = false;
          switch (response.code) {
            case 200:
              this.deliveryDetail = response.data;
              this.tableData = [{}];
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

    // Xóa
    confirmDeleteModel() {
      this.$confirm("Xác nhận xóa giao hàng", "Cảnh báo", {
        confirmButtonText: "Đồng ý",
        cancelButtonText: "Hủy",
        type: "warning",
      })
        .then(() => {
          this.deleteModel();
        })
        .catch(() => {});
    },
    // Xóa bản ghi
    deleteModel() {
      axios
        .delete("delivery/" + this.$route.params.delivery_id)
        .then((response) => {
          switch (response.code) {
            case 200:
              this.$notify({
                title: "Thành công",
                message: "Xóa bản ghi thành công",
                type: "success",
              });
              this.$router.push({
                name: "delivery-list",
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
  },
};
</script>

<style lang="css" scoped>
.info-detail-delivey {
  background-color: #fff;
  color: #575757;
  padding: 30px 20px;
}
.info-detail-delivey .title-main {
  font-weight: 500;
  font-size: 16px;
  line-height: 16px;
  text-transform: uppercase;
}
.info-wrap-action .info-wrap strong {
  margin-right: 5px;
}
.info-wrap-action .info-wrap span {
  margin-right: 15px;
}
.info-wrap-action .btn-delete-delivey {
  border: 1px solid #8b8b8b;
  border-radius: 4px;
  padding: 6px 30px;
  text-transform: uppercase;
  font-size: 14px;
  color: #8b8b8b;
  cursor: pointer;
}
.info-wrap-action .btn-delete-delivey:hover {
  opacity: 0.8;
}

.delivey-detail-table-89 .item-9271a img {
  margin-right: 5px;
}
.bg-red {
  background-color: #dd2120;
  color: #fff;
  padding: 2px 9px;
  border-radius: 4px;
  font-size: 10px;
}
</style>
