<template>
  <div class="frame-content-common-2022 delivery-list" id="ST2022">
    <BreadcrumbTop text1="Quản lý giao hàng" />
    <div class="delivery-list-filter">
      <div class="d-flex">
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
            placeholder="Mã vận đơn"
            clearable
            v-model="filter.bill_code"
            @keyup.enter.native="fetchDatabaseModel"
            class="frame-filter-innput-2022"
          ></el-input>
        </div>
        <div class="frame-filter-item-2022">
          <el-input
            placeholder="Mã bưu điện"
            clearable
            v-model="filter.postcode"
            @keyup.enter.native="fetchDatabaseModel"
            class="frame-filter-innput-2022"
          ></el-input>
        </div>
        <div class="frame-filter-item-2022">
          <el-select
            v-model="filter.transporter_id"
            placeholder="Phương thức vận chuyển"
            class="frame-select-common-2022 frame-filter-select-2022"
            popper-class="frame-select-popper-common-2022"
            clearable
            size="small"
          >
            <el-option
              v-for="item in lists.listTransporter"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </div>
        <div class="frame-filter-item-2022">
          <el-select
            v-model="filter.payment"
            placeholder="Hình thức thanh toán"
            class="frame-select-common-2022 frame-filter-select-2022"
            popper-class="frame-select-popper-common-2022"
            clearable
            size="small"
          >
            <el-option
              v-for="item in lists.listType"
              :key="item.key"
              :label="item.value"
              :value="item.key"
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
              v-for="item in lists.listStatus"
              :key="item.value"
              :label="item.name"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </div>
      </div>
    </div>
    <div
      class="table-element-custom-2022 delivery-list-table"
      v-loading="loading"
    >
      <el-table
        :data="listData"
        style="
          width: 100%;
          border-right: 1px solid #ebeef5;
          border-left: 1px solid #ebeef5;
        "
      >
        <el-table-column type="index" label="STT" width="50"></el-table-column>
        <el-table-column
          label="Ngày tạo"
          width="120"
          property="created_at"
        ></el-table-column>
        <el-table-column
          label="Mã vận đơn"
          width="120"
          property="created_at"
        ></el-table-column>
        <el-table-column label="Thông tin giao hàng" width="250">
          <template slot-scope="scope">
            <div class="item-9271a">
              <img src="@/static/icon/order-detail-v2/tab3/user.svg" />
              <span>{{ scope.row.delivery.receiver }}</span>
            </div>
            <div class="item-9271a">
              <img src="@/static/icon/order-detail-v2/tab3/phone.svg" />
              <span>{{ scope.row.delivery.phone_number }}</span>
            </div>
            <div class="item-9271a">
              <img src="@/static/icon/order-detail-v2/tab3/localtion.svg" />
              <span>{{ scope.row.delivery.address }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="Ngày giao" property="date"></el-table-column>
        <el-table-column
          label="Hàng vẫn chuyển"
          property="transporter"
        ></el-table-column>
        <el-table-column
          label="Phí vận chuyển"
          property="delivery_cost"
        ></el-table-column>
        <el-table-column
          label="Tổng phí thu"
          property="amount"
        ></el-table-column>
        <el-table-column
          label="Hình thức thanh toán"
          property="payment"
        ></el-table-column>
        <el-table-column label="Trạng thái" width="100">
          <template slot-scope="scope">
            <div>
              <span
                class="show-detail-782fkme"
                v-if="scope.row.is_delete"
                @click="confirmDeleteModel(scope.row)"
                >Xóa</span
              >
            </div>
            <div>
              <span
                class="order-detail-icon-status-6868amg"
                :style="{ backgroundColor: scope.row.status.color }"
                >{{ scope.row.status.name }}</span
              >
            </div>
          </template>
        </el-table-column>
        <el-table-column label="Thao tác" width="100">
          <template slot-scope="scope">
            <div class="d-flex" @click="viewDetail(scope.row.id)">
              <img src="@/static/icon/order-detail-v2/detail.svg" />
              <span class="show-detail-782fkme">Chi tiết</span>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div
      class="china-panigation-1988 d-flex justify-content-end pt-1"
      v-if="listData.length"
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
  name: "ListDelivery",
  metaInfo() {
    return {
      title: "Quản lý giao hàng",
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
        bill_code: "",
        postcode: "", // Mã bưu điện
        transporter_id: "",
        payment: "",
        status: "",
        page: 1,
        per_page: 15,
      },

      lists: {
        listStatus: [],
        listTransporter: [],
        listType: [
          {
            key: "e-wallet",
            value: "Ví điện tử",
          },
          {
            key: "cod",
            value: "COD",
          },
        ],
      },

      // Phần hiển thị
      listData: [],
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
    this.fetchDatabaseModel();
    this.fetchTransporter();
    this.fetchStatus();
  },
  methods: {
    fetchStatus() {
      axios.get("package/statuses").then((response) => {
        switch (response.code) {
          case 200:
            this.lists.listStatus = response.data;
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
    fetchTransporter() {
      axios.get("transporter").then((response) => {
        this.loading = false;
        switch (response.code) {
          case 200:
            this.lists.listTransporter = response.data;
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
    fetchDatabaseModel() {
      this.loading = true;
      let filter = {
        bill_code: this.filter.bill_code,
        postcode: this.filter.postcode,
        transporter_id: this.filter.transporter_id,
        payment: this.filter.payment,
        status: this.filter.status,
        page: this.filter.page,
        per_page: this.filter.per_page,
      };

      filter.date = null;

      if (this.filter.date_from !== null) {
        filter.date = this.filter.date_from + ",2050-01-01";
      }
      if (this.filter.date_to !== null) {
        filter.date = "2022-01-01," + this.filter.date_to;
      }
      if (this.filter.date_from !== null && this.filter.date_to !== null) {
        filter.date = this.filter.date_from + "," + this.filter.date_to;
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

      axios.get("delivery", { params: filter }).then((response) => {
        this.loading = false;
        switch (response.code) {
          case 200:
            this.listData = response.data.items;
            this.pagination.total = response.data.pagination.total;
            this.pagination.per_page = response.data.pagination.per_page;
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
      this.fetchDatabaseModel();
      document.getElementById("ST2022").scrollIntoView({ behavior: "smooth" });
    },

    // Xóa
    confirmDeleteModel(item) {
      this.$confirm("Xác nhận xóa giao hàng", "Cảnh báo", {
        confirmButtonText: "Đồng ý",
        cancelButtonText: "Hủy",
        type: "warning",
      })
        .then(() => {
          this.deleteModel(item);
        })
        .catch(() => {});
    },
    // Xóa bản ghi
    deleteModel(item) {
      axios.delete("delivery/" + item.id).then((response) => {
        switch (response.code) {
          case 200:
            this.$notify({
              title: "Thành công",
              message: "Xóa bản ghi thành công",
              type: "success",
            });
            this.fetchDatabaseModel();
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

    // Xem chi tiết
    viewDetail(delivery_id) {
      this.$router.push({
        name: "delivery-detail",
        params: { delivery_id: delivery_id },
      });
    },
  },
  watch: {
    "filter.status": function () {
      this.filter.page = 1;
      this.fetchDatabaseModel();
    },
    "filter.transporter_id": function () {
      this.filter.page = 1;
      this.fetchDatabaseModel();
    },
    "filter.payment": function () {
      this.filter.page = 1;
      this.fetchDatabaseModel();
    },
    "filter.date_from": function () {
      this.filter.page = 1;
      this.fetchDatabaseModel();
    },
    "filter.date_to": function () {
      this.filter.page = 1;
      this.fetchDatabaseModel();
    },
  },
};
</script>

<style lang="css" scoped>
.delivery-list-filter {
  background-color: #fff;
  height: 88px;
  padding: 0px 25px;
  align-items: center;
  justify-content: space-between;
  display: flex;
}

.delivery-list-table {
  margin-bottom: 10px;
  min-height: 130px;
  padding: 0px 30px;
  background: #fff;
}

.delivery-list-table .item-9271a img {
  margin-right: 5px;
}
</style>
