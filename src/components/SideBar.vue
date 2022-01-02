<template>
  <div class="sidebar">
    <div class="search">
      <input type="text" v-model="query" placeholder="جستجو درس/استاد" />
      <i class="mdi mdi-magnify"></i>
    </div>
    <div class="search_result">
      <div v-if="!query == ''">
        <div v-for="course in courses" :key="course.code">
          <SearchResult
            v-if="
              course.title.startsWith(query) ||
              course.professor.startsWith(query)
            "
            v-bind:course="course"
            v-on:pick="pick"
          ></SearchResult>
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
    };
  },
  methods: {
    // Passing the picked course to the parent component(Board) 
    pick(course) {
      this.$emit("pick", course);
      this.query = "";
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
  border-color: #293240;
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
  border: none !important;
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
</style>