<template>
  <div id="app" :class="'night_mode_' + this.nightMode">
    <router-view @flash="showFlash" @toggleTheme="toggleTheme"></router-view>
    <div id="screenError">
      <i class="mdi mdi-phone-rotate-landscape"></i>
      <span class="errorTitle">صفحه نمایش بیش از حد کوچک</span>
      <p>
        اگر با موبایل هستید، صفحه را به حالت افقی (Landscape) تغییر داده و صفحه
        را ریفرش کنید.
      </p>
      <p>
        در کل توصیه می شود برای استفاده کامل صفحه نمایش حداقل
        {{ "1230".farsiNum() }} پیکسل طول داشته باشد. تا نیاز به اسکرول افقی
        نباشد.
      </p>
    </div>
    <div id="modal_back" v-if="!seenTheBanner">
      <div class="modal_box" id="banner_modal">
        <div class="modal_box_header">
          <i class="mdi mdi-close" @click="closeBanner"></i>
        </div>
        <img src="./assets/Banner_01.png" alt="ترمآپ در حذف و اضافه بالاست." @click="closeBanner">
      </div>
    </div>
    <transition name="slide-fade">
      <div
        v-if="flashMessage.show"
        :class="'flash_message ' + flashMessage.class"
        @click="hideFlash"
      >
        <i
          v-if="flashMessage.class === 'success'"
          class="mdi mdi-check-circle"
        ></i>
        <i
          v-if="flashMessage.class === 'error'"
          class="mdi mdi-close-circle"
        ></i>
        <i
          v-if="flashMessage.class === 'info'"
          class="mdi mdi-alert-circle"
        ></i>
        {{ flashMessage.msg }}
      </div>
    </transition>
    <Footer></Footer>
  </div>
</template>

<script>
import Footer from "./components/Footer.vue";

export default {
  name: "App",
  components: { Footer },
  data: function () {
    return {
      nightMode: localStorage.getItem("night_mode") || "off",
      seenTheBanner:1,
      flashMessage: { show: 0, msg: null, class: null },
    };
  },
  created() {
  if (localStorage.getItem("seenTheBanner") != "YES") {
      this.seenTheBanner=0;
    }
  },
  methods: {
    toggleTheme: function () {
      if (this.nightMode == "off") {
        this.nightMode = "on";
      } else {
        this.nightMode = "off";
      }
      localStorage.setItem("night_mode", this.nightMode);
    },
    closeBanner() {
      localStorage.setItem("seenTheBanner","YES");
      this.seenTheBanner=1;
    },
    getWidth: function (element) {
      if (element == "week") {
        return window.innerWidth - 358 + "px";
      }
    },
    showFlash(flashMsg) {
      this.flashMessage.msg = flashMsg.msg;
      this.flashMessage.class = flashMsg.class;
      this.flashMessage.show = 1;
      let x = this;
      setTimeout(function () {
        x.flashMessage.show = 0;
      }, 5000);
    },
    hideFlash() {
      this.flashMessage = { show: 0, mesg: null, class: null };
    },
  },
};
</script>

<style>
* {
  box-sizing: border-box;
  padding: 0;
  font-family: IRANYekanWeb, IRANSans, Yekan, BYekan, Vazir;
  font-weight: 100;
  transition: background-color 0.3s, border-color 0.3s;
  margin: 0;
  direction: rtl !important;
}

html,
body,
#app {
  min-height: 100%;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

*:focus {
  outline: none;
}

a {
  text-decoration: none;
  color: inherit;
}

body {
  direction: rtl;
}

#app {
  overflow: hidden;
  overflow-x: initial;
  min-height: 100%;
  /* display: flex; */
  /* flex-direction: column; */
  justify-content: space-between;
  position: relative;
}

.night_mode_on {
  background: #0b1320;
}

#header {
  border-bottom: 1px solid #e1e5ea;
  height: 60px;
  min-width: 1230px;
  width: 100%;
  padding: 5px 20px;
}

#container {
  width: 100%;
  overflow: hidden;
  min-width: 1230px;
  padding: 0 10px;
}

.week {
  padding-left: 10px;
  min-height: 700px;
  width: calc(100% - 380px);
  min-width: 820px;
  float: right;
}

.left {
  float: left;
}

#header #logo {
  height: 45px;
  float: right;
  display: block;
  margin-top: 4px;
}
#header #logo_night {
   height: 45px;
  float: right;
  display: block;
  margin-top: 4px;
  display: none;
}

.option_series {
  display: block;
  float: right;
  padding: 0 5px;
  border-left: 1px solid #dbd9d9;
}

.option_series:first-child {
  margin-right: 20px;
}

.option_series:last-of-type {
  border-left: 0px solid #fff !important;
}

