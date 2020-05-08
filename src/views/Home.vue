<template>
  <div class="home">
    <el-input v-model="inputName" placeholder="请输入名稱"></el-input>
    <el-button type="primary" @click="readyToChat()">開始聊天</el-button>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: 'Home',
  data() {
    return {
      inputName: '',
    }
  },
  methods: {
    ...mapActions('common', ['setUserName']),
    ...mapActions('navbar', ['setActiveMenu']),
    readyToChat() {
      this.setUserName(this.inputName);
      this.setActiveMenu('2');
      this.$router.push('/message');
    },
  }
}
</script>

<style lang="scss">
  .home {
    .el-input {
      width: 200px;
    }
  }
</style>
