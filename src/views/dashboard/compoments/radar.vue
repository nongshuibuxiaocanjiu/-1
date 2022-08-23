<template>
  <div class="main" ref="main"></div>
</template>

<script>
import * as echarts from 'echarts'
export default {
  data() {
    return {}
  },

  created() {},
  mounted() {
    this.initMychart()
  },

  methods: {
    initMychart() {
      // 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(this.$refs.main)

      const radarOption = {
        backgroundColor: 'pink',
        title: {
          text: '人员绩效表',
          textStyle: {
            color: '#fff',
          },
        },
        legend: {
          data: ['张三', '李四'],
        },
        radar: {
          // shape: 'circle',
          indicator: [
            { name: '爆头', max: 100 },
            { name: '身位', max: 100 },
            { name: '道具', max: 100 },
            { name: '拉枪', max: 100 },
            { name: '死亡', max: 100 },
            { name: '助攻', max: 100 },
          ],
          axisName: {
            color: '#fff',
          },

          splitLine: {
            lineStyle: {
              color: ['red', 'green'],
            },
          },
        },
        splitArea: {
          show: false,
        },
        axisLine: {
          lineStyle: {
            color: 'yellow',
          },
        },

        series: [
          {
            name: 'Budget vs spending',
            type: 'radar',
            data: [
              {
                value: [50, 50, 20, 35, 50, 18],
                name: 'Allocated Budget',
              },
              {
                value: [50, 14, 28, 26, 42, 21],
                name: 'Actual Spending',
              },
            ],
          },
        ],
      }
      // 绘制图表
      myChart.setOption(radarOption)
    },
  },
}
</script>

<style scoped lang="scss">
.main {
  width: 700px;
  height: 500px;
}
</style>
