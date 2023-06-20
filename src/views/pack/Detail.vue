<template>
  <div class="frame-content-common-2022 pack-detail">
    <BreadcrumbTop
      text1="Quản lý kiện hàng"
      route1="pack-list"
      text2="Chi tiết kiện hàng"
    />
    <TimeLine :packDetail="packDetail" />
    <Info :packDetail="packDetail" />
    <History />
    <Product :packDetail="packDetail" />
  </div>
</template>

<script>
import axios from "axios";
import BreadcrumbTop from "@/components/BreadcrumbTop";
import TimeLine from "@/views/pack/detail-components/TimeLine";
import Info from "@/views/pack/detail-components/Info";
import History from "@/views/pack/detail-components/History";
import Product from "@/views/pack/detail-components/Product";
export default {
  name: "PackDetail",
  metaInfo() {
    return {
      title: "Chi tiết kiện hàng",
    };
  },
  components: {
    BreadcrumbTop,
    TimeLine,
    Info,
    History,
    Product,
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
    // ID của kiện hàng đây e nhé
    // console.log(this.$route.params.pack_id);
    this.fetchOrder();
  },
  methods: {
    fetchOrder(loading = true) {
      if (loading) {
        this.loading = true;
      }
      axios.get("package/" + this.$route.params.pack_id).then((response) => {
        this.loading = false;
        switch (response.code) {
          case 200:
            this.packDetail = response.data;
            console.log("pack", this.packDetail);
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
