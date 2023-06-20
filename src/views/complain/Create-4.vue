<template>
  <div class="complain-create">
    <BreadcrumbTop
      text1="Khiếu nại"
      route1="complain-list"
      text2="Tạo khiếu nại"
    />
    <div class="complain-create-alert d-flex flex-column align-items-center">
      <span class="line"
        >Quý khách lưu ý điền đầy đủ thông tin để được nhận hỗ trợ sớm nhất từ
        Thương Đô! Trân trọng!
      </span>
    </div>
    <div class="info-complain mx-3">
      <span>Thông tin khiếu nại</span>
    </div>
    <div class="complain-create-filter-v1" id="containerDiv">
      <el-row>
        <el-col :span="8" class="pl-4">
          <div class="d-flex justify-content-start">
            <span class="line">Đơn hàng khiếu nại</span>
            <el-input
              v-model="listOrder.order_code"
              :disabled="true"
            ></el-input>
          </div>
        </el-col>
        <el-col :span="16" class="pl-5">
          <div class="d-flex justify-content-start">
            <span>Chọn loại khiếu nại</span>
            <el-select
              placeholder="- Lựa chọn -"
              v-model="ListType.id"
              :class="[ListType.id_err ? 'error-data-1988' : '']"
            >
              <el-option
                v-for="pack in ListType"
                :key="pack.id"
                :label="pack.name"
                :value="pack.id"
              ></el-option>
            </el-select>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="complain-create-alert d-flex flex-column align-items-center">
      <span class="line"
        >Lưu ý quan trọng. để quá trình khiếu nại được giải quyết nhanh nhất,
        đối với các trường hợp "Hàng thiếu, hàng lỗi <br />
        hỏng, hàng sai quy cách" bắt buộc quý khách phải ghi rõ số lượng thiếu,
        lỗi hỏng, sai quy cách tại ô ghi chú khiếu nại</span
      >
    </div>
    <div class="complain-create-table-wrap-1976 mx-3">
      <div class="title-warp d-flex">
        <div class="icon-item icon-item-stt icon-first"></div>
        <div class="icon-item icon-120">
          <span>Kiện hàng</span>
        </div>
        <div class="icon-item icon-image">
          <span>Ảnh</span>
        </div>
        <div class="icon-item icon-name">
          <span>Tên sản phẩm</span>
        </div>
        <div class="icon-item icon-120">
          <span>Đơn giá</span>
        </div>
        <div class="icon-item icon-120">
          <span>Số lượng</span>
        </div>
        <div class="icon-item icon-120">
          <span>Tải ảnh</span>
        </div>
        <div class="icon-item icon-last">
          <span>Ghi chú</span>
        </div>
      </div>
      <div
        class="line-wrap d-flex"
        v-for="(pack, index) in ListComplain"
        :key="pack.id"
      >
        <div class="icon-item icon-item-stt d-flex flex-column">
          <div>
            <span>{{ index + 1 }}</span>
          </div>
          <el-checkbox
            @change="clickCheckboxId"
            v-model="pack.checked"
          ></el-checkbox>
        </div>
        <div class="icon-item icon-120">
          <span>{{ pack.bill_code }}</span>
        </div>
        <div class="icon-item icon-image">
          <img :src="pack.image" alt="" />
        </div>
        <div class="icon-item icon-name">
          <span>{{ pack.name }}</span>
        </div>
        <div class="icon-item icon-120 d-flex flex-column" id="icon-rate">
          <span>{{ (pack.unit_price_cny * pack.exchange_rate) | vnd }}</span>
          <span>¥ {{ pack.unit_price_cny }}</span>
        </div>
        <div class="icon-item icon-120">
          <span>{{ pack.quantity }}</span>
        </div>
        <div class="icon-item icon-120">
          <!-- upload ảnh -->
          <div class="pack-create-image">
            <div class="choose-img" v-if="loadingImage">
              <i class="el-icon-loading"></i>
            </div>
            <div class="choose-img" v-else @click="selectImage(pack)">
              <img src="@/static/icon/complain-create/add.svg" alt="" />
            </div>
            <div
              class="image-wrap"
              v-for="i in pack.images.images_temp"
              :key="i.full_path"
            >
              <!-- <img :src="i.full_path" /> -->
              <!-- check ảnh hay video -->
              <img v-if="checkImage(i)" :src="i.full_path" />
              <div v-else class="uploadVideo">
                <video controls="controls">
                  <source :src="i.full_path" />
                </video>
              </div>
              <!--  -->
              <img
                class="img-close pl-1"
                src="@/static/icon/complain-create/ion_del.svg"
                @click="clearImage(i)"
              />
            </div>
          </div>
          <!-- upload ảnh -->
        </div>
        <div class="icon-item icon-last">
          <el-input
            class="text"
            :rows="4"
            type="textarea"
            placeholder="Ghi chú"
            v-model="pack.complain_note"
          ></el-input>
        </div>
      </div>
    </div>
    <div class="complain-plan-create">
      <div class="d-flex">
        <span class="pr-3">Phương án giải quyết</span>
        <el-select placeholder="- Lựa chọn -" v-model="ListSolution.id">
          <el-option
            v-for="item in ListSolution"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </div>
      <!-- Ảnh vận đơn  -->
      <div class="d-flex mt-3">
        <span class="pr-3">Ảnh vận đơn</span>
        <div class="button-upload-1988 d-flex align-items-center">
          <div class="choose-img" v-if="loadingImage">
            <i class="el-icon-loading"></i>
          </div>
          <div class="choose-img" v-else @click="selectImageBill()">
            <button class="btnImage">Tải lên</button>
          </div>
          <div class="d-flex flex-column">
            <div
              class="image-wrap-2023 d-flex align-items-center"
              v-for="i in this.modelData.images_tempBill"
              :key="i.full_path"
            >
              <div>
                <span @click="zoomImage(i)" class="pl-2">{{ i.name }}</span>
                <el-dialog :visible.sync="dialogVisibleZoom" class="imageZom">
                  <!-- <img width="100%" :src="dialogImageUrlZoom" /> -->
                  <img
                    width="100%"
                    v-if="showImage == true"
                    :src="dialogImageUrlZoom"
                  />
                  <div v-else class="uploadVideoBill">
                    <video controls="controls">
                      <source :src="dialogImageUrlZoom" />
                    </video>
                  </div>
                </el-dialog>
              </div>
              <img
                class="img-close pl-1"
                src="@/static/icon/complain-create/ion_del.svg"
                @click="clearImageBill(i)"
              />
            </div>
          </div>
        </div>
      </div>
      <!-- Ảnh vận đơn  -->
    </div>
    <div class="complain-create-table-wrap-v2-1976 mx-3 my-4">
      <div class="title-wrap">
        <span>Ảnh hàng thực nhận được</span>
      </div>
      <!-- Ảnh hàng nhận dc  -->
      <div class="line-wrap">
        <el-upload
          class="uploadV2"
          action="https://api-admin.thuongdo.vn/api/media/single/"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemoveV2"
          :before-upload="beforeUpload"
          :on-change="handleChangeV2"
          :file-list="fileList_received"
        >
          <div class="d-flex justify-content-center align-items-center">
            <img src="@/static/icon/complain-create/add.svg" alt="" />
          </div>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="" />
        </el-dialog>
      </div>
      <!-- Ảnh hàng nhận được  -->
    </div>
    <div class="button-submit" @click="submitForm()">
      <span v-if="!canSubmit"><i class="el-icon-loading"></i></span>
      <span v-else>Tạo yêu cầu</span>
    </div>
    <!--  -->
    <!-- Input upload ảnh -->
    <div>
      <input
        type="file"
        class="upload-avatar"
        id="file"
        ref="file"
        v-on:change="handleFileUpload()"
      />
    </div>
    <!-- Input upload ảnh vận đơn -->
    <div>
      <input
        type="file"
        class="upload-avatar"
        id="filebill"
        ref="fileBill"
        v-on:change="handleFileUploadBill()"
      />
    </div>
  </div>
