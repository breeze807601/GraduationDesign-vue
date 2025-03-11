<template>
    <el-card style="height: 41.5rem; width: 45rem; position: relative;">
        <el-config-provider :locale="zhCn" >
            <div class="dashboard-container">
                <el-calendar ref="myCalendar">
                    <template #header="{ date }">
                        <div style="display: flex; align-items: center; justify-content: center;">
                            <span style="font-size: 21px;">{{ date }}</span>
                        </div>
                        <el-button-group>
                            <el-button size="large" @click="selectDate('prev-year')">上一年</el-button>
                            <el-button size="large" @click="selectDate('prev-month')">上个月</el-button>
                            <el-button size="large" @click="selectDate('today')">今天</el-button>
                            <el-button size="large" @click="selectDate('next-month')">下个月</el-button>
                            <el-button size="large" @click="selectDate('next-year')">下一年</el-button>
                        </el-button-group>
                    </template>
                    <template #date-cell="{ data }">
                        <div style="width: 4.4rem;height: 4.4rem" :class="{ selected : isSelected(date, data) }">
                            <div class="solar" >{{ data.day.split('-')[2] }}</div>
                            <div class="lunar" :class="{ festival : isFestival(date, data) }">
                                {{ solarToLunar(date, data) }}
                            </div>
                        </div>
                    </template>
                </el-calendar>
            </div>
        </el-config-provider>
    </el-card>
</template>
<script setup>
import calendar from "@/utils/calendar";
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import {onMounted, ref} from "vue";
import {ElNotification} from "element-plus";

onMounted(() => {
    workNotice();
})

const myCalendar = ref();
const selectDate = (val) => {
    if (!myCalendar.value) return
    myCalendar.value.selectDate(val)
}

// 通知记录抄表和录入抄表的信息提示
function workNotice() {
    // 获取年月
    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth();
    // 获取下个月的第一天
    const firstDayNextMonth = new Date(year, month + 1, 1);
    // 获取下个月第一天的前一天（即本月最后一天）
    const lastDayThisMonth = new Date(firstDayNextMonth - 1);
    // 获取本月倒数第二天
    // firstDayNextMonth -  86400000 = x月最后一天的00：00：00
    // firstDayNextMonth -  86400001 = x月倒数第二天的23：59：59
    const secondLastDayThisMonth = new Date(firstDayNextMonth -  86400001);

    // 格式化日期为 YYYY-MM-DD
    let lastDayFormatted = formatDate(lastDayThisMonth);
    let secondLastDayFormatted = formatDate(secondLastDayThisMonth);
    // 今天日期格式化
    let today = formatDate(date);

    if (today === lastDayFormatted) {
        ElNotification({
            title: '提示',
            message: '<span style="font-size: 20px;">今日需要进行导出抄表工作，请前往记录页面进行导出</span>',
            type: 'warning',
            duration: 0,
            dangerouslyUseHTMLString: true // 允许使用 HTML 字符串
        })
    } else if (today === secondLastDayFormatted) {
        ElNotification({
            title: '提示',
            message: '<span style="font-size: 20px;">今日需要进行录入抄表工作，请前往记录页面进行录入</span>',
            type: 'warning',
            duration: 0,
            dangerouslyUseHTMLString: true // 允许使用 HTML 字符串
        })
    }
}
// 格式化日期
function formatDate(date) {
    // 格式化日期为 YYYY-MM-DD 的形式
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}


const date = ref(new Date()); // 日历组件当前日期
function isSelected (slotDate, slotData) {
    // 获取当前日期并格式化为 YYYY-MM-DD
    let now = new Date();
    let year = now.getFullYear(); // 获取年份
    let month = String(now.getMonth() + 1).padStart(2, '0'); // 获取月份，从 0 开始，需要加 1，并补零
    let day = String(now.getDate()).padStart(2, '0'); // 获取日期，补零
    // 将日期格式化为 YYYY-MM-DD
    now = `${year}-${month}-${day}`;
    // 判断 slotData.day 是否等于当前日期
    return now === slotData.day;
}
// 是否节假日
function isFestival(slotDate, slotData) {
    let solarDayArr = slotData.day.split('-');
    let lunarDay = calendar.solar2lunar(solarDayArr[0], solarDayArr[1], solarDayArr[2])
    // 公历节日\农历节日\农历节气
    let festAndTerm = [];
    festAndTerm.push(lunarDay.festival == null ? '' : ' ' + lunarDay.festival)
    festAndTerm.push(lunarDay.lunarFestival == null ? '' : '' + lunarDay.lunarFestival)
    festAndTerm.push(lunarDay.Term == null ? '' : '' + lunarDay.Term)
    festAndTerm = festAndTerm.join('')
    return festAndTerm !== ''
}
// 公历转农历
function solarToLunar(slotDate, slotData) {
    let solarDayArr = slotData.day.split('-');
    let lunarDay = calendar.solar2lunar(solarDayArr[0], solarDayArr[1], solarDayArr[2])
    // 农历日期
    let lunarMD = lunarDay.IMonthCn + lunarDay.IDayCn
    // 公历节日\农历节日\农历节气
    let festAndTerm = [];
    festAndTerm.push(lunarDay.festival == null ? '' : ' ' + lunarDay.festival)
    festAndTerm.push(lunarDay.lunarFestival == null ? '' : '' + lunarDay.lunarFestival)
    festAndTerm.push(lunarDay.Term == null ? '' : '' + lunarDay.Term)
    festAndTerm = festAndTerm.join('')

    return festAndTerm === '' ? lunarMD : festAndTerm
}
</script>

<style scoped>
/**日期div的样式*/
.el-calendar-table tr td:first-child {
    border-left: 0;
}
.el-calendar-table td {
    min-height: 10rem;
    min-width: 10rem;
    border-right: 0;
}
.el-calendar-table td.is-selected {
    background-color: white;
}
.el-calendar-table .el-calendar-day {
    height: 100%;
    padding: 0;
    text-align: center;
}
.el-calendar-table .el-calendar-day > div {
    height: 4.3rem;
    text-align: center;
}
/**日期div的样式-公历*/
.el-calendar-table .el-calendar-day > div .solar {
    font-size: 1.3rem;
    padding-top: 0.5rem;
    text-align: center
}
/**日期div的样式-农历*/
.el-calendar-table .el-calendar-day > div .lunar {
    padding-top: 0.5rem;
    font-size: 0.8rem;
    text-align: center
}
/**日期div的样式-选中*/
.el-calendar-table .el-calendar-day > div.selected {
    background-color: #fef2f2;
    border: 2px solid #0bda28;
    border-radius: 0.5rem;
    text-align: center;
}
/**周末设置为红色*/
.el-calendar-table .current:nth-last-child(1) .solar {
    color: red;
}
.el-calendar-table .current:nth-last-child(7) .solar {
    color: red;
}
/**本月农历设置为灰色*/
.el-calendar-table .current .lunar {
    color: #606266;
}
/**本月农历节日设置为红色*/
.el-calendar-table .current .lunar.festival {
    color: red;
}
</style>