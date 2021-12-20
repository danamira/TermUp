<template>
  <div id="app" :class="'night_mode_' + this.nightMode">
    <header id="header">
        <img src="./assets/logo.png" id="logo" />
      <ul class="option_series" v-if="$route.name!='Board'">  
                <li><router-link to="/"><i class="mdi mdi-arrow-left-circle-outline"></i><span>بازگشت به برد</span></router-link></li>
      </ul>
      <ul class="option_series">
        <li><i class="mdi mdi-school"></i><span>تغییر رشته</span></li>
      </ul>
      <ul class="option_series" v-if="$route.name=='Board'">
        <li><i class="mdi mdi-printer"></i><span>چاپ انتخاب ها</span></li>
        <li><i class="mdi mdi-share-variant"></i><span>اشتراک گذاری</span></li>
        <li id="del_all_button">
          <i class="mdi mdi-close"></i><span>حذف همه</span>
        </li>
        <li id="done"><i class="mdi mdi-check"></i><span>تایید انتخاب ها</span></li>
      </ul>
      <div class="plans">
        <i class="mdi mdi-arrow-down-drop-circle"></i>
        <span>Plan A</span>
      </div>

      <div id="theme_switch" v-on:click="toggleTheme">
        <i class="mdi mdi-weather-night" v-if="nightMode == 'off'"></i>
        <i class="mdi mdi-lightbulb" v-if="nightMode == 'on'"></i>
      </div>
    </header>
    <router-view></router-view>
    <div id="footer">
      <p class="copyright">
        <i class="mdi mdi-copyright"></i>{{ copyright.farsiNum() }}
      </p>
      <div class="links">
        <a href="#">
          <i class="mdi mdi-open-in-new"></i>
          مخزن پروژه
        </a>
        <router-link to="/contributors">
          <!-- <i class="mdi mdi-account-multiple"></i> -->
          مشارکت کنندگان
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
// import SideBar from "./  ents/SideBar.vue";
// import data from "./data.json";
// console.log(data);
export default {
  name: "App",
  data: function () {
    return {
      nightMode: "off",
      copyright:
        "کپی رایت 2021 | ساخته شده توسط چاپ کاناپه با مشارکت جمعی از دانشجویان.",
    };
  },
  methods: {
    toggleTheme: function () {
      if (this.nightMode == "off") {
        this.nightMode = "on";
      } else {
        this.nightMode = "off";
      }
    },
    getWidth: function (element) {
      if (element == "week") {
        return window.innerWidth - 358 + "px";
      }
    },
  }
};
</script>

<style>
* {
  box-sizing: border-box;
  padding: 0;
  font-family: IRANYekanWeb;
  font-weight: 100;
  margin: 0;
  /* transition:0.2s; */
}
*:focus {
  outline: none;
}
a {
  text-decoration: none;
  color:inherit
}
body {
  direction: rtl;
}
#app {
  overflow: hidden;
}
.night_mode_on {
  background: #0b1320;
}
#header {
  border-bottom: 1px solid #e1e5ea;
  height: 60px;
  padding: 5px 20px;
}
#container {
  width: 100%;
  overflow: hidden;
  padding: 0 10px;
}
.week {
  padding-left: 10px;
  min-height: 700px;
  width: calc(100% - 380px);
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
.option_series {
  display: block;
  margin-right: 20px;
  float: right;
  border-left: 1px solid #dbd9d9;
}
.option_series:nth-child(odd) {
  border-left: 0px solid #fff  !important;
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
  border-color: #293240;
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
  width: 96px;
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
  font-size: 17px;
  color: #5a6a85;
}
.plans span {
  color: #5f77a1;
  float: left;
  display: block;
  line-height: 37px;
  font-size: 14px;
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
#footer {
  padding: 10px 20px;
  overflow: hidden;
}
#footer .copyright {
  color: #293240;
  display: block;
  float: right;
  line-height: 24px;
  font-size: 14px;
}
#footer .copyright .mdi {
  display: block;
  float: right;
  line-height: 23px;
  font-size: 20px;
  margin-left: 6px;
}
#footer .copyright span {
  color: rgb(95, 111, 255);
  cursor: pointer;
  font-size: 14px;
}
.links {
  float: left;
}
.links a {
  display: block;
  float: left;
  padding: 0 10px;
  color: #334052;
  line-height: 20px;
  height: 20px;
  text-decoration: none;
  font-size: 14px;
  border-right: 1px solid #b9c3c7;
}
.links a:last-child {
  border-right: none;
}
.links a .mdi {
  font-size: 19px;
  color: #7f899b;
  float: right;
  display: block;
  margin-left: 4px;
  line-height: 18px;
}
#done:hover {
  color:rgb(2, 189, 86);
}
</style>