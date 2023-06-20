<template>
  <div class="frame-content-common-2022 pack-list" id="ST2022">
    <BreadcrumbTop text1="Nhà Cung cấp" />
    <div class="pack-list-filter">
      <div class="d-flex">
        <div class="frame-filter-item-2022">
          <el-select
            v-model="filter.industry"
            placeholder="Ngành hàng kinh doanh"
            class="frame-select-common-2022 frame-filter-select-2022 frame-filter-select-2023"
            popper-class="frame-select-popper-common-2022"
            clearable
            size="small"
          >
            <el-option
              v-for="item in listCategory"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </div>
        <div class="frame-filter-item-2022">
          <el-select
            v-model="filter.type"
            placeholder="Loại nhà cung cấp"
            class="frame-select-common-2022 frame-filter-select-2022"
            popper-class="frame-select-popper-common-2022"
            clearable
            size="small"
          >
            <el-option
              v-for="item in listType"
              :key="item.key"
              :label="item.value"
              :value="item.key"
            >
            </el-option>
          </el-select>
        </div>
        <div class="frame-filter-item-2022">
          <el-input
            placeholder="Tên nhà cung cấp"
            clearable
            v-model="filter.name"
            @keyup.native="fetchDatabaseModel"
            class="frame-filter-innput-2022"
          ></el-input>
        </div>
      </div>
      <div @click="viewCreateDialog">
        <span class="frame-btn-add-filter-x-2022"
          ><i class="el-icon-plus"></i> Thêm nhà cung cấp</span
        >
      </div>
    </div>
    <div
      class="table-element-custom-2022 pack-list-table tableSup"
      v-loading="loading"
    >
      <el-table :data="listSupplier" style="width: 100%">
        <el-table-column type="index" label="STT" width="90"></el-table-column>
        <el-table-column label="Mã NCC">
          <template slot-scope="scope">
            <span>{{ scope.row.code }}</span>
          </template>
        </el-table-column>
        <el-table-column label="logo">
          <template slot-scope="scope">
            <img
              v-if="scope.row.logo == null"
              src="https://www.thuongdo.com/sites/all/modules/developer/nha_cung_cap/nologo.png"
              class="avatar"
              alt=""
            />
            <img v-else class="avatar" :src="scope.row.logo" alt="" />
          </template>
        </el-table-column>
        <el-table-column label="Thông tin NCC" width="300">
          <template slot-scope="scope">
            <span>{{ scope.row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column label="Tổng tiền đặt hàng" width="360">
          <template slot-scope="scope">
            <span>{{ scope.row.order_amount }}</span>
          </template>
        </el-table-column>
        <el-table-column label="Tổng khiếu nại">
          <template slot-scope="scope">
            <span>{{ scope.row.complain_number }}</span>
          </template>
        </el-table-column>
        <el-table-column label="Thao tác" width="100">
          <template slot-scope="scope">
            <span class="btnDelete" @click="confirmDeleteModel(scope.row)"
              >Xóa</span
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div
      class="china-panigation-1988 d-flex justify-content-end pt-1"
      v-if="listSupplier.length"
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
    <!-- Phần thêm nhà cung cấp -->
    <el-dialog
      :close-on-click-modal="false"
      :visible.sync="showCreateDialog"
      width="70%"
      custom-class="create-delivery-dialog-882"
    >
      <div class="create-supplier-dalog-882-wrap">
        <div class="create-supplier-table">
          <div class="d-flex align-items-center">
            <div class="stt d-flex justify-content-center align-items-center">
              <span>1</span>
            </div>
            <span class="title">Thông tin chung</span>
          </div>
        </div>
        <!--  -->
        <div
          class="content-create-supplier"
          id="containerDiv"
          v-for="pack in ListAddSupplierV1"
          :key="pack.key"
        >
          <div class="create-supplier-table-item">
            <el-row>
              <el-col :span="12">
                <div
                  class="create-supplier-input d-flex justify-content-start align-items-center"
                >
                  <span class="title-item">Tên nhà cung cấp *</span>
                  <el-input
                    class="inputSupplier"
                    v-model="pack.name"
                    maxlength="256"
                    clearable
                    :class="[pack.name_err ? 'error-data-1988' : '']"
                  ></el-input>
                </div>
              </el-col>
              <el-col :span="12">
                <div
                  class="create-supplier-input d-flex justify-content-start align-items-center"
                >
                  <span class="title-itemV2">Địa chỉ</span>
                  <el-input
                    class="inputSupplier"
                    v-model="pack.address"
                  ></el-input>
                </div>
              </el-col>
            </el-row>
          </div>
          <div class="create-supplier-table-item">
            <el-row>
              <el-col :span="12">
                <div
                  class="create-supplier-input d-flex justify-content-start align-items-center"
                >
                  <span class="title-item">Website</span>
                  <el-input
                    class="inputSupplier"
                    v-model="pack.website"
                  ></el-input>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="create-supplier-input d-flex">
                  <span class="title-itemV2 pt-2">Logo</span>
                  <!-- upload logo  -->
                  <div
                    @click="selectImage(pack)"
                    class="btnUpload d-flex justify-content-center align-items-center"
                  >
                    Tải lên
                  </div>
                  <div class="icon-add-image" v-if="pack.loading == false">
                    <img
                      v-if="pack.image_path == ''"
                      alt=""
                      :class="[pack.image_err ? 'error-data-1988 a90' : '']"
                    />
                    <img
                      v-else
                      :src="pack.image_path"
                      @error="imageLoadError"
                      @load="onImgLoad"
                      alt=""
                      class="img89"
                    />
                  </div>
                  <div
                    v-else
                    class="image-loading d-flex justify-content-center align-items-center"
                  >
                    <i class="el-icon-loading"></i>
                  </div>
                  <!-- upload logo  -->
                </div>
              </el-col>
            </el-row>
          </div>
        </div>
        <!--  -->
        <div class="create-supplier-table mt-4">
          <div class="d-flex align-items-center">
            <div class="stt d-flex justify-content-center align-items-center">
              <span>2</span>
            </div>
            <span class="title">Phương thức liên hệ</span>
          </div>
        </div>
        <div v-for="pack in ListAddSupplier" :key="pack.key">
          <div class="create-supplier-table-item">
            <div class="d-flex">
              <el-select
                v-model="pack.supplier_type_id"
                placeholder="Phương thức liên hệ"
                popper-class="frame-select-popper-common-2022"
                clearable
                size="small"
              >
                <el-option
                  v-for="item in listTypeContact"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                >
                </el-option>
              </el-select>
              <el-input placeholder="Họ và tên" v-model="pack.name"></el-input>
              <el-input
                placeholder="Chức vụ"
                v-model="pack.position"
              ></el-input>
              <el-input
                placeholder="Chi tiết"
                v-model="pack.details"
              ></el-input>
            </div>
          </div>
        </div>
        <div class="add-item-182y" @click="addSup">
          <span>+ Thêm dòng</span>
        </div>
        <!--  -->
        <div class="create-supplier-table mt-4">
          <div class="d-flex align-items-center">
            <div class="stt d-flex justify-content-center align-items-center">
              <span>3</span>
            </div>
            <span class="title">Phương thức Thanh toán</span>
          </div>
        </div>
        <div v-for="pack in ListAddBank" :key="pack.key">
          <div class="create-supplier-table-item">
            <div class="d-flex">
              <el-select
                v-model="pack.bank_id"
                placeholder="Tên ngân hàng"
                popper-class="frame-select-popper-common-2022"
                clearable
                size="small"
              >
                <el-option
                  v-for="item in listBank"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                >
                </el-option>
              </el-select>
              <el-input
                placeholder="Số tài khoản"
                v-model="pack.account_number"
              ></el-input>
              <el-input
                placeholder="Chủ tài khoản"
                v-model="pack.account_holder"
              ></el-input>
              <el-input
                placeholder="Chi nhánh"
                v-model="pack.branch"
              ></el-input>
            </div>
          </div>
        </div>
        <div class="add-item-182y" @click="addSupBank">
          <span>+ Thêm dòng</span>
        </div>
        <div class="d-flex justify-content-end pt-3 pr-3">
          <div class="frame-btn-add-filter-x-2022" @click="submitForm()">
            <span v-if="!canSubmit"><i class="el-icon-loading"></i></span>
            <span v-else><i class="el-icon-plus"></i> Thêm nhà cung cấp</span>
          </div>
        </div>
      </div>
    </el-dialog>
    <div>
      <input
        type="file"
        class="upload-avatar"
        id="file"
        ref="file"
        v-on:change="handleFileUpload()"
      />
    </div>
  </div>
</template>

<script>
// import axios from "axios";
import BreadcrumbTop from "@/components/BreadcrumbTop";
import axios from "axios";

export default {
  name: "ListSupplier",
  metaInfo() {
    return {
      title: "Nhà cung cấp",
    };
  },
  components: {
    BreadcrumbTop,
  },
  data() {
    return {
      // Phần search
      canSubmit: true,
      loading: true,
      searching: false,
      filter: {
        industry: "",
        sort: "",
        type: "",
        name: "",
        page: 1,
        per_page: 10,
      },
      // Phần hiển thị
      listSupplier: [],
      listStatus: [],
      pagination: {
        total: 0,
        count: 0,
        per_page: 0,
        current_page: 1,
        total_pages: 0,
      },

      listType: [
        {
          key: "online",
          value: "Online",
        },
        {
          key: "offline",
          value: "Offline",
        },
      ],
      showCreateDialog: false,
      ListAddSupplierV1: [
        {
          key: 1,
          loading: false,
          name: "",
          address: "",
          logo: "",
          website: "",
          image_path: "",
          name_err: false,
        },
      ],
      ListAddSupplier: [
        {
          name: "",
          position: "",
          details: "",
          supplier_type_id: "",
        },
      ],
      ListAddBank: [
        {
          bank_id: "",
          account_number: "",
          account_holder: "",
          branch: "",
        },
      ],
      packClick: {},
      file: "",
      listCategory: [],
      listTypeContact: [],
      listBank: [],
    };
  },
  mounted() {
    this.fetchCategory();
    this.fetchTypeSupplier();
    this.fetchBank();
    this.fetchDatabaseModel();
  },
  methods: {
    fetchBank() {
      axios.get("bank/cn").then((response) => {
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
    fetchCategory() {
      axios.get("category").then((response) => {
        switch (response.code) {
          case 200:
            this.listCategory = response.data;
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
    fetchTypeSupplier() {
      axios.get("supplier_type").then((response) => {
        switch (response.code) {
          case 200:
            this.listTypeContact = response.data;
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
    fetchDatabaseModel(loading = true) {
      if (loading) {
        this.loading = true;
      }
      let filter = {
        industry: this.filter.industry,
        sort: this.filter.sort,
        type: this.filter.type,
        name: this.filter.name,
        page: this.filter.page,
        per_page: this.filter.per_page,
      };
      axios.get("supplier", { params: filter }).then((response) => {
        this.loading = false;
        switch (response.code) {
          case 200:
            this.listSupplier = response.data.items;
            this.pagination.total = response.data.pagination.total;
            this.pagination.per_page = response.data.pagination.per_page;
            // Nếu listOrder = [] mà page >=2 thì get lại vs page = page - 1;
            if (this.listSupplier.length == 0 && this.filter.page >= 2) {
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
    // Check dữ liệu xem có đủ ko
    checkDataPushError() {
      let flag = false;
      this.ListAddSupplierV1.forEach((item) => {
        if (item.name == "") {
          item.name_err = true;
          flag = true;
        }
      });
      return flag;
    },
    //lưu nhà cung cap
    submitForm() {
      if (this.checkDataPushError()) {
        // https://stackoverflow.com/questions/10744299/scroll-back-to-the-top-of-scrollable-div
        document.getElementById("containerDiv").scrollIntoView({
          behavior: "smooth",
          block: "start",
          inline: "nearest",
        });
        this.$notify({
          title: "Vui lòng kiểm tra lại thông tin",
          message: "Vui lòng nhập tên nhà cung cấp",
          type: "warning",
        });
        return;
      }

      if (this.canSubmit == false) {
        return;
      }
      this.canSubmit = false;
      this.ListAddSupplierV1.forEach((item) => {
        let data = {
          name: item.name,
          address: item.address,
          logo: item.image_path,
          website: item.website,
          type_contact: this.ListAddSupplier,
          type_bank: this.ListAddBank,
        };
        axios.post("supplier", data).then((response) => {
          this.canSubmit = true;
          switch (response.code) {
            case 200:
              this.$notify({
                title: "Thành công",
                message: "Tạo nhà cung cấp thành công",
                type: "success",
              });
              this.fetchDatabaseModel();
              this.showCreateDialog = false;
              this.ListAddSupplierV1 = [
                {
                  key: 1,
                  loading: false,
                  name: "",
                  address: "",
                  logo: "",
                  website: "",
                  image_path: "",
                  name_err: false,
                },
              ];
              this.ListAddSupplier = [
                {
                  name: "",
                  position: "",
                  details: "",
                  supplier_type_id: "",
                },
              ];
              this.ListAddBank = [
                {
                  bank_id: "",
                  account_number: "",
                  account_holder: "",
                  branch: "",
                },
              ];
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
      });
    },
    // Xử lý upload ảnh
    selectImage(pack) {
      this.packClick = pack;
      document.getElementById("file").click();
    },
    handleFileUpload() {
      this.file = this.$refs.file.files[0];
      let file = this.file;
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isLt2M) {
        this.$message.error("Dung lượng file tối đa là 2M");
        return;
      }
      let typeFile = file["type"];
      let arr_type = ["image/jpeg", "image/png", "image/jpg"];
      if (!arr_type.includes(typeFile)) {
        this.$message.error("Chỉ được upload file ảnh");
        return;
      }
      this.submitFile();
    },
    async submitFile() {
      this.packClick.loading = true;
      let formData = new FormData();
      formData.append("files[]", this.file);
      fetch("https://api-admin.thuongdo.vn/api/media/upload", {
        method: "POST",
        body: formData,
      })
        .then((response) => response.json())
        .then((result) => {
          this.packClick.loading = false;
          this.packClick.image = result.data[0].path;
          this.packClick.image_path =
            process.env.VUE_APP_IMAGE_URL + result.data[0].path;
        })
        .catch(() => {
          this.packClick.loading = false;
          this.$notify.error({
            title: "Error",
            message: "Đã có lỗi xảy ra. Vui lòng liên hệ Admin !",
          });
        });
    },
    checkURL(url) {
      return url.match(/\.(jpeg|jpg|gif|png)$/) != null;
    },
    imageLoadError() {
      this.$message({
        message: "Không thể tải được ảnh",
        type: "warning",
      });
    },
    onImgLoad() {},
    // upload ảnh
    viewCreateDialog() {
      this.showCreateDialog = true;
    },
    addSup() {
      this.ListAddSupplier.push({
        key: Math.floor(Math.random() * 100000) + 1,
        name: "",
        position: "",
        details: "",
        supplier_type_id: "",
      });
    },
    addSupBank() {
      this.ListAddBank.push({
        key: Math.floor(Math.random() * 100000) + 1,
        bank_id: "",
        account_number: "",
        account_holder: "",
        branch: "",
      });
    },

    // Thay đổi Current Page
    changeCurrentPage(currentPage) {
      this.filter.page = currentPage;
      this.fetchDatabaseModel();
      document.getElementById("ST2022").scrollIntoView({ behavior: "smooth" });
    },
    //Xóa
    confirmDeleteModel(item) {
      this.$confirm("Xác nhận xóa nhà cung cấp " + item.name, "Cảnh báo", {
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
      axios.delete("supplier/" + item.id).then((response) => {
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
  },
  watch: {
    "filter.industry": function () {
      this.filter.page = 1;
      this.fetchDatabaseModel();
    },
    "filter.type": function () {
      this.filter.page = 1;
      this.fetchDatabaseModel();
    },
    "filter.sort": function () {
      this.filter.page = 1;
      this.fetchDatabaseModel();
    },
  },
};
</script>

<style lang="css" scoped>
/* Thêm nhà cung cấp */
.create-supplier-table {
  background: #5998db;
  padding: 4px 0 4px 16px;
}

.create-supplier-table .stt {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: #185493;
  font-weight: 700;
  font-size: 14px;
  color: #fff;
}

.create-supplier-table .title {
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: 0.01em;
  color: #fff;
  padding-left: 14px;
}

.create-supplier-table-item {
  border: 0.5px solid rgba(180, 180, 180, 0.63);
  padding: 21px 0 22px 22px;
}

.create-supplier-input span {
  font-weight: 400;
  font-size: 12px;
  line-height: 14px;
  letter-spacing: 0.02em;
  color: #575757;
}

.create-supplier-input .title-item {
  width: 140px;
}

.create-supplier-input .title-itemV2 {
  width: 80px;
}

.add-item-182y {
  font-weight: 400;
  font-size: 14px;
  line-height: 16px;
  letter-spacing: 0.02em;
  color: #1771c1;
  padding: 12px 0 0 30px;
  cursor: pointer;
}

/*  */
.pack-list-alert {
  margin: 15px 25px 17px 25px;
  background: #fde9ea;
  padding: 15px 10px 20px 10px;
}

.pack-list-alert span {
  font-weight: 400;
  font-size: 14px;
  line-height: 24px;
  letter-spacing: 0.02em;
  color: #d85030;
}

.pack-list-filter {
  background-color: #fff;
  height: 88px;
  padding: 0px 25px;
  align-items: center;
  justify-content: space-between;
  display: flex;
}

/*order-list-table*/
.pack-list-table {
  margin-bottom: 10px;
  min-height: 300px;
  background-color: #fff;
  padding: 0px 25px 0px 25px;
}

.pack-list-table .car-check-pack {
  display: flex;
  align-items: center;
  margin-top: 10px;
}

.pack-list-table .car-check-pack img {
  height: 13px;
  margin-right: 10px;
}

.order-detail-icon-status-6868amg.pointer {
  cursor: pointer;
}

/*Đè bảng*/
.table-v2-827292abc {
  padding-right: 0px;
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
<style type="text/css">
.frame-filter-select-2023 .el-input__inner {
  width: auto;
}

.frame-filter-innput-2022 .el-input__inner {
  width: 180px;
}

/* thêm nhà cung cấp  */
.create-supplier-input .inputSupplier input {
  width: 300px;
  height: 32px;
  background: #fff;
  border: 1px solid #3f92d1;
  border-radius: 20px;
  margin-left: 20px;
}

.create-supplier-table-item .el-input,
.create-supplier-table-item .el-select {
  width: 300px;
  margin: 0 1em;
}

.el-input__icon {
  line-height: 35px;
}

.create-supplier-table-item .el-input__inner {
  background: #fff;
  border: 1px solid #3f92d1;
  border-radius: 20px;
  font-weight: 400;
  font-size: 12px;
  line-height: 14px;
  letter-spacing: 0.02em;
  height: 32px;
}

/* upload ảnh  */
.upload-avatar {
  display: none;
}

.img89 {
  object-fit: cover;
  height: 80px;
  display: inline-block;
  max-width: 100%;
}

.btnUpload {
  margin-left: 36px;
  margin-right: 2em;
}

.btnUpload {
  cursor: pointer !important;
  background: #26b01c !important;
  border-radius: 4px !important;
  height: 32px;
  width: 80px;
  font-weight: 400 !important;
  font-size: 12px !important;
  line-height: 14px !important;
  color: #fff !important;
}

.tableSup img {
  width: auto;
  height: 100px;
  object-fit: contain;
}

.btnDelete {
  cursor: pointer;
}

.btnDelete:hover {
  color: #da0606;
}

.create-supplier-input .inputSupplier.error-data-1988 input {
  border: 1px solid red;
}

.el-input__inner:focus {
  border-color: #409eff !important;
  outline: 0;
}
</style>
