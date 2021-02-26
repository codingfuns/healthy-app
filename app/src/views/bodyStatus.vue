<!--
 * @Description: file content
 * @Author: Mr.WJ
 * @Date: 2021-02-24 14:44:33
 * @LastEditors: Mr.WJ
 * @LastEditTime: 2021-02-26 11:19:42
-->
<template>
  <div class="j__body-status">
    <div class="j__title">
      <span>title</span>
      <div class="title-operate">
        <el-date-picker
          size="mini"
          v-model="value1"
          value-format = "timestamp"
          type="datetimerange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
        <el-button size="mini" type="primary" class="btn-search" @click = "search">查询</el-button>
        <el-button size="mini" type="primary" @click="add">添加</el-button>
      </div>
    </div>
    <div class="j__table">
      <el-table
        :data="tableData"
        size ="small"
        height="calc(100vh - 200px)"
        header-row-class-name="table-header"
        row-class-name ="table-row"
        style="width: 100%"
      >
          <el-table-column
          type="index"
          >
        </el-table-column>
        <el-table-column prop="date" label="日期" width="200"></el-table-column>
        <el-table-column prop="time" label="持续时长(S)" width="200"></el-table-column>
        <el-table-column prop="reasonValue" label="原因" width="200"></el-table-column>
        <el-table-column
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
      width="250"
      :before-close="handleClose">
      <el-form label-position="right" label-width="80px" :model="formLabelAlign">
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
        <el-form-item label="时长">
          <el-input size = "small" v-model="formLabelAlign.time"></el-input>
        </el-form-item>
        <el-form-item label="原因">
          <el-select size = "small" v-model="formLabelAlign.reasonValue" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
        </el-select>
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
      options: [{
          value: '运动',
          label: '运动'
        }, {
          value: '静止',
          label: '静止'
        }, {
          value: '发热/发冷',
          label: '发热/发冷'
        }, {
          value: '其他',
          label: '其他'
        }],
      dialogVisible:false,
      reasonValue:'',

      tableData: [],
      formLabelAlign: {
          date: '',
          time: '',
          reasonValue: ''
        }
    };
  },
  created () {
    this.getBodyInfo();
  },
  methods: {
    search(){
      if(!this.value1){
        this.getBodyInfo();
      }else{
        this.$db.getDataByTime('t_body',this.value1[0],this.value1[1],(res)=>{
          this.tableData = res.data;
        })
      }
    },
    getBodyInfo(){
      this.$db.getDataAll('t_body',(res)=>{
        this.tableData = res.data;
      });
    },
    handleClose(){
      this.dialogVisible = false;
    },
    add(){
      this.dialogVisible = true;
    },
     handleDelete(id){
      console.log(id)
      this.$db.deleteData('t_body',id,(res)=>{
        this.$message({
          message:'删除成功',
          type:'success'
        });
        this.getBodyInfo();
      });
    },
    saveData(){
      let _data = {
        id:_utils.guid(),
        timeStamp:new Date(this.formLabelAlign.date).getTime(),
        ...this.formLabelAlign
      }
      this.$db.addData('t_body',_data,(data)=>{
        this.$message({
          message:'添加成功',
          type:'success'
        });
        this.dialogVisible = false;
        this.getBodyInfo();
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
      font-size: 20px;
      color:#9de0ff;
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
    background-color: transparent !important;
  }
}
 .add-dialog{
    input{
      width:300px !important;
    }
  }
</style>