<template>
    <div class="border-card">
        <div style="text-align: center;">
            <span style="font-size: 25px; color: #ff0003;font-family:华文行楷,serif">
                欢迎使用小额自动支付与提醒水电收缴系统！
            </span><br>
        </div>
    </div>
    <div class="container" style="display: flex; width: 100%;">
        <div style="width: 8%"></div>
        <div class="item" style="display: flex; flex-direction: column; width: 38%; margin-right: 20px">
            <el-card style="height: 20rem;margin-bottom: 1.2rem">
                <div style="display: flex; flex-direction: row; gap: 5rem; justify-content: flex-start;margin-top: 2rem">
                    <el-card style="width: 16rem;margin-left: 1rem" shadow="hover" @click="router.push('/personalHomepage')">
                        <div class="charging-station-content">
                            <svg style="margin-right: 2rem" t="1742717359952" class="icon" viewBox="0 0 1200 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2759" width="36" height="36"><path d="M1145.82069 628.77131a387.001379 387.001379 0 0 0-76.941242-116.736V139.687724a134.603034 134.603034 0 0 0-134.532414-134.320552H266.20469a134.603034 134.603034 0 0 0-134.532414 134.320552V512a387.10731 387.10731 0 0 0-76.976552 116.77131 382.799448 382.799448 0 0 0-30.508138 150.422069v206.848a32.485517 32.485517 0 0 0 36.369655 32.344276H258.824828a32.485517 32.485517 0 0 0 32.379586-32.626758 32.485517 32.485517 0 0 0-32.379586-32.591449H88.911448V788.833103h1022.728828v164.334345h-170.866759a32.485517 32.485517 0 0 0-32.344276 32.591449c0 18.008276 14.477241 32.626759 32.344276 32.626758h199.220966a32.485517 32.485517 0 0 0 36.369655-32.344276v-206.88331c0-52.047448-10.24-102.647172-30.543448-150.386759zM196.396138 139.723034a69.561379 69.561379 0 0 1 69.808552-69.137655h668.142344a69.561379 69.561379 0 0 1 69.808552 69.102345v317.828414a385.694897 385.694897 0 0 0-36.369655-21.574621 32.061793 32.061793 0 0 0 0.105931-2.189241V308.612414a83.403034 83.403034 0 0 0-83.120552-83.473655h-189.298758a83.403034 83.403034 0 0 0-83.120552 83.473655v83.650207h-13.34731V308.612414a83.403034 83.403034 0 0 0-83.155862-83.473655H326.62069A83.403034 83.403034 0 0 0 243.394207 308.612414v121.92662c-16.278069 7.874207-32.026483 16.878345-47.033379 26.977104v-317.793104zM903.168 308.612414v100.669793a381.704828 381.704828 0 0 0-113.204966-17.019586h-112.887172V308.612414c0-9.886897 8.403862-18.220138 18.361379-18.220138h189.334069c9.957517 0 18.361379 8.333241 18.36138 18.220138z m-368.887172 0v83.650207h-123.692138c-34.957241 0-69.208276 4.660966-102.4 13.876965V308.612414c0-9.886897 8.403862-18.220138 18.361379-18.220138h189.298759c9.992828 0 18.432 8.333241 18.432 18.220138zM93.713655 723.614897a320.052966 320.052966 0 0 1 89.652966-171.537656 319.346759 319.346759 0 0 1 227.222069-94.596413h379.374344c85.556966 0 166.276414 33.580138 227.222069 94.631724a320.088276 320.088276 0 0 1 89.652966 171.502345H93.713655z m708.890483 157.236965H397.947586a32.485517 32.485517 0 0 0-32.344276 32.626759c0 18.008276 14.477241 32.626759 32.344276 32.626758h404.656552a32.485517 32.485517 0 0 0 32.344276-32.626758 32.485517 32.485517 0 0 0-32.344276-32.626759z" fill="#38BFD4" p-id="2760"></path></svg>
                            <el-row>
                                <el-col :span="24" style="margin-bottom: 5px">
                                    <span class="label">已入住</span>
                                </el-col>
                                <el-col :span="24">
                                    <el-statistic :value="daysOutputValue" suffix="天" />
                                </el-col>
                            </el-row>
                        </div>
                    </el-card>
                    <el-card style="width: 16rem;" shadow="hover" @click="router.push('/personalHomepage')">
                        <div class="charging-station-content">
                            <svg style="margin-right: 2rem" t="1742717631107" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3904" width="38" height="38"><path d="M511.999488 64.021106c-247.27171 0-447.724091 200.452381-447.724091 447.724091s200.452381 447.724091 447.724091 447.724091 447.724091-200.453405 447.724091-447.724091S759.271198 64.021106 511.999488 64.021106zM379.992989 256.420067c32.745798-27.629267 105.400538 30.699186 130.983193 28.652574 25.582655 2.046612 98.237395-56.281841 130.983193-28.652574s-39.653115 90.786703-39.653115 90.786703L419.629731 347.20677C419.629731 347.20677 347.24719 284.049335 379.992989 256.420067zM609.213577 379.952568c0 9.05012-7.322779 16.372899-16.372899 16.372899l-163.728992 0c-9.05012 0-16.372899-7.322779-16.372899-16.372899 0-9.05012 7.322779-16.372899 16.372899-16.372899l163.728992 0C601.890798 363.579669 609.213577 370.902448 609.213577 379.952568zM510.976182 772.550131c-126.60242 0-229.220588 11.416004-229.220588-95.67913 0-79.626525 56.761772-205.01428 137.874137-264.173658l182.676529 0c81.128739 59.159378 137.89051 184.547133 137.89051 264.173658C740.196771 783.967158 637.578602 772.550131 510.976182 772.550131z" fill="#5DB646" p-id="3905"></path><path d="M513.491469 532.48352c7.241938 0 12.892635 2.263553 16.987906 6.766101 4.094248 4.501524 6.158257 10.979052 6.158257 19.408025l45.447075 0c0-14.20656-4.839215-25.6461-14.482853-34.387181-9.643638-8.741082-22.942525-14.086833-39.860846-16.060791L527.741008 483.71991l-23.452131 0 0 24.032346c-17.698081 1.443885-31.707143 6.237051-42.061978 14.400988-10.354835 8.162914-15.532765 18.58938-15.532765 31.253818 0 13.967106 5.110391 24.708751 15.362896 32.218796 10.253528 7.514137 26.158776 14.233166 47.713698 20.156062 9.91379 3.731998 16.784268 7.465019 20.608364 11.222599 3.822049 3.75451 5.750981 8.860808 5.750981 15.313777 0 6.309706-1.860371 11.342326-5.649674 15.145955-3.789303 3.781116-9.644661 5.685489-17.630542 5.685489-8.593725 0-15.498996-2.143826-20.608364-6.381337-5.110391-4.239558-7.68196-11.342326-7.68196-21.288862L440.229908 625.479541l-0.338714 0.579191c-0.440022 16.156982 5.110391 28.414143 16.649192 36.771485 11.538801 8.354272 26.39516 13.242606 44.497447 14.688537l0 22.419616 23.61893 0 0-22.539342c17.700127-1.444908 31.641651-6.069229 41.826618-13.942547 10.18599-7.875365 15.294334-18.325367 15.294334-31.375591 0-13.896498-5.245468-24.77936-15.70161-32.679283-10.456143-7.897877-26.15673-14.56881-47.070039-20.034289-10.455119-4.164856-17.528212-8.04114-21.183462-11.606339-3.653203-3.563152-5.480828-8.308223-5.514597-14.20656 0-6.382361 1.658779-11.488659 4.940522-15.316847C500.532319 534.410406 505.946632 532.48352 513.491469 532.48352z" fill="#5DB646" p-id="3906"></path></svg>
                            <el-row>
                                <el-col :span="24" style="margin-bottom: 5px">
                                    <span class="label">当前余额</span>
                                </el-col>
                                <el-col :span="24">
                                    <el-statistic :value="balanceOutputValue" suffix="元" :precision="2" />
                                </el-col>
                            </el-row>
                        </div>
                    </el-card>
                </div>
                <div style="display: flex; flex-direction: row; gap: 5rem; justify-content: flex-start;margin-top: 2rem">
                    <el-card style="width: 16rem;margin-left: 1rem" shadow="hover">
                        <div class="charging-station-content">
                            <svg style="margin-right: 2rem" t="1742723942050" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6070" width="36" height="36"><path d="M331.847372 1007.871774L429.243621 539.355352H166.632786a17.780942 17.780942 0 0 1-16.584147-24.220834L332.075333 44.68043A52.089041 52.089041 0 0 1 380.687972 11.398154h287.857492a22.796079 22.796079 0 0 1 21.314335 31.116648L584.940843 312.192421l281.47459 1.310775a8.776491 8.776491 0 0 1 6.895814 14.190559l-534.568061 683.42646a3.932324 3.932324 0 0 1-6.895814-3.248441z" fill="#FFF100" p-id="6071"></path><path d="M166.632786 539.355352h35.447904L395.049502 11.398154h-14.36153a52.089041 52.089041 0 0 0-48.612639 33.282276L150.048639 515.134518a17.780942 17.780942 0 0 0 16.584147 24.220834z" fill="#FFFFFF" p-id="6072"></path><path d="M868.638051 310.938637h-43.255561L350.711127 925.406957l-16.641137 79.786278a3.932324 3.932324 0 0 0 6.952804 3.191451l534.511071-683.25549a8.776491 8.776491 0 0 0-6.895814-14.190559z" fill="#F8B62D" p-id="6073"></path><path d="M275.256105 202.999201a11.39804 11.39804 0 0 1-10.657167-15.558324l21.428314-55.394473a11.39804 11.39804 0 0 1 21.257344 8.206588L285.628321 195.704456a11.39804 11.39804 0 0 1-10.372216 7.294745zM335.722705 1024a15.558324 15.558324 0 0 1-6.496882-1.424755 15.330363 15.330363 0 0 1-8.54853-17.09706l94.546739-454.724793H166.632786a29.178982 29.178982 0 0 1-27.184324-39.893139l99.732847-257.880648a11.39804 11.39804 0 1 1 21.257344 8.206589L160.705806 519.237812a6.382902 6.382902 0 0 0 5.69902 8.719501h276.858384l-93.748877 450.84946 69.129111-88.334808a11.39804 11.39804 0 1 1 17.951913 14.019589L347.747637 1018.13001a15.216383 15.216383 0 0 1-12.024932 5.86999z" fill="#231815" p-id="6074"></path><path d="M482.016545 839.351757a11.39804 11.39804 0 0 1-9.004452-18.407834L861.229325 324.844245l-292.92962-1.367765 110.902926-284.950992a11.39804 11.39804 0 0 0-1.196794-10.600177 11.39804 11.39804 0 0 0-9.460373-5.129118H380.687972A40.975953 40.975953 0 0 0 342.618519 48.840714l-15.387353 39.893139a11.39804 11.39804 0 1 1-21.257344-8.206589l15.387353-39.893139A63.943003 63.943003 0 0 1 380.687972 0.000114h287.857492a34.194119 34.194119 0 0 1 31.914511 46.674973l-98.877994 254.176285 264.890443 1.253784a20.23152 20.23152 0 0 1 15.843275 32.598394L490.793035 834.963512a11.39804 11.39804 0 0 1-8.77649 4.388245z" fill="#231815" p-id="6075"></path></svg>
                            <el-row>
                                <el-col :span="24" style="margin-bottom: 5px">
                                    <span class="label">电表可用额度</span>
                                </el-col>
                                <el-col :span="24">
                                    <el-statistic :value="electricityAvailableLimitOutputValue" suffix="度" :precision="1" />
                                </el-col>
                            </el-row>
                        </div>
                    </el-card>
                    <el-card style="width: 16rem;" shadow="hover">
                        <div class="charging-station-content">
                            <svg style="margin-right: 2rem" t="1742724379536" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="21942" width="36" height="36"><path d="M486.2 102.6s11-11.2 27.5 3c25.3 21.8 211.6 197.8 289.2 331.1 57.9 99.4 61.9 218.5 22.6 302.4-42.5 90.7-91 129-135.7 150.2-49.4 23.4-83.4 37.3-212.4 38.9-13.6 0.2-17.7-797.5-17.7-797.5l26.5-28.1z" fill="#2280BF" p-id="21943"></path><path d="M486.2 928.3c-174.8 0-316.5-142.8-316.5-319 0-117.5 105.5-286.4 316.5-506.7 211 220.3 316.5 389.2 316.5 506.7 0.1 176.1-141.7 319-316.5 319zM254.3 653.4c21.2 89 85.8 161.3 171.8 192.5 7 2.5 14.7 2.1 21.4-1.1 6.7-3.2 11.8-8.9 14.3-16 5.2-14.6-2.4-30.7-16.9-36-68.2-24.7-119.4-82.1-136.2-152.6-2.4-9.7-9.7-17.4-19.3-20.2-9.6-2.8-19.9-0.3-27.2 6.6-7.3 6.9-10.3 17.1-7.9 26.8z m0 0" fill="#4EB3FF" p-id="21944"></path></svg>
                            <el-row>
                                <el-col :span="24" style="margin-bottom: 5px">
                                    <span class="label">水表可用额度</span>
                                </el-col>
                                <el-col :span="24">
                                    <el-statistic :value="waterAvailableLimitOutputValue" suffix="方" :precision="1" />
                                </el-col>
                            </el-row>
                        </div>
                    </el-card>
                </div>
            </el-card>
            <notice-show-card style="width: 100%;" :isUser="true"/>
        </div>
        <div style="width: 4%"></div>
        <calender style="flex: 1;" />
        <div style="width: 8%"></div>
    </div>
