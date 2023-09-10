import { Component, Input, OnInit } from '@angular/core';
import { Question } from '../model/question';
import { QuestionService } from '../service/question.service';
import { Observable } from 'rxjs';
import { find, map } from 'rxjs/operators';

@Component({
  selector: 'app-personality-test',
  templateUrl: './personality-test.component.html',
  styleUrls: ['./personality-test.component.scss'],
})
export class PersonalityTestComponent implements OnInit {
  currentQuestion$: Observable<Question>;
  outcomesList$: Observable<any>;
  outcome$: Observable<any> = undefined;
  questionNmb: number = 1;
  totalScore: number;
  currentAnswerScore: number;
  finalResult: {
    description: string;
  };

  constructor(private questionService: QuestionService) {
    this.totalScore = 0;
    this.outcomesList$ = this.questionService.getOutcomes();
    this.getCurrentQuestion();
  }

  ngOnInit(): void {
    this.finalResult = {
      description: undefined,
    };
  }

  getCurrentQuestion() {
    this.currentQuestion$ = this.questionService.getQuestion(this.questionNmb);
  }

  nextQuestion() {
    if (this.currentAnswerScore) {
      this.questionNmb++;
      this.totalScore += this.currentAnswerScore;
      console.log(this.questionNmb);
      if (this.questionNmb <= 5) {
        this.getCurrentQuestion();
      }
      if (this.questionNmb > 5) {
        this.calculateFinalResult(this.totalScore);
      }
    }
  }

  updateCurrentAnswerScore(event) {
    this.currentAnswerScore = event;
  }

  calculateFinalResult(totalScore) {
    // if (totalScore !== 10) {
    //   return totalScore < 10 ? 'Introvert' : 'Extrovert';
    // } else return 'somewhere between Introvert and Extrovert';
    if (totalScore >= 5 && totalScore < 9) {
      this.outcome$ = this.outcomesList$.pipe(
        map((outcomeList) => outcomeList.find((outcome) => outcome?.id === 1))
      );
    } else if (totalScore >= 9 && totalScore < 13) {
      this.outcome$ = this.outcomesList$.pipe(
        map((outcomeList) => outcomeList.find((outcome) => outcome?.id === 2))
      );
    } else if (totalScore >= 13 && totalScore < 17) {
      this.outcome$ = this.outcomesList$.pipe(
        map((outcomeList) => outcomeList.find((outcome) => outcome?.id === 3))
      );
    } else if (totalScore >= 17 && totalScore <= 20) {
      this.outcome$ = this.outcomesList$.pipe(
        map((outcomeList) => outcomeList.find((outcome) => outcome?.id === 4))
      );
    }
  }
}
