import { Component } from '@angular/core';
import { BackendService } from './backend.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  questions: any[] = [
    'Kuala Lumpur is the capital of',
    'Which country does this flag belong to?  ',
  ];
  currCountry: any;
  currQuestion: any[] = [];
  countriesAsked: number[] = [];
  countries: any;
  constructor(private countryData: BackendService) {
    this.countryData.getCountries().subscribe((data) => {
      this.countries = data;
      // this.setRandomCountry();
      this.setRandomQuestion();
    });
  }
  getRandomIndex(arrLength: number) {
    return Math.floor(Math.random() * arrLength);
  }
  setRandomCountry() {
    let randomCountryIndex = this.getRandomIndex(this.countries.length);
    if (this.countriesAsked.indexOf(randomCountryIndex) === -1) {
      this.currCountry.push(this.countries[randomCountryIndex]);
    } else {
      this.setRandomCountry();
    }
  }
  setRandomQuestion() {
    // let randomQuestionIndex = this.getRandomIndex(this.questions.length);
    // this.currQuestion.push(this.questions[randomQuestionIndex]);
    console.log(this.countries);
    
    
  }

  ngOnInit() {}
}
