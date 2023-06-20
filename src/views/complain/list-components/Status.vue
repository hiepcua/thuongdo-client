<template>
  <div class="frame-list-status-2022">
    <div class="item-1900" v-for="item in listStatus" :key="item.name">
      <span class="text" :style="{ color: item.color }">{{ item.name }}</span>
      <span class="icon" :style="{ backgroundColor: item.color }">{{
        item.quantity
      }}</span>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "ComplainListStatus",

  data() {
    return {
      listStatus: [],
    };
  },
  mounted() {
    this.fetchStatus();
  },
  methods: {
    fetchStatus() {
      axios.get("complain/status").then((response) => {
        this.loading = false;
        switch (response.code) {
          case 200:
            this.listStatus = response.data;
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

<style lang="css" scoped></style>
