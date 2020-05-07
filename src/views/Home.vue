<template>
  <div class="home">
    <el-input v-model="userName" placeholder="请输入名稱"></el-input>
    <el-button type="primary" @click="readyToChat()">開始聊天</el-button>
  </div>
</template>

<script>
/*eslint-disable*/
export default {
  name: 'Home',
  data() {
    return {
      get userName() {
        return localStorage.getItem('userName');
      },
      set userName(value) {
        localStorage.setItem('userName', value);
      },
    }
  },
  methods: {
    readyToChat() {
      // this.userName = this.userName;
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
