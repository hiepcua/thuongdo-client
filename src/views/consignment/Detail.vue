<template>
  <div class="frame-content-common-2022 pack-detail">
    <BreadcrumbTop
      text1="Quản lý đơn ký gửi"
      route1="consignment-list"
      text2="Chi tiết đơn ký gửi"
    />
    <TimeLine :packDetail="packDetail" />
    <Info :packDetail="packDetail" />
    <History />
  </div>
</template>

<script>
import axios from "axios";
import BreadcrumbTop from "@/components/BreadcrumbTop";
import TimeLine from "@/views/consignment/detail-components/TimeLine";
import Info from "@/views/consignment/detail-components/Info";
import History from "@/views/consignment/detail-components/History";
export default {
  name: "PackDetail",
  metaInfo() {
    return {
      title: "Chi tiết đơn ký gửi",
    };
  },
  components: {
    BreadcrumbTop,
    TimeLine,
    Info,
    History,
  },
  data() {
    return {
      loading: true,
      packDetail: {
        status: {
          color: "",
        },
        type_of_goods: {},
        statuses: [],
      },
    };
  },
  mounted() {
    // ID của kiện hàng
    // console.log(this.$route.params.consignment_id);
    this.fetchOrder();
  },
  methods: {
    fetchOrder(loading = true) {
      if (loading) {
        this.loading = true;
      }
      axios
        .get("consignment/" + this.$route.params.consignment_id)
        .then((response) => {
          this.loading = false;
          switch (response.code) {
            case 200:
              this.packDetail = response.data;
              console.log("list", this.packDetail);
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

<style lang="css" scoped></style>
