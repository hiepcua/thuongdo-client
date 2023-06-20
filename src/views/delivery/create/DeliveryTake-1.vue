<template>
  <div class="address-take-826218" v-loading="loading">
    <div class="title-wrap d-flex justify-content-between align-items-center">
      <span class="title-1">Địa chỉ nhận hàng</span>
    </div>
    <div
      class="list-delivery"
      v-if="listDelivery.length > 0 && loading == false"
    >
      <div
        class="list-delivery-item d-flex flex-column"
        v-for="item in listDelivery"
        :key="item.id"
      >
        <div class="d-flex align-items-center">
          <img
            src="@/static/icon/account/checked.svg"
            alt=""
            v-if="item.id === delivery_id"
          />
          <img
            src="@/static/icon/account/no-checked.svg"
            alt=""
            v-else
            @click.stop="changeDeliveryId(item.id)"
          />
          <span class="address" @click.stop="changeDeliveryId(item.id)">{{
            item.name
          }}</span>
          <div class="action-wrap-192s8">
            <span
              class="btn-action-delivery btn-action-default"
              v-if="item.is_default"
              >Mặc định</span
            >
            <span
              class="btn-action-delivery btn-action-update"
              v-if="item.is_default"
              @click="addDelivery(item)"
              >Sửa</span
            >
            <span
              class="btn-action-delivery btn-action-add-default"
              @click="updateWareHouse(item.id)"
              v-if="!item.is_default"
              >Đặt mặc định</span
            >
            <span
              class="btn-action-delivery btn-action-delete"
              @click="deleteDelivery(item)"
              >Xóa</span
            >
          </div>
        </div>
        <div
          class="form-create-27527"
          v-if="item.is_default == true && showFromUpdate"
        >
          <div class="form-item-27527">
            <span>Họ và tên *</span>
            <el-input
              placeholder="Họ và tên"
              v-model="deliveryAdd.receiver"
              class="frame-input-common-2022"
              size="mini"
              clearable
            ></el-input>
          </div>
          <div class="form-item-27527">
            <span>Số điện thoại *</span>
            <el-input
              placeholder="Số điện thoại"
              v-model="deliveryAdd.phone_number"
              class="frame-input-common-2022"
              size="mini"
              type="number"
              clearable
            ></el-input>
          </div>
          <div class="form-item-27527">
            <span>Địa chỉ *</span>
            <el-select
              v-model="deliveryAdd.province_id"
              placeholder="Tỉnh thành"
              class="frame-select-common-2022 account-profile-select-city"
              popper-class="frame-select-popper-common-2022"
              clearable
              size="mini"
            >
              <el-option
                v-for="item in listProvince"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              >
              </el-option>
            </el-select>
            <el-select
              v-model="deliveryAdd.district_id"
              placeholder="Quận huyện"
              class="frame-select-common-2022 account-profile-select-city"
              popper-class="frame-select-popper-common-2022"
              clearable
              size="mini"
            >
              <el-option
                v-for="item in listDistrict"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </div>
          <div class="form-item-27527">
            <span>Địa chỉ chi tiết *</span>
            <el-input
              placeholder="Địa chỉ chi tiết"
              v-model="deliveryAdd.address"
              class="frame-input-common-2022"
              size="mini"
              clearable
            ></el-input>
          </div>
          <div class="d-flex justify-content-end pt-2">
            <div class="pr-2" @click="showFromUpdate = false">
              <div class="btn-add-form-close-27527">
                <span>Đóng</span>
              </div>
            </div>
            <div
              class="btn-add-form-create-27527"
              :class="!canSubmit ? 'disable' : ''"
              @click="submitAddressDelivery"
            >
              <i class="el-icon-loading" v-if="!canSubmit"></i>
              <span>Cập nhật</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      class="list-delivery-none d-flex justify-content-center pt-4"
      v-if="listDelivery.length == 0 && loading == false"
    >
      <span>Không có địa chỉ nào !!</span>
    </div>

    <div
      class="title-wrap title-wrap-v2 d-flex justify-content-start align-items-center"
    >
      <span class="title-2" @click="addDelivery2"
        >+ Thêm địa chỉ nhận hàng</span
      >
    </div>
    <div class="form-create-27527" v-if="showFromCreate">
      <div class="form-item-27527">
        <span>Họ và tên *</span>
        <el-input
          placeholder="Họ và tên"
          v-model="deliveryAdd.receiver"
          class="frame-input-common-2022"
          size="mini"
          clearable
        ></el-input>
      </div>
      <div class="form-item-27527">
        <span>Số điện thoại *</span>
        <el-input
          placeholder="Số điện thoại"
          v-model="deliveryAdd.phone_number"
          class="frame-input-common-2022"
          size="mini"
          type="number"
          clearable
        ></el-input>
      </div>
      <div class="form-item-27527">
        <span>Địa chỉ *</span>
        <el-select
          v-model="deliveryAdd.province_id"
          placeholder="Tỉnh thành"
          class="frame-select-common-2022 account-profile-select-city"
          popper-class="frame-select-popper-common-2022"
          clearable
          size="mini"
        >
          <el-option
            v-for="item in listProvince"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          >
          </el-option>
        </el-select>
        <el-select
          v-model="deliveryAdd.district_id"
          placeholder="Quận huyện"
          class="frame-select-common-2022 account-profile-select-city"
          popper-class="frame-select-popper-common-2022"
          clearable
          size="mini"
        >
          <el-option
            v-for="item in listDistrict"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </div>
      <div class="form-item-27527">
        <span>Địa chỉ chi tiết *</span>
        <el-input
          placeholder="Địa chỉ chi tiết"
          v-model="deliveryAdd.address"
          class="frame-input-common-2022"
          size="mini"
          clearable
        ></el-input>
      </div>
      <div class="d-flex justify-content-end pt-2">
        <div class="pr-2" @click="showFromCreate = false">
          <div class="btn-add-form-close-27527">
            <span>Đóng</span>
          </div>
        </div>
        <div
          class="btn-add-form-create-27527"
          :class="!canSubmit ? 'disable' : ''"
          @click="submitAddressDelivery2"
        >
          <i class="el-icon-loading" v-if="!canSubmit"></i>
          <span>Thêm địa chỉ</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "DeliveryTake",
  data() {
    return {
      loading: false,
      listDelivery: [],
      delivery_id: null,

      // Phần Thêm
      showFromCreate: false,
      canSubmit: true,
      loadDone: false,
      listProvince: [],
      listDistrict: [],
      deliveryAdd: {
        receiver: "",
        phone_number: "",
        province_id: "",
        district_id: "",
        address: "",
      },

      // Phần cập nhật
      showFromUpdate: false,
    };
  },
  mounted() {
    this.fetchDelivery();
  },
  methods: {
    fetchDelivery(loading = true) {
      if (loading) {
        this.loading = true;
      }
      axios.get("customer/delivery").then((response) => {
        this.loading = false;
        switch (response.code) {
          case 200:
            this.listDelivery = response.data;
            if (this.delivery_id == null) {
              this.listDelivery.forEach((element) => {
                if (element.is_default) {
                  this.delivery_id = element.id;
                }
              });
              this.changeDeliveryId(this.delivery_id);
            }
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
      this.$confirm("Thiết lập địa chỉ này là địa chỉ mặc định", "Cảnh báo", {
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
      let data = {
        customer_delivery_id: id,
      };
      axios.put("customer", data).then((response) => {
        switch (response.code) {
          case 200:
            this.$notify({
              title: "Thành công",
              message: "Cập nhật thành công",
              type: "success",
            });
            this.fetchDelivery(false);
            this.loadDone = false;
            this.showFromUpdate = false;
            this.showFromCreate = false;
            this.delivery_id = id;
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
    changeDeliveryId(id) {
      this.delivery_id = id;
      this.$emit("changeDeliveryId", id);
    },

    // Cập nhật địa chỉ
    addDelivery(item) {
      this.showFromUpdate = !this.showFromUpdate;
      this.showFromCreate = false;
      this.deliveryAdd = JSON.parse(JSON.stringify(item));
      setTimeout(() => {
        this.fetchProvince();
        this.fetchDistrict();
      }, 500);
    },
    fetchProvince() {
      axios.get("locate/province").then((response) => {
        switch (response.code) {
          case 200:
            this.listProvince = response.data;
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
    fetchDistrict() {
      axios
        .get("locate/district/" + this.deliveryAdd.province_id)
        .then((response) => {
          switch (response.code) {
            case 200:
              this.listDistrict = response.data;
              this.loadDone = true;
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
    submitAddressDelivery() {
      if (this.canSubmit == false) {
        return;
      }
      this.canSubmit = false;
      axios
        .put("/customer/delivery/" + this.deliveryAdd.id, this.deliveryAdd)
        .then((response) => {
          this.canSubmit = true;
          switch (response.code) {
            case 200:
              this.$notify({
                title: "Thành công",
                message: "Cập nhật thành công",
                type: "success",
              });
              this.showFromUpdate = false;
              this.loadDone = false;
              this.fetchDelivery();
              break;
            case 422:
              this.$notify({
                title: "Có lỗi xảy ra",
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

    // Thêm địa chỉ
    addDelivery2() {
      this.showFromCreate = !this.showFromCreate;
      this.showFromUpdate = false;
      this.deliveryAdd.receiver = "";
      this.deliveryAdd.phone_number = "";
      this.deliveryAdd.province_id = "";
      this.deliveryAdd.district_id = "";
      this.deliveryAdd.address = "";
      this.loadDone = false;
      this.fetchProvince();
    },
    submitAddressDelivery2() {
      if (this.canSubmit == false) {
        return;
      }
      this.canSubmit = false;
      axios.post("/customer/delivery", this.deliveryAdd).then((response) => {
        this.canSubmit = true;
        switch (response.code) {
          case 200:
            this.$notify({
              title: "Thành công",
              message: "Thêm mới thành công",
              type: "success",
            });
            this.showFromCreate = false;
            this.loadDone = false;
            this.fetchDelivery(false);
            break;
          case 422:
            this.$notify({
              title: "Có lỗi xảy ra",
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

    // Xóa
    deleteDelivery(item) {
      this.$confirm("Xác nhận xóa địa chỉ: " + item.name, "Cảnh báo", {
        confirmButtonText: "Đồng ý",
        cancelButtonText: "Hủy",
        type: "warning",
      })
        .then(() => {
          this.deleteDeliveryAction(item);
        })
        .catch(() => {});
    },
    deleteDeliveryAction(item) {
      axios.delete("customer/delivery/" + item.id).then((response) => {
        this.loading = false;
        switch (response.code) {
          case 200:
            this.$notify({
              title: "Thành công",
              message: "Xóa thành công",
              type: "success",
            });
            this.fetchDelivery();
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
  watch: {
    "deliveryAdd.province_id": function () {
      if (this.loadDone) {
        this.deliveryAdd.district_id = "";
      }
      if (this.deliveryAdd.province_id) {
        this.fetchDistrict();
      } else {
        this.listDistrict = [];
      }
    },
    "deliveryAdd.phone_number": function () {
      let reg = new RegExp("^[0-9]+$");
      let result = reg.test(this.deliveryAdd.phone_number);
      if (!result && this.deliveryAdd.phone_number) {
        this.$message.error("Số điện thoại sai định dạng");
      }
    },
  },
};
</script>

<style lang="css" scoped>
.address-take-826218 {
  padding: 0px 0px 20px 0px;
  padding: 0px 0px 10px 0px;
  min-height: 120px;
  background-color: #fff;
}
.address-take-826218 .title-wrap {
  margin-bottom: 15px;
}
.address-take-826218 .title-wrap-v2 {
  margin-bottom: 8px;
}
.address-take-826218 .title-1 {
  font-weight: 500;
  font-weight: 700;
  color: #575757;
}
.address-take-826218 .title-2 {
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
.action-wrap-192s8 {
  min-width: 180px;
  justify-content: flex-start;
  display: flex;
  align-items: center;
}

/*// Form thêm sửa xóa*/
.form-create-27527 {
  background: #f0f8ff;
  padding: 20px 30px;
  margin-top: 10px;
}
.form-item-27527 {
  display: flex;
  padding: 5px 0px;
  align-items: center;
}
.form-item-27527 span {
  min-width: 120px;
}
.btn-add-form-create-27527 {
  background: #2196f3;
  border-radius: 4px;
  color: #fff;
  padding: 10px 20px;
  cursor: pointer;
  text-transform: uppercase;
  font-weight: 400;
  font-size: 12px;
}
.btn-add-form-create-27527:hover {
  opacity: 0.8;
}
.btn-add-form-create-27527.disable {
  pointer-events: none;
}
.btn-add-form-create-27527 span {
  margin-left: 5px;
}

.btn-add-form-close-27527 {
  background: #fff;
  border-radius: 4px;
  color: #000;
  padding: 10px 20px;
  cursor: pointer;
  text-transform: uppercase;
  font-weight: 400;
  font-size: 12px;
  border: 1px solid #dcdfe6;
}
</style>

<style type="text/css">
.account-profile-select-city {
  margin-right: 10px;
}
</style>
