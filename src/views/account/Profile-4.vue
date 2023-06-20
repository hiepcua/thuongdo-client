<template>
  <div class="frame-content-common-2022 account-profile d-flex">
    <div class="account-profile-info">
      <BreadcrumbTop text1="Thông tin cá nhân" />
      <div class="fix-25092022">
        <div class="account-profile-info-item-1">
          <div class="info-wrap-title">
            <span>Thông tin cá nhân</span>
          </div>
          <div class="info-wrap-line">
            <span class="label-1">Mã tài khoản *</span>
            <div>
              <span class="label-2">{{ accountInfoTemp.code }}</span>
            </div>
          </div>
          <div class="info-wrap-line">
            <span class="label-1">Họ và tên *</span>
            <div>
              <span class="label-2">{{ accountInfoTemp.name }}</span>
            </div>
          </div>
          <div class="info-wrap-line">
            <span class="label-1">E-mail *</span>
            <div>
              <span class="label-2">{{ accountInfoTemp.email }}</span>
            </div>
          </div>
          <div class="info-wrap-line">
            <span class="label-1">Số điện thoại *</span>
            <div>
              <span class="label-2">{{ accountInfoTemp.phone_number }}</span>
            </div>
          </div>
          <div class="info-wrap-line">
            <span class="label-1">Kho nhận hàng</span>
            <div>
              <el-select
                v-model="accountInfoTemp.warehouse_id"
                placeholder="Chọn kho nhận hàng"
                class="frame-select-common-2022 account-profile-select-warehouse"
                popper-class="frame-select-popper-common-2022"
                size="mini"
              >
                <el-option
                  v-for="item in listWarehouse"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                >
                </el-option>
              </el-select>
            </div>
          </div>
          <div class="info-wrap-line">
            <span class="label-1">Dịch vụ</span>
            <div>
              <el-select
                v-model="accountInfoTemp.service"
                placeholder="Chọn dịch vụ"
                class="frame-select-common-2022 account-profile-select-warehouse"
                popper-class="frame-select-popper-common-2022"
                size="mini"
              >
                <el-option
                  v-for="item in services"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </div>
          </div>
          <div class="info-wrap-line">
            <span class="label-1">Ngày sinh</span>
            <div>
              <el-select
                v-model="day"
                placeholder="Ngày"
                class="frame-select-common-2022 account-profile-select-bod"
                popper-class="frame-select-popper-common-2022"
                clearable
                size="mini"
              >
                <el-option
                  v-for="item in days"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
              <el-select
                v-model="month"
                placeholder="Tháng"
                class="frame-select-common-2022 account-profile-select-bod"
                popper-class="frame-select-popper-common-2022"
                clearable
                size="mini"
              >
                <el-option
                  v-for="item in months"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
              <el-select
                v-model="year"
                placeholder="Năm"
                class="frame-select-common-2022 account-profile-select-bod"
                popper-class="frame-select-popper-common-2022"
                clearable
                size="mini"
              >
                <el-option
                  v-for="item in years"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </div>
          </div>
          <div class="info-wrap-line">
            <span class="label-1">Giới tính</span>
            <el-radio-group v-model="accountInfoTemp.gender">
              <el-radio label="male">Nam</el-radio>
              <el-radio label="female">Nữ</el-radio>
              <el-radio label="undetermined">Khác</el-radio>
            </el-radio-group>
          </div>
          <div class="btn-update-info-customer-192" @click="submitForm()">
            <span v-if="!canSubmit"><i class="el-icon-loading"></i></span>
            <span v-else>Cập nhật thông tin</span>
          </div>
        </div>
        <div class="account-profile-address-delivery-819" v-loading="loading">
          <div
            class="title-wrap d-flex justify-content-between align-items-center"
          >
            <span class="title-1">Địa chỉ nhận hàng</span>
            <span class="title-2" @click="addDelivery"
              >+ Thêm địa chỉ nhận hàng</span
            >
          </div>
          <div
            class="list-delivery"
            v-if="listDelivery.length > 0 && loading == false"
          >
            <div
              class="list-delivery-item d-flex align-items-center"
              v-for="item in listDelivery"
              :key="item.id"
            >
              <img
                src="@/static/icon/account/checked.svg"
                alt=""
                v-if="item.is_default"
              />
              <img src="@/static/icon/account/no-checked.svg" alt="" v-else />
              <span class="address">{{ item.name }}</span>
              <div class="action-wrap-192s8">
                <span
                  class="btn-action-delivery btn-action-default"
                  v-if="item.is_default"
                  >Mặc định</span
                >
                <span
                  class="btn-action-delivery btn-action-add-default"
                  @click="updateDelivery(item.id)"
                  v-if="!item.is_default"
                  >Đặt mặc định</span
                >
                <span
                  class="btn-action-delivery btn-action-update"
                  v-if="item.is_default"
                  @click="addDelivery2(item)"
                  >Sửa</span
                >
                <span
                  class="btn-action-delivery btn-action-delete"
                  @click="deleteDelivery(item)"
                  >Xóa</span
                >
              </div>
            </div>
          </div>
          <div
            class="list-delivery-none d-flex justify-content-center pt-4"
            v-if="listDelivery.length == 0 && loading == false"
          >
            <span>Không có địa chỉ nào !!</span>
          </div>
        </div>
      </div>
    </div>
    <div class="account-profile-sub-info">
      <img class="background" src="@/static/images/account/group-3.svg" />
      <div class="account-profile-sub-info-data text-center">
        <div class="image">
          <img :src="accountInfo.avatar" v-if="accountInfo.avatar" />
          <img src="@/static/images/account/avatar2.svg" v-else />
          <div class="add-image-91" @click="selectImage">
            <span v-if="loadingImage"><i class="el-icon-loading"></i></span>
            <span v-else>Chọn ảnh</span>
          </div>
        </div>
        <div class="name">
          <span>{{ accountInfo.name }}</span>
        </div>
        <div class="balance">
          <span class="line-1">{{ accountInfo.order_amount | number }}</span>
          <span class="line">/</span>
          <span>{{ accountInfo.level_milestone | number }}</span>
        </div>
        <div class="star">
          <img src="@/static/images/account/star-fill.svg" />
          <img src="@/static/images/account/star-fill.svg" />
          <img src="@/static/images/account/star-fill.svg" />
          <img src="@/static/images/account/star-fill.svg" />
          <img src="@/static/images/account/star-fill.svg" />
        </div>
        <div class="phone d-flex align-items-center">
          <img src="@/static/images/account/phone.svg" />
          <span>{{ accountInfo.phone_number }}</span>
        </div>
        <div class="phone d-flex align-items-center">
          <img src="@/static/images/account/email.svg" />
          <span>{{ accountInfo.email }}</span>
        </div>
        <div class="sologan d-flex flex-column">
          <span class="d-none">Yêu cái đẹp, ghét sự giả dối</span>
          <span class="d-none">Tháng kiếm trăm củ</span>
        </div>
      </div>
    </div>
    <div class="account-profile-create-address">
      <el-dialog
        title="Cập nhật địa chỉ nhận hàng"
        custom-class="account-profile-create-address-dialog-12829"
        :close-on-click-modal="false"
        :visible.sync="dialogTableVisible2"
      >
        <div class="address-dialog-12829-item">
          <span>Họ và tên *</span>
          <el-input
            placeholder="Họ và tên"
            v-model="deliveryAdd.receiver"
            class="frame-input-common-2022"
            size="mini"
            clearable
          ></el-input>
        </div>
        <div class="address-dialog-12829-item">
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
        <div class="address-dialog-12829-item">
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
        <div class="address-dialog-12829-item">
          <span>Địa chỉ chi tiết *</span>
          <el-input
            placeholder="Địa chỉ chi tiết"
            v-model="deliveryAdd.address"
            class="frame-input-common-2022"
            size="mini"
            clearable
          ></el-input>
        </div>
        <div class="d-flex justify-content-end pt-3 pb-3">
          <div
            class="btn-add-address-in-profile-9262"
            @click="submitAddressDelivery2"
          >
            <span v-if="!canSubmit"><i class="el-icon-loading"></i></span>
            <span v-else>Cập nhật địa chỉ</span>
          </div>
        </div>
      </el-dialog>
    </div>
    <div class="account-profile-create-address">
      <el-dialog
        title="Thêm địa chỉ nhận hàng"
        custom-class="account-profile-create-address-dialog-12829"
        :close-on-click-modal="false"
        :visible.sync="dialogTableVisible"
      >
        <div class="address-dialog-12829-item">
          <span>Họ và tên *</span>
          <el-input
            placeholder="Họ và tên"
            v-model="deliveryAdd.receiver"
            class="frame-input-common-2022"
            size="mini"
            clearable
          ></el-input>
        </div>
        <div class="address-dialog-12829-item">
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
        <div class="address-dialog-12829-item">
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
        <div class="address-dialog-12829-item">
          <span>Địa chỉ chi tiết *</span>
          <el-input
            placeholder="Địa chỉ chi tiết"
            v-model="deliveryAdd.address"
            class="frame-input-common-2022"
            size="mini"
            clearable
          ></el-input>
        </div>
        <div class="d-flex justify-content-end pt-3 pb-3">
          <div
            class="btn-add-address-in-profile-9262"
            @click="submitAddressDelivery"
          >
            <span v-if="!canSubmit"><i class="el-icon-loading"></i></span>
            <span v-else>+ Thêm địa chỉ</span>
          </div>
        </div>
      </el-dialog>
    </div>
    <div>
      <input
        type="file"
        class="upload-avatar"
        id="file"
        ref="file"
        v-on:change="handleFileUpload()"
      />
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { mapActions, mapGetters } from "vuex";
import BreadcrumbTop from "@/components/BreadcrumbTop";
export default {
  name: "AccountProfile",
  metaInfo() {
    return {
      title: "Thông tin tài khoản",
    };
  },
  components: {
    BreadcrumbTop,
  },
  data() {
    return {
      canSubmit: true,
      loading: false,
      loadingImage: false,
      avatar: "",
      day: "",
      month: "",
      year: "",
      days: [],
      months: [],
      years: [],
      listDelivery: [],

      // Phần thêm địa chỉ nhận hàng
      dialogTableVisible: false,
      listProvince: [],
      listDistrict: [],
      deliveryAdd: {
        receiver: "",
        phone_number: "",
        province_id: "",
        district_id: "",
        address: "",
      },

      // Thêm ảnh
      file: "",
      link_image_path: "",

      // Phần update
      dialogTableVisible2: false,
      loadDone: false,

      // Phần thêm kho chọn và loại khách
      listWarehouse: [],
      services: [
        {
          value: 1,
          label: "Ký gửi",
        },
        {
          value: 0,
          label: "Đặt hàng",
        },
      ],

      // Phần accountInfoTemp
      accountInfoTemp: {},
    };
  },
  computed: {
    ...mapGetters("account", ["accountInfo"]),
  },
  mounted() {
    this.configData();
    this.configDate();
    this.fetchDelivery();
    this.fetchWarehouse();
  },
  methods: {
    ...mapActions("account", ["getAccountInfo"]),
    configData() {
      this.accountInfoTemp = JSON.parse(JSON.stringify(this.accountInfo));
      if (this.accountInfoTemp.gender == null) {
        this.accountInfoTemp.gender = "undetermined";
      }
      if (this.accountInfoTemp.bod == undefined) {
        this.accountInfoTemp.bod = "1990-05-05";
      }
      if (this.accountInfoTemp.bod !== null) {
        let splitted = this.accountInfoTemp.bod.split("-");
        this.year = splitted[0];
        this.month = splitted[1];
        this.day = splitted[2];
      }
    },
    configDate() {
      for (let i = 1; i <= 31; i++) {
        let value = i;
        if (i < 10) {
          value = "0" + i;
        }
        let temp = {
          value: value,
          label: i,
        };
        this.days.push(temp);
      }
      for (let i = 1; i <= 12; i++) {
        let value = i;
        if (i < 10) {
          value = "0" + i;
        }
        let temp = {
          value: value,
          label: i,
        };
        this.months.push(temp);
      }
      for (let i = 1950; i <= 2020; i++) {
        let temp = {
          value: i,
          label: i,
        };
        this.years.push(temp);
      }
    },
    fetchDelivery() {
      this.loading = true;
      axios.get("customer/delivery").then((response) => {
        this.loading = false;
        switch (response.code) {
          case 200:
            this.listDelivery = response.data;
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
    fetchWarehouse() {
      this.loading = true;
      axios.get("warehouse/vi").then((response) => {
        this.loading = false;
        switch (response.code) {
          case 200:
            this.listWarehouse = response.data;
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
    submitForm() {
      if (this.canSubmit == false) {
        return;
      }
      this.canSubmit = false;
      let data = {
        gender: this.accountInfoTemp.gender,
        service: this.accountInfoTemp.service,
        warehouse_id: this.accountInfoTemp.warehouse_id,
      };

      if (this.day !== "" || this.month !== "" || this.year !== "") {
        data.bod = this.year + "-" + this.month + "-" + this.day;
      }

      if (this.avatar) {
        data.avatar = this.avatar;
      }

      axios.put("customer", data).then((response) => {
        this.canSubmit = true;
        switch (response.code) {
          case 200:
            this.$notify({
              title: "Thành công",
              message: "Cập nhật thành công",
              type: "success",
            });
            this.getAccountInfo();
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
    updateDelivery(id) {
      this.$confirm("Thiết lập địa chỉ này là địa chỉ mặc định", "Cảnh báo", {
        confirmButtonText: "Đồng ý",
        cancelButtonText: "Hủy",
        type: "warning",
      })
        .then(() => {
          this.updateDeliveryAction(id);
        })
        .catch(() => {});
    },
    updateDeliveryAction(id) {
      this.loading = true;
      let data = {
        customer_delivery_id: id,
      };
      axios.put("customer", data).then((response) => {
        this.loading = false;
        switch (response.code) {
          case 200:
            this.$notify({
              title: "Thành công",
              message: "Cập nhật thành công",
              type: "success",
            });
            this.fetchDelivery();
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

    addDelivery() {
      this.dialogTableVisible = true;
      this.deliveryAdd.receiver = "";
      this.deliveryAdd.phone_number = "";
      this.deliveryAdd.province_id = "";
      this.deliveryAdd.district_id = "";
      this.deliveryAdd.address = "";
      this.fetchProvince();
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
      axios.post("/customer/delivery", this.deliveryAdd).then((response) => {
        this.canSubmit = true;
        switch (response.code) {
          case 200:
            this.$notify({
              title: "Thành công",
              message: "Thêm mới thành công",
              type: "success",
            });
            this.dialogTableVisible = false;
            this.deliveryAdd.receiver = "";
            this.deliveryAdd.phone_number = "";
            this.deliveryAdd.province_id = "";
            this.deliveryAdd.district_id = "";
            this.deliveryAdd.address = "";
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

    addDelivery2(item) {
      this.dialogTableVisible2 = true;
      this.deliveryAdd = JSON.parse(JSON.stringify(item));
      this.fetchProvince();
      this.fetchDistrict();
    },
    submitAddressDelivery2() {
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
              this.dialogTableVisible2 = false;
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

    // Xử lý upload ảnh
    selectImage(pack) {
      this.packClick = pack;
      document.getElementById("file").click();
    },
    handleFileUpload() {
      this.file = this.$refs.file.files[0];
      let file = this.file;
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isLt2M) {
        this.$message.error("Dung lượng file tối đa là 2M");
        return;
      }
      let typeFile = file["type"];
      let arr_type = ["image/jpeg", "image/png", "image/jpg"];
      if (!arr_type.includes(typeFile)) {
        this.$message.error("Chỉ được upload file ảnh");
        return;
      }
      this.submitFile();
    },
    async submitFile() {
      this.loadingImage = true;
      let formData = new FormData();
      formData.append("files[]", this.file);
      fetch(process.env.VUE_APP_API_ADMIN_URL + "media/upload", {
        method: "POST",
        body: formData,
      })
        .then((response) => response.json())
        .then((result) => {
          this.loadingImage = false;
          this.avatar = result.data[0].path;
          this.accountInfo.avatar =
            process.env.VUE_APP_IMAGE_URL + result.data[0].path;
          this.submitForm();
        })
        .catch(() => {
          this.packClick.loading = false;
          this.$notify.error({
            title: "Error",
            message: "Đã có lỗi xảy ra. Vui lòng liên hệ Admin !",
          });
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
    accountInfo: function () {
      this.configData();
    },
  },
};
</script>

<style lang="css" scoped>
.account-profile-sub-info {
  width: 280px;
  position: relative;
}
.account-profile-sub-info img.background {
  width: 100%;
}
.account-profile-sub-info-data {
  position: absolute;
  width: 100%;
  min-height: 500px;
  z-index: 1;
  top: 0px;
}
.account-profile-sub-info-data .image {
  padding-top: 25px;
  padding-bottom: 20px;
  position: relative;
}
.account-profile-sub-info-data .image img {
  width: 180px;
  height: 180px;
  border-radius: 50%;
  object-fit: cover;
}
.account-profile-sub-info-data .add-image-91 {
  position: absolute;
  bottom: 45px;
  left: calc(50% - 44px);
  width: 80px;
  padding: 5px;
  background-color: #2196f3;
  color: #fff;
  cursor: pointer;
  user-select: none;
}
.account-profile-sub-info-data .add-image-91:hover {
  opacity: 0.8;
}
.account-profile-sub-info-data .name {
  font-size: 30px;
  color: #fff;
}
.account-profile-sub-info-data .balance {
  margin-bottom: 10px;
  margin-top: 10px;
  font-size: 12px;
  color: #fff;
}
.account-profile-sub-info-data .balance .line-1 {
  color: #f1c330;
}
.account-profile-sub-info-data .balance .line {
  margin: 0px 4px;
}
.account-profile-sub-info-data .star {
  margin-bottom: 25px;
}
.account-profile-sub-info-data .star img {
  margin-right: 3px;
  width: 12px;
}
.account-profile-sub-info-data .phone {
  text-align: left;
  padding-left: 35px;
  padding-bottom: 12px;
}
.account-profile-sub-info-data .phone span {
  color: #fff;
  margin-left: 10px;
  font-size: 12px;
}
.account-profile-sub-info-data .sologan {
  font-size: 12px;
  color: #fff;
  margin-top: 15px;
}
.account-profile-sub-info-data .sologan span {
  margin-bottom: 5px;
}

/*.account-profile-info*/
.account-profile-info {
  background-color: #fff;
  margin-right: 20px;
  margin-right: 0px;
  flex: 1;
  padding: 20px 20px 20px 50px;
  padding: 0px 0px 20px 0px;
  min-height: 500px;
}
.fix-25092022 {
  padding-left: 30px;
  padding-right: 20px;
}
.account-profile-info-item-1 {
  padding: 0px 5px 0px 5px;
  border-bottom: 1px solid rgba(180, 180, 180, 0.25);
  min-height: 300px;
}
.info-wrap-title span {
  font-size: 25px;
  text-transform: uppercase;
  font-style: normal;
  font-weight: 500;
  font-weight: 700;
  font-size: 16px;
  line-height: 16px;
  letter-spacing: 0.02em;
  color: #2196f3;
  margin-bottom: 12px;
  margin-top: 12px;
  display: inline-block;
}
.info-wrap-line {
  display: flex;
  align-items: center;
  margin-top: 12px;
}
.info-wrap-line .label-1 {
  min-width: 150px;
  font-size: 13px;
  font-weight: 400;
  font-weight: 500;
  margin-top: 7px;
  margin-bottom: 7px;
  color: #575757;
  letter-spacing: 0.02em;
}
.info-wrap-line .label-2 {
  font-weight: 400;
  font-size: 14px;
  line-height: 16px;
  letter-spacing: 0.02em;
  color: #575757;
}

.btn-update-info-customer-192 {
  background: #26b01c;
  border-radius: 4px;
  width: 220px;
  height: 40px;
  color: #fff;
  margin-top: 20px;
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-transform: uppercase;
  font-weight: 400;
  font-size: 13px;
  letter-spacing: 0.02em;
  cursor: pointer;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  -o-user-select: none;
  user-select: none;
}
.btn-update-info-customer-192:hover {
  opacity: 0.9;
}
.btn-update-info-customer-192:active {
  background: #229f19;
}

.account-profile-address-delivery-819 {
  padding: 20px 5px 10px 5px;
  min-height: 200px;
}
.account-profile-address-delivery-819 .title-wrap {
  margin-bottom: 22px;
}
.account-profile-address-delivery-819 .title-1 {
  font-weight: 500;
  font-weight: 700;
  font-size: 14px;
  line-height: 16px;
  letter-spacing: 0.02em;
  color: #575757;
}
.account-profile-address-delivery-819 .title-2 {
  color: #1771c1;
  cursor: pointer;
}
.list-delivery-item {
  margin-bottom: 10px;
  margin-bottom: 15px;
}
.list-delivery-item img {
  margin-right: 5px;
}
.list-delivery-item .address {
  font-size: 13px;
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
.action-wrap-192s8 {
  min-width: 205px;
  justify-content: flex-start;
  display: flex;
  align-items: center;
}

/*Dialog nhập thêm mới sản phẩm*/
.address-dialog-12829-item {
  display: flex;
  padding: 5px 20px;
  align-items: center;
}
.address-dialog-12829-item span {
  min-width: 100px;
}

.btn-add-address-in-profile-9262 {
  margin-right: 20px;
  padding: 7px 30px;
  background-color: #2196f3;
  border-radius: 4px;
  color: #fff;
  font-size: 12px;
  cursor: pointer;
  user-select: none;
}
.btn-add-address-in-profile-9262:hover {
  opacity: 0.8;
}

/*Ô input upload ảnh*/
.upload-avatar {
  display: none;
}
.image-loading {
  height: 103px;
}
.img89 {
  object-fit: cover;
  height: 103px;
  display: inline-block;
  max-width: 100%;
}
</style>

<style type="text/css">
.account-profile .el-radio__label {
  font-weight: 300;
  font-weight: 400;
  font-size: 14px;
  line-height: 16px;
  letter-spacing: 0.02em;
  color: #575757;
}
.account-profile-select-bod {
  width: 90px;
  margin-right: 10px;
}

.account-profile-create-address-dialog-12829 .el-dialog__body {
  padding: 0px;
}
.account-profile-select-city {
  margin-right: 10px;
}
.account-profile-create-address-dialog-12829 .el-dialog__title {
  font-weight: 700;
  font-size: 16px;
  line-height: 16px;
  letter-spacing: 0.02em;
  text-transform: uppercase;
  color: #2196f3;
}

.account-profile-select-warehouse {
  width: 400px;
}
</style>
