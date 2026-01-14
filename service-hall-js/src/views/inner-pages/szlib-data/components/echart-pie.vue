<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import * as echarts from 'echarts';

interface eChartsDataType {
  value: number;
  name: string;
}

interface propsDataType {
  dataSource: eChartsDataType[],
  title: string,
  totalNum: number,
}

export default defineComponent({
  props: {
    dataSource: {
      type: Array,
      default: () => [],
    },
    title: {
      type: String,
      default: '',
    },
    totalNum: {
      type: Number,
      default: 0,
    },
  },

  setup(props: propsDataType) {
    const chartRef = ref<HTMLDivElement | null>(null);

    const colors = ['#2A7BFF', '#00CEB8', '#FFBF33', '#FE885B', '#FF6567'];

    onMounted(() => {
      if (chartRef.value) {
        const chartInstance = echarts.init(chartRef.value);
        const option = {
          tooltip: {
            show: false,
          },
          legend: {
            top: '0',
            right: '0',
            orient: 'vertical',
            icon: 'circle',
            backgroundColor: '#f7f8ff',
            borderRadius: 5,
            padding: [16, 13, 14, 15],
            formatter(name) {
              const title = props.dataSource.filter((da) => name === da.name)[0].value;
              return `{a|${name}}{b|${title}}`;
            },
            textStyle: {
              rich: {
                a: {
                  width: 80,
                  fontSize: 12,
                  color: '#222',
                  fontWeight: 400,
                },
                b: {
                  width: 30,
                  fontSize: 13,
                  align: 'right',
                  fontWeight: 500,
                  color: '#222',
                },
              },
            },
          },
          color: colors,
          series: [
            {
              name: 'Borrow',
              type: 'pie',
              radius: ['65%', '90%'],
              center: ['25%', '50%'],
              avoidLabelOverlap: false,
              label: {
                show: true,
                position: 'center',
                formatter: [
                  `{num|${props.totalNum}}`,
                  `{title|${props.title}}`,
                ].join('\n'),

                rich: {
                  num: {
                    color: '#222',
                    fontSize: 26,
                    lineHeight: 34,
                    fontWeight: 500,
                  },
                  title: {
                    color: '#777',
                    fontSize: 14,
                    lineHeight: 23,
                  },
                },
              },
              emphasis: {
                disabled: true,
              },
              labelLine: {
                show: false,
              },
              itemStyle: {
                borderColor: '#fff',
                borderWidth: 1,
              },
              data: [...props.dataSource],
            },
          ],
        };
        chartInstance.setOption(option);
      }
    });

    return {
      chartRef,
    };
  },
});
</script>

<template>
  <div
    ref="chartRef"
    class="echart-container"
  />
</template>

<style lang="less" scoped>
.echart-container {
  width: 100%;
  height: 150px;
}
</style>
