<template>
  <div class="table-element-custom-2022 pack-detail-history">
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="time" label="Ngày thay đổi"> </el-table-column>
      <el-table-column prop="name" label="Nhân viên">
        <template slot-scope="scope">
          <span>{{ scope.row.staff.name }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="content" label="Tình trạng"> </el-table-column>
    </el-table>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "HistoryDetailPack",
  data() {
    return {
      tableData: [],
    };
  },
  mounted() {
    this.fetchLog();
  },
  methods: {
    fetchLog() {
      axios
        .get("activity/package/" + this.$route.params.pack_id)
        .then((response) => {
          this.loading = false;
          switch (response.code) {
            case 200:
              this.tableData = response.data;
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
.pack-detail-history {
  padding: 20px 20px;
  background: #fff;
}
</style>
