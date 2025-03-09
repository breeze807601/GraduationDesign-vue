<template>
    <div class="container" style="display: flex; width: 100%;">
        <div style="width: 8%"></div>
        <div class="item" style="display: flex; justify-content: center; width: 38%; margin-right: 20px">
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


document.title = "首页";
document.body.style.overflow = 'hidden';


</script>

<style scoped>
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
</style>