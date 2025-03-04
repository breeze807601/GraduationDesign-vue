<template>
    <el-popconfirm width="250" :icon="null" @confirm="checkForm" @cancel="popconfirmCancel">
        <template #reference>
            <el-button v-if="isAdd" type="primary" :icon="Plus" plain>新 增</el-button>
            <el-button v-else type="primary" link ><el-icon><EditPen /></el-icon>修改</el-button>
        </template>
        <template #actions="{ confirm, cancel }">
            <div style="text-align: center;margin-bottom: 7px;">新增</div>
            <div style="display: flex; justify-content: center; align-items: center; flex-direction: column;">
                <el-form :model="building" size="large" scroll-to-error ref="ruleRef" :rules="rules">
                    <el-form-item prop="buildingNum" label="楼号">
                        <el-input v-model="building.buildingNum" placeholder="请输入楼号" />
                    </el-form-item>
                    <el-form-item prop="floor" label="楼层">
                        <el-input v-model="building.floor" placeholder="请输入楼层" />
                    </el-form-item>
                    <el-form-item prop="doorplate" label="门牌">
                        <el-input v-model="building.doorplate" placeholder="请输入门牌" />
                    </el-form-item>
                </el-form>
                <div style="margin-top: 10px;margin-bottom: 10px;">
                    <el-button @click="cancel">取消</el-button>
                    <el-button type="primary" @click="confirm">确定</el-button>
                </div>
            </div>
        </template>
    </el-popconfirm>
</template>

<script setup>
import {reactive,ref,onMounted} from "vue";
import request from "@/request/request"
import {Plus,EditPen} from '@element-plus/icons-vue';
import { defineProps, defineEmits } from 'vue';
import { ElMessage } from 'element-plus'

onMounted(async () => {
    if (!props.isAdd) {
        building.id = props.buildingInfo.id;
        building.buildingNum = props.buildingInfo.buildingNum;
        building.floor = props.buildingInfo.floor;
        building.doorplate = props.buildingInfo.doorplate;
    }
});

const props = defineProps({
    isAdd: Boolean,
    buildingInfo: Object
});
const emit = defineEmits(['close']);

// add
const building = reactive({
    id: null,
    buildingNum: null,
    floor: null,
    doorplate: null
})

const ruleRef = ref(null)
const rules = {
    buildingNum: [{ required: true, message: '请输入楼号', trigger: 'blur' }],
    floor: [{ required: true, message: '请输入楼层', trigger: 'blur' }],
    doorplate: [{ required: true, message: '请输入门牌', trigger: 'blur' }],
}
// popconfirm确定和取消
function checkForm() {
    ruleRef.value.validate(valid => {
        if (valid) {
            // add or mod
            props.isAdd ? add() : update();
        } else {
            ElMessage.error('请输入信息！')
        }
    })
}
function popconfirmCancel() {
    ElMessage.info('已取消');
}
async function add() {
    await request.post('/building/addOrUpdate', building).then(res => {
        ElMessage.success("添加成功!");
    })
    emit('close');  // 刷新
}
async function update() {
    await request.put('/building/update', building).then(res => {
        ElMessage.success("修改成功!");
    })
    emit('close');  // 刷新
}
</script>

<style>

</style>