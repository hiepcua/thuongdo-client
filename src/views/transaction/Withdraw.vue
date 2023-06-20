<template>
  <div class="frame-content-common-2022 transaction-withdraw" id="ST2022">
    <BreadcrumbTop text1="Rút tiền" />
    <div class="transaction-withdraw-tap">
      <span class="title">Thông tin rút tiền</span>
      <div class="tab-wrap">
        <span
          class="item"
          :class="tabActive == 1 ? 'active' : ''"
          @click="changeTab(1)"
          >Rút tiền</span
        >
        <span
          class="item"
          :class="tabActive == 2 ? 'active' : ''"
          @click="changeTab(2)"
          >Tài khoản</span
        >
      </div>
    </div>
    <div v-show="tabActive == 1">
      <WithDrawTab1 />
    </div>
    <div v-show="tabActive == 2">
      <WithDrawTab2 />
    </div>
  </div>
</template>

<script>
import BreadcrumbTop from "@/components/BreadcrumbTop";
import WithDrawTab1 from "@/views/transaction/withdraw-components/WithDrawTab1";
import WithDrawTab2 from "@/views/transaction/withdraw-components/WithDrawTab2";
export default {
  name: "ListWithdraw",
  metaInfo() {
    return {
      title: "Rút tiền",
    };
  },
  components: {
    BreadcrumbTop,
    WithDrawTab1,
    WithDrawTab2,
  },
  data() {
    return {
      tabActive: 1,
    };
  },
  methods: {
    changeTab(tab) {
      this.tabActive = tab;
    },
  },
};
</script>

<style lang="css" scoped>
/*transaction-withdraw-tap*/
.transaction-withdraw-tap {
  background-color: #fff;
  padding: 20px 40px 10px 40px;
}
.transaction-withdraw-tap .title {
  font-weight: 700;
  font-size: 16px;
  line-height: 16px;
  letter-spacing: 0.02em;
  text-transform: uppercase;
  color: #2196f3;
  margin-bottom: 15px;
  display: inline-block;
}
.transaction-withdraw-tap .tab-wrap {
  border-bottom: 1px solid #28b8ce;
}
.transaction-withdraw-tap .tab-wrap .item {
  background: #f6faff;
  padding: 12px 48px;
  cursor: pointer;
  display: inline-block;
  color: #1771c1;
  margin-bottom: 1px;
  font-size: 16px;
}
.transaction-withdraw-tap .tab-wrap .item:hover {
  opacity: 0.8;
}
.transaction-withdraw-tap .tab-wrap .item.active {
  background-color: #28b8ce;
  color: #fff;
}
</style>
