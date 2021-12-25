<template>
  <div class="item">
    <h3>
      {{ course.title.farsiNum()}} <span>{{ course.professor }}</span>
    </h3>
    <div class="timing">
      <span v-for="day in course.classDays" :key="day[1]">{{day[0]}} ( {{day[1][0].toString().farsiNum().replace(".","/")}} تا  {{day[1][1].toString().farsiNum().replace(".","/")}} )</span>
    </div>
    <div class="options">
      <!-- The icon below passes component's course to the parent layer(SideBar) when clicked. SideBar will proceed and pass it to the Board component later. -->
      <i class="mdi mdi-plus" v-on:click="$emit('pick',course)"></i>
      <i class="mdi mdi-dots-horizontal"></i>
    </div>
  </div>
</template>

<script>
export default {
  name: "SearchResult",
  props: ["course"],
};
</script>

<style>
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
  color: #000;
  color: #303b4e;
  width: 100%;
}
.search_result .item h3 span {
  float: left;
  font-size: 14px;
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
.search_result .item .options .mdi {
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
  overflow: hidden;
}
.search_result .item .timing span {
  display: block;
  float:right;
  padding:0 7px;
  border-left: 1px solid #bab9c4;
  margin-left: 5px;
  font-size: 14px;
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