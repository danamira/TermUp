<template>
  <div>
    <header id="header">
      <img src="../assets/logo.png" id="logo" alt="Logo for TermUp">
      <ul class="option_series" v-if="$route.name != 'Board'">
        <li>
          <a @click="$router.go(-1)">
            <i class="mdi mdi-arrow-left-circle-outline"></i
            ><span>برگشت به قبلی</span>
          </a>
        </li>
      </ul>
      <ul class="option_series">
        <li>
          <a :href="'mailto:'+devEmail"
          ><i class="mdi mdi-comment-quote-outline"></i><span>ثبت بازخورد</span></a>
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
    <div id="about_view">
      <h1>درباره پروژه</h1>
      <h2>ترمآپ چیکار میکنه؟</h2>
      <p>
        ترمآپ یک اپلیکیشن تحت وب برای بازبینی دروس ارائه شده هر ترم دانشگاه
        تهران بر اساس رشته تحصیلی شماست. از ترمآپ میشه برای برنامه ریزی ترم
        آینده و انتخاب و بررسی واحد ها قبل از تایم اصلی انتخاب واحد استفاده کرد.
        پیدا کردن تداخل های زمانی داخل روز های ارائه درس و تایم های امتحان و سبک
        سنگین کردن برنامه هفتگی همیشه از مشکلات دانشجو ها در موقع انتخاب واحد
        بوده. ترمآپ به وجود اومده تا این کار ها رو براتون آسون تر کنه.
      </p>
      <h2>ترمآپ چطور ساخته شده؟</h2>
      <p>
        ترمآپ از ترمیناتور شریف ایده گرفته شده. ورژن اولیه برای ترم پاییز هزار و چهارصد تست شد و ورژن عمومی در ترم دوم همین سال قابل دسترس هست.
        <br>
        <img src="../assets/PoweredByVue.png" alt="ترمآپ قدرت گرفته از ویو">
        ترمآپ از فریم ورک Vue.js استفاده میکنه. تمامی اطلاعات و تنظیمات شما در مرورگرتون ذخیره میشن و بجز شما هیچکس دیگه ای بشون دسترسی نداره.
        برای اینکه تنظیمات و انتخاب هاتون رو سیو کنید میتونید از localStorage مرورگر پشتیبان بگیرید، میتونید خروجی PDF و PNG هم دریافت کنید.
        اگر یک برد براتون کافی نیست میتونید از حالت Incognito مرورگرتون استفاده کنید یا اینکه با مروگر های مختلف/دیوایس های مختلف سر بزنید که برد های متفاوت داشته باشید.
        <br>
        برای بررسی کد و گرفتن بیلد برای خودتون میتونید به مخزن پروژه در گیت هاب سر بزنید تا مطابق نیاز خودتون اپ رو تغییر بدید. اگر نظری پیشنهادی دارید از گزینه ثبت بازخورد میتونید با من در ارتباط باشید.
  
      </p>
      <h2>کیا به توسعه کمک کردن؟</h2>
      <p>افراد زیر در ترم جاری به توسعه ترمآپ کمک کردن. همینجا ازشون تشکر میکنیم:</p>
      <ul class="contributors">
        <li class="special"><i class="mdi mdi-star"></i> میلاد ماهار</li>
        <li><i class="mdi mdi-code-tags"></i> ادیب رضایی</li>
        <li>محمدامین زینالی</li>
        <li>فاطمه اکبری</li>
        <li>سینا نائینیان</li>
        <li class="special"><i class="mdi mdi-star"></i> آرمان حاج محمدی</li>
        <li>محمد ناصری</li>
        <li>محمدرضا جعفری</li>
        <li>امیرسجاد افشار</li>
        <li>محمدرضا پاشایی</li>
        <li>پروا شریفی</li>
        <li>زینب امینی</li>
        <li>فاطمه جباری</li>
        <li>همایون</li>
        <li>گلناز کلانتری</li>
        <li>آرین مرادی</li>
      </ul>
    </div>
  </div>
</template>
<style>
#about_view {
  max-width: 1000px;
  margin: auto;
  min-height: 700px;
  padding: 20px 40px;
}
#about_view p {
  line-height: 28px;
  margin: 5px 0;
  color: rgb(14, 36, 70);
  font-size: 14px;
}
#about_view .quote {
  padding-right: 10px;
  border-right: 2px solid;
}
#about_view h1 {
  font-weight: 100;
  margin-bottom: 20px;
  display: block;
  text-align: center;
  font-size: 20px;
  color: rgb(57, 77, 104);
}
#about_view h2 {
  color: rgb(6, 182, 123);
  font-size: 16px;
  display: block;
  margin: 6px 0;
}
#about_view img {
  display: block;
  margin: auto;
  width: 350px;
}
.night_mode_on #about_view h1 {
  color: #fff !important;
}
.night_mode_on #about_view p {
  color: rgba(255, 255, 255, 0.67) !important;
}
.contributors {
  margin:15px 0;
  overflow: hidden;
  list-style: none;
}
.contributors li {
  font-size: 14px;
  color: rgb(65, 75, 104);
  padding:0 5px;
  border-left: 1px solid #ededed;
  margin:18px 0;
  line-height: 20px;
  display: block;
  float: right;
  width:33%;
  text-align: center;
  height: 20px;
}
.contributors li:nth-child(3n){
  border-left: none !important;
}
.contributors li.special {
  color:rgb(0, 207, 128);
}
</style>
<script>
export default {
  name:'About',
  data:function() {
    return {
      devEmail:'dana.mr8822@gmail.com'
    }
  }
}
</script>
