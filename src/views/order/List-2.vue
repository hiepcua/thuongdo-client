<template>
  <div class="frame-content-common-2022 order-list" id="ST2022">
    <BreadcrumbTop text1="Quản lý đơn hàng" />
    <div class="order-list-status">
      <div class="item-1900" v-for="item in listStatus" :key="item.name">
        <span class="text" :style="{ color: item.color }">{{ item.name }}</span>
        <span class="icon" :style="{ backgroundColor: item.color }">{{
          item.quantity
        }}</span>
      </div>
    </div>
    <div class="order-list-filter">
      <div class="frame-filter-item-2022">
        <el-date-picker
          v-model="filter.date_from"
          type="date"
          :clearable="true"
          format="dd/MM/yyyy"
          value-format="yyyy-MM-dd"
          placeholder="Từ ngày"
          prefix-icon="a"
          align="center"
        >
        </el-date-picker>
      </div>
      <div class="frame-filter-item-2022">
        <el-date-picker
          v-model="filter.date_to"
          type="date"
          :clearable="true"
          format="dd/MM/yyyy"
          value-format="yyyy-MM-dd"
          placeholder="Đến ngày"
          prefix-icon="a"
          align="center"
        >
        </el-date-picker>
      </div>
      <div class="frame-filter-item-2022">
        <el-input
          placeholder="Mã đơn hàng"
          clearable
          v-model="filter.order_code"
          @keyup.enter.native="fetchOrder"
          class="frame-filter-innput-2022"
        ></el-input>
      </div>
      <div class="frame-filter-item-2022">
        <el-select
          v-model="filter.warehouse_id"
          placeholder="Kho nhận"
          class="frame-select-common-2022 frame-filter-select-2022"
          popper-class="frame-select-popper-common-2022"
          clearable
          size="small"
        >
          <el-option
            v-for="item in listWareHouse"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </div>
      <div class="frame-filter-item-2022">
        <el-select
          v-model="filter.status"
          placeholder="Trạng thái"
          class="frame-select-common-2022 frame-filter-select-2022"
          popper-class="frame-select-popper-common-2022"
          clearable
          size="small"
        >
          <el-option
            v-for="item in listStatus"
            :key="item.value"
            :label="item.name"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div>
    </div>
    <div class="order-list-table" v-loading="loading">
      <div class="item-762a81" v-for="item in listOrder" :key="item.order_id">
        <div class="header">
          <span class="code">Mã đơn hàng : {{ item.order_code }}</span>
          <span
            class="status"
            :style="{ backgroundColor: item.status.color }"
            >{{ item.status.name }}</span
          >
          <div class="date d-flex align-items-center">
            <img src="@/static/icon/order-list/date.svg" alt="" />
            <span>{{ item.date_ordered }}</span>
          </div>
          <div class="date d-flex align-items-center">
            <img src="@/static/icon/order-list/pack.svg" alt="" />
            <span
              ><span class="red">{{ item.packages_number }}</span> kiện
              hàng</span
            >
          </div>
        </div>
        <div class="content-170692y d-flex">
          <div class="table-170">
            <div class="table-v2-827292abc">
              <div v-for="(hic, index_hic) in item.suppliers" :key="index_hic">
                <div class="table-v2-827292abc-header d-flex">
                  <div class="icon-item first">
                    <span>Nhà Cung cấp: {{ hic.name }}</span>
                  </div>
                  <div class="icon-item">
                    <span>Số lượng</span>
                  </div>
                  <div class="icon-item">
                    <span>Đơn giá</span>
                  </div>
                  <div class="icon-item">
                    <span>Thành tiền</span>
                  </div>
                </div>
                <div
                  class="table-v2-827292abc-item d-flex"
                  v-for="i in hic.products"
                  :key="i.id"
                >
                  <div class="icon-item first">
                    <img :src="i.image" alt="" />
                    <div class="d-flex flex-column pl-3">
                      <span>{{ i.name }}</span>
                      <span class="sub-12x">{{ i.note }}</span>
                    </div>
                  </div>
                  <div class="icon-item">
                    <span>{{ i.quantity }}</span>
                  </div>
                  <div class="icon-item">
                    <div class="price-item d-flex flex-column">
                      <span>{{
                        (i.unit_price_cny * item.exchange_rate) | vnd
                      }}</span>
                      <span>¥{{ i.unit_price_cny }}</span>
                    </div>
                  </div>
                  <div class="icon-item">
                    <div class="price-item d-flex flex-column">
                      <span class="price-red">{{
                        (i.unit_price_cny * i.quantity * item.exchange_rate)
                          | vnd
                      }}</span>
                      <span class="price-red"
                        >¥{{ i.unit_price_cny * i.quantity }}</span
                      >
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="info-170">
            <div class="item-826">
              <span>Tổng tiền hàng:</span>
              <span>{{ item.order_cost | vnd }}</span>
            </div>
            <div class="item-826">
              <span>Phí đặt hàng:</span>
              <span>{{ item.order_fee | vnd }}</span>
            </div>
            <div class="item-826">
              <span>Phí kiểm đếm:</span>
              <span>0đ</span>
            </div>
            <div class="item-826">
              <span>Phí ship TQ:</span>
              <span>0đ</span>
            </div>
            <div class="item-826">
              <span>Tổng tiền đơn hàng:</span>
              <span class="red">{{ item.total_amount | vnd }}</span>
            </div>
            <div class="item-826">
              <span>Đặt cọc:</span>
              <span>{{ item.deposit_cost | vnd }}</span>
            </div>
            <div class="item-826">
              <span>Còn lại:</span>
              <span>{{ (item.total_amount - item.deposit_cost) | vnd }}</span>
            </div>
            <div class="pt-3 pb-1">
              <div class="item-562" @click="viewDetail(item.order_id)">
                <div class="img-91">
                  <img src="@/static/icon/order-list/detail.svg" alt="" />
                </div>
                <span>Xem chi tiết</span>
              </div>
              <div class="item-562">
                <div class="img-91">
                  <img src="@/static/icon/order-list/edit.svg" alt="" />
                </div>
                <span>Sửa</span>
              </div>
              <div class="item-562" v-if="item.status.value == 1000">
                <div class="img-91">
                  <img src="@/static/icon/order-list/report.svg" alt="" />
                </div>
                <span>Khiếu nại</span>
              </div>
              <div class="item-562">
                <div class="img-91">
                  <img src="@/static/icon/order-list/excel.svg" alt="" />
                </div>
                <span>Xuất excel</span>
              </div>
              <div class="item-562" @click="confirmCancelModel(item)">
                <div class="img-91">
                  <img src="@/static/icon/order-list/cancel.svg" alt="" />
                </div>
                <span>Hủy</span>
              </div>
              <div class="item-562" @click="confirmDeleteModel(item)">
                <div class="img-91">
                  <img src="@/static/icon/order-list/delete.svg" alt="" />
                </div>
                <span>Xóa</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        class="d-flex justify-content-center p-3"
        v-if="listOrder.length == 0 && loading == false"
      >
        Không có dữ liệu
      </div>
    </div>
    <div
      class="china-panigation-1988 d-flex justify-content-end pt-1"
      v-if="listOrder.length"
    >
      <el-pagination
        background
        layout="prev, pager, next"
        :page-size="pagination.per_page"
        :total="pagination.total"
        :current-page="filter.page"
        @current-change="changeCurrentPage"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import BreadcrumbTop from "@/components/BreadcrumbTop";
