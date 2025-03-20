<template>
    <el-card style="width: 52rem;" v-loading="loading">
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
        <div id="costOption" style="width: 50rem;height: 22rem;" />
    </el-card>
</template>

<script setup>
import * as echarts from 'echarts';
import request from "@/request/request"
import { reactive, onMounted, ref } from 'vue';
import { ElMessage } from 'element-plus';
import {Search,RefreshLeft,Help} from '@element-plus/icons-vue';

// 加载
const loading = ref(false);

const costOption = {
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

var costChart;
async function getCostStatistics() {
    loading.value = true;
    if (costChart != null && costChart !== "" && costChart !== undefined) {
        //销毁
        costChart.dispose();
    }
    costChart = echarts.init(document.getElementById('costOption'));
    await request.get('/electricityBill/getCostStatistics',{
        params: {
            start: start.value, // 起始日期
            end: end.value      // 结束日期
        }
    }).then(res =>{
        //横轴数据和纵抽数据
        costOption.xAxis.data = res.data.date;
        costOption.series[0].data = res.data.num;
        costOption.series[2].data = res.data.avgNum;
    })
    await request.get('/waterBill/getCostStatistics',{
        params: {
            start: start.value, // 起始日期
            end: end.value      // 结束日期
        }
    }).then(res =>{
        //横轴数据和纵抽数据
        costOption.series[1].data = res.data.num;
        costOption.series[3].data = res.data.avgNum;
    })
    loading.value = false;
    costChart.setOption(costOption);
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
    costOption.legend.selected.用电总费用 = isSelected.value;
    costOption.legend.selected.用水总费用 = isSelected.value;
    costOption.legend.selected.平均电费 = !isSelected.value;
    costOption.legend.selected.平均水费 = !isSelected.value;
    costChart.setOption(costOption);
}
</script>

<style>
</style>