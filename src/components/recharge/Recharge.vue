<template>
    <el-card style="width: 50%;height: 90%;margin-left: 5%">
        <el-tabs v-model="tabPane" type="card" >
            <el-tab-pane label="余额" name="BalanceRelated">
                <balance-related />
            </el-tab-pane>
            <el-tab-pane label="电可用额度" name="ElectricityLimit">
                <electricity-limit />
            </el-tab-pane>
            <el-tab-pane label="水可用额度" >

            </el-tab-pane>
        </el-tabs>
    </el-card>
</template>

<script setup>
import request from "@/request/request";
import {onMounted, reactive, ref} from "vue";
import BalanceRelated from "@/components/recharge/BalanceRelated.vue";
import ElectricityLimit from "@/components/recharge/ElectricityLimit.vue";

const tabPane = ref('BalanceRelated')

const availableLimit = reactive({
    electricityAvailableLimit: '',
    waterAvailableLimit: '',
})
async function getInfo() {
    await request.get('/electricityMeter/getAvailableLimit').then(res => {
        availableLimit.electricityAvailableLimit = res.data;
    })
    await request.get('/waterMeter/getAvailableLimit').then(res => {
        availableLimit.waterAvailableLimit = res.data;
    })
}


</script>


<style scoped>

</style>