<template>
  <div class="frame-content-common-2022 consignment-create">
    <BreadcrumbTop text1="Tạo đơn ký gửi" />
    <div class="order-create-table-wrap-1993" id="containerDiv">
      <!--  -->
      <div class="topLeft d-flex">
        <div class="selectCat">
          <el-input
            placeholder="Hãng vận chuyển cho tất cả kiện"
            v-model="input"
            @change="transporterText()"
            clearable
          ></el-input>
        </div>
        <div class="order-create-select-category selectCat">
          <el-select
            v-model="listCategory.id"
            filterable
            placeholder="Danh mục cho tất cả kiện"
            @change="SelectCat()"
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
      </div>
      <!--  -->
      <div class="table-create-order-v1-1802">
        <div class="title-wrap d-flex">
          <div class="icon-item icon-item-stt icon-first">STT</div>
          <div class="icon-item icon-190 iconText">
            <span>Hình ảnh</span>
          </div>
          <div class="icon-item iconText">
            <span>Thông tin hàng hóa</span>
          </div>
          <div class="icon-item iconText">
            <span>Thông số hàng hóa</span>
          </div>
          <div class="icon-item iconText">
            <span>Ghi chú</span>
          </div>
          <div class="icon-item icon-150 icon-last iconText">
            <span>Vận chuyển</span>
          </div>
        </div>
        <div
          class="line-wrap d-flex"
          v-for="(pack, index) in listConsignment"
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
          </div>
          <div class="icon-item iconText">
            <div class="attribute-input">
              <el-input
                placeholder="Tên sản phẩm (ghi Tiếng Việt)"
                maxlength="256"
                v-model="pack.product_name"
                class="frame-input-common-2022"
                size="mini"
                clearable
                :class="[pack.product_name_err ? 'error-data-1988' : '']"
              ></el-input>
            </div>
            <div class="attribute-input">
              <el-input
                placeholder="Mã vận đơn *"
                v-model="pack.bill_code"
                class="frame-input-common-2022"
                size="mini"
                clearable
                :class="[pack.bill_code_err ? 'error-data-1988' : '']"
              ></el-input>
            </div>
            <div class="attribute-input">
              <el-input
                placeholder="Số kiện hàng *"
                v-model="pack.packages_number"
                class="frame-input-common-2022"
                type="number"
                size="mini"
                clearable
                :class="[pack.packages_number_err ? 'error-data-1988' : '']"
              ></el-input>
            </div>
            <div class="attribute-input">
              <el-input
                placeholder="Hãng vận chuyển *"
                v-model="pack.transporter"
                class="frame-input-common-2022"
                size="mini"
                clearable
                :class="[pack.transporter_err ? 'error-data-1988' : '']"
              ></el-input>
            </div>
          </div>
          <div class="icon-item iconText">
            <div class="attribute-input">
              <el-select
                v-model="pack.in_transit"
                placeholder="- Chiều vận chuyển -"
                class="frame-select-common-2022 order-create-select-category"
                popper-class="frame-select-popper-common-2022"
                :class="[pack.in_transit_err ? 'error-data-1988' : '']"
              >
                <el-option
                  :label="pack.in_transit_name"
                  :value="pack.in_transit"
                >
                </el-option>
              </el-select>
            </div>
            <div class="attribute-input">
              <el-select
                v-model="pack.category_id"
                filterable
                placeholder="- Chọn loại danh mục -"
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
                placeholder="Số lượng sản phẩm"
                v-model="pack.quantity"
                class="frame-input-common-2022"
                size="mini"
                clearable
                type="number"
                :class="[pack.quantity_err ? 'error-data-1988' : '']"
              ></el-input>
            </div>
            <div class="attribute-input">
              <el-input
                placeholder="Giá trị hàng hóa * (VNĐ)"
                v-model="pack.order_cost"
                class="frame-input-common-2022"
                size="mini"
                clearable
                type="number"
                :class="[pack.order_cost_err ? 'error-data-1988' : '']"
              >
                <template slot="append">{{ pack.order_cost | vnd }}</template>
              </el-input>
            </div>
          </div>
          <div class="icon-item">
            <div class="attribute-input">
              <el-input
                type="textarea"
                :rows="4"
                placeholder="Link sản phẩm hoặc mô tả chi tiết model, nhãn hiệu, kích thước..."
                v-model="pack.description"
                class="frame-input-common-2022"
                size="mini"
                clearable
                :class="[pack.description_err ? 'error-data-1988' : '']"
              ></el-input>
            </div>
            <div class="attribute-input iconText">
              <el-input
                type="textarea"
                :rows="4"
                placeholder="Ghi chú hàng hóa"
                v-model="pack.note"
                class="frame-input-common-2022"
                size="mini"
                clearable
                :class="[pack.note_err ? 'error-data-1988' : '']"
              ></el-input>
            </div>
          </div>
          <div class="icon-item icon-150 d-flex flex-column">
            <!-- van chuyen  -->
            <div
              class="item-common item-radio d-flex align-items-center"
              @click="pack.delivery_type = 'normal'"
            >
              <img
                src="@/static/icon/account/checked.svg"
                alt=""
                v-if="pack.delivery_type == 'normal'"
              />
              <img src="@/static/icon/account/no-checked.svg" alt="" v-else />
              <span class="pl-2">Thường</span>
            </div>
            <div
              class="item-common item-radio d-flex align-items-center mt-3"
              @click="pack.delivery_type = 'fast'"
            >
              <img
                src="@/static/icon/account/checked.svg"
                alt=""
                v-if="pack.delivery_type == 'fast'"
              />
              <img src="@/static/icon/account/no-checked.svg" alt="" v-else />
              <span class="pl-2">Nhanh</span>
            </div>
            <!--  -->
            <div
              class="item-common item-checkbox d-flex align-items-center mt-4"
              @click="pack.is_insurance = !pack.is_insurance"
            >
              <img
                src="@/static/icon/order-create/checked.svg"
                alt=""
                v-if="pack.is_insurance"
              />
              <img
                src="@/static/icon/order-create/no-checked.svg"
                alt=""
                v-else
              />
              <span class="pl-2">Bảo hiểm</span>
            </div>
            <!--  -->
            <!--  -->
            <div
              class="item-common item-checkbox d-flex align-items-center mt-1"
              @click="pack.is_inspection = !pack.is_inspection"
            >
              <img
                src="@/static/icon/order-create/checked.svg"
                alt=""
                v-if="pack.is_inspection"
              />
              <img
                src="@/static/icon/order-create/no-checked.svg"
                alt=""
                v-else
              />
              <span class="pl-2">Kiểm đếm</span>
            </div>
            <!--  -->
            <!--  -->
            <div
              class="item-common item-checkbox d-flex align-items-center mt-1"
              @click="pack.is_woodworking = !pack.is_woodworking"
            >
              <img
                src="@/static/icon/order-create/checked.svg"
                alt=""
                v-if="pack.is_woodworking"
              />
              <img
                src="@/static/icon/order-create/no-checked.svg"
                alt=""
                v-else
              />
              <span class="pl-2">Đóng gỗ</span>
            </div>
            <!--  -->
            <!--  -->
            <div
              class="item-common item-checkbox d-flex align-items-center mt-1"
              @click="pack.is_shock_proof = !pack.is_shock_proof"
            >
              <img
                src="@/static/icon/order-create/checked.svg"
                alt=""
                v-if="pack.is_shock_proof"
              />
              <img
                src="@/static/icon/order-create/no-checked.svg"
                alt=""
                v-else
              />
              <span class="pl-2">Chống sốc</span>
            </div>
            <!--  -->
          </div>
        </div>
      </div>
      <div
        class="order-create-add-item-182x d-flex align-items-center"
        @click="addPack"
      >
        <span
          class="icon_Plus d-flex justify-content-center align-items-center"
        >
          <i class="el-icon-plus"></i>
        </span>
        <span>Thêm kiện hàng</span>
      </div>
    </div>
    <!-- kho nhận hàng  -->
    <div class="warehouseChina d-flex flex-column">
      <span class="title">Kho nhận hàng Trung Quốc</span>
      <div
        class="item-common item-radio d-flex align-items-center py-1"
        v-for="item in warehouseChina"
        :key="item.id"
        @click="warehouse_cn = item.id"
      >
        <img
          src="@/static/icon/account/checked.svg"
          alt=""
          v-if="warehouse_cn == item.id"
        />
        <img src="@/static/icon/account/no-checked.svg" alt="" v-else />
        <span class="pl-2">{{ item.name }}</span>
      </div>
    </div>
    <!-- kho nhận hàng  -->
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
      </el-row>
    </div>
    <div class="d-flex justify-content-start pt-3 pl-4">
      <div class="frame-btn-create-x-2022" @click="submitForm()">
        <span v-if="!canSubmit"><i class="el-icon-loading"></i></span>
        <span v-else>Tạo đơn ký gửi</span>
      </div>
    </div>
    <div
      class="order-create-alert d-flex flex-column align-items-center mt-4 mx-3"
    >
      <span class="line"
        ><span class="red">Lưu ý</span>: khách hàng cần
        <span class="red">điền đầy đủ thông tin</span> để thuận lợi cho quá
        trình thông quan và phân loại hàng hóa. Thông tin thiếu hoặc</span
      >
      <span class="line"
        >không chính xác, công ty sẽ lưu tại khu vực hàng hóa chưa phân loại của
        công ty và tính phí lưu kho. Quý khách có thể tham khảo</span
      >
      <span class="line"
        >thêm về chính sách và điều kiện về hàng ký gửi
        <a href="">Tại đây</a></span
      >
    </div>
    <div class="yellow mt-4 mx-3">
      <span>DANH SÁCH KHO NHẬN HÀNG TẠI TRUNG QUỐC</span>
    </div>
    <div calss="mx-5">
      <div class="bottomTitle mt-4 mx-5">
        <span class="title d-flex align-items-center py-2"
          ><img
            class="pr-2"
            src="@/static/icon/consignment-create/icon.svg"
            alt=""
          />
          kho đông hưng</span
        >
        <el-row class="content mt-3">
          <el-col :span="4" class="d-flex flex-column text_1">
            <span>Địa chỉ nhận hàng:</span>
            <span>Người nhận:</span>
            <span>Mã bưu điện:</span>
            <span>Số điện thoại:</span>
          </el-col>
          <el-col :span="20" class="d-flex flex-column text_2">
            <span
              >广西壮族自治区 防城港市 东兴市 东兴镇 冲卜一路65号102172</span
            >
            <span>KH102172盛汇代收</span>
            <span>538100</span>
            <span>18587603681</span>
          </el-col>
        </el-row>
      </div>
      <div class="bottomTitle mt-4 mx-5">
        <span class="title d-flex align-items-center py-2"
          ><img
            class="pr-2"
            src="@/static/icon/consignment-create/icon.svg"
            alt=""
          />
          kho quảng châu</span
        >
        <el-row class="content mt-3">
          <el-col :span="4" class="d-flex flex-column text_1">
            <span>Địa chỉ nhận hàng:</span>
            <span>Người nhận:</span>
            <span>Mã bưu điện:</span>
            <span>Số điện thoại:</span>
          </el-col>
          <el-col :span="20" class="d-flex flex-column text_2">
            <span
              >广西壮族自治区 防城港市 东兴市 东兴镇 冲卜一路65号102172</span
            >
            <span>KH102172盛汇代收</span>
            <span>538100</span>
            <span>18587603681</span>
          </el-col>
        </el-row>
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
  </div>
