<template>
    <div class="sidebar">
        <div class="search">
            <input type="text" v-model="query" placeholder="جستجو درس/استاد">
            <i class="mdi mdi-magnify"></i>
        </div>
        <div class="search_result">
            <div v-if="!query==''">
                <div v-for="course in courses" :key="course.code">
                    <SearchResult  v-if="course.title.startsWith(query) || course.professor.startsWith(query)" v-bind:course="course" ></SearchResult>
                </div>
            </div>
            <div v-else>
            </div>
        </div>
    </div>
</template>
<script>
import SearchResult from './SearchResult.vue'
export default {
    name:'HelloWorld',
    props:{
        width:String,
        courses:Object,
    },
    data:function() {
        return {
            query:''
            };
    },
    components:{
        SearchResult
    }
}
</script>
<style>
    .sidebar {
        min-height:600px;
        width:380px;
        float:left;
        border-right:1px solid #ededed;
        padding:0 10px;
    }
    .night_mode_on .sidebar {
        border-color:#293240;
    }
    .search {
        background:#fff;
        border:1px solid #ededed;
        border-radius:4px;
        position:relative;
        margin:10px 0;
    }
    .night_mode_on .search {
        background:#1c2534;    
        color:#fff;
        border:none !important;
    }
    .night_mode_on .search input {
        color:#fff;
    }
    .search input {
        border:none;
        display:block;
        height:36px;
        width:100%;
        overflow:hidden;
        color:#000;
        background:transparent;
        padding:0 10px;
        padding-left:36px;
        line-height:36px;
    }
    .search .mdi {
        position:absolute;
        left:10px;
        top:0;
        display:block;
        height:100%;
        color:#303b4e;
        line-height:36px;
        font-size:19px;
    }
    .search_result {
        margin-top:10px;
    }
    .search_result .item {
        width:100%;
        display:block;
        border:1px solid #ededed;
        padding:10px;
        border-radius:4px;
    }
    .search_result .item h3 {
        overflow:hidden;
        font-weight:100;
        display:block;
        font-size:14.5px;
        color:#000;
        color:#303b4e;
        width:100%;
    }
    .search_result .item h3 span{
        float:left;
        font-size:14px;
        color:#7f899b;
    }
    .search_result .item .options {
        display:block;
        width:100%;
        overflow:hidden;
        margin-top:15px;
    }
    .search_result .item .options .mdi {
        display:block;
        float:left;
        margin-right:6px;
        width:25px;
        height:25px;
        background:#dae5e9;
        line-height:25px;
        color:#5a6a85;
        text-align:center;
        border-radius:5px;
        cursor:pointer;
    }
    .search_result .item .options .mdi-plus {
        color:#fff;
        background:#3a7ef5;
    }
    .search_result .item .timing {margin-top:10px;}
    .search_result .item .timing span{
        display:block;
        margin-left:5px;
        font-size:14px;
        color:#5a6a85;
    }
</style>