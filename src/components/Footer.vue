<template>
  <div id="footer">
    <p class="copyright">
      <i class="mdi mdi-copyright"></i>{{copyright.farsiNum()}}
    </p>
    <div class="links">
      <a :href="repoUrl" target="_blank">
        <i class="mdi mdi-open-in-new"></i>
        مخزن پروژه
      </a>
      <router-link to="/contributors">
        <!-- <i class="mdi mdi-account-multiple"></i> -->
        مشارکت کنندگان
      </router-link>
    </div>
  </div>
</template>
<script>
export default {
  name: "Footer",
  data: function () {
    return {
      copyright: "کپی رایت 2021 | ساخته شده در چاپ کاناپه.",
      repoUrl: "https://github.com/danamira/TermUp"
    };
  },
};
</script>