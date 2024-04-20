<template>
    <!-- <div class="global">
        <div
            style="margin: 200px auto; background-color:#fff; width:350px; height: 250px; padding: 20px;border-radius: 10px">
            <div style="margin: 20px 0; text-align: center; front-size: 24px"><b>
                    <h2>登 录</h2>
                </b></div>
            <div class="login-box">
                <div class="owl" id="owl">
                    <div class="hand"></div>
                    <div class="hand hand-r"></div>
                    <div class="arms">
                        <div class="arm"></div>
                        <div class="arm arm-r"></div>
                    </div>
                </div>
                <div class="input-box">
                    <el-input type="text" prefix-icon="el-icon-user" v-model="user.username" placeholder="账号">
                    </el-input>
                    <el-input type="password" prefix-icon="el-icon-lock" show-password v-model="user.password"
                        placeholder="密码" id="password"></el-input>
                    <button>登录</button>
                    <div style="margin: 10px 0; text-align:right">
                        <el-button type="primary" size="small" autocomplete="off" @click="login">登录</el-button>
                        <el-button type="warning" size="small" autocomplete="off" @click="$router.push('/register')">注册
                        </el-button>
                    </div>
                </div>
            </div>
        </div>
    </div> -->
    <div class="wrapper">
        <div
            style="margin: 200px auto; background-color: #fff; width: 350px; height: 300px; padding: 20px; border-radius: 10px">
            <div style="margin: 20px 0; text-align: center; font-size: 24px"><b>登 录</b></div>
            <el-form :model="user" :rules="rules" ref="userForm">
                <el-form-item prop="username">
                    <el-input size="medium" style="margin: 10px 0" prefix-icon="el-icon-user" v-model="user.username">
                    </el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input size="medium" style="margin: 10px 0" prefix-icon="el-icon-lock" show-password
                        v-model="user.password"></el-input>
                </el-form-item>
                <el-form-item style="margin: 10px 0; text-align: right">
                    <el-button type="primary" size="small" autocomplete="off" @click="login">登录</el-button>
                    <el-button type="warning" size="small" autocomplete="off" @click="$router.push('/register')">注册
                    </el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>

</template>


<script>
export default {
    name: "login",
    data() {
        return {
            user: {},
            rules: {
                username: [
                    { required: true, message: '请输入用户名', trigger: 'blur' },
                    { min: 3, max: 10, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
                ],
            }
        }
    },
    methods: {
        login() {
            this.$refs['userForm'].validate((valid) => {
                if (valid) {
                    this.request.post("/UserDTO/login", this.user).then(res => {
                        if (res.code === '200') {
                            localStorage.setItem("user", JSON.stringify(res.data))//存储用户信息到浏览器
                            this.$router.push("/")
                            this.$message.success("登录成功")
                        } else {
                            this.$message.error(res.msg)
                        }
                    })
                }
            });
        }
    }
}
</script>

<style>
.wrapper {
    height: 100vh;
    background-image: linear-gradient(to bottom right, #e08c15, #90c02f);
    overflow: hidden;
}
</style>
<!-- <style>
/* .wrapper {
    height: 100vh;
    background-image: linear-gradient(to bottom right, #FC4668, #3F5EFB);
    overflow: hidden;
} */

* {
    /* 初始化 */
    margin: 0;
    padding: 0;
}

.global {
    /* 100%窗口高度 */
    height: 100vh;
    /* 弹性布局 居中 */
    display: flex;
    justify-content: center;
    align-items: center;
    /* 渐变背景 */
    background: linear-gradient(200deg, #bbd475, #c46c1e);
}

.login-box {
    /* 相对定位 */
    position: relative;
    width: 320px;
}

.input-box {
    /* 弹性布局 垂直排列 */
    display: flex;
    flex-direction: column;
}

.input-box input {
    height: 40px;
    border-radius: 3px;
    /* 缩进15像素 */
    text-indent: 15px;
    outline: none;
    border: none;
    margin-bottom: 15px;
}

.input-box input:focus {
    outline: 1px solid lightseagreen;
}

.input-box button {
    border: none;
    height: 45px;
    background-color: lightseagreen;
    color: #fff;
    border-radius: 3px;
    cursor: pointer;
}
</style> -->