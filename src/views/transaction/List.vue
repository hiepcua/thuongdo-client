<template>
  <div class="frame-content-common-2022 transaction-list" id="ST2022">
    <BreadcrumbTop text1="Lịch sử giao dịch" />
    <div class="transaction-list-statistic">
      <div class="item">
        <span class="text">Tổng tiền nạp</span>
        <span
          class="number color-green"
          v-if="this.listTotalAmount.deposited_amount == 0"
          >{{ this.listTotalAmount.deposited_amount | vnd }}</span
        >
        <span v-else class="number color-green">
          + {{ this.listTotalAmount.deposited_amount | vnd }}</span
        >
      </div>
      <div class="item">
        <span class="text">Tổng tiền rút</span>
        <span
          class="number color-red"
          v-if="this.listTotalAmount.withdrawal_amount == 0"
          >{{ this.listTotalAmount.withdrawal_amount | vnd }}</span
        >
        <span v-else class="number color-red">
          - {{ this.listTotalAmount.withdrawal_amount | vnd }}</span
        >
      </div>
      <div class="item">
        <span class="text">Tổng tiền đặt hàng</span>
        <span
          class="number color-red"
          v-if="this.listTotalAmount.order_amount == 0"
          >{{ this.listTotalAmount.order_amount | vnd }}</span
        >
        <span v-else class="number color-red">
          - {{ this.listTotalAmount.order_amount | vnd }}</span
        >
      </div>
      <div class="item">
        <span class="text">Tổng tiền thanh toán</span>
        <span
          class="number color-red"
          v-if="this.listTotalAmount.purchase_amount == 0"
          >{{ this.listTotalAmount.purchase_amount | vnd }}</span
        >
        <span v-else class="number color-red">
          - {{ this.listTotalAmount.purchase_amount | vnd }}</span
        >
      </div>
      <div class="item">
        <span class="text">Tổng tiền hoàn</span>
        <span
          class="number color-green"
          v-if="this.listTotalAmount.discount_amount == 0"
          >{{ this.listTotalAmount.discount_amount | vnd }}</span
        >
        <span v-else class="number color-green">
          + {{ this.listTotalAmount.discount_amount | vnd }}</span
        >
      </div>
      <div class="item">
        <span class="text">Số dư</span>
        <span
          class="number color-green"
          v-if="this.listTotalAmount.balance_amount == 0"
          >{{ this.listTotalAmount.balance_amount | vnd }}</span
        >
        <span v-else class="number color-green">
          +{{ this.listTotalAmount.balance_amount | vnd }}</span
        >
      </div>
    </div>
    <div class="transaction-list-filter">
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
            placeholder="Mã giao dịch"
            clearable
            v-model="filter.code"
            @keyup.enter.native="fetchData"
            class="frame-filter-innput-2022"
          ></el-input>
        </div>
        <div class="frame-filter-item-2022">
          <el-select
            v-model="filter.status"
            placeholder="Loại giao dịch"
            class="frame-select-common-2022 frame-filter-select-2022"
            popper-class="frame-select-popper-common-2022"
            clearable
            size="small"
          >
            <el-option
              v-for="item in TransactionType"
              :key="item.key"
              :label="item.value"
              :value="item.key"
            >
            </el-option>
          </el-select>
        </div>
      </div>
      <div>
        <span class="transaction-list-add-money" @click="showQrCodeBank = true"
          >Nạp tiền</span
        >
        <span class="transaction-list-add-money v2" @click="showWithdraw"
          >Rút tiền</span
        >
        <span>
          <span class="color-green v2">{{
            this.listTotalAmount.balance_amount | vnd
          }}</span>
          <span>có thể rút</span>
        </span>
      </div>
    </div>
    <div
      class="table-element-custom-2022 boder transaction-list-table"
      v-loading="loading"
    >
      <el-table :data="listTransaction" style="width: 100%">
        <el-table-column label="Thời gian" width="200" property="date">
          <template slot-scope="scope">
            <span>{{ scope.row.time }}</span>
          </template>
        </el-table-column>
        <el-table-column label="Loại giao dịch" width="200">
          <template slot-scope="scope">
            <div class="d-flex flex-column">
              <div>
                <span
                  class="order-detail-icon-status-6868amg"
                  :style="{ backgroundColor: scope.row.status.color }"
                  >{{ scope.row.status.name }}</span
                >
              </div>
              <span>Mã GD: {{ scope.row.code }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="Thông tin" property="note">
          <template slot-scope="scope">
            <span>{{ scope.row.content }}</span>
          </template>
        </el-table-column>
        <el-table-column label="Giá trị giao dịch" width="200">
          <template slot-scope="scope">
            <!-- <span class="color-red">{{ scope.row.amount | vnd }}</span> -->
            <span class="color-red" v-if="scope.row.amount < 0">{{
              scope.row.amount | vnd
            }}</span>
            <span class="color-green" v-if="scope.row.amount > 0">
              +{{ scope.row.amount | vnd }}</span
            >
          </template>
        </el-table-column>
        <el-table-column label="Giá trị hiện tại" width="200">
          <template slot-scope="scope">
            <span class="color-green">{{ scope.row.balance | vnd }}</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div
      class="china-panigation-1988 d-flex justify-content-end pt-1"
      v-if="listTransaction.length"
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
      title="Nạp tiền vào ví"
      top="50px"
      width="600px"
      custom-class="transaction-list-dialog-882"
      :close-on-click-modal="false"
      :visible.sync="showQrCodeBank"
    >
      <QrCodeBank
        v-if="showQrCodeBank"
        :totalMoneyBank="false"
        @closeQrCodeBank="closeQrCodeBankParent"
      />
    </el-dialog>
  </div>
</template>

<script>
import axios from "axios";
import { mapGetters } from "vuex";
import BreadcrumbTop from "@/components/BreadcrumbTop";
import QrCodeBank from "@/components/QrCodeBank";
export default {
  name: "ListTransaction",
  metaInfo() {
    return {
      title: "Lịch sử giao dịch",
    };
  },
  components: {
    BreadcrumbTop,
    QrCodeBank,
  },
  data() {
    return {
      // Phần search
      loading: false,
      searching: false,
      filter: {
        date_from: null,
        date_to: null,
        code: "",
        status: "",
        page: 1,
        per_page: 10,
      },

      // Phần hiển thị
      listTotalAmount: {},
      listTransaction: [],
      TransactionType: [],
      pagination: {
        total: 0,
        count: 0,
        per_page: 0,
        current_page: 1,
        total_pages: 0,
      },

      // Phần nạp tiền
      showQrCodeBank: false,
    };
  },
  computed: {
    ...mapGetters("account", ["accountInfo", "configList"]),
  },
  mounted() {
    this.fetchData();
    this.fetchTransactionType();
  },
  methods: {
    fetchData() {
      this.loading = true;
      let filter = {
        status: this.filter.status,
        code: this.filter.code,
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
      axios.get("ewallet", { params: filter }).then((response) => {
        this.loading = false;
        switch (response.code) {
          case 200:
            this.listTransaction = response.data.items;
            this.listTotalAmount = response.data.report;
            this.pagination.total = response.data.pagination.total;
            this.pagination.per_page = response.data.pagination.per_page;
            // Nếu listOrder = [] mà page >=2 thì get lại vs page = page - 1;
            if (this.listTransaction.length == 0 && this.filter.page >= 2) {
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
    fetchTransactionType() {
      axios.get("ewallet/transaction-type").then((response) => {
        switch (response.code) {
          case 200:
            this.TransactionType = response.data;
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
      this.fetchData();
      document.getElementById("ST2022").scrollIntoView({ behavior: "smooth" });
    },

    // Nút rút tiền
    showWithdraw() {
      this.$router.push({
        name: "transaction-withdraw",
      });
    },

    // Đóng nạp tiền
    closeQrCodeBankParent() {
      this.showQrCodeBank = false;
    },
  },
  watch: {
    "filter.status": function () {
      this.filter.page = 1;
      this.fetchData();
    },
    "filter.date_from": function () {
      this.filter.page = 1;
      this.fetchData();
    },
    "filter.date_to": function () {
      this.filter.page = 1;
      this.fetchData();
    },
  },
};
</script>

<style lang="css" scoped>
.color-green {
  color: #26b01c;
}
.color-green.v2 {
  margin-right: 5px;
  margin-left: 5px;
}
.color-red {
  color: #dd2120;
}
.transaction-list-statistic {
  display: flex;
  align-items: center;
  background-color: #fff;
  padding: 37px 0px;
  margin-bottom: 10px;
}
.transaction-list-statistic .item {
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  align-items: center;
}
.transaction-list-statistic .item .text {
  color: #000000;
  margin-bottom: 8px;
}
.transaction-list-statistic .item .number {
  font-size: 15px;
  letter-spacing: 0.02em;
}

.transaction-list-filter {
  background-color: #fff;
  height: 88px;
  padding: 0px 25px;
  align-items: center;
  justify-content: space-between;
  display: flex;
}

.transaction-list-add-money {
  background: #26b01c;
  border-radius: 4px;
  padding: 7px 20px;
  color: #fff;
  cursor: pointer;
  margin-right: 10px;
  font-size: 12px;
  display: inline-block;
}
.transaction-list-add-money:hover {
  opacity: 0.8;
}
.transaction-list-add-money.v2 {
  background-color: #fe6701;
}

.transaction-list-table {
  margin-bottom: 10px;
  min-height: 130px;
  padding: 0px 30px;
  background: #fff;
}
</style>

<style type="text/css">
.transaction-list-dialog-882 .el-dialog__header {
  font-weight: 700;
  font-size: 24px;
  line-height: 16px;
  letter-spacing: 0.02em;
  text-transform: uppercase;
  text-align: center;
}
.transaction-list-dialog-882 .el-dialog__title {
  color: #1771c1;
}
.transaction-list-dialog-882 .el-dialog__body {
  padding: 10px 20px 20px 20px;
}
</style>
