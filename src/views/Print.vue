<template>
  <div id="print_view">
    <div class="print_items">
      <h3 v-if="picked.length>0">
        درس های انتخاب شده
      </h3>

      <div v-if="picked.length>0">
        <div class="print_list">
          <div class="print_list_item" v-for="(course, i) in picked" :key="i">
            <h4>
              <span>{{ course.total.toString().farsiNum() }}</span>{{ course.title.farsiNum() }}
            </h4>
            <h5>{{ course.professor }}</h5>
            <ul>
              <li v-if="course.exam">
                <i class="mdi mdi-file-document-edit-outline"></i
                >{{ course.exam.farsiNum() }}
              </li>
              <li>
                <i class="mdi mdi-clock-outline"></i>
                <span v-for="(day, i) in course.classDays" :key="i">{{ day[0] }} (
                  {{ day[1][0].toString().farsiNum().replace(".", "/") }} تا
                  {{ day[1][1].toString().farsiNum().replace(".", "/") }} )
                </span>
              </li>
              <li class="location">
                <i class="mdi mdi-map-marker"></i>
                {{ course.location != "" ? course.location.farsiNum() : "-" }}
              </li>
            </ul>
              <span class="print_list_item_code">CODE: {{ course.code }}</span>
          </div>
        </div>
        <div class="combined" >
           مجموع: {{totalPicked.farsiNum()}} واحد
        </div>
      </div>
      <div v-else id="no_course">
        <i class="mdi mdi-archive-alert"></i>
        <h2>هیچ درسی پیدا نشد!</h2>
        <p>ابتدا از برد درس های مورد نظرتون رو انتخاب کنید و بعد به این صفحه برگردید!</p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Print",
  data() {
    return {
      picked: JSON.parse(localStorage.getItem("courses_picked")) || [],
    };
  },
  mounted() {
    // return 1;
    if(this.picked.length>0){
      window.print()
      window.onafterprint=function() {
        window.close()
      }
    }
  },
  computed:{
    totalPicked() {
      let pickedValues=this.picked.map((course)=>course.total)
      let result=0;
      pickedValues.forEach(function (value){
        result+=parseInt(value)
      })
      return result.toString()
    }
  }
};
</script>
<style>
body {
  padding:5px;
}
#print_view {
  padding:30px;
  border: 1px solid #ededed;
  border-radius: 4px;
  background: #fff;
}
#print_view h3 {
  font-size: 18px;
  display: block;
  text-align: center;
  margin-bottom: 30px;
}
#print_view h3 span {
  float: left;
  font-size: 14px;
}
.print_list {}
.print_list_item {
  overflow: hidden;
  margin-bottom: 20px;
  border-bottom: 1px dashed#ededed;
  padding:10px 0;

}
.print_list_item h4 {
  font-size: 16px;
}
.print_list_item h5 {
  font-size: 15px;
  margin: 10px 0;
  border-right: 2px solid;
  padding-right: 5px;
  display: block;
  color: #494949;
}
.print_list_item h4 span {
  float: left;
}
.print_list_item ul {
  list-style: none;
}
.print_list_item ul li{
  list-style: none;
  overflow: hidden;
  line-height: 20px;
  padding: 7px 0;
  display: block;
  color: #5e5e5e;
}
.print_list_item ul li .mdi{
  font-size: 20px;
  float: right;
  margin-left: 5px;
}
.print_list_item .print_list_item_code {
  float: left;
  background: #494949;
  line-height: 20px;
  padding:5px 10px;
  color: #fff;
  border-radius: 4px;
  font-size: 15px;
}
#footer {
  display: none;
}
.combined {
  text-align: left;
  font-size: 16px;
}
#no_course {
  width: 600px;
  margin:100px auto;
}
#no_course h2{
  display: block;
  text-align: center;
  margin-bottom: 20px;
  color: #ce3232;
}
#no_course p {
  display: block;
  text-align: center;
  font-size: 15px;
  color: #595959;
}
#no_course .mdi {
  color: #ce3232;
  font-size: 58px;
  display: block;
  text-align: center;
}
</style>
