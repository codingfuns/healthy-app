<!--
 * @Description: file content
 * @Author: 
 * @Date: 2020-07-20 20:41:35
 * @LastEditors: Mr.WJ
 * @LastEditTime: 2021-02-26 11:28:52
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
  background: url('./assets/bg.jpg')
}

.el-table th, .el-table tr {
    background-color: transparent !important;
}
.el-table, .el-table__expanded-cell {
    background-color: transparent !important;
}
.el-table td, .el-table th.is-leaf {
  border-bottom: 1px solid #2c3e50 !important;
}
.el-table .cell{
  color: #ffffff;
}
.hover-row>td{
  background-color: #023970 !important;
  
}
.el-table--enable-row-hover .el-table__body tr:hover>td {
    background-color:  #023970 !important;
}
.el-table--border::after, .el-table--group::after, .el-table::before {
  background-color: transparent !important;
}
.el-input__inner{
  background: transparent !important;
  border: 1px solid #2c3e50 !important;
}
input{
  background: transparent !important;
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
