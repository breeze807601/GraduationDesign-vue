<template>
    <el-card style="width: 700px;" v-loading="loading">
        <div id="statusOption" style="width: 650px;height: 370px;" />
    </el-card>
</template>

<script setup>
import * as echarts from 'echarts';
import request from "@/request/request"
import { reactive, onMounted, ref } from 'vue';

// 加载
const loading = ref(false);

const statusOption = {
    title: {
        text: '费用情况'
    },
    tooltip: {
        trigger: 'axis'
    },
    legend: {
        data: ['用电总费用','用水总费用','平均电费','平均水费'],
        right: 10,
        selected: {
            '用电总费用': true,
            '用水总费用': true,
            '平均电费': false,
            '平均水费': false,
        }
    },
    //横轴
    xAxis: {
        type: 'category',
        // boundaryGap: false,
        data: [],
        name: '日期'
    },
    yAxis: {
        type: 'value',
        name: '元'
    },
    series: [
        {
            name: '用电总费用',
            type: 'bar',
            data: [],//纵轴
            smooth:true
        },
        {
            name: '用水总费用',
            type: 'bar',
            data: [],//纵轴
            smooth:true
        },
        {
            name: '平均电费',
            type: 'line',
            data: [],//纵轴
            smooth:true
        },
        {
            name: '平均水费',
            type: 'line',
            data: [],//纵轴
            smooth:true
        },
    ]
};

onMounted(async () => {
    await getCostStatistics();
});

var statusChart;
async function getCostStatistics() {
    loading.value = true;
    if (statusChart != null && statusChart != "" && statusChart != undefined) {
        //销毁
        statusChart.dispose();
    }
    statusChart = echarts.init(document.getElementById('statusOption'));
    await request.get('/electricityBill/getCostStatistics',{
        params: {
            start: start.value, // 起始日期
            end: end.value      // 结束日期
        }
    }).then(res =>{
        //横轴数据和纵抽数据
        statusOption.xAxis.data = res.data.date;
        statusOption.series[0].data = res.data.num;
        statusOption.series[2].data = res.data.avgNum;
    })
    await request.get('/waterBill/getCostStatistics',{
        params: {
            start: start.value, // 起始日期
            end: end.value      // 结束日期
        }
    }).then(res =>{
        //横轴数据和纵抽数据
        statusOption.series[1].data = res.data.num;
        statusOption.series[3].data = res.data.avgNum;
    })
    loading.value = false;
    statusChart.setOption(statusOption);
}

const start = ref('')
const end = ref('')
</script>

<style>
</style>