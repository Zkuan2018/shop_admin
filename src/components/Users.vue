<template>
  <div class="user">
    <template>
      <!-- 面包屑导航 -->
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>用户管理</el-breadcrumb-item>
        <el-breadcrumb-item>用户列表</el-breadcrumb-item>
      </el-breadcrumb>
      <!-- 搜索框 -->
      <div style="margin-top: 15px;">
        <el-input placeholder="请输入内容" v-model="query" class="input-with-select">
          <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
        </el-input>
        <el-button type="success" plain>添加用户</el-button>
      </div>
      <!-- 表格 -->
      <el-table
        stripe
        border
        :data="userList"
        style="width: 100%">
        <el-table-column
          prop="username"
          label="姓名"
          width="200">
        </el-table-column>
        <el-table-column
          prop="email"
          label="邮箱"
          width="200">
        </el-table-column>
        <el-table-column
          prop="mobile"
          label="电话"
          width="200">
        </el-table-column>
        <el-table-column
          prop="mg_state"
          label="用户状态"
          width="200">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.mg_state"
              active-color="#13ce66"
              inactive-color="#ff4949">
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column
          prop="address"
          label="操作">
          <template slot-scope="scope">
             <el-button type="primary" plain icon="el-icon-edit" circle></el-button>
             <el-button type="danger" plain icon="el-icon-delete" circle></el-button>
             <el-button type="success" plain icon="el-icon-check">分配角色</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination
        background
        layout="total, sizes, prev, pager, next, jumper"
        @current-change="handleCurrentChange"
        @size-change="handleSizeChange"
        :total="total"
        :page-sizes="[2, 4, 6]"
        :page-size="2"
        :current-page="current"
        >
      </el-pagination>
    </template>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      query: '',
      current: 1,
      pagesize: 2,
      total: 0,
      userList: []
    }
  },
  methods: {
    searchList () {
      axios({
        method: 'get',
        url: 'http://localhost:8888/api/private/v1/users',
        params: {
          query: this.query,
          pagenum: this.current,
          pagesize: this.pagesize
        },
        // 需要设置授权authorization,否则token无效
        headers: {
          Authorization: localStorage.getItem('myToken')
        }
      }).then(res => {
        // console.log(res.data)
        let meta = res.data.meta
        let data = res.data.data
        if (meta.status === 200) {
          // 获取数据成功
          this.userList = data.users
          this.total = data.total
        }
      })
    },
    handleCurrentChange (val) {
      this.current = val
      this.searchList()
    },
    handleSizeChange (val) {
      this.pagesize = val
      this.current = 1
      this.searchList()
    },
    search () {
      this.searchList()
    }
  },
  created () {
    this.searchList()
  }
}
</script>

<style lang="less">
.el-table {
  font-size: 18px;
  margin-bottom: 15px;
  text-align: center;
  th {
    text-align: center;
  }
}
.el-breadcrumb {
  padding: 10px;
  font-size: 18px;
}
.input-with-select {
  width: 300px;
  margin-bottom: 15px;
}
</style>
