<template>
  <div class="warehouse-take-826218" v-loading="loading">
    <div class="title-wrap d-flex align-items-center">
      <span class="title-1">KHO NHẬN HÀNG (*)</span>
    </div>
    <div
      class="list-delivery"
      v-if="listWareHouse.length > 0 && loading == false"
    >
      <div
        class="list-delivery-item d-flex align-items-center"
        v-for="item in listWareHouse"
        :key="item.id"
      >
        <img
          src="@/static/icon/account/checked.svg"
          alt=""
          v-if="item.id === warehouse_id"
        />
        <img
          src="@/static/icon/account/no-checked.svg"
          alt=""
          v-else
          @click.stop="changeWareHouseId(item.id)"
        />
        <span class="address" @click.stop="changeWareHouseId(item.id)">{{
          item.name
        }}</span>
        <span
          class="btn-action-delivery btn-action-default"
          v-if="item.id == warehouse_default"
          >Mặc định</span
        >
        <span
          class="btn-action-delivery btn-action-add-default"
          @click="updateWareHouse(item.id)"
          v-if="item.id !== warehouse_default"
          >Đặt mặc định</span
        >
      </div>
    </div>
    <div
      class="list-delivery-none d-flex justify-content-center pt-4"
      v-if="listWareHouse.length == 0 && loading == false"
    >
      <span>Không có địa chỉ nào !!</span>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { mapActions, mapGetters } from "vuex";
export default {
  name: "WarehouseTake",
  data() {
    return {
      loading: false,
      listWareHouse: [],
      warehouse_id: null,
      warehouse_default: null,
    };
  },
  computed: {
    ...mapGetters("account", ["accountInfo"]),
  },
  mounted() {
    setTimeout(() => {
      this.warehouse_default = this.accountInfo.warehouse_id;
      this.changeWareHouseId(this.warehouse_default);
    }, 1000);
    this.fetchWareHouse();
  },
  methods: {
    ...mapActions("account", ["getAccountInfo"]),
    fetchWareHouse(loading = true) {
      if (loading) {
        this.loading = true;
      }
      axios.get("warehouse/vi").then((response) => {
        this.loading = false;
        switch (response.code) {
          case 200:
            this.listWareHouse = response.data;
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
    updateWareHouse(id) {
      this.$confirm("Thiết lập kho này là địa chỉ mặc định", "Cảnh báo", {
        confirmButtonText: "Đồng ý",
        cancelButtonText: "Hủy",
        type: "warning",
      })
        .then(() => {
          this.updateWareHouseAction(id);
        })
        .catch(() => {});
    },
    updateWareHouseAction(id) {
      // this.loading = true;
      let data = {
        warehouse_id: id,
      };
      axios.put("customer", data).then((response) => {
        // this.loading = false;
        switch (response.code) {
          case 200:
            this.$notify({
              title: "Thành công",
              message: "Cập nhật thành công",
              type: "success",
            });
            this.warehouse_default = id;
            this.getAccountInfo();
            break;
          case 422:
            this.$notify({
              title: "Có lỗi xẩy ra",
              message: Object.values(response.data)[0],
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
    changeWareHouseId(id) {
      this.warehouse_id = id;
      this.$emit("changeWareHouseId", id);
    },
  },
};
</script>

<style lang="css" scoped>
.warehouse-take-826218 {
  padding: 20px 15px 20px 15px;
  min-height: 120px;
  background-color: #fff;
}
.warehouse-take-826218 .title-wrap {
  margin-bottom: 22px;
}
.warehouse-take-826218 .title-1 {
  font-weight: 500;
  font-weight: 700;
  color: #575757;
}
.warehouse-take-826218 .title-2 {
  color: #1771c1;
  cursor: pointer;
}
.list-delivery-item {
  margin-bottom: 10px;
  margin-bottom: 15px;
  cursor: pointer;
}
.list-delivery-item:hover {
  color: #1d60a6;
}
.list-delivery-item img {
  margin-right: 8px;
}
.list-delivery-item .address {
  font-size: 13px;
  font-size: 14px;
  margin-right: 15px;
  font-weight: 400;
  font-size: 14px;
  line-height: 16px;
  letter-spacing: 0.02em;
  text-transform: capitalize;
  color: #575757;
}
.btn-action-delivery {
  padding: 3px 10px;
  background-color: #f2f2f2;
  font-size: 10px;
  border-radius: 4px;
  margin-left: 10px;
  cursor: pointer;
  color: #fff;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  -o-user-select: none;
  user-select: none;
}
.btn-action-delivery:hover {
  opacity: 0.8;
  transition: all 0.3s;
}
.btn-action-default {
  background: #26b01c;
}
.btn-action-add-default {
  background: #2196f3;
}
.btn-action-update {
  background: #fd6120;
}
.btn-action-delete {
  background: #8b8b8b;
}
</style>
