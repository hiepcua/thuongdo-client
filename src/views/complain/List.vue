<template>
  <div class="frame-content-common-2022 complain-list" id="ST2022">
    <BreadcrumbTop text1="Danh sách khiếu nại" />
    <Status />
    <div class="complain-list-filter">
      <div class="d-flex">
        <div class="frame-filter-item-2022">
          <el-input
            placeholder="Mã đơn hàng"
            clearable
            v-model="filter.order_code"
            @keyup.enter.native="fetchComplain"
            class="frame-filter-innput-2022"
          ></el-input>
        </div>
        <div class="frame-filter-item-2022">
          <el-input
            placeholder="Họ tên"
            clearable
            v-model="filter.receiver_name"
            @keyup.enter.native="fetchComplain"
            class="frame-filter-innput-2022"
          ></el-input>
        </div>
        <div class="frame-filter-item-2022">
          <el-input
            placeholder="Số điện thoại"
            clearable
            v-model="filter.receiver_phone"
            @keyup.enter.native="fetchComplain"
            class="frame-filter-innput-2022"
          ></el-input>
        </div>
        <div class="frame-filter-item-2022">
          <el-select
            v-model="filter.status"
            placeholder="Chọn trạng thái"
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
        <div class="frame-filter-item-2022">
          <el-select
            v-model="filter.complain_type_id"
            placeholder="Chọn khiếu nại"
            class="frame-select-common-2022 frame-filter-select-2022"
            popper-class="frame-select-popper-common-2022"
            clearable
            size="small"
          >
            <el-option
              v-for="item in lists.listType"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </div>
      </div>
      <div class="d-flex pt-3">
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
          <el-select
            v-model="filter.solution_id"
            placeholder="Chọn phương án"
            class="frame-select-common-2022 frame-filter-select-2022"
            popper-class="frame-select-popper-common-2022"
            clearable
            size="small"
          >
            <el-option
              v-for="item in lists.listSolution"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </div>
        <div class="frame-filter-item-2022">
          <el-select
            v-model="filter.care_staff_id"
            placeholder="Chọn NV chăm sóc"
            class="frame-select-common-2022 frame-filter-select-2022 full-width"
            popper-class="frame-select-popper-common-2022"
            clearable
            size="small"
          >
            <el-option
              v-for="item in lists.listCareStaff"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </div>
        <div class="frame-filter-item-2022">
          <el-select
            v-model="filter.complain_staff_id"
            placeholder="Chọn NV khiếu nại"
            class="frame-select-common-2022 frame-filter-select-2022"
            popper-class="frame-select-popper-common-2022"
            clearable
            size="small"
          >
            <el-option
              v-for="item in lists.listComplainStaff"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </div>
      </div>
    </div>
    <div
      class="table-element-custom-2022 complain-list-table"
      v-loading="loading"
    >
      <el-table
        :data="listComplain"
        style="
          width: 100%;
          border-right: 1px solid #ebeef5;
          border-left: 1px solid #ebeef5;
        "
      >
        <el-table-column type="index" label="STT" width="50"></el-table-column>
        <el-table-column prop="order_code" label="Mã đơn hàng" width="180">
        </el-table-column>
        <el-table-column label="Hình ảnh" width="150">
          <template slot-scope="scope">
            <img class="image-complain" :src="scope.row.image" />
          </template>
        </el-table-column>
        <el-table-column label="Mã kiện hàng">
          <template slot-scope="scope">
            <div class="d-flex flex-column">
              <span v-if="scope.row.packages">{{
                scope.row.packages.bill_code
              }}</span>
              <div class="d-flex" @click="viewPack(scope.row.packages.id)">
                <img src="@/static/icon/order-detail-v2/tab2/report.svg" />
                <span class="show-detail-782fkme space">Xem kiện hàng</span>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="complain_type"
          label="Loại khiếu nại"
        ></el-table-column>
        <el-table-column label="Trạng thái khiếu nại" width="150">
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
        <el-table-column prop="created_at" label="Ngày gửi" width="180">
        </el-table-column>
        <el-table-column label="Thao tác">
          <template slot-scope="scope">
            <div class="d-flex flex-column">
              <span
                class="line-1 show-detail-782fkme"
                @click="viewDetail(scope.row.id)"
                >Xem chi tiết</span
              >
              <div class="line-1">
                <span
                  class="order-detail-icon-status-6868amg poiter"
                  @click="confirmCancelModel(scope.row)"
                  >Hủy</span
                >
              </div>
              <div class="line-1 d-flex align-items-center">
                <span class="count">{{ scope.row.comment_number }}</span>
                <span
                  class="show-detail-782fkme"
                  @click="showFeedback(scope.row)"
                  >Phản hồi</span
                >
              </div>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div
      class="china-panigation-1988 d-flex justify-content-end pt-1"
      v-if="listComplain.length"
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

    <el-dialog
      top="50px"
      width="520px"
      custom-class="list-complain-dialog-456"
      :close-on-click-modal="false"
      :visible.sync="dialogTableVisible"
    >
      <div class="title-wrap">
        <span class="line-1">Phản hồi</span>
      </div>
      <Feedback :complain_id="complainSelected.id" />
    </el-dialog>
  </div>
