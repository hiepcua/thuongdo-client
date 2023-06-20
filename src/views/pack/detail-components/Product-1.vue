<template>
  <div class="pack-detail-product">
    <div class="title">
      <span>Sản phẩm</span>
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
            <span>Danh mục hàng hóa</span>
          </div>
          <div class="icon-item">
            <span>Số lượng</span>
          </div>
          <div class="icon-item">
            <span>Đơn giá</span>
          </div>
          <div class="icon-item">
            <span>Ghi chú</span>
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
            <span>{{ i.category }}</span>
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
            <span>{{ i.note }}</span>
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
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "ProductDetailPack",
  data() {
    return {
      listProductOfPackSelected: [],
    };
  },
  mounted() {
    this.fetchLog();
  },
  methods: {
    fetchLog() {
      axios
        .get("package/products/" + this.$route.params.pack_id)
        .then((response) => {
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
  },
};
</script>

<style lang="css" scoped>
.pack-detail-product {
  background: #fff;
  min-height: 100px;
  margin-top: 20px;
  padding: 20px;
}
.pack-detail-product .title {
  font-weight: 700;
  font-size: 14px;
  line-height: 16px;
  letter-spacing: 0.02em;
  text-transform: uppercase;
  color: #575757;
  padding-left: 5px;
  display: inline-block;
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
