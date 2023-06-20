<template>
  <div class="frame-content-common-2022 cart-create" v-loading="loading">
    <BreadcrumbTop text1="Giỏ hàng" />
    <div class="cart-create-header d-flex">
      <div class="icon-item first">
        <div @click="changeCheckAll()">
          <img src="@/static/icon/order-create/checked.svg" v-if="checkAll" />
          <img src="@/static/icon/order-create/no-checked.svg" v-else />
        </div>
        <span>Sản phẩm</span>
      </div>
      <div class="icon-item">
        <span>Đơn giá</span>
      </div>
      <div class="icon-item">
        <span>Số lượng</span>
      </div>
      <div class="icon-item">
        <span>Ghi chú</span>
      </div>
      <div class="icon-item">
        <span>Thành tiền</span>
      </div>
      <div class="icon-item last">
        <span>Thao tác</span>
      </div>
    </div>
    <!-- cart-create-supplier -->
    <div
      class="cart-create-supplier-item"
      v-for="item in listCart"
      :key="item.cart_id"
    >
      <div class="cart-create-supplier-header">
        <div class="icon-88 left">
          <div @click="changeCheck(item)">
            <img
              src="@/static/icon/order-create/checked.svg"
              v-if="item.checked"
            />
            <img src="@/static/icon/order-create/no-checked.svg" v-else />
          </div>
          <span>Nhà cung cấp: {{ item.supplier.name }}</span>
        </div>
        <div class="icon-88 right" @click="confirmDeleteModel(item)">
          <img src="@/static/icon/cart-create/delete.svg" alt="" />
          <span>Xóa nhà cung cấp</span>
        </div>
      </div>
      <div
        class="cart-create-supplier-line d-flex"
        v-for="element in item.products"
        :key="element.id"
      >
        <div class="icon-item first">
          <div class="d-flex flex-column">
            <div class="d-flex align-items-center">
              <div @click="changeCheckChild(element, item)">
                <img
                  src="@/static/icon/order-create/checked.svg"
                  v-if="element.checked"
                />
                <img src="@/static/icon/order-create/no-checked.svg" v-else />
              </div>
              <img class="img-product" :src="element.image" />
              <div class="d-flex flex-column">
                <span>{{ element.name }}</span>
                <span class="sub-12x">{{ element.classification }}</span>
              </div>
            </div>
            <div class="link-product d-flex align-items-center">
              <img src="@/static/icon/cart-create/link.svg" />
              <a target="_bank" :href="element.link"
                >Đường dẫn: {{ element.link }}</a
              >
            </div>
          </div>
        </div>
        <div class="icon-item">
          <div class="price-item d-flex flex-column">
            <span>{{
              (element.unit_price_cny * item.exchange_rate) | vnd
            }}</span>
            <span>¥{{ element.unit_price_cny }}</span>
          </div>
        </div>
        <div class="icon-item">
          <el-input-number
            v-model="element.quantity"
            :min="1"
            :max="10000"
            size="mini"
          ></el-input-number>
        </div>
        <div class="icon-item">
          <el-input
            type="textarea"
            :rows="3"
            placeholder="Ghi chú"
            v-model="element.note"
            class="frame-textarea-common-2022"
          ></el-input>
        </div>
        <div class="icon-item">
          <div class="price-item d-flex flex-column">
            <span class="price-red">{{
              (element.unit_price_cny * element.quantity * item.exchange_rate)
                | vnd
            }}</span>
            <span class="price-red"
              >¥{{
                (element.unit_price_cny * element.quantity).toFixed(2)
              }}</span
            >
          </div>
        </div>
        <div class="icon-item last">
          <span
            class="frame-poiter-2022"
            @click="confirmDeleteModelChild(element)"
            >Xóa</span
          >
        </div>
      </div>
      <div class="cart-create-transport-option-note-price">
        <el-row :gutter="20">
          <el-col :span="8">
            <div class="cart-create-transport-option">
              <div class="wrap-1 d-flex flex-row">
                <span class="title-912">Vận chuyển</span>
                <div
                  class="item-common item-radio"
                  @click="item.delivery_type = 'fast'"
                >
                  <img
                    src="@/static/icon/account/checked.svg"
                    alt=""
                    v-if="item.delivery_type == 'fast'"
                  />
                  <img
                    src="@/static/icon/account/no-checked.svg"
                    alt=""
                    v-else
                  />
                  <span>Nhanh</span>
                </div>
                <div
                  class="item-common item-radio"
                  @click="item.delivery_type = 'normal'"
                >
                  <img
                    src="@/static/icon/account/checked.svg"
                    alt=""
                    v-if="item.delivery_type == 'normal'"
                  />
                  <img
                    src="@/static/icon/account/no-checked.svg"
                    alt=""
                    v-else
                  />
                  <span>Thường</span>
                </div>
              </div>
              <div class="wrap-2 d-flex flex-row pt-4">
                <span class="title-912">Dịch vụ khác</span>
                <div
                  class="item-common item-checkbox"
                  @click="item.is_inspection = !item.is_inspection"
                >
                  <img
                    src="@/static/icon/order-create/checked.svg"
                    alt=""
                    v-if="item.is_inspection"
                  />
                  <img
                    src="@/static/icon/order-create/no-checked.svg"
                    alt=""
                    v-else
                  />
                  <span>Kiểm hàng</span>
                </div>
                <div
                  class="item-common item-checkbox"
                  @click="item.is_woodworking = !item.is_woodworking"
                >
                  <img
                    src="@/static/icon/order-create/checked.svg"
                    alt=""
                    v-if="item.is_woodworking"
                  />
                  <img
                    src="@/static/icon/order-create/no-checked.svg"
                    alt=""
                    v-else
                  />
                  <span>Đóng gỗ</span>
                </div>
                <div
                  class="item-common item-checkbox"
                  @click="item.is_shock_proof = !item.is_shock_proof"
                >
                  <img
                    src="@/static/icon/order-create/checked.svg"
                    alt=""
                    v-if="item.is_shock_proof"
                  />
                  <img
                    src="@/static/icon/order-create/no-checked.svg"
                    alt=""
                    v-else
                  />
                  <span>Chống sốc</span>
                </div>
              </div>
            </div>
          </el-col>
          <el-col :span="11">
            <div class="cart-create-note-91425 d-flex flex-column">
              <span class="title">Ghi Chú Cho Thương Đô</span>
              <el-input
                type="textarea"
                :rows="3"
                placeholder="Ghi Chú Chung Dành Cho Nhà Cung Cấp Này"
                v-model="item.note"
                class="frame-textarea-common-2022"
              >
              </el-input>
            </div>
          </el-col>
          <el-col :span="5">
            <div class="cart-create-price-7625">
              <div class="item">
                <span class="title">Thành tiền:</span>
                <span class="number">{{ item.total_item_money | vnd }}</span>
              </div>
              <div class="item">
                <span class="title">Phí dịch vụ:</span>
                <span class="number">{{ item.total_fee_money | vnd }}</span>
              </div>
              <div class="item">
                <span class="title">Tổng tiền:</span>
                <span class="number">{{ item.total_all_money | vnd }}</span>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
    <div class="cart-create-alert-2837">
      Đơn hàng đang áp dụng % phí đặt hàng trên tổng sản phẩm là: 2.5%
    </div>

    <!-- Ô chọn kho vs tổng tiền -->
    <div class="cart-create-warehouse-and-price">
      <el-row class="d-flex">
        <el-col :span="16">
          <div class="warehouse">
            <warehouse-take
              @changeWareHouseId="changeWareHouseIdParent"
            ></warehouse-take>
          </div>
          <div class="warehouse">
            <address-take
              @changeAddressId="changeAddressIdParent"
            ></address-take>
          </div>
        </el-col>
        <el-col :span="8" class="d-flex">
          <price-take :priceTotal="priceTotal"></price-take>
        </el-col>
      </el-row>
    </div>
    <div class="d-flex justify-content-end pt-3 pr-5">
      <div
        class="frame-btn-create-x-2022"
        :class="!canSubmit ? 'disable' : ''"
        @click="submitForm()"
      >
        <i class="el-icon-loading" v-if="!canSubmit"></i>
        <span>Lên đơn yêu cầu và báo giá</span>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { mapGetters } from "vuex";
