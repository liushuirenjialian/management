<template>
  <el-row>
    <el-col :span="24" class="contentBox">
      <div class="btnBox" align="right">
        <el-button class="callBackBtn" type="primary" size='mini' round @click='callBack'>返回</el-button>
      </div>
      <el-tabs type="border-card">
        <el-tab-pane label="价格走势图">
          <div id="container" style="height: 500px;width: 1000px;"></div>
        </el-tab-pane>
      </el-tabs>
    </el-col>
  </el-row>
</template>
<script>
  import { mapGetters } from 'vuex'
  import echarts from 'echarts'
  import { getData } from '@/api/priceStatistics/informationMap'
  export default {
    name: 'dashboard',
    computed: { ...mapGetters(['name', 'roles'])
    },
    data() {
      return {
        dataDate: ['2015-1', '2015-2', '2015-3', '2015-4', '2015-5', '2015-6', '2015-7', '2015-8', '2015-9', '2015-10', '2015-11', '2015-12'],
        buyData: [72.6, 75.9, 79.0, 76.4, 678.7, 70.7, 175.6, 182.2, 48.7, 78.8, 76.0, 72.3],
        sellData: [72.6, 75.9, 79.0, 76.4, 678.7, 70.7, 175.6, 182.2, 48.7, 78.8, 76.0, 72.3],
        colors: ['#5793f3', '#d14a61', '#675bba'] // echarts图表插件
      }
    },
    mounted() {
    //    this.drawLine()
    },
    created() {
      const mapId = this.$route.query.id
      const mapStart = this.$route.query.start
      const mapEnd = this.$route.query.end
      getData(mapId, mapStart, mapEnd).then(res => {
        this.dataDate = res.data.date
        this.buyData = res.data.buy
        this.sellData = res.data.sell
        this.drawLine()
      })
    },
    methods: {
      // 返回
      callBack() {
        this.$router.go(-1)
      },
      /* 【echarts插件画图】*/
      drawLine() {
        const dom = document.getElementById('container')
        const myChart = echarts.init(dom)
        const colors = ['#5793f3', '#d14a61', '#675bba']
        myChart.setOption({
          color: colors,
          tooltip: {
            trigger: 'none',
            axisPointer: {
              type: 'cross'
            }
          },
          legend: {
            data: ['收购价', '出库价']
          },
          grid: {
            top: 70,
            bottom: 50
          },
          xAxis: [{
            type: 'category',
            axisTick: {
              alignWithLabel: true
            },
            axisLine: {
              onZero: false,
              lineStyle: {
                color: colors[1]
              }
            },
            axisPointer: {
              label: {
                formatter: function(params) {
                  return '收购价  ' + params.value + (params.seriesData.length ? '：' + params.seriesData[0].data : '')
                }
              }
            },
            data: this.dataDate
          }, {
            type: 'category',
            axisTick: {
              alignWithLabel: true
            },
            axisLine: {
              onZero: false,
              lineStyle: {
                color: colors[0]
              }
            },
            axisPointer: {
              label: {
                formatter: function(params) {
                  return '出库价  ' + params.value + (params.seriesData.length ? '：' + params.seriesData[0].data : '')
                }
              }
            },
            data: this.dataDate
          }],
          yAxis: [{
            type: 'value'
          }],
          series: [{
            name: '收购价',
            type: 'line',
            xAxisIndex: 1,
            smooth: true,
            data: this.buyData
          }, {
            name: '出库价',
            type: 'line',
            smooth: true,
            data: this.sellData
          }]
        })
      }
    }
  }
</script>
<style>
  .btnBox{
    padding: 0px 10px 10px 0px;
  }
  .contentBox {
    margin-top: 20px;
    padding: 0px 20px;
  }
</style>