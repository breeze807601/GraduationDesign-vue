<template>
    <div style="height: 100%;width: 100%">
        <div style="width: 100%; display: flex; justify-content: center; align-items: center;">
            <div style="flex: 1;">
                <tariff :isAdmin="false" :isWater="true" style="width: 100%; height: 100%" />
            </div>
            <div id="wLimitOption" style="height: 25rem;width: 65%;"/>
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
                        <el-input v-model="recharge" :disabled="isInputDisabled()" controls-position="right" style="height: 3.2rem; width: 65%; font-size: 1.2rem;" placeholder="请输入方数">
                            <template #append>方</template>
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

let waterLimitChart;

const wLimitOption = {
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
                    name: '水表额度'
                }
            ],
        }
    ]
};
onMounted(() => {
    getInfo();
})

async function getInfo() {
    if (waterLimitChart != null && waterLimitChart !== "" && waterLimitChart !== undefined) {
        //销毁
        waterLimitChart.dispose();
    }
    waterLimitChart = echarts.init(document.getElementById('wLimitOption'));
    await request.get('/waterMeter/getAvailableLimit').then(res => {
        const limitValue = res.data; // 获取到的额度值
        wLimitOption.series[0].data[0].value = limitValue; // 更新数据值
        // 根据额度值动态调整最外层线的颜色
        if (limitValue <= 30) {
            wLimitOption.series[0].itemStyle.color = '#ff0000'; // 红色
            ElNotification({
                title: '提示',
                message: '您的电表额度不足，请及时充值',
                duration: 0,
            })
        } else if (limitValue <= 70) {
            wLimitOption.series[0].itemStyle.color = '#0092ff'; // 蓝色
        } else {
            wLimitOption.series[0].itemStyle.color = '#00ff3d'; // 绿色
        }
    })
    waterLimitChart.setOption(wLimitOption);
}

// 充值
const options = [
    { value: '5', label: '5 方' },
    { value: '10', label: '10 方' },
    { value: '20', label: '20 方' },
    { value: '30', label: '30 方' },
    { value: '50', label: '50 方' },
    { value: '100', label: '100 方' },
    { value: '150', label: '150 方' },
    { value: '200', label: '200 方' }
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
        ElMessage.error('请选择充值方数额或输入充值方数！');
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
        await request.put('/waterMeter/recharge',null, {
            params:{
                availableLimit: !isInputDisabled() ?  recharge.value : radio.value[0]
            }
        }).then(res => {
            recharge.value = null;
            radio.value = [];
            ElMessage.success(res.data);
            getInfo();
        })
    }).catch(() => {
        ElMessage.info('已取消');
    })

}
</script>

<style scoped>

</style>