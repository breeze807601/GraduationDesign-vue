<template>
    <div style="height: 100%;width: 100%">
        <div style="width: 100%; display: flex; justify-content: center; align-items: center;">
            <div style="flex: 1;">
                <tariff :isAdmin="false" :isWater="false" style="width: 100%; height: 100%" />
            </div>
            <div id="eLimitOption" style="height: 25rem;width: 65%;"/>
        </div>
        <div style="text-align: center">
            <el-checkbox-group v-model="radio" size="large" :max="1" :min="0" :disabled="isCheckboxDisabled()">
                <el-row>
                    <el-col :span="6" v-for="item in options" :key="item.value">
                        <el-checkbox-button style="margin-top: 0.7rem;" :value="item.value" border >
                            <div style="width: 5.3rem; height: 2rem; display: grid; align-items: center;">
                                <span style="font-size: 1.3rem;">{{ item.label }}</span>
                            </div>
                        </el-checkbox-button>
                    </el-col>
                    <el-col :span="24" style="margin-top: 1rem">
                        <el-input v-model="recharge" :disabled="isInputDisabled()" controls-position="right" style="height: 3.2rem; width: 65%; font-size: 1.2rem;" placeholder="请输入度数">
                            <template #append>度</template>
                        </el-input>
                    </el-col>
                </el-row>
            </el-checkbox-group>
        </div>
        <div style="margin-top: 1rem;text-align: center">
            <el-button style="width: 30%;height: 3rem" size="large" type="primary" plain round @click="submit">
                <span style="font-size: 1.5rem;">充值</span>
            </el-button>
        </div>
    </div>
</template>

<script setup>
import * as echarts from 'echarts';
import {onMounted, ref} from "vue";
import request from "@/request/request";
import {ElMessage, ElMessageBox, ElNotification} from "element-plus";
import Tariff from "@/components/Tariff.vue";

let electricityLimitChart;

const eLimitOption = {
    tooltip: {
        formatter: '{b} : {c}'
    },
    series: [
        {
            name: '额度',
            type: 'gauge',
            min: 0, // 最小值
            max: 200, // 最大值
            progress: {
                show: true
            },
            itemStyle: {
                color: '#000dff'
            },
            pointer: { // 添加指针配置
                itemStyle: {
                    color: '#0092ff' // 设置指针颜色为红色
                }
            },
            detail: {
                valueAnimation: true,
                formatter: '{value}',
            },
            title: {
                fontSize: '16px', // 设置标题字体大小
            },
            data: [
                {
                    value: 50,
                    name: '电表额度'
                }
            ],
        }
    ]
};
onMounted(() => {
    getInfo();
})

async function getInfo() {
    if (electricityLimitChart != null && electricityLimitChart !== "" && electricityLimitChart !== undefined) {
        //销毁
        electricityLimitChart.dispose();
    }
    electricityLimitChart = echarts.init(document.getElementById('eLimitOption'));
    await request.get('/electricityMeter/getAvailableLimit').then(res => {
        const limitValue = res.data; // 获取到的额度值
        eLimitOption.series[0].data[0].value = limitValue; // 更新数据值
        // 根据额度值动态调整最外层线的颜色
        if (limitValue <= 50) {
            eLimitOption.series[0].itemStyle.color = '#ff0000'; // 红色
            ElNotification({
                title: '提示',
                message: '您的电表额度不足，请及时充值',
                duration: 0,
            })
        } else if (limitValue <= 120) {
            eLimitOption.series[0].itemStyle.color = '#0092ff'; // 蓝色
        } else {
            eLimitOption.series[0].itemStyle.color = '#00ff3d'; // 绿色
        }
    })
    electricityLimitChart.setOption(eLimitOption);
}

// 充值
const options = [
    { value: '5', label: '5 度' },
    { value: '10', label: '10 度' },
    { value: '20', label: '20 度' },
    { value: '30', label: '30 度' },
    { value: '50', label: '50 度' },
    { value: '100', label: '100 度' },
    { value: '150', label: '150 度' },
    { value: '200', label: '200 度' }
]
const radio = ref([])

const isInputDisabled = () => {
    return radio.value[0] !== null && radio.value[0] !== undefined && radio.value[0] !== "";
}
const isCheckboxDisabled = () => {
    return recharge.value !== null && recharge.value !== undefined && recharge.value !== "";
}

const recharge = ref()

async function submit() {
    if (!radio.value.length && !recharge.value) {
        ElMessage.error('请选择充值度数额或输入充值度数！');
        return;
    }
    ElMessageBox.confirm(
        '确定要充值吗？',
        '提示',
        {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
        }
    ).then(async () => {
        await request.put('/electricityMeter/recharge',null, {
            params:{
                availableLimit: !isInputDisabled() ?  recharge.value : radio.value[0]
            }
        }).then(res => {
            recharge.value = null;
            radio.value = [];
            ElMessage.success(res.data);
            getInfo();
        })
    })
}
</script>

<style scoped>

</style>