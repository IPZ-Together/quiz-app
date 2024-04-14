import { Component, Input, OnInit } from '@angular/core';
import { KeyValuePipe, NgForOf, NgIf } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatSnackBar, MatSnackBarModule } from "@angular/material/snack-bar";
import { MatRadioButton, MatRadioGroup } from "@angular/material/radio";
import { MatProgressSpinner } from "@angular/material/progress-spinner";

import { Question } from "../../interfaces/question.interface";
import { QuizService } from "../../services/quiz.service";

@Component({
  selector: 'app-quiz',
  standalone: true,
  imports: [
    KeyValuePipe,
    NgForOf,
    MatCheckboxModule,
    MatButtonModule,
    MatCardModule,
    MatSnackBarModule,
    NgIf,
    FormsModule,
    MatRadioGroup,
    MatRadioButton,
    MatProgressSpinner
  ],
  templateUrl: './question.component.html',
  styleUrl: './question.component.css'
})
export class QuestionComponent implements OnInit {
  @Input()
  question: Question | null = null;
  errorMessage: string | null = null;

  constructor(private quizService: QuizService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.getQuestion();
  }

  public submitAnswer() {
    if (!this.question?.userAnswer) {
      this.openSnackBar('Select an answer!');
      return
    }

    const correct = this.question.correct_answer === this.question.userAnswer;
    console.log(this.question);
    console.log(correct);
    const message = correct ? 'Correct!' : 'Wrong answer, try again!';
    this.openSnackBar(message);
  }

  private getQuestion() {
    this.quizService.getOneQuestions().subscribe(
      (data) => {
        console.log(data)
        this.question = data;
        this.errorMessage = null;
      },
      (error) => {
        console.error('Failed to get question', error);
        this.openSnackBar('Failed to load quiz question. Please try again later.');
      }
    );
  }

  private openSnackBar(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 10000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });
  }
}
