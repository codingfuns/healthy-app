<!--
 * @Description: file content
 * @Author: Mr.WJ
 * @Date: 2021-02-24 14:44:33
 * @LastEditors: Mr.WJ
 * @LastEditTime: 2021-02-25 10:45:31
-->
<template>
  <div class="j__body-status">
    <div class="j__title">
      <span>title</span>
      <div class="title-operate">
        <el-date-picker
          size="mini"
          v-model="value1"
          type="datetimerange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
        <el-button size="mini" type="primary" class="btn-search">查询</el-button>
        <el-button size="mini" type="primary" @click="add">添加</el-button>
      </div>
    </div>
    <div class="j__table">
      <el-table
        :data="tableData"
        height="calc(100vh - 200px)"
        header-row-class-name="table-header"
        style="width: 100%"
      >
          <el-table-column
          type="index"
          >
        </el-table-column>
        <el-table-column prop="date" label="日期" width="150"></el-table-column>
        <el-table-column prop="hightPressure" label="高压" width="100">
          <template slot-scope="scope">
            <span v-if="scope.row.hightPressure > 150" 
              style="color: red;font-weight:bold">{{ scope.row.hightPressure }}</span>
            <span v-else>{{ scope.row.hightPressure }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="lowPressure" label="低压" width="100">
          <template slot-scope="scope">
            <span v-if="scope.row.lowPressure < 60" 
              style="color: red;font-weight:bold">{{ scope.row.lowPressure }}</span>
            <span v-else>{{ scope.row.lowPressure }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="heart" label="心率" width="100"></el-table-column>
        <el-table-column prop="oxygen" label="血氧" width="100">
          <template slot-scope="scope">
            <span v-if="scope.row.oxygen < 90" 
              style="color: red;font-weight:bold">{{ scope.row.oxygen }}</span>
            <span v-else>{{ scope.row.oxygen }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="remark" label="备注" width="100"></el-table-column>
        <el-table-column
          fixed="right"
          label="操作">
          <template slot-scope="scope">
            <el-button @click="handleDelete(scope.row.id)" type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog
      title="提示"
      class="add-dialog"
      :visible.sync="dialogVisible"
      width="300"
      :before-close="handleClose">
      <el-form label-position="right" label-width="100px" :model="formLabelAlign">
        <el-form-item label="时间">
          <el-date-picker
            size = "small"
            v-model="formLabelAlign.date"
            type="datetime"
            format="yyyy-MM-dd HH:mm:ss"
            value-format="yyyy-MM-dd HH:mm:ss"
            placeholder="选择日期时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="高压">
          <el-input size = "small" v-model="formLabelAlign.hightPressure"></el-input>
        </el-form-item>
        <el-form-item label="低压">
          <el-input size = "small" v-model="formLabelAlign.lowPressure"></el-input>
        </el-form-item>
        <el-form-item label="心率">
          <el-input size = "small" v-model="formLabelAlign.heart"></el-input>
        </el-form-item>
        <el-form-item label="血氧饱和度">
          <el-input size = "small" v-model="formLabelAlign.oxygen"></el-input>
        </el-form-item>
        <el-form-item label="备注">
          <el-input size = "small" v-model="formLabelAlign.remark"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button size = "small" @click="dialogVisible = false">取 消</el-button>
        <el-button size = "small" type="primary" @click="saveData">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import * as _utils from '@/utils';
const path = window.require('path');
const fs = window.require('fs');
const {ipcRenderer,remote} = window.require('electron');
const bodyStatusJsonPath = remote.getGlobal('bodyPath');
export default {
  name: "bodyStatus",
  data() {
    return {
      value1: "",
      dialogVisible:false,
      reasonValue:'',

      tableData: [],
      formLabelAlign: {
          date: '',
          hightPressure: '',
          lowPressure: '',
          heart:'',
          oxygen:'',
          remark:''
        }
    };
  },
  created () {
    this.getHeartInfo();
  },
  methods: {
    getHeartInfo(){
      this.$db.getDataAll('t_heart',(res)=>{
        this.tableData = res.data;
      });
    },
    handleClose(){
      this.dialogVisible = false;
    },
    add(){
      this.dialogVisible = true
    },
    handleDelete(id){
      console.log(id)
      this.$db.deleteData('t_heart',id,(res)=>{
        this.$message({
          message:'删除成功',
          type:'success'
        });
        this.getHeartInfo();
      });
    },
    saveData(){
      let _data = {
        id:_utils.guid(),
        timeStamp:new Date(this.formLabelAlign.date).getTime(),
        ...this.formLabelAlign
      }
      this.$db.addData('t_heart',_data,(data)=>{
        console.log(data);
        this.$message({
          message:'添加成功',
          type:'success'
        });
        this.dialogVisible = false;
        this.getHeartInfo();
      })
    }
  }
};
</script>

<style lang="scss" scoped>
.j__body-status {
  display: flex;
  flex-direction: column;
  .j__title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 40px;
    span {
      font-size: 14px;
      font-weight: bold;
    }
    .title-operate {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 40px;
      .btn-search {
        margin-left: 20px;
      }
    }
  }
  .j__table {
    margin-top: 20px;
  }
 
}
</style>
<style lang="scss">
.table-header {
  th,
  tr {
    background-color: #f5f7fa !important;
  }
}
 .add-dialog{
    input{
      width:300px !important;
    }
  }
</style>