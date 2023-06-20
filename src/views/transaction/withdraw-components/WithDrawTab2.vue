<template>
  <div class="table-element-custom-2022 boder transaction-withdraw-tab-2">
    <el-table :data="listData" style="width: 100%">
      <el-table-column type="index" label="STT" width="50"></el-table-column>
      <el-table-column prop="account_number" label="Số tài khoản">
        <template slot-scope="scope">
          <span class="text-bank">{{ scope.row.account_number }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="Chủ tài khoản">
        <template slot-scope="scope">
          <span class="text-bank">{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Ngân hàng">
        <template slot-scope="scope">
          <span class="text-bank">{{ scope.row.bank.short_name }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="branch" label="Chi nhánh" width="450">
        <template slot-scope="scope">
          <span class="text-bank">{{ scope.row.branch }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Thao tác" width="180">
        <template slot-scope="scope">
          <div>
            <span class="show-detail-782fkme" @click="editItem(scope.row)"
              >Chỉnh sửa</span
            >
          </div>
          <div>
            <span
              class="order-detail-icon-status-6868amg poiter"
              @click="confirmDeleteModel(scope.row)"
              >Xóa</span
            >
          </div>
        </template>
      </el-table-column>
    </el-table>
    <div class="add-bank-withdraw">
      <span class="title">Thêm tài khoản ngân hàng</span>
      <el-input
        placeholder="Số tài khoản"
        maxlength="256"
        type="number"
        v-model="modelData.account_number"
        class="frame-input-common-2022 transaction-withdraw-input"
        size="small"
        clearable
      ></el-input>
      <el-input
        placeholder="Chủ tài khoản"
        maxlength="256"
        v-model="modelData.account_holder"
        class="frame-input-common-2022 transaction-withdraw-input"
        size="small"
        clearable
      ></el-input>
      <el-select
        v-model="modelData.bank_id"
        filterable
        placeholder="Chọn ngân hàng"
        class="frame-select-common-2022 transaction-withdraw-select-bank"
        popper-class="frame-select-popper-common-2022"
        size="small"
      >
        <el-option
          v-for="item in listBank"
          :key="item.id"
          :label="item.short_name"
          :value="item.id"
        >
        </el-option>
      </el-select>
      <el-input
        placeholder="Chi nhánh"
        maxlength="256"
        v-model="modelData.branch"
        class="frame-input-common-2022 transaction-withdraw-input"
        size="small"
        clearable
      ></el-input>
      <span
        class="frame-btn-create-x-2022"
        :class="!canSubmit ? 'disable' : ''"
        @click="submitForm"
      >
        <i class="el-icon-loading" v-if="!canSubmit"></i>
        <span>Thêm tài khoản</span>
      </span>
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

    <el-dialog
      title="Chỉnh sửa tài khoản ngân hàng"
      width="450px"
      top="50px"
      custom-class="transaction-withdraw-tab-2-update"
      :close-on-click-modal="false"
      :visible.sync="dialogTableVisible"
    >
      <div class="back-update-item">
        <el-select
          v-model="itemSelect.bank.id"
          filterable
          placeholder="Chọn ngân hàng"
          class="frame-select-common-2022 transaction-withdraw-select-bank-update"
          popper-class="frame-select-popper-common-2022"
          size="small"
        >
          <el-option
            v-for="item in listBank"
            :key="item.id"
            :label="item.short_name"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </div>
      <div class="back-update-item">
        <el-input
          placeholder="Tên tài khoản"
          maxlength="256"
          v-model="itemSelect.name"
          class="frame-input-common-2022"
          size="small"
          clearable
        ></el-input>
      </div>
      <div class="back-update-item">
        <el-input
          placeholder="Số tài khoản"
          maxlength="256"
          type="number"
          v-model="itemSelect.account_number"
          class="frame-input-common-2022"
          size="small"
          clearable
        ></el-input>
      </div>
      <div class="back-update-item">
        <el-input
          placeholder="Chi nhánh"
          maxlength="256"
          v-model="itemSelect.branch"
          class="frame-input-common-2022"
          size="small"
          clearable
        ></el-input>
      </div>
      <div class="d-flex justify-content-end pt-2">
        <div
          class="btn-dialog-88 btn-dialog-danger"
          @click="dialogTableVisible = false"
        >
          <span>Hủy bỏ</span>
        </div>
        <div
          class="btn-dialog-88"
          :class="!canSubmit ? 'disable' : ''"
          @click="updateBank()"
        >
          <i class="el-icon-loading" v-if="!canSubmit"></i>
          <span>Lưu</span>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "WithDrawTab2",

  data() {
    return {
      // Phần search
      loading: true,
      searching: false,
      filter: {
        status: "",
        page: 1,
        per_page: 15,
      },

      // Phần hiển thị
      listData: [],
      listBank: [],
      pagination: {
        total: 0,
        count: 0,
        per_page: 0,
        current_page: 1,
        total_pages: 0,
      },

      // Phần thêm mới
      canSubmit: true,
      modelData: {
        bank_id: "",
        account_holder: "",
        account_number: "",
        branch: "",
      },

      // Phần update
      itemSelect: {
        bank: {},
      },
      dialogTableVisible: false,

      tableData: [
        {
          bank: "Techcombank",
          number: "001628292923",
          name: "Nguyễn Phương Nga",
          branch: "Hà Nội",
        },
        {
          bank: "Techcombank",
          number: "001628292923",
          name: "Nguyễn Phương Nga",
          branch: "Hà Nội",
        },
      ],
    };
  },
  mounted() {
    this.fetchBank();
    this.fetchDatabaseModel();
  },
  methods: {
    fetchBank() {
      axios.get("bank/vi").then((response) => {
        this.loading = false;
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

    fetchDatabaseModel() {
      axios.get("customer/bank", { params: this.filter }).then((response) => {
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
      this.$confirm("Xác nhận xóa tài khoản ngân hàng", "Cảnh báo", {
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
      axios.delete("customer/bank/" + item.id).then((response) => {
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

    // Thêm mới
    submitForm() {
      if (this.modelData.bank_id == "") {
        this.$notify({
          title: "Vui lòng kiểm tra lại thông tin",
          message: "Vui lòng chọn ngân hàng",
          type: "warning",
        });
        return;
      }

      if (this.modelData.account_holder == "") {
        this.$notify({
          title: "Vui lòng kiểm tra lại thông tin",
          message: "Vui lòng nhập tên tài khoản",
          type: "warning",
        });
        return;
      }

      if (this.modelData.account_number == "") {
        this.$notify({
          title: "Vui lòng kiểm tra lại thông tin",
          message: "Vui lòng nhập số tài khoản",
          type: "warning",
        });
        return;
      }

      this.canSubmit = false;

      axios.post("customer/bank", this.modelData).then((response) => {
        this.canSubmit = true;
        switch (response.code) {
          case 200:
            this.$notify({
              title: "Thành công",
              message: "Thêm ngân hàng thành công",
              type: "success",
            });
            this.fetchDatabaseModel();
            this.modelData.bank_id = "";
            this.modelData.account_holder = "";
            this.modelData.account_number = "";
            this.modelData.branch = "";
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

    // Chọn item để cập nhật
    editItem(item) {
      this.itemSelect = JSON.parse(JSON.stringify(item));
      this.dialogTableVisible = true;
    },

    updateBank() {
      let data = {
        account_holder: this.itemSelect.name,
        bank_id: this.itemSelect.bank.id,
        account_number: this.itemSelect.account_number,
        branch: this.itemSelect.branch,
      };
      this.canSubmit = false;
      axios
        .put("customer/bank/" + this.itemSelect.id, data)
        .then((response) => {
          this.canSubmit = true;
          switch (response.code) {
            case 200:
              this.$notify({
                title: "Thành công",
                message: "Cập nhật ngân hàng thành công",
                type: "success",
              });
              this.fetchDatabaseModel();
              this.dialogTableVisible = false;
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

    // Chuyển đổi sang chữ không đấu
    removeVietnameseTones(str) {
      str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
      str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
      str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
      str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
      str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
      str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
      str = str.replace(/đ/g, "d");
      str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
      str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
      str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
      str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
      str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
      str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
      str = str.replace(/Đ/g, "D");
      // Some system encode vietnamese combining accent as individual utf-8 characters
      // Một vài bộ encode coi các dấu mũ, dấu chữ như một kí tự riêng biệt nên thêm hai dòng này
      str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ""); // ̀ ́ ̃ ̉ ̣  huyền, sắc, ngã, hỏi, nặng
      str = str.replace(/\u02C6|\u0306|\u031B/g, ""); // ˆ ̆ ̛  Â, Ê, Ă, Ơ, Ư
      // Remove extra spaces
      // Bỏ các khoảng trắng liền nhau
      str = str.replace(/ + /g, " ");
      str = str.trim();
      // Remove punctuations
      return str;
    },
  },
  watch: {
    "modelData.account_holder": function () {
      let text = this.removeVietnameseTones(this.modelData.account_holder);
      text = text.toUpperCase();
      text = text.replace(/[0-9]/g, "");
      if (text !== this.modelData.account_holder) {
        clearTimeout(this.timer);
        let _this = this;
        this.timer = setTimeout(function () {
          _this.modelData.account_holder = text;
        }, 800);
      }
    },

    "itemSelect.name": function () {
      let text = this.removeVietnameseTones(this.itemSelect.name);
      text = text.toUpperCase();
      text = text.replace(/[0-9]/g, "");
      if (text !== this.itemSelect.name) {
        clearTimeout(this.timer2);
        let _this = this;
        this.timer2 = setTimeout(function () {
          _this.itemSelect.name = text;
        }, 800);
      }
    },
  },
};
</script>

<style lang="css" scoped>
.transaction-withdraw-tab-2 {
  background-color: #fff;
  padding: 0px 40px 10px 40px;
}
.transaction-withdraw-tab-2 .order-detail-icon-status-6868amg {
  background-color: #9a9a9a;
}
.show-detail-782fkme {
  margin-bottom: 5px;
  margin-left: 0px;
}

.add-bank-withdraw {
  margin-top: 20px;
  display: flex;
  align-items: center;
}
.add-bank-withdraw .title {
  color: #575757;
  margin-right: 15px;
}
.btn-add-bank-withdraw {
}

/*Custom các input*/
.transaction-withdraw-select-bank {
  margin-right: 10px;
  margin-left: 0px;
  width: 250px;
}
.transaction-withdraw-input {
  width: 200px;
  margin-right: 10px;
}
.add-bank-withdraw .frame-btn-create-x-2022 {
  padding: 8px 25px;
}

/*Dialog*/
.back-update-item {
  margin-bottom: 10px;
}
.transaction-withdraw-select-bank-update {
  width: 100%;
}

.btn-dialog-88 {
  border-radius: 4px;
  padding: 10px 20px;
  display: inline-block;
  background-color: #ccc;
  cursor: pointer;
  width: 110px;
  text-align: center;
  background-color: #26b01c;
  color: #fff;
  text-transform: uppercase;
  user-select: none;
}
.btn-dialog-88.disable {
  pointer-events: none;
}
.btn-dialog-88.disable span {
  margin-left: 5px;
}
.btn-dialog-danger {
  background-color: #da0606;
  background-color: #b9bcbe;
  margin-right: 10px;
}
.btn-dialog-88:hover {
  opacity: 0.8;
}

/*Đè text-bank*/
.text-bank {
  color: #575757;
  font-size: 14px;
}
</style>

<style text="css">
.transaction-withdraw-tab-2-update .el-dialog__header {
  font-weight: 700;
  font-size: 16px;
  line-height: 16px;
  letter-spacing: 0.02em;
  text-transform: uppercase;
  text-align: center;
}
.transaction-withdraw-tab-2-update .el-dialog__title {
  color: #1771c1;
}
.transaction-withdraw-tab-2-update .el-dialog__body {
  padding: 20px 20px;
}
</style>
