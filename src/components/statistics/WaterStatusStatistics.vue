<template>
    <el-card style="width: 42rem;display: flex; justify-content: center; align-items: center;" v-loading="loading">
        <div id="waterOption" style="width: 41rem;height: 20rem"/>
    </el-card>
</template>

<script setup>
import * as echarts from 'echarts';
import request from "@/request/request"
import { reactive, onMounted, ref } from 'vue';

// 加载
const loading = ref(false);

const waterOption = {
    title: {
        text: '上月用水账单状态',
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

var waterChart;
async function getBillStatusPieChart() {
    loading.value = true;
    if (waterChart != null && waterChart != "" && waterChart != undefined) {
        //销毁
        waterChart.dispose();
    }
    waterChart = echarts.init(document.getElementById('waterOption'));
    await request.get('/waterBill/getBillStatusPieChart').then(res =>{
        waterOption.series[0].data = res.data;
    })
    loading.value = false;
    waterChart.setOption(waterOption);
}

</script>

<style>
</style>