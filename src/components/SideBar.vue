<template>
  <div class="sidebar">
    <div class="search">
      <input v-model="query" placeholder="جستجو درس/استاد" type="text" />
      <i class="mdi mdi-magnify"></i>
    </div>
    <div class="search_result">
      <div v-if="!query == ''">
        <div v-for="course in found" :key="course.code">
          <SearchResult
            v-bind:course="course"
            @flash="passFlash"
            v-on:pick="pick"
          ></SearchResult>
        </div>
        <div v-if="found.length == 0" class="nothing_found">
          <i class="mdi mdi-emoticon-neutral-outline"></i>
          <span class="title">درسی پیدا نشد!</span>
          <p>میتونی درس رو از اینجا دستی اضافه کنی.</p>
          <button
            id="manual"
            @click="
              show_new_course_modal = 1;
              newCourse.title = query;
            "
          >
            اضافه کردن `{{ query }}`
          </button>
        </div>
      </div>
      <div v-else>
        <img
          src="../assets/Search.png"
          style="width: 130px; display: block; margin: 30px auto"
        />
        <p
          style="
            display: block;
            font-size: 13px;
            text-align: center;
            color: #7f899b;
          "
        >
          برای شروع نام درس یا استاد را وارد کنید...
        </p>
      </div>
    </div>
    <div id="new_course_modal_back" v-if="show_new_course_modal">
      <div class="modal_box" id="new_course">
        <div class="modal_box_header">
          <span>درس جدید</span>
          <i class="mdi mdi-close" @click="show_new_course_modal = 0"></i>
        </div>
        <div class="modal_box_content">
          <label>عنوان درس:</label>
          <input type="text" v-model="newCourse.title" />
          <label>استاد درس:</label>
          <input type="text" v-model="newCourse.professor" />
          <label>تعداد واحد:</label>

          <input
            type="number"
            placeholder="حداقل صفر"
            min="0"
            v-model="newCourse.total"
          />
          <label>جنسیت:</label>
          <select v-model="newCourse.gender">
            <option value="مختلط">مختلط</option>
            <option value="مرد">مرد</option>
            <option value="زن">زن</option>
          </select>
          <div class="hline"></div>
          <label>ساعت های کلاس:</label>
          <div class="newCourseClasses" v-if="newCourse.classDays.length!=0">
                <span class="newCourseClass" v-for="(day,i) in newCourse.classDays" :key="i">{{day[0]}} ( {{day[1][0].toString().farsiNum().replace(".","/")}} تا  {{day[1][1].toString().farsiNum().replace(".","/")}} )</span>
                <span class="delete_all_hours" @click="newCourse.classDays=[]">حذف همه</span>
          </div>
          
          <div class="add_hour">
            <select v-model="newClassDay">
              <option value="شنبه">شنبه</option>
              <option value="یک شنبه">یکشنبه</option>
              <option value="دو شنبه">دوشنبه</option>
              <option value="سه شنبه">سه شنبه</option>
              <option value="چهار شنبه">چهارشنبه</option>
              <option value="پنج شنبه">پنجشنبه</option>
            </select>
             از 
            <input type="number" min="8" max="20" placeholder="ساعت شروع" v-model="newClassStartsAt">
             تا 
            <input type="number" min="8" max="20" placeholder="ساعت پایان" v-model="newClassEndsAt">
            <i class="mdi mdi-plus" @click="addHourToNewClass"></i>
          </div>
          <button @click="addNewCourse" id="add_new_course">اضافه کردن</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import SearchResult from "./SearchResult.vue";

export default {
  name: "Search",
  props: {
    courses: Array,
  },
  data: function () {
    return {
      query: "",
      show_new_course_modal: 0,
      newCourse: {
        title: "",
        professor: "",
        capacity: '-',
        gender: "مختلط",
        total: 2,
        code: "-",
        classDays: [],
        exam:'-',
        location:'-',
      },
      newClassStartsAt:null,
      newClassEndsAt:null,
      newClassDay:'شنبه',
      userCourses: JSON.parse(localStorage.getItem("userCourses")) || [],
    };
  },
  computed: {
    found: function () {
      let quer = this.query;
      return (this.courses.concat(this.userCourses)).filter(function (course) {
        return (
          course.title.startsWith(quer) || course.professor.startsWith(quer)
        );
      });
    },
  },
  methods: {
    // Passing the picked course to the parent component(Board)
    pick(course) {
      this.$emit("pick", course);
      this.query = "";
    },
    addHourToNewClass() {
      if(parseInt(this.newClassStartsAt)>=parseInt(this.newClassEndsAt)) {
        this.$emit('flash',{class:'error',msg:'زمان شروع و پایان تطابق ندارند!'})
        return -1;
      }
      
      this.newCourse.classDays.push([this.newClassDay,[this.newClassStartsAt,this.newClassEndsAt]])
      this.newClassDay='شنبه';
      this.newClassStartsAt=null;
      this.newClassEndsAt=null;
    },
    addNewCourse() {
      let x=this.newCourse;
      if(x.classDays.length==0) {
        this.$emit('flash',{class:'error',msg:'هیچ بازه زمانی اضافه نشده!'})
        return -1;
      }
      x.code='TUP-'+String(parseInt(Math.random()*1000000000));
      this.userCourses.push(x)
      localStorage.setItem('userCourses',JSON.stringify(this.userCourses))
      this.show_new_course_modal = 0;
      this.newCourse=   {
        title: "",
        professor: "",
        capacity: '-',
        gender: "مختلط",
        total: 2,
        code: "-",
        classDays: [],
        exam:'-',
        location:'-'
      };
      this.$emit("flash", { msg: "اضافه شد!", class: "success" });

    },
    passFlash(flashMsg) {
      this.$emit("flash", flashMsg);
    },
  },
  components: {
    SearchResult,
  },
};
</script>
<style>
.sidebar {
  min-height: 600px;
  width: 380px;
  float: left;
  border-right: 1px solid #ededed;
  padding: 0 10px;
}

