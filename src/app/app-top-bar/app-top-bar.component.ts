import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-top-bar',
  templateUrl: './app-top-bar.component.html',
  styleUrls: ['./app-top-bar.component.css']
})
export class AppTopBarComponent implements OnInit {
  home: string;
  quiz: string;
  contact: string;
  about: string


  constructor() { }

  ngOnInit(): void {
    this.home = "Home";
    this.quiz = "Quiz";
    this.contact = "Contact";
    this.about = "About";
  }

}
