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
@media only screen and (max-width: 700px) {

}
</style>
