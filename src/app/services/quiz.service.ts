import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { map, Observable } from "rxjs";

import { Question } from "../interfaces/question.interface";

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  private BASE_URL = 'https://quizapi.io/api/v1/questions';
  private API_TOKEN = 'RgvG517gMUfe7seMQhxHBH2Xqk6D6SCQBn2q5d5B'; // QuizAPI key

  constructor(private http: HttpClient) { }

  getQuestions(limit: number) {
    const params = {
      apiKey: this.API_TOKEN,
      limit,
    };
    return this.http.get<Question[]>(this.BASE_URL, { params });
  }

  getOneQuestions(): Observable<Question> {
    return this.getQuestions(1).pipe(
      map(questions => questions[0])
    );
  }
}
