<template>
  <div id="result_container">
    <header id="header">
      <img src="../assets/logo.png" id="logo" />
      <ul class="option_series" v-if="$route.name != 'Board'">
        <li>
          <a @click="edit">
            <i class="mdi mdi-pencil"></i>
            <span>ویرایش واحد ها</span>
          </a>
        </li>
      </ul>
      <ul class="option_series">
        <li><i class="mdi mdi-printer"></i><span>چاپ انتخاب ها</span></li>
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
        <span>مجموع واحد ها : {{ "24".farsiNum() }}</span>
      </h3>
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
}
.courses_result h3 span {
  float: left;
  background: rgb(30, 106, 221);
  padding: 2px 4px;
  font-size: 13.5px;
  border-radius: 4px;
  color: #fff;
  line-height: 20px;
  display: block;
}
</style>