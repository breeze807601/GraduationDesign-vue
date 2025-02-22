<template>
    <div>
         <el-card style="width: 700px;">
            <div style="margin-bottom: 15px;text-align: center;">
                <el-date-picker v-model="date" value-format="YYYY-MM-DD" type="monthrange" range-separator="至" start-placeholder="起始月" end-placeholder="终点月">
                    <template #default="cell">
                        <div class="el-date-table-cell" :class="{ current: cell.isCurrent }">
                            <span class="el-date-table-cell__text">{{ cell.text + 1 }}月</span>
                        </div>
                    </template>
                </el-date-picker>
                <el-button style="margin-left: 10px;" type="primary" :icon="Search" @click="query">查看</el-button>
                <el-button style="margin-left: 10px;" :icon="RefreshLeft" @click="resetQuery">重置</el-button>
            </div>
            <div id="aggregateOption" style="width: 650px;height: 370px;" />
         </el-card>
    </div>
</template>

<script setup>
import * as echarts from 'echarts';
import request from "@/request/request"
import { reactive, onMounted, ref } from 'vue';
import { ElMessage } from 'element-plus';
import {Search,RefreshLeft} from '@element-plus/icons-vue';
 
const aggregateOption = {
    title: {
        text: '近月总使用水电情况'
    },
    tooltip: {
        trigger: 'axis'
    },
    legend:{
        data: [],
    },
    //横轴
    xAxis: {
        type: 'category',
        boundaryGap: false,
        data: []
    },
    yAxis: {
        type: 'value'
    },
    series: [
        {
            name: '总用电量',
            type: 'line',//柱状图
            data: [],//纵轴
            smooth:true
        },
        {
            name: '总用水量',
            type: 'line',//柱状图
            data: [],//纵轴
            smooth:true
        },
    ]
};

onMounted(async () => {
    await getMonthlyUsage();
});

var aggregateChart;
async function getMonthlyUsage() {
    if (aggregateChart != null && aggregateChart != "" && aggregateChart != undefined) {
        //销毁
        aggregateChart.dispose();
    }
    aggregateChart = echarts.init(document.getElementById('aggregateOption'));
    await request.get('/electricityBill/getMonthlyUsage',{
        params: {
            start: start.value, // 起始日期
            end: end.value      // 结束日期
        }
    }).then(res =>{
        //横轴数据和纵抽数据
        aggregateOption.xAxis.data = res.data.date;
        aggregateOption.series[0].data = res.data.usage;
        aggregateOption.series[1].data = res.data.average;
    })
    await request.get('/waterBill/getMonthlyUsage',{
        params: {
            start: start.value, // 起始日期
            end: end.value      // 结束日期
        }
    }).then(res =>{
        //横轴数据和纵抽数据
        aggregateOption.series[1].data = res.data.usage;
    })
    aggregateChart.setOption(aggregateOption);
}

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
    await getMonthlyUsage();
}
</script>

<style>
</style>