<template>
  <div class="frame-content-common-2022 order-create">
    <BreadcrumbTop text1="Tạo đơn order" />
    <div class="order-create-alert d-flex flex-column align-items-center">
      <span class="line"
        >Nếu bạn mua hàng từ nguồn Taobao.com, Tmall.com và 1688.com, bạn nên sử
        dụng cách đặt hàng bằng</span
      >
      <span class="line"
        ><a
          href="https://chrome.google.com/webstore/detail/th%C6%B0%C6%A1ng-%C4%91%C3%B4-logistics-c%C3%B4ng/hdjjpocjionoehcnlohaefadonpidelg?hl=vi"
          target="_blank"
          >công cụ đặt hàng của Thương Đô</a
        >
        sẽ tiện lợi và tốt nhất.</span
      >
      <span class="line"
        >Cách đặt hàng dưới đây <span class="red">chỉ áp dụng</span> cho những
        đơn hàng từ những trang khác như : Jd.com, Alibaba.com,
        AliExpress.com,...</span
      >
    </div>
    <div class="order-create-table-wrap-1993" id="containerDiv">
      <div class="table-create-order-v1-1802">
        <div class="title-wrap d-flex">
          <div class="icon-item icon-item-stt icon-first"></div>
          <div class="icon-item icon-190">
            <span>Hình ảnh</span>
          </div>
          <div class="icon-item">
            <span>Thuộc tính</span>
          </div>
          <div class="icon-item icon-150">
            <span>Đơn giá (¥)</span>
          </div>
          <div class="icon-item icon-150">
            <span>Số lượng</span>
          </div>
          <div class="icon-item icon-150 icon-last">
            <span>Thành tiền</span>
          </div>
        </div>
        <div
          class="line-wrap d-flex"
          v-for="(pack, index) in listOrder"
          :key="pack.key"
        >
          <div class="icon-item icon-item-stt">
            <div class="d-flex flex-column">
              <span class="count">{{ index + 1 }}</span>
              <span class="delete-2917621" @click="removePack(pack)">Xóa</span>
            </div>
          </div>
          <div class="icon-item icon-190 d-flex flex-column align-items-center">
            <div
              class="icon-add-image"
              @click="selectImage(pack)"
              v-if="pack.loading == false"
            >
              <img
                v-if="pack.image_path == ''"
                src="@/static/icon/order-create/addv2.svg"
                alt=""
                :class="[pack.image_err ? 'error-data-1988 a90' : '']"
              />
              <img
                v-else
                :src="pack.image_path"
                @error="imageLoadError"
                @load="onImgLoad"
                alt=""
                class="img89"
              />
            </div>
            <div
              v-else
              class="image-loading d-flex justify-content-center align-items-center"
            >
              <i class="el-icon-loading"></i>
            </div>
            <div class="icon-add-link" @click="addLinkImage(pack)">
              <span>Link ảnh</span>
            </div>
          </div>
          <div class="icon-item">
            <div class="attribute-input">
              <el-input
                placeholder="Tên sản phẩm (ghi Tiếng Việt)"
                maxlength="256"
                v-model="pack.name"
                class="frame-input-common-2022"
                size="mini"
                clearable
                :class="[pack.name_err ? 'error-data-1988' : '']"
              ></el-input>
            </div>
            <div class="attribute-input">
              <el-input
                placeholder="Link sản phẩm"
                v-model="pack.url"
                class="frame-input-common-2022"
                size="mini"
                clearable
                :class="[pack.url_err ? 'error-data-1988' : '']"
              ></el-input>
            </div>
            <div class="attribute-input">
              <el-input
                placeholder="Nhà cung cấp"
                v-model="pack.supplier"
                class="frame-input-common-2022"
                size="mini"
                clearable
                :class="[pack.supplier_err ? 'error-data-1988' : '']"
              ></el-input>
            </div>
            <div class="attribute-input">
              <el-select
                v-model="pack.category_id"
                filterable
                placeholder="Chọn danh mục sản phẩm"
                class="frame-select-common-2022 order-create-select-category"
                popper-class="frame-select-popper-common-2022"
                :class="[pack.category_id_err ? 'error-data-1988' : '']"
              >
                <el-option
                  v-for="item in listCategory"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                >
                </el-option>
              </el-select>
            </div>
            <div class="attribute-input">
              <el-input
                type="textarea"
                :rows="4"
                placeholder="Ghi chú sản phẩm: màu sắc, kích thước ..."
                v-model="pack.note"
                class="frame-input-common-2022"
                size="mini"
                clearable
                :class="[pack.note_err ? 'error-data-1988' : '']"
              ></el-input>
            </div>
          </div>
          <div class="icon-item icon-150">
            <el-input
              v-model="pack.unit_price_cny"
              type="number"
              size="mini"
              :class="[pack.unit_price_cny_err ? 'error-data-1988' : '']"
            ></el-input>
          </div>
          <div class="icon-item icon-150">
            <el-input-number
              v-model="pack.quantity"
              :min="1"
              :max="10000"
              size="mini"
              :class="[pack.quantity_err ? 'error-data-1988' : '']"
            ></el-input-number>
          </div>
          <div class="icon-item icon-150">
            <span class="order-create-money"
              >{{
                (pack.quantity * pack.unit_price_cny * configList.exchange_rate)
                  | number
              }}
              đ</span
            >
          </div>
        </div>
      </div>
      <div class="order-create-add-item-182x" @click="addPack">
        <span>+ Thêm sản phẩm</span>
      </div>
    </div>
    <div class="order-create-transport-option">
      <div class="wrap-1 d-flex flex-row">
        <span class="title-912">Vận chuyển</span>
        <div class="item-common item-radio" @click="delivery_type = 'fast'">
          <img
            src="@/static/icon/account/checked.svg"
            alt=""
            v-if="delivery_type == 'fast'"
          />
          <img src="@/static/icon/account/no-checked.svg" alt="" v-else />
          <span>Nhanh</span>
        </div>
        <div class="item-common item-radio" @click="delivery_type = 'normal'">
          <img
            src="@/static/icon/account/checked.svg"
            alt=""
            v-if="delivery_type == 'normal'"
          />
          <img src="@/static/icon/account/no-checked.svg" alt="" v-else />
          <span>Thường</span>
        </div>
        <span class="title-912 title-912-v2">Dịch vụ khác</span>
        <div
          class="item-common item-checkbox"
          @click="is_inspection = !is_inspection"
        >
          <img
            src="@/static/icon/order-create/checked.svg"
            alt=""
            v-if="is_inspection"
          />
          <img src="@/static/icon/order-create/no-checked.svg" alt="" v-else />
          <span>Kiểm hàng</span>
        </div>
        <div
          class="item-common item-checkbox"
          @click="is_woodworking = !is_woodworking"
        >
          <img
            src="@/static/icon/order-create/checked.svg"
            alt=""
            v-if="is_woodworking"
          />
          <img src="@/static/icon/order-create/no-checked.svg" alt="" v-else />
          <span>Đóng gỗ</span>
        </div>
        <div class="item-common item-checkbox" @click="is_tax = !is_tax">
          <img
            src="@/static/icon/order-create/checked.svg"
            alt=""
            v-if="is_tax"
          />
          <img src="@/static/icon/order-create/no-checked.svg" alt="" v-else />
          <span>Khai thuế</span>
        </div>
      </div>
    </div>
    <div class="order-create-warehouse-and-price">
      <el-row class="d-flex">
        <el-col :span="16">
          <div class="warehouse">
            <warehouse-take
              @changeWareHouseId="changeWareHouseIdParent"
            ></warehouse-take>
          </div>
          <div class="warehouse">
            <address-take
              @changeAddressId="changeAddressIdParent"
            ></address-take>
          </div>
        </el-col>
        <el-col :span="8" class="d-flex">
          <price-take :priceTotal="priceTotal"></price-take>
        </el-col>
      </el-row>
    </div>
    <div class="d-flex justify-content-end pt-3 pr-3">
      <div class="frame-btn-create-x-2022" @click="submitForm()">
        <span v-if="!canSubmit"><i class="el-icon-loading"></i></span>
        <span v-else>Gửi đơn đặt hàng</span>
      </div>
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
    <div>
      <el-dialog
        title="Link ảnh sản phẩm"
        :visible.sync="dialogFormVisible"
        :close-on-click-modal="false"
      >
        <el-input
          placeholder="Nhập link ảnh sản phẩm"
          v-model="link_image_path"
          class="frame-input-common-2022"
          size="mini"
          clearable
        >
        </el-input>
        <span slot="footer" class="dialog-footer">
          <el-button size="mini" @click="dialogFormVisible = false"
            >Hủy</el-button
          >
          <el-button size="mini" type="primary" @click="addLinkImageAction()"
            >Xác nhận</el-button
          >
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { mapGetters } from "vuex";
import WarehouseTake from "@/components/WarehouseTake";
import AddressTake from "@/components/AddressTake";
import PriceTake from "@/components/PriceTake";
import BreadcrumbTop from "@/components/BreadcrumbTop";
export default {
  name: "CreateOrder",
  components: {
    WarehouseTake,
    AddressTake,
    PriceTake,
    BreadcrumbTop,
  },
  metaInfo() {
    return {
      title: "Tạo đơn hàng",
    };
  },
  data() {
    return {
      canSubmit: true,
      delivery_type: "normal",
      is_inspection: false,
      is_woodworking: false,
      is_tax: false,
      warehouse_id: "",
      customer_delivery_id: "",
      listOrder: [
        {
          key: 1,
          loading: false,
          name: "",
          url: "",
          image: "",
          image_path: "",
          note: "",
          unit_price_cny: "",
          quantity: "",
          amount_cny: "",
          supplier: "",
          category_id: "",

          name_err: false,
          url_err: false,
          image_err: false,
          image_path_err: false,
          note_err: false,
          unit_price_cny_err: false,
          quantity_err: false,
          amount_cny_err: false,
          supplier_err: false,
          category_id_err: false,
        },
      ],
      packClick: {},
      file: "",
      dialogFormVisible: false,
      link_image_path: "",

      // Tính toán
      priceTotal: {
        total_amount_cny: 0,
        fee_order: 0,
        total_amount_cny_not_ship: 0,
      },

      // Chặn
      startAddPack: false,
      time88: 0,

      // Thêm phần danh mục
      listCategory: [],
    };
  },
  computed: {
    ...mapGetters("account", ["configList"]),
  },
  mounted() {
    this.startAddPack = false;
    setTimeout(() => {
      this.time88 = 1;
    }, 1000);

    this.fetchCategory();
  },
  methods: {
    fetchCategory() {
      axios.get("category").then((response) => {
        switch (response.code) {
          case 200:
            this.listCategory = response.data;
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
      this.packClick.loading = true;
      let formData = new FormData();
      formData.append("files[]", this.file);
      fetch(process.env.VUE_APP_API_ADMIN_URL + "media/upload", {
        method: "POST",
        body: formData,
      })
        .then((response) => response.json())
        .then((result) => {
          this.packClick.loading = false;
          this.packClick.image = result.data[0].path;
          this.packClick.image_path =
            process.env.VUE_APP_IMAGE_URL + result.data[0].path;
        })
        .catch(() => {
          this.packClick.loading = false;
          this.$notify.error({
            title: "Error",
            message: "Đã có lỗi xảy ra. Vui lòng liên hệ Admin !",
          });
        });
    },
    checkURL(url) {
      return url.match(/\.(jpeg|jpg|gif|png)$/) != null;
    },
    imageLoadError() {
      this.$message({
        message: "Không thể tải được ảnh",
        type: "warning",
      });
    },
    onImgLoad() {},

    addLinkImage(pack) {
      this.packClick = pack;
      this.dialogFormVisible = true;
    },
    async addLinkImageAction() {
      if (this.link_image_path == "") {
        this.$message({
          message: "Vui lòng nhập link ảnh",
          type: "warning",
        });
        return;
      }
      try {
        const response = await fetch(this.link_image_path);
        const blob = await response.blob();
        const file = new File([blob], "image.jpg", { type: blob.type });
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

        this.file = file;
        this.submitFile();

        this.packClick.image = this.link_image_path;
        this.packClick.image_path = this.link_image_path;
        this.link_image_path = "";
        this.dialogFormVisible = false;
      } catch {
        this.$message.error(
          "Không thể tải ảnh này, vui lòng upload ảnh theo cách thông thường"
        );
      }
    },

    addPack() {
      this.listOrder.push({
        key: Math.floor(Math.random() * 100000) + 1,
        loading: false,
        name: "",
        url: "",
        image: "",
        image_path: "",
        note: "",
        unit_price_cny: 1,
        quantity: "",
        amount_cny: "",
        supplier: "",
        category_id: "",

        name_err: false,
        url_err: false,
        image_err: false,
        image_path_err: false,
        note_err: false,
        unit_price_cny_err: false,
        quantity_err: false,
        amount_cny_err: false,
        supplier_err: false,
        category_id_err: false,
      });
    },
    removePack(item) {
      this.$confirm("Xác nhận xóa ?", "Cảnh báo", {
        confirmButtonText: "Đồng ý",
        cancelButtonText: "Hủy",
        type: "warning",
      })
        .then(() => {
          var index = this.listOrder.indexOf(item);
          if (index !== -1) {
            this.listOrder.splice(index, 1);
            this.$message.error("Đã xóa thành công");
          }
        })
        .catch(() => {});
    },
    // Check dữ liệu xem có đủ ko
    checkDataPushError() {
      let flag = false;
      this.listOrder.forEach((item) => {
        if (item.name == "") {
          item.name_err = true;
          flag = true;
        }
        if (item.url == "") {
          item.url_err = true;
          flag = true;
        }
        if (item.image == "") {
          item.image_err = true;
          flag = true;
        }
        if (item.image_path == "") {
          item.image_path_err = true;
          flag = true;
        }
        if (item.note == "") {
          item.note_err = true;
          flag = true;
        }
        if (item.unit_price_cny == "") {
          item.unit_price_cny_err = true;
          flag = true;
        }
        if (item.quantity == "") {
          item.quantity_err = true;
          flag = true;
        }
        if (item.supplier == "") {
          item.supplier_err = true;
          flag = true;
        }
        if (item.category_id == "") {
          item.category_id_err = true;
          flag = true;
        }
      });

      return flag;
    },

    // CHọn kho
    changeWareHouseIdParent(id) {
      this.warehouse_id = id;
    },
    changeAddressIdParent(id) {
      this.customer_delivery_id = id;
    },

    // Lưu đơn
    submitForm() {
      if (this.checkDataPushError()) {
        // https://stackoverflow.com/questions/10744299/scroll-back-to-the-top-of-scrollable-div
        document.getElementById("containerDiv").scrollIntoView({
          behavior: "smooth",
          block: "start",
          inline: "nearest",
        });
        this.$notify({
          title: "Vui lòng kiểm tra lại thông tin",
          message: "Vui lòng điền đủ thông tin",
          type: "warning",
        });
        return;
      }

      if (this.canSubmit == false) {
        return;
      }
      this.canSubmit = false;

      let data = {
        delivery_type: this.delivery_type,
        is_inspection: this.is_inspection,
        is_woodworking: this.is_woodworking,
        is_tax: this.is_tax,
        warehouse_id: this.warehouse_id,
        customer_delivery_id: this.customer_delivery_id,
        products: this.listOrder,
      };
      axios.post("order", data).then((response) => {
        this.canSubmit = true;
        switch (response.code) {
          case 200:
            this.$notify({
              title: "Thành công",
              message: "Tạo đơn thành công",
              type: "success",
            });
            this.listOrder = [];
            this.$router.push({ name: "order-list" });
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

    // Xử lý đếm số lượng realtime
    caculaterBag() {
      let total_amount_cny = 0;
      this.listOrder.forEach((item) => {
        if (item.name.length > 255) {
          this.$message.error("Bạn đã nhập quá 255 kí tự");
        }
        if (item.unit_price_cny) {
          if (item.unit_price_cny < 0) {
            item.unit_price_cny = 1;
          }
          if (item.unit_price_cny > 1000000) {
            this.$message.error("Đơn giá tối đa được nhập là 1000000");
            item.unit_price_cny = 1000000;
          }
          total_amount_cny +=
            Number.parseFloat(item.unit_price_cny) *
            item.quantity *
            this.configList.exchange_rate;
        }

        // Validate
        if (item.name) item.name_err = false;
        if (item.url) item.url_err = false;
        if (item.image) item.image_err = false;
        if (item.image_path) item.image_path_err = false;
        if (item.note) item.note_err = false;
        if (item.unit_price_cny) item.unit_price_cny_err = false;
        if (item.quantity) item.quantity_err = false;
        if (item.amount_cny) item.amount_cny_err = false;
        if (item.supplier) item.supplier_err = false;
        if (item.category_id) item.category_id_err = false;
      });
      this.priceTotal.total_amount_cny = total_amount_cny;
      this.priceTotal.total_amount_cny_not_ship = total_amount_cny;
    },
  },
  watch: {
    listOrder: {
      handler: function () {
        this.caculaterBag();
        if (this.time88) {
          this.startAddPack = true;
        }
      },
      deep: true,
    },
  },
  beforeRouteLeave(to, from, next) {
    // Warn Before Leaving a Form vuejs
    // https://stackoverflow.com/questions/45293861/how-do-i-warn-a-user-of-unsaved-changes-before-leaving-a-page-in-vue
    if (this.listOrder.length > 0 && this.startAddPack) {
      this.$confirm(
        "Đơn hàng chưa được lưu, mọi dữ liệu bạn vừa nhập sẽ bị mất, bạn có muốn chuyển hướng không ?",
        "Cảnh báo",
        {
          confirmButtonText: "Đồng ý",
          cancelButtonText: "Hủy",
          type: "warning",
        }
      )
        .then(() => {
          next();
        })
        .catch(() => {
          next(false);
        });
    } else {
      next();
    }
  },
};
</script>

<style lang="css" scoped>
.order-create-alert {
  background: #fde9ea;
  padding: 20px 10px 14px 10px;
}
.order-create-alert .line {
  margin-bottom: 6px;
  font-weight: 300;
}
.order-create-alert a {
  text-decoration: none;
  font-weight: 500;
  color: #1d60a6;
}
.order-create-alert .red {
  color: red;
  font-weight: 500;
  color: #da0606;
}
.order-create-table-wrap-1993 {
  min-height: 200px;
  background-color: #fff;
  padding: 20px;
}

/*Đè table*/
.table-create-order-v1-1802 .icon-item-stt {
  width: 30px;
  flex-grow: initial;
  justify-content: center;
  align-items: center;
  display: flex;
}
.table-create-order-v1-1802 .icon-190 {
  width: 190px;
  flex-grow: initial;
}
.table-create-order-v1-1802 .icon-150 {
  width: 130px;
  flex-grow: initial;
  display: flex;
  justify-content: center;
}

/*Nút thêm*/
.order-create-add-item-182x {
  width: 220px;
  height: 35px;
  margin-top: 25px;
  background: #fe6701;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  cursor: pointer;
  font-size: 12px;
  font-weight: 400;
  text-transform: uppercase;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  -o-user-select: none;
  user-select: none;

  font-weight: 500;
  font-size: 16px;
  line-height: 16px;
  letter-spacing: 0.02em;
  text-transform: uppercase;
  color: #fff;
}
.order-create-add-item-182x:hover {
  opacity: 0.8;
  transition: all 0.3s;
}

/*Nút xóa*/
.delete-2917621 {
  padding-top: 9px;
  display: inline-block;
  cursor: pointer;
}

/*Ô thêm ảnh*/
.icon-add-image {
  cursor: pointer;
}
.icon-add-link {
  margin-top: 8px;
}
.icon-add-link span {
  padding: 5px 30px;
  display: inline-block;
  background-color: #1d60a6;
  color: #fff;
  border-radius: 20px;
  font-size: 10px;
  cursor: pointer;
}
.icon-add-link span:hover {
  opacity: 0.8;
  transition: all 0.3s;
}

/*Ô tiền*/
.order-create-money {
  color: #de2222;
  font-size: 12px;
}

/*Ô thuộc tính*/
.attribute-input {
  margin-bottom: 5px;
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

/*Phần chọn vận chuyển*/
.order-create-transport-option {
  padding: 25px 30px;
  background-color: #fff;
  margin-top: 15px;
  margin-bottom: 15px;
}
.order-create-transport-option .title-912 {
  font-weight: 400;
  margin-right: 34px;
  margin-right: 25px;
  color: #575757;

  font-weight: 500;
  font-weight: 700;
  font-size: 14px;
  line-height: 16px;
  letter-spacing: 0.02em;
  color: #575757;
}
.order-create-transport-option .title-912-v2 {
  margin-left: 60px;
}

.order-create-transport-option .item-common {
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  margin-right: 15px;

  font-weight: 400;
  font-size: 14px;
  line-height: 16px;
  letter-spacing: 0.02em;
  text-transform: capitalize;
  color: #575757;
}
.order-create-transport-option .item-common:hover {
  opacity: 0.8;
  transition: all 0.3s;
}
.order-create-transport-option .item-common img {
  margin-right: 8px;
}

/*Phần order-create-warehouse-and-price*/
.order-create-warehouse-and-price .warehouse {
  margin-bottom: 10px;
  padding-left: 15px;
  background-color: #fff;
}
</style>

<style type="text/css">
/*Xóa cái nút cộng trừ ô nhập tiền*/

/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type="number"] {
  -moz-appearance: textfield;
}

/*Phần hiện lỗi đỏ đỏ*/
.error-data-1988 input {
  border: 1px solid red;
}
.error-data-1988 textarea {
  border: 1px solid red;
}
.error-data-1988.a90 {
  border: 1px solid red;
}

/*Ô nhập danh mục*/
.order-create-select-category {
  width: 100%;
}
.order-create-select-category input {
  height: 32px;
  font-size: 12px;
}
.order-create-select-category .el-input__icon {
  line-height: 32px;
}
</style>
