<template>
    <div style="border: #0bda28 solid;background-color: #0bda28;height: 8rem;border-radius: 0.5rem;" >
        <div style="text-align: center;margin-top: 1rem">
            <svg t="1742969254903" class="icon" viewBox="0 0 1282 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3834" width="40" height="40"><path d="M1255.69388 1023.926568a109.003041 109.003041 0 0 0 26.435661-25.804142v25.804142z m-1255.693878 0v-24.834835a106.006999 106.006999 0 0 0 25.64259 24.834835z m0-1023.926568h24.967012a107.75469 107.75469 0 0 0-24.967012 24.511732z m1282.129539 24.306121A107.093798 107.093798 0 0 0 1257.412198 0h24.717343zM85.857153 1022.134817c-45.895244 0-83.536688-36.216855-85.813092-82.508634V83.830417A86.180254 86.180254 0 0 1 85.857153 1.395215h1110.753026a85.431243 85.431243 0 0 1 85.255005 86.650221v847.262923c0 47.863232-38.596064 86.811772-86.048075 86.811772z m-15.817337-74.166714h1141.59463V734.779187H835.822158c-128.844472 0-233.661867-104.112443-233.661867-232.046355 0-127.537376 104.817394-231.297344 233.661867-231.297344h375.812288v-198.267454H70.025129z m764.989272-604.025472a155.54449 155.54449 0 0 0 0 311.088979h373.447765V343.942631z" fill="#2c2c2c" p-id="3835"></path><path d="M835.029088 561.87528a62.358786 62.358786 0 1 1 62.358786-62.3441 62.417532 62.417532 0 0 1-62.358786 62.3441z" fill="#2c2c2c" p-id="3836"></path></svg>
        </div>
        <div style="text-align: center;">
            <span style="font-size: 1rem;">余额</span>
        </div>
        <div style="text-align: center;margin-top: 0.5rem">
            <svg style="vertical-align: middle;" t="1742969708350" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4926" width="24" height="24"><path d="M447.488 764.928l-197.632 0q-27.648-2.048-42.496-23.04t-17.92-46.592q3.072-25.6 17.92-41.984t42.496-18.432l197.632 0 0-64.512-197.632-1.024q-27.648-2.048-42.496-19.456t-17.92-44.032q3.072-25.6 17.92-41.984t42.496-18.432l147.456 0-137.216-241.664q-10.24-12.288-19.456-31.232t-8.192-41.472q5.12-28.672 20.48-46.592t57.344-23.04q24.576 2.048 44.032 16.896t31.744 32.256l155.648 284.672 171.008-286.72q12.288-17.408 31.744-30.72t44.032-16.384q15.36 1.024 28.16 4.096t22.528 10.24 16.384 20.48 9.728 34.816q0 29.696-20.48 56.32l-158.72 258.048 150.528 0q26.624 2.048 41.984 18.432t17.408 41.984q-2.048 26.624-17.92 45.056t-42.496 20.48l-195.584 1.024 0 62.464 196.608 0q26.624 2.048 41.984 20.48t17.408 44.032q-2.048 26.624-17.408 44.544t-41.984 19.968l-196.608-1.024 0 108.544q-4.096 87.04-95.232 87.04-45.056 0-70.144-21.504t-27.136-65.536l0-106.496z" p-id="4927"></path></svg>
            <span style="font-size: 1.5rem;margin-left: 0.2rem;vertical-align: middle;">{{ userInfo.balance }}</span>
        </div>
    </div>
    <div style="margin-top: 1rem;text-align: center">
        <el-checkbox-group v-model="radio" size="large" :max="1" :min="0" :disabled="isCheckboxDisabled()">
            <el-row>
                <el-col :span="6" v-for="item in options" :key="item.value">
                    <el-checkbox-button style="margin-top: 1.5rem" :value="item.value" border >
                        <div style="width: 6rem; height: 4rem; display: grid; align-items: center;">
                            <span style="font-size: 1.5rem;">{{ item.label }}</span>
                        </div>
                    </el-checkbox-button>
                </el-col>
                <el-col :span="24" style="margin-top: 4rem">
                    <el-input v-model="recharge" :disabled="isInputDisabled()" controls-position="right" style="height: 4rem; width: 80%; font-size: 1.5rem;" placeholder="请输入金额">
                        <template #append>元</template>
                    </el-input>
                </el-col>
            </el-row>
        </el-checkbox-group>
    </div>
    <div style="margin-top: 5rem;text-align: center">
        <el-button style="width: 30%;height: 4rem" size="large" type="primary" plain round @click="submit">
            <span style="font-size: 1.5rem;">充值</span>
        </el-button>
    </div>
</template>

<script setup>
import {onMounted, reactive, ref} from "vue";
import request from "@/request/request";

onMounted(() => {
    getInfo();
})
const userInfo = reactive({
    id: '',
    balance: '',
})
async function getInfo() {
    await request.get('/user/getUserInfo').then(res => {
        userInfo.id = res.data.id;
        userInfo.balance = res.data.balance;
    })
}

const options = [
    { value: '5', label: '5 元' },
    { value: '10', label: '10 元' },
    { value: '20', label: '20 元' },
    { value: '30', label: '30 元' },
    { value: '50', label: '50 元' },
    { value: '100', label: '100 元' },
    { value: '150', label: '150 元' },
    { value: '200', label: '200 元' }
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
    if (!isInputDisabled()) {  // 输入框有值
        window.open("http://localhost:4090/alipay/pay?rate=" + recharge.value + "&id=" + userInfo.id)
    } else {
        window.open("http://localhost:4090/alipay/pay?rate=" + radio.value[0] + "&id=" + userInfo.id)
    }
}
</script>

<style scoped>

</style>