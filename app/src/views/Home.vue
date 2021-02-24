<!--
 * @Description: file content
 * @Author: 
 * @Date: 2020-07-20 20:41:35
 * @LastEditors: wujing
 * @LastEditTime: 2020-07-22 15:38:30
--> 
<template>
  <div class="home">
    <el-form :label-position="labelPosition" label-width="auto" :model="formLabelAlign">
      <el-form-item label="执行到的案款">
        <el-input type = "allMoney" v-model="formLabelAlign.allMoney"></el-input>
      </el-form-item>
      <el-form-item label="需要扣除的其他费用">
        <el-input type = "exceptMoney" v-model="formLabelAlign.exceptMoney"></el-input>
      </el-form-item>
      <el-form-item label="有几个参与分配人">
        <el-input type = "personCount" v-model="formLabelAlign.personCount"></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Home',
    data() {
      return {
        labelPosition: 'left',
        formLabelAlign: {
          allMoney: '',
          exceptMoney: '',
          personCount: ''
        }
      };
    },
    watch:{
      'formLabelAlign.allMoney'(val){
        var reg = /[^0-9]/g;
        if(val != ''){
          val = val.replace(reg,'')
          this.formLabelAlign.allMoney = val;
        }
      }
    }
}
</script>
