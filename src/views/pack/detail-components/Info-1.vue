<template>
  <div>
    <div class="pack-detail-barcode">
      <span class="code">Mã vận đơn: {{ packDetail.bill_code }}</span>
      <div>
        <span
          class="order-detail-icon-status-6868amg"
          :style="{ backgroundColor: packDetail.status.color }"
          >{{ packDetail.status.name }}</span
        >
      </div>
      <img src="@/static/icon/pack/detail/Date.svg" />
      <span class="time">{{ packDetail.status.time }}</span>
    </div>
    <div class="table-element-custom-2022 pack-detail-table-89">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column label="Mã đơn hàng">
          <div class="d-flex flex-column">
            <span>{{ packDetail.order_code }}</span>
            <div class="d-flex pt-1" @click="viewDetail()">
              <img src="@/static/icon/pack/list/show-detail.svg" />
              <span class="show-detail-782fkme">Xem đơn hàng</span>
            </div>
          </div>
        </el-table-column>
        <el-table-column label="Loại hàng">
          <span v-if="packDetail.type_of_goods">{{
            packDetail.type_of_goods.name
          }}</span>
        </el-table-column>
        <el-table-column label="Tổng KG hoặc M3">
          <div class="d-flex flex-column">
            <span>{{ packDetail.weight_or_volume }}</span>
          </div>
        </el-table-column>
        <el-table-column label="Hãng vận chuyển">
          <span>{{ packDetail.transporter }}</span>
        </el-table-column>
        <el-table-column label="Phí" width="250">
          <div class="d-flex flex-column">
            <div class="list-detail-icon-free-6789mgt">
              <img src="@/static/icon/pack/list/fee-kiem-dem.svg" />
              <div class="text-price">
                <span class="line-1">Phí kiểm đếm</span>
                <span class="number-1">{{
                  packDetail.inspection_cost | vnd
                }}</span>
              </div>
            </div>
            <div class="list-detail-icon-free-6789mgt">
              <img src="@/static/icon/pack/list/fee-bao-hiem.svg" />
              <div class="text-price">
                <span class="line-1">Phí bảo hiểm</span>
                <span class="number-1">{{
                  packDetail.insurance_cost | vnd
                }}</span>
              </div>
            </div>
            <div class="list-detail-icon-free-6789mgt">
              <img src="@/static/icon/pack/list/fee-dong-go.svg" />
              <div class="text-price">
                <span class="line-1">Phí đóng gỗ</span>
                <span class="number-1">{{
                  packDetail.woodworking_cost | vnd
                }}</span>
              </div>
            </div>
            <div class="list-detail-icon-free-6789mgt">
              <img src="@/static/icon/pack/list/fee-chong-soc.svg" />
              <div class="text-price">
                <span class="line-1">Phí chống sốc</span>
                <span class="number-1">{{
                  packDetail.shock_proof_cost | vnd
                }}</span>
              </div>
            </div>
            <div class="list-detail-icon-free-6789mgt">
              <img src="@/static/icon/pack/list/fee-luu-kho.svg" />
              <div class="text-price">
                <span class="line-1">Phí lưu kho</span>
                <span class="number-1">{{
                  packDetail.storage_cost | vnd
                }}</span>
              </div>
            </div>
          </div>
        </el-table-column>
        <el-table-column label="Tổng phí">
          <div class="d-flex flex-column">
            <span>{{ packDetail.amount | vnd }}</span>
          </div>
        </el-table-column>
      </el-table>
    </div>
    <div class="pack-detail-sub-info">
      <div class="d-flex">
        <div class="item-line">
          <span class="title">Số kiện:</span>
          <span class="number">{{ packDetail.packages_number }}</span>
        </div>
        <div class="item-line">
          <span class="title">Giá trị bảo hiểm:</span>
          <span class="number">{{ packDetail.insurance_cost | vnd }}</span>
        </div>
        <div class="item-line">
          <span class="title">Tổng sản phẩm:</span>
          <span class="number">{{ packDetail.quantity }}</span>
        </div>
      </div>
      <div class="d-flex">
        <div class="item-line d-none">
          <span class="title">Tên hàng hóa:</span>
          <span class="number">{{ packDetail.product_name }}</span>
        </div>
      </div>
      <div class="d-flex">
        <div class="item-line d-none">
          <span class="title">Nội dung:</span>
          <span class="number">{{ packDetail.description }}</span>
        </div>
      </div>
      <div class="d-flex flex-column">
        <span class="title-main">Địa chỉ nhận hàng</span>
        <span class="address-main">{{ packDetail.address_receiver }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "InfoDetailPack",
  props: {
    packDetail: Object,
  },
  computed: {
    getTimeLast() {
      let time = "";
      this.packDetail.statuses.forEach((item) => {
        if (item.time) {
          time = item.time;
        }
      });
      return time;
    },
  },
  data() {
    return {
      tableData: [],
    };
  },
  mounted() {},
  methods: {
    // Xem chi tiết
    viewDetail() {
      this.$router.push({
        name: "order-detail",
        params: { order_id: this.packDetail.order_id },
      });
    },
  },
  watch: {
    packDetail: function () {
      let temp = {
        order_code: 123,
      };
      this.tableData.push(temp);
    },
  },
};
</script>

<style lang="css" scoped>
.pack-detail-barcode {
  display: flex;
  align-items: center;
  background: #fff;
  padding: 20px 0px;
  padding-left: 30px;
}
.pack-detail-barcode .code {
  margin-right: 10px;
  font-weight: 500;
  font-size: 16px;
  line-height: 16px;
  letter-spacing: 0.02em;
  color: #575757;
}
.pack-detail-barcode img {
  margin-left: 20px;
}
.pack-detail-barcode .time {
  color: #575757;
  margin-left: 10px;
}

.pack-detail-table-89 {
  padding: 0px 20px;
  background: #fff;
}

/*.pack-detail-sub-info*/
.pack-detail-sub-info {
  padding-left: 100px;
  padding-top: 20px;
  background-color: #fff;
  padding-bottom: 10px;
  padding-right: 20px;
}
.pack-detail-sub-info .item-line {
  min-width: 250px;
  margin-bottom: 10px;
}
.pack-detail-sub-info .item-line .title {
  font-weight: 500;
  color: #575757;
  margin-right: 4px;
}
.pack-detail-sub-info .item-line .number {
  color: #575757;
}
.pack-detail-sub-info .title-main {
  font-weight: 500;
  font-size: 16px;
  color: #575757;
  margin-top: 5px;
}
.pack-detail-sub-info .address-main {
  font-size: 14px;
  color: #575757;
  margin-top: 5px;
}
</style>
