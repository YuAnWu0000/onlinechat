<template>
  <div class="chat-page">
    <div class="chat-room">
      <div ref="messageArea" class="message-area">
        <div v-for="(message, index) in messageStack" :key="index" :class="message.sender === userName ? 'your-message' : 'other-message'">
          <div class="message-sender">
            {{ message.sender }}
          </div>
          <div class="message-box">
            <div v-if="message.sender === userName" class="message-time">{{ message.time }}</div>
            <div class="message-content">
              {{ message.content }}
            </div>
            <div v-if="message.sender !== userName" class="message-time">{{ message.time }}</div>
          </div>
        </div>
      </div>
      <div class="input-area">
        <div class="icon-col" @click="sendMessage('image')">
          <i class="el-icon-picture-outline icon-img"></i>
        </div>
        <div class="input-col">
          <el-input v-model="message" placeholder="講點什麼吧..."></el-input>
        </div>
        <div class="btn-col">
          <el-button type="primary" icon="el-icon-s-promotion" @click="sendMessage('text')" class="send-btn" >送出</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment';
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
      get userName() {
        return localStorage.getItem('userName');
      },
      messageStack: [],
      message: '',
    }
  },
  methods: {
    sendMessage(type) {
      this.$socket.emit('sendMessage', {
        type,
        sender: this.userName,
        content: this.message,
        time: moment.valueOf(),
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
      obj.time = moment(obj.time).format('MM-DD HH:mm:ss');
      this.messageStack.push(obj);
      this.$nextTick(() => {
        this.$refs.messageArea.scrollTop = this.$refs.messageArea.scrollHeight;
      });
    });
  },
}
</script>

<style lang="scss">
  $message-font-size: 14px;
  $label-font-size: 10px;
  // extends
  %message-sender {
    font-size: $label-font-size;
    font-weight: 300;
    margin-bottom: 5px;
  }
  %message-box {
    display: flex;
    align-items: flex-end;
  }
  %message-content {
    width: fit-content;
    max-width: 70%;
    word-wrap: break-word;
    font-size: $message-font-size;
    border: 1px solid rgba(148, 78, 32, 0.2);
    border-radius: 15px;
    padding: 10px;
  }
  %message-time {
    font-size: $label-font-size;
    font-weight: 200;
  }
  .chat-page {
    display: flex;
    justify-content: center;
    .chat-room {
      width: 50%;
      border: 2px solid rgba(103, 148, 32, 0.3);
      border-radius: 5px;
      padding: 20px;
      .message-area {
        height: 537px;
        overflow-y: auto;
        margin-bottom: 30px;

        .other-message {
          clear: right;
          margin-bottom: 20px;
          .message-sender {
            @extend %message-sender;
            padding-left: 5px;
          }
          .message-box {
            @extend %message-box;
          }
          .message-content {
            @extend %message-content;
            margin-right: 3px;
          }
          .message-time {
            @extend %message-time;
          }
        }

        .your-message {
          float: right;
          clear: right;
          margin-bottom: 20px;
          .message-sender {
            @extend %message-sender;
            padding-right: 5px;
            text-align: right;
          }
          .message-box {
            @extend %message-box;
            justify-content: flex-end;
          }
          .message-content {
            @extend %message-content;
            background-color: rgba(148, 78, 32, 0.2);
          }
          .message-time {
            @extend %message-time;
            margin-right: 3px;
          }
        }
      }

      .input-area {
        display: flex;
        align-items: center;
        .icon-col {
          margin-right: 10px;
          .icon-img {
            font-size: 30px;
            &:hover {
              color: rgba(231, 42, 28, 0.904);
            }
          }
        }
        .input-col {
          width: 80%;
          margin-right: 10px;
        }
        .btn-col {
          text-align: right;
          .send-btn {
            width: 100px;
          }
        }
      }
    }
  }
  @media (max-width: 768px) {
    .chat-page {
      .chat-room {
        width: 80%;
      }
    }
  }
</style>

