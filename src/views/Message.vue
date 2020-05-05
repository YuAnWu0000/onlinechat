<template>
  <div class="message">
    <h1>開始聊天吧</h1>
    <div v-for="(message, index) in messageStack" :key="index">
      {{message.sender}}：{{message.content}}
    </div>
    <el-input v-model="message" placeholder="講點什麼吧..."></el-input>
    <el-button type="primary" @click="sendMessage()">送出訊息</el-button>
  </div>
</template>

<script>
export default {
  name: 'Home',
  // sockets: {
  //   //查看socket是否渲染成功
  //   connect() {
  //     console.log("链接成功");
  //   },
  //   getMessage(data) {
  //     console.log(data);
  //   }
  // },
  data() {
    return {
      userName: localStorage.getItem('userName'),
      messageStack: [],
      message: '',
    }
  },
  methods: {
    sendMessage() {
      this.$socket.emit('sendMessage', {
        sender: this.userName,
        content: this.message,
        time: Date.now(),
      });
    },
  },
  mounted() {
    console.log(this);
    this.$socket.emit('login',{
      username: this.userName,
      password: 'password'
    });
    this.sockets.listener.subscribe('getMessage', (obj) => {
      console.log(obj);
      this.messageStack.push(obj);
    });
  }
}
</script>

<style lang="scss">
  .message {
    .el-input {
      width: 500px;
    }
  }
</style>

