<template>
    <div style="width: 100%;height: 100%;display: flex; flex-direction: column; align-items: center;">
        <div class="statisticsDiv" style="margin-bottom: 5px">
            <u-electricity-total-statistics></u-electricity-total-statistics>
            <u-electricity-cost-statistics></u-electricity-cost-statistics>
        </div>
        <div class="statisticsDiv">
            <u-water-total-statistics></u-water-total-statistics>
            <u-water-cost-statistics></u-water-cost-statistics>
        </div>
    </div>
</template>

<script setup>
import UElectricityCostStatistics from "@/components/statistics/UStatistics/UElectricityCostStatistics.vue";
import UElectricityTotalStatistics from "@/components/statistics/UStatistics/UElectricityTotalStatistics.vue";
import UWaterCostStatistics from "@/components/statistics/UStatistics/UWaterCostStatistics.vue";
import UWaterTotalStatistics from "@/components/statistics/UStatistics/UWaterTotalStatistics.vue";
</script>

<style scoped>
.statisticsDiv{
    display: flex; /* 设置为弹性布局 */
    gap: 1rem; /* 子元素之间的间距 */
}
electricity-cost-statistics, water-cost-statistics {
    flex: 1; /* 让两个子元素平分父容器的宽度 */
    margin-bottom: 0; /* 清除默认的 margin-bottom */
}
</style>