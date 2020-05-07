<template>
  <div>
    <!-- navbar -->
    <el-menu
      default-active="1"
      mode="horizontal"
      background-color="#175178"
      text-color="#fff"
      active-text-color="#AFC619"
      class="nav">
      <el-menu-item index="1" @click="$router.push('/')">首頁</el-menu-item>
      <el-menu-item index="2" @click="$router.push('/message')">線上聊天</el-menu-item>
      <el-menu-item v-if="userName" index="99" @click="popOut()" style="float: right;"><i class="el-icon-switch-button logout-icon"></i>{{userName}}</el-menu-item>
    </el-menu>
    <!-- logout dialog -->
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose">
      <span>这是一段信息</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="logOut()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
/*eslint-disable*/
export default {
  data() {
    return {
      get userName() {
        return localStorage.getItem('userName');
      },
      set userName(value) {
        localStorage.setItem('userName', value);
      },
      dialogVisible: false,
    }
  },
  methods: {
    storageHandler() {
      console.log('storage change!!');
      this.userName = localStorage.getItem('userName');
    },
    popOut() {
      this.dialogVisible = true;
    },
    logOut() {
      localStorage.clear();
      this.$router.push('/');
      // localStorage.removeItem("userName");
      this.dialogVisible = false;
    }
  },
  mounted() {
    window.addEventListener('storage', this.storageHandler);
  }
};
</script>

<style lang="scss" scoped>
  .nav {
    font-size: 70px;
    margin-bottom: 10px;

    .logout-icon {
      color: white;
    }
  }
</style>