</template>

<script>
import axios from "axios";
import BreadcrumbTop from "@/components/BreadcrumbTop";
import Status from "@/views/complain/list-components/Status";
import Feedback from "@/views/complain/common-components/Feedback";
export default {
  name: "ComplainList",
  metaInfo() {
    return {
      title: "Danh sách khiếu nại",
    };
  },
  components: {
    BreadcrumbTop,
    Status,
    Feedback,
  },
  data() {
    return {
      // Phần search
      loading: true,
      searching: false,
      filter: {
        order_code: "",
        receiver_name: "",
        receiver_phone: "",
        status: "",
        date_from: null,
        date_to: null,
        complain_type_id: "",
        complain_staff_id: "",
        care_staff_id: "",
        solution_id: "",
        page: 1,
        per_page: 15,
      },

      lists: {
        listStatus: [],
        listType: [],
        listSolution: [],
        listCareStaff: [], // Nhân viên chăm sóc
        listComplainStaff: [], // Nhân viên khiếu nại
      },

      // Phần hiển thị
      listComplain: [],
      pagination: {
        total: 0,
        count: 0,
        per_page: 0,
        current_page: 1,
        total_pages: 0,
      },

      // Xử lý phần xem phẩn hồi
      dialogTableVisible: false,
      complainSelected: {},
      listFeedbackOfComplainSelected: [],
    };
  },
  mounted() {
    this.fetchComplain();
    setTimeout(() => {
      this.fetchStatus();
      this.fetchType();
      this.fetchSolution();
      this.fetchCareStaff();
      this.fetchComplainStaff();
    }, 1000);
  },
  methods: {
    fetchStatus() {
      axios.get("complain/status").then((response) => {
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
    fetchType() {
      axios.get("complain/type").then((response) => {
        switch (response.code) {
          case 200:
            this.lists.listType = response.data;
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
    fetchSolution() {
      axios.get("complain/solution").then((response) => {
        switch (response.code) {
          case 200:
            this.lists.listSolution = response.data;
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
    fetchCareStaff() {
      axios.get("user/cham-soc").then((response) => {
        switch (response.code) {
          case 200:
            this.lists.listCareStaff = response.data;
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
    fetchComplainStaff() {
      axios.get("user/khieu-nai").then((response) => {
        switch (response.code) {
          case 200:
            this.lists.listComplainStaff = response.data;
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
    fetchComplain() {
      this.loading = true;
      let filter = {
        order_code: this.filter.order_code,
        receiver_name: this.filter.receiver_name,
        receiver_phone: this.filter.receiver_phone,
        status: this.filter.status,
        solution_id: this.filter.solution_id,
        complain_type_id: this.filter.complain_type_id,
        complain_staff_id: this.filter.complain_staff_id,
        care_staff_id: this.filter.care_staff_id,
        page: this.filter.page,
        per_page: this.filter.per_page,
      };

      filter.created_at = null;

      if (this.filter.date_from !== null) {
        filter.created_at = this.filter.date_from + ",2050-01-01";
      }
      if (this.filter.date_to !== null) {
        filter.created_at = "2022-01-01," + this.filter.date_to;
      }
      if (this.filter.date_from !== null && this.filter.date_to !== null) {
        filter.created_at = this.filter.date_from + "," + this.filter.date_to;
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

      axios.get("complain", { params: filter }).then((response) => {
        this.loading = false;
        switch (response.code) {
          case 200:
            this.listComplain = response.data.items;
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
      this.fetchComplain();
      document.getElementById("ST2022").scrollIntoView({ behavior: "smooth" });
    },

    viewPack(pack_id) {
      this.$router.push({
        name: "pack-detail",
        params: { pack_id: pack_id },
      });
    },

    // Xem chi tiết
    viewDetail(id) {
      this.$router.push({
        name: "complain-detail",
        params: { complain_id: id },
      });
    },

    // Hủy
    confirmCancelModel(item) {
      this.$confirm("Xác nhận hủy khiếu nại ?", "Cảnh báo", {
        confirmButtonText: "Đồng ý",
        cancelButtonText: "Hủy",
        type: "warning",
      })
        .then(() => {
          this.cancelModel(item);
        })
        .catch(() => {});
    },
    cancelModel(item) {
      axios.get("complain/cancel/" + item.id).then((response) => {
        switch (response.code) {
          case 200:
            this.$notify({
              title: "Thành công",
              message: "Hủy thành công",
              type: "success",
            });
            this.fetchComplain();
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

    // Xem danh sách phản hồi
    showFeedback(complain) {
      this.dialogTableVisible = true;
      this.complainSelected = complain;
    },
  },
  watch: {
    "filter.status": function () {
      this.filter.page = 1;
      this.fetchComplain();
    },
    "filter.solution_id": function () {
      this.filter.page = 1;
      this.fetchComplain();
    },
    "filter.complain_type_id": function () {
      this.filter.page = 1;
      this.fetchComplain();
    },
    "filter.complain_staff_id": function () {
      this.filter.page = 1;
      this.fetchComplain();
    },
    "filter.care_staff_id": function () {
      this.filter.page = 1;
      this.fetchComplain();
    },
    "filter.date_from": function () {
      this.filter.page = 1;
      this.fetchComplain();
    },
    "filter.date_to": function () {
      this.filter.page = 1;
      this.fetchComplain();
    },
  },
};
</script>

<style lang="css" scoped>
.complain-list-filter {
  background-color: #fff;
  height: 120px;
  justify-content: center;
  display: flex;
  flex-direction: column;
  margin-top: 15px;
  padding-left: 30px;
}

.complain-list-table {
  margin-bottom: 10px;
  min-height: 130px;
  padding: 0px 30px;
  background: #fff;
}
.complain-list-table .image-complain {
  width: 120px;
}

.complain-list-table .line-1 {
  margin-top: 5px;
}
.complain-list-table .order-detail-icon-status-6868amg {
  background-color: #9a9a9a;
}
.complain-list-table .show-detail-782fkme {
  margin-left: 0px;
}
.complain-list-table .show-detail-782fkme.space {
  margin-left: 6px;
}
.complain-list-table .count {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  color: #fff;
  margin-right: 10px;
  background-color: #d60b4a;
  font-weight: 400;
  font-size: 12px;
}

/*Dialog*/
.list-complain-dialog-456 .title-wrap {
  display: flex;
  align-items: center;
  margin-bottom: 25px;
}
.list-complain-dialog-456 .line-1 {
  font-weight: 700;
  font-size: 20px;
  line-height: 16px;
  letter-spacing: 0.02em;
  color: #1771c1;
}
</style>

<style type="text/css">
.list-complain-dialog-456 .el-dialog__body {
  padding: 5px 25px 40px 25px;
}
</style>
