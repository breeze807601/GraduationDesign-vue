<template>
    <el-card style="width: 42rem;display: flex; justify-content: center; align-items: center;" v-loading="loading">
        <div id="electricityOption" style="width: 41rem;height: 22rem" />
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
                color: function (params) {
                    switch (params.name) {
                        case '待支付':
                            return '#e3d30c';
                        case '已支付':
                            return '#0fe312';
                        case '余额不足':
                            return '#e00c0c';
                    }
                },
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
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