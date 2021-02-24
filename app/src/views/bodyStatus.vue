<!--
 * @Description: file content
 * @Author: Mr.WJ
 * @Date: 2021-02-24 14:44:33
 * @LastEditors: Mr.WJ
 * @LastEditTime: 2021-02-24 17:00:18
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
        <el-table-column prop="date" label="日期" width="180"></el-table-column>
        <el-table-column prop="name" label="姓名" width="180"></el-table-column>
        <el-table-column prop="address" label="地址"></el-table-column>
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
            value-format="timestamp"
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
          value: '1',
          label: '运动'
        }, {
          value: '2',
          label: '静止'
        }, {
          value: '3',
          label: '发热/发冷'
        }, {
          value: '4',
          label: '其他'
        }],
      dialogVisible:false,
      reasonValue:'',

      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        }
      ],
      formLabelAlign: {
          date: '',
          time: '',
          reasonValue: ''
        }
    };
  },
  methods: {
    onSubmit() {},
    handleClose(){},
    add(){
      this.dialogVisible = true
    },
    saveData(){
      
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