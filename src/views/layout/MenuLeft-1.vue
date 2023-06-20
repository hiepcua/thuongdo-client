<template>
  <div class="component-menu-left d-flex flex-column">
    <div
      class="item"
      :class="[full_path == '/cart-create' ? 'active' : '']"
      @click="nextRoute('cart-create', '/cart-create')"
    >
      <img src="@/static/icon/menu-left/cart.svg" />
      <span>Giỏ hàng</span>
    </div>
    <div
      class="item"
      :class="[full_path == '/order-create' ? 'active' : '']"
      @click="nextRoute('order-create', '/order-create')"
    >
      <img src="@/static/icon/menu-left/order.svg" />
      <span>Tạo đơn order</span>
    </div>
    <div
      class="item"
      :class="[full_path == '/consignment-create' ? 'active' : '']"
      @click="nextRoute('consignment-create', '/consignment-create')"
    >
      <img src="@/static/icon/menu-left/create-order.svg" />
      <span>Tạo đơn ký gửi</span>
    </div>
    <div
      class="item"
      :class="[
        full_path == '/order-list' ||
        path == 'order-list' ||
        path == 'consignment-list' ||
        path == 'consignment-detail'
          ? 'active'
          : '',
      ]"
      @click="nextRoute('order-list', '/order-list')"
    >
      <img src="@/static/icon/menu-left/order.svg" />
      <span>Quản lý đơn hàng</span>
    </div>
    <div
      class="item"
      :class="[
        full_path == '/pack-list' || path == 'pack-list' ? 'active' : '',
      ]"
      @click="nextRoute('pack-list', '/pack-list')"
    >
      <img src="@/static/icon/menu-left/pack.svg" />
      <span>Quản lý kiện hàng</span>
    </div>
    <div
      class="item"
      :class="[
        full_path == '/supplier-list' || path == 'supplier-list'
          ? 'active'
          : '',
      ]"
      @click="nextRoute('supplier-list', '/supplier-list')"
    >
      <img src="@/static/icon/menu-left/cungcap.svg" />
      <span>Nhà cung cấp</span>
    </div>
    <div
      class="item"
      :class="[
        full_path == '/delivery-list' || path == 'delivery-list'
          ? 'active'
          : '',
      ]"
      @click="nextRoute('delivery-list', '/delivery-list')"
    >
      <img src="@/static/icon/menu-left/giaohang.svg" />
      <span>Giao hàng</span>
    </div>
    <div class="item">
      <img src="@/static/icon/menu-left/tra-cuoc.svg" />
      <span>Tra cước</span>
    </div>
    <div class="item">
      <img src="@/static/icon/menu-left/vidientu.svg" />
      <span>Tài khoản</span>
    </div>
    <div
      class="item"
      :class="[
        full_path == '/complain-list' ||
        path == 'complain-list' ||
        path == 'complain-create'
          ? 'active'
          : '',
      ]"
      @click="nextRoute('complain-list', '/complain-list')"
    >
      <img src="@/static/icon/menu-left/khieunai.svg" />
      <span>Khiếu nại</span>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "LayoutMenuLeft",
  data() {
    return {
      showText: true,
    };
  },
  computed: {
    ...mapGetters(["path", "full_path"]),
  },
  methods: {
    nextRoute(name, full_path) {
      if (this.full_path !== full_path) {
        this.$router.push({ name: name });
      }
    },
  },
};
</script>

<style lang="css" scoped>
.component-menu-left .item {
  border-bottom: 1px solid #cedceb;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 8px 2px;
}
.component-menu-left .item:hover {
  background-color: #d6e8fb;
  transition: all 0.3s;
}
.component-menu-left .item img {
  width: 25px;
}
.component-menu-left .item span {
  font-size: 12px;
  margin-top: 5px;
  text-align: center;
  line-height: 15px;
}
.component-menu-left .item.active {
  background-color: #1d60a6;
  color: #fff;
}
</style>
