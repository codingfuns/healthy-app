<!--
 * @Description: file content
 * @Author: 
 * @Date: 2020-07-20 20:41:35
 * @LastEditors: Mr.WJ
 * @LastEditTime: 2021-02-24 16:06:25
--> 
<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
body{
  padding: 0;
  margin: 0;
}
/* 定义滚动条样式 */
::-webkit-scrollbar{
    width: 6px;
    height: 6px;
    background-color: #ffffff;
}
/* 滚动条轨道 */
::-webkit-scrollbar-track{
    background-color: #ffffff;
}
/* 滑块 */
::-webkit-scrollbar-thumb{
    border-radius: 10px;
    background-color: #C0C0C0;
}
</style>
