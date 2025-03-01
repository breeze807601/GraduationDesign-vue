<template>
    <el-card style="width: 700px;display: flex; justify-content: center; align-items: center;" v-loading="loading">
        <div id="electricityOption" style="width: 650px;height: 370px;" />
    </el-card>
</template>

<script setup>
import * as echarts from 'echarts';
import request from "@/request/request"
import { reactive, onMounted, ref } from 'vue';

// 加载
const loading = ref(false);

const electricityOption = {
    title: {
        text: '上月用电账单状态',
        left: 'center'
    },
    tooltip: {
        trigger: 'item'
    },
    legend: {
        orient: 'vertical',
        left: 'left'
    },
    series: [
        {
            name: '上月账单状态',
            type: 'pie',
            radius: '50%',
            data: [],
            itemStyle: {
                normal: {
                    color: function (colors) {
                        var colorList = [
                            '#fc8251',
                            '#5470c6',
                            '#9A60B4',
                            '#ef6567',
                            '#f9c956',
                            '#3BA272'
                        ];
                        return colorList[colors.dataIndex];
                    }
                },
            }
        }
    ]
};

onMounted(async () => {
    await getBillStatusPieChart();
});

var electricityChart;
async function getBillStatusPieChart() {
    loading.value = true;
    if (electricityChart != null && electricityChart != "" && electricityChart != undefined) {
        //销毁
        electricityChart.dispose();
    }
    electricityChart = echarts.init(document.getElementById('electricityOption'));
    await request.get('/electricityBill/getBillStatusPieChart').then(res =>{
        electricityOption.series[0].data = res.data;
    })
    loading.value = false;
    electricityChart.setOption(electricityOption);
}

</script>

<style>
</style>