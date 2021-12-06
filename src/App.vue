<template>
  <div id="app" :class="'night_mode_'+this.nightMode">
  <header id="header">
  <img src="./assets/logo.png" id="logo">
  <ul class="option_series">
    <li><i class="mdi mdi-school"></i><span>تغییر رشته</span></li>
  </ul>
  <ul class="option_series">
    <li><i class="mdi mdi-printer"></i><span>چاپ انتخاب ها</span></li>
    <li><i class="mdi mdi-share-variant"></i><span>اشتراک گذاری</span></li>
    <li id="del_all_button"><i class="mdi mdi-close"></i><span>حذف همه</span></li>
    <li><i class="mdi mdi-check"></i><span>تایید انتخاب ها</span></li>
  </ul>
  <div class="plans">
  <i class="mdi mdi-arrow-down-drop-circle"></i>
  <span>Plan A</span>
  </div>
  
  <div id="theme_switch" v-on:click="toggleTheme">
    <i class="mdi mdi-weather-night" v-if="nightMode=='off'"></i>
    <i class="mdi mdi-weather-sunny" v-if="nightMode=='on'"></i>
  </div>
  </header>
  <div id="container">
    <div class="week" ref="week">
    </div>
    <SideBar :width="getWidth('SideBar')" :courses="courses"></SideBar>
  </div>
  </div>
</template>

<script>
import SideBar from './components/SideBar.vue'
import data from './data.json'
console.log(data)
export default {
  name: 'App',
  components: {
    SideBar
  },
  data:function() {
    return {
      nightMode:"off",
      courses:data,
      }
  },
  methods:{
    toggleTheme:function() {
      if(this.nightMode=="off"){
        this.nightMode="on"
      }
      else{
        this.nightMode="off"
      }
    },
    getWidth:function(element) {
      if(element=="week") {
        return (window.innerWidth-358)+"px";
      }
    }
  },
  mounted:function() {
    console.log(this.$refs.week.clientWidth)
  }
}
</script>

<style>
* {
  box-sizing:border-box;
  padding:0;
  font-family:IRANYekanWeb;
  font-weight:100;
  margin:0;
}
*:focus{
  outline:none;
}
body {
  direction:rtl;
}
#app {
  overflow:hidden;
}
.night_mode_on {
  background:#0b1320;
}
#header {
  border-bottom:1px solid #E1E5EA;
  height:60px;
  padding:5px 20px;
}
#container {
  width:100%;
  padding:  0 10px;
}
.week { 
  padding:0 10px;
  min-height:700px;
  width:calc(100% - 380px);
  float:right;

}
.left {
  float:left;
}
#header #logo {
  height:38px;
  float:right;
  display:block;
  margin-top:5px;
}
.option_series {
  display:block;
  margin-right:20px;
  float:right;
  border-left:1px solid #dbd9d9;
}
.option_series:last-child {
  border-left:none !important;
}
.option_series li{
  display:block;
  height:48px;
  cursor:pointer;
  text-align:center;
  color:#303b4e;
  padding:0 15px;
  font-size:14px;
  float:right;
  color:#303b4e;
  line-height:20px;
  font-size:13px;
}
.night_mode_on #header {
  border-color:#293240;
}
.night_mode_on .option_series {
  border-color:#293240;
}
.night_mode_on .option_series li {
  color:#929bab;
}
.option_series li:hover {
  color:#0943a9;
  transition:0.3s;
}
.option_series li .mdi {
  margin-top:5px;
  display:block;
  font-size:22px;
}
#del_all_button {
  color:#f74848 !important;
}
.plans {
    background: #dae5e9;
    float: left;
    width: 96px;
    height: 35px;
    border-radius: 4px;
    margin-top: 8px;
    padding: 0 10px;
    cursor:pointer;
}
.plans .mdi{
  float:right;
  line-height:35px;
  display:block;
  font-size: 17px;
  color: #5a6a85;
}
.plans span {
  color: #5f77a1;
  float:left;
  display:block;
  line-height:37px;
  font-size:14px;
  margin-right:10px;
}
#theme_switch {
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
  background:#7f899b;
  color:#fff;
}
#theme_switch:hover {
  background:#7f899b;
  color:#fff;
  transition:0.2s;
}
</style>
