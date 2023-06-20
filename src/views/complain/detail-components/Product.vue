<template>
  <div class="complain-detail-product">
    <span class="title-main">Chi tiết khiếu nại</span>
    <div
      class="table-element-custom-2022 boder complain-detail-product-table-89"
    >
      <el-table :data="complainDetail.products" style="width: 100%">
        <el-table-column type="index" label="STT" width="50"></el-table-column>
        <el-table-column label="Kiện hàng" prop="bill_code"></el-table-column>
        <el-table-column label="Ảnh">
          <template slot-scope="scope">
            <img class="image-complain" :src="scope.row.image" />
          </template>
        </el-table-column>
        <el-table-column label="Tên sản phẩm" prop="name"></el-table-column>
        <el-table-column label="Đơn giá">
          <template slot-scope="scope">
            <div class="d-flex flex-column">
              <span class="color-red">{{
                (scope.row.unit_price_cny * scope.row.exchange_rate) | vnd
              }}</span>
              <span class="color-red">¥ {{ scope.row.amount_cny }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="Số lượng" prop="quantity"></el-table-column>
        <el-table-column label="Ảnh sản phẩm">
          <template slot-scope="scope">
            <img
              class="image-complain-mini"
              :src="img"
              v-for="img in scope.row.images"
              :key="img"
            />
          </template>
        </el-table-column>
        <el-table-column label="Ghi chú" prop="complain_note"></el-table-column>
      </el-table>
    </div>
    <div class="pt-3 d-flex">
      <span>Ảnh vận đơn</span>
      <!-- <img
        class="image-complain-bill"
        :src="image"
        v-for="image in complainDetail.images_bill"
        :key="image"
      /> -->
      <div v-for="image in complainDetail.images_bill" :key="image">
        <img
          class="image-complain-bill"
          v-if="checkImage(image)"
          :src="image"
        />
        <div v-else class="uploadVideo">
          <video controls="controls">
            <source :src="image" />
          </video>
        </div>
      </div>
    </div>
    <div
      class="table-element-custom-2022 boder complain-detail-product-table-89 pt-4"
    >
      <el-table :data="tableData" style="width: 100%">
        <el-table-column label="Hàng thực nhận được">
          <!-- <div>
            <img
              class="image-complain-bill"
              :src="image"
              v-for="image in complainDetail.images_received"
              :key="image"
            />
          </div> -->
          <div class="d-flex">
            <div v-for="image in complainDetail.images_received" :key="image">
              <img
                class="image-complain-bill"
                v-if="checkImage(image)"
                :src="image"
              />
              <div v-else class="uploadVideo">
                <video controls="controls">
                  <source :src="image" />
                </video>
              </div>
            </div>
          </div>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProductDetailComplain",
  components: {},
  props: {
    complainDetail: Object,
  },
  data() {
    return {
      tableData: [],
    };
  },
  methods: {
    checkImage(i) {
      const last3 = i.slice(-3);
      if ((last3 == "png") | (last3 == "jpeg") | (last3 == "jpg")) {
        return true;
      }
      return false;
    },
  },
  mounted() {},
  watch: {
    complainDetail: function () {
      let temp = {};
      this.tableData.push(temp);
    },
  },
};
</script>

<style lang="css" scoped>
.complain-detail-product {
  margin-top: 50px;
}
.complain-detail-product .title-main {
  font-weight: 700;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: 0.02em;
  color: #575757;
  margin-bottom: 20px;
  display: inline-block;
}
.complain-detail-product-table-89 .image-complain {
  width: 120px;
}
.image-complain-mini {
  width: 60px;
  height: 60px;
  object-fit: cover;
  margin-left: 10px;
}
.image-complain-bill {
  width: 120px;
  height: 120px;
  object-fit: cover;
  margin-left: 10px;
}
.uploadVideo video {
  width: 120px;
  height: 120px;
  object-fit: cover;
  margin-left: 10px;
}
.color-red {
  color: red;
}
</style>
