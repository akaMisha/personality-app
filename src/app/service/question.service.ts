import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Question } from '../model/question';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  readonly baseUrl = "http://localhost:8080/get/";
  readonly httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
    }),
  };

  constructor(private httpClient: HttpClient) {}

  getQuestion(id: number) {
    return this.httpClient.get<Question>(this.baseUrl + id, this.httpOptions);
  }
}
