<template>
  <div>
    <header id="header">
      <img src="../assets/logo.png" id="logo" alt="Logo for TermUp">
      <ul class="option_series" v-if="$route.name != 'Board'">
        <li>
          <a v-on:click="$router.go(-1)">
            <i class="mdi mdi-arrow-left-circle-outline"></i
            ><span>برگشت به قبلی</span>
          </a>
        </li>
      </ul>
      <div class="plans">
        <i class="mdi mdi-arrow-down-drop-circle"></i>
        <span>{{ "1400 | ترم 1".farsiNum() }}</span>
      </div>

      <div id="theme_switch" v-on:click="$emit('toggleTheme')">
        <i class="mdi mdi-theme-light-dark"></i>
      </div>
    </header>
    <div id="major_switch">
      <h1 v-if="firstTimeVisit">انتخاب رشته</h1>
      <h1 v-else>تغییر رشته</h1>
      <div class="warn" v-if="!firstTimeVisit">
        <p>
          <i class="mdi mdi-alert-octagon"></i>
          تغییر رشته موجب حذف انتخاب های ذخیره شده فعلی در مرورگر می شود. دقت
          کنید!
        </p>
      </div>
      <div class="majors">
        <router-link v-for="(major,i) in majorsList" :key="i" :to="'/board/'+major[0]">
          <div class="major"  v-if="availableMajors.includes(major[0])">
            <i :class="'mdi '+major[2]"></i>
            <span>{{major[1]}}</span>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>
<script>
import config from "../config.js";
import {majorsList} from "../config.js";

export default {
  name: "MajorSwitch",
  data: function () {
    return {
      majorsList:majorsList,
      availableMajors:config.majors,
      firstTimeVisit:
        localStorage.getItem("major") == null ||
        localStorage.getItem("major" == ""),
    };
  },
  created() {
    if (localStorage.getItem("finalized") == 1) {
      this.$router.push('/result')
      return 0
    }
  }
};
</script>

<style>
#major_switch {
  width: 840px;
  margin: 30px auto;
  min-height: 620px;
}
#major_switch h1 {
  font-weight: 100;
  margin-bottom: 20px;
  display: block;
  text-align: center;
  font-size: 20px;
  color: rgb(57, 77, 104);
}
.night_mode_on #major_switch h1 {
  color: #fff;
}
#major_switch .majors {
  margin-top: 20px;
}
#major_switch .majors .major {
  color: #4f5f83;
  width: 200px;
  height: 45px;
  margin: 5px 5px;
  float: right;
  border: 1px solid #d4d4d4;
  padding: 10px;
  cursor: pointer;
  border-radius: 4px;
}
#major_switch .majors .major:hover,
.night_mode_on #major_switch .majors .major {
  background: rgb(54, 60, 80);
  transition: 0.3s;
  color: #fff;
  border-color: rgb(54, 60, 80);
}
#major_switch .majors .major .mdi {
  display: block;
  font-size: 22px;
  line-height: 24px;
  float: right;
  margin-left: 10px;
}
#major_switch .majors .major span {
  font-size: 14px;
}
#major_switch .warn {
  background: #f7a900;
  color: #fff;
  border-radius: 4px;
  width: 600px;
  margin: auto;
  padding: 10px;
}
#major_switch p {
  font-size: 14px;
  line-height: 23px;
}
#major_switch .warn .mdi {
  float: right;
  font-size: 22px;
  margin-left: 7px;
  line-height: 22px;
}
</style>