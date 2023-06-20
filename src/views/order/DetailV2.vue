<template>
  <div class="frame-content-common-2022 order-detail-v2">
    <BreadcrumbTop
      text1="Quản lý đơn hàng"
      route1="order-list"
      text2="Chi tiết đơn hàng"
    />
    <DetailV2InfoCommon
      :orderDetailV2="orderDetailV2"
      @splitOrderDone="splitOrderDoneParant"
    />
    <DetailV2NCC
      :orderDetailV2="orderDetailV2"
      @splitOrderDone="splitOrderDoneParant"
    />
    <DetailV2Pack
      :orderDetailV2="orderDetailV2"
      @splitOrderDone="splitOrderDoneParant"
    />
    <DetailV2History />
  </div>
</template>

<script>
import axios from "axios";
import BreadcrumbTop from "@/components/BreadcrumbTop";
import DetailV2InfoCommon from "@/views/order/detail-v2-components/InfoCommon";
import DetailV2History from "@/views/order/detail-v2-components/History";
import DetailV2NCC from "@/views/order/detail-v2-components/NCC";
import DetailV2Pack from "@/views/order/detail-v2-components/Pack";
export default {
  name: "DetailOrderV2",
  metaInfo() {
    return {
      title: "Chi tiết đơn hàng",
    };
  },
  components: {
    BreadcrumbTop,
    DetailV2InfoCommon,
    DetailV2History,
    DetailV2NCC,
    DetailV2Pack,
  },
  data() {
    return {
      loading: true,
      orderDetailV2: {
        status: {
          color: "#fff",
        },
        warehouse: {
          address: "",
        },
        delivery: {
          address: "",
        },
        reports: {
          packages: 0,
          complains: 0,
          deliveries: 0,
        },
      },
      orderLogV2: [],
      orderPackV2Tab1: [],
    };
  },
  mounted() {
    // ID của đơn hàng đây e nhé
    // console.log(this.$route.params.order_id);
    this.fetchOrder();
  },
  methods: {
    fetchOrder(loading = true) {
      if (loading) {
        this.loading = true;
      }
      axios.get("order/" + this.$route.params.order_id).then((response) => {
        this.loading = false;
        switch (response.code) {
          case 200:
            this.orderDetailV2 = response.data;
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
    splitOrderDoneParant() {
      this.fetchOrder();
    },
  },
};
</script>

<style lang="css" scoped></style>
