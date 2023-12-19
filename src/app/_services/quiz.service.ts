import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Quiz} from "../models/Quiz";

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  quizEndpoint= "http://localhost:8085";

  constructor(private http: HttpClient) { }

  public saveQuiz(quiz: Quiz, courseId: number):Observable<Quiz>{
    return this.http.post<Quiz>(`${this.quizEndpoint}/quiz/new/${courseId}`, quiz)
  }
}
