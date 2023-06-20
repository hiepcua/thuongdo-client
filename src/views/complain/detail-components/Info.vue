<template>
  <div>
    <div class="table-element-custom-2022 boder complain-detail-table-89">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column label="Loại khiếu nại">
          <div>
            <span>{{ complainDetail.complain_type }}</span>
          </div>
        </el-table-column>
        <el-table-column label="Phương án giải quyết">
          <span>{{ complainDetail.solution }}</span>
        </el-table-column>
        <el-table-column label="Nhân viên đặt hàng">
          <span>{{ complainDetail.staff_order }}</span>
        </el-table-column>
        <el-table-column label="Nhân viên khiếu nại">
          <span>{{ complainDetail.staff_complain }}</span>
        </el-table-column>
        <el-table-column label="Phản hồi" width="460">
          <Feedback
            :complain_id="this.$route.params.complain_id"
            :showFrom="true"
          />
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import Feedback from "@/views/complain/common-components/Feedback";
export default {
  name: "InfoDetailComplain",
  components: {
    Feedback,
  },
  props: {
    complainDetail: Object,
  },
  data() {
    return {
      tableData: [],
    };
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

<style lang="css" scoped></style>

<style>
.complain-detail-table-89 .el-table .el-table__cell {
  vertical-align: top;
}
</style>