</template>

<script>
import axios from "axios";
import BreadcrumbTop from "@/components/BreadcrumbTop";
export default {
  name: "CreateComplain",
  components: {
    BreadcrumbTop,
  },
  metaInfo() {
    return {
      title: "Tạo khiếu nại",
    };
  },
  data() {
    return {
      disabled: false,
      imageUrl: "",
      textarea: "",
      canSubmit: true,
      loading: true,
      ListComplain: [],
      ListType: [],
      ListSolution: [],
      order_detail: [],
      listOrder: [],
      order_code: "",
      dialogImageUrl: "",
      dialogVisible: false,
      dialogImageUrl2: "",
      dialogVisible2: false,
      // ảnh hàng thực nhận được
      dataFile_received: [],
      fileList_received: [],
      FileImage_received: [],
      FileImage_receivedV1: [],
      images_received: [],
      images_received_id: [],
      images_received_all: [],
      //
      images_table: [],
      count: 1,
      loadingImage: false,
      //
      images_temps: [],
      //
      modelData: {
        imagesBill: [],
        images_tempBill: [],
      },
      // show ảnh zoom
      dialogImageUrlZoom: "",
      dialogVisibleZoom: false,
      //
      showImage: true,
    };
  },
  mounted() {
    this.fetchOrder();
    this.fetchTypeComplain();
    this.fetchSolutionComplain();
  },
  methods: {
    // zoom ảnh
    zoomImage(i) {
      console.log("i", i);
      this.dialogImageUrlZoom = i.full_path;
      const last3 = i.full_path.slice(-3);
      if ((last3 == "png") | (last3 == "jpeg") | (last3 == "jpg")) {
        this.showImage = true;
      } else {
        this.showImage = false;
      }
      this.dialogVisibleZoom = true;
    },
    // check ảnh hay video
    checkImage(i) {
      const last3 = i.full_path.slice(-3);
      if ((last3 == "png") | (last3 == "jpeg") | (last3 == "jpg")) {
        return true;
      }
      return false;
    },
    // Xóa 1 ảnh trong list ảnh
    clearImage(item) {
      this.ListComplain.forEach((i) => {
        var index = i.images.images_temp.indexOf(item);
        if (index !== -1) {
          i.images.images_temp.splice(index, 1);
          this.$message("Xóa thành công");
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
      // console.log("file", this.file);
      let file = this.file;
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isLt2M) {
        this.$message.error("Dung lượng file tối đa là 2M");
        return;
      }
      let typeFile = file["type"];
      let arr_type = [
        "image/jpeg",
        "image/png",
        "image/jpg",
        "video/avi",
        "video/flv",
        "video/wmv",
        "video/mov",
        "video/mp4",
        "video/avchd",
        "video/webm",
        "video/mkv",
        "video/quicktime",
      ];
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
          this.packClick.images.images_temp.push(result.data[0]);
        })
        .catch(() => {
          this.packClick.loading = false;
          this.$notify.error({
            title: "Error",
            message: "Đã có lỗi xảy ra. Vui lòng liên hệ Admin !",
          });
        });
    },
    // Xử lý upload ảnh Bill
    clearImageBill(item) {
      var index = this.modelData.images_tempBill.indexOf(item);
      if (index !== -1) {
        this.modelData.images_tempBill.splice(index, 1);
        this.$message("Đã xóa 1 ảnh");
      }
    },
    selectImageBill() {
      document.getElementById("filebill").click();
    },
    handleFileUploadBill() {
      this.file = this.$refs.fileBill.files[0];
      // console.log("this1", this.file);
      let file = this.file;
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isLt2M) {
        this.$message.error("Dung lượng file tối đa là 2M");
        return;
      }
      let typeFile = file["type"];
      // let arr_type = ["image/jpeg", "image/png", "image/jpg"];
      let arr_type = [
        "image/jpeg",
        "image/png",
        "image/jpg",
        "video/avi",
        "video/flv",
        "video/wmv",
        "video/mov",
        "video/mp4",
        "video/avchd",
        "video/webm",
        "video/mkv",
        "video/quicktime",
      ];
      if (!arr_type.includes(typeFile)) {
        this.$message.error("Chỉ được upload file ảnh");
        return;
      }
      this.submitFileBill();
    },
    async submitFileBill() {
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
          this.modelData.images_tempBill.push(result.data[0]);
          // console.log("this", this.modelData.images_tempBill);
        })
        .catch(() => {
          this.packClick.loading = false;
          this.$notify.error({
            title: "Error",
            message: "Đã có lỗi xảy ra. Vui lòng liên hệ Admin !",
          });
        });
    },
    //
    // ảnh hàng thực nhận dc
    handleRemoveV2() {},
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleChangeV2(file, fileList_received) {
      this.dataFile_received = fileList_received;
      this.FileImage_received = [];
      this.FileImage_receivedV1 = [];
      this.images_received = [];
      this.images_received_id = [];
      this.images_received_all = [];
      this.dataFile_received.forEach((item) => {
        if (item.response != undefined) {
          this.FileImage_received.push(item.response);
          this.FileImage_received.forEach((item2) => {
            this.FileImage_receivedV1 = item2.data;
          });
          this.images_received.push(this.FileImage_receivedV1);
          this.images_received.forEach((item3) => {
            this.images_received_id = item3.path;
          });
          this.images_received_all.push(this.images_received_id);
        }
      });
    },
    // ảnh hàng thực nhận dc
    fetchOrder_code() {
      this.order_code = this.listOrder.order_code;
    },
    fetchOrder(loading = true) {
      if (loading) {
        this.loading = true;
      }
      axios.get("order/" + this.$route.params.order_id).then((response) => {
        this.loading = false;
        switch (response.code) {
          case 200:
            this.listOrder = response.data;
            this.fetchOrder_code();
            this.fetchListComplain();
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
    // Check order_detail_id
    clickCheckboxId() {
      this.pushIDToListOrderIdChecked();
    },
    pushIDToListOrderIdChecked() {
      this.order_detail = [];
      this.ListComplain.forEach((item) => {
        if (item.checked) {
          let temp = {
            order_detail_id: item.id,
            images: item.images.images_temp,
            complain_note: item.complain_note,
          };
          this.order_detail.push(temp);
        }
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
    // Ảnh vận đơn
    beforeUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isLt2M) {
        this.$message.error("Dung lượng file tối đa là 2M");
      }
      let typeFile = file.type;
      let arr_type = ["image/jpeg", "image/png", "image/jpg"];
      if (!arr_type.includes(typeFile)) {
        this.$message.error("Chỉ được upload file ảnh");
      }
      return arr_type.includes(typeFile) && isLt2M;
    },
    beforeRemove() {
      return this.$confirm(`Bạn muốn xóa file ?`, {
        confirmButtonText: "Đồng ý",
        cancelButtonText: "Hủy",
        type: "warning",
      });
    },
    // Ảnh vận đơn
    fetchTypeComplain() {
      axios.get("complain/type").then((response) => {
        switch (response.code) {
          case 200:
            this.ListType = response.data;
            this.ListType.forEach((item) => {
              item.id_err = false;
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
    fetchListComplain() {
      axios
        .get(
          "package/products-by-multiple-packages/" + this.$route.params.pack_id
        )
        .then((response) => {
          switch (response.code) {
            case 200:
              this.ListComplain = response.data;
              this.ListComplain.map(function (i) {
                i.images = {
                  images_temp: [],
                };
                return i;
              });
              this.ListComplain = JSON.parse(JSON.stringify(this.ListComplain));
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
    // Check dữ liệu có đủ không
    checkDataPushError() {
      let flag = false;
      this.ListType.forEach((item) => {
        if (item.id == "") {
          item.id_err = true;
          flag = true;
        }
      });
      this.ListSolution.forEach((item) => {
        if (item.name == "") {
          item.name_err = true;
          flag = true;
        }
      });
      return flag;
    },
    //
    fetchSolutionComplain() {
      axios.get("complain/solution").then((response) => {
        switch (response.code) {
          case 200:
            this.ListSolution = response.data;
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
    // Lưu dữ liệu
    submitForm() {
      if (this.checkDataPushError()) {
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
      let images_temp2 = [];
      this.canSubmit = false;
      this.order_detail.forEach((item) => {
        item.images.forEach((i) => {
          images_temp2.push(i.path);
        });
      });
      this.order_detail.forEach((item) => {
        item.images = images_temp2;
      });
      //
      let images_Bill = [];
      this.canSubmit = false;
      this.modelData.images_tempBill.forEach((item) => {
        images_Bill.push(item.path);
      });
      this.modelData.imagesBill = images_Bill;
      let data = {
        complain_type_id: this.ListType.id,
        solution_id: this.ListSolution.id,
        products: this.order_detail,
        images_received: this.images_received_all,
        images_bill: this.modelData.imagesBill,
      };
      axios
        .post("complain/" + this.$route.params.order_id, data)
        .then((response) => {
          this.canSubmit = true;
          switch (response.code) {
            case 200:
              this.$notify({
                title: "Thành công",
                message: "Gửi khiếu nại thành công",
                type: "success",
              });
              this.ListType = [];
              this.ListSolution = [];
              this.ListComplain = [];
              this.$router.push({ name: "order-detail" });
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
  },
  watch: {},
};
</script>

<style lang="css" scoped>
.hide-upload-29 {
  display: none;
}
/* Phần tiêu đề */
.complain-create-alert {
  background: #fde9ea;
  padding: 20px 10px 14px 10px;
}
.complain-create-alert .line {
  font-weight: 400;
  font-size: 12px;
  line-height: 20px;
  letter-spacing: 0.02em;
  color: #d85030;
}
/* Lọc */
.info-complain {
  margin-top: 14px;
  background: #5998db;
  padding: 10px 0 10px 23px;
  font-weight: 400;
  font-size: 12px;
  line-height: 20px;
  letter-spacing: 0.02em;
  color: #fff;
}
.complain-create-filter-v1 {
  margin-top: 21px;
  margin-bottom: 41px;
}
.complain-create-filter-v1 span {
  font-size: 12px;
  line-height: 14px;
  letter-spacing: 0.02em;
  color: #575757;
  padding-top: 10px;
}
.complain-create-filter-v1 .line {
  width: 40%;
}
/* Table nội dung */
.complain-create-table-wrap-1976 {
  margin-top: 15px;
  margin-bottom: 24px;
}
.complain-create-table-wrap-1976 .title-warp {
  background: #5998db;
  padding: 10px 0;
}
.complain-create-table-wrap-1976 .title-warp span {
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: 0.01em;
  color: #fff;
}
#icon-rate span {
  color: #dd2120;
}
.complain-create-table-wrap-1976 .icon-item-stt {
  width: 80px;
  flex-grow: initial;
  align-items: center;
}
.complain-create-table-wrap-1976 span {
  font-weight: 400;
  font-size: 12px;
  line-height: 20px;
  color: #575757;
}
.complain-create-table-wrap-1976 .icon-120 {
  width: 250px;
  flex-grow: initial;
}
.complain-create-table-wrap-1976 .icon-120 img {
  width: 115px;
  height: 100px;
  object-fit: cover;
  flex-grow: initial;
}
.complain-create-table-wrap-1976 .icon-image {
  flex-grow: initial;
  width: 250px;
}
.complain-create-table-wrap-1976 .icon-image img {
  width: 140px;
  object-fit: cover;
}
.complain-create-table-wrap-1976 .icon-name {
  flex-grow: initial;
  width: 320px;
  padding-left: 1em;
}
.complain-create-table-wrap-1976 .icon-last {
  flex-grow: initial;
}
.complain-create-table-wrap-1976 .line-wrap {
  padding-top: 7px;
  padding-bottom: 10px;
  border: 0.5px solid rgba(180, 180, 180, 0.63);
}
.complain-create-table-wrap-1976 .icon-last {
  width: 35%;
  padding: 0 2em;
}
/* plan */
.complain-plan-create {
  margin-left: 100px;
}
.complain-plan-create span {
  padding-top: 7px;
  font-weight: 400;
  font-size: 12px;
  line-height: 20px;
  letter-spacing: 0.02em;
  width: 135px;
}
/*  */
.complain-create-table-wrap-v2-1976 .title-wrap {
  background: #5998db;
  padding: 10px 0 10px 20px;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: 0.01em;
  color: #fff;
}
.complain-create-table-wrap-v2-1976 .line-wrap {
  padding: 15px 0 15px 22px;
  border: 0.5px solid rgba(180, 180, 180, 0.63);
}
.complain-create-table-wrap-v2-1976 .upload-image {
  width: 145px;
  height: 125px;
  background: #f2f2f2;
}
.icon-add-image img {
  width: 145px;
}
/*  */
.button-submit {
  cursor: pointer;
  background: #26b01c;
  border-radius: 4px;
  width: 160px;
  font-weight: 500;
  font-size: 16px;
  line-height: 16px;
  letter-spacing: 0.02em;
  text-transform: uppercase;
  color: #fff;
  text-align: center;
  padding: 15px 0 13px 0;
  float: right;
  margin-right: 5%;
}
</style>
<style type="text/css">
.upload-table {
  display: flex;
  flex-direction: column-reverse;
}
.upload-table .el-upload-list {
  margin-top: 0.5em;
}
.upload-table .el-upload-list__item-thumbnail {
  max-width: 100%;
  width: 115px;
  height: 100px;
}
.upload-table .el-upload-list--picture-card .el-upload-list__item {
  display: flex;
  justify-content: center;
  width: 115px;
  height: 100px;
}
.upload-table .el-upload {
  text-align: left;
  height: 75px;
  margin-bottom: 2em;
}
.upload-table .el-upload-list__item-status-label,
.upload-table .el-icon-close,
.upload-table .el-icon-close-tip {
  display: none !important;
}
.complain-create-table-wrap-v2-1976 .el-upload-list__item-status-label,
.complain-create-table-wrap-v2-1976 .el-icon-close-tip {
  display: none !important;
}
/*  */
.upload-table .el-upload-list--picture .el-upload-list__item {
  padding: 0;
  border: none;
  width: 115px;
  height: 100px;
}
.upload-table .el-upload-list--picture .el-upload-list__item-name {
  display: none;
}
.upload-table .el-upload-list--picture .el-upload-list__item-thumbnail {
  margin: 0;
  position: initial;
}
.upload-table .el-upload-list--picture .el-icon-close-tip {
  display: none !important;
}
/*  */
/* ghi chú */
.complain-create-filter-v1 .el-input__inner {
  background: #fff;
  border: 1px solid #3f92d1;
  border-radius: 20px;
  width: 233px;
  padding: 14px 0 13px 23px;
  font-weight: 400;
  font-size: 12px;
  line-height: 14px;
  letter-spacing: 0.02em;
  color: #8b8b8b;
  margin-left: 16px;
}
.complain-plan-create .el-input__inner {
  background: #fff;
  border: 1px solid #3f92d1;
  border-radius: 20px;
  width: 260px;
  padding: 14px 0 13px 23px;
  font-weight: 400;
  font-size: 12px;
  line-height: 14px;
  letter-spacing: 0.02em;
  color: #8b8b8b;
}
.icon-last .el-textarea__inner {
  font-weight: 400;
  font-size: 12px;
  letter-spacing: 0.02em;
  color: #8b8b8b;
  border: 1px solid #5998db;
  border-radius: 4px;
}
.el-upload--picture-card {
  border: none;
}
.el-upload-list--picture-card .el-upload-list__item {
  border: none;
  height: 128px;
}
/* Lỗi chưa nhập */
.error-data-1988 input {
  border: 1px solid red !important;
}
.error-data-1988.a90 {
  border: 1px solid red;
}
.upload-avatar {
  display: none;
}
.button-upload-1988 {
  width: 100%;
}
.button-upload-1988 .btnImage {
  cursor: pointer;
  border: 1px solid #26b01c;
  background: #26b01c;
  border-radius: 4px;
  padding: 7px 10px 8px 8px;
  width: 85px;
  color: #fff;
  text-align: center;
}

.button-upload-1988 .btnImage:hover {
  background: #fff;
  color: #26b01c;
}
.button-upload-1988 .el-icon-close-tip {
  display: none !important;
}
.el-icon-close-tip {
  display: none;
}
.el-notification {
  width: 450px;
}
.el-dialog__wrapper .el-dialog {
  margin: 0 auto;
}
i.el-icon-delete {
  color: #fff;
}
.image-wrap {
  display: flex;
  align-items: center;
}
.image-wrap .img-close {
  width: 15px !important;
  height: 15px !important;
  cursor: pointer;
}
/*  */
.uploadVideo video {
  width: 115px;
  height: 100px;
  object-fit: cover;
}
.image-wrap-2023 .img-close {
  width: 15px !important;
  height: 15px !important;
  cursor: pointer;
}
.imageZom img {
  cursor: pointer;
  width: 100%;
  height: auto;
}
.uploadVideoBill video {
  width: 100%;
  height: 500px;
}
</style>
