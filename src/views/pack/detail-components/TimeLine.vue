<template>
  <div>
    <div class="pack-detail-barcode">
      <span class="code">Mã vận đơn: {{ packDetail.bill_code }}</span>
      <div>
        <span
          class="order-detail-icon-status-6868amg"
          :style="{ backgroundColor: packDetail.status.color }"
          >{{ packDetail.status.name }}</span
        >
      </div>
    </div>
    <div class="pack-detail-timeline">
      <div
        class="item"
        v-for="(item, index) in packDetail.statuses"
        :key="index"
      >
        <div class="item-sub">
          <img src="@/static/icon/pack/detail/Tick.svg" />
          <span
            class="line"
            :class="index == packDetail.statuses.length - 1 ? 'last' : ''"
          ></span>
          <div class="info">
            <span class="text">{{ item.name }}</span>
            <span class="time">{{ item.time }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TimeLineDetailPack",
  props: {
    packDetail: Object,
  },
  data() {
    return {};
  },
  mounted() {},
  watch: {},
};
</script>

<style lang="css" scoped>
.pack-detail-barcode {
  display: flex;
  justify-content: center;
  align-items: center;
  background: #fff;
  padding: 20px 0px;
}
.pack-detail-barcode .code {
  margin-right: 10px;
  font-weight: 500;
  font-size: 16px;
  line-height: 16px;
  letter-spacing: 0.02em;
  color: #575757;
}
.pack-detail-timeline {
  background: #fff;
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding: 15px 0px 0px 0px;
  padding-left: 135px;
}
.pack-detail-timeline .item {
  height: 100px;
  align-items: center;
  justify-content: center;
  display: flex;
}
.pack-detail-timeline .item-sub {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}
.pack-detail-timeline .info {
  display: inline-flex;
  align-items: center;
  flex-direction: column;
  position: absolute;
  top: -45px;
  left: -50px;
  width: 120px;
}
.pack-detail-timeline .info .text {
  font-size: 14px;
  color: #575757;
}
.pack-detail-timeline .info .time {
  font-size: 11px;
  color: #575757;
  margin-top: 5px;
}
.pack-detail-timeline .line {
  height: 1px;
  width: 135px;
  background: #2196f3;
  display: inline-block;
}
.pack-detail-timeline .line.last {
  background: transparent;
}
</style>
