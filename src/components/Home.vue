<template>
    <div class="home">
        <el-container>
          <el-header>
            <div class="logo"></div>
            <div class="logout">
                欢迎光临
                <a href="javascript:;" @click="logout">退出</a>
            </div>
            <div class="title">
              <h3>电商后台管理系统</h3>
            </div>
          </el-header>
          <el-container>
            <el-aside width="200px">
              <el-menu
                unique-opened
                router
                default-active=""
                class="el-menu-vertical-demo"
                @open="handleOpen"
                @close="handleClose"
                background-color="#545c64"
                text-color="#fff"
                active-text-color="#ffd04b">
                <el-submenu index="1">
                  <template slot="title">
                    <i class="el-icon-location"></i>
                    <span>用户管理</span>
                  </template>
                  <el-menu-item index="users">
                    <i class="el-icon-menu"></i>
                    <span slot="title">用户列表</span>
                  </el-menu-item>
                </el-submenu>
                <el-submenu index="2">
                  <template slot="title">
                    <i class="el-icon-location"></i>
                    <span>权限管理</span>
                  </template>
                  <el-menu-item index="2-1">
                    <i class="el-icon-menu"></i>
                    <span slot="title">角色列表</span>
                  </el-menu-item>
                  <el-menu-item index="2-2">
                    <i class="el-icon-menu"></i>
                    <span slot="title">权限列表</span>
                  </el-menu-item>
                </el-submenu>
              </el-menu>
            </el-aside>
            <el-main>
                <router-view/>
            </el-main>
          </el-container>
        </el-container>
    </div>
</template>
<script>
export default {
  data () {
    return {

    }
  },
  methods: {
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    },
    logout () {
      this.$confirm('你确定要退出此系统吗?', '温馨提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        localStorage.removeItem('myToken')
        this.$router.push('login')
        this.$message({
          type: 'success',
          message: '退出成功',
          center: true
        })
      }).catch(() => {
        this.$message({
          type: 'error',
          message: '已取消退出',
          center: true
        })
      })
    }
  }
}
</script>
<style lang="less">
.home {
   height:100%;
   >.el-container {
   height:100%;
   }
 }
.el-header {
  background-color: #069;
   .logo {
       float: left;
       width: 180px;
       height: 60px;
       background: url(../assets/logo.png) no-repeat center center;
       background-size: contain;
    }
   .logout {
       float:right;
       width: 180px;
       height: 60px;
       line-height: 60px;
       font-weight: 700;
       font-size: 20px;
       a {
           color:coral;
       }
   }
   .title {
       text-align: center;
       color:#fff;
       line-height: 60px;
       font-size: 20px;
   }
  }
.el-aside {
  background-color: #545c64;
  .el-submenu {
      width: 200px;
      span {
        font-size: 18px;
      }
    }
  }
.el-main {
  background-color: #f7f7f7;
  }
</style>
