<!--
 * @Description: file content
 * @Author: Mr.WJ
 * @Date: 2021-02-24 11:50:03
 * @LastEditors: Mr.WJ
 * @LastEditTime: 2021-02-25 14:03:26
-->
<template>
  <el-container class ="j__main">
    <el-aside class="j__aside">
      <div class="j__nav-bar" @click = "goHome">
        <img src="@/assets/avator.jpg" alt="">
      </div>
      <div class="j__nav-bar" v-for ="item of navData" :key = "item.id" @click="itemClick(item)">
        <i class="iconfont" :class="[item.isActive ? item.activeIcon + ' active': item.icon]"></i>
      </div>
    </el-aside>
    <el-container class="j__content">
      <el-header class="j__header">
        <div >

        </div>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
  export default {
    data() {
      return {
        navData: [{
          id:1,
          title:'title1',
          isActive:false,
          activeIcon:'icon-news_hot_fill_light',
          icon:'icon-news_hot_light',
          href:'bodyStatus',
        },{
          id:2,
          title:'title2',
          isActive:false,
          activeIcon:'icon-likefill',
          icon:'icon-like',
          href:'heartStatus',
        }]
      }
    },
    methods: {
      itemClick(item) {
        this.$nextTick(()=>{
          this.navData.map((el)=>{
            el.isActive = false;
          });
          item.isActive = true;
        });
        console.log(item.href)
        this.$router.push({name:item.href})
      },
      goHome(){
        this.navData.map((el)=>{
          el.isActive = false;
        });
        this.$router.push({name:'home'})
      }
    },
  }
</script>

<style lang="scss" scoped>
.j__main{
  .j__aside{
    width: 60px !important;
    height: 100vh;
    display: flex;
    flex-direction: column;
    background: #152b3e;
    .j__nav-bar{
      height: 60px;
      display: flex;
      justify-content: center;
      align-items: center;
      img{
        display: inline-block;
        height: 40px;
        width: 40px;
        border-radius: 40px;
        background: url('./assets/logo.png') no-repeat;
      }
      i{
        color: #e0e0e0;
        font-size:24px;
        &.active{
          color:#22cc92;
        }
      }
    }
    .j__icon-item{
      height: 60px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
  .j__content{
    width: 100%;
    border:solid 1px #d0d0d0;
    .j__header{
      height:60px;
      border-bottom: solid 1px #e0e0e0;
    }
  }
}

</style>