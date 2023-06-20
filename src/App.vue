<template>
  <div id="app">
    <div class="is-login">
      <div v-if="logged">
        <header-top></header-top>
      </div>
      <div class="d-flex">
        <div class="app-menu-left" v-if="logged">
          <menu-left></menu-left>
        </div>
        <div
          class="content-right"
          :class="[logged == false ? 'full-screen' : '']"
        >
          <transition :name="logged ? 'slide-fade' : ''">
            <router-view />
          </transition>
        </div>
      </div>
    </div>
    <div class="not-login">
      <!-- <router-view /> -->
    </div>
  </div>
</template>

<script type="text/javascript">
import { mapGetters, mapActions } from "vuex";
import ls from "local-storage";
import MenuLeft from "@/views/layout/MenuLeft";
import HeaderTop from "@/views/layout/HeaderTop";
export default {
  name: "App",
  components: {
    MenuLeft,
    HeaderTop,
  },
  computed: {
    ...mapGetters("account", ["logged"]),
    ...mapGetters(["path", "full_path"]),
  },
  data() {
    return {
      showText: true,
    };
  },
  mounted() {
    this.checkLoged();
  },
  methods: {
    ...mapActions("account", ["getAccountInfo"]),
    checkLoged() {
      let authen = ls.get("authen");
      if (!authen) {
        if (this.path !== "register") {
          this.$router.push({ name: "account-login" });
        }
      } else {
        if (!this.logged) {
          this.getAccountInfo();
        }
      }
    },

    toggleMenuParent(value) {
      this.showText = value;
    },
  },
};
</script>

<style type="text/css">
.app-menu-left {
  width: 65px;
  background-color: #f2f2f2;
  height: calc(100vh - 51px);
  background: #edf4fb;
}
.content-right {
  height: calc(100vh - 53px);
  background-color: #fff;
  overflow-y: scroll;
  width: calc(100% - 65px);
}
.full-screen {
  height: 100%;
  width: 100%;
}

.slide-fade-enter-active {
  transition: all 0.35s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.35s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
</style>
