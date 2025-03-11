<template>
    <div class="border-card">
        <div style="text-align: center;">
            <span style="font-size: 25px; color: #ff0003;font-family:华文行楷,serif">
                欢迎使用小额自动支付与提醒水电收缴系统！
            </span><br>
            <span style="font-size: 25px; color: #ff0003;font-family:华文行楷,serif">
                本系统主要用于对住户用水用电进行提醒缴费，还包括住户信息管理、住户账单管理、住户账单查询和参数统计等。
            </span>
        </div>
    </div>
    <div class="container" style="display: flex; width: 100%;">
        <div style="width: 8%"></div>
        <div class="item" style="display: flex; flex-direction: column; width: 38%; margin-right: 20px">
            <el-card style="height: 20rem;margin-bottom: 1.2rem">
                <div style="display: flex; flex-direction: row; gap: 5rem; justify-content: flex-start;margin-top: 2rem">
                    <el-card style="width: 15rem;margin-left: 1rem" shadow="hover" @click="router.push('/userManagement')">
                        <div class="charging-station-content">
                            <svg style="margin-right: 2rem" t="1741577300047" class="icon" viewBox="0 0 1264 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2737" width="36" height="36"><path d="M632.590687 0c148.178736 0 268.649254 118.904401 268.649253 265.155609a262.505257 262.505257 0 0 1-103.122762 208.413995c173.658251 75.233838 285.153715 237.266684 285.093479 419.960223v89.750536a41.140682 41.140682 0 0 1-41.261152 40.719035H223.292104a41.140682 41.140682 0 0 1-41.321388-40.77927v-89.750536c0-182.633304 111.435229-344.66615 284.06948-412.731992-64.451727-58.006554-102.158999-133.963215-102.158998-215.642227C363.881198 118.964636 484.472186 0 632.590687 0z m0.060235 530.371453c-202.992822 0-368.037431 162.936375-368.037431 363.158374v44.875268l731.858393 4.156233 4.156233-49.031501c0-200.222-165.044609-363.158375-367.977195-363.158374z m320.029929-434.537156c3.55388 0 7.167996 0.481882 10.661641 1.385411 97.279943 25.720455 165.225315 113.242286 165.225315 212.811168 0 54.63338-20.600458 107.158525-58.06679 147.817325 120.470517 67.46349 194.559886 188.114713 194.439415 321.355105v69.511489a41.140682 41.140682 0 0 1-41.321387 40.77927 41.140682 41.140682 0 0 1-41.321388-40.77927v-69.511489c0-125.289338-85.955714-234.134451-209.016347-264.794197a40.6588 40.6588 0 0 1-32.587275-23.612221l-2.710587-12.408464a37.707272 37.707272 0 0 1 0.301177-9.215994l2.831057-10.842347a50.236206 50.236206 0 0 1 7.167995-11.504934 47.76656 47.76656 0 0 1 9.336466-7.469172l4.939291-2.590116a139.143448 139.143448 0 0 0 83.365598-126.734985c0-62.704904-42.767034-117.820166-104.026292-134.02345a40.839505 40.839505 0 0 1-29.2141-49.995265 41.441858 41.441858 0 0 1 39.996211-30.177864zM316.71699 94.810297c19.275283 0 35.900214 12.83011 40.478094 31.141629a40.839505 40.839505 0 0 1-30.539276 49.151971 138.541095 138.541095 0 0 0-107.519937 134.926979c0 51.19997 28.732218 98.183472 74.089368 122.277576l9.336465 4.577879a39.152918 39.152918 0 0 1 20.299283 19.455989l3.614115 7.710113 0.602353 8.071525v4.638114l-0.361412 3.071999-2.40941 10.962817a40.6588 40.6588 0 0 1-32.165628 23.491751c-123.48228 30.719982-209.49823 139.504859-209.49823 264.914667v69.451254a41.140682 41.140682 0 0 1-41.321388 40.77927 41.140682 41.140682 0 0 1-41.321387-40.77927v-69.451254a352.67744 352.67744 0 0 1 193.35518-314.970167c-36.261626-47.043737-56.862084-99.568883-56.862084-154.202263 0-102.219234 70.234312-190.343417 170.766959-214.196579a41.080446 41.080446 0 0 1 9.456935-1.024z m315.873697-13.372227c-102.580646 0-186.126949 82.401834-186.12695 183.717539 0 101.315705 83.546304 183.717539 186.12695 183.717539 102.640881 0 186.126949-82.401834 186.126949-183.717539 0-101.315705-83.486069-183.717539-186.126949-183.717539z" p-id="2738" fill="#1296db"></path></svg>
                            <el-row>
                                <el-col :span="24" style="margin-bottom: 5px">
                                    <span class="label">小区住户数量</span>
                                </el-col>
                                <el-col :span="24">
                                    <el-statistic :value="householdNumOutputValue" />
                                </el-col>
                            </el-row>
                        </div>
                    </el-card>
                    <el-card style="width: 15rem;" shadow="hover" @click="openBuildingManage()">
                        <div class="charging-station-content">
                            <svg style="margin-right: 2rem" t="1741595956427" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="15811" width="36" height="36"><path d="M486.320002 5.57209a75.364993 75.364993 0 0 0-56.878995 0l-321.369971 168.362985a52.329995 52.329995 0 0 0-28.439998 44.934996v694.499939H22.753043c-13.649999 0-21.044998 7.109999-21.044998 14.503998v81.621993c0 7.109999 7.393999 14.503999 21.044998 14.503999h483.475958V121.890079c0-95.272992 0-108.92399-21.044999-116.317989zM346.112015 809.849019a14.788999 14.788999 0 0 1-14.787999 14.787999h-78.777993a14.503999 14.503999 0 0 1-14.504999-14.787999v-70.246994a14.503999 14.503999 0 0 1 14.504999-14.787999h80.483993a14.788999 14.788999 0 0 1 14.788998 14.787999z m0-206.757982a14.788999 14.788999 0 0 1-14.787999 14.789999h-78.777993a14.503999 14.503999 0 0 1-14.504999-14.789999v-69.392994a14.503999 14.503999 0 0 1 14.504999-14.787999h80.483993a14.788999 14.788999 0 0 1 14.788998 14.787999z m0-205.902982a14.788999 14.788999 0 0 1-14.787999 14.787999h-78.777993a14.503999 14.503999 0 0 1-14.504999-13.649999v-71.669994a14.219999 14.219999 0 0 1 14.504999-13.649999h80.483993a14.503999 14.503999 0 0 1 14.788998 14.503999z m654.114942 511.914955h-56.879995V270.915066a47.778996 47.778996 0 0 0-28.439997-42.943996L636.198989 81.790083a56.879995 56.879995 0 0 0-49.484996 0c-17.632998 7.109999-28.439998 23.604998-28.439997 116.03399V983.900004l1.706 38.393996h441.100961c6.256999 0 20.192998-7.394999 21.045998-14.504999V927.020009c0-9.099999-13.650999-16.494999-21.045998-16.494999zM803.423974 805.867019a14.219999 14.219999 0 0 1-14.503998 14.503999h-79.631993a14.503999 14.503999 0 0 1-14.787999-14.503999v-68.254994a14.503999 14.503999 0 0 1 14.787999-14.504999h80.484993a14.219999 14.219999 0 0 1 14.503998 14.504999z m0-206.756982a14.219999 14.219999 0 0 1-14.503998 14.503999h-79.631993A14.503999 14.503999 0 0 1 694.499984 599.110037v-68.255994a14.503999 14.503999 0 0 1 14.787999-14.503998h80.484993a14.219999 14.219999 0 0 1 14.503998 14.503998z m0-206.756981a14.503999 14.503999 0 0 1-14.503998 14.503998h-79.631993a14.503999 14.503999 0 0 1-14.787999-14.503998v-68.255994a14.788999 14.788999 0 0 1 14.787999-14.787999h80.484993a14.503999 14.503999 0 0 1 14.503998 14.787999z" p-id="15812" fill="#d4237a"></path></svg>
                            <el-row>
                                <el-col :span="24" style="margin-bottom: 5px">
                                    <span class="label">小区套房数量</span>
                                </el-col>
                                <el-col :span="24">
                                    <el-statistic :value="buildingNumOutputValue" />
                                </el-col>
                            </el-row>
                        </div>
                    </el-card>
                </div>
                <div style="display: flex; flex-direction: row; gap: 5rem; justify-content: flex-start;margin-top: 1.5rem">
                    <el-card style="width: 15rem;margin-left: 1rem" shadow="hover" @click="router.push('/statistics')">
                        <div class="charging-station-content">
                            <svg style="margin-right: 2rem" t="1741595756269" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6456" width="36" height="36"><path d="M771.3 465.8L256 1024l150.1-450.3c1.7-5.2-2.1-10.5-7.6-10.5H253c-46.5 0-77.5-48.1-58.3-90.5L392.5 37.5C402.9 14.7 425.7 0 450.8 0h419.6L672.5 346.4c-3 5.3 0.8 12 6.9 12h44.8c55.8 0 84.9 66.4 47.1 107.4z" p-id="6457" fill="#f4ea2a"></path></svg>
                            <el-row>
                                <el-col :span="24" style="margin-bottom: 5px">
                                    <span class="label">上月用电量(度)</span>
                                </el-col>
                                <el-col :span="24">
                                    <el-statistic :value="electricityNumOutputValue" />
                                </el-col>
                            </el-row>
                        </div>
                    </el-card>
                    <el-card style="width: 15rem;" shadow="hover" @click="router.push('/statistics')">
                        <div class="charging-station-content">
                            <svg style="margin-right: 2rem" t="1741595821340" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7916" width="36" height="36"><path d="M486.2 102.6s11-11.2 27.5 3c25.3 21.8 211.6 197.8 289.2 331.1 57.9 99.4 61.9 218.5 22.6 302.4-42.5 90.7-91 129-135.7 150.2-49.4 23.4-83.4 37.3-212.4 38.9-13.6 0.2-17.7-797.5-17.7-797.5l26.5-28.1z" fill="#2280BF" p-id="7917"></path><path d="M486.2 928.3c-174.8 0-316.5-142.8-316.5-319 0-117.5 105.5-286.4 316.5-506.7 211 220.3 316.5 389.2 316.5 506.7 0.1 176.1-141.7 319-316.5 319zM254.3 653.4c21.2 89 85.8 161.3 171.8 192.5 7 2.5 14.7 2.1 21.4-1.1 6.7-3.2 11.8-8.9 14.3-16 5.2-14.6-2.4-30.7-16.9-36-68.2-24.7-119.4-82.1-136.2-152.6-2.4-9.7-9.7-17.4-19.3-20.2-9.6-2.8-19.9-0.3-27.2 6.6-7.3 6.9-10.3 17.1-7.9 26.8z m0 0" fill="#4EB3FF" p-id="7918"></path></svg>
                            <el-row>
                                <el-col :span="24" style="margin-bottom: 5px">
                                        <span class="label">上月用水量(方)</span>
                                </el-col>
                                <el-col :span="24">
                                    <el-statistic :value="waterNumOutputValue" />
                                </el-col>
                            </el-row>
                        </div>
                    </el-card>
                </div>
            </el-card>
            <notice-show-card style="width: 100%;"/>
        </div>
        <div style="width: 4%"></div>
        <calender style="flex: 1;" />
        <div style="width: 8%"></div>
    </div>
