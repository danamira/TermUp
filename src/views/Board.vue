<template>
  <div id="container">
    <div class="week" ref="week">
      <div class="alerts">
        <div class="intercepts" v-if="intercepts.length >= 1">
          <p>درس های متداخل پیدا شد:</p>
          <div class="item" v-for="set in intercepts" :key="set[0].code">
            <i class="mdi mdi-arrow-left"></i>
            {{ set[0].title.farsiNum() }}
            <span>{{ set[0].code.toString().farsiNum() }}</span> و
            {{ set[1].title.farsiNum() }}
            <span>{{ set[1].code.toString().farsiNum() }}</span>
          </div>
        </div>
      </div>
      <div class="week_days">
        <div class="week_head">
          <ul class="hours">
            <li
              v-for="h in openHours"
              :key="h"
              :style="'width:' + baseBlockWidth + 'px'"
            >
              {{ h.toString().farsiNum() }}
            </li>
          </ul>
        </div>
        <div class="day" v-for="day in weekDays" :key="day[0]">
          <div class="day_title">{{ day[1] }}</div>
          <div class="course_blocks">
            <div
              v-for="block in blocks[day[0]]"
              :key="block[0].code"
              class="course_block"
              :style="{
                width: block[2] * baseBlockWidth + 'px',
                right: block[3] * baseBlockWidth + 'px',
              }"
            >
              <i class="unpick mdi mdi-close" v-on:click="unpick(block[0])"></i>
              <span class="title">{{ block[0].title.farsiNum() }}</span>
              <span class="pro">{{ block[0].professor }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <SideBar
      :width="getWidth('SideBar')"
      :courses="courses"
      v-on:pick="pick"
    ></SideBar>
  </div>
</template>
<script>
import SideBar from "../components/SideBar.vue";
import data from "../data.json";
export default {
  name: "App",
  components: {
    SideBar,
  },
  data: function () {
    return {
      openHours: [7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
      courses: data,
      // intercepts: [],
      weekDays: [
        [0, "شنبه"],
        [1, "یکشنبه"],
        [2, "دوشنبه"],
        [3, "سه شنبه"],
        [4, "چهارشنبه"],
        [5, "پنجشنبه"],
      ],
      baseBlockWidth: 60,
      picked: [],
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
    unpick(course) {
        this.picked.forEach(function(anotherCourse,index,arr) {
          let same=anotherCourse.code==course.code
          if(same) {
            console.log('DELETED :'+index)
            arr.splice(index,1)
          }
        })
      
    },
    getWidth: function (element) {
      if (element == "week") {
        return window.innerWidth - 358 + "px";
      }
    },
    pick: function (course) {
      this.picked.push(course);
    },
  },
  mounted() {
    // console.log(this.courses);
    this.baseBlockWidth =
      (this.$refs.week.clientWidth - 70) / this.openHours.length;
  },

  computed: {
    blocks: function () {
      // this.intercepts = [];
      let all = [[], [], [], [], [], [], []];
      this.picked.forEach(function (course) {
        course.classDays.forEach(function (day) {
          if (day[0].trim() == "شنبه") {
            all[0].push([course, day[1], day[1][1] - day[1][0], day[1][0] - 7]);
          }
          if (day[0].trim() == "یک شنبه") {
            all[1].push([course, day[1], day[1][1] - day[1][0], day[1][0] - 7]);
          }
          if (day[0].trim() == "دو شنبه") {
            all[2].push([course, day[1], day[1][1] - day[1][0], day[1][0] - 7]);
          }
          if (day[0].trim() == "سه شنبه") {
            all[3].push([course, day[1], day[1][1] - day[1][0], day[1][0] - 7]);
          }
          if (day[0].trim() == "چهار شنبه") {
            all[4].push([course, day[1], day[1][1] - day[1][0], day[1][0] - 7]);
          }
          if (day[0].trim() == "پنج شنبه") {
            all[5].push([course, day[1], day[1][1] - day[1][0], day[1][0] - 7]);
          }
        });
      });
      return all;
    },
    intercepts: function () {
      let cepts = [];
      this.blocks.forEach(function (day) {
        day.forEach(function (block) {
          day.forEach(function (otherBlock) {
            // console.log('NOW:'+block[0].courseName+otherBlock[0].courseName)
            let result =
              block[3] >= otherBlock[3] &&
              block[3] < otherBlock[3] + otherBlock[2];
            console.log(result);
            let same = block[0].code == otherBlock[0].code;
            console.log(same);
            console.log(block, otherBlock);
            console.log("---------------------------------");
            if (result && !same) {
              cepts.push([block[0], otherBlock[0]]);
            }
          });
        });
      });
      return cepts;
    },
  },
};
</script>

<style>
* {
  box-sizing: border-box;
  padding: 0;
  font-family: IRANYekanWeb;
  font-weight: 100;
  margin: 0;
}
*:focus {
  outline: none;
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
  padding: 0 10px;
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
.option_series:last-child {
  border-left: none !important;
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
.week_days {
  margin-top: 25px;
}
.day {
  margin: 4px 0;
  width: 100%;
  overflow: hidden;
  display: block;
  height: 100px;
  position: relative;
  padding-right: 47px;
}
.day_title {
  width: 100px;
  background: #3178c3;
  color: #fff;
  height: 42px;
  transform: rotate(90deg);
  line-height: 42px;
  border-radius: 4px;
  text-align: center;
  position: absolute;
  top: 29px;
  font-size: 14px;
  right: -29px;
}
.course_blocks {
  position: relative;
  float: right;
}
.course_block {
  float: right;
  position: absolute;
  height: 100px;
  background: #202733;
  z-index:1000;
  color: #fff;
  border-radius: 4px;
  float: right;
  border-left: 1px solid rgb(255, 255, 255);
  border-right: 1px solid rgb(255, 255, 255);
  overflow: hidden;
  padding: 10px 5px;
}
.night_mode_on .course_block {
  border-color: rgb(68, 69, 88) !important;
}
.course_block .title {
  display: block;
  cursor: default;
  font-size: 14px;
}
.course_block .pro {
  font-size: 12px;
  color: rgb(180, 187, 206);
  margin-top: 5px;
  line-height: 22px;
  cursor: default;
  display: block;
}
.week_head {
  margin-bottom: 20px;
  overflow: hidden;
  padding-right: 48px;
}
.hours {
  overflow: hidden;
  color: #acafb1;
}
.hours li {
  display: block;
  float: right;
  width: 60px;
}
.intercepts {
  background: #d12a2a;
  color: #fff;
  margin-top: 10px;
  padding: 10px 20px;
  border-radius: 4px;
  font-size: 14px;
}
.intercepts p {
  display: block;
  margin-bottom: 5px;
}
.intercepts .item {
  padding: 5px 0;
}
.intercepts .item span {
  background: #992929;
  color: #dfb9b9;
  padding: 2px 4px;
  border-radius: 7px;
}
.intercepts .item .mdi {
  float: right;
  margin-left:5px;
  line-height: 18px;

}
.course_block .unpick {
    position: absolute;
    bottom:7px;
    left:7px;
    cursor: pointer;
    z-index: 10;
    background: #4e5f6e;
    border-radius: 8px;
    width:20px;
    height:20px;
    text-align: center;
    line-height: 21px;
    font-size: 13px;
    opacity: 0;
    transition:0.4s;
}
.course_block:hover .unpick {
  opacity: 1;
}
</style>
