<template>
    <div style="margin: 5px;">
        <el-form :model="form">
            <el-form-item label="姓名" prop="name">
                <el-input v-model="form.name" />
            </el-form-item>
            <el-form-item label="电话" prop="phone">
                <el-input v-model="form.phone" />
            </el-form-item>
            <el-form-item label="性别" prop="sex" >
                <el-select v-model="form.sex" placeholder="Select" style="width: 100px">
                    <el-option v-for="item in sexOptions" :key="item.value" :label="item.label" :value="item.value"/>
                </el-select>
            </el-form-item>
            <el-form-item label="住宅">
                <el-cascader :options="buildingOption" v-model="option" :props="{}" clearable filterable/>
            </el-form-item>
            <el-form-item >
                <div style="width: 100%;text-align: center;justify-content: center;">
                    <el-button type="primary" @click="submit()">确定</el-button>
                </div>
            </el-form-item>
        </el-form>
    </div>
</template>

<script setup>
import { ref,reactive,onMounted } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus'
import { defineProps, defineEmits } from 'vue';
import request from "@/request/request"

const props = defineProps({
    userId: String,
    buildingId: String,
});
const emit = defineEmits(['close']);

onMounted(async () => {
    await getOption();
    if (props.userId != '-1') {
        await getUserInfo();
    }
});

const form = reactive({
    id:'',
    name:'',
    phone:'',
    sex:'男',
    buildingId:'',
})
// 性别
const sexOptions = [{
    value: '男',
    label: '男',
  },
  {
    value: '女',
    label: '女',
  }
]

// 获取门牌选择框相关
const option = ref();
const buildingOption = ref([]);

async function getOption() {
    await request.get("/building/getBuildingOptions",{params:{id: props.buildingId}}).then(res => {
        buildingOption.value = res.data;
    })
}

// 住户信息
async function getUserInfo() {
    // 获取用户信息
    await request.get('/user/getUserInfo',{params:{id: props.userId}}).then(res => {
        form.name = res.data.name;
        form.phone = res.data.phone;
        form.sex = res.data.sex;
        option.value = [res.data.buildingNum,res.data.floor,res.data.doorplate]
    })
}

// 确定
async function submit() {
    if (form.name.length === 0 || form.phone.length === 0 || option.value === undefined) {
        ElMessage.error('住户信息有空值')
    } else {
        await request.get('/building/getBuildingId',{params:{
            buildingNum: option.value[0],
            floor: option.value[1],
            doorplate:option.value[2]
        }}).then(res => {
            form.buildingId = res.data;
        })
        if (props.userId === '-1') {  // 等于-1即是新增住户
            await request.post('/user/save',form).then(res => {
                ElMessage.success(res.data)
                emit('close');
            })
        } else {
            form.id = props.userId;
            await request.put('/user/update',form).then(res => {
                ElMessage.success('修改成功！')
                emit('close');
            })
        }
    }
}
</script>

<style>

</style>