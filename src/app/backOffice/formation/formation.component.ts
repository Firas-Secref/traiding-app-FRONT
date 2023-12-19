import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CourseService} from "../../_services/course.service";
import {Course} from "../../models/Course";
import {QuizService} from "../../_services/quiz.service";

@Component({
  selector: 'app-formation',
  templateUrl: './formation.component.html',
  styleUrls: ['./formation.component.css']
})
export class FormationComponent implements OnInit {

  courseForm!: FormGroup;
  quizForm!: FormGroup;
  public courseFile!: File;
  public availableCourses: Course[] = [];
  private courseId!: number;
  public selectedQuiz: any;
  courseFormSubmitted = false;
  quizFormSubmitted = false;
  constructor(private fb: FormBuilder, private courseService: CourseService, private quizService: QuizService) { }

  ngOnInit(): void {
    this.initQuizForm();
    this.initCourseForm();
    this.getAllCourses();
  }

  get allRubricQuestions() {
    return this.quizForm.get('rubricQuestions') as FormArray;
  }

  initCourseForm(){
    this.courseForm = this.fb.group({
      courseName: ['', [Validators.required]],
      description: ['', [Validators.required]],
      price: [0, [Validators.required]],
      level: ['', [Validators.required]],
    })
  }

  submitCourse(){
    if (!this.courseForm.valid){

      this.courseFormSubmitted = true
      return;
    }
    let courseFormData = new FormData();
    courseFormData.append("file", this.courseFile)
    courseFormData.append("courseDetails", JSON.stringify(this.courseForm.value))
    this.courseService.addNewCourse(courseFormData).subscribe(()=>{
      document.getElementById("dismissAddModal")?.click();
      this.courseForm.reset();
      this.courseFile = {} as File
      this.getAllCourses();
    })
  }

  onFileChanged(event: any) {
    this.courseFile = event.target.files[0];
    var reader = new FileReader();
    reader.readAsDataURL(this.courseFile);
    reader.onload = ()=>{
      // this.loaded1 = reader.result;
    }

  }

  getAllCourses(){
    this.courseService.getAllCourses().subscribe((courses: Course[])=>{
      this.availableCourses = courses.reverse()
    })
  }


  viewFile(base64: string) {
    const byteArray = new Uint8Array(
      atob(base64)
        .split("")
        .map(char => char.charCodeAt(0))
    );
    const file = new Blob([byteArray], { type: "application/pdf" });
    const fileURL = URL.createObjectURL(file);
    window.open(fileURL);
  }

  initQuizForm(){
    this.quizForm = this.fb.group({
      rubricQuestions: this.fb.array([
        this.addRubricQuestionGroup()
      ])
    })
  }

  addRubricQuestionGroup(){
    return this.fb.group({
        question: this.fb.control('', [Validators.required]),
        answer1: this.fb.control('', [Validators.required]),
        answer2: this.fb.control('', [Validators.required]),
        answer3: this.fb.control('', [Validators.required]),
        answer4: this.fb.control('', [Validators.required]),
        correctAnswer: this.fb.control('', [Validators.required]),
      })
  }

  addRubricQuestion(){
    this.allRubricQuestions.push(
      this.fb.group({
        question: this.fb.control('', [Validators.required]),
        answer1: this.fb.control('', [Validators.required]),
        answer2: this.fb.control('', [Validators.required]),
        answer3: this.fb.control('', [Validators.required]),
        answer4: this.fb.control('', [Validators.required]),
        correctAnswer: this.fb.control('', [Validators.required]),
      })
    )
  }

  submitQuiz(){
    if (!this.quizForm.valid){
      this.quizFormSubmitted = true
      return
    }

    this.quizService.saveQuiz(this.quizForm.value, this.courseId).subscribe(()=>document.getElementById("closeQuizModal")?.click())
  }

  selectCourse(id: number) {
    this.quizFormSubmitted = false
    this.courseId = id;
  }

  viewQuiz(course: Course) {
    this.selectedQuiz = course.quiz2
  }

  deleteCourse(id: number) {
    if (confirm('Êtes-vous certain(e) que vous souhaitez retirer ce cours de la liste ?')){
      this.courseService.deleteCourse(id).subscribe(()=>{
        console.info('course successfully deleted');
        this.getAllCourses();
      })
    }
  }
}
