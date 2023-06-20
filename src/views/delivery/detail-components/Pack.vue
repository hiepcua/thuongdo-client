<template>
  <div class="pack-detail-delivey">
    <span class="title-main"
      >Danh sách kiện hàng cần giao (Tổng số kiện: {{ tableData.length }})</span
    >
    <div class="table-element-custom-2022 boder delivey-detail-table-89">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column type="index" label="STT" width="50"></el-table-column>
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
        <el-table-column label="Phí vận chuyển nội địa TQ (vnd)">
          <template slot-scope="scope">
            <div class="d-flex flex-column">
              <span>{{ scope.row.china_shipping_cost | vnd }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="Phí vận chuyển quốc tế (vnd)">
          <template slot-scope="scope">
            <div class="d-flex flex-column">
              <span>{{ scope.row.international_shipping_cost | vnd }}</span>
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

    <el-dialog
      top="300px"
      width="65%"
      custom-class="list-pack-dialog-456"
      :close-on-click-modal="false"
      :visible.sync="dialogTableVisible"
    >
      <div class="title-wrap">
        <span class="line-1">Kiện hàng: {{ packSelected.bill_code }}</span>
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
export default {
  name: "PackDetailDelivery",
  data() {
    return {
      tableData: [],

      // Xử lý phần xem kiện
      dialogTableVisible: false,
      packSelected: {},
      listProductOfPackSelected: [],
    };
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      axios
        .get("package/delivery/" + this.$route.params.delivery_id)
        .then((response) => {
          this.loading = false;
          switch (response.code) {
            case 200:
              this.tableData = response.data;
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
    viewDetail(item) {
      this.$router.push({
        name: "pack-detail",
        params: { pack_id: item.id },
      });
    },
  },
};
</script>

<style lang="css" scoped>
.pack-detail-delivey {
  background-color: #fff;
  min-height: 300px;
  margin-bottom: 30px;
  color: #575757;
  padding: 10px 20px;
}
.pack-detail-delivey .title-main {
  font-weight: 500;
  font-size: 16px;
  line-height: 16px;
  margin-bottom: 15px;
  display: inline-block;
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
  margin-left: 20px;
}
.list-pack-dialog-456 .title-wrap img {
  margin-left: 30px;
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

.delivey-detail-table-89 .car-check-pack {
  display: flex;
  align-items: center;
  margin-top: 10px;
}
.delivey-detail-table-89 .car-check-pack img {
  height: 13px;
  margin-right: 10px;
}
.order-detail-icon-status-6868amg.pointer {
  cursor: pointer;
}
</style>

<style type="text/css">
.list-pack-dialog-456 .el-dialog__body {
  padding: 5px 25px 40px 25px;
}
</style>
