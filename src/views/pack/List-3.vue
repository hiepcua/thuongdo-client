<template>
  <div class="frame-content-common-2022 pack-list">
    <BreadcrumbTop text1="Quản lý kiện hàng" />
    <div class="pack-list-alert d-flex flex-column">
      <span>- Click chọn kiện hàng về đến kho Việt Nam để yêu cầu ship.</span>
      <span>- Tra cứu công nợ với những kiện hàng đến kho VN.</span>
    </div>
    <div class="pack-list-filter">
      <div class="d-flex">
        <div class="item-56s12">
          <el-input
            placeholder="Mã vận đơn"
            clearable
            v-model="filter.bill_code"
            @keyup.enter.native="fetchPack"
            class="list-filter-innput-2893a999"
          ></el-input>
        </div>
        <div class="item-56s12">
          <el-input
            placeholder="Mã đơn hàng"
            clearable
            v-model="filter.order_code"
            @keyup.enter.native="fetchPack"
            class="list-filter-innput-2893a999"
          ></el-input>
        </div>
        <div class="item-56s12">
          <el-select
            v-model="filter.status"
            placeholder="Trạng thái"
            class="frame-select-common-2022 list-filter-select-89281ab999"
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
        <div class="item-56s12">
          <el-select
            v-model="filter.type"
            placeholder="Loại kiện hàng"
            class="frame-select-common-2022 list-filter-select-89281ab999"
            popper-class="frame-select-popper-common-2022"
            clearable
            size="small"
          >
            <el-option
              v-for="item in listServices"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </div>
        <div class="item-56s12">
          <el-select
            v-model="filter.warehouse_id"
            placeholder="Kho nhận"
            class="frame-select-common-2022 list-filter-select-89281ab999"
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
      </div>
      <div @click="viewCreateDialog">
        <span class="pack-list-create-delivery-88">Tạo giao hàng</span>
      </div>
    </div>
    <div class="table-element-custom-2022 pack-list-table" v-loading="loading">
      <el-table
        :data="listPack"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="index" label="STT" width="50"></el-table-column>
        <el-table-column type="selection" width="50"></el-table-column>
        <el-table-column label="Thông tin kiện hàng" width="180">
          <template slot-scope="scope">
            <div class="d-flex flex-column">
              <span>{{ scope.row.bill_code }}</span>
              <span>{{ scope.row.order_code }}</span>
              <div>
                <span
                  class="order-detail-icon-status-6868amg"
                  style="background: #26b01c"
                  >{{ scope.row.warehouse_code }}</span
                >
              </div>
              <div class="car-check-pack">
                <el-tooltip
                  class="item"
                  effect="dark"
                  content="Phí kiểm đếm"
                  placement="top"
                >
                  <img
                    src="@/static/icon/order-detail-v2/tab1/check-11.svg"
                    v-if="scope.row.inspection_cost"
                  />
                  <img
                    src="@/static/icon/order-detail-v2/tab1/check-0.svg"
                    v-else
                  />
                </el-tooltip>
                <el-tooltip
                  class="item"
                  effect="dark"
                  content="Phí bảo hiểm"
                  placement="top"
                >
                  <img
                    src="@/static/icon/order-detail-v2/tab1/khieng-11.svg"
                    v-if="scope.row.insurance_cost"
                  />
                  <img
                    src="@/static/icon/order-detail-v2/tab1/khieng-0.svg"
                    v-else
                  />
                </el-tooltip>
                <el-tooltip
                  class="item"
                  effect="dark"
                  content="Phí đóng gỗ"
                  placement="top"
                >
                  <img
                    src="@/static/icon/order-detail-v2/tab1/pack-1.svg"
                    v-if="scope.row.woodworking_cost"
                  />
                  <img
                    src="@/static/icon/order-detail-v2/tab1/pack-0.svg"
                    v-else
                  />
                </el-tooltip>
                <el-tooltip
                  class="item"
                  effect="dark"
                  content="Đã gửi yêu cầu ship"
                  placement="top"
                >
                  <img
                    src="@/static/icon/order-detail-v2/tab1/car-11.svg"
                    v-if="scope.row.is_delivery"
                  />
                  <img
                    src="@/static/icon/order-detail-v2/tab1/car-00.svg"
                    v-else
                  />
                </el-tooltip>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="Tình trạng">
          <template slot-scope="scope">
            <div class="d-flex flex-column">
              <div>
                <span
                  class="order-detail-icon-status-6868amg"
                  :style="{ backgroundColor: scope.row.status.color }"
                  >{{ scope.row.status.name }}</span
                >
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="Ghi chú">
          <div>
            <span>Ghi chú</span>
          </div>
        </el-table-column>
        <el-table-column label="Loại hàng">
          <template slot-scope="scope">
            <div class="d-flex flex-column">
              <div>
                <span
                  class="order-detail-icon-status-6868amg"
                  :style="{ backgroundColor: scope.row.type_of_goods.color }"
                  >{{ scope.row.type_of_goods.name }}</span
                >
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="Phí vận chuyển nội địa TQ (¥)">
          <template slot-scope="scope">
            <div class="d-flex flex-column">
              <span>{{ scope.row.delivery_cost_cny }} (¥)</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="Tổng KG hoặc M3" width="70">
          <template slot-scope="scope">
            <div class="d-flex flex-column">
              <span>{{ scope.row.weight_or_volume }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="Phí khác" width="250">
          <template slot-scope="scope">
            <div class="d-flex flex-column">
              <div class="list-detail-icon-free-6789mgt">
                <img src="@/static/icon/pack/list/fee-kiem-dem.svg" />
                <div class="text-price">
                  <span class="line-1">Phí kiểm đếm</span>
                  <span class="number-1">{{
                    scope.row.inspection_cost | vnd
                  }}</span>
                </div>
              </div>
              <div class="list-detail-icon-free-6789mgt">
                <img src="@/static/icon/pack/list/fee-bao-hiem.svg" />
                <div class="text-price">
                  <span class="line-1">Phí bảo hiểm</span>
                  <span class="number-1">{{
                    scope.row.insurance_cost | vnd
                  }}</span>
                </div>
              </div>
              <div class="list-detail-icon-free-6789mgt">
                <img src="@/static/icon/pack/list/fee-dong-go.svg" />
                <div class="text-price">
                  <span class="line-1">Phí đóng gỗ</span>
                  <span class="number-1">{{
                    scope.row.woodworking_cost | vnd
                  }}</span>
                </div>
              </div>
              <div class="list-detail-icon-free-6789mgt">
                <img src="@/static/icon/pack/list/fee-chong-soc.svg" />
                <div class="text-price">
                  <span class="line-1">Phí chống sốc</span>
                  <span class="number-1">{{
                    scope.row.shock_proof_cost | vnd
                  }}</span>
                </div>
              </div>
              <div class="list-detail-icon-free-6789mgt">
                <img src="@/static/icon/pack/list/fee-luu-kho.svg" />
                <div class="text-price">
                  <span class="line-1">Phí lưu kho</span>
                  <span class="number-1">{{
                    scope.row.storage_cost | vnd
                  }}</span>
                </div>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="Chiết khấu">
          <template>
            <div class="d-flex flex-column">
              <span>0 %</span>
              <span>0 đ</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="Thành tiền">
          <template slot-scope="scope">
            <div class="d-flex flex-column">
              <span>{{ scope.row.amount | vnd }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="Thao tác" width="100">
          <template slot-scope="scope">
            <div
              class="d-flex"
              style="margin-left: -2px"
              @click="showPack(scope.row)"
            >
              <img src="@/static/icon/pack/list/show-pack.svg" />
              <span class="show-detail-782fkme">Xem kiện</span>
            </div>
            <div class="d-flex pt-1" @click="viewDetail(scope.row)">
              <img src="@/static/icon/pack/list/show-detail.svg" />
              <span class="show-detail-782fkme">Chi tiết</span>
            </div>
            <div
              class="pt-1 d-none"
              @click="confirmDeleteModel(scope.row)"
              v-if="scope.row.has_delete"
            >
              <span class="order-detail-icon-status-6868amg pointer">Xóa</span>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div
      class="china-panigation-1988 d-flex justify-content-end pt-1"
      v-if="listPack.length"
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

    <CreateDeliveryDialog
      :showCreateDialog="showCreateDialog"
      :orderPackV2Tab1Select="listPackSelect"
      @closeCreateDialog="closeCreateDialogParent"
      @submitDialogDone="submitDialogDoneParent"
    />

    <el-dialog
      top="50px"
      width="65%"
      custom-class="list-pack-dialog-456"
      :close-on-click-modal="false"
      :visible.sync="dialogTableVisible"
    >
      <div class="title-wrap">
        <span class="line-1">Kiện hàng: {{ packSelected.bill_code }}</span>
        <span class="line-2">Mã đơn hàng: {{ packSelected.order_code }}</span>
        <img src="@/static/icon/pack/list/show-detail.svg" />
        <span class="show-detail-782fkme" @click="viewDetail(packSelected)"
          >Chi tiết</span
        >
        <img src="@/static/icon/pack/list/show-detail.svg" />
        <span class="show-detail-782fkme" @click="viewOrder()"
          >Xem đơn hàng</span
        >
      </div>
      <div class="table-v2-827292abc">
        <div
          v-for="(hic, index_hic) in listProductOfPackSelected"
          :key="index_hic"
        >
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
                <span>{{ (i.unit_price_cny * hic.exchange_rate) | vnd }}</span>
                <span>¥{{ i.unit_price_cny }}</span>
              </div>
            </div>
            <div class="icon-item">
              <div class="price-item d-flex flex-column">
                <span class="price-red">{{
                  (i.unit_price_cny * i.quantity * hic.exchange_rate) | vnd
                }}</span>
                <span class="price-red"
                  >¥{{ i.unit_price_cny * i.quantity }}</span
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import axios from "axios";
import BreadcrumbTop from "@/components/BreadcrumbTop";
import CreateDeliveryDialog from "@/views/delivery/create/CreateDialog";
export default {
  name: "ListPack",
  metaInfo() {
    return {
      title: "Quản lý kiện hàng",
    };
  },
  components: {
    BreadcrumbTop,
    CreateDeliveryDialog,
  },
  data() {
    return {
      // Phần search
      loading: true,
      searching: false,
      filter: {
        order_code: "",
        bill_code: "",
        warehouse_id: "",
        type: "",
        status: "",
        page: 1,
        per_page: 15,
      },

      // Phần hiển thị
      listPack: [],
      listStatus: [],
      listWareHouse: [],
      listServices: [
        {
          value: 1,
          label: "Ký gửi",
        },
        {
          value: 0,
          label: "Order",
        },
      ],
      pagination: {
        total: 0,
        count: 0,
        per_page: 0,
        current_page: 1,
        total_pages: 0,
      },

      // Kiện dc check
      listPackSelect: [],
      showCreateDialog: false,

      // Xử lý phần xem kiện
      dialogTableVisible: false,
      packSelected: {},
      listProductOfPackSelected: [],
    };
  },
  mounted() {
    this.fetchOrderStatus();
    this.fetchWareHouse();
    this.fetchPack();
  },
  methods: {
    fetchOrderStatus() {
      axios.get("package/statuses").then((response) => {
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
    fetchPack(loading = true) {
      if (loading) {
        this.loading = true;
      }
      let filter = {
        status: this.filter.status,
        warehouse_id: this.filter.warehouse_id,
        order_code: this.filter.order_code,
        bill_code: this.filter.bill_code,
        type: this.filter.type,
        page: this.filter.page,
        per_page: this.filter.per_page,
      };
      axios.get("package", { params: filter }).then((response) => {
        this.loading = false;
        switch (response.code) {
          case 200:
            this.listPack = response.data.items;
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
      this.fetchPack();
    },
    handleSelectionChange(value) {
      this.listPackSelect = value;
    },

    // Xử lý phần tạo giao hàng
    viewCreateDialog() {
      if (this.listPackSelect.length == 0) {
        this.$notify({
          title: "Có lỗi xảy ra",
          message: "Vui lòng chọn kiện hàng cần giao",
          type: "warning",
        });
        return;
      }
      let bill_code_error = "";
      let bill_code_error_mess = "";
      this.listPackSelect.forEach((item) => {
        if (item.can_make_delivery == false) {
          bill_code_error = item.bill_code;
          bill_code_error_mess = item.reason_cant_make_delivery;
        }
      });
      if (bill_code_error) {
        let mes =
          "Kiện " +
          bill_code_error +
          " không thể tạo giao hàng vì " +
          bill_code_error_mess;
        this.$notify({
          title: "Có lỗi xảy ra",
          message: mes,
          type: "warning",
        });
        return;
      }

      this.showCreateDialog = true;
    },
    closeCreateDialogParent() {
      this.showCreateDialog = false;
    },
    submitDialogDoneParent() {
      this.fetchPack();
    },

    // Xử lý phần xem kiện
    showPack(pack) {
      this.dialogTableVisible = true;
      this.packSelected = pack;
      this.listProductOfPackSelected = [];
      axios.get("package/products/" + pack.id).then((response) => {
        this.loading = false;
        switch (response.code) {
          case 200:
            this.listProductOfPackSelected = response.data;
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
    confirmDeleteModel(item) {
      if (item.has_delete == false) {
        return;
      }
      this.$confirm("Xác nhận xóa kiện hàng: ", "Cảnh báo", {
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
      axios.delete("package/" + item.id).then((response) => {
        switch (response.code) {
          case 200:
            this.$notify({
              title: "Thành công",
              message: "Xóa bản ghi thành công",
              type: "success",
            });
            this.fetchPack();
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
    viewDetail(item) {
      this.$router.push({
        name: "pack-detail",
        params: { pack_id: item.id },
      });
    },
    viewOrder() {
      this.$router.push({
        name: "order-detail",
        params: { order_id: this.packSelected.order_id },
      });
    },
  },
  watch: {
    "filter.status": function () {
      this.filter.page = 1;
      this.fetchPack();
    },
    "filter.warehouse_id": function () {
      this.filter.page = 1;
      this.fetchPack();
    },
    "filter.type": function () {
      this.filter.page = 1;
      this.fetchPack();
    },
  },
};
</script>

<style lang="css" scoped>
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
.pack-list-filter .item-56s12 {
  margin-right: 15px;
}
.pack-list-create-delivery-88 {
  background: #26b01c;
  border-radius: 4px;
  padding: 7px 20px;
  color: #fff;
  cursor: pointer;
  margin-right: 20px;
}
.pack-list-create-delivery-88:hover {
  opacity: 0.8;
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

/*Dialog*/
.list-pack-dialog-456 .title-wrap {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
}
.list-pack-dialog-456 .line-1 {
  font-weight: 700;
  font-size: 16px;
  line-height: 16px;
  letter-spacing: 0.02em;
  text-transform: uppercase;
  color: #1771c1;
}
.list-pack-dialog-456 .line-2 {
  font-weight: 500;
  font-size: 14px;
  line-height: 16px;
  color: #575757;
  margin-left: 10px;
}
.list-pack-dialog-456 .title-wrap img {
  margin-left: 10px;
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
.list-pack-dialog-456 .el-dialog__body {
  padding: 5px 25px 40px 25px;
}
</style>
