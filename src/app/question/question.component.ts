import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Question } from '../model/question';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {
  @Output() answerScore = new EventEmitter<string>();
  @Input() question: Question;
  
  constructor() { }

  ngOnInit(): void {
    this.question = {
      id: 1,
      description: 'You’re really busy at work and a colleague is telling you their life story and personal woes. You:',
      answers: [
        { description: 'Don’t dare to interrupt them', value: 1 },
        { description: 'Think it’s more important to give them some of your time; work can wait', value: 2 },
        { description: 'Listen, but with only with half an ear', value: 3 },
        { description: 'Interrupt and explain that you are really busy at the moment', value: 4 }]
    }
  }

  radioChange(event) {
    this.answerScore.emit(event.value);
    console.log(event.value);
  }

}
