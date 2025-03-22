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
            <el-tooltip content="切换查看平均数据或总量数据" effect="light" placement="top">
                <el-button style="margin-left: 10px;" :icon="Help" @click="change">切换</el-button>
            </el-tooltip>
        </div>
        <div id="waterCostOption" style="width: 40rem;height: 22rem;" />
    </el-card>
</template>

<script setup>
import * as echarts from 'echarts';
import request from "@/request/request"
import { onMounted, ref } from 'vue';
import { ElMessage } from 'element-plus';
import {Search,RefreshLeft,Help} from '@element-plus/icons-vue';

let waterCostChart;
// 加载
const loading = ref(false);

const waterCostOption = {
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
    //横轴
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
        {
            name: '平均水费',
            type: 'line',
            data: [],//纵轴
            smooth:true,
            itemStyle: {
                color: '#7CC57C'
            }
        },
    ]
};

onMounted(async () => {
    await getCostStatistics();
});
async function getCostStatistics() {
    loading.value = true;
    if (waterCostChart != null && waterCostChart !== "" && waterCostChart !== undefined) {
        //销毁
        waterCostChart.dispose();
    }
    waterCostChart = echarts.init(document.getElementById('waterCostOption'));
    await request.get('/waterBill/getCostStatistics',{
        params: {
            start: start.value, // 起始日期
            end: end.value      // 结束日期
        }
    }).then(res =>{
        //横轴数据和纵抽数据
        waterCostOption.xAxis.data = res.data.date;
        waterCostOption.series[0].data = res.data.num;
        waterCostOption.series[1].data = res.data.avgNum;
    })
    loading.value = false;
    waterCostChart.setOption(waterCostOption);
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
// 切换相关
const isSelected = ref(true)   // 是否显示总量
function change() {
    isSelected.value = !isSelected.value;
    waterCostOption.legend.selected.用水总费用 = isSelected.value;
    waterCostOption.legend.selected.平均水费 = !isSelected.value;
    waterCostChart.setOption(waterCostOption);
}
</script>

<style>
</style>