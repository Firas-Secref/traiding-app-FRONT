import {Component, OnInit, ViewChild} from '@angular/core';
import {Course} from "../../models/Course";
import {CourseService} from "../../_services/course.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Quiz} from "../../models/Quiz";
import {RubricQuestion} from "../../models/RubricQuestion";

@Component({
  selector: 'app-tutorial',
  templateUrl: './tutorial.component.html',
  styleUrls: ['./tutorial.component.css'],
})
export class TutorialComponent implements OnInit {

  availableCourses: Course[] = [];
  answerForm!: FormGroup;
  public selectedQuiz!: Quiz;
  public quizAnswers: any[]=[];
  public score: number = 0;
  public finalScore!: number;
  public submitted = false
  constructor(private courseService: CourseService, private fb: FormBuilder) { }

  ngOnInit(): void {
    // this.initAnswerForm();
    this.getAllCourses();
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

  viewQuiz(quiz: Quiz) {
    this.submitted = false;
    this.finalScore = 0;
    const updatedQuizRubricOption = quiz.rubricQuestions.map((rq:RubricQuestion)=>{
      return {
        ...rq,
        valueAnswer1: false,
        valueAnswer2: false,
        valueAnswer3: false,
        valueAnswer4: false,
      }
    })
    this.selectedQuiz = {...quiz, rubricQuestions:updatedQuizRubricOption}
    this.initAnswerForm()
  }

  initAnswerForm(){
    this.answerForm = this.fb.group({
      quizAnswers: this.fb.array([
        this.addAnswerGroup()
      ]),
    })
  }



  private addAnswerGroup() {
    let quizAnswer:any[]=[]
    for (const rq in this.selectedQuiz.rubricQuestions) {
      quizAnswer.push(this.fb.group({
        answer1:['', [Validators.required]],
        answer2:['', [Validators.required]],
        answer3:['', [Validators.required]],
        answer4:['', [Validators.required]],
      }))
    }
    return quizAnswer;
  }

    selectAnswer(answer: any, rq: RubricQuestion) {
    this.score = 0
    this.quizAnswers.push({id: rq.id, answer: answer, correctAnswer: rq.correctAnswer})
  }

  submitQuiz(){

    const filteredArr = this.quizAnswers.reverse().reduce((acc, current) => {
      const x = acc.find((item:any) => item.id === current.id);
      if (!x) {
        return acc.concat([current]);
      } else {
        return acc;
      }
    }, []);
    filteredArr.forEach((an: any)=>{
      if (an.answer === an.correctAnswer) this.score +=1;
    })

    this.finalScore = 100*this.score / this.selectedQuiz.rubricQuestions.length
    this.submitted = true
  }
}
