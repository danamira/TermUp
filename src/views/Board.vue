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
      <div class="board_options">
        <i class="mdi mdi-menu expand-button"></i>
        <ul class="option_series">
          <li>
            <router-link to="/majors"
              ><i class="mdi mdi-school"></i
              ><span>تغییر رشته</span></router-link
            >
          </li>
        </ul>
        <ul class="option_series">
          <li>
            <router-link to="/print" target="_blank">
              <i class="mdi mdi-printer"></i><span>چاپ انتخاب ها</span>
            </router-link>
          </li>

          <li
            :class="boardIsCompatible ? 'Active' : 'disActive'"
            @click="exportAsImage"
          >
            <i class="mdi mdi-export-variant"></i><span>ذخیره برد</span>
          </li>
          <li id="del_all_button" @click="unpickAll()">
            <i class="mdi mdi-close"></i><span>حذف همه</span>
          </li>
        </ul>
        <ul class="option_series">
          <li
            id="done"
            :class="boardIsCompatible ? 'Active' : 'disActive'"
            @click="finalize"
          >
            <i class="mdi mdi-check"></i><span>تایید انتخاب ها</span>
          </li>
        </ul>
      </div>
      <div class="plans" @click="$emit('next-sem')">
        <i class="mdi mdi-calendar"></i>
        <span>{{ currentSemester.farsiNum() }}</span>
      </div>

      <div id="theme_switch" v-on:click="$emit('toggleTheme')">
        <i class="mdi mdi-theme-light-dark"></i>
      </div>
    </header>
    <div v-if="courses.length >= 1" id="container">
      <SideBar :courses="courses" @flash="passFlash" v-on:pick="pick"></SideBar>
      <div ref="week" class="week">
        <div class="alerts">
          <div v-if="intercepts.length >= 1" class="intercepts">
            <p>درس های متداخل پیدا شد:</p>
            <div v-for="set in intercepts" :key="set[0].code" class="item">
              <i class="mdi mdi-arrow-left"></i>
              {{ set[0].title.farsiNum() }}
              <span>{{ set[0].code.toString().farsiNum() }}</span> و
              {{ set[1].title.farsiNum() }}
              <span>{{ set[1].code.toString().farsiNum() }}</span>
            </div>
          </div>
        </div>
        <div class="picks">
          <div class="picked_list">
        <div class="picked_item" v-for="(course, i) in picked" :key="i">
          <h4>
            <span>{{ course.total.toString().farsiNum() }}</span>
              <i class="mdi mdi-close remove-course" @click="unpick(course)"></i>
              
          {{ course.title.farsiNum() }}
            
          </h4>
          <h5>{{ course.professor }}</h5>
          <ul>
            <li v-if="course.exam">
              <i class="mdi mdi-file-document-edit-outline"></i
              >{{ course.exam.farsiNum() }}
            </li>
            <li>
              <i class="mdi mdi-clock-outline"></i>
              <span v-for="(day, i) in course.classDays" :key="i"
                >{{ day[0] }} (
                {{ day[1][0].toString().farsiNum().replace(".", "/") }} تا
                {{ day[1][1].toString().farsiNum().replace(".", "/") }} )
              </span>
            </li>
            <li class="location">
              <i class="mdi mdi-map-marker"></i>
              {{ course.location != "" ? course.location.farsiNum() : "-" }}
            </li>
          </ul>
          <div class="code" @click="copyCode(course.code)">
            <span>{{ course.code.farsiNum() }}</span>
            <span><i class="mdi mdi-content-copy"></i></span>
          </div>
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
          <div v-for="day in weekDays" :key="day[0]" class="day">
            <div class="day_title">{{ day[1] }}</div>
            <div class="course_blocks">
              <transition-group name="list" tag="p">
                <div
                  v-for="block in blocks[day[0]]"
                  :key="block[0].code"
                  :style="{
                    width: block[2] * baseBlockWidth + 'px',
                    right: block[3] * baseBlockWidth + 'px',
                  }"
                  class="course_block"
                >
                  <i
                    class="unpick mdi mdi-close"
                    v-on:click="unpick(block[0])"
                  ></i>
                  <span class="title">{{ block[0].title.farsiNum() }}</span>
                  <span class="pro">{{ block[0].professor }}</span>
                </div>
              </transition-group>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else id="container">
      <div v-if="errorFetching" class="fetchError">
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
import html2canvas from "html2canvas";
import config from "../config";

