<template>
    <el-card style="width: 50%;height: 90%;margin-left: 5%">
        <el-menu :default-active="router.currentRoute.value.path" mode="horizontal" @select="handleSelect" >
            <el-menu-item index="/balanceRelated">
                <span>余额</span>
            </el-menu-item>
            <el-menu-item index="/electricityLimit">
                <span>电可用额度</span>
            </el-menu-item>
            <el-menu-item index="1">
                <span>水可用额度</span>
            </el-menu-item>
        </el-menu>
        <div style="margin-top: 1rem">
            <router-view />
        </div>
    </el-card>
</template>

<script setup>
import {ref} from "vue";
import router from "@/router";

function handleSelect(key, keyPath) {
    router.push(key)
}
</script>


<style scoped>

</style>