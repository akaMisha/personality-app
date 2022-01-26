import { Component, Input, OnInit } from '@angular/core';
import { Question } from '../model/question';
import { QuestionService } from '../service/question.service';

@Component({
  selector: 'app-personality-test',
  templateUrl: './personality-test.component.html',
  styleUrls: ['./personality-test.component.scss']
})
export class PersonalityTestComponent implements OnInit {
  currentQuestion: Question;
  questionNmb: number;
  totalScore: number;
  currentAnswerScore: number;
  finalResult: {
    value: boolean,
    description: string,
  };

  constructor(private questionService: QuestionService) { }

  ngOnInit(): void {
    this.totalScore = 0;
    this.finalResult = {
      description: null,
      value: false,
    }
    this.questionNmb = 1;
    this.getCurrentQuestion();
  }

  getCurrentQuestion(){
    this.questionService.getQuestion(this.questionNmb).subscribe((data) => this.currentQuestion = data as Question);
  }

  nextQuestion(){
    this.questionNmb++;
    this.totalScore += this.currentAnswerScore;
    console.log(this.questionNmb);
    if(this.questionNmb <= 5){
      this.getCurrentQuestion();
    }
    if(this.questionNmb > 5) {
      this.finalResult.description = this.calculateFinalResult(this.totalScore);
    }
  }

  updateCurrentAnswerScore(event){
    this.currentAnswerScore = event;
  }

  calculateFinalResult(totalScore){
    this.finalResult.value = true;
    if(totalScore !== 10){
      return (totalScore < 10) ? 'Introvert' : 'Extrovert';
    } else return 'somewhere between Introvert and Extrovert';
  }
}
