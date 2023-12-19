import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Course} from "../models/Course";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  courseEndpoint= "http://localhost:8085";
  constructor(private http: HttpClient) { }

  public addNewCourse(course: FormData): Observable<Course>{
    return this.http.post<Course>(`${this.courseEndpoint}/courses/new`, course);
  }

  public getAllCourses():Observable<Course[]>{
    return this.http.get<Course[]>(`${this.courseEndpoint}/courses/all`);
  }
  public deleteCourse(idCourse: number):Observable<void>{
    return this.http.delete<void>(`${this.courseEndpoint}/coursed/delete/${idCourse}`);
  }
}
