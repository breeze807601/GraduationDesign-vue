<template>
    <el-card style="width: 52rem;" v-loading="loading">
        <div style="margin-bottom: 1rem;text-align: center;">
            <el-date-picker v-model="date" value-format="YYYY-MM-DD" type="monthrange" range-separator="至" start-placeholder="起始月" end-placeholder="终点月" :disabledDate="disabledDate">
                <template #default="cell">
                    <div class="el-date-table-cell" :class="{ current: cell.isCurrent }">
                        <span class="el-date-table-cell__text">{{ cell.text + 1 }}月</span>
                    </div>
                </template>
            </el-date-picker>
            <el-button style="margin-left: 10px;" type="primary" :icon="Search" @click="query">查看</el-button>
            <el-button style="margin-left: 10px;" :icon="RefreshLeft" @click="resetQuery">重置</el-button>
            <el-tooltip content="切换查看平均数据或总量数据" effect="light" placement="top">
                <el-button style="margin-left: 10px;" :icon="Help" @click="change">切换</el-button>
            </el-tooltip>
        </div>
        <div id="aggregateOption" style="width: 50rem;height: 22rem;" />
    </el-card>
</template>

<script setup>

import {Help, RefreshLeft, Search} from "@element-plus/icons-vue";
</script>



<style scoped>

</style>