</template>

<script setup>
import NoticeShowCard from "@/components/notice/NoticeShowCard.vue";
import Calender from "@/components/CalendarComponent.vue";
import router from "@/router";
import {onMounted, ref} from "vue";
import {TransitionPresets, useTransition} from "@vueuse/core";
import request from "@/request/request";

document.title = "幸福小区系统-首页";
document.body.style.overflow = 'hidden';

onMounted(() => {
    getUserInfo()
    getAvailableLimit()
})

const userInfo = ref({
    id: '',
    name: '',
    sex: '',
    phone: '',
    time: '',
    balance: 0,
    buildingNum: '',
    floor: '',
    doorplate: '',
})
// 获取用户信息
async function getUserInfo() {
    await request.get('/user/getUserInfo').then(res => {
        userInfo.id = res.data.id;
        userInfo.name = res.data.name;
        userInfo.sex = res.data.sex;
        userInfo.phone = res.data.phone;
        userInfo.time = res.data.time;
        userInfo.balance = res.data.balance;
        userInfo.buildingNum = res.data.buildingNum;
        userInfo.floor = res.data.floor;
        userInfo.doorplate = res.data.doorplate;
    })
    // 计算入住天数，将差值转换为天数, Math.floor下取整
    const startDate = new Date(userInfo.time);
    const now = new Date();
    days.value = Math.floor((now - startDate) / (1000 * 60 * 60 * 24));
    balance.value = userInfo.balance;    // 获取余额
}
// 入住天数
const days = ref(0)
const daysOutputValue = useTransition(days, {
    duration: 1000,
    transition: TransitionPresets.easeInOutCubic,
})
// 余额
const balance = ref(0)
const balanceOutputValue = useTransition(balance, {
    duration: 1000,
    transition: TransitionPresets.easeInOutCubic,
})
// 可用额度
const electricityAvailableLimit = ref(0)
const electricityAvailableLimitOutputValue = useTransition(electricityAvailableLimit, {
    duration: 1000,
    transition: TransitionPresets.easeInOutCubic,
})
const waterAvailableLimit = ref(0)
const waterAvailableLimitOutputValue = useTransition(waterAvailableLimit, {
    duration: 1000,
    transition: TransitionPresets.easeInOutCubic,
})
// 获取可用额度
async function getAvailableLimit() {
    await request.get('/electricityMeter/getAvailableLimit').then(res => {
        electricityAvailableLimit.value = res.data;
    })
    await request.get('/waterMeter/getAvailableLimit').then(res => {
        waterAvailableLimit.value = res.data;
    })
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