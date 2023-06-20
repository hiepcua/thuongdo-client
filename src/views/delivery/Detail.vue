<template>
  <div class="frame-content-common-2022 delivery-detail">
    <BreadcrumbTop
      text1="Quản lý giao hàng"
      route1="delivery-list"
      text2="Chi tiết giao hàng"
    />
    <Info />
    <Pack />
  </div>
</template>

<script>
import BreadcrumbTop from "@/components/BreadcrumbTop";
import Info from "@/views/delivery/detail-components/Info";
import Pack from "@/views/delivery/detail-components/Pack";
export default {
  name: "DetailDelivery",
  metaInfo() {
    return {
      title: "Chi tiết giao hàng",
    };
  },
  components: {
    BreadcrumbTop,
    Info,
    Pack,
  },
  data() {
    return {};
  },
  mounted() {},
  methods: {},
};
</script>

<style lang="css" scoped></style>
