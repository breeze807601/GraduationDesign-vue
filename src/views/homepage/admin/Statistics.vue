<template>
    <div class="container">
        <total-statistics class="statistics-item"></total-statistics>
        <cost-statistics class="statistics-item"></cost-statistics>
    </div>
    <div class="container" style="margin-top: 10px;">
        <order-status-statistics></order-status-statistics>
    </div>
</template>

<script setup>
import TotalStatistics from '@/components/statistics/TotalStatistics.vue';
import CostStatistics from '@/components/statistics/CostStatistics.vue';
import OrderStatusStatistics from '@/components/statistics/OrderStatusStatistics.vue';
</script>

<style>
.container {
  display: flex; /* 使用 Flexbox 布局 */
  justify-content: center; /* 水平居中 */
  align-items: center; /* 垂直居中 */
}
.statistics-item {
  margin: 0 10px; /* 给两个组件之间添加一些间距 */
}
</style>