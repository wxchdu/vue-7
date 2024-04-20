<template>
    <div>
        <div style="padding:10px 0">
            <el-input style="width:200px" placeholder="请输入生日时间" suffix-icon="el-icon-postcard" v-model="birthtime">
            </el-input>
            <el-input style="width:200px" placeholder="请输入学院" suffix-icon="el-icon-school" v-model="college"
                class="ml-5">
            </el-input>
            <el-input style="width:200px" placeholder="请输入姓名" suffix-icon="el-icon-coordinate" v-model="username"
                class="ml-5"></el-input>
            <el-button type="primary" style="margin-left: 10px" @click="load">搜索</el-button>
            <el-button type="warning" @click="reset">重置</el-button>
        </div>

        <div style="margin: 10px 0">
            <el-button type="primary" @click="handleAdd">新增<i class="el-icon-circle-plus-outline"></i></el-button>
            <el-popconfirm class="ml-5" confirm-button-text='确定' cancel-button-text='我再想想' icon="el-icon-info"
                icon-color="red" title="您确定批量删除这些数据吗？" @confirm="delBatch">

                <el-button type="danger" slot="reference">批量删除<i class="el-icon-remove-outline"></i></el-button>
            </el-popconfirm>
            <!-- <el-button type="primary" class="ml-5">导入<i class="el-icon-bottom"></i></el-button> -->
            <el-button type="primary" class="ml-5" @click="exp">导出<i class="el-icon-bottom"></i></el-button>
        </div>
        <!-- 表单最开头一行 -->
        <el-table :data="tableData" :header-cell-style="{ textAlign: 'center' }" border stripe
            header-cell-class-name="'headerBg'" @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55">
            </el-table-column>
            <el-table-column prop="id" label="学号" width="140">
            </el-table-column>
            <el-table-column prop="username" label="姓名" width="120">
            </el-table-column>
            <el-table-column prop="birthtime" label="出生年月">
            </el-table-column>
            <el-table-column prop="college" label="学院">
            </el-table-column>
            <el-table-column prop="major" label="专业">
            </el-table-column>
            <el-table-column prop="hobby" label="特长">
            </el-table-column>
            <el-table-column label="操作" width="200" align="center">
                <template slot-scope="scope">
                    <el-button type="success" @click="handleEdit(scope.row)">编辑<i class="el-icon-edit"></i></el-button>
                    <el-popconfirm class="ml-5" confirm-button-text='确定' cancel-button-text='我再想想' icon="el-icon-info"
                        icon-color="red" title="您确定删除吗？" @confirm="del(scope.row.id)">
                        <el-button type="danger" slot="reference">删除<i class="el-icon-remove-outline"></i></el-button>
                    </el-popconfirm>
                </template>
            </el-table-column>
        </el-table>
        <div style="padding:10px 0">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageNum"
                :page-sizes="[2, 5, 10, 20]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper"
                :total="total">
            </el-pagination>
        </div>
        <!-- 表单内某一行点编辑出来的页面 -->
        <el-dialog title="学生信息" :visible.sync="dialogFormVisible" width="30%">
            <el-form labei-width="80px" size="small">
                <el-form-item label="学号">
                    <el-input v-model="form.id" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="姓名">
                    <el-input v-model="form.username" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="出生年月">
                    <el-input v-model="form.birthtime" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="学院">
                    <el-input v-model="form.college" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="专业">
                    <el-input v-model="form.major" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="特长">
                    <el-input v-model="form.hobby" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="save">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
export default {
    name: "Student",
    data() {
        return {
            // tableData: [{
            //     id: '22052003',
            //     username: '王小虎',
            //     birthtime: '2003-05-02',
            //     college: '计算机学院',
            //     major: '计科',
            //     hobby: '吉他，架子鼓，滑冰'
            // }, {
            //     id: '22052003',
            //     username: '李小虎',
            //     birthtime: '2003-05-02',
            //     college: '计算机学院',
            //     major: '软工',
            //     hobby: '毛笔，唱歌'
            // }, {
            //     id: '22052003',
            //     username: '张小虎',
            //     birthtime: '2003-05-02',
            //     college: '计算机学院',
            //     major: '计科',
            //     hobby: '街舞'
            // }],
            tableData: [],
            total: 0,
            pageNum: 1,
            pageSize: 2,
            birthtime: "",
            college: "",
            username: "",
            form: {},
            dialogFormVisible: false,
            multipleSelection: []
        }
    },
    created() {
        this.load()
    },
    methods: {
        save() {
            this.request.post("/user", this.form).then(res => {
                if (res.data) {
                    this.$message.success("保存成功")
                    this.dialogFormVisible = false
                    this.load()
                } else {
                    this.$message.error("保存失败")
                }
            })
        },
        // 新增
        handleAdd() {
            this.dialogFormVisible = true
            this.form = {}
        },
        //表单里的数据编辑
        handleEdit(row) {
            this.form = row
            this.dialogFormVisible = true
        },
        //显示表单数据
        handleSelectionChange(val) {
            console.log(val)
            this.multipleSelection = val
        },
        //批量删除
        delBatch() {
            let ids = this.multipleSelection.map(v => v.id)
            // [{},{},{}]=[1,2,3]
            ///user/delBatch 改成了 /user/del/batch
            this.request.post("/user/del/batch", ids).then(res => {
                if (res.data) {
                    this.$message.success("批量删除成功")
                    this.load()
                } else {
                    this.$message.error("批量删除失败")
                }
            })
        },
        //删除
        del(id) {
            this.request.delete("/user/" + id).then(res => {
                if (res.data) {
                    this.$message.success("删除成功")
                    this.load()
                } else {
                    this.$message.error("删除失败")
                }
            })
        },

        //load重新请求数据
        load() {
            this.request.get("/user/page", {
                params: {
                    pageNum: this.pageNum,
                    pageSize: this.pageSize,
                    birthtime: this.birthtime,
                    college: this.college,
                    username: this.username
                }
            }).then(res => {
                this.tableData = res.data.records
                this.total = res.data.total
            })
        },
        //搜索旁边的重置
        reset() {
            this.birthtime = ""
            this.college = ""
            this.username = ""
            this.load()
        },
        handleSizeChange(pageSize) {
            console.log(pageSize)
            this.pageSize = pageSize
            this.load()
        },
        handleCurrentChange(pageNum) {
            console.log(pageNum)
            this.pageNum = pageNum
            this.load()
        },
        exp() {
            window.open("http://localhost:9090/user/export")
        }
    }
}
</script>

<style>
/* .headerBg {
    background-color: rgb(166, 194, 26) !important;
} */
</style>