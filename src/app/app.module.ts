import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

import {AppComponent} from './app.component';
import {AppTopBarComponent} from './app-top-bar/app-top-bar.component';
import {AppRoutingModule} from './app-routing.module';
import {QuestionComponent} from './question/question.component';
import {AnswerComponent} from './answer/answer.component';
import {EditQuestionComponent} from './edit-question/edit-question.component';
import {UserComponent} from "./user/user.component";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import {MatCardModule} from '@angular/material/card';
import {MatRadioModule} from '@angular/material/radio';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatIconModule} from '@angular/material/icon';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatInputModule} from '@angular/material/input';
import {AnswerDetailComponent} from './answer-detail/answer-detail.component';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {AddAnswerComponent} from './add-answer/add-answer.component';
import {GameComponent} from "./game/game.component";
import {AddGameComponent} from "./add-game/add-game.component";
import {EditUserComponent} from "./edit-user/edit-user.component";
import {CategoryComponent} from './category/category.component';
import {LevelComponent} from './level/level.component';
import {NavBarComponent} from "./nav-bar/nav-bar.component";
import {SignInComponent} from "./sign-in/sign-in.component";
import {MatDialogModule} from "@angular/material/dialog";
import {SignUpComponent} from "./sign-up/sign-up.component";
import {GameplayComponent} from './gameplay/gameplay.component';
import {StatisticsComponent} from './statistics/statistics.component';
import {AddQuestionComponent} from './add-question/add-question.component';
import {QuestionDetailComponent} from './question-detail/question-detail.component';
import {PlayerPageComponent} from './player-page/player-page.component';
import {MatTableModule} from '@angular/material/table';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {SearchModule} from "./search/search.module";
import {WidgetSearchBarButtonComponent} from "./search/widget-search-bar-button/widget-search-bar-button.component";
import {WidgetSearchBarComponent} from "./search/widget-search-bar/widget-search-bar.component";
import {QuestionResolverService} from "./service/resolver/question-resolver.service";
import { GameplayComponent } from './gameplay/gameplay.component';
import { StatisticsComponent } from './statistics/statistics.component';
import {GameplayResolverService} from "./service/resolver/gameplay-resolver.service";
import { QuestionDetailComponent } from './question-detail/question-detail.component';
import { AddQuestionComponent } from './add-question/add-question.component';
import { GamePreviewComponent } from './game-preview/game-preview.component';

@NgModule({
  declarations: [
    AppComponent,
    AppTopBarComponent,
    QuestionComponent,
    UserComponent,
    EditUserComponent,
    AnswerComponent,
    EditQuestionComponent,
    AnswerDetailComponent,
    AddAnswerComponent,
    GameComponent,
    AddGameComponent,
    SignInComponent,
    CategoryComponent,
    LevelComponent,
    NavBarComponent,
    SignInComponent,
    SignUpComponent,
    GameplayComponent,
    StatisticsComponent,
    QuestionDetailComponent,
    AddQuestionComponent,
    PlayerPageComponent,
    GamePreviewComponent
  ],
  imports: [
    MatTableModule,
    MatCheckboxModule,
    MatProgressBarModule,
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
    ReactiveFormsModule,
    MatDialogModule,
    SearchModule,
    // MatDialogModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports: [WidgetSearchBarButtonComponent, WidgetSearchBarComponent],
})
export class AppModule { }
