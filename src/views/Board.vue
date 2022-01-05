<template>
  <div>
    <header id="header">
      <img src="../assets/logo.png" id="logo" />
      <ul class="option_series">
        <li>
          <router-link to="/majors"
            ><i class="mdi mdi-school"></i><span>تغییر رشته</span></router-link
          >
        </li>
      </ul>
      <ul class="option_series">
        <li><i class="mdi mdi-printer"></i><span>چاپ انتخاب ها</span></li>
        <li><i class="mdi mdi-share-variant"></i><span>اشتراک گذاری</span></li>
        <li id="del_all_button">
          <i class="mdi mdi-close"></i><span>حذف همه</span>
        </li>
        <li id="done">
          <i class="mdi mdi-check"></i><span>تایید انتخاب ها</span>
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
    <div v-if="courses.length >= 1" id="container">
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
                <i
                  class="unpick mdi mdi-close"
                  v-on:click="unpick(block[0])"
                ></i>
                <span class="title">{{ block[0].title.farsiNum() }}</span>
                <span class="pro">{{ block[0].professor }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <SideBar :courses="courses" v-on:pick="pick"></SideBar>
    </div>
    <div v-else id="container">
      <div class="fetchError" v-if="errorFetching">
        <i class="mdi mdi-emoticon-sad-outline"></i>
        <h3>خطا در دریافت اطلاعات</h3>
        <p>
          متاسفانه نتونستیم دیتا رو به درستی دریافت کنیم. اگه از وضیعت
          اینترنتتتون مطمئن هستید ، آدرس صفحه و رشته رو چک کنید. اگر مشکل حل نشد
          خبر بدید که درستش کنیم.
        </p>
      </div>
      <div v-else class="loading">
        <i class="mdi mdi-loading mdi-spin"></i>
        <h3>در حال دریافت درس ها</h3>
      </div>
    </div>
  </div>
</template>
<script>
import SideBar from "../components/SideBar.vue";
import axios from "axios";
export default {
  name: "App",
  components: {
    SideBar,
  },
  data: function () {
    return {
      // `openHours` consists of the hours which courses are presented in. This usually is the Univerity's work hours.
      openHours: [7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
      courses: [],
      errorFetching: 0,
      // `weekDays` consists of the days in week and their index.
      weekDays: [
        [0, "شنبه"],
        [1, "یکشنبه"],
        [2, "دوشنبه"],
        [3, "سه شنبه"],
        [4, "چهارشنبه"],
        [5, "پنجشنبه"],
      ],
      // Default value for the width of blocks on the board. This will be recalculated in `mounted` method according to the width of the board.
      baseBlockWidth: 60,
      /* The following line reads the previously picked courses from the localStorage object or assigns an empty value to it if the storage is undefined.
       localStorage would be updated after each pick/unpick action later. */
      picked: JSON.parse(localStorage.getItem("courses_picked")) || [],
    };
  },
  created() {
    let major = this.$route.params.major;
    if (localStorage.getItem("major") != major) {
      localStorage.courses_picked = "[]";
      this.picked = [];
    }

    localStorage.setItem("major", major);
    this.fetchData();
    // console.warn(this)
  },
  updated() {
    this.baseBlockWidth =
      (this.$refs.week.clientWidth - 70) / this.openHours.length;
  },
  methods: {
    // `updateStorage` will be called after each pick/unpick action. This method updates the `courses_picked` array in localStorage to the latest value of `picked` in component's data object.
    toggleTheme() {
      alert("Changed");
    },
    fetchData() {
      let app = this;
      axios
        .get("/data/" + this.$route.params.major + "/1400-01.json")
        .then((response) => {
          this.courses = response.data;
        })
        .catch(function (err) {
          app.errorFetching = 1;
          console.error("Error!!!!", err);
        });
    },
    updateStorage() {
      if (localStorage.getItem("courses_picked") === null) {
        // console.log("NULL IT IS");
        // console.log(this.picked);
        localStorage.setItem("courses_picked", JSON.stringify(this.picked));
      }
      localStorage.courses_picked = JSON.stringify(this.picked);
    },
    // `unpick` takes a course object and finds the corresponding course in `picked` array and removes it from there.
    unpick(course) {
      this.picked.forEach(function (anotherCourse, index, arr) {
        let same = anotherCourse.code == course.code;
        if (same) {
          // console.log("DELETED :" + index);
          arr.splice(index, 1);
        }
      });
      this.updateStorage();
    },
    pick: function (course) {
      this.picked.push(course);
      this.updateStorage();
    },
  },

  mounted() {
    // Calculating the width of each block/tile on the board. `$this.refs.week` refers to the div.week DOM element.
    // this.baseBlockWidth =;
    // console.warn("SKS")
    // console.warn(this.$refs)
  },

  computed: {
    /* `blocks` computed property returns an array containing 6 arrays each correponding to a day in week and containing the picked courses that have a class on that day.
    For instance, blocks[0] contains all the courses in `picked` which have a class in saturday. */
    blocks: function () {
      // this.intercepts = [];
      let all = [[], [], [], [], [], []];
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
    /* `intercepts` computed property includes arrays containg courses which intersect each other.
     If courses A and B both have a class at the same time on the same day, `intercepts` would contain an array with courses A and B inside it.*/
    intercepts: function () {
      let cepts = [];
      this.blocks.forEach(function (day) {
        day.forEach(function (block) {
          day.forEach(function (otherBlock) {
            // console.log('NOW:'+block[0].courseName+otherBlock[0].courseName)
            let result =
              block[3] >= otherBlock[3] &&
              block[3] < otherBlock[3] + otherBlock[2];
            // console.log(result);
            let same = block[0].code == otherBlock[0].code;
            // console.log(same);
            // console.log(block, otherBlock);
            // console.log("---------------------------------");
            if (result && !same) {
              let alreadyAdded = 0;
              cepts.forEach(function (c) {
                if (
                  (c[0].code == block[0].code &&
                    c[1].code == otherBlock[0].code) ||
                  (c[1].code == block[0].code &&
                    c[0].code == otherBlock[0].code)
                ) {
                  console.warn("EXIISTT");
                  alreadyAdded = 1;
                }
              });
              if (!alreadyAdded) {
                cepts.push([block[0], otherBlock[0]]);
              }
            }
          });
        });
      });
      return cepts;
    },
  },
};
</script>
<!-- CSS styles of the timetable. -->
<!-- Styles appended when dark-mode is on are classified with `.night_mode_on` class. -->
<style>
.week {
  padding: 0 10px;
  min-height: 700px;
  width: calc(100% - 380px);
  float: right;
}
.week_days {
  margin-top: 25px;
}
.day {
  width: 100%;
  overflow: hidden;
  display: block;
  height: 100px;
  position: relative;
  padding-right: 47px;
  height: 105px;
  margin-bottom: 4px;
  border-bottom: 1px solid #eaf0f1;
}
.day:last-child {
  border-bottom: none !important;
}
.night_mode_on .day {
  border-color: #232732 !important;
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
  z-index: 1000;
  color: #fff;
  border-radius: 4px;
  float: right;
  border-left: 1px solid rgb(255, 255, 255);
  border-right: 1px solid rgb(255, 255, 255);
  overflow: hidden;
  padding: 10px 5px;
}
.night_mode_on .course_block {
  border-color: #0b1320 !important;
}
.course_block .title {
  display: block;
  cursor: default;
  font-size: 14px;
}
.course_block .pro {
  font-size: 12px;
  color: rgb(180, 187, 206);
  margin-top: 4px;
  line-height: 16px;
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
  margin-left: 5px;
  line-height: 18px;
}
.course_block .unpick {
  position: absolute;
  bottom: 7px;
  left: 7px;
  cursor: pointer;
  z-index: 10;
  background: #4e5f6e;
  border-radius: 8px;
  width: 20px;
  height: 20px;
  text-align: center;
  line-height: 21px;
  font-size: 13px;
  opacity: 0;
  transition: 0.4s;
}
.course_block:hover .unpick {
  opacity: 1;
}
.week_head .hours li:before {
  content: "";
  display: block;
  position: absolute;
  height: 1000x;
  width: 1px;
  background: #000;
}
.fetchError {
  width: 700px;
  margin: auto;
  margin-top: 100px;
  margin-bottom: 300px;
}
.fetchError .mdi {
  font-size: 60px;
  display: block;
  line-height: 60px;
  color: rgb(235, 57, 57);
  text-align: center;
}
.fetchError h3 {
  font-size: 19px;
  color: rgb(235, 57, 57);
  display: block;
  text-align: center;
}
.night_mode_on .fetchError * {
  color: #85a6c5 !important;
}
.fetchError p {
  font-size: 14px;
  line-height: 32px;
  color: #202733;
  padding-right: 10px;
  border-right: 2px solid;
  margin-top: 18px;
}
.loading {
  width: 700px;
  margin: auto;
  margin-top: 100px;
  margin-bottom: 360px;
}
.loading .mdi {
  font-size: 60px;
  display: block;
  text-align: center;
  color: rgb(56, 64, 85);
}
.loading h3 {
  display: block;
  text-align: center;
  font-size: 16px;
  color: rgb(43, 51, 66);
}
.night_mode_on .loading h3 {
  color: rgb(81, 80, 129);
}
.night_mode_on .loading * {
  color: #85a6c5 !important;
}
</style>
