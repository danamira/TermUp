<template>
  <div class="item">
    <h3>
      {{ course.title.farsiNum()}} <span>{{ course.professor }}</span>
    </h3>
    <div class="timing">
      <span v-for="day in course.classDays" :key="day[1]">{{day[0]}} ( {{day[1][0].toString().farsiNum().replace(".","/")}} تا  {{day[1][1].toString().farsiNum().replace(".","/")}} )</span>
    </div>
    <div class="more_info" v-if="expanded">
      <ul>
        <li><i class="mdi mdi-account-multiple"></i>
        <span>ظرفیت:</span>
        {{(course.capacity).toString().farsiNum()}}
        </li>
        <li><i class="mdi mdi-gender-male-female"></i>
        <span>جنسیت:</span>
        {{(course.gender).toString().farsiNum()}}
        </li>
        <li><i class="mdi mdi-school"></i>
        <span>واحد:</span>
        {{(course.total).toString().farsiNum()}}
        </li>
      </ul>
    </div>
    <div class="options">
      <span class="course_code" v-if="expanded">
        <i class="mdi mdi-content-copy"></i>
        {{course.code.farsiNum()}}
      </span>
      <!-- The icon below passes component's course to the parent layer(SideBar) when clicked. SideBar will proceed and pass it to the Board component later. -->
      <i class="button mdi mdi-plus" v-on:click="$emit('pick',course)"></i>
      <i class="button mdi mdi-dots-horizontal" v-on:click="expanded=!expanded"></i>
    </div>
    
  </div>
</template>

<script>
export default {
  name: "SearchResult",
  props: ["course"],
  data() {
    return {
      expanded:0
    }
  }
};
</script>

<style>
.search_result .more_info {
  margin-bottom: -10px;
}
.search_result ul {
  list-style: none;
  margin-top: 10px;
  color: #667181;
  overflow: hidden;
}
.night_mode_on .search_result ul {
  color:#ffffffb5;
}
.search_result ul li{
  font-size: 14px;
  display: block;
  margin: 5px 0;
  padding-bottom: 6px;
  float: right;
  /* padding-right: 15px; */
  width: 100%;
  line-height: 23px;
  border-bottom: 1px dashed #eeeeee;
  position: relative;
}
.night_mode_on .search_result ul li{
  border-bottom: 1px dashed #333646a3 !important;
}
.search_result ul li:last-child{
  border-bottom: none;
 }
.search_result ul li:before{
  content: '';
  display: block;
  background: #e7edf0;
  width: 9px;
  height: 9px;
  left:0;
  border-radius: 3px;
  top:5px;
  position: absolute;
} 
.night_mode_on .search_result ul li:before {
  background: #383b4a;
} 
.search_result ul li:nth-child(even) {
  border-left: none;
}
.search_result ul li .mdi {
  font-size: 15px;
  line-height: 25px;
  border-radius: 5px;
  color: #4e536e;
  background: #e7edf0;
  display: block;
  width:25px;
  text-align: center;
  height: 25px;
  float: right;
  margin-left: 4px;
}
.night_mode_on .search_result ul li .mdi {
  color: #ededed;
  background: #33374a;
}
.search_result .item {
  width: 100%;
  display: block;
  border: 1px solid #ededed;
  padding: 10px;
  margin-bottom: 6px;
  border-radius: 4px;
}
.search_result .item h3 {
  overflow: hidden;
  font-weight: 100;
  display: block;
  font-size: 14.5px;
  color: #303b4e;
  width: 100%;
}
.search_result .item h3 span {
  float: left;
  font-size: 13.5px;
  color: #7f899b;
}
.search_result .item .options {
  display: block;
  width: 100%;
  overflow: hidden;
  margin-top: 15px;
}
.night_mode_on .search_result .item .options .mdi {
  background: #8d9ba1;
  line-height: 25px;
}
.search_result .item .options .button {
  display: block;
  float: left;
  margin-right: 6px;
  width: 25px;
  height: 25px;
  background: #dae5e9;
  line-height: 25px;
  color: #5a6a85;
  text-align: center;
  border-radius: 5px;
  cursor: pointer;
}
.search_result .options .course_code {
  float: right;
  display: block;
  direction: ltr;
  text-align: left;
  height:25px;
  font-size: 13px;
  line-height: 27px;
  background: #5d6778;
  color: #fff;
  border-radius: 4px;
  cursor: pointer;
  padding: 0 5px;
}
.night_mode_on .search_result .options .course_code {
  background: #2c3544;
}
.search_result .options .course_code .mdi {
  float: left;
  font-size: 14px;
  line-height: 26px;
  margin-right: 5px;
  background: transparent !important;
}
.search_result .item .options .mdi-plus {
  color: #fff;
  background: #3a7ef5;
}
.night_mode_on .search_result .item .options .mdi-plus {
  color: #fff;
  background: #3a7ef5;
}
.search_result .item .timing {
  margin-top: 10px;
  /* margin-bottom: 3px; */
  overflow: hidden;
}
.search_result .item .timing span {
  display: block;
  float:right;
  padding:0 7px;
  border-left: 1px solid #bab9c4;
  color: #5a6a85;
  margin-left: 5px;
  font-size: 13.5px;
}

.search_result .item .timing span:last-child {
  border-left: none !important;
}

.search_result .item .timing span:first-child{
  padding-right:0 !important;
}
.night_mode_on .search_result .item {
  border-color: transparent;
  background: #1f2734;
}
.night_mode_on .search_result .item h3 {
  color: #fff !important;
}
.night_mode_on .search_result .item h3 span {
  color: #fff !important;
  opacity: 0.7;
}
.night_mode_on .search_result .item .timing span {
  color: #fff !important;
  opacity: 0.8;
}
</style>