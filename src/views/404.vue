<template>
  <div id="notFound">
    <i class="mdi mdi-alert-decagram"></i>
    <h1>{{ "خطای 404".farsiNum() }}</h1>
    <p>
      صفحه ای که دنبالش میگشتی پیدا نشد! شاید صفحه حذف شده، مربوط به ترم های
      قبلیه یا اینکه آدرسو اشتباهی اومدی!
    </p>
    <router-link to="/">صفحه اصلی</router-link>
  </div>
</template>
<style scoped>
h1 {
  display: block;
  font-size: 25px;
  text-align: center;
  color: #334158;
}
#notFound {
  width: 420px;
  max-width: 100%;
  height: 420px;
  display: block;
  margin: 100px auto;
}
.mdi {
  font-size: 54px;
  color: #fab112;
  display: block;
  text-align: center;
}
p {
  display: block;
  text-align: center;
  line-height: 30px;
  font-size: 16px;
  margin-top: 10px;
  color: #334158;
}
a{
    background: #edf2f5;
    display: block;
    text-align: center;
    font-size: 14px;
    margin: 10px 129px 15px;
    padding: 8px;
    border-radius: 4px;
}
</style>