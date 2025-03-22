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