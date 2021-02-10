import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import {Player} from '../model/player';

export class WebSocketAPI {
  webSocketEndPoint: string = 'http://localhost:8443/ws';

  topic: string;
  stompClient: any;
  component: any;
  player: Player;

  constructor(component: any, player: Player) {
    this.component = component;
    this.player = player;
  }

  _connect() {
    this.topic = "/topic/game/" + this.player.id;
    let ws = new SockJS(this.webSocketEndPoint);
    this.stompClient = Stomp.over(ws);

    const _this = this;
    _this.stompClient.connect({}, function (frame) {
      _this.stompClient.subscribe(_this.topic, function (sdkEvent) {
        _this.onMessageReceived(sdkEvent);
      });
      _this.stompClient.reconnect_delay = 2000;
    }, this.errorCallBack);
  }

  _disconnect() {
    if (this.stompClient !== null) {
      this.stompClient.disconnect();
    }
  }

  // on error, schedule a reconnection attempt
  errorCallBack(error) {
    console.log("errorCallBack -> " + error)
    setTimeout(() => {
      this._connect();
    }, 5000);
  }

  sendLikePlayer(message) {
    this.stompClient.send("/app/like-player", {}, JSON.stringify(message));
  }

  sendPlayerExited(message) {
    this.stompClient.send("/app/game-room/close", {}, JSON.stringify(message));
  }

  onMessageReceived(message) {
    this.component.handleMessage(JSON.parse(message.body));
  }

  sendGoGame(message) {
    this.stompClient.send("/app/go-game", {}, JSON.stringify(message));
  }

  sendDeletePlayer(message) {
    this.stompClient.send("/app/delete-player", {}, JSON.stringify(message));
  }
}
