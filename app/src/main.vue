<!--
 * @Description: file content
 * @Author: Mr.WJ
 * @Date: 2021-02-24 11:50:03
 * @LastEditors: Mr.WJ
 * @LastEditTime: 2021-02-26 15:26:14
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
      <div class="j__nav-bar foot">
        <i class="iconfont icon-sortlight"></i>
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
  .el-main{
    padding: 10px;
  }
  .j__aside{
    width: 60px !important;
    height: 100vh;
    display: flex;
    flex-direction: column;
    position: relative;
    // background: #152b3e;
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
      }
      i{
        color: #e0e0e0;
        font-size:24px;
        &.active{
          color:#22cc92;
        }
      }
    }
    .j__nav-bar.foot{
      position: absolute;
      bottom: 10px;
      left: 20px;
      font-size: 24px;
      i{
        color: #e0e0e0;
        &:hover{
          color: #ffffff;
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
    border-left:solid 1px #152b3e;
    .j__header{
      -webkit-app-region: drag;
      height:40px !important;
      // border-bottom: solid 1px #152b3e;
    }
  }
}

</style>