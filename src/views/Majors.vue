<template>
  <div>
    <header id="header">
      <img
        class="logo logo_day"
        alt="Logo for TermUp"
        src="../assets/logo.png"
      />
      <img
        class="logo logo_night"
        alt="Logo for TermUp"
        src="../assets/logo_night.png"
      />
      <ul class="option_series" v-if="$route.name != 'Board'">
        <li>
          <a v-on:click="$router.go(-1)">
            <i class="mdi mdi-arrow-left-circle-outline"></i
            ><span>برگشت به قبلی</span>
          </a>
        </li>
      </ul>

      <div class="plans" @click="$emit('next-sem')">
        <i class="mdi mdi-calendar"></i>
        <span>{{ currentSemester.farsiNum() }}</span>
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
          توجه کنید که خروج از رشته باعث حذف درس های رشته فعلی از برد خواهد شد.
        </p>
      </div>
      <div class="majors">
        <router-link
          v-for="(major, i) in majorsList"
          :key="i"
          :to="'/board/' + major[0]"
        >
          <div class="major" v-if="availableMajors.includes(major[0])">
            <i :class="'mdi ' + major[2]"></i>
            <span>{{ major[1] }}</span>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>
<script>
import config from "../config.js";
import { majorsList } from "../config.js";
export default {
  name: "MajorSwitch",
  data: function () {
    return {
      majorsList: majorsList,
      availableMajors: config.sems.filter(function (x) {
        return x.code == localStorage.getItem("sem");
      })[0].majors,
      currentSemester: config.sems
        .filter(function (x) {
          return x.code == localStorage.getItem("sem");
        })[0]
        .title.replace("-", " | "),

      firstTimeVisit:
        localStorage.getItem("major") == null ||
        localStorage.getItem("major" == ""),
    };
  },
  created() {
    if (localStorage.getItem("finalized") == 1) {
      this.$router.push("/result");
      return 0;
    }
  },
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
  border: 1px solid #ececec;
  padding: 10px;
  cursor: pointer;
  border-radius: 10px;
}
.night_mode_on #major_switch .majors .major {
  background: #151c28;
  transition: 0.3s;
  color: rgba(255, 255, 255, 0.692);
  border-color: #151c28;
}
#major_switch .majors .major:hover {
  background: #151c28;
  transition: 0.3s;
  color: rgba(255, 255, 255, 1);
  border-color: #151c28;
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
  background: #f5f5f5;
  /* border-right:2px solid #f7a900; */
  color: rgb(75, 76, 92);
  border-radius: 10px;
  width: 600px;
  margin: auto;
  padding: 10px;
}
.night_mode_on #major_switch .warn {
  background: #151c28;
  color: #ffffffaf;
}
#major_switch p {
  font-size: 14px;
  line-height: 23px;
}
#major_switch .warn .mdi {
  float: right;
  color: #f7a900;
  font-size: 22px;
  margin-left: 7px;
  line-height: 22px;
}
</style>