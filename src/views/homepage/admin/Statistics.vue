<template>
    <div style="width: 100%;height: 100%;display: flex; flex-direction: column; align-items: center;">
        <div class="statisticsDiv" style="margin-bottom: 5px">
            <electricity-total-statistics></electricity-total-statistics>
            <electricity-cost-statistics></electricity-cost-statistics>
        </div>
        <div class="statisticsDiv">
            <water-total-statistics></water-total-statistics>
            <water-cost-statistics></water-cost-statistics>
        </div>
    </div>
</template>

<script setup>
import ElectricityTotalStatistics from '@/components/statistics/AStatistics/ElectricityTotalStatistics.vue';
import WaterTotalStatistics from "@/components/statistics/AStatistics/WaterTotalStatistics.vue";
import ElectricityCostStatistics from '@/components/statistics/AStatistics/ElectricityCostStatistics.vue';
import WaterCostStatistics from "@/components/statistics/AStatistics/WaterCostStatistics.vue";

document.title = "统计";
document.body.style.overflow = 'hidden';
</script>

<style>
.statisticsDiv{
    display: flex; /* 设置为弹性布局 */
    gap: 1rem; /* 子元素之间的间距 */
}
electricity-cost-statistics, water-cost-statistics {
    flex: 1; /* 让两个子元素平分父容器的宽度 */
    margin-bottom: 0; /* 清除默认的 margin-bottom */
}
</style>