</template>

<script setup>
import {onMounted, reactive, ref} from "vue";
import request from "@/request/request";

import NoticeShowCard from "@/components/NoticeShowCard.vue";
import Calender from '@/components/CalendarComponent.vue'
import {TransitionPresets, useTransition} from '@vueuse/core'
import router from "@/router";

document.title = "首页";
document.body.style.overflow = 'hidden';

onMounted(() => {
    peopleCounting()
    buildingCounting()
    electricityCounting()
    waterCounting()
})

// 住户数
const householdNum = ref(0)
const householdNumOutputValue = useTransition(householdNum, {
    duration: 1000,
    transition: TransitionPresets.easeInOutCubic,
})
async function peopleCounting() {
    await request.get('/user/count').then(res => {
        householdNum.value = parseInt(res.data);
    })
}
// 套房量
const buildingNum = ref(0)
const buildingNumOutputValue = useTransition(buildingNum, {
    duration: 1000,
    transition: TransitionPresets.easeInOutCubic,
})
async function buildingCounting() {
    await request.get('/building/count').then(res => {
        buildingNum.value = parseInt(res.data);
    })
}
// 用电量
const electricityNum = ref(0)
const electricityNumOutputValue = useTransition(electricityNum, {
    duration: 1000,
    transition: TransitionPresets.easeInOutCubic,
})
async function electricityCounting() {
    await request.get('/electricityBill/count').then(res => {
        electricityNum.value = parseInt(res.data);
        console.log("electricityNum.value",res.data)
    })
}
// 用水量
const waterNum = ref(0)
const waterNumOutputValue = useTransition(waterNum, {
    duration: 1000,
    transition: TransitionPresets.easeInOutCubic
})
async function waterCounting() {
    await request.get('/waterBill/count').then(res => {
        waterNum.value = parseInt(res.data);
        console.log("waterNum.value",res.data)
    })
}

function openBuildingManage() {
    localStorage.setItem('drawer','true');
    router.push('/userManagement')
}
</script>

<style scoped>
.border-card{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 82.8%;
    margin-left: 8%;
    margin-bottom: 1.5rem;
    border: 2px solid #e8e7e7; /* 添加边框 */
    padding: 10px; /* 可选：添加内边距 */
    border-radius: 5px; /* 可选：添加圆角 */
}
.container {
    display: flex;
    width: 100%;
}

.item {
    display: flex;
    justify-content: center;
    width: 40%;
}

.item > notice-show-card {
    width: 80%;
}

calender {
    flex: 1;
}


.charging-station-content {
    display: flex;
    align-items: center;
}

.charging-station .count {
    font-size: 24px;
    font-weight: bold;
    margin-right: 5px;
}
</style>