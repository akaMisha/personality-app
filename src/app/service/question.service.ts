import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Question } from '../model/question';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class QuestionService {
  readonly baseUrl = 'http://localhost:3000/';
  readonly httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private httpClient: HttpClient) {}

  getQuestion(id: number): Observable<Question> {
    return this.httpClient.get<Question>(
      this.baseUrl + 'questions/' + id,
      this.httpOptions
    );
  }
  getOutcomes(): Observable<any> {
    return this.httpClient.get(this.baseUrl + 'outcomes', this.httpOptions);
  }
}
