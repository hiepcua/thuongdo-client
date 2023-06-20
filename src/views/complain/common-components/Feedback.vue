<template>
  <div class="feedback-common-complain" v-if="tableData">
    <div class="feedback-list-data" v-if="tableData.length">
      <div
        class="feedback-item"
        v-for="(item, index) in tableData"
        :key="index"
      >
        <div class="image">
          <div class="temp">
            <img
              class="avatar"
              :src="item.cause.avatar"
              v-if="item.cause.avatar"
            />
            <img
              class="avatar"
              src="@/static/icon/header-top/account.svg"
              v-else
            />
          </div>
        </div>
        <div class="data">
          <div id="triangle-left"></div>
          <div class="info">
            <span class="name">{{ item.cause.name }}</span>
            <div class="date">
              <img src="@/static/icon/complain/common-component/date.svg" />
              <span>{{ item.time }}</span>
            </div>
          </div>
          <div class="content">
            <div>
              <span>{{ item.content }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="tableData.length == 0">
      <span>Không có dữ liệu nào</span>
    </div>
    <div v-if="showFrom" class="make-feedback">
      <div class="input1">
        <el-input
          type="textarea"
          :rows="3"
          placeholder="Ý kiến của bạn"
          v-model="textarea"
          size="mini"
          @keyup.enter.native="sentFeedBack"
        >
        </el-input>
      </div>
      <div class="d-flex justify-content-end pt-3">
        <div
          class="btn-make-feedback"
          :class="!canSubmit ? 'disable' : ''"
          @click="sentFeedBack"
        >
          <i class="el-icon-loading" v-if="!canSubmit"></i>
          <span>Gửi</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "FeedbackComplain",
  props: {
    complain_id: String,
    showFrom: Boolean,
  },
  data() {
    return {
      tableData: [],

      canSubmit: true,
      textarea: "",
    };
  },
  mounted() {
    // Tạo bản copy ban đầu
    this.fetchLog();
  },
  methods: {
    fetchLog() {
      axios.get("complain/feedback/" + this.complain_id).then((response) => {
        this.loading = false;
        switch (response.code) {
          case 200:
            this.tableData = response.data;
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
    sentFeedBack() {
      if (this.textarea == "") {
        this.$notify({
          title: "Vui lòng kiểm tra lại thông tin",
          message: "Vui lòng nhập thông tin phản hồi",
          type: "warning",
        });
        return;
      }

      this.canSubmit = false;
      let data = {
        content: this.textarea,
        attachments: [],
      };
      axios
        .post("complain/feedback/" + this.complain_id, data)
        .then((response) => {
          this.canSubmit = true;
          switch (response.code) {
            case 200:
              this.fetchLog();
              this.textarea = "";
              this.$notify({
                title: "Thành công",
                message: "Tạo phản hồi thành công",
                type: "success",
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
  watch: {
    complain_id: function () {
      this.tableData = [];
      this.fetchLog();
    },
  },
};
</script>

<style lang="css" scoped>
.feedback-list-data {
  min-height: 100px;
  max-height: 400px;
  width: 450px;
  overflow-y: scroll;
  padding: 0px 10px;
  color: #575757;
}
.feedback-item {
  display: flex;
  margin-bottom: 10px;
  margin-right: 5px;
  margin-left: 5px;
}
.feedback-item .image {
  width: 50px;
  height: 35px;
  display: flex;
}
.feedback-item .image .temp {
  width: 35px;
  height: 35px;
  border-radius: 50%;
  background-color: #ccc;
}
.feedback-item .image .temp img {
  width: 35px;
  height: 35px;
  border-radius: 50%;
  object-fit: cover;
}
.feedback-item .data {
  width: 400px;
  border: 1px solid #b3cef6;
  position: relative;
}
.feedback-item .data #triangle-left {
  width: 0;
  height: 0;
  border-top: 5px solid transparent;
  border-right: 10px solid #b3cef6;
  border-bottom: 5px solid transparent;
  position: absolute;
  left: -10px;
  top: 12px;
}
.feedback-item .info {
  background: #f0f8ff;
  padding: 7px 14px;
}
.feedback-item .info .name {
  font-weight: 700;
  font-size: 12px;
  letter-spacing: 0.02em;
  margin-bottom: 6px;
  display: inline-block;
}
.feedback-item .info .date {
  display: flex;
  align-items: center;
  margin-bottom: 4px;
}
.feedback-item .info .date span {
  font-size: 12px;
  margin-left: 5px;
}
.feedback-item .content {
  padding: 7px 20px;
  padding-bottom: 15px;
  background: #fff;
}

.make-feedback {
  margin-top: 10px;
}
.make-feedback .input1 {
  margin-left: 60px;
}
.btn-make-feedback {
  padding: 5px 50px;
  background-color: #26b01c;
  color: #fff;
  border-radius: 5px;
  cursor: pointer;
}
.btn-make-feedback:hover {
  opacity: 0.8;
}
.btn-make-feedback.disable {
  pointer-events: none;
}
.btn-make-feedback.disable span {
  margin-left: 5px;
}
</style>

<style>
.make-feedback .el-textarea__inner {
  font-size: 12px !important;
}
</style>