import WarehouseTake from "@/components/WarehouseTake";
import AddressTake from "@/components/AddressTake";
import PriceTake from "@/components/PriceTake";
import BreadcrumbTop from "@/components/BreadcrumbTop";
export default {
  name: "CreateCart",
  components: {
    WarehouseTake,
    AddressTake,
    PriceTake,
    BreadcrumbTop,
  },
  metaInfo() {
    return {
      title: "Giỏ hàng",
    };
  },
  data() {
    return {
      canSubmit: true,
      // Filter
      loading: false,
      checkAll: false,

      // Cart Ext
      listCart: [],

      // Tính toán
      priceTotal: {
        total_amount_cny: 0,
        total_fee_cny: 0,
        total_amount_cny_not_ship: 0,
      },

      // Model data
      warehouse_id: "",
      customer_delivery_id: "",
    };
  },
  computed: {
    ...mapGetters("account", ["accountInfo", "configList"]),
  },
  mounted() {
    this.fetchCart();
  },
  methods: {
    fetchCart() {
      this.loading = true;
      axios.get("cart/ext").then((response) => {
        this.loading = false;
        switch (response.code) {
          case 200:
            this.listCart = response.data;
            console.log(this.listCart);
            this.listCart.map(function (i) {
              i.checked = false;
              i.total_item_money = 0;
              i.total_fee_money = 0;
              i.total_all_money = 0;
              i.products.map(function (j) {
                j.checked = false;
                return j;
              });
              return i;
            });
            this.listCart = JSON.parse(JSON.stringify(this.listCart));
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
      this.$confirm("Xóa nhà cung cấp " + item.supplier.name, "Cảnh báo", {
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
      axios.delete("cart/supplier/" + item.supplier.id).then((response) => {
        switch (response.code) {
          case 200:
            this.$notify({
              title: "Thành công",
              message: "Xóa bản ghi thành công",
              type: "success",
            });
            this.fetchCart();
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

    // Xóa sản phẩm con
    confirmDeleteModelChild(item) {
      console.log(item);
      this.$confirm("Xóa sản phẩm " + item.name, "Cảnh báo", {
        confirmButtonText: "Đồng ý",
        cancelButtonText: "Hủy",
        type: "warning",
      })
        .then(() => {
          this.deleteModelChild(item);
        })
        .catch(() => {});
    },
    deleteModelChild(item) {
      axios.delete("cart/" + item.id).then((response) => {
        switch (response.code) {
          case 200:
            this.$notify({
              title: "Thành công",
              message: "Xóa bản ghi thành công",
              type: "success",
            });
            this.fetchCart();
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

    // CHọn kho
    changeWareHouseIdParent(id) {
      this.warehouse_id = id;
    },
    changeAddressIdParent(id) {
      this.customer_delivery_id = id;
    },

    submitForm() {
      let count_checked = 0;
      let carts = [];
      this.listCart.forEach((item) => {
        let products_checked = [];
        item.products.forEach((i) => {
          if (i.checked) {
            count_checked += 1;
            let temp_i = {
              id: i.id,
              modifies: {
                quantity: i.quantity,
                note: i.note,
              },
            };
            products_checked.push(temp_i);
          }
        });
        if (products_checked.length > 0) {
          let temp = {
            id: item.cart_id,
            products: products_checked,
            note: item.note,
            delivery_type: item.delivery_type,
            is_woodworking: item.is_woodworking,
            is_inspection: item.is_inspection,
            is_shock_proof: item.is_shock_proof,
          };
          carts.push(temp);
        }
      });
      if (count_checked == 0) {
        this.$notify({
          title: "Vui lòng kiểm tra lại thông tin",
          message: "Vui lòng chọn ít nhất 1 sản phẩm",
          type: "warning",
        });
        return;
      }

      let data = {
        carts: carts,
        warehouse_id: this.warehouse_id,
        customer_delivery_id: this.customer_delivery_id,
      };

      this.canSubmit = false;

      axios.post("cart/order", data).then((response) => {
        this.canSubmit = true;
        switch (response.code) {
          case 200:
            this.$notify({
              title: "Thành công",
              message: "Lên đơn yêu cầu và báo giá thành công",
              type: "success",
            });
            // this.fetchCart();
            this.$router.push({
              name: "order-detail",
              params: { order_id: response.data.id },
            });
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

    // Check của sản phẩm con
    changeCheckChild(element, item) {
      element.checked = !element.checked;

      // Nếu toàn bộ item dc check thì nút cha đồng bộ theo
      let checkAll = true;
      item.products.forEach((e) => {
        if (e.checked == false) {
          checkAll = false;
          return;
        }
      });
      if (checkAll) {
        item.checked = true;
      }

      // Nếu toàn bộ item không check thì nút cha đồng bộ theo
      let checkAllFalse = false;
      item.products.forEach((e) => {
        if (e.checked == false) {
          checkAllFalse = true;
          return;
        }
      });
      if (checkAllFalse) {
        item.checked = false;
      }
    },

    // Check của NCC
    changeCheck(item) {
      item.checked = !item.checked;
      item.products.forEach((e) => {
        e.checked = item.checked;
      });
    },

    // Check all
    changeCheckAll() {
      this.checkAll = !this.checkAll;
      this.listCart.forEach((item) => {
        item.checked = this.checkAll;
        item.products.forEach((e) => {
          e.checked = this.checkAll;
        });
      });
    },

    // Xử lý đếm số lượng realtime
    caculaterCart() {
      let total_amount_cny = 0;
      let total_fee_cny = 0;
      this.listCart.forEach((item) => {
        let total_item_money = 0;
        let total_fee_money = 0;
        item.products.forEach((i) => {
          if (i.checked) {
            let temp = i.quantity * i.unit_price_cny * item.exchange_rate;
            total_item_money += temp;

            let temp_fee = 0;
            this.configList.order_fee.forEach((config, index) => {
              if (index == 0) {
                temp_fee = config.default;
              } else {
                if (temp > config.min && temp < config.max) {
                  temp_fee = (temp * config.result) / 100;
                }
              }
            });
            total_fee_money += temp_fee;
          }
        });
        item.total_item_money = total_item_money;
        item.total_fee_money = total_fee_money;
        item.total_all_money = total_item_money + total_fee_money;

        total_amount_cny += item.total_item_money;
        total_fee_cny += item.total_fee_money;
      });

      this.priceTotal.total_amount_cny = total_amount_cny;
      this.priceTotal.total_fee_cny = total_fee_cny;
      this.priceTotal.total_amount_cny_not_ship =
        total_amount_cny + total_fee_cny;
    },
  },
  watch: {
    listCart: {
      handler: function () {
        this.caculaterCart();
      },
      deep: true,
    },
  },
};
</script>

<style lang="css" scoped>
.cart-create {
  color: #575757;
}
/*Phần bảng */
.cart-create .icon-item {
  padding: 10px 5px 10px 5px;
  font-size: 12px;
  height: auto;
  text-align: center;
  background-color: #fff;
  color: #575757;
  width: 150px;
  flex-grow: 1;
}
.cart-create .icon-item.first {
  text-align: left;
  display: flex;
  align-items: center;
  cursor: pointer;
  user-select: none;
  padding-left: 15px;
  width: 420px;
  flex-grow: initial;
}
.cart-create .icon-item.last {
  width: 50px;
}

/*Phần bảng - tiêu đề */
.cart-create-header {
  margin-bottom: 13px;
  padding: 0px 30px 0px 30px;
  background-color: #fff;
}
.cart-create-header .icon-item.first span {
  margin-left: 10px;
}

/*Phần bảng - từng nhà cung cấp */
.cart-create-supplier-item {
  background-color: #fff;
  padding: 10px 30px 20px 30px;
  margin-bottom: 15px;
}
.cart-create-supplier-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 10px;
  padding-bottom: 15px;
  border-bottom: 1px solid #e1e1e1;
}
.cart-create-supplier-header .icon-88 {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 12px;
  cursor: pointer;
}
.cart-create-supplier-header .icon-88.left {
  padding-left: 15px;
}
.cart-create-supplier-header .icon-88.left span {
  margin-left: 10px;
  font-weight: 500;
  font-weight: 700;
  color: #575757;
}
.cart-create-supplier-header .icon-88.right span {
  margin-left: 5px;
  color: #575757;
}
.cart-create-supplier-header .icon-88.right:hover {
  opacity: 0.8;
}
.cart-create-supplier-line {
  border-bottom: 1px solid #e1e1e1;
}
.cart-create-supplier-line .icon-item {
  align-items: center;
  display: flex;
  justify-content: center;
}
.cart-create-supplier-line .icon-item.first span {
  margin-left: 10px;
}
.cart-create-supplier-line .icon-item.first .sub-12x {
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  letter-spacing: 0.02em;
  text-transform: capitalize;
  color: #8b8b8b;
  margin-top: 7px;
}
.cart-create-supplier-line .icon-item.first img {
  margin-right: 10px;
}
.cart-create-supplier-line .icon-item.first .img-product {
  width: 100px;
}
.cart-create-supplier-line .icon-item.first .link-product {
  margin-right: 5px;
  padding-top: 12px;
  padding-bottom: 5px;
  display: inline-flex;
  padding-left: 30px;
}
.cart-create-supplier-line .icon-item.first .link-product a {
  font-weight: 400;
  font-size: 14px;
  color: #575757;
  text-decoration: none;
  font-size: 12px;
}
.cart-create-supplier-line .price-item span {
  line-height: 20px;
}
.cart-create-supplier-line .price-item .price-red {
  color: #dd2120;
}
/*Phần chọn vận chuyển*/
.cart-create-transport-option {
  padding: 25px 0px 25px 15px;
  background-color: #fff;
  margin-top: 15px;
  margin-bottom: 15px;
}
.cart-create-transport-option .title-912 {
  font-weight: 500;
  margin-right: 0px;
  color: #575757;
  min-width: 100px;
}
.cart-create-transport-option .item-common {
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  margin-right: 15px;
}
.cart-create-transport-option .item-common:hover {
  opacity: 0.8;
  transition: all 0.3s;
}
.cart-create-transport-option .item-common img {
  margin-right: 8px;
}

/*Phần ghi chú*/
.cart-create-note-91425 {
  padding: 15px 10px 0px 10px;
}
.cart-create-note-91425 .title {
  margin-bottom: 10px;
  margin-top: 10px;
  letter-spacing: 0.02em;
  text-transform: capitalize;
  color: #575757;
}
/*Phần tiền từng nhà cung cấp*/
.cart-create-price-7625 {
  padding: 25px 10px 0px 10px;
}
.cart-create-price-7625 .item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}
.cart-create-price-7625 .item .number {
  color: #dd2120;
  font-weight: bold;
}

/*Phần cart-create-warehouse-and-price*/
.cart-create-warehouse-and-price .warehouse {
  margin-bottom: 10px;
  padding-left: 30px;
  background-color: #fff;
}

/*Phần thông báo da cam*/
.cart-create-alert-2837 {
  margin-bottom: 15px;
  background-color: #fd6120;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 15px;
  color: #fff;
  text-transform: uppercase;
  padding: 10px;
  font-weight: 500;
}
</style>

<style type="text/css">
.frame-textarea-common-2022 {
  font-size: 12px;
}
.frame-textarea-common-2022 textarea::-webkit-input-placeholder {
  font-weight: 300;
  color: #b9bcbe;
  font-size: 12px;
  font-style: italic;
}
.frame-textarea-common-2022 textarea::-moz-placeholder {
  font-weight: 300;
  color: #b9bcbe;
  font-size: 12px;
  font-style: italic;
}
.frame-textarea-common-2022 textarea::-ms-input-placeholder {
  font-weight: 300;
  color: #b9bcbe;
  font-size: 12px;
  font-style: italic;
}
</style>