.option_series li {
  display: block;
  height: 48px;
  cursor: pointer;
  text-align: center;
  padding: 0 15px;
  font-size: 14px;
  float: right;
  color: #424d5f;
  line-height: 20px;
  font-size: 13px;
  margin-top: 1px;
}

.option_series li.active {
  /* color:#8a96aa */
}

.night_mode_on #header {
  /* border-color: #293240; */
  border-color: rgba(255, 255, 255, 0.15);
}

.night_mode_on .option_series {
  border-color: #293240;
}

.night_mode_on .option_series li {
  color: #929bab;
}

.option_series li:hover {
  color: #3974da;
  transition: 0.3s;
}

.night_mode_on .option_series li:hover {
  color: rgb(255, 255, 255);
}

.option_series li .mdi {
  margin-top: 5px;
  display: block;
  font-size: 22px;
}

#del_all_button {
  color: #f74848 !important;
}

.plans {
  background: #dae5e9;
  float: left;
  /* width: 96px; */
  height: 35px;
  border-radius: 4px;
  margin-top: 8px;
  padding: 0 10px;
  cursor: pointer;
}

.night_mode_on .plans {
  background: #1c2534;
}

.night_mode_on .plans span {
  color: #788aa8;
}

.plans .mdi {
  float: right;
  line-height: 35px;
  display: block;
  font-size: 18px;
  color: #5a6a85;
}

.plans span {
  color: #5f77a1;
  float: left;
  display: block;
  line-height: 37px;
  font-size: 13.5px;
  margin-right: 10px;
}

#theme_switch {
  /* transition: 0.5s; */
  float: left;
  display: block;
  margin-left: 15px;
  margin-top: 8px;
  width: 35px;
  height: 35px;
  font-size: 19.5px;
  line-height: 33px;
  border: 1px solid #7f899b;
  text-align: center;
  color: #586b8b;
  border-radius: 12px;
  cursor: pointer;
}

.night_mode_on #theme_switch {
  background: #3b5063;
  border-color: #3b5063;
  color: #fff;
}

.night_mode_on #theme_switch:hover {
  background: #fab112;
  border-color: #fab112;
}

#theme_switch:hover {
  background: #7f899b;
  color: #fff;
  transition: 0.2s;
}

#done:hover {
  color: rgb(2, 189, 86);
}

.night_mode_on #footer .copyright {
  color: #91959b;
}

.night_mode_on #footer .links a {
  color: #91959b;
}

#screenError {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #fff;
  display: none;
  z-index: 1000;
}

#screenError .mdi {
  font-size: 40px;
  text-align: center;
  display: block;
  color: #3974da;
  margin-top: 100px;
}

#screenError .errorTitle {
  display: block;
  text-align: center;
  font-size: 20px;
  color: #3b5063;
  margin-bottom: 10px;
}

#screenError p {
  display: block;
  text-align: center;
  color: #1c2534;
  font-size: 15px;
  margin: 5px 0;
  line-height: 26px;
  padding: 0 10px;
}

.flash_message {
  position: fixed;
  left: 20px;
  line-height: 20px;
  padding: 9px 12px;
  cursor: pointer;
  border-radius: 4px;
  font-size: 14px;
  bottom: 20px;
  z-index: 1000;
  background: #293240;
  color: #fff;
}

.flash_message .mdi {
  float: right;
  font-size: 19px;
  line-height: 19px;
  margin-left: 6px;
}

.flash_message.success {
  background: #10ad40;
}

.flash_message.error {
  background: rgb(204, 48, 48);
}

.slide-fade-enter-active {
  transition: all 0.3s ease;
}

.slide-fade-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter,
.slide-fade-leave-to {
  transform: translateX(10px);
  opacity: 0;
}

#modal_back {
  background: #000000ba;
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  right: 0;
  z-index: 10000;
}

.modal_box {
  width: 500px;
  max-width: 90%;
  border-radius: 4px;
  min-height: 125px;
  margin: auto;
  margin-top: 100px;
  background: #fff;
}

.modal_box .modal_box_header {
  padding: 10px 10px;
  position: relative;
  font-size: 14px;
  min-height:42px;
  overflow: hidden;
  border-bottom: 1px solid #e7e7e7;
  color: #707070;
}
.clear {
  clear: both;
}
.modal_box .modal_box_header .mdi-close {
  position: absolute;
  left: 10px;
  top: 0;
  font-size: 16px;
  line-height: 40px;
  display: block;
  cursor: pointer;
}

.modal_box .modal_box_content {
  padding: 10px;
  overflow: hidden;
  font-size: 13px;
  color: rgb(44, 44, 44);
}
#banner_modal {
  width:670px;
  padding:5px;
  max-width: calc(100%-20px);
}
#banner_modal img {
  display: block;
  cursor: pointer;
  width:100%;
  
}
@media only screen and (max-width: 700px) {
  #screenError {
    display: block;
  }
}
</style>