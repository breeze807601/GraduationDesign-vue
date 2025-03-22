<template>
    <el-card style="width: 42rem;" v-loading="loading">
        <div style="margin-bottom: 1rem;text-align: center;">
            <el-date-picker v-model="date" value-format="YYYY-MM-DD" type="monthrange" range-separator="至" start-placeholder="起始月" end-placeholder="终点月" :disabledDate="disabledDate">
                <template #default="cell">
                    <div class="el-date-table-cell" :class="{ current: cell.isCurrent }">
                        <span class="el-date-table-cell__text">{{ cell.text + 1 }}月</span>
                    </div>
                </template>
            </el-date-picker>
            <el-button style="margin-left: 10px;" type="primary" :icon="Search" @click="query">查看</el-button>
            <el-button style="margin-left: 10px;" :icon="RefreshLeft" @click="resetQuery">重置</el-button>
        </div>
        <div id="uWaterCostOption" style="width: 40rem;height: 22rem;" />
    </el-card>
</template>

<script setup>
import * as echarts from 'echarts';
import request from "@/request/request"
import { onMounted, ref } from 'vue';
import { ElMessage } from 'element-plus';
import {Search,RefreshLeft,Help} from '@element-plus/icons-vue';

let uWaterCostChart;
// 加载
const loading = ref(false);

const uWaterCostOption = {
    title: {
        text: '用水费用情况'
    },
    tooltip: {
        trigger: 'axis'
    },
    legend: {
        data: ['用水总费用','平均水费'],
        right: 10,
        selected: {
            '用水总费用': true,
            '平均水费': false,
        }
    },
    xAxis: {
        type: 'category',
        data: [],
        name: '日期'
    },
    yAxis: {
        type: 'value',
        name: '元'
    },
    series: [
        {
            name: '用水总费用',
            type: 'bar',
            data: [],//纵轴
            smooth:true,
            itemStyle: {
                color: '#87CEEB'
            }
        },
    ]
};

onMounted(async () => {
    await getCostStatistics();
});
async function getCostStatistics() {
    loading.value = true;
    if (uWaterCostChart != null && uWaterCostChart !== "" && uWaterCostChart !== undefined) {
        //销毁
        uWaterCostChart.dispose();
    }
    uWaterCostChart = echarts.init(document.getElementById('uWaterCostOption'));
    await request.get('/waterBill/getCostStatistics',{
        params: {
            start: start.value, // 起始日期
            end: end.value,      // 结束日期
            isUser: true
        }
    }).then(res =>{
        //横轴数据和纵抽数据
        uWaterCostOption.xAxis.data = res.data.date;
        uWaterCostOption.series[0].data = res.data.num;
    })
    loading.value = false;
    uWaterCostChart.setOption(uWaterCostOption);
}

// 禁用未来时间的逻辑
const disabledDate = (time) => {
    const now = new Date(); // 当前日期
    now.setHours(0, 0, 0, 0); // 清除小时、分钟、秒和毫秒，确保只比较日期
    return time.getTime() > now.getTime(); // 如果时间大于当前时间，则禁用
};

// 搜索相关
const date = ref('')
const start = ref('')
const end = ref('')
async function query() {
    if (!date.value || date.value.length !== 2) {
        ElMessage.error("日期没有正确选择!")
        return;
    }
    start.value = date.value[0];
    end.value = date.value[1];
    await getCostStatistics();
}
// 重置
async function resetQuery() {
    date.value = '';
    start.value = '';
    end.value = '';
    await getCostStatistics();
}
</script>

<style>
</style>