.night_mode_on .sidebar {
  border-color: rgba(255, 255, 255, 0.15);
}

.search {
  background: #fff;
  border: 1px solid #ededed;
  border-radius: 4px;
  position: relative;
  margin: 10px 0;
}

.night_mode_on .search {
  background: #1c2534;
  color: #fff;
  border-color: #1c2534 !important;
}

.night_mode_on .search input {
  color: #fff;
}

.search input {
  border: none;
  display: block;
  height: 36px;
  width: 100%;
  overflow: hidden;
  color: #000;
  background: transparent;
  padding: 0 10px;
  padding-left: 36px;
  line-height: 36px;
}

.night_mode_on .search input::placeholder {
  color: #ffffff61;
}

.search .mdi {
  position: absolute;
  left: 10px;
  top: 0;
  display: block;
  height: 100%;
  color: #303b4e;
  line-height: 36px;
  font-size: 19px;
}

.night_mode_on .search .mdi {
  color: rgb(159, 166, 207);
}
.nothing_found {
  padding: 10px 0;
}
.nothing_found .mdi {
  display: block;
  text-align: ca;
  text-align: center;
  font-size: 54px;
  color: #a5adbb;
}
.nothing_found .title {
  display: block;
  text-align: center;
  color: #384862;
}
.nothing_found p {
  font-size: 13px;
  padding: 10px;
  line-height: 21px;
  text-align: center;
  color: #5a6270;
}
#manual {
  display: block;
  margin: 10px auto;
  font-size: 14px;
  padding: 6px 10px;
  background: #2c67cf;
  border: none;
  color: #fff;
  border-radius: 5px;
  cursor: pointer;
}
#add_new_course {
  display: block;
  margin-top: 20px;
  width: 100%;

  font-size: 14px;
  padding: 10px 10px;
  background: #2c67cf;
  border: none;
  color: #fff;
  border-radius: 5px;
  cursor: pointer;
}
#new_course input,
#new_course select {
  display: block;
  width: 100%;
  background: #fff;
  border: 1px solid #ededed;
  padding: 10px;
  border-radius: 4px;
  line-height: 20px;
  margin-bottom: 0px;
}
#new_course label {
  padding: 8px 0;
  display: block;
  font-size: 12.5px;
  padding-right: 2px;
}
#new_course label:first-child {
  padding-top: 0;
}
#new_course {
  margin-top: 30px !important;
  width: 600px;
}
.hline {
  display: block;
  width: 100%;
  height: 1px;
  background: #ededed;
  margin: 10px 0;
}
.add_hour {
  overflow: hidden;
  width: auto;
  margin: auto;
}
.add_hour input,
.add_hour select {
  width: 28% !important;
  margin-left: 1.5px;
  margin-right: 1.5px;
  display: inline !important;
}
.add_hour .mdi {
  color: rgb(11, 172, 131);
 display: block;
    width: 40px;
    border:1px solid #ededed;
    float: left;
    height: 40px;
    margin-top:1px;
    cursor: pointer;
    border-radius: 4px;
    float: left;
    margin-left: 4px;
    text-align: center;
    line-height: 40px;
    display: block;
    font-size: 24px;
}
.newCourseClasses {
  overflow: hidden;
  padding:5px 0;
  margin-bottom: 10px;
}
.newCourseClass,.delete_all_hours {
  background: #5a6270;
  color:#ffffff;
  padding:2px 10px;
  font-size: 13px;
  margin-left: 4px;
  border-radius: 4px;
  line-height: 20px;
}
.delete_all_hours {
  background: #fff;
  border:1px solid #ededed;
  color:#5a6270;
  cursor: pointer;
}
.delete_all_hours:hover{
  background: rgb(221 49 64);
  border-color: rgb(221 49 64);
  color:#fff;
}
</style>