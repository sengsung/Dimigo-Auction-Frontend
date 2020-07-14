import Vue from 'vue';
import socketIo from 'socket.io-client';

Vue.prototype.$socket = socketIo('http://localhost');

declare module 'vue/types/vue' {
  interface Vue {
    $socket: SocketIOClient.Socket;
  }
}
