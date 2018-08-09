<template>
  <div class="login">
    <el-form ref="form" :rules="rules" status-icon :model="form" label-width="80px">
        <img src="../assets/1.jpeg" alt="">
      <el-form-item label="用户名" prop="username">
        <el-input v-model="form.username" placeholder="请输入用户名"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="form.password" placeholder="请输入密码"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="login">登录</el-button>
        <el-button @click="reset">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  data () {
    return {
      form: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'change' },
          { min: 3, max: 6, message: '长度在 3 到 6 个字符', trigger: 'change' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'change' },
          { min: 6, max: 12, message: '长度在 6 到 12 个字符', trigger: 'change' }
        ]
      }
    }
  },
  methods: {
    login () {
      this.$refs.form.validate((valid) => {
        if (valid) {
          // 检验成功发送ajax请求进行登录
          console.log(this.form)
          axios({
            method: 'post',
            url: 'http://localhost:8888/api/private/v1/login',
            data: this.form
          }).then(res => {
            if (res.data.meta.status === 200) {
              this.$message.success('恭喜你,登录成功')
              this.$router.push('home')
            } else {
              this.$message.error('用户名或密码错误!')
            }
          })
        } else {
          console.log('校验失败')
          return false
        }
      })
    },
    reset () {
      this.$refs.form.resetFields()
    }
  }
}
</script>
<style lang="less">
.login {
    width: 100%;
    height: 100%;
    background-color: #069;
    overflow: hidden;
    .el-form {
      width: 400px;
      background-color: #fff;
      margin: 200px auto;
      padding: 75px 40px 15px 40px;
      border-radius: 20px;
      position: relative;
      .el-button + .el-button {
          margin-left: 80px;
      }
      img {
          width: 100px;
          height: 100px;
          position: absolute;
          top: -60px;
          left: 50%;
          transform: translateX(-50%);
          border-radius: 50%;
          border:10px solid #fff;
      }
    }
}
</style>