export default {
  name: "ListOrder",
  metaInfo() {
    return {
      title: "Quản lý đơn hàng",
    };
  },
  components: {
    BreadcrumbTop,
  },
  data() {
    return {
      // Phần search
      loading: true,
      searching: false,
      filter: {
        date_from: null,
        date_to: null,
        order_code: "",
        warehouse_id: "",
        status: "",
        page: 1,
        per_page: 5,
      },

      // Phần hiển thị
      listOrder: [],
      listStatus: [],
      listWareHouse: [],
      pagination: {
        total: 0,
        count: 0,
        per_page: 0,
        current_page: 1,
        total_pages: 0,
      },
    };
  },
  mounted() {
    this.fetchOrder();
    this.fetchOrderStatus();
    this.fetchWareHouse();
  },
  methods: {
    fetchOrderStatus() {
      axios.get("order/status").then((response) => {
        switch (response.code) {
          case 200:
            this.listStatus = response.data;
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
    fetchWareHouse() {
      axios.get("warehouse/vi").then((response) => {
        switch (response.code) {
          case 200:
            this.listWareHouse = response.data;
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
    fetchOrder(loading = true) {
      if (loading) {
        this.loading = true;
      }
      let filter = {
        status: this.filter.status,
        warehouse_id: this.filter.warehouse_id,
        order_code: this.filter.order_code,
        page: this.filter.page,
        per_page: this.filter.per_page,
      };

      filter.date_ordered = null;

      if (this.filter.date_from !== null) {
        filter.date_ordered = this.filter.date_from + ",2050-01-01";
      }
      if (this.filter.date_to !== null) {
        filter.date_ordered = "2022-01-01," + this.filter.date_to;
      }
      if (this.filter.date_from !== null && this.filter.date_to !== null) {
        filter.date_ordered = this.filter.date_from + "," + this.filter.date_to;
        const x = new Date(this.filter.date_from);
        const y = new Date(this.filter.date_to);
        if (x > y) {
          this.$message.error(
            "Từ ngày đang lớn hơn đến ngày. Vui lòng chọn lại"
          );
          setTimeout(() => {
            this.filter.date_from = null;
          }, 800);
        }
      }
      axios.get("order", { params: filter }).then((response) => {
        this.loading = false;
        switch (response.code) {
          case 200:
            this.listOrder = response.data.items;
            this.pagination.total = response.data.pagination.total;
            this.pagination.per_page = response.data.pagination.per_page;

            // Nếu listOrder = [] mà page >=2 thì get lại vs page = page - 1;
            if (this.listOrder.length == 0 && this.filter.page >= 2) {
              this.filter.page = this.filter.page - 1;
              this.fetchOrder();
            }
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
    // Thay đổi Current Page
    changeCurrentPage(currentPage) {
      this.filter.page = currentPage;
      this.fetchOrder();
      document.getElementById("ST2022").scrollIntoView({ behavior: "smooth" });
    },
    viewDetail(order_id) {
      this.$router.push({
        name: "order-detail",
        params: { order_id: order_id },
      });
    },
    confirmDeleteModel(order) {
      this.$confirm("Xác nhận xóa đơn hàng: " + order.order_code, "Cảnh báo", {
        confirmButtonText: "Đồng ý",
        cancelButtonText: "Hủy",
        type: "warning",
      })
        .then(() => {
          this.deleteModel(order);
        })
        .catch(() => {});
    },
    // Xóa bản ghi
    deleteModel(order) {
      axios.delete("order/" + order.order_id).then((response) => {
        switch (response.code) {
          case 200:
            this.$notify({
              title: "Thành công",
              message: "Xóa bản ghi thành công",
              type: "success",
            });
            this.fetchOrder();
            this.fetchOrderStatus();
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

    confirmCancelModel(order) {
      this.$confirm("Xác nhận hủy đơn hàng: " + order.order_code, "Cảnh báo", {
        confirmButtonText: "Đồng ý",
        cancelButtonText: "Hủy",
        type: "warning",
      })
        .then(() => {
          this.cancelModel(order);
        })
        .catch(() => {});
    },
    cancelModel(order) {
      axios.get("order/cancel/" + order.order_id).then((response) => {
        switch (response.code) {
          case 200:
            this.$notify({
              title: "Thành công",
              message: "Hủy bản ghi thành công",
              type: "success",
            });
            this.fetchOrder();
            this.fetchOrderStatus();
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
  watch: {
    "filter.status": function () {
      this.filter.page = 1;
      this.fetchOrder();
    },
    "filter.warehouse_id": function () {
      this.filter.page = 1;
      this.fetchOrder();
    },
    "filter.date_from": function () {
      this.filter.page = 1;
      this.fetchOrder();
    },
    "filter.date_to": function () {
      this.filter.page = 1;
      this.fetchOrder();
    },
  },
};
</script>

<style lang="css" scoped>
.order-list-status {
  background-color: #fff;
  height: 44px;
  align-items: center;
  display: flex;
}
.order-list-status .item-1900 {
  display: flex;
  align-items: center;
  cursor: pointer;
  user-select: none;
}
.order-list-status .item-1900:hover {
  opacity: 0.8;
}
.order-list-status .text {
  font-weight: 400;
  font-size: 12px;
  line-height: 14px;
  text-align: center;
  letter-spacing: 0.02em;
  color: #ff568a;
  padding-left: 30px;
}
.order-list-status .icon {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  color: #fff;
  margin-left: 5px;
  background-color: #ff568a;
  font-weight: 400;
  font-size: 14px;
}

/*order-list-filter*/
.order-list-filter {
  background-color: #fff;
  height: 88px;
  align-items: center;
  display: flex;
  margin-top: 15px;
  padding-left: 30px;
  margin-bottom: 15px;
}

/*order-list-table*/
.order-list-table {
  margin-bottom: 10px;
  min-height: 300px;
}
.item-762a81 {
  margin-bottom: 10px;
}
.item-762a81 .header {
  height: 50px;
  background: #d9eaff;
  display: flex;
  align-items: center;
  padding-left: 30px;
}
.item-762a81 .header .code {
  font-weight: 700;
  font-size: 14px;
  line-height: 16px;
  color: #575757;
  margin-right: 15px;
}
.item-762a81 .header .status {
  background: #d62d69;
  border-radius: 4px;
  display: inline-block;
  font-weight: 400;
  font-size: 10px;
  line-height: 20px;
  letter-spacing: 0.01em;
  color: #ffffff;
  padding: 0px 6px;
  margin-right: 40px;
}
.item-762a81 .header .date {
  margin-right: 25px;
}
.item-762a81 .header .date img {
  width: 15px;
  margin-right: 7px;
}
.item-762a81 .header .date span {
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: 0.01em;
  color: #575757;
}
.item-762a81 .header .date span.red {
  color: #dd2120;
}

.content-170692y {
  padding: 15px 30px;
  background-color: #fff;
}
.content-170692y .table-170 {
  width: calc(100% - 240px);
}
.content-170692y .info-170 {
  width: 250px;
  background-color: #fff;
  min-height: 250px;
  border: 1px solid #b4b4b4;
  padding: 10px;
}
.content-170692y .info-170 .item-826 {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 30px;
  border-bottom: 1px solid #b4b4b4;
}
.content-170692y .info-170 .item-826 .red {
  color: #dd2120;
}

.content-170692y .info-170 .item-562 {
  display: flex;
  align-items: center;
  border: 1px solid #3f92d1;
  border-radius: 4px;
  height: 24px;
  cursor: pointer;
  user-select: none;
  padding-left: 20px;
  margin-bottom: 7px;
}
.content-170692y .info-170 .item-562:hover {
  opacity: 0.8;
}
.content-170692y .info-170 .item-562 span {
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  letter-spacing: 0.02em;
  color: #3f92d1;
  margin-left: 8px;
}
.content-170692y .info-170 .item-562 .img-91 {
  width: 14px;
  text-align: center;
}

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
  width: 420px;
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

.table-v2-827292abc-item .first img {
  width: 70px;
}
.table-v2-827292abc-item .first span {
  line-height: 16px;
}
.table-v2-827292abc-item .first .sub-12x {
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  letter-spacing: 0.02em;
  text-transform: capitalize;
  color: #8b8b8b;
  margin-top: 5px;
}

.table-v2-827292abc-item .price-item span {
  line-height: 20px;
}
.table-v2-827292abc-item .price-item .price-red {
  color: #dd2120;
}
</style>

<style type="text/css"></style>
