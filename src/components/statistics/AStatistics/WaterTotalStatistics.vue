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
        <div id="waterAggregateOption" style="width: 40rem;height: 22rem;" />
    </el-card>
</template>

<script setup>
import * as echarts from 'echarts';
import request from "@/request/request"
import { onMounted, ref } from 'vue';
import { ElMessage } from 'element-plus';
import {Search,RefreshLeft,Help} from '@element-plus/icons-vue';

onMounted(async () => {
    await getMonthlyUsage();
});

// 加载
const loading = ref(false);

let waterAggregateChart;
const waterAggregateOption = {
    title: {
        text: '生活用水使用情况'
    },
    tooltip: {
        trigger: 'axis'
    },
    legend: {
        data: ['总用水量','平均用水'],
        right: 10,
        selected: {
            '总用水量': true,
            '平均用水': false,
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
        name: '(度/方)'
    },
    series: [
        {
            name: '总用水量',
            type: 'bar',
            data: [],//纵轴
            smooth:true,
            itemStyle: {
                color: '#87CEEB'
            }
        },
        {
            name: '平均用水',
            type: 'line',
            data: [],//纵轴
            smooth:true,
            itemStyle: {
                color: '#7CC57C'
            }
        },
    ]
};

async function getMonthlyUsage() {  // 获取统计表数据
    loading.value = true;
    if (waterAggregateChart != null && waterAggregateChart !== "" && waterAggregateChart !== undefined) {
        //销毁
        waterAggregateChart.dispose();
    }
    waterAggregateChart = echarts.init(document.getElementById('waterAggregateOption'));
    await request.get('/waterBill/waterStatistics',{
        params: {
            start: start.value, // 起始日期
            end: end.value,      // 结束日期
            isUser: false
        }
    }).then(res =>{
        //横轴数据和纵抽数据
        waterAggregateOption.xAxis.data = res.data.date;
        waterAggregateOption.series[0].data = res.data.num;
        waterAggregateOption.series[1].data = res.data.avgNum;
    })
    loading.value = false;
    waterAggregateChart.setOption(waterAggregateOption);
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
    await getMonthlyUsage();
}
// 重置
async function resetQuery() {
    date.value = '';
    start.value = '';
    end.value = '';
    await getMonthlyUsage();
}
// 切换相关
const isSelected = ref(true)   // 是否显示总量
function change() {
    isSelected.value = !isSelected.value;
    waterAggregateOption.legend.selected.总用水量 = isSelected.value;
    waterAggregateOption.legend.selected.平均用水 = !isSelected.value;
    waterAggregateChart.setOption(waterAggregateOption);
}
</script>

<style>
</style>