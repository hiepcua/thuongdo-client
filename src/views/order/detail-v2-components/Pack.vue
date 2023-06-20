<template>
  <div class="order-detail-v2-pack">
    <div class="navigation-78931">
      <div
        class="item-68"
        :class="[tabActive == 1 ? 'active' : '']"
        @click="changeTab(1)"
      >
        <span
          class="count-1"
          :style="{ backgroundColor: orderDetailV2.reports.packages.color }"
          >{{ orderDetailV2.reports.packages.quantity }}</span
        >
        <span class="text-1">Tổng số kiện hàng</span>
      </div>
      <div class="line-1" v-show="tabActive == 3"></div>
      <div
        class="item-68"
        :class="[tabActive == 2 ? 'active' : '']"
        @click="changeTab(2)"
      >
        <span
          class="count-1"
          :style="{ backgroundColor: orderDetailV2.reports.complains.color }"
          >{{ orderDetailV2.reports.complains.quantity }}</span
        >
        <span class="text-1">Khiếu nại</span>
      </div>
      <div class="line-1" v-show="tabActive == 1"></div>
      <div
        class="item-68"
        :class="[tabActive == 3 ? 'active' : '']"
        @click="changeTab(3)"
      >
        <span
          class="count-1"
          :style="{ backgroundColor: orderDetailV2.reports.deliveries.color }"
          >{{ orderDetailV2.reports.deliveries.quantity }}</span
        >
        <span class="text-1">Thông tin giao hàng</span>
      </div>
    </div>
    <div class="table-element-custom-2022 tab-active-1" v-show="tabActive == 1">
      <el-table
        :data="orderPackV2Tab1"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="index" label="STT" width="50"></el-table-column>
        <el-table-column type="selection" width="50"></el-table-column>
        <el-table-column label="Thông tin kiện hàng" property="info">
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
        <el-table-column label="Tổng KG hoặc M3">
          <template slot-scope="scope">
            <div class="d-flex flex-column">
              <span>{{ scope.row.weight_or_volume }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="Phí vận chuyển nội địa">
          <template slot-scope="scope">
            <div class="d-flex flex-column">
              <span>{{ scope.row.delivery_cost | vnd }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="Giá vận chuyển">
          <template slot-scope="scope">
            <div class="d-flex flex-column">
              <span>{{ scope.row.china_shipping_cost | vnd }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="Tổng phí vận chuyển">
          <template slot-scope="scope">
            <div class="d-flex flex-column">
              <span>{{ scope.row.amount | vnd }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="Ghi chú">
          <template>
            <div class="d-flex flex-column">
              <span>Ghi chú</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="Thao tác" width="100">
          <template slot-scope="scope">
            <div class="d-flex">
              <img src="@/static/icon/order-detail-v2/detail.svg" />
              <span class="show-detail-782fkme" @click="viewPack(scope.row.id)"
                >Chi tiết</span
              >
            </div>
          </template>
        </el-table-column>
      </el-table>
      <div
        class="action-wrap d-flex justify-content-between align-items-center"
      >
        <div>
          <span class="create-delivery-88" @click="viewCreateDialog()"
            >Giao hàng</span
          >
          <span class="create-complain-88" @click="viewCreate()"
            >Tạo khiếu nại</span
          >
        </div>
        <div>
          <span
            >Tổng phí vận chuyển:
            <strong>{{ getTotalShippingFee | vnd }}</strong></span
          >
        </div>
      </div>
    </div>

    <div class="table-element-custom-2022 tab-active-2" v-show="tabActive == 2">
      <el-table
        :data="listComplain"
        style="width: 100%"
        v-loading="loadingListComplain"
      >
        <el-table-column type="index" label="STT" width="50"></el-table-column>
        <el-table-column label="Hình ảnh">
          <template slot-scope="scope">
            <img class="image-complain" :src="scope.row.image" />
          </template>
        </el-table-column>
        <el-table-column label="Kiện hàng">
          <template slot-scope="scope">
            <div>
              <span v-if="scope.row.packages">{{
                scope.row.packages.bill_code
              }}</span>
            </div>
            <div class="d-flex" @click="viewPack(scope.row.packages.id)">
              <img src="@/static/icon/order-detail-v2/tab2/report.svg" />
              <span class="show-detail-782fkme">Xem kiện hàng</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          label="Loại khiếu nại"
          property="complain_type"
        ></el-table-column>
        <el-table-column label="Trạng thái" width="150">
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
        <el-table-column
          label="Ngày gửi"
          property="created_at"
        ></el-table-column>
        <el-table-column label="Thao tác" width="200">
          <template slot-scope="scope">
            <div class="d-flex">
              <span
                class="show-detail-782fkme"
                @click="viewComplain(scope.row.id)"
                >Xem chi tiết</span
              >
            </div>
            <div class="line-1">
              <span
                class="order-detail-icon-status-6868amg poiter"
                @click="confirmCancelModel(scope.row)"
                >Hủy</span
              >
            </div>
            <div class="line-1 d-flex align-items-center">
              <span class="count">{{ scope.row.comment_number }}</span>
              <span class="show-detail-782fkme" @click="showFeedback(scope.row)"
                >Phản hồi</span
              >
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <div class="table-element-custom-2022 tab-active-3" v-show="tabActive == 3">
      <el-table
        :data="listDelivery"
        style="width: 100%"
        v-loading="loadingListDelivery"
      >
        <el-table-column type="index" label="STT" width="50"></el-table-column>
        <el-table-column
          label="Ngày tạo"
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
                class="order-detail-icon-status-6868amg"
                :style="{ backgroundColor: scope.row.status.color }"
                >{{ scope.row.status.name }}</span
              >
            </div>
            <div class="d-flex">
              <img src="@/static/icon/order-detail-v2/detail.svg" />
              <span class="show-detail-782fkme">Chi tiết</span>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <CreateDeliveryDialog
      :showCreateDialog="showCreateDialog"
      :orderPackV2Tab1Select="orderPackV2Tab1Select"
      @closeCreateDialog="closeCreateDialogParent"
      @submitDialogDone="submitDialogDoneParent"
    />

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
import CreateDeliveryDialog from "@/views/delivery/create/CreateDialog";
import Feedback from "@/views/complain/common-components/Feedback";
export default {
  name: "DetailV2NCC",
  props: {
    orderDetailV2: Object,
  },
  components: {
    CreateDeliveryDialog,
    Feedback,
  },
  computed: {
    getTotalShippingFee() {
      let total = 0;
      this.orderPackV2Tab1.forEach((item) => {
        total += item.amount;
      });
      return total;
    },
  },
  data() {
    return {
      tabActive: 1,
      showCreateDialog: false,

      // Tab 1
      orderPackV2Tab1: [],
      orderPackV2Tab1Select: [],

      // Tab 2
      loadingListComplain: false,
      listComplain: [],
      hasLoadListComplain: false,
      // Xử lý phần xem phẩn hồi
      dialogTableVisible: false,
      complainSelected: {},

      // Tab 3
      loadingListDelivery: false,
      listDelivery: [],
      hasLoadListDelivery: false,
    };
  },
  mounted() {
    this.fetchPack();
  },
  methods: {
    changeTab(tab) {
      this.tabActive = tab;

      if (this.hasLoadListDelivery == false && this.tabActive == 3) {
        this.fetchDelivery();
      }
      if (this.hasLoadListComplain == false && this.tabActive == 2) {
        this.fetchComplain();
      }
    },
    // Taoh kiếu nại
    viewCreate() {
      if (this.orderPackV2Tab1Select.length == 0) {
        this.$notify({
          title: "Có lỗi xảy ra",
          message: "Vui lòng chọn kiện hàng cần khiếu nại",
          type: "warning",
        });
        return;
      }
      if (this.orderPackV2Tab1Select.length > 1) {
        this.$notify({
          title: "Có lỗi xảy ra",
          message: "Chỉ được chọn 1 kiện để tạo khiếu nại",
          type: "warning",
        });
        return;
      }
      if (this.orderDetailV2.can_make_complain == false) {
        this.$notify({
          title: "Có lỗi xảy ra",
          message: "Đơn có trạng thái Đã đặt hàng thì mới được tạo khiếu nại",
          type: "warning",
        });
        return;
      }
      let bill_code_error = "";
      let pack_id = "";
      this.orderPackV2Tab1Select.forEach((item) => {
        pack_id = item.id;
        if (item.has_complain) {
          bill_code_error = item.bill_code;
        }
      });
      if (bill_code_error) {
        let mes = "Kiện " + bill_code_error + " đã có đơn khiếu nại";
        this.$notify({
          title: "Có lỗi xảy ra",
          message: mes,
          type: "warning",
        });
        return;
      }
      this.$router.push({
        name: "complain-create",
        params: { order_id: this.$route.params.order_id, pack_id: pack_id },
      });
    },
    // Tạo giao hàng
    viewCreateDialog() {
      if (this.orderPackV2Tab1Select.length == 0) {
        this.$notify({
          title: "Có lỗi xảy ra",
          message: "Vui lòng chọn kiện hàng cần giao",
          type: "warning",
        });
        return;
      }
      let bill_code_error = "";
      let bill_code_error_mess = "";
      this.orderPackV2Tab1Select.forEach((item) => {
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
      this.fetchDelivery();
      this.$emit("splitOrderDone", false);
    },
    handleSelectionChange(value) {
      this.orderPackV2Tab1Select = value;
    },

    // Tab 1
    fetchPack() {
      axios
        .get("package/order/" + this.$route.params.order_id)
        .then((response) => {
          this.loading = false;
          switch (response.code) {
            case 200:
              this.orderPackV2Tab1 = response.data;
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

    // Tab 2
    fetchComplain() {
      this.loadingListComplain = true;
      axios.get("complain/" + this.$route.params.order_id).then((response) => {
        this.loadingListComplain = false;
        switch (response.code) {
          case 200:
            this.listComplain = response.data;
            this.hasLoadListComplain = true;
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
    viewPack(pack_id) {
      this.$router.push({
        name: "pack-detail",
        params: { pack_id: pack_id },
      });
    },
    viewComplain(complain_id) {
      this.$router.push({
        name: "complain-detail",
        params: { complain_id: complain_id },
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

    // Tab 3
    fetchDelivery() {
      this.loadingListDelivery = true;
      axios.get("delivery/" + this.$route.params.order_id).then((response) => {
        this.loadingListDelivery = false;
        switch (response.code) {
          case 200:
            this.listDelivery = response.data;
            this.hasLoadListDelivery = true;
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
  },
};
</script>

<style lang="css" scoped>
.order-detail-v2-pack {
  padding: 20px 30px;
  background: #fff;
  margin-bottom: 15px;
}
.navigation-78931 {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  border-bottom: 1px solid #28b8ce;
}
.item-68 {
  background-color: #f6faff;
  padding: 10px 20px;
  display: flex;
  align-items: center;
  cursor: pointer;
  color: #1771c1;
  transition: all 0.3s;
  font-weight: 400;
  margin-bottom: 1px;
}
.item-68.active {
  background-color: #28b8ce;
  color: #fff;
}
.item-68:hover {
  background-color: #28b8ce;
  transition: all 0.3s;
}
.item-68 .count-1 {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: red;
  color: #fff;
  margin-right: 5px;
}
.navigation-78931 .line-1 {
  width: 1px;
  height: 25px;
  display: inline-block;
  background-color: #a9ddf3;
}

/*.tab-active-1*/
.tab-active-1 .action-wrap {
  margin-top: 15px;
}
.tab-active-1 .create-delivery-88 {
  background: #26b01c;
  border-radius: 4px;
  font-weight: 500;
  font-size: 16px;
  line-height: 16px;
  letter-spacing: 0.02em;
  text-transform: uppercase;
  color: #ffffff;
  padding: 10px 30px;
  margin-right: 15px;
  display: inline-block;
  cursor: pointer;
}
.tab-active-1 .create-delivery-88:hover {
  opacity: 0.8;
}
.tab-active-1 .create-complain-88 {
  border: 1px solid #b4b4b4;
  border-radius: 4px;
  font-weight: 500;
  font-size: 16px;
  line-height: 16px;
  text-align: center;
  letter-spacing: 0.02em;
  text-transform: uppercase;
  color: #575757;
  padding: 10px 30px;
  display: inline-block;
  cursor: pointer;
}
.tab-active-1 .create-complain-88:hover {
  opacity: 0.8;
}
.tab-active-1 .car-check-pack {
  display: flex;
  align-items: center;
  margin-top: 10px;
}
.tab-active-1 .car-check-pack img {
  height: 13px;
  margin-right: 10px;
}

/*tab-active-2*/
.tab-active-2 .image-complain {
  width: 100px;
}
.tab-active-2 .count {
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
.tab-active-2 .line-1 {
  margin-top: 5px;
}
.tab-active-2 .show-detail-782fkme {
  margin-left: 0px;
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

/*tab-active-3*/
.tab-active-3 .item-9271a img {
  margin-right: 5px;
}
</style>
<style type="text/css">
.list-complain-dialog-456 .el-dialog__body {
  padding: 5px 25px 40px 25px;
}
</style>
