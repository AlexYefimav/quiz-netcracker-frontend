import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppTopBarComponent } from './app-top-bar/app-top-bar.component';
import { AppRoutingModule } from './app-routing.module';
import { QuestionComponent } from './question/question.component';
import { AnswerComponent } from './answer/answer.component';
import { EditQuestionComponent } from './edit-question/edit-question.component';
import {UserComponent} from "./user/user.component";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatCardModule } from '@angular/material/card';
import { MatRadioModule } from '@angular/material/radio';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatInputModule } from '@angular/material/input';
import { AnswerDetailComponent } from './answer-detail/answer-detail.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { AddAnswerComponent } from './add-answer/add-answer.component';
import {GameComponent} from "./game/game.component";
import {AddGameComponent} from "./add-game/add-game.component";

@NgModule({
  declarations: [
    AppComponent,
    AppTopBarComponent,
    QuestionComponent,
    UserComponent,
    AnswerComponent,
    EditQuestionComponent,
    AnswerDetailComponent,
    AddAnswerComponent,
    GameComponent,
    AddGameComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatMenuModule,
    MatCardModule,
    MatRadioModule,
    MatGridListModule,
    MatIconModule,
    MatExpansionModule,
    MatInputModule,
    MatSlideToggleModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
