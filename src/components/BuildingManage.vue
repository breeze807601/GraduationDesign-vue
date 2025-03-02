<template>
    <div>
        <el-row>
            <el-col :span="24">    
                <el-form :model="form" inline>
                    <el-form-item label="住宅">
                        <el-cascader :options="buildingOption" :props="myProps" v-model="option" clearable />
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" :icon="Search">搜索</el-button>
                        <el-button :icon="Refresh">重置</el-button>
                        <el-button :icon="Upload">导入</el-button>
                        <el-button :icon="Download">导出</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
        <div class="container">
                <el-table :data="buildingList" height="810" style="width: 100%;" stripe v-loading="loading" :cell-style="{ textAlign: 'center' }" table-layout="fixed">
                    <el-table-column label="楼号" header-align="center">
                        <template #default="scope">{{ scope.row.name }}</template>
                    </el-table-column>
                    <el-table-column label="楼层" header-align="center">
                        <template #default="scope">{{ scope.row.sex }}</template>
                    </el-table-column>
                    <el-table-column label="门牌" header-align="center">
                        <template #default="scope">{{ scope.row.phone }}</template>
                    </el-table-column>
                    <el-table-column label="操作" header-align="center">
                        <!-- <template #default="scope">
                            <el-button type="primary" link >
                                <el-icon><EditPen /></el-icon>修改
                            </el-button>
                        </template> -->
                    </el-table-column>
                    <template #empty><el-empty v-if="buildingList.length === 0 && !loading" description="暂无数据" /></template>
                </el-table>
        </div>
    </div>
</template>

<script setup>
import {reactive,ref,onMounted} from "vue";
import request from "@/request/request"
import {Search,Refresh,Plus,Download,Upload} from '@element-plus/icons-vue';
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'

onMounted(async () => {
    await getOption();
});

// 加载
const loading = ref(false)

// 搜索相关
const form = ref({
    buildingNum:null,  // 楼号
    floor:null,          // 楼层
    doorplate:null,      // 门牌
})

// 获取门牌选择框相关
const option = ref();
const buildingOption = ref([]);
const myProps = {
  checkStrictly: true,
}
async function getOption() {
    await request.get("/building/getBuildingOptions").then(res => {
        buildingOption.value = res.data
    })
}

const buildingList = reactive([])
</script>

<style>
.container {
    display: flex; /* 使用flex布局 */
    justify-content: space-between; /* 表格之间有间隔 */
}
.scrollbar-demo-item {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  margin: 10px;
  text-align: center;
  border-radius: 4px;
  background: var(--el-color-primary-light-9);
  color: var(--el-color-primary);
}
</style>