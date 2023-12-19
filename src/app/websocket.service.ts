import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WebsocketService {
  private socket!: WebSocket;
  private messageSubject = new Subject<any>();

  constructor() {
    this.connectWebSocket();
  }

  private connectWebSocket(): void {
    this.socket = new WebSocket('ws://localhost:8085/ws');

    this.socket.addEventListener('open', (event) => {
      console.log('WebSocket connection established.');
    });

    this.socket.addEventListener('error', (event) => {
      console.error('WebSocket connection error:', event);
      // Implement retry logic here if needed
    });

    this.socket.addEventListener('close', (event) => {
      console.log('WebSocket connection closed:', event);
      // Implement retry logic here if needed
    });

    this.socket.addEventListener('message', (event) => {
      const data = JSON.parse(event.data);
      this.messageSubject.next(data);
    });
  }

  // Example method to send a message through the WebSocket
  sendMessage(message: string): void {
    if (this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(message);
    } else {
      console.error('WebSocket not open. Unable to send message.');
    }
  }

  // Example method to close the WebSocket connection
  closeWebSocket(): void {
    this.socket.close();
  }

  // Example method to subscribe to incoming messages
  subscribeToMessages(): Observable<any> {
    return this.messageSubject.asObservable();
  }
}
