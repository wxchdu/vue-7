<template>
    <el-card style="width: 500px">
        <el-form labei-width="80px" size="small">
            <el-form-item label="姓名">
                <el-input v-model="form.username" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="学号">
                <el-input v-model="form.id" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="密码">
                <el-input v-model="form.password" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="昵称">
                <el-input v-model="form.nickname" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="save">确 定</el-button>
            </el-form-item>
        </el-form>
    </el-card>
</template>

<script>
export default {
    name: "Person",
    data() {
        return {
            form: {},
            user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : {}
        }
    },
    created() {//userDTO
        this.request.get("/UserDTO/username/" + this.user.username).then(res => {
            if (res.code === '200') {
                this.form = res.data
            }
        })
    },
    methods: {
        save() {
            this.request.post("/UserDTO", this.form).then(res => {
                if (res.data) {
                    this.$message.success("保存成功")
                } else {
                    this.$message.error("保存失败")
                }
            })
        }
    }

}
</script>

<style scoped>

</style>