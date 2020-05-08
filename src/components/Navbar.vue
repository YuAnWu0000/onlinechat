<template>
  <div>
    <!-- navbar -->
    <el-menu
      :default-active="activeMenu"
      mode="horizontal"
      background-color="#175178"
      text-color="#fff"
      active-text-color="#AFC619"
      class="nav">
      <el-menu-item index="1" @click="$router.push('/')">首頁</el-menu-item>
      <el-menu-item v-if="userName" index="2" @click="$router.push('/message')">線上聊天</el-menu-item>
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
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      dialogVisible: false,
    }
  },
  computed: {
    ...mapGetters('common', ['userName']),
    ...mapGetters('navbar', ['activeMenu']),
  },
  methods: {
    ...mapActions('common', ['clearUserName']),
    ...mapActions('navbar', ['setActiveMenu']),
    popOut() {
      this.dialogVisible = true;
      this.setActiveMenu('99');
    },
    logOut() {
      this.clearUserName();
      this.$router.push('/');
      this.dialogVisible = false;
      this.setActiveMenu('1');
    }
  },
  mounted() {
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
