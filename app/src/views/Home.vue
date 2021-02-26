<!--
 * @Description: file content
 * @Author: 
 * @Date: 2020-07-20 20:41:35
 * @LastEditors: Mr.WJ
 * @LastEditTime: 2021-02-26 15:56:54
--> 
<template>
  <div class="home">
    <div ref="bodyChart" class="chart-body"></div>
    <div ref="heartChart" class="chart-heart"></div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "Home",
  data() {
    return {
      bodyChart: null,
      heartChart: null
    };
  },
  mounted() {
    this.bodyChart = this.$echarts.init(this.$refs.bodyChart);
    this.heartChart = this.$echarts.init(this.$refs.heartChart);
    this.getBodyInfo();
    this.getHeartInfo();
  },
  methods: {
    getBodyInfo() {
      let option = {
        title: {
          text: "1232",
          right: 10,
          textStyle: {
            color: "#9de0ff"
          }
        },
        color: ["#00a8e1 "],
        xAxis: {
          type: "category",
          splitLine: {
            show: false
          },
          data: [],
          axisLine: {
            lineStyle: {
              color: "#636e7a"
            }
          },
          axisLabel: {
            show: true,
            color: "#636e7a",
            formatter: "{value}"
          }
        },
        yAxis: {
          splitLine: {
            show: false
          },
          type: "value",
          axisLine: {
            lineStyle: {
              color: "#636e7a"
            }
          },
          axisLabel: {
            show: true,
            color: "#636e7a",
            formatter: "{value}"
          }
        },
        tooltip: {
          trigger: "axis"
        },
        grid: {
          left: 30,
          right: 20,
          top: 15,
          bottom: 30
        },
        series: [
          {
            smooth: true,
            lineStyle: {
              width: 0
            },
            showSymbol: false,
            areaStyle: {
              opacity: 0.8,
              color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: "rgba(1, 191, 236)"
                },
                {
                  offset: 1,
                  color: "rgba(1, 191, 236,0)"
                }
              ])
            },
            emphasis: {
              focus: "series"
            }
          }
        ]
      };
      this.$db.getDataAll("t_body", res => {
        // this.tableData = res.data;
        let _xData = [];
        let _seriesData = [];
        for (let item of res.data) {
          _xData.push(item.date);
          _seriesData.push(item.time);
        }
        option.xAxis.data = _xData;
        option.series = [
          {
            ...option.series[0],
            name: "时长",
            type: "line",
            data: _seriesData
          }
        ];

        this.bodyChart.setOption(option, true);
        this.bodyChart.resize();
      });
    },
    getHeartInfo() {
      let option = {
        title: {
          text: "1232",
          right: 10,
          textStyle: {
            color: "#9de0ff"
          }
        },
        legend: {
          textStyle: {
            color: "#9de0ff"
          },
          data: ["lowPressure", "hightPressure", "heart", "oxygen"]
        },
        color: ["#95a2ff", "#fa8080", "#ffc076", "#87e885 "],

        xAxis: {
          type: "category",
          splitLine: {
            show: false
          },
          data: [],
          axisLine: {
            lineStyle: {
              color: "#636e7a"
            }
          },
          axisLabel: {
            show: true,
            color: "#636e7a",
            formatter: "{value}"
          }
        },
        yAxis: {
          splitLine: {
            show: false
          },
          type: "value",
          axisLine: {
            lineStyle: {
              color: "#636e7a"
            }
          },
          axisLabel: {
            show: true,
            color: "#636e7a",
            formatter: "{value}"
          }
        },
        tooltip: {
          trigger: "axis"
        },
        grid: {
          left: 30,
          right: 20,
          top: 15,
          bottom: 30
        },
        series: [
          {
            smooth: true,
            // lineStyle: {
            //   width: 0
            // },
            showSymbol: false,
            emphasis: {
              focus: "series"
            }
          }
        ]
      };
      this.$db.getDataAll("t_heart", res => {
        // this.tableData = res.data;
        let _xData = [];
        let _seriesData = [
          {
            name: "lowPressure",
            type: "line",
            flag: "lowPressure",
            data: []
          },
          {
            name: "hightPressure",
            type: "line",
            flag: "hightPressure",
            data: []
          },
          {
            name: "heart",
            type: "line",
            flag: "heart",
            data: []
          },
          {
            name: "oxygen",
            type: "line",
            flag: "oxygen",
            data: []
          }
        ];
        for (let el of _seriesData) {
          for (let item of res.data) {
            _xData.push(item.date);
            el.data.push(item[el.flag]);
          }
        }

        option.xAxis.data = _xData;
        option.series = _seriesData;

        this.heartChart.setOption(option, true);
        this.heartChart.resize();
        window.onresize = () => {
          this.heartChart.resize();
          this.bodyChart.resize();
        };
      });
    }
  },
  watch: {
    "formLabelAlign.allMoney"(val) {
      var reg = /[^0-9]/g;
      if (val != "") {
        val = val.replace(reg, "");
        this.formLabelAlign.allMoney = val;
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.home {
  display: flex;
  flex-direction: column;
  height: 100%;
  .chart-body,
  .chart-heart {
    flex: 1;
    padding-top: 20px;
    margin: 10px;
    box-shadow: 0px 0px 20px 0px #023970;
  }
}
</style>
