<template>
    <div class="warp">
        <header class="logo_header">
            <p><img src="https://b-gold-cdn.xitu.io/v3/static/img/logo.a7995ad.svg" alt=""></p>
            <p><img src="https://user-gold-cdn.xitu.io/2018/11/21/1673556f92437013?imageView2/1/w/100/h/100/q/85/format/webp/interlace/1" width="30" height="30"></p>
        </header>
        <ul class="m_header">
            <li v-for="(item,index) in navList" :class="navIndex==index?'m_li_color':''" @click="switchNav(item,index)">{{item}}</li>
        </ul>
        <ul class="list-header">
            <li v-for="(item,index) in classifyList" :class="classifyIndex==index?'m_li_color':''" @click="switchListNav(item,index)">{{item}}</li>
        </ul>
        <ul class="entry-list">
            <li class="item" v-for="item in list" @click="changePage(item.href)">
                <div class="entry-box">
                    <div class="entry">
                            <div class="content-box">
                                <div class="info-box">
                                    <div class="info-row meta-row">
                                        <ul>
                                            <li class="item post" :class="(item.metaType == '热' || item.metaType == '荐') ? 'fontRed' :  item.metaType == '专栏' ? 'fontPaper' : '' ">{{item.metaType}}</li>
                                            <li class="item username clickable">{{item.metaAutor}}</li>
                                            <li class="item">{{item.metaTime}}</li>
                                            <li class="item tag">{{item.metaTag}}</li>
                                        </ul>
                                    </div>
                                    <div class="info-row title-row">
                                        <a :href="item.href">{{item.title}}</a>
                                    </div>
                                    <div class="info-row action-row">
                                        <ul>
                                            <li class="item like clickable">
                                                <a href="" class="title-box">
                                                    <img :src="item.icon" class="icon">
                                                    <span class="count">{{item.count}}</span>
                                                </a>
                                            </li>
                                            <li class="item comment clickable">
                                                <a href="" class="title-box">
                                                    <img :src="item.icon1" class="icon">
                                                    <span class="count">{{item.count1}}</span>
                                                </a>
                                            </li>
                                            <li class="item share clickable hover"></li>
                                            <li class="item collect clickable hover"></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                    </div>
                </div>
            </li>
        </ul>
    </div>
</template>
<script>
import Vue from 'vue'
import axios from 'axios'
    export default {
        name:'index',
        data(){
            return {
                navList:['我关注的','Android','前端','IOS','后端','设计'],
                classifyList:['热门','最新','评论'],
                navIndex:0,
                classifyIndex:0,
                list:[]
            }
        },
        beforeCreate(){
             axios.get("http://127.0.0.1:8888/").then((res) => {
                  this.list = res.data
            }, (err) => {})
        },
        methods:{
            changePage(href){
               window.location.href = href
            },
            switchNav(item,index){
                this.navIndex = index
            },
            switchListNav(item,index){
                this.classifyIndex = index
            }
        }
    }
</script>
<style scoped>
    .logo_header{
        display: flex;
        justify-content:space-between;
    }
    .logo_header>p:first-child{
        padding: 8px 15px;
        padding-top: 15px;
    }
    .logo_header>p:last-child{
        padding: 10px 20px;
        padding-top: 15px;
    }
    .list-header{
        display: flex;
    }
    .list-header li{
        padding: 0px 10px;

    }
    .list-header:hover{
        cursor: pointer;
    }
    .m_header{
        display: flex;
        margin: 5px 0;
        margin-left: 5px;
        height: 50px;
        line-height: 50px;

    }
    .m_header li{
        flex: 1;
        text-align: center;
        font-size: 13px;
    }
    .m_header li:active{
        background: #ccc;
    }
    .m_li_color{
        color: #007fff;
        font-weight: 600;
    }
    .fontRed{
        color: red;
    }
    .fontPaper{
        color: #b71ed7;
    }
    .entry-list{
        background: #fff;
    }
    .toast{
        width: 100%;
        height: 100%;
        background: #fff;
        color: #fff;
        opacity: 0.1;
    }
    .entry-list>.item:first-child{
        border-top:none;
    }
    .entry-list>.item{
        padding: 15px 0px;
        border-top: 0.5px solid #ccc;
    }
    .entry-list .title-row{
        padding-left: 20px;
        padding-top: 5px;
    }
    .entry-list .action-row{
        padding-left: 20px;
        padding-top: 8px;
    }
    .meta-row ul,.action-row ul {
        display: flex;
    }
    .meta-row ul li,.action-row ul li{
        padding-left: 8px;
    }
    .action-row ul>li>a>span,.action-row ul>li>a>img{
        vertical-align:middle;
    }
    .info-box>div{
        padding: 0px 10px;
    }
    .title-row{
        font-size: 14px;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
    }

</style>
