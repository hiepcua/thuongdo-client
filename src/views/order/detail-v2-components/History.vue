<template>
  <div class="order-detail-v2-history">
    <span class="title-90">Lịch sử hoạt động</span>
    <div
      class="history-item-98"
      v-for="(item, index) in orderLogV2"
      :key="index"
    >
      <span class="time">{{ item.time }}</span>
      <div>
        <span
          class="order-detail-icon-status-6868amg"
          :style="{ backgroundColor: item.label.color }"
          >{{ item.label.name }}</span
        >
      </div>
      <span class="note-99">{{ item.content }}</span>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "DetailV2History",
  data() {
    return {
      orderLogV2: [],
    };
  },
  mounted() {
    this.fetchLog();
  },
  methods: {
    fetchLog() {
      axios
        .get("activity/order_log/" + this.$route.params.order_id)
        .then((response) => {
          this.loading = false;
          switch (response.code) {
            case 200:
              this.orderLogV2 = response.data;
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
.order-detail-v2-history {
  padding: 20px 30px;
  background: #fff;
  margin-bottom: 15px;
}
.title-90 {
  font-weight: 700;
  font-size: 14px;
  line-height: 16px;
  letter-spacing: 0.02em;
  text-transform: uppercase;
  color: #575757;
  margin-bottom: 10px;
  display: inline-block;
}
.history-item-98 {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 38px;
  border-bottom: 1px solid #e6e6e6;
}
.history-item-98 .time {
  margin-right: 10px;
}
.history-item-98 .note-99 {
  margin-left: 10px;
}
.order-detail-icon-status-6868amg {
  background-color: green;
}
</style>
