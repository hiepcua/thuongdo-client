<template>
  <div class="frame-content-common-2022 cart-create">
    <BreadcrumbTop text1="Giỏ hàng" />
    <div class="cart-create-header d-flex">
      <div class="icon-item first">
        <img src="@/static/icon/order-create/no-checked.svg" alt="" />
        <span>Sản phẩm</span>
      </div>
      <div class="icon-item">
        <span>Đơn giá</span>
      </div>
      <div class="icon-item">
        <span>Số lượng</span>
      </div>
      <div class="icon-item">
        <span>Phân loại</span>
      </div>
      <div class="icon-item">
        <span>Thành tiền</span>
      </div>
      <div class="icon-item last">
        <span>Thao tác</span>
      </div>
    </div>
    <!-- cart-create-supplier -->
    <div class="cart-create-supplier-item" v-for="j in 2" :key="j">
      <div class="cart-create-supplier-header">
        <div class="icon-88 left">
          <img src="@/static/icon/order-create/no-checked.svg" alt="" />
          <span>Nhà cung cấp: Xiaomi Pro 2022</span>
        </div>
        <div class="icon-88 right">
          <img src="@/static/icon/cart-create/delete.svg" alt="" />
          <span>Xóa nhà cung cấp</span>
        </div>
      </div>
      <div class="cart-create-supplier-line d-flex" v-for="i in 3" :key="i">
        <div class="icon-item first">
          <img src="@/static/icon/order-create/no-checked.svg" alt="" />
          <img src="@/static/icon/cart-create/demo.svg" alt="" />
          <span
            >女孩可爱的小衣服 女孩可爱的小衣服 女孩可爱的小衣服女孩可爱</span
          >
        </div>
        <div class="icon-item">
          <div class="price-item d-flex flex-column">
            <span>263,872đ</span>
            <span>¥79.00</span>
          </div>
        </div>
        <div class="icon-item">
          <el-input-number
            v-model="unit"
            :min="1"
            :max="10000"
            size="mini"
          ></el-input-number>
        </div>
        <div class="icon-item">
          <div class="d-flex flex-column">
            <span> Xanh lá, 2x99 pcs</span>
            <span>green royal</span>
          </div>
        </div>
        <div class="icon-item">
          <div class="price-item d-flex flex-column">
            <span class="price-red">263,872đ</span>
            <span class="price-red">¥79.00</span>
          </div>
        </div>
        <div class="icon-item last">
          <span>Xóa</span>
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
                  @click="delivery_type = 'normal'"
                >
                  <img
                    src="@/static/icon/account/checked.svg"
                    alt=""
                    v-if="delivery_type == 'normal'"
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
                  @click="delivery_type = 'fast'"
                >
                  <img
                    src="@/static/icon/account/checked.svg"
                    alt=""
                    v-if="delivery_type == 'fast'"
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
                <div
                  class="item-common item-checkbox"
                  @click="is_inspection = !is_inspection"
                >
                  <img
                    src="@/static/icon/order-create/checked.svg"
                    alt=""
                    v-if="is_inspection"
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
                  @click="is_woodworking = !is_woodworking"
                >
                  <img
                    src="@/static/icon/order-create/checked.svg"
                    alt=""
                    v-if="is_woodworking"
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
                  @click="is_tax = !is_tax"
                >
                  <img
                    src="@/static/icon/order-create/checked.svg"
                    alt=""
                    v-if="is_tax"
                  />
                  <img
                    src="@/static/icon/order-create/no-checked.svg"
                    alt=""
                    v-else
                  />
                  <span>Khai thuế</span>
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
                v-model="textarea"
                class="frame-textarea-common-2022"
              >
              </el-input>
              <span class="title">Ghi Chú Riêng:</span>
              <el-input
                type="textarea"
                :rows="3"
                placeholder="Nhân Viên Thương Đô Không Nhìn Thấy Nội Dung Này"
                v-model="textarea"
                class="frame-textarea-common-2022"
              >
              </el-input>
            </div>
          </el-col>
          <el-col :span="5">
            <div class="cart-create-price-7625">
              <div class="item">
                <span class="title">Thành tiền:</span>
                <span class="number">263,825đ</span>
              </div>
              <div class="item">
                <span class="title">Phí dịch vụ:</span>
                <span class="number">70đ</span>
              </div>
              <div class="item">
                <span class="title">Tổng tiền:</span>
                <span class="number">263,825đ</span>
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
            <warehouse-take></warehouse-take>
          </div>
          <div class="warehouse">
            <address-take></address-take>
          </div>
        </el-col>
        <el-col :span="8" class="d-flex">
          <price-take :priceTotal="priceTotal"></price-take>
        </el-col>
      </el-row>
    </div>
    <div class="d-flex justify-content-end pt-3 pr-3">
      <div class="frame-btn-create-x-2022">Lên đơn yêu cầu và báo giá</div>
    </div>
  </div>
</template>

<script>
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
      unit: 1,
      canSubmit: true,
      delivery_type: "normal",
      is_inspection: false,
      is_woodworking: false,
      is_tax: false,
      warehouse_id: "",
      customer_delivery_id: "",
      textarea: "",
      // Tính toán
      priceTotal: {
        total_amount_cny: 0,
        fee_order: 0,
        total_amount_cny_not_ship: 0,
      },
    };
  },
  mounted() {},
  methods: {},
};
</script>

<style lang="css" scoped>
/*Phần bảng */
.cart-create .icon-item {
  padding: 10px 5px 10px 5px;
  font-size: 12px;
  height: auto;
  text-align: center;
  background-color: #fff;
  color: #000;
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
  padding: 0px 20px 0px 10px;
  background-color: #fff;
}
.cart-create-header .icon-item.first span {
  margin-left: 10px;
}

/*Phần bảng - từng nhà cung cấp */
.cart-create-supplier-item {
  background-color: #fff;
  padding: 10px 20px 20px 10px;
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
  color: #575757;
}
.cart-create-supplier-header .icon-88.right span {
  margin-left: 5px;
  color: #575757;
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
.cart-create-supplier-line .icon-item.first img {
  margin-right: 10px;
}
.cart-create-supplier-line .price-item span {
  line-height: 20px;
}
.cart-create-supplier-line .price-item .price-red {
  color: #dd2120;
}
/*Phần chọn vận chuyển*/
.cart-create-transport-option {
  padding: 25px 30px;
  background-color: #fff;
  margin-top: 15px;
  margin-bottom: 15px;
}
.cart-create-transport-option .title-912 {
  font-weight: 400;
  margin-right: 34px;
  color: #575757;
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
}

/*Phần cart-create-warehouse-and-price*/
.cart-create-warehouse-and-price .warehouse {
  margin-bottom: 10px;
  padding-left: 15px;
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
