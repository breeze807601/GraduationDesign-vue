<template>
    <div style="width: 100%;height: 100%">
        <div class="container">
            <total-statistics class="statistics-item"></total-statistics>
            <cost-statistics class="statistics-item"></cost-statistics>
        </div>
        <div class="container" style="margin-top: 1rem;">
            <electricity-status-statistics class="statistics-item"></electricity-status-statistics>
            <water-status-statistics class="statistics-item"></water-status-statistics>
        </div>
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
.container {
  display: flex; /* 使用 Flexbox 布局 */
  justify-content: center; /* 水平居中 */
  align-items: center; /* 垂直居中 */
}
.statistics-item {
  margin: 0 3rem; /* 给两个组件之间添加一些间距 */
}
</style>