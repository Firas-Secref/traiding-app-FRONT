import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  chatEndpoint= "http://localhost:8085";

  constructor(private http: HttpClient) { }

  public sendMessageToBot(message: string):Observable<any>{
    return this.http.get<any>(`${this.chatEndpoint}/bot/chat?prompt=${message}`)
  }
}
