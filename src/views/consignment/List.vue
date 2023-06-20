<template>
  <div class="frame-content-common-2022 consignment-list" id="ST2022">
    <BreadcrumbTop
      text1="Quản lý đơn hàng"
      route1="order-list"
      text2="Quản lý đơn ký gửi"
    />
    <div class="order-list-status d-flex">
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
          v-model="filter.code"
          @keyup.enter.native="fetchDatabaseModel"
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
    <div
      class="table-element-custom-2022 consignment-list-table"
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
        <el-table-column type="index" label="STT" width="150"></el-table-column>
        <el-table-column label="Mã ĐH">
          <template slot-scope="scope">
            <span>{{ scope.row.code }}</span>
          </template>
        </el-table-column>
        <el-table-column label="Ngày đặt">
          <template slot-scope="scope">
            <span>{{ scope.row.ordered_at }}</span>
          </template>
        </el-table-column>
        <el-table-column label="Kho nhận hàng">
          <template slot-scope="scope">
            <span>{{ scope.row.warehouse_vi }}</span>
          </template>
        </el-table-column>
        <el-table-column label="Số kiện" width="200">
          <template slot-scope="scope">
            <span>{{ scope.row.packages_number }}</span>
          </template>
        </el-table-column>
        <el-table-column label="Trạng thái" width="200">
          <template slot-scope="scope">
            <div>
              <span
                class="order-detail-icon-status-6868amg"
                :style="{ backgroundColor: scope.row.status.color }"
                >{{ scope.row.status.name }}</span
              >
            </div>
          </template>
        </el-table-column>
        <el-table-column label="Thao tác" width="250">
          <template slot-scope="scope">
            <div class="d-flex justify-content-center align-items-center">
              <div @click="viewDetail(scope.row.id)">
                <span class="show-detail-782fkme">Xem chi tiết</span>
              </div>
              <div>
                <span
                  class="show-detail-782fkme show-detail-782fkme-cancel"
                  @click="confirmDeleteModel(scope.row)"
                  v-if="!scope.row.is_cancel"
                  >Hủy</span
                >
              </div>
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
  name: "ListConsignment",
  metaInfo() {
    return {
      title: "Quản lý đơn ký gửi",
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
        code: "",
        warehouse_id: "",
        status: "",
        page: 1,
        per_page: 10,
      },

      // Phần hiển thị
      listData: [],
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
    this.fetchDatabaseModel();
    this.fetchConsignmentStatus();
    this.fetchWareHouse();
  },
  methods: {
    fetchConsignmentStatus() {
      axios.get("consignment/status").then((response) => {
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
    fetchDatabaseModel() {
      this.loading = true;
      let filter = {
        status: this.filter.status,
        warehouse_id: this.filter.warehouse_id,
        code: this.filter.code,
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
      axios.get("consignment", { params: filter }).then((response) => {
        this.loading = false;
        switch (response.code) {
          case 200:
            this.listData = response.data.items;
            this.pagination.total = response.data.pagination.total;
            this.pagination.per_page = response.data.pagination.per_page;
            // Nếu listOrder = [] mà page >=2 thì get lại vs page = page - 1;
            if (this.listData.length == 0 && this.filter.page >= 2) {
              this.filter.page = this.filter.page - 1;
              this.fetchDatabaseModel();
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
      this.fetchDatabaseModel();
      document.getElementById("ST2022").scrollIntoView({ behavior: "smooth" });
    },

    // Xóa
    confirmDeleteModel(item) {
      if (item.is_cancel == true) {
        return;
      }
      this.$confirm("Xác nhận hủy đơn", "Cảnh báo", {
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
      let data = {
        status: "status_3",
      };
      axios.patch("consignment/status/" + item.id, data).then((response) => {
        switch (response.code) {
          case 200:
            this.$notify({
              title: "Thành công",
              message: "Hủy bản ghi thành công",
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
    viewDetail(consignment_id) {
      this.$router.push({
        name: "consignment-detail",
        params: { consignment_id: consignment_id },
      });
    },
  },
  watch: {
    "filter.status": function () {
      this.filter.page = 1;
      this.fetchDatabaseModel();
    },
    "filter.warehouse_id": function () {
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
.consignment-list-filter {
  background-color: #fff;
  height: 88px;
  padding: 0px 25px;
  align-items: center;
  justify-content: space-between;
  display: flex;
}

.consignment-list-table {
  margin-bottom: 10px;
  min-height: 130px;
  padding: 0px 30px;
  background: #fff;
}

.consignment-list-table .item-9271a img {
  margin-right: 5px;
}
</style>
<style type="text/css">
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
.consignment-list-table .el-table .el-table__cell {
  text-align: center !important;
}
.consignment-list-table
  .el-table--enable-row-transition
  .el-table__body
  td.el-table__cell {
  text-align: center !important;
}
.order-list-filter {
  background-color: #fff;
  height: 88px;
  align-items: center;
  display: flex;
  margin-top: 15px;
  padding-left: 30px;
  margin-bottom: 15px;
}
.show-detail-782fkme-cancel {
  background: #9a9a9a;
  border-radius: 4px;
  color: #fff;
  padding: 4px 9px 3px 9px;
  margin-left: 10px;
}
</style>