</template>

<script>
import axios from "axios";
import { mapGetters } from "vuex";
import WarehouseTake from "@/components/WarehouseTake";
import AddressTake from "@/components/AddressTake";
import BreadcrumbTop from "@/components/BreadcrumbTop";
export default {
  name: "CreateConsignment",
  components: {
    WarehouseTake,
    AddressTake,
    BreadcrumbTop,
  },
  metaInfo() {
    return {
      title: "Tạo đơn ký gửi",
    };
  },
  data() {
    return {
      input: "",
      checkCategory: false,
      checkDV: false,
      canSubmit: true,
      delivery_type: "normal",
      warehouse_cn: "",
      warehouse_id: null,
      customer_delivery_id: "",
      listConsignment: [
        {
          key: 1,
          loading: false,
          product_name: "",
          image: "",
          image_path: "",
          bill_code: "",
          packages_number: "",
          transporter: "",
          in_transit_name: "Trung quốc - Việt Nam",
          in_transit: "cn-vi",
          category_id: "",
          quantity: "",
          order_cost: "",
          description: "",
          note: "",
          delivery_type: "normal",
          is_insurance: 0,
          is_inspection: 0,
          is_woodworking: 0,
          is_shock_proof: 0,

          product_name_err: false,
          image_err: false,
          image_path_err: false,
          bill_code_err: false,
          packages_number_err: false,
          transporter_err: false,
          in_transit_err: false,
          category_id_err: false,
          quantity_err: false,
          order_cost_err: false,
          description_err: false,
          note_err: false,
          is_insurance_err: false,
        },
      ],
      packClick: {},
      file: "",
      // Chặn
      startAddPack: false,
      time88: 0,

      // Thêm phần danh mục
      listCategory: [],
      warehouseChina: [],
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
    this.fetchwarehouseChina();
  },
  methods: {
    transporterText() {
      this.listConsignment.forEach((item) => {
        item.transporter = this.input;
      });
    },
    SelectCat() {
      this.listConsignment.forEach((item) => {
        item.category_id = this.listCategory.id;
      });
      // var filePush = {};
      // this.addPack() = filePush;
      // console.log("33", filePush);
    },
    //
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
    // kho
    fetchwarehouseChina() {
      axios.get("warehouse/cn").then((response) => {
        switch (response.code) {
          case 200:
            this.warehouseChina = response.data;
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

    addPack() {
      this.listConsignment.push({
        key: Math.floor(Math.random() * 100000) + 1,
        loading: false,
        product_name: "",
        image: "",
        image_path: "",
        bill_code: "",
        packages_number: "",
        transporter: "",
        in_transit_name: "Trung quốc - Việt Nam",
        in_transit: "cn-vi",
        category_id: "",
        quantity: "",
        order_cost: "",
        description: "",
        note: "",
        delivery_type: "normal",
        is_insurance: 0,
        is_inspection: 0,
        is_woodworking: 0,
        is_shock_proof: 0,

        product_name_err: false,
        image_err: false,
        image_path_err: false,
        bill_code_err: false,
        packages_number_err: false,
        transporter_err: false,
        in_transit_err: false,
        category_id_err: false,
        quantity_err: false,
        order_cost_err: false,
        description_err: false,
        note_err: false,
        is_insurance_err: false,
      });
    },
    removePack(item) {
      this.$confirm("Xác nhận xóa ?", "Cảnh báo", {
        confirmButtonText: "Đồng ý",
        cancelButtonText: "Hủy",
        type: "warning",
      })
        .then(() => {
          var index = this.listConsignment.indexOf(item);
          if (index !== -1) {
            this.listConsignment.splice(index, 1);
            this.$message.error("Đã xóa thành công");
          }
        })
        .catch(() => {});
    },
    // Check dữ liệu xem có đủ ko
    checkDataPushError() {
      let flag = false;
      this.listConsignment.forEach((item) => {
        if (item.product_name == "") {
          item.product_name_err = true;
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
        if (item.bill_code == "") {
          item.bill_code_err = true;
          flag = true;
        }
        if (item.packages_number == "") {
          item.packages_number_err = true;
          flag = true;
        }
        if (item.transporter == "") {
          item.transporter_err = true;
          flag = true;
        }
        if (item.order_cost == "") {
          item.order_cost_err = true;
          flag = true;
        }
        if (item.quantity == "") {
          item.quantity_err = true;
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
        // delivery_type: this.delivery_type,
        customer_delivery_id: this.customer_delivery_id,
        packages: this.listConsignment,
        warehouse_cn: this.warehouse_cn,
        warehouse_vi: this.warehouse_id,
      };

      axios.post("consignment", data).then((response) => {
        this.canSubmit = true;
        switch (response.code) {
          case 200:
            this.$notify({
              title: "Thành công",
              message: "Tạo đơn thành công",
              type: "success",
            });
            this.listConsignment = [];
            this.$router.push({ name: "consignment-list" });
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
      this.listConsignment.forEach((item) => {
        if (item.product_name.length > 255) {
          this.$message.error("Bạn đã nhập quá 255 kí tự");
        }

        // Validate
        if (item.name) item.product_name_err = false;
        if (item.image) item.image_err = false;
        if (item.image_path) item.image_path_err = false;
        if (item.bill_code) item.bill_code_err = false;
        if (item.packages_number) item.packages_number_err = false;
        if (item.transporter) item.transporter_err = false;
        if (item.in_transit) item.in_transit_err = false;
        if (item.quantity) item.quantity_err = false;
        if (item.quantity) item.quantity_err = false;
        if (item.description) item.description_err = false;
        if (item.is_insurance) item.is_insurance_err = false;
        if (item.note) item.note_err = false;
        if (item.category_id) item.category_id_err = false;
      });
    },
  },
  watch: {
    listConsignment: {
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
    if (this.listConsignment.length > 0 && this.startAddPack) {
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
  border: 0.5px solid #5998db;
  padding: 11px 0 12px 22px;
  cursor: pointer;
  font-weight: 500;
  font-size: 16px;
  line-height: 16px;
  letter-spacing: 0.02em;
  color: #575757;
}
.order-create-add-item-182x .icon_Plus {
  width: 32px;
  height: 32px;
  font-weight: 500;
  font-size: 16px;
  line-height: 16px;
  letter-spacing: 0.02em;
  color: #fff;
  background: #fe6701;
  border-radius: 8px;
  margin-right: 10px;
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
/*  */
.consignment-create {
  background: #fff;
}
.iconText {
  text-align: left !important;
  text-transform: none !important;
  width: 300px;
}
/* Kho Trung quốc  */
.warehouseChina {
  background-color: #fff;
  padding: 20px 15px 20px 35px;
}
.warehouseChina span.title {
  font-weight: 700;
  color: #575757;
  padding-bottom: 1em;
  text-transform: uppercase;
}
.warehouseChina span {
  /* margin-right: 15px; */
  font-weight: 400;
  font-size: 14px;
  line-height: 16px;
  letter-spacing: 0.02em;
  text-transform: capitalize;
  color: #575757;
}
.yellow {
  background: #fbefc5;
  padding: 24px 0 20px 75px;
}
.yellow span {
  font-weight: 500;
  font-size: 15px;
  line-height: 16px;
  letter-spacing: 0.02em;
  text-transform: uppercase;
  color: #000000;
}
.bottomTitle {
  margin-left: 2em;
  margin-right: 2em;
}
.bottomTitle .title {
  font-weight: 500;
  font-size: 16px;
  line-height: 16px;
  letter-spacing: 0.02em;
  text-transform: uppercase;
  color: #575757;
  margin: 0 3em;
}
.bottomTitle .content .text_1 {
  font-weight: 700;
  font-size: 14px;
  line-height: 28px;
  letter-spacing: 0.02em;
  color: #575757;
}
.bottomTitle .content .text_2 {
  font-size: 14px;
  line-height: 28px;
  letter-spacing: 0.02em;
  color: #575757;
}
.bottomTitle .content {
  background: url(@/static/icon/consignment-create/bg.svg) no-repeat;
  background-size: 100%;
  padding: 29px 0 28px 22px;
}
.bottomTitle .content span {
  padding: 5px 0;
}
/* Topleft */
.topLeft {
  padding: 0 0 19px;
}
.topLeft input {
  border: 0.5px solid #5998db;
  border-radius: 4px;
  font-size: 12px;
}
.topLeft input::placeholder {
  color: #8b8b8b;
}
.selectCat {
  width: 250px !important;
  margin-right: 1em;
}
.selectCat input {
  height: 32px;
  font-size: 12px;
  border: 0.5px solid #5998db;
}
.selectCat .el-input__icon {
  line-height: 32px;
}
</style>
