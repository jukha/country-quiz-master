import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BackendService } from './backend.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, AfterViewInit {
  selectBtn!: ElementRef<HTMLElement>;
  @ViewChild('optionButton', {
    read: ElementRef,
    static: false,
  })
  set opBtn(elRef: ElementRef<HTMLElement>) {
    if (elRef) {
      this.selectBtn = elRef;
    }
  }

  ngAfterViewInit() {}

  questions: any[] = [
    ' is the capital of',
    'Which country does this flag belong to?  ',
  ];
  endQuiz: boolean = false;
  score: number = 0;
  currCountry: any = [];
  currQuestion: any[] = [];
  correctOption: any;
  userOption: number = -1;
  countriesAsked: any[] = []; //used to keep track of countries that have been already asked
  countries: any;
  isFlagQuestion: boolean = false;
  isCaptialQuestion: boolean = false;
  fourRandomCountries: any[] = [];
  constructor(
    private countryData: BackendService,
    private spinner: NgxSpinnerService,
    private elem: ElementRef
  ) {
    this.countryData.getCountries().subscribe((data) => {
      this.spinner.hide();
      this.countries = data;
      this.startTheQuiz();
    });
  }
  startTheQuiz() {
    this.endQuiz = false;
    this.userOption = -1;
    this.setRandomQuestion();
    this.fourRandomCountries = [];
    this.setFourRandomCountries(this.countries);
  }

  getRandomIndex(arrLength: number) {
    return Math.floor(Math.random() * arrLength);
  }
  // 01
  setRandomQuestion() {
    let randomQuestionIndex = this.getRandomIndex(this.questions.length);
    this.currQuestion = this.questions[randomQuestionIndex];
    if (this.currQuestion.includes('capital')) {
      this.isCaptialQuestion = true;
      this.isFlagQuestion = false;
    } else {
      this.isFlagQuestion = true;
      this.isCaptialQuestion = false;
    }
  }
  // 02
  setFourRandomCountries(arr: any[]) {
    for (let i = 0; i < 4; i++) {
      this.fourRandomCountries.push(arr[this.getRandomIndex(arr.length)]);
    }
    this.correctOption = this.getRandomIndex(this.fourRandomCountries.length);
    this.currCountry = this.fourRandomCountries[this.correctOption];
  }
  selectedOption(no: number) {
    this.elem.nativeElement.querySelector('.please-select').style.display =
      'none';
    this.userOption = no;
  }
  tryAgain() {
    this.score = 0;
    this.startTheQuiz();
  }
  toggleButtonColor(selected?: number, btn?: any) {
    btn.classList.add('selected');

    document.querySelectorAll('.option').forEach((e, i) => {
      if (i != selected) {
        e.classList.remove('selected');
      }
    });
  }
  resetOptions() {
    this.elem.nativeElement
      .querySelectorAll('.option')
      .forEach((e: any, i: any) => {
        if (e.classList.contains('is-right')) {
          e.classList.remove('is-right');
        }
      });
  }
  checkAnswer(msg: any) {
    if (this.userOption != -1) {
      msg.style.display = 'none';
      if (this.userOption == this.correctOption) {
        this.score++;
        document.querySelectorAll('.option').forEach((e, i) => {
          if (e.classList.contains('selected')) {
            e.classList.remove('selected');
            e.classList.add('is-right');
          }
        });
        setTimeout(() => {
          this.resetOptions();
          this.startTheQuiz();
        }, 500);
      } else {
        document.querySelectorAll('.option').forEach((e, i) => {
          if (this.userOption == i) {
            if (e.classList.contains('selected')) {
              e.classList.remove('selected');
              e.classList.add('is-wrong');
            }
          }
          if (i == this.correctOption) {
            e.classList.remove('selected');
            e.classList.add('is-right');
          }
        });
        setTimeout(() => {
          this.resetOptions();
          this.endQuiz = true;
        }, 700);
      }
    } else {
      msg.style.display = 'block';
    }
  }

  ngOnInit() {
    this.spinner.show();
  }
}
