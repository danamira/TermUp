<template>
  <div id="result_container">
    <header id="header">
    <img class="logo logo_day" alt="Logo for TermUp" src="../assets/logo.png">
      <img class="logo logo_night" alt="Logo for TermUp" src="../assets/logo_night.png">
      
      <ul class="option_series" v-if="$route.name != 'Board'">
        <li>
          <a @click="edit">
            <i class="mdi mdi-pencil"></i>
            <span>ویرایش واحد ها</span>
          </a>
        </li>
      </ul>
      <ul class="option_series">
        <li>
          <router-link to="/print" target="_blank">
            <i class="mdi mdi-printer"></i><span>چاپ انتخاب ها</span>
          </router-link>
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
    <div class="courses_result">
      <h3>
        درس های انتخاب شده:
        <span> مجموع واحد ها : {{ totalPicked.farsiNum() }} </span>
      </h3>
      <div class="result_caution">
        <i class="mdi mdi-alert-circle"></i>
        <p>
          واحد های انتخاب شده نهایی نیستند. برای ثبت انتخاب ها در دانشگاه در
          بازه انتخاب واحد خودتان به گلستان مراجعه کنید و کد های انتخابی را وارد
          کنید. چون در برنامه قبل از شروع ترم تاریخ بسیاری از امتحانات وارد
          نشده/کامل نیست ترمآپ تداخل تاریخ های امتحانی را بررسی نمی کند. برای
          مطمئن شدن از قابل قبول بودن واحد های انتخاب شده میتوانید تاریخ
          امتحانات و تداخل آنها را از لیست زیر بررسی کنید.
        </p>
      </div>

      <div class="picked_list">
        <div class="picked_item" v-for="(course, i) in picked" :key="i">
          <h4>
            <span>{{ course.total.toString().farsiNum() }}</span
            >{{ course.title.farsiNum() }}
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
  </div>
</template>
<script>
export default {
  name: "Result",
  created() {
    // alert("SHOWING RESULT.");
  },
  data() {
    return {
      picked: JSON.parse(localStorage.getItem("courses_picked")) || [],
    };
  },
  methods: {
    edit() {
      localStorage.setItem("finalized", 0);
      this.$router.push("/board/" + localStorage.getItem("major"));
    },
    copyCode(code) {
      navigator.clipboard.writeText(code);
      this.$emit("flash", { msg: "کپی شد!", class: "success" });
    },
  },
  computed: {
    totalPicked() {
      let pickedValues = this.picked.map((course) => course.total);
      let result = 0;
      pickedValues.forEach(function (value) {
        result += parseInt(value);
      });
      return result.toString();
    },
  },
};
</script>
<style>
#result_container {
  min-height: 650px;
}
.courses_result {
  padding: 20px;
}
.courses_result h3 {
  color: rgb(85, 90, 121);
  font-size: 16px;
  line-height: 30px;
  margin-bottom: 5px;
}
.courses_result h3 span {
  float: left;
  background: rgb(30, 106, 221);
  padding: 2px 6px;
  font-size: 13.5px;
  border-radius: 8px;
  color: #fff;
  line-height: 20px;
  display: block;
}
.picked_list {
  margin: 25px 0;
}
.picked_item {
  width: 33%;
  float: right;
  padding: 0 15px;
  border-left: 1px solid #ededed;
  height: 225px;
  overflow: hidden;
  margin: 15px 0;
}
.picked_item h4 {
  font-size: 16px;
  color: #1c345c;
  display: block;
}
.picked_item:nth-child(3n) {
  border-left: none !important;
}
.picked_item h4 span {
  float: left;
  background: #1c345c;
  color: #fff;
  line-height: 20px;
  padding: 2px 8px;
  border-radius: 8px;
}
.picked_item h5 {
  margin: 5px 0;
  color: #8391aa;
  font-size: 14px;
}
.picked_item ul {
  margin-top: 15px;
  display: block;
  border-top: 1px dashed #ededed;
  padding-top: 10px;
  list-style: none;
}
.picked_item li {
  padding: 5px 0;
  height: 36px;
  overflow: hidden;
  display: block;
  font-size: 14px;
  color: #1c345c;
  line-height: 26px;
}
.picked_item li .mdi {
  float: right;
  font-size: 20px;
  line-height: 24px;
  color: rgb(84 93 106);
  margin-left: 5px;
}
.picked_item li.location {
  font-size: 13px;
}
.picked_item .code {
  margin: 10px 0;
  text-align: center;
  background: #e8ecee;
  position: relative;
  color: #202938;
  line-height: 28px;
  padding: 3px 0;
  border-radius: 12px;
  font-size: 14px;
  direction: ltr !important;
  cursor: pointer;
}
.picked_item .code .mdi {
  font-size:18px;
}
.picked_item .code span:nth-child(1) {
  transition: 0.1s;
}
.picked_item .code span:nth-child(2) {
  opacity: 0;
  /* display: none; */
  position: absolute;
  width: 100%;
  line-height: 26px;
  height: 100%;
  left: 0;
  display: block;
  font-size: 13px;
  top: 3px;
  text-align: center;
}
.picked_item .code:hover span:nth-child(1) {
  opacity: 0;
  transition: 0s;
}
.picked_item .code:hover span:nth-child(2) {
  transition: 0.4s;
  opacity: 1;
}
.result_caution {
  background: #dae5e9;
  color: #424f64;
  padding: 10px 15px;
  border-radius: 12px;
  font-size: 13px;
  overflow: hidden;
  position: relative;
  margin-top: 10px;
  line-height: 26px;
}
.result_caution .mdi {
  margin-left: 5px;
  position: absolute;
  left: -5px;
  bottom: 2px;
  font-size: 72px;
  transform: rotate(10deg);
  color: hsla(218, 53%, 24%, 0.07);
}
.night_mode_on .courses_result h3 {
  color: #fff;
}
.night_mode_on .result_caution {
  background: #202733 !important;
  color: rgb(186, 191, 211);
}
.night_mode_on .result_caution .mdi {
  color: rgba(157, 164, 189, 0.07);
}
.night_mode_on .picked_item .code {
  background: #1c2534;
  color: #9babc7;
}
.night_mode_on .picked_item h4 {
  color: #eceef7;
}
.night_mode_on .picked_item h4 span {
  background: #202733 !important;
}
.night_mode_on .picked_item,
.night_mode_on .picked_item ul {
  border-color: rgba(255, 255, 255, 0.1);
}
.night_mode_on .picked_item ul li,
.night_mode_on .picked_item ul li .mdi {
  color: rgb(156, 161, 180);
}
</style>
