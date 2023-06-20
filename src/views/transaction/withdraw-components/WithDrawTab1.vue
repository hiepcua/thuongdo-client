<template>
  <div class="table-element-custom-2022 transaction-withdraw-tab-1">
    <div class="transaction-withdraw-form">
      <div class="item">
        <span class="text">Tổng rút *</span>
        <div class="input-v1">
          <el-input
            placeholder="Nhập số tiền"
            maxlength="256"
            v-model="modelData.amount"
            class="frame-input-common-2022 transaction-withdraw-input"
            size="small"
            type="number"
            clearable
          >
            <template slot="append">{{ modelData.amount | vnd }}</template>
          </el-input>
        </div>
        <span class="max"
          ><span class="color-green">{{ accountInfo.e_wallet | vnd }}</span> có
          thể rút</span
        >
      </div>
      <div class="item">
        <span class="text">Chọn ngân hàng *</span>
        <div class="input-v2">
          <el-select
            v-model="modelData.bank_id"
            @change="setBank"
            filterable
            placeholder="Chọn ngân hàng"
            class="frame-select-common-2022 transaction-withdraw-select-bank"
            popper-class="frame-select-popper-common-2022"
            size="small"
          >
            <el-option
              v-for="item in listBank"
              :key="item.bank_id"
              :label="item.short_name"
              :value="item.bank_id"
            >
            </el-option>
          </el-select>
        </div>
      </div>
      <div class="item">
        <span class="text">Chọn tài khoản *</span>
        <div class="input-v2">
          <el-select
            v-model="modelData.bank_sub_id"
            filterable
            placeholder="Chọn tài khoản"
            class="frame-select-common-2022 transaction-withdraw-select-bank"
            popper-class="frame-select-popper-common-2022"
            size="small"
          >
            <el-option
              v-for="item in listBankNumber"
              :key="item.id"
              :label="item.account_number"
              :value="item"
            >
            </el-option>
          </el-select>
        </div>
      </div>
      <div class="item">
        <span class="text">Chủ tài khoản *</span>
        <div class="input-v2">
          <el-input
            placeholder="Chủ tài khoản"
            maxlength="256"
            v-model="modelData.name"
            class="frame-input-common-2022 transaction-withdraw-form-input"
            size="small"
            clearable
            :disabled="true"
          ></el-input>
        </div>
      </div>
      <div class="item">
        <span class="text">Chi nhánh *</span>
        <div class="input-v2">
          <el-input
            placeholder="Chi nhánh"
            maxlength="256"
            v-model="modelData.branch"
            class="frame-input-common-2022 transaction-withdraw-form-input"
            size="small"
            clearable
            :disabled="true"
          ></el-input>
        </div>
      </div>
      <div class="item d-flex justify-content-end">
        <span
          class="frame-btn-create-x-2022"
          :class="!canSubmit ? 'disable' : ''"
          @click="submitForm()"
        >
          <i class="el-icon-loading" v-if="!canSubmit"></i>
          <span>Gửi yêu cầu</span>
        </span>
      </div>
      <div class="transaction-withdraw-alert">
        <span
          >Quý khách lưu ý chọn thông tin tài khoản trước khi "Gửi yêu cầu". Sau
          khi tạo yêu cầu rút tiền xong vui lòng liên hệ bộ phận chăm sóc để xác
          nhận!</span
        >
      </div>
    </div>
    <div class="transaction-withdraw-history">
      <span class="text">Lịch sử yêu cầu</span>
      <div class="table-element-custom-2022 boder" v-loading="loading">
        <el-table :data="tableData" style="width: 100%">
          <el-table-column
            type="index"
            label="STT"
            width="150"
          ></el-table-column>
          <el-table-column prop="date" label="Ngày yêu cầu" width="200">
            <template slot-scope="scope">
              <span>{{ scope.row.time }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="note" label="Thông tin chuyển khoản">
            <template slot-scope="scope">
              <span>{{ scope.row.info }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="total_money" label="Tổng rút">
            <template slot-scope="scope">
              <span>{{ scope.row.amount | vnd }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="status" label="Tình trạng">
            <template slot-scope="scope">
              <div class="d-flex justify-content-center align-items-center">
                <span
                  class="order-detail-icon-status-6868amg poiter"
                  :style="{ backgroundColor: scope.row.status.color }"
                  >{{ scope.row.status.name }}</span
                >
                <span
                  class="ml-2 btnCancel"
                  @click="confirmDeleteModel(scope.row)"
                  v-if="scope.row.status.value == 'status_pending'"
                  >Hủy yêu cầu</span
                >
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div
        class="china-panigation-1988 d-flex justify-content-end pt-1"
        v-if="tableData.length"
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
  </div>
</template>

<script>
import axios from "axios";
import { mapGetters } from "vuex";
export default {
  name: "WithDrawTab1",

  data() {
    return {
      // Phần search
      loading: true,
      searching: false,
      filter: {
        status: "",
        page: 1,
        per_page: 10,
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

      // Phần thêm
      canSubmit: true,
      modelData: {
        bank: {},
        bank_sub_id: "",
        name: "",
        code: "",
        branch: "",
        amount: "",
      },
      listBank: [],
      customer_bank_id: "",
      tableData: [],
    };
  },
  computed: {
    ...mapGetters("account", ["accountInfo", "configList"]),
    listBankNumber() {
      return this.modelData.bank;
    },
  },
  mounted() {
    this.fetchBank();
    this.fetchHistory();
  },
  methods: {
    submitForm() {
      if (this.modelData.money == "" || this.modelData.money == 0) {
        this.$notify({
          title: "Vui lòng kiểm tra lại thông tin",
          message: "Vui lòng nhập số tiền cần rút",
          type: "warning",
        });
        return;
      }
      if (this.modelData.money > this.accountInfo.e_wallet) {
        this.$notify({
          title: "Vui lòng kiểm tra lại thông tin",
          message: "Không được rút quá số tiền bạn có",
          type: "warning",
        });
        return;
      }
      let data = {
        customer_bank_id: this.customer_bank_id,
        amount: this.modelData.amount,
      };
      this.canSubmit = false;

      axios.patch("ewallet/withdrawal", data).then((response) => {
        this.canSubmit = true;
        switch (response.code) {
          case 200:
            this.$notify({
              title: "Thành công",
              message: "rút tiền thành công",
              type: "success",
            });
            this.fetchHistory();
            this.modelData.bank_id = "";
            this.modelData.bank_sub_id = "";
            this.modelData.amount = "";
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
    confirmDeleteModel(item) {
      if (item.status.value !== "status_pending") {
        return;
      }
      this.$confirm("Xác nhận hủy yêu cầu", "Cảnh báo", {
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
      axios.get("ewallet/withdrawal/cancel/" + item.id).then((response) => {
        switch (response.code) {
          case 200:
            this.$notify({
              title: "Thành công",
              message: "Bạn đã hủy yêu cầu rút tiền",
              type: "success",
            });
            this.fetchHistory();
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

    setBank(value) {
      this.modelData.bank = this.listBank.find(
        (s) => s.bank_id == value
      ).accounts;
    },

    fetchBank() {
      axios.get("customer/bank/list").then((response) => {
        switch (response.code) {
          case 200:
            this.listBank = response.data;
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
    fetchName() {
      this.modelData.name = this.modelData.bank_sub_id.account_holder;
    },

    fetchBranch() {
      this.modelData.branch = this.modelData.bank_sub_id.branch;
    },

    fetchBank_id() {
      this.customer_bank_id = this.modelData.bank_sub_id.id;
    },

    fetchHistory() {
      this.loading = true;
      axios.get("ewallet/withdrawal").then((response) => {
        this.loading = false;
        switch (response.code) {
          case 200:
            this.tableData = response.data.items;
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
      // this.fetchHistory();
      document.getElementById("ST2022").scrollIntoView({ behavior: "smooth" });
    },
  },
  watch: {
    "modelData.bank": function () {
      this.modelData.bank_sub_id = "";
      this.modelData.name = "";
      this.modelData.branch = "";
    },
    "modelData.bank_sub_id": function (value) {
      this.modelData.name = "";
      this.modelData.branch = "";
      this.fetchName(value);
      this.fetchBranch(value);
      this.fetchBank_id(value);
    },
  },
};
</script>

<style lang="css" scoped>
.color-green {
  color: #26b01c;
}
.transaction-withdraw-form {
  background-color: #fff;
  padding-left: 40px;
  padding-right: 40px;
  padding-bottom: 20px;
}
.transaction-withdraw-form .item {
  width: 600px;
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}
.transaction-withdraw-form .item .text {
  min-width: 180px;
  font-weight: 400;
  font-size: 14px;
  line-height: 16px;
  letter-spacing: 0.02em;
  color: #575757;
}
.transaction-withdraw-form .item .max {
  width: 200px;
  margin-left: 10px;
}
.transaction-withdraw-form .input-v1 {
  width: 60%;
}
.transaction-withdraw-form .input-v2 {
  width: 100%;
}
.transaction-withdraw-select-bank {
  width: 100%;
}

.transaction-withdraw-tab-1 .frame-btn-create-x-2022 {
  padding: 8px 30px;
  font-size: 12px;
}

.transaction-withdraw-alert {
  background-color: #fde9ea;
  padding: 20px 30px 30px 80px;
  margin-top: 20px;
}
.transaction-withdraw-alert span {
  color: #d85030;
}

.transaction-withdraw-history {
  margin-top: 15px;
  background-color: #fff;
  padding: 15px 40px;
}
.transaction-withdraw-history .text {
  font-weight: 700;
  font-size: 16px;
  line-height: 16px;
  letter-spacing: 0.02em;
  text-transform: uppercase;
  color: #2196f3;
  margin-bottom: 15px;
  display: inline-block;
}
</style>
<style text="css">
.el-input.is-disabled .el-input__inner {
  background-color: #fff !important;
  color: #575757;
}
.el-table th.el-table__cell > .cell {
  text-align: center;
}
.el-table td.el-table__cell div {
  text-align: center;
}
.btnCancel {
  background-color: #9a9a9a;
  color: #fff;
  border-radius: 4px;
  font-size: 10px;
  padding: 1px 10px;
  cursor: pointer;
}
</style>
