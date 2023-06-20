<template>
  <div class="frame-content-common-2022 complain-detail">
    <BreadcrumbTop
      text1="Quản lý khiếu nại"
      route1="complain-list"
      text2="Chi tiết khiếu nại"
    />
    <TimeLine :packDetail="complainDetail" />
    <div class="complain-detail-pro">
      <Info :complainDetail="complainDetail" />
      <Product :complainDetail="complainDetail" />
    </div>
  </div>
</template>

<script>
import axios from "axios";
import BreadcrumbTop from "@/components/BreadcrumbTop";
import TimeLine from "@/views/complain/detail-components/TimeLine";
import Info from "@/views/complain/detail-components/Info";
import Product from "@/views/complain/detail-components/Product";
export default {
  name: "DetailComplain",
  metaInfo() {
    return {
      title: "Chi tiết khiếu nại",
    };
  },
  components: {
    BreadcrumbTop,
    TimeLine,
    Info,
    Product,
  },
  data() {
    return {
      complainDetail: {},
    };
  },
  mounted() {
    this.fetchOrder();
  },
  methods: {
    fetchOrder() {
      axios
        .get("complain/detail/" + this.$route.params.complain_id)
        .then((response) => {
          this.loading = false;
          switch (response.code) {
            case 200:
              this.complainDetail = response.data;
              console.log("comp", this.complainDetail);
              break;
            case 500:
              this.$notify({
                title: "Có lỗi xảy ra",
                message: response.message,
                type: "warning",
              });
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
.complain-detail {
  min-height: 1000px;
}
.complain-detail-pro {
  background-color: #fff;
  padding: 20px 30px;
  margin-top: 20px;
}
</style>