export default {
  name: "App",
  components: {
    SideBar,
  },
  data: function () {
    return {
      // `openHours` consists of the hours which courses are presented in. This usually is the University's work hours.
      currentSemester: config.sems
        .filter(function (x) {
          return x.code == localStorage.getItem("sem");
        })[0]
        .title.replace("-", " | "),
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
    if (localStorage.getItem("finalized") == 1) {
      this.$router.push("/result");
      return 0;
    }

    let major = this.$route.params.major;

    if (localStorage.getItem("major") != major) {
      localStorage.courses_picked = "[]";
      this.picked = [];
      localStorage.setItem("major", major);
      localStorage.setItem("userCourses", "[]");
      this.$emit("flash", { msg: "رشته انتخاب شد.", class: "success" });
    }

    this.fetchData();
    // console.warn(this)
  },
  updated() {
    this.baseBlockWidth =
      (this.$refs.week.clientWidth - 70) / this.openHours.length;
  },
  methods: {
    // `updateStorage` will be called after each pick/unpick action. This method updates the `courses_picked` array in localStorage to the latest value of `picked` in component's data object.
    fetchData() {
      let app = this;
      axios
        .get(
          "/data/" +
            this.$route.params.major +
            "/" +
            localStorage.getItem("sem") +
            ".json"
        )
        .then((response) => {
          this.courses = response.data;
        })
        .catch(function (err) {
          app.errorFetching = 1;
          console.error("Error in fetching JSON data:", err);
        });
    },

    updateStorage() {
      if (localStorage.getItem("courses_picked") === null) {
        localStorage.setItem("courses_picked", JSON.stringify(this.picked));
      }
      localStorage.courses_picked = JSON.stringify(this.picked);
    },

    // `unpick` takes a course object and finds the corresponding course in `picked` array and removes it from there.
    unpick(course) {
      this.picked.forEach(function (anotherCourse, index, arr) {
        let same = anotherCourse.code == course.code;
        if (same) {
          arr.splice(index, 1);
        }
      });
      this.updateStorage();
    },

    pick: function (course) {
      let exist = 0;
      this.picked.forEach(function (otherCourse) {
        if (course.code == otherCourse.code) {
          exist = 1;
        }
      });
      if (!exist) {
        this.picked.push(course);
        this.updateStorage();
      }
    },

    unpickAll() {
      this.picked = [];
      this.updateStorage();
      this.$emit("flash", { msg: "با موفقیت حذف شد.", class: "success" });
    },

    exportAsImage() {
      if (this.intercepts.length != 0 || this.picked.length == 0) {
        return 0;
      }
      let board = document.querySelector(".week");
      html2canvas(board).then(function (canvas) {
        let imageData = canvas.toDataURL();
        let tmpLink = document.createElement("a");
        tmpLink.download = "TermUp-Board.png";
        tmpLink.href = imageData;
        document.body.appendChild(tmpLink);
        tmpLink.click();
        document.body.removeChild(tmpLink);
      });
    },

    finalize() {
      if (this.intercepts.length != 0 || this.picked.length == 0) {
        return 0;
      }
      localStorage.setItem("finalized", 1);
      this.$router.push("/result");
      this.$emit("flash", { msg: "انتخاب ها نهایی شد.", class: "success" });
    },

    copyCode(code) {
      navigator.clipboard.writeText(code);
      this.$emit("flash", { msg: "کپی شد!", class: "success" });
    },
    
    passFlash(flashMsg) {
      this.$emit("flash", flashMsg);
    },
  },

  computed: {
    /* `blocks` computed property returns an array containing 6 arrays each corresponding to a day in week and containing the picked courses that have a class on that day.
    For instance, blocks[0] contains all the courses in `picked` which have a class in saturday. */
    blocks: function () {
      // this.intercepts = [];
      let all = [[], [], [], [], [], []];
      this.picked.forEach(function (course) {
        course.classDays.forEach(function (day) {
          if (day[0].trim() == "شنبه") {
            all[0].push([course, day[1], day[1][1] - day[1][0], day[1][0] - 7]);
          } else if (day[0].trim() == "یک شنبه") {
            all[1].push([course, day[1], day[1][1] - day[1][0], day[1][0] - 7]);
          } else if (day[0].trim() == "دو شنبه") {
            all[2].push([course, day[1], day[1][1] - day[1][0], day[1][0] - 7]);
          } else if (day[0].trim() == "سه شنبه") {
            all[3].push([course, day[1], day[1][1] - day[1][0], day[1][0] - 7]);
          } else if (day[0].trim() == "چهار شنبه") {
            all[4].push([course, day[1], day[1][1] - day[1][0], day[1][0] - 7]);
          } else if (day[0].trim() == "پنج شنبه") {
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
            let result =
              block[3] >= otherBlock[3] &&
              block[3] < otherBlock[3] + otherBlock[2];

            let same = block[0].code == otherBlock[0].code;

            if (result && !same) {
              let alreadyAdded = 0;
              cepts.forEach(function (c) {
                if (
                  (c[0].code == block[0].code &&
                    c[1].code == otherBlock[0].code) ||
                  (c[1].code == block[0].code &&
                    c[0].code == otherBlock[0].code)
                ) {
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

    boardIsCompatible: function () {
      return this.intercepts.length == 0 && this.picked.length > 0;
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
  position: relative;
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
  border-color: #ffffff14 !important;
}

.day_title {
  width: 100px;
  background: #3178c3;
  color: #fff;
  height: 42px;
  transform: rotate(90deg);
  line-height: 42px;
  border-radius: 8px;
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
  border-radius: 8px;
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
  border-radius: 12px;
  font-size: 14px;
}

.night_mode_on .intercepts {
  background: #b42323;
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

.night_mode_on .intercepts .item span {
  background: #7c2727;
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

.fetchError {
  width: 700px;
  margin: 100px auto 300px;
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

.option_series li.disActive {
  cursor: default;
  color: #485761 !important;
  opacity: 0.4;
}

.option_series li.disActive:hover {
  color: #485761 !important;
}

.night_mode_on .option_series li.disActive {
  cursor: default;
  color: #a3bac9 !important;
  opacity: 0.4;
}

.night_mode_on .option_series li.disActive:hover {
  color: #a3bac9 !important;
}

.list-enter-active,
.list-leave-active {
  transition: all 0.5s;
}

.list-enter, .list-leave-to /* .list-leave-active below version 2.1.8 */ {
  opacity: 0;
  transform: translateY(30px);
}
.picks {
  display: none;
}
@media only screen and (max-width: 700px) {
  #container {
    width: 100% !important;
    max-width: 100% !important;
    min-width: 100% !important;
  }
  .week {
    /* opacity: 0; */
    z-index: 1;
    width:100%;
    min-width: 100%;
  }
  .week .week_days {
    display: none;
  }
  .picks {
    display: block;
    margin-top:5px;
    padding-bottom:100px;
    overflow: hidden;
  }
  .picks .picked {
    background: #202733;
    overflow: hidden;
    border-radius: 10px;
    color:#fff;
    margin:3px;
    padding:8px;
    width:100%;
    float: right;
  }
  .picked h3 {
    font-size: 17px;
    margin-bottom: 5px;
  }
}
</style>

