<template>
  <div class="create-delivery-garage-888">
    <span class="create-delivery-dialog-882-sub-title">Nhà xe</span>
    <div class="d-flex flex-column pt-3">
      <div
        class="item-common-9012-line"
        v-for="item in listTransporterChild"
        :key="item.id"
      >
        <div class="item-common-9012">
          <img
            src="@/static/icon/account/checked.svg"
            alt=""
            v-if="item.id === garage_id"
          />
          <img
            src="@/static/icon/account/no-checked.svg"
            alt=""
            v-else
            @click.stop="changeGarageId(item.id)"
          />

          <span @click.stop="changeGarageId(item.id)">{{
            item.custom_name
          }}</span>
          <div class="pl-2">
            <span
              class="order-detail-icon-status-6868amg"
              @click.stop="confirmDeleteModel(item)"
              >Xóa</span
            >
          </div>
        </div>
      </div>
    </div>
    <div
      class="btn-add-delivery-garage-888"
      @click="showFromCreate = !showFromCreate"
    >
      <span>+ Thêm nhà xe mới</span>
    </div>
    <div class="form-create-27527" v-if="showFromCreate">
      <div class="form-item-27527">
        <span>Nhà xe *</span>
        <el-input
          placeholder="Tên nhà xe"
          v-model="modelData.name"
          class="frame-input-common-2022"
          size="small"
          clearable
        ></el-input>
      </div>
      <div class="form-item-27527">
        <span>Số điện thoại *</span>
        <el-input
          placeholder="Số điện thoại"
          v-model="modelData.phone_number"
          class="frame-input-common-2022"
          size="small"
          clearable
        ></el-input>
      </div>
      <div class="d-flex justify-content-end pt-2">
        <div
          class="btn-add-form-create-27527"
          :class="!canSubmit ? 'disable' : ''"
          @click="addGarage"
        >
          <i class="el-icon-loading" v-if="!canSubmit"></i>
          <span>Thêm nhà xe</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "CreateDeliveryGarage",
  props: {
    transporter_select: Object,
  },
  data() {
    return {
      canSubmit: true,
      showFromCreate: false,
      modelData: {
        name: "",
        phone_number: "",
      },
      listTransporterChild: [],

      garage_id: "",
    };
  },
  mounted() {
    this.fetchTransporterChild();
  },
  methods: {
    fetchTransporterChild() {
      axios
        .get("transporter/children/" + this.transporter_select.id)
        .then((response) => {
          this.loading = false;
          switch (response.code) {
            case 200:
              this.listTransporterChild = response.data;
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
    addGarage() {
      if (this.modelData.name == "") {
        this.$notify({
          title: "Có lỗi xảy ra",
          message: "Vui lòng nhập tên nhà xe",
          type: "warning",
        });
        return;
      }
      if (this.modelData.phone_number == "") {
        this.$notify({
          title: "Có lỗi xảy ra",
          message: "Vui lòng nhập số điện thoại nhà xe",
          type: "warning",
        });
        return;
      }

      let lengthPhone = this.modelData.phone_number.length;

      if (lengthPhone < 10 || lengthPhone > 12) {
        this.$notify({
          title: "Có lỗi xảy ra",
          message: "Số điện thoại có độ dài từ 10-12 số",
          type: "warning",
        });
        return;
      }

      let reg = new RegExp("^[0-9]+$");
      let result = reg.test(this.modelData.phone_number);
      if (!result && this.modelData.phone_number) {
        this.$message.error("Số điện thoại sai định dạng");
        return;
      }

      this.canSubmit = false;
      axios
        .post(
          "transporter/children/" + this.transporter_select.id,
          this.modelData
        )
        .then((response) => {
          this.canSubmit = true;
          switch (response.code) {
            case 200:
              this.$notify({
                title: "Thành công",
                message: "Thêm mới thành công",
                type: "success",
              });
              this.modelData.name = "";
              this.modelData.phone_number = "";
              this.showFromCreate = false;
              this.fetchTransporterChild();
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

    changeGarageId(id) {
      this.garage_id = id;
      this.$emit("changeGarageId", id);
    },

    // Xóa
    confirmDeleteModel(item) {
      this.$confirm("Xác nhận xóa nhà xe " + item.custom_name, "Cảnh báo", {
        confirmButtonText: "Đồng ý",
        cancelButtonText: "Hủy",
        type: "warning",
      })
        .then(() => {
          this.deleteModel(item);
        })
        .catch(() => {});
    },
    // Xóa bản ghi
    deleteModel(item) {
      if (this.garage_id == item.id) {
        this.changeGarageId(null);
      }
      axios.delete("transporter/children/" + item.id).then((response) => {
        switch (response.code) {
          case 200:
            this.$notify({
              title: "Thành công",
              message: "Xóa bản ghi thành công",
              type: "success",
            });
            this.fetchTransporterChild();
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
    "modelData.phone_number": function () {
      let reg = new RegExp("^[0-9]+$");
      let result = reg.test(this.modelData.phone_number);
      if (!result && this.modelData.phone_number) {
        this.$message.error("Số điện thoại sai định dạng");
      }
    },
  },
};
</script>

<style lang="css" scoped>
.btn-add-delivery-garage-888 {
  font-weight: 400;
  font-size: 14px;
  color: #2196f3;
  cursor: pointer;
  padding-top: 5px;
}
.btn-add-delivery-garage-888:hover {
  opacity: 0.8;
}

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
  min-width: 100px;
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

/*item-common-9012-line*/
.item-common-9012-line {
  display: flex;
  margin-bottom: 10px;
}

.create-delivery-dialog-882-sub-title {
  font-weight: 500;
}
</style>
