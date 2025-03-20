<template>
    <div class="parent-container" style="width: 100%;height: 100%;display: flex; flex-direction: column;">
        <cost-statistics style="margin-bottom: 1rem"></cost-statistics>
        <total-statistics ></total-statistics>
    </div>
</template>

<script setup>
import TotalStatistics from '@/components/statistics/TotalStatistics.vue';
import CostStatistics from '@/components/statistics/CostStatistics.vue';
import ElectricityStatusStatistics from '@/components/statistics/ElectricityStatusStatistics.vue';
import WaterStatusStatistics from '@/components/statistics/WaterStatusStatistics.vue';

document.title = "统计";
document.body.style.overflow = 'hidden';
</script>

<style>
.parent-container {
    display: grid;
    place-items: center; /* 同时实现水平和垂直居中 */
    height: 100%;        /* 确保父容器有高度 */
}

</style>