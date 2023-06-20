<template>
  <div>
    <div class="table-element-custom-2022 pack-detail-table-89">
      <el-table :data="packDetail.packages" style="width: 100%">
        <el-table-column label="Mã kiện" width="100">
          <template slot-scope="scope">
            <span>{{ scope.row.bill_code }}</span>
          </template>
        </el-table-column>
        <el-table-column label="Ngày tạo">
          <template slot-scope="scope">
            <span>{{ scope.row.created_at }}</span>
          </template>
        </el-table-column>
        <el-table-column label="Trạng thái">
          <div class="d-flex flex-column">
            <div>
              <span
                class="order-detail-icon-status-6868amg"
                :style="{ backgroundColor: packDetail.status.color }"
                >{{ packDetail.status.name }}</span
              >
            </div>
          </div>
        </el-table-column>
        <el-table-column label="Loại hàng">
          <template slot-scope="scope">
            <span>{{ scope.row.type_of_goods }}</span>
          </template>
        </el-table-column>
        <!--  -->
        <el-table-column label="Danh mục hàng hóa" width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.category }}</span>
          </template>
        </el-table-column>
        <!--  -->
        <el-table-column label="Cân nặng thực tế" width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.weight_origin }}</span>
          </template>
        </el-table-column>
        <el-table-column label="Cân nặng làm tròn" width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.weight_round }}</span>
          </template>
        </el-table-column>
        <el-table-column label="Hãng vận chuyển">
          <template slot-scope="scope">
            <span>{{ scope.row.transporter }}</span>
          </template>
        </el-table-column>
        <el-table-column label="Tổng phí" width="200">
          <template slot-scope="scope">
            <span>{{ scope.row.amount | vnd }}</span>
          </template>
        </el-table-column>
      </el-table>
      <div class="address-1998amg d-flex flex-column">
        <span class="title">Địa chỉ nhận hàng</span>
        <span class="excerpt">{{ packDetail.address_receiver }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "InfoDetailConsignment",
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
  methods: {},
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
/* địa chỉ nhận hàng  */
.address-1998amg {
  padding: 35px 0;
}
.address-1998amg .title {
  font-weight: 500;
  font-size: 16px;
  line-height: 16px;
  letter-spacing: 0.02em;
  color: #575757;
  padding-bottom: 14px;
}
.address-1998amg .excerpt {
  font-weight: 400;
  font-size: 14px;
  line-height: 16px;
  letter-spacing: 0.02em;
  color: #575757;
}
</style>
<style>
.el-table th.el-table__cell > .cell {
  text-align: center;
}
.el-table .cell {
  text-align: center;
}
</style>
