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
            <div v-if="message.type === 'text'" class="message-content">
              {{ message.content }}
            </div>
            <div v-if="message.type === 'image'">
              <img :src="message.content" class="message-image">
            </div>
            <div v-if="message.sender !== userName" class="message-time">{{ message.time }}</div>
          </div>
        </div>
      </div>
        <div :class="inputClass">
        <div class="input-area">
          <div class="icon-col" @click="toggleImage()">
            <i class="el-icon-picture-outline icon-img"></i>
          </div>
          <div class="input-col">
            <el-input v-model="message" placeholder="講點什麼吧..."></el-input>
          </div>
          <div class="btn-col">
            <el-button type="primary" icon="el-icon-s-promotion" @click="sendMessage('text')" class="send-btn" >送出</el-button>
          </div>
        </div>
        <div v-show="imageVisible" class="image-area">
          <el-row class="image-row">
            <el-col :span="8" class="image-col">
              <img src="@/assets/images/genji.png" class="image" @click="sendMessage('image', 'genji')">
            </el-col>
            <el-col :span="8" class="image-col">
              <img src="@/assets/images/dva.png" class="image" @click="sendMessage('image', 'dva')">
            </el-col>
            <el-col :span="8" class="image-col">
              <img src="@/assets/images/reaper.png" class="image" @click="sendMessage('image', 'reaper')">
            </el-col>
          </el-row>
          <el-row class="image-row">
            <el-col :span="8" class="image-col">
              <img src="@/assets/images/hanzo.png" class="image" @click="sendMessage('image', 'hanzo')">
            </el-col>
            <el-col :span="8" class="image-col">
              <img src="@/assets/images/mccree.png" class="image" @click="sendMessage('image', 'mccree')">
            </el-col>
            <el-col :span="8" class="image-col">
              <img src="@/assets/images/soldier76.png" class="image" @click="sendMessage('image', 'soldier76')">
            </el-col>
          </el-row>
        </div>
        </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import moment from 'moment';
import { getAllMessages } from '@/api/message';
export default {
  name: 'Home',
  data() {
    return {
      messageStack: [],
      message: '',
      inputClass: null,
      imageVisible: false,
    }
  },
  computed: {
    ...mapGetters('common', ['userName']),
  },
  methods: {
    sendMessage(type, imgName) {
      let content;
      if (type === 'text') {
        content = this.message;
        this.message = '';
      } else if (type === 'image') {
        content = imgName;
        this.imageVisible = false;
        this.inputClass = 'input-go-down';
      } else {
        content = null;
      }
      this.$socket.emit('sendMessage', {
        type,
        content,
        sender: this.userName,
        time: moment().valueOf(),
      });
    },
    toggleImage() {
      if (this.imageVisible) {
        this.inputClass = 'input-go-down';
      } else {
        this.inputClass = 'input-go-up';
      }
      this.imageVisible = !this.imageVisible;
    }
  },
  async mounted() {
    this.$socket.emit('login',{
      username: this.userName,
    });
    try {
      this.sockets.listener.subscribe('getMessage', (obj) => {
        if (obj.type === 'image') {
          obj.content = require(`@/assets/images/${obj.content}.png`);
        }
        obj.time = moment(obj.time).format('MM-DD HH:mm:ss');
        this.messageStack.push(obj);
        this.$nextTick().then(() => {
          this.$refs.messageArea.scrollTop = this.$refs.messageArea.scrollHeight;
        });
      });
    } catch (err) {
      console.log(err);
    }
    const result = await getAllMessages();
    result.forEach(message => {
      if (message.type === 'image') {
        message.content = require(`@/assets/images/${message.content}.png`);
      }
      message.time = moment(message.time).format('MM-DD HH:mm:ss');
      this.messageStack.push(message);
    });
    this.$nextTick().then(() => {
      this.$refs.messageArea.scrollTop = this.$refs.messageArea.scrollHeight;
    });
  },
}
</script>

<style lang="scss">
  .input-go-up {
    margin-top: 10px;
    animation: up 0.7s;
    animation-fill-mode: forwards;
    background-color: white;
  }

  .input-go-down {
    animation: down 0.7s;
  }

  @keyframes up {
    from {
      transform: translateY(0);
    }
    to {
      transform: translateY(-100px);
    }
  }

  @keyframes down {
    from {
      transform: translateY(-100px);
    }
    to {
      transform: translateY(0);
    }
  }
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
  %message-image {
    height: 150px;
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
          .message-image {
            @extend %message-image;
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
          .message-image {
            @extend %message-image;
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

      .image-area {
        margin-top: 10px;
        .image-row {
          display: flex;
          justify-content: space-between;
          .image-col {
            text-align: center;
            .image {
              // width: 90%;
              height: 100px;
              position: relative;
              z-index: 1;
              &:hover {
                height: 140px;
                z-index: 2;
              }
            }
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

