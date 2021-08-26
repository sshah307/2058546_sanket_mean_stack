import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { QuizService } from '../quiz.service';
import { Quiz } from '../quiz';

@Component({
  selector: 'quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css'],
})
export class QuizComponent implements OnInit {
  myForm: FormGroup;
  allQuestions: Array<Quiz> = [];
  answers: Map<string, string> = new Map();
  constructor(public quizSer: QuizService, public form: FormBuilder) {
    this.myForm = form.group({});
  }
  score: number = 0;
  msg: string = '';
  testLength: number = 10;
  displayScore = false;
  index: number = 1;
  opt: string = '';
  click: boolean = false;

  ngOnInit(): void {
    this.quizSer.loadQuestions().subscribe((res) => {
      for (let q of res) {
        this.myForm?.addControl(
          q.question,
          this.form.control('', Validators.required)
        );
        this.allQuestions.push(q);
        this.answers.set(q.question, q.correct_answer);
      }
    });
  }
  submit() {
    console.log('submit');
    let questionRef = this.myForm.value;
    Object.keys(this.myForm.value).forEach((key) => {
      let curElem: any = document.getElementById(questionRef[key]);
      if (questionRef[key] == this.answers.get(key)) {
        this.score += 1;
        curElem.style.color = 'green';
        curElem.style.backgroundColor = 'lightgreen';
        curElem.innerHTML = `${questionRef[key]} CORRECT!`;
      } else {
        let answer = this.answers.get(key);
        if (answer != undefined) {
          let correctElem: any = document.getElementById(answer);
          curElem.innerHTML = `${questionRef[key]} INCORRECT!`;
          curElem.style.color = 'red';
          curElem.style.backgroundColor = '#e69898';
          correctElem.style.color = 'green';
          correctElem.style.backgroundColor = 'lightgreen';
        }
      }
    });
    this.displayScore = true;
    this.click = true;
  }
}
