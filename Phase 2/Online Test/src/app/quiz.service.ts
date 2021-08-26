import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Quiz } from './quiz';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class QuizService {
  constructor(public http: HttpClient) {}

  loadQuestions(): Observable<Quiz[]> {
    return this.http.get<Quiz[]>('/assets/quiz-questions.json');
  }
}
