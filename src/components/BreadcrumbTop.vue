<template>
  <div class="breadcrumb-top-2022">
    <span class="item-breadcrumb-892 active-92022a" @click="toHome"
      >Trang chủ</span
    >
    <span class="line-2022902" v-if="text1">/</span>
    <span
      class="item-breadcrumb-892"
      :class="[route1 ? 'active-92022a' : '']"
      @click="toRoute1"
      v-if="text1"
      >{{ text1 }}</span
    >

    <span class="line-2022902" v-if="text2">/</span>
    <span class="item-breadcrumb-892" v-if="text2">{{ text2 }}</span>
  </div>
</template>

<script>
export default {
  name: "BreadcrumbTop",
  props: {
    text1: String,
    route1: String,
    text2: String,
    route2: String,
  },
  data() {
    return {};
  },
  methods: {
    toHome() {
      this.$router.push({ name: "home-index" });
    },
    toRoute1() {
      if (this.route1) {
        this.$router.push({ name: this.route1 });
      }
    },
  },
};
</script>

<style lang="css" scoped>
.breadcrumb-top-2022 {
  background: #e8f7fa;
  margin-bottom: 15px;
  height: 40px;
  display: flex;
  align-items: center;
  padding-left: 30px;
}
.item-breadcrumb-892 {
  color: #195594;
}
.active-92022a {
  cursor: pointer;
  color: #575757;
}
.active-92022a:hover {
  color: #000;
  transition: all 0.3s;
}
.line-2022902 {
  padding: 0px 10px;
}
</style>
